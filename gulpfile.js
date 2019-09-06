// Gulp
var gulp = require('gulp');
var yarn = require('gulp-yarn');

//Task manager
gulp.task('yarn', function() {
  return gulp.src(['./package.json', './yarn.lock'])
    .pipe(gulp.dest('./dist'))
    .pipe(yarn({
      production: true
    }));
});

// Templates
var ejs = require('gulp-ejs');

// Stylesheet
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var autoprefixerOptions = {
  browsers: ['last 2 versions', '> 5%', 'Firefox ESR']
};

// Notify
var notify = require('gulp-notify');

// JS
var gutil = require('gulp-util')
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

// Server
var nodemon = require('gulp-nodemon');
var browserSync = require('browser-sync');
var reload = browserSync.reload;


gulp.task('default', ['styles', 'watch', 'js']);

gulp.task('build', ['html', 'styles', 'js']);

gulp.task('watch', ['browserSync'], function() {
  gulp.watch('./js/main.js', ['js'], reload);
  gulp.watch(["./sass/**/*"], ['styles'], reload);
  gulp.watch(["./views/**/*"], reload);
});

gulp.task('browserSync', ['nodemon'], function() {
  browserSync.init(null, {
    proxy: "http://localhost:3700" // port of node server
  });
});

gulp.task('nodemon', function(cb) {
  var callbackCalled = false;
  return nodemon({
    script: './server.js'
  }).on('start', function() {
    if (!callbackCalled) {
      callbackCalled = true;
      cb();
    }
  });
});

gulp.task('styles', function() {
  gulp.src('./sass/main.sass')
    // .pipe(sourcemaps.init())
    .pipe(sass({errLogToConsole: true}))
    .on('error',function (err) { 
      return notify().write(err)
    })
    // .pipe(sourcemaps.write())
    .pipe(autoprefixer())
    .pipe(gulp.dest('./build/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('js', function() {
  return gulp.src([
      './js/main.js'
    ])
    // .pipe(concat('all.min.js'))
    .pipe(uglify())
    // .on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
    .on('error',function (err) { 
      return notify().write(err)
    })
    .pipe(gulp.dest('build/js'))
});

gulp.task('html', function() {
  return gulp.src('./views/*.ejs')
    .pipe(ejs({}, {}, {
      ext: '.html'
    }))
    .pipe(gulp.dest('build'))
});

    // .on('error', notify.onError(function(err) {
    //   return{
    //     title:'Styles',
    //     message:err.message
    //   };
    // })