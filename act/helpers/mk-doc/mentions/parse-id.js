/**
 * -----------------------------------------------------------------------------
 * ACT TASK HELPER: parseID
 * -----------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2017 Adam A Smith <adam@imaginate.life> (https://imaginate.life)
 *
 * @see [JSDoc3](http://usejsdoc.org)
 * @see [Closure Compiler JSDoc](https://developers.google.com/closure/compiler/docs/js-for-compiler)
 */

'use strict';

////////////////////////////////////////////////////////////////////////////////
// CONSTANTS
////////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @const {!Object<string, function>}
 */
var IS = require('../../is.js');

////////////////////////////////////////////////////////////////////////////////
// HELPERS
////////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @param {string} id
 * @return {string}
 */
var getMethod = require('./get-method.js');

/**
 * @private
 * @param {string} id
 * @return {string}
 */
var getParam = require('./get-param.js');

/**
 * @private
 * @param {string} id
 * @return {boolean}
 */
var hasParam = require('./has-param.js');

/**
 * @private
 * @param {string} id
 * @return {boolean}
 */
var hasParams = require('./has-params.js');

/**
 * @private
 * @param {string} id
 * @return {boolean}
 */
var hasPart = require('./has-part.js');

/**
 * @private
 * @param {string} ref
 * @return {boolean}
 */
var isMethod = require('./is-method.js');

/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isString = IS.string;

/**
 * @private
 * @param {string} id
 * @return {string}
 */
var trimMethod = require('./trim-method.js');

////////////////////////////////////////////////////////////////////////////////
// EXPORTS
////////////////////////////////////////////////////////////////////////////////

/**
 * @public
 * @param {string} ref
 * @param {string} id
 * @return {string}
 */
module.exports = function parseID(ref, id) {

  /** @type {string} */
  var method;

  if ( !isString(ref) )
    throw new TypeError('invalid `ref` type (must be a string)');
  if ( !isString(id) )
    throw new TypeError('invalid `id` type (must be a string)');

  if ( !id || (id === 'top') )
    return '';

  if ( !isMethod(ref) )
    return id.replace(/-/g, ' ');

  method = getMethod(id);

  if ( !hasPart(id) )
    return method;

  id = trimMethod(id);
  return hasParams(id)
    ? hasParam(id)
      ? method + ' parameter ' + getParam(id)
      : method + ' parameters'
    : (id === 'returns')
      ? method + ' return value'
      : method + ' ' + id.replace(/-/g, ' ');
};
