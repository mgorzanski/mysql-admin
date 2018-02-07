import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faHome, faUsers, faDatabase, faSlidersH, faWindowMaximize, faSignOutAlt } from '@fortawesome/fontawesome-free-solid';
import { BrowserRouter as Router, Link } from 'react-router-dom';

class Nav extends React.Component {
    render() {
        return (
            <Router>
                <nav className="primary-nav">
                    <ul className="primary-nav__primary-menu">
                        <li><Link to="/"><FontAwesomeIcon icon={faHome} /> Home</Link></li>
                        <li><Link to="/databases"><FontAwesomeIcon icon={faDatabase} /> Databases</Link></li>
                        <li><Link to="/sql"><FontAwesomeIcon icon={faWindowMaximize} /> SQL</Link></li>
                        <li><Link to="/users"><FontAwesomeIcon icon={faUsers} /> Users</Link></li>
                        <li><Link to="/settings"><FontAwesomeIcon icon={faSlidersH} /> Settings</Link></li>
                        <li><Link to="/logout"><FontAwesomeIcon icon={faSignOutAlt} /> Logout</Link></li>
                    </ul>
                </nav>
            </Router>
        );
    }
}

export default Nav;