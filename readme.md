# Janus Proxy

A lean Node.js proxy server for Janus that acts as a secure gateway for WebSocket connections. This project is designed to work as a standalone service that only handles Janus proxying, with a shared secret to secure client connections.

## Features

- **Janus WebSocket Proxy:** Proxies WebSocket connections to your Janus server.

- **Secure Access:** Clients must provide a shared secret to connect.

- **Simple Configuration:** Uses environment variables for all key settings.

- **Docker-Ready:** Includes a Docker Compose file for easy deployment.

## Setup

### 1\. Clone the Repository

If you haven't already, clone the repository from GitHub:

`git clone https://github.com/yourusername/janus-proxy.git`

Then navigate to the project directory:

`cd janus-proxy`

### 2\. Create an Environment File

Copy the provided `.env.example` to `.env` and adjust the values as needed:

`cp .env.example .env`

Key variables include:

- `GATEWAY_PORT`: Port on which the proxy will run.

- `GATEWAY_WS_JANUS_PATH`: Path for the Janus WebSocket endpoint.

- `TARGET_JANUS_WS_URL`: URL of your Janus WebSocket server.

- `TARGET_JANUS_API_SECRET`: (Optional) API secret for Janus.

- `PROXY_SECRET`: Shared secret for client authentication.

### 3\. Install Dependencies

Run the following command to install the required Node.js packages:

`npm install`

### 4\. Start the Proxy Server

To start the server, run:

`npm start`

The server will listen on the port defined in your `.env` file.

## Docker Deployment

An example Docker Compose file is included with the project.

## License

This project is licensed under the MIT License.
