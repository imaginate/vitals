/**
 * ---------------------------------------------------------------------------
 * GET-METHOD-ID HELPER
 * ---------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2017 Adam A Smith <adam@imaginate.life> (https://imaginate.life)
 */

'use strict';

/// #{{{ @func loadHelper
/**
 * @private
 * @param {string} name
 * @return {(!Object|!Function)}
 */
var loadHelper = require('./load-helper.js');
/// #}}} @func loadHelper

/// #{{{ @group CONSTANTS
//////////////////////////////////////////////////////////////////////////////
// CONSTANTS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @const IS
/**
 * @private
 * @const {!Object<string, !function>}
 */
var IS = loadHelper('is');
/// #}}} @const IS

/// #{{{ @const MAIN
/**
 * @private
 * @const {!RegExp}
 */
var MAIN = /^[a-zA-Z0-9_]+\./;
/// #}}} @const MAIN
/// #}}} @group CONSTANTS

/// #{{{ @group HELPERS
//////////////////////////////////////////////////////////////////////////////
// HELPERS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func isString
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isString = IS.string;
/// #}}} @func isString
/// #}}} @group HELPERS

/// #{{{ @group EXPORTS
//////////////////////////////////////////////////////////////////////////////
// EXPORTS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func getMethodID
/**
 * @public
 * @param {string} method
 * @return {string}
 */
function getMethodID(method) {

  /** @type {string} */
  var id;

  if ( !isString(method) )
    throw new TypeError('invalid `method` type (must be a string)');
  if (!method)
    throw new Error('invalid empty `method` string');

  if ( !MAIN.test(method) )
    return 'main';

  id = method.replace(MAIN, '');
  return id.replace(/\./g, '-');
}
/// #}}} @func getMethodID

module.exports = getMethodID;

/// #}}} @group EXPORTS

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
