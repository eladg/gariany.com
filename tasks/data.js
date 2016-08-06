var config = require('../gulp-config')
var gulp   = require('gulp');

// data
gulp.task('json', function() {
    gulp.src('app/js/json/**/*.json', {
            base: 'app/scripts'
        })
        .pipe(gulp.dest('dist/js/'));
});
