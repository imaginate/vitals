/**
 * -----------------------------------------------------------------------------
 * VITALS - FILE SYSTEM METHODS - GET
 * -----------------------------------------------------------------------------
 * @version 3.0.0
 * @see [vitals.get]{@link https://github.com/imaginate/vitals/blob/master/src/methods/fs/get.js}
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2016 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Annotations:
 * @see [JSDoc3]{@link http://usejsdoc.org/}
 * @see [Closure Compiler specific JSDoc]{@link https://developers.google.com/closure/compiler/docs/js-for-compiler}
 */

'use strict';

var newErrorAid = require('../helpers/error-aid.js');
var _normalize = require('../helpers/normalize.js');
var _isEol = require('../helpers/is-eol.js');
var _own = require('../helpers/own.js');
var _is = require('./helpers/is.js');
var fs = require('fs');

var get = {};


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
   * @param {(boolean|Object)=} opts - A boolean value sets opts.buffer.
   * @param {boolean=} opts.buffer - [default= false] If true a buffer is
   *   returned.
   * @param {string=} opts.encoding - [default= "utf8"]
   * @param {?string=} opts.eol - [default= "LF"] The end of line character
   *   to use when normalizing the result. If opts.eol is null no
   *   normalization is completed. Optional values: "LF", "CR", "CRLF"
   * @return {(!Buffer|string)}
   */
  get.file = function getFile(filepath, opts) {

    opts = _is.bool(opts) ? { buffer: opts } : opts;

    if ( !_is.file(filepath)   ) throw _error.type('filepath', 'file');
    if ( !_is.nil.un.obj(opts) ) throw _error.type('opts',     'file');

    if (opts) {
      if ( !_is.un.bool(opts.buffer)  ) throw _error.type('opts.buffer',   'file');
      if ( !_is.un.str(opts.encoding) ) throw _error.type('opts.encoding', 'file');
      if ( !_is.nil.un.str(opts.eol)  ) throw _error.type('opts.eol',      'file');
      if ( opts.eol && !_isEol(opts.eol) ) throw _error.range('opts.eol', '"LF", "CR", "CRLF"', 'file');
    }

    opts = _prepOptions(opts);
    return _getFile(filepath, opts);
  };

  /**
   * Gets all of the directory paths in a directory.
   * @public
   * @param {string} dirpath - Must be a valid directory.
   * @param {(boolean|Object)=} opts - A boolean value sets opts.deep.
   * @param {boolean=} opts.deep - [default= false] Whether to include sub
   *   directories.
   * @param {boolean=} opts.recursive - Alias for opts.deep.
   * @param {(RegExp|Array<string>|?string)=} opts.validDirs - If string use "|"
   *   to separate valid directory names.
   * @param {(RegExp|Array<string>|?string)=} opts.invalidDirs - If string use
   *   "|" to separate invalid directory names.
   * @return {!Array<string>}
   */
  get.dirpaths = function getDirpaths(dirpath, opts) {

    /** @type {function(string): boolean} */
    var isValid;

    opts = _is.bool(opts) ? { deep: opts } : opts;

    if ( !_is.dir(dirpath)     ) throw _error.type('dirpath', 'dirpaths');
    if ( !_is.nil.un.obj(opts) ) throw _error.type('opts',    'dirpaths');

    if (opts) {
      if ( !_is.un.bool(opts.deep)      ) throw _error.type('opts.deep',        'dirpaths');
      if ( !_is.un.bool(opts.recursive) ) throw _error.type('opts.recursive',   'dirpaths');
      if ( !_isValid(opts.validDirs)    ) throw _error.type('opts.validDirs',   'dirpaths');
      if ( !_isValid(opts.invalidDirs)  ) throw _error.type('opts.invalidDirs', 'dirpaths');
    }

    dirpath = _prepDir(dirpath);
    opts = _parseOptions(opts);
    isValid = _makeTest(opts.validDirs, opts.invalidDirs);
    return opts.deep
      ? _getDirpathsDeep(dirpath, isValid)
      : _getDirpaths(dirpath, isValid);
  };

  /**
   * Gets all of the file paths in a directory.
   * @public
   * @param {string} dirpath - Must be a valid directory.
   * @param {(boolean|Object)=} opts - A boolean value sets opts.deep.
   * @param {boolean=} opts.deep - [default= false] Whether to include
   *   sub-directory files.
   * @param {boolean=} opts.recursive - Alias for opts.deep.
   * @param {(RegExp|Array<string>|?string)=} opts.validDirs
   * @param {(RegExp|Array<string>|?string)=} opts.validExts - [.]ext
   * @param {(RegExp|Array<string>|?string)=} opts.validNames - filename
   * @param {(RegExp|Array<string>|?string)=} opts.validFiles - filename.ext
   * @param {(RegExp|Array<string>|?string)=} opts.invalidDirs
   * @param {(RegExp|Array<string>|?string)=} opts.invalidExts - [.]ext
   * @param {(RegExp|Array<string>|?string)=} opts.invalidNames - filename
   * @param {(RegExp|Array<string>|?string)=} opts.invalidFiles - filename.ext
   * @return {!Array<string>}
   */
  get.filepaths = function getFilepaths(dirpath, opts) {

    /** @type {function(string): boolean} */
    var isValidDir;
    /** @type {function(string): boolean} */
    var isValid;
    /** @type {!Array} */
    var invalid;
    /** @type {!Array} */
    var valid;

    opts = _is.bool(opts) ? { deep: opts } : opts;

    if ( !_is.dir(dirpath)     ) throw _error.type('dirpath', 'filepaths');
    if ( !_is.nil.un.obj(opts) ) throw _error.type('opts',    'filepaths');

    if (opts) {
      if ( !_is.un.bool(opts.deep)      ) throw _error.type('opts.deep',         'filepaths');
      if ( !_is.un.bool(opts.recursive) ) throw _error.type('opts.recursive',    'filepaths');
      if ( !_isValid(opts.validDirs)    ) throw _error.type('opts.validDirs',    'filepaths');
      if ( !_isValid(opts.validExts)    ) throw _error.type('opts.validExts',    'filepaths');
      if ( !_isValid(opts.validNames)   ) throw _error.type('opts.validNames',   'filepaths');
      if ( !_isValid(opts.validFiles)   ) throw _error.type('opts.validFiles',   'filepaths');
      if ( !_isValid(opts.invalidDirs)  ) throw _error.type('opts.invalidDirs',  'filepaths');
      if ( !_isValid(opts.invalidExts)  ) throw _error.type('opts.invalidExts',  'filepaths');
      if ( !_isValid(opts.invalidNames) ) throw _error.type('opts.invalidNames', 'filepaths');
      if ( !_isValid(opts.invalidFiles) ) throw _error.type('opts.invalidFiles', 'filepaths');
    }

    dirpath = _prepDir(dirpath);
    opts = _parseOptions(opts);
    valid   = [ opts.validExts,   opts.validNames,   opts.validFiles   ];
    invalid = [ opts.invalidExts, opts.invalidNames, opts.invalidFiles ];
    isValid = _makeTest(valid, invalid);

    if (opts.deep) {
      isValidDir = _makeTest(opts.validDirs, opts.invalidDirs);
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
   * @param {!Object} options
   * @return {(string|Buffer)}
   */
  function _getFile(source, options) {

    /** @type {string} */
    var contents;

    if (options.buffer) return fs.readFileSync(source);

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
      return isValid(dirpath) && _is.dir(basepath + dirpath);
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

    dirpaths = _getDirpaths(basepath, isValid);
    i = -1;
    while (++i < dirpaths.length) {
      dirpath = _prepDir(dirpaths[i]);
      newpaths = _getDirpaths(basepath + dirpath, isValid);
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
      return isValid(filepath) && _is.file(basepath + filepath);
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

    filepaths = _getFilepaths(basepath, isValid);
    dirpaths = _getDirpathsDeep(basepath, isValidDir);
    dirpaths.forEach(function(dirpath) {
      dirpath = _prepDir(dirpath);
      newpaths = _getFilepaths(basepath + dirpath, isValid);
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
   * @param {Object} opts
   * @return {!Object}
   */
  function _prepOptions(opts) {
    opts = opts || {};
    opts.deep = _is.bool(opts.deep) ? opts.deep : opts.recursive;
    opts.encoding = opts.encoding || 'utf8';
    opts.eol = _is.undefined(opts.eol) ? 'LF' : opts.eol;
    opts.eol = opts.eol && opts.eol.toUpperCase();
    return opts;
  }

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - OPTION PARSING
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @type {!RegExp}
   * @const
   */
  var ESCAPE_CHARS = /[\\^$.+?(){}[\]]/g;

  /**
   * @private
   * @type {!RegExp}
   * @const
   */
  var VALID = /^(?:in)?valid([A-Z][a-z]+)s$/;

  /**
   * @private
   * @param {Object=} options
   * @return {!Object}
   */
  function _parseOptions(options) {

    /** @type {!Object} */
    var opts;
    /** @type {string} */
    var key;

    if (!options) return {};

    opts = {};
    for (key in options) {
      if ( _own(options, key) ) {
        opts[key] = VALID.test(key)
          ? _parseOption(options[key], key.replace(VALID, '$1'))
          : options[key];
      }
    }
    return opts;
  }

  /**
   * @private
   * @param {(RegExp|Array<string>|?string|undefined)} option
   * @param {string} type
   * @return {?RegExp}
   */
  function _parseOption(option, type) {

    if (!option) return null;

    type = type.toLowerCase();
    option = _is.arr(option) ? option.join('|') : option;
    return _is.str(option) ? _parseOptStr(option) : option;
  }

  /**
   * @private
   * @param {string} option
   * @param {string} type
   * @return {!RegExp}
   */
  function _parseOptStr(option, type) {
    if (type === 'ext') option = option.replace(/\B\.\b/g, '');
    option = option.replace(ESCAPE_CHARS, '\\$&');
    option = option.replace(/(\\)?\*/g, function(org, match) {
      return match === '\\' ? org : '.*';
    });
    switch (type) {
      case 'dir' :
      case 'file': option = '^' + option + '$';          break;
      case 'ext' : option = '^.*\\.(?:' + option + ')$'; break;
      case 'name': option = '^(?:' + option + ')\\.[a-z]{2,}$';
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

    if ( _is.arr(regexs) ) {
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

  /**
   * @param {*} val
   * @return {boolean}
   */
  function _isValid(val) {
    return val
      ? _is.regex(val) || _is.str(val) || _is.arr(val)
      : _is.nil.un.str(val);
  }

  //////////////////////////////////////////////////////////
  // END OF PRIVATE SCOPE FOR GET
})();


module.exports = get;
