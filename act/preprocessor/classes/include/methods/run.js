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

/// #{{{ @func setInclError
/**
 * @private
 * @param {!ReferenceError} err
 * @param {!Incl} incl1
 * @param {!Incl} incl2
 * @return {!ReferenceError}
 */
var setInclError = setError.incl;
/// #}}} @func setInclError

/// #{{{ @func setNoArgError
/**
 * @private
 * @param {!Error} err
 * @param {string} param
 * @return {!Error}
 */
var setNoArgError = setError.noArg;
/// #}}} @func setNoArgError

/// #{{{ @func setTreeError
/**
 * @private
 * @param {!ReferenceError} err
 * @param {?Incl} incl1
 * @param {!Incl} incl2
 * @return {!ReferenceError}
 */
var setTreeError = setError.tree;
/// #}}} @func setTreeError

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

/// #{{{ @func Incl.prototype.run
/**
 * @public
 * @this {!Incl}
 * @param {!Flags} flags
 * @param {!Mng} mng
 * @return {string}
 */
function run(flags, mng) {

  /// #{{{ @step declare-variables

  /** @type {string} */
  var result;
  /** @type {string} */
  var tree;

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

  /// #{{{ @step load-include

  if (!this.cmd)
    this.load();

  /// #}}} @step load-include

  /// #{{{ @step set-member-refs

  tree = this.link.tree;

  /// #}}} @step set-member-refs

  /// #{{{ @step catch-include-loop

  if ( mng.hasFile(tree) )
    throw setTreeError(new ReferenceError, mng.getFile(tree), this);

  /// #}}} @step catch-include-loop

  /// #{{{ @step catch-include-duplicate

  if ( mng.hasNode(this) )
    throw setInclError(new ReferenceError, mng.getNode(this), this);

  /// #}}} @step catch-include-duplicate

  /// #{{{ @step update-manager

  mng.addFile(tree, this);
  mng.addNode(this);

  /// #}}} @step update-manager

  /// #{{{ @step get-results

  result = this.cmd.run(flags, mng);

  /// #}}} @step get-results

  /// #{{{ @step return-results

  return result;

  /// #}}} @step return-results
}
/// #}}} @func Incl.prototype.run

/// #}}} @group METHODS

/// #{{{ @group EXPORTS
//////////////////////////////////////////////////////////////////////////////
// EXPORTS
//////////////////////////////////////////////////////////////////////////////

module.exports = run;

/// #}}} @group EXPORTS

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
