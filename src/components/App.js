import React, { Component } from 'react';
import { CallList } from 'components/CallList';
import { TextMessageList } from 'components/TextMessageList';


export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      calls: [],
      messages: []
    };
  }
  
  render() {
    return (
      <div>
        <h1> Calls Application </h1>
        <CallList calls={this.state.calls} />
        <TextMessageList messages={this.state.messages} />
      </div>
    );
  }
}
