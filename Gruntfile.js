module.exports = function (grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg : grunt.file.readJSON('package.json'),
		uglify : {
			build : {
				files : {
					'build/website/website.min.js' : ['src/website/website.js'],
					'build/jsfiddle/fr/jsfiddle.fr.min.js' : ['src/jsfiddle/fr/*.js'],
					'build/jsfiddle/de/jsfiddle.de.min.js' : ['src/jsfiddle/de/*.js']
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
