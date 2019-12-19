import React from 'react';
import { Message } from 'semantic-ui-react';

export default function ErrorList({ data }) {
  return (
    <>
      {Object.keys(data).length > 0 ? (
        <Message
          error
          header="Error"
          list={Object.values(data).map((err) => <p key={err}>{err}</p>)}
        />
      ) : <></>}
    </>
  );
}
