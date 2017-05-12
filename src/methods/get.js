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
   * values from an `array` or `arguments` instance, or indexes and substrings
   * from a `string`.
   *
   * @public
   * @param {(!Object|function|!Array|!Arguments|string)} source
   *   If no #val is defined, the following rules apply in order of priority
   *   (per #source type):
   *   - *`!Object|function`*!$
   *     This method returns an `array` of all of the [owned][own] property
   *     key names in the #source.
   *   - *`!Array|!Arguments`*!$
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
   *   - *`!Array|!Arguments`*!$
   *     This method returns an `array` of the indexes in the #source where
   *     the property value matches (via a [strict equality][equal] test) the
   *     #val.
   *   - *`string`*!$
   *     If the #val is a `RegExp` this method returns an `array` of every
   *     substring in the #source that matches (via a @has#pattern test) the
   *     #val. Otherwise the #val is converted into a `string` with
   *     [String()][string], and this method returns an `array` of the
   *     starting indexes in the #source where a substring matches (via a
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

  /// {{{2
  /// @method get.keys.byKey
  /**
   * Retrieves [owned][own] property key names from an `object` or `function`
   * that have a matching key name. Note that @has#pattern is used to find key
   * name matches.
   *
   * @public
   * @param {(!Object|function)} source
   * @param {*} key
   *   If the #key is not a `RegExp`, it is converted into a `string` with
   *   [String()][string] before @has#pattern is called to check for any
   *   property key name matches in the #source.
   * @return {!Array<string>}
   */
  get.keys.byKey = function getKeysByKey(source, key) {

    if ( !_is._obj(source) )
      throw _error.type('source', 'keys.byKey');
    if (arguments.length < 2)
      throw _error('No key defined', 'keys.byKey');

    return _byKeyKeys(source, key);
  };

  /// {{{2
  /// @method get.keys.byValue
  /// @alias get.keys.byVal
  /**
   * Retrieves [owned][own] property key names from an `object` or `function`
   * that have a matching property value. Note that a [strict equality][equal]
   * test is used to find matches.
   *
   * @public
   * @param {(!Object|function)} source
   * @param {*} val
   * @return {!Array}
   */
  get.keys.byValue = function getKeysByValue(source, val) {

    if ( !_is._obj(source) )
      throw _error.type('source', 'keys.byValue');
    if (arguments.length < 2)
      throw _error('No val defined', 'keys.byValue');

    return _byValKeys(source, val);
  };
  // define shorthand
  get.keys.byVal = get.keys.byValue;

  /// {{{2
  /// @method get.indexes
  /// @alias get.ii
  /**
   * Retrieves property indexes from an `array`, array-like `object`, or
   * `string`.
   *
   * @public
   * @param {(!Array|!Arguments|!Object|function|string)} source
   *   If no #val is defined, the following rules apply (per #source type):
   *   - *`!Array|!Arguments|!Object|function`*!$
   *     This method returns an `array` of all of the indexes in the #source.
   *   - *`string`*!$
   *     This method throws an [Error][error] because a #val must be defined.
   * @param {*=} val
   *   The following rules apply in order of priority (per #source type):
   *   - *`!Array|!Arguments|!Object|function`*!$
   *     This method returns an `array` of the indexes in the #source where
   *     the property value matches (via a [strict equality][equal] test) the
   *     #val.
   *   - *`string`*!$
   *     If the #val is **not** a `RegExp`, it is converted into a `string`
   *     with [String()][string]. This method will then return an `array` of
   *     the starting indexes in the #source where a substring matches (via
   *     a @has#pattern test) the #val.
   * @return {!Array}
   */
  get.indexes = function getIndexes(source, val) {

    if ( _is.str(source) ) {

      if (arguments.length < 2)
        throw _error('No val defined', 'indexes');

      return _strIndexes(source, val);
    }

    if ( !_is._obj(source) )
      throw _error.type('source', 'indexes');
    if ( !_is.num(source.length) )
      throw _error.type('source.length', 'indexes');

    return arguments.length < 2
      ? _allIndexes(source)
      : _byValIndexes(source, val);
  };
  // define shorthand
  get.ii = get.indexes;

  /// {{{2
  /// @method get.values
  /// @alias get.vals
  /**
   * Retrieves property values from an `object` or `function` and substrings
   * from a `string`.
   *
   * @public
   * @param {(!Object|function|string)} source
   *   If no #val is defined, the following rules apply (per #source type):
   *   - *`!Object|function`*!$
   *     This method returns an `array` of all of the [owned][own] property
   *     values in the #source.
   *   - *`string`*!$
   *     This method throws an [Error][error] because a #val must be defined.
   * @param {*=} val
   *   The following rules apply in order of priority (per #source type):
   *   - *`!Object|function`*!$
   *     If the #val is **not** a `RegExp`, it is converted into a `string`
   *     with [String()][string]. This method will then return an `array` of
   *     the [owned][own] property values where the key name matches (via a
   *     @has#pattern test) the #val.
   *   - *`string`*!$
   *     If the #val is **not** a `RegExp`, it is converted into a `string`
   *     with [String()][string]. This method will then return an `array` of
   *     every substring in the #source that matches (via a @has#pattern
   *     test) the #val.
   * @return {!Array}
   */
  get.values = function getValues(source, val) {

    if ( _is.str(source) ) {

      if (arguments.length < 2)
        throw _error('No val defined', 'values');

      return _strVals(source, val);
    }

    if ( !_is._obj(source) )
      throw _error.type('source', 'values');

    return arguments.length < 2
      ? _allObjVals(source)
      : _byKeyObjVals(source, val);
  };
  // define shorthand
  get.vals = get.values;

  ///////////////////////////////////////////////////// {{{2
  // GET HELPERS - OBJECT
  //////////////////////////////////////////////////////////

  /// {{{3
  /// @func _allKeys
  /**
   * @private
   * @param {(!Object|function)} src
   * @return {!Array<string>}
   */
  function _allKeys(src) {

    /** @type {!Array<string>} */
    var keys;
    /** @type {string} */
    var key;

    keys = [];
    for (key in src) {
      if ( own(src, key) )
        keys.push(key);
    }
    return keys;
  }

  /// {{{3
  /// @func _byKeyKeys
  /**
   * @private
   * @param {(!Object|function)} src
   * @param {*} pattern
   * @return {!Array<string>}
   */
  function _byKeyKeys(src, pattern) {

    /** @type {!Array<string>} */
    var keys;
    /** @type {string} */
    var key;

    if ( !_is.regex(pattern) && !_is.str(pattern) )
      pattern = String(pattern);

    keys = [];
    for (key in src) {
      if ( own(src, key) && match(key, pattern) )
        keys.push(key);
    }
    return keys;
  }

  /// {{{3
  /// @func _byValKeys
  /**
   * @private
   * @param {(!Object|function)} src
   * @param {*} val
   * @return {!Array<string>}
   */
  function _byValKeys(src, val) {

    /** @type {!Array<string>} */
    var keys;
    /** @type {string} */
    var key;

    keys = [];
    for (key in src) {
      if ( own(src, key) && (src[key] === val) )
        keys.push(key);
    }
    return keys;
  }

  /// {{{3
  /// @func _allObjVals
  /**
   * @private
   * @param {(!Object|function)} src
   * @return {!Array<*>}
   */
  function _allObjVals(src) {

    /** @type {!Array<*>} */
    var vals;
    /** @type {string} */
    var key;

    vals = [];
    for (key in src) {
      if ( own(src, key) )
        vals.push(src[key]);
    }
    return vals;
  }

  /// {{{3
  /// @func _byKeyObjVals
  /**
   * @private
   * @param {(!Object|function)} src
   * @param {*} pattern
   * @return {!Array<*>}
   */
  function _byKeyObjVals(src, pattern) {

    /** @type {!Array<*>} */
    var vals;
    /** @type {string} */
    var key;

    if ( !_is.regex(pattern) && !_is.str(pattern) )
      pattern = String(pattern);

    vals = [];
    for (key in src) {
      if ( own(src, key) && match(key, pattern) )
        vals.push(src[key]);
    }
    return vals;
  }

  ///////////////////////////////////////////////////// {{{2
  // GET HELPERS - ARRAY
  //////////////////////////////////////////////////////////

  /// {{{3
  /// @func _allIndexes
  /**
   * @private
   * @param {(!Array|!Arguments|!Object|function)} src
   * @return {!Array<number>}
   */
  function _allIndexes(src) {

    /** @type {!Array<number>} */
    var indexes;
    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    len = src.length;
    indexes = new Array(len);
    i = -1;
    while (++i < len)
      indexes[i] = i;
    return indexes;
  }

  /// {{{3
  /// @func _byValIndexes
  /**
   * @private
   * @param {(!Array|!Arguments|!Object|function)} src
   * @param {*} val
   * @return {!Array<number>}
   */
  function _byValIndexes(src, val) {

    /** @type {!Array<number>} */
    var indexes;
    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    indexes = [];
    len = src.length;
    i = -1;
    while (++i < len) {
      if (src[i] === val)
        indexes.push(i);
    }
    return indexes;
  }

  ///////////////////////////////////////////////////// {{{2
  // GET HELPERS - STRING
  //////////////////////////////////////////////////////////

  /// {{{3
  /// @func _strIndexes
  /**
   * @private
   * @param {string} src
   * @param {*} pattern
   * @return {!Array<number>}
   */
  function _strIndexes(src, pattern) {
    return _is.regex(pattern)
      ? _byRegexStrIndexes(src, pattern)
      : _byStrStrIndexes(src, pattern);
  }

  /// {{{3
  /// @func _strVals
  /**
   * @private
   * @param {string} src
   * @param {*} pattern
   * @return {!Array<string>}
   */
  function _strVals(src, pattern) {
    return _is.regex(pattern)
      ? _byRegexStrVals(src, pattern)
      : _byStrStrVals(src, pattern);
  }

  /// {{{3
  /// @func _byRegexStrIndexes
  /**
   * @private
   * @param {string} src
   * @param {!RegExp} pattern
   * @return {!Array<number>}
   */
  function _byRegexStrIndexes(src, pattern) {

    /** @type {!Array<number>} */
    var indexes;
    /** @type {(?Array|?Object)} */
    var result;

    pattern = copy.regex(pattern, true);
    indexes = [];
    result = pattern.exec(src);
    while (result) {
      indexes.push(result.index);
      result = pattern.exec(src);
    }
    return indexes;
  }

  /// {{{3
  /// @func _byStrStrIndexes
  /**
   * @private
   * @param {string} src
   * @param {*} pattern
   * @return {!Array<number>}
   */
  function _byStrStrIndexes(src, pattern) {

    /** @type {!Array<number>} */
    var indexes;
    /** @type {number} */
    var i;

    if ( !_is.str(pattern) )
      pattern = String(pattern);

    indexes = [];
    i = src.indexOf(pattern);
    while (i !== -1) {
      indexes.push(i);
      i = src.indexOf(pattern, ++i);
    }
    return indexes;
  }

  /// {{{3
  /// @func _byRegexStrVals
  /**
   * @private
   * @param {string} src
   * @param {!RegExp} pattern
   * @return {!Array<string>}
   */
  function _byRegexStrVals(src, pattern) {

    /** @type {(?Array|?Object)} */
    var result;
    /** @type {!Array<string>} */
    var vals;

    pattern = copy.regex(pattern, true);
    vals = [];
    result = pattern.exec(src);
    while (result) {
      vals.push(result[0]);
      result = pattern.exec(src);
    }
    return vals;
  }

  /// {{{3
  /// @func _byStrStrVals
  /**
   * @private
   * @param {string} src
   * @param {*} pattern
   * @return {!Array<string>}
   */
  function _byStrStrVals(src, pattern) {

    /** @type {!Array<string>} */
    var vals;
    /** @type {number} */
    var i;

    if ( !_is.str(pattern) )
      pattern = String(pattern);

    vals = [];
    i = src.indexOf(pattern);
    while (i !== -1) {
      vals.push(pattern);
      i = src.indexOf(pattern, ++i);
    }
    return vals;
  }

  ///////////////////////////////////////////////////// {{{2
  // GET HELPERS - MISC
  //////////////////////////////////////////////////////////

  /// {{{3
  /// @func _error
  /**
   * @private
   * @type {!ErrorAid}
   */
  var _error = newErrorMaker('get');

  /// }}}2
  // END OF PRIVATE SCOPE FOR GET
  return get;
})();
/// }}}1

module.exports = get;

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
