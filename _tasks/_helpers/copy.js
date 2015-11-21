/**
 * -----------------------------------------------------------------------------
 * COPY LIBRARY
 * -----------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2015 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Supporting Libraries:
 * @see [are]{@link https://github.com/imaginate/are}
 *
 * Annotations:
 * @see [JSDoc3]{@link http://usejsdoc.org/}
 * @see [Closure Compiler specific JSDoc]{@link https://developers.google.com/closure/compiler/docs/js-for-compiler}
 */

'use strict';

// append global helpers if they do not exist
if (!global.__basics) require('./basics');

/** @type {!Object} */
var retrieve = global.retrieve || require('./retrieve');
/** @type {function} */
var toFile = global.toFile || require('./to-file');
/** @type {!Object} */
var fs = require('fs');


////////////////////////////////////////////////////////////////////////////////
// DEFINE COPY METHODS
////////////////////////////////////////////////////////////////////////////////

/**
 * @public
 * @param {string} source
 * @param {string} dest
 * @param {boolean=} deep - If source and dest are directories deep will copy
 *   all of the sub-directories if set to true.
 */
function copy(source, dest, deep) {

  if ( !is('bool=', deep) ) log.error(
    'Invalid `helpers.copy` Call',
    'invalid type for `deep` param',
    { argMap: true, source: source, dest: dest, deep: deep }
  );

  if ( is.dir(source) ) {
    if ( !is.dir(dest) ) log.error(
      'Invalid `helpers.copy` Call',
      'invalid `dest` param (for directory `source` a `dest` must be a ' +
        'string with a valid path to a directory)',
      { argMap: true, source: source, dest: dest }
    );
    copyDir(source, dest, deep);
    return;
  }

  if ( !is.file(source) ) log.error(
    'Invalid `helpers.copy` Call',
    'invalid `source` param (must be a string with a valid path to a file or ' +
      'directory)',
    { argMap: true, source: source, dest: dest }
  );

  if ( !is.str(dest) ) log.error(
    'Invalid `helpers.copy` Call',
    'invalid type for `dest` param',
    { argMap: true, source: source, dest: dest }
  );

  if ( is.dir(dest) ) {
    dest = dest.replace(/[^\/]$/, '$&/') + source.replace(/^.*\//, '');
  }

  copyFile(source, dest);
}

/**
 * @public
 * @param {string} source
 * @param {string} dest
 */
copy.file = function(source, dest) {

  if ( !is.file(source) ) log.error(
    'Invalid `helpers.copy.file` Call',
    'invalid `source` param (must be a string with a valid path to a file)',
    { argMap: true, source: source }
  );

  if ( !is.str(dest) ) log.error(
    'Invalid `helpers.copy.file` Call',
    'invalid type for `dest` param',
    { argMap: true, source: source, dest: dest }
  );

  if ( is.dir(dest) ) {
    dest = dest.replace(/[^\/]$/, '$&/') + source.replace(/^.*\//, '');
  }

  copyFile(source, dest);
};

/**
 * @public
 * @param {string} source
 * @param {string} dest
 * @param {boolean=} deep - copy all of the sub-directories
 */
copy.dir = function(source, dest, deep) {

  if ( !is.dir(source) ) log.error(
    'Invalid `helpers.copy.dir` Call',
    'invalid `source` param (must be a string with a valid path to a ' +
      'directory)',
    { argMap: true, source: source }
  );

  if ( !is.dir(dest) ) log.error(
    'Invalid `helpers.copy.dir` Call',
    'invalid `dest` param (must be a string with a valid path to a directory)',
    { argMap: true, dest: dest }
  );

  if ( !is('bool=', deep) ) log.error(
    'Invalid `helpers.copy.dir` Call',
    'invalid type for `deep` param',
    { argMap: true, source: source, dest: dest, deep: deep }
  );

  copyDir(source, dest, deep);
};

/**
 * @public
 * @param {string} source
 * @param {string} dest
 * @param {boolean=} deep - copy all of the sub-directories and their files
 * @param {Object=} options
 * @param {?(RegExp|Array<string>|string)=} options.validDirs
 * @param {?(RegExp|Array<string>|string)=} options.validExts - [.]ext
 * @param {?(RegExp|Array<string>|string)=} options.validNames - filename
 * @param {?(RegExp|Array<string>|string)=} options.validFiles - filename.ext
 * @param {?(RegExp|Array<string>|string)=} options.invalidDirs
 * @param {?(RegExp|Array<string>|string)=} options.invalidExts - [.]ext
 * @param {?(RegExp|Array<string>|string)=} options.invalidNames - filename
 * @param {?(RegExp|Array<string>|string)=} options.invalidFiles - filename.ext
 * @param {boolean=} options.deep
 */
copy.files = function(source, dest, deep, options) {

  if ( !is.dir(source) ) log.error(
    'Invalid `helpers.copy.files` Call',
    'invalid `source` param (must be a string with a valid path to a ' +
      'directory)',
    { argMap: true, source: source }
  );

  if ( !is.dir(dest) ) log.error(
    'Invalid `helpers.copy.files` Call',
    'invalid `dest` param (must be a string with a valid path to a directory)',
    { argMap: true, dest: dest }
  );

  if ( arguments.length === 3 && is('obj', deep) ) {
    options = deep;
    deep = undefined;
  }

  if ( !is('bool=', deep) ) log.error(
    'Invalid `helpers.copy.files` Call',
    'invalid type for `deep` param',
    { argMap: true, source: source, deep: deep }
  );

  if ( !is('obj=', options) ) log.error(
    'Invalid `helpers.copy.files` Call',
    'invalid type for `options` param',
    { argMap: true, source: source, options: options }
  );

  deep = deep || !options ? deep : options.deep;
  copyDir(source, dest, deep, options);
};


////////////////////////////////////////////////////////////////////////////////
// EXPORT LIBRARY
////////////////////////////////////////////////////////////////////////////////

module.exports = copy;


////////////////////////////////////////////////////////////////////////////////
// PRIVATE HELPERS - MAIN
////////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @param {string} source
 * @param {string} dest
 */
function copyFile(source, dest) {

  /** @type {string} */
  var contents;

  contents = retrieve.file(source)
  contents = contents.replace(/\r\n?/g, '\n'); // normalize line breaks
  toFile(contents, dest);
}

/**
 * @private
 * @param {string} source
 * @param {string} dest
 * @param {boolean=} deep
 * @param {Object=} options
 */
function copyDir(source, dest, deep, options) {

  /** @type {!Array} */
  var filepaths;
  /** @type {!Array} */
  var dirpaths;

  source = source.replace(/[^\/]$/, '$&/');
  dest = dest.replace(/[^\/]$/, '$&/');
  options = options || {};
  options.deep = deep || options.deep;

  // create all missing directories before copying the files
  if (options.deep) {
    dirpaths = retrieve.dirpaths(source, options);
    each(dirpaths, function(dirpath) {
      dirpath = dest + dirpath;
      if ( !is.dir(dirpath) ) fs.mkdirSync(dirpath);
    });
  }

  filepaths = retrieve.filepaths(source, options);
  each(filepaths, function(filepath) {
    copyFile(source + filepath, dest + filepath);
  });
}
