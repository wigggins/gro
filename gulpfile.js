var gulp        = require('gulp');
var size        = require('gulp-size');
var minifyCSS   = require('gulp-minify-css');
var prefixer    = require('gulp-autoprefixer');
var concat      = require('gulp-concat');
var jshint      = require('gulp-jshint');
var uglify      = require('gulp-uglify');
var rename      = require('gulp-rename');
var sass        = require('gulp-sass');
var watch       = require('gulp-watch');
var browserSync = require('browser-sync').create();

// Styles
// Adds vendor prefixes, logs the file size, minifies, renames, 
// then logs file size again
gulp.task('styles', function () {
    return gulp.src('./sass/stylesheet.scss')
        .pipe(prefixer({browsers: ['last 2 versions'], cascade: false}))
        .pipe(sass({errLogToConsole: true}))
        .pipe(size({gzip: true, showFiles: true, title:'Pre-minification'}))
        .pipe(gulp.dest('./css/'))
        .pipe(minifyCSS())
        .pipe(rename({suffix: '.min'}))
        .pipe(size({gzip: true, showFiles: true, title:'Post-minification'}))
        .pipe(gulp.dest('./css/'))
        .pipe(browserSync.stream());
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
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('js/min'));
});

// Starts a server using Browsersync
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});
// Reloads server
gulp.task('bs-reload', function () {
    browserSync.reload;
});

gulp.task('default', ['styles', 'scripts', 'browser-sync'], function() {
	gulp.watch('sass/*.scss', ['styles']);
    gulp.watch('js/*.js', ['scripts', 'bs-reload']);
	gulp.watch('*.html', ['bs-reload']);
});