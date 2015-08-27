var gulp = require('gulp');
var less = require('gulp-less');
var livereload = require('gulp-livereload');
var csso = require('gulp-csso');
var jsx = require('gulp-jsx');

gulp.task('less', function() {
    return gulp.src('./style.less')  // only compile the entry file
        .pipe(less())
        .pipe(csso())
        .pipe(gulp.dest('.'))
        .pipe(livereload());
});

gulp.task('reload-html', function() {
    return gulp.src('./index.html')
        .pipe(gulp.dest('.'))
        .pipe(livereload());
});

gulp.task('compile-jsx', function() {
    return gulp.src('./whereami.jsx')
      .pipe(jsx())
      .pipe(gulp.dest('.'))
      .pipe(livereload());
})

gulp.task('watch', function() {
    livereload.listen();
    gulp.watch('./*.less', ['less']);
    gulp.watch('./*.js', ['reload-html']);
    gulp.watch('./*.jsx', ['compile-jsx']);
    gulp.watch('./index.html', ['reload-html']);
});

gulp.task('default', ['watch']); // Default will run the 'entry' watch task
