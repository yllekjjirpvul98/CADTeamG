import * as React from 'react'
import { Segment, Input, Button } from 'semantic-ui-react'

class Login extends React.Component {
    state = {
        username: '',
        password: '',
        password2: '',
    }

    updateUsername = (event, data) => {
        this.setState({ username: data.value });
    }

    updatePassword = (event, data) => {
        this.setState({ password: data.value })
    }

    updatePassword2 = (event, data) => {
        this.setState({ password: data.value })
    }

    signIn = () => {
        const { username, password } = this.state;
        console.log('User: ', username, ' Signed in with password: ', password)
    };

    signUp = () => {
        const { username, password, password2 } = this.state;
        console.log('User: ', username, ' Signed in with password: ', password, ' REPEATED ', password2);
    }

    render() {
        const { isSignUp } = this.props;

        let inputChange = <Button onClick={this.signIn}>Sign In</Button>;

        if (isSignUp) {
            inputChange =
                <div style={{textAlign: 'center'}}>
                    <Input key='register3' icon="lock" iconPosition="left" placeholder="Repeat Password" type="password" onChange={this.updatePassword2} />
                    <br />
                    <br />
                    <Button onClick={this.signUp}>Sign Up</Button>
                </div>
        }

        return (
            <Segment placeholder style={{ minHeight: '21rem' }}>
                <Input key='register1' icon="user" iconPosition="left" placeholder="Username" onChange={this.updateUsername} />
                <br />
                <Input key='register2' icon="lock" iconPosition="left" placeholder="Password" type="password" onChange={this.updatePassword} />
                <br />
                {inputChange}
            </Segment>
        )
    }
}

export default Login;