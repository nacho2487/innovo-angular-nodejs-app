 var express = require('express');

 var routes = function(Batch) {
 	var batchRouter = express.Router();
 	var batchController = require('../controllers/batchController')(Batch);
 	
 	batchRouter.route('/')
 		.post(batchController.post)
 		.get(batchController.get);
 	
 	batchRouter.use('/:batchId', batchController.getBatch);
 	
 	batchRouter.route('/:batchId')
 		.get(batchController.getById)
 		.put(batchController.put)
 		.patch(batchController.patch)
 		.delete(batchController.delete);
 		
 	return batchRouter;
 };

 module.exports = routes;