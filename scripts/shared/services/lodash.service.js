(function() {

    angular.module("sb.shared")
        .factory("_", Lodash);

    Lodash.$inject = [];

    function Lodash() {
        return window._;  // Lodash must already be loaded on the page
    }

})();