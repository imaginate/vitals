/**
 * -----------------------------------------------------------------------------
 * ACT TASK HELPER: mkDoc
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

var fuse = require('node-vitals')('fuse');

var mkHeader = require('./mk-header');
var mkBody   = require('./mk-body');
var mkFooter = require('./mk-footer');

/**
 * @param {string} content
 * @param {string=} fscontent
 * @return {string}
 */
module.exports = function mkDoc(content, fscontent) {

  /** @type {string} */
  var header;
  /** @type {string} */
  var footer;
  /** @type {string} */
  var body;

  header = mkHeader(content, fscontent);
  body   = mkBody(content, fscontent);
  footer = mkFooter(content, fscontent);
  return fuse(header, body, footer);
};
