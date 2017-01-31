/**
 * -----------------------------------------------------------------------------
 * VITALS FS METHOD: is
 * -----------------------------------------------------------------------------
 * @section fs
 * @version 4.1.2
 * @see [vitals.is]{@link https://github.com/imaginate/vitals/wiki/vitals.is}
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2017 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Annotations:
 * @see [JSDoc3](http://usejsdoc.org)
 * @see [Closure Compiler JSDoc Syntax](https://developers.google.com/closure/compiler/docs/js-for-compiler)
 */

'use strict';

var newErrorMaker = require('../helpers/new-error-maker.js');
var _is = require('./helpers/is.js');

var is = {};


////////////////////////////////////////////////////////////////////////////////
// VITALS FS METHOD: is
////////////////////////////////////////////////////////////////////////////////

(function fsIsPrivateScope() {

  //////////////////////////////////////////////////////////
  // PUBLIC METHODS
  // - is.buffer    (is.buf)
  // - is.directory (is.dir)
  // - is.file
  //////////////////////////////////////////////////////////

  /**
   * Checks if a value(s) is a `Buffer` instance.
   *
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
   * Checks if a value(s) is a valid directory-path.
   *
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
   * Checks if a value(s) is a valid file-path.
   *
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
  var _error = newErrorMaker('is');

  //////////////////////////////////////////////////////////
  // END OF PRIVATE SCOPE FOR IS
})();


module.exports = is;
