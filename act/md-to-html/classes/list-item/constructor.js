/**
 * ---------------------------------------------------------------------------
 * LIST-ITEM CONSTRUCTOR
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
var loadHelper = require('../../helpers/load-helper.js');
/// #}}} @func loadHelper

/// #}}} @group LOADERS

/// #{{{ @group CONSTANTS
//////////////////////////////////////////////////////////////////////////////
// CONSTANTS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @const LI_TYPE
/**
 * @private
 * @const {!TypeId}
 */
var LI_TYPE = loadHelper('type-id').create('li');
/// #}}} @const LI_TYPE

/// #{{{ @const IS
/**
 * @private
 * @const {!Object<string, !function>}
 * @struct
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

/// #{{{ @func setNewError
/**
 * @private
 * @param {!SyntaxError} err
 * @param {string} constructor
 * @return {!SyntaxError}
 */
var setNewError = setError.new_;
/// #}}} @func setNewError

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

/// #{{{ @func isBlock
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isBlock = IS.block;
/// #}}} @func isBlock

/// #{{{ @func isInstanceOf
/**
 * @private
 * @param {*} inst
 * @param {!Function} constructor
 * @return {boolean}
 */
var isInstanceOf = IS.instanceOf;
/// #}}} @func isInstanceOf

/// #}}} @group IS

/// #{{{ @group OBJECT

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

/// #{{{ @group CLASS
//////////////////////////////////////////////////////////////////////////////
// CLASS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func ListItem
/**
 * @private
 * @param {!Block} base
 * @constructor
 * @struct
 */
function ListItem(base) {

  /// #{{{ @step verify-new-keyword

  if ( !isInstanceOf(this, ListItem) ) {
    throw setNewError(new SyntaxError, 'ListItem');
  }

  /// #}}} @step verify-new-keyword

  /// #{{{ @step verify-parameters

  if (!arguments.length) {
    throw setNoArgError(new Error, 'base');
  }
  if ( !isBlock(base) || base.ID !== 'li' ) {
    throw setTypeError(new TypeError, 'base', '!Block');
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step set-to-base-block-instance

  this = base;

  /// #}}} @step set-to-base-block-instance

  /// #{{{ @step update-members

  /// #{{{ @member TYPE
  /**
   * @const {!TypeId}
   */
  setConstantProperty(this, 'TYPE', LI_TYPE);
  /// #}}} @member TYPE

  /// #}}} @step update-members
}
/// #}}} @func ListItem

/// #{{{ @func isListItem
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isListItem = IS.listItem;
/// #}}} @func isListItem

/// #{{{ @func newListItem
/**
 * @public
 * @param {!Block} base
 * @return {!ListItem}
 */
function newListItem(base) {

  /// #{{{ @step verify-parameters

  if (!arguments.length) {
    throw setNoArgError(new Error, 'base');
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step return-new-list-item-instance

  return new ListItem(base);

  /// #}}} @step return-new-list-item-instance
}
/// #}}} @func newListItem

/// #{{{ @step setup-list-item-constructor

ListItem.is = isListItem;
ListItem.TYPE = LI_TYPE;
ListItem.create = newListItem;
ListItem.ListItem = ListItem;
ListItem.construct = newListItem;
ListItem.isListItem = isListItem;
ListItem.newListItem = newListItem;

/// #}}} @step setup-list-item-constructor

/// #}}} @group CLASS

/// #{{{ @group EXPORTS
//////////////////////////////////////////////////////////////////////////////
// EXPORTS
//////////////////////////////////////////////////////////////////////////////

module.exports = ListItem;

/// #}}} @group EXPORTS

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
