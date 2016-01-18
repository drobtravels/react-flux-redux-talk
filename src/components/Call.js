import React, { Component } from 'react';
import { ListGroupItem } from 'react-bootstrap';

export class Call extends Component {

  render() {
    return (
      <ListGroupItem header={this.props.from} >
        <span>{this.props.number}</span>
      </ListGroupItem>
    );
  }
}
