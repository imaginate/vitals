/**
 * -----------------------------------------------------------------------------
 * VITALS JS - NODE VERSION - BASE METHODS
 * -----------------------------------------------------------------------------
 * @file A JavaScript library of utility methods designed for elegance,
 *   performance, and reliability.
 * @version 2.3.2
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
// PRIVATE HELPER - ESCAPE
////////////////////////////////////////////////////////////////////////////////

var _escape = (function _escapePrivateScope() {

  /**
   * @param {string} source
   * @param {boolean=} anyChars
   * @param {?RegExp=} escapeChars
   * @return {string}
   */
  function _escape(source, anyChars, escapeChars) {
    return escapeChars
      ? source.replace(escapeChars, '\\$&')
      : anyChars
        ? anyEscape(source)
        : source.replace(ALL_ESCAPE_CHARS, '\\$&');
  }

  /**
   * @private
   * @type {!RegExp}
   * @const
   */
  var ALL_ESCAPE_CHARS = /[\\^$.*+?|(){}[\]]/g;

  /**
   * @private
   * @type {!RegExp}
   * @const
   */
  var ANY_ESCAPE_CHARS = /[\\^$.+?|(){}[\]]/g;

  /**
   * @private
   * @type {!RegExp}
   * @const
   */
  var ANY_REPLACE = /(\\+)\*/g;

  /**
   * @private
   * @param {string} source
   * @return {string}
   */
  function anyEscape(source) {
    source = source.replace(ANY_ESCAPE_CHARS, '\\$&');
    return ANY_REPLACE.test(source)
      ? source.replace(ANY_REPLACE, anyReplacer)
      : source;
  }

  /**
   * @private
   * @param {string} match
   * @param {?string=} capture
   * @return {string}
   */
  function anyReplacer(match, capture) {

    /** @type {number} */
    var len;

    len = capture.length >>> 1; // len = capture.length / 2;
    return len % 2 ? match.substr(1) : match; // is.odd(len) ? ...
  }

  //////////////////////////////////////////////////////////
  // END OF PRIVATE SCOPE FOR ESCAPE
  return _escape;
})();


////////////////////////////////////////////////////////////////////////////////
// PRIVATE HELPER - IN-ARR
////////////////////////////////////////////////////////////////////////////////

/**
 * @param {!Object} source
 * @param {*} val
 * @return {boolean}
 */
function _inArr(source, val) {

  /** @type {number} */
  var len;
  /** @type {number} */
  var i;

  len = source.length;
  i = -1;
  while (++i < len) {
    if (source[i] === val) return true;
  }
  return false;
}

////////////////////////////////////////////////////////////////////////////////
// PRIVATE HELPER - IN-OBJ
////////////////////////////////////////////////////////////////////////////////

/**
 * @param {!(Object|function)} source
 * @param {*} val
 * @return {boolean}
 */
function _inObj(source, val) {

  /** @type {string} */
  var key;

  for (key in source) {
    if ( _own(source, key) && source[key] === val ) return true;
  }
  return false;
}

////////////////////////////////////////////////////////////////////////////////
// PRIVATE HELPER - IN-STR
////////////////////////////////////////////////////////////////////////////////

var _inStr = (function _inStrPrivateScope() {

  /**
   * A shortcut for String.prototype.includes.
   * @param {string} source
   * @param {*} str
   * @return {boolean}
   */
  function _inStr(source, str) {
    str = String(str);
    if (!source) return !str;
    if (!str) return true;
    return stringIncludes(source, str);
  }

  /**
   * @private
   * @param {string} source
   * @param {string} str
   * @return {boolean}
   */
  var stringIncludes = !!String.prototype.includes
    ? function stringIncludes(source, str) {
        return source.includes(str);
      }
    : function stringIncludes(source, str) {
        return source.indexOf(str) !== -1;
      };

  //////////////////////////////////////////////////////////
  // END OF PRIVATE SCOPE FOR IN-STR
  return _inStr;
})();


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
  return is.regex(pattern) ? pattern.test(source) : _inStr(source, pattern);
}

////////////////////////////////////////////////////////////////////////////////
// PRIVATE HELPER - MERGE
////////////////////////////////////////////////////////////////////////////////


/**
 * @param {!(Object|function)} dest
 * @param {!(Object|function)} source
 * @return {!(Object|function)}
 */
function _merge(dest, source, deep) {

  /** @type {string} */
  var key;

  for (key in source) {
    if ( _own(source, key) ) {
      dest[key] = source[key];
    }
  }
  return dest;
}

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
// PRIVATE HELPER - OWN-ENUM
////////////////////////////////////////////////////////////////////////////////

var _ownEnum = (function _ownEnumPrivateScope() {

  /**
   * @param {?(Object|function)} source
   * @param {*} key
   * @return {boolean}
   */
  function _ownEnum(source, key) {
    return !!source && _propertyIsEnumerable.call(source, key);
  }

  /**
   * @private
   * @param {*} key
   * @return {boolean}
   */
  var _propertyIsEnumerable = Object.prototype.propertyIsEnumerable;

  //////////////////////////////////////////////////////////
  // END OF PRIVATE SCOPE FOR OWN-ENUM
  return _ownEnum;
})();


////////////////////////////////////////////////////////////////////////////////
// PRIVATE HELPER - SLICE-ARR
////////////////////////////////////////////////////////////////////////////////

/**
 * @param {!(Object|function)} source
 * @param {number=} start - [default= 0]
 * @param {number=} end - [default= source.length]
 * @return {!Array}
 */
function _sliceArr(source, start, end) {

  /** @type {!Array} */
  var arr;
  /** @type {number} */
  var len;
  /** @type {number} */
  var ii;
  /** @type {number} */
  var i;

  len = source.length;
  start = start
    ? start < 0
      ? len + start
      : start
    : 0;
  start = start < 0 ? 0 : start;
  end = is.undefined(end) || end > len
    ? len
    : end < 0
      ? len + end
      : end;

  if (start >= end) return [];

  arr = new Array(end - start);
  ii = start - 1;
  i = 0;
  while (++ii < end) {
    arr[i++] = source[ii];
  }
  return arr;
}

////////////////////////////////////////////////////////////////////////////////
// PRIVATE HELPER - SLICE-STR
////////////////////////////////////////////////////////////////////////////////

/**
 * @param {string} str
 * @param {number=} start - [default= 0]
 * @param {number=} end - [default= str.length]
 * @return {string}
 */
function _sliceStr(str, start, end) {

  /** @type {number} */
  var len;

  len = str.length;
  start = start
    ? start < 0
      ? len + start
      : start
    : 0;
  start = start < 0 ? 0 : start;
  end = is.undefined(end) || end > len
    ? len
    : end < 0
      ? len + end
      : end;

  return start >= end ? '' : str.substring(start, end);
}

////////////////////////////////////////////////////////////////////////////////
// PRIVATE HELPER - SPLIT-KEYS
////////////////////////////////////////////////////////////////////////////////

/**
 * @param {string} keys - One of the chars in the following list is used as
 *   the separator (chars listed in order of use):  ", "  ","  "|"  " "
 * @return {!Array<string>}
 */
function _splitKeys(keys) {

  /** @type {string} */
  var separator;

  separator = _inStr(keys, ', ')
    ? ', '  : _inStr(keys, ',')
      ? ',' : _inStr(keys, '|')
        ? '|' : ' ';
  return keys.split(separator);
}


// *****************************************************************************
// SECTION: BASE METHODS
// *****************************************************************************


////////////////////////////////////////////////////////////////////////////////
// COPY
////////////////////////////////////////////////////////////////////////////////

var copy = (function copyPrivateScope() {

  //////////////////////////////////////////////////////////
  // PUBLIC METHODS
  // - copy
  // - copy.object (copy.obj)
  // - copy.array  (copy.arr|copy.args)
  // - copy.regexp (copy.re|copy.regex)
  // - copy.func   (copy.fn|copy.function*)
  //
  // * Note that copy.function will fail in all ES3 browser
  //   environments and even some ES5. Use copy.func for
  //   compatibility with older browser environments.
  //////////////////////////////////////////////////////////

  /**
   * Returns a copy of the given value.
   * @public
   * @param {*} val
   * @param {boolean=} deep
   * @return {*}
   */
  function copy(val, deep) {

    if ( !is('bool=', deep) ) throw _error.type('deep');

    return !is._obj(val)
      ? val
      : is.func(val)
        ? _copyFunc(val, deep)
        : is._arr(val)
          ? _copyArr(val, deep)
          : is.regex(val)
            ? _copyRegex(val)
            : _copyObj(val, deep);  
  }

  /**
   * Creates a new object with the properties of the given object.
   * @public
   * @param {!Object} obj
   * @param {boolean=} deep
   * @return {!Object}
   */
  copy.object = function copyObject(obj, deep) {

    if ( !is.obj(obj)       ) throw _error.type('obj',  'object');
    if ( !is('bool=', deep) ) throw _error.type('deep', 'object');

    return _copyObj(obj, deep);
  };
  // define shorthand
  copy.obj = copy.object;

  /**
   * Creates a new array with the properties of the given object.
   * @public
   * @param {!Object} obj
   * @param {boolean=} deep
   * @return {!Array}
   */
  copy.array = function copyArray(obj, deep) {

    if ( !is.obj(obj)        ) throw _error.type('obj',        'array');
    if ( !is.num(obj.length) ) throw _error.type('obj.length', 'array');
    if ( !is('bool=', deep)  ) throw _error.type('deep',       'array');

    return _copyArr(obj, deep);
  };
  // define shorthand
  copy.arr = copy.array;
  copy.args = copy.array;

  /**
   * Creates a new RegExp from a given RegExp.
   * @public
   * @param {!RegExp} regex
   * @param {boolean=} forceGlobal
   * @return {!RegExp}
   */
  copy.regexp = function copyRegexp(regex, forceGlobal) {

    if ( !is.regex(regex)          ) throw _error.type('regex',       'regexp');
    if ( !is('bool=', forceGlobal) ) throw _error.type('forceGlobal', 'regexp');

    return _copyRegex(regex, forceGlobal);
  };
  // define shorthand
  copy.re = copy.regexp;
  copy.regex = copy.regexp;

  /**
   * Creates a new function with the properties of the given function. Use
   *   copy.func instead of copy.function in browser environments for
   *   compatibility.
   * @public
   * @param {function} func
   * @param {boolean=} deep
   * @return {function}
   */
  copy.func = function copyFunction(func, deep) {

    if ( !is.func(func)     ) throw _error.type('func', 'function');
    if ( !is('bool=', deep) ) throw _error.type('deep', 'function');

    return _copyFunc(func, deep);
  };
  // define shorthand
  try {
    copy.fn = copy.func;
    copy.function = copy.func;
  }
  catch (e) {}

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - MAIN
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @param {!Object} obj
   * @param {boolean=} deep
   * @return {!Object}
   */
  function _copyObj(obj, deep) {
    return deep ? _mergeDeep({}, obj) : _merge({}, obj);
  }

  /**
   * @private
   * @param {!Object} obj
   * @param {boolean=} deep
   * @return {!Array}
   */
  function _copyArr(obj, deep) {

    /** @type {!Array} */
    var arr;

    arr = new Array(obj.length);
    return deep ? _mergeDeep(arr, obj) : _merge(arr, obj);
  }

  /**
   * @private
   * @param {!RegExp} regex
   * @param {boolean=} forceGlobal
   * @return {!RegExp}
   */
  function _copyRegex(regex, forceGlobal) {

    /** @type {string} */
    var source;
    /** @type {string} */
    var flags;

    source = _escape(regex.source);
    flags = _setupFlags(regex, forceGlobal);

    return flags ? new RegExp(source, flags) : new RegExp(source);
  }

  /**
   * @private
   * @param {function} func
   * @param {boolean=} deep
   * @return {function}
   */
  function _copyFunc(func, deep) {

    /** @type {function} */
    var copiedFunc;

    copiedFunc = function copiedFunction() {
      return func.apply(null, arguments);
    };
    return deep ? _mergeDeep(copiedFunc, func) : _merge(copiedFunc, func);
  }

  //////////////////////////////////////////////////////////
  // PRIVATE PROPERTIES - COPY.REGEXP
  //////////////////////////////////////////////////////////

  /**
   * Returns a properly escaped RegExp.prototype.source.
   * @private
   * @param {string} source
   * @return {string}
   */
  var _escape = (function() {

    /** @type {?RegExp} */
    var pattern = /\n/.source !== '\\n' ? /\\/g : null;

    return pattern
      ? function _escape(source) { return source.replace(pattern, '\\\\'); }
      : function _escape(source) { return source; };
  })();

  /**
   * @private
   * @type {!Object}
   * @const
   */
  var FLAGS = _merge({
    ignoreCase: 'i',
    multiline:  'm',
    global:     'g'
  }, 'sticky' in RegExp.prototype ? { sticky: 'y' } : null);

  /**
   * @private
   * @param {!RegExp} regex
   * @param {boolean=} forceGlobal
   * @return {string}
   */
  function _setupFlags(regex, forceGlobal) {

    /** @type {string} */
    var flags;
    /** @type {string} */
    var key;

    flags = '';
    for (key in FLAGS) {
      if ( _own(FLAGS, key) && regex[key] ) {
        flags += FLAGS[key];
      }
    }

    if ( is.undefined(forceGlobal) ) return flags;

    return _inStr(flags, 'g')
      ? forceGlobal
        ? flags
        : flags.replace('g', '')
      : forceGlobal
        ? flags + 'g'
        : flags;
  }

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - GENERAL
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @param {!(Object|function)} dest
   * @param {!(Object|function)} source
   * @return {!(Object|function)}
   */
  function _mergeDeep(dest, source) {

    /** @type {string} */
    var key;

    for (key in source) {
      if ( _own(source, key) ) {
        dest[key] = copy(source[key], true);
      }
    }
    return dest;
  }

  /**
   * @private
   * @type {!ErrorAid}
   */
  var _error = newErrorAid('copy');

  //////////////////////////////////////////////////////////
  // END OF PRIVATE SCOPE FOR COPY
  return copy;
})();


////////////////////////////////////////////////////////////////////////////////
// CUT
////////////////////////////////////////////////////////////////////////////////

