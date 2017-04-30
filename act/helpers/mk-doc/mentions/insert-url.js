/**
 * -----------------------------------------------------------------------------
 * ACT TASK HELPER: insertMentionsUrl
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
 * @const {!RegExp}
 */
var AT = /@\{\{\s*([a-zA-Z0-9_-$#]+)\s*\}\}@/g;

/**
 * @private
 * @const {!Object<string, string>}
 */
var DATA = require('./data.json').URL;

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
 * @param {string} ref
 * @return {boolean}
 */
var hasID = require('./has-id.js');

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
var isString = IS.string;

/**
 * @private
 * @param {string} ref
 * @return {boolean}
 */
var isValid = require('./is-valid.js');

/**
 * @private
 * @param {string} ref
 * @return {string}
 */
var parseID = require('./parse-url-id.js');

/**
 * @private
 * @param {string} ref
 * @return {string}
 */
var trimID = require('./trim-id.js');

/**
 * @private
 * @param {string} ref
 * @return {string}
 */
var trimRef = require('./trim-ref.js');

////////////////////////////////////////////////////////////////////////////////
// METHODS
////////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @param {string} tag
 * @param {string} ref
 * @return {string}
 */
function insertUrl(tag, ref) {

  /** @type {string} */
  var url;
  /** @type {string} */
  var id;

  if ( hasID(ref) ) {
    id = trimRef(ref);
    ref = trimID(ref);

    if ( !isValid(ref) || !isValid(id) )
      throw new Error('invalid reference id `' + ref + '#' + id + '`');

    id = parseID(id);
  }
  else if ( !isValid(ref) )
    throw new Error('invalid reference id `' + ref + '`');

  if ( !hasProp(DATA, ref) )
    throw new Error('undefined reference id `' + ref + '`');

  url = DATA[ref];
  if (!!id)
    url += parseNameID(id);

  return url;
}

////////////////////////////////////////////////////////////////////////////////
// EXPORTS
////////////////////////////////////////////////////////////////////////////////

/**
 * @public
 * @param {string} doc
 * @return {string}
 */
module.exports = function insertMentionsUrl(doc) {

  if ( !isString(doc) )
    throw new TypeError('invalid `doc` type (must be a string)');

  return doc.replace(AT, insertUrl);
};
