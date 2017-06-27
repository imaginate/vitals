/**
 * ---------------------------------------------------------------------------
 * LINE CLASS
 * ---------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life> (https://imaginate.life)
 */

'use strict';

/// #{{{ @group LOADERS
//////////////////////////////////////////////////////////////////////////////
// LOADERS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func loadHelper
/**
 * @private
 * @param {string} name
 * @return {(!Object|!Function)}
 */
var loadHelper = require('./load-helper.js');
/// #}}} @func loadHelper

/// #}}} @group LOADERS

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

/// #{{{ @func isInstanceOf
/**
 * @private
 * @param {*} inst
 * @param {!Function} constructor
 * @return {boolean}
 */
var isInstanceOf = IS.instanceOf;
/// #}}} @func isInstanceOf

/// #{{{ @func isLocNode
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isLocNode = loadHelper('is-location-node');
/// #}}} @func isLocNode

/// #{{{ @func isString
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isString = IS.string;
/// #}}} @func isString

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
 * @param {!Loc} before
 * @param {?Loc=} after
 * @constructor
 * @struct
 */
function Line(text, before, after) {

  /// #{{{ @step verify-new-keyword

  if ( !isInstanceOf(this, Line) )
    throw setNewError(new SyntaxError, 'Line');

  /// #}}} @step verify-new-keyword

  /// #{{{ @step verify-parameters

  if ( !isString(text) )
    throw setTypeError(new TypeError, 'text', 'string');
  if ( !isLocNode(before) )
    throw setTypeError(new TypeError, 'before', '!Loc');
  if ( !isNull(after) && !isUndefined(after) && !isLocNode(after) )
    throw setTypeError(new TypeError, 'after', '?Loc=');

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
   * @const {!Loc}
   */
  defineProperty(this, 'before', {
    'value': before,
    'writable': false,
    'enumerable': true,
    'configurable': false
  });
  /// #}}} @member before

  /// #{{{ @member after
  /**
   * @public
   * @const {?Loc}
   */
  defineProperty(this, 'after', {
    'value': after || null,
    'writable': false,
    'enumerable': true,
    'configurable': false
  });
  /// #}}} @member after

  /// #}}} @step set-members

  /// #{{{ @step freeze-instance

  freezeObject(this);

  /// #}}} @step freeze-instance
}
/// #}}} @func Line

/// #}}} @group CONSTRUCTORS

/// #{{{ @group PROTOTYPE
//////////////////////////////////////////////////////////////////////////////
// PROTOTYPE
//////////////////////////////////////////////////////////////////////////////

Line.prototype = createObject(null);
Line.prototype.constructor = Line;

/// #}}} @group PROTOTYPE

/// #{{{ @group EXPORTS
//////////////////////////////////////////////////////////////////////////////
// EXPORTS
//////////////////////////////////////////////////////////////////////////////

module.exports = Line;

/// #}}} @group EXPORTS

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
