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