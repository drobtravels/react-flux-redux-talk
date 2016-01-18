import React, { Component } from 'react';
import { Panel, ListGroup } from 'react-bootstrap';
import { TextMessage } from 'components/TextMessage';

export class TextMessageList extends Component {

  messageNodes = () => {
    return this.props.messages.map( (message) => {
      return <TextMessage key={message.id} {...message} />
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
