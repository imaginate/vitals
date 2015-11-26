/**
 * -----------------------------------------------------------------------------
 * VITALS JS - NODE VERSION - FILE SYSTEM METHODS
 * -----------------------------------------------------------------------------
 * @file A JavaScript library of utility methods designed for elegance,
 *   performance, and reliability.
 * @version 2.0.0
 * @see [vitals]{@link https://github.com/imaginate/vitals}
 *
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

var is = require('node-are').is;
var fs = require('fs');

var copy = {};
var get = {};
var to = {};


// *****************************************************************************
// PRIVATE HELPERS
// *****************************************************************************


////////////////////////////////////////////////////////////////////////////////
// PRIVATE HELPER - ERROR-AID
////////////////////////////////////////////////////////////////////////////////

/**
 * @typedef {function(string, string=): !Error} ErrorAid
 */

/**
 * The ErrorAid constructor.
 * @param {string} vitalsMethod
 * @return {!ErrorAid}
 */
function newErrorAid(vitalsMethod) {

  /** @type {!ErrorAid} */
  var errorAid;

  vitalsMethod = 'vitals.' + vitalsMethod;

  /**
   * @param {string} msg
   * @param {string=} method
   * @return {!Error} 
   */
  errorAid = function error(msg, method) {
    method = method || '';
    method = vitalsMethod + ( method && '.' ) + method;
    return new Error(msg + ' for ' + method + ' call.');
  };

  /**
   * @param {string} param
   * @param {string=} method
   * @return {!TypeError} 
   */
  errorAid.type = function typeError(param, method) {
    param += ' param';
    method = method || '';
    method = vitalsMethod + ( method && '.' ) + method;
    return new TypeError('Invalid ' + param + ' in ' + method + ' call.');
  };

  /**
   * @param {string} param
   * @param {string=} valid
   * @param {string=} method
   * @return {!RangeError} 
   */
  errorAid.range = function rangeError(param, valid, method) {

    /** @type {string} */
    var msg;

    param += ' param';
    method = method || '';
    method = vitalsMethod + ( method && '.' ) + method;
    msg = 'The '+ param +' was out-of-range for a '+ method +' call.';
    msg += valid ? ' The valid options are: ' + valid : '';
    return new RangeError(msg);
  };

  return errorAid;
}

////////////////////////////////////////////////////////////////////////////////
// PRIVATE HELPER - IS-EOL
////////////////////////////////////////////////////////////////////////////////

var _isEol = (function _isEolPrivateScope() {

  /**
   * @param {string} val
   * @return {boolean}
   */
  function _isEol(val) {
    return EOL.test(val);
  }

  /**
   * @private
   * @type {!RegExp}
   * @const
   */
  var EOL = /^(?:cr|lf|crlf)$/i;

  //////////////////////////////////////////////////////////
  // END OF PRIVATE SCOPE FOR IS-EOL
  return _isEol;
})();


////////////////////////////////////////////////////////////////////////////////
// PRIVATE HELPER - NORMALIZE
////////////////////////////////////////////////////////////////////////////////

var _normalize = (function _normalizePrivateScope() {

  /**
   * @param {string} str
   * @param {string} eol
   * @return {string}
   */
  function _normalize(str, eol) {
    return str.replace(EOL.find[eol], EOL.replace[eol]);
  }

  /**
   * @private
   * @type {!Object}
   * @const
   */
  var EOL = {
    'replace': {
      'CRLF': '\r\n',
      'CR':   '\r',
      'LF':   '\n'
    },
    'find': {
      'CRLF': /\r?\n|\r\n?/g,
      'CR':   /\r?\n/g,
      'LF':   /\r\n?/g
    }
  };

  //////////////////////////////////////////////////////////
  // END OF PRIVATE SCOPE FOR NORMALIZE
  return _normalize;
})();



// *****************************************************************************
// SECTION: FILE SYSTEM METHODS
// *****************************************************************************


////////////////////////////////////////////////////////////////////////////////
// COPY
////////////////////////////////////////////////////////////////////////////////

