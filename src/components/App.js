import React, { Component } from 'react';
import { CallList } from 'components/CallList';
import { TextMessageList } from 'components/TextMessageList';
import { Grid, Row, Col } from 'react-bootstrap';

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
      <Grid>
        <h1> Calls Application </h1>
        <Row>
          <Col xs={6}>
            <CallList calls={this.state.calls} />
          </Col>
          <Col xs={6}>
            <TextMessageList messages={this.state.messages} />
          </Col>
        </Row>
      </Grid>
    );
  }
}
