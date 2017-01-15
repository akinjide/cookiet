import gulp from 'gulp';
import path from 'path';
import gulpLoadPlugins from 'gulp-load-plugins';

const $ = gulpLoadPlugins();

gulp.task('default', () =>
  gulp.src('cookiet.js')
    .pipe($.jshint())
    .pipe($.jshint.reporter('default'))
    .pipe($.concat('cookiet.min.js'))
    .pipe($.uglify())
    .pipe(gulp.dest(''))
);
