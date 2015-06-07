var gulp        = require("gulp"),
    jshint      = require("gulp-jshint"),
    browserSync = require("browser-sync"),
    typescript  = require("gulp-typescript"),
    del         = require("del"),
    concat      = require("gulp-concat"),
    uglify      = require("gulp-uglify"),
    uglifyCSS   = require("gulp-uglifycss"),
    runSequence = require("run-sequence"),
    ngAnnotate  = require('gulp-ng-annotate'),
    sourcemaps  = require('gulp-sourcemaps'),
    ghPages     = require('gulp-gh-pages'),
    karma       = require('karma').server;

var DEST = "build",
    PUBLISH = ".publish",
    SOURCE = "src/js/**/*.js",
    CLASSES = "src/js/**/*.ts",
    HTML = "src/**/*.html",
    FONTS = "src/css/fonts/**/*.*",
    CSS = "src/css/**/*.css",
    KARMA_CFG = __dirname + '/karma.conf.js';

gulp.task('hello', function() {
    console.log('This is "Gulp" signing in...');
});

gulp.task('clean', function(cb) {
  del([ DEST, PUBLISH ], cb);
});

gulp.task('jsHint', function() {
    return gulp.src(SOURCE)
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});

function testError(done){
  return function(exitStatus) {
    done(exitStatus ? "Tests Failed, Stopping..." : undefined);
  };
}

gulp.task('test', [ 'jsHint' ], function (done) {
  karma.start({ configFile: KARMA_CFG, singleRun: true}, testError(done));
});

gulp.task('copyHTML', function() {
    gulp.src(HTML)
        .pipe(gulp.dest(DEST))
        .pipe(browserSync.reload({ stream: true }));
});

gulp.task('copyCSS', function(){
    gulp.src(FONTS)
        .pipe(gulp.dest('build/css/fonts'));
    gulp.src(CSS)
        .pipe(concat('main.css'))
        .pipe(uglifyCSS())
        .pipe(gulp.dest(DEST + '/css'))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('copyJS', [ 'test' ], function() {
    gulp.src(SOURCE)
      .pipe(sourcemaps.init())
        .pipe(concat('scripts.min.js'))
        .pipe(ngAnnotate())
        .pipe(uglify())
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(DEST + '/js'))
      .pipe(browserSync.reload({stream: true}));
});

gulp.task('copyClasses', function() {
    gulp.src(CLASSES)
        .pipe(typescript())
        .pipe(concat("classes.min.js"))
        .pipe(uglify())
        .pipe(gulp.dest(DEST + '/js'))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('deploy', [ 'build' ], function(){
  gulp.src(DEST + '/**/*')
    .pipe(ghPages());
});

gulp.task('browserSync', function() {
    browserSync({ server: {baseDir: 'build'}});
});

gulp.task('watchFiles', function() {
    gulp.watch(HTML, ['copyHTML']);
    gulp.watch(CSS, ['copyCSS']);
    gulp.watch(SOURCE, ['copyJS']);
    gulp.watch(CLASSES, ['copyClasses']);
});

gulp.task('build', function(done){
  runSequence('clean', ['copyHTML', 'copyCSS', 'copyJS', 'copyClasses'], done);
});

gulp.task('default', function(done) {
    return runSequence('build', 'browserSync', 'watchFiles', done);
});