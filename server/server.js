const express = require("express");
const SpotifyWebApi = require("spotify-web-api-node");
const cors = require("cors");
const app = express();
app.use(cors());
app.post("/login", (req, res) => {
  const code = req.body.code;
  const SpotifyApi = new SpotifyWebApi({
    redirectUri: "http://localhost:3000",
    clientId: "16651bd42a0c48d3b4cd42eebce1ada0",
    clientSecret: "9b595b6224584db3ad15784d3327f4e8",
  });
  //Authorixation
  SpotifyApi.authorizationCodeGrant(code)
    .then((data) => {
      res.json({
        accessToken: data.body.access_token,
        refreshToken: data.body.refreshToken,
        expiresIn: data.body.expires_in,
      });
    })
    .catch(() => {
      res.sendStatus(400);
    });
});
app.listen(3001);
