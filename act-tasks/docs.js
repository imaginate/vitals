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
  }
};

var WIKI = '../vitals.wiki';
var BASE = './src/methods';

var getFilepaths = require('./helpers/get-filepaths');
var getFile = require('./helpers/get-file');
var toFile = require('./helpers/to-file');
var mkDoc = require('./helpers/mk-doc');
var is = require('./helpers/is');

/**
 * @public
 * @type {function}
 */
function buildDocs() {

  /** @type {string} */
  var method;
  /** @type {!Array<string>} */
  var files;
  /** @type {number} */
  var len;
  /** @type {number} */
  var i;

  files = getFilepaths(BASE, false, /\.js$/);
  len = files.length;
  i = -1;
  while (++i < len) {
    method = cutFileExt(files[i]);
    buildDoc(method);
  }
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

  file   = BASE + '/'    + method + '.js';
  fsfile = BASE + '/fs/' + method + '.js';

  if ( !is.file(file) ) throw new RangeError('invalid vitals method');

  content = getFile(file); 
  fscontent = is.file(fsfile)
    ? getFile(fsfile)
    : undefined;

  content = mkDoc(content, fscontent);
  file = WIKI + '/vitals.' + method + '.md';
  toFile(content, file);
}

/**
 * @private
 * @param {string} filepath
 * @return {string}
 */
function cutFileExt(filepath) {
  return filepath.replace(/\.js$/, '');
}
