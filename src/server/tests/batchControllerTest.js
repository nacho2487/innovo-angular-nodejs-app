var should = require('should'),
	sinon = require('sinon');

describe('Batch controller tests:', function(){
describe('Post', function(){
	it('should not allow empty name to the bactch', function(){
		var Batch = function(batch){ this.save = function(){} };
		var req = {
			body: {
				foodSource: 'Trebol'
			}
		};
		var res = {
			status: sinon.spy(),
			send: sinon.spy()
		};
		var batchController = require('../controllers/batchController')(Batch);
		batchController.post(req, res);

		res.status.calledWith(400).should.equal(true, 'Bad status ' + res.status);
		res.send.calledWith('Name is required').should.equal(true);


	});
});
});