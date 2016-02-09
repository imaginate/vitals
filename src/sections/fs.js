/**
 * -----------------------------------------------------------------------------
 * VITALS JS - NODE VERSION - FILE SYSTEM METHODS
 * -----------------------------------------------------------------------------
 * @file A JavaScript library of utility methods designed for elegance,
 *   performance, and reliability.
 * @version 3.0.0
 * @see [vitals]{@link https://github.com/imaginate/vitals}
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2016 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Annotations:
 * @see [JSDoc3]{@link http://usejsdoc.org/}
 * @see [Closure Compiler specific JSDoc]{@link https://developers.google.com/closure/compiler/docs/js-for-compiler}
 */

'use strict';

var fs = require('fs');

var copy = {};
var get = {};
var is = {};
var to = {};


// *****************************************************************************
// PRIVATE HELPERS
// *****************************************************************************


////////////////////////////////////////////////////////////////////////////////
// PRIVATE HELPER - OWN
////////////////////////////////////////////////////////////////////////////////

var _own = (function _ownPrivateScope() {

  /**
   * @param {?(Object|function)} source
   * @param {*} key
   * @return {boolean}
   */
  function _own(source, key) {
    return !!source && _hasOwnProperty.call(source, key);
  }

  /**
   * @private
   * @param {*} key
   * @return {boolean}
   */
  var _hasOwnProperty = Object.prototype.hasOwnProperty;

  //////////////////////////////////////////////////////////
  // END OF PRIVATE SCOPE FOR OWN
  return _own;
})();


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

    /** @type {!Error} */
    var error;

    method = method || '';
    method = vitalsMethod + ( method && '.' ) + method;
    error = new Error(msg + ' for ' + method + ' call.');
    error.__vitals = true;
    return true;
  };

  /**
   * @param {string} param
   * @param {string=} method
   * @return {!TypeError} 
   */
  errorAid.type = function typeError(param, method) {

    /** @type {!TypeError} */
    var error;

    param += ' param';
    method = method || '';
    method = vitalsMethod + ( method && '.' ) + method;
    error = new TypeError('Invalid ' + param + ' in ' + method + ' call.');
    error.__vitals = true;
    return error;
  };

  /**
   * @param {string} param
   * @param {string=} valid
   * @param {string=} method
   * @return {!RangeError} 
   */
  errorAid.range = function rangeError(param, valid, method) {

    /** @type {!RangeError} */
    var error;
    /** @type {string} */
    var msg;

    param += ' param';
    method = method || '';
    method = vitalsMethod + ( method && '.' ) + method;
    msg = 'The '+ param +' was out-of-range for a '+ method +' call.';
    msg += valid ? ' The valid options are: ' + valid : '';
    error = new RangeError(msg);
    error.__vitals = true;
    return error;
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
// PRIVATE HELPER - IS
////////////////////////////////////////////////////////////////////////////////

var _is = (function _isPrivateScope() {

  /** @type {!Object} */
  var _is = {};

  /** @type {function} */
  var toStr = Object.prototype.toString;

  //////////////////////////////////////////////////////////
  // PRIMITIVES
  //////////////////////////////////////////////////////////

  /**
   * @param {*} val
   * @return {boolean}
   */
  _is.nil = function(val) {
    return val === null;
  };

  /**
   * @param {*} val
   * @return {boolean}
   */
  _is.undefined = function(val) {
    return val === undefined;
  };

  /**
   * @param {*} val
   * @return {boolean}
   */
  _is.bool = function(val) {
    return typeof val === 'boolean';
  };

  /**
   * @param {*} val
   * @return {boolean}
   */
  _is.str = function(val) {
    return typeof val === 'string';
  };

  /**
   * Empty strings return false in this method.
   * @param {*} val
   * @return {boolean}
   */
  _is._str = function(val) {
    return !!val && typeof val === 'string';
  };

  /**
   * @param {*} val
   * @return {boolean}
   */
  _is.num = function(val) {
    return typeof val === 'number' && val === val;
  };

  /**
   * Zeros return false in this method.
   * @param {*} val
   * @return {boolean}
   */
  _is._num = function(val) {
    return !!val && typeof val === 'number' && val === val;
  };

  /**
   * @param {*} val
   * @return {boolean}
   */
  _is.nan = function(val) {
    return val !== val;
  };

  //////////////////////////////////////////////////////////
  // JS OBJECTS
  //////////////////////////////////////////////////////////

  /**
   * @param {*} val
   * @return {boolean}
   */
  _is.obj = function(val) {
    return !!val && typeof val === 'object';
  };

  /**
   * Functions return true in this method.
   * @param {*} val
   * @return {boolean}
   */
  _is._obj = function(val) {
    val = !!val && typeof val;
    return val && (val === 'object' || val === 'function');
  };

  /**
   * @param {*} val
   * @return {boolean}
   */
  _is.func = function(val) {
    return !!val && typeof val === 'function';
  };

  /**
   * @param {*} val
   * @return {boolean}
   */
  _is.arr = function(val) {
    return !!val && typeof val === 'object' && toStr.call(val) === '[object Array]';
  };

  /**
   * Arguments return true in this method.
   * @param {*} val
   * @return {boolean}
   */
  _is._arr = function(val) {
      if ( !_is.obj(val) ) return false;
      val = toStr.call(val);
      return val === '[object Array]' || val === '[object Arguments]';
  };

  /**
   * @param {*} val
   * @return {boolean}
   */
  _is.regex = function(val) {
    return !!val && typeof val === 'object' && toStr.call(val) === '[object RegExp]';
  };

  /**
   * @param {*} val
   * @return {boolean}
   */
  _is.date = function(val) {
    return !!val && typeof val === 'object' && toStr.call(val) === '[object Date]';
  };

  /**
   * @param {*} val
   * @return {boolean}
   */
  _is.err = function(val) {
    return !!val && typeof val === 'object' && toStr.call(val) === '[object Error]';
  };

  /**
   * @param {*} val
   * @return {boolean}
   */
  _is.args = function(val) {
    return !!val && typeof val === 'object' && toStr.call(val) === '[object Arguments]';
  };

  //////////////////////////////////////////////////////////
  // DOM OBJECTS
  //////////////////////////////////////////////////////////

  /**
   * @param {*} val
   * @return {boolean}
   */
  _is.doc = function(val) {
    return !!val && typeof val === 'object' && val.nodeType === 9;
  };

  /**
   * @param {*} val
   * @return {boolean}
   */
  _is.elem = function(val) {
    return !!val && typeof val === 'object' && val.nodeType === 1;
  };

  //////////////////////////////////////////////////////////
  // OTHERS
  //////////////////////////////////////////////////////////

  /**
   * Checks if a value is considered empty. For a list of empty values see below.
   *   empty values: 0, "", {}, [], null, undefined, false, NaN, function(){...}
   *   note: for functions this method checks whether it has any defined params:
   *     function(){} => true | function(param){} => false
   * @param {*} val
   * @return {boolean}
   */
  _is.empty = function(val) {

    /** @type {string} */
    var prop;

    // return empty primitives - 0, "", null, undefined, false, NaN
    if ( !_is._obj(val) ) return !val;

    // return empty arrays and functions - [], function(){}
    if ( _is.arr(val) || _is.func(val) ) return !val.length;

    // return empty object - {}
    for (prop in val) {
      if ( _own(val, prop) ) return false;
    }
    return true;
  };

  /**
   * @param {(Object|?function)} obj
   * @return {boolean}
   */
  _is.frozen = (function() {

    if (!Object.isFrozen) return function isFrozen(obj) { return false; };

    try {
      Object.isFrozen(function(){});
      return Object.isFrozen;
    }
    catch (e) {
      return function isFrozen(obj) {
        return _is.obj(obj) && Object.isFrozen(obj);
      };
    }
  })();

  //////////////////////////////////////////////////////////
  // NUMBER STATES
  //////////////////////////////////////////////////////////

  /**
   * @param {number} val
   * @return {boolean}
   */
  _is.whole = function(val) {
    return !(val % 1);
  };

  /**
   * @param {number} val
   * @return {boolean}
   */
  _is.odd = function(val) {
    return !!(val % 2);
  };

  /**
   * @param {number} val
   * @return {boolean}
   */
  _is.even = function(val) {
    return !(val % 2);
  };

  //////////////////////////////////////////////////////////
  // OR UNDEFINED
  //////////////////////////////////////////////////////////

  /** @type {!Object} */
  _is.un = {};

  /**
   * @param {*} val
   * @return {boolean}
   */
  _is.un.bool = function(val) {
    return val === undefined || typeof val === 'boolean';
  };

  /**
   * @param {*} val
   * @return {boolean}
   */
  _is.un.str = function(val) {
    return val === undefined || typeof val === 'string';
  };

  /**
   * @param {*} val
   * @return {boolean}
   */
  _is.un.num = function(val) {
    return val === undefined || (typeof val === 'number' && val === val);
  };

  /**
   * @param {*} val
   * @return {boolean}
   */
  _is.un.obj = function(val) {
    return val === undefined || (!!val && typeof val === 'object');
  };

  /**
   * @param {*} val
   * @return {boolean}
   */
  _is.un.func = function(val) {
    return val === undefined || (!!val && typeof val === 'function');
  };

  /**
   * @param {*} val
   * @return {boolean}
   */
  _is.un.arr = function(val) {
    return val === undefined || (
      !!val && typeof val === 'object' && toStr.call(val) === '[object Array]'
    );
  };

  //////////////////////////////////////////////////////////
  // OR NULL
  //////////////////////////////////////////////////////////

  /**
   * @param {*} val
   * @return {boolean}
   */
  _is.nil.bool = function(val) {
    return val === null || typeof val === 'boolean';
  };

  /**
   * @param {*} val
   * @return {boolean}
   */
  _is.nil.str = function(val) {
    return val === null || typeof val === 'string';
  };

  /**
   * @param {*} val
   * @return {boolean}
   */
  _is.nil.num = function(val) {
    return val === null || (typeof val === 'number' && val === val);
  };

  /**
   * @param {*} val
   * @return {boolean}
   */
  _is.nil.obj = function(val) {
    return val === null || (!!val && typeof val === 'object');
  };

  /**
   * @param {*} val
   * @return {boolean}
   */
  _is.nil.func = function(val) {
    return val === null || (!!val && typeof val === 'function');
  };

  /**
   * @param {*} val
   * @return {boolean}
   */
  _is.nil.arr = function(val) {
    return val === null || (
      !!val && typeof val === 'object' && toStr.call(val) === '[object Array]'
    );
  };

  //////////////////////////////////////////////////////////
  // OR NULL OR UNDEFINED
  //////////////////////////////////////////////////////////

  /** @type {!Object} */
  _is.nil.un = {};

  /**
   * @param {*} val
   * @return {boolean}
   */
  _is.nil.un.bool = function(val) {
    return val === null || val === undefined || typeof val === 'boolean';
  };

  /**
   * @param {*} val
   * @return {boolean}
   */
  _is.nil.un.str = function(val) {
    return val === null || val === undefined || typeof  val === 'string';
  };

  /**
   * @param {*} val
   * @return {boolean}
   */
  _is.nil.un.num = function(val) {
    return val === null || val === undefined || (
      typeof val === 'number' && val === val
    );
  };

  /**
   * @param {*} val
   * @return {boolean}
   */
  _is.nil.un.obj = function(val) {
    return val === null || val === undefined || (
      !!val && typeof val === 'object'
    );
  };

  /**
   * @param {*} val
   * @return {boolean}
   */
  _is.nil.un.func = function(val) {
    return val === null || val === undefined || (
      !!val && typeof val === 'undefined'
    );
  };

  /**
   * @param {*} val
   * @return {boolean}
   */
  _is.nil.un.arr = function(val) {
    return val === null || val === undefined || (
      !!val && typeof val === 'object' && toStr.call(val) === '[object Array]'
    );
  };

  //////////////////////////////////////////////////////////
  // END OF PRIVATE SCOPE FOR IS
  return _is;
})();


////////////////////////////////////////////////////////////////////////////////
// PRIVATE HELPER - IS
////////////////////////////////////////////////////////////////////////////////

/**
 * @param {*} val
 * @return {boolean}
 */
_is.buffer = Buffer.isBuffer;

/**
 * @param {string} dirpath
 * @return {boolean}
 */
_is.dir = function(dirpath) {

  if ( !_is._str(dirpath) ) return false;

  try {
    return fs.statSync(dirpath).isDirectory();
  }
  catch (e) {
    return false;
  }
};

/**
 * @param {string} filepath
 * @return {boolean}
 */
_is.file = function(filepath) {

  if ( !_is._str(filepath) ) return false;

  try {
    return fs.statSync(filepath).isFile();
  }
  catch (e) {
    return false;
  }
};


////////////////////////////////////////////////////////////////////////////////
// PRIVATE HELPER - MATCH
////////////////////////////////////////////////////////////////////////////////

/**
 * A shortcut for String.prototype.includes and RegExp.prototype.test.
 * @param {string} source
 * @param {*} pattern
 * @return {boolean}
 */
function _match(source, pattern) {
  return _is.regex(pattern) ? pattern.test(source) : _inStr(source, pattern);
}

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
   * @param {string} dest - Must be a valid filepath to a new or existing file,
   *   a valid dirpath to an existing directory, or a valid dirpath to a new
   *   directory noted by ending with a slash.
   * @param {(boolean|Object)=} opts - A boolean value sets opts.buffer.
   * @param {boolean=} opts.buffer - [default= true] Use and return a buffer.
   * @param {string=} opts.encoding - [default= "utf8"] - Only applies if
   *   opts.buffer is false.
   * @param {?string=} opts.eol - [default= "LF"] The end of line character
   *   to use when normalizing a string result. If opts.buffer is true or
   *   opts.eol is null no normalization is completed.
   *   Optional values: "LF", "CR", "CRLF"
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
      if ( opts.eol && !_isEol(opts.eol) ) throw _error.range('opts.eol', '"LF", "CR", "CRLF"', 'file');
    }

    if ( _match(dest, /\/$/) ) _makeDir(dest);

    if ( _is.dir(dest) ) dest = _prepDir(dest) + _getFilename(source);

    opts = _prepOptions(opts);
    return _copyFile(source, dest, opts);
  };

  /**
   * Copy all of the files in a directory to another directory.
   * @public
   * @param {string} source - Must be a valid dirpath to an existing directory.
   * @param {string} dest - Must be a valid dirpath to an existing directory or
   *   a valid dirpath to a new directory noted by ending with a slash.
   * @param {(boolean|Object)=} opts - A boolean value sets opts.deep.
   * @param {boolean=} opts.deep - [default= false] Whether to include sub
   *   directories.
   * @param {boolean=} opts.recursive - Alias for opts.deep.
   * @param {boolean=} opts.buffer - [default= true] Use a buffer.
   * @param {string=} opts.encoding - [default= "utf8"] - Only applies if
   *   opts.buffer is false.
   * @param {?string=} opts.eol - [default= "LF"] The end of line character
   *   to use when normalizing a string result. If opts.buffer is true or
   *   opts.eol is null no normalization is completed.
   *   Optional values: "LF", "CR", "CRLF"
   * @return {!Array} The filepaths copied to the dest.
   */
  copy.directory = function copyDirectory(source, dest, opts) {

    opts = _is.bool(opts) ? { deep: opts } : opts;

    if ( _is._str(dest) && _match(dest, /\/$/) ) _makeDir(dest);

    if ( !_is.dir(source)      ) throw _error.type('source', 'directory');
    if ( !_is.dir(dest)        ) throw _error.type('dest',   'directory');
    if ( !_is.nil.un.obj(opts) ) throw _error.type('opts',   'directory');

    if (opts) {
      if ( !_is.un.bool(opts.deep)       ) throw _error.type('opts.deep',      'directory');
      if ( !_is.un.bool(opts.recursive)  ) throw _error.type('opts.recursive', 'directory');
      if ( !_is.un.bool(opts.buffer)     ) throw _error.type('opts.buffer',    'directory');
      if ( !_is.un.str(opts.encoding)    ) throw _error.type('opts.encoding',  'directory');
      if ( !_is.nil.un.str(opts.eol)     ) throw _error.type('opts.eol',       'directory');
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
      contents = opts.eol ? _normalize(contents, opts.eol) : contents;
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


////////////////////////////////////////////////////////////////////////////////
// IS
////////////////////////////////////////////////////////////////////////////////

(function fsIsPrivateScope() {

  //////////////////////////////////////////////////////////
  // PUBLIC METHODS
  // - is.buffer    (is.buf)
  // - is.directory (is.dir)
  // - is.file
  //////////////////////////////////////////////////////////

  /**
   * @public
   * @param {*} val
   * @return {boolean}
   */
  is.buffer = function isBuffer(val) {
    switch (arguments.length) {
      case 0:  throw _error('Missing a val', 'buffer');
      case 1:  return _is.buffer(val);
      default: return _are(arguments, _is.buffer);
    }
  };
  // define shorthand
  is.buf = is.buffer;

  /**
   * @public
   * @param {*} dirpath
   * @return {boolean}
   */
  is.directory = function isDirectory(dirpath) {
    switch (arguments.length) {
      case 0:  throw _error('Missing a dirpath', 'directory');
      case 1:  return _is.dir(dirpath);
      default: return _are(arguments, _is.dir);
    }
  };
  // define shorthand
  is.dir = is.directory;

  /**
   * @public
   * @param {*} filepath
   * @return {boolean}
   */
  is.file = function isFile(filepath) {
    switch (arguments.length) {
      case 0:  throw _error('Missing a filepath', 'file');
      case 1:  return _is.file(filepath);
      default: return _are(arguments, _is.file);
    }
  };

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - ARE
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @param {!Arguments} vals
   * @param {function} check
   * @return {boolean}
   */
  function _are(vals, check) {

    /** @type {number} */
    var i;

    i = vals.length;
    while (i--) {
      if ( !check(vals[i]) ) return false;
    }
    return true;
  }

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - GENERAL
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @type {!ErrorAid}
   */
  var _error = newErrorAid('is');

  //////////////////////////////////////////////////////////
  // END OF PRIVATE SCOPE FOR IS
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

    if ( !_is.str(filepath) ) throw _error.type('filepath', 'file');

    if ( _is.buffer(contents) ) {
      fs.writeFileSync(filepath, contents);
      return contents;
    }

    if ( !_is.str(contents)        ) throw _error.type('contents', 'file');
    if ( !_is.nil.un.str(encoding) ) throw _error.type('encoding', 'file');

    encoding = _is.undefined(encoding) ? 'utf8' : encoding;
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
  is:     is,
  to:     to
};
