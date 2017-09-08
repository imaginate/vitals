/**
 * ---------------------------------------------------------------------------
 * VITALS.COPY.DIRECTORY UNIT TESTS
 * ---------------------------------------------------------------------------
 * @method vitals.copy.directory
 * @submethod directory
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

/// #{{{ @func forEach
/**
 * @public
 * @param {(!Array|!Arguments|!Object|!Function)} src
 * @param {!function(*, (number|string))} func
 * @return {(!Array|!Arguments|!Object|!Function)}
 */
var forEach = loadHelper('for-each-property');
/// #}}} @func forEach

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

/// #{{{ @func isArray
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isArray = is.array;
/// #}}} @func isArray

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

/// #{{{ @func isStrings
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isStrings = is.stringList;
/// #}}} @func isStrings

/// #{{{ @func isValidFile
/**
 * @private
 * @param {string} path
 * @return {boolean}
 */
function isValidFile(path) {

  /** @type {string} */
  var content;

  if ( !path || !isFile(path) ) {
    return false;
  }

  content = readFile(path, true);
  return content === CONTENT;
}
/// #}}} @func isValidFile

/// #{{{ @func hasValue
/**
 * @private
 * @param {(!Array|!Arguments|!Object|!Function)} src
 * @param {*} val
 * @return {boolean}
 */
var hasValue = loadHelper('has-value');
/// #}}} @func hasValue

/// #{{{ @func readFile
/**
 * @private
 * @param {string} path
 * @param {boolean=} encode = `false`
 * @return {string}
 */
var readFile = loadHelper('read-file');
/// #}}} @func readFile

/// #{{{ @func resolveDummyPath
/**
 * @private
 * @param {(!Array<string>|!Arguments<string>|...string)=} path
 * @return {string}
 */
var resolveDummyPath = global.VITALS_TEST.DUMMY.resolve;
/// #}}} @func resolveDummyPath

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

/// #{{{ @func trimBackslash
/**
 * @private
 * @param {string} path
 * @return {string}
 */
var trimBackslash = loadHelper('trim-slash');
/// #}}} @func trimBackslash

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

