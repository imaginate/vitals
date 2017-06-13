/**
 * ---------------------------------------------------------------------------
 * IS HELPERS
 * ---------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2017 Adam A Smith <adam@imaginate.life> (https://imaginate.life)
 */

'use strict';

/// #{{{ @group TYPEDEFS
//////////////////////////////////////////////////////////////////////////////
// TYPEDEFS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @typedef StatsDummy
/**
 * @typedef {{
 *   isDirectory: function():boolean,
 *   isFile:      function():boolean
 * }} StatsDummy
 */
/// #}}} @typedef StatsDummy

/// #}}} @group TYPEDEFS

/// #{{{ @group CONSTANTS
//////////////////////////////////////////////////////////////////////////////
// CONSTANTS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @const FS
/**
 * @private
 * @const {!Object<string, function>}
 */
var FS = require('fs');
/// #}}} @const FS

/// #{{{ @const STAT_DUMMY
/**
 * @private
 * @const {!StatsDummy}
 */
var STAT_DUMMY = {
  isDirectory: function() { return false; },
  isFile: function() { return false; }
};
/// #}}} @const STAT_DUMMY

/// #}}} @group CONSTANTS

/// #{{{ @group HELPERS
//////////////////////////////////////////////////////////////////////////////
// HELPERS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func _getFileStats
/**
 * @private
 * @param {string} filepath
 * @return {!Stats}
 */
var _getFileStats = FS.statSync;
/// #}}} @func _getFileStats

/// #{{{ @func _hasOwnProperty
/**
 * @private
 * @param {string} prop
 * @return {boolean}
 */
var _hasOwnProperty = Object.prototype.hasOwnProperty;
/// #}}} @func _hasOwnProperty

/// #{{{ @func _isBuffer
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var _isBuffer = Buffer.isBuffer;
/// #}}} @func _isBuffer

/// #{{{ @func _objectToString
/**
 * @private
 * @return {string}
 */
var _objectToString = Object.prototype.toString;
/// #}}} @func _objectToString

/// #{{{ @func getFileStats
/**
 * @private
 * @param {string} filepath
 * @return {(!Stats|StatsDummy)}
 */
function getFileStats(filepath) {
  try {
    return _getFileStats(filepath);
  }
  catch (e) {
    return STAT_DUMMY;
  }
}
/// #}}} @func getFileStats

/// #{{{ @func hasOwnProperty
/**
 * @private
 * @param {!Object} obj
 * @param {string} prop
 * @return {boolean}
 */
function hasOwnProperty(obj, prop) {
  return _hasOwnProperty.call(obj, prop);
}
/// #}}} @func hasOwnProperty

/// #{{{ @func objectToString
/** 
 * @private
 * @param {!Object} obj
 * @return {string}
 */
function objectToString(obj) {
  return _objectToString.call(obj);
}
/// #}}} @func objectToString

/// #}}} @group HELPERS

/// #{{{ @group PRIMITIVE-METHODS
//////////////////////////////////////////////////////////////////////////////
// PRIMITIVE-METHODS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func isNull
/**
 * @public
 * @param {*} val
 * @return {boolean}
 */
function isNull(val) {
  return val === null;
}
/// #}}} @func isNull

/// #{{{ @func isUndefined
/**
 * @public
 * @param {*} val
 * @return {boolean}
 */
function isUndefined(val) {
  return val === undefined;
}
/// #}}} @func isUndefined

/// #{{{ @func isBoolean
/**
 * @public
 * @param {*} val
 * @return {boolean}
 */
function isBoolean(val) {
  return typeof val === 'boolean';
}
/// #}}} @func isBoolean

/// #{{{ @func isString
/**
 * @public
 * @param {*} val
 * @return {boolean}
 */
function isString(val) {
  return typeof val === 'string';
}
/// #}}} @func isString

/// #{{{ @func isNumber
/**
 * @public
 * @param {*} val
 * @return {boolean}
 */
function isNumber(val) {
  return typeof val === 'number' && val === val && isFinite(val);
}
/// #}}} @func isNumber

/// #{{{ @func isNan
/**
 * @public
 * @param {*} val
 * @return {boolean}
 */
function isNan(val) {
  return val !== val;
}
/// #}}} @func isNan

/// #}}} @group PRIMITIVE-METHODS

/// #{{{ @group JS-OBJECT-METHODS
//////////////////////////////////////////////////////////////////////////////
// JS-OBJECT-METHODS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func isObject
/**
 * @public
 * @param {*} val
 * @return {boolean}
 */
