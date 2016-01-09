'use strict';

var gulp  = require('gulp');
var tasks = require('./common');

//Build tasks
gulp.task('game-master-js'  , tasks.js('./game-master'));
gulp.task('game-master-svg' , tasks.svg('./game-master'));
gulp.task('game-master-css' , tasks.css('./game-master'));
gulp.task('game-master-html', tasks.html('./game-master'));

gulp.task('game-master-build', ['game-master-js', 'game-master-svg', 'game-master-css', 'game-master-html']);

//Development tasks
gulp.task('game-master-watch', ['game-master-build'], function(){
  gulp.watch('game-master/**/*.js'  , ['game-master-js']);
  gulp.watch('game-master/**/*.svg' , ['game-master-svg']);
  gulp.watch('game-master/**/*.scss', ['game-master-css']);
  gulp.watch('game-master/**/*.html', ['game-master-html']);
});
