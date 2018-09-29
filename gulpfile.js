var gulp = require('gulp'),
    minifyCSS = require('gulp-minify-css'),
    concat = require('gulp-concat')
    uglify = require('gulp-uglify')
    prefix = require('gulp-autoprefixer')
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    imagemin = require('gulp-imagemin'),
    cache = require('gulp-cache'),
    imageminPngquant = require('imagemin-pngquant'),
    imageminZopfli = require('imagemin-zopfli'),
    imageminMozjpeg = require('imagemin-mozjpeg'), //need to run 'brew install libpng'
    imageminGiflossy = require('imagemin-giflossy'),


gulp.task('styles', function(){
  return gulp.src('src/sass/**/*.sass')
  .pipe(sass())
  .pipe(prefix('last 2 versions'))
  .pipe(concat('main.css'))
  .pipe(minifyCSS())
  .pipe(gulp.dest('build'))
});

gulp.task('movecss', [], function() {
  console.log("Moving all css");
  gulp.src("build/sass/**.css")
      .pipe(gulp.dest('build'));
});

gulp.task('js', function(){
  return gulp.src('src/scripts/**/*.js')
  .pipe(uglify())
  .pipe(gulp.dest('public/js'))
});
 
gulp.task('watch', function () {
  gulp.watch('./src/sass/**/*.scss', ['styles', 'movecss']);
  gulp.watch('./content/images/**/*.{gif,png,jpg,jpeg}', ['imagemin']);
});



//compress all images
gulp.task('imagemin', function() {
    return gulp.src(['content/images/**/*.{gif,png,jpg,jpeg}'])
        .pipe(cache(imagemin([
            //png
            imageminPngquant({
                speed: 1,
                quality: 98 //lossy settings
            }),
            imageminZopfli({
                more: true
                // iterations: 50 // very slow but more effective
            }),
            //gif
            // imagemin.gifsicle({
            //     interlaced: true,
            //     optimizationLevel: 3
            // }),
            //gif very light lossy, use only one of gifsicle or Giflossy
            imageminGiflossy({
                optimizationLevel: 3,
                optimize: 3, //keep-empty: Preserve empty transparent frames
                lossy: 2
            }),
            //svg
            imagemin.svgo({
                plugins: [{
                    removeViewBox: false
                }]
            }),
            //jpg lossless
            imagemin.jpegtran({
                progressive: true
            }),
            //jpg very light lossy, use vs jpegtran
            imageminMozjpeg({
                quality: 90
            })
        ])))
        .pipe(gulp.dest('build/images'));
});

gulp.task("build-prod", ["sass", "imagemin"]);