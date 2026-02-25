const http = require("http");

const PORT = process.env.PORT || 3000;

let isReady = false;

// simulate startup delay (DB connection or ...)
setTimeout(() => {
  console.log("Application init complete");
  isReady = true;
}, 10000);

const server = http.createServer((req, res) => {
  //liveness endpoint
  if(req.url === "/health"){
     res.writeHead(200)
     return res.end("OK")
  }
  //readness endpoint
  if(req.url === "/ready"){
     if(isReady){
        res.writeHead(200)
        return res.end("READY")
     } else {
      res.writeHead(503);
      return res.end("NOT READY");
    }
  }
  //Default route
  res.writeHead(200);
  res.end("API service is running\n");
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
