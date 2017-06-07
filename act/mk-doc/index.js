/**
 * ---------------------------------------------------------------------------
 * MK-DOC
 * ---------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2017 Adam A Smith <adam@imaginate.life> (https://imaginate.life)
 */

'use strict';

/// #{{{ @func loadHelper
/**
 * @private
 * @param {string} name
 * @return {(!Object|!Function)}
 */
var loadHelper = require('./load-helper.js');
/// #}}} @func loadHelper

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

/// #{{{ @func isString
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isString = IS.string;
/// #}}} @func isString

/// #{{{ @func isUndefined
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isUndefined = IS.undefined;
/// #}}} @func isUndefined
/// #}}} @group HELPERS

/// #{{{ @group METHODS
//////////////////////////////////////////////////////////////////////////////
// METHODS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func insertMentions
/**
 * @private
 * @param {string} doc
 * @return {string}
 */
var insertMentions = require('./mentions/insert.js');
/// #}}} @func insertMentions

/// #{{{ @func mkBody
/**
 * @private
 * @param {string} content
 * @param {string=} fscontent
 * @return {string}
 */
var mkBody = require('./mk-body/index.js');
/// #}}} @func mkBody

/// #{{{ @func mkFooter
/**
 * @private
 * @param {string} content
 * @param {string=} fscontent
 * @return {string}
 */
var mkFooter = require('./mk-footer.js');
/// #}}} @func mkFooter

/// #{{{ @func mkHeader
/**
 * @private
 * @param {string} content
 * @param {string=} fscontent
 * @return {string}
 */
var mkHeader = require('./mk-header/index.js');
/// #}}} @func mkHeader
/// #}}} @group METHODS

/// #{{{ @group EXPORTS
//////////////////////////////////////////////////////////////////////////////
// EXPORTS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func mkDoc
/**
 * @public
 * @param {string} content
 * @return {string}
 */
function mkDoc(content) {

  /** @type {string} */
  var result;

  if ( !isString(content) )
    throw new TypeError('invalid `content` type (must be a string)');

  result = mkHeader(content);
  result += mkBody(content);
  result += mkFooter(content);

  result = insertMentions(result);

  return result;
}
/// #}}} @func mkDoc

module.exports = mkDoc;

/// #}}} @group EXPORTS

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
