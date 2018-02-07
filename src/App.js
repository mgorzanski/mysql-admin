import React, { Component } from 'react';
import './App.scss';
import Nav from './components/Nav';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Nav />
        <main className="content">
          <div className="content__title">Home</div>
          <section className="content__body">

          </section>
        </main>
      </div>
    );
  }
}

export default App;
