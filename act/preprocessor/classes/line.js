/**
 * ---------------------------------------------------------------------------
 * LINE CLASS
 * ---------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life> (https://imaginate.life)
 */

'use strict';

/// #{{{ @func loadHelper
/**
 * @private
 * @param {string} name
 * @return {(!Object|!Function)}
 */
var loadHelper = require('./load-helper.js');
/// #}}} @func loadHelper

/// #{{{ @group CONSTANTS
//////////////////////////////////////////////////////////////////////////////
// CONSTANTS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @const LINE_TYPE_ID
/**
 * @private
 * @const {!Object}
 */
var LINE_TYPE_ID = loadHelper('type-ids').LINE;
/// #}}} @const LINE_TYPE_ID

/// #{{{ @const IS
/**
 * @private
 * @const {!Object<string, !function>}
 */
var IS = loadHelper('is');
/// #}}} @const IS

/// #}}} @group CONSTANTS

/// #{{{ @group HELPERS
//////////////////////////////////////////////////////////////////////////////
// HELPERS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @group STATE

/// #{{{ @func capObject
/**
 * @private
 * @param {(?Object|?Function)} src
 * @param {boolean=} deep = `false`
 * @return {(?Object|?Function)}
 */
var capObject = loadHelper('cap-object');
/// #}}} @func capObject

/// #{{{ @func createObject
/**
 * @private
 * @param {?Object} proto
 * @return {!Object}
 */
var createObject = loadHelper('create-object');
/// #}}} @func createObject

/// #{{{ @func defineProperty
/**
 * @private
 * @param {!Object} src
 * @param {string} key
 * @param {!Object} descriptor
 * @return {!Object}
 */
var defineProperty = loadHelper('define-property');
/// #}}} @func defineProperty

/// #{{{ @func freezeObject
/**
 * @private
 * @param {(?Object|?Function)} src
 * @param {boolean=} deep = `false`
 * @return {(?Object|?Function)}
 */
var freezeObject = loadHelper('freeze-object');
/// #}}} @func freezeObject

/// #{{{ @func lockObject
/**
 * @private
 * @param {(?Object|?Function)} src
 * @param {boolean=} deep = `false`
 * @return {(?Object|?Function)}
 */
var lockObject = loadHelper('lock-object');
/// #}}} @func lockObject

/// #{{{ @func sealObject
/**
 * @private
 * @param {(?Object|?Function)} src
 * @param {boolean=} deep = `false`
 * @return {(?Object|?Function)}
 */
var sealObject = loadHelper('seal-object');
/// #}}} @func sealObject

/// #}}} @group STATE

/// #{{{ @group IS

/// #{{{ @func isFileNode
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isFileNode = loadHelper('is-file-node');
/// #}}} @func isFileNode

/// #{{{ @func isInstanceOf
/**
 * @private
 * @param {*} inst
 * @param {!Function} constructor
 * @return {boolean}
 */
var isInstanceOf = IS.instanceOf;
/// #}}} @func isInstanceOf

/// #{{{ @func isNumber
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isNumber = IS.number;
/// #}}} @func isNumber

/// #{{{ @func isString
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isString = IS.string;
/// #}}} @func isString

/// #{{{ @func isWholeNumber
/**
 * @private
 * @param {number} val
 * @return {boolean}
 */
var isWholeNumber = IS.wholeNumber;
/// #}}} @func isWholeNumber

/// #}}} @group IS

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

/// #}}} @group HELPERS

/// #{{{ @group CONSTRUCTORS
//////////////////////////////////////////////////////////////////////////////
// CONSTRUCTORS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func Line
/**
 * @public
 * @param {string} text
 * @param {number} linenum
 * @param {!File} file
 * @constructor
 * @struct
 */
