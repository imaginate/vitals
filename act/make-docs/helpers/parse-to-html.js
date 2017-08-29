/**
 * ---------------------------------------------------------------------------
 * PARSE-TO-HTML HELPER
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

/// #{{{ @func setIndexError
/**
 * @private
 * @param {!RangeError} err
 * @param {string} param
 * @param {number} index
 * @param {number=} min = `0`
 * @return {!RangeError}
 */
var setIndexError = setError.index;
/// #}}} @func setIndexError

/// #{{{ @func setNewError
/**
 * @private
 * @param {!SyntaxError} err
 * @param {string} constructor
 * @return {!SyntaxError}
 */
var setNewError = setError.new_;
/// #}}} @func setNewError

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

/// #{{{ @group HAS

/// #{{{ @func hasOption
/**
 * @private
 * @param {!Object} opts
 * @param {string} key
 * @return {boolean}
 */
var hasOption = loadTaskHelper('has-option');
/// #}}} @func hasOption

/// #{{{ @func hasOwnEnumProperty
/**
 * @private
 * @param {(!Object|!Function)} src
 * @param {(string|number)} key
 * @return {boolean}
 */
var hasOwnEnumProperty = loadTaskHelper('has-own-enum-property');
/// #}}} @func hasOwnEnumProperty

/// #{{{ @func hasOwnProperty
/**
 * @private
 * @param {(!Object|!Function)} src
 * @param {(string|number)} key
 * @return {boolean}
 */
var hasOwnProperty = loadTaskHelper('has-own-property');
/// #}}} @func hasOwnProperty

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

/// #{{{ @func isBoolean
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isBoolean = IS.boolean;
/// #}}} @func isBoolean

/// #{{{ @func isInstanceOf
/**
 * @private
 * @param {*} inst
 * @param {!Function} constructor
 * @return {boolean}
 */
var isInstanceOf = IS.instanceOf;
/// #}}} @func isInstanceOf

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

/// #{{{ @func isPlainObject
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isPlainObject = IS.plainObject;
/// #}}} @func isPlainObject

/// #{{{ @func isRegExp
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isRegExp = IS.regexp;
/// #}}} @func isRegExp

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

/// #{{{ @group OBJECT

/// #{{{ @func cloneObject
/**
 * @private
 * @param {(?Object|?Function)} src
 * @param {boolean=} deep = `false`
 * @return {!Object}
 */
var cloneObject = loadTaskHelper('clone-object');
/// #}}} @func cloneObject

/// #{{{ @func createObject
/**
 * @private
 * @param {?Object} proto
 * @return {!Object}
 */
var createObject = loadTaskHelper('create-object');
/// #}}} @func createObject

/// #{{{ @func forEachProperty
/**
 * @private
 * @param {(!Array|!Arguments|!Object|!Function)} src
 * @param {!function(*, (number|string))} func
 * @return {(!Array|!Arguments|!Object|!Function)}
 */
var forEachProperty = loadTaskHelper('for-each-property');
/// #}}} @func forEachProperty

/// #{{{ @func freezeObject
/**
 * @private
 * @param {(?Object|?Function)} src
 * @param {boolean=} deep = `false`
 * @return {(?Object|?Function)}
 */
var freezeObject = loadTaskHelper('freeze-object');
/// #}}} @func freezeObject

/// #{{{ @func setConstantProperty
/**
 * @private
 * @param {!Object} src
 * @param {string} key
 * @param {*} val
 * @param {boolean=} visible = `true`
 * @return {!Object}
 */
var setConstantProperty = loadTaskHelper('set-constant-property');
/// #}}} @func setConstantProperty

/// #{{{ @func setProperty
/**
 * @private
 * @param {!Object} src
 * @param {string} key
 * @param {*} val
 * @param {boolean=} seal = `false`
 * @return {!Object}
 */
var setProperty = loadTaskHelper('set-property');
/// #}}} @func setProperty

/// #}}} @group OBJECT

/// #{{{ @group SPECIAL

/// #{{{ @func newMakeIndent
/**
 * @private
 * @param {number=} count
 * @return {!function(number): string}
 */
var newMakeIndent = require('./make-indent.js').construct;
/// #}}} @func newMakeIndent

/// #}}} @group SPECIAL

/// #}}} @group HELPERS

/// #{{{ @group DEFAULTS
//////////////////////////////////////////////////////////////////////////////
// DEFAULTS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @const DFLTS
/**
 * @private
 * @const {!Object<string, *>}
 * @dict
 */
