/**
 * ---------------------------------------------------------------------------
 * SET-EOL HELPER
 * ---------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life>
 */

'use strict';

/// #{{{ @group CONSTANTS
//////////////////////////////////////////////////////////////////////////////
// CONSTANTS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @const EOL
/**
 * @private
 * @const {!Object<string, string>}
 * @dict
 */
var EOL = {
  'CR': '\r',
  'LF': '\n',
  'CRLF': '\r\n'
};
/// #}}} @const EOL

/// #{{{ @const IS
/**
 * @private
 * @const {!Object<string, !function>}
 * @struct
 */
var IS = require('./is.js');
/// #}}} @const IS

/// #{{{ @const PATT
/**
 * @private
 * @const {!Object<string, !RegExp>}
 * @dict
 */
var PATT = {
  'CR': /\r?\n/g,
  'LF': /\r\n?/g,
  'CRLF': /\r?\n|\r\n?/g
};
/// #}}} @const PATT

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
var setError = require('./set-error.js');
/// #}}} @func setError

/// #{{{ @func setEmptyError
/**
 * @private
 * @param {!Error} err
 * @param {string} param
 * @return {!Error}
 */
var setEmptyError = setError.empty;
/// #}}} @func setEmptyError

/// #{{{ @func setEolError
/**
 * @private
 * @param {!RangeError} err
 * @param {string} param
 * @param {string} val
 * @return {!RangeError}
 */
var setEolError = setError.eol;
/// #}}} @func setEolError

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

/// #{{{ @group HAS

/// #{{{ @func hasOwnEnumProperty
/**
 * @private
 * @param {(!Object|!Function)} src
 * @param {(string|number)} key
 * @return {boolean}
 */
var hasOwnEnumProperty = require('./has-own-enum-property.js');
/// #}}} @func hasOwnEnumProperty

/// #}}} @group HAS

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

/// #{{{ @func setEol
/**
 * @public
 * @param {string} content
 * @param {string} eol
 * @return {string}
 */
function setEol(content, eol) {

  /// #{{{ @step verify-parameters

  switch (arguments.length) {
    case 0:
      throw setNoArgError(new Error, 'content');
    case 1:
      throw setNoArgError(new Error, 'eol');
  }

  if ( !isString(content) ) {
    throw setTypeError(new TypeError, 'content', 'string');
  }
  if ( !isString(eol) ) {
    throw setTypeError(new TypeError, 'eol', 'string');
  }

  if (!eol) {
    throw setEmptyError(new Error, 'eol');
  }

  eol = eol.toUpperCase();

  if ( !hasOwnEnumProperty(EOL, eol) ) {
    throw setEolError(new RangeError, 'eol', eol);
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step return-result

  return content && content.replace(PATT[eol], EOL[eol]);

  /// #}}} @step return-result
}
/// #}}} @func setEol

/// #}}} @group METHODS

/// #{{{ @group EXPORTS
//////////////////////////////////////////////////////////////////////////////
// EXPORTS
//////////////////////////////////////////////////////////////////////////////

module.exports = setEol;

/// #}}} @group EXPORTS

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
