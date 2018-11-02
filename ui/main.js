(function() {
    let workspace = Blockly.inject('blocklyArea', {
        media: './blockly/media/',
        toolbox: document.getElementById('toolbox')
    });

    function get(url) {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest()
            xhr.open("GET", url, true)
            xhr.onload = () => {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    resolve(xhr.response);
                } else {
                    reject(new Error(xhr.statusText))
                }
            }
            xhr.onerror = () => {
                reject(new Error(xhr.statusText))
            }
            xhr.send(null)
        });
    }

    function post(url, data) {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest()
            xhr.open("POST", url, true)
            xhr.onload = () => {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    resolve();
                } else {
                    reject(new Error(xhr.statusText))
                }
            }
            xhr.onerror = () => {
                reject(new Error(xhr.statusText))
            }
            xhr.send(data)
        });
    }

    function saveXml() {
        let xmlDom = Blockly.Xml.workspaceToDom(workspace);
        let xmlText = Blockly.Xml.domToText(xmlDom);
        return post('/xml', xmlText)
    }

    function loadXml() {
        return get('/xml')
    }

    document.addEventListener('DOMContentLoaded', () => {
        loadXml()
            .then((xmlText) => {
                let xmlDom = Blockly.Xml.textToDom(xmlText)
                Blockly.Xml.domToWorkspace(xmlDom, workspace)
            })
            .catch((error) => {
                // TODO show toast
                window.alert("Failed to load xml:" + error)
                console.log(error)
            })
    })
    document.getElementById("saveButton").addEventListener('click', () => {
        saveXml()
            .then(() => {
                // TODO show toast
            })
            .catch((error) => {
                // TODO show toast
                window.alert("Failed to save xml:" + error)
                console.log(error)
            })
    });
})()