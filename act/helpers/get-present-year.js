/**
 * ---------------------------------------------------------------------------
 * GET-PRESENT-YEAR HELPER
 * ---------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life> (https://imaginate.life)
 */

'use strict';

/// #{{{ @group METHODS
//////////////////////////////////////////////////////////////////////////////
// METHODS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func getPresentYear
/**
 * @public
 * @return {number}
 */
function getPresentYear() {

  /** @type {!Date} */
  var date;

  date = new Date();
  return date.getUTCFullYear();
}
/// #}}} @func getPresentYear

/// #{{{ @func getPresentYearAsString
/**
 * @public
 * @return {string}
 */
function getPresentYearAsString() {

  /** @type {number} */
  var year;

  year = getPresentYear();
  return String(year);
}
/// #}}} @func getPresentYearAsString

/// #}}} @group METHODS

/// #{{{ @group EXPORTS
//////////////////////////////////////////////////////////////////////////////
// EXPORTS
//////////////////////////////////////////////////////////////////////////////

getPresentYear.asString = getPresentYearAsString;
module.exports = getPresentYear;

/// #}}} @group EXPORTS

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
