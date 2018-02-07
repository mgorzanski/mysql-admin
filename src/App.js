import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.scss';
import Nav from './components/Nav';
import Home from './components/views/Home';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Nav />
        <main className="content">
          <div className="content__title">Home</div>
          <section className="content__body">
            <Router>
              <Route exact path="/" component={Home} />
            </Router>
          </section>
        </main>
      </div>
    );
  }
}

export default App;
