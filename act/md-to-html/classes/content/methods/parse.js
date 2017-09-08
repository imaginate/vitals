/**
 * ---------------------------------------------------------------------------
 * PARSE METHOD
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

/// #{{{ @group CONSTANTS
//////////////////////////////////////////////////////////////////////////////
// CONSTANTS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @const BREAK_PATTERN
/**
 * @private
 * @const {!RegExp}
 */
var BREAK_PATTERN = /^[ \t\r\n)\]}]$/
/// #}}} @const BREAK_PATTERN

/// #{{{ @const ESC_CHAR
/**
 * @private
 * @const {string}
 */
var ESC_CHAR = '\\';
/// #}}} @const ESC_CHAR

/// #{{{ @const IS
/**
 * @private
 * @const {!Object<string, !function>}
 * @struct
 */
var IS = loadHelper('is');
/// #}}} @const IS

/// #{{{ @const SPACE_BEGIN_PATTERN
/**
 * @private
 * @const {!RegExp}
 */
var SPACE_BEGIN_PATTERN = /^ +/;
/// #}}} @const SPACE_BEGIN_PATTERN

/// #{{{ @const SPACE_END_PATTERN
/**
 * @private
 * @const {!RegExp}
 */
var SPACE_END_PATTERN = / +$/;
/// #}}} @const SPACE_END_PATTERN

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

/// #{{{ @func setAnchorHrefError
/**
 * @private
 * @param {!RangeError} err
 * @param {string} SOURCE
 * @param {string} href
 * @return {!RangeError}
 */
