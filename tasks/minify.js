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
module.exports = newTask('minify', 'src', {

  /**
   * @param {string=} filename
   */
  src: function src(filename) {

    /** @type {string} */
    var source;
    /** @type {string} */
    var dest;

    filename = stripFileExt(filename);
    filename = hyphenate(filename);
    filename = filename || 'vitals';

    source = 'src/' + filename + '.js';
    dest = 'src/' + filename + '.min.js';

    if ( !is.file(source) ) log.error(
      'Failed `minify.src` Task',
      'invalid `filename` param (must be a valid file in the `src` dir)',
      { argMap: true, filename: filename }
    );

    copy(source, dest);
    stripAre(dest);
    minify(dest);

    log.pass('Completed `minify.src` Task');
  }
});


////////////////////////////////////////////////////////////////////////////////
// DEFINE PRIVATE HELPERS
////////////////////////////////////////////////////////////////////////////////

/**
 * @param {string} filepath
 */
function stripAre(filepath) {

  /** @type {string} */
  var content;
  /** @type {!RegExp} */
  var regex;

  content = getFile(filepath);
  regex = /^\/\* are\.js[\s\S]*?(\/\*\*\n)/;

  if ( !has(content, regex) ) return;

  content = content.replace(regex, '$1');
  toFile(content, filepath);
}

/**
 * @param {string} filepath
 */
function minify(filepath) {

  /** @type {string} */
  var compiler;
  /** @type {string} */
  var content;
  /** @type {string} */
  var cmd;

  compiler = 'vendor/closure-compiler.jar';

  if ( !is.file(compiler) ) log.error(
    'Failed `minify` Task',
    'missing compiler: `' + compiler + '`'
  );

  cmd = 'java -jar ' + compiler + ' --js ' + filepath + ' -W QUIET';
  content = exec(cmd).toString();
  content = content.replace(/\r\n?/g, '\n'); // normalize line breaks
  content = insertCopyright(content, filepath);
  content = insertAre(content);
  toFile(content, filepath);
}

/**
 * @param {string} content
 * @param {string} filepath
 * @return {string}
 */
function insertCopyright(content, filepath) {

  /** @type {string} */
  var copyright;
  /** @type {string} */
  var linkBase;
  /** @type {string} */
  var version;

  filepath = filepath.replace(/^(?:.*\/)?([a-z-]+)\..*$/i, '$1.js');
  linkBase = 'https://github.com/imaginate/vitals';
  version  = 'v' + getVersion();
  copyright = '/* '+ filepath +' '+ version +' ('+ linkBase +')\n' +
    ' * Copyright (c) 2015 Adam A Smith <adam@imaginate.life>\n' +
    ' * The Apache License ('+ linkBase +'/blob/master/LICENSE.md) */';
  return content.replace(/^\/\*[\s\S]*?\*\//, copyright);
}

/**
 * @param {string} content
 * @return {string}
 */
function insertAre(content) {
  return getFile('vendor/are.min.js') + '\n' + content;
}

/**
 * @return {string}
 */
function getVersion() {

  /** @type {string} */
  var content;

  content = getFile('src/_vitals-parts/gen-export.js');
  return /\@version ([0-9]+\.[0-9]+\.[0-9]+)/.exec(content)[1];
}

/**
 * @param {string} filepath
 * @return {string}
 */
function getFile(filepath) {
  return retrieve.file(filepath)
    .replace(/\r\n?/g, '\n'); // normalize line breaks
}

/**
 * @param {string} filename
 * @return {string}
 */
function stripFileExt(filename) {
  return filename && filename.replace(/^(.*)(?:\.js)?$/, '$1');
}

/**
 * @param {string} filename
 * @return {string}
 */
function hyphenate(filename) {
  return filename && filename.replace(/([A-Z])/g, '-$1').toLowerCase();
}
