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
 * @param {(!Error|!RangeError|!ReferenceError|!SyntaxError|!TypeError)} err
 * @param {string} msg
 * @return {(!Error|!RangeError|!ReferenceError|!SyntaxError|!TypeError)}
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

  err.jspp = true;

  return err;
}
/// #}}} @func setError

/// #{{{ @func setCloseError
/**
 * @public
 * @param {!SyntaxError} err
 * @param {!Line} line
 * @return {!SyntaxError}
 */
function setCloseError(err, line) {

  /** @type {string} */
  var msg;

  if ( !isError(err) )
    throw new TypeError('invalid `err` data type\n' +
      '    valid-types: `!SyntaxError`');
  if ( !isLineNode(line) )
    throw new TypeError('invalid `line` data type\n' +
      '    valid-types: `!Line`');

  msg = 'invalid `close` command syntax for `close` parameter\n' +
    '    closed-defined-at:`\n' +
    '        line-text: `' + line.text + '`\n' +
    '        actual-line-location:\n' +
    '            linenum: `' + line.before.linenum + '`\n' +
    '            file: `' + line.before.file.path + '`\n' +
    '        preparsed-line-location:\n' +
    '            linenum: `' + line.after.linenum + '`\n' +
    '            file: `' + line.after.file.path + '`';

  return setError(err, msg);
}
/// #}}} @func setCloseError

/// #{{{ @func setCmdError
/**
 * @public
 * @param {!SyntaxError} err
 * @param {!Line} line
 * @return {!SyntaxError}
 */
function setCmdError(err, line) {

  /** @type {string} */
  var msg;

  if ( !isError(err) )
    throw new TypeError('invalid `err` data type\n' +
      '    valid-types: `!SyntaxError`');
  if ( !isLineNode(line) )
    throw new TypeError('invalid `line` data type\n' +
      '    valid-types: `!Line`');

  msg = 'invalid `command` syntax\n' +
    '    line-text: `' + line.text + '`\n' +
    '    actual-line-location:\n' +
    '        linenum: `' + line.before.linenum + '`\n' +
    '        file: `' + line.before.file.path + '`\n' +
    '    preparsed-line-location:\n' +
    '        linenum: `' + line.after.linenum + '`\n' +
    '        file: `' + line.after.file.path + '`';

  return setError(err, msg);
}
/// #}}} @func setCmdError

/// #{{{ @func setDefChildError
/**
 * @public
 * @param {!SyntaxError} err
 * @param {!Line} child
 * @param {!Line} parent
 * @return {!SyntaxError}
 */
function setDefChildError(err, child, parent) {

  /** @type {string} */
  var msg;

  if ( !isError(err) )
    throw new TypeError('invalid `err` data type\n' +
      '    valid-types: `!SyntaxError`');
  if ( !isLineNode(child) )
    throw new TypeError('invalid `child` data type\n' +
      '    valid-types: `!Line`');
  if ( !isLineNode(parent) )
    throw new TypeError('invalid `parent` data type\n' +
      '    valid-types: `!Line`');

  msg = 'invalid `define` command within another `define` scope\n' +
    '    parent-define-opened-at:`\n' +
    '        line-text: `' + parent.text + '`\n' +
    '        actual-line-location:\n' +
    '            linenum: `' + parent.before.linenum + '`\n' +
    '            file: `' + parent.before.file.path + '`\n' +
    '    child-define-opened-at:`\n' +
    '        line-text: `' + child.text + '`\n' +
    '        actual-line-location:\n' +
    '            linenum: `' + child.before.linenum + '`\n' +
    '            file: `' + child.before.file.path + '`';
  return setError(err, msg);
}
/// #}}} @func setDefChildError

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
    throw new TypeError('invalid `err` data type\n' +
      '    valid-types: `!Error`');
  if ( !isString(param) )
    throw new TypeError('invalid `param` data type\n' +
      '    valid-types: `string`');
  if ( !isString(path) )
    throw new TypeError('invalid `path` data type\n' +
      '    valid-types: `string`');

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
    throw new TypeError('invalid `err` data type\n' +
      '    valid-types: `!Error`');
  if ( !isString(param) )
    throw new TypeError('invalid `param` data type\n' +
      '    valid-types: `string`');

  msg = 'invalid empty `string` for `' + param + '`';
  return setError(err, msg);
}
/// #}}} @func setEmptyError

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
    throw new TypeError('invalid `err` data type\n' +
      '    valid-types: `!Error`');
  if ( !isString(param) )
    throw new TypeError('invalid `param` data type\n' +
      '    valid-types: `string`');
  if ( !isString(path) )
    throw new TypeError('invalid `path` data type\n' +
      '    valid-types: `string`');

  msg = 'invalid readable file path for `' + param + '`\n' +
    '    received-path: `' + path + '`';
  return setError(err, msg);
}
/// #}}} @func setFileError

