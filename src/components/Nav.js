import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faHome, faUsers, faDatabase, faSlidersH, faWindowMaximize, faSignOutAlt } from '@fortawesome/fontawesome-free-solid';
import { faWpforms } from '@fortawesome/fontawesome-free-brands';

class Nav extends React.Component {
    render() {
        return (
            <nav className="primary-nav">
                <ul className="primary-nav__primary-menu">
                    <li><a href="#"><FontAwesomeIcon icon={faHome} /> Home</a></li>
                    <li><a href="#"><FontAwesomeIcon icon={faDatabase} /> Databases</a></li>
                    <li><a href="#"><FontAwesomeIcon icon={faWindowMaximize} /> SQL</a></li>
                    <li><a href="#"><FontAwesomeIcon icon={faUsers} /> Users</a></li>
                    <li><a href="#"><FontAwesomeIcon icon={faSlidersH} /> Settings</a></li>
                    <li><a href="#"><FontAwesomeIcon icon={faSignOutAlt} /> Logout</a></li>
                </ul>
            </nav>
        );
    }
}

export default Nav;