var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('sass', function() {
	gulp.src('./scss/main.scss')
		.pipe(sass())
		.pipe(gulp.dest('./public/assets/styles/'));
});

gulp.task('watch', function() {
	gulp.watch('./scss/main.scss', ['sass']);
});