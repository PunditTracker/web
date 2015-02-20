'use strict';

var gulp         = require('gulp');
var awspublish   = require('gulp-awspublish');
var config       = require('../config');
var globalConfig = require('../../config');

gulp.task('deploy', ['switchAPI'], function() {

  var publisher = awspublish.create(globalConfig.aws);
  var oneWeekInSeconds = 60*60*24*7;
  var headers = {
    'Cache-Control': 'max-age=' + oneWeekInSeconds + ', no-transform, public'
  };

  // Upload assets to S3
  return gulp.src(config.buildDir + '**/*')
  .pipe(awspublish.gzip())
  .pipe(publisher.publish(headers))
  .pipe(awspublish.reporter());

});