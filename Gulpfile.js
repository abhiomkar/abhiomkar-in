var gulp = require('gulp'),
    webpack = require('webpack-stream'),
    path = require('path'),
    sync = require('run-sequence'),
    browserSync = require('browser-sync'),
    rename = require('gulp-rename'),
    template = require('gulp-template'),
    fs = require('fs'),
    yargs = require('yargs').argv,
    lodash = require('lodash'),
    del = require('del'),
    reload = function () { return browserSync.reload() };

// helper method to resolveToApp paths
var resolveToApp = function(glob){
  glob = glob || '';
  return path.join(frontendRoot, 'app', glob); // app/{glob}
};

var resolveToComponents = function(glob){
  glob = glob || '';
  return path.join(frontendRoot, 'app/components', glob); // app/components/{glob}
};

var frontendRoot = 'frontend';
var serverRoot = 'server';

// map of all our paths
var paths = {
  src: ['app/**/*.{css,js,html}', '!app/build/**'],
  images: 'app/images/**/*.*', // image files

  entry: 'app/main.js',
  output: 'app/build/'
};

// use our webpack.config.js to
// build our modules
var webbackConfig = require('./webpack.config');

gulp.task('webpack:frontend', function() {
  return gulp.src(paths.entry)
    .pipe(webpack(webbackConfig.frontend))
    .pipe(gulp.dest(paths.output));
});

gulp.task('browser-sync', function() {
  browserSync.init({
    proxy: 'localhost:5000',
    open: false,
    port: 3003
  });
});

gulp.task('watch:frontend', function(){
  var allPaths = [].concat(paths.src, paths.images);

  gulp.watch(allPaths, ['webpack:frontend', reload]);
});

gulp.task('clean', function(){
  return del([
    'app/build/**/*'
  ]);
});

gulp.task('watch', function(done){
  sync('watch:frontend', 'browser-sync', done);
});

gulp.task('build', function(done) {
  sync('webpack:frontend', done);
});

gulp.task('default', function(done){
  sync('watch', done);
});
