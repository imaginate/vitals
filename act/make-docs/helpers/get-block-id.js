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

/// #{{{ @group SPECIAL

/// #{{{ @func getBlockTest
/**
 * @private
 * @param {string} id
 * @return {!function(string): boolean}
 */
var getBlockTest = require('./get-block-test.js');
/// #}}} @func getBlockTest

/// #}}} @group SPECIAL

/// #}}} @group HELPERS

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
  getBlockTest('h'),
  getBlockTest('ul'),
  getBlockTest('ol'),
  getBlockTest('hr'),
  getBlockTest('pre'),
  getBlockTest('quote'),
  getBlockTest('p')
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

  /// #{{{ @step get-block-element-id

  testEachProperty(TESTS, function _getBlockId(elemTest) {
    if ( elemTest(line) ) {
      id = elemTest.ID;
      return true;
    }
    return false;
  });

  /// #}}} @step get-block-element-id

  /// #{{{ @step return-block-element-id

  return id;

  /// #}}} @step return-block-element-id
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
