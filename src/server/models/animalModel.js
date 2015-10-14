var mongoose = require('mongoose'),
	batch =	require('./batchModel'),
	Schema = mongoose.Schema;

var animalModel = new Schema({
	breed: String,
	name: String,
	category: String,
	sex: String,
	caravanId: String,
	dateOfBirth: Date,
	comments: String,
	healthState: String,
	weight: Number,
	dailyWeightGain: Number,
	batch: batch

});

module.exports = mongoose.model('Animal', animalModel);