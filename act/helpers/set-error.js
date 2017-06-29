/**
 * ---------------------------------------------------------------------------
 * SET-ERROR HELPER
 * ---------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life> (https://imaginate.life)
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
 */
var IS = require('./is.js');
/// #}}} @const IS

/// #}}} @group CONSTANTS

/// #{{{ @group HELPERS
//////////////////////////////////////////////////////////////////////////////
// HELPERS
//////////////////////////////////////////////////////////////////////////////

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

/// #{{{ @func isNull
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isNull = IS.nil;
/// #}}} @func isNull

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
var isUndefined = IS.undefined;
/// #}}} @func isUndefined

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

  if ( !isError(err) )
    throw setTypeError(new TypeError, 'err',
      '(!Error|!RangeError|!ReferenceError|!SyntaxError|!TypeError)');
  if ( !isString(msg) )
    throw setTypeError(new TypeError, 'msg', 'string');

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

  err.message = msg;
  err.msg = msg;

  return err;
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

  /** @type {string} */
  var msg;

  if ( !isError(err) )
    throw setTypeError(new TypeError, 'err', '!Error');
  if ( !isObject(opts) )
    throw setTypeError(new TypeError, 'opts', '!Object');
  if ( !isString(alias) )
    throw setTypeError(new TypeError, 'alias', 'string');
  if ( !isString(option) )
    throw setTypeError(new TypeError, 'option', 'string');

  msg = 'conflicting values for option `' + option + '` ' +
    'and alias `' + alias + '`\n' +
    '    option-value: `' + opts[option] + '`\n' +
    '    alias-value: `' + opts[alias] + '`';

  return setError(err, msg);
}
/// #}}} @func setAliasError

/// #{{{ @func setDirError
/**
 * @public
 * @param {!Error} err
 * @param {string} param
 * @param {string} path
 * @return {!Error}
 */
function setDirError(err, param, path) {

  /** @type {string} */
  var msg;

  if ( !isError(err) )
    throw setTypeError(new TypeError, 'err', '!Error');
  if ( !isString(param) )
    throw setTypeError(new TypeError, 'param', 'string');
  if ( !isString(path) )
    throw setTypeError(new TypeError, 'path', 'string');

  msg = 'invalid readable directory path for `' + param + '`\n' +
    '    received-path: `' + path + '`';

  return setError(err, msg);
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

  /** @type {string} */
  var msg;

  if ( !isError(err) )
    throw setTypeError(new TypeError, 'err', '!Error');
  if ( !isString(param) )
    throw setTypeError(new TypeError, 'param', 'string');

  msg = 'invalid empty `string` for `' + param + '`';
  return setError(err, msg);
}
/// #}}} @func setEmptyError

/// #{{{ @func setExtError
/**
 * @public
 * @param {!RangeError} err
 * @param {string} param
 * @param {string} path
 * @param {(string|!Array<string>)} exts
 * @return {!RangeError}
 */
