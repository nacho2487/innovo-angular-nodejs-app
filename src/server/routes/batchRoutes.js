 var express = require('express');

 var routes = function (Batch) {
 	var batchRouter = express.Router();
 	batchRouter.route('/')
 	.post(function(req, res){
 		var batch = new Batch(req.body);
 		batch.save();
 		res.send(201).send(batch);

 	}).get(function(req, res){
 		Batch.find(function(err, batches){
 			if(err)
 				res.send(500).send(err);
 			else
 				res.json(batches);

 		});
 	});
 	return batchRouter;
 };

 module.exports = routes;