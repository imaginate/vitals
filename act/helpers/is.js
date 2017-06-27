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

/// #{{{ @const MODE
/**
 * @private
 * @const {!RegExp}
 */
var MODE = /^0?[0-7]{1,3}$/;
/// #}}} @const MODE

/// #{{{ @const SEMANTIC
/**
 * @private
 * @const {!RegExp}
 */
var SEMANTIC = /^[0-9]+\.[0-9]+\.[0-9]+(?:-[a-z]+(?:\.[0-9]+)?)?$/;
/// #}}} @const SEMANTIC

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

/// #{{{ @const YEAR
/**
 * @private
 * @const {!RegExp}
 */
var YEAR = /^2[0-9]{3}$/;
/// #}}} @const YEAR

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

/// #{{{ @func _getFullYear
/**
 * @private
 * @return {number}
 */
var _getFullYear = Date.prototype.getUTCFullYear;
/// #}}} @func _getFullYear

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

/// #{{{ @func getFullYear
/**
 * @private
 * @param {!Date} date
 * @return {number}
 */
function getFullYear(date) {
  return _getFullYear.call(date);
}
/// #}}} @func getFullYear

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

/// #{{{ @func isHashMapOf
/**
 * @private
 * @param {(!Object|!Function)} map
 * @param {!function(*): boolean} isType
 * @return {boolean}
 */
function isHashMapOf(map, isType) {

  /** @type {string} */
  var key;

  for (key in map) {
    if ( hasOwnProperty(map, key) && !isType(map[key]) )
      return false;
  }
  return true;
}
/// #}}} @func isHashMapOf

/// #{{{ @func isListOf
/**
 * @private
 * @param {(!Array|!Arguments|!Object)} list
 * @param {!function(*): boolean} isType
 * @return {boolean}
 */
function isListOf(list, isType) {

  /** @type {number} */
  var len;
  /** @type {number} */
  var i;

  len = list.length;
  i = -1;
  while (++i < len) {
    if ( !isType(list[i]) )
      return false;
  }
  return true;
}
/// #}}} @func isListOf

/// #{{{ @func objectIsExtensible
/**
 * @private
 * @param {(!Object|!Function)} src
 * @return {boolean}
 */
var objectIsExtensible = Object.isExtensible;
/// #}}} @func objectIsExtensible

/// #{{{ @func objectIsFrozen
/**
 * @private
 * @param {(!Object|!Function)} src
 * @return {boolean}
 */
var objectIsFrozen = Object.isFrozen;
/// #}}} @func objectIsFrozen

/// #{{{ @func objectIsSealed
/**
 * @private
 * @param {(!Object|!Function)} src
 * @return {boolean}
 */
var objectIsSealed = Object.isSealed;
/// #}}} @func objectIsSealed

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

/// #{{{ @func setError
/**
 * @private
 * @param {(!Error|!RangeError|!ReferenceError|!SyntaxError|!TypeError)} err
 * @param {string} msg
 * @return {(!Error|!RangeError|!ReferenceError|!SyntaxError|!TypeError)}
 */
function setError(err, msg) {

  if ( !isError(err) )
    throw setTypeError(new TypeError, 'err',
      '(!Error|!RangeError|!ReferenceError|!SyntaxError|!TypeError)');
  if ( !isString(msg) )
    throw setTypeError(new TypeError, 'msg', 'string');

  switch (err.name) {

    case 'RangeError':
      err.range = true;
      break;

    case 'ReferenceError':
      err.reference = true;
      break;

    case 'SyntaxError':
      err.syntax = true;
      break;

    case 'TypeError':
      err.type = true;
      break;
  }

  err.message = msg;
  err.msg = msg;

  return err;
}
/// #}}} @func setError

/// #{{{ @func setArgsError
/**
 * @private
 * @param {!Error} err
 * @param {number} len
 * @return {!Error}
 */
function setArgsError(err, len) {

  /** @type {string} */
  var msg;

  if ( !isError(err) )
    throw setTypeError(new TypeError, 'err', '!Error');
  if ( !isNumber(len) )
    throw setTypeError(new TypeError, 'len', 'number');

  msg = 'over limit of `2` parameters defined\n' +
    '    arguments.length: `' + len + '`';

  return setError(err, msg);
}
/// #}}} @func setArgsError

