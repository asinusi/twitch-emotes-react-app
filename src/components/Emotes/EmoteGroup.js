import React from "react";
import { Row } from "reactstrap";
import Emote from "./Emote";

const EmoteGroup = (props) => {
  return (
    <div>
      <h3>{props.group}</h3>
      <Row>
        {props.emotes.map((emote) => (
          <Emote
            key={emote.id}
            emote={emote}
            scale={props.scale}
            template={props.template}
          />
        ))}
      </Row>
    </div>
  );
};

export default EmoteGroup;
