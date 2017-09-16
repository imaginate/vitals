/**
 * ---------------------------------------------------------------------------
 * $MK-ERRS HELPER
 * ---------------------------------------------------------------------------
 * @version 5.0.0
 * @see [vitals](https://github.com/imaginate/vitals)
 *
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life>
 */

/// #{{{ @helper $mkErrs
/**
 * @private
 * @param {string=} superMethod
 * @return {!Object<string, !function>}
 */
var $mkErrs = (function $mkErrsPrivateScope() {

  /// #{{{ @group constants

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
    return !!name
      ? name['replace'](_OPEN_HASH, '')['replace'](/[ \t]+/g, '-')
      : '';
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
    err['__vitals__'] = $YES;
    err['__vitals'] = $YES;
    err['vitals'] = $YES;
    err['name'] = name;
    switch (name) {
      case 'TypeError':
        err['__type__'] = $YES;
        err['__type'] = $YES;
        err['type'] = $YES;
        break;
      case 'RangeError':
        err['__range__'] = $YES;
        err['__range'] = $YES;
        err['range'] = $YES;
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

  /// #{{{ @func $mkErrs
  /**
   * @param {string=} superMethod
   * @return {!Object<string, !function>}
   */
  function $mkErrs(superMethod) {

    /// #{{{ @const MK_ERR
    /**
     * @const {!Object<string, !function>}
     * @struct
     */
    var MK_ERR = {
      MAIN: error,
      TYPE: typeError,
      RANGE: rangeError
    };
    /// #}}} @const MK_ERR

    /// #{{{ @const _SUPER
    /**
     * @private
     * @const {string}
     */
    var _SUPER = _prepSuper(superMethod);
    /// #}}} @const _SUPER

    /// #{{{ @func _prepMethod
    /**
     * @private
     * @param {(string|undefined)} method
     * @return {string} 
     */
    function _prepMethod(method) {
      method = !!method
        ? _SUPER + '.' + method
        : _SUPER;
      return '`' + method + '`';
    }
    /// #}}} @func _prepMethod

    /// #{{{ @func error
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
    /// #}}} @func error

    /// #{{{ @func typeError
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
      paramName = _prepParamName(param);
      val = $print(paramVal, 1);

      msg = 'invalid ' + param + ' data type for ' + method + ' call\n'
        + '    valid-data-types: `' + validTypes + '`\n'
        + '    invalid-' + paramName + '-value: `' + val + '`';

      return _setErrorProps(err, 'TypeError', msg, paramVal);
    }
    /// #}}} @func typeError

    /// #{{{ @func rangeError
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

      if ( $is.str(validRange) ) {
        msg += '\n    valid-range: `' + validRange + '`';
      }
      else if ( $is.arr(validRange) ) {
        msg += '\n    valid-options:' + _mkOptions(validRange);
      }

      return _setErrorProps(err, 'RangeError', msg);
    }
    /// #}}} @func rangeError

    return MK_ERR;
  }
  /// #}}} @func $mkErrs

  return $mkErrs;
})();
/// #}}} @helper $mkErrs

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
