/**
 * ---------------------------------------------------------------------------
 * $MK-ERR HELPER
 * ---------------------------------------------------------------------------
 * @version 5.0.0
 * @see [vitals](https://github.com/imaginate/vitals)
 *
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life>
 */

/// #{{{ @helper $mkErr
/**
 * @private
 * @param {string} superMethod
 * @param {string=} subMethod
 * @return {!ErrorMaker}
 */
var $mkErr = (function __vitals$mkErr__() {

  /// #{{{ @group constants

  /// #{{{ @const _CLOSE_DASH
  /**
   * @private
   * @const {!RegExp}
   */
  var _CLOSE_DASH = /-$/;
  /// #}}} @const _CLOSE_DASH

  /// #{{{ @const _OPEN_DASH
  /**
   * @private
   * @const {!RegExp}
   */
  var _OPEN_DASH = /^-/;
  /// #}}} @const _OPEN_DASH

  /// #{{{ @const _OPEN_HASH
  /**
   * @private
   * @const {!RegExp}
   */
  var _OPEN_HASH = /^#/;
  /// #}}} @const _OPEN_HASH

  /// #{{{ @const _OPEN_VITALS
  /**
   * @private
   * @const {!RegExp}
   */
  var _OPEN_VITALS = /^vitals\./;
  /// #}}} @const _OPEN_VITALS

  /// #{{{ @const _STRICT
  /**
   * @private
   * @const {!RegExp}
   */
  var _STRICT = /^\!/;
  /// #}}} @const _STRICT

  /// #}}} @group constants

  /// #{{{ @group helpers

  /// #{{{ @func _mkOptions
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

    len = opts['length'];
    i = -1;
    while (++i < len) {
      result += '\n    - `' + $print(opts[i], 1) + '`';
    }
    return result;
  }
  /// #}}} @func _mkOptions

  /// #{{{ @func _prepSuper
  /**
   * @private
   * @param {string} name
   * @return {string}
   */
  function _prepSuper(name) {
    name = name['replace'](_OPEN_VITALS, '');
    return 'vitals.' + name;
  }
  /// #}}} @func _prepSuper

  /// #{{{ @func _prepMethod
  /**
   * @private
   * @param {string} superMethod
   * @param {(string|undefined)} subMethod
   * @return {string} 
   */
  function _prepMethod(superMethod, subMethod) {

    /** @type {string} */
    var method;

    method = '`' + superMethod;
    if (!!subMethod) {
      method += '.' + subMethod;
    }
    method += '`';

    return method;
  }
  /// #}}} @func _prepMethod

  /// #{{{ @func _prepParam
  /**
   * @private
   * @param {string} name
   * @return {string}
   */
  function _prepParam(name) {
    return !!name
      ? _STRICT['test'](name)
        ? name['replace'](_STRICT, '')
        : _OPEN_HASH['test'](name)
          ? name
          : '#' + name
      : '';
  }
  /// #}}} @func _prepParam

  /// #{{{ @func _prepParamName
  /**
   * @private
   * @param {string} name
   * @return {string}
   */
  function _prepParamName(name) {

    if (!name) {
      return '';
    }

    name = name['replace'](_OPEN_HASH, '');
    name = name['replace'](/[ \t\.]+/g, '-');
    name = name['replace'](_OPEN_DASH, '');
    name = name['replace'](_CLOSE_DASH, '');

    return name;
  }
  /// #}}} @func _prepParamName

  /// #{{{ @func _setErrorProps
  /**
   * @private
   * @param {!Error} err
   * @param {string} name
   * @param {string} msg
   * @param {*=} val
   * @return {!Error}
   */
  function _setErrorProps(err, name, msg, val) {

    err['__VITALS__'] = $YES;
    err['VITALS'] = $YES;

    err['name'] = name;

    switch (name) {
      case 'TypeError':
        err['__TYPE__'] = $YES;
        err['TYPE'] = $YES;
        break;
      case 'RangeError':
        err['__RANGE__'] = $YES;
        err['RANGE'] = $YES;
        break;
    }

    err['message'] = msg;
    err['msg'] = msg;

    if (arguments['length'] > 3) {
      err['value'] = val;
      err['val'] = val;
    }

    return err;
  }
  /// #}}} @func _setErrorProps

  /// #}}} @group helpers

  /// #{{{ @func ErrorMaker
  /**
   * @private
   * @param {string} superMethod
   * @param {string=} subMethod
   * @constructor
   * @struct
   */
  function ErrorMaker(superMethod, subMethod) {
    superMethod = _prepSuper(superMethod);
    this.SUPER = superMethod;
    this.METHOD = _prepMethod(superMethod, subMethod);
  }
  /// #}}} @func ErrorMaker

  /// #{{{ @const ErrorMaker.prototype
  /**
   * @const {!Object<string, !function>}
   */
  ErrorMaker['prototype'] = $mkObj($NIL);
  /// #}}} @const ErrorMaker.prototype

  /// #{{{ @const ErrorMaker.prototype.constructor
  /**
   * @const {!Function}
   */
  ErrorMaker['prototype']['constructor'] = ErrorMaker;
  /// #}}} @const ErrorMaker.prototype.constructor

  /// #{{{ @func ErrorMaker.prototype.arrLike
  /**
   * @this {!ErrorMaker}
   * @param {!Error} err
   * @param {string} paramName
   * @param {(!Object|!Function)} paramVal
   * @return {!Error}
   */
  ErrorMaker['prototype'].arrLike = function makeArrayLikeError(
      err, paramName, paramVal) {

    /** @type {string} */
    var paramLen;
    /** @type {string} */
    var method;
    /** @type {string} */
    var param;
    /** @type {string} */
    var msg;
    /** @type {string} */
    var val;
    /** @type {*} */
    var len;

    method = this.METHOD;
    param = _prepParam(paramName);

    if ( !('length' in paramVal) || $is.void(paramVal['length']) ) {
      msg = 'undefined length in ' + param + ' for ' + method + ' call';
      return _setErrorProps(err, 'Error', msg, paramVal);
    }

    len = paramVal['length'];
    param += '.length';
    paramLen = $print(len, 1);
    paramName = _prepParamName(param);

    if ( !$is.num(len) ) {
      msg = 'invalid ' + param + ' data type for ' + method + ' call\n'
        + '    valid-data-types: `number`\n'
        + '    invalid-' + paramName + '-value: `' + paramLen + '`';
      return _setErrorProps(err, 'TypeError', msg, len);
    }

    msg = 'out-of-range ' + param + ' for ' + method + ' call\n'
      + '    valid-range-test: `isWholeNumber(length) && length >= 0`\n'
      + '    invalid-' + paramName + '-value: `' + paramLen + '`';

    return _setErrorProps(err, 'RangeError', msg, len);
  };
  /// #}}} @func ErrorMaker.prototype.arrLike

  /// #{{{ @func ErrorMaker.prototype.misc
  /**
   * @this {!ErrorMaker}
   * @param {!Error} err
   * @param {string} msg
   * @return {!Error}
   */
  ErrorMaker['prototype'].misc = function makeMiscError(err, msg) {

    /** @type {string} */
    var method;

    method = this.METHOD;
    msg += ' for ' + method + ' call';
    return _setErrorProps(err, 'Error', msg);
  };
  /// #}}} @func ErrorMaker.prototype.misc

  /// #{{{ @func ErrorMaker.prototype.noArg
  /**
   * @this {!ErrorMaker}
   * @param {!Error} err
   * @param {string} param
   * @return {!Error}
   */
  ErrorMaker['prototype'].noArg = function makeNoParamError(err, param) {

    /** @type {string} */
    var method;
    /** @type {string} */
    var msg;

    method = this.METHOD;
    param = _prepParam(param) + ' parameter';

    msg = 'missing required ' + param + ' for ' + method + ' call';

    return _setErrorProps(err, 'Error', msg);
  };
  /// #}}} @func ErrorMaker.prototype.noArg

  /// #{{{ @func ErrorMaker.prototype.range
  /**
   * @this {!ErrorMaker}
   * @param {!RangeError} err
   * @param {string} paramName
   * @param {(!Array<*>|string|undefined)=} validRange
   *   An `array` of actual valid options or a `string` stating the valid
   *   range. If `undefined` this option is skipped.
   * @return {!RangeError}
   */
  ErrorMaker['prototype'].range = function makeRangeError(
      err, paramName, validRange) {

    /** @type {string} */
    var method;
    /** @type {string} */
    var param;
    /** @type {string} */
    var msg;

    method = this.METHOD;
    param = _prepParam(paramName);

    msg = 'out-of-range ' + param + ' for ' + method + ' call';

    if ( $is.str(validRange) ) {
      msg += '\n    valid-range: `' + validRange + '`';
    }
    else if ( $is.arr(validRange) ) {
      msg += '\n    valid-options:' + _mkOptions(validRange);
    }

    return _setErrorProps(err, 'RangeError', msg);
  };
  /// #}}} @func ErrorMaker.prototype.range

  /// #{{{ @func ErrorMaker.prototype.type
  /**
   * @this {!ErrorMaker}
   * @param {!TypeError} err
   * @param {string} paramName
   * @param {*} paramVal
   * @param {string} validTypes
   * @return {!TypeError}
   */
  ErrorMaker['prototype'].type = function makeParamTypeError(
      err, paramName, paramVal, validTypes) {

    /** @type {string} */
    var method;
    /** @type {string} */
    var param;
    /** @type {string} */
    var msg;
    /** @type {string} */
    var val;

    method = this.METHOD;
    param = _prepParam(paramName);
    paramName = _prepParamName(param);
    val = $print(paramVal, 1);

    msg = 'invalid ' + param + ' data type for ' + method + ' call\n'
      + '    valid-data-types: `' + validTypes + '`\n'
      + '    invalid-' + paramName + '-value: `' + val + '`';

    return _setErrorProps(err, 'TypeError', msg, paramVal);
  };
  /// #}}} @func ErrorMaker.prototype.type

  /// #{{{ @func $mkErr
  /**
   * @param {string} superMethod
   * @param {string=} subMethod
   * @return {!ErrorMaker}
   */
  function $mkErr(superMethod) {
    return new ErrorMaker(superMethod);
  }
  /// #}}} @func $mkErr

  return $mkErr;
})();
/// #}}} @helper $mkErr

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
