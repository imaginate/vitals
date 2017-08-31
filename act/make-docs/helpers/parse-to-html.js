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

/// #{{{ @const PATT
/**
 * @private
 * @const {!Object<string, (!RegExp|!Object<string, !RegExp>)>}
 * @struct
 */
var PATT = {
  INDENT: {
    GET: /^( *).*$/,
    HAS: /^ +/
  },
  SCOPE: {
    QUOTE: /^( *>+).*$/
  },
  TEST: {
    H: /^ *#{1,6} /,
    HR: /^ *---+/,
    OL: /^ *[0-9]+\) /,
    PRE: /^ *```/,
    QUOTE: /^ *>+/,
    UL: /^ *- /
  }
};
/// #}}} @const PATT

/// #{{{ @const ELEM
/**
 * @private
 * @const {!Object<string, !Object<string, (string|!function)>>}
 */
var ELEM = {
  'h': {
    ID: 'h',
    parse: parseHBlock,
    scope: scopeHBlock,
    test: testHBlock
  },
  'hr': {
    ID: 'hr',
    parse: parseHrBlock,
    scope: scopeHrBlock,
    test: testHrBlock
  },
  'ol': {
    ID: 'ol',
    parse: parseOlBlock,
    scope: scopeOlBlock,
    test: testOlBlock
  },
  'p': {
    ID: 'p',
    parse: parsePBlock,
    scope: scopePBlock,
    test: testPBlock
  },
  'pre': {
    ID: 'pre',
    parse: parsePreBlock,
    scope: scopePreBlock,
    test: testPreBlock
  },
  'quote': {
    ID: 'quote',
    parse: parseQuoteBlock,
    scope: scopeQuoteBlock,
    test: testQuoteBlock
  },
  'ul': {
    ID: 'ul',
    parse: parseUlBlock,
    scope: scopeUlBlock,
    test: testUlBlock
  }
};
/// #}}} @const ELEM

/// #{{{ @const ELEM_TESTS
/**
 * @private
 * @const {!Object<string, !Array<!Object<string, (string|!function)>>>}
 */
var ELEM_TESTS = {
  BLOCK: [
    ELEM.h,
    ELEM.ul,
    ELEM.ol,
    ELEM.hr,
    ELEM.pre,
    ELEM.quote,
    ELEM.p
  ],
  INLINE: [
  ]
};
/// #}}} @const ELEM_TESTS

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

/// #{{{ @func isBlankLine
/**
 * @private
 * @param {string} line
 * @return {boolean}
 */
var isBlankLine = require('./is-blank-line.js');
/// #}}} @func isBlankLine

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

/// #{{{ @func getBlockId
/**
 * @private
 * @param {string} line
 * @return {string}
 */
function getBlockId(line) {

  /// #{{{ @step declare-variables

  /** @type {string} */
  var id;

  /// #}}} @step declare-variables

  /// #{{{ @step verify-parameters

  if (!arguments.length) {
    throw setNoArgError(new Error, 'line');
  }
  if ( !isString(line) ) {
    throw setTypeError(new TypeError, 'line', 'string');
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step get-block-element-id

  testEachProperty(ELEM_TESTS.BLOCK, function _getBlockId(elem) {
    if ( elem.test(line) ) {
      id = elem.ID;
      return true;
    }
    return false;
  });

  /// #}}} @step get-block-element-id

  /// #{{{ @step return-block-element-id

  return id;

  /// #}}} @step return-block-element-id
}
/// #}}} @func getBlockId

/// #{{{ @func newIsIndented
/**
 * @private
 * @param {number=} count = `2`
 * @return {!function(string, number=): boolean}
 */
var newIsIndented = require('./is-indented.js').create;
/// #}}} @func newIsIndented

/// #{{{ @func newMakeIndent
/**
 * @private
 * @param {number=} count = `2`
 * @return {!function(number): string}
 */
var newMakeIndent = require('./make-indent.js').create;
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

  /// #{{{ @const ID
  /**
   * @private
   * @const {string}
   */
  var ID = 'html';
  /// #}}} @const ID

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

  /// #{{{ @const LAST
  /**
   * @private
   * @const {number}
   */
  var LAST = LEN - 1;
  /// #}}} @const LAST

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

  /// #{{{ @const isIndented
  /**
   * @private
   * @const {!function(string, number=): boolean}
   */
  var isIndented = newIsIndented(INDENT);
  /// #}}} @const isIndented

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

  /// #{{{ @member END
  /**
   * @const {number}
   */
  setConstantProperty(this, 'END', LEN);
  /// #}}} @member END

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

  /// #{{{ @member ID
  /**
   * @const {string}
   */
  setConstantProperty(this, 'ID', ID);
  /// #}}} @member ID

  /// #{{{ @member INDENT
  /**
   * @const {number}
   */
  setConstantProperty(this, 'INDENT', INDENT);
  /// #}}} @member INDENT

  /// #{{{ @member INDEX
  /**
   * @const {number}
   */
  setConstantProperty(this, 'INDEX', 0);
  /// #}}} @member INDEX

  /// #{{{ @member LAST
  /**
   * @const {number}
   */
  setConstantProperty(this, 'LAST', LAST);
  /// #}}} @member LAST

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
   *   completed. Note that for only this member defined means that its value
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

  /// #{{{ @member index
  /**
   * @type {number}
   */
  setProperty(this, 'index', 0, true);
  /// #}}} @member index

  /// #{{{ @member isIndented
  /**
   * @private
   * @param {string} line
   * @param {number=} depth = `0`
   * @return {boolean}
   */
  setConstantProperty(this, 'isIndented', isIndented);
  /// #}}} @member isIndented

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

/// #{{{ @func Html.prototype.parse
/**
 * @private
 * @this {!Html}
 * @return {!Html}
 */
function parseHtml() {

  /// #{{{ @step declare-variables

  /** @type {string} */
  var result;
  /** @type {!Array<string>} */
  var lines;
  /** @type {!Array<!Block>} */
  var elems;
  /** @type {!Block} */
  var elem;
  /** @type {number} */
  var len;
  /** @type {number} */
  var i;

  /// #}}} @step declare-variables

  /// #{{{ @step parse-lines

  result = '';
  elems = this.ELEMS;
  lines = this.LINES;
  len = this.LEN;
  i = this.index;
  while (i < len) {
    elem = new Block(this);
    i = elem.END;
    elems.push(elem);
    result += elem.RESULT;
    while ( i < len && isBlankLine(lines[i]) ) {
      ++i;
    }
    this.index = i;
  }

  /// #}}} @step parse-lines

  /// #{{{ @step freeze-elems

  freezeObject(this.ELEMS);

  /// #}}} @step freeze-elems

  /// #{{{ @step save-result

  setConstantProperty(this, 'RESULT', result);

  /// #}}} @step save-result

  /// #{{{ @step return-instance

  return this;

  /// #}}} @step return-instance
}
/// #}}} @func Html.prototype.parse

/// #{{{ @step setup-html-constructor

Html.Html = Html;
Html.newHtml = newHtml;
Html.construct = newHtml;
Html.prototype = createObject(null);

freezeObject(Html);

/// #}}} @step setup-html-constructor

/// #{{{ @step setup-html-prototype

setConstantProperty(Html.prototype, 'parse', parseHtml);
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
  var INDEX = ROOT.index;
  /// #}}} @const INDEX

  /// #{{{ @const ID
  /**
   * @private
   * @const {string}
   */
  var ID = getBlockId(ROOT.LINES[INDEX]);
  /// #}}} @const ID

  /// #{{{ @const isIndented
  /**
   * @private
   * @const {!function(string, number=): boolean}
   */
  var isIndented = ROOT.isIndented;
  /// #}}} @const isIndented

  /// #{{{ @const makeIndent
  /**
   * @private
   * @const {!function(number): string}
   */
  var makeIndent = ROOT.makeIndent;
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

  /// #{{{ @member END
  /**
   * @description
   *   This parameter is only defined after `Block.prototype.scope` has
   *   completed. Note that for only this member defined means that its value
   *   is changed from `null` to a positive whole `number`.
   * @type {?number}
   */
  setProperty(this, 'END', null);
  /// #}}} @member END

  /// #{{{ @member ID
  /**
   * @const {string}
   */
  setConstantProperty(this, 'ID', ID);
  /// #}}} @member ID

  /// #{{{ @member INDEX
  /**
   * @const {number}
   */
  setConstantProperty(this, 'INDEX', INDEX);
  /// #}}} @member INDEX

  /// #{{{ @member LAST
  /**
   * @description
   *   This parameter is only defined after `Block.prototype.scope` has
   *   completed. Note that for only this member defined means that its value
   *   is changed from `null` to a positive whole `number`.
   * @type {?number}
   */
  setProperty(this, 'LAST', null);
  /// #}}} @member LAST

  /// #{{{ @member LEN
  /**
   * @description
   *   This parameter is only defined after `Block.prototype.scope` has
   *   completed. Note that for only this member defined means that its value
   *   is changed from `null` to a positive whole `number`.
   * @type {?number}
   */
  setProperty(this, 'LEN', null);
  /// #}}} @member LEN

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
   *   This parameter is only defined after `Block.prototype.parse` has
   *   completed. Note that for only this member defined means that its value
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

  /// #{{{ @member isIndented
  /**
   * @private
   * @param {string} line
   * @param {number=} depth = `0`
   * @return {boolean}
   */
  setConstantProperty(this, 'isIndented', isIndented);
  /// #}}} @member isIndented

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

  /// #{{{ @step setup-scope

  this.scope();

  /// #}}} @step setup-scope

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

/// #{{{ @func Block.prototype.parse
/**
 * @private
 * @this {!Block}
 * @return {!Block}
 */
function parseBlock() {

  /// #{{{ @step declare-variables

  /** @type {string} */
  var result;

  /// #}}} @step declare-variables

  /// #{{{ @step run-correct-parse

  result = ELEM[this.ID].parse(this.ROOT, this, this.ELEMS, this.LINES,
    this.LEN, this.DEPTH);

  /// #{{{ @step update-root-index

  i = this.END;
  while ( i < LEN && isBlankLine(LINES[i]) ) {
    ++i;
  }
  ROOT.index = i;

  /// #}}} @step update-root-index

  /// #}}} @step run-correct-parse

  /// #{{{ @step freeze-elems

  freezeObject(this.ELEMS);

  /// #}}} @step freeze-elems

  /// #{{{ @step save-result

  setConstantProperty(this, 'RESULT', result);

  /// #}}} @step save-result

  /// #{{{ @step return-instance

  return this;

  /// #}}} @step return-instance
}
/// #}}} @func Block.prototype.parse

/// #{{{ @func Block.prototype.scope
/**
 * @private
 * @this {!Block}
 * @return {!Block}
 */
function scopeBlock() {

  /// #{{{ @step set-constants

  /// #{{{ @const ROOT
  /**
   * @private
   * @const {!Html}
   */
  var ROOT = this.ROOT;
  /// #}}} @const ROOT

  /// #{{{ @const LEN
  /**
   * @private
   * @const {number}
   */
  var LEN = ROOT.LEN;
  /// #}}} @const LEN

  /// #{{{ @const LINES
  /**
   * @private
   * @const {!Array<string>}
   */
  var LINES = ROOT.LINES;
  /// #}}} @const LINES

  /// #}}} @step set-constants

  /// #{{{ @step run-correct-scope

  ELEM[this.ID].scope(ROOT, LINES, LEN, this.INDEX, this.DEPTH, this,
    this.LINES);

  /// #}}} @step run-correct-scope

  /// #{{{ @step freeze-lines

  freezeObject(this.LINES);

  /// #}}} @step freeze-lines

  /// #{{{ @step save-end

  setConstantProperty(this, 'LEN', this.LINES.length);
  setConstantProperty(this, 'END', this.INDEX + this.LEN);
  setConstantProperty(this, 'LAST', this.END - 1);

  /// #}}} @step save-end

  /// #{{{ @step return-instance

  return this;

  /// #}}} @step return-instance
}
/// #}}} @func Block.prototype.scope

/// #{{{ @step setup-block-constructor

Block.Block = Block;
Block.newBlock = newBlock;
Block.construct = newBlock;
Block.prototype = createObject(null);

freezeObject(Block);

/// #}}} @step setup-block-constructor

/// #{{{ @step setup-block-prototype

setConstantProperty(Block.prototype, 'parse', parseBlock);
setConstantProperty(Block.prototype, 'scope', scopeBlock);
setConstantProperty(Block.prototype, 'constructor', Block, false);

freezeObject(Block.prototype);

/// #}}} @step setup-block-prototype

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

/// #{{{ @func parse__Block
/**
 * @private
 * @param {!Block} BLK
 * @param {!Array<(!Block|!Inline)>} ELEMS
 * @param {!Html} ROOT
 * @param {!Array<string>} LINES
 * @param {number} LEN
 * @param {number} INDEX
 * @param {number} DEPTH
 * @return {!Block}
 */
function parse__Block(BLK, ELEMS, ROOT, LINES, LEN, INDEX, DEPTH) {

  result = ELEM[this.ID].parse(this.ROOT, this, this.ELEMS, this.LINES,
    this.LEN, this.DEPTH);
  /// #{{{ @step declare-variables

  /** @type {string} */
  var result;
  /** @type {number} */
  var depth;
  /** @type {string} */
  var line;
  /** @type {number} */
  var i;

  /// #}}} @step declare-variables

  /// #{{{ @step verify-parameters

  switch (arguments.length) {
    case 0:
      throw setNoArgError(new Error, 'BLK');
    case 1:
      throw setNoArgError(new Error, 'ELEMS');
    case 2:
      throw setNoArgError(new Error, 'ROOT');
    case 3:
      throw setNoArgError(new Error, 'LINES');
    case 4:
      throw setNoArgError(new Error, 'LEN');
    case 5:
      throw setNoArgError(new Error, 'INDEX');
    case 6:
      throw setNoArgError(new Error, 'DEPTH');
  }

  if ( !isInstanceOf(BLK, Block) ) {
    throw setTypeError(new TypeError, 'BLK', '!Block');
  }
  if ( !isArray(ELEMS) || BLK.ELEMS !== ELEMS ) {
    throw setTypeError(new TypeError, 'ELEMS', '!Array<(!Block|!Inline)>');
  }
  if ( !isInstanceOf(ROOT, Html) ) {
    throw setTypeError(new TypeError, 'ROOT', '!Html');
  }
  if ( !isArray(LINES) || ROOT.LINES !== LINES ) {
    throw setTypeError(new TypeError, 'LINES', '!Array<string>');
  }
  if ( !isNumber(LEN)  || ROOT.LEN !== LEN ) {
    throw setTypeError(new TypeError, 'LEN', 'number');
  }
  if ( !isNumber(INDEX) || BLK.INDEX !== INDEX ) {
    throw setTypeError(new TypeError, 'INDEX', 'number');
  }
  if ( !isNumber(DEPTH) || BLK.DEPTH !== DEPTH ) {
    throw setTypeError(new TypeError, 'DEPTH', 'number');
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step parse-each-line

  i = INDEX;
  while (++i < LEN) {
    line = LINES[i];
    if ( /* !isValidLine */ ) {
      break;
    }
  }

  /// #}}} @step parse-each-line

  /// #{{{ @step update

  i = INDEX;
  while (++i < LEN) {
    line = LINES[i];
    if ( /* !isValidLine */ ) {
      break;
    }
  }

  /// #}}} @step parse-each-line

  /// #{{{ @step return-block-instance

  return BLK;

  /// #}}} @step return-block-instance
}
/// #}}} @func parse__Block

/// #{{{ @func scopeHBlock
/**
 * @private
 * @param {!Html} $ROOT
 * @param {!Array<string>} $LINES
 * @param {number} $LEN
 * @param {number} index
 * @param {number} depth
 * @param {!Block} BLK
 * @param {!Array<string>} LINES
 * @return {!Block}
 */
function scopeHBlock($ROOT, $LINES, $LEN, index, depth, BLK, LINES) {

  /// #{{{ @step declare-variables

  /** @type {string} */
  var line;

  /// #}}} @step declare-variables

  /// #{{{ @step verify-parameters

  switch (arguments.length) {
    case 0:
      throw setNoArgError(new Error, '$ROOT');
    case 1:
      throw setNoArgError(new Error, '$LINES');
    case 2:
      throw setNoArgError(new Error, '$LEN');
    case 3:
      throw setNoArgError(new Error, 'index');
    case 4:
      throw setNoArgError(new Error, 'depth');
    case 5:
      throw setNoArgError(new Error, 'BLK');
    case 6:
      throw setNoArgError(new Error, 'LINES');
  }

  if ( !isInstanceOf($ROOT, Html) ) {
    throw setTypeError(new TypeError, '$ROOT', '!Html');
  }
  if ( !isInstanceOf(BLK, Block) ) {
    throw setTypeError(new TypeError, 'BLK', '!Block');
  }

  if ( !isArray($LINES) || $ROOT.LINES !== $LINES ) {
    throw setTypeError(new TypeError, '$LINES', '!Array<string>');
  }
  if ( !isArray(LINES) || BLK.LINES !== LINES ) {
    throw setTypeError(new TypeError, 'LINES', '!Array<string>');
  }

  if ( !isNumber($LEN)  || $ROOT.LEN !== $LEN ) {
    throw setTypeError(new TypeError, '$LEN', 'number');
  }
  if ( !isNumber(index) || BLK.INDEX !== index ) {
    throw setTypeError(new TypeError, 'index', 'number');
  }
  if ( !isNumber(depth) || BLK.DEPTH !== depth ) {
    throw setTypeError(new TypeError, 'depth', 'number');
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step set-lines-in-scope

  line = $LINES[index];
  LINES.push(line);

  ++index;

  /// #}}} @step set-lines-in-scope

  /// #{{{ @step return-block-instance

  return BLK;

  /// #}}} @step return-block-instance
}
/// #}}} @func scopeHBlock

/// #{{{ @func scopeHrBlock
/**
 * @private
 * @param {!Html} $ROOT
 * @param {!Array<string>} $LINES
 * @param {number} $LEN
 * @param {number} index
 * @param {number} depth
 * @param {!Block} BLK
 * @param {!Array<string>} LINES
 * @return {!Block}
 */
function scopeHrBlock($ROOT, $LINES, $LEN, index, depth, BLK, LINES) {

  /// #{{{ @step declare-variables

  /** @type {string} */
  var line;

  /// #}}} @step declare-variables

  /// #{{{ @step verify-parameters

  switch (arguments.length) {
    case 0:
      throw setNoArgError(new Error, '$ROOT');
    case 1:
      throw setNoArgError(new Error, '$LINES');
    case 2:
      throw setNoArgError(new Error, '$LEN');
    case 3:
      throw setNoArgError(new Error, 'index');
    case 4:
      throw setNoArgError(new Error, 'depth');
    case 5:
      throw setNoArgError(new Error, 'BLK');
    case 6:
      throw setNoArgError(new Error, 'LINES');
  }

  if ( !isInstanceOf($ROOT, Html) ) {
    throw setTypeError(new TypeError, '$ROOT', '!Html');
  }
  if ( !isInstanceOf(BLK, Block) ) {
    throw setTypeError(new TypeError, 'BLK', '!Block');
  }

  if ( !isArray($LINES) || $ROOT.LINES !== $LINES ) {
    throw setTypeError(new TypeError, '$LINES', '!Array<string>');
  }
  if ( !isArray(LINES) || BLK.LINES !== LINES ) {
    throw setTypeError(new TypeError, 'LINES', '!Array<string>');
  }

  if ( !isNumber($LEN)  || $ROOT.LEN !== $LEN ) {
    throw setTypeError(new TypeError, '$LEN', 'number');
  }
  if ( !isNumber(index) || BLK.INDEX !== index ) {
    throw setTypeError(new TypeError, 'index', 'number');
  }
  if ( !isNumber(depth) || BLK.DEPTH !== depth ) {
    throw setTypeError(new TypeError, 'depth', 'number');
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step set-lines-in-scope

  line = $LINES[index];
  LINES.push(line);

  ++index;

  /// #}}} @step set-lines-in-scope

  /// #{{{ @step return-block-instance

  return BLK;

  /// #}}} @step return-block-instance
}
/// #}}} @func scopeHrBlock

/// #{{{ @func scopeOlBlock
/**
 * @private
 * @param {!Html} $ROOT
 * @param {!Array<string>} $LINES
 * @param {number} $LEN
 * @param {number} index
 * @param {number} depth
 * @param {!Block} BLK
 * @param {!Array<string>} LINES
 * @return {!Block}
 */
function scopeOlBlock($ROOT, $LINES, $LEN, index, depth, BLK, LINES) {

  /// #{{{ @step declare-variables

  /** @type {string} */
  var line;

  /// #}}} @step declare-variables

  /// #{{{ @step verify-parameters

  switch (arguments.length) {
    case 0:
      throw setNoArgError(new Error, '$ROOT');
    case 1:
      throw setNoArgError(new Error, '$LINES');
    case 2:
      throw setNoArgError(new Error, '$LEN');
    case 3:
      throw setNoArgError(new Error, 'index');
    case 4:
      throw setNoArgError(new Error, 'depth');
    case 5:
      throw setNoArgError(new Error, 'BLK');
    case 6:
      throw setNoArgError(new Error, 'LINES');
  }

  if ( !isInstanceOf($ROOT, Html) ) {
    throw setTypeError(new TypeError, '$ROOT', '!Html');
  }
  if ( !isInstanceOf(BLK, Block) ) {
    throw setTypeError(new TypeError, 'BLK', '!Block');
  }

  if ( !isArray($LINES) || $ROOT.LINES !== $LINES ) {
    throw setTypeError(new TypeError, '$LINES', '!Array<string>');
  }
  if ( !isArray(LINES) || BLK.LINES !== LINES ) {
    throw setTypeError(new TypeError, 'LINES', '!Array<string>');
  }

  if ( !isNumber($LEN)  || $ROOT.LEN !== $LEN ) {
    throw setTypeError(new TypeError, '$LEN', 'number');
  }
  if ( !isNumber(index) || BLK.INDEX !== index ) {
    throw setTypeError(new TypeError, 'index', 'number');
  }
  if ( !isNumber(depth) || BLK.DEPTH !== depth ) {
    throw setTypeError(new TypeError, 'depth', 'number');
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step set-constants

  /// #{{{ @const DEPTH
  /**
   * @private
   * @const {number}
   */
  var DEPTH = ++depth;
  /// #}}} @const DEPTH

  /// #{{{ @const PATTERN
  /**
   * @private
   * @const {!RegExp}
   */
  var PATTERN = new RegExp(
    '^' + $LINES[index].replace(PATT.INDENT.GET, '$1') + '[0-9]+\\) ');
  /// #}}} @const PATTERN

  /// #{{{ @const isIndented
  /**
   * @private
   * @const {!function(string, number=): boolean}
   */
  var isIndented = $ROOT.isIndented;
  /// #}}} @const isIndented

  /// #}}} @step set-constants

  /// #{{{ @step set-lines-in-scope

  line = $LINES[index];
  LINES.push(line);

  while (++index < $LEN) {
    line = $LINES[index];
    if ( isIndented(line, DEPTH) || PATTERN.test(line) ) {
      LINES.push(line);
    }
    else {
      break;
    }
  }

  /// #}}} @step set-lines-in-scope

  /// #{{{ @step return-block-instance

  return BLK;

  /// #}}} @step return-block-instance
}
/// #}}} @func scopeOlBlock

/// #{{{ @func scopePBlock
/**
 * @private
 * @param {!Html} $ROOT
 * @param {!Array<string>} $LINES
 * @param {number} $LEN
 * @param {number} index
 * @param {number} depth
 * @param {!Block} BLK
 * @param {!Array<string>} LINES
 * @return {!Block}
 */
function scopePBlock($ROOT, $LINES, $LEN, index, depth, BLK, LINES) {

  /// #{{{ @step declare-variables

  /** @type {string} */
  var line;

  /// #}}} @step declare-variables

  /// #{{{ @step verify-parameters

  switch (arguments.length) {
    case 0:
      throw setNoArgError(new Error, '$ROOT');
    case 1:
      throw setNoArgError(new Error, '$LINES');
    case 2:
      throw setNoArgError(new Error, '$LEN');
    case 3:
      throw setNoArgError(new Error, 'index');
    case 4:
      throw setNoArgError(new Error, 'depth');
    case 5:
      throw setNoArgError(new Error, 'BLK');
    case 6:
      throw setNoArgError(new Error, 'LINES');
  }

  if ( !isInstanceOf($ROOT, Html) ) {
    throw setTypeError(new TypeError, '$ROOT', '!Html');
  }
  if ( !isInstanceOf(BLK, Block) ) {
    throw setTypeError(new TypeError, 'BLK', '!Block');
  }

  if ( !isArray($LINES) || $ROOT.LINES !== $LINES ) {
    throw setTypeError(new TypeError, '$LINES', '!Array<string>');
  }
  if ( !isArray(LINES) || BLK.LINES !== LINES ) {
    throw setTypeError(new TypeError, 'LINES', '!Array<string>');
  }

  if ( !isNumber($LEN)  || $ROOT.LEN !== $LEN ) {
    throw setTypeError(new TypeError, '$LEN', 'number');
  }
  if ( !isNumber(index) || BLK.INDEX !== index ) {
    throw setTypeError(new TypeError, 'index', 'number');
  }
  if ( !isNumber(depth) || BLK.DEPTH !== depth ) {
    throw setTypeError(new TypeError, 'depth', 'number');
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step set-lines-in-scope

  line = $LINES[index];
  LINES.push(line);

  while (++index < $LEN) {
    line = $LINES[index];
    if ( isEmptyLine(line, depth) || getBlockId(line) !== 'p' ) {
      break;
    }
    else {
      LINES.push(line);
    }
  }

  /// #}}} @step set-lines-in-scope

  /// #{{{ @step return-block-instance

  return BLK;

  /// #}}} @step return-block-instance
}
/// #}}} @func scopePBlock

/// #{{{ @func scopePreBlock
/**
 * @private
 * @param {!Html} $ROOT
 * @param {!Array<string>} $LINES
 * @param {number} $LEN
 * @param {number} index
 * @param {number} depth
 * @param {!Block} BLK
 * @param {!Array<string>} LINES
 * @return {!Block}
 */
function scopePreBlock($ROOT, $LINES, $LEN, index, depth, BLK, LINES) {

  /// #{{{ @step declare-variables

  /** @type {string} */
  var line;

  /// #}}} @step declare-variables

  /// #{{{ @step verify-parameters

  switch (arguments.length) {
    case 0:
      throw setNoArgError(new Error, '$ROOT');
    case 1:
      throw setNoArgError(new Error, '$LINES');
    case 2:
      throw setNoArgError(new Error, '$LEN');
    case 3:
      throw setNoArgError(new Error, 'index');
    case 4:
      throw setNoArgError(new Error, 'depth');
    case 5:
      throw setNoArgError(new Error, 'BLK');
    case 6:
      throw setNoArgError(new Error, 'LINES');
  }

  if ( !isInstanceOf($ROOT, Html) ) {
    throw setTypeError(new TypeError, '$ROOT', '!Html');
  }
  if ( !isInstanceOf(BLK, Block) ) {
    throw setTypeError(new TypeError, 'BLK', '!Block');
  }

  if ( !isArray($LINES) || $ROOT.LINES !== $LINES ) {
    throw setTypeError(new TypeError, '$LINES', '!Array<string>');
  }
  if ( !isArray(LINES) || BLK.LINES !== LINES ) {
    throw setTypeError(new TypeError, 'LINES', '!Array<string>');
  }

  if ( !isNumber($LEN)  || $ROOT.LEN !== $LEN ) {
    throw setTypeError(new TypeError, '$LEN', 'number');
  }
  if ( !isNumber(index) || BLK.INDEX !== index ) {
    throw setTypeError(new TypeError, 'index', 'number');
  }
  if ( !isNumber(depth) || BLK.DEPTH !== depth ) {
    throw setTypeError(new TypeError, 'depth', 'number');
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step set-constants

  /// #{{{ @const PATTERN
  /**
   * @private
   * @const {!RegExp}
   */
  var PATTERN = new RegExp(
    '^' + $LINES[index].replace(PATT.INDENT.GET, '$1') + '```');
  /// #}}} @const PATTERN

  /// #}}} @step set-constants

  /// #{{{ @step set-lines-in-scope

  line = $LINES[index];
  LINES.push(line);

  while (++index < $LEN) {
    line = $LINES[index];
    if ( PATTERN.test(line) ) {
      break;
    }
    else {
      LINES.push(line);
    }
  }

  /// #}}} @step set-lines-in-scope

  /// #{{{ @step return-block-instance

  return BLK;

  /// #}}} @step return-block-instance
}
/// #}}} @func scopePreBlock

