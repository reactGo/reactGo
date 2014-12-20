var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('styles', function() {
	gulp.src('./scss/main.scss')
		.pipe(sass())
		.pipe(gulp.dest('./public/assets/styles/'));
});