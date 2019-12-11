import React from 'react';
import { connect } from 'react-redux';
import { Loader, Dimmer } from 'semantic-ui-react';
import Layout from '../components/Layout';
import { authenticate } from '../redux/actions';

class Home extends React.Component {
  async componentDidMount() {
    if (!this.props.id && !this.props.username) this.props.authenticate();
  }

  render() {
    const { id, username, loader } = this.props;

    return (
      <Layout protected>
        your id: {id}
        <br />
        your username: {username}
        <Dimmer inverted active={loader.AUTH}>
          <Loader inverted size="huge" inline="centered" />
        </Dimmer>
      </Layout>
    );
  }
}

const mapStateToProps = (state) => {
  const { id, username } = state.user;
  const { loader } = state;

  return { id, username, loader };
};

export default connect(mapStateToProps, { authenticate })(Home);
