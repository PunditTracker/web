'use strict';

var gulp       = require('gulp');
var awspublish = require('gulp-awspublish');
var dotenv     = require('dotenv');
var config     = require('../config');

dotenv.load();

gulp.task('uploadToS3', function(cb) {

  var publisher = awspublish.create({
    bucket: process.env.S3_BUCKET,
    region: process.env.S3_REGION,
    key: process.env.AWS_KEY,
    secret: process.env.AWS_SECRET
  });
  var oneWeekInSeconds = 60*60*24*7;
  var headers = {
    'Cache-Control': 'max-age=' + oneWeekInSeconds + ', no-transform, public'
  };

  // Upload assets to S3
  return gulp.src(config.buildDir + '{css,fonts,images,js}/*')
  .pipe(awspublish.gzip())
  .pipe(publisher.publish(headers))
  .pipe(awspublish.reporter());

});