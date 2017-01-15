import gulp from 'gulp';
import path from 'path';
import gulpLoadPlugins from 'gulp-load-plugins';

const $ = gulpLoadPlugins();

gulp.task('default', () =>
  gulp.src('cookie.js')
    .pipe($.jshint())
    .pipe($.jshint.reporter('default'))
    .pipe($.concat('cookie.min.js'))
    .pipe($.uglify())
    .pipe(gulp.dest(''))
);
