'use strict';
/**
* @ngdoc function
* @name sbAdminApp.controller:MainCtrl
* @description
* # MainCtrl
* Controller of the sbAdminApp
*/
angular.module('sbAdminApp')
  .controller('MainCtrl', ['$scope', '$position', 'config.Constants', 'config.Service','$stateParams', '$state', function ($scope, $position, constant, httpService, $stateParams, $state) {

      var CRF_Labels = [];
      var CRF_HLE_Hours = [];
      var CRF_TimeSheet_Hours = [];
      var CRF_Remaining_Hours = [];

      $scope.loadDashboard = function () {
          httpService.httpCall('GET', constant.url.GetHLEData, $scope.HLESuccess, $scope.HLEFailure);
      };

      $scope.HLESuccess = function (data) {
          $scope.responseData = data.CRFS;
          angular.forEach(data.CRFS, function (item) {
              if(item.CRF_ID != "1111" && item.CRF_ID != "8166"){
              CRF_Labels.push(item.CRF_ID);
              CRF_HLE_Hours.push(item.HLE_Hours);
              CRF_TimeSheet_Hours.push(item.TimeSheet_Hours);
              if (item.HLE_Hours - item.TimeSheet_Hours > 0) {
                  CRF_Remaining_Hours.push(item.HLE_Hours - item.TimeSheet_Hours);
              }
              else {
                  CRF_Remaining_Hours.push(0);
              }
              }
          })

          $scope.labels = CRF_Labels;
          $scope.series = ['HLE Hours', 'Timesheet Hours', 'Remaning Hours'];

      $scope.acdata = [
                        CRF_HLE_Hours,
                        CRF_TimeSheet_Hours,
                        CRF_Remaining_Hours
                      ];
      $scope.colors = ['#ff6384', '#45b7cd', '#0A1DF0'];
      $scope.options = {
                        tooltips: {
                            enabled: true
                        },
                        hover :{
                            animationDuration:0
                        },
                        scales: {
                        xAxes: [{
                                //stacked: true,
                                ticks: {
                                    beginAtZero:true,
                                    fontFamily: "'Open Sans Bold', sans-serif",
                                    fontSize:11
                                },
                                scaleLabel:{
                                    display:true
                                },
                                labels : "HLE Hours"
                            }],
//                            yAxes: [{
//                                stacked: true,
////                                ticks: {
////                                    beginAtZero:true
////                                }
//                            }]
                        },
                        legend:{
                            display:true
                        },
                        animation: {
                            onComplete: function () {
                                var chartInstance = this.chart;
                                var ctx = chartInstance.ctx;
                                ctx.textAlign = "left";
                                ctx.font = "9px Arial Black";
                                ctx.fillStyle = "#000";

                                Chart.helpers.each(this.data.datasets.forEach(function (dataset, i) {
                                    var meta = chartInstance.controller.getDatasetMeta(i);
                                    Chart.helpers.each(meta.data.forEach(function (bar, index) {
                                        data = dataset.data[index];
                                            
                                                var size = ctx.measureText(data);
                                                ctx.save();
                                                var tx = (bar._model.x) //+ (size.width/2);
                                                var ty = (bar._model.y);
                                                ctx.translate(tx,ty);
                                                ctx.rotate(Math.PI / 2);
                                                ctx.translate(-tx,-ty);
                                                if(data > 100){
                                                    if(!meta.hidden)
                                                    {
                                                        ctx.fillText(data,bar._model.x+5, bar._model.y-6);
                                                    }
                                                }
                                                else if(data >=10){
                                                    if(!meta.hidden)
                                                    {
                                                        ctx.fillText(data,bar._model.x-25, bar._model.y-6);
                                                    }
                                                }
                                                else{
                                                    if(!meta.hidden)
                                                    {
                                                        ctx.fillText(data,bar._model.x-10, bar._model.y-6);
                                                    }
                                                }
                                                ctx.restore();
                                    }),this)
                                }),this);
                            }
                        },
                        pointLabelFontFamily : "Quadon Extra Bold",
                        scaleFontFamily : "Quadon Extra Bold"
                   }
      };

      $scope.HLEFailure = function(data){
        console.log(data);
        $scope.labels = [];
        $scope.series = [];
        $scope.acdata = [];
      };
      $scope.openDetailChart = function(opt, crfid){
        $state.go(opt, crfid);
      };                   

  } ]);