/// #{{{ @func setCompareError
/**
 * @private
 * @param {!RangeError} err
 * @param {string} param1
 * @param {string} shouldBe
 * @param {string} param2
 * @param {number} value1
 * @param {number} value2
 * @return {!RangeError}
 */
function setCompareError(err, param1, shouldBe, param2, value1, value2) {

  /** @type {string} */
  var msg;

  if ( !isError(err) )
    throw setTypeError(new TypeError, 'err', '!RangeError');
  if ( !isString(param1) )
    throw setTypeError(new TypeError, 'param1', 'string');
  if ( !isString(shouldBe) )
    throw setTypeError(new TypeError, 'shouldBe', 'string');
  if ( !isString(param2) )
    throw setTypeError(new TypeError, 'param2', 'string');
  if ( !isNumber(value1) )
    throw setTypeError(new TypeError, 'value1', 'number');
  if ( !isNumber(value2) )
    throw setTypeError(new TypeError, 'value2', 'number');

  switch (shouldBe) {
    case '===':
    case '==':
    case '=':
      shouldBe = 'equal to';
      break;

    case '<':
      shouldBe = 'less than';
      break;

    case '>':
      shouldBe = 'greater than';
      break;

    case '<=':
      shouldBe = 'less than or equal to';
      break;

    case '>=':
      shouldBe = 'greater than or equal to';
      break;
  }

  msg = '`' + param1 + '` must be ' + shouldBe + ' `' + param2 + '`\n' +
    '    ' + param1 + '-value: `' + value1 + '`\n' +
    '    ' + param2 + '-value: `' + value2 + '`';

  return setError(err, msg);
}
/// #}}} @func setCompareError

/// #{{{ @func setNoArgError
/**
 * @private
 * @param {!Error} err
 * @param {string} param
 * @return {!Error}
 */
function setNoArgError(err, param) {

  /** @type {string} */
  var msg;

  if ( !isError(err) )
    throw setTypeError(new TypeError, 'err', '!Error');
  if ( !isString(param) )
    throw setTypeError(new TypeError, 'param', 'string');

  msg = 'no `' + param + '` parameter passed on `function` call';

  return setError(err, msg);
}
/// #}}} @func setNoArgError

/// #{{{ @func setRangeError
/**
 * @private
 * @param {!RangeError} err
 * @param {string} param
 * @param {number} value
 * @param {number} min
 * @param {number} max
 * @return {!RangeError}
 */
function setRangeError(err, param, value, min, max) {

  /** @type {string} */
  var msg;

  if ( !isError(err) )
    throw setTypeError(new TypeError, 'err', '!RangeError');
  if ( !isString(param) )
    throw setTypeError(new TypeError, 'param', 'string');
  if ( !isNumber(value) )
    throw setTypeError(new TypeError, 'value', 'number');
  if ( !isNumber(min) )
    throw setTypeError(new TypeError, 'min', 'number');
  if ( !isNumber(max) )
    throw setTypeError(new TypeError, 'max', 'number');

  msg = 'invalid `number` for `' + param + '`\n' +
    '    valid-range-test: `' + min + ' <= ' + param + ' <= ' + max + '`\n' +
    '    value-received: `' + value + '`';

  return setError(err, msg);
}
/// #}}} @func setRangeError

/// #{{{ @func setTypeError
/**
 * @private
 * @param {!TypeError} err
 * @param {string} param
 * @param {string} types
 * @return {!TypeError}
 */
function setTypeError(err, param, types) {

  /** @type {string} */
  var msg;

  if ( !isError(err) )
    throw setTypeError(new TypeError, 'err', '!TypeError');
  if ( !isString(param) )
    throw setTypeError(new TypeError, 'param', 'string');
  if ( !isString(types) )
    throw setTypeError(new TypeError, 'types', 'string');

  msg = 'invalid `' + param + '` data type\n' +
    '    valid-types: `' + types + '`';

  return setError(err, msg);
}
/// #}}} @func setTypeError

/// #{{{ @func setWholeError
/**
 * @private
 * @param {!RangeError} err
 * @param {string} param
 * @param {number} value
 * @return {!RangeError}
 */
