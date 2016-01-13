/**
 * -----------------------------------------------------------------------------
 * VITALS - JS METHOD - COPY
 * -----------------------------------------------------------------------------
 * @version 2.3.2
 * @see [vitals.copy]{@link https://github.com/imaginate/vitals/blob/master/src/methods/copy.js}
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

var newErrorAid = require('./_helpers/errorAid.js');
var _inStr = require('./_helpers/inStr.js');
var _merge = require('./_helpers/merge.js');
var _own = require('./_helpers/own.js');
var is = require('node-are').is;


////////////////////////////////////////////////////////////////////////////////
// COPY
////////////////////////////////////////////////////////////////////////////////

var copy = (function copyPrivateScope() {

  //////////////////////////////////////////////////////////
  // PUBLIC METHODS
  // - copy
  // - copy.object (copy.obj)
  // - copy.array  (copy.arr|copy.args)
  // - copy.regexp (copy.re|copy.regex)
  // - copy.func   (copy.fn|copy.function*)
  //
  // * Note that copy.function will fail in all ES3 browser
  //   environments and even some ES5. Use copy.func for
  //   compatibility with older browser environments.
  //////////////////////////////////////////////////////////

  /**
   * Returns a copy of the given value.
   * @public
   * @param {*} val
   * @param {boolean=} deep
   * @return {*}
   */
  function copy(val, deep) {

    if ( !is('bool=', deep) ) throw _error.type('deep');

    return !is._obj(val)
      ? val
      : is.func(val)
        ? _copyFunc(val, deep)
        : is._arr(val)
          ? _copyArr(val, deep)
          : is.regex(val)
            ? _copyRegex(val)
            : _copyObj(val, deep);  
  }

  /**
   * Creates a new object with the properties of the given object.
   * @public
   * @param {!Object} obj
   * @param {boolean=} deep
   * @return {!Object}
   */
  copy.object = function copyObject(obj, deep) {

    if ( !is.obj(obj)       ) throw _error.type('obj',  'object');
    if ( !is('bool=', deep) ) throw _error.type('deep', 'object');

    return _copyObj(obj, deep);
  };
  // define shorthand
  copy.obj = copy.object;

  /**
   * Creates a new array with the properties of the given object.
   * @public
   * @param {!Object} obj
   * @param {boolean=} deep
   * @return {!Array}
   */
  copy.array = function copyArray(obj, deep) {

    if ( !is.obj(obj)        ) throw _error.type('obj',        'array');
    if ( !is.num(obj.length) ) throw _error.type('obj.length', 'array');
    if ( !is('bool=', deep)  ) throw _error.type('deep',       'array');

    return _copyArr(obj, deep);
  };
  // define shorthand
  copy.arr = copy.array;
  copy.args = copy.array;

  /**
   * Creates a new RegExp from a given RegExp.
   * @public
   * @param {!RegExp} regex
   * @param {boolean=} forceGlobal
   * @return {!RegExp}
   */
  copy.regexp = function copyRegexp(regex, forceGlobal) {

    if ( !is.regex(regex)          ) throw _error.type('regex',       'regexp');
    if ( !is('bool=', forceGlobal) ) throw _error.type('forceGlobal', 'regexp');

    return _copyRegex(regex, forceGlobal);
  };
  // define shorthand
  copy.re = copy.regexp;
  copy.regex = copy.regexp;

  /**
   * Creates a new function with the properties of the given function. Use
   *   copy.func instead of copy.function in browser environments for
   *   compatibility.
   * @public
   * @param {function} func
   * @param {boolean=} deep
   * @return {function}
   */
  copy.func = function copyFunction(func, deep) {

    if ( !is.func(func)     ) throw _error.type('func', 'function');
    if ( !is('bool=', deep) ) throw _error.type('deep', 'function');

    return _copyFunc(func, deep);
  };
  // define shorthand
  try {
    copy.fn = copy.func;
    copy.function = copy.func;
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
  function _copyObj(obj, deep) {
    return deep ? _mergeDeep({}, obj) : _merge({}, obj);
  }

  /**
   * @private
   * @param {!Object} obj
   * @param {boolean=} deep
   * @return {!Array}
   */
  function _copyArr(obj, deep) {

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
  function _copyRegex(regex, forceGlobal) {

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
  function _copyFunc(func, deep) {

    /** @type {function} */
    var copiedFunc;

    copiedFunc = function copiedFunction() {
      return func.apply(null, arguments);
    };
    return deep ? _mergeDeep(copiedFunc, func) : _merge(copiedFunc, func);
  }

  //////////////////////////////////////////////////////////
  // PRIVATE PROPERTIES - COPY.REGEXP
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
        dest[key] = copy(source[key], true);
      }
    }
    return dest;
  }

  /**
   * @private
   * @type {!ErrorAid}
   */
  var _error = newErrorAid('copy');

  //////////////////////////////////////////////////////////
  // END OF PRIVATE SCOPE FOR COPY
  return copy;
})();


module.exports = copy;
