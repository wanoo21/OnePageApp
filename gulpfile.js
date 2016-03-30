'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var ts = require('gulp-typescript');
var sourcemaps = require('gulp-sourcemaps');
var htmlmin = require('gulp-htmlmin');
var concat = require('gulp-concat');
var tsProject = ts.createProject('tsconfig.json');

var productionMap = './prod';

gulp.task('scripts', function () {
    var tsResult = tsProject.src('devp/ts/*.ts')
        .pipe(sourcemaps.init())
        .pipe(ts(tsProject));

    return tsResult.js
        .pipe(concat('app.js'))
        .pipe(sourcemaps.write('maps'))
        .pipe(gulp.dest('./devp/assets/js'));
});

gulp.task('scss', function () {
    return gulp.src('devp/scss/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('devp/assets/css'))
});

// Listen TypeScript changes
gulp.task('watch:ts', ['scripts'], function () {
   gulp.watch('devp/ts/*.ts', ['scripts'])
});

// Listen sass changes
gulp.task('watch:scss', ['scss'], function () {
   gulp.watch('devp/sass/*.scss', ['scss'])
});

// Get Production version
gulp.task('get-production', ['scss', 'scripts'], function () {
    // Get all optimized assets
    gulp.src('./devp/assets/**/*')
        .pipe(gulp.dest(productionMap + '/assets'));

    // Return compressed html
    return gulp.src('./devp/**/*.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest(productionMap))
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