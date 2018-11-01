const clova = require('@line/clova-cek-sdk-nodejs');

const launchAction = responseHelper => {
  responseHelper.setSimpleSpeech(
    clova.SpeechBuilder.createSpeechText('ノックノック')
  );
  responseHelper.setSessionAttributes({})
};

const intentAction = responseHelper => {
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
      }
      break;
    default:
      responseHelper.setSimpleSpeech(
        clova.SpeechBuilder.createSpeechText('なんなん')
      );
      break;
  }
};
const sessionEndedAction = responseHelper => {
};

exports = {
  launchAction,
  intentAction,
  sessionEndedAction
}