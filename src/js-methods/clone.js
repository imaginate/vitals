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

var makeErrorAid = require('./_error.js');
var is = require('node-are').is;
var has = require('./has.js');


////////////////////////////////////////////////////////////////////////////////
// CLONE
////////////////////////////////////////////////////////////////////////////////

var clone = (function clonePrivateScope() {

  /**
   * Returns a clone of the given value.
   * @public
   * @param {*} val
   * @param {boolean=} deep
   * @return {*}
   */
  function clone(val, deep) {

    if ( is.func(val) ) return _cloneFunc(val, deep);

    if ( is.obj(val) ) {
      if ( is._arr(val) ) return _cloneArr(val, deep);
      if ( is.regex(val) ) return _cloneRegex(val);
      return _cloneObj(val, deep);
    }

    return val;
  }

  /**
   * Creates a new object with the properties of the given object.
   * @public
   * @param {!Object} obj
   * @param {boolean=} deep
   * @return {!Object}
   */
  clone.object = function cloneObject(obj, deep) {

    if ( !is.obj(obj) ) throw _error.type('obj', 'object');

    return _cloneObj(obj, deep);
  };
  // define shorthand
  clone.obj = clone.object;

  /**
   * Creates a new array with the properties of the given object.
   * @public
   * @param {!Object} obj
   * @param {boolean=} deep
   * @return {!Array}
   */
  clone.array = function cloneArray(obj, deep) {

    if ( !is.obj(obj)        ) throw _error.type('obj',        'array');
    if ( !is.num(obj.length) ) throw _error.type('obj.length', 'array');

    return _cloneArr(obj, deep);
  };
  // define shorthand
  clone.arr = clone.array;
  clone.args = clone.array;

  /**
   * Creates a new RegExp from a given RegExp.
   * @public
   * @param {!RegExp} regex
   * @return {!RegExp}
   */
  clone.regexp = function cloneRegexp(regex) {

    if ( !is.regex(regex) ) throw _error.type('regex', 'regexp');

    return _cloneRegex(regex);
  };
  // define shorthand
  clone.regex = clone.regexp;

  /**
   * Creates a new function with the properties of the given function. Use
   *   clone.func instead of clone.function in browser environments for
   *   compatibility.
   * @public
   * @param {function} func
   * @param {boolean=} deep
   * @return {function}
   */
  clone.func = function cloneFunction(func, deep) {

    if ( !is.func(func) ) throw _error.type('func', 'function');

    return _cloneFunc(func, deep);
  };
  // define shorthand
  try {
    clone.fn = clone.func;
    clone.function = clone.func;
  }
  catch (e) {}

  /**
   * @private
   * @param {!Object} obj
   * @param {boolean=} deep
   * @return {!Object}
   */
  function _cloneObj(obj, deep) {
    return _merge({}, obj, deep);
  }

  /**
   * @private
   * @param {!Object} obj
   * @param {boolean=} deep
   * @return {!Array}
   */
  function _cloneArr(obj, deep) {
    return _merge(new Array(obj.length), obj, deep);
  }

  /**
   * @private
   * @param {!RegExp} regex
   * @return {!RegExp}
   */
  function _cloneRegex(regex) {

    /** @type {string} */
    var source;
    /** @type {string} */
    var flags;
    /** @type {string} */
    var key;

    source = _escape(regex.source);
    flags = '';
    for (key in FLAGS) {
      if ( _has(FLAGS, key) && regex[key] ) {
        flags += FLAGS[key];
      }
    }
    return flags ? new RegExp(source, flags) : new RegExp(source);
  }

  /**
   * @private
   * @param {function} func
   * @param {boolean=} deep
   * @return {function}
   */
  function _cloneFunc(func, deep) {
    return _merge(function clonedFunc() {
      return func.apply(null, arguments);
    }, func, deep);
  }

  /**
   * @private
   * @param {!(Object|function)} dest
   * @param {!(Object|function)} source
   * @param {boolean=} deep
   * @return {!(Object|function)}
   */
  function _merge(dest, source, deep) {

    /** @type {string} */
    var key;

    if (deep) {
      for (key in source) {
        if ( _has(source, key) ) {
          dest[key] = clone(source[key], true);
        }
      }
    }
    else {
      for (key in source) {
        if ( _has(source, key) ) {
          dest[key] = source[key];
        }
      }
    }
    return dest;
  }

  /**
   * Returns the properly escaped RegExp.prototype.source.
   * @private
   * @param {string} source
   * @return {string}
   */
  var _escape = (function() {

    /** @type {?RegExp} */
    var replacer = /\n/.source !== '\\n' ? /\\/g : null;

    return function _escape(source) {
      return replacer ? source.replace(replacer, '\\\\') : source;
    };
  })();

  /**
   * @private
   * @type {!Object<string, string>}
   * @const
   */
  var FLAGS = _merge({
    ignoreCase: 'i',
    multiline:  'm',
    global:     'g'
  }, 'sticky' in RegExp.prototype ? { sticky: 'y' } : null);

  /**
   * @private
   * @param {?(Object|function)} obj
   * @param {*} key
   * @return {boolean}
   */
  var _has = has.key;

  /**
   * @private
   * @type {!ErrorAid}
   */
  var _error = makeErrorAid('clone');

  // END OF PRIVATE SCOPE FOR CLONE
  return clone;
})();


module.exports = clone;
