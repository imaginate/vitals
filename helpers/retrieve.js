/**
 * -----------------------------------------------------------------------------
 * RETRIEVE LIBRARY
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

/** @type {!Regex} */
var Regex = require('./regex')( /([\+\?\.\-\:\{\}\[\]\(\)\/\,\\\^\$\=\!])/g );
/** @type {!Object} */
var fs = require('fs');


////////////////////////////////////////////////////////////////////////////////
// DEFINE EXPORTS OBJ
////////////////////////////////////////////////////////////////////////////////

/** @type {!Object<string, function>} */
var retrieve = {};


////////////////////////////////////////////////////////////////////////////////
// SET LIBRARY FUNCTIONS
////////////////////////////////////////////////////////////////////////////////

/**
 * @param {string} dirpath
 * @param {Object=} options [default= null]
 * @param {?(RegExp|Array<string>|string)=} options.validDirs
 * @param {?(RegExp|Array<string>|string)=} options.invalidDirs
 * @param {boolean=} deep - get all of the sub directories [default= false]
 * @return {!Array<string>}
 */
retrieve.dirpaths = function(dirpath, options, deep) {

  /** @type {RegExp} */
  var valid;
  /** @type {RegExp} */
  var invalid;

  if ( !is.dir(dirpath) ) log.error(
    'Invalid `helpers.retrieve.dirpaths` Call',
    'invalid `dirpath` param (must be a valid dirpath string)',
    { argMap: true, dirpath: dirpath }
  );

  if (arguments.length < 2)

  options = is.obj(options) ? options : {};
  valid   = options.validDirs;
  invalid = options.invalidDirs;

  if (options.pass !== true) {
    valid = is.arr(valid) ? valid.join('|') : valid;
    valid = is.str(valid) ? Regex.make(
      '^(?:' + Regex.escape(valid).replace(/\*/g, '.*') + ')$',
    'i') : valid;
    valid = is.regex(valid) ? valid : null;

    invalid = is.arr(invalid) ? invalid.join('|') : invalid;
    invalid = is.str(invalid) ? Regex.make(
      '^(?:' + Regex.escape(invalid).replace(/\*/g, '.*') + ')$',
    'i') : invalid;
    invalid = is.regex(invalid) ? invalid : null;
  }

  if (deep === true) {
    return Retrieve.dirpaths.deep(dirpath, {
      pass:        true,
      validDirs:   valid,
      invalidDirs: invalid
    });
  }

  dirpath = dirpath.replace(/([^\/])$/, '$1/');
  return fs.readdirSync(dirpath).filter(function(dir) {
    return (
      ( !valid   || valid.test(dir)    ) &&
      ( !invalid || !invalid.test(dir) ) &&
        is.dir(dirpath + dir)
    );
  });
};

/**
 * @param {string} dirpath
 * @param {Object=} options [default= null]
 * @param {?(RegExp|Array<string>|string)=} options.validDirs
 * @param {?(RegExp|Array<string>|string)=} options.invalidDirs
 * @return {!Array<string>}
 */
Retrieve.dirpaths.deep = function(dirpath, options) {

  /** @type {function(string, *): !Array<string>} */
  var get;
  /** @type {number} */
  var len;
  /** @type {!Array<string>} */
  var dirs;
  /** @type {!Array<string>} */
  var kids;

  get = Retrieve.dirpaths;
  dirpath = dirpath.replace(/([^\/])$/, '$1/');

  dirs = get(dirpath, options);
  kids = dirs;
  len = 0;
  while (kids.length) {
    kids = [];
    each(dirs, function(/** string */ dir, /** number */ i) {
      if (i >= len) {
        kids = kids.concat(
          get(dirpath + dir, options).map(function(/** string */ kid) {
            return dir + '/' + kid;
          })
        );
      }
    });
    len = dirs.length;
    dirs = dirs.concat(kids);
  }
  return dirs;
};