function Line(text, linenum, file) {

  /// #{{{ @step verify-new-keyword

  if ( !isInstanceOf(this, Line) )
    throw setNewError(new SyntaxError, 'Line');

  /// #}}} @step verify-new-keyword

  /// #{{{ @step verify-parameters

  if ( !isString(text) )
    throw setTypeError(new TypeError, 'text', 'string');
  if ( !isNumber(linenum) )
    throw setTypeError(new TypeError, 'linenum', 'number');
  if ( !isWholeNumber(linenum) || linenum < 1 )
    throw setIndexError(new RangeError, 'linenum', linenum, 1);
  if ( !isFileNode(file) )
    throw setTypeError(new TypeError, 'file', '!File');

  /// #}}} @step verify-parameters

  /// #{{{ @step set-members

  /// #{{{ @member type
  /**
   * @public
   * @const {!Object}
   */
  defineProperty(this, 'type', {
    'value': LINE_TYPE_ID,
    'writable': false,
    'enumerable': true,
    'configurable': false
  });
  /// #}}} @member type

  /// #{{{ @member text
  /**
   * @public
   * @const {string}
   */
  defineProperty(this, 'text', {
    'value': text,
    'writable': false,
    'enumerable': true,
    'configurable': false
  });
  /// #}}} @member text

  /// #{{{ @member before
  /**
   * @public
   * @const {!Object}
   */
  defineProperty(this, 'before', {
    'value': {},
    'writable': false,
    'enumerable': true,
    'configurable': false
  });
  /// #}}} @member before

  /// #{{{ @member before.file
  /**
   * @public
   * @const {!File}
   */
  defineProperty(this.before, 'file', {
    'value': file,
    'writable': false,
    'enumerable': true,
    'configurable': false
  });
  /// #}}} @member before.file

  /// #{{{ @member before.linenum
  /**
   * @public
   * @const {number}
   */
  defineProperty(this.before, 'linenum', {
    'value': linenum,
    'writable': false,
    'enumerable': true,
    'configurable': false
  });
  /// #}}} @member before.linenum

  /// #{{{ @member after
  /**
   * @public
   * @const {!Object}
   */
  defineProperty(this, 'after', {
    'value': {},
    'writable': false,
    'enumerable': true,
    'configurable': false
  });
  /// #}}} @member after

  /// #{{{ @member after.file
  /**
   * @public
   * @type {?File}
   */
  defineProperty(this.after, 'file', {
    'value': null,
    'writable': true,
    'enumerable': true,
    'configurable': true
  });
  /// #}}} @member after.file

  /// #{{{ @member after.linenum
  /**
   * @public
   * @type {number}
   */
  defineProperty(this.after, 'linenum', {
    'value': 0,
    'writable': true,
    'enumerable': true,
    'configurable': true
  });
  /// #}}} @member after.linenum

  /// #}}} @step set-members

  /// #{{{ @step lock-members

  freezeObject(this.before);
  sealObject(this.after);
  capObject(this.after);

  /// #}}} @step lock-members

  /// #{{{ @step lock-instance

  capObject(this);
  sealObject(this);

  /// #}}} @step lock-instance
}
/// #}}} @func Line

/// #}}} @group CONSTRUCTORS

/// #{{{ @group PROTOTYPE
//////////////////////////////////////////////////////////////////////////////
// PROTOTYPE
//////////////////////////////////////////////////////////////////////////////

Line.prototype = createObject(null);
Line.prototype.constructor = Line;

/// #{{{ @func Line.prototype.setAfter
/**
 * @param {number} linenum
 * @param {!File} file
 * @return {!Line}
 */
Line.prototype.setAfter = function setAfter(linenum, file) {

  /// #{{{ @step verify-parameters

  if ( !isNumber(linenum) )
    throw setTypeError(new TypeError, 'linenum', 'number');
  if ( !isWholeNumber(linenum) || linenum < 1 )
    throw setIndexError(new RangeError, 'linenum', linenum, 1);
  if ( !isFileNode(file) )
    throw setTypeError(new TypeError, 'file', '!File');

  /// #}}} @step verify-parameters

  /// #{{{ @step set-members

  /// #{{{ @member after.file
  /**
   * @public
   * @const {!File}
   */
  defineProperty(this.after, 'file', {
    'value': file,
    'writable': false,
    'enumerable': true,
    'configurable': false
  });
  /// #}}} @member after.file

  /// #{{{ @member after.linenum
  /**
   * @public
   * @const {number}
   */
  defineProperty(this.after, 'linenum', {
    'value': linenum,
    'writable': false,
    'enumerable': true,
    'configurable': false
  });
  /// #}}} @member after.linenum

  /// #}}} @step set-members

  /// #{{{ @step freeze-members

  freezeObject(this.after);

  /// #}}} @step freeze-members

  /// #{{{ @step freeze-instance

  freezeObject(this);

  /// #}}} @step freeze-instance

  /// #{{{ @step return-instance

  return this;

  /// #}}} @step return-instance
};
/// #}}} @func Line.prototype.setAfter

/// #}}} @group PROTOTYPE

/// #{{{ @group EXPORTS
//////////////////////////////////////////////////////////////////////////////
// EXPORTS
//////////////////////////////////////////////////////////////////////////////

module.exports = Line;

/// #}}} @group EXPORTS

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
