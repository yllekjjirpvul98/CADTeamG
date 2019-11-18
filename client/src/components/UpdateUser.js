import React from "react";
import { connect } from "react-redux";
import { updateUser } from "../redux/actions";

class UpdateUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = { input: "" };
  }

  updateInput = input => {
    this.setState({ input });
  };

  handleUpdateUser = () => {
    this.props.updateUser(this.state.input);
    this.setState({ input: "" });
  };

  render() {
    return (
      <div>
        <input
          onChange={e => this.updateInput(e.target.value)}
          value={this.state.input}
        />
        <button onClick={this.handleUpdateUser}>
          Update username
        </button>
      </div>
    );
  }
}

export default connect(
  null,
  { updateUser }
)(UpdateUser);