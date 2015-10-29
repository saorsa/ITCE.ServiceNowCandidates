module.exports = function (grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg : grunt.file.readJSON('package.json'),
		uglify : {
			build : {
				files : {
					'build/website/website.min.js' : ['src/website/website.js'],
					'build/pastebin/fr/<%= pkg.name %>.min.js' : ['src/pastebin/fr/<%= pkg.name %>.js'],
					'build/pastebin/de/<%= pkg.name %>.min.js' : ['src/pastebin/de/<%= pkg.name %>.js']
				}
			}
		},
		watch : {
			scripts : {
				files : ['src/**/*.js'],
				tasks : ['uglify']
			}
		},
		karma : {
			unit : {
				options : {
					frameworks: ['jasmine'],
					files : ['test/**/*.js','src/**/*.js']
				},
				singleRun : false,			
				logLevel : 'DEBUG'
			}
		}
	});
	grunt.event.on('watch', function (action, filepath) {
		grunt.config(['uglify', 'build', 'src'], filepath);
	});
	// Load the plugin that provides the "uglify" task.
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-karma');
	// Default task(s).
	grunt.registerTask('default', ['uglify', 'watch','karma']);
}
