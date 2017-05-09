'use strict';

var _gulp = require('gulp');

var _gulp2 = _interopRequireDefault(_gulp);

var _gulpBabel = require('gulp-babel');

var _gulpBabel2 = _interopRequireDefault(_gulpBabel);

var _gulpJasmine = require('gulp-jasmine');

var _gulpJasmine2 = _interopRequireDefault(_gulpJasmine);

var _gulpJasmineNode = require('gulp-jasmine-node');

var _gulpJasmineNode2 = _interopRequireDefault(_gulpJasmineNode);

var _gulpNodemon = require('gulp-nodemon');

var _gulpNodemon2 = _interopRequireDefault(_gulpNodemon);

var _gulpInjectModules = require('gulp-inject-modules');

var _gulpInjectModules2 = _interopRequireDefault(_gulpInjectModules);

var _gulpIstanbul = require('gulp-istanbul');

var _gulpIstanbul2 = _interopRequireDefault(_gulpIstanbul);

var _gulpCoveralls = require('gulp-coveralls');

var _gulpCoveralls2 = _interopRequireDefault(_gulpCoveralls);

var _gulpExit = require('gulp-exit');

var _gulpExit2 = _interopRequireDefault(_gulpExit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// this transpiles all .js files except those in dist and node_modules folders
_gulp2.default.task('babel', function () {
  return _gulp2.default.src(['./**/*.js', '!dist/**', '!node_modules/**']).pipe((0, _gulpBabel2.default)()).pipe(_gulp2.default.dest('dist'));
});
// this runs the jasmine tests through an already transpiled file
_gulp2.default.task('run-tests', ['babel'], function () {
  _gulp2.default.src(['tests/inverted-index-test.js']).pipe((0, _gulpJasmine2.default)());
  // .pipe(exit());
});
// this starts the server at the specified port in .env file
_gulp2.default.task('serve', ['babel'], function () {
  (0, _gulpNodemon2.default)({ script: './dist/server.js' });
  // nodemon({
  //   script: path.join('dist', 'server.js'),
  //   ext: 'js',
  //   env: { 'NODE_ENV': 'development' }
  // });
});
// the coverage task depends on 'pre-test' and 'test' to give coverage report
_gulp2.default.task('coverage', function () {
  _gulp2.default.src('src/*.js').pipe((0, _gulpIstanbul2.default)()).pipe(_gulpIstanbul2.default.hookRequire()).on('finish', function () {
    _gulp2.default.src('tests/*.js').pipe((0, _gulpBabel2.default)()).pipe((0, _gulpInjectModules2.default)()).pipe((0, _gulpJasmineNode2.default)()).pipe(_gulpIstanbul2.default.writeReports()).pipe(_gulpIstanbul2.default.enforceThresholds({ thresholds: { global: 30 } })).on('end', function () {
      _gulp2.default.src('coverage/lcov.info').pipe((0, _gulpCoveralls2.default)());
    }).pipe((0, _gulpExit2.default)());
  });
});