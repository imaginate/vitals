/**
 * -----------------------------------------------------------------------------
 * VITALS TESTS - COPY.FILE
 * -----------------------------------------------------------------------------
 * @see [vitals.copy]{@link https://github.com/imaginate/vitals/blob/master/src/methods/fs/copy.js}
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2016 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Supporting Libraries:
 * @see [are]{@link https://github.com/imaginate/are}
 *
 * Annotations:
 * @see [JSDoc3]{@link http://usejsdoc.org/}
 * @see [Closure Compiler specific JSDoc]{@link https://developers.google.com/closure/compiler/docs/js-for-compiler}
 */

if ( !VERSION.syncFs || !has(vitals.copy, 'file') ) return;

var fs = require('fs');

describe('vitals.copy.file (section:fs)', function() {
  var title;

  title = 'should copy file to correct location';
  title = titleStr('basic', title);
  describe(title, function() {

    title = callStr('./test/dummy/fake.js', './test/dummy/fake1.js');
    it(title, function() {
      var src = './test/dummy/fake.js';
      var dest = './test/dummy/fake1.js';
      var result = vitals.copy.file(src, dest);
      assert( is.buffer(result) );
      result = result.toString();
      src = fs.readFileSync(src).toString();
      dest = fs.readFileSync(dest).toString();
      assert( result === src );
      assert( result === dest );
    });

    title = callStr('./test/dummy/fake.js', './test/dummy/fake2.js', false);
    it(title, function() {
      var src = './test/dummy/fake.js';
      var dest = './test/dummy/fake2.js';
      var result = vitals.copy.file(src, dest, false);
      assert( is.str(result) );
      src = fs.readFileSync(src, 'utf8');
      src = normalize(src);
      dest = fs.readFileSync(dest, 'utf8');
      dest = normalize(dest);
      assert( result === src );
      assert( result === dest );
    });

    title = callStr('./test/dummy/fake.js', './test/dummy/subdir/');
    it(title, function() {
      var src = './test/dummy/fake.js';
      var dest = './test/dummy/subdir/';
      var result = vitals.copy.file(src, dest);
      assert( is.buffer(result) );
      result = result.toString();
      src = fs.readFileSync(src).toString();
      dest = fuse(dest, 'fake.js');
      dest = fs.readFileSync(dest).toString();
      assert( result === src );
      assert( result === dest );
    });

    after('clean up root dummy files', function() {
      var base = './test/dummy/';
      var files = get.filepaths(base, { invalidFiles: /^fake\.js$/ });
      each(files, function(file) {
        file = fuse(base, file);
        fs.unlinkSync(file);
      });
    });

    after('clean up dummy sub-dirs', function() {
      var base = './test/dummy';
      var dirs = get.dirpaths(base);
      each(dirs, function(dir) {
        var files;
        dir = fuse(base, '/', dir);
        files = get.filepaths(dir);
        each(files, function(file) {
          file = fuse(dir, '/', file);
          fs.unlinkSync(file);
        });
        fs.rmdirSync(dir);
      });
    });

  });

  title = titleStr('error', 'should throw an error');
  describe(title, function() {

    title = callStr();
    it(title, function() {
      assert.throws(function() {
        vitals.copy.file();
      });
    });

    title = callStr('file1');
    it(title, function() {
      assert.throws(function() {
        vitals.copy.file('file1');
      });
    });

    title = callStr('invalid.fail', 'dest');
    it(title, function() {
      assert.throws(function() {
        vitals.copy.file('invalid.fail', 'dest');
      });
    });

  });

});

////////////////////////////////////////////////////////////////////////////////
// PRIVATE HELPERS
////////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @param {string} section
 * @param {string} shouldMsg
 * @return {string}
 */
function titleStr(section, shouldMsg) {
  return testTitle(section, shouldMsg, 1);
}

/**
 * @private
 * @param {...*} args
 * @return {string}
 */
function callStr() {
  return testCall('copy.file', arguments, 3);
}

/**
 * @private
 * @param {string} str
 * @return {string}
 */
function normalize(str) {
  return remap(str, /\r\n?/g, '\n');
}
