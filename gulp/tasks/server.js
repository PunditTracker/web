'use strict';

var gulp  = require('gulp');
var shell = require('gulp-shell');

gulp.task('server', function() {

  return gulp.src('')
  .pipe(shell('npm start'));

});