function setAnchorHrefError(err, SOURCE, href) {

  /// #{{{ @step declare-variables

  /** @type {string} */
  var msg;

  /// #}}} @step declare-variables

  /// #{{{ @step verify-parameters

  switch (arguments.length) {
    case 0:
      throw setNoArgError(new Error, 'err');
    case 1:
      throw setNoArgError(new Error, 'SOURCE');
    case 2:
      throw setNoArgError(new Error, 'href');
  }

  if ( !isError(err) ) {
    throw setTypeError(new TypeError, 'err', '!RangeError');
  }
  if ( !isString(SOURCE) ) {
    throw setTypeError(new TypeError, 'SOURCE', 'string');
  }
  if ( !isString(href) ) {
    throw setTypeError(new TypeError, 'href', 'string');
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step set-constants

  /**
   * @private
   * @const {string}
   */
  var PATT = '/https?:\\/\\/[a-zA-Z0-9_\\-\\.]+\\.[a-zA-Z]{2,}/';

  /// #}}} @step set-constants

  /// #{{{ @step make-error-message

  msg = 'invalid http `link` for `href` attribute in documentation `anchor`\n'
    + '    invalid-href-link-value: `"' + href + '"`\n'
    + '    valid-href-link-regexp: `' + PATT + '`\n'
    + '    containing-source:\n'
    + '        ' + SOURCE.replace(/`/g, '\\`');

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
/// #}}} @func setAnchorHrefError

/// #{{{ @func setAnchorIdError
/**
 * @private
 * @param {!RangeError} err
 * @param {string} SOURCE
 * @param {string} id
 * @return {!RangeError}
 */
function setAnchorIdError(err, SOURCE, id) {

  /// #{{{ @step declare-variables

  /** @type {string} */
  var msg;

  /// #}}} @step declare-variables

  /// #{{{ @step verify-parameters

  switch (arguments.length) {
    case 0:
      throw setNoArgError(new Error, 'err');
    case 1:
      throw setNoArgError(new Error, 'SOURCE');
    case 2:
      throw setNoArgError(new Error, 'id');
  }

  if ( !isError(err) ) {
    throw setTypeError(new TypeError, 'err', '!RangeError');
  }
  if ( !isString(SOURCE) ) {
    throw setTypeError(new TypeError, 'SOURCE', 'string');
  }
  if ( !isString(id) ) {
    throw setTypeError(new TypeError, 'id', 'string');
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step set-constants

  /**
   * @private
   * @const {string}
   */
  var PATT = '/^[a-zA-Z0-9_\\$][a-zA-Z0-9_\\-\\$]*$/';

  /// #}}} @step set-constants

  /// #{{{ @step make-error-message

  msg = 'invalid reference `id` for `anchor` in documentation\n'
    + '    invalid-ref-id-value: `"' + id + '"`\n'
    + '    valid-ref-id-regexp: `' + PATT + '`\n'
    + '    containing-source:\n'
    + '        ' + SOURCE.replace(/`/g, '\\`');

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
/// #}}} @func setAnchorIdError

/// #{{{ @func setAnchorNoCloseError
/**
 * @private
 * @param {!SyntaxError} err
 * @param {string} SOURCE
 * @return {!SyntaxError}
 */
function setAnchorNoCloseError(err, SOURCE) {

  /// #{{{ @step declare-variables

  /** @type {string} */
  var msg;

  /// #}}} @step declare-variables

  /// #{{{ @step verify-parameters

  switch (arguments.length) {
    case 0:
      throw setNoArgError(new Error, 'err');
    case 1:
      throw setNoArgError(new Error, 'SOURCE');
  }

  if ( !isError(err) ) {
    throw setTypeError(new TypeError, 'err', '!SyntaxError');
  }
  if ( !isString(SOURCE) ) {
    throw setTypeError(new TypeError, 'SOURCE', 'string');
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step make-error-message

  msg = 'missing closing `]` & `href` attribute for `anchor` in '
    + 'documentation\n'
    + '    containing-source:\n'
    + '        ' + SOURCE.replace(/`/g, '\\`');

  /// #}}} @step make-error-message

  /// #{{{ @step set-error-name-property

  if (err.name !== 'SyntaxError') {
    err.name = 'SyntaxError';
  }

  /// #}}} @step set-error-name-property

  /// #{{{ @step return-error

  return setError(err, msg);

  /// #}}} @step return-error
}
/// #}}} @func setAnchorNoCloseError

/// #{{{ @func setAnchorNoHrefCloseError
/**
 * @private
 * @param {!SyntaxError} err
 * @param {string} SOURCE
 * @return {!SyntaxError}
 */
function setAnchorNoHrefCloseError(err, SOURCE) {

  /// #{{{ @step declare-variables

  /** @type {string} */
  var msg;

  /// #}}} @step declare-variables

  /// #{{{ @step verify-parameters

  switch (arguments.length) {
    case 0:
      throw setNoArgError(new Error, 'err');
    case 1:
      throw setNoArgError(new Error, 'SOURCE');
  }

  if ( !isError(err) ) {
    throw setTypeError(new TypeError, 'err', '!SyntaxError');
  }
  if ( !isString(SOURCE) ) {
    throw setTypeError(new TypeError, 'SOURCE', 'string');
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step make-error-message

  msg = 'missing closing `)` for `href` attribute of `anchor` in '
    + 'documentation\n'
    + '    containing-source:\n'
    + '        ' + SOURCE.replace(/`/g, '\\`');

  /// #}}} @step make-error-message

  /// #{{{ @step set-error-name-property

  if (err.name !== 'SyntaxError') {
    err.name = 'SyntaxError';
  }

  /// #}}} @step set-error-name-property

  /// #{{{ @step return-error

  return setError(err, msg);

  /// #}}} @step return-error
}
/// #}}} @func setAnchorNoHrefCloseError

/// #{{{ @func setAnchorNoHrefError
/**
 * @private
 * @param {!SyntaxError} err
 * @param {string} SOURCE
 * @return {!SyntaxError}
 */
function setAnchorNoHrefError(err, SOURCE) {

  /// #{{{ @step declare-variables

  /** @type {string} */
  var msg;

  /// #}}} @step declare-variables

  /// #{{{ @step verify-parameters

  switch (arguments.length) {
    case 0:
      throw setNoArgError(new Error, 'err');
    case 1:
      throw setNoArgError(new Error, 'SOURCE');
  }

  if ( !isError(err) ) {
    throw setTypeError(new TypeError, 'err', '!SyntaxError');
  }
  if ( !isString(SOURCE) ) {
    throw setTypeError(new TypeError, 'SOURCE', 'string');
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step make-error-message

  msg = 'missing `href` attribute for `anchor` in documentation\n'
    + '    containing-source:\n'
    + '        ' + SOURCE.replace(/`/g, '\\`');

  /// #}}} @step make-error-message

  /// #{{{ @step set-error-name-property

  if (err.name !== 'SyntaxError') {
    err.name = 'SyntaxError';
  }

  /// #}}} @step set-error-name-property

  /// #{{{ @step return-error

  return setError(err, msg);

  /// #}}} @step return-error
}
/// #}}} @func setAnchorNoHrefError

/// #{{{ @func setAnchorNoIdCloseError
/**
 * @private
 * @param {!SyntaxError} err
 * @param {string} SOURCE
 * @return {!SyntaxError}
 */
function setAnchorNoIdCloseError(err, SOURCE) {

  /// #{{{ @step declare-variables

  /** @type {string} */
  var msg;

  /// #}}} @step declare-variables

  /// #{{{ @step verify-parameters

  switch (arguments.length) {
    case 0:
      throw setNoArgError(new Error, 'err');
    case 1:
      throw setNoArgError(new Error, 'SOURCE');
  }

  if ( !isError(err) ) {
    throw setTypeError(new TypeError, 'err', '!SyntaxError');
  }
  if ( !isString(SOURCE) ) {
    throw setTypeError(new TypeError, 'SOURCE', 'string');
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step make-error-message

  msg = 'missing closing `]` for reference `id` of `anchor` in documentation\n'
    + '    containing-source:\n'
    + '        ' + SOURCE.replace(/`/g, '\\`');

  /// #}}} @step make-error-message

  /// #{{{ @step set-error-name-property

  if (err.name !== 'SyntaxError') {
    err.name = 'SyntaxError';
  }

  /// #}}} @step set-error-name-property

  /// #{{{ @step return-error

  return setError(err, msg);

  /// #}}} @step return-error
}
/// #}}} @func setAnchorNoIdCloseError

/// #{{{ @func setAsteriskError
/**
 * @private
 * @param {!SyntaxError} err
 * @param {string} SOURCE
 * @return {!SyntaxError}
 */
function setAsteriskError(err, SOURCE) {

  /// #{{{ @step declare-variables

  /** @type {string} */
  var msg;

  /// #}}} @step declare-variables

  /// #{{{ @step verify-parameters

  switch (arguments.length) {
    case 0:
      throw setNoArgError(new Error, 'err');
    case 1:
      throw setNoArgError(new Error, 'SOURCE');
  }

  if ( !isError(err) ) {
    throw setTypeError(new TypeError, 'err', '!SyntaxError');
  }
  if ( !isString(SOURCE) ) {
    throw setTypeError(new TypeError, 'SOURCE', 'string');
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step make-error-message

  msg = 'invalid asterisk `*` use within content in documentation\n'
    + '    containing-source:\n'
    + '        ' + SOURCE.replace(/`/g, '\\`');

  /// #}}} @step make-error-message

  /// #{{{ @step set-error-name-property

  if (err.name !== 'SyntaxError') {
    err.name = 'SyntaxError';
  }

  /// #}}} @step set-error-name-property

  /// #{{{ @step return-error

  return setError(err, msg);

  /// #}}} @step return-error
}
/// #}}} @func setAsteriskError

/// #{{{ @func setEmailError
/**
 * @private
 * @param {!RangeError} err
 * @param {string} SOURCE
 * @param {string} email
 * @return {!RangeError}
 */
function setEmailError(err, SOURCE, email) {

  /// #{{{ @step declare-variables

  /** @type {string} */
  var msg;

  /// #}}} @step declare-variables

  /// #{{{ @step verify-parameters

  switch (arguments.length) {
    case 0:
      throw setNoArgError(new Error, 'err');
    case 1:
      throw setNoArgError(new Error, 'SOURCE');
    case 2:
      throw setNoArgError(new Error, 'email');
  }

  if ( !isError(err) ) {
    throw setTypeError(new TypeError, 'err', '!RangeError');
  }
  if ( !isString(SOURCE) ) {
    throw setTypeError(new TypeError, 'SOURCE', 'string');
  }
  if ( !isString(email) ) {
    throw setTypeError(new TypeError, 'email', 'string');
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step set-constants

  /**
   * @private
   * @const {string}
   */
  var PATT = '/^[a-zA-Z0-9_\\-+=.]+@[a-zA-Z0-9_\\-.]+\\.[a-z]{2,}([/?].*)?$/';

  /// #}}} @step set-constants

  /// #{{{ @step make-error-message

  msg = 'invalid `email` for angle bracketed `anchor` in documentation\n'
    + '    invalid-email-value: `"' + email + '"`\n'
    + '    valid-email-regexp: `' + PATT + '`\n'
    + '    containing-source:\n'
    + '        ' + SOURCE.replace(/`/g, '\\`');

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
/// #}}} @func setEmailError

/// #{{{ @func setEmailNoCloseError
/**
 * @private
 * @param {!SyntaxError} err
 * @param {string} SOURCE
 * @return {!SyntaxError}
 */
function setEmailNoCloseError(err, SOURCE) {

  /// #{{{ @step declare-variables

  /** @type {string} */
  var msg;

  /// #}}} @step declare-variables

  /// #{{{ @step verify-parameters

  switch (arguments.length) {
    case 0:
      throw setNoArgError(new Error, 'err');
    case 1:
      throw setNoArgError(new Error, 'SOURCE');
  }

  if ( !isError(err) ) {
    throw setTypeError(new TypeError, 'err', '!SyntaxError');
  }
  if ( !isString(SOURCE) ) {
    throw setTypeError(new TypeError, 'SOURCE', 'string');
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step make-error-message

  msg = 'missing closing `>` for `email` specific `anchor` in documentation\n'
    + '    containing-source:\n'
    + '        ' + SOURCE.replace(/`/g, '\\`');

  /// #}}} @step make-error-message

  /// #{{{ @step set-error-name-property

  if (err.name !== 'SyntaxError') {
    err.name = 'SyntaxError';
  }

  /// #}}} @step set-error-name-property

  /// #{{{ @step return-error

  return setError(err, msg);

  /// #}}} @step return-error
}
/// #}}} @func setEmailNoCloseError

/// #{{{ @func setHashtagIdError
/**
 * @private
 * @param {!RangeError} err
 * @param {string} SOURCE
 * @param {string} id
 * @return {!RangeError}
 */
function setHashtagIdError(err, SOURCE, id) {

  /// #{{{ @step declare-variables

  /** @type {string} */
  var msg;

  /// #}}} @step declare-variables

  /// #{{{ @step verify-parameters

  switch (arguments.length) {
    case 0:
      throw setNoArgError(new Error, 'err');
    case 1:
      throw setNoArgError(new Error, 'SOURCE');
    case 2:
      throw setNoArgError(new Error, 'id');
  }

  if ( !isError(err) ) {
    throw setTypeError(new TypeError, 'err', '!RangeError');
  }
  if ( !isString(SOURCE) ) {
    throw setTypeError(new TypeError, 'SOURCE', 'string');
  }
  if ( !isString(id) ) {
    throw setTypeError(new TypeError, 'id', 'string');
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step set-constants

  /**
   * @private
   * @const {string}
   */
  var PATT = '/^[a-zA-Z0-9_\\$][a-zA-Z0-9_\\-\\$]*$/';

  /// #}}} @step set-constants

  /// #{{{ @step make-error-message

  msg = 'invalid reference `id` for `hashtag` in documentation\n'
    + '    invalid-ref-id-value: `"' + id + '"`\n'
    + '    valid-ref-id-regexp: `' + PATT + '`\n'
    + '    containing-source:\n'
    + '        ' + SOURCE.replace(/`/g, '\\`');

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
/// #}}} @func setHashtagIdError

/// #{{{ @func setImgIdError
/**
 * @private
 * @param {!RangeError} err
 * @param {string} SOURCE
 * @param {string} id
 * @return {!RangeError}
 */
function setImgIdError(err, SOURCE, id) {

  /// #{{{ @step declare-variables

  /** @type {string} */
  var msg;

  /// #}}} @step declare-variables

  /// #{{{ @step verify-parameters

  switch (arguments.length) {
    case 0:
      throw setNoArgError(new Error, 'err');
    case 1:
      throw setNoArgError(new Error, 'SOURCE');
    case 2:
      throw setNoArgError(new Error, 'id');
  }

  if ( !isError(err) ) {
    throw setTypeError(new TypeError, 'err', '!RangeError');
  }
  if ( !isString(SOURCE) ) {
    throw setTypeError(new TypeError, 'SOURCE', 'string');
  }
  if ( !isString(id) ) {
    throw setTypeError(new TypeError, 'id', 'string');
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step set-constants

  /**
   * @private
   * @const {string}
   */
  var PATT = '/^[a-zA-Z0-9_\\$][a-zA-Z0-9_\\-\\$]*$/';

  /// #}}} @step set-constants

  /// #{{{ @step make-error-message

  msg = 'invalid reference `id` for `src` attribute of `img` in '
    + 'documentation\n'
    + '    invalid-ref-id-value: `"' + id + '"`\n'
    + '    valid-ref-id-regexp: `' + PATT + '`\n'
    + '    containing-source:\n'
    + '        ' + SOURCE.replace(/`/g, '\\`');

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
/// #}}} @func setImgIdError

/// #{{{ @func setImgNoCloseError
/**
 * @private
 * @param {!SyntaxError} err
 * @param {string} SOURCE
 * @return {!SyntaxError}
 */
function setImgNoCloseError(err, SOURCE) {

  /// #{{{ @step declare-variables

  /** @type {string} */
  var msg;

  /// #}}} @step declare-variables

  /// #{{{ @step verify-parameters

  switch (arguments.length) {
    case 0:
      throw setNoArgError(new Error, 'err');
    case 1:
      throw setNoArgError(new Error, 'SOURCE');
  }

  if ( !isError(err) ) {
    throw setTypeError(new TypeError, 'err', '!SyntaxError');
  }
  if ( !isString(SOURCE) ) {
    throw setTypeError(new TypeError, 'SOURCE', 'string');
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step make-error-message

  msg = 'missing closing `]` & `src` attribute for `img` in documentation\n'
    + '    containing-source:\n'
    + '        ' + SOURCE.replace(/`/g, '\\`');

  /// #}}} @step make-error-message

  /// #{{{ @step set-error-name-property

  if (err.name !== 'SyntaxError') {
    err.name = 'SyntaxError';
  }

  /// #}}} @step set-error-name-property

  /// #{{{ @step return-error

  return setError(err, msg);

  /// #}}} @step return-error
}
/// #}}} @func setImgNoCloseError

/// #{{{ @func setImgNoIdCloseError
/**
 * @private
 * @param {!SyntaxError} err
 * @param {string} SOURCE
 * @return {!SyntaxError}
 */
function setImgNoIdCloseError(err, SOURCE) {

  /// #{{{ @step declare-variables

  /** @type {string} */
  var msg;

  /// #}}} @step declare-variables

  /// #{{{ @step verify-parameters

  switch (arguments.length) {
    case 0:
      throw setNoArgError(new Error, 'err');
    case 1:
      throw setNoArgError(new Error, 'SOURCE');
  }

  if ( !isError(err) ) {
    throw setTypeError(new TypeError, 'err', '!SyntaxError');
  }
  if ( !isString(SOURCE) ) {
    throw setTypeError(new TypeError, 'SOURCE', 'string');
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step make-error-message

  msg = 'missing closing `]` for reference `id` of `img` in documentation\n'
    + '    containing-source:\n'
    + '        ' + SOURCE.replace(/`/g, '\\`');

  /// #}}} @step make-error-message

  /// #{{{ @step set-error-name-property

  if (err.name !== 'SyntaxError') {
    err.name = 'SyntaxError';
  }

  /// #}}} @step set-error-name-property

  /// #{{{ @step return-error

  return setError(err, msg);

  /// #}}} @step return-error
}
/// #}}} @func setImgNoIdCloseError

/// #{{{ @func setImgNoSrcCloseError
/**
 * @private
 * @param {!SyntaxError} err
 * @param {string} SOURCE
 * @return {!SyntaxError}
 */
function setImgNoSrcCloseError(err, SOURCE) {

  /// #{{{ @step declare-variables

  /** @type {string} */
  var msg;

  /// #}}} @step declare-variables

  /// #{{{ @step verify-parameters

  switch (arguments.length) {
    case 0:
      throw setNoArgError(new Error, 'err');
    case 1:
      throw setNoArgError(new Error, 'SOURCE');
  }

  if ( !isError(err) ) {
    throw setTypeError(new TypeError, 'err', '!SyntaxError');
  }
  if ( !isString(SOURCE) ) {
    throw setTypeError(new TypeError, 'SOURCE', 'string');
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step make-error-message

  msg = 'missing closing `)` for `src` attribute of `img` in documentation\n'
    + '    containing-source:\n'
    + '        ' + SOURCE.replace(/`/g, '\\`');

  /// #}}} @step make-error-message

  /// #{{{ @step set-error-name-property

  if (err.name !== 'SyntaxError') {
    err.name = 'SyntaxError';
  }

  /// #}}} @step set-error-name-property

  /// #{{{ @step return-error

  return setError(err, msg);

  /// #}}} @step return-error
}
/// #}}} @func setImgNoSrcCloseError

/// #{{{ @func setImgNoSrcError
/**
 * @private
 * @param {!SyntaxError} err
 * @param {string} SOURCE
 * @return {!SyntaxError}
 */
function setImgNoSrcError(err, SOURCE) {

  /// #{{{ @step declare-variables

  /** @type {string} */
  var msg;

  /// #}}} @step declare-variables

  /// #{{{ @step verify-parameters

  switch (arguments.length) {
    case 0:
      throw setNoArgError(new Error, 'err');
    case 1:
      throw setNoArgError(new Error, 'SOURCE');
  }

  if ( !isError(err) ) {
    throw setTypeError(new TypeError, 'err', '!SyntaxError');
  }
  if ( !isString(SOURCE) ) {
    throw setTypeError(new TypeError, 'SOURCE', 'string');
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step make-error-message

  msg = 'missing `src` attribute for `img` in documentation\n'
    + '    containing-source:\n'
    + '        ' + SOURCE.replace(/`/g, '\\`');

  /// #}}} @step make-error-message

  /// #{{{ @step set-error-name-property

  if (err.name !== 'SyntaxError') {
    err.name = 'SyntaxError';
  }

  /// #}}} @step set-error-name-property

  /// #{{{ @step return-error

  return setError(err, msg);

  /// #}}} @step return-error
}
/// #}}} @func setImgNoSrcError

/// #{{{ @func setImgSrcError
/**
 * @private
 * @param {!RangeError} err
 * @param {string} SOURCE
 * @param {string} src
 * @return {!RangeError}
 */
function setImgSrcError(err, SOURCE, src) {

  /// #{{{ @step declare-variables

  /** @type {string} */
  var msg;

  /// #}}} @step declare-variables

  /// #{{{ @step verify-parameters

  switch (arguments.length) {
    case 0:
      throw setNoArgError(new Error, 'err');
    case 1:
      throw setNoArgError(new Error, 'SOURCE');
    case 2:
      throw setNoArgError(new Error, 'src');
  }

  if ( !isError(err) ) {
    throw setTypeError(new TypeError, 'err', '!RangeError');
  }
  if ( !isString(SOURCE) ) {
    throw setTypeError(new TypeError, 'SOURCE', 'string');
  }
  if ( !isString(src) ) {
    throw setTypeError(new TypeError, 'src', 'string');
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step set-constants

  /**
   * @private
   * @const {string}
   */
  var PATT = '/https?:\\/\\/[a-zA-Z0-9_\\-\\.]+\\.[a-zA-Z]{2,}/';

  /// #}}} @step set-constants

  /// #{{{ @step make-error-message

  msg = 'invalid http `link` for `src` attribute of `img` in documentation\n'
    + '    invalid-src-link-value: `"' + src + '"`\n'
    + '    valid-src-link-regexp: `' + PATT + '`\n'
    + '    containing-source:\n'
    + '        ' + SOURCE.replace(/`/g, '\\`');

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
/// #}}} @func setImgSrcError

/// #{{{ @func setMentionsHashIdError
/**
 * @private
 * @param {!RangeError} err
 * @param {string} SOURCE
 * @param {string} id
 * @return {!RangeError}
 */
function setMentionsHashIdError(err, SOURCE, id) {

  /// #{{{ @step declare-variables

  /** @type {string} */
  var msg;

  /// #}}} @step declare-variables

  /// #{{{ @step verify-parameters

  switch (arguments.length) {
    case 0:
      throw setNoArgError(new Error, 'err');
    case 1:
      throw setNoArgError(new Error, 'SOURCE');
    case 2:
      throw setNoArgError(new Error, 'id');
  }

  if ( !isError(err) ) {
    throw setTypeError(new TypeError, 'err', '!RangeError');
  }
  if ( !isString(SOURCE) ) {
    throw setTypeError(new TypeError, 'SOURCE', 'string');
  }
  if ( !isString(id) ) {
    throw setTypeError(new TypeError, 'id', 'string');
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step set-constants

  /**
   * @private
   * @const {string}
   */
  var PATT = '/^[a-zA-Z0-9_\\$][a-zA-Z0-9_\\-\\$]*$/';

  /// #}}} @step set-constants

  /// #{{{ @step make-error-message

  msg = 'invalid reference `id` after `#` for `mentions` in documentation\n'
    + '    invalid-ref-id-value: `"' + id + '"`\n'
    + '    valid-ref-id-regexp: `' + PATT + '`\n'
    + '    containing-source:\n'
    + '        ' + SOURCE.replace(/`/g, '\\`');

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
/// #}}} @func setMentionsHashIdError

/// #{{{ @func setMentionsIdError
/**
 * @private
 * @param {!RangeError} err
 * @param {string} SOURCE
 * @param {string} id
 * @return {!RangeError}
 */
function setMentionsIdError(err, SOURCE, id) {

  /// #{{{ @step declare-variables

  /** @type {string} */
  var msg;

  /// #}}} @step declare-variables

  /// #{{{ @step verify-parameters

  switch (arguments.length) {
    case 0:
      throw setNoArgError(new Error, 'err');
    case 1:
      throw setNoArgError(new Error, 'SOURCE');
    case 2:
      throw setNoArgError(new Error, 'id');
  }

  if ( !isError(err) ) {
    throw setTypeError(new TypeError, 'err', '!RangeError');
  }
  if ( !isString(SOURCE) ) {
    throw setTypeError(new TypeError, 'SOURCE', 'string');
  }
  if ( !isString(id) ) {
    throw setTypeError(new TypeError, 'id', 'string');
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step set-constants

  /**
   * @private
   * @const {string}
   */
  var PATT = '/^[a-zA-Z0-9_\\$][a-zA-Z0-9_\\-\\$]*$/';

  /// #}}} @step set-constants

  /// #{{{ @step make-error-message

  msg = 'invalid reference `id` for `mentions` in documentation\n'
    + '    invalid-ref-id-value: `"' + id + '"`\n'
    + '    valid-ref-id-regexp: `' + PATT + '`\n'
    + '    containing-source:\n'
    + '        ' + SOURCE.replace(/`/g, '\\`');

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
/// #}}} @func setMentionsIdError

/// #{{{ @func setNoArgError
/**
 * @private
 * @param {!Error} err
 * @param {string} param
 * @return {!Error}
 */
var setNoArgError = setError.noArg;
/// #}}} @func setNoArgError

/// #{{{ @func setNoCodeCloseError
/**
 * @private
 * @param {!SyntaxError} err
 * @param {string} SOURCE
 * @return {!SyntaxError}
 */
function setNoCodeCloseError(err, SOURCE) {

  /// #{{{ @step declare-variables

  /** @type {string} */
  var msg;

  /// #}}} @step declare-variables

  /// #{{{ @step verify-parameters

  switch (arguments.length) {
    case 0:
      throw setNoArgError(new Error, 'err');
    case 1:
      throw setNoArgError(new Error, 'SOURCE');
  }

  if ( !isError(err) ) {
    throw setTypeError(new TypeError, 'err', '!SyntaxError');
  }
  if ( !isString(SOURCE) ) {
    throw setTypeError(new TypeError, 'SOURCE', 'string');
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step make-error-message

  msg = 'missing closing backtick `\\`` for inline `code` in documentation\n'
    + '    containing-source:\n'
    + '        ' + SOURCE.replace(/`/g, '\\`');

  /// #}}} @step make-error-message

  /// #{{{ @step set-error-name-property

  if (err.name !== 'SyntaxError') {
    err.name = 'SyntaxError';
  }

  /// #}}} @step set-error-name-property

  /// #{{{ @step return-error

  return setError(err, msg);

  /// #}}} @step return-error
}
/// #}}} @func setNoCodeCloseError

/// #{{{ @func setTickError
/**
 * @private
 * @param {!SyntaxError} err
 * @param {string} SOURCE
 * @return {!SyntaxError}
 */
function setTickError(err, SOURCE) {

  /// #{{{ @step declare-variables

  /** @type {string} */
  var msg;

  /// #}}} @step declare-variables

  /// #{{{ @step verify-parameters

  switch (arguments.length) {
    case 0:
      throw setNoArgError(new Error, 'err');
    case 1:
      throw setNoArgError(new Error, 'SOURCE');
  }

  if ( !isError(err) ) {
    throw setTypeError(new TypeError, 'err', '!SyntaxError');
  }
  if ( !isString(SOURCE) ) {
    throw setTypeError(new TypeError, 'SOURCE', 'string');
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step make-error-message

  msg = 'invalid backtick `\\`` use within content in documentation\n'
    + '    containing-source:\n'
    + '        ' + SOURCE.replace(/`/g, '\\`');

  /// #}}} @step make-error-message

  /// #{{{ @step set-error-name-property

  if (err.name !== 'SyntaxError') {
    err.name = 'SyntaxError';
  }

  /// #}}} @step set-error-name-property

  /// #{{{ @step return-error

  return setError(err, msg);

  /// #}}} @step return-error
}
/// #}}} @func setTickError

/// #{{{ @func setTildeError
/**
 * @private
 * @param {!SyntaxError} err
 * @param {string} SOURCE
 * @return {!SyntaxError}
 */
function setTildeError(err, SOURCE) {

  /// #{{{ @step declare-variables

  /** @type {string} */
  var msg;

  /// #}}} @step declare-variables

  /// #{{{ @step verify-parameters

  switch (arguments.length) {
    case 0:
      throw setNoArgError(new Error, 'err');
    case 1:
      throw setNoArgError(new Error, 'SOURCE');
  }

  if ( !isError(err) ) {
    throw setTypeError(new TypeError, 'err', '!SyntaxError');
  }
  if ( !isString(SOURCE) ) {
    throw setTypeError(new TypeError, 'SOURCE', 'string');
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step make-error-message

  msg = 'invalid tilde `~` use within content in documentation\n'
    + '    containing-source:\n'
    + '        ' + SOURCE.replace(/`/g, '\\`');

  /// #}}} @step make-error-message

  /// #{{{ @step set-error-name-property

  if (err.name !== 'SyntaxError') {
    err.name = 'SyntaxError';
  }

  /// #}}} @step set-error-name-property

  /// #{{{ @step return-error

  return setError(err, msg);

  /// #}}} @step return-error
}
/// #}}} @func setTildeError

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

/// #{{{ @group HAS

/// #{{{ @func hasOwnEnumProperty
/**
 * @private
 * @param {(!Object|!Function)} src
 * @param {(string|number)} key
 * @return {boolean}
 */
var hasOwnEnumProperty = loadHelper('has-own-enum-property');
/// #}}} @func hasOwnEnumProperty

/// #}}} @group HAS

/// #{{{ @group IS

/// #{{{ @func isBlankCharacter
/**
 * @private
 * @param {string} ch
 * @return {boolean}
 */
var isBlankCharacter = loadHelper('is-blank-character');
/// #}}} @func isBlankCharacter

/// #{{{ @func isBlock
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isBlock = IS.block;
/// #}}} @func isBlock

/// #{{{ @func isBoolean
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isBoolean = IS.boolean;
/// #}}} @func isBoolean

/// #{{{ @func isBreakCharacter
/**
 * @private
 * @param {string} ch
 * @return {boolean}
 */
var isBreakCharacter = loadHelper('is-word-break');
/// #}}} @func isBreakCharacter

/// #{{{ @func isEmail
/**
 * @private
 * @param {string} src
 * @return {boolean}
 */
var isEmail = loadHelper('is-email');
/// #}}} @func isEmail

/// #{{{ @func isError
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isError = IS.error;
/// #}}} @func isError

/// #{{{ @func isHtml
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isHtml = IS.html;
/// #}}} @func isHtml

/// #{{{ @func isHttpLink
/**
 * @private
 * @param {string} src
 * @return {boolean}
 */
var isHttpLink = loadHelper('is-http-link');
/// #}}} @func isHttpLink

/// #{{{ @func isReferenceId
/**
 * @private
 * @param {string} src
 * @return {boolean}
 */
var isReferenceId = loadHelper('is-reference-id');
/// #}}} @func isReferenceId

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
var isUndefined = IS.void;
/// #}}} @func isUndefined

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

/// #{{{ @group SPECIAL

/// #{{{ @func cleanHtmlAttribute
/**
 * @private
 * @param {string} src
 * @return {string}
 */
var cleanHtmlAttribute = loadHelper('clean-html-attribute');
/// #}}} @func cleanHtmlAttribute

/// #{{{ @func cleanHtmlCharacter
/**
 * @private
 * @param {string} ch
 * @return {string}
 */
var cleanHtmlCharacter = loadHelper('clean-html-character');
/// #}}} @func cleanHtmlCharacter

/// #{{{ @func cleanHttpLink
/**
 * @private
 * @param {string} src
 * @return {string}
 */
var cleanHttpLink = loadHelper('clean-http-link');
/// #}}} @func cleanHttpLink

/// #{{{ @func cleanReferenceId
/**
 * @private
 * @param {string} id
 * @return {string}
 */
var cleanReferenceId = loadHelper('clean-reference-id');
/// #}}} @func cleanReferenceId

/// #}}} @group SPECIAL

/// #}}} @group HELPERS

/// #{{{ @group METHODS
//////////////////////////////////////////////////////////////////////////////
// METHODS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func Content.prototype.parse
/**
 * @public
 * @this {!Content}
 * @param {!Html} ROOT
 * @param {!Block} BLOCK
 * @param {string} SOURCE
 * @return {!Content}
 */
function parseContent(ROOT, BLOCK, SOURCE) {

  /// #{{{ @step declare-variables

  /** @type {string} */
  var result;
  /** @type {string} */
  var source;

  /// #}}} @step declare-variables

  /// #{{{ @step verify-parameters

  switch (arguments.length) {
    case 0:
      throw setNoArgError(new Error, 'ROOT');
    case 1:
      throw setNoArgError(new Error, 'BLOCK');
    case 2:
      throw setNoArgError(new Error, 'SOURCE');
  }

  if ( !isHtml(ROOT) || ROOT !== this.BLOCK.ROOT ) {
    throw setTypeError(new TypeError, 'ROOT', '!Html');
  }
  if ( !isBlock(BLOCK) || BLOCK !== this.BLOCK ) {
    throw setTypeError(new TypeError, 'BLOCK', '!Block');
  }
  if ( !isString(SOURCE) || SOURCE !== this.SOURCE ) {
    throw setTypeError(new TypeError, 'SOURCE', 'string');
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step prepare-source

  source = SOURCE;
  source = source.replace(SPACE_BEGIN_PATTERN, '');
  source = source.replace(SPACE_END_PATTERN, '');

  /// #}}} @step prepare-source

  /// #{{{ @step parse-source

  result = !!source
    ? parseInlineContent(ROOT, BLOCK, source)
    : '';

  /// #}}} @step parse-source

  /// #{{{ @step save-result

  setConstantProperty(this, 'RESULT', result);

  /// #}}} @step save-result

  /// #{{{ @step return-content-instance

  return this;

  /// #}}} @step return-content-instance
}
/// #}}} @func Content.prototype.parse

/// #{{{ @func parseInlineContent
/**
 * @private
 * @param {!Html} ROOT
 * @param {!Block} BLOCK
 * @param {string} SOURCE
 * @param {boolean=} LINK = `false`
 *   If #LINK is `true`, it indicates that the #SOURCE is the content for an
 *   anchor tag (i.e. it disables nested anchor and image tags).
 * @return {string}
 */
function parseInlineContent(ROOT, BLOCK, SOURCE, LINK) {

  /// #{{{ @step declare-variables

  /** @type {string} */
  var ch;

  /// #}}} @step declare-variables

  /// #{{{ @step verify-parameters

  switch (arguments.length) {
    case 0:
      throw setNoArgError(new Error, 'ROOT');
    case 1:
      throw setNoArgError(new Error, 'BLOCK');
    case 2:
      throw setNoArgError(new Error, 'SOURCE');
    case 3:
      LINK = false;
      break;
    default:
      if ( isUndefined(LINK) ) {
        LINK = false;
      }
      else if ( !isBoolean(LINK) ) {
        throw setTypeError(new TypeError, 'LINK', 'boolean=');
      }
  }

  if ( !isHtml(ROOT) ) {
    throw setTypeError(new TypeError, 'ROOT', '!Html');
  }
  if ( !isBlock(BLOCK) ) {
    throw setTypeError(new TypeError, 'BLOCK', '!Block');
  }
  if ( !isString(SOURCE) ) {
    throw setTypeError(new TypeError, 'SOURCE', 'string');
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step set-private-constants

  /// #{{{ @const SPECIAL
  /**
   * @private
   * @const {!Object<string, function>}
   * @dict
   */
  var SPECIAL = {
    '*':  parseAsterisk,
    '~':  parseTilde,
    '`':  parseTick,
    '!':  parseExclamation,
    '[':  parseBracket,
    '#':  parseHash,
    '@':  parseAt,
    '<':  parseLess,
    '\\': parseEscape
  };
  /// #}}} @const SPECIAL

  /// #{{{ @const NESTING
  /**
   * @private
   * @const {boolean}
   */
  var NESTING = !LINK;
  /// #}}} @const NESTING

  /// #{{{ @const LEN
  /**
   * @private
   * @const {number}
   */
  var LEN = SOURCE.length;
  /// #}}} @const LEN

  /// #{{{ @const LAST
  /**
   * @private
   * @const {number}
   */
  var LAST = LEN - 1;
  /// #}}} @const LAST

  /// #{{{ @const STACK
  /**
   * @description
   *   This stack manages all open elements. See the following list for the
   *   valid IDs and their corresponding tags.
   *   - `B`: `<strong>|<em>`
   *   - `D`: `<del>|<u>`
   *   - `b`: `<strong>`
   *   - `d`: `<del>`
   *   - `i`: `<em>`
   *   - `u`: `<u>`
   * @private
   * @const {!Array<string>}
   */
  var STACK = [];
  /// #}}} @const STACK

  /// #{{{ @const RESERVE
  /**
   * @private
   * @const {!Array<string>}
   */
  var RESERVE = [];
  /// #}}} @const RESERVE

  /// #}}} @step set-private-constants

  /// #{{{ @step set-state-control-refs

  /// #{{{ @var $i
  /**
   * @private
   * @type {number}
   */
  var $i = 0;
  /// #}}} @var $i

  /// #{{{ @var $result
  /**
   * @private
   * @type {string}
   */
  var $result = '';
  /// #}}} @var $result

  /// #}}} @step set-state-control-refs

  /// #{{{ @step set-private-helpers

  /// #{{{ @func getLastId
  /**
   * @private
   * @return {string}
   */
  function getLastId() {

    /** @type {number} */
    var last;

    last = STACK.length - 1;
    return last > 0
      ? STACK[last]
      : '';
  }
  /// #}}} @func getLastId

  /// #{{{ @func getNextChar
  /**
   * @private
   * @return {string}
   */
  function getNextChar() {

    /** @type {number} */
    var next;

    next = $i + 1;
    return next < LEN
      ? SOURCE[next]
      : '';
  }
  /// #}}} @func getNextChar

  /// #{{{ @func isEscaped
  /**
   * @private
   * @return {boolean}
   */
  function isEscaped() {
    return $i > 0 && SOURCE[$i - 1] === ESC_CHAR;
  }
  /// #}}} @func isEscaped

  /// #{{{ @func isLastId
  /**
   * @private
   * @param {string} id
   * @return {boolean}
   */
  function isLastId(id) {

    /** @type {number} */
    var last;

    last = STACK.length - 1;
    return last > 0 && STACK[last] === id;
  }
  /// #}}} @func isLastId

  /// #{{{ @func isWordBreak
  /**
   * @private
   * @param {string} ch
   * @return {boolean}
   */
  function isWordBreak(ch) {

    if (ch !== '.') {
      return isBreakCharacter(ch);
    }

    if ($i >= LAST) {
      return true;
    }

    ch = SOURCE[$i + 1];
    return BREAK_PATTERN.test(ch);
  }
  /// #}}} @func isWordBreak

  /// #}}} @step set-private-helpers

  /// #{{{ @step set-main-element-parsers

  /// #{{{ @func parseAnchor
  /**
   * @private
   * @return {void}
   */
  function parseAnchor() {

    /** @type {string} */
    var html;
    /** @type {string} */
    var href;
    /** @type {string} */
    var ch;

    html = '';
    href = '';

    loop:
    while (++$i < LEN) {
      ch = SOURCE[$i];
      switch (ch) {
        case ESC_CHAR:
          ch = getNextChar();
          if (!!ch) {
            ++$i;
          }
          if (ch !== ']') {
            html += ESC_CHAR;
          }
          html += ch;
          break;
        case ']':
          break loop;
        default:
          html += ch;
          break;
      }
    }

    html = parseInlineContent(ROOT, BLOCK, html, true);

    if ($i > LAST) {
      throw setAnchorNoCloseError(new SyntaxError, SOURCE);
    }
    if (++$i > LAST) {
      throw setAnchorNoHrefError(new SyntaxError, SOURCE);
    }

    if (SOURCE[$i] === '(') {
      loop:
      while (++$i < LEN) {
        ch = SOURCE[$i];
        switch (ch) {
          case ESC:
            ch = getNextChar();
            if (!!ch) {
              ++$i;
            }
            if ( !hasOwnEnumProperty(SPECIAL, ch) && ch !== ')' ) {
              href += ESC_CHAR;
            }
            href += ch;
            break;
          case ')':
            break loop;
          default:
            href += ch;
            break;
        }
      }
      if ($i > LAST) {
        throw setAnchorNoHrefCloseError(new SyntaxError, SOURCE);
      }
      if ( !isHttpLink(href) ) {
        throw setAnchorHrefError(new RangeError, SOURCE, href);
      }
      href = cleanHttpLink(href);
    }
    else if (SOURCE[$i] !== '[') {
      throw setAnchorNoHrefError(new SyntaxError, SOURCE);
    }
    else {
      loop:
      while (++$i < LEN) {
        ch = SOURCE[$i];
        switch (ch) {
          case ESC_CHAR:
            ch = getNextChar();
            if (!!ch) {
              ++$i;
            }
            if ( !hasOwnEnumProperty(SPECIAL, ch) && ch !== ']' ) {
              href += ESC;
            }
            href += ch;
            break;
          case ']':
            break loop;
          default:
            href += ch;
            break;
        }
      }
      if ($i > LAST) {
        throw setAnchorNoIdCloseError(new SyntaxError, SOURCE);
      }
      if ( !isReferenceId(href) ) {
        throw setAnchorIdError(new RangeError, SOURCE, href);
      }
      href = '${{' + href + '}}$';
    }

    $result += '<a href="' + href  + '">' + html + '</a>';
    ++$i;
  }
  /// #}}} @func parseAnchor

  /// #{{{ @func parseBold
  /**
   * @private
   * @return {void}
   */
  function parseBold() {

    /** @type {string} */
    var id;

    id = getLastId();

    switch (id) {
      case 'b':
        $result += '</strong>';
        STACK.pop();
        break;
      case 'B':
        $result = RESERVE.pop() + '<strong>' + $result + '</strong>';
        STACK.pop();
        STACK.push('i');
        break;
      default:
        $result += '<strong>';
        STACK.push('b');
        break;
    }
  }
  /// #}}} @func parseBold

  /// #{{{ @func parseBoldItalics
  /**
   * @private
   * @return {void}
   */
  function parseBoldItalics() {

    /** @type {string} */
    var id;

    id = getLastId();

    switch (id) {
      case 'b':
        $result += '</strong>';
        STACK.pop();
        if ( isLastId('i') ) {
          $result += '</em>';
          STACK.pop();
        }
        else {
          STACK.push('i');
        }
        break;
      case 'i':
        $result += '</em>';
        STACK.pop();
        if ( isLastId('b') ) {
          $result += '</strong>';
          STACK.pop();
        }
        else {
          STACK.push('b');
        }
        break;
      case 'B':
        $result = RESERVE.pop() + '<strong><em>' + $result + '</em></strong>';
        STACK.pop();
        break;
      default:
        RESERVE.push($result);
        $result = '';
        STACK.push('B');
        break;
    }
  }
  /// #}}} @func parseBoldItalics

  /// #{{{ @func parseCode
  /**
   * @private
   * @return {void}
   */
  function parseCode() {

    /** @type {string} */
    var ch;

    $result += '<code>';

    loop:
    while (++$i < LEN) {
      ch = SOURCE[$i];
      switch (ch) {
        case ESC_CHAR:
          ch = getNextChar();
          if (!!ch) {
            ++$i;
          }
          if (ch !== '`') {
            $result += cleanHtmlCharacter(ESC_CHAR);
          }
          $result += cleanHtmlCharacter(ch);
          break;
        case '`':
          break loop;
        default:
          $result += cleanHtmlCharacter(ch);
          break;
      }
    }

    $result += '</code>';
  }
  /// #}}} @func parseCode

  /// #{{{ @func parseDel
  /**
   * @private
   * @return {void}
   */
  function parseDel() {

    /** @type {string} */
    var id;

    id = getLastId();

    switch (id) {
      case 'd':
        $result += '</del>';
        STACK.pop();
        break;
      case 'D':
        $result = RESERVE.pop() + '<del>' + $result + '</del>';
        STACK.pop();
        STACK.push('u');
        break;
      default:
        $result += '<del>';
        STACK.push('d');
        break;
    }
  }
  /// #}}} @func parseDel

  /// #{{{ @func parseDelLow
  /**
   * @private
   * @return {void}
   */
  function parseDelLow() {

    /** @type {string} */
    var id;

    id = getLastId();

    switch (id) {
      case 'd':
        $result += '</del>';
        STACK.pop();
        if ( isLastId('u') ) {
          $result += '</u>';
          STACK.pop();
        }
        else {
          STACK.push('u');
        }
        break;
      case 'u':
        $result += '</u>';
        STACK.pop();
        if ( isLastId('d') ) {
          $result += '</del>';
          STACK.pop();
        }
        else {
          STACK.push('d');
        }
        break;
      case 'D':
        $result = RESERVE.pop() + '<del><u>' + $result + '</u></del>';
        STACK.pop();
        break;
      default:
        RESERVE.push($result);
        $result = '';
        STACK.push('D');
        break;
    }
  }
  /// #}}} @func parseDelLow

  /// #{{{ @func parseEmail
  /**
   * @private
   * @return {void}
   */
  function parseEmail() {

    /** @type {string} */
    var email;
    /** @type {string} */
    var ch;

    email = '';

    loop:
    while (++$i < LEN) {
      ch = SOURCE[$i];
      switch (ch) {
        case ESC_CHAR:
          ch = getNextChar();
          if (!!ch) {
            ++$i;
          }
          if ( !hasOwnEnumProperty(SPECIAL, ch) && ch !== '>' ) {
            email += ESC_CHAR;
          }
          email += ch;
          break;
        case '>':
          break loop;
        default:
          email += ch;
          break;
      }
    }

    if ($i > LAST) {
      throw setEmailNoCloseError(new SyntaxError, SOURCE);
    }
    if ( !isEmail(email) ) {
      throw setEmailError(new RangeError, SOURCE, email);
    }

    $result += '<a href="mailto:' + cleanHttpLink(email) + '">';
    $result += email;
    $result += '</a>';
    ++$i;
  }
  /// #}}} @func parseEmail

  /// #{{{ @func parseImg
  /**
   * @private
   * @return {void}
   */
  function parseImg() {

    /** @type {string} */
    var alt;
    /** @type {string} */
    var src;
    /** @type {string} */
    var ch;

    alt = '';
    src = '';

    ++$i;

    loop:
    while (++$i < LEN) {
      ch = SOURCE[$i];
      switch (ch) {
        case ESC_CHAR:
          ch = getNextChar();
          if (!!ch) {
            ++$i;
          }
          if ( !hasOwnEnumProperty(SPECIAL, ch) && ch !== ']' ) {
            alt += ESC_CHAR;
          }
          alt += ch;
          break;
        case ']':
          break loop;
        default:
          alt += ch;
          break;
      }
    }

    alt = cleanHtmlAttribute(alt);

    if ($i > LAST) {
      throw setImgNoCloseError(new SyntaxError, SOURCE);
    }
    if (++$i > LAST) {
      throw setImgNoSrcError(new SyntaxError, SOURCE);
    }

    if (SOURCE[$i] === '(') {
      loop:
      while (++$i < LEN) {
        ch = SOURCE[$i];
        switch (ch) {
          case ESC_CHAR:
            ch = getNextChar();
            if (!!ch) {
              ++$i;
            }
            if ( !hasOwnEnumProperty(SPECIAL, ch) && ch !== ')' ) {
              src += ESC_CHAR;
            }
            src += ch;
            break;
          case ')':
            break loop;
          default:
            src += ch;
            break;
        }
      }
      if ($i > LAST) {
        throw setImgNoSrcCloseError(new SyntaxError, SOURCE);
      }
      if ( !isHttpLink(src) ) {
        throw setImgSrcError(new RangeError, SOURCE, src);
      }
      src = cleanHttpLink(src);
    }
    else if (SOURCE[$i] !== '[') {
      throw setImgNoSrcError(new SyntaxError, SOURCE);
    }
    else {
      loop:
      while (++$i < LEN) {
        ch = SOURCE[$i];
        switch (ch) {
          case ESC_CHAR:
            ch = getNextChar();
            if (!!ch) {
              ++$i;
            }
            if ( !hasOwnEnumProperty(SPECIAL, ch) && ch !== ']' ) {
              src += ESC_CHAR;
            }
            src += ch;
            break;
          case ']':
            break loop;
          default:
            src += ch;
            break;
        }
      }
      if ($i > LAST) {
        throw setImgNoIdCloseError(new SyntaxError, SOURCE);
      }
      if ( !isReferenceId(src) ) {
        throw setImgIdError(new RangeError, SOURCE, src);
      }
      src = '${{' + src + '}}$';
    }

    $result += '<img src="' + src + '" alt="' + alt + '"/>';
    ++$i;
  }
  /// #}}} @func parseImg

  /// #{{{ @func parseItalics
  /**
   * @private
   * @return {void}
   */
  function parseItalics() {

    /** @type {string} */
    var id;

    id = getLastId();

    switch (id) {
      case 'i':
        $result += '</em>';
        STACK.pop();
        break;
      case 'B':
        $result = RESERVE.pop() + '<em>' + $result + '</em>';
        STACK.pop();
        STACK.push('b');
        break;
      default:
        $result += '<em>';
        STACK.push('i');
        break;
    }
  }
  /// #}}} @func parseItalics

  /// #{{{ @func parseLow
  /**
   * @private
   * @return {void}
   */
  function parseLow() {

    /** @type {string} */
    var id;

    id = getLastId();

    switch (id) {
      case 'u':
        $result += '</u>';
        STACK.pop();
        break;
      case 'D':
        $result = RESERVE.pop() + '<u>' + $result + '</u>';
        STACK.pop();
        STACK.push('d');
        break;
      default:
        $result += '<u>';
        STACK.push('u');
        break;
    }
  }
  /// #}}} @func parseLow

  /// #{{{ @func parseMentions
  /**
   * @private
   * @return {void}
   */
  function parseMentions() {

    /** @type {string} */
    var ref;
    /** @type {string} */
    var ch;

    ref = '';

    while (++$i < LEN) {
      ch = SOURCE[$i];
      if ( isWordBreak(ch) || ch === '#' ) {
        break;
      }
      ref += ch;
    }

    if ( !isReferenceId(ref) ) {
      throw setMentionsIdError(new RangeError, SOURCE, ref);
    }

    if ($i < LEN && SOURCE[$i] === '#') {
      ref += '#' + parseMentionsId();
    }

    $result += '<a href="@{{' + ref + '}}@">';
    $result += '#{{' + ref + '}}#';
    $result += '</a>';
  }
  /// #}}} @func parseMentions

  /// #{{{ @func parseMentionsId
  /**
   * @private
   * @return {string}
   */
  function parseMentionsId() {

    /** @type {string} */
    var id;
    /** @type {string} */
    var ch;

    id = '';

    while (++$i < LEN) {
      ch = SOURCE[$i];
      if ( isWordBreak(ch) ) {
        break;
      }
      id += ch;
    }

    if ( !isReferenceId(id) ) {
      throw setMentionsHashIdError(new RangeError, SOURCE, id);
    }

    return id;
  }
  /// #}}} @func parseMentionsId

  /// #{{{ @func parseParamTag
  /**
   * @private
   * @return {void}
   */
  function parseParamTag() {

    /** @type {string} */
    var param;
    /** @type {string} */
    var id;
    /** @type {string} */
    var ch;

    param = '';

    while (++$i < LEN) {
      ch = SOURCE[$i];
      if ( isWordBreak(ch) ) {
        break;
      }
      param += ch;
    }

    id = cleanReferenceId(param);

    if ( !isReferenceId(id) ) {
      throw setHashtagIdError(new RangeError, SOURCE, id);
    }

    $result += '<a href="@{{!{{ super }}!#!{{ id }}!-params-' + id + '}}@">';
    $result += param;
    $result += '</a>';
  }
  /// #}}} @func parseParamTag

  /// #}}} @step set-main-element-parsers

  /// #{{{ @step set-special-character-parsers

  /// #{{{ @func parseAsterisk
  /**
   * @private
   * @return {void}
   */
  function parseAsterisk() {

    /** @type {number} */
    var count;

    count = 1;
    while (++$i < LEN && SOURCE[$i] === '*') {
      ++count;
    }

    switch (count) {
      case 1:
        parseItalics();
        break;
      case 2:
        parseBold();
        break;
      case 3:
        parseBoldItalics();
        break;
      default:
        throw setAsteriskError(new SyntaxError, SOURCE);
    }
  }
  /// #}}} @func parseAsterisk

  /// #{{{ @func parseAt
  /**
   * @private
   * @return {void}
   */
  function parseAt() {

    if (NESTING) {
      parseMentions();
    }
    else {
      $result = cleanHtmlCharacter('@');
      ++$i;
    }
  }
  /// #}}} @func parseAt

  /// #{{{ @func parseBracket
  /**
   * @private
   * @return {void}
   */
  function parseBracket() {

    if (NESTING) {
      parseAnchor();
    }
    else {
      $result += cleanHtmlCharacter('[');
      ++$i;
    }
  }
  /// #}}} @func parseBracket

  /// #{{{ @func parseEscape
  /**
   * @private
   * @return {void}
   */
  function parseEscape() {

    /** @type {string} */
    var ch;

    ch = getNextChar();

    if ( hasOwnEnumProperty(SPECIAL, ch) ) {
      $result += cleanHtmlCharacter(ch);
      ++$i;
    }
    else {
      $result += cleanHtmlCharacter(ESC_CHAR);
    }

    ++$i;
  }
  /// #}}} @func parseEscape

  /// #{{{ @func parseExclamation
  /**
   * @private
   * @return {void}
   */
  function parseExclamation() {

    /** @type {string} */
    var ch;

    ch = getNextChar();
    switch (ch) {
      case '&':
        $result += '<br>';
        $i += 2;
        break;
      case '$':
        $result += '</p><p>';
        $i += 2;
        break;
      case '[':
        if (NESTING) {
          parseImg();
          break;
        }
      default:
        $result += cleanHtmlCharacter('!');
        ++$i;
        if (!!ch) {
          $result += cleanHtmlCharacter(ch);
          ++$i;
        }
        break;
    }
  }
  /// #}}} @func parseExclamation

  /// #{{{ @func parseHash
  /**
   * @private
   * @return {void}
   */
  function parseHash() {

    if (NESTING) {
      parseParamTag();
    }
    else {
      $result = cleanHtmlCharacter('#');
      ++$i;
    }
  }
  /// #}}} @func parseHash

  /// #{{{ @func parseLess
  /**
   * @private
   * @return {void}
   */
  function parseLess() {

    /** @type {string} */
    var ch;

    ch = getNextChar();

    if ( !!NESTING && !!ch && isBlankCharacter(ch) ) {
      parseEmail();
    }
    else {
      $result = cleanHtmlCharacter('<');
      ++$i;
    }
  }
  /// #}}} @func parseLess

  /// #{{{ @func parseTilde
  /**
   * @private
   * @return {void}
   */
  function parseTilde() {

    /** @type {number} */
    var count;

    count = 1;
    while (++$i < LEN && SOURCE[$i] === '~') {
      ++count;
    }

    switch (count) {
      case 1:
        parseLow();
        break;
      case 2:
        parseDel();
        break;
      case 3:
        parseDelLow();
        break;
      default:
        throw setTildeError(new SyntaxError, SOURCE);
    }
  }
  /// #}}} @func parseTilde

  /// #{{{ @func parseTick
  /**
   * @private
   * @return {void}
   */
  function parseTick() {

    /** @type {string} */
    var ch;

    ch = getNextChar();
    if (ch === '`') {
      throw setTickError(new SyntaxError, SOURCE);
    }

    parseCode();

    if ($i > LAST) {
      throw setNoCodeCloseError(new SyntaxError, SOURCE);
    }
    if (++$i < LEN && SOURCE[$i] === '`') {
      throw setTickError(new SyntaxError, SOURCE);
    }
  }
  /// #}}} @func parseTick

  /// #}}} @step set-special-character-parsers

  /// #{{{ @step parse-source

  while ($i < LEN) {
    ch = SOURCE[$i];
    if ( hasOwnEnumProperty(SPECIAL, ch) ) {
      SPECIAL[ch]();
    }
    else {
      $result += cleanHtmlCharacter(ch);
      ++$i;
    }
  }

  /// #}}} @step parse-source

  /// #{{{ @step return-parsed-result

  return $result;

  /// #}}} @step return-parsed-result
}
/// #}}} @func parseInlineContent

/// #}}} @group METHODS

/// #{{{ @group EXPORTS
//////////////////////////////////////////////////////////////////////////////
// EXPORTS
//////////////////////////////////////////////////////////////////////////////

module.exports = parseContent;

/// #}}} @group EXPORTS

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
