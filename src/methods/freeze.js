/**
 * -----------------------------------------------------------------------------
 * VITALS METHOD: freeze
 * -----------------------------------------------------------------------------
 * @section strict
 * @version 4.0.0
 * @see [vitals.freeze]{@link https://github.com/imaginate/vitals/wiki/vitals.freeze}
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2016 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Annotations:
 * @see [JSDoc3]{@link http://usejsdoc.org/}
 * @see [Closure Compiler specific JSDoc]{@link https://developers.google.com/closure/compiler/docs/js-for-compiler}
 */

'use strict';

var newErrorMaker = require('./helpers/new-error-maker.js');
var own = require('./helpers/own.js');
var _is = require('./helpers/is.js');


////////////////////////////////////////////////////////////////////////////////
// VITALS METHOD: freeze
////////////////////////////////////////////////////////////////////////////////

var freeze = (function freezePrivateScope() {

  //////////////////////////////////////////////////////////
  // PUBLIC METHODS
  // - freeze
  // - freeze.object (freeze.obj)
  //////////////////////////////////////////////////////////

  /**
   * Freezes an object with optional deep freeze.
   *
   * @public
   * @param {(Object|?function)} obj
   * @param {boolean=} deep
   * @return {(Object|?function)}
   */
  function freeze(obj, deep) {

    if ( _is.nil(obj) ) return null;

    if ( !_is._obj(obj)     ) throw _error.type('obj');
    if ( !_is.un.bool(deep) ) throw _error.type('deep');

    return deep ? _deepFreeze(obj) : _ObjectFreeze(obj);
  }

  /**
   * Freezes an object with optional deep freeze.
   *
   * @public
   * @param {(Object|?function)} obj
   * @param {boolean=} deep
   * @return {(Object|?function)}
   */
  freeze.object = function freezeObject(obj, deep) {

    if ( _is.nil(obj) ) return null;

    if ( !_is._obj(obj)     ) throw _error.type('obj',  'object');
    if ( !_is.un.bool(deep) ) throw _error.type('deep', 'object');

    return deep ? _deepFreeze(obj) : _ObjectFreeze(obj);
  };
  // define shorthand
  freeze.obj = freeze.object;

  //////////////////////////////////////////////////////////
  // PRIVATE PROPERTIES - MAIN
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @param {(!Object|function)} obj
   * @return {(!Object|function)}
   */
  function _deepFreeze(obj, noFreeze) {

    /** @type {string} */
    var key;

    for (key in obj) {
      if ( own(obj, key) && _is._obj( obj[key] ) ) {
        _deepFreeze( obj[key] );
      }
    }
    return _ObjectFreeze(obj);
  }

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - OBJECT.FREEZE POLYFILL
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @param {(!Object|function)} obj
   * @return {(!Object|function)}
   */
  var _ObjectFreeze = (function() {

    if (!Object.freeze) return function freeze(obj) { return obj; };

    try {
      Object.freeze(function(){});
      return Object.freeze;
    }
    catch (e) {
      return function freeze(obj) {
        return _is.func(obj) ? obj : Object.freeze(obj);
      };
    }
  })();

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - GENERAL
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @type {!ErrorAid}
   */
  var _error = newErrorMaker('freeze');

  //////////////////////////////////////////////////////////
  // END OF PRIVATE SCOPE FOR FREEZE
  return freeze;
})();


module.exports = freeze;
