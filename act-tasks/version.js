/**
 * -----------------------------------------------------------------------------
 * ACT TASK: version
 * -----------------------------------------------------------------------------
 * @file Use `$ act version` to access this file.
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

exports['desc'] = 'updates version for the repo';
exports['value'] = 'x.x.x-pre.x';
exports['default'] = '-all';
exports['methods'] = {
  'all': {
    'desc': 'updates version for entire repo',
    'value': 'x.x.x-pre.x',
    'method': updateAllVersion
  },
  'npm': {
    'desc': 'updates only npm version',
    'value': 'x.x.x-pre.x',
    'method': updateNPMVersion
  },
  'docs': {
    'desc': 'updates the docs version',
    'value': 'x.x.x-pre.x',
    'method': updateDocsVersion
  }
};

var ERROR_MSG = 'invalid value (must be a semantic version)';

var SEMANTIC  = /^[0-9]+\.[0-9]+\.[0-9]+(?:-[a-z]+\.?[0-9]*)?$/;
var NPM_BADGE = /(badge\/npm-)[0-9]+\.[0-9]+\.[0-9]+(?:--[a-z]+\.?[0-9]*)?/;
var ALL_VERSION = /\b(v?)[0-9]+\.[0-9]+\.[0-9]+(?:-[a-z]+\.?[0-9]*)?\b/g;
var NPM_VERSION = /("version": ")[0-9]+\.[0-9]+\.[0-9]+(?:-[a-z]+\.?[0-9]*)?/;

var getFilepaths = require('./helpers/get-filepaths');
var getVersion = require('./helpers/get-version');
var getFile = require('./helpers/get-file');
var toFile = require('./helpers/to-file');

/**
 * @public
 * @param {string} version
 */
function updateAllVersion(version) {

  /** @type {!Array<string>} */
  var files;
  /** @type {string} */
  var base;

  if ( !isSemVersion(version) ) throw new Error(ERROR_MSG);

  base = '.';
  files = getFilepaths(base, false, /\.js$/);
  insertVersions(base, files, version);

  base = './src';
  files = getFilepaths(base, true, /\.js$/);
  insertVersions(base, files, version);

  updateNPMVersion(version);
}

/**
 * @public
 * @param {string} version
 */
function updateNPMVersion(version) {

  /** @type {string} */
  var content;

  if ( !isSemVersion(version) ) throw new Error(ERROR_MSG);

  insertBadge('./README.md', version);

  content = getFile('./package.json');
  content = content.replace(NPM_VERSION, '$1' + version);
  toFile(content, './package.json');
}

/**
 * @public
 * @param {string=} version
 */
function updateDocsVersion(version) {

  /** @type {!Array<string>} */
  var files;
  /** @type {string} */
  var base;

  version = version || getVersion();

  if ( !isSemVersion(version) ) throw new Error(ERROR_MSG);

  base = '../vitals.wiki';
  files = getFilepaths(base, false, /\.md$/);
  insertBadges(base, files, version);

  base = './act-tasks/helpers/mk-doc/templates';
  files = getFilepaths(base, false, /\.md$/);
  insertBadges(base, files, version);
}

/**
 * @private
 * @param {string} version
 * @return {boolean}
 */
function isSemVersion(version) {
  return !!version && SEMANTIC.test(version);
}

/**
 * @private
 * @param {string} base
 * @param {!Array<string>} files
 * @param {string} version
 */
function insertVersions(base, files, version) {

  /** @type {string} */
  var file;
  /** @type {number} */
  var len;
  /** @type {number} */
  var i;

  base = slashDir(base);
  len = files.length;
  i = -1;
  while (++i < len) {
    file = base + files[i];
    insertVersion(file, version);
  }
}

/**
 * @private
 * @param {string} filepath
 * @param {string} version
 */
function insertVersion(filepath, version) {

  /** @type {string} */
  var content;

  content = getFile(filepath);
  content = content.replace(ALL_VERSION, '$1' + version);
  toFile(content, filepath);
}

/**
 * @private
 * @param {string} base
 * @param {!Array<string>} files
 * @param {string} version
 */
function insertBadges(base, files, version) {

  /** @type {string} */
  var file;
  /** @type {number} */
  var len;
  /** @type {number} */
  var i;

  base = slashDir(base);
  len = files.length;
  i = -1;
  while (++i < len) {
    file = base + files[i];
    insertBadge(file, version);
  }
}

/**
 * @private
 * @param {string} filepath
 * @param {string} version
 */
function insertBadge(filepath, version) {

  /** @type {string} */
  var content;

  version = '$1' + version.replace(/-/g, '--');
  content = getFile(filepath);
  content = content.replace(NPM_BADGE, version);
  toFile(content, filepath);
}

/**
 * @private
 * @param {string} dir
 * @return {string}
 */
function slashDir(dir) {
  dir = dir || '';
  return dir && dir.replace(/[^\/]$/, '$&/');
}
