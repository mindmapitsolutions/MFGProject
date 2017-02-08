(function() {

    angular.module("sbAdminApp",
        [
            "ngMaterial", // https://material.angularjs.org
            "ngMessages",
            "ui.router",
            "sb.shared",
            "sb.dashboard",
            "sb.setup"
            //"kendo.directives",
            //"cp.shared",
            //"cp.config",
            //"cp.planning",
            //"cp.setup",
            //"cp.analysis"
        ])
        .config(config);

    config.$inject = ["$compileProvider"];

    function config($compileProvider) {

        $compileProvider.debugInfoEnabled(true);
    }


})();