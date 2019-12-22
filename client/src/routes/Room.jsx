import React, { Component } from 'react';
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
import { getSession } from '../redux/actions/session';
import { ioOnMsg, ioOnJoin, ioLeave, ioClose } from '../redux/actions/socket';

class Room extends Component {
  constructor(props) {
    super(props);

    const socket = io('http://localhost:8080');

    socket.on('message', (data) => this.props.ioOnMsg(data));
    socket.on('join', (data) => this.props.ioOnJoin(data));
    socket.on('leave', (data) => this.props.ioLeave(data));
    socket.on('close', (data) => this.props.ioClose(data));

    this.state = {
      socket,
      panel: (<></>),
    };
  }

  async componentDidMount() {
    this.state.socket.emit('join', this.props.match.params.id, this.props.user.username); // EMIT BEFORE AWAIT OR IT WONT WORK
    if (!this.props.user.id) await this.props.authenticate();
    if (!this.props.session.id) {
      const { payload: { status } } = await this.props.getSession(this.props.match.params.id);
      if (status === 400 || status === 404) return;
    }
    const { user, session } = this.props;
    this.setState({ panel: user.id === session.hostId ? <HostPanel /> : <ParticipantPanel /> });
  }

  render() {
    const { socket, panel } = this.state;
    const { session, errors, loader, match } = this.props;

    return (
      <Layout protected error={errors.id} loader={loader.AUTH || loader.GET_SESSION}>
        <Grid columns={2} relaxed="very" stackable>
          <Grid.Column width={6}>
            <RoomInfo session={session} />
            {panel}
            <Chat room={match.params.id} socket={socket} />
          </Grid.Column>
          <GridColumn width={10}>
            <Calendar room={match.params.id} />
          </GridColumn>
        </Grid>
      </Layout>
    );
  }
}

const mapStateToProps = (state) => {
  const { user, session, loader, errors } = state;
  return { user, session, loader, errors };
};

export default connect(mapStateToProps, {
  authenticate, getSession, ioOnMsg, ioOnJoin, ioLeave, ioClose,
})(Room);
