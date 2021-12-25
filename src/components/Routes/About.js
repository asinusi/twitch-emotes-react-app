import React, { Component } from "react";
import Header from "../UI/Header";

export class About extends Component {
  render() {
    return (
      <Header name="About">
        <p>
          This site was primarily made to practice React with a NodeJS backend
          and 100% inspired by{" "}
          <a
            href="https://www.twitchemotes.com"
            target="_blank"
            rel="noreferrer"
          >
            twitchemotes.com
          </a>
          .
        </p>
        <p>
          For more projects please visit my{" "}
          <a href="https://github.com/asinusi" target="_blank" rel="noreferrer">
            Github
          </a>
        </p>
      </Header>
    );
  }
}
