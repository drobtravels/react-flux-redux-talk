import React, { Component } from 'react';
import { CallList } from 'components/CallList';
import { TextMessageList } from 'components/TextMessageList';
import { Grid, Row, Col } from 'react-bootstrap';
import { API } from 'application/api'
import _ from 'lodash/fp';

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

  newText = (textInfo) => {
    this.setState({
      messages: _.concat(this.state.messages, {
        id: this.state.messages.length + 1,
        from: textInfo.from,
        number: textInfo.number,
        status: "draft"
      })
    });
  };

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
