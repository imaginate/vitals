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
 * @param {!ReferenceError} err
 * @param {string} file
 * @param {string} id
 * @param {!Object} data
 * @return {!ReferenceError}
 */
function setNoRefError(err, file, id, data) {

  /// #{{{ @step declare-variables

  /** @type {!Array<string>} */
  var ids;
  /** @type {string} */
  var msg;

  /// #}}} @step declare-variables

  /// #{{{ @step verify-parameters

  switch (arguments.length) {
    case 0:
      throw setNoArgError(new Error, 'err');
    case 1:
      throw setNoArgError(new Error, 'file');
    case 2:
      throw setNoArgError(new Error, 'id');
    case 3:
      throw setNoArgError(new Error, 'data');
  }

  if ( !isError(err) ) {
    throw setTypeError(new TypeError, 'err', '!ReferenceError');
  }
  if ( !isString(file) ) {
    throw setTypeError(new TypeError, 'file', 'string');
  }
  if ( !isString(id) ) {
    throw setTypeError(new TypeError, 'id', 'string');
  }
  if ( !isObject(data) ) {
    throw setTypeError(new TypeError, 'data', '!Object');
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step make-error-message

  msg = 'undefined mentions id set in documentation\n'
    + '    source-file-path: `' + file + '`\n'
    + '    invalid-mentions-id: `"' + id + '"`\n'
    + '    valid-mentions-ids:';

  ids = getKeys(data);
  msg += ids.length > 0
    ? '\n        `"' + ids.join('"`\n        `"') + '"`'
    : ' <no-defined-ids>';

  /// #}}} @step make-error-message

  /// #{{{ @step set-error-name-property

  if (err.name !== 'ReferenceError') {
    err.name = 'ReferenceError';
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
 * @param {string} file
 * @param {string} id
 * @return {!RangeError}
 */
function setRefError(err, file, id) {

  /// #{{{ @step declare-variables

  /** @type {string} */
  var msg;

  /// #}}} @step declare-variables

  /// #{{{ @step verify-parameters

  switch (arguments.length) {
    case 0:
      throw setNoArgError(new Error, 'err');
    case 1:
      throw setNoArgError(new Error, 'file');
    case 2:
      throw setNoArgError(new Error, 'id');
  }

  if ( !isError(err) ) {
    throw setTypeError(new TypeError, 'err', '!RangeError');
  }
  if ( !isString(file) ) {
    throw setTypeError(new TypeError, 'file', 'string');
  }
  if ( !isString(id) ) {
    throw setTypeError(new TypeError, 'id', 'string');
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step make-error-message

  msg = 'invalid mentions id set in documentation\n'
    + '    source-file-path: `' + file + '`\n'
    + '    invalid-id-value: `"' + id + '"`\n'
    + '    valid-id-pattern: `/^[a-zA-Z0-9_$][a-zA-Z0-9_-$]*$/`';

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
 * @param {string} srcFile
 * @param {string} content
 * @return {string}
 */
function insertMentions(srcFile, content) {

  /// #{{{ @step verify-parameters

  switch (arguments.length) {
    case 0:
      throw setNoArgError(new Error, 'srcFile');
    case 1:
      throw setNoArgError(new Error, 'content');
  }

  if ( !isString(srcFile) ) {
    throw setTypeError(new TypeError, 'srcFile', 'string');
  }
  if ( !isString(content) ) {
    throw setTypeError(new TypeError, 'content', 'string');
  }

  if (!srcFile) {
    throw setEmptyError(new Error, 'srcFile');
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step reset-last-index

  PATT.AT_NAME.lastIndex = 0;
  PATT.AT_URL.lastIndex = 0;

  /// #}}} @step reset-last-index

  /// #{{{ @step insert-each-mention

  content = content.replace(PATT.AT_NAME, function _insertName(tag, ref) {
    return insertName(srcFile, tag, ref);
  });
  content = content.replace(PATT.AT_URL, function _insertUrl(tag, ref) {
    return insertUrl(srcFile, tag, ref);
  });

  /// #}}} @step insert-each-mention

  /// #{{{ @step return-result

  return content;

  /// #}}} @step return-result
}
/// #}}} @func insertMentions

/// #{{{ @func insertName
/**
 * @private
 * @param {string} file
 * @param {string} tag
 * @param {string} ref
 * @return {string}
 */
function insertName(file, tag, ref) {

  /// #{{{ @step declare-variables

  /** @type {string} */
  var method;
  /** @type {string} */
  var name;
  /** @type {string} */
  var id;

  /// #}}} @step declare-variables

  /// #{{{ @step verify-parameters

  switch (arguments.length) {
    case 0:
      throw setNoArgError(new Error, 'file');
    case 1:
      throw setNoArgError(new Error, 'tag');
    case 2:
      throw setNoArgError(new Error, 'ref');
  }

  if ( !isString(file) ) {
    throw setTypeError(new TypeError, 'file', 'string');
  }
  if ( !isString(tag) ) {
    throw setTypeError(new TypeError, 'tag', 'string');
  }
  if ( !isString(ref) ) {
    throw setTypeError(new TypeError, 'ref', 'string');
  }

  if (!file) {
    throw setEmptyError(new Error, 'file');
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step parse-ref-id

  if ( PATT.HASH.test(ref) ) {
    id = ref.replace(PATT.REF, '');
    id = id.replace(PATT.USER_PREFIX, '');
    ref = ref.replace(PATT.ID, '');

    if ( !PATT.VALID.test(ref) || !PATT.VALID.test(id) ) {
      throw setRefError(new RangeError, file, ref + '#' + id);
    }
  }
  else if ( !PATT.VALID.test(ref) ) {
    throw setRefError(new RangeError, file, ref);
  }
  else {
    id = '';
  }

  /// #}}} @step parse-ref-id

  /// #{{{ @step verify-ref-id

  if ( !hasOwnEnumProperty(DATA.NAME, ref) ) {
    throw setNoRefError(new ReferenceError, file, ref, DATA.NAME);
  }

  /// #}}} @step verify-ref-id

  /// #{{{ @step make-ref-name

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

  /// #}}} @step make-ref-name

  /// #{{{ @step return-ref-name

  return name;

  /// #}}} @step return-ref-name
}
/// #}}} @func insertName

/// #{{{ @func insertUrl
/**
 * @private
 * @param {string} file
 * @param {string} tag
 * @param {string} ref
 * @return {string}
 */
function insertUrl(file, tag, ref) {

  /// #{{{ @step declare-variables

  /** @type {string} */
  var url;
  /** @type {string} */
  var id;

  /// #}}} @step declare-variables

  /// #{{{ @step verify-parameters

  switch (arguments.length) {
    case 0:
      throw setNoArgError(new Error, 'file');
    case 1:
      throw setNoArgError(new Error, 'tag');
    case 2:
      throw setNoArgError(new Error, 'ref');
  }

  if ( !isString(file) ) {
    throw setTypeError(new TypeError, 'file', 'string');
  }
  if ( !isString(tag) ) {
    throw setTypeError(new TypeError, 'tag', 'string');
  }
  if ( !isString(ref) ) {
    throw setTypeError(new TypeError, 'ref', 'string');
  }

  if (!file) {
    throw setEmptyError(new Error, 'file');
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step parse-ref-id

  if ( PATT.HASH.test(ref) ) {
    id = ref.replace(PATT.REF, '');
    id = id.replace(PATT.USER_PREFIX, '');
    ref = ref.replace(PATT.ID, '');

    if ( !PATT.VALID.test(ref) || !PATT.VALID.test(id) ) {
      throw setRefError(new RangeError, file, ref + '#' + id);
    }
  }
  else if ( !PATT.VALID.test(ref) ) {
    throw setRefError(new RangeError, file, ref);
  }
  else {
    id = '';
  }

  /// #}}} @step parse-ref-id

  /// #{{{ @step verify-ref-id

  if ( !hasOwnEnumProperty(DATA.URL, ref) ) {
    throw setNoRefError(new ReferenceError, file, ref, DATA.URL);
  }

  /// #}}} @step verify-ref-id

  /// #{{{ @step make-ref-url

  url = DATA.URL[ref];

  if (id) {
    url += '#user-content-' + id;
  }

  /// #}}} @step make-ref-url

  /// #{{{ @step return-ref-url

  return url;

  /// #}}} @step return-ref-url
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
