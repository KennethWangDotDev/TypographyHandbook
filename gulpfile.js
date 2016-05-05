var gulp = require('gulp'),
    plumber = require('gulp-plumber'),

    header  = require('gulp-header'),
    package = require('./package.json'),

    sass = require('gulp-sass'),
    sourcemaps  = require('gulp-sourcemaps'),
    autoprefixer = require('autoprefixer'),
    cssnano = require('gulp-cssnano'),
    postcss = require('gulp-postcss'),
    uncss = require('gulp-uncss'),
    lost = require('lost'),

    uglify = require('gulp-uglify'),
    concat = require('gulp-concat');

    browserSync = require('browser-sync').create(),
    nunjucksRender = require('gulp-nunjucks-render'),
    htmlmin = require('gulp-htmlmin'),

    imagemin = require('gulp-imagemin'),
    cache = require('gulp-cache'),

    runSequence = require('run-sequence'),
    del = require('del');

//Banner header
var banner = [
  '/*!\n' +
  ' * View uncompiled source here:\n' +
  ' * <%= package.repository.url %>\n' +
  ' */',
  '\n\n'
].join('');

var bannerHTML = [
  '<!-- \n' +
  ' - View uncompiled source here:\n' +
  ' - <%= package.repository.url %>\n' +
  ' -->',
  '\n\n'
].join('');

//
gulp.task('css', function () {
  gulp.src('app/assets/scss/**/*.scss')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([
      lost(),
      autoprefixer()
    ]))
    .pipe(cssnano())
    .pipe(sourcemaps.write())
    .pipe(header(banner, { package : package }))
    .pipe(gulp.dest('dist/assets/css'));
});

gulp.task('uncss', function () {
  gulp.src('app/assets/scss/**/*.scss')
    .pipe(plumber())
    .pipe(sass().on('error', sass.logError))
    .pipe(uncss({
            html: ['dist/**/*.html']
     }))
    .pipe(postcss([
      lost(),
      autoprefixer()
    ]))
    .pipe(cssnano())
    .pipe(sourcemaps.write())
    .pipe(header(banner, { package : package }))
    .pipe(gulp.dest('dist/assets/css'));
});

gulp.task('js',function(){
  gulp.src(['app/assets/js/**/*.js', '!app/assets/js/polyfill/**/*.js'])
    .pipe(plumber())
    .pipe(concat('merged.js'))
    .pipe(uglify())
    .pipe(header(banner, { package : package }))
    .pipe(gulp.dest('dist/assets/js'));
});

gulp.task('html', function() {
   gulp.src(['app/**/*.html', 'app/**/*.nunjucks', '!app/chapters/**/*'])
    .pipe(nunjucksRender({
      path: ['app/chapters']
    }))
    .pipe(htmlmin({
      removeComments: true,
      collapseWhitespace: true,
      collapseBooleanAttributes: true,
      removeAttributeQuotes: true,
      removeRedundantAttributes: true,
      removeEmptyAttributes: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true
    }))
    .pipe(header(bannerHTML, { package : package }))
    .pipe(gulp.dest('dist'));
});

gulp.task('images', function() {
  return gulp.src('app/assets/images/**/*.+(png|jpg|jpeg|gif|svg)')
    .pipe(cache(imagemin({
      interlaced: true,
    })))
    .pipe(gulp.dest('dist/assets/images'))
});

gulp.task('clean', function() {
    return del.sync('dist');
});

gulp.task('copy', function() {
   gulp.src(['app/**', '!app/chapters', '!app/chapters/**', '!app/**/*.html', 'app/.htaccess'])
    .pipe(gulp.dest('dist'))
});



gulp.task('browser-sync', function() {
    browserSync.init(null, {
        server: {
            baseDir: "./dist",
        },
        reloadDelay: 300
    });
});

gulp.task('watch', function() {
    gulp.watch("app/assets/scss/**/*.scss", ['css']).on('change', function(evt) {
    	browserSync.reload();
    });

    gulp.watch("app/assets/js/**/*.js", ['js']).on('change', function(evt) {
    	browserSync.reload();
    });

    gulp.watch("app/**/*.+(html|nunjucks)", ['html']).on('change', function(evt) {
    	browserSync.reload();
    });

    gulp.watch("app/**/*.+(png|jpg|jpeg|gif)", ['images']).on('change', function(evt) {
      browserSync.reload();
    });
});

gulp.task('default', function(callback) {
  runSequence(['css', 'js', 'html', 'browser-sync', 'watch'],
    callback
  )
});

gulp.task('build', function (callback) {
  runSequence('clean', 'copy',
    ['images', 'uncss', 'js'],
    'html',
    callback
  )
});