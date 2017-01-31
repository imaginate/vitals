/**
 * -----------------------------------------------------------------------------
 * VITALS UNIT TESTS: vitals.to.file
 * -----------------------------------------------------------------------------
 * @section fs
 * @see [vitals.to docs](https://github.com/imaginate/vitals/wiki/vitals.to)
 * @see [test api](https://github.com/imaginate/vitals/blob/master/test/setup/interface.js)
 * @see [test helpers](https://github.com/imaginate/vitals/blob/master/test/setup/helpers.js)
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2017 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Annotations:
 * @see [JSDoc3](http://usejsdoc.org)
 * @see [Closure Compiler JSDoc Syntax](https://developers.google.com/closure/compiler/docs/js-for-compiler)
 */

var CONTENT = DUMMY.content; // content for dummy files
var BASE = DUMMY.base; // base directory for dummy files

var addBase = DUMMY.addBase;
var fs = require('fs');

method('to.file', function() {

  beforeEach('setup dummy dirs and files', function() {
    mkDummy('file.js');
  });

  afterEach('clean up dummy dirs and files', rmDummy);

  should('overwrite file with buffer', function() {

    test('<Buffer>', 'file.js', function() {
      var content = '// overwrite test 1';
      var buf = new Buffer(content);
      var file = addBase('file.js');
      var result = vitals.to.file(buf, file);
      assert( isBuffer(result) );
      result = result.toString();
      assert( result === content );
      assert( validFile(file, content) );
    });
  });

  should('make new file with buffer', function() {

    test('<Buffer>', 'file1.js', function() {
      var buf = new Buffer(CONTENT);
      var file = addBase('file1.js');
      var result = vitals.to.file(buf, file);
      assert( isBuffer(result) );
      result = result.toString();
      assert( result === CONTENT );
      assert( validFile(file, CONTENT) );
    });

    test('<Buffer>', 'file2.js', 'utf8', function() {
      var buf = new Buffer(CONTENT);
      var file = addBase('file2.js');
      var result = vitals.to.file(buf, file, 'utf8');
      assert( isBuffer(result) );
      result = result.toString();
      assert( result === CONTENT );
      assert( validFile(file, CONTENT, true) );
    });
  });

  should('overwrite file with string', function() {

    test('// overwrite test 2', 'file.js', function() {
      var content = '// overwrite test 2';
      var file = addBase('file.js');
      var result = vitals.to.file(content, file);
      assert( result === content );
      assert( validFile(file, content, true) );
    });
  });

  should('make new file with string', function() {

    test(CONTENT, 'file3.js', function() {
      var file = addBase('file3.js');
      var result = vitals.to.file(CONTENT, file);
      assert( result === CONTENT );
      assert( validFile(file, CONTENT, true) );
    });

    test(CONTENT, 'file4.js', null, function() {
      var file = addBase('file4.js');
      var result = vitals.to.file(CONTENT, file, null);
      assert( result === CONTENT );
      assert( validFile(file, CONTENT) );
    });
  });

  should('throw an error', function() {

    test(function() {
      assert.throws(function() {
        vitals.to.file();
      }, validTypeErr);
    });

    test('content', function() {
      assert.throws(function() {
        vitals.to.file('content');
      }, validTypeErr);
    });

    test(null, 'file.js', function() {
      assert.throws(function() {
        var file = addBase('file.js');
        vitals.to.file(null, file);
      }, validTypeErr);
    });

    test('content', 'file.js', false, function() {
      assert.throws(function() {
        var file = addBase('file.js');
        vitals.to.file('content', file, false);
      }, validTypeErr);
    });
  });
});

/**
 * @private
 * @param {string} filepath
 * @param {string} result
 * @param {boolean=} encode
 * @return {boolean}
 */
function validFile(filepath, result, encode) {

  /** @type {string} */
  var content;

  if ( !isFile(filepath) ) return false;

  content = encode
    ? fs.readFileSync(filepath, 'utf8')
    : fs.readFileSync(filepath).toString();
  return result === content;
}
