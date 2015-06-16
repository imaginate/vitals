/**
 * -----------------------------------------------------------------------------
 * Vitals.js - CLI Command (make)
 * -----------------------------------------------------------------------------
 * @file Handles the 'make' command-line command for Vitals.js. Note: Java
 *   Runtime Environment version 7 is required before running this command.
 * @version 2.0.0
 * @author Adam Smith adamsmith@algorithmiv.com
 * @copyright 2015 Adam A Smith [github.com/imaginate]{@link https://github.com/imaginate}
 * @license The Apache License [algorithmiv.com/vitals/license]{@link http://www.algorithmiv.com/vitals/license}
 * // Cure.js Annotations:
 * @see [JSDoc3]{@link http://usejsdoc.org/}
 * @see [Closure Compiler specific JSDoc]{@link https://developers.google.com/closure/compiler/docs/js-for-compiler}
 */

'use strict';

////////////////////////////////////////////////////////////////////////////////
// ShellJS
////////////////////////////////////////////////////////////////////////////////
// Global Shell Helpers
// @description
//   cat(file|file_array[, file...]): file_string|files_concat_string
//   cd(dir): undefined
//   chmod(octal_mode|symbolic_mode, file): undefined OPTS -v -c -R
//   config === { silent: boolean, fatal: boolean } (get and set allowed)
//     @default { silent: false, fatal: false }
//   cp([options, ]source|source_array[, source...], dest): undefined OPTS -f -r
//   dirs([options|'-Nth'|'+Nth']): path_string|dir_path_strings_array OPTS -c
//   echo(string[, string...]): printed_string
//   env === process.env (get and set allowed)
//   error(): null|error_string
//   exec(command[, options][, callback]):
//     sync returns: { code: exit_code_string, output: stdout_stderr_string }
//     async returns: child_process_object
//     OPTS { async: boolean, silent: boolean }
//     OPTS @default { async: false, silent: false }
//   exit(code): undefined
//   find(path|path_array[, path...]): filepath_filename_string_array
//   grep([options, ]search_regex, file|file_array[, file...]):
//     matched_lines_string OPTS -v
//   ln([options, ]source, dest): undefined OPTS -s -f
//   ls([options, ]path|path_array[, path...]): filename_string_array OPTS -R -A
//   mkdir(options, ]dir|dir_array[, dir...]): undefined OPTS -p
//   mv([options, ]source|source_array[, source...]): undefined OPTS -f
//   popd([options, ]['-Nth'|'+Nth']): dir_path_strings_array OPTS -n
//   process(): undefined
//   pushd([options, ][dir|'-Nth'|'+Nth']): dir_path_strings_array OPTS -n
//   pwd(): current_dir_string
//   rm([options, ]file|file_array[, file...]): undefined OPTS -f -r
//   sed([options, ]search_regex, replacement, file): new_file_string OPTS -i
//   tempdir(): current_platform_temp_dir_string
//   test(option, path): boolean OPTS -b -c -d -e -f -L -p -S
//     test is true if path [-b is block device] [-c is character device]
//                          [-d is directory] [-e exists] [-f is regular file]
//                          [-L is symbolic link] [-p is pipe] [-S is socket]
//   to - String.prototype.to(file): undefined
//   toEnd - String.prototype.toEnd(file): undefined
//   which(command): command_path_string

/** @type {string} */
var errorMsg;

try {
  require('shelljs/global');
  config.silent = true;
}
catch (err) {
  errorMsg = 'ShellJS is not installed.' + (err && ' "' + err.toString() + '"');
  console.error(errorMsg);
  process.exit(1);
}

////////////////////////////////////////////////////////////////////////////////
// MAKE CUSTOM BUILD
////////////////////////////////////////////////////////////////////////////////
// The CLI Make Command
// @example
//   // MAKE SRC FILES
//   $ node make src
//   
//   // MAKES TESTS FILE
//   $ node make test

/** @type {function(string): boolean} */
var isSrc;
/** @type {function(string): boolean} */
var isTest;
/** @type {string} */
var arg;

isSrc = (function setup_isSrc(/** !RegExp */ srcs) {
  return function isSrc(str) {
    return srcs.test(str);
  };
})(/^src$/i);

isTest = (function setup_isTest(/** !RegExp */ tests) {
  return function isTest(str) {
    return tests.test(str);
  };
})(/^tests?$/i);

arg = process.argv[2];

if ( !arg || ( !isSrc(arg) && !isTest(arg) ) ) {
  errorMsg = 'Invalid make command. Valid format: "node make src|test"';
  console.error(errorMsg);
  process.exit(1);
}

try {
  parseCmd(arg);
}
catch (err) {
  errorMsg = (err) ? err.toString() : error();
  console.error('Make Error: ' + errorMsg);
  process.exit(1);
}

/**
 * Parse the arguments for the make command.
 * @param {string} arg - The command's argument.
 */
function parseCmd(arg) {
  compileScript( isSrc(arg) );
}

/**
 * Compiles the src files for Vitals.js.
 * @param {boolean} makeSrc
 */
