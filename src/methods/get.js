/**
 * ---------------------------------------------------------------------------
 * VITALS GET
 * ---------------------------------------------------------------------------
 * @section base
 * @version 4.1.3
 * @see [vitals.get](https://github.com/imaginate/vitals/wiki/vitals.get)
 *
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2017 Adam A Smith <adam@imaginate.life> (https://imaginate.life)
 */

'use strict';

var newErrorMaker = require('./helpers/new-error-maker.js');
var match = require('./helpers/match.js');
var own = require('./helpers/own.js');
var copy = require('./copy.js');
var _is = require('./helpers/is.js');

///////////////////////////////////////////////////////////////////////// {{{1
// VITALS GET
//////////////////////////////////////////////////////////////////////////////

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

  /* {{{2 Get References
   * @ref [own]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty)
   * @ref [equal]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness)
   * @ref [error]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)
   * @ref [string]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
   */

  /// {{{2
  /// @method get
  /**
   * Retrieves keys and values from an `object` or `function`, indexes and
   * values from an `array`, or indexes and substrings from a `string`.
   *
   * @public
   * @param {(!Object|function|!Array|string)} source
   *   If no #val is defined, the following rules apply in order of priority
   *   (per #source type):
   *   - *`!Object|function`*!$
   *     This method returns an `array` of all of the [owned][own] property
   *     key names in the #source.
   *   - *`!Array`*!$
   *     This method returns an `array` of all of the indexes in the #source.
   *   - *`string`*!$
   *     This method throws an [Error][error] because a #val must be defined.
   * @param {*=} val
   *   The following rules apply in order of priority (per #source type):
   *   - *`!Object|function`*!$
   *     If the #val is a `RegExp` this method returns an `array` of the
   *     [owned][own] property values in the #source where the key name
   *     matches (via a @has#pattern test) the #val. Otherwise it returns an
   *     `array` of the [owned][own] property key names in the #source where
   *     the value matches (via a [strict equality][equal] test) the #val.
   *   - *`!Array`*!$
   *     This method returns an `array` of the indexes in the #source where
   *     the property value matches (via a [strict equality][equal] test) the
   *     #val.
   *   - *`string`*!$
   *     If the #val is a `RegExp` this method returns an `array` of each
   *     `substring` in the #source that matches (via a @has#pattern test) the
   *     #val. Otherwise the #val is converted into a `string` with
   *     [String()][string], and this method returns an `array` of the
   *     starting indexes in the #source where a `substring` matches (via a
   *     [strict equality][equal] test) the #val.
   * @return {!Array}
   */
  function get(source, val) {

    if ( _is.str(source) ) {

      if (arguments.length < 2)
        throw _error('No val defined');

      return _is.regex(val)
        ? _strVals(source, val)
        : _strIndexes(source, val);
    }

    if ( !_is._obj(source) )
      throw _error.type('source');

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

  /// {{{2
  /// @method get.keys
  /**
   * Retrieves keys from an `object` or `function`.
   *
   * @public
   * @param {(!Object|function)} source
   *   If no #val is defined, this method returns an `array` of all of the
   *   [owned][own] property key names in the #source.
   * @param {*=} val
   *   If the #val is a `RegExp` this method returns an `array` of the
   *   [owned][own] property key names in the #source where the key name
   *   matches (via a @has#pattern test) the #val. Otherwise it returns an
   *   `array` of the [owned][own] property key names in the #source where
   *   the value matches (via a [strict equality][equal] test) the #val.
   * @return {!Array}
   */
  get.keys = function getKeys(source, val) {

    if ( !_is._obj(source) )
      throw _error.type('source', 'keys');

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
