import React, { Component } from "react";

import "./Emote.css";

export default class Emote extends Component {
  constructor(props) {
    super(props);
    this.emote = this.props.emote;
    this.templateUrl = this.props.template;
    this.onEmoteClicked = this.onEmoteClicked.bind(this);
  }
  render() {
    const emote = this.emote;
    const url = this.getEmoteUrl(this.props.scale);
    return (
      <div
        className="col-md-2 text-center mt-2 mb-2"
        onClick={this.onEmoteClicked}
      >
        <div className="emote-item">
          <img src={url} alt={emote.name} />
          <small className="d-block">{emote.name}</small>
        </div>
      </div>
    );
  }
  getEmoteUrl(scale) {
    return this.templateUrl
      .replace("{{id}}", this.emote.id)
      .replace("{{format}}", this.getEmoteFormat(this.emote.format))
      .replace("{{theme_mode}}", "light")
      .replace("{{scale}}", scale);
  }
  getEmoteFormat(format) {
    return format.indexOf("animated") >= 0 ? "animated" : "static";
  }
  onEmoteClicked() {
    const emote = this.emote;
    const format = this.getEmoteFormat(this.emote.format);
    const nameToDownload =
      emote.name.replace(".", "_") + (format === "animated" ? "gif" : ".png");
    const urlToDownload = emote.images.url_4x;
    fetch(urlToDownload, {
      method: "GET",
      headers: {}
    })
      .then((response) => {
        response.arrayBuffer().then(function (buffer) {
          const url = window.URL.createObjectURL(new Blob([buffer]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", nameToDownload); //or any other extension
          document.body.appendChild(link);
          link.click();
          link.remove();
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
