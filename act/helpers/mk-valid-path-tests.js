/**
 * ---------------------------------------------------------------------------
 * MK-VALID-PATH-TESTS HELPER
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

/// #{{{ @func mkValidTest
/**
 * @private
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
var mkValidPathTest = require('./mk-valid-path-test.js');
/// #}}} @func mkValidTest
/// #}}} @group HELPERS

/// #{{{ @group EXPORTS
//////////////////////////////////////////////////////////////////////////////
// EXPORTS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func mkValidPathTests
/**
 * @public
 * @param {?RegExp} dfltValid
 *   A pattern for matching valid path names or trees. If it is `null`, no
 *   check is performed. If it is a `RegExp`, the source property is checked
 *   for a forward slash, `"/"`. If it has a forward slash, the path tree is
 *   tested against the #valid pattern. Otherwise (i.e. if it does not have a
 *   forward slash), the path name is tested against the #valid pattern.
 * @param {?RegExp} dfltInvalid
 *   A pattern for matching invalid path names or trees. If it is `null`, no
 *   check is performed. If it is a `RegExp`, the source property is checked
 *   for a forward slash, `"/"`. If it has a forward slash, the path tree is
 *   tested against the #invalid pattern. Otherwise (i.e. if it does not have
 *   a forward slash), the path name is tested against the #invalid pattern.
 * @param {?RegExp} usrValid
 *   A pattern for matching valid path names or trees. If it is `null`, no
 *   check is performed. If it is a `RegExp`, the source property is checked
 *   for a forward slash, `"/"`. If it has a forward slash, the path tree is
 *   tested against the #valid pattern. Otherwise (i.e. if it does not have a
 *   forward slash), the path name is tested against the #valid pattern.
 * @param {?RegExp} usrInvalid
 *   A pattern for matching invalid path names or trees. If it is `null`, no
 *   check is performed. If it is a `RegExp`, the source property is checked
 *   for a forward slash, `"/"`. If it has a forward slash, the path tree is
 *   tested against the #invalid pattern. Otherwise (i.e. if it does not have
 *   a forward slash), the path name is tested against the #invalid pattern.
 * @return {!function(string, string): boolean}
 */
function mkValidPathTests(dfltValid, dfltInvalid, usrValid, usrInvalid) {

  /** @type {!function(string, string): boolean} */
  var isValidDflt;
  /** @type {!function(string, string): boolean} */
  var isValidUsr;

  if ( !isNull(dfltValid) && !isRegExp(dfltValid) )
    throw new TypeError('invalid `dfltValid` data type (must be `?RegExp`)');
  if ( !isNull(dfltInvalid) && !isRegExp(dfltInvalid) )
    throw new TypeError('invalid `dfltInvalid` data type (must be `?RegExp`)');
  if ( !isNull(usrValid) && !isRegExp(usrValid) )
    throw new TypeError('invalid `usrValid` data type (must be `?RegExp`)');
  if ( !isNull(usrInvalid) && !isRegExp(usrInvalid) )
    throw new TypeError('invalid `usrInvalid` data type (must be `?RegExp`)');

  isValidDflt = mkValidTest(dfltValid, dfltInvalid);
  isValidUsr = mkValidTest(usrValid, usrInvalid);
  return function isValidPath(name, tree) {
    return isValidDflt(name, tree) && isValidUsr(name, tree);
  };
}
/// #}}} @func mkValidPathTests

module.exports = mkValidPathTests;

/// #}}} @group EXPORTS

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
