/**
 * ---------------------------------------------------------------------------
 * GET-TYPE-ID HELPER
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

/// #{{{ @const CACHE_KEY
/**
 * @private
 * @const {string}
 */
var CACHE_KEY = '__VITALS_JSPP_CLASS_CACHE';
/// #}}} @const CACHE_KEY

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

/// #{{{ @group IS

/// #{{{ @func isCacheLoaded
/**
 * @private
 * @param {string} key
 * @param {?Object<string, *>=} state = `null`
 *   This parameter allows you to define key names and values that must be
 *   defined within the cache `object`, `global[key].__LOADED`.
 * @return {boolean}
 */
var isCacheLoaded = require('./is-cache-loaded.js');
/// #}}} @func isCacheLoaded

/// #{{{ @func isEmpty
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isEmpty = IS.empty;
/// #}}} @func isEmpty

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

/// #}}} @group IS

/// #}}} @group HELPERS

/// #{{{ @group CACHE
//////////////////////////////////////////////////////////////////////////////
// CACHE
//////////////////////////////////////////////////////////////////////////////

if ( !isCacheLoaded(CACHE_KEY) )
  throw setError(new Error,
    'required jspp `getTypeId` before `setupClasses` started');

/// #{{{ @const CACHE
/**
 * @public
 * @const {!Object<string, !Function>}
 * @dict
 */
var CACHE = global[CACHE_KEY];
/// #}}} @const CACHE

/// #{{{ @const IDS
/**
 * @public
 * @enum {!TypeId}
 * @const
 * @dict
 */
var IDS = CACHE.__TYPE_IDS;
/// #}}} @const IDS

if ( !isObject(IDS) || isEmpty(IDS) )
  throw setError(new Error,
    'required jspp `getTypeId` before `makeTypeIds` completed');

/// #}}} @group CACHE

/// #{{{ @group METHODS
//////////////////////////////////////////////////////////////////////////////
// METHODS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func getTypeId
/**
 * @public
 * @param {string} classname
 * @return {!TypeId}
 */
function getTypeId(classname) {

  if (!arguments.length)
    throw setNoArgError(new Error, 'classname');
  if ( !isString(classname) )
    throw setTypeError(new TypeError, 'classname', 'string');
  if (!classname)
    throw setEmptyError(new Error, 'classname');
  if ( !(classname in IDS) )
    throw setError(new RangeError,
      'invalid `classname` requested\n' +
      '    requested-classname: `' + classname + '`\n' +
      '    valid-classnames:\n' +
      '        `' + getKeys(IDS).join('`\n        ') + '`');

  return IDS[classname];
}
/// #}}} @func getTypeId

/// #}}} @group METHODS

/// #{{{ @group EXPORTS
//////////////////////////////////////////////////////////////////////////////
// EXPORTS
//////////////////////////////////////////////////////////////////////////////

module.exports = getTypeId;

/// #}}} @group EXPORTS

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
