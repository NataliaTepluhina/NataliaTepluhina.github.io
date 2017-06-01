var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var cleanCSS = require('gulp-clean-css');
var image = require('gulp-image');
var ngAnnotate = require('gulp-ng-annotate');


gulp.task('minify-js', function () {
    return gulp.src(['js/lib/jquery.min.js', 'js/lib/angular.min.js', 'js/lib/angular-route.min.js', 'js/lib/angular-route.min.js', 'js/lib/ui-bootstrap-tpls-2.4.0.min.js', 'js/lib/ngStorage.min.js', 'js/app.js', 'js/services/getpizzas.js', 'js/controllers/StoreController.js', 'js/controllers/NavController.js'])
        .pipe(concat('main.js'))
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

gulp.task('minify-css', function() {
    gulp.src('css/*.css')
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('dist/css'));
});

gulp.task('images', function () {
    gulp.src('img/*.*')
        .pipe(image())
        .pipe(gulp.dest('dist/img'));
});

gulp.task('html', function () {
    gulp.src('*.html')
        .pipe(gulp.dest('dist'));
    gulp.src('views/*.html')
        .pipe(gulp.dest('dist/views'));
});


gulp.task('default', function() {
    gulp.start('minify-js', 'minify-css', 'images', 'html');
    gulp.watch('src/js/*.js', ['minify-js']);
    gulp.watch('src/css/*.css', ['minify-css']);
    gulp.watch('src/img/**/*.*', ['images']);
});