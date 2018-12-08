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
import Button from '@material-ui/core/Button';
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
    tokenName: string,
    date: Date,
  }>,
  onTransactionAdd: (receiver: string,
    date: Date,
    count: number,
    period: number,
    value: number,
    tokenName: string,
  ) => void,
  onTransactionDelete: (Date, string) => void,
};

type StateType = {
  receiver: string,
  date: Date,
  count: number,
  period: number,
  value: number,
  tokenName: ?string,
};



const createDefaultState = (name: ?string): StateType => ({
  receiver: '0x0',
  date: new Date(),
  count: 10,
  period: 1,
  value: 10000,
  tokenName: name,
});

class Transactions extends Component<PropsType, StateType> {

  constructor(props: PropsType) {
    super(props);
    const transactions = props.tokens[0];
    const name = transactions ? transactions.name : null;
    this.state = createDefaultState(name);
  }

  handleChange = (name: string, value: any) => {
    const newState = { ...this.state, [name]: value };
    this.setState(newState);
  }

  handleAdd = () => {
    this.props.onTransactionAdd(this.state.receiver, this.state.date, this.state.count, this.state.period, this.state.value, this.state.tokenName);
  }

  render() {
    const txs = this.props.transactions.sort((a, b) => {
      if (a.date < b.date) {
        return -1;
      }
      if (a.date === b.date) {
        return 0;
      }
      return 1;
    });
    return (
      <div className="Transactions">
        <h4>Schedule Erc20 transactions</h4>
        <form action="/" noValidate autoComplete="off" className="form">
          <div className="container">
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
          </div>
          <div className="container">
            <TextField
              label="Receiver address"
              className="field"
              name="receiver"
              value={this.state.receiver}
              onChange={e => this.handleChange(e.target.name, e.target.value)}
              margin="normal"
            />
            <FormControl className="field">
              <InputLabel shrink htmlFor="age-label-placeholder">
                Token
              </InputLabel>
              <Select
                value={this.state.tokenName}
                onChange={e => this.handleChange(e.target.name, e.target.value)}
                input={<Input name="tokenName" />}
                displayEmpty
                name="tokenName"
              >
                {this.props.tokens.map(token => (
                  <MenuItem value={token.name}>{token.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="Total value"
              className="field"
              name="value"
              value={this.state.value}
              onChange={e => this.handleChange(e.target.name, e.target.value)}
              margin="normal"
            />
          </div>
          <Fab color="primary" aria-label="Add" onClick={this.handleAdd}>
            <AddIcon />
          </Fab>
        </form>


        <div className="file">
          <h5>Or upload a file</h5>
          <input
            accept="image/*"
            style={{ display: 'none' }}
            id="raised-button-file"
            multiple
            type="file"
          />
          <label htmlFor="raised-button-file">
            <Button variant="raised" component="span">
              Upload a file
          </Button>
          </label>
        </div>

        <h4>Transactions</h4>
        <Table aria-labelledby="tableTitle" className="table">
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Receiver address</TableCell>
              <TableCell>Token</TableCell>
              <TableCell>Value</TableCell>
              <TableCell>Status</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {txs.map(transactions => (
              <TableRow>
                <TableCell>{transactions.date.toISOString().slice(0, 10)}</TableCell>
                <TableCell>{transactions.address}</TableCell>
                <TableCell>{transactions.tokenName}</TableCell>
                <TableCell>{transactions.value}</TableCell>
                <TableCell>{transactions.date > Date.now() ? 'scheduled' : 'done'}</TableCell>
                {(transactions.date > Date.now()) &&
                  (
                    <TableCell>
                      <Fab
                        color="secondary"
                        size="small"
                        aria-label="Add"
                        className="delete-button"
                        onClick={() => this.props.onTransactionDelete(transactions.date, transactions.address)}
                      >
                        <Icon>close_icon</Icon>
                      </Fab>
                    </TableCell>
                  )
                }
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }
}

export default Transactions;
