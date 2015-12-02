/**
 * -----------------------------------------------------------------------------
 * VITALS - JS METHOD HELPER - VALUE IN OBJECT
 * -----------------------------------------------------------------------------
 * @version 2.0.1
 * @see [vitals]{@link https://github.com/imaginate/vitals/tree/master/src/methods}
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

var _own = require('./own.js');

module.exports = _inObj;


////////////////////////////////////////////////////////////////////////////////
// PRIVATE HELPER - IN-OBJ
////////////////////////////////////////////////////////////////////////////////

/**
 * @param {!(Object|function)} source
 * @param {*} val
 * @return {boolean}
 */
function _inObj(source, val) {

  /** @type {string} */
  var key;

  for (key in source) {
    if ( _own(source, key) && source[key] === val ) return true;
  }
  return false;
}
