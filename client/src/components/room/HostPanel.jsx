import React from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { Message, Button } from 'semantic-ui-react';
import { startSession, closeSession } from '../../redux/actions/session';

function HostPanel(props) {
  const history = useHistory();

  async function handleClose() {
    const { payload: { id } } = await props.closeSession(props.session.id);

    if (id) history.push('/home');
  }

  return (
    <>
      <Message info>
        <Message.Header>Code</Message.Header>
        <Message.Content>Room code is <b>{props.session.code}</b></Message.Content>
      </Message>
      <Button
        onClick={props.startSession}
        fluid
      >
          Start
      </Button>
      <br />
      <Button
        onClick={handleClose}
        fluid
      >
          Close
      </Button>
    </>
  );
}

const mapStateToProps = (state) => {
  const { session } = state;
  return { session };
};

export default connect(mapStateToProps, { startSession, closeSession })(HostPanel);
