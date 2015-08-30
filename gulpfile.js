var argv = require('yargs').argv;
var del = require('del');
var gulp = require('gulp');
var merge = require('merge-stream');
var path = require('path');
var runSequence = require('run-sequence');

var concat = require('gulp-concat');
var flatten = require('gulp-flatten');
var gulpif = require('gulp-if');
var jade = require('gulp-jade');
var minifyCSS = require('gulp-minify-css');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var wrap = require('gulp-wrap');

var config = require('./build.config');
var themePath = path.join('dist', config.theme);

gulp.task('clean', function (done) {
  del(['dist'], done);
});

gulp.task('map', function() {
  gulp.src('src/map')
    .pipe(gulp.dest(themePath));
});

gulp.task('templates', function() {
  gulp.src(['src/templates/**/*.jade', '!src/templates/layouts/**/*'])
    .pipe(jade())
    .pipe(rename({extname: '.tmpl'}))
    .pipe(gulp.dest(themePath));
});

gulp.task('assets', function () {
  var vendorAssets = gulp.src(config.vendorAssets)
    .pipe(flatten())
    .pipe(gulp.dest('dist/static'));

  var appAssets = gulp.src('src/assets/**/*')
    .pipe(gulp.dest('dist/static'));

  return merge(vendorAssets, appAssets);
});

gulp.task('css', function () {
  var minify = argv.minify || false;
  return gulp.src('src/scss/app.scss')
    .pipe(gulpif(!minify, sourcemaps.init()))
    .pipe(sass())
    .pipe(concat('app.css'))
    .pipe(gulpif(minify, minifyCSS()))
    .pipe(gulpif(!minify, sourcemaps.write('./')))
    .pipe(gulp.dest('dist/static'));
});

gulp.task('build', function (done) {
  runSequence('clean', ['map', 'templates', 'assets', 'css'], done);
});

gulp.task('watch', ['build'], function () {
  gulp.watch('src/map', ['map']);
  gulp.watch('src/assets/**/*', ['assets']);
  gulp.watch('src/templates/**/*.jade', ['templates']);
  gulp.watch('src/scss/**/*.scss', ['css']);
});

gulp.task('default', ['watch']);