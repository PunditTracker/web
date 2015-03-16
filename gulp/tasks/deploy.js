'use strict';

var gulp         = require('gulp');
var awspublish   = require('gulp-awspublish');
var runSequence  = require('run-sequence');
var config       = require('../config');
var globalConfig = require('../../config');

gulp.task('deploy', ['prod'], function() {

  var uploadToS3 = function() {
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
  };

  return runSequence('switchAPI', 'cdnizer', uploadToS3);

});