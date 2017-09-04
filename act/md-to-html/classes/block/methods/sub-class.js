/**
 * ---------------------------------------------------------------------------
 * SUB-CLASS METHOD
 * ---------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life>
 */

'use strict';

/// #{{{ @group LOADERS
//////////////////////////////////////////////////////////////////////////////
// LOADERS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func loadClass
/**
 * @private
 * @param {string} id
 * @return {!Function}
 */
var loadClass = require('../../../helpers/load-class.js');
/// #}}} @func loadClass

/// #}}} @group LOADERS

/// #{{{ @group METHODS
//////////////////////////////////////////////////////////////////////////////
// METHODS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func Block.prototype.subClass
/**
 * @public
 * @this {!Block}
 * @return {!Block}
 */
function subClassBlock() {
  /// #{{{ @step return-updated-block-instance

  return loadClass(this.ID).create(this);

  /// #}}} @step return-updated-block-instance
}
/// #}}} @func Block.prototype.subClass

/// #}}} @group METHODS

/// #{{{ @group EXPORTS
//////////////////////////////////////////////////////////////////////////////
// EXPORTS
//////////////////////////////////////////////////////////////////////////////

module.exports = subClassBlock;

/// #}}} @group EXPORTS

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
