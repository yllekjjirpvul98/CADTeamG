import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Header, List } from 'semantic-ui-react';

class RoomInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { title, location, hostId, starttime, endtime, duration, votingtime, participants, weekends, timer } = this.props.session;

    return (
      <>
        <Header as="h3" textAlign="center" dividing>
          Meeting Details
        </Header>
        
        <List divided relaxed>
          <List.Item>
            <List.Icon name="calendar alternate outline" size="large" verticalAlign="middle" />
            <List.Content>
              <List.Header>{title}</List.Header>
              <List.Description>Title</List.Description>
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Icon name="building outline" size="large" verticalAlign="middle" />
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
            <List.Icon name="clock outline" size="large" verticalAlign="middle" />
            <List.Content>
              <List.Header>{duration}min</List.Header>
              <List.Description>Duration</List.Description>
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Icon className={timer ? "red" : ""} name="time" size="large" verticalAlign="middle" />
            <List.Content>
              <List.Header>{timer || votingtime}s</List.Header>
              <List.Description>Time to vote</List.Description>
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Icon name="user outline" size="large" verticalAlign="middle" />
            <List.Content>
              <List.Header>{typeof participants !== 'undefined' ? participants.length : ''}</List.Header>
              <List.Description>Participants</List.Description>
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Icon name="calendar check outline" size="large" verticalAlign="middle" />
            <List.Content>
              <List.Header>{weekends ? "Yes" : "No"}</List.Header>
              <List.Description>Incude weekends</List.Description>
            </List.Content>
          </List.Item>
        </List>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  const { session } = state;
  return { session };
};

export default connect(mapStateToProps)(RoomInfo);
