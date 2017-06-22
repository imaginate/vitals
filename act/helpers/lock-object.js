/**
 * ---------------------------------------------------------------------------
 * LOCK-OBJECT HELPER
 * ---------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2017 Adam A Smith <adam@imaginate.life> (https://imaginate.life)
 */

'use strict';

/// #{{{ @group CONSTANTS
//////////////////////////////////////////////////////////////////////////////
// CONSTANTS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @const IS
/**
 * @private
 * @const {!Object<string, !function>}
 */
var IS = require('./is.js');
/// #}}} @const IS

/// #}}} @group CONSTANTS

/// #{{{ @group HELPERS
//////////////////////////////////////////////////////////////////////////////
// HELPERS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func hasOwnProperty
/**
 * @private
 * @param {(!Object|!Function)} src
 * @param {(string|number)} key
 * @return {boolean}
 */
var hasOwnProperty = require('./has-own-property.js');
/// #}}} @func hasOwnProperty

/// #{{{ @func isBoolean
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isBoolean = IS.boolean;
/// #}}} @func isBoolean

/// #{{{ @func isFunction
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isFunction = IS.func;
/// #}}} @func isFunction

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

/// #{{{ @func isUndefined
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isUndefined = IS.undefined;
/// #}}} @func isUndefined

/// #}}} @group HELPERS

/// #{{{ @group METHODS
//////////////////////////////////////////////////////////////////////////////
// METHODS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func cap
/**
 * @private
 * @param {(!Object|!Function)} src
 * @return {(!Object|!Function)}
 */
var cap = (function capPrivateScope() {

  /**
   * @private
   * @const {?function}
   */
  var cap = 'preventExtensions' in Object
    ? Object.preventExtensions
    : null;

  if ( !isFunction(cap) )
    throw new Error('missing JS engine support for `Object.preventExtensions`');

  try {
    cap(function(){});
    return cap;
  }
  catch (e) {
    throw new Error('incomplete JS engine support for `Object.preventExtensions`\n' +
      '    `Object.preventExtensions` failed with `function` as `src`');
  }
})();
/// #}}} @func cap

/// #{{{ @func seal
/**
 * @private
 * @param {(!Object|!Function)} src
 * @return {(!Object|!Function)}
 */
var seal = (function sealPrivateScope() {

  /**
   * @private
   * @const {?function}
   */
  var seal = 'seal' in Object
    ? Object.seal
    : null;

  if ( !isFunction(seal) )
    throw new Error('missing JS engine support for `Object.seal`');

  try {
    seal(function(){});
    return seal;
  }
  catch (e) {
    throw new Error('incomplete JS engine support for `Object.seal`\n' +
      '    `Object.seal` failed with `function` as `src`');
  }
})();
/// #}}} @func seal

/// #{{{ @func lock
/**
 * @private
 * @param {(!Object|!Function)} src
 * @return {(!Object|!Function)}
 */
function lock(src) {
  return cap(src) && seal(src);
}
/// #}}} @func lock

/// #{{{ @func lockDeep
/**
 * @private
 * @param {(!Object|!Function)} src
 * @return {(!Object|!Function)}
 */
function lockDeep(src) {

  /** @type {string} */
  var key;
  /** @type {*} */
  var val;

  for (key in src) {
    if ( hasOwnProperty(src, key) ) {
      val = src[key];
      if ( isObject(val) || isFunction(val) ) {
        lockDeep(val);
      }
    }
  }
  return lock(src);
}
/// #}}} @func lockDeep

/// #}}} @group METHODS

/// #{{{ @group EXPORTS
//////////////////////////////////////////////////////////////////////////////
// EXPORTS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func lockObject
/**
 * @public
 * @param {(?Object|?Function)} src
 * @param {boolean=} deep = `false`
 * @return {(?Object|?Function)}
 */
function lockObject(src, deep) {

  if ( !isUndefined(deep) && !isBoolean(deep) )
    throw new TypeError('invalid `deep` data type\n' +
      '    valid-types: `boolean=`');

  if ( isNull(src) )
    return null;

  if ( !isObject(src) && !isFunction(src) )
    throw new TypeError('invalid `src` data type\n' +
      '    valid-types: `?Object|?Function`');

  return deep
    ? lockDeep(src)
    : lock(src);
}
/// #}}} @func lockObject

module.exports = lockObject;

/// #}}} @group EXPORTS

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