function setWholeError(err, param, value) {

  /** @type {string} */
  var msg;

  if ( !isError(err) )
    throw setTypeError(new TypeError, 'err', '!RangeError');
  if ( !isString(param) )
    throw setTypeError(new TypeError, 'param', 'string');
  if ( !isNumber(value) )
    throw setTypeError(new TypeError, 'value', 'number');

  msg = 'invalid `number` for `' + param + '`\n' +
    '    valid-range-test: `isWholeNumber(' + param + ')`\n' +
    '    value-received: `' + value + '`';

  return setError(err, msg);
}
/// #}}} @func setWholeError

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

/// #{{{ @func isInteger
/**
 * @public
 * @param {*} val
 * @return {boolean}
 */
function isInteger(val) {
  return isNumber(val) && isWholeNumber(val);
}
/// #}}} @func isInteger

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

/// #{{{ @func isObjectOrFunction
/**
 * @public
 * @param {*} val
 * @return {boolean}
 */
function isObjectOrFunction(val) {

  if (!val)
    return false;

  switch (typeof val) {
    case 'object':
    case 'function':
      return true;
    default:
      return false;
  }
}
/// #}}} @func isObjectOrFunction

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
    throw setError(new Error,
      'incomplete JS engine support when testing `arguments` instances\n' +
      '    failed: `Object.prototype.toString.call(arguments)' +
      ' === "[object Arguments]"`');

})();
/// #}}} @group ENV-ARGUMENTS-TEST

/// #}}} @group JS-OBJECT-METHODS

/// #{{{ @group JS-LIST-OF-METHODS
//////////////////////////////////////////////////////////////////////////////
// JS-LIST-OF-METHODS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func isNullList
/**
 * @public
 * @param {*} val
 * @return {boolean}
 */
function isNullList(val) {
  return isArrayLike(val) && isListOf(val, isNull);
}
/// #}}} @func isNullList

/// #{{{ @func isUndefinedList
/**
 * @public
 * @param {*} val
 * @return {boolean}
 */
function isUndefinedList(val) {
  return isArrayLike(val) && isListOf(val, isUndefined);
}
/// #}}} @func isUndefinedList

/// #{{{ @func isBooleanList
/**
 * @public
 * @param {*} val
 * @return {boolean}
 */
function isBooleanList(val) {
  return isArrayLike(val) && isListOf(val, isBoolean);
}
/// #}}} @func isBooleanList

/// #{{{ @func isStringList
/**
 * @public
 * @param {*} val
 * @return {boolean}
 */
function isStringList(val) {
  return isArrayLike(val) && isListOf(val, isString);
}
/// #}}} @func isStringList

/// #{{{ @func isNumberList
/**
 * @public
 * @param {*} val
 * @return {boolean}
 */
function isNumberList(val) {
  return isArrayLike(val) && isListOf(val, isNumber);
}
/// #}}} @func isNumberList

/// #{{{ @func isNanList
/**
 * @public
 * @param {*} val
 * @return {boolean}
 */
function isNanList(val) {
  return isArrayLike(val) && isListOf(val, isNan);
}
/// #}}} @func isNanList

/// #}}} @group JS-LIST-OF-METHODS

/// #{{{ @group JS-HASH-MAP-OF-METHODS
//////////////////////////////////////////////////////////////////////////////
// JS-HASH-MAP-OF-METHODS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func isNullHashMap
/**
 * @public
 * @param {*} val
 * @return {boolean}
 */
function isNullHashMap(val) {
  return isObjectOrFunction(val) && isHashMapOf(val, isNull);
}
/// #}}} @func isNullHashMap

/// #{{{ @func isUndefinedHashMap
/**
 * @public
 * @param {*} val
 * @return {boolean}
 */
function isUndefinedHashMap(val) {
  return isObjectOrFunction(val) && isHashMapOf(val, isUndefined);
}
/// #}}} @func isUndefinedHashMap

/// #{{{ @func isBooleanHashMap
/**
 * @public
 * @param {*} val
 * @return {boolean}
 */
function isBooleanHashMap(val) {
  return isObjectOrFunction(val) && isHashMapOf(val, isBoolean);
}
/// #}}} @func isBooleanHashMap

/// #{{{ @func isStringHashMap
/**
 * @public
 * @param {*} val
 * @return {boolean}
 */
