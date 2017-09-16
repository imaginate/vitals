/**
 * ---------------------------------------------------------------------------
 * $GET-FLAGS HELPER
 * ---------------------------------------------------------------------------
 * @version 5.0.0
 * @see [vitals](https://github.com/imaginate/vitals)
 *
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life>
 */

/// #{{{ @helper $getFlags
/**
 * @private
 * @param {!RegExp} src
 * @param {boolean=} forceGlobal
 * @return {!RegExp}
 */
var $getFlags = (function __vitals$getFlags__() {

  /// #{{{ @const _GLOBAL
  /**
   * @private
   * @const {!RegExp}
   */
  var _GLOBAL = /g/;
  /// #}}} @const _GLOBAL

  /// #{{{ @const _FLAGS
  /**
   * @private
   * @const {!Object<string, string>}
   * @dict
   */
  var _FLAGS = (function __vitals$getFlags_FLAGS__() {

    /**
     * @const {!Object<string, string>}
     * @dict
     */
    var FLAGS = {};

    FLAGS['ignoreCase'] = 'i';
    FLAGS['multiline'] = 'm';
    FLAGS['global'] = 'g';

    if ('sticky' in $REGX_PROTO) {
      FLAGS['sticky'] = 'y';
    }
    if ('unicode' in $REGX_PROTO) {
      FLAGS['unicode'] = 'u';
    }

    return FLAGS;
  })();
  /// #}}} @const _FLAGS

  /// #{{{ @func $getFlags
  /**
   * @private
   * @param {!RegExp} src
   * @param {boolean=} forceGlobal
   * @return {string}
   */
  function $getFlags(src, forceGlobal) {

    /** @type {string} */
    var flags;
    /** @type {string} */
    var key;

    flags = '';
    for (key in _FLAGS) {
      if ( $own(_FLAGS, key) && src[key] ) {
        flags += _FLAGS[key];
      }
    }

    return !!forceGlobal && !_GLOBAL['test'](flags)
      ? flags + 'g'
      : flags;
  }
  /// #}}} @func $getFlags

  return $getFlags;
})();
/// #}}} @helper $getFlags

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
