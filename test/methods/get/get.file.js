/**
 * -----------------------------------------------------------------------------
 * VITALS UNIT TESTS: vitals.get.file
 * -----------------------------------------------------------------------------
 * @section fs
 * @see [vitals.get docs](https://github.com/imaginate/vitals/wiki/vitals.get)
 * @see [test api](https://github.com/imaginate/vitals/blob/master/test/setup/interface.js)
 * @see [test helpers](https://github.com/imaginate/vitals/blob/master/test/setup/helpers.js)
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Annotations:
 * @see [JSDoc3](http://usejsdoc.org)
 * @see [Closure Compiler JSDoc Syntax](https://developers.google.com/closure/compiler/docs/js-for-compiler)
 */

var addBase = DUMMY.addBase;
var fs = require('fs');

var CONTENT = DUMMY.content; // content for dummy files
var BASE = DUMMY.base.replace(/\/$/, ''); // base directory for dummy files

method('get.file', function() {
  this.slow(25);

  before('setup dummy dirs and files', function() {
    mkDummy('file.js');
  });

  after('clean up dummy dirs and files', rmDummy);

  should('return a buffer of the file', function() {

    test('file.js', true, function() {
      var file = addBase('file.js');
      var result = vitals.get.file(file, true);
      assert( isBuffer(result) );
      result = result.toString();
      assert( result === CONTENT );
      assert( validFile(file) );
    });
  });

  should('return a valid string of the file', function() {

    test('file.js', function() {
      var file = addBase('file.js');
      var result = vitals.get.file(file);
      assert( result === CONTENT );
      assert( validFile(file, true) );
    });

    test('file.js', { eol: 'CRLF' }, function() {
      var file = addBase('file.js');
      var result = vitals.get.file(file, { eol: 'CRLF' });
      var content = setEol(CONTENT, 'CRLF');
      assert( result === content );
      result = fs.readFileSync(file, 'utf8');
      result = setEol(result, 'CRLF');
      assert( result === content );
    });
  });

  should('throw an error', function() {

    test(function() {
      assert.throws(function() {
        vitals.get.file();
      }, validTypeErr);
    });

    test('invalid.js', function() {
      assert.throws(function() {
        var file = addBase('invalid.js');
        vitals.get.file(file);
      }, validTypeErr);
    });

    test('file.js', 'fail', function() {
      assert.throws(function() {
        var file = addBase('file.js');
        vitals.get.file(file, 'fail');
      }, validTypeErr);
    });
  });
});

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
