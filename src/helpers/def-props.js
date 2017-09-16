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
 * @param {(!Object|!Function)} src
 * @param {!Object<string, !Object>} props
 * @return {(!Object|!Function)}
 */
var $defProps = (function __vitals$defProps__() {

  /// #{{{ @docrefs $defProps
  /// @docref [define-props]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperties)
  /// #}}} @docrefs $defProps

  /// #{{{ @func _defineProperties
  /**
   * @description
   *   Polyfills [Object.defineProperties][define-props] if it does not exist.
   * @private
   * @param {(!Object|!Function)} src
   * @param {!Object<string, !Object>} props
   * @return {(!Object|!Function)}
   */
  var _defineProperties = $ENV.HAS.FUNCTION_DEFINE_PROPERTIES
    ? $OBJ['defineProperties']
    : $ENV.HAS.OBJECT_DEFINE_PROPERTIES
      ? (function __vitalsFunctionDefinePropertiesPolyfill__() {

          /// #{{{ @func __defineProperties
          /**
           * @private
           * @param {!Object} src
           * @param {!Object<string, !Object>} props
           * @return {!Object}
           */
          var __defineProperties = $OBJ['defineProperties'];
          /// #}}} @func __defineProperties

          /// #{{{ @func _defineProperties
          /**
           * @private
           * @param {!Function} src
           * @param {!Object<string, !Object>} props
           * @return {!Function}
           */
          function _defineProperties(src, props) {

            /** @type {!Object} */
            var descriptor;
            /** @type {string} */
            var key;

            for (key in props) {
              if ( $own(props, key) ) {
                descriptor = props[key];
                if ( $own(descriptor, 'get') ) {
                  src[key] = descriptor['get']();
                }
                else if ( $own(descriptor, 'value') ) {
                  src[key] = descriptor['value'];
                }
                else if ( !$own(src, key) ) {
                  src[key] = $VOID;
                }
              }
            }

            return src;
          }
          /// #}}} @func _defineProperties

          /// #{{{ @func defineProperties
          /**
           * @param {(!Object|!Function)} src
           * @param {!Object<string, !Object>} props
           * @return {(!Object|!Function)}
           */
          function defineProperties(src, props) {
            return $is.fun(src)
              ? _defineProperties(src, props)
              : __defineProperties(src, props);
          }
          /// #}}} @func defineProperties

          return defineProperties;
        })()
      : function defineProperties(src, props) {

          /** @type {!Object} */
          var descriptor;
          /** @type {string} */
          var key;

          for (key in props) {
            if ( $own(props, key) ) {
              descriptor = props[key];
              if ( $own(descriptor, 'get') ) {
                src[key] = descriptor['get']();
              }
              else if ( $own(descriptor, 'value') ) {
                src[key] = descriptor['value'];
              }
              else if ( !$own(src, key) ) {
                src[key] = $VOID;
              }
            }
          }

          return src;
        };
  /// #}}} @func _defineProperties

  /// #{{{ @func $defProps
  /**
   * @description
   *   Cross browser [Object.defineProperties][define-props] implementation.
   * @param {(!Object|!Function)} src
   * @param {!Object<string, !Object>} props
   * @return {(!Object|!Function)}
   */
  function $defProps(src, props) {
    return _defineProperties(src, props);
  }
  /// #}}} @func $defProps

  return $defProps;
})();
/// #}}} @helper $defProps

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
