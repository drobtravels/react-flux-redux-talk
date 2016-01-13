import React, { Component } from 'react';
import { CallList } from './CallList';
import { TextMessageList } from './TextMessageList';


export class App extends Component {
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
