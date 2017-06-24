/**
 * -----------------------------------------------------------------------------
 * ACT TASK HELPER: mkMethodRow
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
 * @const {string}
 */
var TEMPLATE = require('../get-template.js')('header/row');

////////////////////////////////////////////////////////////////////////////////
// HELPERS
////////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @param {string} src
 * @param {string} tag
 * @param {string} val
 * @return {string}
 */
var insertTag = require('../insert-tag.js');

/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isString = IS.string;

////////////////////////////////////////////////////////////////////////////////
// METHODS
////////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @param {string} line
 * @return {string}
 */
var getAlias = require('./get-alias.js');

/**
 * @private
 * @param {string} line
 * @return {string}
 */
var getMethod = require('./get-method.js');

/**
 * @private
 * @param {string} method
 * @return {string}
 */
var getMethodID = require('../get-method-id.js');

////////////////////////////////////////////////////////////////////////////////
// EXPORTS
////////////////////////////////////////////////////////////////////////////////

/**
 * @public
 * @param {string} line
 * @return {string}
 */
module.exports = function mkMethodRow(line) {

  /** @type {string} */
  var method;
  /** @type {string} */
  var alias;
  /** @type {string} */
  var row;
  /** @type {string} */
  var id;

  if ( !isString(line) )
    throw new TypeError('invalid `line` type (must be a string)');
  if ( !line )
    throw new Error('invalid empty `line` string');

  method = getMethod(line);
  alias = getAlias(line);
  id = getMethodID(method);

  row = insertTag(TEMPLATE, 'method', method);
  row = insertTag(row, 'alias', alias);
  row = insertTag(row, 'id', id);

  return row;
};
