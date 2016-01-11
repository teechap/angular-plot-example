(function() {
  'use strict';

  angular
    .module('angularPlotExample')
    .controller('NameChartController', ['$scope', 'NameFactory', function($scope, NameFactory){
      var data = NameFactory.getNameFrequencies();
      //initialization
      $scope.highlightedXValue = null;

      $scope.keys = {
        x: 'name',
        y: 'frequency'
      };

      $scope.data = data;

      //event handlers passed into directives
      $scope.onChangeInput = function(searchQuery){ // used in search string input
        var query = searchQuery.trim().toLowerCase();
        if (query) {
          $scope.data = data.filter(function(point){
            return _.contains(query, point.name.toLowerCase());
          });
        } else { // display all data again if query is falsy
          $scope.data = data;
        }
      };

      $scope.onClickName = function(point){ // used in table row click handler
        $scope.highlightedXValue = point.name;
      };

    }]);
})();
