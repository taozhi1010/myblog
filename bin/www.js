const http = require("http");
const hostname = "127.0.0.1";
const serverHandle = require("../app")
const port = 3000;
const server = http.createServer(serverHandle)

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});