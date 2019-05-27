const gulp = require('gulp');
const pug = require('gulp-pug');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const cssMin = require('gulp-css');
const include = require('gulp-include');
const imagemin = require('gulp-imagemin');
const browserSync = require('browser-sync').create();
reload = browserSync.reload;

// Files Place Shortcut 
var paths = {
    templates: {
        src:  'src/templates/1-pages/*.pug', srcAll: 'src/templates/**/*.pug', 
        dist: 'dist/'
    },
    styles: {
        src:  'src/styles/**/*.scss', dist: 'dist/styles/'
    },
    libs: {
        src:  ['src/styles/0-plugins/*.css'], 
        dist: 'dist/styles/'
    },
    scripts: {
      src:  'src/scripts/**/*.js', 
      dist: 'dist/scripts/'
    },
    images: {
        src:  'src/assets/images/**/**/*', 
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

// Compile Pug Files To Html Pages
function templates(){
    return gulp.src(paths.templates.src)
        .pipe(pug(/*{ pretty: true }*/))
        .pipe(gulp.dest(paths.templates.dist));
};

// Compile Scss Files to One Css main File
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

// Concat Custom Layout Js Files to One Js main File
function scripts(){
    return gulp.src("./src/scripts/main.js")
    .pipe(include())
    .on('error', console.log)
    .pipe(uglify())
    .pipe(gulp.dest(paths.scripts.dist));
};

// Copy Js Files to dist scripts Folder
function supportBrowsersAssets(){
    return gulp.src([
        './src/scripts/vendors/' + 'html5shiv.min.js',
        './src/scripts/vendors/' + 'respond.min.js',
    ])
    .pipe(gulp.dest(paths.scripts.dist));
};

//Ccopy Fonts to dist fonts Folder
function fonts(){
    return gulp.src(paths.fonts.src)
    .pipe(gulp.dest(paths.fonts.dist));
};

// Copy Fonts to dist webfonts Folder
function webfonts(){
    return gulp.src(paths.webfonts.src)
    .pipe(gulp.dest(paths.webfonts.dist));
};

// Copy Images to dist images folder
function images(){
    return gulp.src(paths.images.src)
    .pipe(imagemin())
    .pipe(gulp.dest(paths.images.dist));
};

// Open website in Browser
function reloadBrowser(){
    browserSync.init({
        server: './dist/'
    })
}

// Watch Files Changes and run he Tasks
function watchFiles(){
    gulp.watch(paths.templates.srcAll, templates);
    gulp.watch(paths.templates.srcAll).on('change', reload);

    gulp.watch(paths.styles.src, styles);
    gulp.watch(paths.styles.src).on('change', reload);

    gulp.watch(paths.scripts.src, scripts);
    gulp.watch(paths.scripts.src).on('change', reload);
}

// Define Tasks
gulp.task('templates', templates);
gulp.task('styles', styles);
gulp.task('scripts', scripts);
gulp.task('supportBrowsers', supportBrowsersAssets);
gulp.task('fonts', fonts);
gulp.task('webfonts', webfonts);
gulp.task('images', images);
gulp.task('reloadBrowser', reloadBrowser);


// Specify if tasks run in series or parallel using `gulp.series` and `gulp.parallel`
var dist = gulp.parallel(templates, styles, scripts, supportBrowsersAssets, fonts, webfonts, images);
var assets = gulp.parallel(fonts, webfonts, images, supportBrowsersAssets);

// You can still use `gulp.task` to expose tasks
gulp.task('dist', dist);

// Define task to copy assets to dist file. You can still use `gulp.task` to expose tasks
gulp.task('assets', assets);

// Automatically reload the browser whene do any change to pug, sass, js files
gulp.task('watch', gulp.parallel(watchFiles, reloadBrowser));

// Define default task that can be called by just running `gulp` from cli
gulp.task('default', dist);