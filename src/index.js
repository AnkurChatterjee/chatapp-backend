require("dotenv").config();
const http = require("http");
const app = require("./app");
const { Logger } = require("./lib/Logger");

const APP_PORT = process.env.APP_PORT || 9091;
const APP_URL = process.env.APP_URL || `http://localhost:${APP_PORT}`;

//create http server
const server = http.createServer(app);

//starting the server
server.listen(APP_PORT, () => {
  Logger.info(`App started successfully. \nServer running on: ${APP_URL}`);
});
