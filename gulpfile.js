var gulp = require('gulp');
var htmlmin = require('gulp-htmlmin');
var fileinclude = require('gulp-file-include');
// var replace = require('gulp-replace');
// var webpHtmlNoSvg = require('gulp-webp-html-nosvg');
var cssmin = require('gulp-cssmin');
var concatCss = require('gulp-concat-css');
var autoprefixer = require('gulp-autoprefixer');
var ttf2woff2 = require('gulp-ttf2woff2');
var webp = require('gulp-webp');
var imagemin = require('gulp-imagemin');
var sync = require('browser-sync').create();

function html(done) {
    gulp.src('./src/html/**/*.html')
        .pipe(fileinclude())
        .pipe(htmlmin({
            collapseWhitespace: true,
            removeComments: true
        }))
        .pipe(gulp.dest('./dist'))
        .pipe(gulp.src('./src/html/.htaccess'))
        .pipe(gulp.dest('./dist'));

    done();
}

function css(done) {
    gulp.src('./src/css/*.css')
        .pipe(autoprefixer())
        .pipe(concatCss('index.css'))
        .pipe(cssmin())
        .pipe(gulp.dest('./dist/css'))
        .pipe(gulp.src('./src/css/static/**/*.css'))
        .pipe(cssmin())
        .pipe(gulp.dest('./dist/css'));

    done();
}

function images(done) {
    gulp.src('./src/img/**/*')
        .pipe(gulp.dest('./dist/img'));

    done();
}

function javascript(done) {
    gulp.src('./src/js/**/*.js')
        .pipe(gulp.dest('./dist/js'));

    done();
}

function fonts(done) {
    gulp.src('./src/fonts/**/*.ttf')
        .pipe(ttf2woff2())
        .pipe(gulp.dest('./dist/fonts'))
        .pipe(gulp.src('./src/fonts/**/*.{otf,woff,woff2}'))
        .pipe(gulp.dest('./dist/fonts'));

    done();
}

function fontsCopy(done) {
    gulp.src('./src/fonts/**/*')
        .pipe(gulp.dest('./dist/fonts'));

    done();
}

function imagecompress(done) {
    gulp.src('./src/img/**/*.jpg')
        .pipe(webp())
        .pipe(gulp.src('./src/img'))
        .pipe(gulp.src('./src/img/**/*.jpg'))
        .pipe(imagemin({
            progressive: true,
            interlaced: true,
            optimizationLevel: 3
        }))
        .pipe(gulp.dest('./dist/img'))
        .pipe(gulp.src('./src/img/**/*.{ico,svg,png}'))
        .pipe(gulp.dest('./dist/img'));

    done();
}

function browser(done) {
    sync.init({
        server: './dist'
    });

    gulp.watch('./src/**/*.html', html).on('change', sync.reload);
    gulp.watch('./src/**/*.css', css).on('change', sync.reload);
    gulp.watch('./src/img/**/*', imagecompress).on('change', sync.reload);
    gulp.watch('./src/**/*.js', javascript).on('change', sync.reload);
    gulp.watch('./src/fonts/**/*', fontsCopy).on('change', sync.reload);

    done();
}

gulp.task('default',
    gulp.series(
        gulp.parallel(
            html,
            css,
            imagecompress,
            javascript,
            fontsCopy
        ),
        browser
    )
);

gulp.task('build', gulp.parallel(
    html,
    css,
    imagecompress,
    javascript,
    fontsCopy
));

gulp.task('compress', gulp.parallel(
    html,
    css,
    imagecompress,
    fonts,
    javascript,
    fonts
));
