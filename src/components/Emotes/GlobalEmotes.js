import React from "react";
import EmoteGroup from "./EmoteGroup";
import { Card, CardBody } from "reactstrap";

const GlobalEmotes = (props) => {
  return (
    <Card>
      <CardBody>
        <EmoteGroup
          group={"Global Emotes"}
          emotes={props.emotes}
          scale={"1.0"}
          template={props.template}
        ></EmoteGroup>
      </CardBody>
    </Card>
  );
};

export default GlobalEmotes;
