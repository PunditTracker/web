'use strict';

var gulp   = require('gulp');
var config = require('../config');

gulp.task('copyIcons', function() {

  // Copy icon files from source directory to build/
  return gulp.src(config.sourceDir + '*.{png,ico,xml,json}')
    .pipe(gulp.dest('build/'));

});