/**
 * -----------------------------------------------------------------------------
 * ACT TASK HELPER: is
 * -----------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2017 Adam A Smith <adam@imaginate.life> (https://imaginate.life)
 *
 * @see [JSDoc3](http://usejsdoc.org)
 * @see [Closure Compiler JSDoc](https://developers.google.com/closure/compiler/docs/js-for-compiler)
 */

/**
 * @typedef {{
 *   isDirectory: function():boolean,
 *   isFile:      function():boolean
 * }} StatsDummy
 */

////////////////////////////////////////////////////////////////////////////////
// HELPERS
////////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @const {!Object<string, function>}
 */
var FS = require('fs');

/**
 * @private
 * @const {!StatsDummy}
 */
var STAT_DUMMY = {
  isDirectory: function() { return false; },
  isFile:      function() { return false; }
};

/**
 * @private
 * @param {string} filepath
 * @return {!Stats}
 */
var _getStats = FS.statSync;

/**
 * @private
 * @param {string} prop
 * @return {boolean}
 */
var _hasOwn = Object.prototype.hasOwnProperty;

/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var _isBuffer = Buffer.isBuffer;

/**
 * @private
 * @return {string}
 */
var _toString = Object.prototype.toString;

/**
 * @private
 * @param {string} filepath
 * @return {(!Stats|StatsDummy)}
 */
function getStats(filepath) {
  try {
    return _getStats(filepath);
  }
  catch (e) {
    return STAT_DUMMY;
  }
}

/**
 * @private
 * @param {!Object} obj
 * @param {string} prop
 * @return {boolean}
 */
function hasOwn(obj, prop) {
  return _hasOwn.call(obj, prop);
}

/** 
 * @private
 * @param {!Object} obj
 * @return {string}
 */
function toString(obj) {
  return _toString.call(obj);
}

////////////////////////////////////////////////////////////////////////////////
// EXPORTS
////////////////////////////////////////////////////////////////////////////////

/**
 * @public
 * @type {!Object<string, function>}
 */
var is = {

  'null':           isNull,
  'nil':            isNull,

  'undefined':      isUndefined,

  'boolean':        isBoolean,
  'bool':           isBoolean,

  'string':         isString,
  'str':            isString,

  'number':         isNumber,
  'num':            isNumber,

  'nan':            isNan,

  'object':         isObject,
  'obj':            isObject,

// `is.function' property must be wrapped in `try => catch'
// `is.function' defined immediately after this object closes

//'function':       isFunction,
  'func':           isFunction,

  'array':          isArray,
  'arr':            isArray,

  'arrayLike':      isArrayLike,
  'arrLike':        isArrayLike,

  'regexp':         isRegExp,
  'regex':          isRegExp,

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

  'directory':      isDirectory,
  'dirpath':        isDirectory,
  'dir':            isDirectory,

  'filepath':       isFile,
  'file':           isFile
};

try {
  is['function'] = isFunction;
}
catch (error) {}

module.exports = is;

////////////////////////////////////////////////////////////////////////////////
// PRIMITIVES
////////////////////////////////////////////////////////////////////////////////

/**
 * @public
 * @param {*} val
 * @return {boolean}
 */
function isNull(val) {
  return val === null;
}

/**
 * @public
 * @param {*} val
 * @return {boolean}
 */
function isUndefined(val) {
  return val === undefined;
}

/**
 * @public
 * @param {*} val
 * @return {boolean}
 */
function isBoolean(val) {
  return typeof val === 'boolean';
}

/**
 * @public
 * @param {*} val
 * @return {boolean}
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * @public
 * @param {*} val
 * @return {boolean}
 */
function isNumber(val) {
  return typeof val === 'number' && val === val;
}

/**
 * @public
 * @param {*} val
 * @return {boolean}
 */
function isNan(val) {
  return val !== val;
}

////////////////////////////////////////////////////////////////////////////////
// JS OBJECTS
////////////////////////////////////////////////////////////////////////////////

/**
 * @public
 * @param {*} val
 * @return {boolean}
 */
function isObject(val) {
  return !!val && typeof val === 'object';
}

/**
 * @public
 * @param {*} val
 * @return {boolean}
 */
function isFunction(val) {
  return !!val && typeof val === 'function';
}

/**
 * @public
 * @param {*} val
 * @return {boolean}
 */
function isArray(val) {
  return isObject(val) && toString(val) === '[object Array]';
}

/**
 * @public
 * @param {*} val
 * @return {boolean}
 */
function isArrayLike(val) {
  return isObject(val) && isNumber(val.length) && val.length >= 0;
}

/**
 * @public
 * @param {*} val
 * @return {boolean}
 */
function isRegExp(val) {
  return isObject(val) && toString(val) === '[object RegExp]';
}

/**
 * @public
 * @param {*} val
 * @return {boolean}
 */
function isDate(val) {
  return isObject(val) && toString(val) === '[object Date]';
}

/**
 * @public
 * @param {*} val
 * @return {boolean}
 */
function isError(val) {
  return isObject(val) && toString(val) === '[object Error]';
}

////////////////////////////////////////////////////////////////////////////////
// JS ARRAYS
////////////////////////////////////////////////////////////////////////////////

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

////////////////////////////////////////////////////////////////////////////////
// MISCELLANEOUS
////////////////////////////////////////////////////////////////////////////////

/**
 * Checks if a value is considered empty.
 *
 * @public
 * @param {...*} val
 * @return {boolean} Returns `false` if value is one of the following:
 *   ` 0, "", {}, [], null, undefined, false, NaN, function(){} `
 *   Note that for functions this method checks whether it has any defined
 *   params: ` function empty(){}; function notEmpty(param){}; `
 */
function isEmpty(val) {

  /** @type {string} */
  var key;

  // handle empty primitives - 0, "", null, undefined, false, NaN
  if (!val)
    return true;

  if ( isFunction(val) )
    return !val.length;

  // handle non-empty primitives
  if ( !isObject(val) )
    return false;

  if ( isArray(val) )
    return !val.length;

  // handle all other objects
  for (key in val) {
    if ( hasOwn(val, key) )
      return false;
  }
  return true;
}

////////////////////////////////////////////////////////////////////////////////
// OBJECT STATES
////////////////////////////////////////////////////////////////////////////////

/**
 * @public
 * @param {(!Object|function)} obj
 * @return {boolean}
 */
function isFrozen(obj) {

  if ( !isObject(obj) && !isFunction(obj) )
    throw new TypeError('invalid `obj` type (must be an object or function)');

  return Object.isFrozen(obj);
}

////////////////////////////////////////////////////////////////////////////////
// NUMBER STATES
////////////////////////////////////////////////////////////////////////////////

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

////////////////////////////////////////////////////////////////////////////////
// FILE SYSTEM
////////////////////////////////////////////////////////////////////////////////

/**
 * @public
 * @param {*} val
 * @return {boolean}
 */
function isBuffer(val) {
  return isObject(val) && _isBuffer(val);
}

/**
 * @public
 * @param {string} dirpath
 * @return {boolean}
 */
function isDirectory(dirpath) {

  if ( !isString(dirpath) )
    throw new TypeError('invalid `dirpath` type (must be a string)');

  return !!dirpath && getStats(dirpath).isDirectory();
}

/**
 * @public
 * @param {string} filepath
 * @return {boolean}
 */
function isFile(filepath) {

  if ( !isString(filepath) )
    throw new TypeError('invalid `filepath` type (must be a string)');

  return !!filepath && getStats(filepath).isFile();
}
