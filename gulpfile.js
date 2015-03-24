var gulp = require('gulp');
var deploy = require('gulp-gh-pages');
var wiredep = require('wiredep').stream;

/**
 * Push build to gh-pages
 */
gulp.task('deploy', ['copy', 'bower'], function() {
  return gulp.src("./dist/**/*")
    .pipe(deploy())
});

gulp.task('copy', function() {
  gulp.src('./bower_components')
    .pipe(gulp.dest('./dist'));
});

/**
 * Use wiredep to weave in bower dependencies 
 */
gulp.task('bower', function() {
  gulp.src('./index.html')
    .pipe(wiredep())
    .pipe(gulp.dest('./dist'));
});
