/**
 * ---------------------------------------------------------------------------
 * VITALS FREEZE
 * ---------------------------------------------------------------------------
 * @section strict
 * @version 4.1.3
 * @see [vitals.freeze](https://github.com/imaginate/vitals/wiki/vitals.freeze)
 *
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2017 Adam A Smith <adam@imaginate.life> (https://imaginate.life)
 */

'use strict';

var newErrorMaker = require('./helpers/new-error-maker.js');
var own = require('./helpers/own.js');
var _is = require('./helpers/is.js');

///////////////////////////////////////////////////////////////////////// {{{1
// VITALS FREEZE
//////////////////////////////////////////////////////////////////////////////

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
   * @param {(?Object|?function)} obj
   * @param {boolean=} deep
   *   Whether to recursively [freeze][freeze] the #obj properties.
   * @return {(?Object|?function)}
   */
  function freeze(obj, deep) {

    if ( _is.nil(obj) )
      return null;

    if ( !_is._obj(obj) )
      throw _error.type('obj');
    if ( !_is.un.bool(deep) )
      throw _error.type('deep');

    return deep
      ? _deepFreeze(obj)
      : _ObjectFreeze(obj);
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
   * @param {(?Object|?function)} obj
   * @param {boolean=} deep
   *   Whether to recursively [freeze][freeze] the #obj properties.
   * @return {(?Object|?function)}
   */
  freeze.object = function freezeObject(obj, deep) {

    if ( _is.nil(obj) )
      return null;

    if ( !_is._obj(obj) )
      throw _error.type('obj', 'object');
    if ( !_is.un.bool(deep) )
      throw _error.type('deep', 'object');

    return deep
      ? _deepFreeze(obj)
      : _ObjectFreeze(obj);
  };
  // define shorthand
  freeze.obj = freeze.object;

  ///////////////////////////////////////////////////// {{{2
  // FREEZE HELPERS - MAIN
  //////////////////////////////////////////////////////////

  /// {{{3
  /// @func _deepFreeze
  /**
   * @private
   * @param {(!Object|function)} obj
   * @return {(!Object|function)}
   */
  function _deepFreeze(obj, noFreeze) {

    /** @type {string} */
    var key;

    for (key in obj) {
      if ( own(obj, key) && _is._obj(obj[key]) )
        _deepFreeze(obj[key]);
    }
    return _ObjectFreeze(obj);
  }

  ///////////////////////////////////////////////////// {{{2
  // FREEZE HELPERS - OBJECT.FREEZE POLYFILL
  //////////////////////////////////////////////////////////

  /// {{{3
  /// @func _ObjectFreeze
  /**
   * @private
   * @param {(!Object|function)} obj
   * @return {(!Object|function)}
   */
  var _ObjectFreeze = (function() {

    /** @type {function} */
    var objectFreeze;

    if ( !('freeze' in Object) || !_is.func(Object.freeze) )
      return function freeze(obj) {
        return obj;
      };

    objectFreeze = Object.freeze;

    try {
      objectFreeze(function(){});
      return objectFreeze;
    }
    catch (e) {
      return function freeze(obj) {
        return _is.func(obj)
          ? obj
          : objectFreeze(obj);
      };
    }
  })();

  ///////////////////////////////////////////////////// {{{2
  // FREEZE HELPERS - MISC
  //////////////////////////////////////////////////////////

  /// {{{3
  /// @func _error
  /**
   * @private
   * @type {!ErrorAid}
   */
  var _error = newErrorMaker('freeze');

  /// }}}2
  // END OF PRIVATE SCOPE FOR FREEZE
  return freeze;
})();
/// }}}1

module.exports = freeze;

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
