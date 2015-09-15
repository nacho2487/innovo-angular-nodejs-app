/*jshint node:true*/
'use strict';

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var errorHandler = require('./routes/utils/errorHandler')();
var port = process.env.PORT || 7200;
var routes;

var environment = process.env.NODE_ENV;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(errorHandler.init);

routes = require('./routes/index')(app);

//app.use("/bower_components/*", express.static(__dirname + "/bower_components/"));
app.use('/', express.static('./src/client/'));
app.use('/', express.static('./'));


app.listen(port, function() {
    console.log('Express server listening on port ' + port);
   });