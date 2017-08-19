/**
 * ---------------------------------------------------------------------------
 * SET-ERROR HELPERS
 * ---------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life>
 */

'use strict';

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
var IS = require('./is.js');
/// #}}} @const IS

/// #{{{ @const LEN_PATT
/**
 * @private
 * @const {!RegExp}
 */
var LEN_PATT = /(?:\.length|\['length'\]|\["length"\])$/;
/// #}}} @const LEN_PATT

/// #}}} @group CONSTANTS

/// #{{{ @group HELPERS
//////////////////////////////////////////////////////////////////////////////
// HELPERS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @group IS

/// #{{{ @func isArray
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isArray = IS.array;
/// #}}} @func isArray

/// #{{{ @func isBoolean
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isBoolean = IS.boolean;
/// #}}} @func isBoolean

/// #{{{ @func isError
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isError = IS.error;
/// #}}} @func isError

/// #{{{ @func isFunction
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isFunction = IS.func;
/// #}}} @func isFunction

/// #{{{ @func isHashMap
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isHashMap = IS.hashMap;
/// #}}} @func isHashMap

/// #{{{ @func isNull
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isNull = IS.nil;
/// #}}} @func isNull

/// #{{{ @func isNumber
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isNumber = IS.number;
/// #}}} @func isNumber

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

/// #{{{ @func isStringArray
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
function isStringArray(val) {

  if (!arguments.length) {
    throw setNoArgError(new Error, 'val');
  }

  return isArray(val) && isStringList(val);
}
/// #}}} @func isStringArray

/// #{{{ @func isStringList
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isStringList = IS.stringList;
/// #}}} @func isStringList

/// #{{{ @func isUndefined
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isUndefined = IS.void;
/// #}}} @func isUndefined

/// #{{{ @func isWholeNumber
/**
 * @private
 * @param {number} val
 * @return {boolean}
 */
var isWholeNumber = IS.wholeNumber;
/// #}}} @func isWholeNumber

/// #}}} @group IS

/// #{{{ @group HAS

/// #{{{ @func _hasOwnProperty
/**
 * @private
 * @param {*} key
 * @return {boolean}
 */
var _hasOwnProperty = Object.prototype.hasOwnProperty;
/// #}}} @func _hasOwnProperty

/// #{{{ @func hasOwnProperty
/**
 * @private
 * @param {(!Object|!Function)} src
 * @param {(string|number)} key
 * @return {boolean}
 */
