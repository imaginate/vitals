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
 * @param {(!Object|!Function)} src
 * @param {string} key
 * @param {!Object} descriptor
 * @return {(!Object|!Function)}
 */
var $defProp = (function __vitals$defProp__() {

  /// #{{{ @docrefs $defProp
  /// @docref [define-prop]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)
  /// #}}} @docrefs $defProp

  /// #{{{ @func _defineProperty
  /**
   * @description
   *   Polyfills [Object.defineProperty][define-prop] if it does not exist.
   * @private
   * @param {(!Object|!Function)} src
   * @param {string} key
   * @param {!Object} descriptor
   * @return {(!Object|!Function)}
   */
  var _defineProperty = $ENV.HAS.FUNCTION_DEFINE_PROPERTY
    ? $OBJ['defineProperty']
    : $ENV.HAS.OBJECT_DEFINE_PROPERTY
      ? (function __vitalsFunctionDefinePropertyPolyfill__() {

          /// #{{{ @func __defineProperty
          /**
           * @private
           * @param {!Object} src
           * @param {string} key
           * @param {!Object} descriptor
           * @return {!Object}
           */
          var __defineProperty = $OBJ['defineProperty'];
          /// #}}} @func __defineProperty

          /// #{{{ @func _defineProperty
          /**
           * @private
           * @param {!Function} src
           * @param {string} key
           * @param {!Object} descriptor
           * @return {!Function}
           */
          function _defineProperty(src, key, descriptor) {

            if ( $own(descriptor, 'get') ) {
              src[key] = descriptor['get']();
            }
            else if ( $own(descriptor, 'value') ) {
              src[key] = descriptor['value'];
            }
            else if ( !$own(src, key) ) {
              src[key] = $VOID;
            }

            return src;
          }
          /// #}}} @func _defineProperty

          /// #{{{ @func defineProperty
          /**
           * @param {(!Object|!Function)} src
           * @param {string} key
           * @param {!Object} descriptor
           * @return {(!Object|!Function)}
           */
          function defineProperty(src, key, descriptor) {
            return $is.fun(src)
              ? _defineProperty(src, key, descriptor)
              : __defineProperty(src, key, descriptor);
          }
          /// #}}} @func defineProperty

          return defineProperty;
        })()
      : function defineProperty(src, key, descriptor) {

          if ( $own(descriptor, 'get') ) {
            src[key] = descriptor['get']();
          }
          else if ( $own(descriptor, 'value') ) {
            src[key] = descriptor['value'];
          }
          else if ( !$own(src, key) ) {
            src[key] = $VOID;
          }

          return src;
        };
  /// #}}} @func _defineProperty

  /// #{{{ @func $defProp
  /**
   * @description
   *   Cross browser [Object.defineProperty][define-prop] implementation.
   * @param {(!Object|!Function)} src
   * @param {string} key
   * @param {!Object} descriptor
   * @return {(!Object|!Function)}
   */
  function $defProp(src, key, descriptor) {
    return _defineProperty(src, key, descriptor);
  }
  /// #}}} @func $defProp

  return $defProp;
})();
/// #}}} @helper $defProp

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
