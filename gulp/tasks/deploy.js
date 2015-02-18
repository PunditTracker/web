'use strict';

var gulp         = require('gulp');
var rename       = require('gulp-rename');
var awspublish   = require('gulp-awspublish');
var shell        = require('gulp-shell');
var config       = require('../config');
var globalConfig = require('../../config');

gulp.task('deploy', function() {

  var publisher = awspublish.create({
    key: globalConfig.aws.key,
    secret: globalConfig.aws.secret,
    bucket: globalConfig.aws.bucket
  });
  var oneWeekInSeconds = 60*60*24*7;
  var headers = {
    'Cache-Control': 'max-age=' + oneWeekInSeconds + ', no-transform, public'
  };

  // Upload assets to S3
  gulp.src(config.buildDir + '**/*.{json,js,css,eot,svg,ttf,woff,otf,png,jpg,jpeg}')
  .pipe(rename(function(path) {
    path.dirname = 'web/' + path.dirname;
  }))
  .pipe(awspublish.gzip())
  .pipe(publisher.publish(headers))
  .pipe(awspublish.reporter());

  // Deploy to Amazon EBS
  return gulp.src('')
  .pipe(shell('git aws.push'));

});