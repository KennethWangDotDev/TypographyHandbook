var gulp = require('gulp'),
	uglify = require('gulp-uglify'),
	sass = require('gulp-sass'),
	plumber = require('gulp-plumber'),
	browserSync = require('browser-sync').create(),
	imageMin = require('gulp-imagemin'),
	pngquant = require('imagemin-pngquant'),
	autoprefixer = require('gulp-autoprefixer'),
    postcss = require('gulp-postcss'),
    sourcemaps = require('gulp-sourcemaps'),
    lost = require('lost');

//Declaring paths
var paths = {
    cssSource: '_src/_stylesheets/',
    cssDestination: 'assets/stylesheets/',
    jsSource: '_src/_js/',
    jsDestination: 'assets/js/',
    imageSource: '_src/_images/',
    imageDestination: 'assets/images'
};

// Compresses JS
gulp.task('uglify', function(){
	gulp.src(paths.jsSource + '**/*.js')
	.pipe(plumber())
    .pipe(sourcemaps.init())
	.pipe(uglify())
    .pipe(sourcemaps.write('./'))
	.pipe(gulp.dest(paths.jsDestination))
	.pipe(browserSync.stream());
});

// Compresses Image
gulp.task('imagemin', function(){
	gulp.src(paths.imageSource + '**/*')
		.pipe(imageMin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
		.pipe(gulp.dest(paths.imageDestination));
});

// Processes Sass
// Autoprefixes and integrates Lost
gulp.task('sass', function(){
  gulp.src(paths.cssSource + '**/*.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(plumber({
      errorHandler: function (err) {
        gutil.beep();
        console.log(err);
      }
    }))
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(postcss([
      lost()
    ]))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(paths.cssDestination))
    .pipe(browserSync.stream());
});

// Browser Sync
gulp.task('browsersync', ['sass', 'uglify'], function() {

    browserSync.init({
    	server: {
            baseDir: "./"
        },
	    browser: "google chrome",
	});

    gulp.watch(paths.cssSource + "**/*.scss", ['sass']);
    gulp.watch(paths.jsSource + "**/*.js", ['uglify']);
    gulp.watch("*.html").on('change', browserSync.reload);
});


gulp.task('default', ['browsersync']);