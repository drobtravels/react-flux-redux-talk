import React, { Component } from 'react';
import { Panel, ListGroup, ListGroupItem } from 'react-bootstrap';

export class TextMessageList extends Component {

  messageNodes = () => {
    return this.props.messages.map( (message) => {
      return (
        <ListGroupItem key={message.id} header={message.from}>
          <span>{message.body}</span>
        </ListGroupItem>
      )
    });
  };

  render() {
    return(
      <Panel header={<h2>Text Messages</h2>}>
        {this.messageNodes()}
      </Panel>
    )
  }
}
