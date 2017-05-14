/**
 * ---------------------------------------------------------------------------
 * $NEW-ERROR-MAKER HELPER
 * ---------------------------------------------------------------------------
 * @version 4.1.3
 * @see [vitals](https://github.com/imaginate/vitals)
 *
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2017 Adam A Smith <adam@imaginate.life> (https://imaginate.life)
 */

'use strict';

module.exports = $newErrorMaker;

///////////////////////////////////////////////////////////////////////// {{{2
// $NEW-ERROR-MAKER HELPER
//////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @param {string} main
 *   A vitals method.
 * @return {!Function}
 */
var $newErrorMaker = (function $newErrorMakerPrivateScope() {

  ///////////////////////////////////////////////////// {{{3
  // $NEW-ERROR-MAKER HELPERS
  //////////////////////////////////////////////////////////

  /// {{{4
  /// @const INDENT
  /**
   * @private
   * @const {string}
   */
  var INDENT = '    ';

  /// {{{4
  /// @const MAP_TYPE
  /**
   * @private
   * @const {!RegExp}
   */
  var MAP_TYPE = /^\[object ([a-zA-Z0-9_\$]+)\]$/;

  /// {{{4
  /// @const LAST_SEP
  /**
   * @private
   * @const {!RegExp}
   */
  var LAST_SEP = /,\n$/;

  /// {{{4
  /// @const OPEN_HASH
  /**
   * @private
   * @const {!RegExp}
   */
  var OPEN_HASH = /^#/;

  /// {{{4
  /// @const OPEN_VITALS
  /**
   * @private
   * @const {!RegExp}
   */
  var OPEN_VITALS = /^vitals\./;

  /// {{{4
  /// @func _arrToStr
  /**
   * @private
   * @param {(!Array|!Arguments)} val
   * @param {number} depth
   * @return {string}
   */
  function _arrToStr(val, depth) {

    /** @type {string} */
    var result;
    /** @type {string} */
    var indent;
    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    if ( $is.empty(val) )
      return '[]';

    indent = _mkIndent(depth);
    depth += 1;

    result = '[\n';
    len = val.length;
    i = -1;
    while (++i < len) {
      result += indent + i + ': ';
      result += _toStr(val[i], depth) + ',\n';
    }
    result = result.replace(LAST_SEP, '\n');
    return result + ']';
  }

  /// {{{4
  /// @func _escStr
  /**
   * @private
   * @param {string} val
   * @return {string}
   */
  function _escStr(val) {
    val = val.replace(/\\/g, '\\\\');
    val = val.replace(/\n/g, '\\n');
    val = val.replace(/\r/g, '\\r');
    val = val.replace(/\t/g, '\\t');
    val = val.replace(/\v/g, '\\v');
    val = val.replace(/\0/g, '\\0');
    val = val.replace(/\b/g, '\\b');
    val = val.replace(/\f/g, '\\f');
    return val;
  }

  /// {{{4
  /// @func _getMapType
  /**
   * @private
   * @param {*} val
   * @return {string}
   */
  function _getMapType(val) {

    /** @type {string} */
    var type;

    if ( $is.fun(val) ) {
      type = 'Function';
      if (val.name)
        type += '(' + val.name + ')';
      return type;
    }

    type = _objToStr.call(val);
    return MAP_TYPE.test(type)
      ? type.replace(MAP_TYPE, '$1')
      : 'UnknownObjectType';
  }

  /**
   * @private
   * @param {*} key
   * @return {string}
   */
  function _keyToStr(key) {
    return "'" + String(key) + "'";
  }

  /// {{{4
  /// @func _mapToStr
  /**
   * @private
   * @param {(!Object|!Function)} val
   * @param {number} depth
   * @return {string}
   */
  function _mapToStr(val, depth) {

    /** @type {string} */
    var result;

    result = _getMapType(val) + ': ';
    result += $is._arr(val)
      ? _arrToStr(val, depth)
      : _ownToStr(val, depth);
    return result;
  }

  /// {{{4
  /// @func _mkIndent
  /**
   * @private
   * @param {number} depth
   * @return {string}
   */
  function _mkIndent(depth) {

    /** @type {string} */
    var indent;

    if (indent < 1)
      return '';

    indent = '';
    while (depth--)
      indent += INDENT;
    return indent;
  }

  /// {{{4
  /// @func _mkOptions
  /**
   * @private
   * @param {!Array} opts
   * @return {string}
   */
  function _mkOptions(opts) {

    /** @type {string} */
    var result;
    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    result = '';

    len = opts.length;
    i = -1;
    while (++i < len)
      result += '\n- `' + _toStr(opts[i]) + '`';
    return result;
  }

  /// {{{4
  /// @func _objToStr
  /**
   * @private
   * @this {!Object}
   * @return {string}
   */
  var _objToStr = Object.prototype.toString;

  /// {{{4
  /// @func _ownToStr
  /**
   * @private
   * @param {(!Object|!Function)} val
   * @param {number} depth
   * @return {string}
   */
  function _ownToStr(val, depth) {

    /** @type {string} */
    var result;
    /** @type {string} */
    var indent;
    /** @type {string} */
    var key;

    if ( $is.empty(val) )
      return '{}';

    indent = _mkIndent(depth);
    depth += 1;

    result = '{\n';
    for (key in val) {
      if ( $own(val, key) ) {
        result += indent;
        result += _keyToStr(key) + ': ';
        result += _toStr(val[key], depth) + ',\n';
      }
    }
    result = result.replace(LAST_SEP, '\n');
    return result + '}';
  }

  /// {{{4
  /// @func _prepMainMethod
  /**
   * @private
   * @param {string} name
   * @return {string}
   */
  function _prepMainMethod(name) {
    name = name.replace(OPEN_VITALS, '');
    return 'vitals.' + name;
  }

  /// {{{4
  /// @func _prepParam
  /**
   * @private
   * @param {string} name
   * @return {string}
   */
  function _prepParam(name) {

    if (!name)
      return '';

    name = name.replace(OPEN_HASH, '');
    return '#' + name;
  }

  /// {{{4
  /// @func _primToStr
  /**
   * @private
   * @param {*} val
   * @return {string}
   */
  function _primToStr(val) {

    if ( $is.bool(val) )
      return val
        ? 'true'
        : 'false';

    if ( $is.nil(val) )
      return 'null';

    if ( $is.none(val) )
      return 'undefined';

    if ( $is.nan(val) )
      return 'NaN';

    if ( $is.str(val) )
      return '"' + _escStr(val) + '"';

    return String(val);
  }

  /// {{{4
  /// @func _setErrorProps
  /**
   * @private
   * @param {!Error} err
   * @param {string} name
   * @param {string} msg
   * @param {*=} val
   * @return {!Error} 
   */
  function _setErrorProps(err, name, msg, val) {
    err.__vitals = true;
    err.vitals = true;
    err.name = name;
    switch (name) {
      case 'TypeError':
        err.__type = true;
        err.type = true;
        break;
      case 'RangeError':
        err.__range = true;
        err.range = true;
        break;
    }
    err.message = msg;
    err.msg = msg;
    if (arguments.length > 3)
      err.val = val;
    return err;
  }

  /// {{{4
  /// @func _toStr
  /**
   * @private
   * @param {*} val
   * @param {number=} depth
   * @return {string}
   */
  function _toStr(val, depth) {
    depth = depth || 0;
    return $is._obj(val)
      ? $is.regx(val)
        ? val.toString();
        : _mapToStr(val, depth)
      : _primToStr(val);
  }

  ///////////////////////////////////////////////////// {{{3
  // $NEW-ERROR-MAKER METHOD
  //////////////////////////////////////////////////////////

  /**
   * @param {string} mainMethod
   * @return {!Function}
   */
  return function $newErrorMaker(mainMethod) {

    /// {{{4
    /// @const MAIN
    /**
     * @private
     * @const {string}
     */
    var MAIN = _prepMainMethod(mainMethod);

    /// {{{4
    /// @func _prepMethod
    /**
     * @private
     * @param {(string|undefined)} method
     * @return {string} 
     */
    function _prepMethod(method) {
      method = method
        ? MAIN
        : MAIN + '.' + method;
      return '`' + method + '`';
    }

    /// {{{4
    /// @func error
    /**
     * @param {!Error} err
     * @param {string} msg
     * @param {string=} method
     * @return {!Error} 
     */
    function error(err, msg, method) {
      method = _prepMethod(method);
      msg += ' for ' + method + ' call';
      return _setErrorProps(err, 'Error', msg);
    }

    /// {{{4
    /// @func typeError
    /**
     * @param {!TypeError} err
     * @param {string} paramName
     * @param {*} paramVal
     * @param {string} validTypes
     * @param {string=} methodName
     * @return {!TypeError} 
     */
    function typeError(err, paramName, paramVal, validTypes, methodName) {

      /** @type {string} */
      var method;
      /** @type {string} */
      var param;
      /** @type {string} */
      var msg;
      /** @type {string} */
      var val;

      method = _prepMethod(methodName);
      param = _prepParam(paramName);
      val = _toStr(paramVal);
      msg = 'invalid ' + param + ' data type for ' + method + ' call\n';
      msg += 'valid data types: `' + validTypes + '`\n';
      msg += 'actual ' + param + ' value: `' + val + '`';
      return _setErrorProps(err, 'TypeError', msg, paramVal);
    }

    /// {{{4
    /// @func rangeError
    /**
     * @param {!RangeError} err
     * @param {string} paramName
     * @param {(!Array<*>|string|undefined)=} validRange
     *   An `array` of actual valid options or a `string` stating the valid
     *   range. If `undefined` this option is skipped.
     * @param {string=} methodName
     * @return {!RangeError} 
     */
    function rangeError(err, paramName, validRange, methodName) {

      /** @type {string} */
      var method;
      /** @type {string} */
      var param;
      /** @type {string} */
      var msg;

      method = _prepMethod(methodName);
      param = _prepParam(paramName);
      msg = 'out-of-range ' + param + ' for ' + method + ' call';
      if ( $is.str(validRange) )
        msg += '\nvalid range: `' + validRange + '`';
      else if ( $is.arr(validRange) )
        msg += '\nvalid options:' + _mkOptions(validRange);
      return _setErrorProps(err, 'RangeError', msg);
    }
    /// }}}4

    /** @type {!Function} */
    var errorMaker;

    errorMaker = error;
    errorMaker.type = typeError;
    errorMaker.range = rangeError;
    return errorMaker;
  };
})();
/// }}}2

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
