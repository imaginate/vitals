/**
 * -----------------------------------------------------------------------------
 * ACT TASK HELPER: mkHeader
 * -----------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2016 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Annotations:
 * @see [JSDoc3]{@link http://usejsdoc.org/}
 * @see [Closure Compiler specific JSDoc]{@link https://developers.google.com/closure/compiler/docs/js-for-compiler}
 */

'use strict';

var get = require('../../get-match');
var getFile = require('../../get-file');

var GET  = /\n *\/\/ PUBLIC METHODS *\n(?: *\/\/ - [a-z]+(?:\.[a-zA-Z._]+)?(?: +\([a-zA-Z.*|_]+\))? *\n)+/;
var TRIM = /\n *\/\/ PUBLIC METHODS *\n/;
var SLIM = /\n$/;
var BASE = /\b[a-z]+\b/;

var TEMPLATE = getFile('act-tasks/helpers/mk-doc/templates/header.md');

var getSection = require('./get-section');
var getMethods = require('./get-methods');

/**
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
  var base;

  section = getSection(content);
  content = get(content, GET);

  if (!content) throw new Error('no public methods found');

  content = content.replace(TRIM, '');
  content = content.replace(SLIM, '');
  base = get(content, BASE);
  methods = getMethods(section, content);

  if (fscontent) {
    fscontent = get(fscontent, GET);
    fscontent = fscontent.replace(TRIM, '');
    fscontent = fscontent.replace(SLIM, '');
    methods = methods + getMethods('fs', fscontent);
  }

  header = TEMPLATE;
  header = header.replace('{{ base }}', base);
  header = header.replace('{{ methods }}', methods);

  return header;
};
