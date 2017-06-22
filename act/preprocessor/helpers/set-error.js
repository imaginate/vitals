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

/// #{{{ @group GET

/// #{{{ @func getKeys
/**
 * @private
 * @param {(!Object|!Function)} src
 * @return {!Array<string>}
 */
var getKeys = loadTaskHelper('get-keys');
/// #}}} @func getKeys

/// #}}} @group GET

/// #{{{ @group HAS

/// #{{{ @func hasAnyPathComponent
/**
 * @private
 * @param {string} text
 * @return {boolean}
 */
var hasAnyPathComponent = require('./has-any-path-component.js');
/// #}}} @func hasAnyPathComponent

/// #{{{ @func hasDefine
/**
 * @private
 * @param {string} text
 * @return {boolean}
 */
var hasDefine = require('./has-define-command.js');
/// #}}} @func hasDefine

/// #}}} @group HAS

/// #{{{ @group IS

/// #{{{ @func isArray
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isArray = IS.array;
/// #}}} @func isArray

/// #{{{ @func isBlkNode
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isBlkNode = require('./is-block-node.js');
/// #}}} @func isBlkNode

/// #{{{ @func isBoolean
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isBoolean = IS.boolean;
/// #}}} @func isBoolean

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

/// #}}} @group IS

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
 * @param {boolean=} loading = `false`
 * @return {!SyntaxError}
 */
