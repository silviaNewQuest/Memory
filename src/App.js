import React, { Component } from 'react';
import './App.scss';
import Cards from './components/Cards';
import Header from './components/Header';

class App extends Component {
  render() {
    return (
      <div className="App">
      <Header />
      <Cards />
      </div>
    );
  }
}

export default App;
