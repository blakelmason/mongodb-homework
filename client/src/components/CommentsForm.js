//react
import React, { Component } from 'react';

//reactstrap
import { Button, Form, FormGroup, Input } from 'reactstrap';

//components
class CommentsForm extends Component {
  render() {
    return (
      <Form onSubmit={this.props.submitHandler}>
        <FormGroup className="mb-0">
          <Input type="textarea" name="text" value={this.props.newComment} onChange={this.props.inputHandler} />
          <Button className="mt-3 btn-sm btn-outline-success">
            Submit
          </Button>
        </FormGroup>
      </Form>
    )
  }
}

export default CommentsForm;