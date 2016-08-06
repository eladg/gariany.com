var $        = require('gulp-load-plugins')();
var gulp     = require('gulp');
var config   = require('../gulp-config.js')
var source   = require('vinyl-source-stream');
var watchify = require('watchify');
var browserify  = require('browserify');
var browserSync = require('browser-sync');

var bundler = watchify(
  browserify({
    entries: [config.source_file],
    debug: true,
    insertGlobals: true,
    cache: {},
    packageCache: {},
    fullPaths: true
  })
);

var reload = browserSync.reload;

// Scripts
gulp.task('scripts', function(){
  return bundler.bundle()
    // log errors if they happen
    .on('error', $.util.log.bind($.util, 'Browserify Error'))
    .pipe(source(config.dest_filename))
    .pipe(gulp.dest(config.dest_folder))
    .on('end', function() {
        reload();
      }
    );
  });

gulp.task('buildScripts', function() {
    return browserify(config.source_file)
        .bundle()
        .pipe(source(config.dest_filename))
        .pipe(gulp.dest('dist/js'));
});