function isStringHashMap(val) {
  return isObjectOrFunction(val) && isHashMapOf(val, isString);
}
/// #}}} @func isStringHashMap

/// #{{{ @func isNumberHashMap
/**
 * @public
 * @param {*} val
 * @return {boolean}
 */
function isNumberHashMap(val) {
  return isObjectOrFunction(val) && isHashMapOf(val, isNumber);
}
/// #}}} @func isNumberHashMap

/// #{{{ @func isNanHashMap
/**
 * @public
 * @param {*} val
 * @return {boolean}
 */
function isNanHashMap(val) {
  return isObjectOrFunction(val) && isHashMapOf(val, isNan);
}
/// #}}} @func isNanHashMap

/// #}}} @group JS-HASH-MAP-OF-METHODS

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
 * @public
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

/// #{{{ @func isInstanceOf
/**
 * @public
 * @param {*} inst
 * @param {!Function} constructor
 * @return {boolean}
 */
function isInstanceOf(inst, constructor) {

  if ( !isFunction(constructor) ) 
    throw setTypeError(new TypeError, 'constructor', '!Function');

  return isObject(inst) && inst instanceof constructor;
}
/// #}}} @func isInstanceOf

/// #{{{ @func isSemanticVersion
/**
 * @public
 * @param {*} val
 * @return {boolean}
 */
function isSemanticVersion(val) {
  return !!val && isString(val) && SEMANTIC.test(val);
}
/// #}}} @func isSemanticVersion

/// #{{{ @func isYear
/**
 * @public
 * @param {*} val
 *   If the *val* is not a `number` or `string`, this method will return
 *   `false`.
 * @param {(!Date|number|string)=} min = `2000`
 *   The *min* year may NOT be less than `2000` or greater than `2999`. The
 *   *min* year must be less than or equal to the *max* year.
 * @param {(!Date|number|string)=} max = `2999`
 *   The *max* year may NOT be less than `2000` or greater than `2999`. The
 *   *max* year must be greater than or equal to the *min* year.
 * @return {boolean}
 */
function isYear(val, min, max) {

  switch (arguments.length) {
    case 0:
      throw setNoArgError(new Error, 'val');

    case 1:
      min = 2000;
      max = 2999;
      break;

    case 2:
      max = 2999;

      if ( isUndefined(min) ) {
        min = 2000;
        break;
      }

      if ( isDate(min) )
        min = getFullYear(min);
      else if ( isString(min) )
        min = Number(min);
      else if ( !isNumber(min) )
        throw setTypeError(new TypeError, 'min', '(!Date|number|string)=');

      if ( !isWholeNumber(min) )
        throw setWholeError(new RangeError, 'min', min);

      if (min < 2000 || min > 2999)
        throw setRangeError(new RangeError, 'min', min, 2000, 2999);

      break;

    default:
      if ( isUndefined(min) ) {
        min = 2000;
        if ( isUndefined(max) ) {
          max = 2999;
          break;
        }
      }
      else if ( isDate(min) )
        min = getFullYear(min);
      else if ( isString(min) )
        min = Number(min);
      else if ( !isNumber(min) )
        throw setTypeError(new TypeError, 'min', '(!Date|number|string)=');

      if ( isUndefined(max) )
        max = 2999;
      else if ( isDate(max) )
        max = getFullYear(max);
      else if ( isString(max) )
        max = Number(max);
      else if ( !isNumber(max) )
        throw setTypeError(new TypeError, 'max', '(!Date|number|string)=');

      if ( !isWholeNumber(min) )
        throw setWholeError(new RangeError, 'min', min);
      if ( !isWholeNumber(max) )
        throw setWholeError(new RangeError, 'max', max);

      if (min < 2000 || min > 2999)
        throw setRangeError(new RangeError, 'min', min, 2000, 2999);
      if (max < 2000 || max > 2999)
        throw setRangeError(new RangeError, 'max', max, 2000, 2999);

      if (min > max)
        throw setCompareError(new RangeError, 'min', '<=', 'max', min, max);
      if (max < min)
        throw setCompareError(new RangeError, 'max', '>=', 'min', max, min);
  }

  if (!val)
    return false;

  if ( isNumber(val) ) {

    if (val < min || val > max)
      return false;

    val = String(val);
    return !!val && YEAR.test(val);
  }

  if ( !isString(val) || !YEAR.test(val) )
    return false;

  val = Number(val);
  return val >= min && val <= max;
}
/// #}}} @func isYear

