/**
 * ---------------------------------------------------------------------------
 * VITALS.COPY
 * ---------------------------------------------------------------------------
 * @section base
 * @version 4.1.3
 * @see [vitals.copy](https://github.com/imaginate/vitals/wiki/vitals.copy)
 *
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2017 Adam A Smith <adam@imaginate.life> (https://imaginate.life)
 */

'use strict';

var $newErrorMaker = require('./helpers/new-error-maker.js');
var $isNone = require('./helpers/is-none.js');
var $inStr = require('./helpers/in-str.js');
var $merge = require('./helpers/$merge.js');
var $own = require('./helpers/own.js');
var $is = require('./helpers/is.js');

///////////////////////////////////////////////////////////////////////// {{{1
// VITALS.COPY
//////////////////////////////////////////////////////////////////////////////

/**
 * @public
 * @const {!Function<string, !Function>}
 * @dict
 */
var copy = (function copyPrivateScope() {

  //////////////////////////////////////////////////////////
  // PUBLIC METHODS
  // - copy
  // - copy.object (copy.obj)
  // - copy.array  (copy.arr|copy.args)
  // - copy.regexp (copy.re|copy.regex)
  // - copy.func   (copy.fn|copy.function*)
  //
  // * Note that `vitals.copy.function` will fail in all ES3
  //   and some ES5 browser and other platform environments.
  //   Use `vitals.copy.func` for compatibility with older
  //   environments.
  //////////////////////////////////////////////////////////

  /* {{{2 Copy References
   * @ref [clone]:(https://en.wikipedia.org/wiki/Cloning_(programming))
   * @ref [ecma3]:(http://www.ecma-international.org/publications/files/ECMA-ST-ARCH/ECMA-262,%203rd%20edition,%20December%201999.pdf)
   * @ref [ecma5]:(http://www.ecma-international.org/ecma-262/5.1/index.html)
   * @ref [minify]:(https://en.wikipedia.org/wiki/Minification_(programming))
   * @ref [regex-global]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/global)
   * @ref [func-length]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/length)
   * @ref [func-name]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/name)
   */

  /// {{{2
  /// @method copy
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

    if (arguments['length'] < 1)
      throw $err(new Error, 'no #val defined');
    if ( !$isNone.bool(deep) )
      throw $typeErr(new TypeError, 'deep', deep, 'boolean=');

    return !$is._obj(val)
      ? val
      : $is.fun(val)
        ? _copyFunc(val, deep)
        : $is._arr(val)
          ? _copyArr(val, deep)
          : $is.regx(val)
            ? _copyRegex(val)
            : _copyObj(val, deep);  
  }

  /// {{{2
  /// @method copy.object
  /// @alias copy.obj
  /**
   * Makes a [copy][clone] of an `object`.
   *
   * @public
   * @param {!Object} obj
   * @param {boolean=} deep = `false`
   *   Whether to recursively copy property values.
   * @return {!Object}
   */
  function copyObject(obj, deep) {

    if ( !$is.obj(obj) )
      throw $typeErr(new TypeError, 'obj', obj, '!Object', 'object');
    if ( !$isNone.bool(deep) )
      throw $typeErr(new TypeError, 'deep', deep, 'boolean=', 'object');

    return _copyObj(obj, deep);
  }
  copy['object'] = copyObject;
  copy['obj'] = copyObject;

  /// {{{2
  /// @method copy.array
  /// @alias copy.arr
  /// @alias copy.args
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
  function copyArray(obj, deep) {

    /** @type {number} */
    var len;

    if ( !$is.obj(obj) )
      throw $typeErr(new TypeError, 'obj', obj, '!Array|!Object', 'array');
    if ( !$isNone.bool(deep) )
      throw $typeErr(new TypeError, 'deep', deep, 'boolean=', 'array');

    len = obj['length'];

    if ( !$is.num(len) )
      throw $typeErr(new TypeError, 'obj.length', len, 'number', 'array');
    if ( !$is.whole(len) || len < 0 )
      throw $err(new Error, 'invalid #obj.length `number` (' +
        'must be `0` or a positive whole `number`)', 'array');

    return _copyArr(obj, deep);
  }
  copy['array'] = copyArray;
  copy['arr'] = copyArray;
  copy['args'] = copyArray;

  /// {{{2
  /// @method copy.regexp
  /// @alias copy.regex
  /// @alias copy.re
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
  function copyRegexp(regex, forceGlobal) {

    if ( !$is.regx(regex) )
      throw $typeErr(new TypeError, 'regex', regex, '!RegExp', 'regexp');
    if ( !$isNone.bool(forceGlobal) )
      throw $typeErr(new TypeError, 'forceGlobal', forceGlobal, 'boolean=',
        'regexp');

    return _copyRegex(regex, forceGlobal);
  }
  copy['regexp'] = copyRegexp;
  copy['re'] = copyRegexp;
  copy['regex'] = copyRegexp;

  /// {{{2
  /// @method copy.func
  /// @alias copy.function
  /// @alias copy.fn
  /**
   * Makes a [copy][clone] of a `function`. Note that all properties will be
   * transferred except for the [length property][func-length] which will be
   * set to `0` and the [name property][func-name] which will be set to
   * `"funcCopy"` for [unminified][minify] `vitals` sources. Also note that
   * `vitals.copy.function` is not valid in [ES3][ecma3] and some [ES5][ecma5]
   * browser and other platform environments. Use `vitals.copy.func` for
   * browser and platform safety.
   *
   * @public
   * @param {!function} func
   * @param {boolean=} deep = `false`
   *   Whether to recursively copy property values.
   * @return {!function}
   */
  function copyFunction(func, deep) {

    if ( !$is.fun(func) )
      throw $typeErr(new TypeError, 'func', func, '!function', 'function');
    if ( !$isNone.bool(deep) )
      throw $typeErr(new TypeError, 'deep', deep, 'boolean=', 'function');

    return _copyFunc(func, deep);
  }
  copy['func'] = copyFunction;
  try {
    copy['fn'] = copyFunction;
    copy['function'] = copyFunction;
  }
  catch (e) {}

  ///////////////////////////////////////////////////// {{{2
  // COPY HELPERS - MAIN
  //////////////////////////////////////////////////////////

  /// {{{3
  /// @func _copyObj
  /**
   * @private
   * @param {!Object} obj
   * @param {boolean=} deep
   * @return {!Object}
   */
  function _copyObj(obj, deep) {
    return deep
      ? _mergeDeep({}, obj)
      : $merge({}, obj);
  }

  /// {{{3
  /// @func _copyArr
  /**
   * @private
   * @param {!Object} obj
   * @param {boolean=} deep
   * @return {!Array}
   */
  function _copyArr(obj, deep) {

    /** @type {!Array} */
    var arr;

    arr = new Array(obj['length']);
    return deep
      ? _mergeDeep(arr, obj)
      : $merge(arr, obj);
  }

  /// {{{3
  /// @func _copyRegex
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

    source = _escape(regex['source']);
    flags = _setupFlags(regex, forceGlobal);

    return flags
      ? new RegExp(source, flags)
      : new RegExp(source);
  }

  /// {{{3
  /// @func _copyFunc
  /**
   * @private
   * @param {!function} func
   * @param {boolean=} deep
   * @return {!function}
   */
  function _copyFunc(func, deep) {

    /** @type {!function} */
    var funcCopy;

    funcCopy = function funcCopy() {
      return func['apply'](null, arguments);
    };
    return deep
      ? _mergeDeep(funcCopy, func)
      : $merge(funcCopy, func);
  }

  ///////////////////////////////////////////////////// {{{2
  // COPY HELPERS - REGEXP
  //////////////////////////////////////////////////////////

  /// {{{3
  /// @func _escape
  /**
   * Returns a properly escaped `RegExp.prototype.source`.
   *
   * @private
   * @param {string} source
   * @return {string}
   */
  var _escape = (function() {

    /** @type {?RegExp} */
    var pattern;

    pattern = /\n/['source'] !== '\\n'
      ? /\\/g
      : null;
    return pattern
      ? function _escape(source) {
          return source['replace'](pattern, '\\\\');
        }
      : function _escape(source) {
          return source;
        };
  })();

  /// {{{3
  /// @const FLAGS
  /**
   * @private
   * @const {!Object<string, string>}
   * @dict
   */
  var FLAGS = (function _RegExpFlagsPrivateScope() {

    /**
     * @type {!Object<string, string>}
     * @dict
     */
    var flags;

    /**
     * @private
     * @const {!Object<string, string>}
     * @dict
     */
    var PROTO = RegExp['prototype'];

    flags = {};
    flags['ignoreCase'] = 'i';
    flags['multiline'] = 'm';
    flags['global'] = 'g';

    if ('sticky' in PROTO)
      flags['sticky'] = 'y';
    if ('unicode' in PROTO)
      flags['unicode'] = 'u';

    return flags;
  })();

  /// {{{3
  /// @func _setupFlags
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
      if ( $own(FLAGS, key) && regex[key] )
        flags += FLAGS[key];
    }

    if ( $is.none(forceGlobal) )
      return flags;

    return $inStr(flags, 'g')
      ? forceGlobal
        ? flags
        : flags['replace']('g', '')
      : forceGlobal
        ? flags + 'g'
        : flags;
  }

  ///////////////////////////////////////////////////// {{{2
  // COPY HELPERS - GENERAL
  //////////////////////////////////////////////////////////

  /// {{{3
  /// @const NONE
  /**
   * @private
   * @const {undefined}
   */
  var NONE = (function(){})();

  /// {{{3
  /// @func _mergeDeep
  /**
   * @private
   * @param {(!Object|!Function)} dest
   * @param {(!Object|!Function)} source
   * @return {(!Object|!Function)}
   */
  function _mergeDeep(dest, source) {

    /** @type {string} */
    var key;

    for (key in source) {
      if ( $own(source, key) )
        dest[key] = copy(source[key], true);
    }
    return dest;
  }

  ///////////////////////////////////////////////////// {{{2
  // COPY HELPERS - ERROR MAKERS
  //////////////////////////////////////////////////////////

  /// {{{3
  /// @const ERROR_MAKER
  /**
   * @private
   * @const {!Object<string, !function>}
   * @struct
   */
  var ERROR_MAKER = $newErrorMaker('copy');

  /// {{{3
  /// @func $err
  /**
   * @private
   * @param {!Error} err
   * @param {string} msg
   * @param {string=} method
   * @return {!Error} 
   */
  var $err = ERROR_MAKER.error;

  /// {{{3
  /// @func $typeErr
  /**
   * @private
   * @param {!TypeError} err
   * @param {string} paramName
   * @param {*} paramVal
   * @param {string} validTypes
   * @param {string=} methodName
   * @return {!TypeError} 
   */
  var $typeErr = ERROR_MAKER.typeError;

  /// {{{3
  /// @func $rangeErr
  /**
   * @private
   * @param {!RangeError} err
   * @param {string} paramName
   * @param {(!Array<*>|string|undefined)=} validRange
   *   An `array` of actual valid options or a `string` stating the valid
   *   range. If `undefined` this option is skipped.
   * @param {string=} methodName
   * @return {!RangeError} 
   */
  var $rangeErr = ERROR_MAKER.rangeError;
  /// }}}2

  // END OF PRIVATE SCOPE FOR VITALS.COPY
  return copy;
})();
/// }}}1

module.exports = copy;

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
