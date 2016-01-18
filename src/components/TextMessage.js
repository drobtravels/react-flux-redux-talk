import React, { Component } from 'react';
import { ListGroupItem, Input, Button } from 'react-bootstrap';
import { Icon } from 'components/Icon';

export class TextMessage extends Component {

  textBody = () => {
    if (this.props.status === "draft") {
      return (
        <div>
          <Input
            type="textarea"
            placeholder="Message text"
            wrapperClassName="col-xs-10" />
          <Button bsStyle="primary">
            <Icon type="paper-plane-o"/>
          </Button>
        </div>
      )
    } else {
      return <span>{this.props.body}</span>
    }
  };

  render() {
    return(
      <ListGroupItem header={this.props.from}>
        {this.textBody()}
      </ListGroupItem>
    );
  }
}
