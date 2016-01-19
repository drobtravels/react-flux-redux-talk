import React, { Component } from 'react';
import { ListGroupItem, Input, Button, Row } from 'react-bootstrap';
import { Icon } from 'components/Icon';

export class TextMessage extends Component {

  textBody = () => {
    if (this.props.status === "draft") {
      return (
        <Row>
          <Input
            type="textarea"
            placeholder="Message text"
            wrapperClassName="col-xs-10" />
          <Button bsStyle="primary">
            <Icon type="paper-plane-o"/>
          </Button>
        </Row>
      )
    } else {
      return <span>{this.props.body}</span>
    }
  };

  render() {
    return(
      <div className="list-group-item">
        <h4 className="list-group-item-heading">{this.props.from}</h4>
        {this.textBody()}
      </div>
    );
  }
}
