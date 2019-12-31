import React from 'react';
import { connect } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { Menu, Icon, Header } from 'semantic-ui-react';

const activeStyle = { background: "rgba(0,0,0,.05" };

function Navbar({ username }) {
  const token = localStorage.getItem('jwt');
  const history = useHistory();

  function logout() {
    localStorage.removeItem('jwt');
    history.push('/sign-in');
  }

  const loggedIn = (
    <Menu.Menu position="right">

      <Header as="p" content={username} color="blue" className="username" style={{margin: "auto 1rem"}} />

      <NavLink to="/home" activeStyle={activeStyle}>
        <Menu.Item>
          <Icon name="home" />
          Home
        </Menu.Item>
      </NavLink>

      <NavLink to="/schedule" activeStyle={activeStyle}>
        <Menu.Item>
          <Icon name="calendar" />
          Schedule
        </Menu.Item>
      </NavLink>

      <Menu.Item>
        <Icon onClick={logout} name="sign out" size="large" link />
        Sign Out
      </Menu.Item>
    </Menu.Menu>
  );
  const loggedOut =
  (
    <Menu.Menu position="right">

      <NavLink to="/sign-up" activeStyle={activeStyle}>
        <Menu.Item>
          <Icon name="signup" />
          Sign Up
        </Menu.Item>
      </NavLink>

      <NavLink to="/sign-in" activeStyle={activeStyle}>
        <Menu.Item>
          <Icon name="sign-in" />
          Sign In
        </Menu.Item>
      </NavLink>

    </Menu.Menu>
  );

  return (
    <Menu icon="labeled" className="navbar">
      <div style={{margin: "auto 1rem"}}>
        <NavLink to="/home" activeStyle={activeStyle}>
          <Header as="h1" content="Rendezvous" color="blue" />
        </NavLink>
      </div>
      {token !== null ? loggedIn : loggedOut}
    </Menu>
  );
}

const mapStateToProps = (state) => {
  const { username } = state.user;

  return { username };
};

export default connect(mapStateToProps)(Navbar);