/**
 * @param {string} dirpath
 * @param {Object=} options [default= null]
 * @param {?(RegExp|Array<string>|string)=} options.validDirs
 * @param {?(RegExp|Array<string>|string)=} options.validExts - [.]ext
 * @param {?(RegExp|Array<string>|string)=} options.validNames - filename
 * @param {?(RegExp|Array<string>|string)=} options.validFiles - filename.ext
 * @param {?(RegExp|Array<string>|string)=} options.invalidDirs
 * @param {?(RegExp|Array<string>|string)=} options.invalidExts - [.]ext
 * @param {?(RegExp|Array<string>|string)=} options.invalidNames - filename
 * @param {?(RegExp|Array<string>|string)=} options.invalidFiles - filename.ext
 * @param {boolean=} deep - get all of the sub directory files [default= false]
 * @return {!Array<string>}
 */
Retrieve.filepaths = function(dirpath, options, deep) {

  /** @type {RegExp} */
  var validExts;
  /** @type {RegExp} */
  var validNames;
  /** @type {RegExp} */
  var validFiles;
  /** @type {RegExp} */
  var invalidExts;
  /** @type {RegExp} */
  var invalidNames;
  /** @type {RegExp} */
  var invalidFiles;

  is.dir(dirpath) || log.error(
    'Invalid `Retrieve.filepaths` Call',
    'invalid `dirpath` param (i.e. must be a valid directory)',
    { argMap: true, dirpath: dirpath }
  );

  options = is.obj(options) ? options : {};
  validExts = options.validExts;
  validNames = options.validNames;
  validFiles = options.validFiles;
  invalidExts = options.invalidExts;
  invalidNames = options.invalidNames;
  invalidFiles = options.invalidFiles;

  if (options.pass !== true) {
    validExts = is.arr(validExts) ? validExts.join('|') : validExts;
    validExts = is.str(validExts) ? Regex.make(
      '^.*\\.(?:' + validExts.replace(/\./g, '') + ')$',
    'i') : validExts;
    validExts = is.regex(validExts) ? validExts : null;

    validNames = is.arr(validNames) ? validNames.join('|') : validNames;
    validNames = is.str(validNames) ? Regex.make(
      '^(?:'+ Regex.escape(validNames).replace(/\*/g, '.*') +')\\.[a-z]{2,}$',
    'i') : validNames;
    validNames = is.regex(validNames) ? validNames : null;

    validFiles = is.arr(validFiles) ? validFiles.join('|') : validFiles;
    validFiles = is.str(validFiles) ? Regex.make(
      '^(?:' + Regex.escape(validFiles).replace(/\*/g, '.*') + ')$',
    'i') : validFiles;
    validFiles = is.regex(validFiles) ? validFiles : null;

    invalidExts = is.arr(invalidExts) ? invalidExts.join('|') : invalidExts;
    invalidExts = is.str(invalidExts) ? Regex.make(
      '^.*\\.(?:' + invalidExts.replace(/\./g, '') + ')$',
    'i') : invalidExts;
    invalidExts = is.regex(invalidExts) ? invalidExts : null;

    invalidNames = is.arr(invalidNames) ? invalidNames.join('|') : invalidNames;
    invalidNames = is.str(invalidNames) ? Regex.make(
      '^(?:'+ Regex.escape(invalidNames).replace(/\*/g, '.*') +')\\.[a-z]{2,}$',
    'i') : invalidNames;
    invalidNames = is.regex(invalidNames) ? invalidNames : null;

    invalidFiles = is.arr(invalidFiles) ? invalidFiles.join('|') : invalidFiles;
    invalidFiles = is.str(invalidFiles) ? Regex.make(
      '^(?:' + Regex.escape(invalidFiles).replace(/\*/g, '.*') + ')$',
    'i') : invalidFiles;
    invalidFiles = is.regex(invalidFiles) ? invalidFiles : null;
  }

  if (deep === true) {
    return Retrieve.filepaths.deep(dirpath, {
      pass:         true,
      validExts:    validExts,
      validNames:   validNames,
      validFiles:   validFiles,
      invalidExts:  invalidExts,
      invalidNames: invalidNames,
      invalidFiles: invalidFiles,
      validDirs:    options.validDirs || null,
      invalidDirs:  options.invalidDirs || null
    });
  }

  dirpath = dirpath.replace(/([^\/])$/, '$1/');
  return fs.readdirSync(dirpath).filter(function(file) {
    return (
      ( !validExts    || validExts.test(file)     ) &&
      ( !validNames   || validNames.test(file)    ) &&
      ( !validFiles   || validFiles.test(file)    ) &&
      ( !invalidExts  || !invalidExts.test(file)  ) &&
      ( !invalidNames || !invalidNames.test(file) ) &&
      ( !invalidFiles || !invalidFiles.test(file) ) &&
        is.file(dirpath + file)
    );
  });
};

