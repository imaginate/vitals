/**
 * -----------------------------------------------------------------------------
 * ACT TASK: minify
 * -----------------------------------------------------------------------------
 * @file Use `$ act minify` to access this file.
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2016 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Supporting Libraries:
 * @see [act]{@link https://github.com/imaginate/act}
 * @see [Closure Compiler]{@link https://github.com/google/closure-compiler}
 *
 * Annotations:
 * @see [JSDoc3](http://usejsdoc.org)
 * @see [Closure Compiler JSDoc Syntax](https://developers.google.com/closure/compiler/docs/js-for-compiler)
 *
 * Requires:
 * @see [Java Runtime Environment 7+]{@link https://java.com/en/download/}
 */

'use strict';

exports['desc'] = 'minifies the browser versions';
exports['method'] = minifyVitals;

var WEBSITE  = 'https://github.com/imaginate/vitals';
var BROWSER  = 'src/browser';
var FRAMES   = 'src/browser/skeletons';
var MINIFIER = 'vendor/closure-compiler.jar';

var INTRO = /^\/\*[\s\S]*?\*\//;

var getSections = require('./helpers/get-sections');
var getVersion = require('./helpers/get-version');
var getFile = require('./helpers/get-file');
var toFile = require('./helpers/to-file');
var is = require('./helpers/is');
var cp = require('child_process');

/**
 * @public
 * @type {function}
 */
function minifyVitals() {

  /** @type {!Array} */
  var filenames;
  /** @type {string} */
  var filename;
  /** @type {string} */
  var filepath;
  /** @type {string} */
  var content;
  /** @type {number} */
  var len;
  /** @type {number} */
  var i;

  filenames = getSections(true, true);
  len = filenames.length;
  i = -1;
  while (++i < len) {
    filename = filenames[i];
    filepath = BROWSER + '/' + filename;
    content  = getFile(filepath);
    content  = minify(content);
    content  = addCopyright(content, filename);
    filepath = getMinPath(filepath);
    toFile(content, filepath);
  }
}

/**
 * @private
 * @param {string} content
 * @return {string}
 */
function minify(content) {

  /** @type {!SpawnResult} */
  var result;
  /** @type {string} */
  var msg;

  if ( !is.file(MINIFIER) ) throw new Error('invalid minifier file - `' + MINIFIER + '`');

  result = cp.spawnSync('java', [ '-jar', MINIFIER ], {
    encoding: 'utf8',
    input:  content
  });

  if (result.error) throw result.error;

  content = result.stdout.toString();
  return content && content.replace(/\r\n?/g, '\n');
}

/**
 * @private
 * @param {string} content
 * @param {string} filename
 * @return {string}
 */
function addCopyright(content, filename) {

  /** @type {string} */
  var copyright;
  /** @type {string} */
  var version;
  /** @type {string} */
  var license;

  version = getVersion();
  license = WEBSITE + '/blob/master/LICENSE.md';
  copyright  = '/* ' + filename + ' v' + version + ' (' + WEBSITE + ')\n';
  copyright += ' * Copyright (c) 2016 Adam A Smith <adam@imaginate.life>\n';
  copyright += ' * The Apache License (' + license + ') */';
  return content.replace(INTRO, copyright);
}

/**
 * @private
 * @param {string} filepath
 * @return {string}
 */
function getMinPath(filepath) {
  return filepath.replace(/js$/, 'min.js');
}
