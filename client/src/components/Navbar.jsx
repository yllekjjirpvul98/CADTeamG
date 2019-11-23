import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';
import Logo from '../images/logo-small.png';

class Navbar extends React.Component {
    state = { activeItem: '' };

    handleItemClick = (e, { name }) => this.setState({ activeItem: name });

    render() {
        const { activeItem } = this.state;

        return (
            <Menu borderless text style={{margin: '0px'}}>
                <Link to="/home">
                    <Menu.Item>
                        <img src={Logo} />
                    </Menu.Item>
                </Link>
                <Menu.Menu position='right'>
                    <Link to="/sign-up">
                        <Menu.Item
                            name='signup'
                            active={activeItem === 'signup'}
                            onClick={this.handleItemClick}
                            content="Sign Up"
                        />
                    </Link>
                    <Link to="/sign-in">
                        <Menu.Item
                            name='signin'
                            active={activeItem === 'signin'}
                            onClick={this.handleItemClick}
                            content="Sign In"
                        />
                    </Link>
                </Menu.Menu>
            </Menu>
        );
    }
}

export default Navbar;