const clova = require('@line/clova-cek-sdk-nodejs');
const express = require('express');
const bodyParser = require('body-parser');
const action = require('../action')
const APPLICATION_ID = process.env.APPLICATION_ID;

const app = new express();

const launchHandler = async responseHelper => {
  action.launchAction(responseHelper)
};

const intentHandler = async responseHelper => {
  action.intentAction(responseHelper)
};

const sessionEndedHandler = async responseHelper => {
  action.sessionEndedAction(responseHelper)
};

const clovaHandler = clova.Client
  .configureSkill()
  .onLaunchRequest(launchHandler)
  .onIntentRequest(intentHandler)
  .onSessionEndedRequest(sessionEndedHandler)
  .handle();

const clovaMiddleware = clova.Middleware({ applicationId: APPLICATION_ID });

// Use `clovaMiddleware` if you want to verify signature and applicationId.
app.post('/clova', clovaMiddleware, clovaHandler);

// Or you can simply use `bodyParser.json()` to accept any request without checking, e.g.,
// `app.post('/clova', bodyParser.json(), clovaHandler);`

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
