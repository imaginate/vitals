/**
 * ---------------------------------------------------------------------------
 * TYPE-ID HELPERS
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

/// #{{{ @func setElemIdError
/**
 * @private
 * @param {!RangeError} err
 * @param {string} param
 * @param {string} id
 * @return {!RangeError}
 */
function setElemIdError(err, param, id) {

  /// #{{{ @step declare-variables

  /** @type {string} */
  var msg;

  /// #}}} @step declare-variables

  /// #{{{ @step verify-parameters

  switch (arguments.length) {
    case 0:
      throw setNoArgError(new Error, 'err');
    case 1:
      throw setNoArgError(new Error, 'param');
    case 2:
      throw setNoArgError(new Error, 'id');
  }

  if ( !isError(err) ) {
    throw setTypeError(new TypeError, 'err', '!RangeError');
  }
  if ( !isString(param) ) {
    throw setTypeError(new TypeError, 'param', 'string');
  }
  if ( !isString(id) ) {
    throw setTypeError(new TypeError, 'id', 'string');
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step make-error-message

  msg = 'invalid element `id` for `new TypeId`\n'
    + '    invalid-id: `"' + id + '"`\n'
    + '    valid-ids:\n'
    + '        `"' + getKeys(IDS).join('"`\n        `"') + '"`';

  /// #}}} @step make-error-message

  /// #{{{ @step set-error-name-property

  if (err.name !== 'RangeError') {
    err.name = 'RangeError';
  }

  /// #}}} @step set-error-name-property

  /// #{{{ @step return-error

  return setError(err, msg);

  /// #}}} @step return-error
}
/// #}}} @func setElemIdError

/// #{{{ @func setEmptyError
/**
 * @private
 * @param {!Error} err
 * @param {string} param
 * @return {!Error}
 */
var setEmptyError = setError.empty;
/// #}}} @func setEmptyError

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

/// #{{{ @func hasOwnEnumProperty
/**
 * @private
 * @param {(!Object|!Function)} src
 * @param {(string|number)} key
 * @return {boolean}
 */
var hasOwnEnumProperty = loadTaskHelper('has-own-enum-property');
/// #}}} @func hasOwnEnumProperty

/// #}}} @group HAS

/// #{{{ @group IS

/// #{{{ @func isError
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isError = IS.error;
/// #}}} @func isError

/// #{{{ @func isInstanceOf
/**
 * @private
 * @param {*} inst
 * @param {!Function} constructor
 * @return {boolean}
 */
var isInstanceOf = IS.instanceOf;
/// #}}} @func isInstanceOf

/// #{{{ @func isString
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isString = IS.string;
/// #}}} @func isString

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

/// #{{{ @func getKeys
/**
 * @private
 * @param {(!Object|!Function)} src
 * @return {!Array<string>}
 */
var getKeys = loadTaskHelper('get-keys');
/// #}}} @func getKeys

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

/// #}}} @group OBJECT

/// #}}} @group HELPERS

/// #{{{ @group IDS
//////////////////////////////////////////////////////////////////////////////
// IDS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @const IDS
/**
 * @private
 * @const {!Object<string, string>}
 * @dict
 */
var IDS = freezeObject({
  'h': 'BLOCK',
  'hr': 'BLOCK',
  'html': 'ROOT',
  'li': 'BLOCK',
  'ol': 'BLOCK',
  'p': 'BLOCK',
  'pre': 'BLOCK',
  'quote': 'BLOCK',
  'ul': 'BLOCK'
});
/// #}}} @const IDS

/// #}}} @group IDS

/// #{{{ @group CLASS
//////////////////////////////////////////////////////////////////////////////
// CLASS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func TypeId
/**
 * @public
 * @param {string} id
 * @constructor
 * @struct
 */
function TypeId(id) {

  /// #{{{ @step verify-new-keyword

  if ( !isTypeId(this) ) {
    throw setNewError(new SyntaxError, 'TypeId');
  }

  /// #}}} @step verify-new-keyword

  /// #{{{ @step verify-parameters

  if (!arguments.length) {
    throw setNoArgError(new Error, 'id');
  }
  if ( !isString(id) ) {
    throw setTypeError(new TypeError, 'id', 'string');
  }
  if (!id) {
    throw setEmptyError(new Error, 'id');
  }
  if ( !hasOwnEnumProperty(IDS, id) ) {
    throw setElemIdError(new RangeError, 'id', id);
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step set-constants

  /// #{{{ @const ID
  /**
   * @private
   * @const {string}
   */
  var ID = id;
  /// #}}} @const ID

  /// #{{{ @const TYPE
  /**
   * @private
   * @const {string}
   */
  var TYPE = IDS[ID];
  /// #}}} @const TYPE

  /// #}}} @step set-constants

  /// #{{{ @step set-members

  /// #{{{ @member ID
  /**
   * @const {string}
   */
  setConstantProperty(this, 'ID', ID);
  /// #}}} @member ID

  /// #{{{ @member TYPE
  /**
   * @const {string}
   */
  setConstantProperty(this, 'TYPE', TYPE);
  /// #}}} @member TYPE

  /// #}}} @step set-members

  /// #{{{ @step freeze-instance

  freezeObject(this);

  /// #}}} @step freeze-instance
}
/// #}}} @func TypeId

/// #{{{ @func isTypeId
/**
 * @public
 * @param {*} val
 * @return {boolean}
 */
function isTypeId(val) {

  /// #{{{ @step verify-parameters

  if (!arguments.length) {
    throw setNoArgError(new Error, 'val');
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step return-result

  return isInstanceOf(val, TypeId);

  /// #}}} @step return-result
}
/// #}}} @func isTypeId

/// #{{{ @func newTypeId
/**
 * @public
 * @param {string} id
 * @return {!TypeId}
 */
function newTypeId(id) {

  /// #{{{ @step verify-parameters

  if (!arguments.length) {
    throw setNoArgError(new Error, 'id');
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step return-new-type-id-instance

  return new TypeId(id);

  /// #}}} @step return-new-type-id-instance
}
/// #}}} @func newTypeId

/// #{{{ @step setup-type-id-constructor

TypeId.is = isTypeId;
TypeId.TypeId = TypeId;
TypeId.create = newTypeId;
TypeId.isTypeId = isTypeId;
TypeId.newTypeId = newTypeId;
TypeId.construct = newTypeId;
TypeId.prototype = createObject(null);

freezeObject(TypeId);

/// #}}} @step setup-type-id-constructor

/// #{{{ @step setup-type-id-prototype

setConstantProperty(TypeId.prototype, 'constructor', TypeId, false);

freezeObject(TypeId.prototype);

/// #}}} @step setup-type-id-prototype

/// #}}} @group CLASS

/// #{{{ @group EXPORTS
//////////////////////////////////////////////////////////////////////////////
// EXPORTS
//////////////////////////////////////////////////////////////////////////////

module.exports = TypeId;

/// #}}} @group EXPORTS

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