/// #}}} @group SPECIAL-METHODS

/// #{{{ @group OBJECT-STATE-METHODS
//////////////////////////////////////////////////////////////////////////////
// OBJECT-STATE-METHODS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func isCapped
/**
 * @public
 * @param {(?Object|?Function)} src
 * @return {boolean}
 */
function isCapped(src) {

  if ( isNull(src) )
    return false;

  if ( !isObject(src) && !isFunction(src) )
    throw setTypeError(new TypeError, 'src', '(?Object|?Function)');

  return !objectIsExtensible(src);
}
/// #}}} @func isCapped

/// #{{{ @func isFrozen
/**
 * @public
 * @param {(?Object|?Function)} src
 * @return {boolean}
 */
function isFrozen(src) {

  if ( isNull(src) )
    return false;

  if ( !isObject(src) && !isFunction(src) )
    throw setTypeError(new TypeError, 'src', '(?Object|?Function)');

  return objectIsFrozen(src);
}
/// #}}} @func isFrozen

/// #{{{ @func isLocked
/**
 * @public
 * @param {(?Object|?Function)} src
 * @return {boolean}
 */
function isLocked(src) {

  if ( isNull(src) )
    return false;

  if ( !isObject(src) && !isFunction(src) )
    throw setTypeError(new TypeError, 'src', '(?Object|?Function)');

  return !objectIsExtensible(src) && objectIsSealed(src);
}
/// #}}} @func isLocked

/// #{{{ @func isSealed
/**
 * @public
 * @param {(?Object|?Function)} src
 * @return {boolean}
 */
function isSealed(src) {

  if ( isNull(src) )
    return false;

  if ( !isObject(src) && !isFunction(src) )
    throw setTypeError(new TypeError, 'src', '(?Object|?Function)');

  return objectIsSealed(src);
}
/// #}}} @func isSealed

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
    throw setTypeError(new TypeError, 'val', 'number');

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
    throw setTypeError(new TypeError, 'val', 'number');
  if ( !isWholeNumber(val) ) 
    throw setWholeError(new RangeError, 'val', val);

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
    throw setTypeError(new TypeError, 'val', 'number');
  if ( !isWholeNumber(val) )
    throw setWholeError(new RangeError, 'val', val);

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
    throw setTypeError(new TypeError, 'val1', 'number');
  if ( !isNumber(val2) )
    throw setTypeError(new TypeError, 'val2', 'number');
  if (arguments.length > 2)
    throw setArgsError(new Error, arguments.length);

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
    throw setTypeError(new TypeError, 'val1', 'number');
  if ( !isNumber(val2) )
    throw setTypeError(new TypeError, 'val2', 'number');
  if (arguments.length > 2)
    throw setArgsError(new Error, arguments.length);

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
    throw setTypeError(new TypeError, 'val1', 'number');
  if ( !isNumber(val2) )
    throw setTypeError(new TypeError, 'val2', 'number');
  if (arguments.length > 2)
    throw setArgsError(new Error, arguments.length);

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
    throw setTypeError(new TypeError, 'val1', 'number');
  if ( !isNumber(val2) )
    throw setTypeError(new TypeError, 'val2', 'number');
  if (arguments.length > 2)
    throw setArgsError(new Error, arguments.length);

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
    throw setTypeError(new TypeError, 'val1', 'number');
  if ( !isNumber(val2) )
    throw setTypeError(new TypeError, 'val2', 'number');
  if (arguments.length > 2)
    throw setArgsError(new Error, arguments.length);

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
    throw setTypeError(new TypeError, 'val1', 'number');
  if ( !isNumber(val2) )
    throw setTypeError(new TypeError, 'val2', 'number');
  if (arguments.length > 2)
    throw setArgsError(new Error, arguments.length);

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
    throw setTypeError(new TypeError, 'path', 'string');

  return !!path && getFileStats(path).isDirectory();
}
/// #}}} @func isDirectory

/// #{{{ @func isFileMode
/**
 * @public
 * @param {*} val
 * @return {boolean}
 */
function isFileMode(val) {
  return !!val && isString(val) && MODE.test(val);
}
/// #}}} @func isFileMode

