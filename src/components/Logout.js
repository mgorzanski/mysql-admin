import React from 'react';
import Auth from './../auth/Auth';
import { Redirect } from 'react-router';

class Logout extends React.Component {
    render() {
        Auth.deauthenticateUser();
        return (
            <Redirect to="/" />
        );
    }
}

export default Logout;