/// #{{{ @suite copy.directory
method('copy.directory', 'copy.dir', function copyDirectoryTests() {

  /// #{{{ @step adjust-slow-measurement

  this.slow(25);

  /// #}}} @step adjust-slow-measurement

  /// #{{{ @tests A
  should('A', 'shallowly copy files from dir to dir', function copyDirectoryTestsA() {

    /// #{{{ @before A
    beforeEach('A', 'setup dummy directories and files', function beforeEachFileTestsA() {
      setupDummyTree({
        'root': [
          'file1.js',
          'file2.js',
          'file3.js'
        ],
        'subdir1': null
      });
    });
    /// #}}} @before A

    /// #{{{ @after A
    afterEach('A', 'clean up dummy directories and files', function afterEachFileTestsA() { 
      clearDummyTree();
    });
    /// #}}} @after A

    /// #{{{ @test A1
    test('A1', [ 'dir', 'subdir1' ], function copyDirectoryTestA1() {

      /** @type {!Array<string>} */
      var result;
      /** @type {string} */
      var dest;
      /** @type {string} */
      var src;

      src = resolveDummyPath();
      dest = resolveDummyPath('subdir1');
      dest = trimBackslash(dest);

      result = vitals.copy.directory(src, dest);

      assert( isArray(result) );
      assert( isStrings(result) );
      assert(result.length === 3);

      assert( hasValue(result, 'file1.js') );
      assert( hasValue(result, 'file2.js') );
      assert( hasValue(result, 'file3.js') );

      forEach(result, function _isValidFile(file) {
        file = resolveDummyPath(dest, file);
        assert( isValidFile(file) );
      });
    });
    /// #}}} @test A1

    /// #{{{ @test A2
    test('A2', [ 'dir/', 'subdir2/' ], function copyDirectoryTestA2() {

      /** @type {!Array<string>} */
      var result;
      /** @type {string} */
      var dest;
      /** @type {string} */
      var src;

      src = resolveDummyPath();
      dest = resolveDummyPath('subdir2');
      dest = appendBackslash(dest);

      result = vitals.copy.directory(src, dest);

      assert( isArray(result) );
      assert( isStrings(result) );
      assert(result.length === 3);

      assert( hasValue(result, 'file1.js') );
      assert( hasValue(result, 'file2.js') );
      assert( hasValue(result, 'file3.js') );

      forEach(result, function _isValidFile(file) {
        file = resolveDummyPath(dest, file);
        assert( isValidFile(file) );
      });
    });
    /// #}}} @test A2

  });
  /// #}}} @tests A

  /// #{{{ @tests B
  should('B', 'deeply copy files from dir to dir', function copyDirectoryTestsB() {

    /// #{{{ @before B
    beforeEach('B', 'setup dummy directories and files', function beforeEachFileTestsB() {
      setupDummyTree({
        'root': [
          'file1.js',
          'file2.js',
          'file3.js'
        ],
        'subdir1': [
          'file1.js',
          'file2.js',
          'file3.js'
        ],
        'subdir2': [
          'file1.js',
          'file2.js',
          'file3.js'
        ]
      });
    });
    /// #}}} @before B

    /// #{{{ @after B
    afterEach('B', 'clean up dummy directories and files', function afterEachFileTestsB() { 
      clearDummyTree();
    });
    /// #}}} @after B

    /// #{{{ @test B1
    test('B1', [ 'dir/', 'subdir/', true ], function copyDirectoryTestB1() {

      /** @type {!Array<string>} */
      var result;
      /** @type {string} */
      var dest;
      /** @type {string} */
      var src;

      src = resolveDummyPath();
      dest = resolveDummyPath('subdir');
      dest = appendBackslash(dest);

      result = vitals.copy.directory(src, dest, true);

      assert( isArray(result) );
      assert( isStrings(result) );
      assert(result.length === 9);

      assert( hasValue(result, 'file1.js') );
      assert( hasValue(result, 'file2.js') );
      assert( hasValue(result, 'file3.js') );
      assert( hasValue(result, 'subdir1/file1.js') );
      assert( hasValue(result, 'subdir1/file2.js') );
      assert( hasValue(result, 'subdir1/file3.js') );
      assert( hasValue(result, 'subdir2/file1.js') );
      assert( hasValue(result, 'subdir2/file2.js') );
      assert( hasValue(result, 'subdir2/file3.js') );

      forEach(result, function _isValidFile(file) {
        file = resolveDummyPath(dest, file);
        assert( isValidFile(file) );
      });
    });
    /// #}}} @test B1

  });
  /// #}}} @tests B

  /// #{{{ @tests C
  should('C', 'should throw a vitals error', function copyDirectoryTestsC() {

    /// #{{{ @before C
    beforeEach('C', 'setup dummy directories and files', function beforeEachFileTestsC() {
      setupDummyTree({
        'root': [
          'file1.js',
          'file2.js',
          'file3.js'
        ],
        'subdir1': null
      });
    });
    /// #}}} @before C

    /// #{{{ @after C
    afterEach('C', 'clean up dummy directories and files', function afterEachFileTestsC() { 
      clearDummyTree();
    });
    /// #}}} @after C

    /// #{{{ @test C1
    test('C1', [], function copyDirectoryTestC1() {

      throws(function() {
        vitals.copy.directory();
      });

    });
    /// #}}} @test C1

    /// #{{{ @test C2
    test('C2', [ 'dir/' ], function copyDirectoryTestC2() {

      /** @type {string} */
      var src;

      src = resolveDummyPath();

      throws(function() {
        vitals.copy.directory(src);
      });

    });
    /// #}}} @test C2

    /// #{{{ @test C3
    test('C3', [ false, 'subdir1' ], function copyDirectoryTestC3() {

      /** @type {string} */
      var dest;

      dest = resolveDummyPath('subdir1');

      throws.type(function() {
        vitals.copy.directory(false, dest);
      });

    });
    /// #}}} @test C3

    /// #{{{ @test C4
    test('C4', [ 'dir', false ], function copyDirectoryTestC4() {

      /** @type {string} */
      var src;

      src = resolveDummyPath();

      throws.type(function() {
        vitals.copy.directory(src, false);
      });

    });
    /// #}}} @test C4

    /// #{{{ @test C5
    test('C5', [ 'invalid', 'subdir1' ], function copyDirectoryTestC5() {

      /** @type {string} */
      var dest;
      /** @type {string} */
      var src;

      src = resolveDummyPath('invalid');
      dest = resolveDummyPath('subdir1');

      throws(function() {
        vitals.copy.directory(src, dest);
      });

    });
    /// #}}} @test C5

    /// #{{{ @test C6
    test('C6', [ 'dir', 'invalid' ], function copyDirectoryTestC6() {

      /** @type {string} */
      var dest;
      /** @type {string} */
      var src;

      src = resolveDummyPath();
      dest = resolveDummyPath('invalid');

      throws(function() {
        vitals.copy.directory(src, dest);
      });

    });
    /// #}}} @test C6

    /// #{{{ @test C7
    test('C7', [ 'dir', 'subdir2' ], function copyDirectoryTestC7() {

      /** @type {string} */
      var dest;
      /** @type {string} */
      var src;

      src = resolveDummyPath();
      dest = resolveDummyPath('subdir2');
      dest = trimBackslash(dest);

      throws(function() {
        vitals.copy.directory(src, dest);
      });

    });
    /// #}}} @test C7

    /// #{{{ @test C8
    test('C8', [ 'dir', 'subdir1', 'fail' ], function copyDirectoryTestC8() {

      /** @type {string} */
      var dest;
      /** @type {string} */
      var src;

      src = resolveDummyPath();
      dest = resolveDummyPath('subdir1');

      throws.type(function() {
        vitals.copy.directory(src, dest, 'fail');
      });

    });
    /// #}}} @test C8

  });
  /// #}}} @tests C

});
/// #}}} @suite copy.directory

/// #}}} @group TESTS

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
