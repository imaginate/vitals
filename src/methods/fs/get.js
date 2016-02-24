/**
 * -----------------------------------------------------------------------------
 * VITALS FS METHOD: get
 * -----------------------------------------------------------------------------
 * @section fs
 * @version 4.0.1
 * @see [vitals.get]{@link https://github.com/imaginate/vitals/wiki/vitals.get}
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2016 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Annotations:
 * @see [JSDoc3](http://usejsdoc.org)
 * @see [Closure Compiler JSDoc Syntax](https://developers.google.com/closure/compiler/docs/js-for-compiler)
 */

'use strict';

var newErrorMaker = require('../helpers/new-error-maker.js');
var normalize = require('../helpers/normalize.js');
var own = require('../helpers/own.js');
var _is = require('./helpers/is.js');
var fs = require('fs');

var get = {};


////////////////////////////////////////////////////////////////////////////////
// VITALS FS METHOD: get
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
   *
   * @public
   * @param {string} filepath
   * @param {(boolean|Object)=} opts - A boolean value sets opts.buffer.
   * @param {boolean=} opts.buffer - [default= false] If `true` a buffer is
   *   returned.
   * @param {string=} opts.encoding - [default= "utf8"]
   * @param {?string=} opts.eol - [default= "LF"] The end of line character
   *   to use when normalizing the result. If opts.eol is `null` or opts.buffer
   *   is `true` no normalization is completed.
   *   Optional values:
   *   - `"LF"`
   *   - `"CR"`
   *   - `"CRLF"`
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
      if ( opts.eol && !_is.eol(opts.eol) ) throw _error.range('opts.eol', '"LF", "CR", "CRLF"', 'file');
    }

    opts = _prepOptions(opts);
    return _getFile(filepath, opts);
  };

  /**
   * Gets all of the directory paths in a directory.
   *
   * @public
   * @param {string} dirpath - Must be a valid directory.
   * @param {(boolean|Object)=} opts - A boolean value sets opts.deep.
   * @param {boolean=} opts.deep - [default= false] Whether to include sub
   *   directories.
   * @param {boolean=} opts.recursive - Alias for opts.deep.
   * @param {boolean=} opts.base - [default= false] Whether to append the base
   *   dirpath to the results.
   * @param {boolean=} opts.basepath - Alias for opts.base.
   * @param {(RegExp|Array<string>|?string)=} opts.validDirs - If string use
   *   `"|"` to separate valid directory names.
   * @param {(RegExp|Array<string>|?string)=} opts.invalidDirs - If string use
   *   `"|"` to separate invalid directory names.
   * @return {!Array<string>}
   */
  get.dirpaths = function getDirpaths(dirpath, opts) {

    /** @type {!Array<string>} */
    var dirpaths;
    /** @type {function(string): boolean} */
    var isValid;

    opts = _is.bool(opts) ? { deep: opts } : opts;

    if ( !_is.dir(dirpath)     ) throw _error.type('dirpath', 'dirpaths');
    if ( !_is.nil.un.obj(opts) ) throw _error.type('opts',    'dirpaths');

    if (opts) {
      if ( !_is.un.bool(opts.deep)      ) throw _error.type('opts.deep',        'dirpaths');
      if ( !_is.un.bool(opts.recursive) ) throw _error.type('opts.recursive',   'dirpaths');
      if ( !_is.un.bool(opts.base)      ) throw _error.type('opts.base',        'dirpaths');
      if ( !_is.un.bool(opts.basepath)  ) throw _error.type('opts.basepath',    'dirpaths');
      if ( !_isValid(opts.validDirs)    ) throw _error.type('opts.validDirs',   'dirpaths');
      if ( !_isValid(opts.invalidDirs)  ) throw _error.type('opts.invalidDirs', 'dirpaths');
    }

    dirpath = _prepDir(dirpath);
    opts = _parseOptions(opts);
    isValid = _makeTest(opts.validDirs, opts.invalidDirs);
    dirpaths = opts.deep
      ? _getDirpathsDeep(dirpath, isValid)
      : _getDirpaths(dirpath, isValid);
    return opts.base ? _addBasepath(dirpaths, dirpath) : dirpaths;
  };

  /**
   * Gets all of the file paths in a directory.
   *
   * @public
   * @param {string} dirpath - Must be a valid directory.
   * @param {(boolean|Object)=} opts - A boolean value sets opts.deep.
   * @param {boolean=} opts.deep - [default= false] Whether to include
   *   sub-directory files.
   * @param {boolean=} opts.recursive - Alias for opts.deep.
   * @param {boolean=} opts.base - [default= false] Whether to append the base
   *   dirpath to the results.
   * @param {boolean=} opts.basepath - Alias for opts.base.
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
    /** @type {!Array<string>} */
    var filepaths;
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
      if ( !_is.un.bool(opts.base)      ) throw _error.type('opts.base',         'filepaths');
      if ( !_is.un.bool(opts.basepath)  ) throw _error.type('opts.basepath',     'filepaths');
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
      filepaths = _getFilepathsDeep(dirpath, isValid, isValidDir);
    }
    else filepaths = _getFilepaths(dirpath, isValid);

    return opts.base ? _addBasepath(filepaths, dirpath) : filepaths;
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
    return options.eol ? normalize(contents, options.eol) : contents;
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
    /** @type {!Array<string>} */
    var newpaths;
    /** @type {string} */
    var dirpath;
    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    dirpaths = fs.readdirSync(basepath);
    newpaths = [];
    len = dirpaths.length;
    i = -1;
    while (++i < len) {
      dirpath = dirpaths[i];
      isValid(dirpath) && _is.dir(basepath + dirpath) && newpaths.push(dirpath);
    }
    return newpaths;
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
    var len;
    /** @type {number} */
    var ii;
    /** @type {number} */
    var i;

    dirpaths = _getDirpaths(basepath, isValid);
    i = -1;
    while (++i < dirpaths.length) {
      dirpath = _prepDir(dirpaths[i]);
      newpaths = _getDirpaths(basepath + dirpath, isValid);
      len = newpaths.length;
      ii = -1;
      while (++ii < len) dirpaths.push(dirpath + newpaths[ii]);
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
    /** @type {!Array<string>} */
    var newpaths;
    /** @type {string} */
    var filepath;
    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    filepaths = fs.readdirSync(basepath);
    newpaths = [];
    len = filepaths.length;
    i = -1;
    while (++i < len) {
      filepath = filepaths[i];
      isValid(filepath) && _is.file(basepath + filepath) && newpaths.push(filepath);
    }
    return newpaths;
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
    /** @type {string} */
    var dirpath;
    /** @type {number} */
    var _len;
    /** @type {number} */
    var len;
    /** @type {number} */
    var _i;
    /** @type {number} */
    var i;

    filepaths = _getFilepaths(basepath, isValid);
    dirpaths = _getDirpathsDeep(basepath, isValidDir);
    len = dirpaths.length;
    i = -1;
    while (++i < len) {
      dirpath = _prepDir(dirpaths[i]);
      newpaths = _getFilepaths(basepath + dirpath, isValid);
      _len = newpaths.length;
      _i = -1;
      while (++_i < _len) filepaths.push(dirpath + newpaths[_i]);
    }
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
    opts.encoding = opts.encoding || 'utf8';
    opts.eol = _is.undefined(opts.eol) ? 'LF' : opts.eol;
    opts.eol = opts.eol && opts.eol.toUpperCase();
    return opts;
  }

  /**
   * @private
   * @param {!Array<string>} paths
   * @param {string} basepath
   * @return {!Array<string>}
   */
  function _addBasepath(paths, basepath) {

    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    len = paths.length;
    i = -1;
    while (++i < len) paths[i] = basepath + paths[i];
    return paths;
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

    options.deep = _is.bool(options.deep) ? options.deep : options.recursive;
    options.base = _is.bool(options.base) ? options.base : options.basepath;

    opts = {};
    for (key in options) {
      if ( own(options, key) ) {
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
    return _is.str(option) ? _parseOptStr(option, type) : option;
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
      case 'file': option = '^(?:' + option + ')$';        break;
      case 'ext' : option = '^.*\\.(?:' + option + ')$';   break;
      case 'name': option = '^(?:' + option + ')(?:\\.[a-z]+)+$';
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
   * @param {(Array|RegExp)} regexps
   * @return {function}
   */
  function _makeCheck(valid, regexps) {

    /** @type {number} */
    var i;

    if ( !_is.arr(regexps) ) return _makeOneCheck(valid, regexps);

    i = regexps.length;
    while (i--) regexps[i] || regexps.splice(i, 1);

    return regexps.length > 1
      ? valid
        ? _makeValidCheck(regexps)
        : _makeInvalidCheck(regexps)
      : _makeOneCheck(valid, regexps[0]);
  }

  /**
   * @private
   * @param {boolean} valid
   * @param {?RegExp=} regex
   * @return {function}
   */
  function _makeOneCheck(valid, regex) {
    return valid
      ? regex
        ? function isValid(str) { return regex.test(str); }
        : function isValid() { return true; }
      : regex
        ? function isInvalid(str) { return regex.test(str); }
        : function isInvalid() { return false; };
  }

  /**
   * @private
   * @param {!Array<!RegExp>} regexps
   * @return {function}
   */
  function _makeValidCheck(regexps) {

    /** @type {number} */
    var len;

    len = regexps.length;

    return function isValid(str) {

      /** @type {number} */
      var i;

      i = -1;
      while (++i < len) {
        if ( !regexps[i].test(str) ) return false;
      }
      return true;
    };
  }

  /**
   * @private
   * @param {!Array<!RegExp>} regexps
   * @return {function}
   */
  function _makeInvalidCheck(regexps) {

    /** @type {number} */
    var len;

    len = regexps.length;

    return function isInvalid(str) {

      /** @type {number} */
      var i;

      i = -1;
      while (++i < len) {
        if ( regexps[i].test(str) ) return true;
      }
      return false;
    };
  }

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - GENERAL
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @type {!ErrorAid}
   */
  var _error = newErrorMaker('get');

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
