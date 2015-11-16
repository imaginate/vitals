/**
 * -----------------------------------------------------------------------------
 * RETRIEVE - FILE SYSTEM HELPERS
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
var fs = require('fs');


////////////////////////////////////////////////////////////////////////////////
// EXPORT LIBRARY
////////////////////////////////////////////////////////////////////////////////

module.exports = retrieve;


////////////////////////////////////////////////////////////////////////////////
// DEFINE RETRIEVE METHODS
////////////////////////////////////////////////////////////////////////////////

/**
 * @public
 * @param {string} filepath
 * @return {!Buffer}
 */
function retrieve(filepath) {

  if ( !is.file(filepath) ) log.error(
    'Invalid `helpers.retrieve` Call',
    'invalid `filepath` param (must be a string with a valid path to a file)',
    { argMap: true, filepath: filepath }
  );

  return fs.readFileSync(filepath);
}

/**
 * @public
 * @param {string} dirpath
 * @param {Object=} options
 * @param {?(RegExp|Array<string>|string)=} options.validDirs
 * @param {?(RegExp|Array<string>|string)=} options.invalidDirs
 * @param {boolean=} deep - get all of the sub-directories
 * @return {!Array<string>}
 */
retrieve.dirpaths = function(dirpath, options, deep) {

  /** @type {function(string): boolean} */
  var isValid;
  /** @type {*} */
  var temp;

  if ( !is.dir(dirpath) ) log.error(
    'Invalid `helpers.retrieve.dirpaths` Call',
    'invalid `dirpath` param (must be a string with a valid path to a ' +
      'directory)',
    { argMap: true, dirpath: dirpath }
  );

  switch (arguments.length) {
    case 2:
    if ( is.bool(options) ) {
      deep = options;
      options = undefined;
    }
    break;
    case 3:
    if ( is('bool=', options) && is('obj=', deep) ) {
      temp = deep;
      deep = options;
      options = temp;
    }
  }

  if ( !is('obj=', options) ) log.error(
    'Invalid `helpers.retrieve.dirpaths` Call',
    'invalid type for `options` param',
    { argMap: true, dirpath: dirpath, options: options }
  );

  if ( !is('bool=', deep) ) log.error(
    'Invalid `helpers.retrieve.dirpaths` Call',
    'invalid type for `deep` param',
    { argMap: true, dirpath: dirpath, deep: deep }
  );

  dirpath = dirpath.replace(/[^\/]$/, '$&/');
  options = parseOptions(options);
  isValid = makeTest(options.validDirs, options.invalidDirs);

  return deep || options.deep
    ? getDirpathsDeep(dirpath, isValid)
    : getDirpaths(dirpath, isValid);
};

/**
 * @public
 * @param {string} dirpath
 * @param {Object=} options
 * @param {?(RegExp|Array<string>|string)=} options.validDirs
 * @param {?(RegExp|Array<string>|string)=} options.validExts - [.]ext
 * @param {?(RegExp|Array<string>|string)=} options.validNames - filename
 * @param {?(RegExp|Array<string>|string)=} options.validFiles - filename.ext
 * @param {?(RegExp|Array<string>|string)=} options.invalidDirs
 * @param {?(RegExp|Array<string>|string)=} options.invalidExts - [.]ext
 * @param {?(RegExp|Array<string>|string)=} options.invalidNames - filename
 * @param {?(RegExp|Array<string>|string)=} options.invalidFiles - filename.ext
 * @param {boolean=} deep - get all of the sub-directory files
 * @return {!Array<string>}
 */
retrieve.filepaths = function(dirpath, options, deep) {

  /** @type {function(string): boolean} */
  var isValidDir;
  /** @type {function(string): boolean} */
  var isValid;
  /** @type {!Array} */
  var invalid;
  /** @type {!Array} */
  var valid;
  /** @type {*} */
  var temp;

  if ( !is.dir(dirpath) ) log.error(
    'Invalid `helpers.retrieve.filepaths` Call',
    'invalid `dirpath` param (must be a string with a valid path to a ' +
      'directory)',
    { argMap: true, dirpath: dirpath }
  );

  switch (arguments.length) {
    case 2:
    if ( is.bool(options) ) {
      deep = options;
      options = undefined;
    }
    break;
    case 3:
    if ( is('bool=', options) && is('obj=', deep) ) {
      temp = deep;
      deep = options;
      options = temp;
    }
  }

  if ( !is('obj=', options) ) log.error(
    'Invalid `helpers.retrieve.filepaths` Call',
    'invalid type for `options` param',
    { argMap: true, dirpath: dirpath, options: options }
  );

  if ( !is('bool=', deep) ) log.error(
    'Invalid `helpers.retrieve.filepaths` Call',
    'invalid type for `deep` param',
    { argMap: true, dirpath: dirpath, deep: deep }
  );

  dirpath = dirpath.replace(/[^\/]$/, '$&/');
  options = parseOptions(options);
  deep = deep || options.deep;

  valid   = [ options.validExts,   options.validNames,   options.validFiles   ];
  invalid = [ options.invalidExts, options.invalidNames, options.invalidFiles ];
  isValid = makeTest(valid, invalid);

  isValidDir = deep && makeTest(options.validDirs, options.invalidDirs);

  return deep
    ? getFilepathsDeep(dirpath, isValid, isValidDir)
    : getFilepaths(dirpath, isValid);
};

