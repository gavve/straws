var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');

gulp.task('sass', function () {
  return gulp.src('./src/sass/main.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('./build/sass/'));
});
 
gulp.task('watch', function () {
  gulp.watch('./src/sass/**/*.scss', ['sass']);
});

gulp.task('minify-images', () =>
    gulp.src('content/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./build/sass/content/images'))
);

gulp.task("build-prod", ["sass", "minify-images"]);