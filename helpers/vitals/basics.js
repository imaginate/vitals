/**
 * -----------------------------------------------------------------------------
 * VITALS LIBRARY - THE BASICS
 * -----------------------------------------------------------------------------
 * @file Vitals libraries, functional shortcuts, and other helpers.
 *
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

/**
 * A shortcut for Object.prototype.hasOwnProperty that accepts null objects or a
 *   shortcut for String.prototype.includes and RegExp.prototype.test.
 * @private
 * @param {?(Object|function|string)} source
 * @param {*} prop
 * @return {boolean}
 */
global.has = function(source, prop) {

  if (!source) {
    if ( !is('?str', source) ) {
      log.error(
        'Invalid `Vitals.has` Call',
        'invalid type for `source` param',
        mapArgs({ source: source, prop: prop })
      );
    }
    return false;
  }

  if ( is.str(source) ) {
    if ( is.str(prop) ) {
      return source.includes(prop);
    }
    else if ( is.regex(prop) ) {
      return prop.test(source);
    }
    else {
      log.error(
        'Invalid `Vitals.has` Call',
        'invalid type for `prop` param',
        mapArgs({ source: source, prop: prop })
      );
    }
  }

  if ( is._obj(source) ) {
    prop = String(prop);
    return 'hasOwnProperty' in source ?
      source.hasOwnProperty(prop) : prop in source;
  }

  log.error(
    'Invalid `Vitals.has` Call',
    'invalid type for `source` param',
    mapArgs({ source: source, prop: prop })
  );
};

/**
 * A shortcut for iterating over object maps and arrays or invoking an action a
 *   set number of times.
 * @param {!(Object|function|Array|number)} val
 * @param {function(*, (string|number)=, (Object|function|Array)=)} iteratee
 * @return {(Object|function|Array)}
 */
global.each = function(val, iteratee) {

  /** @type {(string|number)} */
  var prop;
  /** @type {number} */
  var len;

  if ( !is.func(iteratee) ) {
    log.error(
      'Invalid `Vitals.each` Call',
      'invalid type for `iteratee` param',
      mapArgs({ val: val, iteratee: iteratee })
    );
  }

  if ( is._obj(val) ) {

    // iterate over an array or arguments obj
    if ( is._arr(val) ) {
      val = slice(val);
      len = val.length;
      prop = -1;
      while (++prop < len) {
        iteratee(val[prop], prop, val);
      }
    }

    // iterate over an object's own props
    else {
      val = is.func(val) ? val : clone(val);
      for (prop in val) {
        if ( has(val, prop) ) {
          iteratee(val[prop], prop, val);
        }
      }
    }
    return val;
  }

  // iterate specified number of times
  else if ( is.num(val) ) {
    while(cycles--) {
      iteratee();
    }
    return null;
  }

  log.error(
    'Invalid `Vitals.each` Call',
    'invalid type for `val` param',
    mapArgs({ val: val, iteratee: iteratee })
  );
};

/**
 * A shortcut for Array.prototype.slice.call(obj, start, end) and
 *   String.prototype.slice(start, end).
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

  if ( is.str(val) ) {
    return val.slice(start, end);
  }

  if ( is.null(val) ) {
    return null;
  }

  if ( !is._obj(val) || !has(val, 'length') ) {
    log.error(
      'Invalid `Vitals.slice` Call',
      'invalid type for `val` param',
      mapArgs({ val: val, start: start, end: end })
    );
  }

  len = val.length;
  start = start || 0;
  start = start < 0 ? len + start : start;
  end = end || len;
  end = end > len ?
    len : end < 0 ?
      len + end : end;

  arr = start < end ? new Array(end - start) : [];
  ii = start - 1;
  i = 0;
  while (++ii < end) {
    arr[i++] = val[ii];
  }
  return arr;
};

/**
 * Creates a new object with the properties of the given object.
 * @param {Object} obj
 * @param {boolean=} deep
 * @return {Object}
 */
global.clone = function clone(obj, deep) {

  /** @type {!Object} */
  var newObj;
  /** @type {string} */
  var prop;

  if ( is.null(obj) ) {
    return null;
  }

  if ( !is.obj(obj) ) {
    log.error(
      'Invalid `Vitals.clone` Call',
      'invalid type for `obj` param',
      mapArgs({ obj: obj, deep: deep })
    );
  }

  newObj = is.arr(obj) ? [] : {};
  for (prop in obj) {
    if ( has(obj, prop) ) {
      newObj[prop] = deep && is.obj( obj[prop] ) ?
        clone(obj[prop], true) : obj[prop];
    }
  }
  return newObj;
};

