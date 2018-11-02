  Blockly.Blocks['lists_create_with_handler'] = {
		  /**
		   * Mutator block for adding items.
		   * @this Blockly.Block
		   */
		  init: function() {
		    this.setColour(Blockly.Msg['LISTS_HUE']);
		    this.appendDummyInput()
		        .appendField("handler");
		    this.setPreviousStatement(true);
		    this.setNextStatement(true);
		    this.setTooltip(Blockly.Msg['LISTS_CREATE_WITH_ITEM_TOOLTIP']);
		    this.contextMenu = false;
		  }
		};
  
  Blockly.Blocks['clova'] = {
		  /**
		   * Block for creating a list with any number of elements of any type.
		   * @this Blockly.Block
		   */
		  init: function() {
		    this.setHelpUrl(Blockly.Msg['LISTS_CREATE_WITH_HELPURL']);
		    this.setColour(Blockly.Msg['LISTS_HUE']);
		    this.itemCount_ = 1;
		    this.updateShape_();
		    this.setOutput(true, 'Array');
		    this.setMutator(new Blockly.Mutator(['lists_create_with_handler']));
		    this.setTooltip(Blockly.Msg['LISTS_CREATE_WITH_TOOLTIP']);
		  },
		  /**
		   * Create XML to represent list inputs.
		   * @return {!Element} XML storage element.
		   * @this Blockly.Block
		   */
		  mutationToDom: function() {
		    var container = document.createElement('mutation');
		    container.setAttribute('handler', this.itemCount_);
		    return container;
		  },
		  /**
		   * Parse XML to restore the list inputs.
		   * @param {!Element} xmlElement XML storage element.
		   * @this Blockly.Block
		   */
		  domToMutation: function(xmlElement) {
		    this.itemCount_ = parseInt(xmlElement.getAttribute('handler'), 10);
		    this.updateShape_();
		  },
		  /**
		   * Populate the mutator's dialog with this block's components.
		   * @param {!Blockly.Workspace} workspace Mutator's workspace.
		   * @return {!Blockly.Block} Root block in mutator.
		   * @this Blockly.Block
		   */
		  decompose: function(workspace) {
		    var containerBlock = workspace.newBlock('lists_create_with_container');
		    containerBlock.initSvg();
		    var connection = containerBlock.getInput('STACK').connection;
		    for (var i = 0; i < this.itemCount_; i++) {
		      var itemBlock = workspace.newBlock('lists_create_with_handler');
		      itemBlock.initSvg();
		      connection.connect(itemBlock.previousConnection);
		      connection = itemBlock.nextConnection;
		    }
		    return containerBlock;
		  },
		  /**
		   * Reconfigure this block based on the mutator dialog's components.
		   * @param {!Blockly.Block} containerBlock Root block in mutator.
		   * @this Blockly.Block
		   */
		  compose: function(containerBlock) {
		    var itemBlock = containerBlock.getInputTargetBlock('STACK');
		    // Count number of inputs.
		    var connections = [];
		    while (itemBlock) {
		      connections.push(itemBlock.valueConnection_);
		      itemBlock = itemBlock.nextConnection &&
		          itemBlock.nextConnection.targetBlock();
		    }
		    // Disconnect any children that don't belong.
		    for (var i = 0; i < this.itemCount_; i++) {
		      var connection = this.getInput('Handler' + i).connection.targetConnection;
		      if (connection && connections.indexOf(connection) == -1) {
		        connection.disconnect();
		      }
		    }
		    this.itemCount_ = connections.length;
		    this.updateShape_();
		    // Reconnect any child blocks.
		    for (var i = 0; i < this.itemCount_; i++) {
		      Blockly.Mutator.reconnect(connections[i], this, 'Handler' + i);
		    }
		  },
		  /**
		   * Store pointers to any connected child blocks.
		   * @param {!Blockly.Block} containerBlock Root block in mutator.
		   * @this Blockly.Block
		   */
		  saveConnections: function(containerBlock) {
		    var itemBlock = containerBlock.getInputTargetBlock('STACK');
		    var i = 0;
		    while (itemBlock) {
		      var input = this.getInput('Handler' + i);
		      itemBlock.valueConnection_ = input && input.connection.targetConnection;
		      i++;
		      itemBlock = itemBlock.nextConnection &&
		          itemBlock.nextConnection.targetBlock();
		    }
		  },
		  /**
		   * Modify this block to have the correct number of inputs.
		   * @private
		   * @this Blockly.Block
		   */
		  updateShape_: function() {
		    if (this.itemCount_ && this.getInput('EMPTY')) {
		      this.removeInput('EMPTY');
		    } else if (!this.itemCount_ && !this.getInput('EMPTY')) {
		      this.appendDummyInput('EMPTY')
		          .appendField(Blockly.Msg['LISTS_CREATE_EMPTY_TITLE']);
		    }
		    // Add new inputs.
		    for (var i = 0; i < this.itemCount_; i++) {
		      if (!this.getInput('Handler' + i)) {
		        var input = this.appendValueInput('Handler' + i);
		        if (i == 0) {
		          input.appendField("Clova");
		        }
		      }
		    }
		    // Remove deleted inputs.
		    while (this.getInput('Handler' + i)) {
		      this.removeInput('Handler' + i);
		      i++;
		    }
		  }
		};

  Blockly.Blocks['clova_handler'] = {
		  init: function() {
		    this.appendValueInput("Intent")
		        .setCheck("String")
		        .setAlign(Blockly.ALIGN_CENTRE)
		        .appendField("Intent");
		    this.appendValueInput("Say")
		        .setCheck("String")
		        .setAlign(Blockly.ALIGN_CENTRE)
		        .appendField("Say");
		    this.setInputsInline(true);
		    this.setOutput(true, null);
		    this.setColour(120);
		 this.setTooltip("");
		 this.setHelpUrl("");
		  }
		};
  
  Blockly.Blocks['clova1'] = {
		  init: function() {
		    this.appendStatementInput("Handler")
		        .setCheck("clova_handler")
		        .appendField("Clova Handler");
		    this.setInputsInline(true);
		    this.setColour(230);
		 this.setTooltip("");
		 this.setHelpUrl("");
		  }
		};
  
  Blockly.Blocks['js_function_expression'] = {
		    /**
		     * Block for redering a function expression.
		     * @this Blockly.Block
		     */
		    init: function() {
		        this.setColour(290);
		        this.appendDummyInput()
		            .appendField("function");
		        this.appendValueInput('NAME');
		        this.appendValueInput('PARAM0')
		            .appendField("(");
		        this.appendDummyInput('END')
		            .appendField(")");
		        this.appendStatementInput('STACK');
		        this.setInputsInline(true);

		        this.setTooltip('Function expression.');


		        this.setOutput(true);

		    }
		};