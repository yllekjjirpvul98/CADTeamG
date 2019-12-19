import React from 'react';
import { Button } from 'semantic-ui-react';

export default function HostPanel() {
  function handleLeave() {

  }

  return (
    <>
      <Button
        onClick={handleLeave}
        fluid
      >
          Leave
      </Button>
    </>
  );
}
