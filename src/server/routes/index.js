module.exports = function(app) {
    var jsonfileservice = require('./utils/jsonfileservice')();

    app.get('/api/batches', getBatches);

    function getBatches(req, res, next) {
        var json = jsonfileservice.getJsonFromFile('/../../data/batches.json');
        res.json(json);
    }

    app.get('/api/batches/:id/measures', getBatchMeasures);

    function getBatchMeasures(req, res, next) {
        var json = jsonfileservice.getJsonFromFile('/../../data/batchMeasures.json');
        res.json(json);
    }

    app.get('/api/animals', getAnimals);

    function getAnimals(req, res, next) {
        var json = jsonfileservice.getJsonFromFile('/../../data/animals.json');
        res.json(json);
    }

    app.get('/api/animals/:id?', getAnimal);

    function getAnimal(req, res, next) {
        var json = jsonfileservice.getJsonFromFile('/../../data/animal.json');
        res.json(json);
    }
};