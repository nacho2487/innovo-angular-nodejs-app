var mongoose = require('mongoose'),
	measure = require('./measureModel'),
	animal = require('./animalModel'),
	Schema = mongoose.Schema;

var batchModel = new Schema({
	name: String,
	foodSource: String,
	measures: [measure],
	animals: [animal]
});

module.exports =  mongoose.model('Batch', batchModel);