/**
 * @public
 * @param {string} filepath
 * @param {Object=} options
 * @param {string=} options.encoding - [default= "utf8"]
 * @param {?string=} options.eol - [default= "LF"] The end of line character to
 *   use when normalizing the result. If options.eol is null no normalization is
 *   completed. Optional values: "LF", "CR", "CRLF"
 * @return {string}
 */
retrieve.file = function(filepath, options) {

  /** @type {string} */
  var encoding;
  /** @type {string} */
  var contents;
  /** @type {?string} */
  var eol;

  if ( !is.file(filepath) ) log.error(
    'Invalid `helpers.retrieve.file` Call',
    'invalid `filepath` param (must be a string with a valid path to a file)',
    { argMap: true, filepath: filepath }
  );

  if ( !is('obj=', options) ) log.error(
    'Invalid `helpers.retrieve.file` Call',
    'invalid type for `options` param',
    { argMap: true, filepath: filepath, options: options }
  );

  options = options || {};

  if ( !is('str=', options.encoding) ) log.error(
    'Invalid `helpers.retrieve.file` Call',
    'invalid type for `options.encoding` param',
    { argMap: true, filepath: filepath, options: options }
  );

  if ( !is('?str=', options.eol) ) log.error(
    'Invalid `helpers.retrieve.file` Call',
    'invalid type for `options.eol` param',
    { argMap: true, filepath: filepath, options: options }
  );

  eol = is.str(options.eol)
    ? options.eol.toUpperCase()
    : is.null(options.eol)
      ? null
      : 'LF';

  if ( eol && !has(EOL.chars, eol) ) log.error(
    'Invalid `helpers.retrieve.file` Call',
    'invalid `options.eol` param (valid: null, "LF", "CR", "CRLF")',
    { argMap: true, filepath: filepath, options: options }
  );

  encoding = options.encoding || 'utf8';

  try {
    contents = fs.readFileSync(filepath, encoding);
  }
  catch (err) {
    log.error('Failed `fs.readFileSync` in `retrieve.file` Call', err, {
      syscall: err.syscall,
      errno:   err.errno,
      code:    err.code
    });
  }

  return eol ? normalizeEOL(contents, eol) : contents;
};


////////////////////////////////////////////////////////////////////////////////
// PRIVATE HELPERS - NORMALIZE
////////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @type {!Object}
 * @const
 */
var EOL = {
  chars: {
    'CRLF': '\r\n',
    'CR':   '\r',
    'LF':   '\n'
  },
  find: {
    'CRLF': /\r?\n|\r\n?/g,
    'CR':   /\r?\n/g,
    'LF':   /\r\n?/g
  }
};

/**
 * @private
 * @param {string} str
 * @param {string=} eol
 * @return {string}
 */
function normalizeEOL(str, eol) {
  eol = eol || 'LF';
  return str.replace(EOL.find[eol], EOL.chars[eol]);
}


////////////////////////////////////////////////////////////////////////////////
// PRIVATE HELPERS - MAIN
////////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @param {string} basepath
 * @param {function(string): boolean} isValid
 * @return {!Array<string>}
 */
function getDirpaths(basepath, isValid) {
  return fs.readdirSync(basepath)
    .filter(function(dirpath) {
      return isValid(dirpath) && is.dir(basepath + dirpath);
    });
}

/**
 * @private
 * @param {string} basepath
 * @param {function(string): boolean} isValid
 * @return {!Array<string>}
 */
function getDirpathsDeep(basepath, isValid) {

  /** @type {!Array<string>} */
  var dirpaths;
  /** @type {!Array<string>} */
  var newpaths;
  /** @type {string} */
  var dirpath;
  /** @type {number} */
  var i;

  dirpaths = getDirpaths(basepath, isValid);
  i = -1;
  while (++i < dirpaths.length) {
    dirpath = dirpaths[i].replace(/[^\/]$/, '$&/');
    newpaths = getDirpaths(basepath + dirpath, isValid);
    newpaths = remap(newpaths, function(newpath) {
      return dirpath + newpath;
    });
    dirpaths = dirpaths.concat(newpaths);
  }
  return dirpaths;
}

/**
 * @private
 * @param {string} basepath
 * @param {function(string): boolean} isValid
 * @return {!Array<string>}
 */
function getFilepaths(basepath, isValid) {
  return fs.readdirSync(basepath)
    .filter(function(filepath) {
      return isValid(filepath) && is.file(basepath + filepath);
    });
}

