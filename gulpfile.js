const gulp = require('gulp');
const pug = require('gulp-pug');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const cssMin = require('gulp-css');
const include = require('gulp-include');
const imagemin = require('gulp-imagemin');
const browserSync = require('browser-sync').create();
reload = browserSync.reload;

// files place shortcut 
var paths = {
    templates: {
        src:  'src/templates/1-pages/*.pug', srcAll: 'src/templates/**/*.pug', 
        dist: 'dist/'
    },
    styles: {
        src:  'src/styles/**/*.scss', dist: 'dist/styles/'
    },
    scripts: {
      src:  'src/scripts/**/*.js', 
      dist: 'dist/scripts/'
    },
    images: {
        src:  'src/assets/images/**/*', 
        dist: 'dist/images/'
    },
    fonts: {
        src:  'src/assets/fonts/*', 
        dist: 'dist/fonts/'
    },
    webfonts: {
        src:  'src/assets/webFonts/*', 
        dist: 'dist/webfonts/'
    }
};

// Compile pug files to html pages
function templates(){
    return gulp.src(paths.templates.src)
        .pipe(pug(/*{ pretty: true }*/))
        .pipe(gulp.dest(paths.templates.dist));
};

// Compile scss files to one css main file
function styles(){
    return gulp.src(paths.styles.src)
    .pipe(sourcemaps.init())
    .pipe(sourcemaps.write())
    .pipe(sass({ errLogToConsole: true }))
    .on('error', console.error.bind(console))
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
    .pipe(cssMin())
    .pipe(gulp.dest(paths.styles.dist));
};

// concat custom layout js files to one js main file
function scripts(){
    return gulp.src("./src/scripts/main.js")
    .pipe(include())
    .on('error', console.log)
    .pipe(gulp.dest(paths.scripts.dist));
};

// copy js files to dist scripts folder
function supportBrowsers(){
    return gulp.src([
        './src/scripts/vendors/' + 'html5shiv.min.js',
        './src/scripts/vendors/' + 'respond.min.js',
    ])
    .pipe(gulp.dest(paths.scripts.dist));
};

// copy fonts to dist fonts folder
function fonts(){
    return gulp.src(paths.fonts.src)
    .pipe(gulp.dest(paths.fonts.dist));
};

// copy fonts to dist webfonts folder
function webfonts(){
    return gulp.src(paths.webfonts.src)
    .pipe(gulp.dest(paths.webfonts.dist));
};

// copy images to dist images folder
function images(){
    return gulp.src(paths.images.src)
    .pipe(imagemin())
    .pipe(gulp.dest(paths.images.dist));
};

// open website in browser
function reloadBrowser(){
    browserSync.init({
        server: './dist/'
    })
}

// watch files changes and run the tasks
function watchFiles(){
    gulp.watch(paths.templates.srcAll, templates);
    gulp.watch(paths.templates.srcAll).on('change', reload);

    gulp.watch(paths.styles.src, styles);
    gulp.watch(paths.styles.src).on('change', reload);

    gulp.watch(paths.scripts.src, scripts);
    gulp.watch(paths.scripts.src).on('change', reload);
} 

// define tasks
gulp.task('templates', templates);
gulp.task('styles', styles);
gulp.task('scripts', scripts);
gulp.task('supportBrowsers', supportBrowsers);
gulp.task('fonts', fonts);
gulp.task('webfonts', webfonts);
gulp.task('images', images);
gulp.task('reloadBrowser', reloadBrowser);


// Specify if tasks run in series or parallel using `gulp.series` and `gulp.parallel`
var dist = gulp.parallel(templates, styles, scripts, supportBrowsers, fonts, webfonts, images);

// You can still use `gulp.task` to expose tasks
gulp.task('dist', dist);

// automatically reload the browser whene do any change to pug, sass, js files
gulp.task('watch', gulp.parallel(watchFiles, reloadBrowser));

// Define default task that can be called by just running `gulp` from cli
gulp.task('default', dist);