const gulp = require('gulp');
const jasmine = require('gulp-jasmine');

gulp.task('run-tests', () => {
  gulp.src('tests/inverted-index-test.js')
  .pipe(jasmine());
});

//gulp.task('default', [ 'run-tests' ]);

