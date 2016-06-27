var express = require('express');
var jsonfileservice = require('./utils/jsonfileservice')();

function getAnimal(req, res, next) {
    var json = jsonfileservice.getJsonFromFile('/../../data/animal.json');
    res.json(json);
}

function getAnimals(req, res, next) {
    var json = jsonfileservice.getJsonFromFile('/../../data/animals.json');
    res.json(json);
}

function getBatchMeasures(req, res, next) {
    var json = jsonfileservice.getJsonFromFile('/../../data/batchMeasures.json');
    res.json(json);
}

function getBatches(req, res, next) {
    var json = jsonfileservice.getJsonFromFile('/../../data/batches.json');
    res.json(json);
}

var routes = function() {
    var router = express.Router();
    router.get('/batches', getBatches);
    router.get('/batches/:id/measures', getBatchMeasures);

    router.get('/animals', getAnimals);
    router.get('/animals/:id?', getAnimal);


    return router;
};
module.exports = routes;