'use strict';

/**
* @ngdoc directive
* @name izzyposWebApp.directive:adminPosHeader
* @description
* # adminPosHeader
*/
angular.module('sbAdminApp')
    .directive('stats', function () {
        return {
            templateUrl: 'scripts/directives/dashboard/upload/uploaddata.html',
            restrict: 'E',
            replace: true,
            scope: {
                'model': '=',
                'openDetailChart': '=openDetailChart',
                'comments': '@',
                'number': '@',
                'name': '@',
                'colour': '@',
                'details': '@',
                'type': '@',
                'goto': '@'
            }

        }
    });
