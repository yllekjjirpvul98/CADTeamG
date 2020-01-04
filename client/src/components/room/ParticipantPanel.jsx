import React from 'react';
import { Header, Button } from 'semantic-ui-react';

export default function ParticipantPanel() {
  function handleLeave() {

  }

  return (
    <>
      <Header as="h3" textAlign="center" dividing>
        Participant Panel
      </Header>
      <Button
        onClick={handleLeave}
        fluid
      >
          Leave
      </Button>
    </>
  );
}
