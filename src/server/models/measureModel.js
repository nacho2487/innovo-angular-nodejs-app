var mongoose = require('mongoose'),
	animal = require('./animalModel'),
	Schema = mongoose.Schema;

var measureModel = new Schema({
	name: String,
	date: Date,
	averageWeightGain: Number,
	averageWeight: Number,
	averageWeightGainExpected: Number,
	averageWeightExpected: Number,
	periodCharge: Number,
	periodProductionMeet: Number,
	actualMeasure: {
		type: Boolean,
		default: false
	},
	animals: [animal]

});

module.exports = mongoose.model('Measure', measureModel);