var cut = (function cutPrivateScope() {

  //////////////////////////////////////////////////////////
  // PUBLIC METHODS
  // - cut
  // - cut.property   (cut.prop)
  // - cut.key
  // - cut.index      (cut.i)
  // - cut.type
  // - cut.value      (cut.val)
  // - cut.pattern
  // - cut.properties (cut.props)
  // - cut.keys
  // - cut.indexes    (cut.ii)
  // - cut.values     (cut.vals)
  // - cut.patterns
  //////////////////////////////////////////////////////////

  /**
   * Removes properties from an object/array or patterns from a string
   *   and returns the amended source.
   * @public
   * @param {!(Object|function|Array|string)} source
   * @param {...*} vals - If only one val is provided and it is an array it is
   *   considered an array of vals. Details are as follows (per source type):
   *     object source:
   *       - leading val is RegExp: This method will delete all properties with
   *       keys that match each val. If any following vals are not a RegExp they
   *       are converted to a string.
   *       - leading val is string: This method will delete all properties where
   *       key === val. All vals are converted to a string.
   *       - leading val is function: The val is considered a filter function
   *       (i.e. if it returns false the property is deleted). It has the
   *       optional params - value, key, source. Note this method lazily clones
   *       the source based on the filter's [length property]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/length}
   *       (i.e. if you alter the source object within the filter ensure to
   *       define the filter's third param so you can safely assume all
   *       references to the source are its original values).
   *       - all other cases: This method will delete all properties where
   *       value === val. 
   *     array source:
   *       - all vals are numbers: This method will splice from the source each
   *       corresponding index.
   *       - leading val is function: The val is considered a filter function
   *       (i.e. if it returns false the property is spliced from the source).
   *       It has the optional params - value, index, source. Note this method
   *       lazily clones the source based on the filter's [length property]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/length}
   *       (i.e. if you alter the source object within the filter ensure to
   *       define the filter's third param so you can safely assume all
   *       references to the source are its original values).
   *       - all other cases: This method will splice from the source all
   *       properties where value === val.
   *     string source: All vals that are not a RegExp or string are converted
   *       to a string. Each matching substring is removed from the source.
   * @param {Object=} thisArg - If source is an object/array, val is a filter
   *   function, and thisArg is defined the filter is bound to its value.
   * @return {!(Object|function|Array|string)} The amended source.
   */
  function cut(source, vals, thisArg) {

    if (arguments.length < 2) throw _error('No val defined');

    if ( is.str(source) ) {
      vals = arguments.length > 2 ? _sliceArr(arguments, 1) : vals;
      return is.arr(vals)
        ? _cutPatterns(source, vals)
        : _cutPattern(source, vals);
    }

    if ( !is._obj(source) ) throw _error.type('source');

    source = is.args(source) ? _sliceArr(source) : source;

    if ( is.func(vals) ) {
      if ( !is('obj=', thisArg) ) throw _error.type('thisArg');
      return is.arr(source)
        ? _filterArr(source, vals, thisArg)
        : _filterObj(source, vals, thisArg);
    }

    vals = arguments.length > 2 ? _sliceArr(arguments, 1) : vals;
    return is.arr(vals) ? _cutProps(source, vals) : _cutProp(source, vals);
  }

  /**
   * Removes a property from an object/array and returns the object.
   * @public
   * @param {!(Object|function|Array)} source
   * @param {*} val - The details are as follows (per source type):
   *   object source:
   *     - val is RegExp: This method will delete all properties with a key that
   *     matches the val.
   *     - val is string: This method will delete all properties where
   *     key === val.
   *     - val is function: The val is considered a filter function (i.e. if it
   *     returns false the property is deleted). It has the optional params -
   *     value, key, source. Note this method lazily clones the source based on
   *     the filter's [length property]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/length}
   *     (i.e. if you alter the source object within the filter ensure to define
   *     the filter's third param so you can safely assume all references to the
   *     source are its original values).
   *     - all other cases: This method will delete all properties where
   *     value === val.
   *   array source:
   *     - val is number: This method will splice the index from the source.
   *     - val is function: The val is considered a filter function (i.e. if it
   *     returns false the property is spliced from the source). It has the
   *     optional params - value, index, source. Note this method lazily clones
   *     the source based on the filter's [length property]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/length}
   *     (i.e. if you alter the source object within the filter ensure to define
   *     the filter's third param so you can safely assume all references to the
   *     source are its original values).
   *     - all other cases: This method will splice from the source all
   *     properties where value === val.
   * @param {Object=} thisArg - If val is a filter function and thisArg is
   *   defined the filter is bound to its value.
   * @return {!(Object|function|Array)}
   */
  cut.property = function cutProperty(source, val, thisArg) {

    if ( !is._obj(source) ) throw _error.type('source', 'property');
    if (arguments.length < 2) throw _error('No val defined', 'property');

    source = is.args(source) ? _sliceArr(source) : source;

    if ( is.func(val) ) {
      if ( !is('obj=', thisArg) ) throw _error.type('thisArg', 'property');
      return is.arr(source)
        ? _filterArr(source, val, thisArg)
        : _filterObj(source, val, thisArg);
    }

    return _cutProp(source, val);
  };
  // define shorthand
  cut.prop = cut.property;

  /**
   * Removes a property by key from an object and returns the object.
   * @public
   * @param {!(Object|function)} source
   * @param {*} key - If the key is not a string it is converted to a string.
   *   If the key exists in the source object it is deleted.
   * @return {!(Object|function)}
   */
  cut.key = function cutKey(source, key) {

    if ( !is._obj(source) ) throw _error.type('source', 'key');
    if (arguments.length < 2) throw _error('No key defined', 'key');

    return _cutKey(source, key);
  };

  /**
   * Removes a property by index from an array and returns the array. If an
   *   array-like object is supplied it is sliced before removing the property.
   * @public
   * @param {!(Object|function|Array)} source
   * @param {number} index - The index to remove.
   * @param {number=} toIndex - If defined all indexes from index to toIndex
   *   (not including toIndex) are removed.
   * @return {!Array}
   */
  cut.index = function cutIndex(source, index, toIndex) {

    if ( !is._obj(source)       ) throw _error.type('source',        'index');
    if ( !is.num(source.length) ) throw _error.type('source.length', 'index');
    if ( !is.num(index)         ) throw _error.type('index',         'index');
    if ( !is('num=', toIndex)   ) throw _error.type('toIndex',       'index');

    source = is.arr(source) ? source : _sliceArr(source);
    return _cutIndex(source, index, toIndex);
  };
  // define shorthand
  cut.i = cut.index;

  /**
   * Removes all properties from an object/array with a value that matches a
   *   given type and returns the object. This method uses the
   *   [is main function]{@link https://github.com/imaginate/are/blob/master/docs/is-main-func.md}
   *   from [are]{@link https://github.com/imaginate/are} to complete type
   *   checks.
   * @public
   * @param {!(Object|function|Array)} source
   * @param {string} type - The type to check for. Refer to the
   *   [is main function docs]{@link https://github.com/imaginate/are/blob/master/docs/is-main-func.md}
   *   for acceptable options.
   * @return {!(Object|function|Array)}
   */
  cut.type = function cutType(source, type) {

    if ( !is._obj(source) ) throw _error.type('source', 'type');
    if ( !is.str(type)    ) throw _error.type('type',   'type');

    try {
      is(type, '_');
    }
    catch (err) {
      throw new RangeError(
        'Invalid type value for vitals.cut.type call. ' +
        'See error from are: ' + err.toString()
      );
    }

    source = is.args(source) ? _sliceArr(source) : source;
    return _cutType(source, type);
  };

  /**
   * Removes all properties from an object/array with a value and returns the
   *   object.
   * @public
   * @param {!(Object|function|Array)} source
   * @param {*} val
   * @return {!(Object|function|Array)}
   */
  cut.value = function cutValue(source, val) {

    if ( !is._obj(source) ) throw _error.type('source', 'value');
    if (arguments.length < 2) throw _error('No val defined', 'value');

    source = is.args(source) ? _sliceArr(source) : source;
    return _cutVal(source, val);
  };
  // define shorthand
  cut.val = cut.value;

  /**
   * Removes a pattern from a string and returns the amended string.
   * @public
   * @param {string} source
   * @param {*} pattern - If pattern is not a string or RegExp it is converted
   *   to a string.
   * @return {string}
   */
  cut.pattern = function cutPattern(source, pattern) {

    if ( !is.str(source) ) throw _error.type('source', 'pattern');
    if (arguments.length < 2) throw _error('No pattern defined', 'pattern');

    return _cutPattern(source, pattern);
  };

  /**
   * Removes properties from an object/array and returns the object. Note that
   *   the use of the word, "match", within vitals.cut.properties refers to
   *   [vitals.has.pattern]{@link https://github.com/imaginate/vitals/blob/master/src/methods/has.js}.
   * @public
   * @param {!(Object|function|Array)} source
   * @param {...*} vals - If only one val is provided and it is an array it is
   *   considered an array of vals. Details are as follows (per source type):
   *     object source:
   *       - leading val is RegExp: This method will delete all properties with
   *       keys that match each val. If any following vals are not a RegExp they
   *       are converted to a string.
   *       - leading val is string: This method will delete all properties where
   *       key === val. All vals are converted to a string.
   *       - all other cases: This method will delete all properties where
   *       value === val. 
   *     array source:
   *       - all vals are numbers: This method will splice from the source each
   *       corresponding index.
   *       - all other cases: This method will splice from the source all
   *       properties where value === val.
   * @return {!(Object|function|Array)}
   */
  cut.properties = function cutProperties(source, vals) {

    if ( !is._obj(source) ) throw _error.type('source', 'properties');
    if (arguments.length < 2) throw _error('No val defined', 'properties');

    source = is.args(source) ? _sliceArr(source) : source;
    vals = arguments.length > 2 ? _sliceArr(arguments, 1) : vals;
    return is.arr(vals) ? _cutProps(source, vals) : _cutProp(source, vals);
  };
  // define shorthand
  cut.props = cut.properties;

  /**
   * Removes properties by key from an object and returns the object.
   * @public
   * @param {!(Object|function)} source
   * @param {...*} keys - If only one key is provided and it is an array it is
   *   considered an array of keys. If a key is not a string it is converted to
   *   a string. If the key exists in the source object it is deleted.
   * @return {!(Object|function)}
   */
  cut.keys = function cutKeys(source, keys) {

    if ( !is._obj(source) ) throw _error.type('source', 'keys');
    if (arguments.length < 2) throw _error('No key defined', 'keys');

    keys = arguments.length > 2 ? _sliceArr(arguments, 1) : keys;
    return is.arr(keys) ? _cutKeys(source, keys) : _cutKey(source, keys);
  };

  /**
   * Removes properties by index from an array and returns the array. If an
   *   array-like object is supplied it is sliced before completing the cut.
   * @public
   * @param {!(Object|function|Array)} source
   * @param {...number} indexes - If only one index is provided and it is an
   *   array it is considered an array of indexes. The indexes to remove.
   * @return {!Array}
   */
  cut.indexes = function cutIndexes(source, indexes) {

    if ( !is._obj(source)       ) throw _error.type('source',        'indexes');
    if ( !is.num(source.length) ) throw _error.type('source.length', 'indexes');
    if (arguments.length < 2) throw _error('No index defined', 'indexes');

    source = is.arr(source) ? source : _sliceArr(source);
    indexes = arguments.length > 2 ? _sliceArr(arguments, 1) : indexes;

    if ( !is.arr(indexes) ) {
      if ( !is.num(indexes) ) throw _error.type('index', 'indexes');
      return _cutIndex(source, indexes);
    }

    if ( !is('!nums', indexes) ) throw _error.type('index', 'indexes');

    return _cutIndexes(source, indexes);
  };
  // define shorthand
  cut.ii = cut.indexes;

  /**
   * Removes all properties from an object/array with a value and returns the
   *   object.
   * @public
   * @param {!(Object|function|Array)} source
   * @param {...*} vals - If only one val is provided and it is an array it is
   *   considered an array of vals.
   * @return {!(Object|function|Array)}
   */
  cut.values = function cutValues(source, vals) {

    if ( !is._obj(source) ) throw _error.type('source', 'value');
    if (arguments.length < 2) throw _error('No val defined', 'value');

    source = is.args(source) ? _sliceArr(source) : source;
    vals = arguments.length > 2 ? _sliceArr(arguments, 1) : vals;
    return is.arr(vals) ? _cutVals(source, vals) : _cutVal(source, vals);
  };
  // define shorthand
  cut.vals = cut.values;

  /**
   * Removes patterns from a string and returns the amended string.
   * @public
   * @param {string} source
   * @param {...*} patterns - If only one pattern is provided and it is an array
   *   it is considered an array of patterns. If a pattern is not a string or
   *   RegExp it is converted to a string.
   * @return {string}
   */
  cut.patterns = function cutPatterns(source, patterns) {

    if ( !is.str(source) ) throw _error.type('source', 'patterns');
    if (arguments.length < 2) throw _error('No pattern defined', 'patterns');

    patterns = arguments.length > 2 ? _sliceArr(arguments, 1) : patterns;
    return is.arr(patterns)
      ? _cutPatterns(source, patterns)
      : _cutPattern(source, patterns);
  };

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - MAIN
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @param {!(Object|function|Array)} source
   * @param {*} val
   * @return {!(Object|function|Array)}
   */
  function _cutProp(source, val) {
    return is.arr(source)
      ? is.num(val)
        ? _spliceKey(source, val)
        : _spliceVal(source, val)
      : is('!str|regex', val)
        ? _deleteKey(source, val)
        : _deleteVal(source, val);
  }

  /**
   * @private
   * @param {!(Object|function|Array)} source
   * @param {!Array<*>} vals
   * @return {!(Object|function|Array)}
   */
  function _cutProps(source, vals) {
    return is.arr(source)
      ? is('nums', vals)
        ? _spliceKeys(source, vals)
        : _spliceVals(source, vals)
      : is('!str|regex', vals[0])
        ? _deleteKeys(source, vals)
        : _deleteVals(source, vals);
  }

  /**
   * @private
   * @param {!(Object|function)} source
   * @param {*} key
   * @return {!(Object|function)}
   */
  function _cutKey(source, key) {
    delete source[key];
    return source;
  }

  /**
   * @private
   * @param {!(Object|function)} source
   * @param {!Array} keys
   * @return {!(Object|function)}
   */
  function _cutKeys(source, keys) {

    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    len = keys.length;
    i = -1;
    while (++i < len) delete source[ keys[i] ];
    return source;
  }

  /**
   * @private
   * @param {!Array} source
   * @param {number} key
   * @param {number=} toKey
   * @return {!Array}
   */
  function _cutIndex(source, key, toKey) {

    /** @type {number} */
    var len;

    len = source.length;
    key = key < 0 ? len + key : key;

    if (key >= len) return source;

    if ( is.undefined(toKey) ) {
      if (key < 0) return source;
      source.splice(key, 1);
      return source;
    }

    key = key < 0 ? 0 : key;
    toKey = toKey > len
      ? len
      : toKey < 0
        ? len + toKey
        : toKey;

    if (key >= toKey) return source;

    source.splice(key, toKey - key);
    return source;
  }

  /**
   * @private
   * @param {!Array} source
   * @param {!Array<number>} keys
   * @return {!Array}
   */
  function _cutIndexes(source, keys) {
    return _spliceKeys(source, keys);
  }

  /**
   * @private
   * @param {!(Object|function|Array)} source
   * @param {string} type
   * @return {!(Object|function|Array)}
   */
  function _cutType(source, type) {
    return is.arr(source)
      ? _spliceValByType(source, type)
      : _deleteValByType(source, type);
  }

  /**
   * @private
   * @param {!(Object|function|Array)} source
   * @param {*} val
   * @return {!(Object|function|Array)}
   */
  function _cutVal(source, val) {
    return is.arr(source) ? _spliceVal(source, val) : _deleteVal(source, val);
  }

  /**
   * @private
   * @param {!(Object|function|Array)} source
   * @param {!Array<*>} vals
   * @return {!(Object|function|Array)}
   */
  function _cutVals(source, vals) {
    return is.arr(source)
      ? _spliceVals(source, vals)
      : _deleteVals(source, vals);
  }

  /**
   * @private
   * @param {string} source
   * @param {*} pattern
   * @return {string}
   */
  function _cutPattern(source, pattern) {
    if ( !is.regex(pattern) ) {
      pattern = String(pattern);
      pattern = _escape(pattern, true);
      pattern = new RegExp(pattern, 'g');
    }
    return source.replace(pattern, '');
  }

  /**
   * @private
   * @param {string} source
   * @param {!Array} patterns
   * @return {string}
   */
  function _cutPatterns(source, patterns) {

    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    len = patterns.length;
    i = -1;
    while (++i < len) {
      source = _cutPattern(source, patterns[i]);
    }
    return source;
  }

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - DELETE
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @param {!(Object|function)} source
   * @param {*} key
   * @param {boolean=} match
   * @return {!(Object|function)}
   */
  function _deleteKey(source, key, match) {

    /** @type {!RegExp} */
    var pattern;

    match = is.undefined(match) ? is.regex(key) : match;

    if (!match) {
      if ( _own(source, key) ) delete source[key];
      return source;
    }

    pattern = key;
    for (key in source) {
      if ( _own(source, key) && _match(key, pattern) ) {
        delete source[key];
      }
    }
    return source;
  }

  /**
   * @private
   * @param {!(Object|function)} source
   * @param {!Array} keys
   * @return {!(Object|function)}
   */
  function _deleteKeys(source, keys) {

    /** @type {boolean} */
    var match;
    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    match = is.regex( keys[0] );
    len = keys.length;
    i = -1;
    while (++i < len) {
      source = _deleteKey(source, keys[i], match);
    }
    return source;
  }

  /**
   * @private
   * @param {!(Object|function)} source
   * @param {*} val
   * @return {!(Object|function)}
   */
  function _deleteVal(source, val) {

    /** @type {string} */
    var key;

    for (key in source) {
      if ( _own(source, key) && source[key] === val ) {
        delete source[key];
      }
    }
    return source;
  }

  /**
   * @private
   * @param {!(Object|function)} source
   * @param {string} type
   * @return {!(Object|function)}
   */
  function _deleteValByType(source, type) {

    /** @type {string} */
    var key;

    for (key in source) {
      if ( _own(source, key) && is(type, source[key]) ) {
        delete source[key];
      }
    }
    return source;
  }

  /**
   * @private
   * @param {!(Object|function)} source
   * @param {!Array} vals
   * @return {!(Object|function)}
   */
  function _deleteVals(source, vals) {

    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    len = vals.length;
    i = -1;
    while (++i < len) {
      source = _deleteVal(source, vals[i]);
    }
    return source;
  }

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - SPLICE
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @param {!Array} source
   * @param {number} key
   * @return {!Array}
   */
  function _spliceKey(source, key) {

    /** @type {number} */
    var len;

    len = source.length;
    key = key < 0 ? len + key : key;

    if (key < 0 || key >= len) return source;

    source.splice(key, 1);
    return source;
  }

  /**
   * @private
   * @param {!Array} source
   * @param {!Array<number>} keys
   * @return {!Array}
   */
  function _spliceKeys(source, keys) {

    /** @type {!Object} */
    var sorted;
    /** @type {number} */
    var first;
    /** @type {number} */
    var count;
    /** @type {number} */
    var i;

    if (!source.length || !keys.length) return source;

    if (keys.length < 2) return _spliceKey(source, keys[0]);

    sorted = _sortIndexes(keys, source.length);
    i = sorted.first.length;
    while (i--) {
      first = sorted.first[i];
      count = sorted.last[i] - first + 1;
      source.splice(first, count);
    }
    return source;
  }

  /**
   * @private
   * @param {!Array} source
   * @param {*} val
   * @return {!Array}
   */
  function _spliceVal(source, val) {

    /** @type {number} */
    var i;

    i = source.length;
    while (i--) {
      if (source[i] === val) source.splice(i, 1);
    }
    return source;
  }

  /**
   * @private
   * @param {!Array} source
   * @param {string} type
   * @return {!Array}
   */
  function _spliceValByType(source, type) {

    /** @type {number} */
    var i;

    i = source.length;
    while (i--) {
      if ( is(type, source[i]) ) source.splice(i, 1);
    }
    return source;
  }

  /**
   * @private
   * @param {!Array} source
   * @param {!Array} vals
   * @return {!Array}
   */
  function _spliceVals(source, vals) {

    /** @type {*} */
    var val;
    /** @type {number} */
    var len;
    /** @type {number} */
    var ii;
    /** @type {number} */
    var i;

    len = vals.length;
    i = source.length;
    while (i--) {
      val = source[i];
      ii = len;
      while (ii--) {
        if (vals[ii] === val) {
          source.splice(i, 1);
          break;
        }
      }
    }
    return source;
  }

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - FILTER
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @param {!(Object|function)} source
   * @param {function} filter
   * @param {Object=} thisArg
   * @return {!(Object|function)}
   */
  function _filterObj(source, filter, thisArg) {

    /** @type {!Object} */
    var obj;
    /** @type {string} */
    var key;

    filter = is.undefined(thisArg) ? filter : _bind(filter, thisArg);
    obj = filter.length > 2 ? copy(source) : source;
    switch (filter.length) {
      case 0:
      for (key in obj) {
        if ( _own(obj, key) && !filter() ) delete source[key];
      }
      break;
      case 1:
      for (key in obj) {
        if ( _own(obj, key) && !filter(obj[key]) ) delete source[key];
      }
      break;
      case 2:
      for (key in obj) {
        if ( _own(obj, key) && !filter(obj[key], key) ) delete source[key];
      }
      break;
      default:
      for (key in obj) {
        if ( _own(obj, key) && !filter(obj[key], key, obj) ) delete source[key];
      }
    }
    return source;
  }

  /**
   * @private
   * @param {!Array} source
   * @param {function} filter
   * @param {Object=} thisArg
   * @return {!Array}
   */
  function _filterArr(source, filter, thisArg) {

    /** @type {!Array} */
    var arr;
    /** @type {number} */
    var i;

    filter = is.undefined(thisArg) ? filter : _bind(filter, thisArg);
    arr = filter.length > 2 ? copy.arr(source) : source;
    i = arr.length;
    switch (filter.length) {
      case 0:  while (i--) filter() || source.splice(i, 1);              break;
      case 1:  while (i--) filter(arr[i]) || source.splice(i, 1);        break;
      case 2:  while (i--) filter(arr[i], i) || source.splice(i, 1);     break;
      default: while (i--) filter(arr[i], i, arr) || source.splice(i, 1);
    }
    return source;
  }

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - SORT
  //////////////////////////////////////////////////////////

  /**
   * @typedef {!{
   *   first: !Array<number>,
   *   last:  !Array<number>
   * }} SortedIndexes
   */

  /**
   * @private
   * @param {!Array<number>} indexes
   * @param {number} sourceLen
   * @return {!SortedIndexes}
   */
  var _sortIndexes = (function() {

    /**
     * @private
     * @param {!Array<number>} indexes
     * @param {number} sourceLen
     * @return {!SortedIndexes}
     */
    function sortIndexes(indexes, sourceLen) {

      /** @type {number} */
      var index;
      /** @type {number} */
      var len;
      /** @type {number} */
      var i;

      setup();

      len = indexes.length;
      i = 0;

      // push 1st index
      index = parse(indexes[i], sourceLen);
      while (index === -1 && ++i < len) {
        index = parse(indexes[i], sourceLen);
      }
      push(index);

      // push remaining indexes
      while (++i < len) {
        index = parse(indexes[i], sourceLen);
        if (index !== -1) sort(index, 0, last.length);
      }

      return result();
    }

    //////////////////////////////
    // SORT MEMBERS
    // - FIRST
    // - LAST

    /** @type {!Array<number>} */
    var first;
    /** @type {!Array<number>} */
    var last;

    //////////////////////////////
    // SORT METHODS
    // - SETUP
    // - RESULT
    // - PARSE
    // - PUSH
    // - UNSHIFT
    // - INSERT
    // - REMOVE
    // - SORT
    // - COMPARE PREV
    // - COMPARE NEXT

    /**
     * @private
     * @type {function}
     */
    function setup() {
      first = [];
      last  = [];
    }

    /**
     * @private
     * @return {!SortedIndexes}
     */
    function result() {
      return {
        first: first,
        last:  last
      };
    }

    /**
     * @private
     * @param {number} index
     * @param {number} len
     * @return {number} If invalid index is given -1 is returned.
     */
    function parse(index, len) {
      index = index < 0 ? len + index : index;
      return index < 0 || index >= len ? -1 : index;
    }

    /**
     * @private
     * @param {number} index
     */
    function push(index) {
      first.push(index);
      last.push(index);
    }

    /**
     * @private
     * @param {number} index
     */
    function unshift(index) {
      first.unshift(index);
      last.unshift(index);
    }

    /**
     * @private
     * @param {number} index
     * @param {number} pos
     */
    function insert(index, pos) {
      first.splice(pos, 0, index);
      last.splice(pos, 0, index);
    }

    /**
     * @private
     * @param {number} index
     * @param {number} pos
     */
    function remove(pos) {
      first.splice(pos, 1);
      last.splice(pos, 1);
    }

    /**
     * @private
     * @param {number} index
     * @param {number} left
     * @param {number} right
     */
    function sort(index, left, right) {

      /** @type {number} */
      var mid;
      /** @type {number} */
      var min;

      mid = (left + right) >>> 1;
      min = first[mid];
      if (index < min) comparePrev(index, left, mid);
      else if (index > last[mid]) compareNext(index, mid, right);
    }

    /**
     * @private
     * @param {number} index
     * @param {number} left
     * @param {number} mid
     */
    function comparePrev(index, left, mid) {

      /** @type {number} */
      var prev;
      /** @type {number} */
      var min;
      /** @type {number} */
      var max;

      min = first[mid];
      if (!mid) {
        if (index === --min) first[mid] = index;
        else unshift(index);
        return;
      }
      prev = mid - 1;
      max = last[prev];
      if (index === --min) {
        if (index === ++max) {
          last[prev] = last[mid];
          remove(mid);
        }
        else first[mid] = index;
      }
      else if (index > max) {
        if (index === ++max) last[prev] = index;
        else insert(index, mid);
      }
      else sort(index, left, prev);
    }

    /**
     * @private
     * @param {number} index
     * @param {number} mid
     * @param {number} right
     */
    function compareNext(index, mid, right) {

      /** @type {number} */
      var next;
      /** @type {number} */
      var min;
      /** @type {number} */
      var max;

      next = mid + 1;
      max = last[mid];
      if (next === last.length) {
        if (index === ++max) last[mid] = index;
        else push(index);
        return;
      }
      min = first[next];
      if (index === ++max) {
        if (index === --min) {
          last[mid] = last[next];
          remove(next);
        }
        else last[mid] = index;
      }
      else if (index < min) {
        if (index === --min) first[next] = index;
        else insert(index, next);
      }
      else sort(index, next, right);
    }

    // END OF INDEX SORT PRIVATE SCOPE
    return sortIndexes;
  })();

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - GENERAL
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @param {function} func
   * @param {Object} thisArg
   * @return {function} 
   */
  function _bind(func, thisArg) {
    switch (func.length) {
      case 0:
      return function filter() { return func.call(thisArg); };
      case 1:
      return function filter(val) { return func.call(thisArg, val); };
      case 2:
      return function filter(val, key) { return func.call(thisArg, val, key); };
    }
    return function filter(val, key, obj) {
      return func.call(thisArg, val, key, obj);
    };
  }

  /**
   * @private
   * @type {!ErrorAid}
   */
  var _error = newErrorAid('cut');

  //////////////////////////////////////////////////////////
  // END OF PRIVATE SCOPE FOR CUT
  return cut;
})();


