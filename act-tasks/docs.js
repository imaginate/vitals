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

exports['desc'] = 'builds the wiki docs';
exports['default'] = '-methods';
exports['methods'] = {
  'methods': {
    'desc': 'builds the docs for all methods',
    'method': buildDocs
  },
  'method': {
    'desc': 'builds the docs for one method',
    'value': 'vitals-method',
    'method': buildDoc
  },
  'version': {
    'desc': 'updates the wiki docs version',
    'method': versionDocs
  }
};

var is = require('node-are').is;

var vitals = require('node-vitals')('base', 'fs');
var cut    = vitals.cut;
var each   = vitals.each;
var fuse   = vitals.fuse;
var get    = vitals.get;
var to     = vitals.to;

var WIKI = '../vitals.wiki';
var BASE = './src/methods';

var mkDoc = require('./mk-doc');

/**
 * @public
 * @type {function}
 */
function buildDocs() {

  /** @type {string} */
  var method;
  /** @type {!Array<string>} */
  var files;

  files = get.filepaths(BASE);
  each(files, function(file) {
    method = cut(file, /\.js$/);
    buildDoc(method);
  });
}

/**
 * @public
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

  file = fuse(BASE, '/', method, '.js');
  fsfile = fuse(BASE, '/fs/', method, '.js');

  if ( !is.file(file) ) throw new RangeError('invalid vitals method');

  content = get.file(file); 
  fscontent = is.file(fsfile)
    ? get.file(fsfile)
    : undefined;

  content = mkDoc(content, fscontent);
  file = fuse(WIKI, '/method-', method, '.md');
  to.file(content, file);
}

/**
 * @public
 * @type {function}
 */
function versionDocs() {

  /** @type {!Array<string>} */
  var files;
  /** @type {string} */
  var file;

  throw new Error('task not finished yet');
}
