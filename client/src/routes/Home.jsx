import React from 'react';
import { connect } from 'react-redux';
import { Loader, Dimmer, Button } from 'semantic-ui-react';
import Layout from '../components/Layout';
import { authenticate, clearErrors } from '../redux/actions/auth';
import JoinForm from '../components/JoinForm';
import HostForm from '../components/HostForm';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      join: false,
      host: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleReset = this.handleReset.bind(this);

  }

  componentDidMount() {
    if (!this.props.id && !this.props.username) this.props.authenticate();
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleReset() {
    this.setState({ join: false, host: false })
    this.props.clearErrors();
  }

  render() {
    const { join, host } = this.state;
    const { loader } = this.props;

    const selection =
    (
      <>
        <Button onClick={() => this.setState({ join: true })} fluid>Join</Button>
        <br />
        <Button onClick={() => this.setState({ host: true })} fluid>Host</Button>
      </>
    );

    const back = join || host ? <Button fluid onClick={this.handleReset}>Back</Button> : null;
    let currentState = selection;
    if (join) currentState = <JoinForm />;
    if (host) currentState = <HostForm />;

    return (
      <Layout protected>
        <Dimmer inverted active={loader.AUTH}>
          <Loader inverted size="huge" inline="centered" />
        </Dimmer>
        {currentState}
        <br />
        {back}
      </Layout>
    );
  }
}

const mapStateToProps = (state) => {
  const { loader } = state;

  return { loader };
};

export default connect(mapStateToProps, { authenticate, clearErrors })(Home);
