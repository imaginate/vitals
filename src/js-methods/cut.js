/**
 * -----------------------------------------------------------------------------
 * VITALS - JS SHORTCUTS - CUT
 * -----------------------------------------------------------------------------
 * @version 0.1.0
 * @see [vitals.cut]{@link https://github.com/imaginate/vitals/blob/master/src/parts/js-shortcuts/cut.js}
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

  /**
   * Removes properties (by key) from an object/array or patterns from a string
   *   and returns the amended source.
   * @public
   * @param {!(Object|function|Array|string)} source
   * @param {...*} removals - The keys/patterns to remove. Each array is
   *   considered an array of keys/patterns. Each pattern may be a string or
   *   RegExp. All other (i.e. not array or regex) key/pattern types are
   *   converted to a string.
   * @return {!(Object|function|Array|string)} The amended source.
   */
  function cut(source, removals) {

    removals = arguments.length > 2 ? slice(arguments, 1) : removals;

    if ( is.undefined(removals) ) throw _error('No removal defined');

    if ( is.str(source) ) {
      if ( is.arr(removals) ) return _cutPatterns(source, removals);
      return _cutPattern(source, removals);
    }

    if ( !is._obj(source) ) throw _error.type('source');

    if ( !is.arr(removals) ) {
      if ( !_has(source, removals) ) {
        throw _error('Key does not exist in source');
      }
      return _cutKey(source, removals);
    }

    if ( is.arr(source) ) return _cutKeysArr(source, removals);
    return _cutKeys(source, removals);
  }

  /**
   * Removes a property (by key) from an object/array and returns the object.
   * @public
   * @param {!(Object|function|Array)} source
   * @param {*} key - If key is a number and source an array then the array is
   *   correctly spliced. All other non-string types are converted to a string.
   * @return {!(Object|function|Array)}
   */
  cut.key = function cutKey(source, key) {

    if ( !is._obj(source) ) throw _error.type('source', 'key');
    if ( !_has(source, key)) throw _error('Key does not exist in source','key');

    return _cutKey(source, key);
  };

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

  /**
   * @private
   * @param {!(Object|function|Array)} source
   * @param {*} key
   * @return {!(Object|function|Array)}
   */
  function _cutKey(source, key) {
    if ( is.arr(source) && is.num(key) ) source.splice(key, 1);
    else delete source[key];
    return source;
  }

  /**
   * @private
   * @param {!(Object|function|Array)} source
   * @param {!Array} keys
   * @return {!(Object|function|Array)}
   */
  function _cutKeys(source, keys) {

    /** @type {*} */
    var key;
    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    len = keys.length;
    i = -1;
    while (++i < len) {
      key = keys[i];
      if ( is.arr(key) ) {
        _cutKeys(source, key);
        continue;
      }
      if ( !_has(source, key) ) throw _error('A key does not exist in source');
      delete source[key];
    }
    return source;
  }

  /**
   * @private
   * @param {!(Object|function|Array)} source
   * @param {!Array} keys
   * @return {!(Object|function|Array)}
   */
  function _cutKeysArr(source, keys) {

    /** @type {*} */
    var key;
    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    len = keys.length;
    i = -1;
    while (++i < len) {
      key = keys[i];
      if ( is.arr(key) ) {
        _cutKeysArr(source, key);
        continue;
      }
      if ( !_has(source, key) ) throw _error('A key does not exist in source');
      if ( is.num(key) ) source.splice(key, 1);
      else delete source[key];
    }
    return source;
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

  /**
   * @private
   * @param {?(Object|function)} obj
   * @param {*} key
   * @return {boolean}
   */
  var _has = has.key;

  /**
   * @private
   * @type {!ErrorAid}
   */
  var _error = makeErrorAid('cut');

  // END OF PRIVATE SCOPE FOR CUT
  return cut;
})();


module.exports = cut;
