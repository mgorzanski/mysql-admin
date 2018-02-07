import React from 'react';
import './index.scss';

class Login extends React.Component {
    render() {
        return (
            <React.Fragment>
                <main className="login">
                    <h2 className="login__title">MySQL Admin</h2>
                    <h3 className="login__heading">Sign in</h3>
                    <form>
                        <label htmlFor="hostInput">Host
                            <input type="text" name="host" id="hostInput" className="login__input" />
                        </label>
                        <label htmlFor="userInput">User
                            <input type="text" name="user" id="userInput" className="login__input" />
                        </label>
                        <label htmlFor="passwordInput">Password
                            <input type="password" name="password" id="passwordInput" className="login__input" />
                        </label>
                        <label htmlFor="portInput">Port
                            <input type="number" name="port" id="portInput" className="login__input" />
                        </label>
                        <button className="login__button">Sign in</button>
                    </form>
                </main>
            </React.Fragment>
        );
    }
}

export default Login;