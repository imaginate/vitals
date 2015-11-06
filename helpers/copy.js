/**
 * -----------------------------------------------------------------------------
 * COPY LIBRARY
 * -----------------------------------------------------------------------------
 * @file A wrapper for the ShellJS cp method.
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2015 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Supporting Libraries:
 * @see [are]{@link https://github.com/imaginate/are}
 * @see [ShellJS]{@link https://github.com/shelljs/shelljs}
 *
 * Annotations:
 * @see [JSDoc3]{@link http://usejsdoc.org/}
 * @see [Closure Compiler specific JSDoc]{@link https://developers.google.com/closure/compiler/docs/js-for-compiler}
 */

'use strict';

/** @type {!Object} */
var shell = require('shelljs');


////////////////////////////////////////////////////////////////////////////////
// DEFINE MAIN FUNCTION
////////////////////////////////////////////////////////////////////////////////

/**
 * @param {(string|!Array<string>)} source
 * @param {string} dest
 * @param {Object=} options [default= null]
 * @param {boolean=} options.force [default= true]
 * @param {boolean=} options.recursive [default= false]
 */
var Copy = function(source, dest, options) {

  /** @type {string} */
  var flags;

  is('!string|strings', source) || log.error(
    'Invalid `Copy` Call',
    'invalid type for `source` param', 
    { argMap: true, source: source }
  );

  is.str(dest) || log.error(
    'Invalid `Copy` Call',
    'invalid type for `dest` param',
    { argMap: true, dest: dest }
  );

  options = is.obj(options) ? options : {};
  flags = options.force === false ? '' : 'f';
  flags += options.recursive === true ? 'r' : '';

  flags ? shell.cp('-' + flags, source, dest) : shell.cp(source, dest);
};


////////////////////////////////////////////////////////////////////////////////
// DEFINE OTHER FUNCTIONS
////////////////////////////////////////////////////////////////////////////////

/**
 * @param {string} source
 * @param {string} dest
 * @param {boolean=} force [default= true]
 */
Copy.file = function(source, dest, force) {

  is.file(source) || log.error(
    'Invalid `Copy.file` Call',
    'invalid `source` param (must be a valid filepath)',
    { argMap: true, source: source }
  );

  is.str(dest) || log.error(
    'Invalid `Copy.file` Call',
    'invalid type for `dest` param',
    { argMap: true, dest: dest }
  );

  force === false ? shell.cp(source, dest) : shell.cp('-f', source, dest);
};

/**
 * @param {string} source
 * @param {string} dest
 * @param {boolean=} force [default= true]
 */
Copy.dir = function(source, dest, force) {

  is.dir(source) || log.error(
    'Invalid `Copy.dir` Call',
    'invalid `source` param (must be a valid dirpath)',
    { argMap: true, source: source }
  );

  is.dir(dest) || log.error(
    'Invalid `Copy.dir` Call',
    'invalid `dest` param (must be a valid dirpath)',
    { argMap: true, dest: dest }
  );

  source = source.replace(/([^\/])\/?$/, '$1/*');
  dest = dest.replace(/([^\/])\/$/, '$1');
  force === false ? shell.cp('-r', source, dest) : shell.cp('-Rf', source,dest);
};


////////////////////////////////////////////////////////////////////////////////
// EXPORT LIBRARY
////////////////////////////////////////////////////////////////////////////////

module.exports = Copy;
