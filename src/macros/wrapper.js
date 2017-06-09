/**
 *----------------------------------------------------------------------------
 * WRAPPER MACROS
 *----------------------------------------------------------------------------
 * @version 4.1.3
 * @see [vitals](https://github.com/imaginate/vitals)
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2017 Adam A Smith <adam@imaginate.life> (https://imaginate.life)
 */

/// #def{{{ @wrapper OPEN
;(function(/** (?Object|?Function|undefined) */ __THIS,
           /** undefined */ __VOID) {

  /// #if{{{ @env USE_STRICT
  'use strict';

  /// #if}}} @env USE_STRICT
  /// #ifnot{{{ @scope SOLO
  /// #ifnot{{{ @scope CONSTRUCTOR
  /**
   * @public
   * @type {(!Object|!Function)}
   * @dict
   */
  var vitals = {};

  /// #ifnot}}} @scope CONSTRUCTOR
  /// #ifnot}}} @scope SOLO
/// #def}}} @wrapper OPEN

/// #def{{{ @wrapper CLOSE
})(this);
/// #def}}} @wrapper CLOSE

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
