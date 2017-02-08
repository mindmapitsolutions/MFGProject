(function() {

    angular.module("sb.shared")
        .factory("apiService", ApiService);

    ApiService.$inject = ["$resource", "toasterService", "$state", "exceptionService"];

    function ApiService($resource, toasterService, $state, exceptionService) {
        var resourceInterceptor = createResourceInterceptor();
        return resource;

        function createResourceInterceptor() {            
            return {
                response: function (response) {
                    if (response.config.method !== "GET") {
                        toasterService.showSuccess(getTitle(response) + "d");
                    }
                    return response.data;
                },
                responseError: function (response) {
                    var error = exceptionService.getErrorMessage(response);
                    toasterService.showError(error, getTitle(response) + " Error");
                    return response;
                }
            };
        }

        function getTitle(response) {
            var title = _.trimStart($state.current.data.title, " ");
            if (_.endsWith(title, "Status")) {
                title = _.trimEnd(title, "Status");
            }
            if (_.startsWith(title, "Configure")) {
                title = _.trimStart(title, "Configure");
            }
            else if (_.startsWith(title, "View")) {
                title = _.trimStart(title, "View");
            }
            else if (_.endsWith(title, "List")) {
                title = _.trimEnd(title, "List");
            }
            else {
                title = _.trimEnd(title, "s");
            }
            title = title.trim() + " ";
            switch (response.config.method) {
                case "PUT":
                    title += "Delete";
                    break;
                case "POST":
                    title += "Save";
                    break;
                default:
                    title += "Load";
                    break;
            }
            return title;
        }

        function resource(url, paramDefaults, actions, options) {
            actions = angular.extend({}, actions, {
                'get': { method: "GET", interceptor: resourceInterceptor },
                'query': { method: "GET", interceptor: resourceInterceptor, isArray: true },
                'save': { method: "POST", interceptor: resourceInterceptor },
                'saveBatch': { method: "POST", interceptor: resourceInterceptor, isArray: true },
                //
                // The request body is stripped out by $resource 
                // for DELETE requests, so make them a PUT instead.
                //
                'remove': { method: "PUT", interceptor: resourceInterceptor },
                'delete': { method: "PUT", interceptor: resourceInterceptor },
            });

            var result = $resource(url, paramDefaults, actions, options);
            //
            // remove parameters and set url string here so that we can use it in kendo grid data sources
            //
            result.url = url.split("/:", 1)[0]; 
            return result;
        };
    }

})();