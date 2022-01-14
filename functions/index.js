const functions = require("firebase-functions");
const twitchApi = require("./twitchApi.js");
const express = require("express");
const cors = require("cors");
const channelApi = new twitchApi(
  functions.config().twitch.id,
  functions.config().twitch.secret
);
const app = express();

// Automatically allow cross-origin requests
app.use(cors({ origin: true }));

app.post("/global", (req, res) => {
  channelApi
    .getGlobalEmotes()
    .then((emotes) => {
      res.statusCode = 200;
      //Response needs to be wrapped in data object for the frontend sdk to work
      res.send({ data: emotes });
    })
    .catch(() => {
      res.statusCode = 500;
      res.send("Error occured while retrieving global emotes.");
    });
});
app.post("/", (req, res) => {
  const { data } = req.body;
  if (data === undefined) {
    res.status(400).send();
  } else {
    const { channel } = data;

    if (channel === undefined || channel.trim().length === 0) {
      res.status(400).send("A channel name is required.");
    } else {
      channelApi
        .getChannelEmotes(channel.trim())
        .then((channel) => {
          res.statusCode = 200;
          //Response needs to be wrapped in data object for the frontend sdk to work
          res.send({ data: channel });
        })
        .catch((error) => {
          const { data } = error.response;
          if (data.status === 400) {
            res.statusCode = 200;
            res.send(data);
          } else {
            res.statusCode = 400;
            res.send(message);
          }
        });
    }
  }
});

exports.emotes = functions.https.onRequest(app);
