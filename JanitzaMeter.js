// https://www.gridvis-energy.de/rest/1/projects/DemoProject/onlinevalues.json?value=1%3BActiveEnergy%3BSUM13&appendValueType=true&timeout=500&timeliness=60000

module.exports = function(RED) {
    function Receive(config) {
        RED.nodes.createNode(this,config);
        const axios = require("axios");
        const node = this;
        const storage = node.context();

        node.on('input', async function(msg) {
          //config.value = config.value.replaceAll(';','.');

          const url =config.server + "1/projects/" + config.project + "/onlinevalues.json?value="+encodeURIComponent(config.value)+"&appendValueType=true&timeout=500&timeliness=60000";
          console.log("URL",url);
          const res = await axios.get(url);
          msg.payload = res.data;
          const field = config.value.replaceAll(';','.');
          node.status({fill:'green',shape:"dot",text:msg.payload.value[field] +" "+msg.payload.valueType[field].unit});
          msg.topic = field;
          node.send(msg);
        });


    }
    RED.nodes.registerType("JanitzaMeter",Receive);
}
