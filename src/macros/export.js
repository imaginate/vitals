/**
 *----------------------------------------------------------------------------
 * EXPORT MACRO
 *----------------------------------------------------------------------------
 * @version 5.0.0
 * @see [vitals](https://github.com/imaginate/vitals)
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life>
 */

/// #def{{{ @code EXPORT
  /// #{{{ @group export
  (function __vitalsMakeInitialNewVitalsInstance__() {

    /// #{{{ @const _OPTS
    /**
     * @const {!Object}
     * @dict
     */
    var _OPTS = {};
    /// #}}} @const _OPTS

    /// #{{{ @const _EVENT_OPTS
    /**
     * @const {!Object}
     * @dict
     */
    var _EVENT_OPTS = {};
    /// #}}} @const _EVENT_OPTS
    /// #if{{{ @build BROWSER

    /// #{{{ @const _ATTACH_OPTS
    /**
     * @const {!Object}
     * @dict
     */
    var _ATTACH_OPTS = {};
    /// #}}} @const _ATTACH_OPTS
    /// #if}}} @build BROWSER

    _OPTS['event'] = _EVENT_OPTS;
    /// #if{{{ @build AMD
    _EVENT_OPTS['define'] = __YES__;
    /// #if}}} @build AMD
    /// #if{{{ @build BROWSER
    _EVENT_OPTS['attach'] = _ATTACH_OPTS;
    _EVENT_OPTS['define'] = __YES__;
    _ATTACH_OPTS['root'] = __YES__;
    _ATTACH_OPTS['window'] = __YES__;
    /// #if}}} @build BROWSER
    /// #if{{{ @build NODE
    _EVENT_OPTS['export'] = __YES__;
    /// #if}}} @build NODE
    /// #ifnot{{{ @build NODE
    (function __vitalsDetermineExportValue__() {

      /// #{{{ @func _isObjFunType
      /**
       * @private
       * @param {string} typeOf
       * @return {boolean}
       */
      function _isObjFunType(typeOf) {
        switch (typeOf) {
          case 'object':
          case 'function':
            return __YES__;
        }
        return __NO__;
      }
      /// #}}} @func _isObjFunType

      /// #{{{ @func _hasNodeType
      /**
       * @private
       * @param {(!Object|!Function)} val
       * @return {boolean}
       */
      function _hasNodeType(val) {
        return 'nodeType' in val && val['nodeType'] !== __VOID__;
      }
      /// #}}} @func _hasNodeType

      if ( _isObjFunType(typeof exports)
            && !!exports
            && !_hasNodeType(exports)
            && _isObjFunType(typeof module)
            && !!module
            && !_hasNodeType(module)
            && 'exports' in module
            && module['exports'] === exports ) {
        _EVENT_OPTS['export'] = __YES__;
      }
    })();
    /// #ifnot}}} @build NODE
    makeNewVitals()(_OPTS);
  })();
  /// #}}} @group export
/// #def}}} @code EXPORT

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
