/**
 * -----------------------------------------------------------------------------
 * VITALS - JS METHOD - ERROR HELPER
 * -----------------------------------------------------------------------------
 * @version 4.0.0
 * @see [vitals]{@link https://github.com/imaginate/vitals/tree/master/src/methods}
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2016 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Annotations:
 * @see [JSDoc3]{@link http://usejsdoc.org/}
 * @see [Closure Compiler specific JSDoc]{@link https://developers.google.com/closure/compiler/docs/js-for-compiler}
 */

'use strict';

module.exports = newErrorAid;


////////////////////////////////////////////////////////////////////////////////
// PRIVATE HELPER - ERROR-AID
////////////////////////////////////////////////////////////////////////////////

/**
 * @typedef {function(string, string=): !Error} ErrorAid
 */

/**
 * The ErrorAid constructor.
 * @param {string} vitalsMethod
 * @return {!ErrorAid}
 */
function newErrorAid(vitalsMethod) {

  /** @type {!ErrorAid} */
  var errorAid;

  vitalsMethod = 'vitals.' + vitalsMethod;

  /**
   * @param {string} msg
   * @param {string=} method
   * @return {!Error} 
   */
  errorAid = function error(msg, method) {

    /** @type {!Error} */
    var error;

    method = method || '';
    method = vitalsMethod + ( method && '.' ) + method;
    error = new Error(msg + ' for ' + method + ' call.');
    error.__vitals = true;
    return true;
  };

  /**
   * @param {string} param
   * @param {string=} method
   * @return {!TypeError} 
   */
  errorAid.type = function typeError(param, method) {

    /** @type {!TypeError} */
    var error;

    param += ' param';
    method = method || '';
    method = vitalsMethod + ( method && '.' ) + method;
    error = new TypeError('Invalid ' + param + ' in ' + method + ' call.');
    error.__vitals = true;
    return error;
  };

  /**
   * @param {string} param
   * @param {string=} valid
   * @param {string=} method
   * @return {!RangeError} 
   */
  errorAid.range = function rangeError(param, valid, method) {

    /** @type {!RangeError} */
    var error;
    /** @type {string} */
    var msg;

    param += ' param';
    method = method || '';
    method = vitalsMethod + ( method && '.' ) + method;
    msg = 'The '+ param +' was out-of-range for a '+ method +' call.';
    msg += valid ? ' The valid options are: ' + valid : '';
    error = new RangeError(msg);
    error.__vitals = true;
    return error;
  };

  return errorAid;
}
