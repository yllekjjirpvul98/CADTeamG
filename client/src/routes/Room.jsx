import React, { Component } from 'react';
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux';
import io from 'socket.io-client';
import { Grid, GridColumn } from 'semantic-ui-react';
import Layout from '../components/Layout';
import Chat from '../components/room/Chat';
import HostPanel from '../components/room/HostPanel';
import ParticipantPanel from '../components/room/ParticipantPanel';
import RoomInfo from '../components/room/RoomInfo';
import Calendar from '../components/room/Calendar';
import { authenticate } from '../redux/actions/auth';
import { getSession, getSessionEvents } from '../redux/actions/session';
import { ioOnMsg, ioOnJoin, ioOnLeave, ioClose, ioOnStart, ioOnVote, ioOnError, ioOnClose, ioOnEnter } from '../redux/actions/socket';

class RoomComponent extends Component {
  constructor(props) {
    super(props);

    const socket = io('http://localhost:8080');

    socket.on('message', (data) => this.props.ioOnMsg(data));
    socket.on('join', (data) => this.props.ioOnJoin(data));
    socket.on('leave', (data) => this.props.ioOnLeave(data));
    socket.on('start', (data) => this.props.ioOnStart(data));
    socket.on('vote', (data) => this.props.ioOnVote(data));
    socket.on('error', (data) => this.props.ioOnError(data));
    socket.on('close', () => this.props.ioOnClose(props));
    socket.on('enter', () => this.props.ioOnEnter(props));

    this.state = {
      socket,
      panel: (<></>),
    };
  }

  async componentDidMount() {
    const { socket } = this.state;

    if (!this.props.user.id) await this.props.authenticate();
    socket.emit('join', this.props.match.params.id, this.props.user.username);

    if (!this.props.session.id) {
      const { payload: { votingend, votes, timeslots, status } } = await this.props.getSession(this.props.match.params.id);
      if (votingend) this.props.ioOnStart({ votingend, timeslots, votes});
      if (status === 400 || status === 404) return;
    }
    const { user, session } = this.props;
    this.setState({ panel: user.id === session.hostId ? <HostPanel socket={socket} /> : <ParticipantPanel socket={socket} /> });
  }

  componentWillUnmount() {
    this.setState({ socket: null, panel: null })
  }

  render() {
    const { socket, panel } = this.state;
    const { session, errors, loader, match } = this.props;

    return (
      <Layout protected error={errors.id} loader={loader.AUTH || loader.GET_SESSION}>
        <Grid columns={2} stackable>
          <Grid.Column width={6}>
            <RoomInfo session={session} />
            {panel}
            <Chat room={match.params.id} socket={socket} />
          </Grid.Column>
          <GridColumn width={10}>
            <Calendar socket={socket} room={match.params.id} />
            {session.timer}
          </GridColumn>
        </Grid>
      </Layout>
    );
  }
}

function Room(props) {

  const history = useHistory();

  return (
    <RoomComponent history={history} {...props} />
  )
}


const mapStateToProps = (state) => {
  const { user, session, loader, errors } = state;
  return { user, session, loader, errors };
};

export default connect(mapStateToProps, {
  authenticate, getSession, getSessionEvents, ioOnMsg, ioOnJoin, ioOnLeave, ioClose, ioOnStart, ioOnVote, ioOnError, ioOnClose, ioOnEnter
})(Room);
