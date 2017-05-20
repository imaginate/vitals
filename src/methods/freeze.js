/**
 * ---------------------------------------------------------------------------
 * VITALS.FREEZE
 * ---------------------------------------------------------------------------
 * @section strict
 * @version 4.1.3
 * @see [vitals.freeze](https://github.com/imaginate/vitals/wiki/vitals.freeze)
 *
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2017 Adam A Smith <adam@imaginate.life> (https://imaginate.life)
 */

'use strict';

var $newErrorMaker = require('./helpers/new-error-maker.js');
var $isNone = require('./helpers/is-none.js');
var $own = require('./helpers/own.js');
var $is = require('./helpers/is.js');

///////////////////////////////////////////////////////////////////////// {{{1
// VITALS.FREEZE
//////////////////////////////////////////////////////////////////////////////

/**
 * @public
 * @const {!Function<string, !Function>}
 * @dict
 */
var freeze = (function freezePrivateScope() {

  //////////////////////////////////////////////////////////
  // PUBLIC METHODS
  // - freeze
  // - freeze.object (freeze.obj)
  //////////////////////////////////////////////////////////

  /* {{{2 Freeze References
   * @ref [freeze]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze)
   */

  /// {{{2
  /// @method freeze
  /**
   * [Freezes][freeze] an `object` or `function` with the option to
   * recursively [freeze][freeze] its properties. Note that incompatible
   * interpreters are polyfilled to avoid failures in older environments.
   *
   * @public
   * @param {(?Object|?Function)} obj
   * @param {boolean=} deep
   *   Whether to recursively [freeze][freeze] the #obj properties.
   * @return {(?Object|?Function)}
   */
  function freeze(obj, deep) {

    switch (arguments['length']) {
      case 0:
        throw $err(new Error, 'no #obj defined');

      case 1:
        if ( $is.nil(obj) )
          return null;

        if ( !$is._obj(obj) )
          throw $typeErr(new TypeError, 'obj', obj, '?Object|?Function');

        return _freeze(obj);

      default:
        if ( !$isNone.bool(deep) )
          throw $typeErr(new TypeError, 'deep', deep, 'boolean=');

        if ( $is.nil(obj) )
          return null;

        if ( !$is._obj(obj) )
          throw $typeErr(new TypeError, 'obj', obj, '?Object|?Function');

        return deep
          ? _deepFreeze(obj)
          : _freeze(obj);
    }
  }

  /// {{{2
  /// @method freeze.object
  /// @alias freeze.obj
  /**
   * [Freezes][freeze] an `object` or `function` with the option to
   * recursively [freeze][freeze] its properties. Note that incompatible
   * interpreters are polyfilled to avoid failures in older environments.
   *
   * @public
   * @param {(?Object|?Function)} obj
   * @param {boolean=} deep
   *   Whether to recursively [freeze][freeze] the #obj properties.
   * @return {(?Object|?Function)}
   */
  function freezeObject(obj, deep) {

    switch (arguments['length']) {
      case 0:
        throw $err(new Error, 'no #obj defined', 'object');

      case 1:
        if ( $is.nil(obj) )
          return null;

        if ( !$is._obj(obj) )
          throw $typeErr(new TypeError, 'obj', obj, '?Object|?Function',
            'object');

        return _freeze(obj);

      default:
        if ( !$isNone.bool(deep) )
          throw $typeErr(new TypeError, 'deep', deep, 'boolean=', 'object');

        if ( $is.nil(obj) )
          return null;

        if ( !$is._obj(obj) )
          throw $typeErr(new TypeError, 'obj', obj, '?Object|?Function',
            'object');

        return deep
          ? _deepFreeze(obj)
          : _freeze(obj);
    }
  }
  freeze['object'] = freezeObject;
  freeze['obj'] = freezeObject;

  ///////////////////////////////////////////////////// {{{2
  // FREEZE HELPERS - OBJECT.FREEZE POLYFILL
  //////////////////////////////////////////////////////////

  /// {{{3
  /// @func _ObjectFreeze
  /**
   * @private
   * @param {(!Object|!Function)} obj
   * @return {(!Object|!Function)}
   */
  var _ObjectFreeze = (function _ObjectFreezePolyfillPrivateScope() {

    /** @type {!function} */
    var objectFreeze;

    if ( !('freeze' in Object) || !$is.fun(Object['freeze']) )
      return function freeze(obj) {
        return obj;
      };

    objectFreeze = Object['freeze'];

    try {
      objectFreeze(function(){});
      return objectFreeze;
    }
    catch (e) {
      return function freeze(obj) {
        return $is.fun(obj)
          ? obj
          : objectFreeze(obj);
      };
    }
  })();

  ///////////////////////////////////////////////////// {{{2
  // FREEZE HELPERS - MAIN
  //////////////////////////////////////////////////////////

  /// {{{3
  /// @func _freeze
  /**
   * @private
   * @param {(!Object|!Function)} obj
   * @return {(!Object|!Function)}
   */
  var _freeze = _ObjectFreeze;

  /// {{{3
  /// @func _deepFreeze
  /**
   * @private
   * @param {(!Object|!Function)} obj
   * @return {(!Object|!Function)}
   */
  function _deepFreeze(obj) {

    /** @type {string} */
    var key;

    for (key in obj) {
      if ( $own(obj, key) && $is._obj(obj[key]) )
        _deepFreeze(obj[key]);
    }

    return _freeze(obj);
  }

  ///////////////////////////////////////////////////// {{{2
  // FREEZE HELPERS - ERROR MAKERS
  //////////////////////////////////////////////////////////

  /// {{{3
  /// @const ERROR_MAKER
  /**
   * @private
   * @const {!Object<string, !function>}
   * @struct
   */
  var ERROR_MAKER = $newErrorMaker('freeze');

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

  // END OF PRIVATE SCOPE FOR VITALS.FREEZE
  return freeze;
})();
/// }}}1

module.exports = freeze;

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
