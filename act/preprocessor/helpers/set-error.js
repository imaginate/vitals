/**
 * ---------------------------------------------------------------------------
 * SET-ERROR HELPER
 * ---------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2017 Adam A Smith <adam@imaginate.life> (https://imaginate.life)
 */

'use strict';

/// #{{{ @func loadTaskHelper
/**
 * @private
 * @param {string} name
 * @return {(!Object|!Function)}
 */
var loadTaskHelper = require('./load-task-helper.js');
/// #}}} @func loadTaskHelper

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

/// #{{{ @group HELPERS
//////////////////////////////////////////////////////////////////////////////
// HELPERS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func isBlkNode
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isBlkNode = require('./is-block-node.js');
/// #}}} @func isBlkNode

/// #{{{ @func isDirNode
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isDirNode = require('./is-directory-node.js');
/// #}}} @func isDirNode

/// #{{{ @func isCondNode
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isCondNode = require('./is-conditional-node.js');
/// #}}} @func isCondNode

/// #{{{ @func isDefNode
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isDefNode = require('./is-define-node.js');
/// #}}} @func isDefNode

/// #{{{ @func isError
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isError = IS.error;
/// #}}} @func isError

/// #{{{ @func isFileNode
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isFileNode = require('./is-file-node.js');
/// #}}} @func isFileNode

/// #{{{ @func isFunction
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isFunction = IS.func;
/// #}}} @func isFunction

/// #{{{ @func isInclNode
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isInclNode = require('./is-include-node.js');
/// #}}} @func isInclNode

/// #{{{ @func isInsNode
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isInsNode = require('./is-insert-node.js');
/// #}}} @func isInsNode

/// #{{{ @func isLineNode
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isLineNode = require('./is-line-node.js');
/// #}}} @func isLineNode

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
 * @param {(!Error|!RangeError|!SyntaxError|!TypeError)} err
 * @param {string} msg
 * @return {(!Error|!RangeError|!SyntaxError|!TypeError)}
 */
function setError(err, msg) {

  if ( !isError(err) )
    throw new TypeError('invalid `err` data type\n' +
      '    valid-types: `(!Error|!RangeError|!SyntaxError|!TypeError)`');
  if ( !isString(msg) )
    throw new TypeError('invalid `msg` data type\n' +
      '    valid-types: `string`');

  switch (err.name) {

    case 'RangeError':
      err.range = true;
      break;

    case 'SyntaxError':
      err.syntax = true;
      break;

    case 'TypeError':
      err.type = true;
      break;
  }

  err.msg = msg;
  err.jspp = true;
  return err;
}
/// #}}} @func setError

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
    throw new TypeError('invalid `err` data type\n' +
      '    valid-types: `!TypeError`');
  if ( !isString(param) )
    throw new TypeError('invalid `param` data type\n' +
      '    valid-types: `string`');
  if ( !isString(types) )
    throw new TypeError('invalid `types` data type\n' +
      '    valid-types: `string`');

  msg = 'invalid `' + param + '` data type\n' +
    '    valid-types: `' + types + '`';
  return setError(err, msg);
}
/// #}}} @func setTypeError

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
    throw new TypeError('invalid `err` data type\n' +
      '    valid-types: `!Error`');
  if ( !isString(param) )
    throw new TypeError('invalid `param` data type\n' +
      '    valid-types: `string`');

  msg = 'invalid empty `string` for `' + param + '`';
  return setError(err, msg);
}
/// #}}} @func setEmptyError

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
    throw new TypeError('invalid `err` data type\n' +
      '    valid-types: `!RangeError`');
  if ( !isString(param) )
    throw new TypeError('invalid `param` data type\n' +
      '    valid-types: `string`');
  if ( !isNumber(index) )
    throw new TypeError('invalid `index` data type\n' +
      '    valid-types: `number`');

  if ( isUndefined(min) )
    min = 0;
  else if ( !isNumber(min) )
    throw new TypeError('invalid `min` data type\n' +
      '    valid-types: `number=`');
  else if ( !isWholeNumber(min) )
    throw new RangeError('invalid `number` for `min`\n' +
      '    valid-range-test: `isWholeNumber(min)`\n' +
      '    value-received: `' + min + '`');

  valid = 'isWholeNumber(' + param + ') && ' + param + ' >= ' + min;
  msg = 'invalid `number` for `' + param + '`\n' +
    '    valid-range-test: `' + valid + '`\n' +
    '    value-received: `' + index + '`';
  return setError(err, msg);
}
/// #}}} @func setIndexError

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
    throw new TypeError('invalid `err` data type\n' +
      '    valid-types: `!RangeError`');
  if ( !isString(param) )
    throw new TypeError('invalid `param` data type\n' +
      '    valid-types: `string`');
  if ( !isNumber(index) )
    throw new TypeError('invalid `value` data type\n' +
      '    valid-types: `number`');

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

setError.type = setTypeError;
setError.empty = setEmptyError;
setError.index = setIndexError;
setError.whole = setWholeError;
module.exports = setError;

/// #}}} @group EXPORTS

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
