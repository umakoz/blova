const clovaSdk = require('@line/clova-cek-sdk-nodejs');
const blocklyManager = require('./blockly-manager');

var launchAction = null;
var intentActions = {};
var endAction = null;

var responseHelper = null;

const setup = async (myResponseHelper, xmlFileName) => {
  responseHelper = myResponseHelper;
  let code = await blocklyManager.generate(xmlFileName);
  eval(code);
};

const initClovaAction = (myLaunchAction, addIntentActionsHandler, myEndAction) => {
  launchAction = myLaunchAction;
  intentActions = {};
  addIntentActionsHandler();
  endAction = myEndAction;
};

const addIntent = (name, handler)=> {
  intentActions[name] = handler;
};

const say = (phrase) => {
  console.log('say[' + phrase + ']');
  responseHelper.setSimpleSpeech(
    clovaSdk.SpeechBuilder.createSpeechText(phrase)
  );    
};

const setSessionAttribute = (key, value) => {
  console.log('setSessionAttribute[' + key + '][' + value + ']');
  responseHelper.setSessionAttributes({[key]: value});
};

const sessionAttribute = (key) => {
  console.log('sessionAttribute[' + key + ']');
  let session = responseHelper.getSessionAttributes()
  return session[key];
};

const endSession = () => {
  console.log('endSession');
  responseHelper.endSession();
};

const executeLaunch = async (myResponseHelper, xmlFileName) => {
  await setup(myResponseHelper, xmlFileName);
  console.log('executeLaunch');
  launchAction();
};

const executeIntent = async (myResponseHelper, xmlFileName) => {
  await setup(myResponseHelper, xmlFileName);
  let intentName = responseHelper.getIntentName();
  console.log('intentName[' + intentName + ']');
  if (intentName in intentActions) {
    intentActions[intentName]();
  } else {
    say('なんなの？');
  }
};

const executeEnd = async (myResponseHelper, xmlFileName) => {
  await setup(myResponseHelper, xmlFileName);
  console.log('executeEnd');
  endAction();
};

module.exports = {
  executeLaunch: executeLaunch,
  executeIntent: executeIntent,
  executeEnd: executeEnd
}
