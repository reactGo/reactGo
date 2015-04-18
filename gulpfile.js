var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('sass', function() {
	gulp.src('./app/scss/main.scss')
		.pipe(sass())
		.pipe(gulp.dest('./public/assets/styles/'));
});

gulp.task('watch', function() {
	gulp.watch('./app/scss/main.scss', ['sass']);
});