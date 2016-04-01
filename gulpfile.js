'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var ts = require('gulp-typescript');
var sourcemaps = require('gulp-sourcemaps');
var htmlmin = require('gulp-htmlmin');
var concat = require('gulp-concat');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var tsProject = ts.createProject('./tsconfig.json', { sortOutput: true });
var inject = require('gulp-inject');
var config = require('./config');

// Autoinject css and js in html files
gulp.task('index', ['typescript', 'scss', 'images'], function () {
  var target = gulp.src('./devp/index.html');
  // It's not necessary to read the files (will speed up things), we're only after their paths:
  var sources = gulp.src(['./devp/assets/js/**/*.js', './devp/assets/css/**/*.css', '!./devp/assets/js/devp/**/*'], { read: false });

  return target.pipe(inject(sources, {
    ignorePath: 'devp'
  }))
    .pipe(gulp.dest('./devp'));
});

// Optimize all images
gulp.task('images', function(callback) {
	gulp.src('./devp/images/**/*')
		.pipe(imagemin({
			progressive: true,
			svgoPlugins: [{ removeViewBox: false }],
			use: [ pngquant() ]
		}))
		.pipe(gulp.dest('./devp/images/'));
    return callback()
});

// Compile TypeScript files
gulp.task('typescript', function () {
    var tsResult = tsProject.src('devp/ts/*.ts')
        .pipe(sourcemaps.init({ "loadMaps": true, "debug": false }))
        .pipe(ts(tsProject, { sortOutput: true }));

    return tsResult.js
        .pipe(concat('app.js'))
        .pipe(sourcemaps.write('maps', config.sourceMaps))
        .pipe(gulp.dest('./devp/assets/js'));
});

// Compile Scss files
gulp.task('scss', function (callback) {
    gulp.src('devp/scss/*.scss')
        .pipe(sourcemaps.init({ "loadMaps": true, "debug": false }))
        .pipe(sass(config.scss).on('error', sass.logError))
        .pipe(sourcemaps.write('maps', config.sourceMaps))
        .pipe(gulp.dest('./devp/assets/css'))
    return callback()
});

// Listen TypeScript changes
gulp.task('watch:ts', function () {
   gulp.watch('devp/ts/*.ts', ['typescript'])
});

// Listen sass changes
gulp.task('watch:scss', function () {
   gulp.watch('devp/scss/*.scss', ['scss'])
});

// Get Production version
gulp.task('get-production', ['index'], function () {
    // Get all optimized assets
    gulp.src('./devp/assets/**/*')
        .pipe(gulp.dest(config.productionFolderPath + '/assets'));

    // Return compressed html
    return gulp.src('./devp/**/*.html')
        .pipe(htmlmin(config.htmlmin))
        .pipe(gulp.dest(config.productionFolderPath))
});

// Run default tasks
gulp.task('default', ['index']);

// Watch all tasks
gulp.task('watch:all', [
  'watch:typescript',
  'watch:scss'
]);
