'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var ts = require('gulp-typescript');
var sourcemaps = require('gulp-sourcemaps');
var htmlmin = require('gulp-htmlmin');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var cssmin = require('gulp-cssmin');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var series = require('stream-series');
var tsProject = ts.createProject('./tsconfig.json', { sortOutput: true });
var inject = require('gulp-inject');
var config = require('./config');

// Autoinject css and js in html files
gulp.task('index', function () {
  var target = gulp.src('./devp/index.html');
  // Load vendors first
  var vendors = gulp.src(['./devp/assets/vendors/css/**/*.css', './devp/assets/vendors/js/**/*.js', 'devp/assets/bower/**/dist/*.min.js'], { read: false });
  // Load application files
  var sources = gulp.src(['./devp/assets/css/**/*.css', './devp/assets/js/**/*.js'], { read: false });

  // Put vendors on top of application files
  return target.pipe(inject(series(vendors, sources), { ignorePath: 'devp', addRootSlash: true })).pipe(gulp.dest('./devp'));
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

// Autoinject assets in html after changes
gulp.task('watch:assets', function () {
  return gulp.watch(['./devp/assets/css/**/*.css', './devp/assets/js/**/*.js'], ['index'])
})

// Get Production version
gulp.task('get-production', ['default'], function () {
    // Get all compiled assets
    gulp.src(['./devp/assets/**', '!./devp/assets/js/**', '!./devp/assets/css/**'])
        .pipe(gulp.dest(config.productionFolderPath + '/assets'));

    // Get all javascript files and minify its
    gulp.src(['./devp/assets/js/**/*.js'])
        .pipe(uglify(config.uglify))
        .pipe(gulp.dest(config.productionFolderPath + '/assets/js'));

    // Get all css files and minify its
    gulp.src(['./devp/assets/css/**/*.css'])
        .pipe(cssmin(config.cssmin))
        .pipe(gulp.dest(config.productionFolderPath + '/assets/css'));

    // Return compressed html
    return gulp.src('./devp/index.html')
        .pipe(htmlmin(config.htmlmin))
        .pipe(gulp.dest(config.productionFolderPath))
});

// Run default tasks
gulp.task('default', ['typescript', 'scss', 'images', 'index']);

// Watch all tasks
gulp.task('watch:all', [
  'watch:ts',
  'watch:scss',
  'watch:assets'
]);
