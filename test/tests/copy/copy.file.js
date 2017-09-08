/**
 * ---------------------------------------------------------------------------
 * VITALS.COPY.FILE UNIT TESTS
 * ---------------------------------------------------------------------------
 * @method vitals.copy.file
 * @submethod file
 * @super copy
 * @section fs
 * @section all
 * @build node
 *
 * @see [vitals.copy](https://github.com/imaginate/vitals/wiki/vitals.copy)
 *
 * @author Adam Smith <adam@imaginate.life> (http://imaginate.life)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life>
 */

/// #{{{ @group TYPEDEFS
//////////////////////////////////////////////////////////////////////////////
// TYPEDEFS
//////////////////////////////////////////////////////////////////////////////

/**
 * @typedef {(string|!Array<string>)} Files
 */

/**
 * @typedef {!Object<string, (?Files|?Dirs)>} Dirs
 */

/// #}}} @group TYPEDEFS

/// #{{{ @group HELPERS
//////////////////////////////////////////////////////////////////////////////
// HELPERS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func loadHelper
/**
 * @private
 * @param {string} name
 * @return {(!Object|!Function)}
 */
var loadHelper = global.VITALS_TEST.loadHelper;
/// #}}} @func loadHelper

/// #{{{ @func appendBackslash
/**
 * @private
 * @param {string} path
 * @return {string}
 */
var appendBackslash = loadHelper('append-slash');
/// #}}} @func appendBackslash

/// #{{{ @func assert
/**
 * @private
 * @param {boolean} result
 * @return {void}
 */
var assert = require('assert');
/// #}}} @func assert

/// #{{{ @func clearDummyTree
/**
 * @private
 * @return {void}
 */
var clearDummyTree = global.VITALS_TEST.DUMMY.clear;
/// #}}} @func clearDummyTree

/// #{{{ @const CONTENT
/**
 * @private
 * @const {string}
 */
var CONTENT = global.VITALS_TEST.DUMMY.CONTENT;
/// #}}} @const CONTENT

/// #{{{ @func freeze
/**
 * @private
 * @param {(?Object|?Function)} src
 * @param {boolean=} deep = `false`
 * @return {?Object}
 */
var freeze = loadHelper('freeze-object');
/// #}}} @func freeze

/// #{{{ @const is
/**
 * @private
 * @const {!Object<string, !function>}
 */
var is = loadHelper('is');
/// #}}} @const is

/// #{{{ @func isBuffer
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isBuffer = is.buffer;
/// #}}} @func isBuffer

/// #{{{ @func isFile
/**
 * @private
 * @param {string} path
 * @return {boolean}
 */
var isFile = is.file;
/// #}}} @func isFile

/// #{{{ @func isString
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isString = is.string;
/// #}}} @func isString

/// #{{{ @func isValidFile
/**
 * @private
 * @param {string} path
 * @param {boolean=} encode
 * @return {boolean}
 */
function isValidFile(path, encode) {

  /** @type {string} */
  var content;

  if ( !path || !isFile(path) ) {
    return false;
  }

  encode = !!encode;
  content = readFile(path, encode);

  if (encode) {
    content = setEol(content, 'LF');
  }

  return content === CONTENT;
}
/// #}}} @func isValidFile

/// #{{{ @func makeDummyPaths
/**
 * @private
 * @param {(?Files|?Dirs)=} paths = `null`
 * @return {void}
 */
var makeDummyPaths = global.VITALS_TEST.DUMMY.make;
/// #}}} @func makeDummyPaths

/// #{{{ @func readFile
/**
 * @private
 * @param {string} path
 * @param {boolean=} encode = `false`
 * @return {string}
 */
var readFile = loadHelper('read-file');
/// #}}} @func readFile

/// #{{{ @func removeDummyPaths
/**
 * @private
 * @param {(?Files|?Dirs)=} paths = `null`
 * @return {void}
 */
var removeDummyPaths = global.VITALS_TEST.DUMMY.remove;
/// #}}} @func removeDummyPaths

/// #{{{ @func resolveDummyPath
/**
 * @private
 * @param {(!Array<string>|!Arguments<string>|...string)=} path
 * @return {string}
 */
var resolveDummyPath = global.VITALS_TEST.DUMMY.resolve;
/// #}}} @func resolveDummyPath

/// #{{{ @func setEol
/**
 * @private
 * @param {string} content
 * @param {string} eol
 * @return {string}
 */
var setEol = loadHelper('set-eol');
/// #}}} @func setEol

/// #{{{ @func setupDummyTree
/**
 * @private
 * @param {(?Files|?Dirs)=} paths = `null`
 * @return {void}
 */
var setupDummyTree = global.VITALS_TEST.DUMMY.setup;
/// #}}} @func setupDummyTree

/// #{{{ @func throws
/**
 * @private
 * @param {!function} action
 * @return {void}
 */
var throws = loadHelper('throws-error');
/// #}}} @func throws

/// #{{{ @const vitals
/**
 * @private
 * @const {(!Object|!Function)}
 */
var vitals = global.VITALS_TEST.VITALS;
/// #}}} @const vitals

