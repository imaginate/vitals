/**
 * ---------------------------------------------------------------------------
 * MK-VALID-PATH-TEST HELPER
 * ---------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2017 Adam A Smith <adam@imaginate.life> (https://imaginate.life)
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
 */
var IS = require('./is.js');
/// #}}} @const IS
/// #}}} @group CONSTANTS

/// #{{{ @group HELPERS
//////////////////////////////////////////////////////////////////////////////
// HELPERS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func hasSlash
/**
 * @private
 * @param {string} src
 * @return {boolean}
 */
var hasSlash = require('./has-slash.js');
/// #}}} @func hasSlash

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
/// #}}} @group HELPERS

/// #{{{ @group METHODS
//////////////////////////////////////////////////////////////////////////////
// METHODS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func mkValidTest
/**
 * @private
 * @param {?RegExp} valid
 * @return {!function(string, string): boolean}
 */
function mkValidTest(valid) {
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
/// #}}} @func mkValidTest

/// #{{{ @func mkInvalidTest
/**
 * @private
 * @param {?RegExp} invalid
 * @return {!function(string, string): boolean}
 */
function mkInvalidTest(invalid) {
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
/// #}}} @func mkInvalidTest
/// #}}} @group METHODS

/// #{{{ @group EXPORTS
//////////////////////////////////////////////////////////////////////////////
// EXPORTS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func mkValidPathTest
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
function mkValidPathTest(valid, invalid) {

  /** @type {!function(string, string): boolean} */
  var isInvalid;
  /** @type {!function(string, string): boolean} */
  var isValid;

  if ( !isNull(valid) && !isRegExp(valid) )
    throw new TypeError('invalid `valid` data type (must be `null` or a `RegExp`)');
  if ( !isNull(invalid) && !isRegExp(invalid) )
    throw new TypeError('invalid `invalid` data type (must be `null` or a `RegExp`)');

  isValid = mkValidTest(valid);
  isInvalid = mkInvalidTest(invalid);
  return function isValidPath(name, tree) {
    return isValid(name, tree) && !isInvalid(name, tree);
  };
}
/// #}}} @func mkValidPathTest

module.exports = mkValidPathTest;

/// #}}} @group EXPORTS

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
