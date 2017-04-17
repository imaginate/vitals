/**
 * -----------------------------------------------------------------------------
 * VITALS METHOD: seal
 * -----------------------------------------------------------------------------
 * @section strict
 * @version 4.1.3
 * @see [vitals.seal](https://github.com/imaginate/vitals/wiki/vitals.seal)
 *
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2017 Adam A Smith <adam@imaginate.life> (https://imaginate.life)
 *
 * @see [JSDoc3](http://usejsdoc.org)
 * @see [Closure Compiler JSDoc](https://developers.google.com/closure/compiler/docs/js-for-compiler)
 */

'use strict';

var newErrorMaker = require('./helpers/new-error-maker.js');
var own = require('./helpers/own.js');
var _is = require('./helpers/is.js');


////////////////////////////////////////////////////////////////////////////////
// VITALS METHOD: seal
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
        if ( own(obj, key) && _is._obj(obj[key]) ) _deepSeal(obj[key]);
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
  var _error = newErrorMaker('seal');

  //////////////////////////////////////////////////////////
  // END OF PRIVATE SCOPE FOR SEAL
  return seal;
})();


module.exports = seal;
