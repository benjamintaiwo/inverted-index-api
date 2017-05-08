import gulp from 'gulp';
import babel from 'gulp-babel';
import jasmine from 'gulp-jasmine';
import jasmineNode from 'gulp-jasmine-node';
import nodemon from 'gulp-nodemon';
import injectModules from 'gulp-inject-modules';
import istanbul from 'gulp-istanbul';
import coveralls from 'gulp-coveralls';
import exit from 'gulp-exit';
// this transpiles all .js files except those in dist and node_modules folders
gulp.task('babel', () => {
  return gulp.src(['./**/*.js', '!dist/**', '!node_modules/**'])
  .pipe(babel())
  .pipe(gulp.dest('dist'));
});
// this runs the jasmine tests through an already transpiled file
gulp.task('run-tests', ['babel'], () => {
  gulp.src(['tests/inverted-index-test.js'])
  .pipe(jasmine());
  // .pipe(exit());
});
// this starts the server at the specified port in .env file
gulp.task('serve', ['babel'], () => {
  nodemon({ script: './dist/server.js' });
  // nodemon({
  //   script: path.join('dist', 'server.js'),
  //   ext: 'js',
  //   env: { 'NODE_ENV': 'development' }
  // });
});
// the coverage task depends on 'pre-test' and 'test' to give coverage report
gulp.task('coverage', () => {
  gulp.src('src/*.js')
    .pipe(istanbul())
    .pipe(istanbul.hookRequire())
    .on('finish', () => {
      gulp.src('tests/*.js')
      .pipe(babel())
      .pipe(injectModules())
      .pipe(jasmineNode())
      .pipe(istanbul.writeReports())
      .pipe(istanbul.enforceThresholds({ thresholds: { global: 30 } }))
      .on('end', () => {
        gulp.src('coverage/lcov.info')
        .pipe(coveralls());
      })
      .pipe(exit());
    });
});