function setCloseError(err, line, loading) {

  /** @type {string} */
  var msg;

  if ( !isError(err) )
    throw new TypeError('invalid `err` data type\n' +
      '    valid-types: `!SyntaxError`');
  if ( !isLineNode(line) )
    throw new TypeError('invalid `line` data type\n' +
      '    valid-types: `!Line`');
  if ( !isUndefined(loading) && !isBoolean(loading) )
    throw new TypeError('invalid `loading` data type\n' +
      '    valid-types: `boolean=`');

  msg = 'invalid `close` command syntax for `close` parameter\n' +
    '    close-defined-at:\n' +
    '        line-text: `' + line.text + '`\n' +
    '        actual-line-location:\n' +
    '            linenum: `' + line.before.linenum + '`\n' +
    '            file: `' + line.before.file.path + '`';

  if (!loading)
    msg += '\n' +
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
 * @param {boolean=} loading = `false`
 * @return {!SyntaxError}
 */
function setCmdError(err, line, loading) {

  /** @type {string} */
  var msg;

  if ( !isError(err) )
    throw new TypeError('invalid `err` data type\n' +
      '    valid-types: `!SyntaxError`');
  if ( !isLineNode(line) )
    throw new TypeError('invalid `line` data type\n' +
      '    valid-types: `!Line`');
  if ( !isUndefined(loading) && !isBoolean(loading) )
    throw new TypeError('invalid `loading` data type\n' +
      '    valid-types: `boolean=`');

  msg = 'invalid `command` syntax\n' +
    '    line-text: `' + line.text + '`\n' +
    '    actual-line-location:\n' +
    '        linenum: `' + line.before.linenum + '`\n' +
    '        file: `' + line.before.file.path + '`';

  if (!loading)
    msg += '\n' +
      '    preparsed-line-location:\n' +
      '        linenum: `' + line.after.linenum + '`\n' +
      '        file: `' + line.after.file.path + '`';

  return setError(err, msg);
}
/// #}}} @func setCmdError

/// #{{{ @func setDefError
/**
 * @public
 * @param {!SyntaxError} err
 * @param {!Line} line
 * @return {!SyntaxError}
 */
function setDefError(err, line) {

  /** @type {string} */
  var msg;

  if ( !isError(err) )
    throw new TypeError('invalid `err` data type\n' +
      '    valid-types: `!SyntaxError`');
  if ( !isLineNode(line) )
    throw new TypeError('invalid `line` data type\n' +
      '    valid-types: `!Line`');

  msg = 'out-of-order `define` command - must precede all other commands\n'
    '    defined-at:\n' +
    '        line-text: `' + line.text + '`\n' +
    '        actual-line-location:\n' +
    '            linenum: `' + line.before.linenum + '`\n' +
    '            file: `' + line.before.file.path + '`';

  return setError(err, msg);
}
/// #}}} @func setDefError

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

  msg = hasDefine(child.text)
    ? 'invalid `define` command within another `define` scope'
    : 'invalid `insert` command within `define` scope';
  msg += '\n' +
    '    parent-define-opened-at:\n' +
    '        line-text: `' + parent.text + '`\n' +
    '        actual-line-location:\n' +
    '            linenum: `' + parent.before.linenum + '`\n' +
    '            file: `' + parent.before.file.path + '`\n';
  msg += hasDefine(child.text)
    ? '    child-define-opened-at:'
    : '    child-insert-defined-at:';
  msg += '\n' +
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
    throw new TypeError('invalid `err` data type\n' +
      '    valid-types: `!RangeError`');
  if ( !isString(param) )
    throw new TypeError('invalid `param` data type\n' +
      '    valid-types: `string`');
  if ( !isString(path) )
    throw new TypeError('invalid `path` data type\n' +
      '    valid-types: `string`');

  if ( isArray(exts) && isStringList(exts) )
    exts = exts.join('", "');
  else if ( !isString(exts) )
    throw new TypeError('invalid `exts` data type\n' +
      '    valid-types: `(string|!Array<string>)`');

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
 * @param {boolean=} loading = `false`
 * @return {!SyntaxError}
 */
function setIdError(err, line, loading) {

  /** @type {string} */
  var msg;

  if ( !isError(err) )
    throw new TypeError('invalid `err` data type\n' +
      '    valid-types: `!SyntaxError`');
  if ( !isLineNode(line) )
    throw new TypeError('invalid `line` data type\n' +
      '    valid-types: `!Line`');
  if ( !isUndefined(loading) && !isBoolean(loading) )
    throw new TypeError('invalid `loading` data type\n' +
      '    valid-types: `boolean=`');

  msg = 'invalid `id` component syntax\n' +
    '    valid-id-regex: `/[ \\t][a-zA-Z0-9_\\.\\-\\$]+[ \\t]?/`\n' +
    '    valid-id-chars: `"a-z", "A-Z", "0-9", "_", ".", "-", "$"`\n' +
    '    id-defined-at:\n' +
    '        line-text: `' + line.text + '`\n' +
    '        actual-line-location:\n' +
    '            linenum: `' + line.before.linenum + '`\n' +
    '            file: `' + line.before.file.path + '`';

  if (!loading)
    msg += '\n' +
      '        preparsed-line-location:\n' +
      '            linenum: `' + line.after.linenum + '`\n' +
      '            file: `' + line.after.file.path + '`';

  return setError(err, msg);
}
/// #}}} @func setIdError

/// #{{{ @func setInclError
/**
 * @public
 * @param {!ReferenceError} err
 * @param {!Incl} incl1
 * @param {!Incl} incl2
 * @return {!ReferenceError}
 */
function setInclError(err, incl1, incl2) {

  /** @type {string} */
  var msg;

  if ( !isError(err) )
    throw new TypeError('invalid `err` data type\n' +
      '    valid-types: `!ReferenceError`');
  if ( !isInclNode(incl1) )
    throw new TypeError('invalid `incl1` data type\n' +
      '    valid-types: `!Incl`');
  if ( !isInclNode(incl2) )
    throw new TypeError('invalid `incl2` data type\n' +
      '    valid-types: `!Incl`');

  msg = 'duplicate `include` commands\n' +
    '    first-duplicate-defined-at:\n' +
    '        line-text: `' + incl1.line.text + '`\n' +
    '        actual-line-location:\n' +
    '            linenum: `' + incl1.line.before.linenum + '`\n' +
    '            file: `' + incl1.line.before.file.path + '`\n' +
    '        preparsed-line-location:\n' +
    '            linenum: `' + incl1.line.after.linenum + '`\n' +
    '            file: `' + incl1.line.after.file.path + '`\n' +
    '    second-duplicate-defined-at:\n' +
    '        line-text: `' + incl2.line.text + '`\n' +
    '        actual-line-location:\n' +
    '            linenum: `' + incl2.line.before.linenum + '`\n' +
    '            file: `' + incl2.line.before.file.path + '`\n' +
    '        preparsed-line-location:\n' +
    '            linenum: `' + incl2.line.after.linenum + '`\n' +
    '            file: `' + incl2.line.after.file.path + '`';

  return setError(err, msg);
}
/// #}}} @func setInclError

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

/// #{{{ @func setLocError
/**
 * @public
 * @param {!RangeError} err
 * @param {string} param
 * @param {string} path
 * @param {!Dir} parent
 * @param {boolean} contain
 * @return {!RangeError}
 */
function setLocError(err, param, path, parent, contain) {

  /** @type {string} */
  var msg;

  if ( !isError(err) )
    throw new TypeError('invalid `err` data type\n' +
      '    valid-types: `!RangeError`');
  if ( !isString(param) )
    throw new TypeError('invalid `param` data type\n' +
      '    valid-types: `string`');
  if ( !isString(path) )
    throw new TypeError('invalid `path` data type\n' +
      '    valid-types: `string`');
  if ( !isDirNode(parent) )
    throw new TypeError('invalid `parent` data type\n' +
      '    valid-types: `!Dir`');
  if ( !isBoolean(contain) )
    throw new TypeError('invalid `contain` data type\n' +
      '    valid-types: `boolean`');

  msg = 'invalid file path location for `' + param + '`\n';
  msg += contain
    ? '    valid'
    : '    NOT-valid';
  msg += '-dir-container: `' + parent.path + '`\n' +
    '    received-path: `' + path + '`';

  return setError(err, msg);
}
/// #}}} @func setLocError

/// #{{{ @func setMatchError
/**
 * @public
 * @param {!SyntaxError} err
 * @param {!Line} open
 * @param {!Line} close
 * @param {boolean=} loading = `false`
 * @return {!SyntaxError}
 */
function setMatchError(err, open, close, loading) {

  /** @type {string} */
  var msg;

  if ( !isError(err) )
    throw new TypeError('invalid `err` data type\n' +
      '    valid-types: `!SyntaxError`');
  if ( !isLineNode(open) )
    throw new TypeError('invalid `open` data type\n' +
      '    valid-types: `!Line`');
  if ( !isLineNode(close) )
    throw new TypeError('invalid `close` data type\n' +
      '    valid-types: `!Line`');
  if ( !isUndefined(loading) && !isBoolean(loading) )
    throw new TypeError('invalid `loading` data type\n' +
      '    valid-types: `boolean=`');

  msg = 'unmatching `open` and `close` command\n' +
    '    open-defined-at:\n' +
    '        line-text: `' + open.text + '`\n' +
    '        actual-line-location:\n' +
    '            linenum: `' + open.before.linenum + '`\n' +
    '            file: `' + open.before.file.path + '`\n';

  if (!loading)
    msg += '' +
      '        preparsed-line-location:\n' +
      '            linenum: `' + open.after.linenum + '`\n' +
      '            file: `' + open.after.file.path + '`\n';

  msg += '' +
    '    close-defined-at:\n' +
    '        line-text: `' + close.text + '`\n' +
    '        actual-line-location:\n' +
    '            linenum: `' + close.before.linenum + '`\n' +
    '            file: `' + close.before.file.path + '`';

  if (!loading)
    msg += '\n' +
      '        preparsed-line-location:\n' +
      '            linenum: `' + close.after.linenum + '`\n' +
      '            file: `' + close.after.file.path + '`';

  return setError(err, msg);
}
/// #}}} @func setMatchError

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
    throw new TypeError('invalid `err` data type\n' +
      '    valid-types: `!SyntaxError`');
  if ( !isString(constructor) )
    throw new TypeError('invalid `constructor` data type\n' +
      '    valid-types: `string`');

  msg = 'missing `new` keyword for `' + constructor + '` call';
  return setError(err, msg);
}
/// #}}} @func setNewError

