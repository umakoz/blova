Blockly.JavaScript['clova'] = function(block) {
  var statements_launch = Blockly.JavaScript.statementToCode(block, 'launch');
  var statements_intents = Blockly.JavaScript.statementToCode(block, 'intents');
  var statements_end = Blockly.JavaScript.statementToCode(block, 'end');
  var code = '';
  code += 'clova(\n';
  code += '{\n' + statements_launch + '},\n';
  code += '{\n' + statements_intents + '},\n';
  code += '{\n' + statements_end + '}\n';
  code += ');\n';
  return code;
};

Blockly.JavaScript['clova_intent'] = function(block) {
  var text_intent_name = Blockly.JavaScript.quote_(block.getFieldValue('intent_name'));
  var statements_intents = Blockly.JavaScript.statementToCode(block, 'intents');
  var code = '';
  code += 'intent(' + text_intent_name + ', {\n';
  code += statements_intents;
  code += '});\n';
  return code;
};

Blockly.JavaScript['clova_say'] = function(block) {
  var value_say = Blockly.JavaScript.valueToCode(block, 'say', Blockly.JavaScript.ORDER_NONE) || '\'\'';
  var code = 'say(' + value_say + ');\n';
  return code;
};

Blockly.JavaScript['clova_set_session_attribute'] = function(block) {
  var text_key = Blockly.JavaScript.quote_(block.getFieldValue('key'));
  var value_session_attribute_key = Blockly.JavaScript.valueToCode(block, 'session_attribute_key', Blockly.JavaScript.ORDER_NONE) || '\'\'';
  var code = 'setSessionAttribute(' +  text_key + ', ' + value_session_attribute_key + ');\n';
  return code;
};

Blockly.JavaScript['clova_get_session_attribute'] = function(block) {
  var text_session_attribute_key = Blockly.JavaScript.quote_(block.getFieldValue('session_attribute_key'));
  var code = 'sessionAttribute(' +  text_session_attribute_key + ');\n';
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};
