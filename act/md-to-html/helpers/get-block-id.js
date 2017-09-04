/**
 * ---------------------------------------------------------------------------
 * GET-BLOCK-ID HELPER
 * ---------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life>
 */

'use strict';

/// #{{{ @group LOADERS
//////////////////////////////////////////////////////////////////////////////
// LOADERS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func loadTaskHelper
/**
 * @private
 * @param {string} name
 * @return {(!Object|!Function)}
 */
var loadTaskHelper = require('./load-task-helper.js');
/// #}}} @func loadTaskHelper

/// #}}} @group LOADERS

/// #{{{ @group CONSTANTS
//////////////////////////////////////////////////////////////////////////////
// CONSTANTS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @const IS
/**
 * @private
 * @const {!Object<string, !function>}
 * @struct
 */
var IS = loadTaskHelper('is');
/// #}}} @const IS

/// #}}} @group CONSTANTS

/// #{{{ @group HELPERS
//////////////////////////////////////////////////////////////////////////////
// HELPERS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @group ERROR

/// #{{{ @func setError
/**
 * @private
 * @param {(!Error|!RangeError|!ReferenceError|!SyntaxError|!TypeError)} err
 * @param {string} msg
 * @return {(!Error|!RangeError|!ReferenceError|!SyntaxError|!TypeError)}
 */
var setError = loadTaskHelper('set-error');
/// #}}} @func setError

/// #{{{ @func setNoArgError
/**
 * @private
 * @param {!Error} err
 * @param {string} param
 * @return {!Error}
 */
var setNoArgError = setError.noArg;
/// #}}} @func setNoArgError

/// #{{{ @func setTypeError
/**
 * @private
 * @param {!TypeError} err
 * @param {string} param
 * @param {string} types
 * @return {!TypeError}
 */
var setTypeError = setError.type;
/// #}}} @func setTypeError

/// #}}} @group ERROR

/// #{{{ @group IS

/// #{{{ @func isFile
/**
 * @private
 * @param {string} path
 * @return {boolean}
 */
var isFile = IS.file;
/// #}}} @func isFile

/// #{{{ @func isString
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isString = IS.string;
/// #}}} @func isString

/// #}}} @group IS

/// #{{{ @group OBJECT

/// #{{{ @func freezeObject
/**
 * @private
 * @param {(?Object|?Function)} src
 * @param {boolean=} deep = `false`
 * @return {(?Object|?Function)}
 */
var freezeObject = loadTaskHelper('freeze-object');
/// #}}} @func freezeObject

/// #{{{ @func testEachProperty
/**
 * @private
 * @param {(!Array|!Arguments|!Object|!Function)} src
 * @param {!function(*, (number|string)): *} func
 * @return {boolean}
 */
var testEachProperty = loadTaskHelper('test-each-property');
/// #}}} @func testEachProperty

/// #}}} @group OBJECT

/// #{{{ @group PATH

/// #{{{ @func resolvePath
/**
 * @private
 * @param {(!Array<string>|!Arguments<string>|...string)=} path
 * @return {string}
 */
var resolvePath = loadTaskHelper('resolve-path');
/// #}}} @func resolvePath

/// #}}} @group PATH

/// #}}} @group HELPERS

/// #{{{ @group PATHS
//////////////////////////////////////////////////////////////////////////////
// PATHS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @const DIR
/**
 * @private
 * @const {!Object<string, string>}
 * @struct
 */
var DIR = freezeObject({
  CLASSES: resolvePath(__dirname, '../classes')
});
/// #}}} @const DIR

/// #{{{ @const FILE
/**
 * @private
 * @const {!Object<string, string>}
 * @struct
 */
var FILE = freezeObject({
  H: resolvePath(DIR.CLASSES, 'heading/test.js'),
  HR: resolvePath(DIR.CLASSES, 'horizontal/test.js'),
  OL: resolvePath(DIR.CLASSES, 'ordered-list/test.js'),
  P: resolvePath(DIR.CLASSES, 'paragraph/test.js'),
  PRE: resolvePath(DIR.CLASSES, 'code-block/test.js'),
  QUOTE: resolvePath(DIR.CLASSES, 'quote-block/test.js'),
  UL: resolvePath(DIR.CLASSES, 'unordered-list/test.js')
});
/// #}}} @const FILE

/// #}}} @group PATHS

/// #{{{ @group TESTS
//////////////////////////////////////////////////////////////////////////////
// TESTS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @const TESTS
/**
 * @private
 * @const {!Array<!function(string): boolean>}
 */
var TESTS = freezeObject([
  require(FILE.H),
  require(FILE.UL),
  require(FILE.OL),
  require(FILE.HR),
  require(FILE.PRE),
  require(FILE.QUOTE),
  require(FILE.P)
]);
/// #}}} @const TESTS

/// #}}} @group TESTS

/// #{{{ @group METHODS
//////////////////////////////////////////////////////////////////////////////
// METHODS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func getBlockId
/**
 * @public
 * @param {string} line
 * @return {string}
 */
function getBlockId(line) {

  /// #{{{ @step declare-variables

  /** @type {string} */
  var id;

  /// #}}} @step declare-variables

  /// #{{{ @step verify-parameters

  if (!arguments.length) {
    throw setNoArgError(new Error, 'line');
  }
  if ( !isString(line) ) {
    throw setTypeError(new TypeError, 'line', 'string');
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step get-block-id

  testEachProperty(TESTS, function _getBlockId(elemTest) {
    if ( elemTest(line) ) {
      id = elemTest.ID;
      return true;
    }
    return false;
  });

  /// #}}} @step get-block-id

  /// #{{{ @step return-block-id

  return id;

  /// #}}} @step return-block-id
}
/// #}}} @func getBlockId

/// #}}} @group METHODS

/// #{{{ @group EXPORTS
//////////////////////////////////////////////////////////////////////////////
// EXPORTS
//////////////////////////////////////////////////////////////////////////////

module.exports = getBlockId;

/// #}}} @group EXPORTS

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
