var gulp = require('gulp'),
	size = require('gulp-size'),
	minifyCSS = require('gulp-minify-css'),
    prefixer = require('gulp-autoprefixer'),
	concat = require('gulp-concat'),
    jshint = require('gulp-jshint'),
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename'),
	sass = require('gulp-sass'),
	watch = require('gulp-watch'),
	browserSync = require('browser-sync');

// Styles
// Adds vendor prefixes, logs the file size, minifies, renames, 
// then logs file size again
gulp.task('styles', function () {
    return gulp.src('./sass/stylesheet.scss')
        .pipe(prefixer())
        .pipe(sass({errLogToConsole: true}))
        .pipe(size({gzip: true, showFiles: true}))
        .pipe(gulp.dest('./css/'))
        .pipe(minifyCSS())
        .pipe(rename('stylesheet.min.css'))
        .pipe(size({gzip: true, showFiles: true}))
        .pipe(gulp.dest('./css/'));
});

// JS Hint - Not included in default task to keep build clean. 
// Run separately using 'gulp lint'
gulp.task('lint', function() {
    return gulp.src('js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Process javascript files
gulp.task('scripts', function() {  
    return gulp.src('js/*.js')
        .pipe(concat('scripts.js'))
        .pipe(uglify())
        .pipe(rename('scripts.min.js'))
        .pipe(gulp.dest('js/min'));
});

// Starts a server using Browsersync
gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: "./"
        }
    });
});
// Reloads server
gulp.task('bs-reload', function () {
    browserSync.reload();
});


gulp.task('default', ['styles', 'scripts', 'browser-sync'], function() {
	gulp.start('styles', 'scripts');
	gulp.watch('sass/*.scss', ['styles', 'bs-reload']);
    gulp.watch('js/*.js', ['scripts', 'bs-reload']);
	gulp.watch('*.html', ['bs-reload']);
});