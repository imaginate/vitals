/**
 * -----------------------------------------------------------------------------
 * VITALS - JS SHORTCUTS - CUT
 * -----------------------------------------------------------------------------
 * @version 0.1.0
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
  // - cut.properties (cut.props)
  // - cut.keys
  // - cut.indexes
  // - cut.pattern
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
   * Removes properties (by key) from an object/array and returns the object.
   * @public
   * @param {!(Object|function|Array)} source
   * @param {...*} keys - If a key is a number and the source an array then the
   *   array is correctly spliced. If a key is an array it is considered an
   *   array of keys. All other non-string types are converted to a string.
   * @return {!(Object|function|Array)}
   */
  cut.keys = function cutKeys(source, keys) {

    if ( !is._obj(source) ) throw _error.type('source', 'keys');

    keys = arguments.length > 2 ? slice(arguments, 1) : keys;

    if ( is.undefined(keys) ) throw _error('No keys defined', 'keys');

    if ( !is.arr(keys) ) {
      if ( !_has(source, keys) ) {
        throw _error('Key does not exist in source', 'keys');
      }
      return _cutKey(source, keys);
    }

    if ( is.arr(source) ) return _cutKeysArr(source, keys);
    return _cutKeys(source, keys);
  };

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

    return _cutPattern(source, pattern);
  };

  /**
   * Removes a pattern from a string and returns the amended string.
   * @public
   * @param {string} source
   * @param {...*} patterns - If a pattern is an array it is considered an array
   *   of patterns. If a pattern is not a string, RegExp, or array it is
   *   converted to a string.
   * @return {string}
   */
  cut.patterns = function cutPatterns(source, patterns) {

    if ( !is.str(source) ) throw _error.type('source', 'patterns');

    patterns = arguments.length > 2 ? slice(arguments, 1) : patterns;

    if ( is.undefined(patterns) ) {
      throw _error('No patterns defined', 'patterns');
    }

    if ( !is.arr(patterns) ) {
      patterns = is.regex(patterns) ? patterns : String(patterns);
      return source.replace(patterns, '');
    }

    return _cutPatterns(source, patterns);
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

    /** @type {*} */
    var pattern;
    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    len = patterns.length;
    i = -1;
    while (++i < len) {
      pattern = patterns[i];
      source = is.arr(pattern)
        ? _cutPatterns(source, pattern)
        : _cutPattern(source, pattern);
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
    var len;
    /** @type {number} */
    var i;
    /** @type {number} */
    var first;
    /** @type {number} */
    var count;

    sorted = _sortIndexes(keys, source.length - 1);
    len = sorted.first.length;
    i = -1;
    while (++i < len) {
      first = sorted.first[i];
      count = sorted.last[i] - first + 1;
      source.splice(first, count);
    }
    return source;
  }

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - SORT
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @param {!Array<number>} keys
   * @param {number} max
   * @return {!{
   *   first: !Array<number>,
   *   last:  !Array<number>
   * }}
   */
  var _sortIndexes = (function() {

    // setup
    // main sort
    // find pos up
    // find pos down

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
