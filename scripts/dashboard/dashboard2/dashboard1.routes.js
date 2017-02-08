(function () {

    angular.module("dashboard.dashboard1").config(routes);

    routes.$inject = ["$stateProvider"];

    function routes($stateProvider) {

        $stateProvider
            .state("dashboard.dashboard1",
            {
                //requireADLogin: true,
                //abstract: true,
                template: "<ui-view></ui-view>",
                url: "/dashboard1",
                //redirectTo: "config.calendars.create",
                data: {
                    actions: [
                        //{ title: "Create", icon: "add", state: "config.calendars.create", description: "Create ...." },
                        //{ title: "Capture", icon: "capture", state: "config.calendars.capture", description: "Capture ..." }
                    ]
                }
            })
            .state("dashboard.dashboard1.home",
            {
                //requireADLogin: true,
                url: "",
                templateUrl: "/views/components/dashboard/dashboard1/home.html",
                //redirectTo: "config.calendars.create",
                data: {
                    title: "Dashboard1",
                    blurb: "Here's where you manage your calendars."
                }
            })
            .state("dashboard.dashboard1.create",
            {
                requireADLogin: true,
                url: "/create",
                templateUrl: "/views/components/cp/config/calendars/create.html",
                data: {
                    title: "Create Calendar",
                    blurb: "Create a new calendar."
                }
            })
            .state("dashboard.dashboard1.capture",
            {
                requireADLogin: true,
                url: "/capture",
                templateUrl: "/views/components/cp/config/calendars/capture.html",
                data: {
                    title: "Capture Calendar",
                    blurb: "Capture a calendar."
                }
            })
            .state("dashboard.dashboard1.exceptions",
            {
                requireADLogin: true,
                url: "/exceptions/{calendarId:int}",
                templateUrl: "/views/components/cp/config/calendars/exceptions.html",
                data: {
                    title: "Calendar Exceptions",
                    blurb: ""
                }
            })

    }

})();