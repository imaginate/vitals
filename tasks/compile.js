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
module.exports = newTask('compile', 'browser-sections', {

  /**
   * @type {function}
   */
  browser: function browser() {

    /** @type {!Array} */
    var filepaths;
    /** @type {string} */
    var basepath;
    /** @type {string} */
    var contents;
    /** @type {string} */
    var newpath;
    /** @type {string} */
    var are;

    are = getFile('vendor/are.min.js') + '\n';
    basepath = 'src/browser/_skeletons/';
    newpath = 'src/browser/';
    filepaths = retrieve.filepaths(basepath);
    each(filepaths, function(filepath) {
      contents = getFile(basepath + filepath);
      contents = insertFiles(contents);
      contents = cleanContent(contents);
      toFile(contents, newpath + filepath);
    });

    log.pass('Completed `compile.browser` Task');
  },

  /**
   * @type {function}
   */
  sections: function sections() {

    /** @type {!Array} */
    var filepaths;
    /** @type {string} */
    var basepath;
    /** @type {string} */
    var contents;
    /** @type {string} */
    var newpath;

    basepath = 'src/sections/_skeletons/';
    newpath = 'src/sections/';
    filepaths = retrieve.filepaths(basepath, true);
    each(filepaths, function(filepath) {
      contents = getFile(basepath + filepath);
      contents = insertFiles(contents);
      toFile(contents, newpath + filepath);
    });

    log.pass('Completed `compile.sections` Task');
  }
});


////////////////////////////////////////////////////////////////////////////////
// DEFINE PRIVATE HELPERS
////////////////////////////////////////////////////////////////////////////////

/**
 * @param {string} filepath
 * @param {boolean=} strip
 * @return {string}
 */
function getFile(filepath, strip) {

  /** @type {string} */
  var contents;

  contents = retrieve.file(filepath);
  contents = strip ? stripIntro(contents) : contents;
  return strip ? stripEnd(contents) : contents;
}

/**
 * @param {string} contents
 * @return {string}
 */
function stripIntro(contents) {
  return contents.replace(/^[\s\S]*?(\n\/{80}\n)/, '$1');
}

/**
 * @param {string} contents
 * @return {string}
 */
function stripEnd(contents) {
  return contents.replace(/\n *module\.exports = [a-zA-Z_]+;\n$/, '$1');
}

/**
 * @param {string} contents
 * @return {string}
 */
function cleanContent(contents) {
  return contents.replace(/is\.null\(/g, 'is.nil(');
}

/**
 * @param {string} contents
 * @return {string}
 */
function insertFiles(contents) {

  /** @type {!RegExp} */
  var regex;

  regex = / *\/\/ INSERT ([a-zA-Z-_\/]+\.js)\n/g;
  return contents.replace(regex, function(org, filepath) {
    return getFile('src/' + filepath, true);
  });
}
