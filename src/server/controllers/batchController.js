var batchController = function(Batch) {
	var post = function(req, res) {
		var batch = new Batch(req.body);
		batch.save(function(err) {
			if (err)
				res.status(500).send(err);

			res.status(201).send(batch);
		});
	};
	var get = function(req, res) {
		Batch.find(function(err, batches) {
			if (err)
				res.status(500).send(err);
			else
				res.json(batches);
		});
	};
	var getBatch = function(req, res, next) {
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
	};
	var getById = function(req, res) {
		res.json(req.batch);
	};

	var put = function(req, res) {
		req.batch.name = req.body.name;
		req.batch.foodSource = req.body.foodSource;
		req.batch.save(function(err) {
			if (err)
				res.status(500).send(err);
			res.json(req.batch);
		});
	};

	var patch = function(req, res) {
		if (req.body._id)
			delete req.body._id;
		for (var p in req.body)
			req.batch[p] = req.body[p];

		req.batch.save(function(err) {
			if (err)
				res.status(500).send(err);
			res.json(req.batch);
		});

	};

	var remove = function(req, res) {
		req.batch.remove(function(err) {
			if (err)
				res.status(500).send(err);
			else
				res.send(204);
		});

	};

	return {
		post: post,
		get: get,
		getBatch: getBatch,
		getById: getById,
		put: put,
		patch: patch,
		delete: remove
	};

};

module.exports = batchController;