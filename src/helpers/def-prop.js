/**
 * ---------------------------------------------------------------------------
 * $DEF-PROP HELPER
 * ---------------------------------------------------------------------------
 * @version 5.0.0
 * @see [vitals](https://github.com/imaginate/vitals)
 *
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life>
 */

/// #{{{ @helper $defProp
/**
 * @private
 * @param {!Object} obj
 * @param {string} key
 * @param {!Object} descriptor
 * @return {!Object}
 */
var $defProp = (function $defPropPrivateScope() {

  /// #{{{ @docrefs $defProp
  /// @docref [define-prop]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)
  /// #}}} @docrefs $defProp

  /// #{{{ @const _HAS_DEFINE_PROP
  /**
   * @private
   * @const {boolean}
   */
  var _HAS_DEFINE_PROP = (function _HAS_DEFINE_PROP_PrivateScope() {

    /** @type {!Object} */
    var descriptor;
    /** @type {string} */
    var name;
    /** @type {!Object} */
    var obj;
    /** @type {string} */
    var key;

    name = 'defineProperty';

    if ( !(name in OBJ) || !$is.fun(OBJ[name]) ) {
      return NO;
    }

    /** @dict */ 
    obj = {};
    /** @dict */ 
    descriptor = {};

    descriptor['value'] = obj;
    descriptor['enumerable'] = NO;

    try {
      OBJ[name](obj, 'key', descriptor);
      for (key in obj) {
        if (key === 'key') {
          return NO;
        }
      }
    }
    catch (e) {
      return NO;
    }

    return obj['key'] === obj;
  })();
  /// #}}} @const _HAS_DEFINE_PROP

  /// #{{{ @func _defineProperty
  /**
   * @description
   *   Polyfills [Object.defineProperty][define-prop] if it does not exist.
   * @private
   * @param {!Object} obj
   * @param {string} key
   * @param {!Object} descriptor
   * @return {!Object}
   */
  var _defineProperty = (function _definePropertyPrivateScope() {

    if (_HAS_DEFINE_PROP) {
      return OBJ['defineProperty'];
    }

    /// #{{{ @func defineProperty
    /**
     * @param {!Object} obj
     * @param {string} key
     * @param {!Object} descriptor
     * @return {!Object}
     */
    function defineProperty(obj, key, descriptor) {

      if ( $own(descriptor, 'get') ) {
        obj[key] = descriptor['get']();
      }
      else if ( $own(descriptor, 'value') ) {
        obj[key] = descriptor['value'];
      }
      else if ( !$own(obj, key) ) {
        obj[key] = VOID;
      }

      return obj;
    }
    /// #}}} @func defineProperty

    return defineProperty;
  })();
  /// #}}} @func _defineProperty

  /// #{{{ @func $defProp
  /**
   * @description
   *   Cross browser [Object.defineProperty][define-prop] implementation.
   * @param {!Object} obj
   * @param {string} key
   * @param {!Object} descriptor
   * @return {!Object}
   */
  function $defProp(obj, key, descriptor) {
    return _defineProperty(obj, key, descriptor);
  }
  /// #}}} @func $defProp

  return $defProp;
})();
/// #}}} @helper $defProp

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