function isObject(val) {
  return !!val && typeof val === 'object';
}
/// #}}} @func isObject

/// #{{{ @func isFunction
/**
 * @public
 * @param {*} val
 * @return {boolean}
 */
function isFunction(val) {
  return !!val && typeof val === 'function';
}
/// #}}} @func isFunction

/// #{{{ @func isArray
/**
 * @public
 * @param {*} val
 * @return {boolean}
 */
function isArray(val) {
  return isObject(val) && objectToString(val) === '[object Array]';
}
/// #}}} @func isArray

/// #{{{ @func isArrayLike
/**
 * @public
 * @param {*} val
 * @return {boolean}
 */
function isArrayLike(val) {

  /** @type {*} */
  var len;

  if ( !isObject(val) )
    return false;

  len = val.length;
  return isNumber(len) && isWholeNumber(len) && len >= 0;
}
/// #}}} @func isArrayLike

/// #{{{ @func isArguments
/**
 * @public
 * @param {*} val
 * @return {boolean}
 */
function isArguments(val) {
  return isObject(val) && objectToString(val) === '[object Arguments]';
}
/// #}}} @func isArguments

/// #{{{ @func isRegExp
/**
 * @public
 * @param {*} val
 * @return {boolean}
 */
function isRegExp(val) {
  return isObject(val) && objectToString(val) === '[object RegExp]';
}
/// #}}} @func isRegExp

/// #{{{ @func isDate
/**
 * @public
 * @param {*} val
 * @return {boolean}
 */
function isDate(val) {
  return isObject(val) && objectToString(val) === '[object Date]';
}
/// #}}} @func isDate

/// #{{{ @func isError
/**
 * @public
 * @param {*} val
 * @return {boolean}
 */
function isError(val) {
  return isObject(val) && objectToString(val) === '[object Error]';
}
/// #}}} @func isError

/// #{{{ @group ENV-ARGUMENTS-TEST
(function isArgumentsTest() {

  if ( !isArguments(arguments) )
    throw new Error('incompatible platform (must support ' +
      '`Object.prototype.toString.call(arguments) === "[object Arguments]"`)');

})();
/// #}}} @group ENV-ARGUMENTS-TEST

/// #}}} @group JS-OBJECT-METHODS

/// #{{{ @group JS-ARRAY-METHODS
//////////////////////////////////////////////////////////////////////////////
// JS-ARRAY-METHODS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func isStrings
/**
 * @public
 * @param {*} val
 * @return {boolean}
 */
function isStrings(val) {

  /** @type {number} */
  var len;
  /** @type {number} */
  var i;

  if ( !isArrayLike(val) )
    return false;

  len = val.length;
  i = -1;
  while (++i < len) {
    if ( !isString(val[i]) )
      return false;
  }
  return true;
}
/// #}}} @func isStrings

/// #}}} @group JS-ARRAY-METHODS

/// #{{{ @group SPECIAL-METHODS
//////////////////////////////////////////////////////////////////////////////
// SPECIAL-METHODS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func isEmpty
/**
 * @description
 *   Checks if a value is considered empty. The definition of empty is
 *   defined as follows in order of priority (per the #val data type):
 *   - *`null`*!$
 *     `null` is considered empty.
 *   - *`undefined`*!$
 *     `undefined` is considered empty.
 *   - *`number`*!$
 *     Only `0` and `NaN` are considered empty.
 *   - *`string`*!$
 *     Only `""` is considered empty.
 *   - *`boolean`*!$
 *     Only `false` is considered empty.
 *   - *`function`*!$
 *     The length property must be `0` to be considered empty.
 *   - *`!Array`*!$
 *     The length property must be `0` to be considered empty.
 *   - *`!Object`*!$
 *     The `object` must **not** own any properties to be considered empty.
 *   - *`*`*!$
 *     All other data types are **not** considered empty.
 * @param {*} val
 * @return {boolean}
 */
function isEmpty(val) {

  /** @type {string} */
  var key;

  // empty primitives: `0`, `""`, `null`, `undefined`, `false`, `NaN`
  if (!val)
    return true;

  if ( isFunction(val) )
    return val.length === 0;

  // remaining primitives
  if ( !isObject(val) )
    return false;

  if ( isArray(val) || isArguments(val) )
    return val.length === 0;

  // remaining objects
  for (key in val) {
    if ( hasOwnProperty(val, key) )
      return false;
  }
  return true;
}
/// #}}} @func isEmpty

/// #}}} @group SPECIAL-METHODS

