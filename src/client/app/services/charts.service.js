(function () {
    'use strict';

    angular.module('app.services').factory('charts', charts);

    function charts() {
        return {
            getAnimalLinesData: getAnimalLinesData,
            getLinesData: getLinesData,
            getBarsData: getBarsData,
            getPieData: getPieData,
            getPieCount: getPieCount,
            getJsonTime: getJsonTime
        };


        function getBarsData(measures, measure, averageWeightType, averageWeightExpectedType) {

            var data = [];
            var observation = {
                bars: { show: true },
                label: "Observado",
                data: [],
                color: "#12B2B3"
            };
            var expected = {
                bars: { show: true },
                label: "Esperado",
                data: [],
                color: "#CCAF14"
            };
            var init = averageWeightType === 'averageWeight' ? measures.length - 1 : measures.length - 2;
            for (var i = init; i >= 0; i--) {
                var measureAux = measures[i];
                var measureAuxDate = getJsonTime(measureAux.date);
                var measureDate = getJsonTime(measure.date);
                if (measureAuxDate <= measureDate) {
                    observation.data.push([measureAuxDate, measureAux[averageWeightType]]);
                    expected.data.push([measureAuxDate, measureAux[averageWeightExpectedType]]);
                }
            }
            data.push(observation);
            data.push(expected);
            return data;
        }

        function getPieData(measure, type) {
            var animalsByType = measure[type];
            var data = [];
            for (var i = 0; i < animalsByType.length; i++) {
                var animalByType = animalsByType[i];
                data.push({
                    label: animalByType.name,
                    data: (animalByType.count * 100) / measure.animals.length
                });
            }
            return data;
        }

        function getPieCount(measure, type) {
            var animalsByType = measure[type];
            var data = [];
            for (var i = 0; i < animalsByType.length; i++) {
                var animalByType = animalsByType[i];
                data.push({
                    name: animalByType.name,
                    count: animalByType.count
                });
            }
            return data;
        }

        function getLinesData(measures, measure, type, weightType, averageWeightType) {

            var data = [];
            var animals = measure[type];
            var averageData = [];
            var init = weightType === 'weight' ? measures.length - 1 : measures.length - 2;
            for (var l = 0; l < animals.length; l++) {
                var animal = animals[l];
                var dataAux = {
                    label: animal.name,
                    lines: { show: true },
                    points: { show: true },
                    data: []
                };

                for (var i = init; i >= 0; i--) {
                    var measureAux = measures[i];
                    var measureAuxDate = getJsonTime(measureAux.date);
                    var measureDate = getJsonTime(measure.date);
                    for (var j = 0; j < measureAux[type].length; j++) {
                        var measureType = measureAux[type][j];
                        if (measureType.name === animal.name) {
                            if (measureAuxDate <= measureDate) {
                                dataAux.data.push([measureAuxDate, measureType[weightType]]);
                            }
                        }
                    }
                }
                data.push(dataAux);
            }
            for (var k = init; k >= 0; k--) {
                var measureAverage = measures[k];
                var measureAverageAuxDate = getJsonTime(measureAverage.date);
                var measureAverageDate = getJsonTime(measure.date);
                if (measureAverageAuxDate <= measureAverageDate) {
                    averageData.push([measureAverageAuxDate, measureAverage[averageWeightType]]);
                }
            }
            data.push({
                label: "Promedio general",
                data: averageData,
                dashes: { show: true },
                points: { show: true },
                color: "#EB5858"
            });
            return data;
        }

        function getAnimalLinesData(measures, weightType, averageWeightType) {

            var data = [];
            var averageData = [];
            var init = weightType === 'weight' ? measures.length - 1 : measures.length - 2;
            var dataAux = {
                label: "Individual",
                lines: { show: true },
                points: { show: true },
                data: []
            };

            for (var i = init; i >= 0; i--) {
                var measureAux = measures[i];
                var measureAuxDate = getJsonTime(measureAux.date);
                dataAux.data.push([measureAuxDate, measureAux.animals[0][weightType]]);

            }
            data.push(dataAux);
            for (var k = init; k >= 0; k--) {
                var measureAverage = measures[k];
                var measureAverageAuxDate = getJsonTime(measureAverage.date);
                averageData.push([measureAverageAuxDate, measureAverage[averageWeightType]]);
            }
            data.push({
                label: "Promedio general",
                data: averageData,
                dashes: { show: true },
                points: { show: true },
                color: "#EB5858"
            });
            return data;
        }

        function getJsonTime(jsonDate) {
            var date = moment(jsonDate);
            return date.utc().valueOf();

        }

    }
})();