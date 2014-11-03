'use strict';

var gulp         = require('gulp');
var gulpif       = require('gulp-if');
var sass         = require('gulp-sass');
var handleErrors = require('../util/handle-errors');
var browserSync  = require('browser-sync');
var config       = require('../config');

gulp.task('sass', function() {

  return gulp.src(config.sourceDir + 'styles/main.scss')
    .pipe(sass({
      sourceComments: global.isProd ? 'none' : 'map',
      sourceMap: 'sass',
      outputStyle: global.isProd ? 'compressed' : 'nested',
      onError: function(err) {
        // Prevent crashing on error
        console.log('SASS error:', err);
      }
    }))
    .on('error', handleErrors)
    .pipe(gulp.dest(config.styles.dest))
    .pipe(gulpif(browserSync.active, browserSync.reload({ stream: true })));

});