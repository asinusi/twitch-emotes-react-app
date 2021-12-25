import React from "react";
import ChannelHeader from "./ChannelHeader";
import EmoteTier from "./EmoteTier";
import { Card, CardBody } from "reactstrap";

const ChannelEmotes = (props) => {
  const { tiers } = props.emotes;
  return (
    <Card>
      <CardBody>
        <ChannelHeader
          name={props.channel.name}
          image={props.channel.image}
          url={props.channel.url}
        ></ChannelHeader>

        <hr className="my-4"></hr>
        {Object.keys(tiers).map((tier) => (
          <EmoteTier
            key={tier}
            tier={tier}
            emotes={tiers[tier]}
            scale={"2.0"}
            template={props.emotes.template}
          />
        ))}
      </CardBody>
    </Card>
  );
};

export default ChannelEmotes;
