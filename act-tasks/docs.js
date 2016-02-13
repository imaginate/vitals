/**
 * -----------------------------------------------------------------------------
 * ACT TASK: docs
 * -----------------------------------------------------------------------------
 * @file Use `$ act docs` to access this file.
 *
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

var is = require('node-are').is;

var vitals = require('node-vitals')('base', 'fs');
var cut    = vitals.cut;
var each   = vitals.each;
var fuse   = vitals.fuse;
var get    = vitals.get;
var to     = vitals.to;

exports['desc'] = 'builds the wiki docs';
exports['value'] = 'vitals-method';
exports['default'] = '-methods';
exports['methods'] = {
  'methods': {
    'desc': 'builds the wiki docs from JSDoc',
    'value': 'method',
    'method': buildDocs
  },
  'version': {
    'desc': 'updates the wiki docs version',
    'method': versionDocs
  }
};

var WIKI = '../vitals.wiki';
var BASE = './src/methods';

var mkHeader = require('./docs/mk-header');
var mkBody   = require('./docs/mk-body');
var mkFooter = require('./docs/mk-footer');

/**
 * @public
 * @param {string=} method - [default= "all"]
 */
function buildDocs(method) {

  /** @type {!Array<string>} */
  var files;
  /** @type {string} */
  var file;

  if (!method || method === 'all') {
    files = get.filepaths(BASE);
    each(files, function(file) {
      method = cut(file, /\.js$/);
      buildDoc(method);
    });
  }
  else {
    file = fuse(BASE, '/', method, '.js');
    if ( !is.file(file) ) throw new RangeError('invalid vitals method');
    buildDoc(method);
  }
}

/**
 * @private
 * @param {string} method
 */
function buildDoc(method) {

  /** @type {string} */
  var fscontent;
  /** @type {string} */
  var content;
  /** @type {string} */
  var fsfile;
  /** @type {string} */
  var file;

  fsfile = fuse(BASE, '/fs/', method, '.js');
  fscontent = is.file(fsfile)
    ? get.file(fsfile)
    : undefined;

  file = fuse(BASE, '/', method, '.js');
  content = get.file(file);

  content = mkDoc(content, fscontent);
  file = fuse(WIKI, '/method-', method, '.md');
  to.file(content, file);
}

/**
 * @private
 * @param {string} content
 * @param {string=} fscontent
 * @return {string}
 */
function mkDoc(content, fscontent) {

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
}
