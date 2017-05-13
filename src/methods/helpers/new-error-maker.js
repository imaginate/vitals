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
  /// @func _setErrorProps
  /**
   * @private
   * @param {!Error} err
   * @param {string} name
   * @param {string} msg
   * @return {!Error} 
   */
  function _setErrorProps(err, name, msg) {
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
    return err;
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
     * @param {string} param
     * @param {string=} method
     * @return {!TypeError} 
     */
    function typeError(err, param, method) {

      /** @type {string} */
      var msg;

      param = _prepParam(param);
      method = _prepMethod(method);
      msg = 'invalid ' + param + ' data type for ' + method + ' call';
      return _setErrorProps(err, 'TypeError', msg);
    }

    /// {{{4
    /// @func rangeError
    /**
     * @param {!RangeError} err
     * @param {string} param
     * @param {string=} valid
     * @param {string=} method
     * @return {!RangeError} 
     */
    function rangeError(err, param, valid, method) {

      /** @type {string} */
      var msg;

      param = _prepParam(param);
      method = _prepMethod(method);
      msg = 'out-of-range ' + param + ' for ' + method + ' call';
      if (valid)
        msg += '\nvalid options:\n' + valid;
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
