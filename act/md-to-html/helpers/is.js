/**
 * ---------------------------------------------------------------------------
 * IS HELPERS
 * ---------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life>
 */

'use strict';

/// #{{{ @group LOADERS
//////////////////////////////////////////////////////////////////////////////
// LOADERS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func loadTaskHelper
/**
 * @private
 * @param {string} name
 * @return {(!Object|!Function)}
 */
var loadTaskHelper = require('./load-task-helper.js');
/// #}}} @func loadTaskHelper

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
var IS = loadTaskHelper('is');
/// #}}} @const IS

/// #}}} @group CONSTANTS

/// #{{{ @group METHODS
//////////////////////////////////////////////////////////////////////////////
// METHODS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func isBlock
/**
 * @public
 * @param {*} val
 * @return {boolean}
 */
var isBlock = require('./is-block.js');
/// #}}} @func isBlock

/// #{{{ @func isCodeBlock
/**
 * @public
 * @param {*} val
 * @return {boolean}
 */
var isCodeBlock = require('./is-code-block.js');
/// #}}} @func isCodeBlock

/// #{{{ @func isHeading
/**
 * @public
 * @param {*} val
 * @return {boolean}
 */
var isHeading = require('./is-heading.js');
/// #}}} @func isHeading

/// #{{{ @func isHtml
/**
 * @public
 * @param {*} val
 * @return {boolean}
 */
var isHtml = require('./is-html.js');
/// #}}} @func isHtml

/// #{{{ @func isListItem
/**
 * @public
 * @param {*} val
 * @return {boolean}
 */
var isListItem = require('./is-list-item.js');
/// #}}} @func isListItem

/// #{{{ @func isOrderedList
/**
 * @public
 * @param {*} val
 * @return {boolean}
 */
var isOrderedList = require('./is-ordered-list.js');
/// #}}} @func isOrderedList

/// #{{{ @func isParagraph
/**
 * @public
 * @param {*} val
 * @return {boolean}
 */
var isParagraph = require('./is-paragraph.js');
/// #}}} @func isParagraph

/// #{{{ @func isQuoteBlock
/**
 * @public
 * @param {*} val
 * @return {boolean}
 */
var isQuoteBlock = require('./is-quote-block.js');
/// #}}} @func isQuoteBlock

/// #{{{ @func isUnorderedList
/**
 * @public
 * @param {*} val
 * @return {boolean}
 */
var isUnorderedList = require('./is-unordered-list.js');
/// #}}} @func isUnorderedList

/// #}}} @group METHODS

/// #{{{ @group EXPORTS
//////////////////////////////////////////////////////////////////////////////
// EXPORTS
//////////////////////////////////////////////////////////////////////////////

IS.block = isBlock;

IS.codeBlock = isCodeBlock;
IS.codeblock = isCodeBlock;
IS.pre = isCodeBlock;

IS.heading = isHeading;
IS.h = isHeading;

IS.html = isHtml;

IS.listItem = isListItem;
IS.listitem = isListItem;
IS.li = isListItem;

IS.orderedList = isOrderedList;
IS.orderedlist = isOrderedList;
IS.ol = isOrderedList;

IS.paragraph = isParagraph;
IS.p = isParagraph;

IS.quoteBlock = isQuoteBlock;
IS.quoteblock = isQuoteBlock;
IS.quote = isQuoteBlock;

IS.unorderedList = isUnorderedList;
IS.unorderedlist = isUnorderedList;
IS.ul = isUnorderedList;

module.exports = IS;

/// #}}} @group EXPORTS

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
