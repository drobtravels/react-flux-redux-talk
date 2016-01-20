import React, { Component } from 'react';
import { Panel, ListGroup } from 'react-bootstrap';
import { TextMessage } from 'components/TextMessage';

export class TextMessageList extends Component {

  constructor(props) {
    super(props);
    this.state = { messages: [] };
  }

  componentDidMount() {
    this.unsubscribe = this.props.store.subscribe(this.updateMessages);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  updateMessages = () => {
    this.setState({ messages: this.props.store.getState().messages });
  };

  messageNodes = () => {
    return this.state.messages.map( (message) => {
      return <TextMessage key={message.id} {...message} store={this.props.store} />
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