/// #{{{ @func setIdError
/**
 * @public
 * @param {!SyntaxError} err
 * @param {!Line} line
 * @return {!SyntaxError}
 */
function setIdError(err, line) {

  /** @type {string} */
  var msg;

  if ( !isError(err) )
    throw new TypeError('invalid `err` data type\n' +
      '    valid-types: `!SyntaxError`');
  if ( !isLineNode(line) )
    throw new TypeError('invalid `line` data type\n' +
      '    valid-types: `!Line`');

  msg = 'invalid `id` component syntax\n' +
    '    valid-id-regex: `/[ \\t][a-zA-Z0-9_\\.\\-\\$]+[ \\t]?/`\n' +
    '    valid-id-chars: `"a-z", "A-Z", "0-9", "_", ".", "-", "$"`\n' +
    '    id-defined-at:\n' +
    '        line-text: `' + line.text + '`\n' +
    '        actual-line-location:\n' +
    '            linenum: `' + line.before.linenum + '`\n' +
    '            file: `' + line.before.file.path + '`\n' +
    '        preparsed-line-location:\n' +
    '            linenum: `' + line.after.linenum + '`\n' +
    '            file: `' + line.after.file.path + '`';

  return setError(err, msg);
}
/// #}}} @func setIdError

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

/// #{{{ @func setNoCloseError
/**
 * @public
 * @param {!SyntaxError} err
 * @param {!Line} line
 * @return {!SyntaxError}
 */
function setNoCloseError(err, line) {

  /** @type {string} */
  var msg;

  if ( !isError(err) )
    throw new TypeError('invalid `err` data type\n' +
      '    valid-types: `!SyntaxError`');
  if ( !isLineNode(line) )
    throw new TypeError('invalid `line` data type\n' +
      '    valid-types: `!Line`');

  msg = 'no `close` command for `open` command\n' +
    '    unclosed-open-defined-at:`\n' +
    '        line-text: `' + line.text + '`\n' +
    '        actual-line-location:\n' +
    '            linenum: `' + line.before.linenum + '`\n' +
    '            file: `' + line.before.file.path + '`\n' +
    '        preparsed-line-location:\n' +
    '            linenum: `' + line.after.linenum + '`\n' +
    '            file: `' + line.after.file.path + '`';

  return setError(err, msg);
}
/// #}}} @func setNoCloseError

/// #{{{ @func setNoOpenError
/**
 * @public
 * @param {!SyntaxError} err
 * @param {!Line} line
 * @return {!SyntaxError}
 */
function setNoOpenError(err, line) {

  /** @type {string} */
  var msg;

  if ( !isError(err) )
    throw new TypeError('invalid `err` data type\n' +
      '    valid-types: `!SyntaxError`');
  if ( !isLineNode(line) )
    throw new TypeError('invalid `line` data type\n' +
      '    valid-types: `!Line`');

  msg = 'no `open` command for `close` command\n' +
    '    invalid-close-defined-at:`\n' +
    '        line-text: `' + line.text + '`\n' +
    '        actual-line-location:\n' +
    '            linenum: `' + line.before.linenum + '`\n' +
    '            file: `' + line.before.file.path + '`\n' +
    '        preparsed-line-location:\n' +
    '            linenum: `' + line.after.linenum + '`\n' +
    '            file: `' + line.after.file.path + '`';

  return setError(err, msg);
}
/// #}}} @func setNoOpenError

/// #{{{ @func setOwnCmdError
/**
 * @public
 * @param {!ReferenceError} err
 * @param {(!Line|!Blk|!Cond|!Incl)} node1
 * @param {(!Line|!Blk|!Cond|!Incl)} node2
 * @param {(?Blk|?Cond)=} scope = `null`
 * @return {!ReferenceError}
 */
