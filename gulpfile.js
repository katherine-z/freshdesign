'use strict';

const gulp = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const gutil = require('gulp-util');

var reload = browserSync.reload;

var src = {
    scss: 'sass/**/*.scss',
    css: 'assets/css',

    html: ['*.html', 'Views/**/*.cshtml'],
    js: 'assets/js/**/*.js'
};

gulp.task('serve', ['sass'], function () {

    browserSync.init({
        server: "./",
        port: 3000
    });

    gulp.watch(src.scss, ['sass']);
    gulp.watch(src.html).on('change', reload);
    gulp.watch(src.js).on('change', reload);
});

// Compile sass into CSS
gulp.task('sass', function () {
    var s = sass.sync({
        outputStyle: 'compact'
    });
    s.on('error',function(e){
        gutil.log(e);
        s.end();
    });
    return gulp.src(src.scss)
        .pipe(s)
        .pipe(autoprefixer({
            browsers: ['last 50 versions'],
            cascade: false
        }))
        .pipe(gulp.dest(src.css))
        .pipe(browserSync.stream());
});
gulp.task('default', ['serve']);
