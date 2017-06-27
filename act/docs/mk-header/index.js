/**
 * -----------------------------------------------------------------------------
 * ACT TASK HELPER: mkHeader
 * -----------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life> (https://imaginate.life)
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
var TEMPLATE = require('../get-template.js')('header');

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

/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isUndefined = IS.undefined;

/**
 * @private
 * @param {string} content
 * @return {string}
 */
var trimToMethods = require('./trim-to-methods.js');

////////////////////////////////////////////////////////////////////////////////
// METHODS
////////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @param {string} content
 * @return {string}
 */
var getMainMethod = require('./get-main-method.js');

/**
 * @private
 * @param {string} content
 * @return {string}
 */
var getSection = require('./get-section.js');

/**
 * @private
 * @param {string} content
 * @param {string} section
 * @return {string}
 */
var mkMethodRows = require('./mk-method-rows.js');

////////////////////////////////////////////////////////////////////////////////
// EXPORTS
////////////////////////////////////////////////////////////////////////////////

/**
 * @public
 * @param {string} content
 * @param {string=} fscontent
 * @return {string}
 */
module.exports = function mkHeader(content, fscontent) {

  /** @type {string} */
  var section;
  /** @type {string} */
  var header;
  /** @type {string} */
  var main;
  /** @type {string} */
  var rows;

  if ( !isString(content) )
    throw new TypeError('invalid `content` type (must be a string)');
  if ( !isString(fscontent) && !isUndefined(fscontent) )
    throw new TypeError('invalid `fscontent` type (must be a string or undefined)');

  section = getSection(content);
  content = trimToMethods(content);
  main = getMainMethod(content);
  rows = mkMethodRows(content, section);

  if (fscontent) {
    fscontent = trimToMethods(fscontent);
    rows += mkMethodRows(fscontent, 'fs');
  }

  header = insertTag(TEMPLATE, 'rows', rows);
  header = insertTag(header, 'main', main);

  return header;
};