var DFLTS = freezeObject({
  'depth': 0,
  'github': false
});
/// #}}} @const DFLTS

/// #}}} @group DEFAULTS

/// #{{{ @group CLASSES
//////////////////////////////////////////////////////////////////////////////
// CLASSES
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @group HTML

/// #{{{ @func Html
/**
 * @private
 * @param {!Array<string>} lines
 * @param {!Object} opts
 * @constructor
 * @struct
 */
function Html(lines, opts) {

  /// #{{{ @step verify-new-keyword

  if ( !isInstanceOf(this, Html) ) {
    throw setNewError(new SyntaxError, 'Html');
  }

  /// #}}} @step verify-new-keyword

  /// #{{{ @step verify-parameters

  switch (arguments.length) {
    case 0:
      throw setNoArgError(new Error, 'lines');
    case 1:
      throw setNoArgError(new Error, 'opts');
  }

  if ( !isArray(lines) || !isStringList(lines) ) {
    throw setTypeError(new TypeError, 'lines', '!Array<string>');
  }
  if ( !isObject(opts) ) {
    throw setTypeError(new TypeError, 'opts', '!Object');
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step verify-options

  if ( !isNumber(opts['depth']) ) {
    throw setTypeError(new TypeError, 'opts.depth', 'number');
  }
  else if ( !isWholeNumber(opts['depth']) || opts['depth'] < 0 ) {
    throw setIndexError(new RangeError, 'opts.depth', opts['depth'], 0);
  }

  if ( !isBoolean(opts['github']) ) {
    throw setTypeError(new TypeError, 'opts.github', 'boolean');
  }

  if ( !isNumber(opts['indent']) ) {
    throw setTypeError(new TypeError, 'opts.indent', 'number');
  }
  else if ( !isWholeNumber(opts['indent']) || opts['indent'] < 0 ) {
    throw setIndexError(new RangeError, 'opts.indent', opts['indent'], 0);
  }

  /// #}}} @step verify-options

  /// #{{{ @step set-constants

  /// #{{{ @const ELEMS
  /**
   * @private
   * @const {!Array<(!Block|!Inline)>}
   */
  var ELEMS = [];
  /// #}}} @const ELEMS

  /// #{{{ @const LINES
  /**
   * @private
   * @const {!Array<string>}
   */
  var LINES = freezeObject(lines);
  /// #}}} @const LINES

  /// #{{{ @const LEN
  /**
   * @private
   * @const {number}
   */
  var LEN = LINES.length;
  /// #}}} @const LEN

  /// #{{{ @const OPTS
  /**
   * @private
   * @const {!Object}
   */
  var OPTS = freezeObject(opts);
  /// #}}} @const OPTS

  /// #{{{ @const DEPTH
  /**
   * @private
   * @const {number}
   */
  var DEPTH = OPTS['depth'];
  /// #}}} @const DEPTH

  /// #{{{ @const GITHUB
  /**
   * @private
   * @const {boolean}
   */
  var GITHUB = OPTS['github'];
  /// #}}} @const GITHUB

  /// #{{{ @const INDENT
  /**
   * @private
   * @const {number}
   */
  var INDENT = OPTS['indent'];
  /// #}}} @const INDENT

  /// #{{{ @const makeIndent
  /**
   * @private
   * @const {!function(number): string}
   */
  var makeIndent = newMakeIndent(INDENT);
  /// #}}} @const makeIndent

  /// #}}} @step set-constants

  /// #{{{ @step set-members

  /// #{{{ @member DEPTH
  /**
   * @const {number}
   */
  setConstantProperty(this, 'DEPTH', DEPTH);
  /// #}}} @member DEPTH

  /// #{{{ @member ELEMS
  /**
   * @const {!Array<(!Block|!Inline)>}
   */
  setConstantProperty(this, 'ELEMS', ELEMS);
  /// #}}} @member ELEMS

  /// #{{{ @member GITHUB
  /**
   * @const {boolean}
   */
  setConstantProperty(this, 'GITHUB', GITHUB);
  /// #}}} @member GITHUB

  /// #{{{ @member INDENT
  /**
   * @const {number}
   */
  setConstantProperty(this, 'INDENT', INDENT);
  /// #}}} @member INDENT

  /// #{{{ @member LEN
  /**
   * @const {number}
   */
  setConstantProperty(this, 'LEN', LEN);
  /// #}}} @member LEN

  /// #{{{ @member LINES
  /**
   * @const {!Array<string>}
   */
  setConstantProperty(this, 'LINES', LINES);
  /// #}}} @member LINES

  /// #{{{ @member OPTS
  /**
   * @const {!Object}
   */
  setConstantProperty(this, 'OPTS', OPTS);
  /// #}}} @member OPTS

  /// #{{{ @member RESULT
  /**
   * @description
   *   This parameter is only defined after `Html.prototype.parse` has
   *   completed. Note that for this member only defined means that its value
   *   is changed from `null` to a `string`. The `result` member maintains
   *   the incomplete states.
   * @type {?string}
   */
  setProperty(this, 'RESULT', null);
  /// #}}} @member RESULT

  /// #{{{ @member ROOT
  /**
   * @const {!Html}
   */
  setConstantProperty(this, 'ROOT', this);
  /// #}}} @member ROOT

  /// #{{{ @member depth
  /**
   * @type {number}
   */
  setProperty(this, 'depth', DEPTH, true);
  /// #}}} @member depth

  /// #{{{ @member i
  /**
   * @type {number}
   */
  setProperty(this, 'i', 0, true);
  /// #}}} @member i

  /// #{{{ @member result
  /**
   * @type {string}
   */
  setProperty(this, 'result', '', true);
  /// #}}} @member result

  /// #{{{ @member makeIndent
  /**
   * @private
   * @param {number} depth
   * @return {string}
   */
  setConstantProperty(this, 'makeIndent', makeIndent);
  /// #}}} @member makeIndent

  /// #}}} @step set-members

  /// #{{{ @step cap-instance

  capObject(this);

  /// #}}} @step cap-instance

  /// #{{{ @step parse-lines

  this.parse();

  /// #}}} @step parse-lines

  /// #{{{ @step freeze-instance

  freezeObject(this);
  freezeObject(this.ELEMS);

  /// #}}} @step freeze-instance
}
/// #}}} @func Html

/// #{{{ @func newHtml
/**
 * @private
 * @param {!Array<string>} lines
 * @param {!Object} opts
 * @return {!Html}
 */
function newHtml(lines, opts) {

  /// #{{{ @step verify-parameters

  switch (arguments.length) {
    case 0:
      throw setNoArgError(new Error, 'lines');
    case 1:
      throw setNoArgError(new Error, 'opts');
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step return-new-html-instance

  return new Html(lines, opts);

  /// #}}} @step return-new-html-instance
}
/// #}}} @func newHtml

/// #{{{ @func Html.prototype.__
/**
 * @private
 * @this {!Html}
 * @return {!Html}
 */
function __() {

  /// #{{{ @step declare-variables


  /// #}}} @step declare-variables

  /// #{{{ @step verify-parameters

  switch (arguments.length) {
    case 0:
      throw setNoArgError(new Error, '');
    case 1:
      throw setNoArgError(new Error, '');
  }

  if ( !isString() ) {
    throw setTypeError(new TypeError, '', 'string');
  }
  if ( !isString() ) {
    throw setTypeError(new TypeError, '', 'string');
  }

  if (!) {
    throw setEmptyError(new Error, '');
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step set-constants

  /// #{{{ @const 
  /**
   * @private
   * @const {string}
   */
  /// #}}} @const 

  /// #}}} @step set-constants

  /// #{{{ @step set-member-refs


  /// #}}} @step set-member-refs

  /// #{{{ @step return-instance

  return this;

  /// #}}} @step return-instance
}
/// #}}} @func Html.prototype.__

/// #{{{ @step setup-html-constructor

Html.Html = Html;
Html.newHtml = newHtml;
Html.construct = newHtml;
Html.prototype = createObject(null);

freezeObject(Html);

/// #}}} @step setup-html-constructor

/// #{{{ @step setup-html-prototype

setConstantProperty(Html.prototype, '__', __);
setConstantProperty(Html.prototype, 'constructor', Html, false);

freezeObject(Html.prototype);

/// #}}} @step setup-html-prototype

/// #}}} @group HTML

/// #{{{ @group BLOCK

/// #{{{ @func Block
/**
 * @private
 * @param {(!Html|!Block)} parent
 * @constructor
 * @struct
 */
function Block(parent) {

  /// #{{{ @step verify-new-keyword

  if ( !isInstanceOf(this, Block) ) {
    throw setNewError(new SyntaxError, 'Block');
  }

  /// #}}} @step verify-new-keyword

  /// #{{{ @step verify-parameters

  switch (arguments.length) {
    case 0:
      throw setNoArgError(new Error, 'parent');
  }

  if ( !isInstanceOf(parent, Block) && !isInstanceOf(parent, Html) ) {
    throw setTypeError(new TypeError, 'parent', '(!Html|!Block)');
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step set-constants

  /// #{{{ @const PARENT
  /**
   * @private
   * @const {(!Html|!Block)}
   */
  var PARENT = parent;
  /// #}}} @const PARENT

  /// #{{{ @const ELEMS
  /**
   * @private
   * @const {!Array<(!Block|!Inline)>}
   */
  var ELEMS = [];
  /// #}}} @const ELEMS

  /// #{{{ @const LINES
  /**
   * @private
   * @const {!Array<string>}
   */
  var LINES = [];
  /// #}}} @const LINES

  /// #{{{ @const RANK
  /**
   * @description
   *   The `RANK` is the *index* of the new `Block` instance's place within
   *   the `ELEMS` of its `PARENT`.
   * @private
   * @const {number}
   */
  var RANK = PARENT.ELEMS.length;
  /// #}}} @const RANK

  /// #{{{ @const ROOT
  /**
   * @private
   * @const {!Html}
   */
  var ROOT = PARENT.ROOT;
  /// #}}} @const ROOT

  /// #{{{ @const DEPTH
  /**
   * @private
   * @const {number}
   */
  var DEPTH = ROOT.depth;
  /// #}}} @const DEPTH

  /// #{{{ @const INDEX
  /**
   * @private
   * @const {number}
   */
  var INDEX = ROOT.i;
  /// #}}} @const INDEX

  /// #}}} @step set-constants

  /// #{{{ @step set-members

  /// #{{{ @member DEPTH
  /**
   * @const {number}
   */
  setConstantProperty(this, 'DEPTH', DEPTH);
  /// #}}} @member DEPTH

  /// #{{{ @member ELEMS
  /**
   * @const {!Array<(!Block|!Inline)>}
   */
  setConstantProperty(this, 'ELEMS', ELEMS);
  /// #}}} @member ELEMS

  /// #{{{ @member INDEX
  /**
   * @const {number}
   */
  setConstantProperty(this, 'INDEX', INDEX);
  /// #}}} @member INDEX

  /// #{{{ @member LAST
  /**
   * @description
   *   This parameter is only defined after `Block.prototype.getLastIndex` has
   *   completed. Note that for this member only defined means that its value
   *   is changed from `null` to a positive whole `number`.
   * @type {?number}
   */
  setProperty(this, 'LAST', null);
  /// #}}} @member LAST

  /// #{{{ @member LINES
  /**
   * @const {!Array<string>}
   */
  setConstantProperty(this, 'LINES', LINES);
  /// #}}} @member LINES

  /// #{{{ @member PARENT
  /**
   * @const {(!Html|!Block)}
   */
  setConstantProperty(this, 'PARENT', PARENT);
  /// #}}} @member PARENT

  /// #{{{ @member RANK
  /**
   * @const {number}
   */
  setConstantProperty(this, 'RANK', RANK);
  /// #}}} @member RANK

  /// #{{{ @member RESULT
  /**
   * @description
   *   This parameter is only defined after `Html.prototype.parse` has
   *   completed. Note that for this member only defined means that its value
   *   is changed from `null` to a `string`. The `result` member maintains
   *   the incomplete states.
   * @type {?string}
   */
  setProperty(this, 'RESULT', null);
  /// #}}} @member RESULT

  /// #{{{ @member ROOT
  /**
   * @const {!Html}
   */
  setConstantProperty(this, 'ROOT', ROOT);
  /// #}}} @member ROOT

  /// #}}} @step set-members

  /// #{{{ @step cap-instance

  capObject(this);

  /// #}}} @step cap-instance

  /// #{{{ @step parse-lines

  this.parse();

  /// #}}} @step parse-lines

  /// #{{{ @step freeze-instance

  freezeObject(this);

  /// #}}} @step freeze-instance
}
/// #}}} @func Block

/// #{{{ @func newBlock
/**
 * @private
 * @param {!Array<string>} lines
 * @param {!Object} opts
 * @return {!Block}
 */
function newBlock(lines, opts) {

  /// #{{{ @step verify-parameters

  switch (arguments.length) {
    case 0:
      throw setNoArgError(new Error, 'lines');
    case 1:
      throw setNoArgError(new Error, 'opts');
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step return-new-html-instance

  return new Block(lines, opts);

  /// #}}} @step return-new-html-instance
}
/// #}}} @func newBlock

/// #{{{ @func Block.prototype.__
/**
 * @private
 * @this {!Block}
 * @return {!Block}
 */
function __() {

  /// #{{{ @step declare-variables


  /// #}}} @step declare-variables

  /// #{{{ @step verify-parameters

  switch (arguments.length) {
    case 0:
      throw setNoArgError(new Error, '');
    case 1:
      throw setNoArgError(new Error, '');
  }

  if ( !isString() ) {
    throw setTypeError(new TypeError, '', 'string');
  }
  if ( !isString() ) {
    throw setTypeError(new TypeError, '', 'string');
  }

  if (!) {
    throw setEmptyError(new Error, '');
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step set-constants

  /// #{{{ @const 
  /**
   * @private
   * @const {string}
   */
  /// #}}} @const 

  /// #}}} @step set-constants

  /// #{{{ @step set-member-refs


  /// #}}} @step set-member-refs

  /// #{{{ @step return-instance

  return this;

  /// #}}} @step return-instance
}
/// #}}} @func Block.prototype.__

/// #{{{ @step setup-html-constructor

Block.Block = Block;
Block.newBlock = newBlock;
Block.construct = newBlock;
Block.prototype = createObject(null);

freezeObject(Block);

/// #}}} @step setup-html-constructor

/// #{{{ @step setup-html-prototype

setConstantProperty(Block.prototype, '__', __);
setConstantProperty(Block.prototype, 'constructor', Block, false);

freezeObject(Block.prototype);

/// #}}} @step setup-html-prototype

/// #}}} @group BLOCK

/// #}}} @group CLASSES

/// #{{{ @group METHODS
//////////////////////////////////////////////////////////////////////////////
// METHODS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func parseToHtml
/**
 * @public
 * @param {!Array<string>} lines
 * @param {?Object=} opts
 * @param {number=} opts.depth = `0`
 * @param {number=} opts.indent = `2`
 * @param {boolean=} opts.github = `false`
 * @return {string}
 */
function parseToHtml(lines, opts) {

  /// #{{{ @step declare-variables

  /** @type {!Html} */
  var html;

  /// #}}} @step declare-variables

  /// #{{{ @step verify-parameters

  switch (arguments.length) {
    case 0:
      throw setNoArgError(new Error, 'lines');

    case 1:
      opts = cloneObject(DFLTS);
      break;

    default:
      if ( isNull(opts) || isUndefined(opts) ) {
        opts = cloneObject(DFLTS);
        break;
      }

      if ( !isPlainObject(opts) ) {
        throw setTypeError(new TypeError, 'opts', '?Object=');
      }

      opts = cloneObject(opts);

      if ( !hasOption(opts, 'depth') ) {
        opts['depth'] = DFLTS['depth'];
      }
      else if ( !isNumber(opts['depth']) ) {
        throw setTypeError(new TypeError, 'opts.depth', 'number=');
      }
      else if ( !isWholeNumber(opts['depth']) || opts['depth'] < 0 ) {
        throw setIndexError(new RangeError, 'opts.depth', opts['depth'], 0);
      }

      if ( !hasOption(opts, 'github') ) {
        opts['github'] = DFLTS['github'];
      }
      else if ( !isBoolean(opts['github']) ) {
        throw setTypeError(new TypeError, 'opts.github', 'boolean=');
      }

      if ( !hasOption(opts, 'indent') ) {
        opts['indent'] = DFLTS['indent'];
      }
      else if ( !isNumber(opts['indent']) ) {
        throw setTypeError(new TypeError, 'opts.indent', 'number=');
      }
      else if ( !isWholeNumber(opts['indent']) || opts['indent'] < 0 ) {
        throw setIndexError(new RangeError, 'opts.indent', opts['indent'], 0);
      }
  }

  if ( !isArray(lines) || !isStringList(lines) ) {
    throw setTypeError(new TypeError, 'lines', '!Array<string>');
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step check-lines-length

  if (!lines.length) {
    return '';
  }

  /// #}}} @step check-lines-length

  /// #{{{ @step make-new-html-instance

  html = new Html(lines, opts);

  /// #}}} @step make-new-html-instance

  /// #{{{ @step return-parsed-result

  return html.RESULT;

  /// #}}} @step return-parsed-result
}
/// #}}} @func parseToHtml

/// #}}} @group METHODS

/// #{{{ @group EXPORTS
//////////////////////////////////////////////////////////////////////////////
// EXPORTS
//////////////////////////////////////////////////////////////////////////////

module.exports = parseToHtml;

/// #}}} @group EXPORTS

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
