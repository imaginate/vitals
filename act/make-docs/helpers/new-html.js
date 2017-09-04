/**
 * ---------------------------------------------------------------------------
 * NEW-HTML HELPER
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

/// #{{{ @const HTML_TYPE
/**
 * @private
 * @const {!TypeId}
 */
var HTML_TYPE = require('./type-id-class.js').create('html');
/// #}}} @const HTML_TYPE

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

/// #{{{ @func setWholeError
/**
 * @private
 * @param {!RangeError} err
 * @param {string} param
 * @param {number} value
 * @return {!RangeError}
 */
var setWholeError = setError.whole;
/// #}}} @func setWholeError

/// #}}} @group ERROR

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

/// #{{{ @func createObject
/**
 * @private
 * @param {?Object} proto
 * @return {!Object}
 */
var createObject = loadTaskHelper('create-object');
/// #}}} @func createObject

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

/// #{{{ @func newIsEmptyLine
/**
 * @private
 * @param {number=} count = `2`
 * @return {!function(string, number=): boolean}
 */
var newIsEmptyLine = require('./is-empty-line.js').create;
/// #}}} @func newIsEmptyLine

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

/// #{{{ @group CLASS
//////////////////////////////////////////////////////////////////////////////
// CLASS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func Html
/**
 * @private
 * @param {!Array<string>} lines
 * @param {!Object} opts
 * @param {number} opts.indent
 * @param {number} opts.depth
 * @param {boolean} opts.github
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

  /// #{{{ @const TYPE
  /**
   * @private
   * @const {!TypeId}
   */
  var TYPE = HTML_TYPE;
  /// #}}} @const TYPE

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
   * @const {!Array<!Block>}
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

  /// #{{{ @const isEmptyLine
  /**
   * @private
   * @const {!function(string, number=): boolean}
   */
  var isEmptyLine = newIsEmptyLine(INDENT);
  /// #}}} @const isEmptyLine

  /// #{{{ @const isIndented
  /**
   * @private
   * @const {!function(string, number=): boolean}
   */
  var isIndented = isEmptyLine.isIndented;
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
   *   is changed from `null` to a `string`.
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

  /// #{{{ @member TYPE
  /**
   * @const {!TypeId}
   */
  setConstantProperty(this, 'TYPE', TYPE);
  /// #}}} @member TYPE

  /// #{{{ @member isEmptyLine
  /**
   * @private
   * @param {string} line
   * @param {number=} depth = `0`
   * @return {boolean}
   */
  setConstantProperty(this, 'isEmptyLine', isEmptyLine);
  /// #}}} @member isEmptyLine

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

  parseHtml(this);

  /// #}}} @step parse-lines

  /// #{{{ @step freeze-instance

  freezeObject(this);

  /// #}}} @step freeze-instance
}
/// #}}} @func Html

/// #{{{ @func isHtml
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isHtml = require('./is-html.js');
/// #}}} @func isHtml

/// #{{{ @func newHtml
/**
 * @public
 * @param {!Array<string>} lines
 * @param {!Object} opts
 * @param {number} opts.indent
 * @param {number} opts.depth
 * @param {boolean} opts.github
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

/// #{{{ @func parseHtml
/**
 * @private
 * @param {!Html} ROOT
 * @return {!Html}
 */
var parseHtml = require('./parse-html.js');
/// #}}} @func parseHtml

/// #{{{ @step setup-html-constructor

Html.is = isHtml;
Html.Html = Html;
Html.isHtml = isHtml;
Html.create = newHtml;
Html.newHtml = newHtml;
Html.construct = newHtml;
Html.prototype = createObject(null);

freezeObject(Html);

/// #}}} @step setup-html-constructor

/// #{{{ @step setup-html-prototype

setConstantProperty(Html.prototype, 'constructor', Html, false);

freezeObject(Html.prototype);

/// #}}} @step setup-html-prototype

/// #}}} @group CLASS

/// #{{{ @group EXPORTS
//////////////////////////////////////////////////////////////////////////////
// EXPORTS
//////////////////////////////////////////////////////////////////////////////

module.exports = newHtml;

/// #}}} @group EXPORTS

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
