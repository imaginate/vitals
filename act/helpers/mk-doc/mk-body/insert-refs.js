/**
 * -----------------------------------------------------------------------------
 * ACT TASK HELPER: insertRefs
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

/**
 * @private
 * @const {!RegExp}
 */
var REFS = /\$\{\{\s*[a-zA-Z0-9_\-\$]+\s*\}\}\$/g;

////////////////////////////////////////////////////////////////////////////////
// HELPERS
////////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @param {!Object} src
 * @param {string} prop
 * @return {boolean}
 */
var hasProp = require('../../has-own-property.js');

/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isObject = IS.object;

/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isString = IS.string;

/**
 * @private
 * @param {string} ref
 * @return {string}
 */
var trimRef = require('./trim-ref.js');

////////////////////////////////////////////////////////////////////////////////
// EXPORTS
////////////////////////////////////////////////////////////////////////////////

/**
 * @public
 * @param {string} content
 * @param {!Object<string, string>} refs
 * @return {string}
 */
module.exports = function insertRefs(content, refs) {

  /**
   * @private
   * @param {string} ref
   * @return {string}
   */
  function insertRef(ref) {

    /** @type {string} */
    var id;

    id = trimRef(ref);

    if ( !hasProp(refs, id) )
      throw new TypeError('undefined reference: `' + id + '`');

    return refs[id];
  }

  if ( !isString(content) )
    throw new TypeError('invalid `content` type (must be a string)');
  if ( !isObject(refs) )
    throw new TypeError('invalid `refs` type (must be an object)');

  return content.replace(REFS, insertRef);
};
