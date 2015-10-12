/*jshint node:true*/
'use strict';

var express = require('express'),
 	mongoose = require('mongoose'),
 	bodyParser = require('body-parser'),
	errorHandler = require('./routes/utils/errorHandler')();	

var db = mongoose.connect('mongodb://localhost/innovoApi');
/*
var Treatment = require('./models/treatmentModel');
var Animal = require('./models/animalModel');
var Measure = require('./models/measureModel');*/
var Batch = require('./models/batchModel');

var app = express();

var port = process.env.PORT || 7200;

app.use(errorHandler.init);
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var batchRouter = require('./routes/batchRoutes')(Batch);

app.use('/api/batches', batchRouter);
app.get('/', function(req, res){
	res.send("Web api");
});
/*routes = require('./routes/index')(app);

app.use('/', express.static('./src/client/'));
app.use('/', express.static('./'));
*/

app.listen(port, function() {
    console.log('Gulp server is listening on port ' + port);
});