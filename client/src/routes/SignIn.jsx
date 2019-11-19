import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, Input } from 'semantic-ui-react';
import { signIn } from '../redux/actions';
import Layout from '../components/Layout'

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit() {
    this.props.signIn(this.state.input);
    this.setState({ username: '' });
  }

  render() {
    const { username } = this.props;

    return (
      <Layout>
        <Link to="/sign-up">Sign Up</Link>
  
        <Input
          name="username"
          onChange={this.handleChange}
          value={this.state.username}
        />
        <Button onClick={this.handleSubmit}>Sign In</Button>
        {Boolean(username).toString()}
      </Layout>
    );
  }
}

const mapStateToProps = (state) => {
  const { username } = state.user;

  return { username };
};

export default connect(mapStateToProps, { signIn })(SignIn);
