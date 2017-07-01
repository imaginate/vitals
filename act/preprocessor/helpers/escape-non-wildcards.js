/**
 * ---------------------------------------------------------------------------
 * ESCAPE-NON-WILDCARDS HELPER
 * ---------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life> (https://imaginate.life)
 */

'use strict';

/// #{{{ @group LOADERS
//////////////////////////////////////////////////////////////////////////////
// LOADERS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func loadTaskHelper
/**
 * @private
 * @param {string} name
 * @return {(!Object|!Function)}
 */
var loadTaskHelper = require('./load-task-helper.js');
/// #}}} @func loadTaskHelper

/// #}}} @group LOADERS

/// #{{{ @group CONSTANTS
//////////////////////////////////////////////////////////////////////////////
// CONSTANTS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @const IS
/**
 * @private
 * @const {!Object<string, !function>}
 */
var IS = loadTaskHelper('is');
/// #}}} @const IS

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

/// #{{{ @func setError
/**
 * @private
 * @param {(!Error|!RangeError|!ReferenceError|!SyntaxError|!TypeError)} err
 * @param {string} msg
 * @return {(!Error|!RangeError|!ReferenceError|!SyntaxError|!TypeError)}
 */
var setError = require('./set-error-base.js');
/// #}}} @func setError

/// #{{{ @func setNoArgError
/**
 * @private
 * @param {!Error} err
 * @param {string} param
 * @return {!Error}
 */
var setNoArgError = setError.noArg;
/// #}}} @func setNoArgError

/// #{{{ @func setTypeError
/**
 * @private
 * @param {!TypeError} err
 * @param {string} param
 * @param {string} types
 * @return {!TypeError}
 */
var setTypeError = setError.type;
/// #}}} @func setTypeError

/// #}}} @group HELPERS

/// #{{{ @group METHODS
//////////////////////////////////////////////////////////////////////////////
// METHODS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func escapeNonWildcards
/**
 * @public
 * @param {string} src
 * @return {string}
 */
function escapeNonWildcards(src) {

  if (!arguments.length)
    throw setNoArgError(new Error, 'src');
  if ( !isString(src) )
    throw setTypeError(new TypeError, 'src', 'string');

  return src && src.replace(/[\\^$.+|(){}[\]]/g, '\\$&');
}
/// #}}} @func escapeNonWildcards

/// #}}} @group METHODS

/// #{{{ @group EXPORTS
//////////////////////////////////////////////////////////////////////////////
// EXPORTS
//////////////////////////////////////////////////////////////////////////////

module.exports = escapeNonWildcards;

/// #}}} @group EXPORTS

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
