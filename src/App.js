import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.scss';
import Nav from './components/Nav';
import Home from './components/views/Home';
import Databases from './components/views/Databases';
import Login from './components/views/Login';

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

  handleConnection = (mysqlHost, mysqlUser, mysqlPassword, mysqlPort, userIsLoggedIn) => {
    this.setState({
      mysqlHost,
      mysqlUser,
      mysqlPassword,
      mysqlPort,
      userIsLoggedIn
    });
  }

  render() {
    const userIsLoggedIn = this.state.userIsLoggedIn;

    return (
      <Router>
        <div className="App">
          {userIsLoggedIn ? (
          <React.Fragment>
            <Nav />
            <main className="content">
              <div className="content__title">Home</div>
                <section className="content__body">
                    <Route exact path="/" component={Home} />
                    <Route path="/databases" component={Databases} />
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
