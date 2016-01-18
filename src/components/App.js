import React, { Component } from 'react';
import { CallList } from 'components/CallList';
import { TextMessageList } from 'components/TextMessageList';
import { Grid, Row, Col } from 'react-bootstrap';
import { API } from 'application/api'

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      calls: [],
      messages: []
    };
  }

  componentDidMount() {
    this.loadData();
  }

  loadData = () => {
    this.setState({
      calls: API.getCalls(),
      messages: API.getMessages()
    });
  };

  render() {
    return (
      <Grid>
        <h1> Calls Application </h1>
        <Row>
          <Col xs={3}>
            <CallList calls={this.state.calls} sendText={this.newText} />
          </Col>
          <Col xs={8}>
            <TextMessageList messages={this.state.messages} />
          </Col>
        </Row>
      </Grid>
    );
  }
}
