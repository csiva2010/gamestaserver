'use strict';

var app = require('./index');
var http = require('http');
var https = require('https');

var server;

/*
 * Create and start HTTP server.
 */
let ssl = {
    "cert":"file://Users/csivakolundu/Documents/infraops/self_signed_certificate/server.crt",
   "key":"file://Users/csivakolundu/Documents/infraops/self_signed_certificate/server.key"
};
server = https.createServer(ssl, app);
server.listen(process.env.PORT || 8000);
server.on('listening', function () {
    console.log('Server listening on http://localhost:%d', this.address().port);
});
