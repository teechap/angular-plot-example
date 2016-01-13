(function() {
  'use strict';
  // constants for d3 viz
  var margin = {top: 20, right: 20, bottom: 80, left: 40},
      width = 960 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

  var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1, 1);

  var y = d3.scale.linear()
    .range([height, 0]);

  var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

  var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .tickFormat(d3.format(".0%"));

  //
  angular
    .module('angularPlotExample')
    .directive('barChart', ['$timeout', function($timeout) {
      return {
        restrict: 'E',
        scope: {
          data: '=', // array of objects with 2 keys (for x and y values)
          keys: '=', // e.g. {x: 'name', y: 'frequency'}
          highlightedXValue: '='
        },
        link: function(scope, element, attrs){
          // mostly copy-pasta from http://bl.ocks.org/mbostock/3885705
          var xKey = scope.keys.x,
              yKey = scope.keys.y;

          var svg = d3.select(element[0]) //append svg element for graph
            .append('svg')
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g") // data should be grouped (leaving space for the margin)
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

          x.domain(scope.data.map(function(d) { return d[xKey]; })); //updates the x axis
          y.domain([ // updates the y axis
            0,
            d3.max(scope.data, function(d) { return d[yKey];})
          ]);

          svg.append("g") // append x axis grouped elements to bottom
            .attr("class", "xaxis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis)
              .selectAll("text")
              .attr("dx", "-2.5em")
              .attr("dy", ".15em")
              .attr("transform", "rotate(-65)" );

          svg.append("g") // append y axis elements to left side
            .attr("class", "yaxis")
            .call(yAxis)
            .append("text")
              .attr("transform", "rotate(-90)")
              .attr("y", 6)
              .attr("dy", ".71em")
              .style("text-anchor", "end")
              .text(_.capitalize(yKey));

          function updateBars(newData){
            var bars = svg.selectAll(".bar") //select bars for each data point
              .data(newData, function(d){ return d[xKey]}); // bind data to bars

            bars.enter().append("rect") // add bars if needed
                .attr('class', 'bar')
                .attr('width', x.rangeBand())
                .attr('x', function(d) { return x(d[xKey]); })
                .attr('y', height)
                .attr('height', 0)
                .classed('highlighted', function(d){
                  if (d[xKey] === scope.highlightedXValue){
                    return true;
                  } else {
                    return false;
                  }
                })
                .transition()
                  .duration(750)
                  .attr('y', function(d) { return y(d[yKey]); })
                  .attr('height', function(d) { return height - y(d[yKey]); })

            bars.exit().transition()
              .duration(750)
              .attr('height', 0) // animate bars away if needed
              .remove();
          }

          // data change listeners
          var timeoutId;
          scope.$watch('data', function(newData){
            if (timeoutId) {
              $timeout.cancel(timeoutId);
            }
            timeoutId = $timeout(function(){
              updateBars(newData);
            }, 450); // use timeout so every letter press doesnt immediately trigger giant DOM change
          });
          scope.$watch('highlightedXValue', function(newVal, oldVal){
            if (newVal){
              svg.selectAll(".bar")
                .classed('highlighted', function(d){
                  if (d[xKey] === newVal){
                    return true;
                  } else {
                    return false;
                  }
                });
            }
          });
        }
      };
    }]);

})();
