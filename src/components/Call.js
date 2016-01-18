import React, { Component } from 'react';
import { ListGroupItem, Button, Row, Col } from 'react-bootstrap';
import { Icon } from 'components/icon';

export class Call extends Component {

  render() {
    return (
      <ListGroupItem header={this.props.from} >
        <span>{this.props.number}</span>
        <Button bsStyle="success" onClick={this.props.textBack} className="text-caller" >
          <Icon type="envelope"/>
        </Button>
      </ListGroupItem>
    );
  }
}
