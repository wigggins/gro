var gulp = require('gulp'),
	size = require('gulp-size'),
	minifyCSS = require('gulp-minify-css'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename'),
	sass = require('gulp-sass'),
	watch = require('gulp-watch'),
	browserSync = require('browser-sync');

// Styles
gulp.task('styles', function () {
    return gulp.src('./sass/gro.scss')
        .pipe(sass({errLogToConsole: true}))
        .pipe(size({gzip: true, showFiles: true}))
        .pipe(gulp.dest('./css/'))
        .pipe(minifyCSS())
        .pipe(rename('gro.min.css'))
        .pipe(gulp.dest('./css/'))
});

// Process lib javascript files
gulp.task('vendor', function() {  
    return gulp.src('js/lib/*.js')
        .pipe(concat('vendor.js'))
        .pipe(uglify())
        .pipe(gulp.dest('js/min/vendor.js'))
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


gulp.task('default', ['styles', 'browser-sync', 'bs-reload'], function() {
	gulp.start('styles');
	gulp.watch('sass/*.scss', ['styles','bs-reload']);
	gulp.watch('*.html', ['bs-reload']);
});