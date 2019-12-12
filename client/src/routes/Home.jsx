import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Loader, Dimmer, Button } from 'semantic-ui-react';
import Layout from '../components/Layout';
import { authenticate } from '../redux/actions';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { join: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    if (!this.props.id && !this.props.username) this.props.authenticate();
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit() {

  }

  render() {
    const { loader } = this.props;

    return (
      <Layout protected>
        <Dimmer inverted active={loader.AUTH}>
          <Loader inverted size="huge" inline="centered" />
        </Dimmer>
        <NavLink to="/join">
          <Button fluid>Join</Button>
        </NavLink>
        <br />
        <NavLink to="/host">
          <Button fluid>Host</Button>
        </NavLink>
      </Layout>
    );
  }
}

const mapStateToProps = (state) => {
  const { loader } = state;

  return { loader };
};

export default connect(mapStateToProps, { authenticate })(Home);
