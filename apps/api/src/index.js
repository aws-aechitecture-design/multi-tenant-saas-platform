const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 3000;
// Read environment variables
const APP_ENV = process.env.APP_ENV || "undefined";
const APP_MESSAGE = process.env.APP_MESSAGE || "no message configured";
const DB_PASSWORD = process.env.DB_PASSWORD || "no password found";

// env variable for volumes
const DATA_DIR = "/data";
const FILE_PATH = path.join(DATA_DIR, "log.txt");

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

  //write a volume
  if (req.url == "/write") {
    const entry = `Write at ${new Date().toISOString()}\n`;
    fs.appendFileSync(FILE_PATH, entry);
    res.writeHead(200);
    return res.end("Data Written to volume\n");
  }
  //Read from volume
  if (req.url == "/read") {
    if (!fs.existsSync(FILE_PATH)) {
      res.writeHead(200);
      return res.end("No data yet\n");
    }
    const data = fs.readFileSync(FILE_PATH, "utf-8");
    res.writeHead(200);
    return res.end(data);
  }

  //Default route
  res.writeHead(200, { "Content-Type": "text/plain" });
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
