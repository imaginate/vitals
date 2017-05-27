/**
 *----------------------------------------------------------------------------
 * EXPORT MACRO
 *----------------------------------------------------------------------------
 * @version 4.1.3
 * @see [vitals](https://github.com/imaginate/vitals)
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2017 Adam A Smith <adam@imaginate.life> (https://imaginate.life)
 */

/// #{{{ @macro EXPORT
  /// #{{{ @group export
  /// #{{{ @on NODE
  module.exports = vitals;
  /// #}}} @on NODE
  /// #{{{ @off NODE
  (function __exportVitals() {

    if (ENV.HAS_WINDOW)
      _appendVitals(window);
    if (ENV.HAS_SELF)
      _appendVitals(self);

    _appendVitals(ROOT);

    if (ENV.HAS_EXPORTS && ENV.HAS_MODULE) {
      if (module.exports === exports)
        module.exports = vitals;
      else
        _appendVitals(exports);
    }

    if (ENV.HAS_DEFINE)
      define(function() {
        return vitals;
      });

    /// #{{{ @func _appendVitals
    /**
     * @private
     * @param {(!Object|!Function)} obj
     * @return {void}
     */
    function _appendVitals(obj) {
      obj['vitals'] = vitals;
      obj['Vitals'] = vitals;
      obj['VITALS'] = vitals;
    }
    /// #}}} @func _appendVitals
  })();
  /// #}}} @off NODE
  /// #}}} @group export
/// #}}} @macro EXPORT

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
