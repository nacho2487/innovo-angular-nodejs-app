 (function() {
    'use strict';
     angular
            .module('app.widgets')
            .directive('inPieChart', inPieChart);

    inPieChart.$inject = ['$window'];

    function inPieChart($window) {
        return {
            restrict: 'E',
            link: function (scope, elem, attrs) {
                $(elem).show();
                var piechart = null,
                    options = {
                        colors: ["#A8C545", "#0092B2", "#AF4E96"],
                        series: {
                            pie: {
                                show: true,
                                tilt: 0.8,
                                highlight: {
                                    opacity: 0.25
                                },
                                stroke: {
                                    color: '#fff',
                                    width: 2
                                },
                                startAngle: 2,
                                label: {
                                    show: true,
                                    radius: 0.4,
                                    formatter: function (label, series) {
                                        return '<div style="font-size:8pt;text-align:center;padding:1px;color:white;">' + Math.round(series.data[0][1]) + ' %</div>';

                                    }
                                }
                            }
                        },
                        legend: {
                            show: true,
                            position: "ne",
                            labelBoxBorderColor: null,
                            margin: [-30, 15]
                        },
                        grid: {
                            hoverable: true,
                            clickable: true
                        }
                    };

                var piedata = scope[attrs.ngModel];

                // If the data changes somehow, update it in the chart
                scope.$watch(attrs.ngModel, function (v) {
                    if (v) {
                        if (!piechart) {
                            piechart = $.plot(elem, v, options);
                        } else {
                            piechart.setData(v);
                            piechart.setupGrid();
                            piechart.draw();
                        }
                        //pie chart tooltip example
                        var $tooltip = $("<div class='tooltip top in'><div class='tooltip-inner'></div></div>").hide().appendTo('body');
                        var previousPoint = null;

                        $(elem).on('plothover', function (event, pos, item) {
                            if (item) {
                                if (previousPoint != item.seriesIndex) {
                                    previousPoint = item.seriesIndex;
                                    var tip = item.series['label'] + " : " + item.series['percent'] + '%';
                                    $tooltip.show().children(0).text(tip);
                                }
                                $tooltip.css({ top: pos.pageY + 10, left: pos.pageX + 10 });
                            } else {
                                $tooltip.hide();
                                previousPoint = null;
                            }

                        });
                    }
                });
            }
        };
    };
})();