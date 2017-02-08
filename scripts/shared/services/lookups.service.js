(function () {

    angular.module("sb.shared")
        .factory("lookupsService", LookupsService);

    LookupsService.$inject = ["apiService", "$rootScope"];

    function LookupsService(apiService, $rootScope) {
        var vm = this;

        vm.status = function (responseFunc) { return query("status", responseFunc); }
        vm.calendar = function (responseFunc) { return query("Calendars", responseFunc); }
        vm.constraints = function (responseFunc) { return query("Constraints", responseFunc); }
        vm.process = function (responseFunc) { return query("Process", responseFunc); }
        vm.operator = function (responseFunc) { return query("Operator", responseFunc); }
        vm.exceptions = function (responseFunc) { return query("Exceptions", responseFunc); }
        vm.unitMeasure = function (responseFunc) { return query("UnitMeasure", responseFunc); }
        vm.exceptionOprator = function (responseFunc) { return query("ExceptionOprator", responseFunc); }
        vm.year = function (responseFunc) { return query("Year", responseFunc); }
        vm.clients = function (responseFunc) { return query("Clients", responseFunc); }
        vm.planStatus = function (responseFunc) { return query("PlanStatus", responseFunc); }
        vm.planOverrideStatus = function (responseFunc) { return query("PlanOverrideStatus", responseFunc); }
        vm.planningAction = function (responseFunc) { return query("PlanningAction", responseFunc); }
        vm.planExceptions = function (responseFunc) { return query("PlanExceptions", responseFunc); }
        vm.plans = function (responseFunc) { return query("Plans", responseFunc); }
        vm.planProcess = function (responseFunc) { return query("PlanProcess", responseFunc); }

        vm.instance = apiService("api/lookups/:resourceType/:divisionId");

        function query(resourceType, responseFunc) {
            return vm.instance.query({ resourceType: resourceType, divisionId: $rootScope.division }, responseFunc);
        }

        return vm;
    }

})();