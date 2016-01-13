/**
 * -----------------------------------------------------------------------------
 * VITALS - JS METHOD HELPER - CLONE OBJECT
 * -----------------------------------------------------------------------------
 * @version 2.3.1
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

var _merge = require('./merge.js');

module.exports = _cloneObj;


////////////////////////////////////////////////////////////////////////////////
// PRIVATE HELPER - CLONE-OBJ
////////////////////////////////////////////////////////////////////////////////

/**
 * @param {!Object} obj
 * @return {!Object}
 */
function _cloneObj(obj) {
  return _merge({}, obj);
}
