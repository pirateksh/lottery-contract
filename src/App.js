import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import web3 from './web3';
import lottery from './lottery';
// import Web3 from 'web3';

class App extends Component {
  
  // New ES6 syntax to set state initially.
  state = {
    manager: '',
    players: [],
    balance: '',
    value: '',
    message: ''
  };

  async componentDidMount() {
    const manager = await lottery.methods.manager().call();
    const players = await lottery.methods.getPlayers().call();
    const balance = await web3.eth.getBalance(lottery.options.address);
    this.setState({ manager, players, balance });
  }

  onSubmit = async (event) => {
    // 'this' refers to instance of class
    event.preventDefault();

    this.setState({ message: 'Waiting on transaction success....'});
    // Sending transaction to 'enter()' function
    const accounts = await web3.eth.getAccounts();
    await lottery.methods.enter().send({
      from: accounts[0], // This will always fetch the first account 
      // from the metamask of currently logged in user and enter it in lottery.
      value: web3.utils.toWei(this.state.value, 'ether')
    });
    this.setState({ message: 'You have been successfully entered!'});
  };

  onClick = async (event) => {
    this.setState({ message: 'Waiting on transaction success....'});
    const accounts = await web3.eth.getAccounts();
    await lottery.methods.pickWinner().send({
      from: accounts[0],
    });
    this.setState({ message: 'Winner has been picked!'});
  };

  render() {
    return (
      <div>
        <h2>Lottery Contract</h2>
        <p>
          This contract is managed by {this.state.manager}.
          There are currently {this.state.players.length} people entered 
          competing to win {web3.utils.fromWei(this.state.balance, 'ether')} ether!
        </p>

        <hr />

        <form onSubmit={this.onSubmit}>
          <h4>Want to try your luck?</h4>
          <div>
            <label>Amount of ether to enter</label>
            <input 
              value={this.state.value}
              onChange={event => this.setState({ value: event.target.value })}
            />
          </div>
          <button>Enter</button>
        </form>

        <hr />

        <h4>Ready to Pick Winner?</h4>
        <button onClick={this.onClick}>Pick</button>

        <hr />
        <h1>{this.state.message}</h1>
      </div>
    );
  }
}

export default App;