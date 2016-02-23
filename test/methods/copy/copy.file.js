/**
 * -----------------------------------------------------------------------------
 * VITALS UNIT TESTS: vitals.copy.file
 * -----------------------------------------------------------------------------
 * @see [vitals.copy docs](https://github.com/imaginate/vitals/wiki/vitals.copy)
 * @see [global test helpers](https://github.com/imaginate/vitals/blob/master/test/setup/helpers.js)
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2016 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Annotations:
 * @see [JSDoc3]{@link http://usejsdoc.org/}
 * @see [Closure Compiler specific JSDoc]{@link https://developers.google.com/closure/compiler/docs/js-for-compiler}
 */

if (BROWSER_TESTS) return;

var CONTENT = DUMMY.content; // content for dummy files
var BASE = DUMMY.base.replace(/\/$/, ''); // base directory for dummy files
var fs = require('fs');

describe('vitals.copy.file (section:fs)', function() {
  var title;

  title = titleStr('should copy file to correct location');
  describe(title, function() {

    before('setup dummy dirs and files', function() {
      mkDummy('file.js');
    });
    after('clean up dummy dirs and files', rmDummy);

    title = callStr('file.js', 'file1.js');
    it(title, function() {
      var src = addBase('file.js');
      var dest = addBase('file1.js');
      var result = vitals.copy.file(src, dest);
      assert( isBuffer(result) );
      result = result.toString();
      assert( result === CONTENT );
      assert( validFile(src) );
      assert( validFile(dest) );
    });

    title = callStr('file.js', 'file2.js', false);
    it(title, function() {
      var src = addBase('file.js');
      var dest = addBase('file2.js');
      var result = vitals.copy.file(src, dest, false);
      assert( result === CONTENT );
      assert( validFile(src, true) );
      assert( validFile(dest, true) );
    });

    title = callStr('file.js', 'subdir/');
    it(title, function() {
      var src = addBase('file.js');
      var dest = addBase('subdir/');
      var result = vitals.copy.file(src, dest);
      assert( isBuffer(result) );
      result = result.toString();
      assert( result === CONTENT );
      assert( validFile(src) );
      assert( validFile(dest + 'file.js') );
    });
  });

  title = titleStr('should throw an error');
  describe(title, function() {

    before('setup dummy dirs and files', function() {
      mkDummy('file.js');
    });
    after('clean up dummy dirs and files', rmDummy);

    title = callStr();
    it(title, function() {
      assert.throws(function() {
        vitals.copy.file();
      }, validTypeErr);
    });

    title = callStr('file.js');
    it(title, function() {
      assert.throws(function() {
        var src = addBase('file.js');
        vitals.copy.file(src);
      }, validTypeErr);
    });

    title = callStr('invalid.js', 'file1.js');
    it(title, function() {
      assert.throws(function() {
        var src = addBase('invalid.js');
        var dest = addBase('file1.js');
        vitals.copy.file(src, dest);
      }, validTypeErr);
    });
  });
});

////////////////////////////////////////////////////////////////////////////////
// PRIVATE HELPERS
////////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @param {string} shouldMsg
 * @return {string}
 */
function titleStr(shouldMsg) {
  return breakStr(shouldMsg, 2);
}

/**
 * @private
 * @param {...*} args
 * @return {string}
 */
function callStr() {
  if (arguments.length) {
    if (arguments.length > 1) arguments[1] = addBase(arguments[1]);
    arguments[0] = addBase(arguments[0]);
  }
  return testCall('copy.file', arguments, 3);
}

/**
 * @private
 * @param {string=} path
 * @return {string}
 */
function addBase(path) {
  return path ? BASE + '/' + path : BASE;
}

/**
 * @private
 * @param {string} filepath
 * @param {boolean=} encode
 * @return {boolean}
 */
function validFile(filepath, encode) {

  /** @type {string} */
  var content;

  if ( !isFile(filepath) ) return false;

  content = encode
    ? fs.readFileSync(filepath, 'utf8')
    : fs.readFileSync(filepath).toString();
  if (encode) content = setEol(content, 'LF');
  return CONTENT === content;
}
