/**
 * -----------------------------------------------------------------------------
 * VITALS - JS SHORTCUTS - CLONE
 * -----------------------------------------------------------------------------
 * @version 0.1.0
 * @see [vitals.clone]{@link https://github.com/imaginate/vitals/blob/master/src/parts/js-shortcuts/clone.js}
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

module.exports = clone;

var is = require('node-are').is;
var has = require('./has.js');
var slice = require('./slice.js');
var merge = require('./merge.js');
var typeOf = require('./typeOf.js');


// Note that clone also includes the following methods as props (the shorthand 
//   methods - nil, bool, & func - should be used in browser environments for
//   guaranteed compatibility):
//
// | Method    | Shorthand |
// | :-------- | :-------- |
// | null      | nil       |
// | undefined |           |
// | boolean   | bool      |
// | string    | str       |
// | number    | num       |
// | nan       |           |
// | object    | obj       |
// | function  | func|fn   |
// | regexp    | regex     |
// | array     | arr       |
// | args      |           |

/**
 * Returns a clone of the given value.
 * @public
 * @param {*} val
 * @param {boolean=} deep
 * @return {*}
 */
var clone = (function() {

  /**
   * @public
   * @param {*} val
   * @param {boolean=} deep
   * @return {*}
   */
  function clone(val, deep) {
    return CLONE_MAP[ '_' + typeOf(val) ](val, deep);
  }

  /**
   * Creates a new object with the properties of the given object.
   * @public
   * @param {!Object} obj
   * @param {boolean=} deep
   * @return {!Object}
   */
  clone.object = function cloneObject(obj, deep) {

    /** @type {!Object} */
    var newObj;
    /** @type {string} */
    var prop;

    if ( !is.obj(obj) ) {
      throw new TypeError('Invalid obj param in vitals.clone.object call.');
    }

    newObj = {};
    for (prop in obj) {
      if ( has(obj, prop) ) {
        newObj[prop] = clone(obj[prop], deep);
      }
    }
    return newObj;
  };
  clone.obj = clone.object;

  /**
   * Creates a new array with the properties of the given object.
   * @public
   * @param {!(Object|Array|function)} obj
   * @param {boolean=} deep
   * @return {!Array}
   */
  clone.array = function cloneArray(obj, deep) {

    /** @type {string} */
    var prop;
    /** @type {!Array} */
    var arr;

    if ( !is._obj(obj) || !has(obj, 'length') ) {
      throw new TypeError('Invalid obj param in vitals.clone.array call.');
    }

    arr = slice(obj);
    for (prop in obj) {
      if ( has(obj, prop) && !has(arr, prop) ) {
        arr[prop] = clone(obj[prop], deep);
      }
    }
    return arr;
  };
  clone.arr = clone.array;
  clone.args = clone.array;

  /**
   * Returns the properly escaped RegExp.prototype.source.
   * @private
   * @param {!RegExp}
   * @return {string}
   * @const
   */
  var _getSource = (function() {

    /** @type {?RegExp} */
    var replacer = /\n/.source !== '\\n' ? /\\/g : null;

    return function _getSource(regex) {
      return replacer ? regex.source.replace(replacer, '\\\\') : regex.source;
    };
  })();

  /**
   * All the flag properties available to RegExp.
   * @private
   * @type {!Object<string, string>}
   * @const
   */
  var FLAGS = merge({
    ignoreCase: 'i',
    multiline:  'm',
    global:     'g'
  }, 'sticky' in RegExp.prototype ? { sticky: 'y' } : null);

  /**
   * Creates a new RegExp from a given RegExp.
   * @public
   * @param {!RegExp} regex
   * @return {!RegExp}
   */
  clone.regexp = function cloneRegexp(regex) {

    /** @type {string} */
    var source;
    /** @type {string} */
    var flags;
    /** @type {string} */
    var flag;

    if ( !is.regex(regex) ) {
      throw new TypeError('Invalid regex param in vitals.clone.regexp call.');
    }

    source = _escapeRegex ? regex.source.replace(/\\/g, '\\\\') : regex.source;
    flags = '';
    for (flag in flags) {
      flags += has(_regexFlags, flag) && regex[flag] ? _regexFlags[flag] : '';
    }
    return flags ? new RegExp(source, flags) : new RegExp(source);
  };
  clone.regex = clone.regexp;

  /**
   * Creates a new function with the properties of the given function.
   * @public
   * @param {function} func
   * @param {boolean=} deep
   * @return {function}
   */
  clone.func = function cloneFunction(func, deep) {

    /** @type {function} */
    var newFunc;
    /** @type {string} */
    var prop;

    if ( !is.func(func) ) {
      throw new TypeError('Invalid func param in vitals.clone.function call.');
    }

    newFunc = function() {
      return func.apply(null, arguments);
    };
    for (prop in func) {
      if ( has(func, prop) ) {
        newFunc[prop] = clone(func[prop], deep);
      }
    }
    return newFunc;
  };
  try {
    clone.fn = clone.func;
    clone.function = clone.func;
  }
  catch (e) {}

  /**
   * @private
   * @param {*} val
   * @return {*}
   */
  function _same {
    return val;
  }

  // Append a method that simply returns the same value for all primitives
  clone = merge(clone, {
    nil:       _same,
    undefined: _same,
    bool:      _same,
    string:    _same,
    str:       _same,
    number:    _same,
    num:       _same,
    nan:       _same
  };

  try {
    clone.null    = _same;
    clone.boolean = _same;
  }
  catch (e) {}

  /**
   * A map that handles pointing clone to the right method. This is necessary
   *   for ES3, ES5, & ES6 compatibility.
   * @private
   * @type {!Object<string, function>}
   * @const
   */
  var CLONE_MAP = {
    _null:      _same,
    _undefined: _same,
    _boolean:   _same,
    _string:    _same,
    _number:    _same,
    _nan:       _same,
    _object:    clone.obj,
    _function:  clone.func,
    _regexp:    clone.regex,
    _array:     clone.arr,
    _arguments: clone.arr,
    _element:   clone.obj,
    _document:  clone.obj
  };

  // END OF PRIVATE SCOPE FOR CLONE
  return clone;
})();