/// #{{{ @func setNoCloseError
/**
 * @public
 * @param {!SyntaxError} err
 * @param {!Line} line
 * @param {boolean=} loading = `false`
 * @return {!SyntaxError}
 */
function setNoCloseError(err, line, loading) {

  /** @type {string} */
  var msg;

  if ( !isError(err) )
    throw new TypeError('invalid `err` data type\n' +
      '    valid-types: `!SyntaxError`');
  if ( !isLineNode(line) )
    throw new TypeError('invalid `line` data type\n' +
      '    valid-types: `!Line`');
  if ( !isUndefined(loading) && !isBoolean(loading) )
    throw new TypeError('invalid `loading` data type\n' +
      '    valid-types: `boolean=`');

  msg = 'no `close` command for `open` command\n' +
    '    unclosed-open-defined-at:\n' +
    '        line-text: `' + line.text + '`\n' +
    '        actual-line-location:\n' +
    '            linenum: `' + line.before.linenum + '`\n' +
    '            file: `' + line.before.file.path + '`';

  if (!loading)
    msg += '\n' +
      '        preparsed-line-location:\n' +
      '            linenum: `' + line.after.linenum + '`\n' +
      '            file: `' + line.after.file.path + '`';

  return setError(err, msg);
}
/// #}}} @func setNoCloseError

