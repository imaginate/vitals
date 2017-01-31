/**
 * -----------------------------------------------------------------------------
 * VITALS JS - NODE VERSION - FILE SYSTEM METHODS
 * -----------------------------------------------------------------------------
 * @file A JavaScript library of utility methods designed for elegance,
 *   performance, and reliability.
 * @version 4.1.2
 * @see [vitals]{@link https://github.com/imaginate/vitals}
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2017 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Annotations:
 * @see [JSDoc3](http://usejsdoc.org)
 * @see [Closure Compiler JSDoc Syntax](https://developers.google.com/closure/compiler/docs/js-for-compiler)
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
// VITALS HELPER: _is
////////////////////////////////////////////////////////////////////////////////

var _is = (function _isPrivateScope() {

  /** @type {!Object} */
  var is = {};

  //////////////////////////////////////////////////////////
  // PRIMITIVES
  //////////////////////////////////////////////////////////

  /**
   * @param {*} val
   * @return {boolean}
   */
  is.nil = function isNull(val) {
    return val === null;
  };

  /**
   * @param {*} val
   * @return {boolean}
   */
  is.undefined = function isUndefined(val) {
    return val === undefined;
  };

  /**
   * @param {*} val
   * @return {boolean}
   */
  is.bool = function isBoolean(val) {
    return typeof val === 'boolean';
  };

  /**
   * @param {*} val
   * @return {boolean}
   */
  is.str = function isString(val) {
    return typeof val === 'string';
  };

  /**
   * Empty strings return false in this method.
   * @param {*} val
   * @return {boolean}
   */
  is._str = function isNonEmptyString(val) {
    return !!val && typeof val === 'string';
  };

  /**
   * @param {*} val
   * @return {boolean}
   */
  is.num = function isNumber(val) {
    return typeof val === 'number' && val === val;
  };

  /**
   * Zeros return false in this method.
   * @param {*} val
   * @return {boolean}
   */
  is._num = function isNonZeroNumber(val) {
    return !!val && typeof val === 'number' && val === val;
  };

  /**
   * @param {*} val
   * @return {boolean}
   */
  is.nan = function isNan(val) {
    return val !== val;
  };

  //////////////////////////////////////////////////////////
  // JS OBJECTS
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @return {string}
   */
  var toStr = Object.prototype.toString;

  /**
   * @param {*} val
   * @return {boolean}
   */
  is.obj = function isObject(val) {
    return !!val && typeof val === 'object';
  };

  /**
   * Functions return true in this method.
   * @param {*} val
   * @return {boolean}
   */
  is._obj = function isObjectOrFunction(val) {
    val = !!val && typeof val;
    return val && (val === 'object' || val === 'function');
  };

  /**
   * @param {*} val
   * @return {boolean}
   */
  is.func = function isFunction(val) {
    return !!val && typeof val === 'function';
  };

  /**
   * @param {*} val
   * @return {boolean}
   */
  is.arr = function isArray(val) {
    return !!val && typeof val === 'object' && toStr.call(val) === '[object Array]';
  };

  /**
   * Arguments return true in this method.
   * @param {*} val
   * @return {boolean}
   */
  is._arr = function isArrayOrArguments(val) {
      if ( !is.obj(val) ) return false;
      val = toStr.call(val);
      return val === '[object Array]' || val === '[object Arguments]';
  };

  /**
   * @param {*} val
   * @return {boolean}
   */
  is.regex = function isRegExp(val) {
    return !!val && typeof val === 'object' && toStr.call(val) === '[object RegExp]';
  };

  /**
   * @param {*} val
   * @return {boolean}
   */
  is.date = function isDate(val) {
    return !!val && typeof val === 'object' && toStr.call(val) === '[object Date]';
  };

  /**
   * @param {*} val
   * @return {boolean}
   */
  is.err = function isError(val) {
    return !!val && typeof val === 'object' && toStr.call(val) === '[object Error]';
  };

  /**
   * @param {*} val
   * @return {boolean}
   */
  is.args = function isArguments(val) {
    return !!val && typeof val === 'object' && toStr.call(val) === '[object Arguments]';
  };

  //////////////////////////////////////////////////////////
  // DOM OBJECTS
  //////////////////////////////////////////////////////////

  /**
   * @param {*} val
   * @return {boolean}
   */
  is.doc = function isDOMDocument(val) {
    return !!val && typeof val === 'object' && val.nodeType === 9;
  };

  /**
   * @param {*} val
   * @return {boolean}
   */
  is.elem = function isDOMElement(val) {
    return !!val && typeof val === 'object' && val.nodeType === 1;
  };

  //////////////////////////////////////////////////////////
  // MISCELLANEOUS
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @param {*} key
   * @return {boolean}
   */
  var hasOwn = Object.prototype.hasOwnProperty;

  /**
   * Checks if a value is considered empty.
   * @param {...*} val
   * @return {boolean} Returns `false` if value is one of the following:
   *   ` 0, "", {}, [], null, undefined, false, NaN, function(){} `
   *   Note that for functions this method checks whether it has any defined
   *   params: ` function empty(){}; function notEmpty(param){}; `
   */
  is.empty = function isEmpty(val) {

    /** @type {string} */
    var key;

    // handle empty primitives - 0, "", null, undefined, false, NaN
    if (!val) return true;

    // handle functions
    if (typeof val === 'function') return !val.length;

    // handle non-empty primitives
    if (typeof val !== 'object') return false;

    // handle arrays
    if (toStr.call(val) === '[object Array]') return !val.length;

    // handle all other objects
    for (key in val) {
      if ( hasOwn.call(val, key) ) return false;
    }
    return true;
  };

  /**
   * @private
   * @type {!RegExp}
   * @const
   */
  var EOL = /^(?:cr|lf|crlf)$/i;

  /**
   * @param {string} val
   * @return {boolean}
   */
  is.eol = function isEol(val) {
    return EOL.test(val);
  };

  //////////////////////////////////////////////////////////
  // OBJECT STATES
  //////////////////////////////////////////////////////////

  /**
   * `Object.isFrozen` or a proper polyfill.
   * @param {(!Object|function)} obj
   * @return {boolean}
   */
  is.frozen = (function() {

    if (!Object.isFrozen) return function isFrozen(obj) { return false; };

    try {
      Object.isFrozen( function(){} );
      return Object.isFrozen;
    }
    catch (err) {
      return function isFrozen(obj) {
        return typeof obj === 'object' && Object.isFrozen(obj);
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
  is.whole = function isWholeNumber(val) {
    return !(val % 1);
  };

  /**
   * @param {number} val
   * @return {boolean}
   */
  is.odd = function isOddNumber(val) {
    return !!(val % 2);
  };

  /**
   * @param {number} val
   * @return {boolean}
   */
  is.even = function isEvenNumber(val) {
    return !(val % 2);
  };

  //////////////////////////////////////////////////////////
  // OR UNDEFINED
  //////////////////////////////////////////////////////////

  /** @type {!Object} */
  is.un = {};

  /**
   * @param {*} val
   * @return {boolean}
   */
  is.un.bool = function isUndefinedOrBoolean(val) {
    return val === undefined || typeof val === 'boolean';
  };

  /**
   * @param {*} val
   * @return {boolean}
   */
  is.un.str = function isUndefinedOrString(val) {
    return val === undefined || typeof val === 'string';
  };

  /**
   * @param {*} val
   * @return {boolean}
   */
  is.un.num = function isUndefinedOrNumber(val) {
    return val === undefined || (typeof val === 'number' && val === val);
  };

  /**
   * @param {*} val
   * @return {boolean}
   */
  is.un.obj = function isUndefinedOrObject(val) {
    return val === undefined || (!!val && typeof val === 'object');
  };

  /**
   * @param {*} val
   * @return {boolean}
   */
  is.un.func = function isUndefinedOrFunction(val) {
    return val === undefined || (!!val && typeof val === 'function');
  };

  /**
   * @param {*} val
   * @return {boolean}
   */
  is.un.arr = function isUndefinedOrArray(val) {
    return val === undefined || (
      !!val && typeof val === 'object' && toStr.call(val) === '[object Array]'
    );
  };

  /**
   * @param {*} val
   * @return {boolean}
   */
  is.un.regex = function isUndefinedOrRegExp(val) {
    return val === undefined || (
      !!val && typeof val === 'object' && toStr.call(val) === '[object RegExp]'
    );
  };

  //////////////////////////////////////////////////////////
  // OR NULL
  //////////////////////////////////////////////////////////

  /**
   * @param {*} val
   * @return {boolean}
   */
  is.nil.bool = function isNullOrBoolean(val) {
    return val === null || typeof val === 'boolean';
  };

  /**
   * @param {*} val
   * @return {boolean}
   */
  is.nil.str = function isNullOrString(val) {
    return val === null || typeof val === 'string';
  };

  /**
   * @param {*} val
   * @return {boolean}
   */
  is.nil.num = function isNullOrNumber(val) {
    return val === null || (typeof val === 'number' && val === val);
  };

  /**
   * @param {*} val
   * @return {boolean}
   */
  is.nil.obj = function isNullOrObject(val) {
    return val === null || (!!val && typeof val === 'object');
  };

  /**
   * @param {*} val
   * @return {boolean}
   */
  is.nil.func = function isNullOrFunction(val) {
    return val === null || (!!val && typeof val === 'function');
  };

  /**
   * @param {*} val
   * @return {boolean}
   */
  is.nil.arr = function isNullOrArray(val) {
    return val === null || (
      !!val && typeof val === 'object' && toStr.call(val) === '[object Array]'
    );
  };

  /**
   * @param {*} val
   * @return {boolean}
   */
  is.nil.regex = function isNullOrRegExp(val) {
    return val === null || (
      !!val && typeof val === 'object' && toStr.call(val) === '[object RegExp]'
    );
  };

  //////////////////////////////////////////////////////////
  // OR NULL OR UNDEFINED
  //////////////////////////////////////////////////////////

  /** @type {!Object} */
  is.nil.un = {};

  /**
   * @param {*} val
   * @return {boolean}
   */
  is.nil.un.bool = function isNullOrUndefinedOrBoolean(val) {
    return val === null || val === undefined || typeof val === 'boolean';
  };

  /**
   * @param {*} val
   * @return {boolean}
   */
  is.nil.un.str = function isNullOrUndefinedOrString(val) {
    return val === null || val === undefined || typeof  val === 'string';
  };

  /**
   * @param {*} val
   * @return {boolean}
   */
  is.nil.un.num = function isNullOrUndefinedOrNumber(val) {
    return val === null || val === undefined || (
      typeof val === 'number' && val === val
    );
  };

  /**
   * @param {*} val
   * @return {boolean}
   */
  is.nil.un.obj = function isNullOrUndefinedOrObject(val) {
    return val === null || val === undefined || (
      !!val && typeof val === 'object'
    );
  };

  /**
   * @param {*} val
   * @return {boolean}
   */
  is.nil.un.func = function isNullOrUndefinedOrFunction(val) {
    return val === null || val === undefined || (
      !!val && typeof val === 'undefined'
    );
  };

  /**
   * @param {*} val
   * @return {boolean}
   */
  is.nil.un.arr = function isNullOrUndefinedOrArray(val) {
    return val === null || val === undefined || (
      !!val && typeof val === 'object' && toStr.call(val) === '[object Array]'
    );
  };

  /**
   * @param {*} val
   * @return {boolean}
   */
  is.nil.un.regex = function isNullOrUndefinedOrRegExp(val) {
    return val === null || val === undefined || (
      !!val && typeof val === 'object' && toStr.call(val) === '[object RegExp]'
    );
  };

  ////////////////////////////////////////////////////
  // PRIVATE SCOPE END: _is
  return is;
})();


////////////////////////////////////////////////////////////////////////////////
// VITALS FS HELPER: _is
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
// VITALS HELPER: match
////////////////////////////////////////////////////////////////////////////////

var match = (function matchPrivateScope() {

  /**
   * A shortcut for `String.prototype.includes` and `RegExp.prototype.test`.
   * @param {string} source
   * @param {*} pattern
   * @return {boolean}
   */
  function match(source, pattern) {
    return isRegex(pattern)
      ? pattern.test(source)
      : inStr(source, pattern);
  }

  /**
   * @private
   * @return {string}
   */
  var toStr = Object.prototype.toString;

  /**
   * @private
   * @param {*} val
   * @return {boolean}
   */
  function isRegex(val) {
    return !!val && typeof val === 'object' && toStr.call(val) === '[object RegExp]';
  }

  /**
   * @private
   * @param {string} source
   * @param {string} str
   * @return {boolean}
   */
  var baseInStr = !!String.prototype.includes
    ? function baseInStr(source, str) { return source.includes(str); }
    : function baseInStr(source, str) { return source.indexOf(str) !== -1; };

  /**
   * @private
   * @param {string} source
   * @param {*} str
   * @return {boolean}
   */
  function inStr(source, str) {
    str = String(str);
    if (!source) return !str;
    if (!str) return true;
    return baseInStr(source, str);
  }

  ////////////////////////////////////////////////////
  // PRIVATE SCOPE END: match
  return match;
})();


////////////////////////////////////////////////////////////////////////////////
// VITALS HELPER: newErrorMaker
////////////////////////////////////////////////////////////////////////////////

/**
 * @param {string} main - A vitals method.
 * @return {function}
 */
function newErrorMaker(main) {

  main = 'vitals.' + main;

  /**
   * @param {string} msg
   * @param {string=} method
   * @return {!Error} 
   */
  var maker = function error(msg, method) {

    /** @type {!Error} */
    var err;

    method = method ? main : main + '.' + method;
    err = new Error(msg + ' for ' + method + ' call.');
    err.__vitals = true;
    err.vitals = true;
    return err;
  };

  /**
   * @param {string} param
   * @param {string=} method
   * @return {!TypeError} 
   */
  maker.type = function typeError(param, method) {

    /** @type {!TypeError} */
    var err;

    param += ' param';
    method = method ? main : main + '.' + method;
    err = new TypeError('Invalid ' + param + ' in ' + method + ' call.');
    err.__vitals = true;
    err.vitals = true;
    return err;
  };

  /**
   * @param {string} param
   * @param {string=} valid
   * @param {string=} method
   * @return {!RangeError} 
   */
  maker.range = function rangeError(param, valid, method) {

    /** @type {!RangeError} */
    var err;
    /** @type {string} */
    var msg;

    param += ' param';
    method = method ? main : main + '.' + method;
    msg = 'The '+ param +' was out-of-range for a '+ method +' call.';
    msg += valid ? ' The valid options are: ' + valid : '';
    err = new RangeError(msg);
    err.__vitals = true;
    err.vitals = true;
    return err;
  };

  return maker;
}

////////////////////////////////////////////////////////////////////////////////
// VITALS HELPER: normalize
////////////////////////////////////////////////////////////////////////////////

var normalize = (function normalizePrivateScope() {

  /**
   * @private
   * @type {!Object}
   * @const
   */
  var OPTS = {
    'CRLF': { 'pattern': /\r?\n|\r\n?/g, 'value': '\r\n' },
    'CR':   { 'pattern': /\r?\n/g,       'value': '\r'   },
    'LF':   { 'pattern': /\r\n?/g,       'value': '\n'   }
  };

  /**
   * @param {string} str
   * @param {string} eol
   * @return {string}
   */
  function normalize(str, eol) {
    eol = OPTS[eol];
    return str.replace(eol.pattern, eol.value);
  }

  ////////////////////////////////////////////////////
  // PRIVATE SCOPE END: normalize
  return normalize;
})();


////////////////////////////////////////////////////////////////////////////////
// VITALS HELPER: own
////////////////////////////////////////////////////////////////////////////////

var own = (function ownPrivateScope() {

  /**
   * @private
   * @param {*} key
   * @return {boolean}
   */
  var hasOwn = Object.prototype.hasOwnProperty;

  /**
   * @param {(Object|?function)} source
   * @param {*} key
   * @return {boolean}
   */
  function own(source, key) {
    return !!source && hasOwn.call(source, key);
  }

  ////////////////////////////////////////////////////
  // PRIVATE SCOPE END: own
  return own;
})();



// *****************************************************************************
// SECTION: FILE SYSTEM METHODS
// *****************************************************************************


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


////////////////////////////////////////////////////////////////////////////////
// VITALS FS METHOD: is
////////////////////////////////////////////////////////////////////////////////

(function fsIsPrivateScope() {

  //////////////////////////////////////////////////////////
  // PUBLIC METHODS
  // - is.buffer    (is.buf)
  // - is.directory (is.dir)
  // - is.file
  //////////////////////////////////////////////////////////

  /**
   * Checks if a value(s) is a `Buffer` instance.
   *
   * @public
   * @param {...*} val
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
   * Checks if a value(s) is a valid directory-path.
   *
   * @public
   * @param {...*} dirpath
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
   * Checks if a value(s) is a valid file-path.
   *
   * @public
   * @param {...*} filepath
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
  var _error = newErrorMaker('is');

  //////////////////////////////////////////////////////////
  // END OF PRIVATE SCOPE FOR IS
})();


////////////////////////////////////////////////////////////////////////////////
// VITALS FS METHOD: to
////////////////////////////////////////////////////////////////////////////////

(function fsToPrivateScope() {

  //////////////////////////////////////////////////////////
  // PUBLIC METHODS
  // - to.file
  //////////////////////////////////////////////////////////

  /**
   * Move the contents of a file to a new or existing file.
   *
   * @public
   * @param {(!Buffer|string)} contents
   * @param {string} filepath
   * @param {?string=} encoding - [default= 'utf8'] If `null` no encoding is set.
   * @return {(!Buffer|string)} The contents.
   */
  to.file = function toFile(contents, filepath, encoding) {

    if ( !_is.str(filepath)        ) throw _error.type('filepath', 'file');
    if ( !_is.nil.un.str(encoding) ) throw _error.type('encoding', 'file');

    if ( _is.buffer(contents) ) {
      encoding = encoding || null;
    }
    else if ( !_is.str(contents) ) throw _error.type('contents', 'file');

    encoding = _is.undefined(encoding) ? 'utf8' : encoding;
    if (encoding) fs.writeFileSync(filepath, contents, encoding);
    else fs.writeFileSync(filepath, contents);
    return contents;
  };

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - GENERAL
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @type {!ErrorAid}
   */
  var _error = newErrorMaker('to');

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
