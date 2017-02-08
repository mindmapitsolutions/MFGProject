(function() {

    angular.module("sb.shared")
        .service("toasterService", ToasterService)
        .controller("toastCtrl", ToasterController);

    ToasterService.$inject = ["$mdToast"];

    function ToasterService($mdToast) {
        var vm = this;
        vm.showError = function (message, title) { show("error", message, title) };
        vm.showInfo = function (message) { show("info", message) };
        vm.showSuccess = function (message) { show("success", message) };
        vm.showWarning = function (message) { show("warning", message) };


        function show(type, msg, title) {
            if (type === "error" && title) {
                msg = "<div> <div><b>" + title + "</b></div> <div class=\"mt\">" + msg + "</div> <div>";
            }
            $mdToast.show({
                controller: "toastCtrl",
                template: "<md-toast class=\"md-toast\"><div ng-click=\"closeToast()\" class=\"md-toast-content " + type + "\">" + msg + "</div></md-toast>",
                hideDelay: type === "error" ? 0 : 3000, // error -> toast stays open until closed manually
                position: "top right"
            });
        }
    }

    ToasterController.$inject = ["$scope", "$mdToast"];

    function ToasterController($scope, $mdToast) {
        $scope.closeToast = function () {
            $mdToast.hide();
        };
    }
})();