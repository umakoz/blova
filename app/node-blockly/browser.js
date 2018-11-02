var Blockly = require('../../ui/lib/blockly_compressed_browser');

Blockly.setLocale = function(locale) {
  Blockly.Msg = Object.assign(locale, Blockly.Msg);
  Blockly.Msg = Blockly.Msg();
}

Blockly.utils.getMessageArray_ = function () {
  return Blockly.Msg
}

Blockly.setLocale(require('../../ui/lib/i18n/en'))

Blockly.Blocks = Object.assign(Blockly.Blocks, require('../../ui/lib/blocks_compressed_browser')(Blockly));

Blockly.JavaScript = require('../../ui/lib/javascript_compressed')(Blockly);
Blockly.Lua = require('../../ui/lib/lua_compressed')(Blockly);
Blockly.Dart = require('../../ui/lib/dart_compressed')(Blockly);
Blockly.PHP = require('../../ui/lib/php_compressed')(Blockly);
Blockly.Python = require('../../ui/lib/python_compressed')(Blockly);

module.exports = Blockly;