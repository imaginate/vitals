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

/// #{{{ @macro OPEN_WRAPPER
/// #{{{ @group vitals
;(function(/** (?Object|?Function|undefined) */ __THIS,
           /** undefined */ __VOID) {

  /// #{{{ @on USE_STRICT
  'use strict';

  /// #}}} @on USE_STRICT
  /// #{{{ @off SOLO
  /**
   * @type {(!Object|!Function)}
   * @dict
   */
  var vitals = {};

  /// #}}} @off SOLO
/// #}}} @macro OPEN_WRAPPER

/// #{{{ @macro CLOSE_WRAPPER
})(this);
/// #}}} @group vitals
/// #}}} @macro CLOSE_WRAPPER

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
