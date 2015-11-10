/**
 * -----------------------------------------------------------------------------
 * HELPERS LIBRARY - THE BASICS
 * -----------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2015 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Supporting Libraries:
 * @see [are]{@link https://github.com/imaginate/are}
 *
 * Annotations:
 * @see [JSDoc3]{@link http://usejsdoc.org/}
 * @see [Closure Compiler specific JSDoc]{@link https://developers.google.com/closure/compiler/docs/js-for-compiler}
 */

'use strict';


////////////////////////////////////////////////////////////////////////////////
// APPEND LIBRARIES
////////////////////////////////////////////////////////////////////////////////

/** @type {Function<string, function>} */
global.log = require('../log');
/** @type {Function<string, function>} */
global.is = require('node-are').is;
/** @type {Function<string, function>} */
global.are = require('node-are').are;


////////////////////////////////////////////////////////////////////////////////
// APPEND SHORTCUT METHODS
////////////////////////////////////////////////////////////////////////////////

var hasOwnProperty = Object.prototype.hasOwnProperty;
var propertyIsEnumerable = Object.prototype.propertyIsEnumerable;

/**
 * A shortcut for Object.prototype.hasOwnProperty that accepts null objects or a
 *   shortcut for String.prototype.includes and RegExp.prototype.test.
 * @global
 * @param {?(Object|function|string)} source
 * @param {*} prop
 * @return {boolean}
 */
global.has = function has(source, prop) {

  if ( is.null(source) ) return false;

  if ( is.str(source) ) {
    if ( is.regex(prop) ) return prop.test(source);
    prop = String(prop);
    if (!source) return !prop;
    if (!prop) return true;
    return source.includes(prop);
  }

  if ( !is._obj(source) ) log.error(
    'Invalid `helpers.has` Call',
    'invalid type for `source` param',
    mapArgs({ source: source, prop: prop })
  );

  return hasOwnProperty.call(source, prop);
};

/**
 * A shortcut for Object.prototype.propertyIsEnumerable.
 * @global
 * @param {?(Object|function)} source
 * @param {*} prop
 * @return {boolean}
 */
global.has.enum = function hasEnum(source, prop) {

  if ( is.null(source) ) return false;

  if ( !is._obj(source) ) log.error(
    'Invalid `helpers.has.enum` Call',
    'invalid type for `source` param',
    mapArgs({ source: source, prop: prop })
  );

  return propertyIsEnumerable.call(source, prop);
};

/**
 * A shortcut for iterating over object maps and arrays or invoking an action a
 *   set number of times.
 * @global
 * @param {!(Object|function|Array|number)} val
 * @param {function(*, (string|number)=)} iteratee
 * @return {(Object|function|Array)}
 */
global.each = function each(val, iteratee) {

  /** @type {(string|number)} */
  var prop;
  /** @type {number} */
  var len;

  if ( !is.func(iteratee) ) log.error(
    'Invalid `helpers.each` Call',
    'invalid type for `iteratee` param',
    mapArgs({ val: val, iteratee: iteratee })
  );

  // iterate specified number of times
  if ( is.num(val) ) {
    while(cycles--) iteratee();
    return null;
  }

  if ( !is._obj(val) ) log.error(
    'Invalid `helpers.each` Call',
    'invalid type for `val` param',
    mapArgs({ val: val, iteratee: iteratee })
  );

  // iterate over an array or arguments obj
  if ( is._arr(val) ) {
    len = val.length;
    prop = -1;
    while (++prop < len) iteratee(val[prop], prop);
    return val;
  }

  // iterate over an object's own props
  for (prop in val) has(val, prop) && iteratee(val[prop], prop);
  return val;
};

/**
 * A shortcut for Array.prototype.slice.call(obj, start, end) and
 *   String.prototype.slice(start, end).
 * @global
 * @param {?(Object|string)} val
 * @param {number=} start [default= 0]
 * @param {number=} end [default= arr.length]
 * @return {?(Array|string)}
 */
