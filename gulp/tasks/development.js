'use strict';

var gulp        = require('gulp');
var runSequence = require('run-sequence');
var shell       = require('gulp-shell');

gulp.task('dev', ['clean'], function() {

  var startServer = function() {
    return gulp.src('')
      .pipe(shell('npm start'));
  };

  global.isProd  = false;

  return runSequence(['sass', 'imagemin', 'browserify', 'copyFonts', 'copyIcons'], 'watch', startServer);

});