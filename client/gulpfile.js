var gulp = require('gulp');
var less = require('gulp-less');
var livereload = require('gulp-livereload');
var csso = require('gulp-csso');
var htmlmin = require('gulp-htmlmin');

gulp.task('less', function() {
    return gulp.src('./style.less')  // only compile the entry file
        .pipe(less())
        .pipe(csso())
        .pipe(gulp.dest('.'))
        .pipe(livereload());
});

gulp.task('reload-html', function() {
    return gulp.src('./index.html')
        .pipe(livereload());
});

gulp.task('watch', function() {
    livereload.listen();
    gulp.watch('./*.less', ['less']);  // Watch all the .less files, then run the less task
    gulp.watch('./*.js', ['reload-html']);
    gulp.watch('./index.html', ['reload-html']);
});

gulp.task('default', ['watch']); // Default will run the 'entry' watch task
