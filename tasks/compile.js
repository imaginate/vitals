/**
 * -----------------------------------------------------------------------------
 * MAKE TASK: compile
 * -----------------------------------------------------------------------------
 * @file Use `$ node make compile` to access this file.
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2015 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * @see [JSDoc3]{@link http://usejsdoc.org/}
 * @see [Closure Compiler specific JSDoc]{@link https://developers.google.com/closure/compiler/docs/js-for-compiler}
 */

'use strict';


////////////////////////////////////////////////////////////////////////////////
// DEFINE & EXPORT THE TASK
////////////////////////////////////////////////////////////////////////////////

/** @type {!Task} */
module.exports = newTask('compile', 'browser-node', {

  /**
   * @type {function}
   */
  browser: function browser() {

    /** @type {string} */
    var contents;

    contents = getFile('vendor/are.min.js', true);
    contents += '\n' + getFileIntro('src/vitals.js');
    contents += getFile('src/_vitals-parts/gen-export.js');
    contents = insertMethods(contents, 'src/js-methods');
    contents.to('src/vitals.js');

    log.pass('Completed `compile.browser` Task');
  },

  /**
   * @param {string=} section
   */
  node: function node(section) {

    /** @type {string} */
    var contents;

    section = section || 'js-methods';
    section = has(section, /-methods$/) ? section : section + '-methods';
    section = 'src/' + section + '/';
    contents = getFile(section + '_skeleton.js', true);
    contents = insertMethods(contents, section);
    contents.to(section + 'index.js');

    log.pass('Completed `compile.node` Task');
  }
});


////////////////////////////////////////////////////////////////////////////////
// DEFINE PRIVATE HELPERS
////////////////////////////////////////////////////////////////////////////////

/**
 * @param {string} filepath
 * @param {boolean=} keepIntro
 * @return {string}
 */
function getFile(filepath, keepIntro) {

  /** @type {string} */
  var contents;

  contents = retrieve.file(filepath)
    .replace(/\r\n?/g, '\n'); // normalize line breaks
  return keepIntro
    ? contents
    : contents.replace(/^\/\*[\s\S]*?\*\/\n\n/, ''); // strip intro
}

/**
 * @param {string} filepath
 * @return {string}
 */
function getMethod(filepath) {
  return getFile(filepath)
    .replace(/^[\s\S]*?(\n\/{80}\n)/, '$1')               // strip requires
    .replace(/\n *module\.exports = [a-zA-Z_]+;\n$/, ''); // strip exports
}

/**
 * @param {string} contents
 * @param {string} dirpath
 * @return {string}
 */
function insertMethods(contents, dirpath) {

  /** @type {!RegExp} */
  var regex;

  dirpath = dirpath.replace(/[^\/]$/, '$&/');
  regex = / *\/\/ INSERT ([a-zA-Z-_]+\.js)\n/g;
  return contents.replace(regex, function(org, filepath) {
    return getMethod(dirpath + filepath);
  });
}

/**
 * @param {string} filepath
 * @return {string}
 */
function getFileIntro(filepath) {
  return getFile(filepath, true)
    .replace(/^[\s\S]*?(\/\*\*[\s\S]*?\*\/\n)[\s\S]*$/, '$1'); // extract intro
}
