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

var newErrorAid = require('../helpers/errorAid.js');
var _normalize = require('../helpers/normalize.js');
var _isEol = require('../helpers/isEol.js');
var _own = require('../helpers/own.js');
var _is = require('./helpers/is.js');
var is = require('../is.js');
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

    options = _is.bool(options) ? { buffer: options } : options;

    if ( !_is.file(filepath)  ) throw _error.type('filepath', 'file');
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

    options = _is.bool(options) ? { deep: options } : options;

    if ( !_is.dir(dirpath)    ) throw _error.type('dirpath', 'dirpaths');
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

    options = _is.bool(options) ? { deep: options } : options;

    if ( !_is.dir(dirpath)    ) throw _error.type('dirpath', 'filepaths');
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
   * @param {Object} options
   * @return {!Object}
   */
  function _prepOptions(options) {
    options = options || {};
    options.encoding = options.encoding || 'utf8';
    options.eol = _is.undefined(options.eol) ? 'LF' : options.eol;
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

  //////////////////////////////////////////////////////////
  // END OF PRIVATE SCOPE FOR GET
})();


module.exports = get;