////////////////////////////////////////////////////////////////////////////////
// EACH
////////////////////////////////////////////////////////////////////////////////

var each = (function eachPrivateScope() {

  //////////////////////////////////////////////////////////
  // PUBLIC METHODS
  // - each
  // - each.object (each.obj)
  // - each.array  (each.arr)
  // - each.cycle  (each.time)
  //////////////////////////////////////////////////////////

  /**
   * A shortcut for iterating over object maps, arrays, or cycles.
   * @public
   * @param {!(Object|function|Array|number|string)} source - Details per type:
   *   - object source: Iterates over all properties in random order.
   *   - array source:  Iterates over all indexed properties from 0 to length.
   *   - number source: Iterates over all cycles.
   *   - string source: Converted to an array source. Use this list of chars for
   *     the separator (chars listed in order of rank):  ", "  ","  "|"  " "
   * @param {function(*=, (string|number)=, !(Object|function)=)} iteratee - It
   *   has the optional params - value, key/index, source. Note this method
   *   lazily clones the source based on the iteratee's [length property]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/length}
   *   (i.e. if you alter the source object within the iteratee ensure to define
   *   the iteratee's third param so you can safely assume all references to the
   *   source are its original values).
   * @param {Object=} thisArg - If defined the iteratee is bound to this value.
   * @return {(Object|function|Array|undefined)}
   */
  function each(source, iteratee, thisArg) {

    if ( !is.func(iteratee)   ) throw _error.type('iteratee');
    if ( !is('obj=', thisArg) ) throw _error.type('thisArg');

    if ( is.num(source) ) return _eachCycle(source, iteratee, thisArg);

    if ( is.str(source) ) source = _splitKeys(source);

    if ( !is._obj(source) ) throw _error.type('source');

    return is._arr(source)
      ? _eachArr(source, iteratee, thisArg)
      : _eachObj(source, iteratee, thisArg);
  }

  /**
   * A shortcut for iterating over object maps.
   * @public
   * @param {!(Object|function)} source
   * @param {function(*=, string=, !(Object|function)=)} iteratee - The iteratee
   *   must be a function with the optional params - value, key, source. Note
   *   this method lazily clones the source based on the iteratee's
   *   [length property]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/length}
   *   (i.e. if you alter the source object within the iteratee ensure to define
   *   the iteratee's third param so you can safely assume all references to the
   *   source are its original values).
   * @param {Object=} thisArg - If defined the iteratee is bound to this value.
   * @return {!(Object|function)}
   */
  each.object = function eachObject(source, iteratee, thisArg) {

    if ( !is._obj(source)     ) throw _error.type('source',   'object');
    if ( !is.func(iteratee)   ) throw _error.type('iteratee', 'object');
    if ( !is('obj=', thisArg) ) throw _error.type('thisArg',  'object');

    return _eachObj(source, iteratee, thisArg);
  };
  // define shorthand
  each.obj = each.object;

  /**
   * A shortcut for iterating over array-like objects.
   * @public
   * @param {!(Object|function|string)} source - If source is a string it is
   *   converted to an array. Use the following list of chars for the separator
   *   (chars listed in order of rank):  ", "  ","  "|"  " "
   * @param {function(*=, number=, !Array=)} iteratee - The iteratee must be a
   *   function with the optional params - value, index, source. Note this
   *   method lazily slices the source based on the iteratee's [length property]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/length}
   *   (i.e. if you alter the source object within the iteratee ensure to define
   *   the iteratee's third param so you can safely assume all references to the
   *   source are its original values).
   * @param {Object=} thisArg - If defined the iteratee is bound to this value.
   * @return {!(Object|function|Array)}
   */
  each.array = function eachArray(source, iteratee, thisArg) {

    if ( is.str(source) ) source = _splitKeys(source);

    if ( !is._obj(source)       ) throw _error.type('source',        'array');
    if ( !is.num(source.length) ) throw _error.type('source.length', 'array');
    if ( !is.func(iteratee)     ) throw _error.type('iteratee',      'array');
    if ( !is('obj=', thisArg)   ) throw _error.type('thisArg',       'array');

    return _eachArr(source, iteratee, thisArg);
  };
  // define shorthand
  each.arr = each.array;

  /**
   * A shortcut for iterating over a set number of cycles.
   * @public
   * @param {number} count
   * @param {function(number=)} iteratee
   * @param {Object=} thisArg - If defined the iteratee is bound to this value.
   */
  each.cycle = function eachCycle(count, iteratee, thisArg) {

    if ( !is.num(count)       ) throw _error.type('count',    'cycle');
    if ( !is.func(iteratee)   ) throw _error.type('iteratee', 'cycle');
    if ( !is('obj=', thisArg) ) throw _error.type('thisArg',  'cycle');

    return _eachCycle(count, iteratee, thisArg);
  };
  // define shorthand
  each.time = each.cycle;

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - MAIN
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @param {!(Object|function)} obj
   * @param {function(*, string=, !(Object|function)=)} iteratee
   * @param {Object=} thisArg
   * @return {!(Object|function)}
   */
  function _eachObj(obj, iteratee, thisArg) {

    /** @type {string} */
    var key;

    obj = iteratee.length > 2 ? copy(obj) : obj;
    iteratee = is.undefined(thisArg) ? iteratee : _bind(iteratee, thisArg);
    switch (iteratee.length) {
      case 0: for (key in obj) _own(obj, key) && iteratee();              break;
      case 1: for (key in obj) _own(obj, key) && iteratee(obj[key]);      break;
      case 2: for (key in obj) _own(obj, key) && iteratee(obj[key], key); break;
     default: for (key in obj) _own(obj, key) && iteratee(obj[key], key, obj);
    }
    return obj;
  }

  /**
   * @private
   * @param {!(Object|function)} obj
   * @param {function(*, number=, !Array=)} iteratee
   * @param {Object=} thisArg
   * @return {!(Object|function)}
   */
  function _eachArr(obj, iteratee, thisArg) {

    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    obj = iteratee.length > 2 ? copy.arr(obj) : obj;
    iteratee = is.undefined(thisArg) ? iteratee : _bind(iteratee, thisArg);
    len = obj.length;
    i = -1;
    switch (iteratee.length) {
      case 0:  while (++i < len) iteratee();              break;
      case 1:  while (++i < len) iteratee(obj[i]);        break;
      case 2:  while (++i < len) iteratee(obj[i], i);     break;
      default: while (++i < len) iteratee(obj[i], i, obj);
    }
    return obj;
  }

  /**
   * @private
   * @param {number} count
   * @param {function} iteratee
   * @param {Object=} thisArg
   */
  function _eachCycle(count, iteratee, thisArg) {

    /** @type {number} */
    var i;

    iteratee = is.undefined(thisArg) ? iteratee : _bind(iteratee, thisArg);
    if (iteratee.length) {
      i = 0;
      while(count--) iteratee(i++);
    }
    else {
      while(count--) iteratee();
    }
  }

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - GENERAL
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @param {function} func
   * @param {Object} thisArg
   * @return {function} 
   */
  function _bind(func, thisArg) {
    switch (func.length) {
      case 0:
      return function iteratee() { func.call(thisArg); };
      case 1:
      return function iteratee(val) { func.call(thisArg, val); };
      case 2:
      return function iteratee(val, key) { func.call(thisArg, val, key); };
    }
    return function iteratee(val, key, obj) {
      func.call(thisArg, val, key, obj);
    };
  }

  /**
   * @private
   * @type {!ErrorAid}
   */
  var _error = newErrorAid('each');

  //////////////////////////////////////////////////////////
  // END OF PRIVATE SCOPE FOR EACH
  return each;
})();


