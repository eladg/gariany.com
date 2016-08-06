var config = require('../gulp-config')

var gulp = require('gulp');
var del  = require('del');
var $    = require('gulp-load-plugins')();

// Clean
gulp.task('clean', function(cb) {
  $.cache.clearAll();
  cb(del.sync(['dist/css', 'dist/js', 'dist/images']));
});

// Bundle
gulp.task('bundle', ['css', 'scripts', 'bower'], function() {
  return gulp.src('./app/*.html')
    .pipe($.useref.assets())
    .pipe($.useref.restore())
    .pipe($.useref())
    .pipe(gulp.dest('dist'));
});

gulp.task('buildBundle', ['css', 'buildScripts', 'moveLibraries', 'bower'], function() {
  return gulp.src('./app/*.html')
    .pipe($.useref.assets())
    .pipe($.useref.restore())
    .pipe($.useref())
    .pipe(gulp.dest('dist'));
});

// Move JS Files and Libraries
gulp.task('moveLibraries',['clean'], function(){
  // the base option sets the relative root for the set of files,
  // preserving the folder structure
  gulp.src(['./app/js/**/*.js'], { base: './app/js/' })
    .pipe(gulp.dest('dist/js'));
});

// Bower helper
gulp.task('bower', function() {
  gulp.src('app/bower_components/**/*.js', {
      base: 'app/bower_components'
    })
    .pipe(gulp.dest('dist/bower_components/'));

  gulp.src('app/bower_components/**/*.css', {
      base: 'app/bower_components'
    })
    .pipe(gulp.dest('dist/bower_components/'));
});
