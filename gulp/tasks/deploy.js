'use strict';

var gulp         = require('gulp');
var runSequence  = require('run-sequence');
var argv         = require('yargs').argv;
var shell        = require('gulp-shell');
var config       = require('../config');

gulp.task('deploy', ['prod'], function() {

  var isProd = argv.production || argv.prod;
  var tasks;
  var s3Task;

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

  tasks = isProd ? ['switchAPI', 'cdnizer'] : 'emptyTask';
  s3Task = isProd ? 'uploadToS3' : 'emptyTask';

  return runSequence(tasks, s3Task, ebsDeploy);

});