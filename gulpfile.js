var gulp        = require("gulp"),
    jshint      = require("gulp-jshint"),
    browserSync = require("browser-sync"),
    typescript  = require("gulp-typescript"),
    del         = require("del"),
    concat      = require("gulp-concat"),
    uglify      = require("gulp-uglify"),
    uglifyCSS   = require("gulp-uglifycss"),
    runSequence = require("run-sequence");

var DEST = "build",
    SOURCE = "src/js/**/*.js",
    CLASSES = "src/js/**/*.ts",
    HTML = "src/**/*.html",
    FONTS = "src/css/fonts/**/*.*",
    CSS = "src/css/**/*.css", 
    LIBRARIES = [
  "node_modules/angular/angular.min.js",
  "node_modules/jquery/dist/jquery.min.js"
];

gulp.task('hello', function() {
    console.log('This is "Gulp" signing in...');
});

gulp.task('cleanBuildFolder', function(cb) {
  del(DEST, cb);
});

gulp.task('jsHint', function() {
    gulp.src(SOURCE)
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('copyHTML', function() {
    gulp.src(HTML)
        .pipe(gulp.dest(DEST))
        .pipe(browserSync.reload({ stream: true }));
});

gulp.task('copyCSS', function(){
    gulp.src(FONTS)
        .pipe(gulp.dest('build/css/fonts'))
    gulp.src(CSS)
        .pipe(concat('main.css'))
        .pipe(uglifyCSS())
        .pipe(gulp.dest(DEST + '/css'))
        .pipe(browserSync.reload({stream: true}));
})
gulp.task('copyJS',  function() {
    gulp.src(SOURCE)
        .pipe(concat('scripts.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(DEST + '/js'))
        .pipe(browserSync.reload({stream: true}));
})

gulp.task('copyLib', function() {
    return gulp.src(LIBRARIES)
        .pipe(concat('lib.min.js'))
        .pipe(gulp.dest(DEST + '/js'))
        .pipe(browserSync.reload({stream: true}));
})

gulp.task('copyClasses', function() {
    gulp.src(CLASSES)
        .pipe(typescript())
        .pipe(concat("classes.min.js"))
        .pipe(uglify())
        .pipe(gulp.dest(DEST + '/js'))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('browserSync', function() {
    browserSync({ server: {baseDir: 'build'}});
});

gulp.task('watchFiles', function() {
    gulp.watch(HTML, ['copyHTML']);
    gulp.watch(CSS, ['copyCSS']);
    gulp.watch(SOURCE, ['copyJS']);
    gulp.watch(CLASSES, ['copyClasses']);
    gulp.watch('gulpfile.js', ['jshint', 'copyHTML', 'copyCSS', 'copyJS', 'copyClasses', 'copyLib']);
});

gulp.task('default', function() {
    runSequence(
        ['cleanBuildFolder'],
        ['jsHint'],
        ['copyHTML', 'copyCSS', 'copyJS', 'copyClasses', 'copyLib'],
        ['browserSync'],
        ['watchFiles']);
});