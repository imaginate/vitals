/**
 * -----------------------------------------------------------------------------
 * ACT TASK HELPER: getRefs
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
var ID = /^\[[^[]]+(?=\]:)/;

/**
 * @private
 * @const {!RegExp}
 */
var ID_TRIM = /^\[[^[]]+\]:[ \t]*/;

/**
 * @private
 * @const {!Object<string, function>}
 */
var IS = require('../../is.js');

/**
 * @private
 * @const {!RegExp}
 */
var REFS = /[\r\n][ \t]*\*[ \t]+@ref[^\r\n]+/g;

/**
 * @private
 * @const {!RegExp}
 */
var TAG = /^[\r\n][ *\t]+@ref[ \t]+/;

/**
 * @private
 * @const {!RegExp}
 */
var URL = /^\(.+(?=\))$/;

////////////////////////////////////////////////////////////////////////////////
// HELPERS
////////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @param {string} link
 * @return {string}
 */
var cleanHttpLink = require('./clean-http-link.js');

/**
 * @private
 * @param {string} source
 * @param {!RegExp} pattern
 * @return {string}
 */
var getMatch = require('../../get-match.js');

/**
 * @private
 * @param {string} source
 * @param {!RegExp} pattern
 * @return {!Array<string>}
 */
var getMatches = require('../../get-matches.js');

/**
 * @private
 * @param {string} link
 * @return {boolean}
 */
var isHttpLink = require('./is-http-link.js');

/**
 * @private
 * @param {number} val1
 * @param {number} val2
 * @return {boolean}
 */
var isLT = IS.lessThan;

/**
 * @private
 * @param {string} id
 * @return {boolean}
 */
var isRefID = require('./is-ref-id.js');

/**
 * @private
 * @param {string} src
 * @return {string}
 */
var trimSpace = require('./trim-space.js');

////////////////////////////////////////////////////////////////////////////////
// METHODS
////////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @param {string} line
 * @return {string}
 */
function getRefID(line) {

  /** @type {string} */
  var id;

  id = getMatch(line, ID);
  id = id && id.slice(1);

  if ( !isRefID(id) )
    throw new Error('invalid reference id for `@ref ' + line + '`');

  return id;
}

/**
 * @private
 * @param {string} line
 * @return {string}
 */
function getRefLink(line) {

  /** @type {string} */
  var link;

  link = line.replace(ID_TRIM, '');
  link = getMatch(link, URL);
  link = link && link.slice(1);

  if ( !isHttpLink(link) )
    throw new Error('invalid http link for `@ref ' + line + '`');

  return cleanHttpLink(link);
}

////////////////////////////////////////////////////////////////////////////////
// EXPORTS
////////////////////////////////////////////////////////////////////////////////

/**
 * @public
 * @param {string} content
 * @return {!Object<string, string>}
 */
module.exports = function getRefs(content) {

  /** @type {!Array<string>} */
  var lines;
  /** @type {string} */
  var line;
  /** @type {!Object<string, string>} */
  var refs;
  /** @type {string} */
  var ref;
  /** @type {number} */
  var len;
  /** @type {number} */
  var i;

  refs = {};

  lines = getMatches(content, REFS);
  len = lines.length;
  i = -1;
  while ( isLT(++i, len) ) {
    line = lines[i].replace(TAG, '');
    ref = getRefID(line);
    refs[ref] = getRefLink(line);
  }

  return refs;
};
