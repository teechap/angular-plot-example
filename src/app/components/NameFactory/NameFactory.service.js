(function() {
  'use strict';

  angular
    .module('angularPlotExample')
    .factory('NameFactory', function(){
      var data = [
        {name: 'John',	frequency: 0.08167},
        {name: 'Amanda',	frequency: 0.01492},
        {name: 'Jackson',	frequency: 0.02780},
        {name: 'Nancy',	frequency: 0.04253},
        {name: 'Travis',	frequency: 0.12702},
        {name: 'Katie',	frequency: 0.02288},
        {name: 'Tim',	frequency: 0.02022},
        {name: 'Lucy',	frequency: 0.06094},
        {name: 'Steve',	frequency: 0.06973},
        {name: 'Karen',	frequency: 0.00153},
        {name: 'Ian',	frequency: 0.00747},
        {name: 'Michael',	frequency: 0.04025},
        {name: 'Daniel',	frequency: 0.02517},
        {name: 'Noah',	frequency: 0.06749},
        {name: 'Sarah',	frequency: 0.07507},
        {name: 'Rachel',	frequency: 0.01929},
        {name: 'Olivia',	frequency: 0.00098},
        {name: 'Emma',	frequency: 0.05987},
        {name: 'Avery',	frequency: 0.06333},
        {name: 'Peter',	frequency: 0.09056},
        {name: 'Ava',	frequency: 0.02758},
        {name: 'Alexander',	frequency: 0.01037},
        {name: 'Jaden',	frequency: 0.02465},
        {name: 'James',	frequency: 0.00150},
        {name: 'Benjamin',	frequency: 0.01971},
        {name: 'Emily',	frequency: 0.00074}
      ];
      return {
        getNameFrequencies: function(){
          return data;
        }
      };
    });

})();
