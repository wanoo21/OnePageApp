var http = require('http');
var send = require('send');
var url = require('url');
var config = require('./config');
var port = process.env.PORT || 8080;

return http.createServer((req, res) => {
    // your custom error-handling logic:
    function error(err) {
        res.statusCode = err.status || 500;
        res.end(err.message);
    }
    send(req, url.parse(req.url).pathname, {
        root: config.productionFolderPath
    })
        .on('error', error)
        .pipe(res);
}).listen(port, '127.0.0.1', () => {
    console.log('Start listening port: %s', port)
});