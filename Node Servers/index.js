//load http module
const http = require("http");
//host and port
const host = 'localhost';
const port = 8000;



const requestListener = function (req, res) {
//sets HTTP status code of the response  
  res.writeHead(200);
    res.end("Hello World!");
};

//create http server
//accepts requests and passes them to the request listener
const server = http.createServer(requestListener);
// bind server to a network address
//server.listen() tales 3 arguments port host and callback
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});
