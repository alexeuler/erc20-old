// @flow

import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Tokens from './Tokens';
import './App.scss';

type PropsType = {};
type StateType = {
  tokens: Array<{
    address: string,
    name: string,
    decimals: number
  }>,
  transactions: Array<{
    value: number,
  }>
};

class App extends Component<PropsType, StateType> {

  state = {
    tokens: [
      { address: '0xb8c77482e45f1f44de1745f52c74426c631bdd52', name: 'BNB', decimals: 18 },
      { address: '0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2', name: 'MKR', decimals: 18 },
      { address: '0xd26114cd6ee289accf82350c8d8487fedb8a0c07', name: 'OMG', decimals: 18 },
      { address: '0xe41d2489571d322189246dafa5ebde1f4699f498', name: 'ZRX', decimals: 18 },
      { address: '0x0d8775f648430679a709e98d2b0cb6250d2887ef', name: 'BAT', decimals: 18 },
    ],
    transactions: [],
  }

  handleTokenAdd = (address: string, name: string, decimals: number) => {
    const newTokens = [...this.state.tokens, { address, name, decimals }];
    this.setState({
      tokens: newTokens,
      transactions: this.state.transactions,
    });
  }

  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <div className="App">
          <AppBar position="static">
            <Toolbar>
              <Button color="inherit">Transactions</Button>
              <Button color="inherit">Manage Erc20</Button>
            </Toolbar>
          </AppBar>
          <div className="router">
            <Tokens tokens={this.state.tokens} onTokenAdd={this.handleTokenAdd} />
          </div>

        </div>
      </React.Fragment>
    );
  }
}

export default App;
