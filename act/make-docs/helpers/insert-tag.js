/**
 * ---------------------------------------------------------------------------
 * INSERT-TAG HELPER
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
 * @struct
 */
var IS = loadTaskHelper('is');
/// #}}} @const IS

/// #{{{ @const PART
/**
 * @private
 * @const {!Object<string, string>}
 * @struct
 */
var PART = {
  CONTENT: '\\s+([\\s\\S]*?)',
  HARD_CLOSE: '\\s*\\}\\}!',
  HARD_OPEN: '!\\{\\{\\s*',
  NOT: '!\\s*',
  SOFT_CLOSE: '\\s*\\}\\}\\?',
  SOFT_OPEN: '\\?\\{\\{\\s*'
};
/// #}}} @const PART

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
var setError = loadTaskHelper('set-error');
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

/// #}}} @group HELPERS

/// #{{{ @group METHODS
//////////////////////////////////////////////////////////////////////////////
// METHODS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func clearSoftTag
/**
 * @private
 * @param {string} src
 * @param {string} tag
 * @return {string}
 */
function clearSoftTag(src, tag) {

  /** @type {!RegExp} */
  var pattern;

  pattern = new RegExp(
    PART.SOFT_OPEN + tag + PART.CONTENT + PART.SOFT_CLOSE, 'g');
  src = src.replace(pattern, '');

  pattern = new RegExp(
    PART.SOFT_OPEN + PART.NOT + tag + PART.CONTENT + PART.SOFT_CLOSE, 'g');
  return src.replace(pattern, '$1');
}
/// #}}} @func clearSoftTag

/// #{{{ @func insertTag
/**
 * @public
 * @param {string} src
 * @param {string} tag
 * @param {string} val
 * @return {string}
 */
function insertTag(src, tag, val) {

  switch (arguments.length) {
    case 0:
      throw setNoArgError(new Error, 'src');
    case 1:
      throw setNoArgError(new Error, 'tag');
    case 2:
      throw setNoArgError(new Error, 'val');
  }

  if ( !isString(src) ) {
    throw setTypeError(new TypeError, 'src', 'string');
  }
  if ( !isString(tag) ) {
    throw setTypeError(new TypeError, 'tag', 'string');
  }
  if ( !isString(val) ) {
    throw setTypeError(new TypeError, 'val', 'string');
  }

  if (!tag) {
    throw setEmptyError(new Error, 'tag');
  }

  src = insertHardTag(src, tag, val);
  return !!val
    ? saveSoftTag(src, tag)
    : clearSoftTag(src, tag);
}
/// #}}} @func insertTag

/// #{{{ @func insertHardTag
/**
 * @private
 * @param {string} src
 * @param {string} tag
 * @param {string} val
 * @return {string}
 */
function insertHardTag(src, tag, val) {

  /** @type {!RegExp} */
  var pattern;

  pattern = new RegExp(PART.HARD_OPEN + tag + PART.HARD_CLOSE, 'g');
  return src.replace(pattern, val);
}
/// #}}} @func insertHardTag

/// #{{{ @func saveSoftTag
/**
 * @private
 * @param {string} src
 * @param {string} tag
 * @return {string}
 */
function saveSoftTag(src, tag) {

  /** @type {!RegExp} */
  var pattern;

  pattern = new RegExp(
    PART.SOFT_OPEN + tag + PART.CONTENT + PART.SOFT_CLOSE, 'g');
  src = src.replace(pattern, '$1');

  pattern = new RegExp(
    PART.SOFT_OPEN + PART.NOT + tag + PART.CONTENT + PART.SOFT_CLOSE, 'g');
  return src.replace(pattern, '');
}
/// #}}} @func saveSoftTag

/// #}}} @group METHODS

/// #{{{ @group EXPORTS
//////////////////////////////////////////////////////////////////////////////
// EXPORTS
//////////////////////////////////////////////////////////////////////////////

module.exports = insertTag;

/// #}}} @group EXPORTS

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
