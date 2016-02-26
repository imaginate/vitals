/**
 * -----------------------------------------------------------------------------
 * ACT TASK HELPER: runTestCmd
 * -----------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2016 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Supporting Libraries:
 * @see [log-ocd]{@link https://github.com/imaginate/log-ocd}
 *
 * Annotations:
 * @see [JSDoc3](http://usejsdoc.org)
 * @see [Closure Compiler JSDoc Syntax](https://developers.google.com/closure/compiler/docs/js-for-compiler)
 */

'use strict';

var is = require('./is');
var cp = require('child_process');
var log = require('log-ocd')();
var Mocha = require('mocha');
var getFile = require('./get-file');
var getFiles = require('./get-filepaths');
var newTestCmd = require('./new-test-cmd');

var SETUP = '../../test/setup';
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

  /** @type {function(string): boolean} */
  var inSection;
  /** @type {!Mocha} */
  var mocha;
  /** @type {!Array} */
  var files;
  /** @type {string} */
  var file;
  /** @type {!TestCmd} */
  var cmd;
  /** @type {number} */
  var len;
  /** @type {number} */
  var i;

  cmd = newTestCmd(opts);

  cmd.start();

  require(SETUP);

  mocha = new Mocha();
  mocha.slow(cmd.slow);
  mocha.reporter(cmd.report);
  mocha.ui('vitals');

  require(slashDir(SETUP) + cmd.setup);

  if (cmd.dir) {
    inSection = mkSectionTest(cmd.section);
    files = getFiles(cmd.test, true);
    len = files.length;
    i = -1;
    while (++i) {
      file = cmd.test + files[i];
      if ( inSection(file) ) mocha.addFile(file);
    }
  }
  else mocha.addFile(cmd.test);

  try {
    mocha.run(cmd.close);
  }
  catch (err) {
    err.name = err.name || 'Error';
    err.name = 'Internal `test` ' + err.name;
    log.error(err);
  }
};

/**
 * @private
 * @param {string} validSection
 * @return {function}
 */
function mkSectionTest(validSection) {

  return validSection
    ? inSection
    : function anySection(){ return true; };

  /**
   * @private
   * @param {string} filepath
   * @return {boolean}
   */
  function inSection(filepath) {

    /** @type {string} */
    var content;
    /** @type {string} */
    var section;

    content = getFile(filepath);
    section = content.replace(SECTION, '$1');
    return section === validSection;
  }
}

/**
 * @private
 * @param {string} dirpath
 * @return {string}
 */
function slashDir(dirpath) {
  return dirpath.replace(/[^\/]$/, '$&/');
}