global.slice = function slice(val, start, end) {

  /** @type {!Array} */
  var arr;
  /** @type {number} */
  var len;
  /** @type {number} */
  var ii;
  /** @type {number} */
  var i;

  if ( !is('num=', start) || !is('num=', end) ) log.error(
    'Invalid `helpers.slice` Call',
    'invalid type for `start` or `end` param',
    mapArgs({ val: val, start: start, end: end })
  );

  if ( is.null(val) ) return null;

  if ( !is.str(val) && ( !is._obj(val) || !is.num(val.length) ) ) log.error(
    'Invalid `helpers.slice` Call',
    'invalid type for `val` param',
    mapArgs({ val: val, start: start, end: end })
  );

  len = val.length;
  start = start || 0;
  start = start < 0 ? len + start : start;
  start = start < 0 ? 0 : start;
  end = end || len;
  end = end > len
    ? len : end < 0
      ? len + end : end;

  if ( is.str(val) ) return start >= end ? '' : val.slice(start, end);

  if (start >= end) return [];

  arr = new Array(end - start);
  ii = start - 1;
  i = 0;
  while (++ii < end) {
    arr[i++] = val[ii];
  }
  return arr;
};

/**
 * Creates a new object with the properties of the given object.
 * @global
 * @param {Object} obj
 * @param {boolean=} deep
 * @return {Object}
 */
global.clone = function clone(obj, deep) {

  /** @type {!Object} */
  var newObj;
  /** @type {string} */
  var key;
  /** @type {*} */
  var val;

  if ( is.null(obj) ) return null;

  if ( !is.obj(obj) ) log.error(
    'Invalid `helpers.clone` Call',
    'invalid type for `obj` param',
    mapArgs({ obj: obj, deep: deep })
  );

  newObj = {};
  if (deep) {
    for (key in obj) {
      if ( has(obj, key) ) {
        val = obj[key];
        newObj[key] = is.obj(val) ? clone(val, true) : obj[key];
      }
    }
  }
  else {
    for (key in obj) {
      if ( has(obj, key) ) {
        newObj[key] = obj[key];
      }
    }
  }
  return newObj;
};

/**
 * Appends the properties of source objects to an existing object.
 * @global
 * @param {!(Object|function)} dest
 * @param {...?(Object|function)} source
 * @return {!(Object|function)}
 */
global.merge = function merge(dest, source) {

  /** @type {string} */
  var key;
  /** @type {number} */
  var len;
  /** @type {number} */
  var i;

  if ( !is._obj(dest) ) log.error(
    'Invalid `helpers.merge` Call',
    'invalid type for dest param',
    mapArgs({ dest: dest })
  );

  len = arguments.length;
  i = 0;
  while(++i < len) {
    source = arguments[i];
    if ( is.null(source) ) continue;
    if ( !is._obj(source) ) log.error(
      'Invalid `helpers.merge` Call',
      'invalid type for a source param',
      mapArgs({ sources: slice(arguments, 1) })
    );
    for (key in source) {
      if ( has(source, key) ) {
        dest[key] = source[key];
      }
    }
  }
  return dest;
};

/**
 * A shortcut for Array.prototype.map(obj, iteratee).
 * @global
 * @param {Object} obj
 * @param {function(*, number): *} iteratee
 * @return {Array}
 */
global.remap = function remap(obj, iteratee) {

  /** @type {!Array} */
  var arr;
  /** @type {number} */
  var len;
  /** @type {number} */
  var i;

  if ( !is.func(iteratee) ) log.error(
    'Invalid `helpers.map` Call',
    'invalid type for `iteratee` param',
    mapArgs({ obj: obj, iteratee: iteratee })
  );

  if ( is.null(obj) ) return null;

  if ( !is.obj(obj) || !is.num(obj.length) ) log.error(
    'Invalid `helpers.remap` Call',
    'invalid type for `obj` param',
    mapArgs({ obj: obj, iteratee: iteratee })
  );

  len = obj.length;
  arr = new Array(len);
  i = -1;
  while (++i < len) {
    arr[i] = iteratee(obj[i], i);
  }
  return arr;
};

/**
 * Gets an object's property keys.
 * @global
 * @param {?(Object|function)} obj
 * @return {Array<string>}
 */
global.objKeys = function objKeys(obj) {

  /** @type {!Array<string>} */
  var arr;
  /** @type {string} */
  var key;

  if ( is.null(obj) ) return null;

  if ( !is._obj(obj) ) log.error(
    'Invalid `helpers.objKeys` Call',
    'invalid type for `obj` param',
    mapArgs({ obj: obj })
  );

  arr = [];
  for (key in obj) has(obj, key) && arr.push(key);
  return arr;
};

