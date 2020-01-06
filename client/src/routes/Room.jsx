import React, { Component } from 'react';
import io from 'socket.io-client';
import { baseURL } from '../utils/axios';
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux';
import { Grid, GridColumn } from 'semantic-ui-react';
import { authenticate } from '../redux/actions/auth';
import { getSession, getSessionEvents } from '../redux/actions/session';
import { ioOnMsg, ioOnJoin, ioOnLeave, ioClose, ioOnStart, ioOnVote, ioOnError, ioOnClose, ioOnEnter, ioOnLeaveLobby, ioOnResult } from '../redux/actions/socket';
import Layout from '../components/Layout';
import Chat from '../components/room/Chat';
import RoomInfo from '../components/room/RoomInfo';
import VoteList from '../components/room/VoteList';

class RoomComponent extends Component {
  constructor(props) {
    super(props);
    
    const socket = io(baseURL);

    socket.on('message', (data) => this.props.ioOnMsg(data));
    socket.on('join', (data) => this.props.ioOnJoin(data));
    socket.on('leave', (data) => this.props.ioOnLeave(data));
    socket.on('leaveLobby', (data) => this.props.ioOnLeaveLobby(data));
    socket.on('start', (data) => this.props.ioOnStart(data));
    socket.on('vote', (data) => this.props.ioOnVote(data));
    socket.on('error', (data) => this.props.ioOnError(data));
    socket.on('result', (data) => this.props.ioOnResult(data));
    socket.on('close', () => this.props.ioOnClose(props));
    socket.on('enter', () => this.props.ioOnEnter(props));

    this.state = {
      socket,
    };
  }

  async componentDidMount() {
    const { socket } = this.state;

    if (!this.props.user.id) await this.props.authenticate();
    socket.emit('join', this.props.match.params.id, this.props.user.username, this.props.user.id);

    if (!this.props.session.id) {
      const { payload: { votingend, timeslots, status } } = await this.props.getSession(this.props.match.params.id);
      if (status === 400 || status === 404) return;
      if (votingend && timeslots) this.props.ioOnStart({ votingend, timeslots });
    }
  }

  componentWillUnmount() {
    this.setState({ socket: null, panel: null })
  }

  render() {
    const { socket } = this.state;
    const { session, errors, loader, match } = this.props;

    return (
      <Layout protected error={errors.id || errors.connection} loader={loader.AUTH || loader.GET_SESSION}>

        <Grid columns={2} stackable>

          <Grid.Column width={4}>
            <RoomInfo socket={socket}/>
          </Grid.Column>

          <GridColumn width={12}>
            {session.timer || session.winner ? <VoteList room={match.params.id} socket={socket} /> : <Chat room={match.params.id} socket={socket} />}
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
  authenticate, getSession, getSessionEvents, ioOnMsg, ioOnJoin, ioOnLeave, ioOnResult,
  ioClose, ioOnStart, ioOnVote, ioOnError, ioOnClose, ioOnEnter, ioOnLeaveLobby
})(Room);
