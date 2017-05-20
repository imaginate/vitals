/**
 * ---------------------------------------------------------------------------
 * VITALS.FUSE
 * ---------------------------------------------------------------------------
 * @section base
 * @version 4.1.3
 * @see [vitals.fuse](https://github.com/imaginate/vitals/wiki/vitals.fuse)
 *
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2017 Adam A Smith <adam@imaginate.life> (https://imaginate.life)
 */

'use strict';

var $newErrorMaker = require('./helpers/new-error-maker.js');
var $sliceArr = require('./helpers/slice-arr.js');
var $merge = require('./helpers/merge.js');
var $own = require('./helpers/own.js');
var $is = require('./helpers/is.js');

///////////////////////////////////////////////////////////////////////// {{{1
// VITALS.FUSE
//////////////////////////////////////////////////////////////////////////////

/**
 * @public
 * @const {!Function<string, !Function>}
 * @dict
 */
var fuse = (function fusePrivateScope() {

  //////////////////////////////////////////////////////////
  // PUBLIC METHODS
  // - fuse
  // - fuse.value       (fuse.val)
  // - fuse.value.start (fuse.value.top|fuse.val.start|fuse.val.top)
  // - fuse.object      (fuse.obj)
  // - fuse.array       (fuse.arr)
  // - fuse.string      (fuse.str)
  //////////////////////////////////////////////////////////

  /* {{{2 Fuse References
   * @ref [push]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push)
   * @ref [slice]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)
   * @ref [concat]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat)
   * @ref [unshift]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/unshift)
   */

  /// {{{2
  /// @method fuse
  /**
   * Merges objects, [concatenates][concat] arrays, appends properties to
   * objects and arrays, and combines strings.
   *
   * @public
   * @param {(!Object|!Function|!Array|!Arguments|string)} dest
   *   If #dest is an instance of `arguments`, it is [sliced][slice] into an
   *   `array` before any values are appended.
   * @param {...*} val
   *   All rules for #dest are shown in order of priority. The details are as
   *   follows (per #dest type):
   *   - *`!Object|!Function`*!$
   *     If only one `array` #val is provided, it is considered an `array` of
   *     values. Each `null` #val is skipped. Each `object` or `function` #val
   *     is merged with the #dest. All other values are converted to a
   *     `string` and appended as a new property key (if the key exists in the
   *     #dest, the property's value is reset to `undefined`).
   *   - *`!Array|!Arguments`*!$
   *     Each `null` #val is skipped. Each `array` #val is
   *     [concatenated][concat] to the #dest. All other values are
   *     [pushed][push] to the #dest.
   *   - *`string`*!$
   *     If only one `array` #val is provided, it is considered an `array` of
   *     values. Each #val is converted to a `string` and appended to the
   *     #dest.
   * @return {(!Object|!Function|!Array|string)}
   */
  function fuse(dest, val) {

    switch (arguments['length']) {
      case 0:
        throw $err(new Error, 'no #dest defined');

      case 1:
        throw $err(new Error, 'no #val defined');

      case 2:
        if ( $is.str(dest) )
          return $is.arr(val)
            ? _fuseStrs(dest, val)
            : _fuseStr(dest, val);

        if ( !$is._obj(dest) )
          throw $typeErr(new TypeError, 'dest', dest,
            '!Object|!Function|!Array|!Arguments|string');

        if ( $is.args(dest) )
          dest = $sliceArr(dest);

        return $is.arr(dest)
          ? _fuseArr(dest, val)
          : $is.arr(val)
            ? _fuseObjs(dest, val)
            : _fuseObj(dest, val);

      default:
        val = $sliceArr(arguments, 1);

        if ( $is.str(dest) )
          return _fuseStrs(dest, val);

        if ( !$is._obj(dest) )
          throw $typeErr(new TypeError, 'dest', dest,
            '!Object|!Function|!Array|!Arguments|string');

        if ( $is.args(dest) )
          dest = $sliceArr(dest);

        return $is.arr(dest)
          ? _fuseArrs(dest, val)
          : _fuseObjs(dest, val);
    }
  }

  /// {{{2
  /// @method fuse.value
  /// @alias fuse.val
  /**
   * Appends properties to an `object`, `function`, or `array` or strings to
   * a `string`.
   *
   * @public
   * @param {(!Object|!Function|!Array|!Arguments|string)} dest
   *   If #dest is an `arguments` instance, it is [sliced][slice] into an
   *   `array` before any values are appended.
   * @param {...*} val
   *   The details are as follows (per #dest type):
   *   - *`!Object|!Function`*!$
   *     Each #val is converted to a `string` and appended as a new property
   *     key to the #dest (if the key exists in the #dest, the property's
   *     value is reset to `undefined`).
   *   - *`!Array|!Arguments`*!$
   *     Each #val is [pushed][push] to the #dest.
   *   - *`string`*!$
   *     Each #val is converted to a `string` and appended to the #dest.
   * @return {(!Object|!Function|!Array|string)}
   */
  function fuseValue(dest, val) {

    switch (arguments['length']) {
      case 0:
        throw $err(new Error, 'no #dest defined', 'value');

      case 1:
        throw $err(new Error, 'no #val defined', 'value');

      case 2:
        if ( $is.str(dest) )
          return _fuseStr(dest, val);

        if ( !$is._obj(dest) )
          throw $typeErr(new TypeError, 'dest', dest,
            '!Object|!Function|!Array|!Arguments|string', 'value');

        if ( $is.args(dest) )
          dest = $sliceArr(dest);

        return $is.arr(dest)
          ? _fuseArrVal(dest, val)
          : _fuseObjVal(dest, val);

      default:
        val = $sliceArr(arguments, 1);

        if ( $is.str(dest) )
          return _fuseStrs(dest, val);

        if ( !$is._obj(dest) )
          throw $typeErr(new TypeError, 'dest', dest,
            '!Object|!Function|!Array|!Arguments|string', 'value');

        if ( $is.args(dest) )
          dest = $sliceArr(dest);

        return $is.arr(dest)
          ? _fuseArrsVal(dest, val)
          : _fuseObjsVal(dest, val);
    }
  }
  fuse['value'] = fuseValue;
  fuse['val'] = fuseValue;

  /// {{{2
  /// @method fuse.value.start
  /// @alias fuse.value.top
  /// @alias fuse.val.start
  /// @alias fuse.val.top
  /**
   * Appends to the #dest beginning properties for an `object`, `function`, or
   * `array` or strings for a `string`.
   *
   * @public
   * @param {(!Object|!Function|!Array|!Arguments|string)} dest
   *   If #dest is an instance of `arguments`, it is [sliced][slice] into an
   *   `array` before any values are appended.
   * @param {...*} val
   *   The details are as follows (per #dest type):
   *   - *`!Object|!Function`*!$
   *     Each #val is converted to a `string` and appended as a new property
   *     key to the #dest (if the key exists in the #dest, the property's
   *     value remains unchanged).
   *   - *`!Array|!Arguments`*!$
   *     Each #val is [unshifted][unshift] to the #dest.
   *   - *`string`*!$
   *     Each #val is converted to a `string` and appended to the beginning of
   *     the #dest.
   * @return {(!Object|!Function|!Array|string)}
   */
  function fuseValueStart(dest, val) {

    switch (arguments['length']) {
      case 0:
        throw $err(new Error, 'no #dest defined', 'value.start');

      case 1:
        throw $err(new Error, 'no #val defined', 'value.start');

      case 2:
        if ( $is.str(dest) )
          return _fuseStrTop(dest, val);

        if ( !$is._obj(dest) )
          throw $typeErr(new TypeError, 'dest', dest,
            '!Object|!Function|!Array|!Arguments|string', 'value.start');

        if ( $is.args(dest) )
          dest = $sliceArr(dest);

        return $is.arr(dest)
          ? _fuseArrValTop(dest, val)
          : _fuseObjValTop(dest, val);

      default:
        val = $sliceArr(arguments, 1);

        if ( $is.str(dest) )
          return _fuseStrsTop(dest, val);

        if ( !$is._obj(dest) )
          throw $typeErr(new TypeError, 'dest', dest,
            '!Object|!Function|!Array|!Arguments|string', 'value.start');

        if ( $is.args(dest) )
          dest = $sliceArr(dest);

        return $is.arr(dest)
          ? _fuseArrsValTop(dest, val)
          : _fuseObjsValTop(dest, val);
    }
  }
  fuse['value']['start'] = fuseValueStart;
  fuse['value']['top'] = fuseValueStart;
  fuse['val']['start'] = fuseValueStart;
  fuse['val']['top'] = fuseValueStart;

  /// {{{2
  /// @method fuse.object
  /// @alias fuse.obj
  /**
   * Appends and merges properties to an `object` or `function`.
   *
   * @public
   * @param {(!Object|!Function)} dest
   * @param {...*} val
   *   If only one `array` #val is provided, it is considered an `array` of
   *   values. The remaining details are as follows in order of priority (per
   *   #val type):
   *   - *`null`*!$
   *     The #val is skipped.
   *   - *`!Object|!Function`*!$
   *     The #val is merged with the #dest. If a key exists in the #val and
   *     #dest the #dest property's value is with replaced with the #val
   *     property's value.
   *   - *`*`*!$
   *     The #val is converted to a `string` and appended to the #dest as a
   *     new property key (if the key exists in the #dest, the property's
   *     value is reset to `undefined`).
   * @return {(!Object|!Function)}
   */
  function fuseObject(dest, val) {

    switch (arguments['length']) {
      case 0:
        throw $err(new Error, 'no #dest defined', 'object');

      case 1:
        throw $err(new Error, 'no #val defined', 'object');

      case 2:
        if ( !$is._obj(dest) )
          throw $typeErr(new TypeError, 'dest', dest, '!Object|!Function',
            'object');

        return $is.arr(val)
          ? _fuseObjs(dest, val)
          : _fuseObj(dest, val);

      default:
        if ( !$is._obj(dest) )
          throw $typeErr(new TypeError, 'dest', dest, '!Object|!Function',
            'object');

        val = $sliceArr(arguments, 1);
        return _fuseObjs(dest, val);
    }
  }
  fuse['object'] = fuseObject;
  fuse['obj'] = fuseObject;

  /// {{{2
  /// @method fuse.array
  /// @alias fuse.arr
  /**
   * [Pushes][push] values and [concatenates][concat] arrays to an `array`.
   *
   * @public
   * @param {(!Array|!Arguments)} dest
   *   If #dest is an instance of `arguments`, it is [sliced][slice] into an
   *   `array` before any values are appended.
   * @param {...*} val
   *   The details are as follows in order of priority (per #val type):
   *   - *`null`*!$
   *     The #val is skipped.
   *   - *`!Array`*!$
   *     The #val is [concatenated][concat] to the #dest.
   *   - *`*`*!$
   *     The #val is [pushed][push] to the #dest.
   * @return {!Array}
   */
  function fuseArray(dest, val) {

    switch (arguments['length']) {
      case 0:
        throw $err(new Error, 'no #dest defined', 'array');

      case 1:
        throw $err(new Error, 'no #val defined', 'array');

      case 2:
        if ( $is.args(dest) )
          dest = $sliceArr(dest);
        else if ( !$is.arr(dest) )
          throw $typeErr(new TypeError, 'dest', dest, '!Array|!Arguments',
            'array');

        return _fuseArr(dest, val);

      default:
        if ( $is.args(dest) )
          dest = $sliceArr(dest);
        else if ( !$is.arr(dest) )
          throw $typeErr(new TypeError, 'dest', dest, '!Array|!Arguments',
            'array');

        val = $sliceArr(arguments, 1);
        return _fuseArrs(dest, val);
    }
  }
  fuse['array'] = fuseArray;
  fuse['arr'] = fuseArray;

  /// {{{2
  /// @method fuse.string
  /// @alias fuse.str
  /**
   * Appends strings to a `string`.
   *
   * @public
   * @param {string} dest
   * @param {...*} val
   *   If only one `array` #val is provided, it is considered an `array` of
   *   values. Each #val is converted to a `string` and appended to the #dest.
   * @return {string}
   */
  function fuseString(dest, val) {

    switch (arguments['length']) {
      case 0:
        throw $err(new Error, 'no #dest defined', 'string');

      case 1:
        throw $err(new Error, 'no #val defined', 'string');

      case 2:
        if ( !$is.str(dest) )
          throw $typeErr(new TypeError, 'dest', dest, 'string', 'string');

        return $is.arr(val)
          ? _fuseStrs(dest, val)
          : _fuseStr(dest, val);

      default:
        if ( !$is.str(dest) )
          throw $typeErr(new TypeError, 'dest', dest, 'string', 'string');

        val = $sliceArr(arguments, 1);
        return _fuseStrs(dest, val);
    }
  }
  fuse['string'] = fuseString;
  fuse['str'] = fuseString;

  ///////////////////////////////////////////////////// {{{2
  // FUSE HELPERS - MAIN
  //////////////////////////////////////////////////////////

  /// {{{3
  /// @func _fuseObj
  /**
   * @private
   * @param {(!Object|!Function)} dest
   * @param {*} val
   * @return {(!Object|!Function)}
   */
  function _fuseObj(dest, val) {

    if ( $is._obj(val) )
      return $merge(dest, val);

    if ( !$is.nil(val) )
      dest[val] = NONE;

    return dest;
  }

  /// {{{3
  /// @func _fuseObjs
  /**
   * @private
   * @param {(!Object|!Function)} dest
   * @param {!Array<*>} vals
   * @return {(!Object|!Function)}
   */
  function _fuseObjs(dest, vals) {

    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    len = vals['length'];
    i = -1;
    while (++i < len)
      dest = _fuseObj(dest, vals[i]);
    return dest;
  }

  /// {{{3
  /// @func _fuseObjVal
  /**
   * @private
   * @param {(!Object|!Function)} dest
   * @param {*} val
   * @return {(!Object|!Function)}
   */
  function _fuseObjVal(dest, val) {
    dest[val] = NONE;
    return dest;
  }

  /// {{{3
  /// @func _fuseObjsVal
  /**
   * @private
   * @param {(!Object|!Function)} dest
   * @param {!Array<*>} vals
   * @return {(!Object|!Function)}
   */
  function _fuseObjsVal(dest, vals) {

    /** @type {*} */
    var val;
    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    len = vals['length'];
    i = -1;
    while (++i < len) {
      val = vals[i];
      dest[val] = NONE;
    }
    return dest;
  }

  /// {{{3
  /// @func _fuseObjValTop
  /**
   * @private
   * @param {(!Object|!Function)} dest
   * @param {*} val
   * @return {(!Object|!Function)}
   */
  function _fuseObjValTop(dest, val) {

    if ( !$own(dest, val) )
      dest[val] = NONE;

    return dest;
  }

  /// {{{3
  /// @func _fuseObjsValTop
  /**
   * @private
   * @param {(!Object|!Function)} dest
   * @param {!Array<*>} vals
   * @return {(!Object|!Function)}
   */
  function _fuseObjsValTop(dest, vals) {

    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    len = vals['length'];
    i = -1;
    while (++i < len)
      dest = _fuseObjValTop(dest, vals[i]);
    return dest;
  }

  /// {{{3
  /// @func _fuseArr
  /**
   * @private
   * @param {!Array} dest
   * @param {*} val
   * @return {!Array}
   */
  function _fuseArr(dest, val) {

    if ( $is.arr(val) )
      return dest['concat'](val);

    if ( !$is.nil(val) )
      dest['push'](val);

    return dest;
  }

  /// {{{3
  /// @func _fuseArrs
  /**
   * @private
   * @param {!Array} dest
   * @param {!Array<*>} vals
   * @return {!Array}
   */
  function _fuseArrs(dest, vals) {

    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    len = vals['length'];
    i = -1;
    while (++i < len)
      dest = _fuseArr(dest, vals[i]);
    return dest;
  }

  /// {{{3
  /// @func _fuseArrVal
  /**
   * @private
   * @param {!Array} dest
   * @param {*} val
   * @return {!Array}
   */
  function _fuseArrVal(dest, val) {
    dest['push'](val);
    return dest;
  }

  /// {{{3
  /// @func _fuseArrsVal
  /**
   * @private
   * @param {!Array} dest
   * @param {!Array<*>} vals
   * @return {!Array}
   */
  function _fuseArrsVal(dest, vals) {

    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    len = vals['length'];
    i = -1;
    while (++i < len)
      dest['push'](vals[i]);
    return dest;
  }

  /// {{{3
  /// @func _fuseArrValTop
  /**
   * @private
   * @param {!Array} dest
   * @param {*} val
   * @return {!Array}
   */
  function _fuseArrValTop(dest, val) {
    dest['unshift'](val);
    return dest;
  }

  /// {{{3
  /// @func _fuseArrsValTop
  /**
   * @private
   * @param {!Array} dest
   * @param {!Array<*>} vals
   * @return {!Array}
   */
  function _fuseArrsValTop(dest, vals) {

    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    len = vals['length'];
    i = -1;
    while (++i < len)
      dest['unshift'](vals[i]);
    return dest;
  }

  /// {{{3
  /// @func _fuseStr
  /**
   * @private
   * @param {string} dest
   * @param {*} val
   * @return {string}
   */
  function _fuseStr(dest, val) {
    return dest + val;
  }

  /// {{{3
  /// @func _fuseStrs
  /**
   * @private
   * @param {string} dest
   * @param {!Array<*>} vals
   * @return {string}
   */
  function _fuseStrs(dest, vals) {

    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    len = vals['length'];
    i = -1;
    while (++i < len)
      dest += vals[i];
    return dest;
  }

  /// {{{3
  /// @func _fuseStrTop
  /**
   * @private
   * @param {string} dest
   * @param {*} val
   * @return {string}
   */
  function _fuseStrTop(dest, val) {
    return val + dest;
  }

  /// {{{3
  /// @func _fuseStrsTop
  /**
   * @private
   * @param {string} dest
   * @param {!Array<*>} vals
   * @return {string}
   */
  function _fuseStrsTop(dest, vals) {

    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    len = vals['length'];
    i = -1;
    while (++i < len)
      dest = vals[i] + dest;
    return dest;
  }

  ///////////////////////////////////////////////////// {{{2
  // FUSE HELPERS - GENERAL
  //////////////////////////////////////////////////////////

  /// {{{3
  /// @const NONE
  /**
   * @private
   * @const {undefined}
   */
  var NONE = (function(){})();

  ///////////////////////////////////////////////////// {{{2
  // FUSE HELPERS - ERROR MAKERS
  //////////////////////////////////////////////////////////

  /// {{{3
  /// @const ERROR_MAKER
  /**
   * @private
   * @const {!Object<string, !function>}
   * @struct
   */
  var ERROR_MAKER = $newErrorMaker('fuse');

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

  // END OF PRIVATE SCOPE FOR VITALS.FUSE
  return fuse;
})();
/// }}}1

module.exports = fuse;

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
