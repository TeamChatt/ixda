'use strict';

var gulp    = require('gulp');
var connect = require('gulp-connect');
require('./tasks/player');
require('./tasks/presenter');
require('./tasks/game-master');

//Build tasks
gulp.task('build', ['player-build', 'presenter-build', 'game-master-build']);

//Development tasks
gulp.task('watch', ['player-watch', 'presenter-watch', 'game-master-watch']);

gulp.task('connect', ['build'], function() {
  connect.server({
    root: 'dist',
    port: 8000,
    livereload: true
  });
});


gulp.task('default', ['connect', 'watch']);
