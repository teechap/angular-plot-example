(function() {
  'use strict';

  describe('NameChartController', function(){
    var $scope;
    var NameFactory;
    var mockNameFrequenciesData;

    beforeEach(module('angularPlotExample'));

    beforeEach(inject(function(_$controller_, _NameFactory_) {
      mockNameFrequenciesData = [
        {name: 'John',	frequency: 0.08167},
        {name: 'Amanda',	frequency: 0.01492},
        {name: 'Jackson',	frequency: 0.02780}
      ];
      NameFactory = _NameFactory_; // mock name factory for controller's unit tests
      spyOn(_NameFactory_, 'getNameFrequencies').and.returnValue(mockNameFrequenciesData);

      var $controller = _$controller_;
      $scope = {};
      var NameChartController = $controller('NameChartController', {$scope: $scope});
    }));

    it('assigns data from the NameFactory to its $scope', function() {
      expect($scope.data).toEqual(mockNameFrequenciesData);
      expect(NameFactory.getNameFrequencies).toHaveBeenCalled();
    });

    it('assigns x and y key names to its $scope', function(){
      // Ideally, simple x and y bar charts should be reusable, so there's
      // no reason to hard-code the names of keys in the data array within rendering directives.
      // The directives just render the graph and send user interaction events
      // back up to the controller, where the business logic is defined.
      // Here, we make sure the controller component, NameChartController, defines
      // the key strings <bar-chart> needs to render the data in $scope.data.
      expect($scope.keys).toEqual({
        x: 'name',
        y: 'frequency'
      });
    });

    it('defines an events handler, onClickName, to highlight x values', function(){
      // Directives are passed an event handler from the contoller so they can
      // respond to user interactions. The controller "controls" handling logic.
      var pointClicked = mockNameFrequenciesData[0];
      // initially, $scope.highlightedXValue should be null (or at least falsy)
      expect($scope.highlightedXValue).toBeFalsy();

      $scope.onClickName(pointClicked);

      expect($scope.highlightedXValue).toBe(pointClicked.name);
    });

    it('has an onChangeInput handler to filter $scope.data based on user queries', function(){
      // uppercase query
      $scope.onChangeInput('John 👀 Amanda ');
      expect($scope.data).toEqual([
        {name: 'John',	frequency: 0.08167},
        {name: 'Amanda',	frequency: 0.01492}
      ]);

      // it should restore the full data array with an empty-ish query
      $scope.onChangeInput('  ');
      expect($scope.data).toEqual(mockNameFrequenciesData);

      // lowercase query
      $scope.onChangeInput(' John jackson ');
      expect($scope.data).toEqual([
        {name: 'John',	frequency: 0.08167},
        {name: 'Jackson',	frequency: 0.02780}
      ]);
    });
  });
})();
