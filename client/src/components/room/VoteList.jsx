import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Header, Card } from 'semantic-ui-react';
import { ioVote } from '../../redux/actions/socket';

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

class VoteList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(timeslot) {

    this.props.ioVote(this.props.socket, timeslot)

  }


  render() {
    const { user, session } = this.props;

    const dates = session.winner ? new Map([[days[new Date(session.winner).getDay()], [session.winner]]]) : Object.keys(session.timeslots).reduce((acc, e) => acc.set(days[new Date(e).getDay()], (acc.get(days[new Date(e).getDay()]) || []).concat(e) ), new Map());


    return (    
      <Grid columns={dates.size || 7} stackable>
        {[...dates.entries()].map((e) => {

          const [day, slots] = e;

          return (

          <Grid.Column key={slots} >

            <Header as="h3" textAlign="center" dividing>
              {day}
            </Header>

            {slots.map((slot) => {
              
              const numberOfVotes = session.timeslots[slot].length;
              const voted = session.timeslots[slot].includes(user.username)
              const winner = slot === session.winner;
              const color = winner ? "green" : voted ? "blue" : null;

              return (
                <Card color={color} key={slot} id={slot} fluid centered onClick={() => this.handleClick(slot)}>
                  <Card.Content>
    
                    <Card.Meta textAlign="center">
                      {new Date(slot).toLocaleString("en-GB")}  
                    </Card.Meta>

                    <Card.Description textAlign="center">
                      {winner ? "Winner" : `Votes ${numberOfVotes}`}
                    </Card.Description>

                  </Card.Content>
    
                </Card>
              );

            })}

          </Grid.Column>

        )})}
      </Grid>
    );
  }
}

const mapStateToProps = (state) => {
  const { user, session } = state;
  return { user, session };
};

export default connect(mapStateToProps, { ioVote })(VoteList);
