import React, { Component } from 'react';
import { List } from 'semantic-ui-react';

export default class Session extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { title, location, hostId, starttime, endtime, duration, votingtime, participants, weekends } = this.props.session;

    return (
      <List divided relaxed>
        <List.Item>
          <List.Icon name="bars" size="large" verticalAlign="middle" />
          <List.Content>
            <List.Header>{title}</List.Header>
            <List.Description>Title</List.Description>
          </List.Content>
        </List.Item>
        <List.Item>
          <List.Icon name="building" size="large" verticalAlign="middle" />
          <List.Content>
            <List.Header>{location}</List.Header>
            <List.Description>Location</List.Description>
          </List.Content>
        </List.Item>
        <List.Item>
          <List.Icon name="user secret" size="large" verticalAlign="middle" />
          <List.Content>
            <List.Header>{hostId}</List.Header>
            <List.Description>Host</List.Description>
          </List.Content>
        </List.Item>
        <List.Item>
          <List.Icon name="hourglass start" size="large" verticalAlign="middle" />
          <List.Content>
            <List.Header>{new Date(starttime).toUTCString()}</List.Header>
            <List.Description>Start</List.Description>
          </List.Content>
        </List.Item>
        <List.Item>
          <List.Icon name="hourglass end" size="large" verticalAlign="middle" />
          <List.Content>
            <List.Header>{new Date(endtime).toUTCString()}</List.Header>
            <List.Description>End</List.Description>
          </List.Content>
        </List.Item>
        <List.Item>
          <List.Icon name="hourglass end" size="large" verticalAlign="middle" />
          <List.Content>
            <List.Header>{duration}</List.Header>
            <List.Description>Duration</List.Description>
          </List.Content>
        </List.Item>
        <List.Item>
          <List.Icon name="time" size="large" verticalAlign="middle" />
          <List.Content>
            <List.Header>{votingtime}</List.Header>
            <List.Description>Time to vote</List.Description>
          </List.Content>
        </List.Item>
        <List.Item>
          <List.Icon name="user" size="large" verticalAlign="middle" />
          <List.Content>
            <List.Header>{typeof participants !== 'undefined' ? participants.length : ''}</List.Header>
            <List.Description>Participants</List.Description>
          </List.Content>
        </List.Item>
        <List.Item>
          <List.Icon name="flag" size="large" verticalAlign="middle" />
          <List.Content>
            <List.Header>{String(weekends)}</List.Header>
            <List.Description>Incude weekends</List.Description>
          </List.Content>
        </List.Item>
      </List>
    );
  }
}
