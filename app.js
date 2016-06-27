var express = require('express'),
 	bodyParser = require('body-parser'),
	errorHandler = require('./src/server/routes/utils/errorHandler')(),
	app = express(),
	routes = require('./src/server/routes')(),
	port = process.env.PORT || 7200;

app.use(errorHandler.init);
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/api', routes);
app.use('/scripts', express.static('./node_modules/'));
app.use('/', express.static('./src/client/'));


app.listen(port, function() {
    console.log('Server is listening on port ' + port);
});