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
var clone = require('./clone.js');


////////////////////////////////////////////////////////////////////////////////
// GET
////////////////////////////////////////////////////////////////////////////////

var get = (function getPrivateScope() {

  /**
   * Gets keys, indexes, values, or substrings from an object, array, or string.
   *   Note that the use of the word, "match", within vitals.get refers to
   *   [vitals.has.pattern]{@link https://github.com/imaginate/vitals/blob/master/src/js-methods/has.js}.
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
      if (arguments.length === 1) throw _error('No val defined');
      return is.regex(val)
        ? _getStrVals(source, val)
        : _getStrKeys(source, val);
    }

    if ( !is._obj(source) ) throw _error.type('source');

    if (arguments.length === 1) {
      return is._arr(source) ? _getAllArrKeys(source) : _getAllObjKeys(source);
    }

    if ( is._arr(source) ) return _getByValArrKeys(source, val);

    return is.regex(val)
      ? _getByKeyObjVals(source, val)
      : _getByValObjKeys(source, val);
  }

  /**
   * Gets an array of keys/indexes from an object, array, or string. Note that
   *   the use of the word, "match", within vitals.get.keys refers to
   *   [vitals.has.pattern]{@link https://github.com/imaginate/vitals/blob/master/src/js-methods/has.js}.
   * @public
   * @param {!(Object|function|Array|string)} source - If no val param is
   *   defined this method will return an array of all an object's own keys or
   *   all an array's indexes. If the source is a string a val is required.
   * @param {*=} val - For a RegExp val and object/string source this method
   *   will return the following values (per source type):
   *     object source: an array of source keys where the key matches the val
   *     string source: an array of starting indexes that match the val
   *   Otherwise this method will return the following values (per source type):
   *     object source: an array of source keys where the value === val
   *     array source:  an array of source indexes where the value === val
   *     string source: an array of starting indexes where the substring == val
   * @return {!Array}
   */
  get.keys = function getKeys(source, val) {

    if ( is.str(source) ) {
      if (arguments.length === 1) throw _error('No val defined', 'keys');
      return _getStrKeys(source, val);
    }

    if ( !is._obj(source) ) throw _error.type('source', 'keys');

    if (arguments.length === 1) {
      return is._arr(source) ? _getAllArrKeys(source) : _getAllObjKeys(source);
    }

    if ( is._arr(source) ) return _getByValArrKeys(source, val);

    return is.regex(val)
      ? _getByKeyObjKeys(source, val)
      : _getByValObjKeys(source, val);
  };
  // define shorthand
  get.indexes = get.keys;

  /**
   * Gets an array of keys from an object that match a pattern.
   * @see [vitals.has.pattern]{@link https://github.com/imaginate/vitals/blob/master/src/js-methods/has.js}.
   * @public
   * @param {!(Object|function)} source
   * @param {*} pattern - If pattern is not a RegExp or string it is converted
   *   to a string.
   * @return {!Array<string>}
   */
  get.keys.byKey = function getKeysByKey(source, pattern) {

    if ( !is._obj(source) ) throw _error.type('source', 'keys.byKey');
    if (arguments.length === 1) throw _error('No pattern defined','keys.byKey');

    return _getByKeyObjKeys(source, pattern);
  };

  /**
   * Gets an array of keys/indexes from an object/array where the value === val.
   * @public
   * @param {!(Object|function|Array)} source
   * @param {*} val
   * @return {!Array}
   */
  get.keys.byValue = function getKeysByValue(source, val) {

    if ( !is._obj(source) ) throw _error.type('source', 'keys.byValue');
    if (arguments.length === 1) throw _error('No val defined', 'keys.byValue');

    return is._arr(source)
      ? _getByValArrKeys(source, val)
      : _getByValObjKeys(source, val);
  };
  // define shorthand
  get.keys.byVal = get.keys.byValue;

  /**
   * Gets an array of values/substrings from an object or string. Note that the
   *   use of the word, "match", within vitals.get.values refers to
   *   [vitals.has.pattern]{@link https://github.com/imaginate/vitals/blob/master/src/js-methods/has.js}.
   * @public
   * @param {!(Object|function|string)} source - If no val param is defined this
   *   method will return an array of all the object's values. If the source is
   *   a string a val param is required.
   * @param {*=} val - If the val is not a RegExp or string it is converted to a
   *   string. This method will return the following values (per source type):
   *     object source: an array of source values where the key matches the val
   *     string source: an array of substrings that match the val
   * @return {!Array}
   */
  get.values = function getValues(source, val) {

    if ( is.str(source) ) {
      if (arguments.length === 1) throw _error('No val defined', 'values');
      return _getStrVals(source, val);
    }

    if ( !is._obj(source) ) throw _error.type('source', 'values');

    return arguments.length === 1
      ? _getAllObjVals(source)
      : _getByKeyObjVals(source, val);
  };
  // define shorthand
  get.vals = get.values;

  /**
   * @private
   * @param {!(Object|function)} obj
   * @return {!Array<string>}
   */
  function _getAllObjKeys(obj) {

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
   * @param {!Object} obj
   * @return {!Array<number>}
   */
  function _getAllArrKeys(obj) {

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
   * @param {!(Object|function)} obj
   * @param {*} pattern
   * @return {!Array<string>}
   */
  function _getByKeyObjKeys(obj, pattern) {

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
  function _getByValObjKeys(obj, val) {

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
   * @param {!Object} obj
   * @param {*} val
   * @return {!Array<number>}
   */
  function _getByValArrKeys(obj, val) {

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

  /**
   * @private
   * @param {string} str
   * @param {*} pattern
   * @return {!Array<number>}
   */
  function _getStrKeys(str, pattern) {

    if ( !_match(str, pattern) ) return [];

    return is.regex(pattern)
      ? _getStrKeysByRegex(str, pattern)
      : _getStrKeysByStr(str, pattern);
  }

  /**
   * @private
   * @param {string} str
   * @param {!RegExp} pattern
   * @return {!Array<number>}
   */
  function _getStrKeysByRegex(str, pattern) {

    /** @type {!Array<number>} */
    var arr;
    /** @type {Object} */
    var obj;

    pattern = clone.regex(pattern, true);

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
  function _getStrKeysByStr(str, pattern) {

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
   * @param {!(Object|function)} obj
   * @return {!Array<*>}
   */
  function _getAllObjKeys(obj) {

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
  function _getByKeyObjVals(obj, pattern) {

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

  /**
   * @private
   * @param {string} str
   * @param {*} pattern
   * @return {!Array<string>}
   */
  function _getStrVals(str, pattern) {

    if ( !_match(str, pattern) ) return [];

    return is.regex(pattern)
      ? _getStrValsByRegex(str, pattern)
      : _getStrValsByStr(str, pattern);
  }

  /**
   * @private
   * @param {string} str
   * @param {!RegExp} pattern
   * @return {!Array<string>}
   */
  function _getStrValsByRegex(str, pattern) {

    /** @type {!Array<string>} */
    var arr;
    /** @type {Object} */
    var obj;

    pattern = clone.regex(pattern, true);

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
  function _getStrValsByStr(str, pattern) {

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
  var _error = makeErrorAid('get');

  // END OF PRIVATE SCOPE FOR GET
  return get;
})();


module.exports = get;
