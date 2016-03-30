var http = require('http');
var send = require('send');
var url = require('url');
var config = require('./config');

return http.createServer(function(req, res){
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
}).listen(process.env.PORT || 8080);