const clova = require('@line/clova-cek-sdk-nodejs');
const express = require('express');
const bodyParser = require('body-parser');
const xmlManager = require('./xml-manager.js');
const action = require('../action');

const APPLICATION_ID = process.env.APPLICATION_ID;
const XML_FILE_NAME = 'action.xml';

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

// Receive an XML data generated by blockly UI.
app.post('/xml', bodyParser.text({type: '*/*'}), async function (req, res) {
  let result = await xmlManager.save(XML_FILE_NAME, req.body)
  if (result) {
    res.end();
  } else {
    res.status(500).end();
  }
});

// Send an XML data generated by blockly UI. (for debug)
app.get('/xml', async function (req, res) {
  let xml = await xmlManager.load(XML_FILE_NAME);
  if (xml !== false) {
    res.send(xml);
  } else {
    res.status(500).end();
  }
});

// Mount blockly UI.
app.use('/', express.static('ui'));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