(function fsCopyPrivateScope() {

  //////////////////////////////////////////////////////////
  // PUBLIC METHODS
  // - copy.file
  // - copy.directory (copy.dir)
  //////////////////////////////////////////////////////////

  /**
   * Copy the contents of a file to a new or existing file.
   * @public
   * @param {string} source - Must be a valid filepath to an existing file.
   * @param {string} dest - Must be a valid filepath to a new or existing file
   *   or a valid dirpath to an existing directory.
   * @param {Object=} options
   * @param {string=} options.encoding - [default= "utf8"]
   * @param {?string=} options.eol - [default= "LF"] The end of line character
   *   to use when normalizing the result. If options.eol is null no
   *   normalization is completed. Optional values: "LF", "CR", "CRLF"
   * @return {string} The contents of the source.
   */
  copy.file = function copyFile(source, dest, options) {

    if ( !is.file(source)     ) throw _error.type('source',  'file');
    if ( !is.str(dest)        ) throw _error.type('dest',    'file');
    if ( !is('obj=', options) ) throw _error.type('options', 'file');

    if (options) {
      if ( !is('str=', options.encoding) ) {
        throw _error.type('options.encoding', 'file');
      }
      if ( !is('?str=', options.eol) ) {
        throw _error.type('options.eol', 'file');
      }
      if ( options.eol && !_isEol(options.eol) ) {
        throw _error.range('options.eol', '"LF", "CR", "CRLF"', 'file');
      }
    }

    dest = is.dir(dest) ? _prepDir(dest) + _getFilename(source) : dest;
    options = _prepOptions(options);
    return _copyFile(source, dest, options);
  };

  /**
   * Copy all of the files in a directory to another directory.
   * @public
   * @param {string} source - Must be a valid dirpath to an existing directory.
   * @param {string} dest - Must be a valid dirpath to an existing directory.
   * @param {(boolean|Object)=} options - Boolean values set options.deep.
   * @param {boolean=} options.deep - [default= false] Whether to include sub
   *   directories.
   * @param {string=} options.encoding - [default= "utf8"]
   * @param {?string=} options.eol - [default= "LF"] The end of line character
   *   to use when normalizing the result. If options.eol is null no
   *   normalization is completed. Optional values: "LF", "CR", "CRLF"
   * @return {!Array} The filepaths copied to the dest.
   */
  copy.directory = function copyDirectory(source, dest, options) {

    options = is.bool(options) ? { deep: options } : options;

    if ( !is.dir(source)      ) throw _error.type('source',  'directory');
    if ( !is.dir(dest)        ) throw _error.type('dest',    'directory');
    if ( !is('obj=', options) ) throw _error.type('options', 'directory');

    if (options) {
      if ( !is('bool=', options.deep) ) {
        throw _error.type('options.deep', 'directory');
      }
      if ( !is('str=', options.encoding) ) {
        throw _error.type('options.encoding', 'directory');
      }
      if ( !is('?str=', options.eol) ) {
        throw _error.type('options.eol', 'directory');
      }
      if ( options.eol && !_isEol(options.eol) ) {
        throw _error.range('options.eol', '"LF", "CR", "CRLF"', 'directory');
      }
    }

    options = _prepOptions(options);
    return _copyDir(source, dest, options);
  };
  // define shorthand
  copy.dir = copy.directory;

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - MAIN
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @param {string} source
   * @param {string} dest
   * @param {!Object} options
   * @return {string}
   */
  function _copyFile(source, dest, options) {

    /** @type {string} */
    var contents;

    contents = fs.readFileSync(source, options.encoding);
    contents = options.eol ? _normalize(contents, options.eol) : contents;
    fs.writeFileSync(dest, contents, options.encoding);
    return contents;
  }

  /**
   * @private
   * @param {string} source
   * @param {string} dest
   * @param {!Object} options
   * @return {string}
   */
  function _copyDir(source, dest, options) {

    /** @type {!Array<string>} */
    var filepaths;

    dest = _prepDir(dest);
    source = _prepDir(source);
    if (options.deep) _prepDirs(source, dest);
    filepaths = _getFilepaths(source, options.deep);
    filepaths.forEach(function(filepath) {
      _copyFile(source + filepath, dest + filepath, options);
    });
    return filepaths;
  }

  //////////////////////////////////////////////////////////
  // PRIVATE PROPERTIES - GET FS PATHS
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @param {string} filepath
   * @return {string}
   */
  function _getFilename(filepath) {
    return filepath.replace(/^.*\//, '');
  }

  /**
   * @private
   * @param {string} basepath
   * @param {boolean=} deep
   * @return {!Array<string>}
   */
  function _getFilepaths(basepath, deep) {

    /** @type {!Array<string>} */
    var filepaths;

    if (deep) return _getFilepathsDeep(basepath);

    filepaths = fs.readdirSync(basepath);
    return filepaths.filter(function(filepath) {
      return is.file(basepath + filepath);
    });
  }

  /**
   * @private
   * @param {string} basepath
   * @return {!Array<string>}
   */
  function _getFilepathsDeep(basepath) {

    /** @type {!Array<string>} */
    var filepaths;
    /** @type {!Array<string>} */
    var dirpaths;
    /** @type {!Array<string>} */
    var newpaths;
    /** @type {number} */
    var i;

    filepaths = _getFilepaths(basepath);
    dirpaths = _getDirpathsDeep(basepath);
    dirpaths.forEach(function(dirpath) {
      dirpath = _prepDir(dirpath);
      newpaths = _getFilepaths(basepath + dirpath);
      newpaths = newpaths.map(function(newpath) {
        return dirpath + newpath;
      });
      filepaths = filepaths.concat(newpaths);
    });
    return filepaths;
  }

  /**
   * @private
   * @param {string} basepath
   * @return {!Array<string>}
   */
  function _getDirpaths(basepath) {

    /** @type {!Array<string>} */
    var dirpaths;

    dirpaths = fs.readdirSync(basepath);
    return dirpaths.filter(function(dirpath) {
      return is.dir(basepath + dirpath);
    });
  }

  /**
   * @private
   * @param {string} basepath
   * @return {!Array<string>}
   */
  function _getDirpathsDeep(basepath) {

    /** @type {!Array<string>} */
    var dirpaths;
    /** @type {!Array<string>} */
    var newpaths;
    /** @type {string} */
    var dirpath;
    /** @type {number} */
    var i;

    dirpaths = _getDirpaths(basepath);
    i = -1;
    while (++i < dirpaths.length) {
      dirpath = _prepDir(dirpaths[i]);
      newpaths = _getDirpaths(basepath + dirpath);
      newpaths = newpaths.map(function(newpath) {
        return dirpath + newpath;
      });
      dirpaths = dirpaths.concat(newpaths);
    }
    return dirpaths;
  }

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - PREP
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @param {string} dirpath
   * @return {string}
   */
  function _prepDir(dirpath) {
    return dirpath.replace(/[^\/]$/, '$&/');
  }

  /**
   * @private
   * @param {string} source
   * @param {string} dest
   */
  function _prepDirs(source, dest) {

    /** @type {!Array<string>} */
    var dirpaths;

    dirpaths = _getDirpathsDeep(source);
    dirpaths.forEach(function(dirpath) {
      dirpath = dest + dirpath;
      if ( !is.dir(dirpath) ) fs.mkdirSync(dirpath);
    });
  }

  /**
   * @private
   * @param {Object} options
   * @return {!Object}
   */
  function _prepOptions(options) {
    options = options || {};
    options.encoding = options.encoding || 'utf8';
    options.eol = is.undefined(options.eol) ? 'LF' : options.eol;
    options.eol = options.eol && options.eol.toUpperCase();
    return options;
  }

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - GENERAL
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @type {!ErrorAid}
   */
  var _error = newErrorAid('copy');

  //////////////////////////////////////////////////////////
  // END OF PRIVATE SCOPE FOR COPY
})();


////////////////////////////////////////////////////////////////////////////////
// GET
////////////////////////////////////////////////////////////////////////////////

(function fsGetPrivateScope() {

  //////////////////////////////////////////////////////////
  // PUBLIC METHODS
  // - get.file
  // - get.dirpaths
  // - get.filepaths
  //////////////////////////////////////////////////////////

  /**
   * Gets the contents of a file.
   * @public
   * @param {string} filepath
   * @param {(boolean|Object)=} options - Boolean values set options.buffer.
   * @param {boolean=} options.buffer - [default= false] If true a buffer is
   *   returned.
   * @param {string=} options.encoding - [default= "utf8"]
   * @param {?string=} options.eol - [default= "LF"] The end of line character
   *   to use when normalizing the result. If options.eol is null no
   *   normalization is completed. Optional values: "LF", "CR", "CRLF"
   * @return {(string|!Buffer)}
   */
  get.file = function getFile(filepath, options) {

    options = is.bool(options) ? { buffer: options } : options;

    if ( !is.file(filepath)   ) throw _error.type('filepath', 'file');
    if ( !is('obj=', options) ) throw _error.type('options',  'file');

    if (options) {
      if ( !is('bool=', options.buffer) ) {
        throw _error.type('options.buffer', 'file');
      }
      if ( !is('str=', options.encoding) ) {
        throw _error.type('options.encoding', 'file');
      }
      if ( !is('?str=', options.eol) ) {
        throw _error.type('options.eol', 'file');
      }
      if ( options.eol && !_isEol(options.eol) ) {
        throw _error.range('options.eol', '"LF", "CR", "CRLF"', 'file');
      }
    }

    options = _prepOptions(options);
    return _getFile(filepath, options);
  };

  /**
   * Gets all of the directory paths in a directory.
   * @public
   * @param {string} dirpath - Must be a valid directory.
   * @param {(boolean|Object)=} options - Boolean values set options.deep.
   * @param {boolean=} options.deep - Get all of the sub-directories.
   * @param {?(RegExp|Array<string>|string)=} options.validDirs
   * @param {?(RegExp|Array<string>|string)=} options.invalidDirs
   * @return {!Array<string>}
   */
  get.dirpaths = function getDirpaths(dirpath, options) {

    /** @type {function(string): boolean} */
    var isValid;

    options = is.bool(options) ? { deep: options } : options;

    if ( !is.dir(dirpath)     ) throw _error.type('dirpath', 'dirpaths');
    if ( !is('obj=', options) ) throw _error.type('options', 'dirpaths');

    if ( options && !is('bool=', options.deep) ) {
      throw _error.type('options.deep', 'dirpaths');
    }

    dirpath = _prepDir(dirpath);
    options = _parseOptions(options);
    isValid = _makeTest(options.validDirs, options.invalidDirs);
    return options.deep
      ? _getDirpathsDeep(dirpath, isValid)
      : _getDirpaths(dirpath, isValid);
  };

  /**
   * Gets all of the file paths in a directory.
   * @public
   * @param {string} dirpath - Must be a valid directory.
   * @param {(boolean|Object)=} options - Boolean values set options.deep.
   * @param {boolean=} options.deep - Get all of the sub-directory files.
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
  get.filepaths = function getFilepaths(dirpath, options) {

    /** @type {function(string): boolean} */
    var isValidDir;
    /** @type {function(string): boolean} */
    var isValid;
    /** @type {!Array} */
    var invalid;
    /** @type {!Array} */
    var valid;

    options = is.bool(options) ? { deep: options } : options;

    if ( !is.dir(dirpath)     ) throw _error.type('dirpath', 'filepaths');
    if ( !is('obj=', options) ) throw _error.type('options', 'filepaths');

    if ( options && !is('bool=', options.deep) ) {
      throw _error.type('options.deep', 'filepaths');
    }

    dirpath = _prepDir(dirpath);
    options = _parseOptions(options);
    valid   = [ options.validExts,  options.validNames,  options.validFiles   ];
    invalid = [ options.invalidExts,options.invalidNames,options.invalidFiles ];
    isValid = _makeTest(valid, invalid);

    if (options.deep) {
      isValidDir = _makeTest(options.validDirs, options.invalidDirs);
      return _getFilepathsDeep(dirpath, isValid, isValidDir);
    }

    return _getFilepaths(dirpath, isValid);
  };

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - MAIN
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @param {string} source
   * @param {string} dest
   * @param {!Object} options
   * @return {string}
   */
  function _getFile(source, dest, options) {

    /** @type {string} */
    var contents;

    if (options.buffer) return fs.readFileSync(filepath);

    contents = fs.readFileSync(source, options.encoding);
    return options.eol ? _normalize(contents, options.eol) : contents;
  }

  /**
   * @private
   * @param {string} basepath
   * @param {function(string): boolean} isValid
   * @return {!Array<string>}
   */
  function _getDirpaths(basepath, isValid) {

    /** @type {!Array<string>} */
    var dirpaths;

    dirpaths = fs.readdirSync(basepath);
    return dirpaths.filter(function(dirpath) {
      return isValid(dirpath) && is.dir(basepath + dirpath);
    });
  }

  /**
   * @private
   * @param {string} basepath
   * @param {function(string): boolean} isValid
   * @return {!Array<string>}
   */
  function _getDirpathsDeep(basepath, isValid) {

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
      dirpath = _prepDir(dirpaths[i]);
      newpaths = getDirpaths(basepath + dirpath, isValid);
      newpaths = newpaths.map(function(newpath) {
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
  function _getFilepaths(basepath, isValid) {

    /** @type {!Array<string>} */
    var filepaths;

    filepaths = fs.readdirSync(basepath);
    return filepaths.filter(function(filepath) {
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
  function _getFilepathsDeep(basepath, isValid, isValidDir) {

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
    dirpaths.forEach(function(dirpath) {
      dirpath = _prepDir(dirpath);
      newpaths = getFilepaths(basepath + dirpath, isValid);
      newpaths = newpaths.map(function(newpath) {
        return dirpath + newpath;
      });
      filepaths = filepaths.concat(newpaths);
    });
    return filepaths;
  }

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - PREP
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @param {string} dirpath
   * @return {string}
   */
  function _prepDir(dirpath) {
    return dirpath.replace(/[^\/]$/, '$&/');
  }

  /**
   * @private
   * @param {Object} options
   * @return {!Object}
   */
  function _prepOptions(options) {
    options = options || {};
    options.encoding = options.encoding || 'utf8';
    options.eol = is.undefined(options.eol) ? 'LF' : options.eol;
    options.eol = options.eol && options.eol.toUpperCase();
    return options;
  }

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - OPTION PARSING
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @type {!RegExp}
   * @const
   */
  var ESCAPE_CHARS = /[\+\?\.\-\:\{\}\[\]\(\)\/\,\\\^\$\=\!]/g;

  /**
   * @private
   * @type {!RegExp}
   * @const
   */
  var VALID = /^(?:in)?valid([a-z]*)s$/i;

  /**
   * @private
   * @param {Object=} options
   * @return {!Object}
   */
  function _parseOptions(options) {

    if (!options) return {};

    return options.map(function(val, key) {

      if ( !VALID.test(key) ) return val;

      key = key.replace(VALID, '$1');
      return _parseOption(val, key);
    });
  }

  /**
   * @private
   * @param {?(RegExp|Array<string>|string|undefined)} option
   * @param {string} type
   * @return {?RegExp}
   */
  function _parseOption(option, type) {

    if ( is('null=', option) ) return null;

    if ( !is('!arr|str|regex', option) ) {
      throw _error.type('options.(in)valid' + type, '(dir|file)paths');
    }

    type = type.toLowerCase();
    option = is.arr(option) ? option.join('|') : option;
    return is.str(option) ? _parseOptStr(option) : option;
  }

  /**
   * @private
   * @param {string} option
   * @param {string} type
   * @return {!RegExp}
   */
  function _parseOptStr(option, type) {

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

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - TEST FACTORIES
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @param {(Array|RegExp)} valid
   * @param {(Array|RegExp)} invalid
   * @return {function}
   */
  function _makeTest(valid, invalid) {

    /** @type {function(string): boolean} */
    var isInvalid;
    /** @type {function(string): boolean} */
    var isValid;

    isInvalid = _makeCheck(false, invalid);
    isValid = _makeCheck(true, valid);
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
  function _makeCheck(valid, regexs) {

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

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - GENERAL
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @type {!ErrorAid}
   */
  var _error = newErrorAid('get');

  //////////////////////////////////////////////////////////
  // END OF PRIVATE SCOPE FOR GET
})();


////////////////////////////////////////////////////////////////////////////////
// TO
////////////////////////////////////////////////////////////////////////////////

(function fsToPrivateScope() {

  //////////////////////////////////////////////////////////
  // PUBLIC METHODS
  // - to.file
  //////////////////////////////////////////////////////////

  /**
   * Move the contents of a file to a new or existing file.
   * @public
   * @param {(string|!Buffer)} contents
   * @param {string} filepath
   * @param {?string=} encoding - [default= 'utf8'] If null no encoding is set.
   * @return {string} The contents.
   */
  to.file = function toFile(contents, filepath, encoding) {

    if ( !is.str(filepath) ) throw _error.type('filepath', 'file');

    if ( is.buffer(contents) ) {
      fs.writeFileSync(filepath, contents);
      return contents;
    }

    if ( !is.str(contents)      ) throw _error.type('contents', 'file');
    if ( !is('?str=', encoding) ) throw _error.type('encoding', 'file');

    encoding = is.undefined(encoding) ? 'utf8' : encoding;
    return encoding
      ? fs.writeFileSync(filepath, contents, encoding)
      : fs.writeFileSync(filepath, contents);
  };

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - GENERAL
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @type {!ErrorAid}
   */
  var _error = newErrorAid('to');

  //////////////////////////////////////////////////////////
  // END OF PRIVATE SCOPE FOR TO
})();



// *****************************************************************************
// SECTION: END
// *****************************************************************************

module.exports = {
  copy:   copy,
  get:    get,
  to:     to
};
