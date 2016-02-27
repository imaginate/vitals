/**
 * -----------------------------------------------------------------------------
 * VITALS UNIT TESTS: vitals.copy.file
 * -----------------------------------------------------------------------------
 * @section fs
 * @see [vitals.copy docs](https://github.com/imaginate/vitals/wiki/vitals.copy)
 * @see [test api](https://github.com/imaginate/vitals/blob/master/test/setup/interface.js)
 * @see [test helpers](https://github.com/imaginate/vitals/blob/master/test/setup/helpers.js)
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2016 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Annotations:
 * @see [JSDoc3](http://usejsdoc.org)
 * @see [Closure Compiler JSDoc Syntax](https://developers.google.com/closure/compiler/docs/js-for-compiler)
 */

if (BROWSER_TESTS) return;

var CONTENT = DUMMY.content; // content for dummy files
var BASE = DUMMY.base.replace(/\/$/, ''); // base directory for dummy files

var addBase = DUMMY.addBase;
var fs = require('fs');

method('copy.file', function() {
  this.slow(25);

  should('copy file to correct location', function() {

    before('setup dummy dirs and files', function() {
      mkDummy('file.js');
    });

    after('clean up dummy dirs and files', rmDummy);

    test('file.js', 'file1.js', function() {
      var src = addBase('file.js');
      var dest = addBase('file1.js');
      var result = vitals.copy.file(src, dest);
      assert( isBuffer(result) );
      result = result.toString();
      assert( result === CONTENT );
      assert( validFile(src) );
      assert( validFile(dest) );
    });

    test('file.js', 'file2.js', false, function() {
      var src = addBase('file.js');
      var dest = addBase('file2.js');
      var result = vitals.copy.file(src, dest, false);
      assert( result === CONTENT );
      assert( validFile(src, true) );
      assert( validFile(dest, true) );
    });

    test('file.js', 'subdir/', function() {
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

  should('throw an error', function() {

    before('setup dummy dirs and files', function() {
      mkDummy('file.js');
    });

    after('clean up dummy dirs and files', rmDummy);

    test(function() {
      assert.throws(function() {
        vitals.copy.file();
      }, validTypeErr);
    });

    test('file.js', function() {
      assert.throws(function() {
        var src = addBase('file.js');
        vitals.copy.file(src);
      }, validTypeErr);
    });

    test('invalid.js', 'file1.js', function() {
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
