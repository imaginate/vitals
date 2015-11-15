/**
 * -----------------------------------------------------------------------------
 * MAKE TASK: minify
 * -----------------------------------------------------------------------------
 * @file Use `$ node make minify` to access this file.
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2015 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Annotations:
 * @see [JSDoc3]{@link http://usejsdoc.org/}
 * @see [Closure Compiler specific JSDoc]{@link https://developers.google.com/closure/compiler/docs/js-for-compiler}
 *
 * Requires:
 * @see [Closure Compiler Java App]{@link https://dl.google.com/closure-compiler/compiler-latest.zip}
 * @see [Java Runtime Environment 7+]{@link https://java.com/en/download/}
 */

'use strict';


////////////////////////////////////////////////////////////////////////////////
// DEFINE & EXPORT THE TASK
////////////////////////////////////////////////////////////////////////////////

/** @type {!Task} */
module.exports = newTask('minify', 'browser', {

  /**
   * @type {function}
   */
  browser: function browser() {

    /** @type {!Array} */
    var filenames;
    /** @type {string} */
    var basepath;
    /** @type {string} */
    var contents;
    /** @type {string} */
    var source;
    /** @type {string} */
    var are;

    are = retrieve.file('vendor/are.min.js') + '\n';
    basepath = 'src/browser/';
    filenames = retrieve.filepaths(basepath + '_skeletons');
    each(filenames, function(filename) {
      contents = retrieve.file(basepath + filename);
      contents = stripAre(contents);
      contents = minify(contents);
      contents = insertCopyright(contents, filename);
      filename = stripFileExt(filename) + '.min.js';
      toFile(are + contents, basepath + filename)
    });

    log.pass('Completed `minify.browser` Task');
  }
});


////////////////////////////////////////////////////////////////////////////////
// DEFINE PRIVATE HELPERS
////////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @type {string}
 * @const
 */
var MINIFIER = 'vendor/closure-compiler.jar';

/**
 * @private
 * @param {string} contents
 */
function minify(contents) {

  /** @type {string} */
  var cmd;

  if ( !is.file(MINIFIER) ) log.error(
    'Failed `minify` Task',
    'missing minifier: `' + MINIFIER + '`'
  );

  cmd = 'java -jar ' + MINIFIER;
  return exec(cmd, { input: contents });
}

/**
 * @private
 * @param {string} contents
 * @param {string} filename
 * @return {string}
 */
function insertCopyright(contents, filename) {

  /** @type {string} */
  var copyright;
  /** @type {string} */
  var linkBase;
  /** @type {string} */
  var version;

  linkBase = 'https://github.com/imaginate/vitals';
  version  = 'v' + getVersion();
  copyright = '/* '+ filepath +' '+ version +' ('+ linkBase +')\n' +
    ' * Copyright (c) 2015 Adam A Smith <adam@imaginate.life>\n'   +
    ' * The Apache License ('+ linkBase +'/blob/master/LICENSE.md) */';
  return contents.replace(/^\/\*[\s\S]*?\*\//, copyright);
}

/**
 * @private
 * @param {string} contents
 */
function stripAre(contents) {
  return contents.replace(/^\/\* are\.js[\s\S]*?(\/\*\*\n)/, '$1');
}

/**
 * @private
 * @return {string}
 */
function getVersion() {

  /** @type {string} */
  var contents;

  contents = retrieve.file('package.json');
  return /\"version": "([0-9]+\.[0-9]+\.[0-9]+)/.exec(contents)[1];
}

/**
 * @private
 * @param {string} filename
 * @return {string}
 */
function stripFileExt(filename) {
  return filename && filename.replace(/^\.js$/, '');
}
