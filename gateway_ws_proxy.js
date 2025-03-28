const Log = require("./log");
const config = require("./config");
const { handleJanusWsProxy } = require("./janus_proxy");

const log = new Log("[GatewayWsProxy]");

function initGatewayWsProxy(gatewayWss) {
  gatewayWss.on("connection", (clientWs, request) => {
    log.debug("Client WebSocket connected on gateway with URL:", request.url);
    if (request.url.startsWith(config.gateway_ws_janus_path)) {
      if (!config.target_janus_ws_url) {
        log.error("target_janus_ws_url not set; cannot proxy Janus.");
        clientWs.close();
        return;
      }
      handleJanusWsProxy(clientWs);
    } else {
      log.error("Unknown WS endpoint:", request.url);
      clientWs.close();
    }
  });
}

module.exports = { initGatewayWsProxy };
