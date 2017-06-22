/**
 * ---------------------------------------------------------------------------
 * MERGE-OBJECT HELPER
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

/// #{{{ @func cloneObject
/**
 * @private
 * @param {(?Object|?Function)} src
 * @return {!Object}
 */
var cloneObject = require('./clone-object.js');
/// #}}} @func cloneObject

/// #{{{ @func hasOwnProperty
/**
 * @private
 * @param {(!Object|!Function)} src
 * @param {(string|number)} key
 * @return {boolean}
 */
var hasOwnProperty = require('./has-own-property.js');
/// #}}} @func hasOwnProperty

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

/// #}}} @group HELPERS

/// #{{{ @group EXPORTS
//////////////////////////////////////////////////////////////////////////////
// EXPORTS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func mergeObject
/**
 * @public
 * @param {...(?Object|?Function)} src
 * @return {!Object}
 */
function mergeObject(src) {

  /** @type {!Object} */
  var result;
  /** @type {string} */
  var key;
  /** @type {number} */
  var len;
  /** @type {number} */
  var i;

  len = arguments.length;

  if (len === 0)
    throw new Error('missing a `src` parameter');
  if ( !isNull(src) && !isObject(src) && !isFunction(src) )
    throw new TypeError('invalid `src` data type\n' +
      '    valid-types: `?Object|?Function`');

  result = cloneObject(src);

  i = 0;
  while (++i < len) {
    src = arguments[i];

    if ( isNull(src) )
      continue;

    if ( !isObject(src) && !isFunction(src) )
      throw new TypeError('invalid `src` data type\n' +
        '    valid-types: `?Object|?Function`');

    for (key in src) {
      if ( hasOwnProperty(src, key) ) {
        result[key] = src[key];
      }
    }
  }
  return result;
}
/// #}}} @func mergeObject

module.exports = mergeObject;

/// #}}} @group EXPORTS

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
