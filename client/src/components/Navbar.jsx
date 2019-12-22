import React from 'react';
import { connect } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { Menu, Icon, Header } from 'semantic-ui-react';

const activeStyle = { color: '#0e0e0e' };

function Navbar({ username }) {
  const token = localStorage.getItem('jwt');
  const history = useHistory();

  function logout() {
    localStorage.removeItem('jwt');
    history.push('/sign-in');
  }

  const loggedIn = (
    <Menu.Menu position="right">
      <Menu.Item>
        <NavLink to="/home" activeStyle={activeStyle}>
          Home
        </NavLink>
      </Menu.Item>
      <Menu.Item>
        <NavLink to="/schedule" activeStyle={activeStyle}>
          Schedule
        </NavLink>
      </Menu.Item>
      <Menu.Item>
        {username.charAt(0).toUpperCase() + username.slice(1)}
      </Menu.Item>
      <Menu.Item>
        <Icon onClick={logout} name="sign out" size="large" link />
      </Menu.Item>
    </Menu.Menu>
  );
  const loggedOut =
  (
    <Menu.Menu position="right">
      <Menu.Item>
        <NavLink to="/sign-up" activeStyle={activeStyle}>
          Sign Up
        </NavLink>
      </Menu.Item>
      <Menu.Item>
        <NavLink to="/sign-in" activeStyle={activeStyle}>
          Sign In
        </NavLink>
      </Menu.Item>
    </Menu.Menu>
  );

  return (
    <Menu borderless text style={{ margin: '0px' }}>
      <NavLink to="/home">
        <Menu.Item>
          <Header as="h2" content="Rendezvous" color="blue" />
        </Menu.Item>
      </NavLink>
      {token !== null ? loggedIn : loggedOut}
    </Menu>
  );
}

const mapStateToProps = (state) => {
  const { username } = state.user;

  return { username };
};

export default connect(mapStateToProps)(Navbar);
