/**
 * -----------------------------------------------------------------------------
 * VITALS - IS HELPER
 * -----------------------------------------------------------------------------
 * @version 3.0.0
 * @see [vitals]{@link https://github.com/imaginate/vitals/tree/master/src/methods}
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2016 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Annotations:
 * @see [JSDoc3]{@link http://usejsdoc.org/}
 * @see [Closure Compiler specific JSDoc]{@link https://developers.google.com/closure/compiler/docs/js-for-compiler}
 */

var fs = require('fs');
var _is = require('../helpers/is.js');


////////////////////////////////////////////////////////////////////////////////
// PRIVATE HELPER - IS
////////////////////////////////////////////////////////////////////////////////

/**
 * @param {*} val
 * @return {boolean}
 */
_is.buffer = Buffer.isBuffer;

/**
 * @param {string} dirpath
 * @return {boolean}
 */
_is.dir = function(dirpath) {

  if ( !_is._str(dirpath) ) return false;

  try {
    return fs.statSync(dirpath).isDirectory();
  }
  catch (e) {
    return false;
  }
};

/**
 * @param {string} filepath
 * @return {boolean}
 */
_is.file = function(filepath) {

  if ( !_is._str(filepath) ) return false;

  try {
    return fs.statSync(filepath).isFile();
  }
  catch (e) {
    return false;
  }
};


module.exports = _is;
