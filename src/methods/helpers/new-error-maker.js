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
function $newErrorMaker(main) {

  /// {{{3
  /// @const MAIN
  /**
   * @private
   * @const {string}
   */
  var MAIN = 'vitals.' + main;

  /// {{{3
  /// @func cleanError
  /**
   * @private
   * @param {!Error} err
   * @param {string} name
   * @param {string} msg
   * @return {!Error} 
   */
  function errorMark(err, name, msg) {
    err.__vitals = true;
    err.vitals = true;
    err.name = name;
    err.message = msg;
    err.msg = msg;
    return err;
  }

  /// {{{3
  /// @func error
  /**
   * @param {string} msg
   * @param {string=} method
   * @return {!Error} 
   */
  function error(msg, method) {

    /** @type {!Error} */
    var err;

    method = method
      ? MAIN
      : MAIN + '.' + method;
    msg += ' for ' + method + ' call.';
    err = new Error(msg);
    return cleanError(err, 'Error', msg);
  }

  /// {{{3
  /// @func typeError
  /**
   * @param {string} param
   * @param {string=} method
   * @return {!TypeError} 
   */
  function typeError(param, method) {

    /** @type {!TypeError} */
    var err;
    /** @type {string} */
    var msg;

    param += ' param';
    method = method
      ? MAIN
      : MAIN + '.' + method;
    msg = 'Invalid ' + param + ' in ' + method + ' call.';
    err = new TypeError(msg);
    return cleanError(err, 'TypeError', msg);
  }

  /// {{{3
  /// @func rangeError
  /**
   * @param {string} param
   * @param {string=} valid
   * @param {string=} method
   * @return {!RangeError} 
   */
  function rangeError(param, valid, method) {

    /** @type {!RangeError} */
    var err;
    /** @type {string} */
    var msg;

    param += ' param';
    method = method
      ? MAIN
      : MAIN + '.' + method;
    msg = 'The '+ param +' was out-of-range for a '+ method +' call.';
    if (valid)
      msg += ' The valid options are: ' + valid;
    err = new RangeError(msg);
    return cleanError(err, 'RangeError', msg);
  }
  /// }}}3

  /** @type {!Function} */
  var errorMaker;

  errorMaker = error;
  errorMaker.type = typeError;
  errorMaker.range = rangeError;

  return errorMaker;
}
/// }}}2

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