/**
 * Appends the properties of source objects to an existing object.
 * @param {!(Object|function)} dest
 * @param {...?(Object|function)} source
 * @return {!(Object|function)}
 */
global.merge = function merge(dest, source) {

  /** @type {string} */
  var prop;
  /** @type {number} */
  var len;
  /** @type {number} */
  var i;

  if ( !is._obj(dest) || arguments.length > 2 ?
         !are('?obj|func', slice(arguments, 1)) : !is('?obj|func', source) ) {
    log.error(
      'Invalid `Vitals.merge` Call',
      'invalid type for a param or params',
      mapArgs({ dest: dest, sources: slice(arguments, 1) })
    );
  }

  len = arguments.length;
  i = 0;
  while(++i < len) {
    source = arguments[i];
    if (source) {
      for (prop in source) {
        if ( has(source, prop) ) {
          dest[prop] = source[prop];
        }
      }
    }
  }
  return dest;
};

/**
 * A shortcut for Array.prototype.map(obj, iteratee).
 * @param {Object} obj
 * @param {function(*, number): *} iteratee
 * @return {Array}
 */
global.mapArr = function mapArr(obj, iteratee) {

  /** @type {!Array} */
  var arr;
  /** @type {number} */
  var i;

  if ( !is.func(iteratee) ) {
    log.error(
      'Invalid `Vitals.map` Call',
      'invalid type for `iteratee` param',
      mapArgs({ obj: obj, iteratee: iteratee })
    );
  }

  if ( is.null(obj) ) {
    return null;
  }

  if ( !is.obj(obj) || !has(obj, 'length') ) {
    log.error(
      'Invalid `Vitals.map` Call',
      'invalid type for `obj` param',
      mapArgs({ obj: obj, iteratee: iteratee })
    );
  }

  i = obj.length;
  arr = i ? new Array(i) : [];
  while (i--) {
    arr[i] = iteratee(obj[i], i);
  }
  return arr;
};

/**
 * Gets an object's property keys.
 * @private
 * @param {?(Object|function)} obj
 * @return {Array<string>}
 */
global.objKeys = function objKeys(obj) {

  /** @type {string} */
  var prop;
  /** @type {!Array<string>} */
  var arr;

  if ( is.null(obj) ) {
    return null;
  }

  if ( !is._obj(obj) ) {
    log.error(
      'Invalid `Vitals.objKeys` Call',
      'invalid type for `obj` param',
      mapArgs({ obj: obj })
    );
  }

  arr = [];
  for (prop in obj) {
    if ( has(obj, prop) ) {
      arr.push(prop);
    }
  }
  return arr;
};

/**
 * Seals an object.
 * @private
 * @param {!(Object|function)} obj
 * @param {boolean=} deep
 * @return {!Object}
 */
global.seal = function seal(obj, deep) {

  /** @type {string} */
  var prop;

  if ( !is._obj(obj) ) {
    if ( !is.null(obj) ) {
      log.error(
        'Invalid `Vitals.seal` Call',
        'invalid type for `obj` param',
        mapArgs({ obj: obj, deep: deep })
      );
    }
    return null;
  }

  if (deep) {
    for (prop in obj) {
      if ( has(obj, prop) && is._obj( obj[prop] ) ) {
        obj[prop] = seal(obj[prop], true);
      }
    }
  }

  return Object.seal(obj);
};

/**
 * Freezes an object.
 * @private
 * @param {!Object} obj
 * @param {boolean=} deep
 * @return {!Object}
 */
global.freeze = function freeze(obj, deep) {

  /** @type {string} */
  var prop;

  if ( !is._obj(obj) ) {
    if ( !is.null(obj) ) {
      log.error(
        'Invalid `Vitals.freeze` Call',
        'invalid type for `obj` param',
        mapArgs({ obj: obj, deep: deep })
      );
    }
    return null;
  }

  if (deep) {
    for (prop in obj) {
      if ( has(obj, prop) && is._obj( obj[prop] ) ) {
        obj[prop] = freeze(obj[prop], true);
      }
    }
  }

  return Object.freeze(obj);
};


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
