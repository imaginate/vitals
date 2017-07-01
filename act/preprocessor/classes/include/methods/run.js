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

/// #{{{ @func isObject
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isObject = IS.object;
/// #}}} @func isObject

/// #}}} @group IS

/// #{{{ @group OBJECT

/// #{{{ @func cloneInclFiles
/**
 * @private
 * @param {!Object<string, ?Incl>} src
 * @return {!Object<string, ?Incl>}
 */
function cloneInclFiles(src) {

  /// #{{{ @step declare-variables

  /** @type {!Object<string, ?Incl>} */
  var inclFiles;
  /** @type {string} */
  var key;

  /// #}}} @step declare-variables

  /// #{{{ @step verify-parameters

  if (!arguments.length)
    throw setNoArgError(new Error, 'src');
  if ( !isObject(src) )
    throw setTypeError(new TypeError, 'src', '!Object<string, ?Incl>');

  /// #}}} @step verify-parameters

  /// #{{{ @step make-empty-object

  inclFiles = createObject(null);

  /// #}}} @step make-empty-object

  /// #{{{ @step copy-properties

  for (key in src)
    setupOffProperty(inclFiles, key, src[key], true);

  /// #}}} @step copy-properties

  /// #{{{ @step return-clone

  return inclFiles;

  /// #}}} @step return-clone
}
/// #}}} @func cloneInclFiles

/// #{{{ @func createObject
/**
 * @private
 * @param {?Object} proto
 * @return {!Object}
 */
var createObject = loadHelper('create-object');
/// #}}} @func createObject

/// #{{{ @func freezeObject
/**
 * @private
 * @param {(?Object|?Function)} src
 * @param {boolean=} deep = `false`
 * @return {(?Object|?Function)}
 */
var freezeObject = loadHelper('freeze-object');
/// #}}} @func freezeObject

/// #{{{ @func setupOffProperty
/**
 * @private
 * @param {!Object} src
 * @param {string} key
 * @param {*} value
 * @param {boolean=} visible = `false`
 * @return {!Object}
 */
var setupOffProperty = loadHelper('setup-off-property');
/// #}}} @func setupOffProperty

/// #}}} @group OBJECT

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
 * @param {!Object<string, ?Incl>} inclFiles
 * @param {!Object<string, !Incl>} inclNodes
 * @return {string}
 */
function run(flags, inclFiles, inclNodes) {

  /// #{{{ @step declare-variables

  /** @type {string} */
  var result;
  /** @type {string} */
  var tree;
  /** @type {string} */
  var key;

  /// #}}} @step declare-variables

  /// #{{{ @step verify-parameters

  switch (arguments.length) {
    case 0:
      throw setNoArgError(new Error, 'flags');
    case 1:
      throw setNoArgError(new Error, 'inclFiles');
    case 2:
      throw setNoArgError(new Error, 'inclNodes');
  }

  if ( !isFlagsNode(flags) )
    throw setTypeError(new TypeError, 'flags', '!Flags');
  if ( !isObject(inclFiles) )
    throw setTypeError(new TypeError, 'inclFiles', '!Object<string, ?Incl>');
  if ( !isObject(inclNodes) )
    throw setTypeError(new TypeError, 'inclNodes', '!Object<string, !Incl>');

  /// #}}} @step verify-parameters

  /// #{{{ @step load-include

  if (!this.cmd)
    this.load();

  /// #}}} @step load-include

  /// #{{{ @step set-member-refs

  tree = this.link.tree;
  key = tree + '|' + this.key;

  /// #}}} @step set-member-refs

  /// #{{{ @step catch-include-loop

  if (tree in inclFiles)
    throw setTreeError(new ReferenceError, inclFiles[tree], this);

  /// #}}} @step catch-include-loop

  /// #{{{ @step catch-include-duplicate

  if (key in inclNodes)
    throw setInclError(new ReferenceError, inclNodes[key], this);

  /// #}}} @step catch-include-duplicate

  /// #{{{ @step update-include-management

  inclFiles = cloneInclFiles(inclFiles);
  setupOffProperty(inclFiles, tree, this, true);
  freezeObject(inclFiles);

  setupOffProperty(inclNodes, key, this, true);

  /// #}}} @step update-include-management

  /// #{{{ @step get-results

  result = this.cmd.run(flags, inclFiles, inclNodes);

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
