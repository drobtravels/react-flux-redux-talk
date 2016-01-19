import React, { Component } from 'react';
import { Panel, ListGroup } from 'react-bootstrap';
import { TextMessage } from 'components/TextMessage';

export class TextMessageList extends Component {

  constructor(props) {
    super(props);
    this.state = { messages: [] };
  }

  componentDidMount() {
    this.props.flux.store('MessageStore').on('change', this.updateMessages)
  }

  componentWillUnmount() {
    this.props.flux.store('MessageStore').removeListener('change', this.updateMessages);
  }

  updateMessages = () => {
    this.setState({ messages: this.props.flux.store('MessageStore').getMessages() });
  };

  messageNodes = () => {
    return this.state.messages.map( (message) => {
      return <TextMessage key={message.id} {...message} flux={this.props.flux} />
    });
  };

  render() {
    return(
      <Panel header={<h2>Text Messages</h2>}>
        <ListGroup>
          {this.messageNodes()}
        </ListGroup>
      </Panel>
    )
  }
}
