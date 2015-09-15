(function() {
    'use strict';
     angular
            .module('app.widgets')
            .directive('inChart', inChart);

    function inChart() {
        return {
            restrict: 'E',
            scope: {
                measure: '=',
                measures: '=',
                model: '='
            },
            link: function (scope, elem, attrs) {
                var chart = null,
                    minDate = new Date(2014, 4, 1).getTime(),
                    maxDate = new Date(2015, 7, 1).getTime(),
                    options = {
                        colors: ["#A8C545", "#0092B2", "#AF4E96"],
                        tooltip: true,
                        tooltipOpts: {
                            xDateFormat: "%d/%m/%Y",
                            shifts: {
                                x: 10,
                                y: 20
                            },
                            defaultTheme: false
                        },
                        series: {
                            bars: {
                                barWidth: 60 * 60 * 24 * 30 * 365,
                                horizontal: false,
                                align: 'left',
                                fill: true,
                                fillColor: { colors: [{ opacity: 0.8 }, { opacity: 0.6 }] },
                                order: 1
                            }
                        },

                        legend: {
                            show: true,
                            labelBoxBorderColor: "#666",
                            noColumns: 4,
                            position: "ne",
                            backgroundOpacity: 0.5,
                            margin: [0, 3],
                            labelFormatter: function (label, series) {
                                return '<span style="margin-right: 10px;">' + label + '</span>';
                            }
                        },
                        xaxis: {
                            show: true,
                            position: "bottom",
                            mode: "time",
                            timeformat: "%d/%m/%Y",
                            minTickSize: [1, "month"],
                            min: minDate,
                            max: maxDate

                        },
                        yaxis: {
                            show: true,
                            max: 1
                        },
                        axisLabels: {
                            show: true
                        },
                        xaxes: [
                            {
                                axisLabel: 'Fecha',
                            }
                        ],
                        grid: {
                            show: true,
                            hoverable: true,
                            borderColor: '#efefef',
                            tickColor: '#efefef',
                            backgroundColor: { colors: ["#fff", "#eee"] },
                            borderWidth: 3
                        },
                    };
                scope.$watch('model', function (value) {
                    if (value) {
                        if (attrs.type == "weightGain") {
                            options.tooltipOpts.content = "<h4>%s</h4><ul><li>Ganancia diaria: %y.2</li><li>Fecha de la medida: %x</li></ul>";
                            options.yaxes = [{ axisLabel: 'Ganancia Diaria (kg/d)' }];
                            options.yaxis = {
                                show: true,
                                max: 1
                            };
                        } else {
                            options.tooltipOpts.content = "<h4>%s</h4><ul><li>Peso: %y</li><li>Fecha de la medida: %x</li></ul>";
                            options.yaxes = [{ axisLabel: 'Peso (kg)' }];
                            options.yaxis = {
                                show: true,
                                max: 580
                            };
                        }
                        options.xaxis.ticks = GetMeasuresDates(scope.measures, scope.measure);

                        chart = $.plot(elem, value, options);

                    }
                });

            }
        };
    }
});