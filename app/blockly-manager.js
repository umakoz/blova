var Blockly = require('node-blockly/js');

const xmlManager = require('./xml-manager')

const generate = async fileName => {
  try {
    let xmlText = await xmlManager.load(fileName);
    let xml = Blockly.Xml.textToDom(xmlText);
    // Create a headless workspace.
    let workspace = new Blockly.Workspace();
    Blockly.Xml.domToWorkspace(xml, workspace);
    let code = Blockly.JavaScript.workspaceToCode(workspace);
    return code;
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  generate: generate
}