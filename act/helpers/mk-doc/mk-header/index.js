/**
 * -----------------------------------------------------------------------------
 * ACT TASK HELPER: mkHeader
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
var EOL = /\n$/;

/**
 * @private
 * @const {!RegExp}
 */
var MAIN = /\b[a-z]+\b/;

/**
 * @private
 * @const {!RegExp}
 */
var METHODS = /\n *\/\/ PUBLIC METHODS *\n(?: *\/\/ - [a-z]+(?:\.[a-zA-Z._]+)?(?: +\([a-zA-Z.*|_]+\))? *\n)+/;

/**
 * @private
 * @const {!RegExp}
 */
var TITLE = /\n *\/\/ PUBLIC METHODS *\n/;

////////////////////////////////////////////////////////////////////////////////
// HELPERS
////////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @param {string} filepath
 * @param {boolean=} buffer
 * @return {(!Buffer|string)}
 */
var getFileContent = require('../../get-file-content.js');

/**
 * @private
 * @param {string} source
 * @param {!RegExp} pattern
 * @return {string}
 */
var getMatch = require('../../get-match.js');

/**
 * @private
 * @param {(!ArrayLike<string>|...string)=} path
 * @return {string}
 */
var resolvePath = require('../../resolve-path.js');

////////////////////////////////////////////////////////////////////////////////
// MACROS
////////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @const {string}
 */
var TMPL_PATH = resolvePath(__dirname, '../templates/header.md');

/**
 * @private
 * @const {string}
 */
var TEMPLATE = getFileContent(TMPL_PATH);

////////////////////////////////////////////////////////////////////////////////
// GET METHODS
////////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @param {string} section
 * @param {string} content
 * @return {string}
 */
var getMethods = require('./get-methods.js');

/**
 * @private
 * @param {string} content
 * @return {string}
 */
var getSection = require('./get-section.js');

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
  var methods;
  /** @type {string} */
  var header;
  /** @type {string} */
  var main;

  section = getSection(content);
  content = getMatch(content, METHODS);

  if (!content) 
    throw new Error('no public methods found');

  content = content.replace(TITLE, '');
  content = content.replace(EOL, '');
  main = getMatch(content, MAIN);
  methods = getMethods(section, content);

  if (fscontent) {
    fscontent = getMatch(fscontent, METHODS);
    fscontent = fscontent.replace(TITLE, '');
    fscontent = fscontent.replace(EOL, '');
    methods = methods + getMethods('fs', fscontent);
  }

  header = TEMPLATE;
  header = header.replace('{{ base }}', main);
  header = header.replace('{{ methods }}', methods);

  return header;
};
