'use strict';

var gulp         = require('gulp');
var browserify   = require('browserify');
var babelify     = require('babelify');
var source       = require('vinyl-source-stream');
var sass         = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var connect      = require('gulp-connect');

//Build tasks
function js(path) {
  var entries = path + '/main.js';
  var dest    = 'dist/' + path;

  return function(){
    browserify({entries: entries, debug: true})
      .transform(babelify.configure({
        sourceMaps:        'inline',
        sourceMapRelative: '/Users/mattk/Desktop/ixda',
        presets:           ['es2015']
      }))
      .bundle()
      .pipe(source('main.js'))
      .pipe(gulp.dest(dest))
      .pipe(connect.reload());
  };
}

function css(path){
  var entries = path + '/main.scss';
  var dest    = 'dist/' + path;

  return function(){
    gulp.src(entries)
      .pipe(sass())
      .pipe(autoprefixer())
      .pipe(gulp.dest(dest))
      .pipe(connect.reload());
  };
}

function svg(path){
  var entries = path + '/**/*.svg';
  var dest    = 'dist/' + path;

  return function(){
    gulp.src(entries)
      .pipe(gulp.dest(dest))
      .pipe(connect.reload());
  };
}

function html(path){
  var entries = path + '/index.html';
  var dest    = 'dist/' + path;

  return function(){
    gulp.src(entries)
      .pipe(gulp.dest(dest))
      .pipe(connect.reload());
  };
}

module.exports = {
  js:   js,
  css:  css,
  svg:  svg,
  html: html
};