function compileScript(makeSrc) {

  /** @type {string} */
  var dest;
  /** @type {!Array<!Object<string, string>>} */
  var parts;

  dest = (makeSrc) ? 'src' : 'test';
  dest += '/vitals.js';
  parts = [
    {
      dir: '',
      parts: 'stabilize-env export module-vars'
    },
    {
      dir: 'js-methods',
      parts: 'feature-detect helpers checkType isValidTypeString ' +
             'checkArgs getTypeOf copyObj freezeObj hasOwnProp'
    },
    {
      dir: 'dom-methods',
      parts: 'feature-detect helpers getElemById getElemByClass getElemByTag ' +
             'getElemsByClass getElemsByTag setElemText addElemText makeElem'
    },
    {
      dir: 'master-methods',
      parts: 'set reset'
    }
  ];

  cd(__dirname);
  cp('-f', 'dev/skeleton.js', dest);
  fixLineBreaks(dest, true);
  parts.forEach(function(/** !Object */ part) {
    insertScripts(part.dir, part.parts, dest);
  });

  makeSrc && minifySrc(dest);
  makeSrc || makeOnlyJs(dest, 'test/vitals-only-js.js');
}

/**
 * Creates the minified versions of Vitals.js.
 * @param {string} file
 */
function minifySrc(file) {

  /** @type {string} */
  var dest;

  dest = 'src/vitals.min.js';
  cp('-f', file, dest);
  minifyScript(dest);

  dest = 'src/vitals-only-js.min.js';
  makeOnlyJs(file, dest);
  minifyScript(dest);

  dest = 'src/vitals-only-dom.min.js';
  makeOnlyDom(file, dest);
  minifyScript(dest);
}

/**
 * Copies a file and removes all sections except JS from it.
 * @param {string} file
 * @param {string} dest
 */
function makeOnlyJs(file, dest) {

  /** @type {!RegExp} */
  var regex;

  cp('-f', file, dest);
  regex = /\n\/\/\sThe\sDOM\sShortcuts.*\n\/{5,}\n[\s\S]*?\n\/{5,}\n/; 
  removeScript(dest, regex, '\n');
}

/**
 * Copies a file and removes all sections except DOM from it.
 * @param {string} file
 * @param {string} dest
 */
function makeOnlyDom(file, dest) {

  /** @type {!RegExp} */
  var regex;

  cp('-f', file, dest);
  regex = /\n\/\/\sThe\sJS\sShortcuts.*\n\/{5,}\n[\s\S]*?\n\/{5,}\n/; 
  removeScript(dest, regex);
}

/**
 * Minifies a compiled script.
 * @param {string} file
 */
function minifyScript(file) {

  /** @type {!RegExp} */
  var regex;
  /** @type {string} */
  var compiler;

  // Remove intro & cure.js (dev/stabilize-env.js)
  regex = /\n\/\/JS\s\&\sDOM\sEnvironment\sStabiliz.*\n\/*\n[\s\S]*?\n\/{5,}\n/;
  removeScript(file, /^(.*\n\n)[\s\S]*?\*\/\n/, '$1');
  removeScript(file, regex);

  // Minify the file
  compiler = 'resources/closure-compiler.jar';
  exec('java -jar "' + compiler + '" --js "' + file + '"').output.to(file);
  fixLineBreaks(file, true);

  // Add the copyright & cure.js (dev/stabilize-env.js)
  regex = /^[\s\S]*?blank-line.*\n/;
  insertScript('resources/minified-copyright.txt', regex, file);
  insertScript('dev/stabilize-env.js', /^\n/, file);
  sed('-i', /^\n/, '', file);
}

/**
 * Standardize all line breaks in a file.
 * @param {string} file - The file to standardize.
 * @param {boolean=} inplace - Replace the file's contents.
 * @return {string} The fixed file's contents.
 */
function fixLineBreaks(file, inplace) {

  /** @type {!RegExp} */
  var regex;
  /** @type {string} */
  var fileStr;

  regex = /\r\n?/g;
  fileStr = cat(file).replace(regex, '\n');
  inplace && fileStr.to(file);
  return fileStr;
}

/**
 * Inserts multiple sections for Vitals.js compiling.
 * @param {string} dir - The directory for the insertion files.
 * @param {!Array<string>} parts - The sections to insert.
 * @param {string} dest - The file to insert into.
 */
function insertScripts(dir, parts, dest) {

  /** @type {string} */
  var regexStr;
  /** @type {!RegExp} */
  var regex;
  /** @type {string} */
  var file;

  regexStr = '\\n\\/\\/\\sinsert-' + (dir && dir + '-');
  dir = 'dev/' + (dir && dir + '/');
  parts.split(' ').forEach(function(/** string */ part) {
    regex = new RegExp(regexStr + part + '.*\\n');
    file = '\n' + fixLineBreaks(dir + part + '.js');
    sed('-i', regex, file, dest);
  });
}

/**
 * Inserts one section for Vitals.js compiling.
 * @param {string} file - The file to insert.
 * @param {!RegExp} regex - The RegExp used to identify the spot to insert.
 * @param {string} dest - The file to insert into.
 */
function insertScript(file, regex, dest) {
  file = fixLineBreaks(file);
  cat(dest).replace(regex, file).to(dest);
}

/**
 * Removes a section from a file.
 * @param {string} file - The file to remove from.
 * @param {!RegExp} remove - The section to remove.
 * @param {string=} replace - Contents to replace the section with.
 */
function removeScript(file, remove, replace) {
  replace = replace || '';
  sed('-i', remove, replace, file);
}

/**
 * Removes unused parts from a compiled Vitals.js file.
 * @param {string} file - The file to clean.
 * @param {boolean=} inplace - Replace the file's contents.
 * @return {string} The cleaned file's contents.
 */
function cleanScript(file, inplace) {

  /** @type {!RegExp} */
  var regex;
  /** @type {string} */
  var fileStr;

  regex = /\n\n\/\*[\s\S]*?\*\/\n\/\/\sinsert-.*\n/g;
  fileStr = cat(file).replace(regex, '');
  inplace && fileStr.to(file);
  return fileStr;
}