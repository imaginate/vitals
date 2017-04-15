/**
 * -----------------------------------------------------------------------------
 * ACT TASK HELPER: runTestCmd
 * -----------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2017 Adam A Smith <adam@imaginate.life> (https://imaginate.life)
 *
 * @see [JSDoc3](http://usejsdoc.org)
 * @see [Closure Compiler JSDoc](https://developers.google.com/closure/compiler/docs/js-for-compiler)
 */

'use strict';

var cp = require('child_process');
var log = require('log-ocd')();
var getFile = require('./get-file');
var getFiles = require('./get-filepaths');
var newTestCmd = require('./new-test-cmd');

var SECTION = /^[\s\S]+?@section ([a-z-]+)[\s\S]+$/;

log.error.setConfig({
  'throw': false,
  'exit':  true
});

/**
 * @typedef {function} TestCmdMethod
 *
 * @typedef {{
 *   __CMD:   boolean,
 *   start:   !TestCmdMethod,
 *   close:   !TestCmdMethod,
 *   report:  string,
 *   slow:    string,
 *   dir:     boolean,
 *   section: string,
 *   setup:   string,
 *   test:    string
 * }} TestCmd
 */

/**
 * @param {(?Object|TestCmd)} opts
 * @param {?TestCmdMethod=} opts.start  - [default= null]
 * @param {?TestCmdMethod=} opts.close  - [default= null]
 * @param {string=} opts.reporter  - [default= "specky"]
 * @param {number=} opts.slow      - [default= 5]
 * @param {string=} opts.setup     - [default= "methods"]
 * @param {string=} opts.method    - [default= ""] Test only a specific method.
 * @param {string=} opts.section   - [default= ""] Test only a specific section.
 * @param {string=} opts.submethod - [default= ""] Test only a specific submethod.
 */
module.exports = function runTestCmd(opts) {

  /** @type {!ChildProcess} */
  var child;
  /** @type {!Array<string>} */
  var files;
  /** @type {!Array<string>} */
  var args;
  /** @type {!Object} */
  var opts;
  /** @type {!TestCmd} */
  var cmd;

  cmd = newTestCmd(opts);
  files = mkTestFiles(cmd.test, cmd.section, cmd.dir);
  args = [
    './act/helpers/test-module.js',
    cmd.report,
    cmd.slow,
    cmd.setup
  ];
  args = args.concat(files);
  opts = { 'stdio': 'inherit' };

  cmd.start();

  try {
    child = cp.spawn('node', args, opts);
  }
  catch (err) {
    err.name = err.name || 'Error';
    err.name = 'Internal `test` ' + err.name;
    log.error(err);
  }

  child.on('close', cmd.close);
};

/**
 * @private
 * @param {string} base
 * @param {string} section
 * @param {boolean} deep
 * @return {!Array<string>}
 */
function mkTestFiles(base, section, deep) {

  /** @type {function(string): boolean} */
  var inSection;
  /** @type {!Array} */
  var allFiles;
  /** @type {!Array} */
  var files;
  /** @type {string} */
  var file;
  /** @type {number} */
  var len;
  /** @type {number} */
  var i;

  if (!deep) return [ base ];

  inSection = mkSectionTest(section);
  allFiles = getFiles(base, true);
  files = [];
  len = allFiles.length;
  i = -1;
  while (++i < len) {
    file = base + allFiles[i];
    if ( inSection(file) ) files.push(file);
  }
  return files;
}

/**
 * @private
 * @param {string} valid - The valid section(s).
 * @return {function}
 */
function mkSectionTest(valid) {

  /** @type {boolean} */
  var not;
  /** @type {!RegExp} */
  var re;

  if (!valid) {
    /**
     * @return {boolean}
     */
    return function inSection() {
      return true;
    };
  }

  not = /^!/.test(valid);
  if (not) valid = valid.slice(1);
  re = new RegExp('^' + valid + '$');

  /**
   * @param {string} filepath
   * @return {boolean}
   */
  return function inSection(filepath) {

    /** @type {string} */
    var content;
    /** @type {string} */
    var section;

    content = getFile(filepath);
    section = content.replace(SECTION, '$1');
    return not
      ? !re.test(section)
      : re.test(section);
  };
}
