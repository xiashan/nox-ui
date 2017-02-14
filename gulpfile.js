var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

var src = {
  scss: ['assets/stylesheets/bootstrap/_variables.scss','assets/stylesheets/bootstrap/_mixins.scss', 'assets/stylesheets/bootstrap/*.scss'],
  //scss: 'docs/scss/main.scss',
  css: 'docs/css',
  html: 'docs/*.html'
};

gulp.task('serve', ['sass'], function() {

  browserSync.init({
    server: "./docs"
  });

  gulp.watch(src.scss, ['sass']);
  gulp.watch(src.html).on('change', reload);
});

var sassOptions = {
  outputStyle: 'expanded',
  precision: 10
};

// Compile sass into CSS
gulp.task('sass', function() {
  return gulp.src(src.scss)
    .pipe(concat('main.scss'))
    .pipe(sass(sassOptions))
    .pipe(gulp.dest(src.css))
    .pipe(reload({stream: true}));
});

gulp.task('default', ['serve']);
