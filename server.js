const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const url = require("url");

const config = require("./config");
const Log = require("./log");
const { initGatewayWsProxy } = require("./gateway_ws_proxy");

const log = new Log("[Server]");
const app = express();
app.use(express.json());

// Create HTTP server.
const server = http.createServer(app);

// Create a single WebSocket.Server instance for the Janus proxy.
const gatewayWss = new WebSocket.Server({ noServer: true });
initGatewayWsProxy(gatewayWss);

// Upgrade handling with token authentication.
server.on("upgrade", (request, socket, head) => {
  const parsedUrl = url.parse(request.url, true);
  // Retrieve token from query parameter "token" or from "authorization" header.
  const token = parsedUrl.query.token || request.headers["authorization"];

  if (token !== config.proxy_secret) {
    socket.write("HTTP/1.1 401 Unauthorized\r\n\r\n");
    socket.destroy();
    log.error("Unauthorized WebSocket upgrade attempt");
    return;
  }

  if (parsedUrl.pathname.startsWith(config.gateway_ws_janus_path)) {
    gatewayWss.handleUpgrade(request, socket, head, (ws) => {
      gatewayWss.emit("connection", ws, request);
    });
  } else {
    socket.destroy();
  }
});

server.listen(config.gateway_port, () => {
  console.log(`[Server] Running on port ${config.gateway_port}`);
});
