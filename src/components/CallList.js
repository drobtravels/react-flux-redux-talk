import React, { Component } from 'react';
import { Call } from 'components/Call';
import { Panel, ListGroup} from 'react-bootstrap';

export class CallList extends Component {

  callNodes = () => {
    return this.props.calls.map((call) => {
      return <Call key={call.id} {...call} />
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
