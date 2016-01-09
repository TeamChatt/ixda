'use strict';

var gulp  = require('gulp');
var tasks = require('./common');

//Build tasks
gulp.task('presenter-js'  , tasks.js('./presenter'));
gulp.task('presenter-svg' , tasks.svg('./presenter'));
gulp.task('presenter-css' , tasks.css('./presenter'));
gulp.task('presenter-html', tasks.html('./presenter'));

gulp.task('presenter-build', ['presenter-js', 'presenter-svg', 'presenter-css', 'presenter-html']);

//Development tasks
gulp.task('presenter-watch', ['presenter-build'], function(){
  gulp.watch('presenter/**/*.js'  , ['presenter-js']);
  gulp.watch('presenter/**/*.svg' , ['presenter-svg']);
  gulp.watch('presenter/**/*.scss', ['presenter-css']);
  gulp.watch('presenter/**/*.html', ['presenter-html']);
});
