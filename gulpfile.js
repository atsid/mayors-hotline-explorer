var gulp = require('gulp');
var ghPages = require('gulp-gh-pages');
var wiredep = require('wiredep').stream;
var bower = require('gulp-bower');

/**
 * Push build to gh-pages
 */
gulp.task('deploy', ['wiredep'], function() {
  return gulp.src("./dist/**/*")
    .pipe(ghPages())
});

gulp.task('bower', function() {
  bower();
});

/**
 * Use wiredep to weave in bower dependencies 
 */
gulp.task('wiredep', ['bower'], function() {
  gulp.src('./src/**/*')
    .pipe(wiredep({'ignorePath':'dist/'}))
    .pipe(gulp.dest('./dist'));
});
