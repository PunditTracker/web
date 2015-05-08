'use strict';

var gulp         = require('gulp');
var runSequence  = require('run-sequence');
var argv         = require('yargs').argv;
var shell        = require('gulp-shell');
var config       = require('../config');

gulp.task('deploy', ['prod'], function() {

  var isProd = argv.production || argv.prod;
  var s3Task;
  var tasks;

  var ebsDeploy = function() {
    var shellCommand = 'ebs-deploy deploy --environment ';

    if ( isProd ) {
      shellCommand += 'pundittracker-web-prod';
    } else {
      shellCommand += 'pundittracker-web-dev';
    }

    return gulp.src('')
    .pipe(shell(shellCommand));
  };

  if ( isProd ) {
    tasks = ['switchAPI', 'cdnizer'];
    s3Task = 'uploadToS3 --prod'
  } else {
    tasks = 'emptyTask';
    s3Task = 'uploadToS3';
  }

  return runSequence(tasks, s3Task, ebsDeploy);

});