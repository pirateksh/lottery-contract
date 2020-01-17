import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import web3 from './web3';
import lottery from './lottery';
// import Web3 from 'web3';

class App extends Component {
  
  // New ES6 syntax to set state initially.
  state = {
    manager: ''
  };

  async componentDidMount() {
    const manager = await lottery.methods.manager().call();
    this.setState({ manager });
  }

  render() {
    return (
      <div>
        <h2>Lottery Contract</h2>
        <p>This contract is managed by {this.state.manager}.</p>
      </div>
    );
  }
}

export default App;