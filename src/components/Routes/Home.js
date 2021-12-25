import React, { Component } from "react";
import Header from "../UI/Header";
import { Emotes } from "../Emotes/Emotes";

export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Header name="Home">
        <p>
          Welcome to my SPA built with{" "}
          <a
            href="https://facebook.github.io/react/"
            target="_blank"
            rel="noreferrer"
          >
            React
          </a>
          , <a href="https://nodejs.org/en/">Node.js</a>, and{" "}
          <a href="http://getbootstrap.com/">Bootstrap</a>
        </p>
        <p>
          Below you can find Twitch's global emotes. Try clicking on one to
          download it.
        </p>
        <Emotes global={true} />
      </Header>
    );
  }
}
