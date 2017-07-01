/**
 * ---------------------------------------------------------------------------
 * LOAD METHOD
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

/// #{{{ @func setNoBlkError
/**
 * @private
 * @param {!Error} err
 * @param {!Line} line
 * @param {string} key
 * @param {!File} file
 * @return {!Error}
 */
var setNoBlkError = setError.noBlk;
/// #}}} @func setNoBlkError

/// #{{{ @func setPhaseError
/**
 * @private
 * @param {!Error} err
 * @param {string} func
 * @param {(!File|!Blk|!Cond|!Def|!Incl|!Ins)} node
 * @return {!Error}
 */
var setPhaseError = setError.phase;
/// #}}} @func setPhaseError

/// #}}} @group ERROR

/// #{{{ @group OBJECT

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

/// #{{{ @func Incl.prototype.load
/**
 * @public
 * @this {!Incl}
 * @return {!Incl}
 */
function load() {

  /// #{{{ @step declare-variables

  /** @type {!Object<string, !Blk>} */
  var blks;
  /** @type {string} */
  var key;

  /// #}}} @step declare-variables

  /// #{{{ @step verify-phase

  if (this.cmd)
    throw setPhaseError(new Error, 'load', this);

  /// #}}} @step verify-phase

  /// #{{{ @step set-member-refs

  blks = this.link.blks;
  key = this.key;

  /// #}}} @step set-member-refs

  /// #{{{ @step verify-cmd

  if ( !(key in blks) )
    throw setNoBlkError(new Error, this.line, key, this.link);

  /// #}}} @step verify-cmd

  /// #{{{ @step set-cmd-member

  /// #{{{ @member cmd
  /**
   * @public
   * @const {!Blk}
   */
  setupOffProperty(this, 'cmd', blks[key], true);
  /// #}}} @member cmd

  /// #}}} @step set-cmd-member

  /// #{{{ @step freeze-instance

  freezeObject(this);

  /// #}}} @step freeze-instance

  /// #{{{ @step return-instance

  return this;

  /// #}}} @step return-instance
}
/// #}}} @func Incl.prototype.load

/// #}}} @group METHODS

/// #{{{ @group EXPORTS
//////////////////////////////////////////////////////////////////////////////
// EXPORTS
//////////////////////////////////////////////////////////////////////////////

module.exports = load;

/// #}}} @group EXPORTS

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
