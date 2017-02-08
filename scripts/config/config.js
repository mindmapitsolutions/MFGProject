/**
* Created by Pratul on 30/7/15.
*/
'use strict';
//angular.module('firstCutApp');

angular.module('sbAdminApp').service('config.Service', ['config.Constants', '$http', '$rootScope',

    function (Constants, $http, $rootScope) {

        var response = {

            ajaxCall: function (type, url, async) {

                var data = $.ajax({ type: type,
                    url: Constants.serviceURL + url,
                    async: async
                }).responseText;

                return angular.fromJson(data);
            },

            httpCall: function (type, url, success, failure, postData) {
                if (url == "auth") {
                    var options = {
                        method: type,
                        url: Constants.serviceURL + url,
                        data: postData,
                        headers: { "Content-Type": "application/json",
                            "Authorization": "Basic YWRtaW46YWRtaW4xMjM=",
                            "Accept": "application/json"
                        }
                    };
                }
                else if ((url == "Upload/UploadCRFData") || (url == "Upload/UploadTS")) {
                var options = {
                        method: type,
                        url: Constants.serviceURL + url,
                        data: postData,
                        headers: { "Content-Type": undefined}
                    };
                }
                else {
                    var options = {
                        method: type,
                        url: Constants.serviceURL + url,
                        data: postData,
                        headers: { "Content-Type": "application/json"}
                    };
                }

                if (type == "DELETE") {
                    options.headers = { "content-type": "application/json; charset=utf-8", 'firstcut-User': $rootScope.username };
                }

                var http = $http(options).success(success).error(failure);
            }
        };

        return response;
    } ]);


    angular.module('sbAdminApp').service('config.Constants', ['$location',

    function ($location) {

        //var serviceURL = $location.protocol() + "://" + $location.host() + ":" + $location.port() + "/PortalAPI/api/";
        //var serviceURL = $location.protocol() + "://" + $location.host() + "/PortalAPI/api/";
        var serviceURL = "http://pneitsh53092d:8181/HLEService/rest/GetData/";
        
        var constants = {
            serviceURL: serviceURL,

            regExUrl: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})(:[0-9]+)?([\/\w \.-]*)*\/?$/, // with https or without http
            regExIp: /^(https?:\/\/)?(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(:[0-9]+)?([\/\w \.-]*)*\/?$/,

            url: {
                GetHLEData: "getHLEData/getAllCRFData/null/null/null",
                Uploadxls: "Upload/UploadCRFData",
                UploadCRF: "Upload/UploadCRFData",
                UploadTimesheet: "Upload/UploadTS",
                GetCRFData: "getHLEData/getCRFDataMonthWise/{CRFId}/{PRJId}/null",
                GetHLEDataMonthwise: "getHLEData/getCRFDataForMonth/null/null/{MonthId}",
                GetCRFDataTeamWise: "getHLEData/getCRFDataTeamWise/{CRFId}/{PRJId}/null",
                GetCRFDetails: "getHLEData/getCRFDetails/null/null/null",
                GetAllMonths: "getHLEData/getAllMonths/null/null/null"
            }
        };

        return constants;
    } ]);

