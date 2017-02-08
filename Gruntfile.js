module.exports = function(grunt) {
    var filesToMakeAppJS = [

        'scripts/setup/_setup.js',
        'scripts/setup/machine/_machine.js',

        'scripts/dashboard/_dashboard.js',
        'scripts/dashboard/dashboard1/_dashboard1.js',

        'scripts/shared/shared.constants.js',
        'scripts/shared/services/toaster.service.js',
        'scripts/shared/services/resize.service.js',
        'scripts/shared/services/lookups.service.js',
        'scripts/shared/services/exception.service.js',
        'scripts/shared/services/dialog.service.js',
        'scripts/shared/services/api.service.js',
        
        'scripts/app.main.js',
        'scripts/app.config.material.js',
        'scripts/app.config.routes.js',
        'scripts/app.run.js'];

    var filesToWatch = function(){
        return filesToMakeAppJS;
    };
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            app: {
                banner: '/* <%= grunt.template.today("yyyy-mm-dd") %> */\n',
                src: filesToMakeAppJS,
                dest: 'scripts/app/app.js'
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
                sourceMap: true
            },
            build: {
                src: 'scripts/app/app.js',
                dest: 'scripts/app/app.min.js'
            }
        },
        watch: {
            js: {
                files: filesToWatch,
                tasks: ['concat', 'uglify'],
                options: {
                    livereload: true
                }
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Default task(s).
    grunt.registerTask('default', ['concat', 'uglify']);

};