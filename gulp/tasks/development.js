'use strict';

var gulp        = require('gulp');
var runSequence = require('run-sequence');

gulp.task('dev', ['clean'], function(cb) {

  cb = cb || function() {};

  global.isProd = false;

  // Run all tasks once, then start to watch
  runSequence('sass', 'imagemin', 'browserify', 'copyFonts', 'copyIndex', 'copyIcons', 'watch', cb);

});