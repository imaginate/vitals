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

  /// #{{{ @const LINES
  /**
   * @private
   * @const {!Array<string>}
   */
  var LINES = freezeObject(lines);
  /// #}}} @const LINES

  /// #{{{ @const OPTS
  /**
   * @private
   * @const {!Object}
   */
  var OPTS = freezeObject(opts);
  /// #}}} @const OPTS

  /// #}}} @step set-constants

  /// #{{{ @step set-members

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

  /// #{{{ @member result
  /**
   * @type {string}
   */
  setProperty(this, 'result', '');
  /// #}}} @member result

  /// #}}} @step set-members

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

  return html.parse();

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
