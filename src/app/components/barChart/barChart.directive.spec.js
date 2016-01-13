(function() {
  'use strict';

  describe('directive malarkey', function() {
    var scope,
        el,
        compiled,
        html,
        mockNameFrequenciesData;

    beforeEach(module('angularPlotExample'));

    beforeEach(function(){
      mockNameFrequenciesData = [
        {name: 'John',	frequency: 0.08167},
        {name: 'Amanda',	frequency: 0.01492},
        {name: 'Jackson',	frequency: 0.02780}
      ];
      html = '<bar-chart data="data" keys="keys" highlighted-x-value="highlightedXValue"></bar-chart>';
      inject(function($compile, $rootScope) {
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
        scope.$digest(); //
      });
    });

    it('renders a container svg', function(){
      expect(el.find('svg')).toBeTruthy(); // just a sanity check
    });

    it('renders x axis labels in the DOM', function(){
      // These tests could get much more elaborate (i.e. styles, positioning, etc),
      // but for now I just want to make sure the names render *at all*.
      // In reality we would want to test for bars, ticks, etc.
      var text = el.text();
      expect(text).toContain('John');
      expect(text).toContain('Amanda');
      expect(text).toContain('Jackson');
    });

    it('renders y axis label', function(){
      var text = el.text();
      expect(text).toContain('Frequency');
    });

    it('renders a <rect> with .bar class for each data point in $scope.data', function(){
      var rects = el.find('rect');
      console.log(el.html());
      console.log('fsegfdggggggggg', rects);
    });
  });
})();
