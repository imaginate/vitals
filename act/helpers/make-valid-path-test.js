/**
 * ---------------------------------------------------------------------------
 * MAKE-VALID-PATH-TEST HELPER
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

/// #{{{ @func hasSlash
/**
 * @private
 * @param {string} path
 * @return {boolean}
 */
var hasSlash = require('./has-slash.js');
/// #}}} @func hasSlash

/// #}}} @group HAS

/// #{{{ @group IS

/// #{{{ @func isNull
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isNull = IS.nil;
/// #}}} @func isNull

/// #{{{ @func isRegExp
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isRegExp = IS.regexp;
/// #}}} @func isRegExp

/// #}}} @group IS

/// #}}} @group HELPERS

/// #{{{ @group METHODS
//////////////////////////////////////////////////////////////////////////////
// METHODS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func makeValidPathTest
/**
 * @public
 * @param {?RegExp} valid
 *   A pattern for matching valid path names or trees. If it is `null`, no
 *   check is performed. If it is a `RegExp`, the source property is checked
 *   for a forward slash, `"/"`. If it has a forward slash, the path tree is
 *   tested against the #valid pattern. Otherwise (i.e. if it does not have a
 *   forward slash), the path name is tested against the #valid pattern.
 * @param {?RegExp} invalid
 *   A pattern for matching invalid path names or trees. If it is `null`, no
 *   check is performed. If it is a `RegExp`, the source property is checked
 *   for a forward slash, `"/"`. If it has a forward slash, the path tree is
 *   tested against the #invalid pattern. Otherwise (i.e. if it does not have
 *   a forward slash), the path name is tested against the #invalid pattern.
 * @return {!function(string, string): boolean}
 */
function makeValidPathTest(valid, invalid) {

  /** @type {!function(string, string): boolean} */
  var isInvalid;
  /** @type {!function(string, string): boolean} */
  var isValid;

  switch (arguments.length) {
    case 0:
      throw setNoArgError(new Error, 'valid');
    case 1:
      throw setNoArgError(new Error, 'invalid');
  }

  if ( !isNull(valid) && !isRegExp(valid) ) {
    throw setTypeError(new TypeError, 'valid', '?RegExp');
  }
  if ( !isNull(invalid) && !isRegExp(invalid) ) {
    throw setTypeError(new TypeError, 'invalid', '?RegExp');
  }

  isValid = makeValidTest(valid);
  isInvalid = makeInvalidTest(invalid);
  return function isValidPath(name, tree) {
    return isValid(name, tree) && !isInvalid(name, tree);
  };
}
/// #}}} @func makeValidPathTest

/// #{{{ @func makeValidTest
/**
 * @private
 * @param {?RegExp} valid
 * @return {!function(string, string): boolean}
 */
function makeValidTest(valid) {

  if (!arguments.length) {
    throw setNoArgError(new Error, 'valid');
  }
  if ( !isNull(valid) && !isRegExp(valid) ) {
    throw setTypeError(new TypeError, 'valid', '?RegExp');
  }

  return !!valid
    ? hasSlash(valid.source)
      ? function isValid(name, tree) {
          return valid.test(tree);
        }
      : function isValid(name, tree) {
          return valid.test(name);
        }
    : function isValid(name, tree) {
        return true;
      };
}
/// #}}} @func makeValidTest

/// #{{{ @func makeInvalidTest
/**
 * @private
 * @param {?RegExp} invalid
 * @return {!function(string, string): boolean}
 */
function makeInvalidTest(invalid) {

  if (!arguments.length) {
    throw setNoArgError(new Error, 'invalid');
  }
  if ( !isNull(invalid) && !isRegExp(invalid) ) {
    throw setTypeError(new TypeError, 'invalid', '?RegExp');
  }

  return !!invalid
    ? hasSlash(invalid.source)
      ? function isInvalid(name, tree) {
          return invalid.test(tree);
        }
      : function isInvalid(name, tree) {
          return invalid.test(name);
        }
    : function isInvalid(name, tree) {
        return false;
      };
}
/// #}}} @func makeInvalidTest

/// #}}} @group METHODS

/// #{{{ @group EXPORTS
//////////////////////////////////////////////////////////////////////////////
// EXPORTS
//////////////////////////////////////////////////////////////////////////////

module.exports = makeValidPathTest;

/// #}}} @group EXPORTS

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
