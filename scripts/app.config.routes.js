(function () {

    angular.module("sbAdminApp")
        .config(routes);

    routes.$inject = ["$urlRouterProvider", "$locationProvider", "$stateProvider"];
    function routes($urlRouterProvider, $locationProvider, $stateProvider) {
        var defaultUrl = "/dashboard/dashboard1";

        $locationProvider.html5Mode(true);
        $locationProvider.hashPrefix("!");  // helps prevent infinite redirect loop in html5Mode when using adal.js

        $urlRouterProvider
            .when("/", defaultUrl)
            .when("", defaultUrl)
            .otherwise(defaultUrl);

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
                        { title: "dashboard1", icon: "dashboard", state: "dashboard.dashboard1.home" },
                        { title: "dashboard2", icon: "exceptions", state: "dashboard.dashboard2.home" },
                        { title: "dashboard3", icon: "dashboard", state: "dashboard.dashboard3.home" },
                        { title: "dashboard4", icon: "dashboard", state: "dashboard.dashboard4.home" },
                    ]
                }
            })
            .state("dashboard.dashboard1",
            {
                //requireADLogin: true,
                abstract: true,
                template: "<ui-view></ui-view>",
                url: "/dashboard1",
                //redirectTo: "config.calendars.create",
                data: {
                    actions: [
                        { title: "Machine1", icon: "add", state: "config.calendars.create", description: "Create ...." },
                        { title: "Machine2", icon: "capture", state: "config.calendars.capture", description: "Capture ..." }
                    ]
                }
            })
            .state("dashboard.dashboard1.home",
            {
                //requireADLogin: true,
                url: "",
                templateUrl: "views/components/dashboard/dashboard1/home.html",
                //redirectTo: "config.calendars.create",
                data: {
                    title: "Dashboard1",
                    blurb: "Here's where you manage your dashboard."
                }
            })
            .state("dashboard.dashboard1.create",
            {
                //requireADLogin: true,
                url: "/create",
                templateUrl: "/views/components/cp/config/calendars/create.html",
                data: {
                    title: "Create Calendar",
                    blurb: "Create a new calendar."
                }
            })
            .state("dashboard.dashboard1.capture",
            {
                //requireADLogin: true,
                url: "/capture",
                templateUrl: "/views/components/cp/config/calendars/capture.html",
                data: {
                    title: "Capture Calendar",
                    blurb: "Capture a calendar."
                }
            })
            .state("dashboard.dashboard1.exceptions",
            {
                //requireADLogin: true,
                url: "/exceptions/{calendarId:int}",
                templateUrl: "/views/components/cp/config/calendars/exceptions.html",
                data: {
                    title: "Calendar Exceptions",
                    blurb: ""
                }
            })
            .state("dashboard.dashboard2",
            {
                //requireADLogin: true,
                abstract: true,
                template: "<ui-view></ui-view>",
                url: "/dashboard2",
                //redirectTo: "config.calendars.create",
                data: {
                    actions: [
                        { title: "Machine1", icon: "add", state: "config.calendars.create", description: "Create ...." },
                        { title: "Machine2", icon: "capture", state: "config.calendars.capture", description: "Capture ..." }
                    ]
                }
            })
            .state("dashboard.dashboard2.home",
            {
                //requireADLogin: true,
                url: "",
                templateUrl: "views/components/dashboard/dashboard2/home.html",
                //redirectTo: "config.calendars.create",
                data: {
                    title: "Dashboard2",
                    blurb: "Here's where you manage your dashboard."
                }
            })
            .state("dashboard.dashboard3",
            {
                //requireADLogin: true,
                abstract: true,
                template: "<ui-view></ui-view>",
                url: "/dashboard3",
                //redirectTo: "config.calendars.create",
                data: {
                    actions: [
                        { title: "Machine1", icon: "add", state: "config.calendars.create", description: "Create ...." },
                        { title: "Machine2", icon: "capture", state: "config.calendars.capture", description: "Capture ..." }
                    ]
                }
            })
            .state("dashboard.dashboard3.home",
            {
                //requireADLogin: true,
                url: "",
                templateUrl: "views/components/dashboard/dashboard3/home.html",
                //redirectTo: "config.calendars.create",
                data: {
                    title: "Dashboard3",
                    blurb: "Here's where you manage your dashboard."
                }
            })
            .state("dashboard.dashboard4",
            {
                //requireADLogin: true,
                abstract: true,
                template: "<ui-view></ui-view>",
                url: "/dashboard4",
                //redirectTo: "config.calendars.create",
                data: {
                    actions: [
                        { title: "Machine1", icon: "add", state: "config.calendars.create", description: "Create ...." },
                        { title: "Machine2", icon: "capture", state: "config.calendars.capture", description: "Capture ..." }
                    ]
                }
            })
            .state("dashboard.dashboard4.home",
            {
                //requireADLogin: true,
                url: "",
                templateUrl: "views/components/dashboard/dashboard4/home.html",
                //redirectTo: "config.calendars.create",
                data: {
                    title: "Dashboard4",
                    blurb: "Here's where you manage your dashboard."
                }
            })
            .state("setup",
            {
                //requireADLogin: true,
                abstract: true,
                templateUrl: "views/components/setup/_layout.html",
                url: "/setup",
                data: {
                    homeTitle: "Setup",
                    rootState: "setup",
                    menu: [
                        { title: "Machine", icon: "dashboard", state: "setup.machine.home" },
                    ]
                }
            })
            .state("setup.machine",
            {
                //requireADLogin: true,
                abstract: true,
                template: "<ui-view></ui-view>",
                url: "/machine",
                //redirectTo: "config.calendars.create",
                data: {
                    actions: [
                        { title: "Machine1", icon: "add", state: "setup.machine.create", description: "Create ...." },
                        { title: "Machine2", icon: "capture", state: "setup.machine.capture", description: "Capture ..." }
                    ]
                }
            })
            .state("setup.machine.home",
            {
                //requireADLogin: true,
                url: "",
                templateUrl: "views/components/setup/machine/home.html",
                //redirectTo: "config.calendars.create",
                data: {
                    title: "Machine",
                    blurb: "Here's where you manage your Machines."
                }
            })
        ;
    }

})();