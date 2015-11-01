/**
 * -----------------------------------------------------------------------------
 * VITALS - JS SHORTCUTS - KEYS
 * -----------------------------------------------------------------------------
 * @version 0.1.0
 * @see [vitals.keys]{@link https://github.com/imaginate/vitals/blob/master/src/parts/js-shortcuts/keys.js}
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


////////////////////////////////////////////////////////////////////////////////
// GET
////////////////////////////////////////////////////////////////////////////////

var get = (function getPrivateScope() {

  /**
   * Gets keys, indexes, values, or substrings from an object, array, or string.
   * @public
   * @param {?(Object|function|Array|string)} source - If source is the only
   *   defined param the following applies: For object sources this method will
   *   return an array of its keys. For array sources this method will return an
   *   array of its indexes.
   * @param {RegExp=} key - If a key is given this method will return an array
   *   of the values of the matching keys. This param is only valid for objects
   *   and strings. A key and val param cannot both be given.
   * @param {*=} val - If a val is given this method will return an array of the
   *   keys/indexes with matching values.
   * @return {Array}
   */
  function get(source, key, val) {

    if (arguments.length > 2) throw _error('Only one key/val may be defined');

    if ( is.null(source) ) return null;

    if (arguments.length === 1) {
      if ( !is._obj(source) ) throw _error.type('source');
      return _getObjKeysAll(source);
    }

    if ( is.str(source) ) {
      if ( is.regex(key) ) return _getStrVals(source, key);
      val = String(key);
      return _getStrKeys(source, val);
    }

    if ( !is._obj(source) ) throw _error.type('source');

    if ( is._arr(source) ) {
      val = key;
      return _getArrKeys(source, val);
    }

    if ( is.regex(key) ) return _getObjVals(source, key);
    val = key;
    return _getObjKeys(source, val);
  }

  /**
   * Gets an array of keys/indexes from an object, array, or string.
   * @public
   * @param {?(Object|function|Array|string)} source - If source is the only
   *   defined param all of the keys/indexes are returned.
   * @param {*=} pattern - For string sources a pattern must be defined. If a
   *   pattern is defined this method will return an array of the keys/indexes
   *   with matching values (for string sources the starting index of each match
   *   is used). If the pattern is not a RegExp, string, or number it is
   *   converted to a string.
   * @return {Array<string>}
   */
  get.keys = function getKeys(source, pattern) {

    if ( is.null(source) ) return null;

    if (arguments.length === 1) {
      if ( !is._obj(source) ) throw _error.type('source', 'keys');
      return _getObjKeysAll(source);
    }

    if ( is.str(source) ) {
      pattern = is.regex(pattern) ? pattern : String(pattern);
      return _getStrKeys(source, pattern);
    }

    if ( !is._obj(source) ) throw _error.type('source', 'keys');

    return is._arr(source)
      ? _getArrKeys(source, pattern)
      : _getObjKeys(source, pattern);
  };
  // define shorthand
  get.indexes = get.keys;

  /**
   * @private
   * @param {!(Object|function)} obj
   * @return {!Array<string>}
   */
  function _getObjKeysAll(obj) {

    /** @type {string} */
    var key;
    /** @type {!Array<string>} */
    var arr;

    arr = [];
    for (key in obj) has.key(obj, key) && arr.push(key);
    return arr;
  }

  /**
   * @private
   * @type {!ErrorAid}
   */
  var _error = makeErrorAid('get');

  // END OF PRIVATE SCOPE FOR GET
  return get;
})();


module.exports = get;
