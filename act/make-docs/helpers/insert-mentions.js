/**
 * ---------------------------------------------------------------------------
 * INSERT-MENTIONS HELPER
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

/// #{{{ @const DATA
/**
 * @private
 * @const {!Object}
 */
var DATA = require('../mentions.json');
/// #}}} @const DATA

/// #{{{ @const IS
/**
 * @private
 * @const {!Object<string, !function>}
 * @struct
 */
var IS = loadTaskHelper('is');
/// #}}} @const IS

/// #{{{ @const PATT
/**
 * @private
 * @const {!Object<string, !RegExp>}
 * @struct
 */
var PATT = {
  AT_NAME: /#\{\{\s*([a-zA-Z0-9_\-\$#]+)\s*\}\}#/g,
  AT_URL: /@\{\{\s*([a-zA-Z0-9_\-\$#]+)\s*\}\}@/g,
  HASH: /#/,
  ID: /#.*$/,
  METHOD: /^.*?-(?=(?:example|params|returns)(?:-.*)?$)/,
  PARAM: /^params-.+$/,
  PARAMS: /^params(?:-.*)?$/,
  PARAMS_PREFIX: /^params-/,
  PARTS: /-(?:example|params|returns)(?:-.*)?$/,
  REF: /^[^#]*#/,
  USER_PREFIX: /^user-content-?/,
  VALID: /^[a-zA-Z0-9_\$][a-zA-Z0-9_\-\$]*$/
};
/// #}}} @const PATT

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

/// #{{{ @func setNoRefError
/**
 * @private
 * @param {!RangeError} err
 * @param {string} id
 * @param {!Object} data
 * @return {!RangeError}
 */
function setNoRefError(err, id, data) {

  /// #{{{ @step declare-variables

  /** @type {string} */
  var msg;

  /// #}}} @step declare-variables

  /// #{{{ @step verify-parameters

  switch (arguments.length) {
    case 0:
      throw setNoArgError(new Error, 'err');
    case 1:
      throw setNoArgError(new Error, 'id');
    case 2:
      throw setNoArgError(new Error, 'data');
  }

  if ( !isError(err) ) {
    throw setTypeError(new TypeError, 'err', '!RangeError');
  }
  if ( !isString(id) ) {
    throw setTypeError(new TypeError, 'id', 'string');
  }
  if ( !isObject(data) ) {
    throw setTypeError(new TypeError, 'data', '!Object');
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step make-error-message

  msg = 'undefined reference id in documentation`\n'
    + '    invalid-ref-id: `"' + id + '"`\n'
    + '    valid-ref-ids:\n'
    + '        `"' + getKeys(data).join('"`\n        `"') + '"`';

  /// #}}} @step make-error-message

  /// #{{{ @step set-error-name-property

  if (err.name !== 'RangeError') {
    err.name = 'RangeError';
  }

  /// #}}} @step set-error-name-property

  /// #{{{ @step return-error

  return setError(err, msg);

  /// #}}} @step return-error
}
/// #}}} @func setNoRefError

/// #{{{ @func setRefError
/**
 * @private
 * @param {!RangeError} err
 * @param {string} id
 * @return {!RangeError}
 */
function setRefError(err, id) {

  /// #{{{ @step declare-variables

  /** @type {string} */
  var msg;

  /// #}}} @step declare-variables

  /// #{{{ @step verify-parameters

  switch (arguments.length) {
    case 0:
      throw setNoArgError(new Error, 'err');
    case 1:
      throw setNoArgError(new Error, 'id');
  }

  if ( !isError(err) ) {
    throw setTypeError(new TypeError, 'err', '!RangeError');
  }
  if ( !isString(id) ) {
    throw setTypeError(new TypeError, 'id', 'string');
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step make-error-message

  msg = 'invalid reference id in documentation`\n'
    + '    invalid-ref-id: `"' + id + '"`\n'
    + '    valid-pattern: `/^[a-zA-Z0-9_$][a-zA-Z0-9_-$]*$/`';

  /// #}}} @step make-error-message

  /// #{{{ @step set-error-name-property

  if (err.name !== 'RangeError') {
    err.name = 'RangeError';
  }

  /// #}}} @step set-error-name-property

  /// #{{{ @step return-error

  return setError(err, msg);

  /// #}}} @step return-error
}
/// #}}} @func setRefError

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

/// #{{{ @group GET

/// #{{{ @func getKeys
/**
 * @private
 * @param {(!Object|!Function)} src
 * @return {!Array}
 */
var getKeys = loadTaskHelper('get-keys');
/// #}}} @func getKeys

/// #}}} @group GET

/// #{{{ @group HAS

/// #{{{ @func hasOwnEnumProperty
/**
 * @private
 * @param {(!Object|!Function)} src
 * @param {(string|number)} key
 * @return {boolean}
 */
var hasOwnEnumProperty = loadTaskHelper('has-own-enum-property');
/// #}}} @func hasOwnEnumProperty

/// #}}} @group HAS

/// #{{{ @group IS

/// #{{{ @func isError
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isError = IS.error;
/// #}}} @func isError

/// #{{{ @func isObject
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isObject = IS.object;
/// #}}} @func isObject

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

/// #{{{ @func insertMentions
/**
 * @public
 * @param {string} content
 * @return {string}
 */
function insertMentions(content) {

  if (!arguments.length) {
    throw setNoArgError(new Error, 'content');
  }
  if ( !isString(content) ) {
    throw setTypeError(new TypeError, 'content', 'string');
  }

  PATT.AT_NAME.lastIndex = 0;
  PATT.AT_URL.lastIndex = 0;

  content = content.replace(PATT.AT_NAME, insertName);
  content = content.replace(PATT.AT_URL, insertUrl);

  return content;
}
/// #}}} @func insertMentions

/// #{{{ @func insertName
/**
 * @private
 * @param {string} tag
 * @param {string} ref
 * @return {string}
 */
function insertName(tag, ref) {

  /** @type {string} */
  var method;
  /** @type {string} */
  var name;
  /** @type {string} */
  var id;

  id = '';

  if ( PATT.HASH.test(ref) ) {
    id = ref.replace(PATT.REF, '');
    id = id.replace(PATT.USER_PREFIX, '');
    ref = ref.replace(PATT.ID, '');

    if ( !PATT.VALID.test(ref) || !PATT.VALID.test(id) ) {
      throw setRefError(new RangeError, ref + '#' + id);
    }
  }
  else if ( !PATT.VALID.test(ref) ) {
    throw setRefError(new RangeError, ref);
  }

  if ( !hasOwnEnumProperty(DATA.NAME, ref) ) {
    throw setNoRefError(new RangeError, ref, DATA.NAME);
  }

  name = DATA.NAME[ref];

  if (!id || id === 'top') {
    return name;
  }

  if ( !hasOwnEnumProperty(DATA.METHOD, ref) || DATA.METHOD[ref] !== true ) {
    name += id.replace(/-/g, ' ');
    return name;
  }

  method = id.replace(PATT.PARTS, '');
  method = method.replace(/-/g, '.');

  if (method && method !== 'main') {
    name += '.' + method;
  }

  if ( !PATT.PARTS.test(id) ) {
    return name;
  }

  id = id.replace(PATT.METHOD, '');
  name += PATT.PARAMS.test(id)
    ? PATT.PARAM.test(id)
      ? ' parameter ' + id.replace(PARAMS_PREFIX, '').replace(/-/g, ' ')
      : ' parameters'
    : id === 'returns'
      ? ' return value'
      : ' ' + id.replace(/-/g, ' ');

  return name;
}
/// #}}} @func insertName

/// #{{{ @func insertUrl
/**
 * @private
 * @param {string} tag
 * @param {string} ref
 * @return {string}
 */
function insertUrl(tag, ref) {

  /** @type {string} */
  var url;
  /** @type {string} */
  var id;

  id = '';

  if ( PATT.HASH.test(ref) ) {
    id = ref.replace(PATT.REF, '');
    id = id.replace(PATT.USER_PREFIX, '');
    ref = ref.replace(PATT.ID, '');

    if ( !PATT.VALID.test(ref) || !PATT.VALID.test(id) ) {
      throw setRefError(new RangeError, ref + '#' + id);
    }
  }
  else if ( !PATT.VALID.test(ref) ) {
    throw setRefError(new RangeError, ref);
  }

  if ( !hasOwnEnumProperty(DATA.URL, ref) ) {
    throw setNoRefError(new RangeError, ref, DATA.URL);
  }

  url = DATA.URL[ref];

  if (id) {
    url += '#user-content-' + id;
  }

  return url;
}
/// #}}} @func insertUrl

/// #}}} @group METHODS

/// #{{{ @group EXPORTS
//////////////////////////////////////////////////////////////////////////////
// EXPORTS
//////////////////////////////////////////////////////////////////////////////

module.exports = insertMentions;

/// #}}} @group EXPORTS

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
