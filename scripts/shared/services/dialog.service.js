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