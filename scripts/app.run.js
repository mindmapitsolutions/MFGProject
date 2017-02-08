(function () {

    angular.module("sbAdminApp").run(run);

    run.$inject = ["$rootScope", "$state", "$mdMedia", "$timeout"];

    function run($rootScope, $state, $mdMedia, $timeout) {
        $rootScope.$state = $state;
        $rootScope.$mdMedia = $mdMedia;
        $rootScope.pageTitle = pageTitle;
        $rootScope.includesMenuState = includesMenuState;

        $rootScope.$on("$stateChangeStart", onStateChangeStart);
        $rootScope.$on("$stateChangeSuccess", onStateChangeSuccess);
        $rootScope.$on("$viewContentLoaded", onViewContentLoaded);


        init();

        function includesMenuState(menuState) {
            return $state.includes(menuState.replace(".home", ""));
        }

        function pageTitle() {
            if (!$state.current.data) {
                return "";
            }

            var title = $state.current.data.title + " | " + $state.current.data.homeTitle;
            title = title.toUpperCase();
            document.title = title;
            return title;
        };

        function onStateChangeStart(event, toState, toParams, fromState, fromParams) {
            if (toState.redirectTo) {
                event.preventDefault();
                $state.go(toState.redirectTo, toParams, { location: "replace" });
            }
        }

        function onStateChangeSuccess(event, toState, toParams, fromState, fromParams) {
            //console.log("onStateChangeSuccess.$state", $state);

            //$rootScope.currentAction = _.find($state.current.data.actions, ["state", $state.current.name]);
        }

        function onViewContentLoaded(event, viewConfig) {
            //$timeout(function () {
            //    $(".k-button").addClass("md-raised md-button md-ink-ripple");

            //    // by-pass ui-router for sign in/out links
            //    $("li[target='_self'] a").attr("target", "_self");
            //}, 50);
        }

        //function fetchStateActions() {
        //    if (!$state.current.data) {
        //        stateActionsService.query({ state: "", lang: "en-us" });
        //    }
        //}

        function init() {
            console.log("logging in");
        }
    }

})();