////////////////////////////////////////////////////////////////////////////////
// FILL
////////////////////////////////////////////////////////////////////////////////

var fill = (function fillPrivateScope() {

  //////////////////////////////////////////////////////////
  // PUBLIC METHODS
  // - fill
  // - fill.object (fill.obj)
  // - fill.array  (fill.arr)
  // - fill.string (fill.str)
  //////////////////////////////////////////////////////////

  /**
   * Fills an array, object, or string with specified values.
   * @public
   * @param {?(Array|Object|function|number)} source - If source is a number
   *   returns a new string filled with the value x times.
   * @param {(!Array|string)=} keys - Only use with an object/function source.
   *   If provided it is converted to an array of keys to limit the object fill
   *   to. The chars in the following list can be used as the separator for keys
   *   in a keys string (chars listed in order of rank):  ", "  ","  "|"  " "
   * @param {*} val - The value to fill the array, object, or string with.
   * @param {number=} start - [default= 0] Only for fill.array.
   * @param {number=} end - [default= source.length] Only for fill.array.
   * @return {?(Array|Object|function|string)}
   */
  function fill(source, keys, val, start, end) {

    if (arguments.length < 2) throw _error('No val defined');

    if ( is.null(source) ) return null;

    if ( is.num(source) ) {
      val = keys;
      return _fillStr(source, val);
    }

    if ( !is._obj(source) ) throw _error.type('source');

    if ( is.arr(source) ) {
      end = start;
      start = val;
      val = keys;
      if ( !is('num=', start) ) throw _error.type('start');
      if ( !is('num=', end)   ) throw _error.type('end');
      return _fillArr(source, val, start, end);
    }

    if (arguments.length > 2) {
      keys = is.str(keys) ? _splitKeys(keys) : keys;
      if ( !is.arr(keys) ) throw _error.type('keys');
      return _fillKeys(source, keys, val);
    }

    val = keys;
    return _fillObj(source, val);
  }

  /**
   * Fills an existing object/function with specified keys and values.
   * @public
   * @param {!(Object|function)} obj
   * @param {(!Array|string)=} keys - If provided it is converted to an array of
   *   keys to limit the object fill to. The chars in the following list can be
   *   used as the separator for keys in a keys string (chars listed in order of
   *   rank):  ", "  ","  "|"  " "
   * @param {*} val
   * @return {!(Object|function)}
   */
  fill.object = function fillObject(obj, keys, val) {

    if ( !is._obj(obj) ) throw _error.type('obj', 'object');
    if (arguments.length < 2) throw _error('No val defined', 'object');

    if (arguments.length > 2) {
      keys = is.str(keys) ? _splitKeys(keys) : keys;
      if ( !is.arr(keys) ) throw _error.type('keys', 'object');
      return _fillKeys(obj, keys, val);
    }

    val = keys;
    return _fillObj(obj, val);
  };
  // define shorthand
  fill.obj = fill.object;

  /**
   * Fills an existing or new array with specified values.
   * @public
   * @param {!(Array|number)} arr - If number makes new array with arr length.
   * @param {*} val
   * @param {number=} start - [default= 0]
   * @param {number=} end - [default= arr.length]
   * @return {!Array}
   */
  fill.array = function fillArray(arr, val, start, end) {

    arr = is.num(arr) ? new Array(arr) : arr;

    if (arguments.length < 2) throw _error('No val defined', 'array');

    if ( !is.arr(arr)       ) throw _error.type('arr',   'array');
    if ( !is('num=', start) ) throw _error.type('start', 'array');
    if ( !is('num=', end)   ) throw _error.type('end',   'array');

    return _fillArr(arr, val, start, end);
  };
  // define shorthand
  fill.arr = fill.array;

  /**
   * Fills a new string with specified values.
   * @public
   * @param {number} count
   * @param {*} val - All val types are converted to string via String(val).
   * @return {string}
   */
  fill.string = function fillString(count, val) {

    if ( !is.num(count) ) throw _error.type('count', 'string');
    if (arguments.length < 2) throw _error('No val defined', 'string');

    return _fillStr(count, val);
  };
  // define shorthand
  fill.str = fill.string;

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - MAIN
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @param {!(Object|function)} obj
   * @param {*} val
   * @return {!(Object|function)}
   */
  function _fillObj(obj, val) {

    /** @type {string} */
    var key;

    for (key in obj) {
      if ( _own(obj, key) ) {
        obj[key] = val;
      }
    }
    return obj;
  }

  /**
   * @private
   * @param {!(Object|function)} obj
   * @param {!Array} keys
   * @param {*} val
   * @return {!(Object|function)}
   */
  function _fillKeys(obj, keys, val) {

    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    len = keys.length;
    i = -1;
    while (++i < len) {
      obj[ keys[i] ] = val;
    }
    return obj;
  }

  /**
   * @private
   * @param {!Array} arr
   * @param {*} val
   * @param {number=} start - [default= 0]
   * @param {number=} end - [default= arr.length]
   * @return {!Array}
   */
  function _fillArr(arr, val, start, end) {

    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    len = arr.length;
    start = start || 0;
    start = start < 0 ? len + start : start;
    start = start < 0 ? 0 : start;
    end = end || len;
    end = end > len
      ? len : end < 0
        ? len + end : end;

    if (start >= end) return arr;

    i = start - 1;
    while (++i < end) {
      arr[i] = val;
    }
    return arr;
  }

  /**
   * @private
   * @param {number} count
   * @param {*} val
   * @return {string}
   */
  function _fillStr(count, val) {

    /** @type {string} */
    var str;

    count = count < 0 ? 0 : count;

    if (!count) return '';

    val = String(val);
    str = '';
    while (count--) {
      str += val;
    }
    return str;
  }

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - GENERAL
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @type {!ErrorAid}
   */
  var _error = newErrorAid('fill');

  //////////////////////////////////////////////////////////
  // END OF PRIVATE SCOPE FOR FILL
  return fill;
})();


////////////////////////////////////////////////////////////////////////////////
// FUSE
////////////////////////////////////////////////////////////////////////////////

var fuse = (function fusePrivateScope() {

  //////////////////////////////////////////////////////////
  // PUBLIC METHODS
  // - fuse
  // - fuse.value       (fuse.val)
  // - fuse.value.start (fuse.value.top)
  // - fuse.object      (fuse.obj)
  // - fuse.array       (fuse.arr)
  // - fuse.string      (fuse.str)
  //////////////////////////////////////////////////////////

  /**
   * Merges objects, concatenates arrays, appends properties, and combines
   *   strings.
   * @public
   * @param {!(Object|function|Array|string)} dest
   * @param {...*} vals - All rules occur in order of appearance. For object and
   *   array dest types null is simply skipped. Remaining details per dest type:
   *   - object: If only one val is provided and it is an array it is considered
   *     an array of vals. Object vals are merged with the dest. All other
   *     values are converted to strings and appended as new keys (if the key
   *     exists on the dest the property's value is replaced with undefined).
   *   - array: Array vals are concatenated to the dest. All other values are
   *     pushed to the dest.
   *   - string: If only one val is provided and it is an array it is considered
   *     an array of vals. All non-string vals are converted to strings and
   *     appended to the dest.
   * @return {!(Object|function|Array|string)}
   */
  function fuse(dest, vals) {

    if (arguments.length < 2) throw _error('No val defined');

    if ( is.str(dest) ) {
      vals = arguments.length > 2 ? _sliceArr(arguments, 1) : vals;
      return is.arr(vals) ? _fuseStrs(dest, vals) : _fuseStr(dest, vals);
    }

    if ( !is._obj(dest) ) throw _error.type('dest');

    dest = is.args(dest) ? _sliceArr(dest) : dest;

    if ( is.arr(dest) ) {
      if (arguments.length > 2) {
        vals = _sliceArr(arguments, 1);
        return _fuseArrs(dest, vals);
      }
      return _fuseArr(dest, vals);
    }

    vals = arguments.length > 2 ? _sliceArr(arguments, 1) : vals;
    return is.arr(vals) ? _fuseObjs(dest, vals) : _fuseObj(dest, vals);
  }

  /**
   * Appends properties and combines strings.
   * @public
   * @param {!(Object|function|Array|string)} dest
   * @param {...*} vals - Details per dest type:
   *   - object: All vals are converted to strings and appended as new keys (if
   *     the key exists on the dest the property's value is replaced with
   *     undefined).
   *   - array: All vals are pushed to the dest.
   *   - string: All vals are converted to strings and appended to the dest.
   * @return {!(Object|function|Array|string)}
   */
  fuse.value = function fuseValue(dest, vals) {

    if (arguments.length < 2) throw _error('No val defined', 'value');

    if ( is.str(dest) ) {
      if (arguments.length < 3) return _fuseStr(dest, vals);
      vals = _sliceArr(arguments, 1);
      return _fuseStrs(dest, vals);
    }

    if ( !is._obj(dest) ) throw _error.type('dest', 'value');

    dest = is.args(dest) ? _sliceArr(dest) : dest;

    if (arguments.length < 3) {
      return is.arr(dest) ? _fuseArrVal(dest, vals) : _fuseObjVal(dest, vals);
    }

    vals = _sliceArr(arguments, 1);
    return is.arr(dest) ? _fuseArrsVal(dest, vals) : _fuseObjsVal(dest, vals);
  };
  // define shorthand
  fuse.val = fuse.value;

  /**
   * Appends properties and combines strings to the start of their destination.
   * @public
   * @param {!(Object|function|Array|string)} dest
   * @param {...*} vals - Details per dest type:
   *   - object: All vals are converted to strings and appended as new keys (if
   *     the key exists on the dest the property's value remains unchanged).
   *   - array: All vals are unshifted to the dest.
   *   - string: All vals are converted to strings and appended to the beginning
   *     of the dest.
   * @return {!(Object|function|Array|string)}
   */
  fuse.value.start = function fuseValueStart(dest, vals) {

    if (arguments.length < 2) throw _error('No val defined', 'value.start');

    if ( is.str(dest) ) {
      if (arguments.length < 3) return _fuseStrTop(dest, vals);
      vals = _sliceArr(arguments, 1);
      return _fuseStrsTop(dest, vals);
    }

    if ( !is._obj(dest) ) throw _error.type('dest', 'value.start');

    dest = is.args(dest) ? _sliceArr(dest) : dest;

    if (arguments.length < 3) {
      return is.arr(dest)
        ? _fuseArrValTop(dest, vals)
        : _fuseObjValTop(dest, vals);
    }

    vals = _sliceArr(arguments, 1);
    return is.arr(dest)
      ? _fuseArrsValTop(dest, vals)
      : _fuseObjsValTop(dest, vals);
  };
  // define shorthand
  fuse.val.start = fuse.value.start;
  fuse.value.top = fuse.value.start;
  fuse.val.top = fuse.value.start;

  /**
   * Appends properties/keys to an object.
   * @public
   * @param {!(Object|function)} dest
   * @param {...*} vals - Any vals that are null are skipped. All other vals
   *   that are not objects are converted to a string and appended as new keys
   *   (if the key exists on the dest the key's value is replaced with
   *   undefined). If only one val is provided and it is an array then it is
   *   considered an array of vals. All object vals are merged with the dest
   *   (if the key exists on the dest the key's value is with replaced with the
   *   value from the merged object).
   * @return {!(Object|function)}
   */
  fuse.object = function fuseObject(dest, vals) {

    if ( !is._obj(dest) ) throw _error.type('dest', 'object');
    if (arguments.length < 2) throw _error('No val defined', 'object');

    vals = arguments.length > 2 ? _sliceArr(arguments, 1) : vals;
    return is.arr(vals) ? _fuseObjs(dest, vals) : _fuseObj(dest, vals);
  };
  // define shorthand
  fuse.obj = fuse.object;

  /**
   * Appends values to an array and concatenates arrays.
   * @public
   * @param {!Array} dest
   * @param {...*} vals - Details per val type:
   *   - null:  All null vals are skipped.
   *   - array: All array vals are concatenated to the dest.
   *   - other: All other vals are pushed to the dest array.
   * @return {!Array}
   */
  fuse.array = function fuseArray(dest, vals) {

    if ( !is._arr(dest) ) throw _error.type('dest', 'array');
    if (arguments.length < 2) throw _error('No val defined', 'array');

    dest = is.args(dest) ? _sliceArr(dest) : dest;

    if (arguments.length > 2) {
      vals = _sliceArr(arguments, 1);
      return _fuseArrs(dest, vals);
    }

    return _fuseArr(dest, vals);
  };
  // define shorthand
  fuse.arr = fuse.array;

  /**
   * Appends strings to a string.
   * @public
   * @param {string} dest
   * @param {...*} vals - All non-string vals are converted to strings.
   * @return {string}
   */
  fuse.string = function fuseString(dest, vals) {

    if ( !is.str(dest) ) throw _error.type('dest', 'string');
    if (arguments.length < 2) throw _error('No val defined', 'string');

    vals = arguments.length > 2 ? _sliceArr(arguments, 1) : vals;
    return is.arr(vals) ? _fuseStrs(dest, vals) : _fuseStr(dest, vals);
  };
  // define shorthand
  fuse.str = fuse.string;

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - MAIN
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @param {!(Object|function)} dest
   * @param {*} val
   * @return {!(Object|function)}
   */
  function _fuseObj(dest, val) {
    if ( is._obj(val) ) return _merge(dest, val);
    if ( !is.null(val) ) dest[val] = undefined;
    return dest;
  }

  /**
   * @private
   * @param {!(Object|function)} dest
   * @param {!Array<*>} vals
   * @return {!(Object|function)}
   */
  function _fuseObjs(dest, vals) {

    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    len = vals.length;
    i = -1;
    while (++i < len) {
      dest = _fuseObj(dest, vals[i]);
    }
    return dest;
  }

  /**
   * @private
   * @param {!(Object|function)} dest
   * @param {*} val
   * @return {!(Object|function)}
   */
  function _fuseObjVal(dest, val) {
    dest[val] = undefined;
    return dest;
  }

  /**
   * @private
   * @param {!(Object|function)} dest
   * @param {!Array<*>} vals
   * @return {!(Object|function)}
   */
  function _fuseObjsVal(dest, vals) {

    /** @type {*} */
    var val;
    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    len = vals.length;
    i = -1;
    while (++i < len) {
      val = vals[i];
      dest[val] = undefined;
    }
    return dest;
  }

  /**
   * @private
   * @param {!(Object|function)} dest
   * @param {*} val
   * @return {!(Object|function)}
   */
  function _fuseObjValTop(dest, val) {
    if ( !_own(dest, val) ) dest[val] = undefined;
    return dest;
  }

  /**
   * @private
   * @param {!(Object|function)} dest
   * @param {!Array<*>} vals
   * @return {!(Object|function)}
   */
  function _fuseObjsValTop(dest, vals) {

    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    len = vals.length;
    i = -1;
    while (++i < len) {
      dest = _fuseObjValTop(dest, vals[i]);
    }
    return dest;
  }

  /**
   * @private
   * @param {!Array} dest
   * @param {*} val
   * @return {!Array}
   */
  function _fuseArr(dest, val) {
    if ( is.arr(val) ) return dest.concat(val);
    if ( !is.null(val) ) dest.push(val);
    return dest;
  }

  /**
   * @private
   * @param {!Array} dest
   * @param {!Array<*>} vals
   * @return {!Array}
   */
  function _fuseArrs(dest, vals) {

    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    len = vals.length;
    i = -1;
    while (++i < len) {
      dest = _fuseArr(dest, vals[i]);
    }
    return dest;
  }

  /**
   * @private
   * @param {!Array} dest
   * @param {*} val
   * @return {!Array}
   */
  function _fuseArrVal(dest, val) {
    dest.push(val);
    return dest;
  }

  /**
   * @private
   * @param {!Array} dest
   * @param {!Array<*>} vals
   * @return {!Array}
   */
  function _fuseArrsVal(dest, vals) {

    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    len = vals.length;
    i = -1;
    while (++i < len) {
      dest.push( vals[i] );
    }
    return dest;
  }

  /**
   * @private
   * @param {!Array} dest
   * @param {*} val
   * @return {!Array}
   */
  function _fuseArrValTop(dest, val) {
    dest.unshift(val);
    return dest;
  }

  /**
   * @private
   * @param {!Array} dest
   * @param {!Array<*>} vals
   * @return {!Array}
   */
  function _fuseArrsValTop(dest, vals) {

    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    len = vals.length;
    i = -1;
    while (++i < len) {
      dest.unshift( vals[i] );
    }
    return dest;
  }

  /**
   * @private
   * @param {string} dest
   * @param {*} val
   * @return {string}
   */
  function _fuseStr(dest, val) {
    return dest + val;
  }

  /**
   * @private
   * @param {string} dest
   * @param {!Array<*>} vals
   * @return {string}
   */
  function _fuseStrs(dest, vals) {

    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    len = vals.length;
    i = -1;
    while (++i < len) {
      dest += vals[i];
    }
    return dest;
  }

  /**
   * @private
   * @param {string} dest
   * @param {*} val
   * @return {string}
   */
  function _fuseStrTop(dest, val) {
    return val + dest;
  }

  /**
   * @private
   * @param {string} dest
   * @param {!Array<*>} vals
   * @return {string}
   */
  function _fuseStrsTop(dest, vals) {

    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    len = vals.length;
    i = -1;
    while (++i < len) {
      dest = vals[i] + dest;
    }
    return dest;
  }

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - GENERAL
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @type {!ErrorAid}
   */
  var _error = newErrorAid('fuse');

  //////////////////////////////////////////////////////////
  // END OF PRIVATE SCOPE FOR FUSE
  return fuse;
})();


