import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import { leaveSession } from '../../redux/actions/session';

function ParticipantPanel(props) {
  const history = useHistory();

  async function handleLeave() {
    await props.leaveSession(props.session.id, props.user.id);
    props.socket.emit('leave', props.user.username);
    history.push('/home')
  }

  return (
    <>
      <Button
        onClick={handleLeave}
        fluid
        loading={props.loader.LEAVE_SESSION}
      >
          Leave
      </Button>
    </>
  );
}

const mapStateToProps = (state) => {
  const { user, session, loader } = state;
  return { user, session, loader };
};

export default connect(mapStateToProps, { leaveSession })(ParticipantPanel);

