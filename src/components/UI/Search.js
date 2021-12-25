import React, { Component } from "react";
import { Button, Form, FormGroup, InputGroup, Input } from "reactstrap";
import { BsSearch } from "react-icons/bs";

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = { channel: "", formIsValid: false };
  }
  render() {
    return (
      <Form onSubmit={this.onFormSubmit.bind(this)}>
        <FormGroup>
          <InputGroup>
            <Input
              placeholder="Search"
              type="search"
              onChange={this.onChannelUpdated.bind(this)}
              autoFocus
            />
            <Button
              type="submit"
              className="btn btn-primary"
              disabled={this.state.formIsValid}
            >
              <BsSearch />
            </Button>
          </InputGroup>
        </FormGroup>
      </Form>
    );
  }
  onFormSubmit(e) {
    e.preventDefault();
    this.props.onSearch(this.state.channel);
  }
  onChannelUpdated(e) {
    this.setState({ channel: e.target.value });
  }
}
