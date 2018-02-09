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
      userIsLoggedIn: false
    };
  }

  componentWillMount() {
    if (Auth.tokenExists()) {
      this.setState({ userIsLoggedIn: true });
    }
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

    return (
      <Router>
        <div className="App">
          {userIsLoggedIn ? (
          <React.Fragment>
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
          ) : (
            <Login onUserLogin={this.handleConnection} />
          )}
        </div>
      </Router>
    );
  }
}

export default App;
