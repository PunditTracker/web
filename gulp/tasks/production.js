'use strict';

var gulp        = require('gulp');
var runSequence = require('run-sequence');

gulp.task('prod', ['clean'], function(cb) {

  cb = cb || function() {};

  global.isProd  = true;
  global.NODE_ENV = global.NODE_ENV || 'production';

  return runSequence(['sass', 'imagemin', 'browserify', 'copyFonts', 'copyIcons'], cb);

});