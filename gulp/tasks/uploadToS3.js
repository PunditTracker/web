'use strict';

var gulp         = require('gulp');
var awspublish   = require('gulp-awspublish');
var argv         = require('yargs').argv;
var globalConfig = require('../../config');

gulp.task('uploadToS3', function(cb) {

  var isProd = argv.production || argv.prod;
  var publisher = awspublish.create(globalConfig.aws);
  var oneWeekInSeconds = 60*60*24*7;
  var headers = {
    'Cache-Control': 'max-age=' + oneWeekInSeconds + ', no-transform, public'
  };

  // Upload assets to S3
  if ( isProd ) {
    return gulp.src(config.buildDir + '**/*')
    .pipe(awspublish.gzip())
    .pipe(publisher.publish(headers))
    .pipe(awspublish.reporter());
  } else {
    cb();
    return;
  }

});