////////////////////////////////////////////////////////////////////////////////
// GET
////////////////////////////////////////////////////////////////////////////////

var get = (function getPrivateScope() {

  //////////////////////////////////////////////////////////
  // PUBLIC METHODS
  // - get
  // - get.keys
  // - get.keys.byKey
  // - get.keys.byValue (get.keys.byVal)
  // - get.indexes      (get.ii)
  // - get.values       (get.vals)
  //////////////////////////////////////////////////////////

  /**
   * Gets keys, indexes, values, or substrings from an object, array, or string.
   *   Note that the use of the word, "match", within vitals.get refers to
   *   [vitals.has.pattern]{@link https://github.com/imaginate/vitals/blob/master/src/methods/has.js}.
   * @public
   * @param {?(Object|function|Array|string)} source - If no val param is
   *   defined this method will return the following values (per source type):
   *     object source: array of own keys
   *     array source:  array of indexes
   *     string source: an error (i.e. a val is required for string sources)
   * @param {*=} val - For a RegExp val and object/string source this method
   *   will return the following values (per source type):
   *     object source: an array of source values where the key matches the val
   *     string source: an array of substrings that match the val
   *   Otherwise this method will return the following values (per source type):
   *     object source: an array of source keys where the value === val
   *     array source:  an array of source indexes where the value === val
   *     string source: an array of starting indexes where the substring == val
   * @return {Array}
   */
  function get(source, val) {

    if ( is.null(source) ) return null;

    if ( is.str(source) ) {
      if (arguments.length < 2) throw _error('No val defined');
      return is.regex(val) ? _strVals(source, val) : _strIndexes(source, val);
    }

    if ( !is._obj(source) ) throw _error.type('source');

    return arguments.length < 2
      ? is._arr(source)
        ? _allIndexes(source)
        : _allKeys(source)
      : is._arr(source)
        ? _byValIndexes(source, val)
        : is.regex(val)
          ? _byKeyObjVals(source, val)
          : _byValKeys(source, val);
  }

  /**
   * Gets an array of keys from an object. Note that the use of the word,
   *   "match", within vitals.get.keys refers to [vitals.has.pattern]{@link https://github.com/imaginate/vitals/blob/master/src/methods/has.js}.
   * @public
   * @param {!(Object|function)} source - If no val param is defined this method
   *   will return an array of all an object's own keys.
   * @param {*=} val - This method will return an array of source keys where the
   *   key matches the val if the val is a RegExp. Otherwise this method will
   *   return an array of source keys where the value == val.
   * @return {!Array}
   */
  get.keys = function getKeys(source, val) {

    if ( !is._obj(source) ) throw _error.type('source', 'keys');

    return arguments.length < 2
      ? _allKeys(source)
      : is.regex(val)
        ? _byKeyKeys(source, val)
        : _byValKeys(source, val);
  };

  /**
   * Gets an array of keys from an object that match a pattern.
   * @see [vitals.has.pattern]{@link https://github.com/imaginate/vitals/blob/master/src/methods/has.js}.
   * @public
   * @param {!(Object|function)} source
   * @param {*} pattern - If pattern is not a RegExp or string it is converted
   *   to a string.
   * @return {!Array<string>}
   */
  get.keys.byKey = function getKeysByKey(source, pattern) {

    if ( !is._obj(source) ) throw _error.type('source', 'keys.byKey');
    if (arguments.length < 2) throw _error('No pattern defined', 'keys.byKey');

    return _byKeyKeys(source, pattern);
  };

  /**
   * Gets an array of keys from an object where the value === val.
   * @public
   * @param {!(Object|function)} source
   * @param {*} val
   * @return {!Array}
   */
  get.keys.byValue = function getKeysByValue(source, val) {

    if ( !is._obj(source) ) throw _error.type('source', 'keys.byValue');
    if (arguments.length < 2) throw _error('No val defined', 'keys.byValue');

    return _byValKeys(source, val);
  };
  // define shorthand
  get.keys.byVal = get.keys.byValue;

  /**
   * Gets an array of indexes from an array or string by value/pattern. Note
   *   that the use of the word, "match", within vitals.get.indexes refers to
   *   [vitals.has.pattern]{@link https://github.com/imaginate/vitals/blob/master/src/methods/has.js}.
   * @public
   * @param {!(Object|string)} source - If no val param is defined this method
   *   will return an array of all an array's indexes or throw an error if the
   *   source is a string.
   * @param {*=} val - If source is an array this method will return an array of
   *   indexes where the value === val. Otherwise if the source is a string the
   *   val is converted to a string if it is not a RegExp or string and an array
   *   of starting indexes that match the val are returned.
   * @return {!Array}
   */
  get.indexes = function getIndexes(source, val) {

    if ( is.str(source) ) {
      if (arguments.length < 2) throw _error('No val defined', 'indexes');
      return _strIndexes(source, val);
    }

    if ( !is._obj(source)       ) throw _error.type('source',        'indexes');
    if ( !is.num(source.length) ) throw _error.type('source.length', 'indexes');

    return arguments.length < 2
      ? _allIndexes(source)
      : _byValIndexes(source, val);
  };
  // define shorthand
  get.ii = get.indexes;

  /**
   * Gets an array of values/substrings from an object or string. Note that the
   *   use of the word, "match", within vitals.get.values refers to
   *   [vitals.has.pattern]{@link https://github.com/imaginate/vitals/blob/master/src/methods/has.js}.
   * @public
   * @param {!(Object|function|string)} source - If no val param is defined this
   *   method will return an array of all the object's values or an error if the
   *   source is a string.
   * @param {*=} val - If the val is not a RegExp or string it is converted to a
   *   string. This method will return the following values (per source type):
   *     object source: an array of source values where the key matches the val
   *     string source: an array of substrings that match the val
   * @return {!Array}
   */
  get.values = function getValues(source, val) {

    if ( is.str(source) ) {
      if (arguments.length < 2) throw _error('No val defined', 'values');
      return _strVals(source, val);
    }

    if ( !is._obj(source) ) throw _error.type('source', 'values');

    return arguments.length < 2
      ? _allObjVals(source)
      : _byKeyObjVals(source, val);
  };
  // define shorthand
  get.vals = get.values;

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - GET OBJECT DETAILS
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @param {!(Object|function)} obj
   * @return {!Array<string>}
   */
  function _allKeys(obj) {

    /** @type {!Array<string>} */
    var arr;
    /** @type {string} */
    var key;

    arr = [];
    for (key in obj) _own(obj, key) && arr.push(key);
    return arr;
  }

  /**
   * @private
   * @param {!(Object|function)} obj
   * @param {*} pattern
   * @return {!Array<string>}
   */
  function _byKeyKeys(obj, pattern) {

    /** @type {!Array<string>} */
    var arr;
    /** @type {string} */
    var key;

    pattern = is.regex(pattern) ? pattern : String(pattern);
    arr = [];
    for (key in obj) _own(obj, key) && _match(key, pattern) && arr.push(key);
    return arr;
  }

  /**
   * @private
   * @param {!(Object|function)} obj
   * @param {*} val
   * @return {!Array<string>}
   */
  function _byValKeys(obj, val) {

    /** @type {!Array<string>} */
    var arr;
    /** @type {string} */
    var key;

    arr = [];
    for (key in obj) _own(obj, key) && obj[key] === val && arr.push(key);
    return arr;
  }

  /**
   * @private
   * @param {!(Object|function)} obj
   * @return {!Array<*>}
   */
  function _allObjVals(obj) {

    /** @type {!Array<*>} */
    var arr;
    /** @type {string} */
    var key;

    arr = [];
    for (key in obj) _own(obj, key) && arr.push( obj[key] );
    return arr;
  }

  /**
   * @private
   * @param {!(Object|function)} obj
   * @param {*} pattern
   * @return {!Array<*>}
   */
  function _byKeyObjVals(obj, pattern) {

    /** @type {!Array<*>} */
    var arr;
    /** @type {string} */
    var key;

    pattern = is.regex(pattern) ? pattern : String(pattern);
    arr = [];
    for (key in obj) {
      _own(obj, key) && _match(key, pattern) && arr.push( obj[key] );
    }
    return arr;
  }

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - GET ARRAY DETAILS
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @param {!Object} obj
   * @return {!Array<number>}
   */
  function _allIndexes(obj) {

    /** @type {!Array<number>} */
    var arr;
    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    len = obj.length;
    arr = new Array(len);
    i = -1;
    while (++i < len) arr[i] = i;
    return arr;
  }

  /**
   * @private
   * @param {!Object} obj
   * @param {*} val
   * @return {!Array<number>}
   */
  function _byValIndexes(obj, val) {

    /** @type {!Array<number>} */
    var arr;
    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    len = obj.length;
    arr = [];
    i = -1;
    while (++i < len) obj[i] === val && arr.push(i);
    return arr;
  }

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - GET STRING DETAILS
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @param {string} str
   * @param {*} pattern
   * @return {!Array<number>}
   */
  function _strIndexes(str, pattern) {
    return _match(str, pattern)
      ? is.regex(pattern)
        ? _byRegexStrKeys(str, pattern)
        : _byStrStrKeys(str, pattern)
      : [];
  }

  /**
   * @private
   * @param {string} str
   * @param {*} pattern
   * @return {!Array<string>}
   */
  function _strVals(str, pattern) {
    return _match(str, pattern)
      ? is.regex(pattern)
        ? _byRegexStrVals(str, pattern)
        : _byStrStrVals(str, pattern)
      : [];
  }

  /**
   * @private
   * @param {string} str
   * @param {!RegExp} pattern
   * @return {!Array<number>}
   */
  function _byRegexStrKeys(str, pattern) {

    /** @type {!Array<number>} */
    var arr;
    /** @type {Object} */
    var obj;

    pattern = copy.regex(pattern, true);
    arr = [];
    obj = pattern.exec(str);
    while (obj) {
      arr.push(obj.index);
      obj = pattern.exec(str);
    }
    return arr;
  }

  /**
   * @private
   * @param {string} str
   * @param {*} pattern
   * @return {!Array<number>}
   */
  function _byStrStrKeys(str, pattern) {

    /** @type {!Array<number>} */
    var arr;
    /** @type {number} */
    var i;

    pattern = String(pattern);
    arr = [];
    i = str.indexOf(pattern);
    while (i !== -1) {
      arr.push(i);
      i = str.indexOf(pattern, ++i);
    }
    return arr;
  }

  /**
   * @private
   * @param {string} str
   * @param {!RegExp} pattern
   * @return {!Array<string>}
   */
  function _byRegexStrVals(str, pattern) {

    /** @type {!Array<string>} */
    var arr;
    /** @type {Object} */
    var obj;

    pattern = copy.regex(pattern, true);
    arr = [];
    obj = pattern.exec(str);
    while (obj) {
      arr.push( obj[0] );
      obj = pattern.exec(str);
    }
    return arr;
  }

  /**
   * @private
   * @param {string} str
   * @param {*} pattern
   * @return {!Array<string>}
   */
  function _byStrStrVals(str, pattern) {

    /** @type {!Array<string>} */
    var arr;
    /** @type {number} */
    var i;

    pattern = String(pattern);
    arr = [];
    i = str.indexOf(pattern);
    while (i !== -1) {
      arr.push(pattern);
      i = str.indexOf(pattern, ++i);
    }
    return arr;
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
  return get;
})();


////////////////////////////////////////////////////////////////////////////////
// HAS
////////////////////////////////////////////////////////////////////////////////

var has = (function hasPrivateScope() {

  //////////////////////////////////////////////////////////
  // PUBLIC METHODS
  // - has
  // - has.key
  // - has.value      (has.val)
  // - has.pattern
  // - has.substring  (has.substr)
  // - has.enumerable (has.enum)
  //
  // * Note that has.enum may fail in older browser
  //   environments.
  //////////////////////////////////////////////////////////

  /**
   * A shortcut for Object.prototype.hasOwnProperty (that accepts null),
   *   String.prototype.includes, RegExp.prototype.test, and
   *   Array.prototype.includes.
   * @public
   * @param {?(Object|function|string|Array)} source
   * @param {*} key - If source is a string the following two statements apply:
   *   For a RegExp key the source is tested for the RegExp pattern. Otherwise
   *   the source is searched for a substring of the string-converted key.
   *   If source is an array or arguments object the key is searched for in the
   *   object's indexed values.
   * @return {boolean}
   */
  function has(source, key) {

    if (arguments.length < 2) throw _error('No key defined');
    
    if ( is.null(source) ) return false;

    if ( is.str(source) ) return _match(source, key);

    if ( !is._obj(source) ) throw _error.type('source');

    return is._arr(source) ? _inArr(source, key) : _own(source, key);
  }

  /**
   * A shortcut for Object.prototype.hasOwnProperty that accepts null.
   * @public
   * @param {?(Object|function)} source
   * @param {*} key
   * @return {boolean}
   */
  has.key = function hasKey(source, key) {

    if (arguments.length < 2) throw _error('No key defined', 'key');

    if ( is.null(source) ) return false;

    if ( !is._obj(source) ) throw _error.type('source', 'key');

    return _own(source, key);
  };

  /**
   * A shortcut that checks for a value in an object.
   * @public
   * @param {?(Object|function)} source
   * @param {*} val
   * @return {boolean}
   */
  has.value = function hasValue(source, val) {

    if (arguments.length < 2) throw _error('No val defined', 'value');

    if ( is.null(source) ) return false;

    if ( !is._obj(source) ) throw _error.type('source', 'value');

    return is._arr(source) ? _inArr(source, val) : _inObj(source, val);
  };
  // define shorthand
  has.val = has.value;

  /**
   * A shortcut for String.prototype.includes and RegExp.prototype.test.
   * @public
   * @param {string} source
   * @param {*} pattern
   * @return {boolean}
   */
  has.pattern = function hasPattern(source, pattern) {

    if ( !is.str(source) ) throw _error.type('source', 'pattern');
    if (arguments.length < 2) throw _error('No pattern defined', 'pattern');

    return _match(source, pattern);
  };

  /**
   * A shortcut for String.prototype.includes.
   * @public
   * @param {string} source
   * @param {*} str
   * @return {boolean}
   */
  has.substring = function hasSubstring(source, str) {

    if ( !is.str(source) ) throw _error.type('source', 'substring');
    if (arguments.length < 2) throw _error('No str defined', 'substring');

    return _inStr(source, str);
  };
  // define shorthand
  has.substr = has.substring;

  /**
   * A shortcut for Object.prototype.propertyIsEnumerable that accepts null.
   * @public
   * @param {?(Object|function)} source
   * @param {*} key
   * @return {boolean}
   */
  has.enumerable = function hasEnumerable(source, key) {

    if (arguments.length < 2) throw _error('No key defined', 'enumerable');

    if ( is.null(source) ) return false;

    if ( !is._obj(source) ) throw _error.type('source', 'enumerable');

    return _ownEnum(source, key);
  };
  // define shorthand
  try {
    has.enum = has.enumerable;
  }
  catch (e) {}

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - GENERAL
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @type {!ErrorAid}
   */
  var _error = newErrorAid('has');

  //////////////////////////////////////////////////////////
  // END OF PRIVATE SCOPE FOR HAS
  return has;
})();


////////////////////////////////////////////////////////////////////////////////
// REMAP
////////////////////////////////////////////////////////////////////////////////

var remap = (function remapPrivateScope() {

  //////////////////////////////////////////////////////////
  // PUBLIC METHODS
  // - remap
  // - remap.object (remap.obj)
  // - remap.array  (remap.arr)
  // - remap.string (remap.str)
  //////////////////////////////////////////////////////////

  /**
   * A shortcut for making a new object/array/string by invoking an action over
   *   the values of an existing object/array/string.
   * @public
   * @param {!(Object|function|Array|string)} source
   * @param {*} iteratee - Details per source type:
   *   object source: The iteratee must be a function with the optional params
   *     value, key, source. Note this method lazily clones the source based on
   *     the iteratee's [length property]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/length}
   *     (i.e. if you alter the source object within the iteratee ensure to
   *     define the iteratee's third param so you can safely assume all
   *     references to the source are its original values).
   *   array source: The iteratee must be a function with the optional params
   *     value, index, source. Note this method lazily slices the source based
   *     on the iteratee's [length property]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/length}
   *     (i.e. if you alter the source object within the iteratee ensure to
   *     define the iteratee's third param so you can safely assume all
   *     references to the source are its original values).
   *   string source: The iteratee must be a pattern to search for within the
   *     source. If the pattern is not a string or RegExp it will be converted
   *     to a string.
   * @param {*=} replacement - Only use (and required) with string sources. If
   *   not a string or function the replacement is converted to a string. For
   *   details about using replacement functions see the
   *   [String.prototype.replace function param]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace#Specifying_a_function_as_a_parameter}.
   * @param {Object=} thisArg - If thisArg is supplied the iteratee or
   *   replacement function is bound to its value.
   * @return {!(Object|function|Array|string)}
   */
  function remap(source, iteratee, replacement, thisArg) {

    if ( is.str(source) ) {
      if (arguments.length < 2) throw _error('No iteratee defined');
      if (arguments.length < 3) throw _error('No replacement defined');
      if ( !is('obj=', thisArg) ) throw _error.type('thisArg');
      return _remapStr(source, iteratee, replacement, thisArg);
    }

    thisArg = replacement;

    if ( !is._obj(source)     ) throw _error.type('source');
    if ( !is.func(iteratee)   ) throw _error.type('iteratee');
    if ( !is('obj=', thisArg) ) throw _error.type('thisArg');

    return is._arr(source)
      ? _remapArr(source, iteratee, thisArg)
      : _remapObj(source, iteratee, thisArg);
  }

  /**
   * A shortcut for making a new object with the same keys and new values by
   *   invoking an action over the values of an existing object.
   * @public
   * @param {!(Object|function)} source
   * @param {function(*=, string=, !(Object|function)=)} iteratee - The iteratee
   *   must be a function with the optional params - value, key, source. Note
   *   this method lazily clones the source based on the iteratee's
   *   [length property]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/length}
   *   (i.e. if you alter the source object within the iteratee ensure to define
   *   the iteratee's third param so you can safely assume all references to the
   *   source are its original values).
   * @param {Object=} thisArg - If thisArg is supplied the iteratee is bound to
   *   its value.
   * @return {!Object} 
   */
  remap.object = function remapObject(source, iteratee, thisArg) {

    if ( !is._obj(source)     ) throw _error.type('source',   'object');
    if ( !is.func(iteratee)   ) throw _error.type('iteratee', 'object');
    if ( !is('obj=', thisArg) ) throw _error.type('thisArg',  'object');

    return _remapObj(source, iteratee, thisArg);
  };
  // define shorthand
  remap.obj = remap.object;

  /**
   * A shortcut for making a new array by invoking an action over the values of
   *   an existing array-like object.
   * @public
   * @param {!(Object|function)} source
   * @param {function(*=, number=, !Array=)=} iteratee - The iteratee must be a
   *   function with the optional params - value, index, source. Note this
   *   method lazily slices the source based on the iteratee's [length property]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/length}
   *   (i.e. if you alter the source object within the iteratee ensure to define
   *   the iteratee's third param so you can safely assume all references to the
   *   source are its original values).
   * @param {Object=} thisArg - If thisArg is supplied the iteratee is bound to
   *   its value.
   * @return {!Array}
   */
  remap.array = function remapArray(source, iteratee, thisArg) {

    if ( !is._obj(source)       ) throw _error.type('source',        'array');
    if ( !is.num(source.length) ) throw _error.type('source.length', 'array');
    if ( !is.func(iteratee)     ) throw _error.type('iteratee',      'array');
    if ( !is('obj=', thisArg)   ) throw _error.type('thisArg',       'array');

    return _remapArr(source, iteratee, thisArg);
  };
  // define shorthand
  remap.arr = remap.array;

  /**
   * A shortcut for [String.prototype.replace]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace}.
   * @public
   * @param {string} source
   * @param {*} pattern - If not a RegExp the pattern is converted to a string.
   * @param {*} replacement - If not a string or function the replacement is
   *   converted to a string. For details about using replacement functions see
   *   [String.prototype.replace function param]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace#Specifying_a_function_as_a_parameter}.
   * @param {Object=} thisArg - If thisArg is supplied the replacement function
   *   is bound to its value.
   * @return {string}
   */
  remap.string = function remapString(source, pattern, replacement, thisArg) {

    if (arguments.length < 2) throw _error('No pattern defined',     'string');
    if (arguments.length < 3) throw _error('No replacement defined', 'string');
    if ( !is.str(source)      ) throw _error.type('source',  'string');
    if ( !is('obj=', thisArg) ) throw _error.type('thisArg', 'string');

    return _remapStr(source, pattern, replacement, thisArg);
  };
  // define shorthand
  remap.str = remap.string;

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - MAIN
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @param {!(Object|function)} source
   * @param {function(*, string=, !(Object|function)=)=} iteratee
   * @param {Object=} thisArg
   * @return {!Object}
   */
  function _remapObj(source, iteratee, thisArg) {

    /** @type {!Object} */
    var obj;
    /** @type {string} */
    var key;

    obj = {};
    source = iteratee.length > 2 ? copy(source) : source;
    iteratee = is.undefined(thisArg) ? iteratee : _bindI(iteratee, thisArg);
    switch (iteratee.length) {
      case 0:
      for (key in source) {
        if ( _own(source, key) ) obj[key] = iteratee();
      }
      break;
      case 1:
      for (key in source) {
        if ( _own(source, key) ) obj[key] = iteratee(source[key]);
      }
      break;
      case 2:
      for (key in source) {
        if ( _own(source, key) ) obj[key] = iteratee(source[key], key);
      }
      break;
      default:
      for (key in source) {
        if ( _own(source, key) ) obj[key] = iteratee(source[key], key, source);
      }
    }
    return obj;
  }

  /**
   * @private
   * @param {!(Object|function)} source
   * @param {function(*, number=, !Array=)=} iteratee
   * @param {Object=} thisArg
   * @return {!Array}
   */
  function _remapArr(source, iteratee, thisArg) {

    /** @type {!Array} */
    var arr;
    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    source = iteratee.length > 2 ? copy.arr(source) : source;
    iteratee = is.undefined(thisArg) ? iteratee : _bindI(iteratee, thisArg);
    len = source.length;
    arr = new Array(len);
    i = -1;
    switch (iteratee.length) {
      case 0:  while (++i < len) arr[i] = iteratee();              break;
      case 1:  while (++i < len) arr[i] = iteratee(source[i]);     break;
      case 2:  while (++i < len) arr[i] = iteratee(source[i], i);  break;
      default: while (++i < len) arr[i] = iteratee(source[i], i, source);
    }
    return arr;
  }

  /**
   * @private
   * @param {string} source
   * @param {*} pattern
   * @param {*} replacement
   * @param {Object=} thisArg
   * @return {string}
   */
  function _remapStr(source, pattern, replacement, thisArg) {

    if (!source) return source;

    pattern = is.regex(pattern) ? pattern : String(pattern);
    replacement = is.func(replacement)
      ? is.undefined(thisArg)
        ? replacement
        : _bindR(replacement, thisArg)
      : String(replacement);

    return source.replace(pattern, replacement);
  }

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - GENERAL
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @param {function} func
   * @param {Object} thisArg
   * @return {function} 
   */
  function _bindI(func, thisArg) {
    switch (func.length) {
      case 0:
      return function iteratee() { return func.call(thisArg); };
      case 1:
      return function iteratee(val) { return func.call(thisArg, val); };
      case 2:
      return function iteratee(val, key) { return func.call(thisArg,val,key); };
    }
    return function iteratee(val, key, obj) {
      return func.call(thisArg, val, key, obj);
    };
  }

  /**
   * @private
   * @param {function} func
   * @param {Object} thisArg
   * @return {function} 
   */
  function _bindR(func, thisArg) {
    switch (func.length) {
      case 0: return function replacement() {
        return func.call(thisArg);
      };
      case 1: return function replacement(match) {
        return func.call(thisArg, match);
      };
      case 2: return function replacement(match, p1) {
        return func.call(thisArg, match, p1);
      };
      case 3: return function replacement(match, p1, p2) {
        return func.call(thisArg, match, p1, p2);
      };
      case 4: return function replacement(match, p1, p2, p3) {
        return func.call(thisArg, match, p1, p2, p3);
      };
      case 5: return function replacement(match, p1, p2, p3, p4) {
        return func.call(thisArg, match, p1, p2, p3, p4);
      };
    }
    return function replacement() {
      return func.apply(thisArg, arguments);
    };
  }

  /**
   * @private
   * @type {!ErrorAid}
   */
  var _error = newErrorAid('remap');

  //////////////////////////////////////////////////////////
  // END OF PRIVATE SCOPE FOR REMAP
  return remap;
})();


////////////////////////////////////////////////////////////////////////////////
// ROLL
////////////////////////////////////////////////////////////////////////////////

var roll = (function rollPrivateScope() {

  //////////////////////////////////////////////////////////
  // PUBLIC METHODS
  // - roll
  // - roll.up
  // - roll.down
  //////////////////////////////////////////////////////////

  /**
   * A shortcut for deriving a result by iterating over object maps, arrays, or
   *   cycles.
   * @public
   * @param {*=} base - If defined it is the base value. Note that for number
   *   sources (i.e. cycles) a base is required.
   * @param {!(Object|function|Array|number)} source - Details per type:
   *   - object source: Iterates over all properties in random order.
   *   - array source:  Iterates over all indexed properties from 0 to length.
   *   - number source: Iterates over all cycles.
   * @param {function(*=, *=, (string|number)=, !(Object|function)=)} iteratee -
   *   It has the optional params - previousValue, currentValue, key/index,
   *   source. Note this method lazily clones the source based on the iteratee's
   *   [length property]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/length}
   *   (i.e. if you alter the source object within the iteratee ensure to define
   *   the iteratee's fourth param so you can safely assume all references to
   *   the source are its original values).
   * @param {Object=} thisArg - If defined the iteratee is bound to this value.
   * @return {*}
   */
  function roll(base, source, iteratee, thisArg) {

    /** @type {boolean} */
    var hasBase;

    if (arguments.length < 2) throw _error('No source or iteratee defined');
  
    if (arguments.length === 2) {
      iteratee = source;
      source = base;
    }
    else if ( arguments.length === 3 && !is.func(iteratee) ) {
      thisArg = iteratee;
      iteratee = source;
      source = base;
    }
    else hasBase = true;

    if ( !is.func(iteratee)   ) throw _error.type('iteratee');
    if ( !is('obj=', thisArg) ) throw _error.type('thisArg');

    if ( is.num(source) ) {
      if (!hasBase) throw _error('No base defined');
      return _rollCycle(base, source, iteratee, thisArg);
    }

    if ( !is._obj(source) ) throw _error.type('source');

    return is._arr(source)
      ? hasBase
        ? _rollBaseArr(base, source, iteratee, thisArg)
        : _rollArr(source, iteratee, thisArg)
      : hasBase
        ? _rollBaseObj(base, source, iteratee, thisArg)
        : _rollObj(source, iteratee, thisArg);
  }

  /**
   * A shortcut for deriving a sum by iterating over object maps, arrays, or
   *   cycles.
   * @public
   * @param {*=} base - If defined it is the base value. Note that for number
   *   sources (i.e. cycles) a base is required.
   * @param {!(Object|function|Array|number)} source - Details per type:
   *   - object source: Iterates over all properties in random order.
   *   - array source:  Iterates over all indexed properties from 0 to length.
   *   - number source: Iterates over all cycles.
   * @param {function(*=, (string|number)=, !(Object|function)=)} iteratee - It
   *   has the optional params - value, key/index, source. Note this method
   *   lazily clones the source based on the iteratee's [length property]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/length}
   *   (i.e. if you alter the source object within the iteratee ensure to define
   *   the iteratee's third param so you can safely assume all references to the
   *   source are its original values).
   * @param {Object=} thisArg - If defined the iteratee is bound to this value.
   * @return {*}
   */
  roll.up = function rollUp(base, source, iteratee, thisArg) {

    /** @type {boolean} */
    var hasBase;

    if (arguments.length < 2) throw _error('No source or iteratee defined','up');
  
    if (arguments.length === 2) {
      iteratee = source;
      source = base;
    }
    else if ( arguments.length === 3 && !is.func(iteratee) ) {
      thisArg = iteratee;
      iteratee = source;
      source = base;
    }
    else hasBase = true;

    if ( !is.func(iteratee)   ) throw _error.type('iteratee', 'up');
    if ( !is('obj=', thisArg) ) throw _error.type('thisArg',  'up');

    if ( is.num(source) ) {
      if (!hasBase) throw _error('No base defined', 'up');
      return _rollCycleUp(base, source, iteratee, thisArg);
    }

    if ( !is._obj(source) ) throw _error.type('source', 'up');

    return is._arr(source)
      ? hasBase
        ? _rollBaseArrUp(base, source, iteratee, thisArg)
        : _rollArrUp(source, iteratee, thisArg)
      : hasBase
        ? _rollBaseObjUp(base, source, iteratee, thisArg)
        : _rollObjUp(source, iteratee, thisArg);
  };

  /**
   * A shortcut for deriving a difference by iterating over object maps, arrays,
   *   or cycles.
   * @public
   * @param {*=} base - If defined it is the base value. Note that for number
   *   sources (i.e. cycles) a base is required.
   * @param {!(Object|function|Array|number)} source - Details per type:
   *   - object source: Iterates over all properties in random order.
   *   - array source:  Iterates over all indexed properties from 0 to length.
   *   - number source: Iterates over all cycles.
   * @param {function(*=, (string|number)=, !(Object|function)=)} iteratee - It
   *   has the optional params - value, key/index, source. Note this method
   *   lazily clones the source based on the iteratee's [length property]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/length}
   *   (i.e. if you alter the source object within the iteratee ensure to define
   *   the iteratee's third param so you can safely assume all references to the
   *   source are its original values).
   * @param {Object=} thisArg - If defined the iteratee is bound to this value.
   * @return {*}
   */
  roll.down = function rollDown(base, source, iteratee, thisArg) {

    /** @type {boolean} */
    var hasBase;

    if (arguments.length < 2) throw _error('No source or iteratee defined','down');
  
    if (arguments.length === 2) {
      iteratee = source;
      source = base;
    }
    else if ( arguments.length === 3 && !is.func(iteratee) ) {
      thisArg = iteratee;
      iteratee = source;
      source = base;
    }
    else hasBase = true;

    if ( !is.func(iteratee)   ) throw _error.type('iteratee', 'down');
    if ( !is('obj=', thisArg) ) throw _error.type('thisArg',  'down');

    if ( is.num(source) ) {
      if (!hasBase) throw _error('No base defined', 'down');
      return _rollCycleDown(base, source, iteratee, thisArg);
    }

    if ( !is._obj(source) ) throw _error.type('source', 'down');

    return is._arr(source)
      ? hasBase
        ? _rollBaseArrDown(base, source, iteratee, thisArg)
        : _rollArrDown(source, iteratee, thisArg)
      : hasBase
        ? _rollBaseObjDown(base, source, iteratee, thisArg)
        : _rollObjDown(source, iteratee, thisArg);
  };

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - ROLL OBJ
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @param {!(Object|function)} obj
   * @param {function(*, *, string=, !(Object|function)=)} iteratee
   * @param {Object=} thisArg
   * @return {*}
   */
  function _rollObj(obj, iteratee, thisArg) {

    /** @type {*} */
    var result;
    /** @type {string} */
    var key;
    /** @type {boolean} */
    var z;

    obj = iteratee.length > 3 ? copy(obj) : obj;
    iteratee = is.undefined(thisArg) ? iteratee : _bind(iteratee, thisArg);
    switch (iteratee.length) {
      case 0:
      case 1: 
      for (key in obj) {
        if ( _own(obj, key) ) {
          if (z) result = iteratee(result);
          else {
            result = obj[key];
            z = true;
          }
        }
      }
      break;
      case 2:
      for (key in obj) {
        if ( _own(obj, key) ) {
          if (z) result = iteratee(result, obj[key]);
          else {
            result = obj[key];
            z = true;
          }
        }
      }
      break;
      case 3:
      for (key in obj) {
        if ( _own(obj, key) ) {
          if (z) result = iteratee(result, obj[key], key);
          else {
            result = obj[key];
            z = true;
          }
        }
      }
      break;
      default:
      for (key in obj) {
        if ( _own(obj, key) ) {
          if (z) result = iteratee(result, obj[key], key, obj);
          else {
            result = obj[key];
            z = true;
          }
        }
      }
    }
    return result;
  }

  /**
   * @private
   * @param {*} result
   * @param {!(Object|function)} obj
   * @param {function(*, *, string=, !(Object|function)=)} iteratee
   * @param {Object=} thisArg
   * @return {*}
   */
  function _rollBaseObj(result, obj, iteratee, thisArg) {

    /** @type {string} */
    var key;

    obj = iteratee.length > 3 ? copy(obj) : obj;
    iteratee = is.undefined(thisArg) ? iteratee : _bind(iteratee, thisArg);
    switch (iteratee.length) {
      case 0:
      case 1: 
      for (key in obj) {
        if ( _own(obj, key) ) result = iteratee(result);
      }
      break;
      case 2:
      for (key in obj) {
        if ( _own(obj, key) ) result = iteratee(result, obj[key]);
      }
      break;
      case 3:
      for (key in obj) {
        if ( _own(obj, key) ) result = iteratee(result, obj[key], key);
      }
      break;
      default:
      for (key in obj) {
        if ( _own(obj, key) ) result = iteratee(result, obj[key], key, obj);
      }
    }
    return result;
  }

  /**
   * @private
   * @param {!(Object|function)} obj
   * @param {function(*, string=, !(Object|function)=)} iteratee
   * @param {Object=} thisArg
   * @return {*}
   */
  function _rollObjUp(obj, iteratee, thisArg) {

    /** @type {*} */
    var result;
    /** @type {string} */
    var key;
    /** @type {boolean} */
    var z;

    obj = iteratee.length > 2 ? copy(obj) : obj;
    iteratee = is.undefined(thisArg) ? iteratee : _bind(iteratee, thisArg);
    switch (iteratee.length) {
      case 0:
      for (key in obj) {
        if ( _own(obj, key) ) {
          if (z) result += iteratee();
          else {
            result = obj[key];
            z = true;
          }
        }
      }
      break;
      case 1:
      for (key in obj) {
        if ( _own(obj, key) ) {
          if (z) result += iteratee(obj[key]);
          else {
            result = obj[key];
            z = true;
          }
        }
      }
      break;
      case 2:
      for (key in obj) {
        if ( _own(obj, key) ) {
          if (z) result += iteratee(obj[key], key);
          else {
            result = obj[key];
            z = true;
          }
        }
      }
      break;
      default:
      for (key in obj) {
        if ( _own(obj, key) ) {
          if (z) result += iteratee(obj[key], key, obj);
          else {
            result = obj[key];
            z = true;
          }
        }
      }
    }
    return result;
  }

  /**
   * @private
   * @param {*} result
   * @param {!(Object|function)} obj
   * @param {function(*, string=, !(Object|function)=)} iteratee
   * @param {Object=} thisArg
   * @return {*}
   */
  function _rollBaseObjUp(result, obj, iteratee, thisArg) {

    /** @type {string} */
    var key;

    obj = iteratee.length > 2 ? copy(obj) : obj;
    iteratee = is.undefined(thisArg) ? iteratee : _bind(iteratee, thisArg);
    switch (iteratee.length) {
      case 0:
      for (key in obj) {
        if ( _own(obj, key) ) result += iteratee();
      }
      break;
      case 1:
      for (key in obj) {
        if ( _own(obj, key) ) result += iteratee(obj[key]);
      }
      break;
      case 2:
      for (key in obj) {
        if ( _own(obj, key) ) result += iteratee(obj[key], key);
      }
      break;
      default:
      for (key in obj) {
        if ( _own(obj, key) ) result += iteratee(obj[key], key, obj);
      }
    }
    return result;
  }

  /**
   * @private
   * @param {!(Object|function)} obj
   * @param {function(*, string=, !(Object|function)=)} iteratee
   * @param {Object=} thisArg
   * @return {*}
   */
  function _rollObjDown(obj, iteratee, thisArg) {

    /** @type {*} */
    var result;
    /** @type {string} */
    var key;
    /** @type {boolean} */
    var z;

    obj = iteratee.length > 2 ? copy(obj) : obj;
    iteratee = is.undefined(thisArg) ? iteratee : _bind(iteratee, thisArg);
    switch (iteratee.length) {
      case 0:
      for (key in obj) {
        if ( _own(obj, key) ) {
          if (z) result -= iteratee();
          else {
            result = obj[key];
            z = true;
          }
        }
      }
      break;
      case 1:
      for (key in obj) {
        if ( _own(obj, key) ) {
          if (z) result -= iteratee(obj[key]);
          else {
            result = obj[key];
            z = true;
          }
        }
      }
      break;
      case 2:
      for (key in obj) {
        if ( _own(obj, key) ) {
          if (z) result -= iteratee(obj[key], key);
          else {
            result = obj[key];
            z = true;
          }
        }
      }
      break;
      default:
      for (key in obj) {
        if ( _own(obj, key) ) {
          if (z) result -= iteratee(obj[key], key, obj);
          else {
            result = obj[key];
            z = true;
          }
        }
      }
    }
    return result;
  }

  /**
   * @private
   * @param {*} result
   * @param {!(Object|function)} obj
   * @param {function(*, string=, !(Object|function)=)} iteratee
   * @param {Object=} thisArg
   * @return {*}
   */
  function _rollBaseObjDown(result, obj, iteratee, thisArg) {

    /** @type {string} */
    var key;

    obj = iteratee.length > 2 ? copy(obj) : obj;
    iteratee = is.undefined(thisArg) ? iteratee : _bind(iteratee, thisArg);
    switch (iteratee.length) {
      case 0: 
      for (key in obj) {
        if ( _own(obj, key) ) result -= iteratee();
      }
      break;
      case 1:
      for (key in obj) {
        if ( _own(obj, key) ) result -= iteratee(obj[key]);
      }
      break;
      case 2:
      for (key in obj) {
        if ( _own(obj, key) ) result -= iteratee(obj[key], key);
      }
      break;
      default:
      for (key in obj) {
        if ( _own(obj, key) ) result -= iteratee(obj[key], key, obj);
      }
    }
    return result;
  }

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - ROLL ARR
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @param {!(Object|function)} obj
   * @param {function(*, *, number=, !Array=)} iteratee
   * @param {Object=} thisArg
   * @return {*}
   */
  function _rollArr(obj, iteratee, thisArg) {

    /** @type {*} */
    var result;
    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    obj = iteratee.length > 3 ? copy.arr(obj) : obj;
    iteratee = is.undefined(thisArg) ? iteratee : _bind(iteratee, thisArg);
    result = obj[0];
    len = obj.length;
    i = 0;
    switch (iteratee.length) {
      case 0:
      case 1:  while (++i < len) result = iteratee(result);               break;
      case 2:  while (++i < len) result = iteratee(result, obj[i]);       break;
      case 3:  while (++i < len) result = iteratee(result, obj[i], i);    break;
      default: while (++i < len) result = iteratee(result, obj[i], i, obj);
    }
    return result;
  }

  /**
   * @private
   * @param {*} result
   * @param {!(Object|function)} obj
   * @param {function(*, number=, !Array=)} iteratee
   * @param {Object=} thisArg
   * @return {*}
   */
  function _rollBaseArr(result, obj, iteratee, thisArg) {

    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    obj = iteratee.length > 3 ? copy.arr(obj) : obj;
    iteratee = is.undefined(thisArg) ? iteratee : _bind(iteratee, thisArg);
    len = obj.length;
    i = -1;
    switch (iteratee.length) {
      case 0:
      case 1:  while (++i < len) result = iteratee(result);               break;
      case 2:  while (++i < len) result = iteratee(result, obj[i]);       break;
      case 3:  while (++i < len) result = iteratee(result, obj[i], i);    break;
      default: while (++i < len) result = iteratee(result, obj[i], i, obj);
    }
    return result;
  }

  /**
   * @private
   * @param {!(Object|function)} obj
   * @param {function(*, *, number=, !Array=)} iteratee
   * @param {Object=} thisArg
   * @return {*}
   */
  function _rollArrUp(obj, iteratee, thisArg) {

    /** @type {*} */
    var result;
    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    obj = iteratee.length > 2 ? copy.arr(obj) : obj;
    iteratee = is.undefined(thisArg) ? iteratee : _bind(iteratee, thisArg);
    result = obj[0];
    len = obj.length;
    i = 0;
    switch (iteratee.length) {
      case 0:  while (++i < len) result += iteratee();              break;
      case 1:  while (++i < len) result += iteratee(obj[i]);        break;
      case 2:  while (++i < len) result += iteratee(obj[i], i);     break;
      default: while (++i < len) result += iteratee(obj[i], i, obj);
    }
    return result;
  }

  /**
   * @private
   * @param {*} result
   * @param {!(Object|function)} obj
   * @param {function(*, number=, !Array=)} iteratee
   * @param {Object=} thisArg
   * @return {*}
   */
  function _rollBaseArrUp(result, obj, iteratee, thisArg) {

    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    obj = iteratee.length > 2 ? copy.arr(obj) : obj;
    iteratee = is.undefined(thisArg) ? iteratee : _bind(iteratee, thisArg);
    len = obj.length;
    i = -1;
    switch (iteratee.length) {
      case 0:  while (++i < len) result += iteratee();              break;
      case 1:  while (++i < len) result += iteratee(obj[i]);        break;
      case 2:  while (++i < len) result += iteratee(obj[i], i);     break;
      default: while (++i < len) result += iteratee(obj[i], i, obj);
    }
    return result;
  }

  /**
   * @private
   * @param {!(Object|function)} obj
   * @param {function(*, *, number=, !Array=)} iteratee
   * @param {Object=} thisArg
   * @return {*}
   */
  function _rollArrDown(obj, iteratee, thisArg) {

    /** @type {*} */
    var result;
    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    obj = iteratee.length > 2 ? copy.arr(obj) : obj;
    iteratee = is.undefined(thisArg) ? iteratee : _bind(iteratee, thisArg);
    result = obj[0];
    len = obj.length;
    i = 0;
    switch (iteratee.length) {
      case 0:  while (++i < len) result -= iteratee();              break;
      case 1:  while (++i < len) result -= iteratee(obj[i]);        break;
      case 2:  while (++i < len) result -= iteratee(obj[i], i);     break;
      default: while (++i < len) result -= iteratee(obj[i], i, obj);
    }
    return result;
  }

  /**
   * @private
   * @param {*} result
   * @param {!(Object|function)} obj
   * @param {function(*, number=, !Array=)} iteratee
   * @param {Object=} thisArg
   * @return {*}
   */
  function _rollBaseArrDown(result, obj, iteratee, thisArg) {

    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    obj = iteratee.length > 2 ? copy.arr(obj) : obj;
    iteratee = is.undefined(thisArg) ? iteratee : _bind(iteratee, thisArg);
    len = obj.length;
    i = -1;
    switch (iteratee.length) {
      case 0:  while (++i < len) result -= iteratee();              break;
      case 1:  while (++i < len) result -= iteratee(obj[i]);        break;
      case 2:  while (++i < len) result -= iteratee(obj[i], i);     break;
      default: while (++i < len) result -= iteratee(obj[i], i, obj);
    }
    return result;
  }

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - ROLL CYCLE
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @param {*} result
   * @param {number} count
   * @param {function} iteratee
   * @param {Object=} thisArg
   * @return {*}
   */
  function _rollCycle(result, count, iteratee, thisArg) {

    /** @type {number} */
    var i;

    iteratee = is.undefined(thisArg) ? iteratee : _bind(iteratee, thisArg);
    if (iteratee.length > 1) {
      i = 0;
      while(count--) result = iteratee(result, i++);
    }
    else {
      while(count--) result = iteratee(result);
    }
    return result;
  }

  /**
   * @private
   * @param {*} result
   * @param {number} count
   * @param {function} iteratee
   * @param {Object=} thisArg
   * @return {*}
   */
  function _rollCycleUp(result, count, iteratee, thisArg) {

    /** @type {number} */
    var i;

    iteratee = is.undefined(thisArg) ? iteratee : _bind(iteratee, thisArg);
    if (iteratee.length) {
      i = 0;
      while(count--) result += iteratee(i++);
    }
    else {
      while(count--) result += iteratee();
    }
    return result;
  }

  /**
   * @private
   * @param {*} result
   * @param {number} count
   * @param {function} iteratee
   * @param {Object=} thisArg
   * @return {*}
   */
  function _rollCycleDown(result, count, iteratee, thisArg) {

    /** @type {number} */
    var i;

    iteratee = is.undefined(thisArg) ? iteratee : _bind(iteratee, thisArg);
    if (iteratee.length) {
      i = 0;
      while(count--) result -= iteratee(i++);
    }
    else {
      while(count--) result -= iteratee();
    }
    return result;
  }

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - GENERAL
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @param {function} func
   * @param {Object} thisArg
   * @return {function} 
   */
  function _bind(func, thisArg) {
    switch (func.length) {
      case 0: return function iteratee() { return func.call(thisArg); };
      case 1: return function iteratee(val) { return func.call(thisArg, val); };
      case 2: return function iteratee(val1, val2) {
        return func.call(thisArg, val1, val2);
      };
      case 3: return function iteratee(val1, val2, val3) {
        return func.call(thisArg, val1, val2, val3);
      };
    }
    return function iteratee(prev, curr, key, obj) {
      return func.call(thisArg, prev, curr, key, obj);
    };
  }

  /**
   * @private
   * @type {!ErrorAid}
   */
  var _error = newErrorAid('roll');

  //////////////////////////////////////////////////////////
  // END OF PRIVATE SCOPE FOR ROLL
  return roll;
})();


////////////////////////////////////////////////////////////////////////////////
// SLICE
////////////////////////////////////////////////////////////////////////////////

var slice = (function slicePrivateScope() {

  //////////////////////////////////////////////////////////
  // PUBLIC METHODS
  // - slice
  // - slice.array  (slice.arr)
  // - slice.string (slice.str)
  //////////////////////////////////////////////////////////

  /**
   * A shortcut for Array.prototype.slice.call(obj, start, end) and
   *   String.prototype.slice(start, end).
   * @public
   * @param {?(Object|Array|function|string)} source
   * @param {number=} start - [default= 0]
   * @param {number=} end - [default= source.length]
   * @return {?(Array|string)}
   */
  function slice(source, start, end) {

    if ( !is('num=', start) ) throw _error.type('start');
    if ( !is('num=', end)   ) throw _error.type('end');

    if ( is.null(source) ) return null;

    if ( is.str(source) ) return _sliceStr(source, start, end);

    if ( !is._obj(source)       ) throw _error.type('source');
    if ( !is.num(source.length) ) throw _error.type('source.length');

    return _sliceArr(source, start, end);
  }

  /**
   * A shortcut for Array.prototype.slice.call(obj, start, end).
   * @public
   * @param {?(Object|Array|function)} source
   * @param {number=} start - [default= 0]
   * @param {number=} end - [default= source.length]
   * @return {!Array}
   */
  slice.array = function sliceArray(source, start, end) {

    if ( !is._obj(source)       ) throw _error.type('source',        'array');
    if ( !is.num(source.length) ) throw _error.type('source.length', 'array');
    if ( !is('num=', start)     ) throw _error.type('start',         'array');
    if ( !is('num=', end)       ) throw _error.type('end',           'array');

    return _sliceArr(source, start, end);
  };
  // define shorthand
  slice.arr = slice.array;

  /**
   * A shortcut for String.prototype.slice(start, end).
   * @public
   * @param {string} str
   * @param {number=} start - [default= 0]
   * @param {number=} end - [default= str.length]
   * @return {string}
   */
  slice.string = function sliceString(str, start, end) {

    if ( !is.str(str)       ) throw _error.type('str',   'string');
    if ( !is('num=', start) ) throw _error.type('start', 'string');
    if ( !is('num=', end)   ) throw _error.type('end',   'string');

    return _sliceStr(str, start, end);
  };
  // define shorthand
  slice.str = slice.string;

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - GENERAL
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @type {!ErrorAid}
   */
  var _error = newErrorAid('slice');

  //////////////////////////////////////////////////////////
  // END OF PRIVATE SCOPE FOR SLICE
  return slice;
})();


////////////////////////////////////////////////////////////////////////////////
// UNTIL
////////////////////////////////////////////////////////////////////////////////

var until = (function untilPrivateScope() {

  //////////////////////////////////////////////////////////
  // PUBLIC METHODS
  // - until
  // - until.object (until.obj)
  // - until.array  (until.arr)
  // - until.cycle  (until.time)
  //////////////////////////////////////////////////////////

  /**
   * A shortcut for iterating over object maps, arrays, or cycles until an end
   *   value is returned.
   * @public
   * @param {*} end - A value that ends the iteration if returned by the
   *   iteratee.
   * @param {!(Object|function|Array|number|string)=} source - If the source is
   *   defined the iteration will also stop as follows (per source type):
   *   - object source: Ends after all properties are visited.
   *   - array source:  Ends after all indexes are visited.
   *   - number source: Ends after the count of cycles equals the source.
   *   - string source: Converted to an array source and ends after all indexes
   *     are visited. Use this list of chars for the separator (chars listed in
   *     order of rank):  ", "  ","  "|"  " "
   * @param {function(*=, (string|number)=, (!Object|function)=)} iteratee - It
   *   has the optional params - value, key/index, source. Note this method
   *   lazily clones the source based on the iteratee's [length property]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/length}
   *   (i.e. if you alter the source object within the iteratee ensure to define
   *   the iteratee's third param so you can safely assume all references to the
   *   source are its original values).
   * @param {Object=} thisArg - If defined the iteratee is bound to this value.
   * @return {boolean} - This method will return true if the iteratee returns
   *   the end value or false if the iteratee does not.
   */
  function until(end, source, iteratee, thisArg) {

    if (arguments.length < 2) throw _error('No end or iteratee defined');

    if (arguments.length === 2) {
      iteratee = source;
      if ( !is.func(iteratee) ) throw _error.type('iteratee');
      return _untilEnd(end, iteratee);
    }

    if ( arguments.length === 3 && is.func(source) && is('?obj', iteratee) ) {
      thisArg = iteratee;
      iteratee = source;
      return _untilEnd(end, iteratee, thisArg);
    }

    if ( !is.func(iteratee)   ) throw _error.type('iteratee');
    if ( !is('obj=', thisArg) ) throw _error.type('thisArg');

    if ( is.num(source) ) return _untilCycle(end, source, iteratee, thisArg);

    if ( is.str(source) ) source = _splitKeys(source);

    if ( !is._obj(source) ) throw _error.type('source');

    return is._arr(source)
      ? _untilArr(end, source, iteratee, thisArg)
      : _untilObj(end, source, iteratee, thisArg);
  }

  /**
   * A shortcut for iterating over object maps until an end value is returned or
   *   all properties are visited.
   * @public
   * @param {*} end - A value that ends the iteration if returned by the
   *   iteratee.
   * @param {!(Object|function)} obj
   * @param {function(*=, string=, !(Object|function)=)} iteratee - The iteratee
   *   must be a function with the optional params - value, key, source. Note
   *   this method lazily clones the source based on the iteratee's
   *   [length property]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/length}
   *   (i.e. if you alter the source object within the iteratee ensure to define
   *   the iteratee's third param so you can safely assume all references to the
   *   source are its original values).
   * @param {Object=} thisArg
   * @return {boolean} - If the iteration is terminated by the end value this
   *   method will return true. Otherwise if all the properties are visited this
   *   method will return false.
   */
  until.object = function untilObject(end, obj, iteratee, thisArg) {

    if ( !is._obj(obj)        ) throw _error.type('obj',      'object');
    if ( !is.func(iteratee)   ) throw _error.type('iteratee', 'object');
    if ( !is('obj=', thisArg) ) throw _error.type('thisArg',  'object');

    return _untilObj(end, obj, iteratee, thisArg);
  };
  // define shorthand
  until.obj = until.object;

  /**
   * A shortcut for iterating over array-like objects until an end value is
   *   returned or all indexed values are visited.
   * @public
   * @param {*} end - A value that ends the iteration if returned by the
   *   iteratee.
   * @param {!(Object|function|string)} source - If source is a string it is
   *   converted to an array. Use the following list of chars for the separator
   *   (chars listed in order of rank):  ", "  ","  "|"  " "
   * @param {function(*=, number=, !Array=)} iteratee - The iteratee must be a
   *   function with the optional params - value, index, source. Note this
   *   method lazily slices (see [vitals.copy.array]{@link https://github.com/imaginate/vitals/blob/master/src/methods/copy.js})
   *   the source based on the iteratee's [length property]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/length}
   *   (i.e. if you alter the source object within the iteratee ensure to define
   *   the iteratee's third param so you can safely assume all references to the
   *   source are its original values).
   * @param {Object=} thisArg
   * @return {boolean} - If the iteration is terminated by the end value this
   *   method will return true. Otherwise if all the indexed values are visited
   *   this method will return false.
   */
  until.array = function untilArray(end, source, iteratee, thisArg) {

    if ( is.str(source) ) source = _splitKeys(source);

    if ( !is._obj(source)       ) throw _error.type('source',        'array');
    if ( !is.num(source.length) ) throw _error.type('source.length', 'array');
    if ( !is.func(iteratee)     ) throw _error.type('iteratee',      'array');
    if ( !is('obj=', thisArg)   ) throw _error.type('thisArg',       'array');

    return _untilArr(end, source, iteratee, thisArg);
  };
  // define shorthand
  until.arr = until.array;

  /**
   * A shortcut for invoking an action until an end value is returned or the
   *   number of cycles is reached.
   * @public
   * @param {*} end - A value that ends the iteration if returned by the
   *   iteratee.
   * @param {number} count - The number of cycles.
   * @param {function(number=)} action
   * @param {Object=} thisArg
   * @return {boolean} - If the iteration is terminated by the end value this
   *   method will return true. Otherwise if the number of cycles is reached
   *   this method will return false.
   */
  until.cycle = function untilCycle(end, count, action, thisArg) {

    if ( !is.num(count)       ) throw _error.type('count',   'cycle');
    if ( !is.func(action)     ) throw _error.type('action',  'cycle');
    if ( !is('obj=', thisArg) ) throw _error.type('thisArg', 'cycle');

    return _untilCycle(end, count, action, thisArg);
  };
  // define shorthand
  until.time = until.cycle;

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - MAIN
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @param {*} end
   * @param {function} action
   * @param {Object=} thisArg
   * @return {boolean}
   */
  function _untilEnd(end, action, thisArg) {

    /** @type {number} */
    var i;

    action = is.undefined(thisArg) ? action : _bind(action, thisArg);
    if (action.length) {
      i = 0;
      while(action(i++) !== end) {}
    }
    else {
      while(action() !== end) {}
    }
    return true;
  }

  /**
   * @private
   * @param {*} end
   * @param {!(Object|function)} obj
   * @param {function(*, string=, !(Object|function)=)} iteratee
   * @param {Object=} thisArg
   * @return {boolean}
   */
  function _untilObj(end, obj, iteratee, thisArg) {

    /** @type {string} */
    var key;

    obj = iteratee.length > 2 ? copy(obj) : obj;
    iteratee = is.undefined(thisArg) ? iteratee : _bind(iteratee, thisArg);
    switch (iteratee.length) {
      case 0:
      for (key in obj) {
        if ( _own(obj, key) ) {
          if (iteratee() === end) return true;
        }
      }
      break;
      case 1:
      for (key in obj) {
        if ( _own(obj, key) ) {
          if (iteratee(obj[key]) === end) return true;
        }
      }
      break;
      case 2:
      for (key in obj) {
        if ( _own(obj, key) ) {
          if (iteratee(obj[key], key) === end) return true;
        }
      }
      break;
      default:
      for (key in obj) {
        if ( _own(obj, key) ) {
          if (iteratee(obj[key], key, obj) === end) return true;
        }
      }
    }
    return false;
  }

  /**
   * @private
   * @param {*} end
   * @param {!(Object|function)} obj
   * @param {function(*, number=, !Array=)} iteratee
   * @param {Object=} thisArg
   * @return {boolean}
   */
  function _untilArr(end, obj, iteratee, thisArg) {

    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    obj = iteratee.length > 2 ? copy.arr(obj) : obj;
    iteratee = is.undefined(thisArg) ? iteratee : _bind(iteratee, thisArg);
    len = obj.length;
    i = -1;
    switch (iteratee.length) {
      case 0:
      while (++i < len) {
        if (iteratee() === end) return true;
      }
      break;
      case 1:
      while (++i < len) {
        if (iteratee(obj[i]) === end) return true;
      }
      break;
      case 2:
      while (++i < len) {
        if (iteratee(obj[i], i) === end) return true;
      }
      break;
      default:
      while (++i < len) {
        if (iteratee(obj[i], i, obj) === end) return true;
      }
    }
    return false;
  }

  /**
   * @private
   * @param {*} end
   * @param {number} count
   * @param {function(number=)} action
   * @param {Object=} thisArg
   * @return {boolean}
   */
  function _untilCycle(end, count, action, thisArg) {

    /** @type {number} */
    var i;

    action = is.undefined(thisArg) ? action : _bind(action, thisArg);
    if (action.length) {
      i = 0;
      while(count--) if (action(i++) === end) return true;
    }
    else {
      while(count--) if (action() === end) return true;
    }
    return false;
  }

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - GENERAL
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @param {function} func
   * @param {Object} thisArg
   * @return {function} 
   */
  function _bind(func, thisArg) {
    switch (func.length) {
      case 0:
      return function iteratee() { return func.call(thisArg); };
      case 1:
      return function iteratee(val) { return func.call(thisArg, val); };
      case 2:
      return function iteratee(val, key) { return func.call(thisArg,val,key); };
    }
    return function iteratee(val, key, obj) {
      return func.call(thisArg, val, key, obj);
    };
  }

  /**
   * @private
   * @type {!ErrorAid}
   */
  var _error = newErrorAid('until');

  //////////////////////////////////////////////////////////
  // END OF PRIVATE SCOPE FOR UNTIL
  return until;
})();



// *****************************************************************************
// SECTION: END
// *****************************************************************************

module.exports = {
  copy:   copy,
  cut:    cut,
  each:   each,
  fill:   fill,
  fuse:   fuse,
  get:    get,
  has:    has,
  remap:  remap,
  roll:   roll,
  slice:  slice,
  until:  until
};
