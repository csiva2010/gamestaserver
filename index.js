'use strict';
var sslServer;
var https = require('https');
const express = require('express');
var bodyParser = require("body-parser");
const kraken = require( 'kraken-js');
const compression = require( 'compression');
const database = require( './model/database');
const port = process.env.PORT || 8020;
var options, app;
options = {
  vault: require("./config/config.json").vault,
    onconfig: function (config, next) {
      database(config);        
      next(null, config);
    }
};
app = module.exports = express();

app.use(kraken(options));
if (app.settings.env.toUpperCase() === "DEVELOPMENT") {
    app.get("/", (req, res) => {
      res.redirect(app.kraken.get("requestURI"));
    });
}
app.on('start', function () {
  if (app.kraken.get('ssl').cert && app.kraken.get('ssl').key) {
      var sslPort = 8443;      
      sslServer = https.createServer(app.kraken.get('ssl'), app);
      sslServer.listen(sslPort);
      console.log('[%s] Listening on http://localhost:%d', app.settings.env, sslPort);
  }
});
app.listen(port, function(err) {
    if (err) {
      console.error(err.message); return;
    } 
    console.log("[%s] Listening on http://localhost:%d/gamesta", app.settings.env.toUpperCase(), port);      
});
  