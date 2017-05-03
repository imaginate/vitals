/**
 * -----------------------------------------------------------------------------
 * VITALS METHOD: copy
 * -----------------------------------------------------------------------------
 * @section base
 * @version 4.1.3
 * @see [vitals.copy](https://github.com/imaginate/vitals/wiki/vitals.copy)
 *
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2017 Adam A Smith <adam@imaginate.life> (https://imaginate.life)
 *
 * @see [JSDoc3](http://usejsdoc.org)
 * @see [Closure Compiler JSDoc](https://developers.google.com/closure/compiler/docs/js-for-compiler)
 */

'use strict';

var newErrorMaker = require('./helpers/new-error-maker.js');
var inStr = require('./helpers/in-str.js');
var merge = require('./helpers/merge.js');
var own = require('./helpers/own.js');
var _is = require('./helpers/is.js');


////////////////////////////////////////////////////////////////////////////////
// VITALS METHOD: copy
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
   * @ref [clone]:(https://en.wikipedia.org/wiki/Cloning_(programming))
   * @ref [ecma3]:(http://www.ecma-international.org/publications/files/ECMA-ST-ARCH/ECMA-262,%203rd%20edition,%20December%201999.pdf)
   * @ref [ecma5]:(http://www.ecma-international.org/ecma-262/5.1/index.html)
   * @ref [minify]:(https://en.wikipedia.org/wiki/Minification_(programming))
   * @ref [regex-global]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/global)
   * @ref [func-length]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/length)
   * @ref [func-name]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/name)
   */

  /**
   * Makes a [copy][clone] of any value. Note that for `array` values @slice 
   * only copies the indexed properties while @copy copies all of the
   * properties.
   *
   * @public
   * @param {*} val
   *   The value to copy.
   * @param {boolean=} deep = `false`
   *   Whether to recursively copy property values for an `object` or
   *   `function`.
   * @return {*}
   */
  function copy(val, deep) {

    if (arguments.length < 1)
      throw _error('Missing a val');
    if ( !_is.un.bool(deep) )
      throw _error.type('deep');

    return !_is._obj(val)
      ? val
      : _is.func(val)
        ? _copyFunc(val, deep)
        : _is._arr(val)
          ? _copyArr(val, deep)
          : _is.regex(val)
            ? _copyRegex(val)
            : _copyObj(val, deep);  
  }

  /**
   * Makes a [copy][clone] of an `object`.
   *
   * @public
   * @param {!Object} obj
   * @param {boolean=} deep = `false`
   *   Whether to recursively copy property values.
   * @return {!Object}
   */
  copy.object = function copyObject(obj, deep) {

    if ( !_is.obj(obj) )
      throw _error.type('obj', 'object');
    if ( !_is.un.bool(deep) )
      throw _error.type('deep', 'object');

    return _copyObj(obj, deep);
  };
  // define shorthand
  copy.obj = copy.object;

  /**
   * Makes a [copy][clone] of an `array` or array-like `object`. Note that
   * @slice#array only copies the indexed properties while @copy#array copies
   * all of the properties.
   *
   * @public
   * @param {(!Array|!Object)} obj
   *   Must be an `array` or array-like `object`.
   * @param {boolean=} deep = `false`
   *   Whether to recursively copy property values.
   * @return {!Array}
   */
  copy.array = function copyArray(obj, deep) {

    if ( !_is.obj(obj) )
      throw _error.type('obj', 'array');
    if ( !_is.num(obj.length) )
      throw _error.type('obj.length', 'array');
    if ( !_is.un.bool(deep) )
      throw _error.type('deep', 'array');

    return _copyArr(obj, deep);
  };
  // define shorthand
  copy.arr = copy.array;
  copy.args = copy.array;

  /**
   * Makes a [copy][clone] of a `RegExp`.
   *
   * @public
   * @param {!RegExp} regex
   * @param {boolean=} forceGlobal = `undefined`
   *   Override the [global setting][regex-global] for the returned `RegExp`.
   *   If `undefined` the original value from #regex is used.
   * @return {!RegExp}
   */
  copy.regexp = function copyRegexp(regex, forceGlobal) {

    if ( !_is.regex(regex) )
      throw _error.type('regex', 'regexp');
    if ( !_is.un.bool(forceGlobal) )
      throw _error.type('forceGlobal', 'regexp');

    return _copyRegex(regex, forceGlobal);
  };
  // define shorthand
  copy.re = copy.regexp;
  copy.regex = copy.regexp;

  /**
   * Makes a [copy][clone] of a `function`. Note that all properties will be
   * transferred except for the [length property][func-length] which will be set
   * to `0` and the [name property][func-name] which will be set to `"funcCopy"`
   * for [unminified][minify] `vitals` sources. Also note that
   * `vitals.copy.function` is not valid in [ES3][ecma3] and some [ES5][ecma5]
   * browser environments. Use `vitals.copy.func` for browser safety.
   *
   * @public
   * @param {function} func
   * @param {boolean=} deep = `false`
   *   Whether to recursively copy property values.
   * @return {function}
   */
  copy.func = function copyFunction(func, deep) {

    if ( !_is.func(func) )
      throw _error.type('func', 'function');
    if ( !_is.un.bool(deep) )
      throw _error.type('deep', 'function');

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
    return deep
      ? _mergeDeep({}, obj)
      : merge({}, obj);
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
    return deep
      ? _mergeDeep(arr, obj)
      : merge(arr, obj);
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

    return flags
      ? new RegExp(source, flags)
      : new RegExp(source);
  }

  /**
   * @private
   * @param {function} func
   * @param {boolean=} deep
   * @return {function}
   */
  function _copyFunc(func, deep) {

    /** @type {function} */
    var funcCopy;

    funcCopy = function funcCopy() {
      return func.apply(null, arguments);
    };
    return deep
      ? _mergeDeep(funcCopy, func)
      : merge(funcCopy, func);
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
    var pattern;

    pattern = /\n/.source !== '\\n'
      ? /\\/g
      : null;
    return pattern
      ? function _escape(source) {
          return source.replace(pattern, '\\\\');
        }
      : function _escape(source) {
          return source;
        };
  })();

  /**
   * @private
   * @const {!Object}
   */
  var FLAGS = (function() {

    /** @type {!Object} */
    var flags;

    flags = {
      'ignoreCase': 'i',
      'multiline': 'm',
      'global': 'g'
    };

    if ('sticky' in RegExp.prototype)
      flags.sticky = 'y';
    if ('unicode' in RegExp.prototype)
      flags.unicode = 'u';

    return flags;
  })();

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
      if ( own(FLAGS, key) && regex[key] )
        flags += FLAGS[key];
    }

    if ( _is.undefined(forceGlobal) )
      return flags;

    return inStr(flags, 'g')
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
   * @param {(!Object|function)} dest
   * @param {(!Object|function)} source
   * @return {(!Object|function)}
   */
  function _mergeDeep(dest, source) {

    /** @type {string} */
    var key;

    for (key in source) {
      if ( own(source, key) )
        dest[key] = copy(source[key], true);
    }
    return dest;
  }

  /**
   * @private
   * @type {!ErrorAid}
   */
  var _error = newErrorMaker('copy');

  //////////////////////////////////////////////////////////
  // END OF PRIVATE SCOPE FOR COPY
  return copy;
})();


module.exports = copy;
