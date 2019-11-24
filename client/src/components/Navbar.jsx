import React from 'react';
import { NavLink } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';
import Logo from '../images/logo-small.png';

const activeStyle = { color: '#010101' };

const Navbar = () => (
  <Menu borderless text style={{ margin: '0px' }}>
    <NavLink to="/home">
      <Menu.Item>
        <img src={Logo} alt="logo" />
      </Menu.Item>
    </NavLink>
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
  </Menu>
);


export default Navbar;
