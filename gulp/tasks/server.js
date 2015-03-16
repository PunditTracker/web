'use strict';

var gulp        = require('gulp');
var runSequence = require('run-sequence');
var shell       = require('gulp-shell');

gulp.task('server', function() {

  var startServer = function() {
    return gulp.src('')
      .pipe(shell('npm start'));
  };

  global.doWatch  = true;
  global.isServer = true;

  return runSequence('dev', 'watch', startServer);


});