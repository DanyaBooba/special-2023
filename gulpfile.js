var gulp = require('gulp');
var htmlmin = require('gulp-htmlmin');
var fileinclude = require('gulp-file-include');
var replace = require('gulp-replace');
var webpHtmlNoSvg = require('gulp-webp-html-nosvg');
var cssmin = require('gulp-cssmin');
var concatCss = require('gulp-concat-css');
var autoprefixer = require('gulp-autoprefixer');
var uglify = require('gulp-uglify');
var ttf2woff2 = require('gulp-ttf2woff2');
var webp = require('gulp-webp');
var imagemin = require('gulp-imagemin');
var sync = require('browser-sync').create();

function html(done) {
    gulp.src('./src/_html/**/*.html')
        .pipe(fileinclude())
        .pipe(replace(/@img\//g, 'img/'))
        .pipe(webpHtmlNoSvg())
        .pipe(htmlmin({
            collapseWhitespace: true,
            removeComments: true
        }))
        .pipe(gulp.dest('./dist'));

    gulp.src('./src/_statichtml/**/*.html')
        .pipe(fileinclude())
        .pipe(htmlmin({
            collapseWhitespace: true,
            removeComments: true
        }))
        .pipe(gulp.dest('./dist'));

    done();
}

function css(done) {
    gulp.src('./src/css/edit/**/*.css')
        .pipe(autoprefixer())
        .pipe(concatCss('index.css'))
        .pipe(cssmin())
        .pipe(gulp.dest('./dist/css'));

    gulp.src('./src/css/notedit/**/*.css')
        .pipe(autoprefixer())
        .pipe(cssmin())
        .pipe(gulp.dest('./dist/css'));

    done();
}

function js(done) {
    gulp.src('./src/js/**/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js'));

    done();
}

function fonts(done) {
    gulp.src('./src/fonts/**/*.{woff,woff2,otf,ttf}')
        .pipe(gulp.dest('./dist/fonts'));

    done();
}

function images(done) {
    gulp.src('./src/img/**/*.{ico,svg,jpg,jpeg,png,jfif}')
        .pipe(gulp.dest('./dist/img'));

    done();
}

function compressImages(done) {
    gulp.src('./src/img/**/*.jpg')
        .pipe(webp())
        .pipe(gulp.dest('./dist/img'));

    gulp.src('./src/img/**/*.{jpg,jpeg,png,jfif,webp}')
        .pipe(gulp.dest('./dist/img'));

    gulp.src('./src/img/**/*.{jpg,jpeg,png,jfif,webp}')
        .pipe(imagemin({
            progressive: true,
            interlaced: true,
            optimizationLevel: 3
        }))
        .pipe(gulp.dest('./dist/img'));

    done();
}

function compressFonts(done) {
    gulp.src('./src/fonts/**/*.ttf')
        .pipe(ttf2woff2())
        .pipe(gulp.dest('./dist/fonts'))
        .pipe(gulp.src('./src/fonts/**/*.{otf,woff,woff2}'))
        .pipe(gulp.dest('./dist/fonts'));

    done();
}

function getServe(done) {
    // ...

    done();
}

gulp.task('default', gulp.series(
    gulp.parallel(
        html,
        css,
        js,
        fonts,
        images
    ),
    getServe
));

gulp.task('build', gulp.parallel(
    html,
    css,
    js,
    fonts,
    images
));

gulp.task('compress', gulp.parallel(
    html,
    css,
    js,
    compressFonts,
    compressImages
));
