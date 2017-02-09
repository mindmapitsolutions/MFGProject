(function () {

    angular.module("dashboard.dashboard1")
        .service("dashboardService", DashboardService);

    DashboardService.$inject = ["apiService"];

    function DashboardService(apiService) {
        return apiService("api/dashboard/:accountStructureId/:parentId/:searchTerm");
    }


})();