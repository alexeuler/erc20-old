// @flow

import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Icon from '@material-ui/core/Icon';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import './Transactions.scss';

type PropsType = {
  tokens: Array<{
    address: string,
    name: string,
    decimals: number
  }>,
  transactions: Array<{
    address: string,
    value: number,
    token_name: string,
    date: Date,
    status: string,
  }>,
};

type StateType = {
  date: Date,
  count: number,
  period: number,
  value: number,
  tokenAddress: ?string,
};

const createDefaultState = (address: ?string): StateType => ({
  date: new Date(),
  count: 10,
  period: 1,
  value: 10000,
  tokenAddress: address,
});

class Transactions extends Component<PropsType, StateType> {

  constructor(props: PropsType) {
    super(props);
    const transactions = props.tokens[0];
    const address = transactions ? transactions.address : null;
    this.state = createDefaultState(address);
  }

  handleChange = (name: string, value: any) => {
    const newState = { ...this.state, [name]: value };
    this.setState(newState);
  }

  handleAdd = () => {
  }

  render() {
    return (
      <div className="Transactions">
        <h4>Add ERC-20 transactions</h4>
        <form action="/" noValidate autoComplete="off" className="form">
          <TextField
            label="Start date"
            className="field"
            type="date"
            name="date"
            value={this.state.date.toISOString().slice(0, 10)}
            onChange={e => this.handleChange(e.target.name, new Date(e.target.value))}
            margin="normal"
          />
          <TextField
            label="Number of payments"
            className="field"
            name="count"
            type="number"
            value={this.state.count}
            onChange={e => this.handleChange(e.target.name, e.target.value)}
            margin="normal"
          />
          <TextField
            label="Payment period (days)"
            className="field"
            name="period"
            type="number"
            value={this.state.period}
            onChange={e => this.handleChange(e.target.name, e.target.value)}
            margin="normal"
          />
          <FormControl className="field">
            <InputLabel shrink htmlFor="age-label-placeholder">
              Token
            </InputLabel>
            <Select
              value={this.state.tokenAddress}
              onChange={e => this.handleChange(e.target.name, e.target.value)}
              input={<Input name="tokenAddress" />}
              displayEmpty
              name="tokenAddress"
            >
              {this.props.tokens.map(token => (
                <MenuItem value={token.address}>{token.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Value"
            className="field"
            name="value"
            value={this.state.value}
            onChange={e => this.handleChange(e.target.name, e.target.value)}
            margin="normal"
          />
          <Fab color="primary" aria-label="Add" onClick={this.handleAdd}>
            <AddIcon />
          </Fab>
        </form>
        <br />
        <br />
        <h4>Transactions</h4>
        {/* <Table aria-labelledby="tableTitle" className="table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Contract address</TableCell>
              <TableCell>Decimals</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.transactions.map(transactions => (
              <TableRow>
                <TableCell>{transactions.date}</TableCell>
                <TableCell>{transactions.address}</TableCell>
                <TableCell>{transactions.decimals}</TableCell>
                <TableCell>
                  <Fab
                    color="secondary"
                    size="small"
                    aria-label="Add"
                    className="delete-button"
                    onClick={() => this.props.onTransactionDelete(transactions.address)}
                  >
                    <Icon>close_icon</Icon>
                  </Fab>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table> */}
      </div>
    );
  }
}

export default Transactions;
