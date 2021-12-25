import React from "react";
import { CardTitle } from "reactstrap";

import "./ChannelHeader.css";

const ChannelHeader = (props) => {
  return (
    <CardTitle>
      <a
        href={props.url}
        target="_blank"
        rel="noreferrer"
        className="channel-avatar-link"
      >
        <div className="channel-avatar">
          <img className="channel-avatar-img" src={props.image} />
        </div>
      </a>

      <h3 className="channel-title ml-3">
        <a href={props.url} target="_blank" rel="noreferrer">
          {props.name}
        </a>
      </h3>
    </CardTitle>
  );
};

export default ChannelHeader;
