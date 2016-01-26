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
 * @see [are]{@link https://github.com/imaginate/are}
 * @see [vitals]{@link https://github.com/imaginate/vitals}
 * @see [log-ocd]{@link https://github.com/imaginate/log-ocd}
 * @see [Closure Compiler]{@link https://github.com/google/closure-compiler}
 *
 * Annotations:
 * @see [JSDoc3]{@link http://usejsdoc.org/}
 * @see [Closure Compiler specific JSDoc]{@link https://developers.google.com/closure/compiler/docs/js-for-compiler}
 *
 * Requires:
 * @see [Java Runtime Environment 7+]{@link https://java.com/en/download/}
 */

'use strict';

var is = require('node-are').is;

var vitals = require('node-vitals')('all');
var each   = vitals.each;
var fuse   = vitals.fuse;
var get    = vitals.get;
var has    = vitals.has;
var remap  = vitals.remap;
var run    = vitals.run;
var to     = vitals.to;

var WEBSITE  = 'https://github.com/imaginate/vitals';
var BROWSER  = 'src/browser';
var FRAMES   = 'src/browser/skeletons';
var MINIFIER = 'vendor/closure-compiler.jar';
var ARE_SRC  = 'vendor/are.min.js';
var INTRO    = /^\/\*[\s\S]*?\*\//;
var FIND_ARE = /^\/\* are\.js[\s\S]*?(\/\*\*\n)/;
var VERSION  = /"version": "([0-9]+\.[0-9]+\.[0-9]+)(-[a-z]+.?[0-9]*)?/;

exports['desc'] = 'minifies the browser versions';
exports['method'] = minifyVitals;

/**
 * @public
 * @type {function}
 */
function minifyVitals() {

  /** @type {!Array<string>} */
  var filenames;
  /** @type {string} */
  var filepath;
  /** @type {string} */
  var content;
  /** @type {string} */
  var are;

  are = get.file(ARE_SRC);
  are = fuse(are, '\n');
  filenames = get.filepaths(FRAMES);
  each(filenames, function(filename) {
    filepath = fuse(FRAMES, '/', filename);
    content = get.file(filepath);
    content = remap(content, FIND_ARE, '$1');
    content = minify(content);
    content = addCopyright(content, filename);
    content = fuse(are, content);
    filename = remap(filename, /js$/, 'min.js');
    filepath = fuse(BROWSER, '/', filename);
    to.file(content, filepath);
  });
}

/**
 * @private
 * @param {string} content
 */
function minify(content) {

  /** @type {string} */
  var cmd;
  /** @type {string} */
  var msg;

  if ( !is.file(MINIFIER) ) {
    msg = fuse('missing minifier file - `', MINIFIER, '`');
    throw new Error(msg);
  }

  cmd = fuse('java -jar ', MINIFIER);
  return run(cmd, {
    catchExit: false,
    input:     content
  });
}

/**
 * @private
 * @param {string} content
 * @param {string} name
 * @return {string}
 */
function addCopyright(content, name) {

  /** @type {string} */
  var c;
  /** @type {string} */
  var v;

  v = getVersion('v');
  c = fuse('/* ', name, ' ', v, ' (', WEBSITE, ')\n');
  c = fuse(c, ' * Copyright (c) 2016 Adam A Smith <adam@imaginate.life>\n');
  c = fuse(c, ' * The Apache License (', WEBSITE, '/blob/master/LICENSE.md) */');
  return remap(content, INTRO, c);
}

/**
 * @private
 * @param {string=} pre
 * @return {string}
 */
function getVersion(pre) {

  /** @type {string} */
  var content;
  /** @type {string} */
  var version;

  pre = pre || '';
  content = get.file('./package.json');
  version = get(content, VERSION)[0];
  return fuse(pre, version);
}
