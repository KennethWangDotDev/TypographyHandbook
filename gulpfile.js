var gulp = require('gulp'),
	uglify = require('gulp-uglify'),
	sass = require('gulp-sass'),
	plumber = require('gulp-plumber'),
	browserSync = require('browser-sync').create(),
	imageMin = require('gulp-imagemin'),
	pngquant = require('imagemin-pngquant'),
	prefix = require('gulp-autoprefixer');

// Compresses JS
gulp.task('uglify', function(){
	gulp.src('_src/_js/**/*.js')
	.pipe(plumber())
	.pipe(uglify())
	.pipe(gulp.dest('assets/js'))
	.pipe(browserSync.stream());
});

// Compresses Image
gulp.task('imagemin', function(){
	gulp.src('_src/_images/**/*')
		.pipe(imageMin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
		.pipe(gulp.dest('assets/images'));
});

// Processes Sass
gulp.task('sass', function(){
  gulp.src('_src/_stylesheets/**/*.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(plumber())
    .pipe(prefix('last 2 versions'))
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(gulp.dest('assets/stylesheets'))
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

    gulp.watch("src/_stylesheets/**/*.scss", ['sass']);
    gulp.watch("src/_js/**/*.js", ['uglify']);
    gulp.watch("*.html").on('change', browserSync.reload);
});


gulp.task('default', ['browsersync']);