/// #}}} @group HELPERS

/// #{{{ @group TESTS
//////////////////////////////////////////////////////////////////////////////
// TESTS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @suite copy.file
method('copy.file', function copyFileTests() {

  /// #{{{ @step adjust-slow-measurement

  this.slow(25);

  /// #}}} @step adjust-slow-measurement

  /// #{{{ @tests A
  should('A', 'copy file to correct location', function copyFileTestsA() {

    /// #{{{ @before A
    beforeEach('A', 'setup dummy directories and files', function beforeEachFileTestsA() {
      setupDummyTree('file.js');
    });
    /// #}}} @before A

    /// #{{{ @after A
    afterEach('A', 'clean up dummy directories and files', function afterEachFileTestsA() { 
      clearDummyTree();
    });
    /// #}}} @after A

    /// #{{{ @test A1
    test('A1', [ 'file.js', 'file1.js' ], function copyFileTestA1() {

      /** @type {(!Buffer|string)} */
      var result;
      /** @type {string} */
      var dest;
      /** @type {string} */
      var src;

      src = resolveDummyPath('file.js');
      dest = resolveDummyPath('file1.js');

      result = vitals.copy.file(src, dest);

      assert( isBuffer(result) );

      result = result.toString();

      assert(result === CONTENT);

      assert( isValidFile(src) );
      assert( isValidFile(dest) );
    });
    /// #}}} @test A1

    /// #{{{ @test A2
    test('A2', [ 'file.js', 'file2.js', false ], function copyFileTestA2() {

      /** @type {string} */
      var result;
      /** @type {string} */
      var dest;
      /** @type {string} */
      var src;

      src = resolveDummyPath('file.js');
      dest = resolveDummyPath('file2.js');

      result = vitals.copy.file(src, dest, false);

      assert(result === CONTENT);

      assert( isValidFile(src, true) );
      assert( isValidFile(dest, true) );
    });
    /// #}}} @test A2

    /// #{{{ @test A3
    test('A3', [ 'file.js', 'subdir/' ], function copyFileTestA3() {

      /** @type {(!Buffer|string)} */
      var result;
      /** @type {string} */
      var dest;
      /** @type {string} */
      var src;

      src = resolveDummyPath('file.js');
      dest = resolveDummyPath('subdir');
      dest = appendBackslash(dest);

      result = vitals.copy.file(src, dest);

      assert( isBuffer(result) );

      result = result.toString();

      assert(result === CONTENT);

      assert( isValidFile(src) );

      dest = resolveDummyPath(dest, 'file.js');

      assert( isValidFile(dest) );
    });
    /// #}}} @test A3

  });
  /// #}}} @tests A

  /// #{{{ @tests B
  should('B', 'should throw a vitals error', function copyFileTestsB() {

    /// #{{{ @before B
    beforeEach('B', 'setup dummy directories and files', function beforeEachFileTestsB() {
      setupDummyTree('file.js');
    });
    /// #}}} @before B

    /// #{{{ @after B
    afterEach('B', 'clean up dummy directories and files', function afterEachFileTestsB() { 
      clearDummyTree();
    });
    /// #}}} @after B

    /// #{{{ @test B1
    test('B1', [], function copyFileTestB1() {

      throws(function() {
        vitals.copy.file();
      });

    });
    /// #}}} @test B1

    /// #{{{ @test B2
    test('B2', [ 'file.js' ], function copyFileTestB2() {

      /** @type {string} */
      var src;

      src = resolveDummyPath('file.js');

      throws(function() {
        vitals.copy.file(src);
      });

    });
    /// #}}} @test B2

    /// #{{{ @test B3
    test('B3', [ false, 'file1.js' ], function copyFileTestB3() {

      /** @type {string} */
      var dest;

      dest = resolveDummyPath('file1.js');

      throws.type(function() {
        vitals.copy.file(false, dest);
      });

    });
    /// #}}} @test B3

    /// #{{{ @test B4
    test('B4', [ 'file.js', false ], function copyFileTestB4() {

      /** @type {string} */
      var src;

      src = resolveDummyPath('file.js');

      throws.type(function() {
        vitals.copy.file(src, false);
      });

    });
    /// #}}} @test B4

    /// #{{{ @test B5
    test('B5', [ 'invalid.js', 'file1.js' ], function copyFileTestB5() {

      /** @type {string} */
      var dest;
      /** @type {string} */
      var src;

      src = resolveDummyPath('invalid.js');
      dest = resolveDummyPath('file1.js');

      throws(function() {
        vitals.copy.file(src, dest);
      });

    });
    /// #}}} @test B5

    /// #{{{ @test B6
    test('B6', [ 'file.js', 'file1.js', 'fail' ], function copyFileTestB6() {

      /** @type {string} */
      var dest;
      /** @type {string} */
      var src;

      src = resolveDummyPath('file.js');
      dest = resolveDummyPath('file1.js');

      throws.type(function() {
        vitals.copy.file(src, dest, 'fail');
      });

    });
    /// #}}} @test B6

  });
  /// #}}} @tests B

});
/// #}}} @suite copy.file

/// #}}} @group TESTS

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
