'use strict';

var gulp  = require('gulp');
var tasks = require('./common');

//Build tasks
gulp.task('player-js'  , tasks.js('./player'));
gulp.task('player-css' , tasks.css('./player'));
gulp.task('player-html', tasks.html('./player'));

gulp.task('player-build', ['player-js', 'player-css', 'player-html']);

//Development tasks
gulp.task('player-watch', ['player-build'], function(){
  gulp.watch('player/**/*.js',     ['player-js']);
  gulp.watch('player/**/*.scss',   ['player-css']);
  gulp.watch('player/**/*.html',   ['player-html']);
});
