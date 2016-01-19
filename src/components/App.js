import React, { Component } from 'react';
import { CallList } from 'components/CallList';
import { TextMessageList } from 'components/TextMessageList';
import { Grid, Row, Col } from 'react-bootstrap';

export class App extends Component {

  componentDidMount() {
    this.props.flux.actions.fetchCalls();
    this.props.flux.actions.fetchMessages();
  }

  render() {
    return (
      <Grid>
        <h1> Calls Application </h1>
        <Row>
          <Col xs={3}>
            <CallList flux={this.props.flux} />
          </Col>
          <Col xs={8}>
            <TextMessageList flux={this.props.flux} />
          </Col>
        </Row>
      </Grid>
    );
  }
}
