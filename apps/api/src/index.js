const http = require("http");

const PORT = process.env.PORT || 3000;
// Read environment variables
const APP_ENV = process.env.APP_ENV || "undefined";
const APP_MESSAGE = process.env.APP_MESSAGE || "no message configured";
const DB_PASSWORD = process.env.DB_PASSWORD || "no password found";
let isReady = false;

// simulate startup delay (DB connection or ...)
setTimeout(() => {
  console.log("Application init complete");
  isReady = true;
}, 10000);

const server = http.createServer((req, res) => {
  //liveness endpoint
  if (req.url === "/health") {
    res.writeHead(200);
    return res.end("OK");
  }
  //readness endpoint
  if (req.url === "/ready") {
    if (isReady) {
      res.writeHead(200);
      return res.end("READY");
    } else {
      res.writeHead(503);
      return res.end("NOT READY");
    }
  }
  //Default route
  res.writeHead(200);
  res.end(
    `API service is running

Environment: ${APP_ENV}
Message: ${APP_MESSAGE}
Database Password: ${DB_PASSWORD}
`,
  );
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
