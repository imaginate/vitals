/**
 * -----------------------------------------------------------------------------
 * VITALS UNIT TESTS HELPER: is
 * -----------------------------------------------------------------------------
 * Note that this helper must be browser compatible.
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2017 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Annotations:
 * @see [JSDoc3](http://usejsdoc.org)
 * @see [Closure Compiler JSDoc Syntax](https://developers.google.com/closure/compiler/docs/js-for-compiler)
 */

//////////////////////////////////////////////////////////
// PRIMITIVES
//////////////////////////////////////////////////////////

/**
 * @param {*} val
 * @return {boolean}
 */
exports.nil = function isNull(val) {
  return val === null;
};
try {
  exports.null = exports.nil;
}
catch (err) {}

/**
 * @param {*} val
 * @return {boolean}
 */
exports.undefined = function isUndefined(val) {
  return val === undefined;
};

/**
 * @param {*} val
 * @return {boolean}
 */
exports.bool = function isBoolean(val) {
  return typeof val === 'boolean';
};
try {
  exports.boolean = exports.bool;
}
catch (err) {}

/**
 * @param {*} val
 * @return {boolean}
 */
exports.string = function isString(val) {
  return typeof val === 'string';
};
exports.str = exports.string;

/**
 * @param {*} val
 * @return {boolean}
 */
exports.number = function isNumber(val) {
  return typeof val === 'number' && val === val;
};
exports.num = exports.number;

/**
 * @param {*} val
 * @return {boolean}
 */
exports.nan = function isNan(val) {
  return val !== val;
};

//////////////////////////////////////////////////////////
// JS OBJECTS
//////////////////////////////////////////////////////////

/** @type {function} */
var toStr = Object.prototype.toString;

/**
 * @param {*} val
 * @return {boolean}
 */
exports.object = function isObject(val) {
  return !!val && typeof val === 'object';
};
exports.obj = exports.object;

/**
 * @param {*} val
 * @return {boolean}
 */
exports.func = function isFunction(val) {
  return !!val && typeof val === 'function';
};
try {
  exports.function = exports.func;
}
catch (err) {}

/**
 * @param {*} val
 * @return {boolean}
 */
exports.array = function isArray(val) {
  return !!val && typeof val === 'object' && toStr.call(val) === '[object Array]';
};
exports.arr = exports.array;

/**
 * @param {*} val
 * @return {boolean}
 */
exports.regexp = function isRegExp(val) {
  return !!val && typeof val === 'object' && toStr.call(val) === '[object RegExp]';
};
exports.regex = exports.regexp;

/**
 * @param {*} val
 * @return {boolean}
 */
exports.date = function isDate(val) {
  return !!val && typeof val === 'object' && toStr.call(val) === '[object Date]';
};

/**
 * @param {*} val
 * @return {boolean}
 */
exports.error = function isError(val) {
  return !!val && typeof val === 'object' && toStr.call(val) === '[object Error]';
};
exports.err = exports.error;

//////////////////////////////////////////////////////////
// MISCELLANEOUS
//////////////////////////////////////////////////////////

/** @type {function} */
var hasOwn = Object.prototype.hasOwnProperty;

/**
 * Checks if a value is considered empty.
 * @param {...*} val
 * @return {boolean} Returns `false` if value is one of the following:
 *   ` 0, "", {}, [], null, undefined, false, NaN, function(){} `
 *   Note that for functions this method checks whether it has any defined
 *   params: ` function empty(){}; function notEmpty(param){}; `
 */
exports.empty = function isEmpty(val) {

  /** @type {string} */
  var key;

  // handle empty primitives - 0, "", null, undefined, false, NaN
  if (!val) return true;

  // handle functions
  if (typeof val === 'function') return !val.length;

  // handle non-empty primitives
  if (typeof val !== 'object') return false;

  // handle arrays
  if (toStr.call(val) === '[object Array]') return !val.length;

  // handle all other objects
  for (key in val) {
    if ( hasOwn.call(val, key) ) return false;
  }
  return true;
};

//////////////////////////////////////////////////////////
// OBJECT STATES
//////////////////////////////////////////////////////////

/**
 * This method is `Object.isFrozen` or if required a proper polyfill.
 * @private
 * @param {(!Object|function)} obj
 * @return {boolean}
 */
var baseIsFrozen = (function() {

  if (!Object.isFrozen) return function baseIsFrozen(obj) { return false; };

  try {
    Object.isFrozen( function(){} );
    return Object.isFrozen;
  }
  catch (err) {
    return function baseIsFrozen(obj) {
      return typeof obj === 'object' && Object.isFrozen(obj);
    };
  }
})();

/**
 * @param {(!Object|function)} obj
 * @return {boolean}
 */
exports.frozen = function isFrozen(obj) {
  if ( !obj || (typeof obj !== 'object' && typeof obj !== 'function') ) {
    throw new TypeError('invalid obj (must be an object or function)');
  }
  return baseIsFrozen(obj);
};

/**
 * This method is `Object.isSealed` or if required a proper polyfill.
 * @private
 * @param {(!Object|function)} obj
 * @return {boolean}
 */
var baseIsSealed = (function() {

  if (!Object.isSealed) return function baseIsSealed(obj) { return false; };

  try {
    Object.isSealed( function(){} );
    return Object.isSealed;
  }
  catch (err) {
    return function baseIsSealed(obj) {
      return typeof obj === 'object' && Object.isSealed(obj);
    };
  }
})();

/**
 * @param {(!Object|function)} obj
 * @return {boolean}
 */
exports.sealed = function isSealed(obj) {
  if ( !obj || (typeof obj !== 'object' && typeof obj !== 'function') ) {
    throw new TypeError('invalid obj (must be an object or function)');
  }
  return baseIsSealed(obj);
};

//////////////////////////////////////////////////////////
// NUMBER STATES
//////////////////////////////////////////////////////////

/**
 * @param {number} val
 * @return {boolean}
 */
exports.whole = function isWholeNumber(val) {
  if (typeof val !== 'number' || val !== val) throw new TypeError('invalid val (must be a number)');
  return !(val % 1);
};

/**
 * @param {number} val
 * @return {boolean}
 */
exports.odd = function isOddNumber(val) {
  if (typeof val !== 'number' || val !== val) throw new TypeError('invalid val (must be a number)');
  if (val % 1) throw new RangeError('invalid val (must be a whole number)');
  return !!(val % 2);
};

/**
 * @param {number} val
 * @return {boolean}
 */
exports.even = function isEvenNumber(val) {
  if (typeof val !== 'number' || val !== val) throw new TypeError('invalid val (must be a number)');
  if (val % 1) throw new RangeError('invalid val (must be a whole number)');
  return !(val % 2);
};
