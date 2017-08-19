/**
 * ---------------------------------------------------------------------------
 * PARSE-VERSION HELPER
 * ---------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life>
 */

'use strict';

/// #{{{ @group CONSTANTS
//////////////////////////////////////////////////////////////////////////////
// CONSTANTS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @const IS
/**
 * @private
 * @const {!Object<string, !function>}
 * @struct
 */
var IS = require('./is.js');
/// #}}} @const IS

/// #{{{ @const MAJOR
/**
 * @private
 * @const {!RegExp}
 */
var MAJOR = /^v?([0-9]+)\.[0-9]+\.[0-9]+(?:-[a-z]+(?:\.[0-9]+)?)?$/;
/// #}}} @const MAJOR

/// #{{{ @const MINOR
/**
 * @private
 * @const {!RegExp}
 */
var MINOR = /^v?[0-9]+\.([0-9]+)\.[0-9]+(?:-[a-z]+(?:\.[0-9]+)?)?$/;
/// #}}} @const MINOR

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

/// #{{{ @func setNoArgError
/**
 * @private
 * @param {!Error} err
 * @param {string} param
 * @return {!Error}
 */
var setNoArgError = setError.noArg;
/// #}}} @func setNoArgError

/// #{{{ @func setSemVerError
/**
 * @private
 * @param {!RangeError} err
 * @param {string} param
 * @param {string} version
 * @return {!RangeError}
 */
var setSemVerError = setError.semVer;
/// #}}} @func setSemVerError

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

/// #{{{ @func isSemanticVersion
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isSemanticVersion = IS.semanticVersion;
/// #}}} @func isSemanticVersion

/// #{{{ @func isString
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isString = IS.string;
/// #}}} @func isString

/// #}}} @group IS

/// #{{{ @group OBJECT

/// #{{{ @func freezeObject
/**
 * @private
 * @param {(?Object|?Function)} src
 * @param {boolean=} deep = `false`
 * @return {(?Object|?Function)}
 */
var freezeObject = require('./freeze-object.js');
/// #}}} @func freezeObject

/// #}}} @group OBJECT

/// #}}} @group HELPERS

/// #{{{ @group METHODS
//////////////////////////////////////////////////////////////////////////////
// METHODS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func parseVersion
/**
 * @public
 * @param {string} version
 * @return {!Object<string, number>}
 */
function parseVersion(version) {

  /// #{{{ @step verify-parameters

  if (!arguments.length) {
    throw setNoArgError(new Error, 'version');
  }
  if ( !isString(version) ) {
    throw setTypeError(new TypeError, 'version', 'string');
  }
  if (!version) {
    throw setEmptyError(new Error, 'version');
  }
  if ( !isSemanticVersion(version) ) {
    throw setSemVerError(new Error, 'version', version);
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step return-parsed-version

  return freezeObject({
    'major': Number( version.replace(MAJOR, '$1') ),
    'minor': Number( version.replace(MINOR, '$1') )
  });

  /// #}}} @step return-parsed-version
}
/// #}}} @func parseVersion

/// #}}} @group METHODS

/// #{{{ @group EXPORTS
//////////////////////////////////////////////////////////////////////////////
// EXPORTS
//////////////////////////////////////////////////////////////////////////////

module.exports = parseVersion;

/// #}}} @group EXPORTS

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
