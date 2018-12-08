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
import TableSortLabel from '@material-ui/core/TableSortLabel';
import './Tokens.scss';

type PropsType = {
  tokens: Array<{
    address: string,
    name: string,
    decimals: number
  }>,
  onTokenAdd: (address: string, name: string, decimals: number) => void,
};
type StateType = {
  newTokenAddress: string,
  newTokenName: string,
  newTokenDecimals: number,
}

const defaultState = {
  newTokenAddress: '',
  newTokenName: '',
  newTokenDecimals: 18,
};

class Tokens extends Component<PropsType, StateType> {

  state = defaultState;

  handleAddressChange = (address: string) => {
    this.setState({ newTokenAddress: address });
  }

  handleNameChange = (name: string) => {
    this.setState({ newTokenName: name });
  }

  handleDecimalsChange = (decimals: number) => {
    this.setState({ newTokenDecimals: decimals });
  }

  handleAdd = () => {
    this.props.onTokenAdd(
      this.state.newTokenAddress,
      this.state.newTokenName,
      this.state.newTokenDecimals
    );
  }


  render() {
    return (
      <div className="Tokens">
        <h4>Add ERC-20 token</h4>
        <form action="/" noValidate autoComplete="off" className="form">
          <TextField
            label="Token name"
            fullWidth
            className="field"
            value={this.state.newTokenName}
            onChange={e => this.handleNameChange(e.target.value)}
            margin="normal"
          />
          <TextField
            label="Token address"
            className="field"
            fullWidth
            value={this.state.newTokenAddress}
            onChange={e => this.handleAddressChange(e.target.value)}
            margin="normal"
          />

          <TextField
            label="Token decimals"
            fullWidth
            className="field"
            value={this.state.newTokenDecimals}
            onChange={e => this.handleDecimalsChange(parseInt(e.target.value, 10))}
            type="number"
            margin="normal"
          />
          <Fab color="primary" aria-label="Add" onClick={this.handleAdd}>
            <AddIcon />
          </Fab>
        </form>
        <br />
        <br />
        <h4>Tokens</h4>
        <Table aria-labelledby="tableTitle">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Decimals</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.tokens.map(token => (
              <TableRow>
                <TableCell>{token.name}</TableCell>
                <TableCell>{token.address}</TableCell>
                <TableCell>{token.decimals}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }
}

export default Tokens;
