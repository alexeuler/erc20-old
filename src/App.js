// @flow

import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Tokens from './Tokens';
import Transactions from './Transactions';
import './App.scss';

type PropsType = {};
type StateType = {
  tokens: Array<{
    address: string,
    name: string,
    decimals: number
  }>,
  transactions: Array<{
    address: string,
    value: number,
    tokenName: string,
    date: Date,
  }>,
  route: string,
};

const offsetDate = (date: Date, offset: number) => {
  return new Date(date.getTime() + 86400000 * offset);
  // const res = new Date();
  // res.setDate(date.getDate() + offset);
  // debugger
  // return res;
};

const createDefaultTransactions = () => {
  const date = new Date();
  const address = '0xea674fdde714fd979de3edf0f56aa9716b898ec8';
  return [
    {
      address,
      value: 100,
      tokenName: 'ZRX',
      date: offsetDate(date, -2),
    },
    {
      address,
      value: 100,
      tokenName: 'ZRX',
      date: offsetDate(date, -1),
    },
    {
      address,
      value: 100,
      tokenName: 'ZRX',
      date,
    },
    {
      address,
      value: 100,
      tokenName: 'ZRX',
      date: offsetDate(date, 1),
    },
    {
      address,
      value: 100,
      tokenName: 'ZRX',
      date: offsetDate(date, 2),
    },
    {
      address,
      value: 100,
      tokenName: 'ZRX',
      date: offsetDate(date, 3),
    },
  ];
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
    transactions: createDefaultTransactions(),
    route: 'transactions',
  }

  update = (newState: StateType) => {
    this.setState(newState);
  }

  handleTokenAdd = (address: string, name: string, decimals: number) => {
    const newTokens = [...this.state.tokens, { address, name, decimals }];
    this.update({
      tokens: newTokens,
      transactions: this.state.transactions,
      route: this.state.route,
    });
  }

  handleTokenDelete = (address: string) => {
    const newTokens = this.state.tokens.filter(token => token.address !== address);
    this.update({
      tokens: newTokens,
      transactions: this.state.transactions,
      route: this.state.route,
    });
  }

  handleTransactionsAdd = (receiver: string,
    date: Date,
    count: number,
    period: number,
    value: number,
    tokenName: string,
  ) => {
    const valuePerTx = value / count;
    const newTxs = [...this.state.transactions];
    for (let i = 0; i < count; i += 1) {
      newTxs.push({
        address: receiver,
        value: valuePerTx,
        tokenName,
        date: offsetDate(date, i * period),
      });
    }
    this.update({
      tokens: this.state.tokens,
      transactions: newTxs,
      route: this.state.route,
    });
  }


  handleTransactionsDelete = (date: Date, address: string) => {
    const newTxs = this.state.transactions.filter(tx => (tx.address !== address) || (tx.date !== date));
    this.update({
      tokens: this.state.tokens,
      transactions: newTxs,
      route: this.state.route,
    });
  }


  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <div className="App">
          <AppBar position="static">
            <Toolbar>
              <Button className={this.state.route === 'transactions' ? 'underlined' : ''} color="inherit" onClick={() => this.setState({ ...this.state, route: 'transactions' })}>Transactions</Button>
              <Button className={this.state.route === 'tokens' ? 'underlined' : ''} color="inherit" onClick={() => this.setState({ ...this.state, route: 'tokens' })}>Manage Erc20 Tokens</Button>
            </Toolbar>
          </AppBar>
          <div className="router">
            {this.state.route === 'transactions' && (
              <Transactions
                tokens={this.state.tokens}
                transactions={this.state.transactions}
                onTransactionDelete={this.handleTransactionsDelete}
                onTransactionAdd={this.handleTransactionsAdd}
              />
            )}
            {this.state.route === 'tokens' && (
              <Tokens
                tokens={this.state.tokens}
                onTokenAdd={this.handleTokenAdd}
                onTokenDelete={this.handleTokenDelete}
              />
            )}
          </div>

        </div>
      </React.Fragment>
    );
  }
}

export default App;
