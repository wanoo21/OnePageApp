'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var ts = require('gulp-typescript');
var sourcemaps = require('gulp-sourcemaps');
var htmlmin = require('gulp-htmlmin');
var concat = require('gulp-concat');
var tsProject = ts.createProject('tsconfig.json', { noExternalResolve: false });
var config = require('./config');

// Compile TypeScript files
gulp.task('scripts', function () {
    var tsResult = tsProject.src('devp/ts/*.ts')
        .pipe(sourcemaps.init({ "loadMaps": true, "debug": false }))
        .pipe(ts(tsProject, { sortOutput: true }));

    return tsResult.js
        .pipe(concat('app.js'))
        .pipe(sourcemaps.write('maps', config.sourceMaps))
        .pipe(gulp.dest('./devp/assets/js'));
});

// Compile Scss files
gulp.task('scss', function () {
    return gulp.src('devp/scss/*.scss')
        .pipe(sourcemaps.init({ "loadMaps": true, "debug": false }))
        .pipe(sass(config.scss).on('error', sass.logError))
        .pipe(sourcemaps.write('maps', config.sourceMaps))
        .pipe(gulp.dest('./devp/assets/css'))
});

// Listen TypeScript changes
gulp.task('watch:ts', function () {
   gulp.watch('devp/ts/*.ts', ['scripts'])
});

// Listen sass changes
gulp.task('watch:scss', function () {
   gulp.watch('devp/scss/*.scss', ['scss'])
});

// Get Production version
gulp.task('get-production', ['scripts', 'scss'] ,function () {
    // Get all optimized assets
    gulp.src('./devp/assets/**/*')
        .pipe(gulp.dest(config.productionFolderPath + '/assets'));

    // Return compressed html
    return gulp.src('./devp/**/*.html')
        .pipe(htmlmin(config.htmlmin))
        .pipe(gulp.dest(config.productionFolderPath))
});

// Run default tasks
gulp.task('default', [
    'scripts',
    'scss'
]);

// Watch all tasks
gulp.task('watch:all', [
  'watch:ts',
  'watch:scss'
]);