function setOwnCmdError(err, node1, node2, scope) {

  /** @type {string} */
  var msg;

  if ( !isError(err) )
    throw new TypeError('invalid `err` data type\n' +
      '    valid-types: `!ReferenceError`');

  if ( isInclNode(node1) )
    node1 = node1.line;
  else if ( isBlkNode(node1) || isCondNode(node1) )
    node1 = node1.open;
  else if ( !isLineNode(node1) )
    throw new TypeError('invalid `node1` data type\n' +
      '    valid-types: `(!Line|!Blk|!Cond|!Incl)`');

  if ( isInclNode(node2) )
    node2 = node2.line;
  else if ( isBlkNode(node2) || isCondNode(node2) )
    node2 = node2.open;
  else if ( !isLineNode(node2) )
    throw new TypeError('invalid `node2` data type\n' +
      '    valid-types: `(!Line|!Blk|!Cond|!Incl)`');

  if ( isUndefined(scope) )
    scope = null;
  else if ( !isNull(scope) && !isBlkNode(scope) && !isCondNode(scope) )
    throw new TypeError('invalid `scope` data type\n' +
      '    valid-types: `(?Blk|?Cond)=`');

  msg = 'duplicate `command` assignment in ';
  msg += !!scope
    ? isBlkNode(scope)
      ? '`block`'
      : '`conditional`'
    : 'file root';
  msg += ' scope\n';

  if (scope)
    msg += '' +
      '    parent-scope-opened-at:`\n' +
      '        line-text: `' + scope.open.text + '`\n' +
      '        actual-line-location:\n' +
      '            linenum: `' + scope.open.before.linenum + '`\n' +
      '            file: `' + scope.open.before.file.path + '`\n' +
      '        preparsed-line-location:\n' +
      '            linenum: `' + scope.open.after.linenum + '`\n' +
      '            file: `' + scope.open.after.file.path + '`\n';

  msg += '' +
    '    first-duplicate-defined-at:`\n' +
    '        line-text: `' + node1.text + '`\n' +
    '        actual-line-location:\n' +
    '            linenum: `' + node1.before.linenum + '`\n' +
    '            file: `' + node1.before.file.path + '`\n' +
    '        preparsed-line-location:\n' +
    '            linenum: `' + node1.after.linenum + '`\n' +
    '            file: `' + node1.after.file.path + '`\n' +
    '    second-duplicate-defined-at:`\n' +
    '        line-text: `' + node2.text + '`\n' +
    '        actual-line-location:\n' +
    '            linenum: `' + node2.before.linenum + '`\n' +
    '            file: `' + node2.before.file.path + '`\n' +
    '        preparsed-line-location:\n' +
    '            linenum: `' + node2.after.linenum + '`\n' +
    '            file: `' + node2.after.file.path + '`';

  return setError(err, msg);
}
/// #}}} @func setOwnCmdError

/// #{{{ @func setPathCompError
/**
 * @public
 * @param {!SyntaxError} err
 * @param {!Line} line
 * @return {!SyntaxError}
 */
function setPathCompError(err, line) {

  /** @type {string} */
  var msg;

  if ( !isError(err) )
    throw new TypeError('invalid `err` data type\n' +
      '    valid-types: `!SyntaxError`');
  if ( !isLineNode(line) )
    throw new TypeError('invalid `line` data type\n' +
      '    valid-types: `!Line`');

  msg = 'invalid `path` component syntax\n' +
    '    valid-path-regex: `/[ \\t][^ \\t\\|]+[ \\t]*$/`\n' +
    '    NOT-valid-path-chars: `" ", "\\t", "|"`\n' +
    '    path-defined-at:\n' +
    '        line-text: `' + line.text + '`\n' +
    '        actual-line-location:\n' +
    '            linenum: `' + line.before.linenum + '`\n' +
    '            file: `' + line.before.file.path + '`\n' +
    '        preparsed-line-location:\n' +
    '            linenum: `' + line.after.linenum + '`\n' +
    '            file: `' + line.after.file.path + '`';

  return setError(err, msg);
}
/// #}}} @func setPathCompError

/// #{{{ @func setTagError
/**
 * @public
 * @param {!SyntaxError} err
 * @param {!Line} line
 * @return {!SyntaxError}
 */
function setTagError(err, line) {

  /** @type {string} */
  var msg;

  if ( !isError(err) )
    throw new TypeError('invalid `err` data type\n' +
      '    valid-types: `!SyntaxError`');
  if ( !isLineNode(line) )
    throw new TypeError('invalid `line` data type\n' +
      '    valid-types: `!Line`');

  msg = 'invalid `tag` component syntax\n' +
    '    valid-tag-regex: `/[ \\t]@[a-zA-Z0-9_\\.\\-]+[ \\t]/`\n' +
    '    valid-tag-chars: `"a-z", "A-Z", "0-9", "_", ".", "-"`\n' +
    '    tag-defined-at:\n' +
    '        line-text: `' + line.text + '`\n' +
    '        actual-line-location:\n' +
    '            linenum: `' + line.before.linenum + '`\n' +
    '            file: `' + line.before.file.path + '`\n' +
    '        preparsed-line-location:\n' +
    '            linenum: `' + line.after.linenum + '`\n' +
    '            file: `' + line.after.file.path + '`';

  return setError(err, msg);
}
/// #}}} @func setTagError

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

setError.close = setCloseError;
setError.cmd = setCmdError;
setError.defChild = setDefChildError;
setError.dir = setDirError;
setError.empty = setEmptyError;
setError.file = setFileError;
setError.id = setIdError;
setError.index = setIndexError;
setError.noClose = setNoCloseError;
setError.noOpen = setNoOpenError;
setError.ownCmd = setOwnCmdError;
setError.pathComp = setPathCompError;
setError.tag = setTagError;
setError.type = setTypeError;
setError.whole = setWholeError;
module.exports = setError;

/// #}}} @group EXPORTS

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol