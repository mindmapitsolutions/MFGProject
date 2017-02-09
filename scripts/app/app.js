(function () {

    angular.module("sb.setup", [
        "setup.machine"
        //"dashboard.dashboard2",
        //"dashboard.dashboard3",
        //"dashboard.dashboard4",
    ]);

})();
(function () {

    angular.module("setup.machine", [
        //"dashboard.dashboard1",
        //"dashboard.dashboard2",
        //"dashboard.dashboard3",
        //"dashboard.dashboard4",
    ]);

})();
(function () {

    angular.module("sb.dashboard", [
        "dashboard.dashboard1",
        //"dashboard.dashboard2",
        //"dashboard.dashboard3",
        //"dashboard.dashboard4",
    ]);

})();
(function () {

    angular.module("dashboard.dashboard1", [
        //"dashboard.dashboard1",
        //"dashboard.dashboard2",
        //"dashboard.dashboard3",
        //"dashboard.dashboard4",
    ]);

})();
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
(function () {

    angular.module("dashboard.dashboard1")
        .service("dashboardService", DashboardService);

    DashboardService.$inject = ["apiService"];

    function DashboardService(apiService) {
        return apiService("api/dashboard/:accountStructureId/:parentId/:searchTerm");
    }


})();
(function () {

    angular.module("sb.shared",
        [
            //"ngSanitize",
            "ngAnimate",
            "ngResource"
        ])
        .constant("SHARED_GRID_OFFSET", 190)
        .constant("TABLE_DEFAULTS",
        {
            COLUMN_WIDTH: "165px",
            DATE_FORMAT: "{0:dd-MMM-yyyy HH:mm}",
            CAL_EXCEP_FORMAT: "{0:dd-MM-yyyy}",
            PAGE_SIZE: 50,
            PAGE_SIZES: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
        });

})();
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
(function () {

    angular.module("sb.shared")
        .service("resizeService", ResizeService);

    ResizeService.$inject = [];

    function ResizeService() {
        var vm = this;

        vm.resizeElement = resizeElement;
        vm.resizeWidth = resizeWidth;
        vm.attachResizer = attachResizer;

        function attachResizer(resizer) {
            if (window.attachEvent) {
                window.attachEvent("onresize", resizer);
            }
            else if (window.addEventListener) {
                window.addEventListener("resize", resizer, true);
            }
        }

        function resizeElement($element, offset) {
            var minHeight = 100;
            var height = 0;
            if (window.innerHeight) {
                height = window.innerHeight;
            }
            else if (body.parentElement.clientHeight) {
                height = body.parentElement.clientHeight;
            }
            else if (body && body.clientHeight) {
                height = body.clientHeight;
            }
            height -= offset || 92;

            if (height < minHeight) {
                height = minHeight;
            }
            $element.height(height);
        }

        function resizeWidth($element, offset) {
            var width = 0;
            if (window.innerWidth) {
                width = window.innerWidth;
            }
            else if (body.parentElement.clientWidth) {
                width = body.parentElement.clientWidth;
            }
            else if (body && body.clientWidth) {
                width = body.clientWidth;
            }

            width -= offset;

            if (width < 400) {
                $element.width(400);
            }
            else {
                $element.width(width);
            }
            
        }
    }

})();
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
(function() {

    angular.module("sb.shared")
        .factory("_", Lodash);

    Lodash.$inject = [];

    function Lodash() {
        return window._;  // Lodash must already be loaded on the page
    }

})();
(function() {

    angular.module("sb.shared")
        .service("exceptionService", ExceptionService);

    ExceptionService.$inject = ["_"];

    function ExceptionService(_) {
        var vm = this;
        vm.getErrorMessage = getErrorMessage;

        function getErrorMessage(ex) {
            var result = [];
            if (ex.data) {
                ex = ex.data;
            }
            if (ex.exceptionMessage) {
                while (ex) {
                    var msg = ex.exceptionMessage.replace(" See the inner exception for details.", "");
                    var shouldAdd = true;
                    if (result.length > 0) {
                        shouldAdd = result[result.length - 1] !== msg;
                    }
                    if (shouldAdd) {
                        switch (msg) {
                            case "One or more errors occurred.":
                                break;
                            default:
                                result.push(msg);
                                break;
                        }
                    }
                    ex = ex.innerException;
                }
            }
            else if (ex.message) {
                result.push(ex.message);
            }
            else if (_.startsWith(ex, "<!DOCTYPE html>")) {
                // html doc with error message
                var errorsRegex = /<div class="titleerror">(.*)<\/div>/gi;
                var match = errorsRegex.exec(ex);
                if (match != null) {
                    var h1Matches = ex.match(/<h1>(.*)<\/h1>/);
                    if (h1Matches.length > 1) {
                        result.push(h1Matches[1]);
                    }
                    while (match != null) {
                        result.push(match[1]);
                        match = errorsRegex.exec(ex);
                    }
                }
                else {
                    // html doc with error message in title element
                    var matches = ex.match(/<title>(.*)<\/title>/);
                    if (matches.length > 1) {
                        result.push(matches[1]);
                    }
                }
            }
            else if ((typeof ex) === "string") {
                result.push(ex);
            }
            return _.reduce(result, function (s, e) { return s + (s ? " " : "") + e; });
        }
    }

})();
(function() {

    angular.module("sb.shared")
        .service("dialogService", DialogService);

    DialogService.$inject = ["$mdDialog", "$state", "_", "$templateRequest", "$q", "$mdConstant"];

    function DialogService($mdDialog, $state, _, $templateRequest, $q, $mdConstant) {
        var vm = this;

        vm.confirm = confirm;
        vm.confirmDelete = confirmDelete;
        vm.confirmItemDelete = confirmItemDelete;
        vm.copy = copy;
        vm.show = show;
        vm.hideDialog = hideDialog;

        var dialogOrigin = {
            top: -50,
            width: 30,
            height: 80
        };
        var dialogDest = {
            left: 1500
        };

        function hideDialog() {
            $mdDialog.cancel();
        }


        function confirm($event, title, htmlContent, ok, cancel, $scope, okDisabledOverride) {

            var dlg = $mdDialog.confirm()
                .title(title)
                .ariaLabel(title)
                .targetEvent($event)
                .openFrom(dialogOrigin)
                .closeTo(dialogDest)
                .ok(ok || "Yes")
                .cancel(cancel || "No");

            if (htmlContent.indexOf(".html") === -1) {
                dlg.htmlContent(htmlContent);
                return $mdDialog.show(dlg);
            }

            return showTemplatedDialog(dlg, htmlContent, $scope, false, okDisabledOverride);
        }

        function confirmItemDelete($event, dataItem, $kendoCtrl) {
            var title = $state.current.data.title.toLowerCase();
            if (_.endsWith(title, "status")) {
                title = _.trimEnd(title, "status");
            }
            else {
                title = _.trimEnd(title, "s");
            }

            //var $promise = confirmDelete($event, title.trim() + " " + dataItem.id);
            var $promise = confirmDelete($event, dataItem.id);
            $promise.then(function() {
                    // yes
                    if ($kendoCtrl) {
                        $kendoCtrl.dataSource.remove(dataItem);
                    }
                },
                function() {
                    // no
                });
            return $promise;
        }

        function confirmDelete($event, resourceName) {
            var dlg = $mdDialog.confirm()
                .title("Confirm Delete")
                .textContent("Are you sure you want to delete this item : " + resourceName + "?")
                .ariaLabel("Confirm Delete")
                .targetEvent($event)
                .openFrom(dialogOrigin)
                .closeTo(dialogDest)
                .ok("Yes")
                .cancel("No");

            var $promise = $mdDialog.show(dlg);
            return $promise;
        }

        function copy($event, dataItem) {
            var title = _.trimEnd($state.current.data.title, "s").replace("Edit ", "").replace("Detail", "").replace("Configure ", "").trim();
            var dlg = $mdDialog.prompt()
                .title("Copy " + title)
                .textContent("Please enter a new name.")
                .placeholder(title + " Name")
                .ariaLabel(title + " Name")
                .initialValue(dataItem.name)
                .targetEvent($event)
                .openFrom(dialogOrigin)
                .closeTo(dialogDest)
                .ok("Copy")
                .cancel("Cancel");

            return $mdDialog.show(dlg);
        }

        function show($event, title, htmlContent, ok, $scope, okDisabledOverride) {

            var dlg = $mdDialog.alert()
                .title(title)
                .ariaLabel(title)
                .targetEvent($event)
                .openFrom(dialogOrigin)
                .closeTo(dialogDest)
                .ok(ok || "Ok");

            if (htmlContent.indexOf(".html") === -1) {
                dlg.htmlContent(htmlContent);
                return $mdDialog.show(dlg);
            }

            return showTemplatedDialog(dlg, htmlContent, $scope, true, okDisabledOverride);
        }

        function showTemplatedDialog(dlg, templateUrl, $scope, hideCancel, okDisabledOverride) {
            var d = $q.defer();

            $templateRequest(templateUrl)
                .then(function (template) {
                    var htmlTemplate = [
                            '<md-dialog md-theme="{{ dialog.theme }}" aria-label="{{ dialog.ariaLabel }}" ng-class="dialog.css">',
                            '  <md-dialog-content class="md-dialog-content" role="document" tabIndex="-1">',
                            '    <h2 class="md-title">{{ dialog.title }}</h2>',
                            '    <div class="md-dialog-content-body">',
                            '<form name="dialogForm">',
                            template,
                            "</form>",
                            "    </div>",
                            "  </md-dialog-content>",
                            "  <md-dialog-actions>",
                            hideCancel ? "" : '    <md-button ng-click="dialog.abort()" class="md-primary">',
                            hideCancel ? "" : "      {{ dialog.cancel }}",
                            hideCancel ? "" : "    </md-button>",
                            '    <md-button ng-click="dialog.okClick()" ng-disabled="dialog.okDisabled() && (dialogForm.$invalid || dialogForm.$pristine)" class="md-primary">',
                            "      {{ dialog.ok }}",
                            "    </md-button>",
                            "  </md-dialog-actions>",
                            "</md-dialog>"
                    ].join("")
                        .replace(/\s\s+/g, "");

                    dlg._options.template = htmlTemplate;
                    dlg._options.scope = $scope;
                    dlg._options.preserveScope = true;
                    dlg._options.controller = function () {
                        this.okDisabled = function() {
                            if (hideCancel) {
                                return false;
                            }
                            if (okDisabledOverride) {
                                return okDisabledOverride();
                            }
                            return true;
                        }
                        this.okClick = function () {
                            if (hideCancel) {
                                this.abort();
                            }
                            this.hide();
                        }
                        this.hide = function () {
                            $mdDialog.hide(true);
                        };
                        this.abort = function () {
                            $mdDialog.cancel();
                        };
                        this.keypress = function ($event) {
                            if ($event.keyCode === $mdConstant.KEY_CODE.ENTER) {
                                $mdDialog.hide(true);
                            }
                        }
                    };
                    $mdDialog.show(dlg).then(d.resolve, d.reject);
                });

            return d.promise;
        }
    }

})();
(function() {

    angular.module("sb.shared")
        .factory("apiService", ApiService);

    ApiService.$inject = ["$resource", "toasterService", "$state", "exceptionService"];

    function ApiService($resource, toasterService, $state, exceptionService) {
        var resourceInterceptor = createResourceInterceptor();
        return resource;

        function createResourceInterceptor() {            
            return {
                response: function (response) {
                    if (response.config.method !== "GET") {
                        toasterService.showSuccess(getTitle(response) + "d");
                    }
                    return response.data;
                },
                responseError: function (response) {
                    var error = exceptionService.getErrorMessage(response);
                    toasterService.showError(error, getTitle(response) + " Error");
                    return response;
                }
            };
        }

        function getTitle(response) {
            var title = _.trimStart($state.current.data.title, " ");
            if (_.endsWith(title, "Status")) {
                title = _.trimEnd(title, "Status");
            }
            if (_.startsWith(title, "Configure")) {
                title = _.trimStart(title, "Configure");
            }
            else if (_.startsWith(title, "View")) {
                title = _.trimStart(title, "View");
            }
            else if (_.endsWith(title, "List")) {
                title = _.trimEnd(title, "List");
            }
            else {
                title = _.trimEnd(title, "s");
            }
            title = title.trim() + " ";
            switch (response.config.method) {
                case "PUT":
                    title += "Delete";
                    break;
                case "POST":
                    title += "Save";
                    break;
                default:
                    title += "Load";
                    break;
            }
            return title;
        }

        function resource(url, paramDefaults, actions, options) {
            actions = angular.extend({}, actions, {
                'get': { method: "GET", interceptor: resourceInterceptor },
                'query': { method: "GET", interceptor: resourceInterceptor, isArray: true },
                'save': { method: "POST", interceptor: resourceInterceptor },
                'saveBatch': { method: "POST", interceptor: resourceInterceptor, isArray: true },
                //
                // The request body is stripped out by $resource 
                // for DELETE requests, so make them a PUT instead.
                //
                'remove': { method: "PUT", interceptor: resourceInterceptor },
                'delete': { method: "PUT", interceptor: resourceInterceptor },
            });

            var url = "http://www.google.com/" + url
            var result = $resource(url, paramDefaults, actions, options);
            //
            // remove parameters and set url string here so that we can use it in kendo grid data sources
            //
            result.url = url.split("/:", 1)[0]; 
            return result;
        };
    }

})();
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
(function () {

    angular.module("sbAdminApp")
        .config(materialConfig);

    materialConfig.$inject = ["$mdThemingProvider", "$mdIconProvider"];
    function materialConfig($mdThemingProvider, $mdIconProvider) {
        $mdThemingProvider.theme("default")
            .primaryPalette("blue")
            .accentPalette("grey")
            .warnPalette("red")
            .backgroundPalette("grey");

        $mdIconProvider
            .icon("action_accountsets_black", "/images/mo/actions/accountsets_black.svg")
            .icon("action_accountsets_white", "/images/mo/actions/accountsets_white.svg")
            .icon("action_allocationrulesets_black", "/images/mo/actions/allocationrulesets_black.svg")
            .icon("action_allocationrulesets_white", "/images/mo/actions/allocationrulesets_white.svg")
            .icon("action_catalogsets_black", "/images/mo/actions/catalogsets_black.svg")
            .icon("action_catalogsets_white", "/images/mo/actions/catalogsets_white.svg")
            .icon("action_costcentresets_black", "/images/mo/actions/costcentresets_black.svg")
            .icon("action_costcentresets_white", "/images/mo/actions/costcentresets_white.svg")
            .icon("action_driversets_black", "/images/mo/actions/driversets_black.svg")
            .icon("action_driversets_white", "/images/mo/actions/driversets_white.svg")

            .icon("action_add_black", "/images/mo/actions/add_black.svg")
            .icon("action_add_white", "/images/mo/actions/add_white.svg")
            .icon("action_configurationgroups_black", "/images/mo/actions/configurationgroups_black.svg")
            .icon("action_configurationgroups_white", "/images/mo/actions/configurationgroups_white.svg")
            .icon("action_gridview_black", "/images/mo/actions/gridview_black.svg")
            .icon("action_gridview_white", "/images/mo/actions/gridview_white.svg")
            .icon("action_mapping", "/images/mo/actions/mapping.svg")
            .icon("action_signoff_black", "/images/mo/actions/signoff_black.svg")
            .icon("action_signoff_white", "/images/mo/actions/signoff_white.svg")
            .icon("action_treeview_black", "/images/mo/actions/treeview_black.svg")
            .icon("action_treeview_white", "/images/mo/actions/treeview_white.svg")
            .icon("action_upload_black", "/images/mo/actions/upload_black.svg")
            .icon("action_upload_white", "/images/mo/actions/upload_white.svg")

            .icon("menu_black", "/images/mo/menu/menu_black.svg")
            .icon("menu_white", "/images/mo/menu/menu_white.svg")
            .icon("menu_calendars_black", "/images/mo/menu/calendars_black.svg")
            .icon("menu_calendars_white", "/images/mo/menu/calendars_white.svg")
            .icon("menu_consolidation_black", "/images/mo/menu/consolidation_black.svg")
            .icon("menu_consolidation_white", "/images/mo/menu/consolidation_white.svg")
            .icon("menu_dashboard_black", "/images/mo/menu/dashboard_black.svg")
            .icon("menu_dashboard_white", "/images/mo/menu/dashboard_white.svg")
            .icon("menu_costcentres_black", "/images/mo/menu/costcentres_black.svg")
            .icon("menu_costcentres_white", "/images/mo/menu/costcentres_white.svg")
            .icon("menu_contraintMeasures_black", "/images/mo/menu/contraintMeasures_black.svg")
            .icon("menu_contraintMeasures_white", "/images/mo/menu/contraintMeasures_white.svg")
            .icon("menu_standardrates_black", "/images/mo/menu/standardrates_black.svg")
            .icon("menu_standardrates_white", "/images/mo/menu/standardrates_white.svg")
            .icon("menu_allocationrules_black", "/images/mo/menu/allocationrules_black.svg")
            .icon("menu_allocationrules_white", "/images/mo/menu/allocationrules_white.svg")
            .icon("menu_uom_black", "/images/mo/menu/uom_black.svg")
            .icon("menu_uom_white", "/images/mo/menu/uom_white.svg")
            .icon("menu_companies_black", "/images/mo/menu/companies_black.svg")
            .icon("menu_companies_white", "/images/mo/menu/companies_white.svg")
            .icon("menu_exceptions_white", "/images/mo/menu/exceptions_white.svg")
            .icon("menu_exceptions_black", "/images/mo/menu/exceptions_black.svg")
            .icon("menu_orders_white", "/images/mo/menu/orders_white.svg")
            .icon("menu_orders_black", "/images/mo/menu/orders_black.svg")
            .icon("menu_home_black", "/images/mo/menu/home_black.svg")
            .icon("menu_home_white", "/images/mo/menu/home_white.svg")
            .icon("menu_processes_black", "/images/mo/menu/processes_black.svg")
            .icon("menu_processes_white", "/images/mo/menu/processes_white.svg")
            .icon("menu_plans_black", "/images/mo/menu/plans_black.svg")
            .icon("menu_plans_white", "/images/mo/menu/plans_white.svg")
            .icon("menu_manualplan_black", "/images/mo/menu/manualplan_black.svg")
            .icon("menu_manualplan_white", "/images/mo/menu/manualplan_white.svg")
            .icon("menu_tickLists_black", "/images/mo/menu/tickLists_black.svg")
            .icon("menu_tickLists_white", "/images/mo/menu/tickLists_white.svg")
            .icon("menu_tickListsexception_black", "/images/mo/menu/tickListsexception_black.svg")
            .icon("menu_tickListsexception_white", "/images/mo/menu/tickListsexception_white.svg")
            .icon("menu_users_black", "/images/mo/menu/users_black.svg")
            .icon("menu_users_white", "/images/mo/menu/users_white.svg")
            .icon("menu_importfilespecification_black", "/images/mo/menu/importfilespecification_black.svg")
            .icon("menu_importfilespecification_white", "/images/mo/menu/importfilespecification_white.svg")
            .icon("menu_attributes_black", "/images/mo/menu/attributes_black.svg")
            .icon("menu_attributes_white", "/images/mo/menu/attributes_white.svg")

            .icon("delete", "/images/mo/buttons/delete.svg")
            .icon("sign_off", "/images/mo/buttons/signoff.svg")

            .icon("add", "/images/mo/buttons/add.svg")
            .icon("arrow_back", "/images/mo/buttons/arrow_back.svg")
            .icon("edit", "/images/mo/buttons/edit.svg")
            .icon("copy", "/images/mo/buttons/copy.svg")
            .icon("expand_less", "/images/mo/buttons/expand_less.svg")
            .icon("expand_more", "/images/mo/buttons/expand_more.svg")
            .icon("search", "/images/mo/buttons/search.svg")
            .icon("save", "/images/mo/buttons/save.svg")
            .icon("undo", "/images/mo/buttons/undo.svg")
            .icon("keyboard_arrow_left", "/images/mo/buttons/keyboard_arrow_left.svg")
            .icon("keyboard_arrow_right", "/images/mo/buttons/keyboard_arrow_right.svg")
            .icon("download", "/images/mo/buttons/download.svg")
            .icon("show_chart", "/images/mo/buttons/show_chart.svg")
            .icon("view_page", "/images/mo/buttons/view_page.svg")
            .icon("view_exception", "/images/mo/buttons/view_exception.svg")
            .icon("back", "/images/mo/buttons/back48px.svg")
            .icon("play_arrow", "/images/mo/buttons/play_arrow.svg")
            .icon("play_check", "/images/mo/buttons/play_check.svg")
            .icon("play_circle_filled", "/images/mo/buttons/play_circle_filled.svg")
            .icon("done_black", "/images/mo/buttons/done_black.svg")
            .icon("done_white", "/images/mo/buttons/done_white.svg")

        ;
    }


})();
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
                        { title: "Add", icon: "add", state: "setup.machine.add", description: "add ...." },
                        { title: "View", icon: "view", state: "setup.machine.view", description: "view ..." }
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
            .state("setup.machine.add",
            {
                //requireADLogin: true,
                url: "add",
                templateUrl: "views/components/setup/machine/add.html",
                //redirectTo: "config.calendars.create",
                data: {
                    title: "Add a new machine",
                    blurb: "Here's where you manage your Machines."
                }
            })
            .state("setup.machine.view",
            {
                //requireADLogin: true,
                url: "view",
                templateUrl: "views/components/setup/machine/view.html",
                //redirectTo: "config.calendars.create",
                data: {
                    title: "View Machine",
                    blurb: "Here's where you manage your Machines."
                }
            })
        ;
    }

})();
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