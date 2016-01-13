/**
 * -----------------------------------------------------------------------------
 * VITALS - FILE SYSTEM METHODS - COPY
 * -----------------------------------------------------------------------------
 * @version 2.3.2
 * @see [vitals.copy]{@link https://github.com/imaginate/vitals/blob/master/src/methods/fs/copy.js}
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

var newErrorAid = require('../_helpers/errorAid.js');
var _normalize = require('../_helpers/normalize.js');
var _isEol = require('../_helpers/isEol.js');
var is = require('node-are').is;
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


module.exports = copy;
