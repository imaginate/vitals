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

////////////////////////////////////////////////////////////////////////////////
// TYPEDEFS
////////////////////////////////////////////////////////////////////////////////

/**
 * @typedef {function} TestCmdMethod
 */

/**
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

////////////////////////////////////////////////////////////////////////////////
// CONSTANTS
////////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @const {!Object<string, function>}
 */
var CP = require('child_process');

/**
 * @private
 * @const {!Object<string, function>}
 */
var IS = require('./is.js');

/**
 * @private
 * @const {!Object<string, function>}
 */
var LOG = require('log-ocd')();

/**
 * @private
 * @const {!RegExp}
 */
var NOT = /^!/;

/**
 * @private
 * @const {!RegExp}
 */
var SECTION = /^[\s\S]+?@section ([a-zA-Z-]+)[\s\S]+$/;

////////////////////////////////////////////////////////////////////////////////
// HELPERS
////////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @param {(string|!Error)} header
 * @param {(string|!Error)=} msg
 * @param {...*} val
 * @return {boolean}
 */
var err = LOG.error;

err.setConfig({
  'header': true,
  'throw': false,
  'exit': true,
  'msg': true
});

/**
 * @private
 * @param {string} filepath
 * @param {boolean=} buffer
 * @return {(!Buffer|string)}
 */
var getFileContent = require('./get-file-content.js');

/**
 * @private
 * @param {string} dirpath
 * @param {?Object|boolean=} opts
 *   If a `boolean` then it is `opts.deep`.
 * @param {?boolean=} opts.deep = `false`
 *   Make a recursive search for valid filenames.
 * @param {?boolean=} opts.full = `false`
 *   Return absolute filepaths instead of relative.
 * @param {?RegExp=} opts.valid
 *   An alias for `opts.validFiles`.
 * @param {?RegExp=} opts.invalid
 *   An alias for `opts.invalidFiles`.
 * @param {?RegExp=} opts.validFiles = `null`
 *   A pattern for matching valid filenames. If `null` is given then no check is
 *   performed.
 * @param {?RegExp=} opts.invalidFiles = `null`
 *   A pattern for matching invalid filenames. If `null` is given then no check
 *   is performed.
 * @param {?RegExp=} opts.validDirs = `null`
 *   Only used when `opts.deep` is `true`. A pattern for matching valid dirnames.
 *   If `null` is given then no check is performed.
 * @param {?RegExp=} opts.invalidDirs = `/^\.git|\.bak|node_modules|vendor|tmp|logs?$/`
 *   Only used when `opts.deep` is `true`. A pattern for matching invalid
 *   dirnames. If `null` is given then no check is performed.
 * @return {!Array<string>}
 */
var getFilepaths = require('./get-filepaths.js');

/**
 * @private
 * @param {number} val1
 * @param {number} val2
 * @return {boolean}
 */
var isLT = IS.lessThan;

/**
 * @private
 * @param {(!Array<string>|...string)=} path
 * @return {string}
 */
var resolvePath = require('./resolve-path.js');

/**
 * @private
 * @param {string} cmd
 * @param {!Array<string>=} args = `[]`
 * @param {!Object=} opts
 * @param {string=} opts.cwd
 * @param {!Object=} opts.env
 * @param {string=} opts.argv0
 * @param {(!Array<string>|string)=} opts.stdio
 * @param {boolean=} opts.detached
 * @param {number=} opts.uid
 * @param {number=} opts.gid
 * @param {(boolean|string)=} opts.shell
 * @return {!ChildProcess}
 */
var spawnChild = CP.spawn;

////////////////////////////////////////////////////////////////////////////////
// CONSTANTS
////////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @const {string}
 */
var HELP_DIR = resolvePath(__dirname);

////////////////////////////////////////////////////////////////////////////////
// METHODS
////////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @param {string} valid
 *   The valid section(s).
 * @return {function(string): boolean}
 */
function mkSectionTest(valid) {

  /** @type {!RegExp} */
  var pattern;
  /** @type {boolean} */
  var not;

  if (!valid)
    return function inSection(filepath) {
      return true;
    };

  not = NOT.test(valid);
  if (not)
    valid = valid.slice(1);
  pattern = new RegExp('^' + valid + '$');
  return function inSection(filepath) {

    /** @type {string} */
    var content;
    /** @type {string} */
    var section;

    content = getFileContent(filepath);
    section = content.replace(SECTION, '$1');
    return not
      ? !pattern.test(section)
      : pattern.test(section);
  };
}

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

  if (!deep)
    return [ base ];

  inSection = mkSectionTest(section);
  allFiles = getFilepaths(base, {
    deep: true,
    full: true
  });
  files = [];

  len = allFiles.length;
  i = -1;
  while ( isLT(++i, len) ) {
    file = allFiles[i];
    if ( inSection(file) )
      files.push(file);
  }
  return files;
}

/**
 * @private
 * @param {(?Object|TestCmd)} opts
 * @param {?TestCmdMethod=} opts.start = `null`
 * @param {?TestCmdMethod=} opts.close = `null`
 * @param {string=} opts.reporter = `"specky"`
 * @param {number=} opts.slow = `5`
 * @param {string=} opts.setup = `"methods"`
 * @param {string=} opts.method = `""`
 *   Test only a specific method.
 * @param {string=} opts.section = `""`
 *   Test only a specific section.
 * @param {string=} opts.submethod = `""`
 *   Test only a specific submethod.
 * @return {!TestCmd}
 */
var newTestCmd = require('./new-test-cmd.js');

////////////////////////////////////////////////////////////////////////////////
// EXPORTS
////////////////////////////////////////////////////////////////////////////////

/**
 * @public
 * @param {(?Object|TestCmd)} opts
 * @param {?TestCmdMethod=} opts.start = `null`
 * @param {?TestCmdMethod=} opts.close = `null`
 * @param {string=} opts.reporter = `"specky"`
 * @param {number=} opts.slow = `5`
 * @param {string=} opts.setup = `"methods"`
 * @param {string=} opts.method = `""`
 *   Test only a specific method.
 * @param {string=} opts.section = `""`
 *   Test only a specific section.
 * @param {string=} opts.submethod = `""`
 *   Test only a specific submethod.
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
    resolvePath(HELP_DIR, 'test-module.js'),
    cmd.report,
    cmd.slow,
    cmd.setup
  ];
  args = args.concat(files);
  opts = { 'stdio': 'inherit' };

  cmd.start();

  try {
    child = spawnChild('node', args, opts);
  }
  catch (error) {
    error.name = error.name || 'Error';
    error.name = 'Internal `test` ' + error.name;
    err(error);
  }

  child.on('close', cmd.close);
};
