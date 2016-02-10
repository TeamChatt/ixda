'use strict';

var gulp  = require('gulp');
var tasks = require('./common');

//Build tasks
gulp.task('player-js'    , tasks.js('./player'));
gulp.task('player-svg'   , tasks.svg('./player'));
gulp.task('player-images', tasks.images('./player'));
gulp.task('player-css'   , tasks.css('./player'));
gulp.task('player-html'  , tasks.html('./player'));

gulp.task('player-build', ['player-js', 'player-svg', 'player-images', 'player-css', 'player-html']);

//Development tasks
gulp.task('player-watch', ['player-build'], function(){
  gulp.watch('player/**/*.js'  , ['player-js']);
  gulp.watch('player/**/*.svg' , ['player-svg']);
  gulp.watch('player/**/*.png' , ['player-images']);
  gulp.watch('player/**/*.scss', ['player-css']);
  gulp.watch('player/**/*.html', ['player-html']);
});
