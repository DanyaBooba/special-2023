import gulp from "gulp";
import htmlmin from "gulp-htmlmin";
import fileinclude from "gulp-file-include";
import cssmin from "gulp-cssmin";
import concatCss from "gulp-concat-css";
import autoprefixer from "gulp-autoprefixer";
import sync from "browser-sync";
sync.create();

// HTML

export const html = () => {
	return gulp
		.src("src/html/**/*.html")
		.pipe(fileinclude())
		.pipe(
			htmlmin({
				collapseWhitespace: true,
				removeComments: true,
			})
		)
		.pipe(gulp.dest("dist"));
};

// Styles

export const styles = () => {
	return gulp
		.src("src/css/*.css")
		.pipe(autoprefixer())
		.pipe(concatCss("index.css"))
		.pipe(cssmin())
		.pipe(gulp.dest("dist/css"))
		.pipe(gulp.src("src/css/static/**/*.css"))
		.pipe(autoprefixer())
		.pipe(cssmin())
		.pipe(gulp.dest("dist/css"));
};

// JS

export const javascript = () => {
	return gulp.src("src/js/**/*.js").pipe(gulp.dest("dist/js"));
};

// Copy

export const copyFont = () => {
	return gulp.src("src/fonts/**/*").pipe(gulp.dest("dist/fonts"));
};

export const copyImg = () => {
	return gulp.src("src/img/**/*").pipe(gulp.dest("dist/img"));
};

export const copyMore = () => {
	return gulp
		.src("src/more/**/*")
		.pipe(gulp.dest("dist/"))
		.pipe(gulp.src("src/more/.htaccess"))
		.pipe(gulp.dest("dist/"));
};

// Server

export const server = () => {
	sync.init({
		ui: false,
		notify: false,
		server: {
			baseDir: "dist",
		},
	});
};

// Watch

export const watch = () => {
	gulp.watch("src/**/*.html", gulp.series(html));
	gulp.watch("src/**/*.css", gulp.series(styles));
	gulp.watch("src/**/*.js", gulp.series(javascript));
	gulp.watch(
		["src/more/**/*", "src/fonts/**/*", "src/img/**/*"],
		gulp.series(copyFont, copyImg, copyMore)
	);
};

// Default

export default gulp.series(
	gulp.parallel(html, styles, javascript, copyFont, copyImg, copyMore),
	gulp.parallel(watch, server)
);
