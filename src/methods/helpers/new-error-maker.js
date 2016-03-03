/**
 * -----------------------------------------------------------------------------
 * VITALS HELPER: newErrorMaker
 * -----------------------------------------------------------------------------
 * @version 4.1.1
 * @see [vitals]{@link https://github.com/imaginate/vitals}
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2016 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Annotations:
 * @see [JSDoc3](http://usejsdoc.org)
 * @see [Closure Compiler JSDoc Syntax](https://developers.google.com/closure/compiler/docs/js-for-compiler)
 */

'use strict';

module.exports = newErrorMaker;


////////////////////////////////////////////////////////////////////////////////
// VITALS HELPER: newErrorMaker
////////////////////////////////////////////////////////////////////////////////

/**
 * @param {string} main - A vitals method.
 * @return {function}
 */
function newErrorMaker(main) {

  main = 'vitals.' + main;

  /**
   * @param {string} msg
   * @param {string=} method
   * @return {!Error} 
   */
  var maker = function error(msg, method) {

    /** @type {!Error} */
    var err;

    method = method ? main : main + '.' + method;
    err = new Error(msg + ' for ' + method + ' call.');
    err.__vitals = true;
    err.vitals = true;
    return err;
  };

  /**
   * @param {string} param
   * @param {string=} method
   * @return {!TypeError} 
   */
  maker.type = function typeError(param, method) {

    /** @type {!TypeError} */
    var err;

    param += ' param';
    method = method ? main : main + '.' + method;
    err = new TypeError('Invalid ' + param + ' in ' + method + ' call.');
    err.__vitals = true;
    err.vitals = true;
    return err;
  };

  /**
   * @param {string} param
   * @param {string=} valid
   * @param {string=} method
   * @return {!RangeError} 
   */
  maker.range = function rangeError(param, valid, method) {

    /** @type {!RangeError} */
    var err;
    /** @type {string} */
    var msg;

    param += ' param';
    method = method ? main : main + '.' + method;
    msg = 'The '+ param +' was out-of-range for a '+ method +' call.';
    msg += valid ? ' The valid options are: ' + valid : '';
    err = new RangeError(msg);
    err.__vitals = true;
    err.vitals = true;
    return err;
  };

  return maker;
}
