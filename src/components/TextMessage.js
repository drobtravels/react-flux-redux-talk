import React, { Component } from 'react';
import { ListGroupItem } from 'react-bootstrap';

export class TextMessage extends Component {

  render() {
    return(
      <ListGroupItem header={this.props.from}>
        <span>{this.props.body}</span>
      </ListGroupItem>
    );
  }
}
