var gulp = require('gulp');
var browserSync = require('browser-sync');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var reload = browserSync.reload;

gulp.task('browser-sync', function() {
	browserSync.init({
	    server: {
	        baseDir: "./"
	    }
	});
})
gulp.task('sass', function() {
	return gulp.src('sass/base.scss')
		.pipe(sass())
		.pipe(rename('style.css'))
		.pipe(gulp.dest('./css'))
		.pipe(browserSync.reload({
					stream: true
				}));
})
gulp.task('watch', ['browser-sync', 'sass'], function() {
	gulp.watch('sass/**/*.scss', ['sass']);
})
