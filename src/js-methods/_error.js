/**
 * -----------------------------------------------------------------------------
 * VITALS - JS METHOD - ERROR HELPER
 * -----------------------------------------------------------------------------
 * @version 0.1.0
 * @see [vitals]{@link https://github.com/imaginate/vitals/tree/master/src/parts/js-methods/}
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


////////////////////////////////////////////////////////////////////////////////
// PRIVATE HELPER - ERROR
////////////////////////////////////////////////////////////////////////////////

/**
 * @public
 * @param {string} vitalsMethod
 * @return {!ErrorHelper}
 */
module.exports = function makeErrorHelper(vitalsMethod) {
  return new ErrorHelper(vitalsMethod);
};

/**
 * @param {string} vitalsMethod
 * @constructor
 */
function ErrorHelper(vitalsMethod) {

  vitalsMethod = 'vitals.' + vitalsMethod;

  /**
   * @param {string} msg
   * @param {string=} method
   * @return {!Error} 
   */
  this.error = function error(msg, method) {
    method = method || '';
    method = vitalsMethod + ( method && '.' ) + method;
    return new Error(msg + ' for ' + method + ' call.');
  };

  /**
   * @param {string} param
   * @param {string=} method
   * @return {!TypeError} 
   */
  this.error.type = function typeError(param, method) {
    param += ' param';
    method = method || '';
    method = vitalsMethod + ( method && '.' ) + method;
    return new TypeError('Invalid ' + param + ' in ' + method + ' call.');
  };
}
