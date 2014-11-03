'use strict';

var browserify = require('browserify');
var config = require('../config');
var partialify = require('partialify');
var gulp = require('gulp');
var debug = require('gulp-debug');
var rename = require('gulp-rename');
var rev = require('gulp-rev');
var source = require('vinyl-source-stream');
var coffee = require('coffee-script');
var through = require('through');

// Vendor
gulp.task('vendor', function() {
  return browserify({debug: true})
    .require('jquery')
    .require('lodash', {expose: 'underscore'})
    .require('backbone')
    .bundle()
    .pipe(source('vendor.js'))
    .pipe(gulp.dest(config.dist + '/scripts/'));
});

// Browserify
gulp.task('browserify', function() {
  return browserify({debug: true})
    .add('./app/scripts/main.coffee')
    .external('jquery')
    .external('lodash')
    .external('backbone')
    .transform(partialify) // Transform to allow requireing of templates
    .transform(function (file) {
        var data = '';
        return through(write, end);

        function write (buf) { data += buf }
        function end () {
            this.queue(coffee.compile(data));
            this.queue(null);
        }
    })
    .bundle()
    .pipe(source('main.js'))
    .pipe(gulp.dest(config.dist + '/scripts/'));
});

// Script Dist
gulp.task('scripts:dist', function() {
  return gulp.src(['dist/scripts/*.js'], {base: 'dist'})
    .pipe(gulp.dest('dist'))
    .pipe(rev())
    .pipe(gulp.dest('dist'))
    .pipe(rev.manifest())
    .pipe(rename('script-manifest.json'))
    .pipe(gulp.dest('dist'));
});
