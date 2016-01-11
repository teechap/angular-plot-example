(function() {
  'use strict';
  //reusable table directive that can display x and y values
  angular
    .module('angularPlotExample')
    .directive('simpleTable', function() {
      return {
        restrict: 'E',
        scope: {
          data: '=', // array of objects with 2 keys (for x and y values)
          keys: '=', // key names for array objects e.g. {x: 'name', y: 'frequency'}
          onClickXValue: '&', // function(point) for when user clicks a value in the x axis
        },
        templateUrl: 'app/components/simpleTable/simpleTable.html'
      };
    });

})();
