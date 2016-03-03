/**
 * -----------------------------------------------------------------------------
 * VITALS METHOD: cut
 * -----------------------------------------------------------------------------
 * @section base
 * @version 4.1.2
 * @see [vitals.cut]{@link https://github.com/imaginate/vitals/wiki/vitals.cut}
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2016 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Annotations:
 * @see [JSDoc3](http://usejsdoc.org)
 * @see [Closure Compiler JSDoc Syntax](https://developers.google.com/closure/compiler/docs/js-for-compiler)
 */

'use strict';

var newErrorMaker = require('./helpers/new-error-maker.js');
var sliceArr = require('./helpers/slice-arr.js');
var escape = require('./helpers/escape.js');
var match = require('./helpers/match.js');
var own = require('./helpers/own.js');
var copy = require('./copy.js');
var _is = require('./helpers/is.js');
var is = require('./is.js');


////////////////////////////////////////////////////////////////////////////////
// VITALS METHOD: cut
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
   * Removes properties from an object/array or substring patterns from a string
   *   and returns the amended source.
   *
   * @public
   * @param {!(Object|function|Array|string)} source
   * @param {...*} vals - If only one val is provided and it is an array it is
   *   considered an array of vals. Details are as follows (per source type):
   *   - object source:
   *     -- leading val is RegExp: This method will delete all properties with
   *       keys that [match](https://github.com/imaginate/vitals/wiki/vitals.has#haspattern)
   *       each val. If any following vals are not a RegExp they are converted
   *       to a string.
   *     -- leading val is string: This method will delete all properties where
   *       `key === val`. All vals are converted to a string.
   *     -- leading val is function: The val is considered a filter function
   *       (i.e. if it returns false the property is deleted). It has the
   *       optional params - value, key, source. Note this method lazily clones
   *       the source based on the filter's [length property](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/length)
   *       (i.e. if you alter the source object within the filter ensure to
   *       define the filter's third param so you can safely assume all
   *       references to the source are its original values).
   *     -- all other cases: This method will delete all properties where
   *       `value === val`.
   *   - array source:
   *     -- all vals are numbers: This method will splice from the source each
   *       corresponding index.
   *     -- leading val is function: The val is considered a filter function
   *       (i.e. if it returns false the property is spliced from the source).
   *       It has the optional params - value, index, source. Note this method
   *       lazily clones the source based on the filter's [length property](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/length)
   *       (i.e. if you alter the source object within the filter ensure to
   *       define the filter's third param so you can safely assume all
   *       references to the source are its original values).
   *     -- all other cases: This method will splice from the source all
   *       properties where `value === val`.
   *   - string source: All vals that are not a RegExp or string are converted
   *       to a string. Each matching substring is removed from the source.
   * @param {Object=} thisArg - If source is an object/array, val is a filter
   *   function, and thisArg is defined the filter is bound to its value.
   * @return {!(Object|function|Array|string)} The amended source.
   */
  function cut(source, vals, thisArg) {

    if (arguments.length < 2) throw _error('No val defined');

    if ( _is.str(source) ) {
      vals = arguments.length > 2 ? sliceArr(arguments, 1) : vals;
      return _is.arr(vals)
        ? _cutPatterns(source, vals)
        : _cutPattern(source, vals);
    }

    if ( !_is._obj(source) ) throw _error.type('source');

    source = _is.args(source) ? sliceArr(source) : source;

    if ( _is.func(vals) ) {
      if ( !_is.nil.un.obj(thisArg) ) throw _error.type('thisArg');
      return _is.arr(source)
        ? _filterArr(source, vals, thisArg)
        : _filterObj(source, vals, thisArg);
    }

    vals = arguments.length > 2 ? sliceArr(arguments, 1) : vals;
    return _is.arr(vals) ? _cutProps(source, vals) : _cutProp(source, vals);
  }

  /**
   * Removes a property from an object/array and returns the object.
   *
   * @public
   * @param {!(Object|function|Array)} source
   * @param {*} val - The details are as follows (per source type):
   *   - object source:
   *     -- val is RegExp: This method will delete all properties with a key
   *       that [matches](https://github.com/imaginate/vitals/wiki/vitals.has#haspattern)
   *       the val.
   *     -- val is string: This method will delete all properties where
   *       `key === val`.
   *     -- val is function: The val is considered a filter function (i.e. if it
   *       returns false the property is deleted). It has the optional params -
   *       value, key, source. Note this method lazily clones the source based
   *       on the filter's [length property](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/length)
   *       (i.e. if you alter the source object within the filter ensure to
   *       define the filter's third param so you can safely assume all
   *       references to the source are its original values).
   *     -- all other cases: This method will delete all properties where
   *       `value === val`.
   *   - array source:
   *     -- val is number: This method will splice the index from the source.
   *     -- val is function: The val is considered a filter function (i.e. if it
   *       returns false the property is spliced from the source). It has the
   *       optional params - value, index, source. Note this method lazily
   *       clones the source based on the filter's [length property](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/length)
   *       (i.e. if you alter the source object within the filter ensure to
   *       define the filter's third param so you can safely assume all
   *       references to the source are its original values).
   *     -- all other cases: This method will splice from the source all
   *       properties where `value === val`.
   * @param {Object=} thisArg - If val is a filter function and thisArg is
   *   defined the filter is bound to its value.
   * @return {!(Object|function|Array)}
   */
  cut.property = function cutProperty(source, val, thisArg) {

    if ( !_is._obj(source) ) throw _error.type('source', 'property');
    if (arguments.length < 2) throw _error('No val defined', 'property');

    source = _is.args(source) ? sliceArr(source) : source;

    if ( _is.func(val) ) {
      if ( !_is.nil.un.obj(thisArg) ) throw _error.type('thisArg', 'property');
      return _is.arr(source)
        ? _filterArr(source, val, thisArg)
        : _filterObj(source, val, thisArg);
    }

    return _cutProp(source, val);
  };
  // define shorthand
  cut.prop = cut.property;

  /**
   * Removes a property by key from an object and returns the object.
   *
   * @public
   * @param {!(Object|function)} source
   * @param {*} key - If the key is not a string it is converted to a string.
   *   If the key exists in the source object it is deleted.
   * @return {!(Object|function)}
   */
  cut.key = function cutKey(source, key) {

    if ( !_is._obj(source) ) throw _error.type('source', 'key');
    if (arguments.length < 2) throw _error('No key defined', 'key');

    return _cutKey(source, key);
  };

  /**
   * Removes a property by index from an array and returns the array. If an
   *   array-like object is supplied it is sliced before removing the property.
   *
   * @public
   * @param {!(Object|function|Array)} source
   * @param {number} index - The index to remove.
   * @param {number=} toIndex - If defined all indexes from index to toIndex
   *   (not including toIndex) are removed.
   * @return {!Array}
   */
  cut.index = function cutIndex(source, index, toIndex) {

    if ( !_is._obj(source)       ) throw _error.type('source',        'index');
    if ( !_is.num(source.length) ) throw _error.type('source.length', 'index');
    if ( !_is.num(index)         ) throw _error.type('index',         'index');
    if ( !_is.un.num(toIndex)    ) throw _error.type('toIndex',       'index');

    source = _is.arr(source) ? source : sliceArr(source);
    return _cutIndex(source, index, toIndex);
  };
  // define shorthand
  cut.i = cut.index;

  /**
   * Removes all properties from an object/array with a value that matches a
   *   given type and returns the object. This method uses [vitals.is](https://github.com/imaginate/vitals/wiki/vitals.is)
   *   to complete type checks.
   *
   * @public
   * @param {!(Object|function|Array)} source
   * @param {string} type - The type to check for. Refer to [vitals.is](https://github.com/imaginate/vitals/wiki/vitals.is)
   *   for acceptable options.
   * @return {!(Object|function|Array)}
   */
  cut.type = function cutType(source, type) {

    if ( !_is._obj(source) ) throw _error.type('source', 'type');
    if ( !_is.str(type)    ) throw _error.type('type',   'type');

    source = _is.args(source) ? sliceArr(source) : source;

    if ( _is.empty(source) ) {
      is(type, ''); // run once to catch invalid types
      return source;
    }

    return _cutType(source, type);
  };

  /**
   * Removes all properties from an object/array with a value and returns the
   *   object.
   *
   * @public
   * @param {!(Object|function|Array)} source
   * @param {*} val
   * @return {!(Object|function|Array)}
   */
  cut.value = function cutValue(source, val) {

    if ( !_is._obj(source) ) throw _error.type('source', 'value');
    if (arguments.length < 2) throw _error('No val defined', 'value');

    source = _is.args(source) ? sliceArr(source) : source;
    return _cutVal(source, val);
  };
  // define shorthand
  cut.val = cut.value;

  /**
   * Removes a pattern from a string and returns the amended string.
   *
   * @public
   * @param {string} source
   * @param {*} pattern - If pattern is not a string or RegExp it is converted
   *   to a string.
   * @return {string}
   */
  cut.pattern = function cutPattern(source, pattern) {

    if ( !_is.str(source) ) throw _error.type('source', 'pattern');
    if (arguments.length < 2) throw _error('No pattern defined', 'pattern');

    return _cutPattern(source, pattern);
  };

  /**
   * Removes properties from an object/array and returns the object.
   *
   * @public
   * @param {!(Object|function|Array)} source
   * @param {...*} vals - If only one val is provided and it is an array it is
   *   considered an array of vals. Details are as follows (per source type):
   *   - object source:
   *     -- leading val is RegExp: This method will delete all properties with
   *       keys that [match](https://github.com/imaginate/vitals/wiki/vitals.has#haspattern)
   *       each val. If any following vals are not a RegExp they are converted
   *       to a string.
   *     -- leading val is string: This method will delete all properties where
   *       `key === val`. All vals are converted to a string.
   *     -- all other cases: This method will delete all properties where
   *       `value === val`. 
   *   - array source:
   *     -- all vals are numbers: This method will splice from the source each
   *       corresponding index.
   *     -- all other cases: This method will splice from the source all
   *       properties where `value === val`.
   * @return {!(Object|function|Array)}
   */
  cut.properties = function cutProperties(source, vals) {

    if ( !_is._obj(source) ) throw _error.type('source', 'properties');
    if (arguments.length < 2) throw _error('No val defined', 'properties');

    source = _is.args(source) ? sliceArr(source) : source;
    vals = arguments.length > 2 ? sliceArr(arguments, 1) : vals;
    return _is.arr(vals) ? _cutProps(source, vals) : _cutProp(source, vals);
  };
  // define shorthand
  cut.props = cut.properties;

  /**
   * Removes properties by key from an object and returns the object.
   *
   * @public
   * @param {!(Object|function)} source
   * @param {...*} keys - If only one key is provided and it is an array it is
   *   considered an array of keys. If a key is not a string it is converted to
   *   a string. If the key exists in the source object it is deleted.
   * @return {!(Object|function)}
   */
  cut.keys = function cutKeys(source, keys) {

    if ( !_is._obj(source) ) throw _error.type('source', 'keys');
    if (arguments.length < 2) throw _error('No key defined', 'keys');

    keys = arguments.length > 2 ? sliceArr(arguments, 1) : keys;
    return _is.arr(keys) ? _cutKeys(source, keys) : _cutKey(source, keys);
  };

  /**
   * Removes properties by index from an array and returns the array. If an
   *   array-like object is supplied it is sliced before completing the cut.
   *
   * @public
   * @param {!(Object|function|Array)} source
   * @param {...number} indexes - If only one index is provided and it is an
   *   array it is considered an array of indexes. The indexes to remove.
   * @return {!Array}
   */
  cut.indexes = function cutIndexes(source, indexes) {

    if ( !_is._obj(source)       ) throw _error.type('source',        'indexes');
    if ( !_is.num(source.length) ) throw _error.type('source.length', 'indexes');
    if (arguments.length < 2) throw _error('No index defined', 'indexes');

    source = _is.arr(source) ? source : sliceArr(source);
    indexes = arguments.length > 2 ? sliceArr(arguments, 1) : indexes;

    if ( !_is.arr(indexes) ) {
      if ( !_is.num(indexes) ) throw _error.type('index', 'indexes');
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
   *
   * @public
   * @param {!(Object|function|Array)} source
   * @param {...*} vals - If only one val is provided and it is an array it is
   *   considered an array of vals.
   * @return {!(Object|function|Array)}
   */
  cut.values = function cutValues(source, vals) {

    if ( !_is._obj(source) ) throw _error.type('source', 'value');
    if (arguments.length < 2) throw _error('No val defined', 'value');

    source = _is.args(source) ? sliceArr(source) : source;
    vals = arguments.length > 2 ? sliceArr(arguments, 1) : vals;
    return _is.arr(vals) ? _cutVals(source, vals) : _cutVal(source, vals);
  };
  // define shorthand
  cut.vals = cut.values;

  /**
   * Removes patterns from a string and returns the amended string.
   *
   * @public
   * @param {string} source
   * @param {...*} patterns - If only one pattern is provided and it is an array
   *   it is considered an array of patterns. If a pattern is not a string or
   *   RegExp it is converted to a string.
   * @return {string}
   */
  cut.patterns = function cutPatterns(source, patterns) {

    if ( !_is.str(source) ) throw _error.type('source', 'patterns');
    if (arguments.length < 2) throw _error('No pattern defined', 'patterns');

    patterns = arguments.length > 2 ? sliceArr(arguments, 1) : patterns;
    return _is.arr(patterns)
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
    return _is.arr(source)
      ? _is.num(val)
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
    return _is.arr(source)
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

    if ( _is.undefined(toKey) ) {
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
    return _is.arr(source)
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
    return _is.arr(source) ? _spliceVal(source, val) : _deleteVal(source, val);
  }

  /**
   * @private
   * @param {!(Object|function|Array)} source
   * @param {!Array<*>} vals
   * @return {!(Object|function|Array)}
   */
  function _cutVals(source, vals) {
    return _is.arr(source)
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
    if ( !_is.regex(pattern) ) {
      pattern = String(pattern);
      pattern = escape(pattern);
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
   * @param {boolean=} useMatch
   * @return {!(Object|function)}
   */
  function _deleteKey(source, key, useMatch) {

    /** @type {!RegExp} */
    var pattern;

    useMatch = _is.undefined(useMatch) ? _is.regex(key) : useMatch;

    if (!useMatch) {
      if ( own(source, key) ) delete source[key];
      return source;
    }

    pattern = key;
    for (key in source) {
      if ( own(source, key) && match(key, pattern) ) {
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
    var useMatch;
    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    useMatch = _is.regex( keys[0] );
    len = keys.length;
    i = -1;
    while (++i < len) {
      source = _deleteKey(source, keys[i], useMatch);
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
      if ( own(source, key) && source[key] === val ) {
        delete source[key];
      }
    }
    return source;
  }

  /**
   * @private
   * @param {(!Object|function)} source
   * @param {string} type
   * @return {(!Object|function)}
   */
  function _deleteValByType(source, type) {

    /** @type {string} */
    var key;

    for (key in source) {
      if ( own(source, key) && is(type, source[key]) ) delete source[key];
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

    filter = _is.undefined(thisArg) ? filter : _bind(filter, thisArg);
    obj = filter.length > 2 ? copy(source) : source;
    switch (filter.length) {
      case 0:
      for (key in obj) {
        if ( own(obj, key) && !filter() ) delete source[key];
      }
      break;
      case 1:
      for (key in obj) {
        if ( own(obj, key) && !filter(obj[key]) ) delete source[key];
      }
      break;
      case 2:
      for (key in obj) {
        if ( own(obj, key) && !filter(obj[key], key) ) delete source[key];
      }
      break;
      default:
      for (key in obj) {
        if ( own(obj, key) && !filter(obj[key], key, obj) ) delete source[key];
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

    filter = _is.undefined(thisArg) ? filter : _bind(filter, thisArg);
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
  var _error = newErrorMaker('cut');

  //////////////////////////////////////////////////////////
  // END OF PRIVATE SCOPE FOR CUT
  return cut;
})();


module.exports = cut;
