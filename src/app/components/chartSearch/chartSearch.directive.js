(function(){
  'use strict';

  angular
    .module('angularPlotExample')
    .directive('chartSearch', function(){
      return {
        restrict: 'E',
        scope: {
          onChangeInput: '&' // used to handle changing input text
        },
        template: '<input type="text" placeholder="Type full names to filter" ' +
                  'ng-model="query" ng-change="onChangeInput()(query)" ' +
                  'class="form-control">'
      };
    });
})();