/// #{{{ @func setNoDefError
/**
 * @public
 * @param {!Error} err
 * @param {!Line} line
 * @param {string} key
 * @param {!File} file
 * @return {!Error}
 */
function setNoDefError(err, line, key, file) {

  /** @type {!Array<string>} */
  var keys;
  /** @type {string} */
  var msg;

  if ( !isError(err) )
    throw new TypeError('invalid `err` data type\n' +
      '    valid-types: `!Error`');
  if ( !isLineNode(line) )
    throw new TypeError('invalid `line` data type\n' +
      '    valid-types: `!Line`');
  if ( !isString(key) )
    throw new TypeError('invalid `key` data type\n' +
      '    valid-types: `string`');
  if ( !isFileNode(file) )
    throw new TypeError('invalid `file` data type\n' +
      '    valid-types: `!File`');

  msg = 'no matching `Def` node found in inserted `File`\n' +
    '    insert-defined-at:\n' +
    '        line-text: `' + line.text + '`\n' +
    '        actual-line-location:\n' +
    '            linenum: `' + line.before.linenum + '`\n' +
    '            file: `' + line.before.file.path + '`\n' +
    '    insert-def-key: `' + key + '`\n' +
    '    insert-file-path: `' + file.path + '`\n' +
    '    insert-defs-keys:';

  keys = getKeys(file.defs);
  msg += keys.length === 0
    ? ' <no-def-instances>'
    : '\n        `"' + keys.join('"`\n        `"') + '"`';

  return setError(err, msg);
}
/// #}}} @func setNoDefError

/// #{{{ @func setNoOpenError
/**
 * @public
 * @param {!SyntaxError} err
 * @param {!Line} line
 * @param {boolean=} loading = `false`
 * @return {!SyntaxError}
 */
function setNoOpenError(err, line, loading) {

  /** @type {string} */
  var msg;

  if ( !isError(err) )
    throw new TypeError('invalid `err` data type\n' +
      '    valid-types: `!SyntaxError`');
  if ( !isLineNode(line) )
    throw new TypeError('invalid `line` data type\n' +
      '    valid-types: `!Line`');
  if ( !isUndefined(loading) && !isBoolean(loading) )
    throw new TypeError('invalid `loading` data type\n' +
      '    valid-types: `boolean=`');

  msg = 'no `open` command for `close` command\n' +
    '    invalid-close-defined-at:\n' +
    '        line-text: `' + line.text + '`\n' +
    '        actual-line-location:\n' +
    '            linenum: `' + line.before.linenum + '`\n' +
    '            file: `' + line.before.file.path + '`';

  if (!loading)
    msg += '\n' +
      '        preparsed-line-location:\n' +
      '            linenum: `' + line.after.linenum + '`\n' +
      '            file: `' + line.after.file.path + '`';

  return setError(err, msg);
}
/// #}}} @func setNoOpenError

/// #{{{ @func setNoStateError
/**
 * @public
 * @param {!ReferenceError} err
 * @param {!Cond} cond
 * @return {!ReferenceError}
 */
function setNoStateError(err, cond) {

  /** @type {string} */
  var msg;

  if ( !isError(err) )
    throw new TypeError('invalid `err` data type\n' +
      '    valid-types: `!ReferenceError`');
  if ( !isCondNode(cond) )
    throw new TypeError('invalid `cond` data type\n' +
      '    valid-types: `!Cond`');

  msg = 'undefined `conditional` command in `state` parameter\n' +
    '    conditional-command:\n' +
    '        tag: `' + cond.tag + '`\n' +
    '        id: `' + cond.id + '`\n' +
    '        key: `' + cond.key + '`';

  return setError(err, msg);
}
/// #}}} @func setNoStateError

/// #{{{ @func setOpenError
/**
 * @public
 * @param {!SyntaxError} err
 * @param {!Line} line
 * @param {boolean=} loading = `false`
 * @return {!SyntaxError}
 */