/**
 * @private
 * @param {string} basepath
 * @param {function(string): boolean} isValid
 * @param {function(string): boolean} isValidDir
 * @return {!Array<string>}
 */
function getFilepathsDeep(basepath, isValid, isValidDir) {

  /** @type {!Array<string>} */
  var filepaths;
  /** @type {!Array<string>} */
  var dirpaths;
  /** @type {!Array<string>} */
  var newpaths;
  /** @type {number} */
  var i;

  filepaths = getFilepaths(basepath, isValid);
  dirpaths = getDirpathsDeep(basepath, isValidDir);
  each(dirpaths, function(dirpath) {
    dirpath = dirpath.replace(/[^\/]$/, '$&/');
    newpaths = getFilepaths(basepath + dirpath, isValid);
    newpaths = remap(newpaths, function(newpath) {
      return dirpath + newpath;
    });
    filepaths = filepaths.concat(newpaths);
  });
  return filepaths;
}


////////////////////////////////////////////////////////////////////////////////
// PRIVATE HELPERS - OPTION PARSING
////////////////////////////////////////////////////////////////////////////////

/**
 * The characters to escape for each new RegExp option.
 * @private
 * @type {!RegExp}
 * @const
 */
var ESCAPE_CHARS = /[\+\?\.\-\:\{\}\[\]\(\)\/\,\\\^\$\=\!]/g;

/**
 * @private
 * @param {Object=} options
 * @return {!Object}
 */
function parseOptions(options) {
  
  if (!options) return {};

  return remap(options, function(val, key) {
    key = has(key, 'valid') ? key : '';
    key = key.replace(/^(?:in)?valid([a-z]*)s$/i, '$1');
    key = key.toLowerCase();
    return key ? parseOption(val, key) : val;
  });
}

/**
 * @private
 * @param {?(RegExp|Array<string>|string|undefined)} option
 * @param {string} type
 * @return {?RegExp}
 */
function parseOption(option, type) {

  if ( is('null=', option) ) return null;

  if ( !is('!arr|str|regex', option) ) log.error(
    'Invalid `helpers.retrieve.`[`file`|`dir`]`paths` Call',
    'invalid `options` property (each valid/invalid property must be either ' +
    'null/undefined or an array, string, or RegExp)',
    { argMap: true, invalidProperty: option }
  );

  option = is.arr(option) ? option.join('|') : option;
  return is.str(option) ? parseOptStr(option) : option;
}

/**
 * @private
 * @param {string} option
 * @param {string} type
 * @return {!RegExp}
 */
function parseOptStr(option, type) {

  if ( type === 'ext' && has(option, /[^a-zA-Z\.\*\|]/) ) log.error(
    'Invalid `helpers.retrieve.filepaths` Call',
    'invalid `options` property (`validExts` and `invalidExts` may only ' +
    'contain letters, periods, and asterisks)',
    { argMap: true, invalidProperty: option }
  );

  option = option.replace(ESCAPE_CHARS, '\\$&');
  option = option.replace(/\\?\*/g, '.*');
  switch (type) {
    case 'dir':  option = '^(?:' + option + ')$';             break;
    case 'name': option = '^(?:' + option + ')\\.[a-z]{2,}$'; break;
    case 'file': option = '^(?:' + option + ')$';             break;
    case 'ext':  option = '^.*\\.(?:' + option.replace(/\\?\./g, '') + ')$';
  }
  return new RegExp(option, 'i');
}


////////////////////////////////////////////////////////////////////////////////
// PRIVATE HELPERS - TEST FACTORIES
////////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @param {(Array|RegExp)} valid
 * @param {(Array|RegExp)} invalid
 * @return {function}
 */
function makeTest(valid, invalid) {

  /** @type {function(string): boolean} */
  var isInvalid;
  /** @type {function(string): boolean} */
  var isValid;

  isInvalid = makeCheck(false, invalid);
  isValid = makeCheck(true, valid);
  return function isValidPath(str) {
    return isInvalid(str) ? false : isValid(str);
  };
}

/**
 * @private
 * @param {boolean} valid
 * @param {(Array|RegExp)} regexs
 * @return {function}
 */
function makeCheck(valid, regexs) {

  /** @type {?RegExp} */
  var regex;

  if ( is.arr(regexs) ) {
    regexs = regexs.filter( function(re) { return !!re; } );
    regex = regexs.length === 1 ? regexs.pop() : null;
  }
  else {
    regex = regexs;
    regexs = [];
  }

  if (!regexs.length) {
    return regex
      ? valid
        ? function isValid(str) { return regex.test(str); }
        : function isInvalid(str) { return regex.test(str); }
      : valid
        ? function isValid() { return true; }
        : function isInvalid() { return false; };
  }

  return valid
    ? function isValid(str) {
        return regexs.every( function(re) { return re.test(str); } );
      }
    : function isInvalid(str) {
        return regexs.some( function(re) { return re.test(str); } );
      };
}
