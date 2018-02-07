import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.scss';
import Nav from './components/Nav';
import Home from './components/views/Home';
import Databases from './components/views/Databases';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Nav />
          <main className="content">
            <div className="content__title">Home</div>
              <section className="content__body">
                  <Route exact path="/" component={Home} />
                  <Route path="/databases" component={Databases} />
              </section>
          </main>
        </div>
      </Router>
    );
  }
}

export default App;
