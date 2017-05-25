/**
 * ---------------------------------------------------------------------------
 * VITALS.SEAL
 * ---------------------------------------------------------------------------
 * @section strict
 * @version 4.1.3
 * @see [vitals.seal](https://github.com/imaginate/vitals/wiki/vitals.seal)
 *
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2017 Adam A Smith <adam@imaginate.life> (https://imaginate.life)
 */

'use strict';

var $newErrorMaker = require('./helpers/new-error-maker.js');
var $own = require('./helpers/own.js');
var $is = require('./helpers/is.js');

///////////////////////////////////////////////////////////////////////// {{{1
// VITALS.SEAL
//////////////////////////////////////////////////////////////////////////////

/**
 * @public
 * @const {!Function<string, !Function>}
 * @dict
 */
var seal = (function sealPrivateScope() {

  //////////////////////////////////////////////////////////
  // PUBLIC METHODS
  // - seal
  // - seal.object (seal.obj)
  //////////////////////////////////////////////////////////

  /* {{{2 Seal References
   * @ref [seal]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/seal)
   */

  /// {{{2
  /// @method seal
  /**
   * [Seals][seal] an `object` or `function` with the option to
   * recursively [seal][seal] its properties. Note that incompatible
   * interpreters are polyfilled to avoid failures in older environments.
   *
   * @public
   * @param {(?Object|?Function)} obj
   * @param {boolean=} deep
   *   Whether to recursively [seal][seal] the #obj properties.
   * @return {(?Object|?Function)}
   */
  function seal(obj, deep) {

    switch (arguments['length']) {
      case 0:
        throw $err(new Error, 'no #obj defined');

      case 1:
        if ( $is.nil(obj) )
          return null;

        if ( !$is._obj(obj) )
          throw $typeErr(new TypeError, 'obj', obj, '?Object|?Function');

        return _seal(obj);

      default:
        if ( !$is.none(deep) && !$is.bool(deep) )
          throw $typeErr(new TypeError, 'deep', deep, 'boolean=');

        if ( $is.nil(obj) )
          return null;

        if ( !$is._obj(obj) )
          throw $typeErr(new TypeError, 'obj', obj, '?Object|?Function');

        return deep
          ? _deepSeal(obj)
          : _seal(obj);
    }
  }

  /// {{{2
  /// @method seal.object
  /// @alias seal.obj
  /**
   * [Seals][seal] an `object` or `function` with the option to
   * recursively [seal][seal] its properties. Note that incompatible
   * interpreters are polyfilled to avoid failures in older environments.
   *
   * @public
   * @param {(?Object|?Function)} obj
   * @param {boolean=} deep
   *   Whether to recursively [seal][seal] the #obj properties.
   * @return {(?Object|?Function)}
   */
  function sealObject(obj, deep) {

    switch (arguments['length']) {
      case 0:
        throw $err(new Error, 'no #obj defined', 'object');

      case 1:
        if ( $is.nil(obj) )
          return null;

        if ( !$is._obj(obj) )
          throw $typeErr(new TypeError, 'obj', obj, '?Object|?Function',
            'object');

        return _seal(obj);

      default:
        if ( !$is.none(deep) && !$is.bool(deep) )
          throw $typeErr(new TypeError, 'deep', deep, 'boolean=', 'object');

        if ( $is.nil(obj) )
          return null;

        if ( !$is._obj(obj) )
          throw $typeErr(new TypeError, 'obj', obj, '?Object|?Function',
            'object');

        return deep
          ? _deepSeal(obj)
          : _seal(obj);
    }
  }
  seal['object'] = sealObject;
  seal['obj'] = sealObject;

  ///////////////////////////////////////////////////// {{{2
  // SEAL HELPERS - OBJECT.SEAL POLYFILL
  //////////////////////////////////////////////////////////

  /// {{{3
  /// @func _ObjectSeal
  /**
   * @private
   * @param {(!Object|!Function)} obj
   * @return {(!Object|!Function)}
   */
  var _ObjectSeal = (function _ObjectSealPolyfillPrivateScope() {

    /** @type {!function} */
    var objectSeal;

    if ( !('seal' in Object) || !$is.fun(Object['seal']) )
      return function seal(obj) {
        return obj;
      };

    objectSeal = Object['seal'];

    try {
      objectSeal(function(){});
      return objectSeal;
    }
    catch (e) {
      return function seal(obj) {
        return $is.fun(obj)
          ? obj
          : objectSeal(obj);
      };
    }
  })();

  ///////////////////////////////////////////////////// {{{2
  // SEAL HELPERS - MAIN
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @param {(!Object|!Function)} obj
   * @return {(!Object|!Function)}
   */
  var _seal = _ObjectSeal;

  /**
   * @private
   * @param {(?Object|?Function)} obj
   * @return {(?Object|?Function)}
   */
  function _deepSeal(obj) {

    /** @type {string} */
    var key;

    for (key in obj) {
      if ( $own(obj, key) && $is._obj(obj[key]) )
        _deepSeal(obj[key]);
    }

    return _seal(obj);
  }

  ///////////////////////////////////////////////////// {{{2
  // SEAL HELPERS - ERROR MAKERS
  //////////////////////////////////////////////////////////

  /// {{{3
  /// @const ERROR_MAKER
  /**
   * @private
   * @const {!Object<string, !function>}
   * @struct
   */
  var ERROR_MAKER = $newErrorMaker('seal');

  /// {{{3
  /// @func $err
  /**
   * @private
   * @param {!Error} err
   * @param {string} msg
   * @param {string=} method
   * @return {!Error} 
   */
  var $err = ERROR_MAKER.error;

  /// {{{3
  /// @func $typeErr
  /**
   * @private
   * @param {!TypeError} err
   * @param {string} paramName
   * @param {*} paramVal
   * @param {string} validTypes
   * @param {string=} methodName
   * @return {!TypeError} 
   */
  var $typeErr = ERROR_MAKER.typeError;

  /// {{{3
  /// @func $rangeErr
  /**
   * @private
   * @param {!RangeError} err
   * @param {string} paramName
   * @param {(!Array<*>|string|undefined)=} validRange
   *   An `array` of actual valid options or a `string` stating the valid
   *   range. If `undefined` this option is skipped.
   * @param {string=} methodName
   * @return {!RangeError} 
   */
  var $rangeErr = ERROR_MAKER.rangeError;
  /// }}}2

  // END OF PRIVATE SCOPE FOR VITALS.SEAL
  return seal;
})();
/// }}}1

module.exports = seal;

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
