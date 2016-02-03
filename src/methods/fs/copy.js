/**
 * -----------------------------------------------------------------------------
 * VITALS - FILE SYSTEM METHODS - COPY
 * -----------------------------------------------------------------------------
 * @version 3.0.0
 * @see [vitals.copy]{@link https://github.com/imaginate/vitals/blob/master/src/methods/fs/copy.js}
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
var _is = require('./helpers/is.js');
var fs = require('fs');

var copy = {};


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
   * @param {Object=} opts
   * @param {string=} opts.encoding - [default= "utf8"]
   * @param {?string=} opts.eol - [default= "LF"] The end of line character
   *   to use when normalizing the result. If opts.eol is null no
   *   normalization is completed. Optional values: "LF", "CR", "CRLF"
   * @return {string} The contents of the source.
   */
  copy.file = function copyFile(source, dest, opts) {

    if ( !_is.file(source)     ) throw _error.type('source', 'file');
    if ( !_is.str(dest)        ) throw _error.type('dest',   'file');
    if ( !_is.nil.un.obj(opts) ) throw _error.type('opts',   'file');

    if (opts) {
      if ( !_is.un.str(opts.encoding) ) throw _error.type('opts.encoding', 'file');
      if ( !_is.nil.un.str(opts.eol)  ) throw _error.type('opts.eol',      'file');
      if ( opts.eol && !_isEol(opts.eol) ) throw _error.range('opts.eol', '"LF", "CR", "CRLF"', 'file');
    }

    dest = _is.dir(dest) ? _prepDir(dest) + _getFilename(source) : dest;
    opts = _prepOptions(opts);
    return _copyFile(source, dest, opts);
  };

  /**
   * Copy all of the files in a directory to another directory.
   * @public
   * @param {string} source - Must be a valid dirpath to an existing directory.
   * @param {string} dest - Must be a valid dirpath to an existing directory.
   * @param {(boolean|Object)=} opts - Boolean values set opts.deep.
   * @param {boolean=} opts.deep - [default= false] Whether to include sub
   *   directories.
   * @param {string=} opts.encoding - [default= "utf8"]
   * @param {?string=} opts.eol - [default= "LF"] The end of line character
   *   to use when normalizing the result. If opts.eol is null no
   *   normalization is completed. Optional values: "LF", "CR", "CRLF"
   * @return {!Array} The filepaths copied to the dest.
   */
  copy.directory = function copyDirectory(source, dest, opts) {

    opts = _is.bool(opts) ? { deep: opts } : opts;

    if ( !_is.dir(source)      ) throw _error.type('source', 'directory');
    if ( !_is.dir(dest)        ) throw _error.type('dest',   'directory');
    if ( !_is.nil.un.obj(opts) ) throw _error.type('opts',   'directory');

    if (opts) {
      if ( !_is.un.bool(opts.deep)    ) throw _error.type('opts.deep',     'directory');
      if ( !_is.un.str(opts.encoding) ) throw _error.type('opts.encoding', 'directory');
      if ( !_is.nil.un.str(opts.eol)  ) throw _error.type('opts.eol',      'directory');
      if ( opts.eol && !_isEol(opts.eol) ) throw _error.range('opts.eol', '"LF", "CR", "CRLF"', 'directory');
    }

    opts = _prepOptions(opts);
    return _copyDir(source, dest, opts);
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
      return _is.file(basepath + filepath);
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
      return _is.dir(basepath + dirpath);
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
      if ( !_is.dir(dirpath) ) fs.mkdirSync(dirpath);
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
    options.eol = _is.undefined(options.eol) ? 'LF' : options.eol;
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


module.exports = copy;
