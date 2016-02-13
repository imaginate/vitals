/**
 * -----------------------------------------------------------------------------
 * ACT TASK HELPER: mkHeader
 * -----------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2016 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Supporting Libraries:
 * @see [act]{@link https://github.com/imaginate/act}
 * @see [are]{@link https://github.com/imaginate/are}
 * @see [vitals]{@link https://github.com/imaginate/vitals}
 * @see [log-ocd]{@link https://github.com/imaginate/log-ocd}
 *
 * Annotations:
 * @see [JSDoc3]{@link http://usejsdoc.org/}
 * @see [Closure Compiler specific JSDoc]{@link https://developers.google.com/closure/compiler/docs/js-for-compiler}
 */

'use strict';

var vitals = require('node-vitals')('base', 'fs');
var cut    = vitals.cut;
var fuse   = vitals.fuse;
var get    = vitals.get;
var remap  = vitals.remap;

var GET  = /\n *\/\/ PUBLIC METHODS *\n(?: *\/\/ - [a-z]+(?:\.[a-zA-Z.]+)?(?: +\([a-zA-Z.*|]+\))? *\n)+/;
var TRIM = /\n *\/\/ PUBLIC METHODS *\n/;
var BASE = /[a-z]+(?= |\n)/;

var TEMPLATE = get.file('act-tasks/docs/header.md');

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

  content = cut(content, TRIM);
  base = get(content, BASE)[0];
  methods = getMethods(section, content);

  if (fscontent) {
    fscontent = get(fscontent, GET)[0];
    fscontent = cut(fscontent, TRIM);
    methods = fuse(methods, getMethods('fs', fscontent));
  }

  header = TEMPLATE;
  header = remap(header, '{{ base }}',    base);
  header = remap(header, '{{ methods }}', methods);

  return header;
};
