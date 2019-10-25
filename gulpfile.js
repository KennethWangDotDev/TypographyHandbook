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
    pngquant = require('imagemin-pngquant'),
    jpegoptim = require('imagemin-jpegoptim');
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
gulp.task('css', function (done) {
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
  done();
});

gulp.task('css-build', function (done) {
  gulp.src('app/assets/scss/**/*.scss')
    .pipe(plumber())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([
      lost(),
      autoprefixer()
    ]))
    .pipe(cssnano())
    .pipe(header(banner, { package : package }))
    .pipe(gulp.dest('dist/assets/css'));
  done();
});

gulp.task('js',function(done){
  gulp.src(['app/assets/js/**/*.js', '!app/assets/js/polyfill/**/*.js'])
    .pipe(plumber())
    .pipe(concat('merged.js'))
    .pipe(uglify())
    .pipe(header(banner, { package : package }))
    .pipe(gulp.dest('dist/assets/js'));
  done();
});

gulp.task('html', function(done) {
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
  done();
});

gulp.task('images', function(done) {
  gulp.src('app/assets/images/**/*.+(png|jpg|jpeg|gif|svg)')
    .pipe(imagemin({
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant({quality: "80"}), jpegoptim({progressive: true, max: 90})]
    }))
    .pipe(gulp.dest('dist/assets/images'))
  done();
});

gulp.task('imagemin', function(done) {
  gulp.src('app/assets/images/**/*.+(png|jpg|jpeg|gif|svg)')
    .pipe(imagemin({
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant({quality: "80", floyd: 1, speed: 1}), jpegoptim({progressive: true, max: 90})]
    }))
    .pipe(gulp.dest('dist/assets/images'))
  done();
});

gulp.task('clean', function(done) {
    del.sync('dist');
    done();
});

gulp.task('copy', function(done) {
    gulp.src(['app/**', '!app/chapters', '!app/chapters/**', '!app/**/*.html', 'app/.htaccess'])
      .pipe(gulp.dest('dist'))
    done();
});



gulp.task('browser-sync', function() {
    browserSync.init(null, {
        server: {
            baseDir: "./dist",
        },
        reloadDelay: 300
    });
});


gulp.task('default', function(callback) {
  runSequence(['css', 'js', 'html', 'browser-sync', 'watch'],
    callback
  )
});


gulp.task('build', gulp.series('clean', 'copy', 'imagemin', 'js', 'html', 'css-build', function (done) {
  done();
}));