'use strict';

var gulp = require('gulp');
var ghPages = require('gulp-gh-pages');
var wiredep = require('wiredep').stream;
var bower = require('gulp-bower');
var watch = require('gulp-watch');
var runSequence = require('run-sequence');
var del = require('del');

var config = {
  paths: {
    app:   'src',
    build: 'dist'
  }
};

// Images
gulp.task('images:clean', function(next) {
  del(config.paths.build + '/img/**', next);
});
gulp.task('images', ['images:clean'], function() {
  return gulp.src(config.paths.app + '/img/**/*')
    .pipe(gulp.dest(config.paths.build +'/img'));
});

// Styles
gulp.task('styles:clean', function(next) {
  del(config.paths.build + '/css/**', next);
});
gulp.task('styles', ['styles:clean'], function() {
  return gulp.src(config.paths.app + '/css/**/*')
    .pipe(gulp.dest(config.paths.build + '/css'));
});

// Javascript
gulp.task('js:clean', function(next) {
  del(config.paths.build + '/js/**', next);
});
gulp.task('js', ['js:clean'], function() {
  return gulp.src(config.paths.app + '/js/**/*')
    .pipe(gulp.dest(config.paths.build + '/js'));
});

gulp.task('bower', function() {
  return bower()
    .pipe(gulp.dest(config.paths.build + '/bower_components'));
});

// HTML
gulp.task('html:clean', function(next) {
  del(config.paths.build + '/**/*.html', next);
});
gulp.task('html', ['html:clean', 'bower'], function() {
  return gulp.src(config.paths.app + '/**/*.html')
    .pipe(wiredep({ignorePath: '../'+config.paths.build+'/'}))
    .pipe(gulp.dest(config.paths.build));
});

// Deploy
gulp.task('deploy', ['build'], function() {
  return gulp.src(config.paths.build + '/**/*')
    .pipe(ghPages());
});

gulp.task('build', ['styles','js','bower','html','images']);
gulp.task('default', ['build']);
