/**
 * -----------------------------------------------------------------------------
 * VITALS - JS METHOD - CLONE
 * -----------------------------------------------------------------------------
 * @version 2.0.0
 * @see [vitals.clone]{@link https://github.com/imaginate/vitals/blob/master/src/js-methods/clone.js}
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

var newErrorAid = require('../_helpers/errorAid.js');
var _inStr = require('../_helpers/inStr.js');
var _merge = require('../_helpers/merge.js');
var _own = require('../_helpers/own.js');
var is = require('node-are').is;


////////////////////////////////////////////////////////////////////////////////
// CLONE
////////////////////////////////////////////////////////////////////////////////

var clone = (function clonePrivateScope() {

  //////////////////////////////////////////////////////////
  // PUBLIC METHODS
  // - clone
  // - clone.object (clone.obj)
  // - clone.array  (clone.arr|clone.args)
  // - clone.regexp (clone.re|clone.regex)
  // - clone.func   (clone.fn|clone.function*)
  //
  // * Note that clone.function will fail in all ES3 browser
  //   environments and even some ES5. Use clone.func for
  //   compatibility with older browser environments.
  //////////////////////////////////////////////////////////

  /**
   * Returns a clone of the given value.
   * @public
   * @param {*} val
   * @param {boolean=} deep
   * @return {*}
   */
  function clone(val, deep) {

    if ( !is('bool=', deep) ) throw _error.type('deep');

    return !is._obj(val)
      ? val
      : is.func(val)
        ? _cloneFunc(val, deep)
        : is._arr(val)
          ? _cloneArr(val, deep)
          : is.regex(val)
            ? _cloneRegex(val)
            : _cloneObj(val, deep);  
  }

  /**
   * Creates a new object with the properties of the given object.
   * @public
   * @param {!Object} obj
   * @param {boolean=} deep
   * @return {!Object}
   */
  clone.object = function cloneObject(obj, deep) {

    if ( !is.obj(obj)       ) throw _error.type('obj',  'object');
    if ( !is('bool=', deep) ) throw _error.type('deep', 'object');

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
    if ( !is('bool=', deep)  ) throw _error.type('deep',       'array');

    return _cloneArr(obj, deep);
  };
  // define shorthand
  clone.arr = clone.array;
  clone.args = clone.array;

  /**
   * Creates a new RegExp from a given RegExp.
   * @public
   * @param {!RegExp} regex
   * @param {boolean=} forceGlobal
   * @return {!RegExp}
   */
  clone.regexp = function cloneRegexp(regex, forceGlobal) {

    if ( !is.regex(regex)          ) throw _error.type('regex',       'regexp');
    if ( !is('bool=', forceGlobal) ) throw _error.type('forceGlobal', 'regexp');

    return _cloneRegex(regex, forceGlobal);
  };
  // define shorthand
  clone.re = clone.regexp;
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

    if ( !is.func(func)     ) throw _error.type('func', 'function');
    if ( !is('bool=', deep) ) throw _error.type('deep', 'function');

    return _cloneFunc(func, deep);
  };
  // define shorthand
  try {
    clone.fn = clone.func;
    clone.function = clone.func;
  }
  catch (e) {}

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - MAIN
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @param {!Object} obj
   * @param {boolean=} deep
   * @return {!Object}
   */
  function _cloneObj(obj, deep) {
    return deep ? _mergeDeep({}, obj) : _merge({}, obj);
  }

  /**
   * @private
   * @param {!Object} obj
   * @param {boolean=} deep
   * @return {!Array}
   */
  function _cloneArr(obj, deep) {

    /** @type {!Array} */
    var arr;

    arr = new Array(obj.length);
    return deep ? _mergeDeep(arr, obj) : _merge(arr, obj);
  }

  /**
   * @private
   * @param {!RegExp} regex
   * @param {boolean=} forceGlobal
   * @return {!RegExp}
   */
  function _cloneRegex(regex, forceGlobal) {

    /** @type {string} */
    var source;
    /** @type {string} */
    var flags;

    source = _escape(regex.source);
    flags = _setupFlags(regex, forceGlobal);

    return flags ? new RegExp(source, flags) : new RegExp(source);
  }

  /**
   * @private
   * @param {function} func
   * @param {boolean=} deep
   * @return {function}
   */
  function _cloneFunc(func, deep) {

    /** @type {function} */
    var clonedFunc;

    clonedFunc = function clonedFunc() {
      return func.apply(null, arguments);
    };
    return deep ? _mergeDeep(clonedFunc, func) : _merge(clonedFunc, func);
  }

  //////////////////////////////////////////////////////////
  // PRIVATE PROPERTIES - CLONE.REGEXP
  //////////////////////////////////////////////////////////

  /**
   * Returns a properly escaped RegExp.prototype.source.
   * @private
   * @param {string} source
   * @return {string}
   */
  var _escape = (function() {

    /** @type {?RegExp} */
    var pattern = /\n/.source !== '\\n' ? /\\/g : null;

    return pattern
      ? function _escape(source) { return source.replace(pattern, '\\\\'); }
      : function _escape(source) { return source; };
  })();

  /**
   * @private
   * @type {!Object}
   * @const
   */
  var FLAGS = _merge({
    ignoreCase: 'i',
    multiline:  'm',
    global:     'g'
  }, 'sticky' in RegExp.prototype ? { sticky: 'y' } : null);

  /**
   * @private
   * @param {!RegExp} regex
   * @param {boolean=} forceGlobal
   * @return {string}
   */
  function _setupFlags(regex, forceGlobal) {

    /** @type {string} */
    var flags;
    /** @type {string} */
    var key;

    flags = '';
    for (key in FLAGS) {
      if ( _own(FLAGS, key) && regex[key] ) {
        flags += FLAGS[key];
      }
    }

    if ( is.undefined(forceGlobal) ) return flags;

    return _inStr(flags, 'g')
      ? forceGlobal
        ? flags
        : flags.replace('g', '')
      : forceGlobal
        ? flags + 'g'
        : flags;
  }

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - GENERAL
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @param {!(Object|function)} dest
   * @param {!(Object|function)} source
   * @return {!(Object|function)}
   */
  function _mergeDeep(dest, source) {

    /** @type {string} */
    var key;

    for (key in source) {
      if ( _own(source, key) ) {
        dest[key] = clone(source[key], true);
      }
    }
    return dest;
  }

  /**
   * @private
   * @type {!ErrorAid}
   */
  var _error = newErrorAid('clone');

  //////////////////////////////////////////////////////////
  // END OF PRIVATE SCOPE FOR CLONE
  return clone;
})();


module.exports = clone;
