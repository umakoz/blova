Blockly.defineBlocksWithJsonArray([  // BEGIN JSON EXTRACT
	{
		"type": "clova",
		"message0": "Clova %1 Launch %2 Intents %3 End %4",
		"args0": [
			{
				"type": "input_dummy"
			},
			{
				"type": "input_statement",
				"name": "launch"
			},
			{
				"type": "input_statement",
				"name": "intents",
				"check": "clova_intent"
			},
			{
				"type": "input_statement",
				"name": "end"
			}
		],
		"inputsInline": false,
		"colour": 120,
		"tooltip": "",
		"helpUrl": ""
	},
	{
		"type": "clova_intent",
		"message0": "Intent %1 %2 %3",
		"args0": [
			{
				"type": "field_input",
				"name": "intent_name",
				"text": "name"
			},
			{
				"type": "input_dummy"
			},
			{
				"type": "input_statement",
				"name": "intents"
			}
		],
		"previousStatement": "clova_intent",
		"nextStatement": "clova_intent",
		"colour": 240,
		"tooltip": "",
		"helpUrl": ""
	},
	{
		"type": "clova_say",
		"message0": "say %1",
		"args0": [
			{
				"type": "input_value",
				"name": "say"
			}
		],
		"previousStatement": null,
		"nextStatement": null,
		"colour": 330,
		"tooltip": "",
		"helpUrl": ""
	},
	{
		"type": "clova_set_session_attribute",
		"message0": "set session attribute %1 %2",
		"args0": [
			{
				"type": "field_input",
				"name": "key",
				"text": "key"
			},
			{
				"type": "input_value",
				"name": "session_attribute_key",
				"check": [
					"Boolean",
					"Number",
					"String"
				]
			}
		],
		"previousStatement": null,
		"nextStatement": null,
		"colour": 330,
		"tooltip": "",
		"helpUrl": ""
	},
	{
		"type": "clova_get_session_attribute",
		"message0": "session attribute %1",
		"args0": [
			{
				"type": "field_input",
				"name": "session_attribute_key",
				"text": "key"
			}
		],
		"output": null,
		"colour": 330,
		"tooltip": "",
		"helpUrl": ""
	}
]);