function setOpenError(err, line, loading) {

  /** @type {string} */
  var msg;

  if ( !isError(err) )
    throw new TypeError('invalid `err` data type\n' +
      '    valid-types: `!SyntaxError`');
  if ( !isLineNode(line) )
    throw new TypeError('invalid `line` data type\n' +
      '    valid-types: `!Line`');
  if ( !isUndefined(loading) && !isBoolean(loading) )
    throw new TypeError('invalid `loading` data type\n' +
      '    valid-types: `boolean=`');

  msg = 'invalid `open` command syntax for `open` parameter\n' +
    '    open-defined-at:\n' +
    '        line-text: `' + line.text + '`\n' +
    '        actual-line-location:\n' +
    '            linenum: `' + line.before.linenum + '`\n' +
    '            file: `' + line.before.file.path + '`';

  if (!loading)
    msg += '\n' +
      '        preparsed-line-location:\n' +
      '            linenum: `' + line.after.linenum + '`\n' +
      '            file: `' + line.after.file.path + '`';

  return setError(err, msg);
}
/// #}}} @func setOpenError

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
      '    parent-scope-opened-at:\n' +
      '        line-text: `' + scope.open.text + '`\n' +
      '        actual-line-location:\n' +
      '            linenum: `' + scope.open.before.linenum + '`\n' +
      '            file: `' + scope.open.before.file.path + '`\n' +
      '        preparsed-line-location:\n' +
      '            linenum: `' + scope.open.after.linenum + '`\n' +
      '            file: `' + scope.open.after.file.path + '`\n';

  msg += '' +
    '    first-duplicate-defined-at:\n' +
    '        line-text: `' + node1.text + '`\n' +
    '        actual-line-location:\n' +
    '            linenum: `' + node1.before.linenum + '`\n' +
    '            file: `' + node1.before.file.path + '`\n' +
    '        preparsed-line-location:\n' +
    '            linenum: `' + node1.after.linenum + '`\n' +
    '            file: `' + node1.after.file.path + '`\n' +
    '    second-duplicate-defined-at:\n' +
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

/// #{{{ @func setOwnDefError
/**
 * @public
 * @param {!ReferenceError} err
 * @param {!Def} def1
 * @param {!Def} def2
 * @return {!ReferenceError}
 */
function setOwnDefError(err, def1, def2) {

  /** @type {string} */
  var msg;

  if ( !isError(err) )
    throw new TypeError('invalid `err` data type\n' +
      '    valid-types: `!ReferenceError`');
  if ( !isDefNode(def1) )
    throw new TypeError('invalid `def1` data type\n' +
      '    valid-types: `!Def`');
  if ( !isDefNode(def2) )
    throw new TypeError('invalid `def2` data type\n' +
      '    valid-types: `!Def`');

  msg = 'duplicate `define` command assignment\n' +
    '    first-duplicate-opened-at:\n' +
    '        line-text: `' + def1.line.text + '`\n' +
    '        actual-line-location:\n' +
    '            linenum: `' + def1.line.before.linenum + '`\n' +
    '            file: `' + def1.line.before.file.path + '`\n' +
    '    second-duplicate-opened-at:\n' +
    '        line-text: `' + def2.line.text + '`\n' +
    '        actual-line-location:\n' +
    '            linenum: `' + def2.line.before.linenum + '`\n' +
    '            file: `' + def2.line.before.file.path + '`';

  return setError(err, msg);
}
/// #}}} @func setOwnDefError

/// #{{{ @func setPathCompError
/**
 * @public
 * @param {(!SyntaxError|!Error)} err
 * @param {!Line} line
 * @param {boolean=} loading = `false`
 * @return {(!SyntaxError|!Error)}
 */
function setPathCompError(err, line, loading) {

  /** @type {string} */
  var msg;

  if ( !isError(err) )
    throw new TypeError('invalid `err` data type\n' +
      '    valid-types: `(!SyntaxError|!Error)`');
  if ( !isLineNode(line) )
    throw new TypeError('invalid `line` data type\n' +
      '    valid-types: `!Line`');
  if ( !isUndefined(loading) && !isBoolean(loading) )
    throw new TypeError('invalid `loading` data type\n' +
      '    valid-types: `boolean=`');

  if (err.name !== 'SyntaxError')
    msg = 'no `File` node found for `path` component';
  else {
    msg = hasAnyPathComponent(line.text)
      ? 'invalid `path` component syntax'
      : 'invalid empty `path` component';
    msg += '\n' +
      '    valid-path-regex: `/[ \\t][^ \\t\\|]+[ \\t]*$/`\n' +
      '    NOT-valid-path-chars: `" ", "\\t", "|"`';
  }

  msg += '\n' +
    '    line-defined-at:\n' +
    '        line-text: `' + line.text + '`\n' +
    '        actual-line-location:\n' +
    '            linenum: `' + line.before.linenum + '`\n' +
    '            file: `' + line.before.file.path + '`';

  if (!loading)
    msg += '\n' +
      '        preparsed-line-location:\n' +
      '            linenum: `' + line.after.linenum + '`\n' +
      '            file: `' + line.after.file.path + '`';

  return setError(err, msg);
}
/// #}}} @func setPathCompError