/// #{{{ @group OBJECT-STATE-METHODS
//////////////////////////////////////////////////////////////////////////////
// OBJECT-STATE-METHODS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func isFrozen
/**
 * @public
 * @param {(!Object|!Function)} src
 * @return {boolean}
 */
function isFrozen(src) {

  if ( !isObject(src) && !isFunction(src) )
    throw new TypeError('invalid `src` type (valid types: `!Object|!Function`)');

  return Object.isFrozen(src);
}
/// #}}} @func isFrozen

/// #}}} @group OBJECT-STATE-METHODS

/// #{{{ @group NUMBER-STATE-METHODS
//////////////////////////////////////////////////////////////////////////////
// NUMBER-STATE-METHODS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func isWholeNumber
/**
 * @public
 * @param {number} val
 * @return {boolean}
 */
function isWholeNumber(val) {

  if ( !isNumber(val) ) 
    throw new TypeError('invalid `val` type (must be a number)');

  return !(val % 1);
}
/// #}}} @func isWholeNumber

/// #{{{ @func isOddNumber
/**
 * @public
 * @param {number} val
 * @return {boolean}
 */
function isOddNumber(val) {

  if ( !isNumber(val) ) 
    throw new TypeError('invalid `val` type (must be a number)');
  if ( !isWholeNumber(val) ) 
    throw new RangeError('invalid `val` number (must be a whole number)');

  return !!(val % 2);
}
/// #}}} @func isOddNumber

/// #{{{ @func isEvenNumber
/**
 * @public
 * @param {number} val
 * @return {boolean}
 */
function isEvenNumber(val) {

  if ( !isNumber(val) )
    throw new TypeError('invalid `val` type (must be a number)');
  if ( !isWholeNumber(val) )
    throw new RangeError('invalid `val` number (must be a whole number)');

  return !(val % 2);
}
/// #}}} @func isEvenNumber

/// #{{{ @func isEqualTo
/**
 * @public
 * @param {number} val1
 * @param {number} val2
 * @return {boolean}
 */
function isEqualTo(val1, val2) {

  if ( !isNumber(val1) )
    throw new TypeError('invalid `val1` type (must be a number)');
  if ( !isNumber(val2) )
    throw new TypeError('invalid `val2` type (must be a number)');
  if ( arguments.length > 2 )
    throw new Error('invalid param count (only 2 params allowed)');

  return val1 === val2;
}
/// #}}} @func isEqualTo

/// #{{{ @func isGreaterThan
/**
 * @public
 * @param {number} val1
 * @param {number} val2
 * @return {boolean}
 */
function isGreaterThan(val1, val2) {

  if ( !isNumber(val1) )
    throw new TypeError('invalid `val1` type (must be a number)');
  if ( !isNumber(val2) )
    throw new TypeError('invalid `val2` type (must be a number)');
  if ( arguments.length > 2 )
    throw new Error('invalid param count (only 2 params allowed)');

  return val1 > val2;
}
/// #}}} @func isGreaterThan

/// #{{{ @func isGreaterOrEqual
/**
 * @public
 * @param {number} val1
 * @param {number} val2
 * @return {boolean}
 */
function isGreaterOrEqual(val1, val2) {

  if ( !isNumber(val1) )
    throw new TypeError('invalid `val1` type (must be a number)');
  if ( !isNumber(val2) )
    throw new TypeError('invalid `val2` type (must be a number)');
  if ( arguments.length > 2 )
    throw new Error('invalid param count (only 2 params allowed)');

  return val1 >= val2;
}
/// #}}} @func isGreaterOrEqual

/// #{{{ @func isLessThan
/**
 * @public
 * @param {number} val1
 * @param {number} val2
 * @return {boolean}
 */
function isLessThan(val1, val2) {

  if ( !isNumber(val1) )
    throw new TypeError('invalid `val1` type (must be a number)');
  if ( !isNumber(val2) )
    throw new TypeError('invalid `val2` type (must be a number)');
  if ( arguments.length > 2 )
    throw new Error('invalid param count (only 2 params allowed)');

  return val1 < val2;
}
/// #}}} @func isLessThan

/// #{{{ @func isLessOrEqual
/**
 * @public
 * @param {number} val1
 * @param {number} val2
 * @return {boolean}
 */
function isLessOrEqual(val1, val2) {

  if ( !isNumber(val1) )
    throw new TypeError('invalid `val1` type (must be a number)');
  if ( !isNumber(val2) )
    throw new TypeError('invalid `val2` type (must be a number)');
  if ( arguments.length > 2 )
    throw new Error('invalid param count (only 2 params allowed)');

  return val1 <= val2;
}
/// #}}} @func isLessOrEqual

