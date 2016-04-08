var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    sass = require('gulp-sass'),
    sourcemaps  = require('gulp-sourcemaps'),
    browserSync = require('browser-sync'),
    autoprefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    header  = require('gulp-header'),
    rename = require('gulp-rename'),
    cssnano = require('gulp-cssnano'),
    nunjucksRender = require('gulp-nunjucks-render'),
    package = require('./package.json');


var banner = [
  '/*!\n' +
  ' * View full source here:\n' +
  ' * <%= package.homepage %>\n' +
  ' * @author <%= package.author %>\n' +
  ' * @version <%= package.version %>\n' +
  ' * Copyright ' + new Date().getFullYear() + '. <%= package.license %> licensed.\n' +
  ' */',
  '\n'
].join('');

gulp.task('css', function () {
  gulp.src('assets/scss/**/*.scss')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer('last 4 version'))
    .pipe(cssnano())
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write('./'))
    .pipe(header(banner, { package : package }))
    .pipe(gulp.dest('build/assets/css'))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('js',function(){
  gulp.src('assets/js/**/*.js')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write('./'))
    .pipe(header(banner, { package : package }))
    .pipe(gulp.dest('build/assets/js'))
    .pipe(browserSync.reload({stream:true, once: true}));
});

gulp.task('nunjucks', function() {
   gulp.src(['./**/*.html', '!./build{,/**/*}', '!./node_modules{,/**/*}'])
    .pipe(nunjucksRender({
      path: ['_templates']
    }))
    .pipe(gulp.dest('build'))
    .pipe(browserSync.reload({stream:true, once: true}));
});

gulp.task('browser-sync', function() {
    browserSync.init(null, {
        server: {
            baseDir: "build"
        }
    });
});

gulp.task('bs-reload', function () {
    browserSync.reload();
});

gulp.task('default', ['css', 'js', 'nunjucks', 'browser-sync'], function () {
    gulp.watch("assets/scss/**/*.scss", ['css']);
    gulp.watch("assets/js/**/*.js", ['js']);
    gulp.watch(['./**/*.+(html|nunjucks)', '!./build{,/**/*}', '!./node_modules{,/**/*}'], ['nunjucks']);

});