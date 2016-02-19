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
 * @see [are]{@link https://github.com/imaginate/are}
 * @see [vitals]{@link https://github.com/imaginate/vitals}
 * @see [log-ocd]{@link https://github.com/imaginate/log-ocd}
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

var vitals = require('node-vitals')('base', 'fs');
var cut    = vitals.cut;
var each   = vitals.each;
var fuse   = vitals.fuse;
var get    = vitals.get;
var has    = vitals.has;
var remap  = vitals.remap;
var to     = vitals.to;

var ERROR_MSG = 'invalid value (must be a semantic version)';

var VERSION   = /^"version": "/;
var SEMANTIC  = /^[0-9]+\.[0-9]+\.[0-9]+(?:-[a-z]+\.?[0-9]*)?$/;
var NPM_BADGE = /(badge\/npm-)[0-9]+\.[0-9]+\.[0-9]+(?:--[a-z]+\.?[0-9]*)?/;
var ALL_VERSION = /\b(v?)[0-9]+\.[0-9]+\.[0-9]+(?:-[a-z]+\.?[0-9]*)?\b/g;
var NPM_VERSION = /("version": ")[0-9]+\.[0-9]+\.[0-9]+(?:-[a-z]+\.?[0-9]*)?/;

/**
 * @public
 * @param {string} version
 */
function updateAllVersion(version) {

  /** @type {!Array<string>} */
  var filepaths;
  /** @type {string} */
  var base;
  /** @type {!Object} */
  var opts;

  if ( !isSemVersion(version) ) throw new Error(ERROR_MSG);

  base = '.';
  opts = { validExts: /\.js$/ };
  filepaths = get.filepaths(base, opts);
  insertVersions(base, filepaths, version);

  base = './src';
  opts.deep = true;
  filepaths = get.filepaths(base, opts);
  insertVersions(base, filepaths, version);

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

  content = get.file('./package.json');
  version = fuse('$1', version);
  content = remap(content, NPM_VERSION, version);
  to.file(content, './package.json');
}

/**
 * @public
 * @param {string=} version
 */
function updateDocsVersion(version) {

  /** @type {!Array<string>} */
  var filepaths;
  /** @type {string} */
  var base;
  /** @type {!Object} */
  var opts;

  version = version || getVersion();

  if ( !isSemVersion(version) ) throw new Error(ERROR_MSG);

  base = '../vitals.wiki';
  opts = { validExts: /\.md$/ };
  filepaths = get.filepaths(base, opts);
  insertBadges(base, filepaths, version);

  base = './act-tasks/helpers/mk-doc/templates';
  filepaths = get.filepaths(base, opts);
  insertBadges(base, filepaths, version);
}

/**
 * @private
 * @param {string} version
 * @return {boolean}
 */
function isSemVersion(version) {
  return !!version && has(version, SEMANTIC);
}

/**
 * @private
 * @param {string} basedir
 * @param {!Array<string>} filepaths
 * @param {string} version
 */
function insertVersions(basedir, filepaths, version) {
  basedir = slashDir(basedir);
  each(filepaths, function(filepath) {
    filepath = fuse(basedir, filepath);
    insertVersion(filepath, version);
  });
}

/**
 * @private
 * @param {string} filepath
 * @param {string} version
 */
function insertVersion(filepath, version) {

  /** @type {string} */
  var content;

  version = fuse('$1', version);
  content = get.file(filepath);
  content = remap(content, ALL_VERSION, version);
  to.file(content, filepath);
}

/**
 * @private
 * @param {string} basedir
 * @param {!Array<string>} filepaths
 * @param {string} version
 */
function insertBadges(basedir, filepaths, version) {
  basedir = slashDir(basedir);
  each(filepaths, function(filepath) {
    filepath = fuse(basedir, filepath);
    insertBadge(filepath, version);
  });
}

/**
 * @private
 * @param {string} filepath
 * @param {string} version
 */
function insertBadge(filepath, version) {

  /** @type {string} */
  var content;

  version = fuse('$1', version);
  version = remap(version, /-/g, '--');
  content = get.file(filepath);
  content = remap(content, NPM_BADGE, version);
  to.file(content, filepath);
}

/**
 * @private
 * @return {string}
 */
function getVersion() {

  /** @type {string} */
  var content;
  /** @type {string} */
  var version;

  content = get.file('./package.json');
  version = get(content, NPM_VERSION)[0];
  version = cut(version, VERSION);
  return version;
}

/**
 * @private
 * @param {string} basedir
 * @return {string}
 */
function slashDir(basedir) {
  return basedir
    ? remap(basedir, /[^\/]$/, '$&/')
    : '';
}
