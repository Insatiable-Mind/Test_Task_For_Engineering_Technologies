const gulp = require('gulp');
const less = require('gulp-less');
const LessAutoprefix = require('less-plugin-autoprefix');
const autoprefix = new LessAutoprefix({ browsers: ['last 3 versions'] });
const watch = require('gulp-watch');
const browserSync = require('browser-sync').create();

/* Static Server + watching scss/html files */
gulp.task('serve', ['build'], function() {

  browserSync.init({
    server: './'
  });

  gulp.watch('*.html').on('change', browserSync.reload);
  gulp.watch('./less/**/*.less', ['build']);
});

/* Compile Sass into CSS, autoprefix & auto-inject into browsers */
gulp.task('build', function() {
  gulp.watch('./less/**/*.less').on('change', function() {
    return gulp.src('less/main.less')
      .pipe(less({
        plugins: [autoprefix],
      }))
      .pipe(gulp.dest('css'))
      .pipe(browserSync.stream());
  });
});

gulp.task('default', ['build', 'serve']);