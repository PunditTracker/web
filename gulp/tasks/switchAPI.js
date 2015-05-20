'use strict';

var gulp    = require('gulp');
var replace = require('gulp-replace');
var config  = require('../config');

gulp.task('switchAPI', function() {

  return gulp.src(config.scripts.dest + '**/*.js')
  .pipe(replace(/api.dev.pundittracker.com/gi, 'api.pundittracker.com'))
  // Ensure environment variable is correct in APIUtils
  // for building asset URLs
  .pipe(replace(/env:[a-zA-Z]\.env\&\&[a-zA-Z]\.env\.NODE_ENV\?[a-zA-Z]\.env\.NODE_ENV\.toLowerCase\(\):"dev"/gi, 'env:"production"'))
  .pipe(gulp.dest(config.scripts.dest));

});