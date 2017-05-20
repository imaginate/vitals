/**
 * ---------------------------------------------------------------------------
 * VITALS.SAME
 * ---------------------------------------------------------------------------
 * @section base
 * @version 4.1.3
 * @see [vitals.same](https://github.com/imaginate/vitals/wiki/vitals.same)
 *
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2017 Adam A Smith <adam@imaginate.life> (https://imaginate.life)
 */

'use strict';

var $newErrorMaker = require('./helpers/new-error-maker.js');

///////////////////////////////////////////////////////////////////////// {{{1
// VITALS.SAME
//////////////////////////////////////////////////////////////////////////////

/**
 * @public
 * @const {!Function<string, !Function>}
 * @dict
 */
var same = (function samePrivateScope() {

  //////////////////////////////////////////////////////////
  // PUBLIC METHODS
  // - same
  // - same.loose (same.ish)
  //////////////////////////////////////////////////////////

  /* {{{2 Same References
   * @ref [equal]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness)
   */

  /// {{{2
  /// @method same
  /**
   * A functional representation of [strict equality][equal].
   *
   * @public
   * @param {*} val1
   * @param {*} val2
   * @return {boolean}
   */
  function same(val1, val2) {

    switch (arguments['length']) {
      case 0:
        throw $err(new Error, 'no #val1 defined');
      case 1:
        throw $err(new Error, 'no #val2 defined');
    }

    return val1 === val2;
  }

  /// {{{2
  /// @method same.loose
  /// @alias same.ish
  /**
   * A functional representation of [loose equality][equal].
   *
   * @public
   * @param {*} val1
   * @param {*} val2
   * @return {boolean}
   */
  function sameLoose(val1, val2) {

    switch (arguments['length']) {
      case 0:
        throw $err(new Error, 'no #val1 defined', 'loose');
      case 1:
        throw $err(new Error, 'no #val2 defined', 'loose');
    }

    return val1 == val2;
  }
  same['loose'] = sameLoose;
  same['ish'] = sameLoose;

  ///////////////////////////////////////////////////// {{{2
  // SAME HELPERS - ERROR MAKERS
  //////////////////////////////////////////////////////////

  /// {{{3
  /// @const ERROR_MAKER
  /**
   * @private
   * @const {!Object<string, !function>}
   * @struct
   */
  var ERROR_MAKER = $newErrorMaker('same');

  /// {{{3
  /// @func $err
  /**
   * @private
   * @param {!Error} err
   * @param {string} msg
   * @param {string=} method
   * @return {!Error} 
   */
  var $err = ERROR_MAKER.error;

  /// {{{3
  /// @func $typeErr
  /**
   * @private
   * @param {!TypeError} err
   * @param {string} paramName
   * @param {*} paramVal
   * @param {string} validTypes
   * @param {string=} methodName
   * @return {!TypeError} 
   */
  var $typeErr = ERROR_MAKER.typeError;

  /// {{{3
  /// @func $rangeErr
  /**
   * @private
   * @param {!RangeError} err
   * @param {string} paramName
   * @param {(!Array<*>|string|undefined)=} validRange
   *   An `array` of actual valid options or a `string` stating the valid
   *   range. If `undefined` this option is skipped.
   * @param {string=} methodName
   * @return {!RangeError} 
   */
  var $rangeErr = ERROR_MAKER.rangeError;
  /// }}}2

  // END OF PRIVATE SCOPE FOR VITALS.SAME
  return same;
})();
/// }}}1

module.exports = same;

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
