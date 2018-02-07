import React, { Component } from 'react';
import './App.scss';
import Nav from './components/Nav';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Nav />
        <main className="content">
          <nav className="content__top">
            <div className="content__title">Home</div>
              <ul className="content__menu">
                <li><a href="#">Logout</a></li>
              </ul>
          </nav>

          <section className="content__body">

          </section>
        </main>
      </div>
    );
  }
}

export default App;
