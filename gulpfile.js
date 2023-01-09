var gulp = require('gulp');
var htmlmin = require('gulp-htmlmin');
var fileinclude = require('gulp-file-include');
var replace = require('gulp-replace');
var webpHtmlNoSvg = require('gulp-webp-html-nosvg');
var cssmin = require('gulp-cssmin');
var csso = require('gulp-csso');
var concatCss = require('gulp-concat-css');
var autoprefixer = require('gulp-autoprefixer');
var uglify = require('gulp-uglify');
var ttf2woff2 = require('gulp-ttf2woff2');
var webp = require('gulp-webp');
var imagemin = require('gulp-imagemin');
var concat = require('gulp-concat');
var sync = require('browser-sync').create();

// use php ...

function html(done) {
    gulp.src('./src/**.html')
        .pipe(fileinclude())
        .pipe(replace(/@img\//g, 'img/'))
        .pipe(webpHtmlNoSvg())
        .pipe(htmlmin({
            collapseWhitespace: true,
            removeComments: true
        }))
        .pipe(gulp.dest('./dist'));

    gulp.src('./src/games/**/*.html')
        .pipe(fileinclude())
        .pipe(replace(/@img\//g, 'img/'))
        .pipe(webpHtmlNoSvg())
        .pipe(htmlmin({
            collapseWhitespace: true,
            removeComments: true
        }))
        .pipe(gulp.dest('./dist/games'));

    gulp.src('./src/_noedithtml/*.html')
        .pipe(gulp.dest('./dist/static'));

    done();
}

function getcss(done) {
    gulp.src('./src/css/**/*.css')
        .pipe(autoprefixer())
        .pipe(csso())
        .pipe(concatCss('index.css'))
        .pipe(cssmin())
        .pipe(gulp.dest('./dist/css'))
        .pipe(gulp.src('./src/_css/**/*.css'))
        .pipe(autoprefixer())
        .pipe(csso())
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
    gulp.src('./src/js/*.js')
        .pipe(concat('index.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js'))
        .pipe(gulp.src('./src/js/not_compress/**/*.js'))
        .pipe(gulp.dest('./dist/js'));

    gulp.src('./src/_js/**/*.js')
        .pipe(gulp.dest('./dist/js'));

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

function compressImages(done) {
    gulp.src('./src/img/**/*.jpg')
        .pipe(webp())
        .pipe(gulp.src('./src/img/**/*.{jpg, jpeg, png, jfif, webp}'))
        .pipe(imagemin({
            progressive: true,
            interlaced: true,
            optimizationLevel: 3
        }))
        .pipe(gulp.dest('./dist/img'));

    done();
}

function anotherFolders(done) {
    gulp.src('./src/.htaccess')
        .pipe(gulp.dest('./dist'));

    done();
}

function getserve(done) {
    sync.init({
        server: './dist'
    });

    gulp.watch('./src/**/*.html', gulp.series(html)).on('change', sync.reload);
    gulp.watch('./src/img/**/*', gulp.series(images)).on('change', sync.reload);
    gulp.watch('./src/css/**/*', gulp.series(getcss)).on('change', sync.reload);
    gulp.watch('./src/_css/**/*', gulp.series(getcss)).on('change', sync.reload);
    gulp.watch('./src/**/*.css', gulp.series(getcss)).on('change', sync.reload);
    gulp.watch('./src/js/**/*.js', gulp.series(javascript)).on('change', sync.reload);
    gulp.watch('./src/**/*.js', gulp.series(javascript)).on('change', sync.reload);
    gulp.watch('./src/.htaccess', gulp.series(anotherFolders)).on('change', sync.reload);

    done();
}

gulp.task('default',
    gulp.series(
        gulp.parallel(
            html,
            getcss,
            images,
            javascript,
            anotherFolders
        ),
        gulp.series(getserve)
    )
);

gulp.task('build', gulp.series(
    html,
    getcss,
    images,
    javascript,
    anotherFolders
));

gulp.task('compress', gulp.series(
    html,
    getcss,
    compressImages,
    compressFonts,
    javascript,
    anotherFolders
));

gulp.task('serve', gulp.series(
    html,
    getcss,
    images,
    javascript,
    anotherFolders,
    getserve
));
