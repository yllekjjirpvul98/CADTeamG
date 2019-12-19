import React, { Component } from 'react'
import { connect } from 'react-redux';
import Layout from '../components/Layout';
import { getSession } from '../redux/actions/session';
import { authenticate } from '../redux/actions/auth';
import { Input, Button, Message } from 'semantic-ui-react';
import io from 'socket.io-client';

class Room extends Component {
    constructor(props) {
        super(props);
        this.state = {
            socket: io('http://localhost:8080'),
            room: props.match.params.id,
            message: '',
            messages: []
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    async componentDidMount() {

        if (!this.props.id && !this.props.username) {
            await this.props.authenticate();
        }
        if (!this.props.user.session.id) this.props.getSession(this.state.room);
    
        this.state.socket.emit('join', this.state.room, this.props.user.username);
        this.state.socket.on('message', (data) => this.setState({ messages: [...this.state.messages, data] }));
        this.state.socket.on('connect', (data) => console.log(data));
        this.state.socket.on('disconnect', (data) => console.log(data));
    }
    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }
    handleSubmit(event) {
        this.state.socket.emit('message', this.state.message);
        this.setState({ message: '', messages: this.state.messages.concat(this.state.message) });
    }
    render() {
        const { message } = this.state;
        const { session } = this.props.user;
     
        return (
            <Layout>
                {this.props.match.params.id}
                <br />
                SESSION ID: {session.id}
                <br />
                HOST ID: {session.hostId}
                <br />
                TITLE: {session.title}
                <br />
                LOCATION: {session.location}
                <br />
                DURATION: {session.duration}
                <br />
                START TIME: {session.starttime}
                <br />
                END TIME: {session.endtime}
                <br />
                VOTING TIME: {session.votingtime}
                <br />
                PARTICIPANTS: {session.participants}
                <br />
                WEEKENDS: {String(session.weekends)}
                <br />
                <Input
                    name="message"
                    icon="envelope"
                    iconPosition="left"
                    placeholder="Enter message"
                    type="text"
                    fluid
                    onChange={this.handleChange}
                    value={message}
                />
                <br />
                <Button
                    onClick={this.handleSubmit}
                    fluid
                >
                    Send
                </Button>
                {this.state.messages.map((message, i) => <Message key={i}>{message}</Message>)}
            </Layout>
        )
    }
}

const mapStateToProps = (state) => {
    const { user } = state;
    return { user };
};
  
export default connect(mapStateToProps, { authenticate, getSession })(Room);
  