const http = require('http');

var server = http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('Hello World!');
});

server.listen(3000, function() {
    console.log('Server is running at 3000 port');
});