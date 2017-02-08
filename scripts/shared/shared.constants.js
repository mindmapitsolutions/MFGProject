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