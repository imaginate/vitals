/**
 * ---------------------------------------------------------------------------
 * $DEF-PROPS HELPER
 * ---------------------------------------------------------------------------
 * @version 5.0.0
 * @see [vitals](https://github.com/imaginate/vitals)
 *
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life>
 */

/// #{{{ @helper $defProps
/**
 * @private
 * @param {!Object} obj
 * @param {!Object<string, !Object>} props
 * @return {!Object}
 */
var $defProps = (function $defPropsPrivateScope() {

  /// #{{{ @docrefs $defProps
  /// @docref [define-props]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperties)
  /// #}}} @docrefs $defProps

  /// #{{{ @const _HAS_DEFINE_PROPS
  /**
   * @private
   * @const {boolean}
   */
  var _HAS_DEFINE_PROPS = (function _HAS_DEFINE_PROPS_PrivateScope() {

    /** @type {!Object} */
    var descriptor;
    /** @type {!Object} */
    var props;
    /** @type {string} */
    var name;
    /** @type {!Object} */
    var obj;
    /** @type {string} */
    var key;

    name = 'defineProperties';

    if ( !(name in OBJ) || !$is.fun(OBJ[name]) ) {
      return NO;
    }

    /** @dict */ 
    obj = {};
    /** @dict */ 
    props = {};
    /** @dict */ 
    descriptor = {};

    props['key'] = descriptor;

    descriptor['value'] = obj;
    descriptor['enumerable'] = NO;

    try {
      OBJ[name](obj, props);
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
  /// #}}} @const _HAS_DEFINE_PROPS

  /// #{{{ @func _defineProperties
  /**
   * @description
   *   Polyfills [Object.defineProperties][define-props] if it does not exist.
   * @private
   * @param {!Object} obj
   * @param {!Object<string, !Object>} props
   * @return {!Object}
   */
  var _defineProperties = (function _definePropertiesPrivateScope() {

    if (_HAS_DEFINE_PROPS) {
      return OBJ['defineProperties'];
    }

    /// #{{{ @func defineProperties
    /**
     * @param {!Object} obj
     * @param {!Object<string, !Object>} props
     * @return {!Object}
     */
    function defineProperties(obj, props) {

      /** @type {!Object} */
      var descriptor;
      /** @type {string} */
      var key;

      for (key in props) {
        if ( $own(props, key) ) {
          descriptor = props[key];
          if ( $own(descriptor, 'get') ) {
            obj[key] = descriptor['get']();
          }
          else if ( $own(descriptor, 'value') ) {
            obj[key] = descriptor['value'];
          }
          else if ( !$own(obj, key) ) {
            obj[key] = VOID;
          }
        }
      }
      return obj;
    }
    /// #}}} @func defineProperties

    return defineProperties;
  })();
  /// #}}} @func _defineProperties

  /// #{{{ @func $defProps
  /**
   * @description
   *   Cross browser [Object.defineProperties][define-props] implementation.
   * @param {!Object} obj
   * @param {!Object<string, !Object>} props
   * @return {!Object}
   */
  function $defProps(obj, props) {
    return _defineProperties(obj, props);
  }
  /// #}}} @func $defProps

  return $defProps;
})();
/// #}}} @helper $defProps

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
