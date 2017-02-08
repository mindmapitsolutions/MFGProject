(function () {

    angular.module("sb.dashboard", [
        "dashboard.dashboard1",
        //"dashboard.dashboard2",
        //"dashboard.dashboard3",
        //"dashboard.dashboard4",
    ]);

})();
(function () {

    angular.module("sb.dashboard", []).config(routes);

    routes.$inject = ["$stateProvider"];

    function routes($stateProvider) {

        $stateProvider
            .state("dashboard",
            {
                //requireADLogin: true,
                abstract: true,
                templateUrl: "views/components/dashboard/_layout.html",
                url: "/dashboard",
                data: {
                    homeTitle: "Dashboard",
                    rootState: "dashboard",
                    menu: [
                        { title: "dashboard1", icon: "statistics", state: "dashboard.dashboard1.home" },
                        { title: "dashboard2", icon: "exceptions", state: "dashboard.dashboard2.home" },
                        { title: "dashboard3", icon: "plannerTracker", state: "dashboard.dashboard3.home" },
                        { title: "dashboard4", icon: "customerTracker", state: "dashboard.dashboard4.home" },
                    ]
                }
            });
    }

})();