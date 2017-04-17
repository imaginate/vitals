/**
 * -----------------------------------------------------------------------------
 * VITALS FS METHOD: copy
 * -----------------------------------------------------------------------------
 * @section fs
 * @version 4.1.3
 * @see [vitals.copy](https://github.com/imaginate/vitals/wiki/vitals.copy)
 *
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2017 Adam A Smith <adam@imaginate.life> (https://imaginate.life)
 *
 * @see [JSDoc3](http://usejsdoc.org)
 * @see [Closure Compiler JSDoc](https://developers.google.com/closure/compiler/docs/js-for-compiler)
 */

'use strict';

var newErrorMaker = require('../helpers/new-error-maker.js');
var normalize = require('../helpers/normalize.js');
var match = require('../helpers/match.js');
var _is = require('./helpers/is.js');
var fs = require('fs');

var copy = {};


////////////////////////////////////////////////////////////////////////////////
// VITALS FS METHOD: copy
////////////////////////////////////////////////////////////////////////////////

(function fsCopyPrivateScope() {

  //////////////////////////////////////////////////////////
  // PUBLIC METHODS
  // - copy.file
  // - copy.directory (copy.dir)
  //////////////////////////////////////////////////////////

  /**
   * Copy the contents of a file to a new or existing file.
   *
   * @public
   * @param {string} source - Must be a valid filepath to an existing file.
   * @param {string} dest - Must be a valid filepath to a new or existing file,
   *   a valid dirpath to an existing directory, or a valid dirpath to a new
   *   directory noted by ending with `"/"`.
   * @param {(boolean|Object)=} opts - A boolean value sets opts.buffer.
   * @param {boolean=} opts.buffer - [default= true] Use and return a buffer.
   * @param {string=} opts.encoding - [default= "utf8"] - Only applies if
   *   opts.buffer is `false`.
   * @param {?string=} opts.eol - [default= "LF"] The end of line character
   *   to use when normalizing a string result. If opts.buffer is `true` or
   *   opts.eol is `null` no normalization is completed.
   *   Optional values:
   *   - `"LF"`
   *   - `"CR"`
   *   - `"CRLF"`
   * @return {(!Buffer|string)} The contents of the source.
   */
  copy.file = function copyFile(source, dest, opts) {

    opts = _is.bool(opts) ? { buffer: opts } : opts;

    if ( !_is.file(source)     ) throw _error.type('source', 'file');
    if ( !_is.str(dest)        ) throw _error.type('dest',   'file');
    if ( !_is.nil.un.obj(opts) ) throw _error.type('opts',   'file');

    if (opts) {
      if ( !_is.un.bool(opts.buffer)  ) throw _error.type('opts.buffer',   'file');
      if ( !_is.un.str(opts.encoding) ) throw _error.type('opts.encoding', 'file');
      if ( !_is.nil.un.str(opts.eol)  ) throw _error.type('opts.eol',      'file');
      if ( opts.eol && !_is.eol(opts.eol) ) throw _error.range('opts.eol', '"LF", "CR", "CRLF"', 'file');
    }

    if ( match(dest, /\/$/) ) _makeDir(dest);

    if ( _is.dir(dest) ) dest = _prepDir(dest) + _getFilename(source);

    opts = _prepOptions(opts);
    return _copyFile(source, dest, opts);
  };

  /**
   * Copy all of the files in a directory to another directory.
   *
   * @public
   * @param {string} source - Must be a valid dirpath to an existing directory.
   * @param {string} dest - Must be a valid dirpath to an existing directory or
   *   a valid dirpath to a new directory noted by ending with a `"/"`.
   * @param {(boolean|Object)=} opts - A boolean value sets opts.deep.
   * @param {boolean=} opts.deep - [default= false] Whether to include sub
   *   directories.
   * @param {boolean=} opts.recursive - Alias for opts.deep.
   * @param {boolean=} opts.buffer - [default= true] Use a buffer.
   * @param {string=} opts.encoding - [default= "utf8"] Only applies if
   *   opts.buffer is `false`.
   * @param {?string=} opts.eol - [default= "LF"] The end of line character
   *   to use when normalizing a string result. If opts.buffer is `true` or
   *   opts.eol is `null` no normalization is completed.
   *   Optional values:
   *   - `"LF"`
   *   - `"CR"`
   *   - `"CRLF"`
   * @return {!Array} The filepaths copied to the dest.
   */
  copy.directory = function copyDirectory(source, dest, opts) {

    opts = _is.bool(opts) ? { deep: opts } : opts;

    if ( _is._str(dest) && match(dest, /\/$/) ) _makeDir(dest);

    if ( !_is.dir(source)      ) throw _error.type('source', 'directory');
    if ( !_is.dir(dest)        ) throw _error.type('dest',   'directory');
    if ( !_is.nil.un.obj(opts) ) throw _error.type('opts',   'directory');

    if (opts) {
      if ( !_is.un.bool(opts.deep)      ) throw _error.type('opts.deep',      'directory');
      if ( !_is.un.bool(opts.recursive) ) throw _error.type('opts.recursive', 'directory');
      if ( !_is.un.bool(opts.buffer)    ) throw _error.type('opts.buffer',    'directory');
      if ( !_is.un.str(opts.encoding)   ) throw _error.type('opts.encoding',  'directory');
      if ( !_is.nil.un.str(opts.eol)    ) throw _error.type('opts.eol',       'directory');
      if ( opts.eol && !_is.eol(opts.eol) ) throw _error.range('opts.eol', '"LF", "CR", "CRLF"', 'directory');
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
   * @param {!Object} opts
   * @return {(!Buffer|string)}
   */
  function _copyFile(source, dest, opts) {

    /** @type {string} */
    var contents;

    if (opts.buffer) {
      contents = fs.readFileSync(source);
      fs.writeFileSync(dest, contents);
    }
    else {
      contents = fs.readFileSync(source, opts.encoding);
      contents = opts.eol ? normalize(contents, opts.eol) : contents;
      fs.writeFileSync(dest, contents, opts.encoding);
    }
    return contents;
  }

  /**
   * @private
   * @param {string} source
   * @param {string} dest
   * @param {!Object} opts
   * @return {string}
   */
  function _copyDir(source, dest, opts) {

    /** @type {!Array<string>} */
    var filepaths;
    /** @type {string} */
    var filepath;
    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    dest = _prepDir(dest);
    source = _prepDir(source);
    if (opts.deep) _prepDirs(source, dest);
    filepaths = _getFilepaths(source, opts.deep);
    len = filepaths.length;
    i = -1;
    while (++i < len) {
      filepath = filepaths[i];
      _copyFile(source + filepath, dest + filepath, opts);
    }
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
    /** @type {!Array<string>} */
    var newpaths;
    /** @type {string} */
    var filepath;
    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    if (deep) return _getFilepathsDeep(basepath);

    filepaths = fs.readdirSync(basepath);
    newpaths = [];
    len = filepaths.length;
    i = -1;
    while (++i < len) {
      filepath = filepaths[i];
      if ( _is.file(basepath + filepath) ) newpaths.push(filepath);
    }
    return newpaths;
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

    filepaths = _getFilepaths(basepath);
    dirpaths = _getDirpathsDeep(basepath);
    len = dirpaths.length;
    i = -1;
    while (++i < len) {
      dirpath = _prepDir(dirpaths[i]);
      newpaths = _getFilepaths(basepath + dirpath);
      _len = newpaths.length;
      _i = -1;
      while (++_i < _len) filepaths.push(dirpath + newpaths[_i]);
    }
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
      if ( _is.dir(basepath + dirpath) ) newpaths.push(dirpath);
    }
    return newpaths;
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
    var len;
    /** @type {number} */
    var ii;
    /** @type {number} */
    var i;

    dirpaths = _getDirpaths(basepath);
    i = -1;
    while (++i < dirpaths.length) {
      dirpath = _prepDir(dirpaths[i]);
      newpaths = _getDirpaths(basepath + dirpath);
      len = newpaths.length;
      ii = -1;
      while (++ii < len) dirpaths.push(dirpath + newpaths[ii]);
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
   * @param {string} dirpath
   */
  function _makeDir(dirpath) {
    if ( !_is.dir(dirpath) ) fs.mkdirSync(dirpath);
  }

  /**
   * @private
   * @param {string} source
   * @param {string} dest
   */
  function _prepDirs(source, dest) {

    /** @type {!Array<string>} */
    var dirpaths;
    /** @type {string} */
    var dirpath;
    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    dirpaths = _getDirpathsDeep(source);
    len = dirpaths.length;
    i = -1;
    while (++i < len) {
      dirpath = dest + dirpaths[i];
      if ( !_is.dir(dirpath) ) fs.mkdirSync(dirpath);
    }
  }

  /**
   * @private
   * @param {Object} opts
   * @return {!Object}
   */
  function _prepOptions(opts) {
    opts = opts || {};
    opts.deep = _is.bool(opts.deep) ? opts.deep : opts.recursive;
    opts.buffer = _is.undefined(opts.buffer) ? true : opts.buffer;
    opts.encoding = opts.encoding || 'utf8';
    opts.eol = _is.undefined(opts.eol) ? 'LF' : opts.eol;
    opts.eol = opts.eol && opts.eol.toUpperCase();
    return opts;
  }

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - GENERAL
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @type {!ErrorAid}
   */
  var _error = newErrorMaker('copy');

  //////////////////////////////////////////////////////////
  // END OF PRIVATE SCOPE FOR COPY
})();


module.exports = copy;
