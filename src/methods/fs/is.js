/**
 * -----------------------------------------------------------------------------
 * VITALS - FILE SYSTEM METHODS - IS
 * -----------------------------------------------------------------------------
 * @section fs
 * @version 3.0.0
 * @see [vitals.is]{@link https://github.com/imaginate/vitals/blob/master/src/methods/fs/is.js}
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2016 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Annotations:
 * @see [JSDoc3]{@link http://usejsdoc.org/}
 * @see [Closure Compiler specific JSDoc]{@link https://developers.google.com/closure/compiler/docs/js-for-compiler}
 */

'use strict';

var newErrorAid = require('../helpers/error-aid.js');
var _is = require('./helpers/is.js');

var is = {};


////////////////////////////////////////////////////////////////////////////////
// IS
////////////////////////////////////////////////////////////////////////////////

(function fsIsPrivateScope() {

  //////////////////////////////////////////////////////////
  // PUBLIC METHODS
  // - is.buffer    (is.buf)
  // - is.directory (is.dir)
  // - is.file
  //////////////////////////////////////////////////////////

  /**
   * @public
   * @param {...*} val
   * @return {boolean}
   */
  is.buffer = function isBuffer(val) {
    switch (arguments.length) {
      case 0:  throw _error('Missing a val', 'buffer');
      case 1:  return _is.buffer(val);
      default: return _are(arguments, _is.buffer);
    }
  };
  // define shorthand
  is.buf = is.buffer;

  /**
   * @public
   * @param {...*} dirpath
   * @return {boolean}
   */
  is.directory = function isDirectory(dirpath) {
    switch (arguments.length) {
      case 0:  throw _error('Missing a dirpath', 'directory');
      case 1:  return _is.dir(dirpath);
      default: return _are(arguments, _is.dir);
    }
  };
  // define shorthand
  is.dir = is.directory;

  /**
   * @public
   * @param {...*} filepath
   * @return {boolean}
   */
  is.file = function isFile(filepath) {
    switch (arguments.length) {
      case 0:  throw _error('Missing a filepath', 'file');
      case 1:  return _is.file(filepath);
      default: return _are(arguments, _is.file);
    }
  };

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - ARE
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @param {!Arguments} vals
   * @param {function} check
   * @return {boolean}
   */
  function _are(vals, check) {

    /** @type {number} */
    var i;

    i = vals.length;
    while (i--) {
      if ( !check(vals[i]) ) return false;
    }
    return true;
  }

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - GENERAL
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @type {!ErrorAid}
   */
  var _error = newErrorAid('is');

  //////////////////////////////////////////////////////////
  // END OF PRIVATE SCOPE FOR IS
})();


module.exports = is;
