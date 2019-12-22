import React, { Component } from 'react';
import { List, Segment } from 'semantic-ui-react';

export default class Session extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { session } = this.props;

    return (
      <Segment secondary>
        <List divided relaxed>
          <List.Item>
            <List.Icon name="bars" size="large" verticalAlign="middle" />
            <List.Content>
              <List.Header>{session.title}</List.Header>
              <List.Description>Title</List.Description>
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Icon name="building" size="large" verticalAlign="middle" />
            <List.Content>
              <List.Header>{session.location}</List.Header>
              <List.Description>Location</List.Description>
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Icon name="user secret" size="large" verticalAlign="middle" />
            <List.Content>
              <List.Header>{session.hostId}</List.Header>
              <List.Description>Host</List.Description>
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Icon name="hourglass start" size="large" verticalAlign="middle" />
            <List.Content>
              <List.Header>{new Date(session.starttime).toUTCString()}</List.Header>
              <List.Description>Start</List.Description>
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Icon name="hourglass end" size="large" verticalAlign="middle" />
            <List.Content>
              <List.Header>{new Date(session.endtime).toUTCString()}</List.Header>
              <List.Description>End</List.Description>
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Icon name="time" size="large" verticalAlign="middle" />
            <List.Content>
              <List.Header>{session.votingtime}</List.Header>
              <List.Description>Time to vote</List.Description>
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Icon name="user" size="large" verticalAlign="middle" />
            <List.Content>
              <List.Header>{typeof session.participants !== 'undefined' ? session.participants.length : ''}</List.Header>
              <List.Description>Participants</List.Description>
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Icon name="flag" size="large" verticalAlign="middle" />
            <List.Content>
              <List.Header>{String(session.weekends)}</List.Header>
              <List.Description>Incude weekends</List.Description>
            </List.Content>
          </List.Item>
        </List>
      </Segment>
    );
  }
}
