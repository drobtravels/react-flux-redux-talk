import React, { Component } from 'react';
import { Panel, ListGroup, ListGroupItem } from 'react-bootstrap';

export class CallList extends Component {

  callNodes = () => {
    return this.props.calls.map((call) => {
      return (
        <ListGroupItem key={call.id} header={call.from} >
          <span>{call.number}</span>
        </ListGroupItem>
      )
    });
  };

  render() {
    return(
      <Panel header={<h2>Calls</h2>} >
        <ListGroup>
          {this.callNodes()}
        </ListGroup>
      </Panel>
    )
  }
}
