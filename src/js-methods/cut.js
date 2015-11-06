/**
 * -----------------------------------------------------------------------------
 * VITALS - JS SHORTCUTS - CUT
 * -----------------------------------------------------------------------------
 * @version 2.0.0
 * @see [vitals.cut]{@link https://github.com/imaginate/vitals/blob/master/src/js-methods/cut.js}
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

var makeErrorAid = require('./_error.js');
var is = require('node-are').is;
var has = require('./has.js');
var slice = require('./slice.js');


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
  // - cut.pattern
  // - cut.properties (cut.props)
  // - cut.keys
  // - cut.indexes    (cut.ii)
  // - cut.patterns
  //////////////////////////////////////////////////////////

  /**
   * Removes properties from an object/array or patterns from a string
   *   and returns the amended source. Note that the use of the word, "match",
   *   within vitals.cut refers to [vitals.has.pattern]{@link https://github.com/imaginate/vitals/blob/master/src/js-methods/has.js}.
   * @public
   * @param {!(Object|function|Array|string)} source
   * @param {...*} vals - If only one val is provided and it is an array it is
   *   considered an array of vals. Details are as follows (per source type):
   *     object source: If the leading val is a RegExp or string this method
   *       will delete all properties with keys that match each val. If any
   *       following vals are not a RegExp or string they are converted to a
   *       string. Otherwise if the leading val is not a RegExp or string this
   *       method will delete all properties where value === val. 
   *     array source: If all vals are a number each corresponding index is
   *       spliced from the array. Otherwise all properties where value === val
   *       are spliced from the array.
   *     string source: All vals that are not a RegExp or string are converted
   *       to a string. Each matching substring is removed from the source.
   * @return {!(Object|function|Array|string)} The amended source.
   */
  function cut(source, vals) {

    if (arguments.length < 2) throw _error('No val defined');

    vals = arguments.length > 2 ? slice(arguments, 1) : vals;

    if ( is.str(source) ) {
      return is.arr(vals)
        ? _cutPatterns(source, vals)
        : _cutPattern(source, vals);
    }

    if ( !is._obj(source) ) throw _error.type('source');

    source = is.args(source) ? slice(source) : source;
    return is.arr(vals) ? _cutProps(source, vals) : _cutProp(source, vals);
  }

  /**
   * Removes a property from an object/array and returns the object. Note that
   *   the use of the word, "match", within vitals.cut.property refers to
   *   [vitals.has.pattern]{@link https://github.com/imaginate/vitals/blob/master/src/js-methods/has.js}.
   * @public
   * @param {!(Object|function|Array)} source
   * @param {*} val - The details are as follows (per source type):
   *   object source: If val is a RegExp or string this method will delete all
   *     properties with keys that match the val. Otherwise this method will
   *     delete all properties where value === val.
   *   array source: If val is a number the corresponding index is spliced from
   *     the array. Otherwise all properties where value === val are spliced
   *     from the array.
   * @return {!(Object|function|Array)}
   */
  cut.property = function cutProperty(source, val) {

    if ( !is._obj(source) ) throw _error.type('source', 'property');
    if (arguments.length < 2) throw _error('No val defined', 'property');

    source = is.args(source) ? slice(source) : source;
    return _cutProp(source, val);
  };

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
   * @param {number} key - The index to remove.
   * @param {number=} toKey - If defined all indexes from key to toKey (but not
   *   including toKey) are removed.
   * @return {!Array}
   */
  cut.index = function cutIndex(source, key, toKey) {

    if ( !is._obj(source)       ) throw _error.type('source',        'index');
    if ( !is.num(source.length) ) throw _error.type('source.length', 'index');
    if ( !is.num(key)           ) throw _error.type('key',           'index');
    if ( !is('num=', toKey)     ) throw _error.type('toKey',         'index');

    source = is.arr(source) ? source : slice(source);
    return _cutIndex(source, key, toKey);
  };
  // define shorthand
  cut.i = cut.index;

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
   *   [vitals.has.pattern]{@link https://github.com/imaginate/vitals/blob/master/src/js-methods/has.js}.
   * @public
   * @param {!(Object|function|Array)} source
   * @param {...*} vals - If only one val is provided and it is an array it is
   *   considered an array of vals. Details are as follows (per source type):
   *     object source: If the leading val is a RegExp or string this method
   *       will delete all properties with keys that match each val. If any
   *       following vals are not a RegExp or string they are converted to a
   *       string. Otherwise if the leading val is not a RegExp or string this
   *       method will delete all properties where value === val. 
   *     array source: If all vals are a number each corresponding index is
   *       spliced from the array. Otherwise all properties where value === val
   *       are spliced from the array.
   * @return {!(Object|function|Array)}
   */
  cut.properties = function cutProperties(source, vals) {

    if ( !is._obj(source) ) throw _error.type('source', 'properties');
    if (arguments.length < 2) throw _error('No val defined', 'properties');

    source = is.args(source) ? slice(source) : source;
    vals = arguments.length > 2 ? slice(arguments, 1) : vals;
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

    keys = arguments.length > 2 ? slice(arguments, 1) : keys;
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

    source = is.arr(source) ? source : slice(source);
    indexes = arguments.length > 2 ? slice(arguments, 1) : indexes;

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

    patterns = arguments.length > 2 ? slice(arguments, 1) : patterns;
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
   * @param {string} source
   * @param {*} pattern
   * @return {string}
   */
  function _cutPattern(source, pattern) {
    pattern = is.regex(pattern) ? pattern : String(pattern);
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
   * @return {!(Object|function)}
   */
  function _deleteKey(source, key) {

    /** @type {!RegExp} */
    var pattern;

    if ( is.regex(key) ) {
      pattern = key;
      for (key in source) {
        if ( _own(source, key) && _match(source, pattern) ) {
          delete source[key];
        }
      }
    }
    else if ( _own(source, key) ) {
      delete source[key];
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

    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    len = keys.length;
    i = -1;
    while (++i < len) {
      source = _deleteKey(source, keys[i]);
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

    if (keys.length < 2) return _spliceKey(source, keys);

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
   * @param {!Array} vals
   * @return {!Array}
   */
  function _spliceVals(source, vals) {

    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    len = vals.length;
    i = -1;
    while (++i < len) {
      source = _spliceVals(source, vals[i]);
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
    function sortIndexes(indexes, sourceLen)

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
   * @param {?(Object|function)} obj
   * @param {*} key
   * @return {boolean}
   */
  var _own = has.key;

  /**
   * @private
   * @param {string} source
   * @param {*} pattern
   * @return {boolean}
   */
  var _match = has.pattern;

  /**
   * @private
   * @type {!ErrorAid}
   */
  var _error = makeErrorAid('cut');

  //////////////////////////////////////////////////////////
  // END OF PRIVATE SCOPE FOR CUT
  return cut;
})();


module.exports = cut;
