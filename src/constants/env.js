/**
 *----------------------------------------------------------------------------
 * ENVIRONMENT CONSTANTS
 *----------------------------------------------------------------------------
 * @version 4.1.3
 * @see [vitals](https://github.com/imaginate/vitals)
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2017 Adam A Smith <adam@imaginate.life> (https://imaginate.life)
 */

/// #{{{ @constant ENV
/**
 * @private
 * @const {!Object}
 * @struct
 */
var ENV = (function ENV_PrivateScope() {

  /// #{{{ @group Checks

  /// #{{{ @const HAS_EXPORTS
  /**
   * @const {boolean}
   */
  var HAS_EXPORTS = _isValidType(typeof exports) && _isValidNode(exports);
  /// #}}} @const HAS_EXPORTS

  /// #{{{ @const HAS_MODULE
  /**
   * @const {boolean}
   */
  var HAS_MODULE = _isValidType(typeof module) && _isValidNode(module);
  /// #}}} @const HAS_MODULE

  /// #{{{ @const HAS_GLOBAL
  /**
   * @const {boolean}
   */
  var HAS_GLOBAL = HAS_EXPORTS
    && HAS_MODULE
    && _isValidType(typeof global, true)
    && _isValidRoot(global);
  /// #}}} @const HAS_GLOBAL

  /// #{{{ @const HAS_WINDOW
  /**
   * @const {boolean}
   */
  var HAS_WINDOW = _isValidType(typeof window) && _isValidRoot(window);
  /// #}}} @const HAS_WINDOW

  /// #{{{ @const HAS_SELF
  /**
   * @const {boolean}
   */
  var HAS_SELF = _isValidType(typeof self) && _isValidRoot(self);
  /// #}}} @const HAS_SELF

  /// #{{{ @const HAS_THIS
  /**
   * @const {boolean}
   */
  var HAS_THIS = _isValidType(typeof __THIS) && _isValidRoot(__THIS);
  /// #}}} @const HAS_THIS

  /// #}}} @group Checks

  /// #{{{ @const ROOT
  /**
   * @const {(!Object|!Function)}
   * @dict
   */
  var ROOT = HAS_GLOBAL
    ? global
    : HAS_WINDOW && window !== (__THIS && __THIS['window'])
      ? window
      : HAS_SELF
        ? self
        : HAS_THIS
          ? __THIS
          : Function('return this')();
  /// #}}} @const ROOT

  /// #{{{ @group Helpers

  /// #{{{ @func _isValidType
  /**
   * @private
   * @param {string} typeOf
   * @param {boolean=} noFunc
   * @return {boolean}
   */
  function _isValidType(typeOf, noFunc) {
    switch (typeOf) {
      case 'object':
        return true;
      case 'function':
        return !noFunc;
    }
    return false;
  }
  /// #}}} @func _isValidType

  /// #{{{ @func _isValidRoot
  /**
   * @private
   * @param {(?Object|?Function)} root
   * @return {boolean}
   */
  function _isValidRoot(root) {
    return !!root && root['Object'] === Object;
  }
  /// #}}} @func _isValidRoot

  /// #{{{ @func _isValidNode
  /**
   * @private
   * @param {(?Object|?Function)} node
   * @return {boolean}
   */
  function _isValidNode(node) {
    return !!node && (!('nodeType' in node) || !node['nodeType']);
  }
  /// #}}} @func _isValidNode

  /// #}}} @group Helpers

  /// #{{{ @const ENV
  /**
   * @const {!Object}
   * @struct
   */
  var ENV = {
    HAS_EXPORTS: HAS_EXPORTS,
    HAS_MODULE: HAS_MODULE,
    HAS_GLOBAL: HAS_GLOBAL,
    HAS_WINDOW: HAS_WINDOW,
    HAS_SELF: HAS_SELF,
    HAS_THIS: HAS_THIS,
    ROOT: ROOT
  };
  /// #}}} @const ENV

  return ENV;
})();
/// #}}} @constant ENV

/// #{{{ @constant ROOT
/**
 * @private
 * @const {(!Object|!Function)}
 * @dict
 */
var ROOT = ENV.ROOT;
/// #}}} @constant ROOT

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
