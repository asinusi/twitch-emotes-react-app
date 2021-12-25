import React, { Component, useRef } from "react";
import Header from "../UI/Header";
import Search from "../UI/Search";
import {
  Button,
  Form,
  FormGroup,
  InputGroup,
  Input,
  InputGroupText,
} from "reactstrap";
import { Emotes } from "../Emotes/Emotes";
import { BsSearch } from "react-icons/bs";

export class Channels extends Component {
  constructor(props) {
    super(props);
    this.state = { emotes: null };
  }
  render() {
    return (
      <Header name="Channels">
        <Search onSearch={this.onSearch.bind(this)}></Search>
        {this.state.emotes}
      </Header>
    );
  }
  onSearch(channel) {
    if (channel.length === 0) {
      this.setState({ emotes: null });
    } else {
      this.setState({ emotes: <Emotes global={false} channel={channel} /> });
    }
  }
  // onChannelSubmit(e) {
  //   e.preventDefault();
  //   this.onChannelSearchClicked();
  // }
  // onChannelUpdated(e) {
  //   this.setState({ channel: e.target.value });
  // }
  // onChannelSearchClicked() {
  //   //Perform some validation before sending request to the server
  //   if (this.state.channel.length === 0) {
  //     this.setState(() => ({
  //       emotes: null,
  //     }));
  //   } else {
  //     this.setState((state, props) => ({
  //       emotes: <Emotes global={false} channel={state.channel} />,
  //     }));
  //   }
  // }
}
