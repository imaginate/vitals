/**
 * -----------------------------------------------------------------------------
 * VITALS - JS METHOD - SEAL
 * -----------------------------------------------------------------------------
 * @section strict
 * @version 4.0.0
 * @see [vitals.seal]{@link https://github.com/imaginate/vitals/wiki/vitals.seal}
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2016 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Annotations:
 * @see [JSDoc3]{@link http://usejsdoc.org/}
 * @see [Closure Compiler specific JSDoc]{@link https://developers.google.com/closure/compiler/docs/js-for-compiler}
 */

'use strict';

var newErrorAid = require('./helpers/error-aid.js');
var _own = require('./helpers/own.js');
var _is = require('./helpers/is.js');


////////////////////////////////////////////////////////////////////////////////
// SEAL
////////////////////////////////////////////////////////////////////////////////

var seal = (function sealPrivateScope() {

  //////////////////////////////////////////////////////////
  // PUBLIC METHODS
  // - seal
  // - seal.object (seal.obj)
  //////////////////////////////////////////////////////////

  /**
   * Seals an object with optional deep seal.
   *
   * @public
   * @param {?(Object|function)} obj
   * @param {boolean=} deep
   * @return {?(Object|function)}
   */
  function seal(obj, deep) {

    if ( _is.nil(obj) ) return null;

    if ( !_is._obj(obj)     ) throw _error.type('obj');
    if ( !_is.un.bool(deep) ) throw _error.type('deep');

    return deep ? _deepSeal(obj) : _seal(obj);
  }

  /**
   * Seals an object with optional deep seal.
   *
   * @public
   * @param {?(Object|function)} obj
   * @param {boolean=} deep
   * @return {?(Object|function)}
   */
  seal.object = function sealObject(obj, deep) {

    if ( _is.nil(obj) ) return null;

    if ( !_is._obj(obj)     ) throw _error.type('obj',  'seal');
    if ( !_is.un.bool(deep) ) throw _error.type('deep', 'seal');

    return deep ? _deepSeal(obj) : _seal(obj);
  };
  // define shorthand
  seal.obj = seal.object;

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - MAIN
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @param {!(Object|function)} obj
   * @return {!(Object|function)}
   */
  var _seal = !Object.seal
    ? function ObjectSeal(obj) { return obj; }
    : Object.seal;

  /**
   * @private
   * @param {?(Object|function)} obj
   * @return {?(Object|function)}
   */
  var _deepSeal = !Object.seal
    ? function _deepSeal(obj) { return obj; }
    : function _deepSeal(obj) {

      /** @type {string} */
      var key;

      for (key in obj) {
        if ( _own(obj, key) && _is._obj(obj[key]) ) _deepSeal(obj[key]);
      }
      return _seal(obj);
    };

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - GENERAL
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @type {!ErrorAid}
   */
  var _error = newErrorAid('seal');

  //////////////////////////////////////////////////////////
  // END OF PRIVATE SCOPE FOR SEAL
  return seal;
})();


module.exports = seal;
