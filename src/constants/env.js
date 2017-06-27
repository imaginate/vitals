/**
 *----------------------------------------------------------------------------
 * ENVIRONMENT CONSTANTS
 *----------------------------------------------------------------------------
 * @version 4.1.3
 * @see [vitals](https://github.com/imaginate/vitals)
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life> (https://imaginate.life)
 */

/// #{{{ @constant ENV
/**
 * @private
 * @const {!Object}
 * @struct
 */
/// #if{{{ @env NODE
var ENV = {
  HAS_EXPORTS: true,
  HAS_MODULE: true,
  HAS_GLOBAL: true,
  HAS_WINDOW: false,
  HAS_DEFINE: false,
  HAS_SELF: false,
  HAS_THIS: false,
  ROOT: global
};
/// #if}}} @env NODE
/// #ifnot{{{ @env NODE
var ENV = (function ENV_PrivateScope() {

  /// #{{{ @group Checks

  /// #{{{ @const HAS_EXPORTS
  /**
   * @const {boolean}
   */
  var HAS_EXPORTS = _isObjFun(typeof exports) && _isValidNode(exports);
  /// #}}} @const HAS_EXPORTS

  /// #{{{ @const HAS_MODULE
  /**
   * @const {boolean}
   */
  var HAS_MODULE = _isObjFun(typeof module) && _isValidNode(module);
  /// #}}} @const HAS_MODULE

  /// #{{{ @const HAS_GLOBAL
  /**
   * @const {boolean}
   */
  var HAS_GLOBAL = HAS_EXPORTS
    && HAS_MODULE
    && _isObj(typeof global)
    && _isValidRoot(global);
  /// #}}} @const HAS_GLOBAL

  /// #{{{ @const HAS_WINDOW
  /**
   * @const {boolean}
   */
  var HAS_WINDOW = _isObjFun(typeof window) && _isValidRoot(window);
  /// #}}} @const HAS_WINDOW

  /// #{{{ @const HAS_DEFINE
  /**
   * @const {boolean}
   */
  var HAS_DEFINE = _isFun(typeof define)
    && 'amd' in define
    && _isObj(typeof define['amd']);
  /// #}}} @const HAS_DEFINE

  /// #{{{ @const HAS_SELF
  /**
   * @const {boolean}
   */
  var HAS_SELF = _isObjFun(typeof self) && _isValidRoot(self);
  /// #}}} @const HAS_SELF

  /// #{{{ @const HAS_THIS
  /**
   * @const {boolean}
   */
  var HAS_THIS = _isObjFun(typeof __THIS) && _isValidRoot(__THIS);
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

  /// #{{{ @func _isObj
  /**
   * @private
   * @param {string} typeOf
   * @return {boolean}
   */
  function _isObj(typeOf) {
    return typeOf === 'object';
  }
  /// #}}} @func _isObj

  /// #{{{ @func _isFun
  /**
   * @private
   * @param {string} typeOf
   * @return {boolean}
   */
  function _isFun(typeOf) {
    return typeOf === 'function';
  }
  /// #}}} @func _isFun

  /// #{{{ @func _isObjFun
  /**
   * @private
   * @param {string} typeOf
   * @return {boolean}
   */
  function _isObjFun(typeOf) {
    switch (typeOf) {
      case 'object':
      case 'function':
        return true;
    }
    return false;
  }
  /// #}}} @func _isObjFun

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
    HAS_DEFINE: HAS_DEFINE,
    HAS_SELF: HAS_SELF,
    HAS_THIS: HAS_THIS,
    ROOT: ROOT
  };
  /// #}}} @const ENV

  return ENV;
})();
/// #ifnot}}} @env NODE
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
