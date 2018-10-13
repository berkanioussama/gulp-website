const gulp = require('gulp');
const pug = require('gulp-pug');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const cssMin = require('gulp-css');
const browserSync = require('browser-sync').create();

/*
    -- top level functions --
    gulp.task - Define tasks
    gulp.src - Point to file to use
    gulp.dest - Points to folder to output
    gulp.watch - Watch files and folders for change
*/

gulp.task('html', function(){
    return gulp.src([
        './src/templates/*.pug',
    ])
    .pipe(pug({
        pretty: true
    }))
    .pipe(gulp.dest('./build/'))
    .pipe(browserSync.stream());
});

// Concat vendors librarys in one file
gulp.task('css', function(){
    return gulp.src([
        './src/styles/0-plugins/*.css',
    ])
    .pipe(concat('libs.css'))
    .pipe(cssMin())
    .pipe(gulp.dest('./build/styles/'))
    .pipe(browserSync.stream());
});

// Compile scss files to one css file
gulp.task('scss', function(){
    return gulp.src('./src/styles/main.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
        errLogToConsole: true
    }))
    .on('error', console.error.bind(console))
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
    .pipe(cssMin())
    .pipe(gulp.dest('./build/styles/'));
});

gulp.task('scripts', function(){
    return gulp.src([
        //The order is important
        './src/scripts/vendors/jquery-3.3.1.min.js',
        './src/scripts/vendors/smooth-scroll.min.js',
        './src/scripts/vendors/jquery.filterizr.min.js',
        './src/scripts/vendors/bootstrap.bundle.min.js',
        './src/scripts/vendors/owl.carousel.min.js',
        './src/scripts/vendors/sal.js',
        './src/scripts/main.js'
    ])
    .pipe(concat('main.js'))
    .pipe(gulp.dest('./build/scripts/'));
});

gulp.task('js', function(){
    return gulp.src([
        './src/scripts/vendors/html5shiv.min.js',
        './src/scripts/vendors/respond.min.js',
    ])
    .pipe(gulp.dest('./build/scripts/'));
});

gulp.task('copy', function(){
    return gulp.src([
        './src/assets/fonts/*'
    ])
    .pipe(gulp.dest('./build/styles/fonts'));
});

gulp.task('images', function(){
    return gulp.src([
        './src/assets/images/**/*',
    ])
    .pipe(gulp.dest('./build/images/'));
});

gulp.task('watch',['html', 'scss', 'css', 'scripts', 'js', 'copy', 'images'], function(){

    browserSync.init({
        server: './build/'
    })
    gulp.watch('./src/templates/**/*.pug', ['html']);
    gulp.watch('./src/template/*.pug').on('change', browserSync.reload);
    gulp.watch('./src/styles/**/*.scss', ['scss']);
    gulp.watch('./src/styles/**/*.scss').on('change', browserSync.reload);
    gulp.watch('./src/scripts/**/*.js', ['scripts']);
    gulp.watch('./src/scripts/**/*.js').on('change', browserSync.reload);
});

gulp.task('default', ['html', 'css','scss', 'scripts', 'watch']);