const gulp = require('gulp');
const pug = require('gulp-pug');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const cssMin = require('gulp-css');
const browserSync = require('browser-sync').create();

var paths = {
    templates: {
        src: 'src/templates/**/*.pug',
        dest: 'build/'
      },
    styles: {
      src: 'src/styles/**/*.scss',
      dest: 'build/styles/'
    },
    libs: {
        src: 'src/styles/0-plugins/*.css',
        dest: 'build/styles/'
    },
    scripts: {
      src: 'src/scripts/**/*.js',
      dest: 'build/scripts/'
    },
    images: {
        src: 'src/assets/images/**/*',
        dest: 'build/images/'
    },
    fonts: {
        src: 'src/assets/fonts/**/*',
        dest: 'build/styles/fonts/'
    }
};

// Compile pug files to one html file
function templates(){
    return gulp.src(paths.templates.src)
        .pipe(pug({ pretty: true }))
        .pipe(gulp.dest(paths.templates.dest))
        .pipe(browserSync.stream());
};
// Compile scss files to one css file
function styles(){
    return gulp.src(paths.styles.src)
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
    .pipe(gulp.dest(paths.styles.dest));
};
function libs(){
    return gulp.src(paths.libs.src)
    .pipe(concat('libs.css'))
    .pipe(cssMin())
    .pipe(gulp.dest(paths.libs.dest))
    .pipe(browserSync.stream());
};

function scripts(){
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
    .pipe(gulp.dest(paths.scripts.dest));
};
function browsers(){
    return gulp.src([
        './src/scripts/vendors/html5shiv.min.js',
        './src/scripts/vendors/respond.min.js',
    ])
    .pipe(gulp.dest(paths.scripts.dest));
};

function fonts(){
    return gulp.src(paths.fonts.src)
    .pipe(gulp.dest(paths.fonts.dest));
};

function images(){
    return gulp.src(paths.images.src)
    .pipe(gulp.dest(paths.images.dest));
};

/////////////////////////////////
function watch() {

    gulp.watch(paths.templates.src, templates);
    gulp.watch(paths.libs.src, libs);
    gulp.watch(paths.styles.src, styles);
    gulp.watch(paths.scripts.src, scripts);
    gulp.watch(paths.fonts.src, fonts);
    gulp.watch(paths.images.src, images);

    gulp.watch(paths.templates.src).on('change', browserSync.reload);
    gulp.watch(paths.libs.src, libs).on('change', browserSync.reload);
    gulp.watch(paths.styles.src, styles).on('change', browserSync.reload);
    gulp.watch(paths.scripts.src, scripts).on('change', browserSync.reload);
    gulp.watch(paths.fonts.src, fonts).on('change', browserSync.reload);
    gulp.watch(paths.images.src, images).on('change', browserSync.reload);

    browserSync.init({
        server: './build/'
    })
}

/*
* You can use CommonJS `exports` module notation to declare tasks
*/
exports.templates = templates;
exports.libs = libs;
exports.styles = styles;
exports.scripts = scripts;
exports.browsers = browsers;
exports.fonts = fonts;
exports.images = images;
exports.watch = watch;

/*
* Specify if tasks run in series or parallel using `gulp.series` and `gulp.parallel`
*/
var build = gulp.series(gulp.parallel(templates, styles, libs, scripts, browsers, fonts, images));

/*
* You can still use `gulp.task` to expose tasks
*/
gulp.task('build', build);

/*
* Define default task that can be called by just running `gulp` from cli
*/
gulp.task('default', build);