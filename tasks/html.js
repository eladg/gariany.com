var config = require('../gulp-config')
var gulp = require('gulp');
var $    = require('gulp-load-plugins')();

// HTML
gulp.task('html', function() {

    return gulp.src('app/*.html')
        .pipe($.useref())
        .pipe(gulp.dest('dist'))
        .pipe($.size());
});
