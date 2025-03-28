const dotenv = require("dotenv");
dotenv.config();

const debug = (msg) => console.debug("[CONFIG]", msg);
const isSet = (envVar) => envVar && envVar.trim().length > 0;

const config = {
  // Gateway (client-facing) configuration.
  gateway_port: process.env.GATEWAY_PORT || 3000,
  gateway_ws_janus_path: process.env.GATEWAY_WS_JANUS_PATH || "/ws/janus",
  gateway_url: process.env.GATEWAY_URL || null,

  // Target (backend) Janus configuration.
  target_janus_ws_url:
    process.env.TARGET_JANUS_WS_URL && process.env.TARGET_JANUS_WS_URL.trim(),
  target_janus_api_secret:
    process.env.TARGET_JANUS_API_SECRET &&
    process.env.TARGET_JANUS_API_SECRET.trim(),

  // Security: Shared secret for client authentication.
  proxy_secret: process.env.PROXY_SECRET && process.env.PROXY_SECRET.trim(),
};

debug(`gateway_port: ${config.gateway_port}`);
debug(`gateway_ws_janus_path: ${config.gateway_ws_janus_path}`);
debug(`gateway_url: ${config.gateway_url || "not set"}`);
debug(`target_janus_ws_url: ${config.target_janus_ws_url || "not set"}`);
debug(`proxy_secret: ${config.proxy_secret ? "set" : "not set"}`);

module.exports = config;
