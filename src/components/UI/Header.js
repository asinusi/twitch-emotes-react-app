import React, { Component } from "react";

export default class Header extends Component {
  render() {
    return (
      <div className="mt-4">
        <h2>{this.props.name}</h2>
        <div className="border-top mt-2 mb-2 mb-4 w-25"></div>
        {this.props.children}
      </div>
    );
  }
}