function hasOwnProperty(src, key) {

  /// #{{{ @step verify-parameters

  switch (arguments.length) {
    case 0:
      throw setNoArgError(new Error, 'src');
    case 1:
      throw setNoArgError(new Error, 'key');
  }

  if ( !isHashMap(src) ) {
    throw setTypeError(new TypeError, 'src', '(!Object|!Function)');
  }

  if ( isString(key) ) {
    if (!key) {
      throw setEmptyError(new Error, 'key');
    }
  }
  else if ( !isNumber(key) ) {
    throw setTypeError(new TypeError, 'key', '(string|number)');
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step return-result

  return _hasOwnProperty.call(src, key);

  /// #}}} @step return-result
}
/// #}}} @func hasOwnProperty

/// #}}} @group HAS

/// #{{{ @group GET

/// #{{{ @func getKeys
/**
 * @private
 * @param {(!Object|!Function)} src
 * @return {!Array<string>}
 */
function getKeys(src) {

  /// #{{{ @step declare-variables

  /** @type {!Array<string>} */
  var keys;
  /** @type {string} */
  var key;

  /// #}}} @step declare-variables

  /// #{{{ @step verify-parameters

  if ( !isHashMap(src) ) {
    throw setTypeError(new TypeError, 'src', '(!Object|!Function)');
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step make-keys

  keys = [];
  for (key in src) {
    if ( hasOwnProperty(src, key) ) {
      keys.push(key);
    }
  }

  /// #}}} @step make-keys

  /// #{{{ @step return-keys

  return keys;

  /// #}}} @step return-keys
}
/// #}}} @func getKeys

/// #}}} @group GET

/// #}}} @group HELPERS

/// #{{{ @group METHODS
//////////////////////////////////////////////////////////////////////////////
// METHODS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func setError
/**
 * @public
 * @param {(!Error|!RangeError|!ReferenceError|!SyntaxError|!TypeError)} err
 * @param {string} msg
 * @return {(!Error|!RangeError|!ReferenceError|!SyntaxError|!TypeError)}
 */
function setError(err, msg) {

  /// #{{{ @step verify-parameters

  if ( !isError(err) ) {
    throw setTypeError(new TypeError, 'err',
      '(!Error|!RangeError|!ReferenceError|!SyntaxError|!TypeError)');
  }
  if ( !isString(msg) ) {
    throw setTypeError(new TypeError, 'msg', 'string');
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step set-type-property-indicators

  switch (err.name) {
    case 'RangeError':
      err.range = true;
      break;
    case 'ReferenceError':
      err.reference = true;
      break;
    case 'SyntaxError':
      err.syntax = true;
      break;
    case 'TypeError':
      err.type = true;
      break;
  }

  /// #}}} @step set-type-property-indicators

  /// #{{{ @step set-error-message-property

  err.message = msg;
  err.msg = msg;

  /// #}}} @step set-error-message-property

  /// #{{{ @step set-internal-notifier-property

  err.internal = true;

  /// #}}} @step set-internal-notifier-property

  /// #{{{ @step return-error

  return err;

  /// #}}} @step return-error
}
/// #}}} @func setError

/// #{{{ @func setAliasError
/**
 * @public
 * @param {!Error} err
 * @param {!Object} opts
 * @param {string} alias
 * @param {string} option
 * @return {!Error}
 */
function setAliasError(err, opts, alias, option) {

  /// #{{{ @step declare-variables

  /** @type {string} */
  var msg;

  /// #}}} @step declare-variables

  /// #{{{ @step verify-parameters

  if ( !isError(err) ) {
    throw setTypeError(new TypeError, 'err', '!Error');
  }
  if ( !isObject(opts) ) {
    throw setTypeError(new TypeError, 'opts', '!Object');
  }
  if ( !isString(alias) ) {
    throw setTypeError(new TypeError, 'alias', 'string');
  }
  if ( !isString(option) ) {
    throw setTypeError(new TypeError, 'option', 'string');
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step make-error-message

  msg = 'conflicting option values for `' + option + '` and `' + alias + '`\n'
    + '    main-option-value: `' + opts[option] + '`\n'
    + '    option-alias-value: `' + opts[alias] + '`';

  /// #}}} @step make-error-message

  /// #{{{ @step set-error-name-property

  if (err.name !== 'Error') {
    err.name = 'Error';
  }

  /// #}}} @step set-error-name-property

  /// #{{{ @step return-error

  return setError(err, msg);

  /// #}}} @step return-error
}
/// #}}} @func setAliasError

/// #{{{ @func setArrLikeError
/**
 * @public
 * @param {(!RangeError|!ReferenceError|!TypeError)} err
 * @param {string} param
 * @param {!Object} val
 * @return {(!RangeError|!ReferenceError|!TypeError)}
 */
function setArrLikeError(err, param, val) {

  /// #{{{ @step declare-variables

  /** @type {string} */
  var msg;

  /// #}}} @step declare-variables

  /// #{{{ @step verify-parameters

  if ( !isError(err) ) {
    throw setTypeError(new TypeError, 'err',
      '(!RangeError|!ReferenceError|!TypeError)');
  }
  if ( !isString(param) ) {
    throw setTypeError(new TypeError, 'param', 'string');
  }
  if ( !isObject(val) ) {
    throw setTypeError(new TypeError, 'val', '!Object');
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step check-length-property

  if ( !('length' in val) ) {
    /// #{{{ @step set-error-name-property

    if (err.name !== 'ReferenceError') {
      err.name = 'ReferenceError';
    }

    /// #}}} @step set-error-name-property
    /// #{{{ @step trim-length-from-param

    param = param.replace(LEN_PATT, '');

    /// #}}} @step trim-length-from-param
    /// #{{{ @step make-error-message

    msg = 'no `length` property defined in `' + param + '`';

    /// #}}} @step make-error-message
    /// #{{{ @step return-error

    return setError(err, msg);

    /// #}}} @step return-error
  }

  /// #}}} @step check-length-property

  /// #{{{ @step append-length-to-param

  if ( !LEN_PATT.test(param) ) {
    param += '.length';
  }

  /// #}}} @step append-length-to-param

  /// #{{{ @step return-error

  return isNumber(val.length)
    ? setIndexError(err, param, val.length)
    : setTypeError(err, param, 'number');

  /// #}}} @step return-error
}
/// #}}} @func setArrLikeError

/// #{{{ @func setDirError
/**
 * @public
 * @param {!Error} err
 * @param {string} param
 * @param {string} path
 * @return {!Error}
 */
function setDirError(err, param, path) {

  /// #{{{ @step declare-variables

  /** @type {string} */
  var msg;

  /// #}}} @step declare-variables

  /// #{{{ @step verify-parameters

  if ( !isError(err) ) {
    throw setTypeError(new TypeError, 'err', '!Error');
  }
  if ( !isString(param) ) {
    throw setTypeError(new TypeError, 'param', 'string');
  }
  if ( !isString(path) ) {
    throw setTypeError(new TypeError, 'path', 'string');
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step make-error-message

  msg = 'invalid readable directory path for `' + param + '`\n'
    + '    invalid-path: `' + path + '`';

  /// #}}} @step make-error-message

  /// #{{{ @step set-error-name-property

  if (err.name !== 'Error') {
    err.name = 'Error';
  }

  /// #}}} @step set-error-name-property

  /// #{{{ @step return-error

  return setError(err, msg);

  /// #}}} @step return-error
}
/// #}}} @func setDirError

/// #{{{ @func setEmptyError
/**
 * @public
 * @param {!Error} err
 * @param {string} param
 * @return {!Error}
 */
function setEmptyError(err, param) {

  /// #{{{ @step declare-variables

  /** @type {string} */
  var msg;

  /// #}}} @step declare-variables

  /// #{{{ @step verify-parameters

  if ( !isError(err) ) {
    throw setTypeError(new TypeError, 'err', '!Error');
  }
  if ( !isString(param) ) {
    throw setTypeError(new TypeError, 'param', 'string');
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step make-error-message

  msg = 'invalid empty `string` for `' + param + '`';

  /// #}}} @step make-error-message

  /// #{{{ @step set-error-name-property

  if (err.name !== 'Error') {
    err.name = 'Error';
  }

  /// #}}} @step set-error-name-property

  /// #{{{ @step return-error

  return setError(err, msg);

  /// #}}} @step return-error
}
/// #}}} @func setEmptyError

/// #{{{ @func setExtError
/**
 * @public
 * @param {!RangeError} err
 * @param {string} param
 * @param {string} path
 * @param {(string|!Array<string>)=} exts
 * @return {!RangeError}
 */
function setExtError(err, param, path, exts) {

  /// #{{{ @step declare-variables

  /** @type {string} */
  var msg;

  /// #}}} @step declare-variables

  /// #{{{ @step verify-parameters

  if ( !isError(err) ) {
    throw setTypeError(new TypeError, 'err', '!RangeError');
  }
  if ( !isString(param) ) {
    throw setTypeError(new TypeError, 'param', 'string');
  }
  if ( !isString(path) ) {
    throw setTypeError(new TypeError, 'path', 'string');
  }
  if ( !isUndefined(exts) && !isString(exts) && !isStringArray(exts) ) {
    throw setTypeError(new TypeError, 'exts', '(string|!Array<string>)=');
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step parse-exts

  if ( isUndefined(exts) ) {
    exts = '/\\.[a-zA-Z0-9]+(\\.[a-zA-Z0-9]+)*$/';
  }
  else if ( isString(exts) ) {
    exts = '"' + exts + '"';
  }
  else if ( isStringArray(exts) ) {
    exts = '"' + exts.join('", "') + '"';
  }

  /// #}}} @step parse-exts

  /// #{{{ @step make-error-message

  msg = 'invalid file extension for `' + param + '`\n'
    + '    valid-extensions: `' + exts + '`\n'
    + '    received-path: `' + path + '`';

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
/// #}}} @func setExtError

/// #{{{ @func setFileError
/**
 * @public
 * @param {!Error} err
 * @param {string} param
 * @param {string} path
 * @return {!Error}
 */
function setFileError(err, param, path) {

  /// #{{{ @step declare-variables

  /** @type {string} */
  var msg;

  /// #}}} @step declare-variables

  /// #{{{ @step verify-parameters

  if ( !isError(err) ) {
    throw setTypeError(new TypeError, 'err', '!Error');
  }
  if ( !isString(param) ) {
    throw setTypeError(new TypeError, 'param', 'string');
  }
  if ( !isString(path) ) {
    throw setTypeError(new TypeError, 'path', 'string');
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step make-error-message

  msg = 'invalid readable file path for `' + param + '`\n'
    + '    invalid-path: `' + path + '`';

  /// #}}} @step make-error-message

  /// #{{{ @step set-error-name-property

  if (err.name !== 'Error') {
    err.name = 'Error';
  }

  /// #}}} @step set-error-name-property

  /// #{{{ @step return-error

  return setError(err, msg);

  /// #}}} @step return-error
}
/// #}}} @func setFileError

/// #{{{ @func setFileModeError
/**
 * @private
 * @param {!RangeError} err
 * @param {string} mode
 * @return {!RangeError}
 */
function setFileModeError(err, mode) {

  /// #{{{ @step declare-variables

  /** @type {string} */
  var msg;

  /// #}}} @step declare-variables

  /// #{{{ @step verify-parameters

  switch (arguments.length) {
    case 0:
      throw setNoArgError(new Error, 'err');
    case 1:
      throw setNoArgError(new Error, 'mode');
  }

  if ( !isError(err) ) {
    throw setTypeError(new TypeError, 'err', '!RangeError');
  }
  if ( !isString(mode) ) {
    throw setTypeError(new TypeError, 'mode', 'string');
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step make-message

  msg = 'invalid file mode for `mode` option\n'
    + '    valid-mode-pattern: `/^0?[0-7]{1,3}$/`\n'
    + '    invalid-mode-value: `"' + mode + '"`';

  /// #}}} @step make-message

  /// #{{{ @step set-error-name

  if (err.name !== 'RangeError') {
    err.name = 'RangeError';
  }

  /// #}}} @step set-error-name

  /// #{{{ @step return-error

  return setError(err, msg);

  /// #}}} @step return-error
}
/// #}}} @func setFileModeError

/// #{{{ @func setIndexError
/**
 * @public
 * @param {!RangeError} err
 * @param {string} param
 * @param {number} index
 * @param {number=} min = `0`
 * @return {!RangeError}
 */
function setIndexError(err, param, index, min) {

  /// #{{{ @step declare-variables

  /** @type {string} */
  var valid;
  /** @type {string} */
  var msg;

  /// #}}} @step declare-variables

  /// #{{{ @step verify-parameters

  if ( !isError(err) ) {
    throw setTypeError(new TypeError, 'err', '!RangeError');
  }
  if ( !isString(param) ) {
    throw setTypeError(new TypeError, 'param', 'string');
  }
  if ( !isNumber(index) ) {
    throw setTypeError(new TypeError, 'index', 'number');
  }

  if ( isUndefined(min) ) {
    min = 0;
  }
  else if ( !isNumber(min) ) {
    throw setTypeError(new TypeError, 'min', 'number=');
  }
  else if ( !isWholeNumber(min) ) {
    throw setWholeError(new RangeError, 'min', min);
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step make-valid-test

  valid = 'isWholeNumber(' + param + ') && ' + param + ' >= ' + min;

  /// #}}} @step make-valid-test

  /// #{{{ @step make-error-message

  msg = 'invalid `number` for `' + param + '`\n'
    + '    valid-range-test: `' + valid + '`\n'
    + '    value-received: `' + index + '`';

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
/// #}}} @func setIndexError

/// #{{{ @func setNewError
/**
 * @public
 * @param {!SyntaxError} err
 * @param {string} constructor
 * @return {!SyntaxError}
 */
function setNewError(err, constructor) {

  /// #{{{ @step declare-variables

  /** @type {string} */
  var msg;

  /// #}}} @step declare-variables

  /// #{{{ @step verify-parameters

  if ( !isError(err) ) {
    throw setTypeError(new TypeError, 'err', '!SyntaxError');
  }
  if ( !isString(constructor) ) {
    throw setTypeError(new TypeError, 'constructor', 'string');
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step make-error-message

  msg = 'missing `new` keyword for `' + constructor + '` call';

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
/// #}}} @func setNewError

/// #{{{ @func setNoArgError
/**
 * @public
 * @param {!Error} err
 * @param {string} param
 * @return {!Error}
 */
function setNoArgError(err, param) {

  /// #{{{ @step declare-variables

  /** @type {string} */
  var msg;

  /// #}}} @step declare-variables

  /// #{{{ @step verify-parameters

  if ( !isError(err) ) {
    throw setTypeError(new TypeError, 'err', '!Error');
  }
  if ( !isString(param) ) {
    throw setTypeError(new TypeError, 'param', 'string');
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step make-error-message

  msg = 'missing required `' + param + '` parameter';

  /// #}}} @step make-error-message

  /// #{{{ @step set-error-name-property

  if (err.name !== 'Error') {
    err.name = 'Error';
  }

  /// #}}} @step set-error-name-property

  /// #{{{ @step return-error

  return setError(err, msg);

  /// #}}} @step return-error
}
/// #}}} @func setNoArgError

/// #{{{ @func setRetError
/**
 * @public
 * @param {!TypeError} err
 * @param {string} method
 * @param {string} types
 * @return {!TypeError}
 */
function setRetError(err, method, types) {

  /// #{{{ @step declare-variables

  /** @type {string} */
  var msg;

  /// #}}} @step declare-variables

  /// #{{{ @step verify-parameters

  if ( !isError(err) ) {
    throw setTypeError(new TypeError, 'err', '!TypeError');
  }
  if ( !isString(method) ) {
    throw setTypeError(new TypeError, 'method', 'string');
  }
  if ( !isString(types) ) {
    throw setTypeError(new TypeError, 'types', 'string');
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step make-error-message

  msg = 'invalid data type returned by `' + method + '`\n'
    + '    valid-types: `' + types + '`';

  /// #}}} @step make-error-message

  /// #{{{ @step set-error-name-property

  if (err.name !== 'TypeError') {
    err.name = 'TypeError';
  }

  /// #}}} @step set-error-name-property

  /// #{{{ @step return-error

  return setError(err, msg);

  /// #}}} @step return-error
}
/// #}}} @func setRetError

/// #{{{ @func setRootDirError
/**
 * @public
 * @param {!Error} err
 * @param {string} param
 * @param {string} path
 * @return {!Error}
 */
function setRootDirError(err, param, path) {

  /// #{{{ @step declare-variables

  /** @type {string} */
  var msg;

  /// #}}} @step declare-variables

  /// #{{{ @step verify-parameters

  if ( !isError(err) ) {
    throw setTypeError(new TypeError, 'err', '!Error');
  }
  if ( !isString(param) ) {
    throw setTypeError(new TypeError, 'param', 'string');
  }
  if ( !isString(path) ) {
    throw setTypeError(new TypeError, 'path', 'string');
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step make-error-message

  msg = 'invalid root directory for `' + param + '`\n'
    + '    ' + param + '-value: `' + path + '`';

  /// #}}} @step make-error-message

  /// #{{{ @step set-error-name-property

  if (err.name !== 'Error') {
    err.name = 'Error';
  }

  /// #}}} @step set-error-name-property

  /// #{{{ @step return-error

  return setError(err, msg);

  /// #}}} @step return-error
}
/// #}}} @func setRootDirError

/// #{{{ @func setTypeError
/**
 * @public
 * @param {!TypeError} err
 * @param {string} param
 * @param {string} types
 * @return {!TypeError}
 */
function setTypeError(err, param, types) {

  /// #{{{ @step declare-variables

  /** @type {string} */
  var msg;

  /// #}}} @step declare-variables

  /// #{{{ @step verify-parameters

  if ( !isError(err) ) {
    throw setTypeError(new TypeError, 'err', '!TypeError');
  }
  if ( !isString(param) ) {
    throw setTypeError(new TypeError, 'param', 'string');
  }
  if ( !isString(types) ) {
    throw setTypeError(new TypeError, 'types', 'string');
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step make-error-message

  msg = 'invalid data type for `' + param + '`\n'
    + '    valid-types: `' + types + '`';

  /// #}}} @step make-error-message

  /// #{{{ @step set-error-name-property

  if (err.name !== 'TypeError') {
    err.name = 'TypeError';
  }

  /// #}}} @step set-error-name-property

  /// #{{{ @step return-error

  return setError(err, msg);

  /// #}}} @step return-error
}
/// #}}} @func setTypeError

/// #{{{ @func setWholeError
/**
 * @public
 * @param {!RangeError} err
 * @param {string} param
 * @param {number} value
 * @return {!RangeError}
 */
function setWholeError(err, param, value) {

  /// #{{{ @step declare-variables

  /** @type {string} */
  var msg;

  /// #}}} @step declare-variables

  /// #{{{ @step verify-parameters

  if ( !isError(err) ) {
    throw setTypeError(new TypeError, 'err', '!RangeError');
  }
  if ( !isString(param) ) {
    throw setTypeError(new TypeError, 'param', 'string');
  }
  if ( !isNumber(value) ) {
    throw setTypeError(new TypeError, 'value', 'number');
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step make-error-message

  msg = 'invalid `number` for `' + param + '`\n'
    + '    valid-range-test: `isWholeNumber(' + param + ')`\n'
    + '    value-received: `' + value + '`';

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
/// #}}} @func setWholeError

/// #}}} @group METHODS

/// #{{{ @group EXPORTS
//////////////////////////////////////////////////////////////////////////////
// EXPORTS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @step setup-set-error-properties

setError.alias = setAliasError;
setError.arrLike = setArrLikeError;
setError.dir = setDirError;
setError.empty = setEmptyError;
setError.ext = setExtError;
setError.file = setFileError;
setError.fileMode = setFileModeError;
setError.index = setIndexError;
setError.new_ = setNewError;
setError.noArg = setNoArgError;
setError.ret = setRetError;
setError.rootDir = setRootDirError;
setError.type = setTypeError;
setError.whole = setWholeError;

/// #}}} @step setup-set-error-properties

module.exports = setError;

/// #}}} @group EXPORTS

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
