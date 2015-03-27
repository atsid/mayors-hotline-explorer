var gulp = require('gulp');
var ghPages = require('gulp-gh-pages');
var wiredep = require('wiredep').stream;
var bower = require('gulp-bower');
var watch = require('gulp-watch');
var runSequence = require('run-sequence');

/**
 * Push build to gh-pages
 */
gulp.task('deploy', ['wiredep'], function() {
  return gulp.src("./dist/**/*")
    .pipe(ghPages())
});

gulp.task('bower', function() {
  return bower().pipe(gulp.dest('./dist/bower_components'));
});

gulp.task('copy-images', function() {
  gulp.src('./img/**/*').pipe(gulp.dest('./dist/img'));
});

/**
 * Use wiredep to weave in bower dependencies 
 */
gulp.task('wiredep', ['bower'], function() {
  gulp.src('./src/**/*')
    .pipe(wiredep({'ignorePath':'../dist/'}))
    .pipe(gulp.dest('./dist'));
});

gulp.task('build', runSequence(
  'bower',
  'wiredep',
  'copy-images'
));
