
//Install express server
const express = require('express');
const path = require('path');
const proxy = require('http-proxy-middleware');
const app = express();
const PROXY_CONF = require('./proxy.conf');
const url = Object.keys(PROXY_CONF)[0];
const options = PROXY_CONF[url];

app.use(url, proxy(options));

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/mkrf-esb-web'));

app.get('/*', function(req,res) {
    
res.sendFile(path.join(__dirname+'/dist/mkrf-esb-web/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);