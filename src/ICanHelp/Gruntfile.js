module.exports = function (grunt) {
    'use strict';

    grunt.initConfig({

        concat: {
            app: {
                src: [
                    'App/app.js',
                    'App/Shared/Utils/notificationWidget.js',
                    'App/Shared/Validators/uniqueEmail.js',
                    'App/Shared/Services/initDataProvider.js',
                    'App/Shared/Services/messageBus.js',
                    'App/Shared/Controllers/userPanelController.js',
                    'App/Account/service.js',
                    'App/Account/Login/controller.js',
                    'App/Account/Register/controller.js',
                    'App/Home/Index/controller.js'

                ],
                dest: 'Scripts/app.js',
                flatten: false,

            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.registerTask('default', ['concat']);
}