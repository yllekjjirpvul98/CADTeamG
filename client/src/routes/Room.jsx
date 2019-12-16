import React, { Component } from 'react'
import Layout from '../components/Layout';
import io from 'socket.io-client';

export default class Room extends Component {
    render() {
        const socket = io('http://localhost:8080')
        socket.emit('join', this.props.match.params.id)
        socket.emit('message', 'hey')
        socket.on('message', (data) => console.log(data))
        return (
            <Layout>
                {this.props.match.params.id}
            </Layout>
        )
    }
}
