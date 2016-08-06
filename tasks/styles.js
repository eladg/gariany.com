var config = require('../gulp-config')
var gulp   = require('gulp');
var checkCSS = require('gulp-check-unused-css');

// css
gulp.task('css', ['moveCss', 'checkCSS']);

gulp.task('moveCss',['clean'], function(){
  // the base option sets the relative root for the set of files,
  // preserving the folder structure
  gulp.src(['./app/css/**/*.css'], { base: './app/css/' })
  .pipe(gulp.dest('dist/css'));
});

gulp.task('checkCSS', [], function() {
  gulp.src([ './dist/css/*.css', './dist/*.html' ])
  .pipe( checkCSS() );
});

// Fonts
gulp.task('fonts', function() {

    return gulp.src(require('main-bower-files')({
            filter: '**/*.{eot,svg,ttf,woff,woff2}'
        }).concat('app/fonts/**/*'))
        .pipe(gulp.dest('dist/fonts'));
});
