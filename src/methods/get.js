/**
 * -----------------------------------------------------------------------------
 * VITALS METHOD: get
 * -----------------------------------------------------------------------------
 * @section base
 * @version 4.1.2
 * @see [vitals.get]{@link https://github.com/imaginate/vitals/wiki/vitals.get}
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2017 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Annotations:
 * @see [JSDoc3](http://usejsdoc.org)
 * @see [Closure Compiler JSDoc Syntax](https://developers.google.com/closure/compiler/docs/js-for-compiler)
 */

'use strict';

var newErrorMaker = require('./helpers/new-error-maker.js');
var match = require('./helpers/match.js');
var own = require('./helpers/own.js');
var copy = require('./copy.js');
var _is = require('./helpers/is.js');


////////////////////////////////////////////////////////////////////////////////
// VITALS METHOD: get
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
   *
   * @public
   * @param {!(Object|function|Array|string)} source - If no val param is
   *   defined this method will return the following values (per source type):
   *   - object: array of own keys
   *   - array:  array of indexes
   *   - string: an error (i.e. a val is required for string sources)
   * @param {*=} val - For a `RegExp` val and object/string source this method
   *   will return the following values (per source type):
   *   - object: an array of source values where the key [matches](https://github.com/imaginate/vitals/wiki/vitals.has#haspattern)
   *     the val
   *   - string: an array of substrings that [match](https://github.com/imaginate/vitals/wiki/vitals.has#haspattern)
   *     the val
   *   Otherwise this method will return the following values (per source type):
   *   - object: an array of source keys where the `value === val`
   *   - array:  an array of source indexes where the `value === val`
   *   - string: an array of starting indexes where `substring === String(val)`
   * @return {!Array}
   */
  function get(source, val) {

    if ( _is.str(source) ) {
      if (arguments.length < 2) throw _error('No val defined');
      return _is.regex(val) ? _strVals(source, val) : _strIndexes(source, val);
    }

    if ( !_is._obj(source) ) throw _error.type('source');

    return arguments.length < 2
      ? _is._arr(source)
        ? _allIndexes(source)
        : _allKeys(source)
      : _is._arr(source)
        ? _byValIndexes(source, val)
        : _is.regex(val)
          ? _byKeyObjVals(source, val)
          : _byValKeys(source, val);
  }

  /**
   * Gets an array of keys from an object.
   *
   * @public
   * @param {(!Object|function)} source - If no val param is defined this method
   *   will return an array of all an object's own keys.
   * @param {*=} val - This method will return an array of source keys where the
   *   key [matches](https://github.com/imaginate/vitals/wiki/vitals.has#haspattern)
   *   the val if the val is a `RegExp`. Otherwise this method will return an
   *   array of source keys where the `value === String(val)`.
   * @return {!Array}
   */
  get.keys = function getKeys(source, val) {

    if ( !_is._obj(source) ) throw _error.type('source', 'keys');

    return arguments.length < 2
      ? _allKeys(source)
      : _is.regex(val)
        ? _byKeyKeys(source, val)
        : _byValKeys(source, val);
  };

  /**
   * Gets an array of keys from an object that [match](https://github.com/imaginate/vitals/wiki/vitals.has#haspattern)
   *   a pattern.
   *
   * @public
   * @param {(!Object|function)} source
   * @param {*} pattern - If pattern is not a `RegExp` or string it is converted
   *   to a string.
   * @return {!Array<string>}
   */
  get.keys.byKey = function getKeysByKey(source, pattern) {

    if ( !_is._obj(source) ) throw _error.type('source', 'keys.byKey');
    if (arguments.length < 2) throw _error('No pattern defined', 'keys.byKey');

    return _byKeyKeys(source, pattern);
  };

  /**
   * Gets an array of keys from an object where the `value === val`.
   *
   * @public
   * @param {(!Object|function)} source
   * @param {*} val
   * @return {!Array}
   */
  get.keys.byValue = function getKeysByValue(source, val) {

    if ( !_is._obj(source) ) throw _error.type('source', 'keys.byValue');
    if (arguments.length < 2) throw _error('No val defined', 'keys.byValue');

    return _byValKeys(source, val);
  };
  // define shorthand
  get.keys.byVal = get.keys.byValue;

  /**
   * Gets an array of indexes from an array or string by value/pattern.
   *
   * @public
   * @param {(!Object|string)} source - If no val param is defined this method
   *   will return an array of all an array's indexes or throw an error if the
   *   source is a string.
   * @param {*=} val - This method returns the indexes by one of the following
   *   (per source type):
   *   - array:  Return an array of indexes where the `value === val`.
   *   - string: A non-regex val is converted to a string and then an array of
   *     starting indexes that [match](https://github.com/imaginate/vitals/wiki/vitals.has#haspattern)
   *     the val are returned.
   * @return {!Array}
   */
  get.indexes = function getIndexes(source, val) {

    if ( _is.str(source) ) {
      if (arguments.length < 2) throw _error('No val defined', 'indexes');
      return _strIndexes(source, val);
    }

    if ( !_is._obj(source)       ) throw _error.type('source',        'indexes');
    if ( !_is.num(source.length) ) throw _error.type('source.length', 'indexes');

    return arguments.length < 2
      ? _allIndexes(source)
      : _byValIndexes(source, val);
  };
  // define shorthand
  get.ii = get.indexes;

  /**
   * Gets an array of values/substrings from an object or string.
   *
   * @public
   * @param {(!Object|function|string)} source - If no val param is defined this
   *   method will return an array of all the object's values or an error if the
   *   source is a string.
   * @param {*=} val - If the val is not a `RegExp` or string it is converted to
   *   a string. This method will return the following values (per source type):
   *   - object: an array of source values where the key [matches](https://github.com/imaginate/vitals/wiki/vitals.has#haspattern)
   *     the val
   *   - string: an array of substrings that [match](https://github.com/imaginate/vitals/wiki/vitals.has#haspattern)
   *     the val
   * @return {!Array}
   */
  get.values = function getValues(source, val) {

    if ( _is.str(source) ) {
      if (arguments.length < 2) throw _error('No val defined', 'values');
      return _strVals(source, val);
    }

    if ( !_is._obj(source) ) throw _error.type('source', 'values');

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
   * @param {(!Object|function)} obj
   * @return {!Array<string>}
   */
  function _allKeys(obj) {

    /** @type {!Array<string>} */
    var arr;
    /** @type {string} */
    var key;

    arr = [];
    for (key in obj) own(obj, key) && arr.push(key);
    return arr;
  }

  /**
   * @private
   * @param {(!Object|function)} obj
   * @param {*} pattern
   * @return {!Array<string>}
   */
  function _byKeyKeys(obj, pattern) {

    /** @type {!Array<string>} */
    var arr;
    /** @type {string} */
    var key;

    pattern = _is.regex(pattern) ? pattern : String(pattern);
    arr = [];
    for (key in obj) own(obj, key) && match(key, pattern) && arr.push(key);
    return arr;
  }

  /**
   * @private
   * @param {(!Object|function)} obj
   * @param {*} val
   * @return {!Array<string>}
   */
  function _byValKeys(obj, val) {

    /** @type {!Array<string>} */
    var arr;
    /** @type {string} */
    var key;

    arr = [];
    for (key in obj) own(obj, key) && obj[key] === val && arr.push(key);
    return arr;
  }

  /**
   * @private
   * @param {(!Object|function)} obj
   * @return {!Array<*>}
   */
  function _allObjVals(obj) {

    /** @type {!Array<*>} */
    var arr;
    /** @type {string} */
    var key;

    arr = [];
    for (key in obj) own(obj, key) && arr.push( obj[key] );
    return arr;
  }

  /**
   * @private
   * @param {(!Object|function)} obj
   * @param {*} pattern
   * @return {!Array<*>}
   */
  function _byKeyObjVals(obj, pattern) {

    /** @type {!Array<*>} */
    var arr;
    /** @type {string} */
    var key;

    pattern = _is.regex(pattern) ? pattern : String(pattern);
    arr = [];
    for (key in obj) {
      own(obj, key) && match(key, pattern) && arr.push( obj[key] );
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
    return match(str, pattern)
      ? _is.regex(pattern)
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
    return match(str, pattern)
      ? _is.regex(pattern)
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
  var _error = newErrorMaker('get');

  //////////////////////////////////////////////////////////
  // END OF PRIVATE SCOPE FOR GET
  return get;
})();


module.exports = get;
