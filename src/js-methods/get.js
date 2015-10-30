/**
 * -----------------------------------------------------------------------------
 * VITALS - JS SHORTCUTS - KEYS
 * -----------------------------------------------------------------------------
 * @version 0.1.0
 * @see [vitals.keys]{@link https://github.com/imaginate/vitals/blob/master/src/parts/js-shortcuts/keys.js}
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

var is = require('node-are').is;
var has = require('./has.js');


////////////////////////////////////////////////////////////////////////////////
// GET
////////////////////////////////////////////////////////////////////////////////

var get = (function getPrivateScope() {

  /**
   * @public
   * @type {function}
   */
  function get() {}

  /**
   * Gets an object's property keys.
   * @public
   * @param {?(Object|function)} obj
   * @return {Array<string>}
   */
  get.keys = function getKeys(obj) {

    if ( is.null(obj) ) return null;

    if ( !is._obj(obj) ) throw _error('obj', 'keys');

    return _getKeys(obj);
  };

  /**
   * @private
   * @param {!(Object|function)} obj
   * @return {!Array<string>}
   */
  function _getKeys(obj) {

    /** @type {string} */
    var key;
    /** @type {!Array<string>} */
    var arr;

    arr = [];
    for (key in obj) has.key(obj, key) && arr.push(key);
    return arr;
  }

  /**
   * @private
   * @param {string} param
   * @param {string=} method
   * @return {!TypeError} 
   */
  function _error(param, method) {
    param += ' param';
    method = method || '';
    method = 'vitals.get' + ( method && '.' ) + method;
    return new TypeError('Invalid ' + param + ' in ' + method + ' call.');
  }

  // END OF PRIVATE SCOPE FOR GET
  return get;
})();


module.exports = get;
