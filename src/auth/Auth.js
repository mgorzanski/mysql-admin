const jwtDecode = require('jwt-decode');

class Auth {
    static authenticateUser(token) {
        localStorage.setItem('token', token);
    }

    static tokenExists() {
        return localStorage.getItem('token') !== null;
    }

    static deauthenticateUser() {
        localStorage.removeItem('token');
    }

    static getToken() {
        return localStorage.getItem('token');
    }

    static tokenNotExpired() {
        let token = this.getToken();
        let decoded = jwtDecode(token);

        if (decoded.exp < new Date().getTime() / 1000) {
            return false;
        }
        return true;
    }
}

export default Auth;