import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.scss';
import Nav from './components/Nav';
import Home from './components/views/Home';
import Databases from './components/views/Databases';
import Login from './components/views/Login';
import Logout from './components/Logout';
import Auth from './auth/Auth';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mysqlHost: '',
      mysqlUser: '',
      mysqlPassword: '',
      mysqlPort: '',
      userIsLoggedIn: false,
      showLoadingScreen: true,
    };
  }

  componentWillMount() {
    if (Auth.tokenExists() && Auth.tokenNotExpired()) {
      this.checkConnectionState().then((res) => {
        return JSON.parse(res);
      }).then((res) => {
        if (res.connectionEstablished) {
          this.setState({ userIsLoggedIn: true, showLoadingScreen: false });
        }
      });
    }
  }

  checkConnectionState = () => {
    return new Promise(function (resolve, reject) {
      fetch('/connection', {
        method: 'post',
        headers: new Headers({
            'Content-Type': 'application/json',
            'x-access-token': Auth.getToken()
        })
      }).then((res) => {
        return res.json();
      }).then((data) => {
        if (data.connectionEstablished) {
          resolve(JSON.stringify({ connectionEstablished: true }));
        }
        resolve(JSON.stringify({ connectionEstablished: false }));
      }).catch((err) => {
        reject(Error("Server error"));
      });
    });
  }

  handleConnection = (mysqlHost, mysqlUser, mysqlPassword, mysqlPort, userIsLoggedIn) => {
    this.setState({
      mysqlHost,
      mysqlUser,
      mysqlPassword,
      mysqlPort,
      userIsLoggedIn
    });
  }

  handleLogout = () => {
    if (!Auth.tokenExists()) {
      this.setState({ userIsLoggedIn: false });
    }
  }

  render() {
    const userIsLoggedIn = this.state.userIsLoggedIn;
    const showLoadingScreen = this.state.showLoadingScreen;

    return (
      <Router>
        <div className="App">
          {showLoadingScreen ? [
              <React.Fragment key="1">
                Loading...
              </React.Fragment>
            ] : [ userIsLoggedIn ? [
              <React.Fragment key="2">
                <Nav onUserLogout={this.handleLogout} />
                <main className="content">
                  <div className="content__title">Home</div>
                    <section className="content__body">
                        <Route exact path="/" component={Home} />
                        <Route path="/databases" component={Databases} />
                        <Route path="/logout" component={Logout} />
                    </section>
                </main>
              </React.Fragment>
           ] : [
            <Login key="3" onUserLogin={this.handleConnection} />
           ]]}
        </div>
      </Router>
    );
  }
}

export default App;
