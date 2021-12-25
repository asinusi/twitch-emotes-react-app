import React from "react";
import EmoteGroup from "./EmoteGroup";

const EmoteTier = (props) => {
  let tier = props.tier;
  if (tier.length === 0) {
    tier = "Follower Emotes";
  } else {
    tier += " Tier";
  }
  return (
    <EmoteGroup
      group={tier}
      emotes={props.emotes}
      scale={"2.0"}
      template={props.template}
    ></EmoteGroup>
  );
};

export default EmoteTier;