/**
 * @param {string} dirpath
 * @param {Object=} options [default= null]
 * @param {?(RegExp|Array<string>|string)=} options.validDirs
 * @param {?(RegExp|Array<string>|string)=} options.validExts - [.]ext
 * @param {?(RegExp|Array<string>|string)=} options.validNames - filename
 * @param {?(RegExp|Array<string>|string)=} options.validFiles - filename.ext
 * @param {?(RegExp|Array<string>|string)=} options.invalidDirs
 * @param {?(RegExp|Array<string>|string)=} options.invalidExts - [.]ext
 * @param {?(RegExp|Array<string>|string)=} options.invalidNames - filename
 * @param {?(RegExp|Array<string>|string)=} options.invalidFiles - filename.ext
 * @return {!Array<string>}
 */
Retrieve.filepaths.deep = function(dirpath, options) {

  /** @type {function(string, Object): !Array<string>} */
  var get;
  /** @type {number} */
  var len;
  /** @type {!Array<string>} */
  var dirs;
  /** @type {!Array<string>} */
  var kids;
  /** @type {!Array<string>} */
  var files;

  get = Retrieve.filepaths;
  dirpath = dirpath.replace(/([^\/])$/, '$1/');

  options.pass = false;
  dirs = Retrieve.dirpaths(dirpath, options, true);
  files = get(dirpath, options);

  each(dirs, function(/** string */ dir) {
    files = files.concat(
      get(dirpath + dir, options).map(function(/** string */ file) {
        return dir + '/' + file;
      })
    );
  });

  return files;
};

/**
 * @param {string} filepath
 * @param {?string=} encoding [default= 'utf8']
 * @return {(string|Buffer)}
 */
Retrieve.file = function(filepath, encoding) {

  is.file(filepath) || log.error(
    'Invalid `Retrieve.file` Call',
    'invalid `filepath` param (i.e. must be a valid file)',
    { argMap: true, filepath: filepath }
  );

  encoding = is.str(encoding) || is.null(encoding) ? encoding : 'utf8';
  return encoding ?
    fs.readFileSync(filepath, encoding) : fs.readFileSync(filepath);
};

/**
 * @param {string} imgpath
 * @return {Buffer}
 */
Retrieve.img = function(imgpath) {

  is.file(imgpath) || log.error(
    'Invalid `Retrieve.img` Call',
    'invalid `imgpath` param (i.e. must be a valid file)',
    { argMap: true, imgpath: imgpath }
  );

  return fs.readFileSync(imgpath);
};


////////////////////////////////////////////////////////////////////////////////
// EXPORT LIBRARY
////////////////////////////////////////////////////////////////////////////////

module.exports = Retrieve;


////////////////////////////////////////////////////////////////////////////////
// PRIVATE HELPERS
////////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @param {string} dirpath
 * @param {?RegExp} validDirs
 * @param {?RegExp} invalidDirs
 * @return {!Array<string>}
 */
function getDirpaths(dirpath, validDirs, invalidDirs) {

  /** @type {function(string): boolean} */
  var isValid;
  /** @type {string} */
  var base;

  base = dirpath.replace(/[^\/]$/, '$&/');
  isValid = getCheck(validDirs, invalidDirs);
  return fs.readdirSync(base)
    .filter(function(dirpath) {
      return isValid(dirpath) && is.dir(base + dirpath);
    });
}

/**
 * @private
 * @param {(Array|RegExp)} valid
 * @param {(Array|RegExp)} invalid
 * @return {function}
 */
function getCheck(valid, invalid) {

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