/// #{{{ @func setPathNodeError
/**
 * @public
 * @param {!Error} err
 * @param {string} param
 * @param {string} path
 * @return {!Error}
 */
function setPathNodeError(err, param, path) {

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

  msg = 'no `File` node found for `' + param + '` path\n' +
    '    received-path: `' + path + '`';

  return setError(err, msg);
}
/// #}}} @func setPathNodeError

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
    throw new TypeError('invalid `err` data type\n' +
      '    valid-types: `!TypeError`');
  if ( !isString(method) )
    throw new TypeError('invalid `method` data type\n' +
      '    valid-types: `string`');
  if ( !isString(types) )
    throw new TypeError('invalid `types` data type\n' +
      '    valid-types: `string`');

  msg = 'invalid data type returned by `' + method + '`\n' +
    '    valid-types: `' + types + '`';

  return setError(err, msg);
}
/// #}}} @func setRetError

/// #{{{ @func setStateError
/**
 * @public
 * @param {!RangeError} err
 * @param {string} key
 * @return {!RangeError}
 */
function setStateError(err, key) {

  /** @type {string} */
  var msg;

  if ( !isError(err) )
    throw new TypeError('invalid `err` data type\n' +
      '    valid-types: `!RangeError`');
  if ( !isString(key) )
    throw new TypeError('invalid `key` data type\n' +
      '    valid-types: `string`');

  msg = 'invalid key name within `state`\n' +
    '    valid-regex-opt1: `/^[a-zA-Z0-9_\\.\\-\\?\\*]+(:[a-zA-Z0-9_\\.\\-\\$\\?\\*]*)?$/`\n' +
    '    valid-regex-opt2: `/^[a-zA-Z0-9_\\.\\-\\?\\*]*:[a-zA-Z0-9_\\.\\-\\$\\?\\*]+$/`\n' +
    '    bad-key-name: `"' + key + '"`';

  return setError(err, msg);
}
/// #}}} @func setStateError

/// #{{{ @func setStateIdError
/**
 * @public
 * @param {!RangeError} err
 * @param {string} tag
 * @param {string} id
 * @return {!RangeError}
 */
function setStateIdError(err, tag, id) {

  /** @type {string} */
  var msg;

  if ( !isError(err) )
    throw new TypeError('invalid `err` data type\n' +
      '    valid-types: `!RangeError`');
  if ( !isString(tag) )
    throw new TypeError('invalid `tag` data type\n' +
      '    valid-types: `string`');
  if ( !isString(id) )
    throw new TypeError('invalid `id` data type\n' +
      '    valid-types: `string`');

  msg = 'invalid `ID` key name within `state`\n' +
    '    valid-id-key-regex: `/^:?[a-zA-Z0-9_\\.\\-\\$\\?\\*]+$/`\n' +
    '    parent-tag-name: `"' + tag + '"`\n' +
    '    bad-id-key-name: `"' + id + '"`';

  return setError(err, msg);
}
/// #}}} @func setStateIdError

/// #{{{ @func setStateTagError
/**
 * @public
 * @param {!RangeError} err
 * @param {string} key
 * @return {!RangeError}
 */
function setStateTagError(err, key) {

  /** @type {string} */
  var msg;

  if ( !isError(err) )
    throw new TypeError('invalid `err` data type\n' +
      '    valid-types: `!RangeError`');
  if ( !isString(key) )
    throw new TypeError('invalid `key` data type\n' +
      '    valid-types: `string`');

  msg = 'invalid `tag` key name within `state`\n' +
    '    valid-tag-key-regex: `/^[a-zA-Z0-9_\\.\\-\\?\\*]+:?$/`\n' +
    '    bad-tag-key-name: `"' + key + '"`';

  return setError(err, msg);
}
/// #}}} @func setStateTagError

/// #{{{ @func setTagError
/**
 * @public
 * @param {!SyntaxError} err
 * @param {!Line} line
 * @param {boolean=} loading = `false`
 * @return {!SyntaxError}
 */
