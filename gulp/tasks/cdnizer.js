'use strict';

var gulp    = require('gulp');
var cdnizer = require('gulp-cdnizer');
var config  = require('../config');

gulp.task('cdnizer', function() {

  var cdnBase = '//assets.pundittracker.com/';

  // CDNize CSS file(s)
  return gulp.src(config.buildDir + 'css/**/*.css')
  .pipe(cdnizer({
      defaultCDNBase: cdnBase,
      relativeRoot: 'css',
      files: ['**/*.{gif,png,jpg,jpeg,eot,svg,ttf,woff}']
  }))
  .pipe(gulp.dest(config.styles.dest));

  // CDNize minifed Javascript
  // return gulp.src(config.buildDir + 'js/main.js')
  // .pipe(cdnizer({
  //   defaultCDNBase: cdnBase,
  //   relativeRoot: 'js',
  //   files: ['**/*.{js,gif,png,jpg,jpeg,css}'],
  //   matchers: [
  //     /(url\(|:"|:')((?:\.{2}\/)+.+\/.+(?:png|gif|jpg|jpeg))(["'\)])/gi,
  //   ]
  // }))
  // .pipe(gulp.dest(config.scripts.dest));

});