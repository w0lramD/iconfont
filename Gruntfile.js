/*jshint node:true*/

var path = require('path');

module.exports = function(grunt) {
	'use strict';

	require('load-grunt-tasks')(grunt);

	grunt.initConfig({

		webfont: {
			icons: {
				src: "./icons/src/*.svg",
				dest: "./icons/font/",

				options: {
					hashes: false,
					type: 'eot,woff,ttf,svg',
					startCodepoint: 0x0021,
					fontHeight: 1000,
					descent: 210,
					normalize: false,
					stylesheets: ['css', 'scss'],
					codepointsFile: "./icons/template/codepoints.json",

					template: "./icons/template/template.css",
					htmlDemoTemplate: "./icons/template/template.html",

					destCss: "./icons/font/css/",
					destScss: "./icons/font/css/scss/",

					htmlDemo: true,
					destHtml: "./icons/demo/"
				}
			}
		},


		nodeunit: {
			all: ['test/webfont_test.js']
		},
		jshint: {
			all: ['Gruntfile.js', 'tasks/*.js', 'test/*.js'],
			options: {
				jshintrc: true
			}
		},
		watch: {
			scripts: {
				files: '<%= jshint.all %>',
				tasks: ['jshint', 'jscs'],
				options: {
					debounceDelay: 100,
					nospawn: true
				}
			},
		},
		jscs: {
			options: {
				config: ".jscs.json",
			},
			all: ['tasks/*.js']
		},
		clean: ['test/tmp']
	});

	grunt.loadTasks('tasks');

	grunt.registerTask('test', ['nodeunit']);
	// grunt.registerTask('default', ['jshint', 'jscs', 'clean', 'webfont', 'test', 'clean']);
	grunt.registerTask('default', ['webfont']);

};
