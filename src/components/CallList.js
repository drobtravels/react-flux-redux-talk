import React, { Component } from 'react';
import { Call } from 'components/Call';
import { Panel, ListGroup} from 'react-bootstrap';

export class CallList extends Component {

  constructor(props) {
    super(props);
    this.state = { calls: [] };
  }

  componentDidMount() {
    this.unsubscribe = this.props.store.subscribe(this.updateCalls);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  updateCalls = () => {
    this.setState({ calls: this.props.store.getState().calls });
  };

  callNodes = () => {
    return this.state.calls.map((call) => {
      return <Call
        {...call}
        key={call.id}
        store={this.props.store}
       />
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
