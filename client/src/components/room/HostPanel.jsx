import React from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { Message, Button } from 'semantic-ui-react';
import { closeSession } from '../../redux/actions/session';
import { ioStart, ioClose } from '../../redux/actions/socket';

function HostPanel(props) {
  const history = useHistory();

  async function handleStart() {
    props.ioStart(props.socket, props.session.id);
  }

  async function handleClose() {
    const { payload: { id } } = await props.closeSession(props.session.id);

    if (id) {
      props.ioClose(props.socket, props.session.id);
      history.push('/home');
    }
  }

  return (
    <>
      <Message info>
        <Message.Header>Code</Message.Header>
        <Message.Content>Room code is <b>{props.session.code}</b></Message.Content>
      </Message>
      <Button
        onClick={handleStart}
        fluid
        loading={props.loader.START_SESSION}
      >
          Start
      </Button>
      <br />
      <Button
        onClick={handleClose}
        fluid
        loading={props.loader.CLOSE_SESSION}
      >
          Close
      </Button>
    </>
  );
}

const mapStateToProps = (state) => {
  const { session, loader } = state;
  return { session, loader };
};

export default connect(mapStateToProps, { ioStart, ioClose, closeSession })(HostPanel);