function setTagError(err, line, loading) {

  /** @type {string} */
  var msg;

  if ( !isError(err) )
    throw new TypeError('invalid `err` data type\n' +
      '    valid-types: `!SyntaxError`');
  if ( !isLineNode(line) )
    throw new TypeError('invalid `line` data type\n' +
      '    valid-types: `!Line`');
  if ( !isUndefined(loading) && !isBoolean(loading) )
    throw new TypeError('invalid `loading` data type\n' +
      '    valid-types: `boolean=`');

  msg = 'invalid `tag` component syntax\n' +
    '    valid-tag-regex: `/[ \\t]@[a-zA-Z0-9_\\.\\-]+[ \\t]/`\n' +
    '    valid-tag-chars: `"a-z", "A-Z", "0-9", "_", ".", "-"`\n' +
    '    tag-defined-at:\n' +
    '        line-text: `' + line.text + '`\n' +
    '        actual-line-location:\n' +
    '            linenum: `' + line.before.linenum + '`\n' +
    '            file: `' + line.before.file.path + '`';

  if (!loading)
    msg += '\n' +
      '        preparsed-line-location:\n' +
      '            linenum: `' + line.after.linenum + '`\n' +
      '            file: `' + line.after.file.path + '`';

  return setError(err, msg);
}
/// #}}} @func setTagError

/// #{{{ @func setTreeError
/**
 * @public
 * @param {!ReferenceError} err
 * @param {?Incl} incl1
 * @param {!Incl} incl2
 * @return {!ReferenceError}
 */
function setTreeError(err, incl1, incl2) {

  /** @type {string} */
  var msg;

  if ( !isError(err) )
    throw new TypeError('invalid `err` data type\n' +
      '    valid-types: `!ReferenceError`');
  if ( !isNull(incl1) && !isInclNode(incl1) )
    throw new TypeError('invalid `incl1` data type\n' +
      '    valid-types: `!Incl`');
  if ( !isInclNode(incl2) )
    throw new TypeError('invalid `incl2` data type\n' +
      '    valid-types: `!Incl`');

  msg = 'invalid file loop for `include` command\n' +
    '    loop-causing-included-file: `' + incl2.link.path + '`\n';

  if (incl1)
    msg += '' +
      '    initial-include-defined-at:\n' +
      '        line-text: `' + incl1.line.text + '`\n' +
      '        actual-line-location:\n' +
      '            linenum: `' + incl1.line.before.linenum + '`\n' +
      '            file: `' + incl1.line.before.file.path + '`\n' +
      '        preparsed-line-location:\n' +
      '            linenum: `' + incl1.line.after.linenum + '`\n' +
      '            file: `' + incl1.line.after.file.path + '`\n';

  msg += '' +
    '    looping-include-defined-at:\n' +
    '        line-text: `' + incl2.line.text + '`\n' +
    '        actual-line-location:\n' +
    '            linenum: `' + incl2.line.before.linenum + '`\n' +
    '            file: `' + incl2.line.before.file.path + '`\n' +
    '        preparsed-line-location:\n' +
    '            linenum: `' + incl2.line.after.linenum + '`\n' +
    '            file: `' + incl2.line.after.file.path + '`';

  return setError(err, msg);
}
/// #}}} @func setTreeError

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
setError.def = setDefError;
setError.defChild = setDefChildError;
setError.dir = setDirError;
setError.empty = setEmptyError;
setError.ext = setExtError;
setError.file = setFileError;
setError.id = setIdError;
setError.incl = setInclError;
setError.index = setIndexError;
setError.loc = setLocError;
setError.match = setMatchError;
setError.new_ = setNewError;
setError.noClose = setNoCloseError;
setError.noDef = setNoDefError;
setError.noOpen = setNoOpenError;
setError.noState = setNoStateError;
setError.open = setOpenError;
setError.ownCmd = setOwnCmdError;
setError.ownDef = setOwnDefError;
setError.pathComp = setPathCompError;
setError.pathNode = setPathNodeError;
setError.ret = setRetError;
setError.state = setStateError;
setError.stateId = setStateIdError;
setError.stateTag = setStateTagError;
setError.tag = setTagError;
setError.tree = setTreeError;
setError.type = setTypeError;
setError.whole = setWholeError;
module.exports = setError;

/// #}}} @group EXPORTS

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
