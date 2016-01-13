(function() {
  'use strict';

  describe('directive barChart', function() {
    var scope,
        el,
        compiled,
        html,
        mockNameFrequenciesData,
        timeout;

    beforeEach(module('angularPlotExample'));

    beforeEach(function(){
      mockNameFrequenciesData = [
        {name: 'John',	frequency: 0.08167},
        {name: 'Amanda',	frequency: 0.01492},
        {name: 'Jackson',	frequency: 0.02780}
      ];
      html = '<bar-chart data="data" keys="keys" highlighted-x-value="highlightedXValue"></bar-chart>';
      inject(function($compile, $rootScope, $timeout) {
        timeout = $timeout;
        scope = $rootScope.$new();
        scope.keys = {
          x: 'name',
          y: 'frequency'
        };
        scope.highlightedXValue = null;
        scope.data = mockNameFrequenciesData;

        el = angular.element(html); // returns jqLite element
        compiled = $compile(el); // compiles the element into a function
        compiled(scope); // run the function to create the view
        scope.$digest();

        // d3's DOM updates happen in $timeout to avoid lag due to fast typing ;-)
        timeout.flush(4000);
      });
    });

    it('renders a container svg', function(){
      expect(el.find('svg')).not.toEqual({}); // just a sanity check
    });

    it('renders x axis labels in the DOM', function(){
      // These tests could get much more elaborate (i.e. styles, positioning, etc),
      // but for now I just want to make sure the names render *at all*.
      // In reality we would want to test for ticks, spacing, etc.
      var text = el.text();
      expect(text).toContain('John');
      expect(text).toContain('Amanda');
      expect(text).toContain('Jackson');
    });

    it('renders y axis label', function(){
      var text = el.text();
      expect(text).toContain('Frequency');
    });

    it('renders a <rect> for each data point in $scope.data', function(){
      // again, this is way simpler than it should be for production tests
      var rects = el.find('rect');
      expect(rects.length).toBe(mockNameFrequenciesData.length);

      // it should update when $scope.data changes
      scope.data = mockNameFrequenciesData.concat([
        {name: 'Obama', frequency: 0.05}
      ]);

      scope.$digest();
      timeout.flush(4000);

      var rects = el.find('rect');
      expect(rects.length).toBe(mockNameFrequenciesData.length + 1);
    });
  });
})();
