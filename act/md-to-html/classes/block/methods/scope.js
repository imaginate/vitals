/**
 * ---------------------------------------------------------------------------
 * SCOPE METHOD
 * ---------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life>
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
var loadHelper = require('../../../helpers/load-helper.js');
/// #}}} @func loadHelper

/// #}}} @group LOADERS

/// #{{{ @group HELPERS
//////////////////////////////////////////////////////////////////////////////
// HELPERS
//////////////////////////////////////////////////////////////////////////////

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

/// #{{{ @func setConstantProperty
/**
 * @private
 * @param {!Object} src
 * @param {string} key
 * @param {*} val
 * @param {boolean=} visible = `true`
 * @return {!Object}
 */
var setConstantProperty = loadHelper('set-constant-property');
/// #}}} @func setConstantProperty

/// #}}} @group OBJECT

/// #}}} @group HELPERS

/// #{{{ @group METHODS
//////////////////////////////////////////////////////////////////////////////
// METHODS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func Block.prototype.scope
/**
 * @public
 * @this {!Block}
 * @return {!Block}
 */
function scopeBlock() {

  /// #{{{ @step get-lines-in-block-scope

  this.CLASS.scope(this.ROOT, this, this.INDEX, this.DEPTH);

  /// #}}} @step get-lines-in-block-scope

  /// #{{{ @step freeze-scoped-lines

  freezeObject(this.LINES);

  /// #}}} @step freeze-scoped-lines

  /// #{{{ @step save-index-end-values

  setConstantProperty(this, 'LEN', this.LINES.length);
  setConstantProperty(this, 'END', this.INDEX + this.LEN);
  setConstantProperty(this, 'LAST', this.END - 1);

  /// #}}} @step save-index-end-values

  /// #{{{ @step return-block-instance

  return this;

  /// #}}} @step return-block-instance
}
/// #}}} @func Block.prototype.scope

/// #}}} @group METHODS

/// #{{{ @group EXPORTS
//////////////////////////////////////////////////////////////////////////////
// EXPORTS
//////////////////////////////////////////////////////////////////////////////

module.exports = scopeBlock;

/// #}}} @group EXPORTS

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
