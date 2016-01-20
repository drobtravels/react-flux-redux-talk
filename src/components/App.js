import React, { Component } from 'react';
import { CallList } from 'components/CallList';
import { TextMessageList } from 'components/TextMessageList';
import { Grid, Row, Col } from 'react-bootstrap';
import { fetchCalls, fetchMessages } from 'myRedux/actions';

export class App extends Component {

  componentDidMount() {
    var store = this.props.store;
    store.dispatch(fetchCalls());
    store.dispatch(fetchMessages());
  }

  render() {
    return (
      <Grid>
        <h1> Calls Application </h1>
        <Row>
          <Col xs={3}>
            <CallList store={this.props.store} />
          </Col>
          <Col xs={8}>
            <TextMessageList store={this.props.store} />
          </Col>
        </Row>
      </Grid>
    );
  }
}
