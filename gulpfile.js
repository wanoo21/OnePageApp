'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var ts = require('gulp-typescript');
var sourcemaps = require('gulp-sourcemaps');
var htmlmin = require('gulp-htmlmin');
var tsProject = ts.createProject('tsconfig.json');

gulp.task('scripts', function () {
    var tsResult = tsProject.src('./dist/ts/*.ts').pipe(ts(tsProject));
    return tsResult.js.pipe(gulp.dest('./assets/js'))
});

gulp.task('sass', function () {
    return gulp.src('./dist/sass/*.sass')
        .pipe(sourcemaps.init())
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./assets/css'))
});

gulp.task('minify-html', function () {
    return gulp.src('./dist/**/*.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('./'))
});

gulp.task('watch:html', ['minify-html'], function () {
    return gulp.watch('./dist/**/*.html', ['minify-html'])
});

// Listen TypeScript changes
gulp.task('watch:ts', ['scripts'], function () {
   gulp.watch('./dist/ts/*.ts', ['scripts'])
});

// Listen sass changes
gulp.task('watch:sass', ['sass'], function () {
   gulp.watch('./dist/sass/*.sass', ['sass'])
});

// Run default tasks
gulp.task('default', [
    'scripts',
    'sass',
    'minify-html'
]);

// Watch all tasks
gulp.task('watch:all', [
    'watch:html',
    'watch:ts',
    'watch:sass'
]);