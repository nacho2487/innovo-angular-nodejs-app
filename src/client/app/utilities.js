

function IndividualLinesChartData(measures, weightType, averageWeightType) {

    var data = [];
    var averageData = [];
    var init = weightType === 'weight' ? measures.length - 1 : measures.length - 2;
    var dataAux = {
        label: "Individual",
        lines: { show: true },
        points: { show: true },
        data: []
    };

    for (var i = init; i >= 0 ; i--) {
        var measureAux = measures[i];
        var measureAuxDate = GetJsonTime(measureAux.date);
        dataAux.data.push([measureAuxDate, measureAux.animals[0][weightType]]);

    }
    data.push(dataAux);
    for (var k = init; k >= 0 ; k--) {
        var measureAverage = measures[k];
        var measureAverageAuxDate = GetJsonTime(measureAverage.date);
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


function LinesChartData(measures, measure, type, weightType, averageWeightType) {

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

        for (var i = init; i >= 0 ; i--) {
            var measureAux = measures[i];
            var measureAuxDate = GetJsonTime(measureAux.date);
            var measureDate = GetJsonTime(measure.date);
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
    for (var k = init; k >= 0 ; k--) {
        var measureAverage = measures[k];
        var measureAverageAuxDate = GetJsonTime(measureAverage.date);
        var measureAverageDate = GetJsonTime(measure.date);
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

function BarChartData(measures, measure, averageWeightType, averageWeightExpectedType) {

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
    for (var i = init; i >= 0 ; i--) {
        var measureAux = measures[i];
        var measureAuxDate = GetJsonTime(measureAux.date);
        var measureDate = GetJsonTime(measure.date);
        if (measureAuxDate <= measureDate) {
            observation.data.push([measureAuxDate, measureAux[averageWeightType]]);
            expected.data.push([measureAuxDate, measureAux[averageWeightExpectedType]]);
        }
    }
    data.push(observation);
    data.push(expected);
    return data;
}

function PieChartData(measure, type) {
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

function GetMeasuresDates(measures, actualMeasure) {

    var dates = _.filter(measures, function (measure) {
        var measureAuxDate = GetJsonTime(measure.date);
        var measureDate = GetJsonTime(actualMeasure.date);
        return measureAuxDate <= measureDate;
    }).map(function (v) {
        return GetJsonTime(v.date);
    });

    return dates;
}

function PieCountData(measure, type) {
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


function GetJsonTime(jsonDate) {
    var date = moment(jsonDate);
    return date.utc().valueOf();

}

function PercentageExpected(actual, expected) {
    var percent = actual > 0 ? ((actual - expected) / actual) * 100 : 0;
    return Math.round(percent);
}