import React from 'react';
import './index.scss';
import Auth from './../../../auth/Auth';

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            host: '',
            user: '',
            password: '',
            port: '',
            userIsLoggedIn: false
        };
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleLogin = (event) => {
        event.preventDefault();
        this.props.onSubmit();
        fetch('/connect', {
            method: 'post',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({
                host: this.state.host,
                user: this.state.user,
                password: this.state.password,
                port: this.state.port
            })
        }).then( (res) => {
            return res.json();
        }).then( (data) => {
            if (data.connected === true) {
                this.setState({ userIsLoggedIn: true });
                Auth.authenticateUser(data.token);
                this.props.onUserLogin(this.state.host, this.state.user, this.state.password, this.state.port, this.state.userIsLoggedIn);
            }
        }).catch( (err) => {
            console.error("Failed fetching connection status.");
        });
    }

    render() {
        return (
            <main className="login">
                <h2 className="login__title">MySQL Admin</h2>
                <h3 className="login__heading">Sign in</h3>
                <form className="login__form" onSubmit={this.handleLogin}>
                    <label htmlFor="hostInput">Host
                        <input type="text" name="host" id="hostInput" className="login__input" onChange={this.handleInputChange} />
                    </label>
                    <label htmlFor="userInput">User
                        <input type="text" name="user" id="userInput" className="login__input" onChange={this.handleInputChange} />
                    </label>
                    <label htmlFor="passwordInput">Password
                        <input type="password" name="password" id="passwordInput" className="login__input" onChange={this.handleInputChange} />
                    </label>
                    <label htmlFor="portInput">Port
                        <input type="number" name="port" id="portInput" className="login__input" onChange={this.handleInputChange} />
                    </label>
                    <button className="login__button" type="submit">Sign in</button>
                </form>
            </main>
        );
    }
}

export default Login;