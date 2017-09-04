/**
 * ---------------------------------------------------------------------------
 * GET-BLOCK-ELEMENT-TEST HELPER
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

/// #{{{ @const PATT
/**
 * @private
 * @const {!Object<string, !RegExp>}
 * @struct
 */
var PATT = {
  H: /^ *#{1,6} /,
  HR: /^ *---+/,
  OL: /^ *[0-9]+\) /,
  PRE: /^ *```/,
  QUOTE: /^ *>+/,
  UL: /^ *- /
};
/// #}}} @const PATT

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

/// #{{{ @func setElemIdError
/**
 * @private
 * @param {!RangeError} err
 * @param {string} param
 * @param {string} id
 * @return {!RangeError}
 */
function setElemIdError(err, param, id) {

  /// #{{{ @step declare-variables

  /** @type {string} */
  var msg;

  /// #}}} @step declare-variables

  /// #{{{ @step verify-parameters

  switch (arguments.length) {
    case 0:
      throw setNoArgError(new Error, 'err');
    case 1:
      throw setNoArgError(new Error, 'param');
    case 2:
      throw setNoArgError(new Error, 'id');
  }

  if ( !isError(err) ) {
    throw setTypeError(new TypeError, 'err', '!RangeError');
  }
  if ( !isString(param) ) {
    throw setTypeError(new TypeError, 'param', 'string');
  }
  if ( !isString(id) ) {
    throw setTypeError(new TypeError, 'id', 'string');
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step make-error-message

  msg = 'invalid `Block` element id used for `' + param + '` parameter\n'
    + '    invalid-id: `"' + id + '"`\n'
    + '    valid-ids:\n'
    + '        `"' + getKeys(ELEMENTS).join('"`\n        `"') + '"`';

  /// #}}} @step make-error-message

  /// #{{{ @step set-error-name-property

  if (err.name !== 'RangeError') {
    err.name = 'RangeError';
  }

  /// #}}} @step set-error-name-property

  /// #{{{ @step return-error

  return setError(err, msg);

  /// #}}} @step return-error
}
/// #}}} @func setElemIdError

/// #{{{ @func setEmptyError
/**
 * @private
 * @param {!Error} err
 * @param {string} param
 * @return {!Error}
 */
var setEmptyError = setError.empty;
/// #}}} @func setEmptyError

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

/// #{{{ @group HAS

/// #{{{ @func hasOwnEnumProperty
/**
 * @private
 * @param {(!Object|!Function)} src
 * @param {(string|number)} key
 * @return {boolean}
 */
var hasOwnEnumProperty = loadTaskHelper('has-own-enum-property');
/// #}}} @func hasOwnEnumProperty

/// #}}} @group HAS

/// #{{{ @group IS

/// #{{{ @func isError
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isError = IS.error;
/// #}}} @func isError

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

/// #{{{ @func getKeys
/**
 * @private
 * @param {(!Object|!Function)} src
 * @return {!Array<string>}
 */
var getKeys = loadTaskHelper('get-keys');
/// #}}} @func getKeys

/// #}}} @group OBJECT

/// #}}} @group HELPERS

/// #{{{ @group TESTS
//////////////////////////////////////////////////////////////////////////////
// TESTS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func testHBlock
/**
 * @private
 * @param {string} line
 * @return {boolean}
 */
function testHBlock(line) {

  /// #{{{ @step verify-parameters

  if (!arguments.length) {
    throw setNoArgError(new Error, 'line');
  }
  if ( !isString(line) ) {
    throw setTypeError(new TypeError, 'line', 'string');
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step return-result

  return PATT.H.test(line);

  /// #}}} @step return-result
}
testHBlock.ID = 'h';
/// #}}} @func testHBlock

/// #{{{ @func testHrBlock
/**
 * @private
 * @param {string} line
 * @return {boolean}
 */
function testHrBlock(line) {

  /// #{{{ @step verify-parameters

  if (!arguments.length) {
    throw setNoArgError(new Error, 'line');
  }
  if ( !isString(line) ) {
    throw setTypeError(new TypeError, 'line', 'string');
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step return-result

  return PATT.HR.test(line);

  /// #}}} @step return-result
}
testHrBlock.ID = 'hr';
/// #}}} @func testHrBlock

/// #{{{ @func testOlBlock
/**
 * @private
 * @param {string} line
 * @return {boolean}
 */
function testOlBlock(line) {

  /// #{{{ @step verify-parameters

  if (!arguments.length) {
    throw setNoArgError(new Error, 'line');
  }
  if ( !isString(line) ) {
    throw setTypeError(new TypeError, 'line', 'string');
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step return-result

  return PATT.OL.test(line);

  /// #}}} @step return-result
}
testOlBlock.ID = 'ol';
/// #}}} @func testOlBlock

/// #{{{ @func testPBlock
/**
 * @private
 * @param {string} line
 * @return {boolean}
 */
function testPBlock(line) {

  /// #{{{ @step verify-parameters

  if (!arguments.length) {
    throw setNoArgError(new Error, 'line');
  }
  if ( !isString(line) ) {
    throw setTypeError(new TypeError, 'line', 'string');
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step return-result

  return true;

  /// #}}} @step return-result
}
testPBlock.ID = 'p';
/// #}}} @func testPBlock

/// #{{{ @func testPreBlock
/**
 * @private
 * @param {string} line
 * @return {boolean}
 */
function testPreBlock(line) {

  /// #{{{ @step verify-parameters

  if (!arguments.length) {
    throw setNoArgError(new Error, 'line');
  }
  if ( !isString(line) ) {
    throw setTypeError(new TypeError, 'line', 'string');
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step return-result

  return PATT.PRE.test(line);

  /// #}}} @step return-result
}
testPreBlock.ID = 'pre';
/// #}}} @func testPreBlock

/// #{{{ @func testQuoteBlock
/**
 * @private
 * @param {string} line
 * @return {boolean}
 */
function testQuoteBlock(line) {

  /// #{{{ @step verify-parameters

  if (!arguments.length) {
    throw setNoArgError(new Error, 'line');
  }
  if ( !isString(line) ) {
    throw setTypeError(new TypeError, 'line', 'string');
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step return-result

  return PATT.QUOTE.test(line);

  /// #}}} @step return-result
}
testQuoteBlock.ID = 'quote';
/// #}}} @func testQuoteBlock

/// #{{{ @func testUlBlock
/**
 * @private
 * @param {string} line
 * @return {boolean}
 */
function testUlBlock(line) {

  /// #{{{ @step verify-parameters

  if (!arguments.length) {
    throw setNoArgError(new Error, 'line');
  }
  if ( !isString(line) ) {
    throw setTypeError(new TypeError, 'line', 'string');
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step return-result

  return PATT.UL.test(line);

  /// #}}} @step return-result
}
testUlBlock.ID = 'ul';
/// #}}} @func testUlBlock

/// #}}} @group TESTS

/// #{{{ @group ELEMENTS
//////////////////////////////////////////////////////////////////////////////
// ELEMENTS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @const ELEMENTS
/**
 * @private
 * @const {!Object<string, !Function>}
 * @dict
 */
var ELEMENTS = freezeObject({
  'h': testHBlock,
  'hr': testHrBlock,
  'ol': testOlBlock,
  'p': testPBlock,
  'pre': testPreBlock,
  'quote': testQuoteBlock,
  'ul': testUlBlock
}, true);
/// #}}} @const ELEMENTS

/// #}}} @group ELEMENTS

/// #{{{ @group METHODS
//////////////////////////////////////////////////////////////////////////////
// METHODS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func getBlockElementTest
/**
 * @public
 * @param {string} id
 * @return {!function(string): boolean}
 */
function getBlockElementTest(id) {

  /// #{{{ @step verify-parameters

  if (!arguments.length) {
    throw setNoArgError(new Error, 'id');
  }
  if ( !isString(id) ) {
    throw setTypeError(new TypeError, 'id', 'string');
  }
  if (!id) {
    throw setEmptyError(new Error, 'id');
  }
  if ( !hasOwnEnumProperty(ELEMENTS, id) ) {
    throw setElemIdError(new RangeError, 'id', id);
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step return-element-test

  return ELEMENTS[id];

  /// #}}} @step return-element-test
}
/// #}}} @func getBlockElementTest

/// #}}} @group METHODS

/// #{{{ @group EXPORTS
//////////////////////////////////////////////////////////////////////////////
// EXPORTS
//////////////////////////////////////////////////////////////////////////////

module.exports = getBlockElementTest;

/// #}}} @group EXPORTS

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