/// #{{{ @func scopeQuoteBlock
/**
 * @private
 * @param {!Html} $ROOT
 * @param {!Array<string>} $LINES
 * @param {number} $LEN
 * @param {number} index
 * @param {number} depth
 * @param {!Block} BLK
 * @param {!Array<string>} LINES
 * @return {!Block}
 */
function scopeQuoteBlock($ROOT, $LINES, $LEN, index, depth, BLK, LINES) {

  /// #{{{ @step declare-variables

  /** @type {string} */
  var line;

  /// #}}} @step declare-variables

  /// #{{{ @step verify-parameters

  switch (arguments.length) {
    case 0:
      throw setNoArgError(new Error, '$ROOT');
    case 1:
      throw setNoArgError(new Error, '$LINES');
    case 2:
      throw setNoArgError(new Error, '$LEN');
    case 3:
      throw setNoArgError(new Error, 'index');
    case 4:
      throw setNoArgError(new Error, 'depth');
    case 5:
      throw setNoArgError(new Error, 'BLK');
    case 6:
      throw setNoArgError(new Error, 'LINES');
  }

  if ( !isInstanceOf($ROOT, Html) ) {
    throw setTypeError(new TypeError, '$ROOT', '!Html');
  }
  if ( !isInstanceOf(BLK, Block) ) {
    throw setTypeError(new TypeError, 'BLK', '!Block');
  }

  if ( !isArray($LINES) || $ROOT.LINES !== $LINES ) {
    throw setTypeError(new TypeError, '$LINES', '!Array<string>');
  }
  if ( !isArray(LINES) || BLK.LINES !== LINES ) {
    throw setTypeError(new TypeError, 'LINES', '!Array<string>');
  }

  if ( !isNumber($LEN)  || $ROOT.LEN !== $LEN ) {
    throw setTypeError(new TypeError, '$LEN', 'number');
  }
  if ( !isNumber(index) || BLK.INDEX !== index ) {
    throw setTypeError(new TypeError, 'index', 'number');
  }
  if ( !isNumber(depth) || BLK.DEPTH !== depth ) {
    throw setTypeError(new TypeError, 'depth', 'number');
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step set-constants

  /// #{{{ @const PATTERN
  /**
   * @private
   * @const {!RegExp}
   */
  var PATTERN = new RegExp(
    '^' + $LINES[index].replace(PATT.SCOPE.QUOTE, '$1'));
  /// #}}} @const PATTERN

  /// #}}} @step set-constants

  /// #{{{ @step set-lines-in-scope

  line = $LINES[index];
  LINES.push(line);

  while (++index < $LEN) {
    line = $LINES[index];
    if ( PATTERN.test(line) ) {
      LINES.push(line);
    }
    else {
      break;
    }
  }

  /// #}}} @step set-lines-in-scope

  /// #{{{ @step return-block-instance

  return BLK;

  /// #}}} @step return-block-instance
}
/// #}}} @func scopeQuoteBlock

/// #{{{ @func scopeUlBlock
/**
 * @private
 * @param {!Html} $ROOT
 * @param {!Array<string>} $LINES
 * @param {number} $LEN
 * @param {number} index
 * @param {number} depth
 * @param {!Block} BLK
 * @param {!Array<string>} LINES
 * @return {!Block}
 */
function scopeUlBlock($ROOT, $LINES, $LEN, index, depth, BLK, LINES) {

  /// #{{{ @step declare-variables

  /** @type {string} */
  var line;

  /// #}}} @step declare-variables

  /// #{{{ @step verify-parameters

  switch (arguments.length) {
    case 0:
      throw setNoArgError(new Error, '$ROOT');
    case 1:
      throw setNoArgError(new Error, '$LINES');
    case 2:
      throw setNoArgError(new Error, '$LEN');
    case 3:
      throw setNoArgError(new Error, 'index');
    case 4:
      throw setNoArgError(new Error, 'depth');
    case 5:
      throw setNoArgError(new Error, 'BLK');
    case 6:
      throw setNoArgError(new Error, 'LINES');
  }

  if ( !isInstanceOf($ROOT, Html) ) {
    throw setTypeError(new TypeError, '$ROOT', '!Html');
  }
  if ( !isInstanceOf(BLK, Block) ) {
    throw setTypeError(new TypeError, 'BLK', '!Block');
  }

  if ( !isArray($LINES) || $ROOT.LINES !== $LINES ) {
    throw setTypeError(new TypeError, '$LINES', '!Array<string>');
  }
  if ( !isArray(LINES) || BLK.LINES !== LINES ) {
    throw setTypeError(new TypeError, 'LINES', '!Array<string>');
  }

  if ( !isNumber($LEN)  || $ROOT.LEN !== $LEN ) {
    throw setTypeError(new TypeError, '$LEN', 'number');
  }
  if ( !isNumber(index) || BLK.INDEX !== index ) {
    throw setTypeError(new TypeError, 'index', 'number');
  }
  if ( !isNumber(depth) || BLK.DEPTH !== depth ) {
    throw setTypeError(new TypeError, 'depth', 'number');
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step set-constants

  /// #{{{ @const DEPTH
  /**
   * @private
   * @const {number}
   */
  var DEPTH = ++depth;
  /// #}}} @const DEPTH

  /// #{{{ @const PATTERN
  /**
   * @private
   * @const {!RegExp}
   */
  var PATTERN = new RegExp(
    '^' + $LINES[index].replace(PATT.INDENT.GET, '$1') + '- ');
  /// #}}} @const PATTERN

  /// #{{{ @const isIndented
  /**
   * @private
   * @const {!function(string, number=): boolean}
   */
  var isIndented = $ROOT.isIndented;
  /// #}}} @const isIndented

  /// #}}} @step set-constants

  /// #{{{ @step set-lines-in-scope

  line = $LINES[index];
  LINES.push(line);

  while (++index < $LEN) {
    line = $LINES[index];
    if ( isIndented(line, DEPTH) || PATTERN.test(line) ) {
      LINES.push(line);
    }
    else {
      break;
    }
  }

  /// #}}} @step set-lines-in-scope

  /// #{{{ @step return-block-instance

  return BLK;

  /// #}}} @step return-block-instance
}
/// #}}} @func scopeUlBlock

/// #{{{ @func testHBlock
/**
 * @private
 * @param {string} line
 * @return {boolean}
 */
function testHBlock(line) {

  /// #{{{ @step verify-parameters

  if (!arguments.length) {
    throw setNoArgError(new Error, 'line');
  }
  if ( !isString(line) ) {
    throw setTypeError(new TypeError, 'line', 'string');
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step return-result

  return PATT.TEST.H.test(line);

  /// #}}} @step return-result
}
/// #}}} @func testHBlock

/// #{{{ @func testHrBlock
/**
 * @private
 * @param {string} line
 * @return {boolean}
 */
function testHrBlock(line) {

  /// #{{{ @step verify-parameters

  if (!arguments.length) {
    throw setNoArgError(new Error, 'line');
  }
  if ( !isString(line) ) {
    throw setTypeError(new TypeError, 'line', 'string');
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step return-result

  return PATT.TEST.HR.test(line);

  /// #}}} @step return-result
}
/// #}}} @func testHrBlock

/// #{{{ @func testOlBlock
/**
 * @private
 * @param {string} line
 * @return {boolean}
 */
function testOlBlock(line) {

  /// #{{{ @step verify-parameters

  if (!arguments.length) {
    throw setNoArgError(new Error, 'line');
  }
  if ( !isString(line) ) {
    throw setTypeError(new TypeError, 'line', 'string');
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step return-result

  return PATT.TEST.OL.test(line);

  /// #}}} @step return-result
}
/// #}}} @func testOlBlock

/// #{{{ @func testPBlock
/**
 * @private
 * @param {string} line
 * @return {boolean}
 */
function testPBlock(line) {

  /// #{{{ @step verify-parameters

  if (!arguments.length) {
    throw setNoArgError(new Error, 'line');
  }
  if ( !isString(line) ) {
    throw setTypeError(new TypeError, 'line', 'string');
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step return-result

  return true;

  /// #}}} @step return-result
}
/// #}}} @func testPBlock

/// #{{{ @func testPreBlock
/**
 * @private
 * @param {string} line
 * @return {boolean}
 */
function testPreBlock(line) {

  /// #{{{ @step verify-parameters

  if (!arguments.length) {
    throw setNoArgError(new Error, 'line');
  }
  if ( !isString(line) ) {
    throw setTypeError(new TypeError, 'line', 'string');
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step return-result

  return PATT.TEST.PRE.test(line);

  /// #}}} @step return-result
}
/// #}}} @func testPreBlock

/// #{{{ @func testQuoteBlock
/**
 * @private
 * @param {string} line
 * @return {boolean}
 */
function testQuoteBlock(line) {

  /// #{{{ @step verify-parameters

  if (!arguments.length) {
    throw setNoArgError(new Error, 'line');
  }
  if ( !isString(line) ) {
    throw setTypeError(new TypeError, 'line', 'string');
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step return-result

  return PATT.TEST.QUOTE.test(line);

  /// #}}} @step return-result
}
/// #}}} @func testQuoteBlock

/// #{{{ @func testUlBlock
/**
 * @private
 * @param {string} line
 * @return {boolean}
 */
function testUlBlock(line) {

  /// #{{{ @step verify-parameters

  if (!arguments.length) {
    throw setNoArgError(new Error, 'line');
  }
  if ( !isString(line) ) {
    throw setTypeError(new TypeError, 'line', 'string');
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step return-result

  return PATT.TEST.UL.test(line);

  /// #}}} @step return-result
}
/// #}}} @func testUlBlock

/// #}}} @group METHODS

/// #{{{ @group EXPORTS
//////////////////////////////////////////////////////////////////////////////
// EXPORTS
//////////////////////////////////////////////////////////////////////////////

module.exports = parseToHtml;

/// #}}} @group EXPORTS

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
