const Blockly = require('../../ui/lib/blockly_compressed');


Blockly.setLocale = function(locale) {
  Blockly.Msg = Object.assign(locale, Blockly.Msg);
  Blockly.Msg = Blockly.Msg();
}

Blockly.utils.getMessageArray_ = function () {
  return Blockly.Msg
}

Blockly.setLocale(require('../../ui/lib/i18n/en'))

Blockly.Blocks = Object.assign(Blockly.Blocks, require('../../ui/lib/blocks_compressed')(Blockly));

module.exports = Blockly;