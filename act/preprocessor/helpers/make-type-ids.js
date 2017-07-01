/**
 * ---------------------------------------------------------------------------
 * MAKE-TYPE-IDS HELPER
 * ---------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life> (https://imaginate.life)
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

/// #{{{ @const CLASSES
/**
 * @private
 * @enum {!Object}
 * @const
 * @dict
 */
var CLASSES = require('./get-class-config.js')();
/// #}}} @const CLASSES

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

/// #{{{ @group ERROR

/// #{{{ @func setError
/**
 * @private
 * @param {(!Error|!RangeError|!ReferenceError|!SyntaxError|!TypeError)} err
 * @param {string} msg
 * @return {(!Error|!RangeError|!ReferenceError|!SyntaxError|!TypeError)}
 */
var setError = require('./set-error-base.js');
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

/// #{{{ @group OBJECT

/// #{{{ @func capObject
/**
 * @private
 * @param {(?Object|?Function)} src
 * @param {boolean=} deep = `false`
 * @return {(?Object|?Function)}
 */
var capObject = loadTaskHelper('cap-object');
/// #}}} @func capObject

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

/// #{{{ @func setupOffProperty
/**
 * @private
 * @param {!Object} src
 * @param {string} key
 * @param {*} value
 * @param {boolean=} visible = `false`
 * @return {!Object}
 */
var setupOffProperty = require('./setup-off-property.js');
/// #}}} @func setupOffProperty

/// #}}} @group OBJECT

/// #}}} @group HELPERS

/// #{{{ @group CONSTRUCTORS
//////////////////////////////////////////////////////////////////////////////
// CONSTRUCTORS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func TypeId
/**
 * @private
 * @param {string} classname
 * @param {string} typename
 * @constructor
 * @struct
 */
function TypeId(classname, typename) {

  /// #{{{ @step verify-new-keyword

  if ( !isInstanceOf(this, TypeId) )
    throw setNewError(new SyntaxError, 'TypeId');

  /// #}}} @step verify-new-keyword

  /// #{{{ @step verify-parameters

  switch (arguments.length) {
    case 0:
      throw setNoArgError(new Error, 'classname');
    case 1:
      throw setNoArgError(new Error, 'typename');
  }

  if ( !isString(classname) )
    throw setTypeError(new TypeError, 'classname', 'string');
  if ( !isString(typename) )
    throw setTypeError(new TypeError, 'typename', 'string');

  if (!classname)
    throw setEmptyError(new Error, 'classname');
  if (!typename)
    throw setEmptyError(new Error, 'typename');

  /// #}}} @step verify-parameters

  /// #{{{ @step set-members

  /// #{{{ @member CLASSNAME
  /**
   * @const {string}
   */
  setupOffProperty(this, 'CLASSNAME', classname, true);
  /// #}}} @member CLASSNAME

  /// #{{{ @member TYPENAME
  /**
   * @const {string}
   */
  setupOffProperty(this, 'TYPENAME', typename, true);
  /// #}}} @member TYPENAME

  /// #}}} @step set-members

  /// #{{{ @step freeze-instance

  freezeObject(this);

  /// #}}} @step freeze-instance
}
/// #}}} @func TypeId

TypeId.prototype = createObject(null);
setupOffProperty(TypeId.prototype, 'constructor', TypeId);

/// #}}} @group CONSTRUCTORS

/// #{{{ @group METHODS
//////////////////////////////////////////////////////////////////////////////
// METHODS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func makeTypeIds
/**
 * @public
 * @return {!Object<string, !TypeId>}
 */
function makeTypeIds() {

  /// #{{{ @step declare-variables

  /** @type {!Object} */
  var config;
  /** @type {string} */
  var name;
  /** @type {!Object<string, !TypeId>} */
  var ids;
  /** @type {!TypeId} */
  var id;

  /// #}}} @step declare-variables

  /// #{{{ @step make-empty-ids-object

  ids = createObject(null);

  /// #}}} @step make-empty-ids-object

  /// #{{{ @step make-each-type-id

  for (name in CLASSES) {
    if ( hasOwnProperty(CLASSES, name) ) {
      config = CLASSES[name];
      id = new TypeId(config.classname, config.typename);
      setupOffProperty(ids, name, id, true);
    }
  }

  /// #}}} @step make-each-type-id

  /// #{{{ @step freeze-ids-object

  freezeObject(ids);

  /// #}}} @step freeze-ids-object

  /// #{{{ @step return-ids-object

  return ids;

  /// #}}} @step return-ids-object
}
/// #}}} @func makeTypeIds

/// #}}} @group METHODS

/// #{{{ @group EXPORTS
//////////////////////////////////////////////////////////////////////////////
// EXPORTS
//////////////////////////////////////////////////////////////////////////////

module.exports = makeTypeIds;

/// #}}} @group EXPORTS

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