/**
 * Seals an object.
 * @global
 * @param {!(Object|function)} obj
 * @param {boolean=} deep
 * @return {!Object}
 */
global.seal = function seal(obj, deep) {

  /** @type {string} */
  var key;

  if ( is.null(obj) ) return null;

  if ( !is._obj(obj) ) log.error(
    'Invalid `helpers.seal` Call',
    'invalid type for `obj` param',
    mapArgs({ obj: obj, deep: deep })
  );

  if (deep) {
    for (key in obj) {
      if ( has(obj, key) && is._obj( obj[key] ) ) {
        obj[key] = seal(obj[key], true);
      }
    }
  }

  return Object.seal(obj);
};

/**
 * Freezes an object.
 * @global
 * @param {!Object} obj
 * @param {boolean=} deep
 * @return {!Object}
 */
global.freeze = function freeze(obj, deep) {

  /** @type {string} */
  var key;

  if ( is.null(obj) ) return null;

  if ( !is._obj(obj) ) log.error(
    'Invalid `helpers.freeze` Call',
    'invalid type for `obj` param',
    mapArgs({ obj: obj, deep: deep })
  );

  if (deep) {
    for (key in obj) {
      if ( has(obj, key) && is._obj( obj[key] ) ) {
        obj[key] = freeze(obj[key], true);
      }
    }
  }

  return Object.freeze(obj);
};

/**
 * Fills an existing or new array with specified values.
 * @global
 * @param {(Array|number)} arr
 * @param {*} val
 * @param {number=} start [default= 0]
 * @param {number=} end [default= arr.length]
 * @return {Array}
 */
global.fill = function fill(arr, val, start, end) {

  /** @type {number} */
  var len;
  /** @type {number} */
  var i;

  if (arguments.length < 2) log.error(
    'Invalid `helpers.fill` Call',
    'missing a `val` param (i.e. no `val` was given)',
    mapArgs({ arr: arr, val: val })
  );

  if ( !is('num=', start) || !is('num=', end) ) log.error(
    'Invalid `helpers.fill` Call',
    'invalid type for `start` or `end` param',
    mapArgs({ arr: arr, val: val, start: start, end: end })
  );

  arr = is.num(arr) ? new Array(arr) : arr;

  if ( !is.arr(arr) ) log.error(
    'Invalid `helpers.fill` Call',
    'invalid type for `arr` param',
    mapArgs({ arr: arr })
  );

  len = arr.length;
  start = start || 0;
  start = start < 0 ? len + start : start;
  start = start < 0 ? 0 : start;
  end = end || len;
  end = end > len
    ? len : end < 0
      ? len + end : end;

  i = start - 1;
  while (++i < end) {
    arr[i] = val;
  }
  return arr;
};

/**
 * Fills a new string with specified values.
 * @global
 * @param {number} cycles - The number of times to fill the string with the val.
 * @param {*} val - A non-string val is converted to a string as String(val).
 * @return {string}
 */
global.fill.str = function fillStr(cycles, val) {

  /** @type {string} */
  var str;

  if ( !is.num(cycles) ) log.error(
    'Invalid `helpers.fill.str` Call',
    'invalid type for `cycles` param',
    mapArgs({ cycles: cycles, val: val })
  );

  if (arguments.length < 2) log.error(
    'Invalid `helpers.fill.str` Call',
    'missing a `val` param (i.e. no `val` was given)',
    mapArgs({ cycles: cycles, val: val })
  );

  val = String(val);
  str = '';
  while (cycles--) str += val;
  return str;
};


////////////////////////////////////////////////////////////////////////////////
// APPEND GLOBAL FLAG
////////////////////////////////////////////////////////////////////////////////

/**
 * @global
 * @type {boolean}
 */
global.__basics = true;


////////////////////////////////////////////////////////////////////////////////
// PRIVATE HELPERS
////////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @param {!Object} obj
 * @return {!Object}
 */
function mapArgs(obj) {
  obj = merge({ argMap: true }, obj);
  return freeze(obj);
}
