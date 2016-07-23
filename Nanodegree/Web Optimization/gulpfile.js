var gulp = require('gulp');
var concat = require('gulp-concat');
var autoprefixer = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var server = require('gulp-server-livereload');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var uglify = require('gulp-uglify');


gulp.task('minify-js', function () {
    gulp.src('src/js/*.js ')
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
    gulp.src('src/views/js/*.js ')
        .pipe(uglify())
        .pipe(gulp.dest('dist/views/js'));
});

gulp.task('minify-css', function() {
    gulp.src('src/css/*.css')
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('dist/css'));
    gulp.src('src/views/css/*.css')
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('dist/views/css'));
});

gulp.task('images', function(){
    gulp.src('src/img/**/*.*')
        .pipe(cache(imagemin()))
        .pipe(gulp.dest('dist/img'));
    gulp.src('src/views/images/**/*.*')
        .pipe(cache(imagemin()))
        .pipe(gulp.dest('dist/views/images'));
});

gulp.task('pages', function(){
    gulp.src('src/*.html')
        .pipe(gulp.dest('dist'));
    gulp.src('src/views/*.html')
        .pipe(gulp.dest('dist/views'));
});

gulp.task('webserver', function() {
    gulp.src('dist')
        .pipe(server({
            livereload: {
                enable: true,
                filter: function(filePath, cb) {
                    cb( !(/.DS_Store/.test(filePath)) );
                }
            },
            directoryListing: false,
            open: true,
            log: 'info',
            defaultFile: 'index.html'
        }));
});

gulp.task('default', function() {
    gulp.start('pages', 'minify-js', 'minify-css', 'images', 'webserver');
    gulp.watch('src/*.html', ['pages']);
    gulp.watch('src/js/*.js', ['minify-js']);
    gulp.watch('src/css/*.css', ['minify-css']);
    gulp.watch('src/img/**/*.*', ['images']);
});