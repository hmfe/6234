import React, { Component } from 'react';
import './App.css';

import AutoComplete from './AutoComplete'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-content-wrapper">
          <AutoComplete />
        </div>
      </div>
    );
  }
}

export default App;
