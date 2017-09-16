/**
 *----------------------------------------------------------------------------
 * WRAPPER MACROS
 *----------------------------------------------------------------------------
 * @version 5.0.0
 * @see [vitals](https://github.com/imaginate/vitals)
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life>
 */

/// #def{{{ @wrapper MAIN_OPEN
/**
 * @param {(?Object|?Function|undefined)=} __THIS__
 * @param {undefined=} __VOID__
 * @return {void}
 */
;(function __vitalsWrapper__(__THIS__, __VOID__) {

  /// #if{{{ @env USE_STRICT
  'use strict';

  /// #if}}} @env USE_STRICT
  /// #{{{ @const __NIL__
  /**
   * @private
   * @const {null}
   */
  var __NIL__ = null;
  /// #}}} @const __NIL__

  /// #{{{ @const __NO__
  /**
   * @private
   * @const {boolean}
   */
  var __NO__ = !!__VOID__;
  /// #}}} @const __NO__

  /// #{{{ @const __YES__
  /**
   * @private
   * @const {boolean}
   */
  var __YES__ = !__VOID__;
  /// #}}} @const __YES__

  /// #{{{ @const __VERSION__
  /**
   * @private
   * @const {string}
   */
  var __VERSION__ = '5.0.0';
  /// #}}} @const __VERSION__

/// #def}}} @wrapper MAIN_OPEN

/// #def{{{ @wrapper MAKE_OPEN

/**
 * @private
 * @param {!Function} $VITALS
 * @param {(!Object|!Function)} $ROOT
 * @param {!Object} $ENV
 * @param {!Object} $CONFIG
 * @return {!Function}
 */
function makeVitals($VITALS, $ROOT, $ENV, $CONFIG) {

/// #def}}} @wrapper MAKE_OPEN

/// #def{{{ @wrapper MAKE_CLOSE
}

/// #def}}} @wrapper MAKE_CLOSE

/// #def{{{ @wrapper MAIN_CLOSE
})(this);
/// #def}}} @wrapper MAIN_CLOSE

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
