/**
 * ---------------------------------------------------------------------------
 * CLEAN-HTML-ATTRIBUTE HELPER
 * ---------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life>
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

/// #{{{ @const EOL_PATTERN
/**
 * @private
 * @const {!RegExp}
 */
var EOL_PATTERN = /[\r\n](?:\s|\S)*$/;
/// #}}} @const EOL_PATTERN

/// #{{{ @const IS
/**
 * @private
 * @const {!Object<string, !function>}
 * @struct
 */
var IS = loadTaskHelper('is');
/// #}}} @const IS

/// #{{{ @const SCRIPT_PATTERN
/**
 * @private
 * @const {!RegExp}
 */
var SCRIPT_PATTERN = /^\s*javascript\s*:\s*/i;
/// #}}} @const SCRIPT_PATTERN

/// #}}} @group CONSTANTS

/// #{{{ @group HELPERS
//////////////////////////////////////////////////////////////////////////////
// HELPERS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @group ERROR

/// #{{{ @func setError
/**
 * @private
 * @param {(!Error|!RangeError|!ReferenceError|!SyntaxError|!TypeError)} err
 * @param {string} msg
 * @return {(!Error|!RangeError|!ReferenceError|!SyntaxError|!TypeError)}
 */
var setError = loadTaskHelper('set-error');
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

/// #}}} @group ERROR

/// #{{{ @group IS

/// #{{{ @func isString
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isString = IS.string;
/// #}}} @func isString

/// #}}} @group IS

/// #}}} @group HELPERS

/// #{{{ @group METHODS
//////////////////////////////////////////////////////////////////////////////
// METHODS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func cleanHtmlAttribute
/**
 * @public
 * @param {string} attr
 * @return {string}
 */
function cleanHtmlAttribute(attr) {

  /// #{{{ @step verify-parameters

  if (!arguments.length) {
    throw setNoArgError(new Error, 'attr');
  }
  if ( !isString(attr) ) {
    throw setTypeError(new TypeError, 'attr', 'string');
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step check-empty-attribute

  if (!attr) {
    return '';
  }

  /// #}}} @step check-empty-attribute

  /// #{{{ @step clean-attribute

  attr = attr.replace(EOL_PATTERN, '');
  attr = attr.replace(/"/g, "'");
  attr = attr.replace(SCRIPT_PATTERN, '');

  /// #}}} @step clean-attribute

  /// #{{{ @step return-result

  return attr;

  /// #}}} @step return-result
}
/// #}}} @func cleanHtmlAttribute

/// #}}} @group METHODS

/// #{{{ @group EXPORTS
//////////////////////////////////////////////////////////////////////////////
// EXPORTS
//////////////////////////////////////////////////////////////////////////////

module.exports = cleanHtmlAttribute;

/// #}}} @group EXPORTS

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
