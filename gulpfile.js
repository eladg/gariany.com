'use strict';

var config = require('./gulp-config.js');
var gulp   = require('gulp');
var del    = require('del');
var $      = require('gulp-load-plugins')();

var browserify  = require('browserify');
var watchify    = require('watchify');
var source      = require('vinyl-source-stream');
var requireDir  = require('require-dir')
var browserSync = require('browser-sync');

// ===============================================
// globals
// ===============================================
var sourceFile = './app/js/app.js';
var destFolder = './dist/js';
var destFileName = 'app.js';

// ===============================================
// configs
// ===============================================
var reload = browserSync.reload;

var bundler = watchify(
  browserify({
    entries: [config.source_file],
    debug: false,
    insertGlobals: true,
    cache: {},
    packageCache: {},
    fullPaths: true
  })
);

bundler.on('log', $.util.log);
bundler.on('update', function(){
  return bundler.bundle()
    // log errors if they happen
    .on('error', $.util.log.bind($.util, 'Browserify Error'))
    .pipe(source(destFileName))
    .pipe(gulp.dest(destFolder))
    .on('end', function() {
        reload();
      }
    );
  });


// ===============================================
// main tasks
// ===============================================
gulp.task('watch', ['html', 'fonts', 'bundle'], function() {

    browserSync({
        notify: false,
        logPrefix: 'BS',
        // Run as an https by uncommenting 'https: true'
        // Note: this uses an unsigned certificate which on first access
        //       will present a certificate warning in the browser.
        // https: true,
        server: ['dist', 'app']
    });

    // Watch .js files
    gulp.watch('app/js/**/*.js', ['build'], [reload]);

    // Watch .json files
    gulp.watch('app/data/**/*.json', ['json']);

    // Watch .html files
    gulp.watch('app/*.html', ['html']);
    gulp.watch(['app/css/**/*.scss', 'app/css/**/*.css'], ['css', 'buildBundle', reload]);

    // Watch image files
    gulp.watch('app/images/**/*', reload);
});

gulp.task('build', ['html', 'build', 'images', 'fonts', 'extras'], function() {
    gulp.src('dist/js/app.js')
        .pipe($.uglify())
        // .pipe($.stripDebug())
        .pipe(gulp.dest('dist/js'));
});

// Default task
gulp.task('default', ['clean', 'build']);

requireDir('./tasks', { recurse: true })

