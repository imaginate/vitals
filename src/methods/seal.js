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

/// #{{{ @on SOLO
/// #include @macro OPEN_WRAPPER ../macros/wrapper.js
/// #include @core constants ../core/constants.js
/// #include @core helpers ../core/helpers.js
/// #}}} @on SOLO

/// #{{{ @super seal
/**
 * @public
 * @const {!Function<string, !Function>}
 * @dict
 */
var seal = (function sealPrivateScope() {

  /// #{{{ @docrefs seal
  /// @docref [seal]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/seal)
  /// #}}} @docrefs seal

  /// #{{{ @submethod main
  /// @section strict
  /// @method vitals.seal
  /**
   * @description
   *   [Seals][seal] an `object` or `function` with the option to
   *   recursively [seal][seal] its properties. Note that incompatible
   *   interpreters are polyfilled to avoid failures in older environments.
   * @public
   * @param {(?Object|?Function)} obj
   * @param {boolean=} deep = `false`
   *   Whether to recursively [seal][seal] the #obj properties.
   * @return {(?Object|?Function)}
   */
  function seal(obj, deep) {

    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #obj defined');

      case 1:
        if ( $is.nil(obj) )
          return NIL;

        if ( !$is._obj(obj) )
          throw _mkTypeErr(new TYPE_ERR, 'obj', obj, '?Object|?Function');

        return _seal(obj);

      default:
        if ( !$is.void(deep) && !$is.bool(deep) )
          throw _mkTypeErr(new TYPE_ERR, 'deep', deep, 'boolean=');

        if ( $is.nil(obj) )
          return NIL;

        if ( !$is._obj(obj) )
          throw _mkTypeErr(new TYPE_ERR, 'obj', obj, '?Object|?Function');

        return deep
          ? _deepSeal(obj)
          : _seal(obj);
    }
  }
  /// #}}} @submethod main

  /// #{{{ @submethod object
  /// @section strict
  /// @method vitals.seal.object
  /// @alias vitals.seal.obj
  /**
   * @description
   *   [Seals][seal] an `object` or `function` with the option to
   *   recursively [seal][seal] its properties. Note that incompatible
   *   interpreters are polyfilled to avoid failures in older environments.
   * @public
   * @param {(?Object|?Function)} obj
   * @param {boolean=} deep = `false`
   *   Whether to recursively [seal][seal] the #obj properties.
   * @return {(?Object|?Function)}
   */
  function sealObject(obj, deep) {

    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #obj defined', 'object');

      case 1:
        if ( $is.nil(obj) )
          return NIL;

        if ( !$is._obj(obj) )
          throw _mkTypeErr(new TYPE_ERR, 'obj', obj, '?Object|?Function',
            'object');

        return _seal(obj);

      default:
        if ( !$is.void(deep) && !$is.bool(deep) )
          throw _mkTypeErr(new TYPE_ERR, 'deep', deep, 'boolean=', 'object');

        if ( $is.nil(obj) )
          return NIL;

        if ( !$is._obj(obj) )
          throw _mkTypeErr(new TYPE_ERR, 'obj', obj, '?Object|?Function',
            'object');

        return deep
          ? _deepSeal(obj)
          : _seal(obj);
    }
  }
  seal['object'] = sealObject;
  seal['obj'] = sealObject;
  /// #}}} @submethod object

  /// #{{{ @group Seal-Helpers

  /// #{{{ @group Seal-Polyfills

  /// #{{{ @func _ObjectSeal
  /**
   * @private
   * @param {(!Object|!Function)} obj
   * @return {(!Object|!Function)}
   */
  var _ObjectSeal = (function _ObjectSealPolyfillPrivateScope() {

    /** @type {!function} */
    var objectSeal;

    if ( !('seal' in OBJ) || !$is.fun(OBJ['seal']) )
      return function seal(obj) {
        return obj;
      };

    objectSeal = OBJ['seal'];

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
  /// #}}} @func _ObjectSeal

  /// #}}} @group Seal-Polyfills

  /// #{{{ @group Main-Helpers

  /// #{{{ @func _seal
  /**
   * @private
   * @param {(!Object|!Function)} obj
   * @return {(!Object|!Function)}
   */
  var _seal = _ObjectSeal;
  /// #}}} @func _seal

  /// #{{{ @func _deepSeal
  /**
   * @private
   * @param {(!Object|!Function)} obj
   * @return {(!Object|!Function)}
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
  /// #}}} @func _deepSeal

  /// #}}} @group Main-Helpers

  /// #{{{ @group Error-Helpers

  /// #{{{ @const _MK_ERR
  /**
   * @private
   * @const {!Object<string, !function>}
   * @struct
   */
  var _MK_ERR = $mkErrs('seal');
  /// #}}} @const _MK_ERR
  /// #include @macro MK_ERR ../macros/mk-err.js

  /// #}}} @group Error-Helpers

  /// #}}} @group Seal-Helpers

  return seal;
})();
/// #{{{ @off SOLO
vitals['seal'] = seal;
/// #}}} @off SOLO
/// #}}} @super seal

/// #{{{ @on SOLO
var vitals = seal;
vitals['seal'] = seal;
/// #include @macro EXPORT ../macros/export.js
/// #include @macro CLOSE_WRAPPER ../macros/wrapper.js
/// #}}} @on SOLO

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
