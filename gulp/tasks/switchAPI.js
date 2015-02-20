'use strict';

var config  = require('../config');
var gulp    = require('gulp');
var replace = require('gulp-replace');

gulp.task('switchAPI', function() {

  return gulp.src(config.scripts.dest + '**/*.js')
  .pipe(replace(/api.dev.pundittracker.com/gi, 'api.pundittracker.com'))
  .pipe(gulp.dest(config.scripts.dest));

});