'use strict';
/**
* @ngdoc function
* @name sbAdminApp.controller:MainCtrl
* @description
* # MainCtrl
* Controller of the sbAdminApp
*/
angular.module('sbAdminApp')
  .controller('UploadCtrl', ['$scope', '$http', '$position', 'config.Constants', 'config.Service', '$stateParams', '$state', function ($scope, $http, $position, constant, httpService, $stateParams, $state) {

      var formdata = new FormData();
      $scope.model = {};
      $scope.getTheFiles = function ($files) {
          angular.forEach($files, function (value, key) {
              formdata.append(key, value);
          });
      };

      $scope.LoadForm = function (page) {
          $scope.model = {};
          //$scope.myFile = {};
          angular.element("input[type='file']").val(null);
          $scope.uploadForm.$setUntouched();
          $scope.model.page = page;
      };

      $scope.UploadFile = function () {
          var file = $scope.myFile;
          var formdata = new FormData();
          formdata.append(0, $scope.myFile);
          console.log(formdata);
          if ($scope.model.page == 'Timesheet') {
              httpService.httpCall('POST', constant.url.UploadTimesheet, $scope.UploadSuccess, $scope.UploadFailure, formdata);
              $scope.isDisable = true;
          }
          else if ($scope.model.page == 'CRFData') {
              httpService.httpCall('POST', constant.url.UploadCRF, $scope.UploadSuccess, $scope.UploadFailure, formdata);
              $scope.isDisable = true;
          }
      };

      $scope.UploadSuccess = function (data) {
          console.log(data)
          $scope.model.isDisable = false;
          $scope.model.successMessage = data;
          //$scope.model = {};
          angular.element("input[type='file']").val(null);
          $scope.uploadForm.$setPristine();
      }

      $scope.UploadFailure = function (data) {
          $scope.isDisable = false;
          $scope.uploadForm.$setPristine();
      }
  } ]);