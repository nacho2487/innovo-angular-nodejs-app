var mongoose = require('mongoose'),
	animal = require('./animalModel'),
	Schema = mongoose.Schema;

var treatmentModel = new Schema({
	treatmentId: Number,
	name: String,
	applicantDate: Date,
	product: String,
	dose: String,
	waitTime: String,
	EndDate: Date,
	animals: [animal]

});

module.exports = mongoose.model('Treatment', treatmentModel);