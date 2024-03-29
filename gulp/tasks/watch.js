'use strict';

var gulp   = require('gulp');
var config = require('../config');

gulp.task('watch', function() {

  // Scripts are automatically watched by Watchify inside Browserify task
  gulp.watch(config.styles.src, ['sass']);
  gulp.watch(config.images.src, ['imagemin']);

});