/// #{{{ @func isNotEqualTo
/**
 * @public
 * @param {number} val1
 * @param {number} val2
 * @return {boolean}
 */
function isNotEqualTo(val1, val2) {

  if ( !isNumber(val1) )
    throw new TypeError('invalid `val1` type (must be a number)');
  if ( !isNumber(val2) )
    throw new TypeError('invalid `val2` type (must be a number)');
  if ( arguments.length > 2 )
    throw new Error('invalid param count (only 2 params allowed)');

  return val1 !== val2;
}
/// #}}} @func isNotEqualTo

/// #}}} @group NUMBER-STATE-METHODS

/// #{{{ @group FILE-SYSTEM-METHODS
//////////////////////////////////////////////////////////////////////////////
// FILE-SYSTEM-METHODS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func isBuffer
/**
 * @public
 * @param {*} val
 * @return {boolean}
 */
function isBuffer(val) {
  return isObject(val) && _isBuffer(val);
}
/// #}}} @func isBuffer

/// #{{{ @func isDirectory
/**
 * @public
 * @param {string} path
 * @return {boolean}
 */
function isDirectory(path) {

  if ( !isString(path) )
    throw new TypeError('invalid `path` type (must be a string)');

  return !!path && getFileStats(path).isDirectory();
}
/// #}}} @func isDirectory

/// #{{{ @func isFile
/**
 * @public
 * @param {string} path
 * @return {boolean}
 */
function isFile(path) {

  if ( !isString(path) )
    throw new TypeError('invalid `path` type (must be a string)');

  return !!path && getFileStats(path).isFile();
}
/// #}}} @func isFile

/// #}}} @group FILE-SYSTEM-METHODS

/// #{{{ @group EXPORTS
//////////////////////////////////////////////////////////////////////////////
// EXPORTS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @const IS
/**
 * @public
 * @const {!Object<string, !function(*): boolean>}
 */
var IS = {

  'null':           isNull,
  'nil':            isNull,

  'undefined':      isUndefined,
  'void':           isUndefined,

  'boolean':        isBoolean,
  'bool':           isBoolean,

  'string':         isString,
  'str':            isString,

  'number':         isNumber,
  'num':            isNumber,

  'nan':            isNan,

  'object':         isObject,
  'obj':            isObject,

  'func':           isFunction,
  'fun':            isFunction,
  'fn':             isFunction,

  'array':          isArray,
  'arr':            isArray,

  'arrayLike':      isArrayLike,
  'arrLike':        isArrayLike,

  'args':           isArguments,

  'regexp':         isRegExp,
  'regex':          isRegExp,
  'regx':           isRegExp,
  're':             isRegExp,

  'date':           isDate,

  'error':          isError,
  'err':            isError,

  'strings':        isStrings,
  'strs':           isStrings,

  'empty':          isEmpty,

  'frozen':         isFrozen,

  'wholeNumber':    isWholeNumber,
  'whole':          isWholeNumber,

  'oddNumber':      isOddNumber,
  'odd':            isOddNumber,

  'evenNumber':     isEvenNumber,
  'even':           isEvenNumber,

  'equalTo':        isEqualTo,
  'equal':          isEqualTo,
  'eq':             isEqualTo,

  'greaterThan':    isGreaterThan,
  'greater':        isGreaterThan,
  'gt':             isGreaterThan,

  'greaterOrEqual': isGreaterOrEqual,
  'greaterEqual':   isGreaterOrEqual,
  'ge':             isGreaterOrEqual,

  'lessThan':       isLessThan,
  'less':           isLessThan,
  'lt':             isLessThan,

  'lessOrEqual':    isLessOrEqual,
  'lessEqual':      isLessOrEqual,
  'le':             isLessOrEqual,

  'notEqualTo':     isNotEqualTo,
  'notEqual':       isNotEqualTo,
  'ne':             isNotEqualTo,

  'buffer':         isBuffer,
  'buff':           isBuffer,
  'buf':            isBuffer,

  'directoryPath':  isDirectory,
  'directorypath':  isDirectory,
  'directory':      isDirectory,
  'dirPath':        isDirectory,
  'dirpath':        isDirectory,
  'dir':            isDirectory,

  'filePath':       isFile,
  'filepath':       isFile,
  'file':           isFile
};
/// #}}} @const IS

module.exports = IS;

/// #}}} @group EXPORTS

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
