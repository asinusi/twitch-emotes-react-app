import React, { Component } from "react";
import { getFunctions, httpsCallable } from "firebase/functions";
import { Alert, Card, CardBody, CardTitle } from "reactstrap";
import Channel from "../../Channel";
import EmoteTier from "./EmoteTier";

import "./Emotes.css";
import GlobalEmotes from "./GlobalEmotes";
import ChannelEmotes from "./ChannelEmotes";

export class Emotes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emotes: null,
      template: null,
      loading: !props.global && props.channel.length > 0,
      channel: null,
      channelName: props.channel,
      error: null,
    };
    const functions = getFunctions();
    this.getEmotes = httpsCallable(functions, "emotes");
    this.getGlobalEmotes = httpsCallable(functions, "emotes/global");
  }

  componentDidMount() {
    if (this.props.global || this.state.channelName.length > 0) {
      this.populateEmotesData();
    }
  }
  componentDidUpdate(prevProps) {
    if (this.props.channel !== prevProps.channel) {
      this.setState({
        channelName: this.props.channel,
        loading: true,
      });
      this.populateEmotesData();
    }
  }
  render() {
    let emotes;
    if (this.state.channel) {
      emotes = this.state.channel.emotes;
    }
    let contents = this.state.loading ? (
      <p>
        <em>Loading...</em>
      </p>
    ) : (
      this.renderEmotes(emotes)
    );
    return <div>{contents}</div>;
  }
  renderEmotes(emotes) {
    if (this.state.error) {
      return (
        <Alert className="mt-3" color="warning">
          {this.state.error}
        </Alert>
      );
    } else if (
      emotes != null &&
      (emotes.tiers === null || Object.keys(emotes.tiers).length === 0)
    ) {
      return (
        <Alert className="mt-3" color="info">
          Channel does not have any emotes.
        </Alert>
      );
    } else if (emotes === undefined) {
      return null;
    } else if (emotes === null) {
      return (
        <Alert className="mt-3" color="info">
          Channel does not exist.
        </Alert>
      );
    } else if (this.props.global) {
      return (
        <GlobalEmotes
          emotes={this.state.channel.emotes.tiers}
          template={this.state.channel.emotes.template}
        ></GlobalEmotes>
      );
    } else {
      return (
        <ChannelEmotes
          channel={this.state.channel}
          emotes={emotes}
        ></ChannelEmotes>
      );
    }
  }

  async populateEmotesData() {
    if (this.props.global) {
      this.getGlobalEmotes()
        .then((data) => {
          this.handleEmotes(data);
        })
        .catch((e) => {
          this.handleError();
        });
    } else {
      this.getEmotes({ channel: this.props.channel })
        .then((data) => {
          this.handleEmotes(data);
        })
        .catch((e) => {
          this.handleError();
        });
    }
  }
  handleEmotes(result) {
    this.setState({
      channel: new Channel(result.data, this.props.global),
      loading: false,
      error: null,
    });
  }
  handleError() {
    this.setState({
      emotes: [],
      loading: false,
      error: "The requested channel could not be found.",
    });
  }
}
