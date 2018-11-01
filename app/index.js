const clova = require('@line/clova-cek-sdk-nodejs');
const express = require('express');
const bodyParser = require('body-parser');
const APPLICATION_ID = process.env.APPLICATION_ID;

const app = new express();

const launchHandler = async responseHelper => {
  responseHelper.setSimpleSpeech(
    clova.SpeechBuilder.createSpeechText('ノックノック')
  );
  responseHelper.setSessionAttributes({})
};

const intentHandler = async responseHelper => {
  const intent = responseHelper.getIntentName();
  const sessionId = responseHelper.getSessionId();

  switch (intent) {
    case 'WhoIntent':
      responseHelper.setSimpleSpeech(
        clova.SpeechBuilder.createSpeechText('バービー')
      );
      responseHelper.setSessionAttributes({
        'said': true
      });
      break;
    case 'WhoReplyIntent':
      const session = responseHelper.getSessionAttributes()
      if (session['said']) {
        responseHelper.setSimpleSpeech(
          clova.SpeechBuilder.createSpeechText('バービーキュー！')
        );
      } else {
        responseHelper.setSimpleSpeech(
          clova.SpeechBuilder.createSpeechText('ううん')
        );
        launchHandler(responseHelper);
      }
      break;
    default:
      responseHelper.setSimpleSpeech(
        clova.SpeechBuilder.createSpeechText('なんなん')
      );
      break;
  }
};

const sessionEndedHandler = async responseHelper => {};

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
