/**
 * -----------------------------------------------------------------------------
 * VITALS METHOD: same
 * -----------------------------------------------------------------------------
 * @section base
 * @version 4.1.2
 * @see [vitals.same]{@link https://github.com/imaginate/vitals/wiki/vitals.same}
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2016 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Annotations:
 * @see [JSDoc3](http://usejsdoc.org)
 * @see [Closure Compiler JSDoc Syntax](https://developers.google.com/closure/compiler/docs/js-for-compiler)
 */

'use strict';

var newErrorMaker = require('./helpers/new-error-maker.js');


////////////////////////////////////////////////////////////////////////////////
// VITALS METHOD: same
////////////////////////////////////////////////////////////////////////////////

var same = (function samePrivateScope() {

  //////////////////////////////////////////////////////////
  // PUBLIC METHODS
  // - same
  // - same.loose (same.ish)
  //////////////////////////////////////////////////////////

  /**
   * A functional representation of strict equality.
   *
   * @public
   * @param {*} val1
   * @param {*} val2
   * @return {boolean}
   */
  function same(val1, val2) {

    if (arguments.length < 2) throw _error('Missing a val');

    return val1 === val2;
  }

  /**
   * A functional representation of loose equality.
   *
   * @public
   * @param {*} val1
   * @param {*} val2
   * @return {boolean}
   */
  same.loose = function sameLoose(val1, val2) {

    if (arguments.length < 2) throw _error('Missing a val', 'loose');

    return val1 == val2;
  };
  // define shorthand
  same.ish = same.loose;

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - GENERAL
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @type {!ErrorAid}
   */
  var _error = newErrorMaker('same');

  //////////////////////////////////////////////////////////
  // END OF PRIVATE SCOPE FOR SAME
  return same;
})();


module.exports = same;
