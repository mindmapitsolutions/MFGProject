(function () {

    angular.module("dashboard.dashboard1")
        .directive("sbDashboardView", DashboardView);

    DashboardView.$inject = ["resizeService"];

    function DashboardView(resizeService) {
        var directive = {
            restrict: "AE",
            replace: false,
            templateUrl: "/views/components/dashboard/dashboard1/view.html",
            link: linkFunc,
            controller: DashboardViewController,
            controllerAs: "vm"
        };
        return directive;

        function linkFunc(scope, element) {
            
        }
    }

    DashboardViewController.$inject = ["$scope", "dashboardService", "lookupsService", "TABLE_DEFAULTS"];

    function DashboardViewController($scope, dashboardService, lookupsService, TABLE_DEFAULTS) {
        var vm = this;
        vm.dashboardParams = {
            id: 0,
            machineId:0
        }
        vm.machineConfig = dashboardService.get(vm.dashboardParams,
            function (response) {
                console.log(response);
            },
            function (error) {
                console.log(error);
            });
    }

})();