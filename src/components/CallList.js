import React, { Component } from 'react';
import { Call } from 'components/Call';
import { Panel, ListGroup} from 'react-bootstrap';

export class CallList extends Component {

  constructor(props) {
    super(props);
    this.state = { calls: [] };
  }

  componentDidMount() {
    this.props.flux.store('CallStore').on('change', this.updateCalls)
  }

  componentWillUnmount() {
    this.props.flux.store('CallStore').removeListener('change', this.updateCalls);
  }

  updateCalls = () => {
    this.setState({ calls: this.props.flux.store('CallStore').getCalls() });
  };

  callNodes = () => {
    return this.state.calls.map((call) => {
      return <Call
        {...call}
        key={call.id}
        flux={this.props.flux}
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
