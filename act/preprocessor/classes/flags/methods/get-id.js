/**
 * ---------------------------------------------------------------------------
 * GET-ID METHOD
 * ---------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life> (https://imaginate.life)
 */

'use strict';

/// #{{{ @group LOADERS
//////////////////////////////////////////////////////////////////////////////
// LOADERS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func loadHelper
/**
 * @private
 * @param {string} name
 * @return {(!Object|!Function)}
 */
var loadHelper = require('./.load-helper.js');
/// #}}} @func loadHelper

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
var IS = loadHelper('is');
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
var setError = loadHelper('set-error');
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

/// #{{{ @group STRING

/// #{{{ @func trimColon
/**
 * @private
 * @param {string} src
 * @return {string}
 */
var trimColon = loadHelper('trim-colon');
/// #}}} @func trimColon

/// #}}} @group STRING

/// #}}} @group HELPERS

/// #{{{ @group METHODS
//////////////////////////////////////////////////////////////////////////////
// METHODS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func Flags.prototype.getId
/**
 * @public
 * @this {!Flags}
 * @param {string} id
 * @return {(boolean|undefined)}
 */
function getId(id) {

  /// #{{{ @step declare-variables

  /** @type {!Object<string, !RegExp>} */
  var approx;
  /** @type {!RegExp} */
  var patt;
  /** @type {string} */
  var item;

  /// #}}} @step declare-variables

  /// #{{{ @step verify-parameters

  if (!arguments.length)
    throw setNoArgError(new Error, 'id');
  if ( !isString(id) )
    throw setTypeError(new TypeError, 'id', 'string');

  id = id && trimColon(id);

  if (!id)
    throw setEmptyError(new Error, 'id');

  /// #}}} @step verify-parameters

  /// #{{{ @step check-exact

  if (id in this.exactIds)
    return this.exactIds[id];

  /// #}}} @step check-exact

  /// #{{{ @step check-approx

  approx = this.approxIds;

  for (item in approx) {
    patt = approx[item];
    if ( patt.test(id) ) {
      return patt.state;
    }
  }

  /// #}}} @step check-approx

  /// #{{{ @step return-undefined

  return undefined;

  /// #}}} @step return-undefined
}
/// #}}} @func Flags.prototype.getId

/// #}}} @group METHODS

/// #{{{ @group EXPORTS
//////////////////////////////////////////////////////////////////////////////
// EXPORTS
//////////////////////////////////////////////////////////////////////////////

module.exports = getId;

/// #}}} @group EXPORTS

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
