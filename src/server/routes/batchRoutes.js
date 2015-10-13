 var express = require('express');

 var routes = function(Batch) {
 	var batchRouter = express.Router();
 	batchRouter.route('/')
 		.post(function(req, res) {
 			var batch = new Batch(req.body);
 			batch.save(function(err) {
 				if (err)
 					res.status(500).send(err);

 				res.status(201).send(batch);
 			});
 			

 		}).get(function(req, res) {
 			Batch.find(function(err, batches) {
 				if (err)
 					res.status(500).send(err);
 				else
 					res.json(batches);

 			});
 		});
 	batchRouter.use('/:batchId', function(req, res, next) {
 		Batch.findById(req.params.batchId, function(err, batch) {
 			if (err)
 				res.status(500).send(err);
 			else if (batch) {
 				req.batch = batch;
 				next();
 			} else {
 				res.status(404).send('No batch found');
 			}
 		});
 	});
 	batchRouter.route('/:batchId')
 		.get(function(req, res) {

 			res.json(req.batch);

 		}).put(function(req, res) {
 			req.batch.name = req.body.name;
 			req.batch.foodSource = req.body.foodSource;
 			req.batch.save(function(err) {
 				if (err)
 					res.status(500).send(err);
 				res.json(req.batch);
 			});
 		}).patch(function(req, res) {

 			if (req.body._id)
 				delete req.body._id;
 			for (var p in req.batch) {
 				req.batch[p] = req.body[p];
 			}
 			req.batch.save(function(err) {
 				if (err)
 					res.status(500).send(err);
 				res.json(batch);
 			});

 		}).delete(function(req, res) {
 			req.batch.remove(function(err) {
 				if (err)
 					res.status(500).send(err);
 				else
 					res.status(204);
 			});

 		});
 	return batchRouter;
 };

 module.exports = routes;