'use strict';
/* jshint node: true */

/**
    Gulpfile.js:
      Recipe for building the GWA app with Gulp.

    Part of the illustra/gwa project by @aureljared.
    Licensed under GPLv2.
*/

var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var csso = require('gulp-csso');
var del = require('del');
var gulp = require('gulp');
var htmlmin = require('gulp-htmlmin');
var less = require('gulp-less');
var rename = require('gulp-rename');
var runSequence = require('run-sequence');
var svgmin = require('gulp-svgmin');
var uglify = require('gulp-uglify');

// Build & minify LESS files
gulp.task('css', ['clean-css'], function() {
    return gulp.src('./src/less/_main.less')
        .pipe(less())
        .pipe(autoprefixer({"browsers": [
            'ie >= 10',
            'ie_mob >= 10',
            'ff >= 30',
            'chrome >= 34',
            'safari >= 7',
            'opera >= 23',
            'ios >= 7',
            'android >= 4.4',
            'bb >= 10'
        ]}))
        .pipe(csso())
        .pipe(rename("style.css"))
        .pipe(gulp.dest('./dist/css'));
});

// Minify JS files
gulp.task('js', ['clean-js'], function() {
    return gulp.src('./src/js/*.js')
        .pipe(concat('script.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js'));
});

// Minify SVG files
gulp.task('svg', ['clean-svg'], function() {
    return gulp.src('./src/img/*.svg')
        .pipe(svgmin())
        .pipe(gulp.dest('./dist/img'));
});

// Minify index HTML file
gulp.task('html', ['clean-html'], function() {
    return gulp.src('./src/index.html')
        .pipe(htmlmin({
            collapseWhitespace: true,
            minifyJS: true
        }))
        .pipe(gulp.dest('./'));
});

// Clean output directory
gulp.task('clean-css', function(){ del(['dist/css']); });
gulp.task('clean-js', function(){ del(['dist/js']); });
gulp.task('clean-svg', function(){ del(['dist/img/*.svg']); });
gulp.task('clean-html', function(){ del(['index.html']); });

// Gulp task to minify all files
gulp.task('default', function () {
    runSequence(
        'css',
        'js',
        'html'
    );
});
gulp.task('all', function(){
    runSequence(
        'css',
        'js',
        'svg',
        'html'
    );
});
