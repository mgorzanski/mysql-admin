import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faHome, faUsers, faDatabase, faSlidersH, faWindowMaximize, faSignOutAlt } from '@fortawesome/fontawesome-free-solid';
import { NavLink } from 'react-router-dom';

class Nav extends React.Component {
    render() {
        const refLogout = node => {
            this.props.onUserLogout();
        }

        return (
            <nav className="primary-nav">
                <ul className="primary-nav__primary-menu">
                    <li><NavLink exact activeClassName="primary-nav__item-active" to="/"><div className="primary-nav__item-icon"><FontAwesomeIcon icon={faHome} /></div><div className="primary-nav__item-title">Home</div></NavLink></li>
                    <li><NavLink activeClassName="primary-nav__item-active" to="/databases"><div className="primary-nav__item-icon"><FontAwesomeIcon icon={faDatabase} /></div><div className="primary-nav__item-title">Databases</div></NavLink></li>
                    <li><NavLink activeClassName="primary-nav__item-active" to="/sql"><div className="primary-nav__item-icon"><FontAwesomeIcon icon={faWindowMaximize} /></div><div className="primary-nav__item-title">SQL</div></NavLink></li>
                    <li><NavLink activeClassName="primary-nav__item-active" to="/users"><div className="primary-nav__item-icon"><FontAwesomeIcon icon={faUsers} /></div><div className="primary-nav__item-title">Users</div></NavLink></li>
                    <li><NavLink activeClassName="primary-nav__item-active" to="/settings"><div className="primary-nav__item-icon"><FontAwesomeIcon icon={faSlidersH} /></div><div className="primary-nav__item-title">Settings</div></NavLink></li>
                    <li><NavLink to="/logout" innerRef={refLogout}><div className="primary-nav__item-icon"><FontAwesomeIcon icon={faSignOutAlt} /></div><div className="primary-nav__item-title">Logout</div></NavLink></li>
                </ul>
            </nav>
        );
    }
}

export default Nav;