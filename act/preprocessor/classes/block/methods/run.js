/**
 * ---------------------------------------------------------------------------
 * RUN METHOD
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

/// #{{{ @func isFlagsNode
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isFlagsNode = loadHelper('is-flags-node');
/// #}}} @func isFlagsNode

/// #{{{ @func isLineNode
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isLineNode = loadHelper('is-line-node');
/// #}}} @func isLineNode

/// #{{{ @func isMngNode
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isMngNode = loadHelper('is-manager-node');
/// #}}} @func isMngNode

/// #}}} @group IS

/// #}}} @group HELPERS

/// #{{{ @group METHODS
//////////////////////////////////////////////////////////////////////////////
// METHODS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func Blk.prototype.run
/**
 * @public
 * @this {!Blk}
 * @param {!Flags} flags
 * @param {!Mng} mng
 * @return {string}
 */
function run(flags, mng) {

  /// #{{{ @step declare-variables

  /** @type {!Array<(!Line|!Blk|!Cond|!Incl)>} */
  var content;
  /** @type {string} */
  var result;
  /** @type {(!Line|!Blk|!Cond|!Incl)} */
  var node;
  /** @type {number} */
  var len;
  /** @type {number} */
  var i;

  /// #}}} @step declare-variables

  /// #{{{ @step verify-parameters

  switch (arguments.length) {
    case 0:
      throw setNoArgError(new Error, 'flags');
    case 1:
      throw setNoArgError(new Error, 'mng');
  }

  if ( !isFlagsNode(flags) )
    throw setTypeError(new TypeError, 'flags', '!Flags');
  if ( !isMngNode(mng) )
    throw setTypeError(new TypeError, 'mng', '!Mng');

  /// #}}} @step verify-parameters

  /// #{{{ @step setup-refs

  content = this.content;

  result = '';

  /// #}}} @step setup-refs

  /// #{{{ @step process-content

  len = content.length;
  i = -1;
  while (++i < len) {
    node = content[i];
    result += isLineNode(node)
      ? node.text + '\n'
      : node.run(flags, mng);
  }

  /// #}}} @step process-content

  /// #{{{ @step return-results

  return result;

  /// #}}} @step return-results
}
/// #}}} @func Blk.prototype.run

/// #}}} @group METHODS

/// #{{{ @group EXPORTS
//////////////////////////////////////////////////////////////////////////////
// EXPORTS
//////////////////////////////////////////////////////////////////////////////

module.exports = run;

/// #}}} @group EXPORTS

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