/// #{{{ @func isFile
/**
 * @public
 * @param {string} path
 * @return {boolean}
 */
function isFile(path) {

  if ( !isString(path) )
    throw setTypeError(new TypeError, 'path', 'string');

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

  'null': isNull,
  'nil':  isNull,

  'undefined': isUndefined,
  'void':      isUndefined,

  'boolean': isBoolean,
  'bool':    isBoolean,

  'string': isString,
  'str':    isString,

  'number': isNumber,
  'num':    isNumber,

  'integer': isInteger,
  'int':     isInteger,

  'nan': isNan,

  'object': isObject,
  'obj':    isObject,

  'func': isFunction,
  'fun':  isFunction,
  'fn':   isFunction,

  'hashMap': isObjectOrFunction,
  'hashmap': isObjectOrFunction,

  'args': isArguments,

  'array': isArray,
  'arr':   isArray,

  'arrayLike': isArrayLike,
  'arraylike': isArrayLike,
  'arrLike':   isArrayLike,
  'arrlike':   isArrayLike,
  'list':      isArrayLike,

  'regexp': isRegExp,
  'regex':  isRegExp,
  'regx':   isRegExp,
  're':     isRegExp,

  'date': isDate,

  'error': isError,
  'err':   isError,

  'nullList': isNullList,
  'nulllist': isNullList,
  'nilList':  isNullList,
  'nillist':  isNullList,
  'nulls':    isNullList,
  'nils':     isNullList,

  'undefinedList': isUndefinedList,
  'undefinedlist': isUndefinedList,
  'undefineds':    isUndefinedList,
  'voidList':      isUndefinedList,
  'voidlist':      isUndefinedList,
  'voids':         isUndefinedList,

  'booleanList': isBooleanList,
  'booleanlist': isBooleanList,
  'booleans':    isBooleanList,
  'boolList':    isBooleanList,
  'boollist':    isBooleanList,
  'bools':       isBooleanList,

  'stringList': isStringList,
  'stringlist': isStringList,
  'strings':    isStringList,
  'strList':    isStringList,
  'strlist':    isStringList,
  'strs':       isStringList,

  'numberList': isNumberList,
  'numberlist': isNumberList,
  'numbers':    isNumberList,
  'numList':    isNumberList,
  'numlist':    isNumberList,
  'nums':       isNumberList,

  'nanList': isNanList,
  'nanlist': isNanList,
  'nans':    isNanList,

  'nullHashMap': isNullHashMap,
  'nullhashmap': isNullHashMap,
  'nilHashMap':  isNullHashMap,
  'nilhashmap':  isNullHashMap,
  'nullMap':     isNullHashMap,
  'nullmap':     isNullHashMap,
  'nilMap':      isNullHashMap,
  'nilmap':      isNullHashMap,

  'undefinedHashMap': isUndefinedHashMap,
  'undefinedhashmap': isUndefinedHashMap,
  'undefinedMap':     isUndefinedHashMap,
  'undefinedmap':     isUndefinedHashMap,
  'voidHashMap':      isUndefinedHashMap,
  'voidhashmap':      isUndefinedHashMap,
  'voidMap':          isUndefinedHashMap,
  'voidmap':          isUndefinedHashMap,

  'booleanHashMap': isBooleanHashMap,
  'booleanhashmap': isBooleanHashMap,
  'boolHashMap':    isBooleanHashMap,
  'boolhashmap':    isBooleanHashMap,
  'booleanMap':     isBooleanHashMap,
  'booleanmap':     isBooleanHashMap,
  'boolMap':        isBooleanHashMap,
  'boolmap':        isBooleanHashMap,

  'stringHashMap': isStringHashMap,
  'stringhashmap': isStringHashMap,
  'strHashMap':    isStringHashMap,
  'strhashmap':    isStringHashMap,
  'stringMap':     isStringHashMap,
  'stringmap':     isStringHashMap,
  'strMap':        isStringHashMap,
  'strmap':        isStringHashMap,

  'numberHashMap': isNumberHashMap,
  'numberhashmap': isNumberHashMap,
  'numHashMap':    isNumberHashMap,
  'numhashmap':    isNumberHashMap,
  'numberMap':     isNumberHashMap,
  'numbermap':     isNumberHashMap,
  'numMap':        isNumberHashMap,
  'nummap':        isNumberHashMap,

  'nanHashMap': isNanHashMap,
  'nanhashmap': isNanHashMap,
  'nanMap':     isNanHashMap,
  'nanmap':     isNanHashMap,

  'empty': isEmpty,

  'instanceOf': isInstanceOf,
  'instOf':     isInstanceOf,
  'instof':     isInstanceOf,
  'of':         isInstanceOf,

  'semanticVersion': isSemanticVersion,
  'semanticversion': isSemanticVersion,
  'semVersion':      isSemanticVersion,
  'semversion':      isSemanticVersion,
  'semVer':          isSemanticVersion,
  'semver':          isSemanticVersion,

  'year': isYear,

  'cappedHashMap': isCapped,
  'cappedhashmap': isCapped,
  'cappedMap':     isCapped,
  'cappedmap':     isCapped,
  'capped':        isCapped,

  'frozenHashMap': isFrozen,
  'frozenhashmap': isFrozen,
  'frozenMap':     isFrozen,
  'frozenmap':     isFrozen,
  'frozen':        isFrozen,

  'lockedHashMap': isLocked,
  'lockedhashmap': isLocked,
  'lockedMap':     isLocked,
  'lockedmap':     isLocked,
  'locked':        isLocked,

  'sealedHashMap': isSealed,
  'sealedhashmap': isSealed,
  'sealedMap':     isSealed,
  'sealedmap':     isSealed,
  'sealed':        isSealed,

  'wholeNumber': isWholeNumber,
  'wholenumber': isWholeNumber,
  'wholeNum':    isWholeNumber,
  'wholenum':    isWholeNumber,
  'whole':       isWholeNumber,

  'oddNumber': isOddNumber,
  'oddnumber': isOddNumber,
  'oddNum':    isOddNumber,
  'oddnum':    isOddNumber,
  'odd':       isOddNumber,

  'evenNumber': isEvenNumber,
  'evennumber': isEvenNumber,
  'evenNum':    isEvenNumber,
  'evennum':    isEvenNumber,
  'even':       isEvenNumber,

  'equalTo': isEqualTo,
  'equalto': isEqualTo,
  'equal':   isEqualTo,
  'eq':      isEqualTo,

  'greaterThan': isGreaterThan,
  'greaterthan': isGreaterThan,
  'greater':     isGreaterThan,
  'gt':          isGreaterThan,

  'greaterOrEqual': isGreaterOrEqual,
  'greaterorequal': isGreaterOrEqual,
  'greaterEqual':   isGreaterOrEqual,
  'greaterequal':   isGreaterOrEqual,
  'ge':             isGreaterOrEqual,

  'lessThan': isLessThan,
  'lessthan': isLessThan,
  'less':     isLessThan,
  'lt':       isLessThan,

  'lessOrEqual': isLessOrEqual,
  'lessorequal': isLessOrEqual,
  'lessEqual':   isLessOrEqual,
  'lessequal':   isLessOrEqual,
  'le':          isLessOrEqual,

  'notEqualTo': isNotEqualTo,
  'notequalto': isNotEqualTo,
  'notEqual':   isNotEqualTo,
  'notequal':   isNotEqualTo,
  'ne':         isNotEqualTo,

  'buffer': isBuffer,
  'buff':   isBuffer,
  'buf':    isBuffer,

  'directoryPath': isDirectory,
  'directorypath': isDirectory,
  'directory':     isDirectory,
  'dirPath':       isDirectory,
  'dirpath':       isDirectory,
  'dir':           isDirectory,

  'directoryMode': isFileMode,
  'directorymode': isFileMode,
  'directoryMod':  isFileMode,
  'directorymod':  isFileMode,
  'fileMode':      isFileMode,
  'filemode':      isFileMode,
  'fileMod':       isFileMode,
  'filemod':       isFileMode,
  'dirMode':       isFileMode,
  'dirmode':       isFileMode,
  'dirMod':        isFileMode,
  'dirmod':        isFileMode,
  'mode':          isFileMode,

  'filePath': isFile,
  'filepath': isFile,
  'file':     isFile
};
/// #}}} @const IS

module.exports = IS;

/// #}}} @group EXPORTS

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
