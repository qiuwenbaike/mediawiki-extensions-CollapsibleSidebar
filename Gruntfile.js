'use strict';

module.exports = function (grunt) {
	const conf = grunt.file.readJSON('extension.json');

	grunt.loadNpmTasks('grunt-banana-checker');
	grunt.loadNpmTasks('grunt-eslint');
	grunt.loadNpmTasks('grunt-stylelint');

	grunt.initConfig({
		eslint: {
			options: {
				cache: true
			},
			all: [ '**/*.{js,json}', '!node_modules/**', '!vendor/**' ]
		},
		stylelint: {
			all: [ '**/*.{css,less}', '!node_modules/**', '!vendor/**' ]
		},
		banana: conf.MessagesDirs
	});

	grunt.registerTask('test', [ 'eslint', 'banana', 'stylelint' ]);
	grunt.registerTask('default', 'test');
};
