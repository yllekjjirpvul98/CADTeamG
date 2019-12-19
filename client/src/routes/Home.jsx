import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';
import Layout from '../components/Layout';
import { authenticate } from '../redux/actions/auth';
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
    if (!this.props.user.id) this.props.authenticate();
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleReset() {
    this.setState({ join: false, host: false });
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
      <Layout protected loader={loader.AUTH}>
        {currentState}
        <br />
        {back}
      </Layout>
    );
  }
}

const mapStateToProps = (state) => {
  const { user, loader } = state;

  return { user, loader };
};

export default connect(mapStateToProps, { authenticate })(Home);