function setExtError(err, param, path, exts) {

  /** @type {string} */
  var msg;

  if ( !isError(err) )
    throw setTypeError(new TypeError, 'err', '!RangeError');
  if ( !isString(param) )
    throw setTypeError(new TypeError, 'param', 'string');
  if ( !isString(path) )
    throw setTypeError(new TypeError, 'path', 'string');

  if ( isArray(exts) && isStringList(exts) )
    exts = exts.join('", "');
  else if ( !isString(exts) )
    throw setTypeError(new TypeError, 'exts', '(string|!Array<string>)');

  msg = 'invalid file extension for `' + param + '`\n' +
    '    valid-extensions: `"' + exts + '"`\n' +
    '    received-path: `' + path + '`';

  return setError(err, msg);
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

  /** @type {string} */
  var msg;

  if ( !isError(err) )
    throw setTypeError(new TypeError, 'err', '!Error');
  if ( !isString(param) )
    throw setTypeError(new TypeError, 'param', 'string');
  if ( !isString(path) )
    throw setTypeError(new TypeError, 'path', 'string');

  msg = 'invalid readable file path for `' + param + '`\n' +
    '    received-path: `' + path + '`';

  return setError(err, msg);
}
/// #}}} @func setFileError

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

  /** @type {string} */
  var valid;
  /** @type {string} */
  var msg;

  if ( !isError(err) )
    throw setTypeError(new TypeError, 'err', '!RangeError');
  if ( !isString(param) )
    throw setTypeError(new TypeError, 'param', 'string');
  if ( !isNumber(index) )
    throw setTypeError(new TypeError, 'index', 'number');

  if ( isUndefined(min) )
    min = 0;
  else if ( !isNumber(min) )
    throw setTypeError(new TypeError, 'min', 'number=');
  else if ( !isWholeNumber(min) )
    throw setWholeError(new RangeError, 'min', min);

  valid = 'isWholeNumber(' + param + ') && ' + param + ' >= ' + min;

  msg = 'invalid `number` for `' + param + '`\n' +
    '    valid-range-test: `' + valid + '`\n' +
    '    value-received: `' + index + '`';

  return setError(err, msg);
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

  /** @type {string} */
  var msg;

  if ( !isError(err) )
    throw setTypeError(new TypeError, 'err', '!SyntaxError');
  if ( !isString(constructor) )
    throw setTypeError(new TypeError, 'constructor', 'string');

  msg = 'missing `new` keyword for `' + constructor + '` call';

  return setError(err, msg);
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

  /** @type {string} */
  var msg;

  if ( !isError(err) )
    throw setTypeError(new TypeError, 'err', '!Error');
  if ( !isString(param) )
    throw setTypeError(new TypeError, 'param', 'string');

  msg = 'no required `' + param + '` parameter defined for `function` call';

  return setError(err, msg);
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

  /** @type {string} */
  var msg;

  if ( !isError(err) )
    throw setTypeError(new TypeError, 'err', '!TypeError');
  if ( !isString(method) )
    throw setTypeError(new TypeError, 'method', 'string');
  if ( !isString(types) )
    throw setTypeError(new TypeError, 'types', 'string');

  msg = 'invalid data type returned by `' + method + '`\n' +
    '    valid-types: `' + types + '`';

  return setError(err, msg);
}
/// #}}} @func setRetError

/// #{{{ @func setTypeError
/**
 * @public
 * @param {!TypeError} err
 * @param {string} param
 * @param {string} types
 * @return {!TypeError}
 */
function setTypeError(err, param, types) {

  /** @type {string} */
  var msg;

  if ( !isError(err) )
    throw setTypeError(new TypeError, 'err', '!TypeError');
  if ( !isString(param) )
    throw setTypeError(new TypeError, 'param', 'string');
  if ( !isString(types) )
    throw setTypeError(new TypeError, 'types', 'string');

  msg = 'invalid `' + param + '` data type\n' +
    '    valid-types: `' + types + '`';

  return setError(err, msg);
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

  /** @type {string} */
  var msg;

  if ( !isError(err) )
    throw setTypeError(new TypeError, 'err', '!RangeError');
  if ( !isString(param) )
    throw setTypeError(new TypeError, 'param', 'string');
  if ( !isNumber(value) )
    throw setTypeError(new TypeError, 'value', 'number');

  msg = 'invalid `number` for `' + param + '`\n' +
    '    valid-range-test: `isWholeNumber(' + param + ')`\n' +
    '    value-received: `' + value + '`';

  return setError(err, msg);
}
/// #}}} @func setWholeError

/// #}}} @group METHODS

/// #{{{ @group EXPORTS
//////////////////////////////////////////////////////////////////////////////
// EXPORTS
//////////////////////////////////////////////////////////////////////////////

setError.alias = setAliasError;
setError.dir = setDirError;
setError.empty = setEmptyError;
setError.ext = setExtError;
setError.file = setFileError;
setError.index = setIndexError;
setError.new_ = setNewError;
setError.noArg = setNoArgError;
setError.ret = setRetError;
setError.type = setTypeError;
setError.whole = setWholeError;
module.exports = setError;

/// #}}} @group EXPORTS

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
