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