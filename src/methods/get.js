/**
 * ---------------------------------------------------------------------------
 * VITALS.GET
 * ---------------------------------------------------------------------------
 * @section base
 * @version 4.1.3
 * @see [vitals.get](https://github.com/imaginate/vitals/wiki/vitals.get)
 *
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2017 Adam A Smith <adam@imaginate.life> (https://imaginate.life)
 */

'use strict';

var $newErrorMaker = require('./helpers/new-error-maker.js');
var $match = require('./helpers/match.js');
var $own = require('./helpers/own.js');
var $is = require('./helpers/is.js');
var copy = require('./copy.js');

///////////////////////////////////////////////////////////////////////// {{{1
// VITALS.GET
//////////////////////////////////////////////////////////////////////////////

/**
 * @public
 * @const {!Function<string, !Function>}
 * @dict
 */
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
   * @param {(!Object|!Function|!Array|!Arguments|string)} source
   *   If no #val is defined, the following rules apply in order of priority
   *   (per #source type):
   *   - *`!Object|!Function`*!$
   *     This method returns an `array` of all of the [owned][own] property
   *     key names in the #source.
   *   - *`!Array|!Arguments`*!$
   *     This method returns an `array` of all of the indexes in the #source.
   *   - *`string`*!$
   *     This method throws an [Error][error] because a #val must be defined.
   * @param {*=} val
   *   The following rules apply in order of priority (per #source type):
   *   - *`!Object|!Function`*!$
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

    switch (arguments['length']) {
      case 0:
        throw $err(new Error, 'no #source defined');

      case 1:
        if ( $is.str(source) )
          throw $err(new Error, 'no #val defined');

        if ( !$is._obj(source) )
          throw $typeErr(new TypeError, 'source', source,
            '!Object|!Function|!Array|!Arguments|string');

        return $is._arr(source)
          ? _allIndexes(source)
          : _allKeys(source);

      default:
        if ( $is.str(source) )
          return $is.regx(val)
            ? _strVals(source, val)
            : _strIndexes(source, val);

        if ( !$is._obj(source) )
          throw $typeErr(new TypeError, 'source', source,
            '!Object|!Function|!Array|!Arguments|string');

        return $is._arr(source)
          ? _byValIndexes(source, val)
          : $is.regx(val)
            ? _byKeyObjVals(source, val)
            : _byValKeys(source, val);
    }
  }

  /// {{{2
  /// @method get.keys
  /**
   * Retrieves keys from an `object` or `function`.
   *
   * @public
   * @param {(!Object|!Function)} source
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
  function getKeys(source, val) {

    switch (arguments['length']) {
      case 0:
        throw $err(new Error, 'no #source defined', 'keys');

      case 1:
        if ( !$is._obj(source) )
          throw $typeErr(new TypeError, 'source', source, '!Object|!Function',
            'keys');

        return _allKeys(source);

      default:
        if ( !$is._obj(source) )
          throw $typeErr(new TypeError, 'source', source, '!Object|!Function',
            'keys');

        return $is.regx(val)
          ? _byKeyKeys(source, val)
          : _byValKeys(source, val);
    }
  }
  get['keys'] = getKeys;

  /// {{{2
  /// @method get.keys.byKey
  /**
   * Retrieves [owned][own] property key names from an `object` or `function`
   * that have a matching key name. Note that @has#pattern is used to find key
   * name matches.
   *
   * @public
   * @param {(!Object|!Function)} source
   * @param {*} key
   *   If the #key is not a `RegExp`, it is converted into a `string` with
   *   [String()][string] before @has#pattern is called to check for any
   *   property key name matches in the #source.
   * @return {!Array<string>}
   */
  function getKeysByKey(source, key) {

    switch (arguments['length']) {
      case 0:
        throw $err(new Error, 'no #source defined', 'keys.byKey');

      case 1:
        throw $err(new Error, 'no #key defined', 'keys.byKey');

      default:
        if ( !$is._obj(source) )
          throw $typeErr(new TypeError, 'source', source, '!Object|!Function',
            'keys.byKey');

        return _byKeyKeys(source, key);
    }
  }
  get['keys']['byKey'] = getKeysByKey;

  /// {{{2
  /// @method get.keys.byValue
  /// @alias get.keys.byVal
  /**
   * Retrieves [owned][own] property key names from an `object` or `function`
   * that have a matching property value. Note that a [strict equality][equal]
   * test is used to find matches.
   *
   * @public
   * @param {(!Object|!Function)} source
   * @param {*} val
   * @return {!Array}
   */
  function getKeysByValue(source, val) {

    switch (arguments['length']) {
      case 0:
        throw $err(new Error, 'no #source defined', 'keys.byValue');

      case 1:
        throw $err(new Error, 'no #val defined', 'keys.byValue');

      default:
        if ( !$is._obj(source) )
          throw $typeErr(new TypeError, 'source', source, '!Object|!Function',
            'keys.byValue');

        return _byValKeys(source, val);
    }
  }
  get['keys']['byValue'] = getKeysByValue;
  get['keys']['byVal'] = getKeysByValue;

  /// {{{2
  /// @method get.indexes
  /// @alias get.ii
  /**
   * Retrieves property indexes from an `array`, array-like `object`, or
   * `string`.
   *
   * @public
   * @param {(!Array|!Arguments|!Object|!Function|string)} source
   *   If no #val is defined, the following rules apply (per #source type):
   *   - *`!Array|!Arguments|!Object|!Function`*!$
   *     This method returns an `array` of all of the indexes in the #source.
   *   - *`string`*!$
   *     This method throws an [Error][error] because a #val must be defined.
   * @param {*=} val
   *   The following rules apply in order of priority (per #source type):
   *   - *`!Array|!Arguments|!Object|!Function`*!$
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
  function getIndexes(source, val) {

    /** @type {number} */
    var len;

    switch (arguments['length']) {
      case 0:
        throw $err(new Error, 'no #source defined', 'indexes');

      case 1:
        if ( $is.str(source) )
          throw $err(new Error, 'no #val defined', 'indexes');
        if ( !$is._obj(source) )
          throw $typeErr(new TypeError, 'source', source,
            '!Array|!Arguments|!Object|!Function|string', 'indexes');

        len = source['length'];

        if ( !$is.num(len) )
          throw $typeErr(new TypeError, 'source.length', len, 'number',
            'indexes');
        if ( !$is.whole(len) || len < 0 )
          throw $err(new Error, 'invalid #source.length `number` (' +
            'must be `0` or a positive whole `number`)', 'indexes');

        return _allIndexes(source);

      default:
        if ( $is.str(source) )
          return _strIndexes(source, val);

        if ( !$is._obj(source) )
          throw $typeErr(new TypeError, 'source', source,
            '!Array|!Arguments|!Object|!Function|string', 'indexes');

        len = source['length'];

        if ( !$is.num(len) )
          throw $typeErr(new TypeError, 'source.length', len, 'number',
            'indexes');
        if ( !$is.whole(len) || len < 0 )
          throw $err(new Error, 'invalid #source.length `number` (' +
            'must be `0` or a positive whole `number`)', 'indexes');

        return _byValIndexes(source, val);
    }
  }
  get['indexes'] = getIndexes;
  get['ii'] = getIndexes;

  /// {{{2
  /// @method get.values
  /// @alias get.vals
  /**
   * Retrieves property values from an `object` or `function` and substrings
   * from a `string`.
   *
   * @public
   * @param {(!Object|!Function|string)} source
   *   If no #val is defined, the following rules apply (per #source type):
   *   - *`!Object|!Function`*!$
   *     This method returns an `array` of all of the [owned][own] property
   *     values in the #source.
   *   - *`string`*!$
   *     This method throws an [Error][error] because a #val must be defined.
   * @param {*=} val
   *   The following rules apply in order of priority (per #source type):
   *   - *`!Object|!Function`*!$
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
  function getValues(source, val) {

    switch (arguments['length']) {
      case 0:
        throw $err(new Error, 'no #source defined', 'values');

      case 1:
        if ( $is.str(source) )
          throw $err(new Error, 'no #val defined', 'values');
        if ( !$is._obj(source) )
          throw $typeErr(new TypeError, 'source', source,
            '!Object|!Function|string', 'values');

        return _allObjVals(source);

      default:
        if ( $is.str(source) )
          return _strVals(source, val);

        if ( !$is._obj(source) )
          throw $typeErr(new TypeError, 'source', source,
            '!Object|!Function|string', 'values');

        return _byKeyObjVals(source, val);
    }
  }
  get['values'] = getValues;
  get['vals'] = getValues;

  ///////////////////////////////////////////////////// {{{2
  // GET HELPERS - OBJECT
  //////////////////////////////////////////////////////////

  /// {{{3
  /// @func _allKeys
  /**
   * @private
   * @param {(!Object|!Function)} src
   * @return {!Array<string>}
   */
  function _allKeys(src) {

    /** @type {!Array<string>} */
    var keys;
    /** @type {string} */
    var key;

    keys = [];
    for (key in src) {
      if ( $own(src, key) )
        keys['push'](key);
    }
    return keys;
  }

  /// {{{3
  /// @func _byKeyKeys
  /**
   * @private
   * @param {(!Object|!Function)} src
   * @param {*} pattern
   * @return {!Array<string>}
   */
  function _byKeyKeys(src, pattern) {

    /** @type {!Array<string>} */
    var keys;
    /** @type {string} */
    var key;

    if ( !$is.regx(pattern) && !$is.str(pattern) )
      pattern = String(pattern);

    keys = [];
    for (key in src) {
      if ( $own(src, key) && $match(key, pattern) )
        keys['push'](key);
    }
    return keys;
  }

  /// {{{3
  /// @func _byValKeys
  /**
   * @private
   * @param {(!Object|!Function)} src
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
      if ( $own(src, key) && (src[key] === val) )
        keys['push'](key);
    }
    return keys;
  }

  /// {{{3
  /// @func _allObjVals
  /**
   * @private
   * @param {(!Object|!Function)} src
   * @return {!Array<*>}
   */
  function _allObjVals(src) {

    /** @type {!Array<*>} */
    var vals;
    /** @type {string} */
    var key;

    vals = [];
    for (key in src) {
      if ( $own(src, key) )
        vals['push'](src[key]);
    }
    return vals;
  }

  /// {{{3
  /// @func _byKeyObjVals
  /**
   * @private
   * @param {(!Object|!Function)} src
   * @param {*} pattern
   * @return {!Array<*>}
   */
  function _byKeyObjVals(src, pattern) {

    /** @type {!Array<*>} */
    var vals;
    /** @type {string} */
    var key;

    if ( !$is.regx(pattern) && !$is.str(pattern) )
      pattern = String(pattern);

    vals = [];
    for (key in src) {
      if ( $own(src, key) && $match(key, pattern) )
        vals['push'](src[key]);
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
   * @param {(!Array|!Arguments|!Object|!Function)} src
   * @return {!Array<number>}
   */
  function _allIndexes(src) {

    /** @type {!Array<number>} */
    var indexes;
    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    len = src['length'];
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
   * @param {(!Array|!Arguments|!Object|!Function)} src
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
    len = src['length'];
    i = -1;
    while (++i < len) {
      if (src[i] === val)
        indexes['push'](i);
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
    return $is.regx(pattern)
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
    return $is.regx(pattern)
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

    pattern = copy['regexp'](pattern, true);
    indexes = [];
    result = pattern['exec'](src);
    while (result) {
      indexes['push'](result['index']);
      result = pattern['exec'](src);
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

    if ( !$is.str(pattern) )
      pattern = String(pattern);

    indexes = [];
    i = src['indexOf'](pattern);
    while (i !== -1) {
      indexes['push'](i);
      i = src['indexOf'](pattern, ++i);
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

    pattern = copy['regexp'](pattern, true);
    vals = [];
    result = pattern['exec'](src);
    while (result) {
      vals['push'](result[0]);
      result = pattern['exec'](src);
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

    if ( !$is.str(pattern) )
      pattern = String(pattern);

    vals = [];
    i = src['indexOf'](pattern);
    while (i !== -1) {
      vals['push'](pattern);
      i = src['indexOf'](pattern, ++i);
    }
    return vals;
  }

  ///////////////////////////////////////////////////// {{{2
  // GET HELPERS - GENERAL
  //////////////////////////////////////////////////////////

  /// {{{3
  /// @const NONE
  /**
   * @private
   * @const {undefined}
   */
  var NONE = (function(){})();

  ///////////////////////////////////////////////////// {{{2
  // GET HELPERS - ERROR MAKERS
  //////////////////////////////////////////////////////////

  /// {{{3
  /// @const ERROR_MAKER
  /**
   * @private
   * @const {!Object<string, !function>}
   * @struct
   */
  var ERROR_MAKER = $newErrorMaker('get');

  /// {{{3
  /// @func $err
  /**
   * @private
   * @param {!Error} err
   * @param {string} msg
   * @param {string=} method
   * @return {!Error} 
   */
  var $err = ERROR_MAKER.error;

  /// {{{3
  /// @func $typeErr
  /**
   * @private
   * @param {!TypeError} err
   * @param {string} paramName
   * @param {*} paramVal
   * @param {string} validTypes
   * @param {string=} methodName
   * @return {!TypeError} 
   */
  var $typeErr = ERROR_MAKER.typeError;

  /// {{{3
  /// @func $rangeErr
  /**
   * @private
   * @param {!RangeError} err
   * @param {string} paramName
   * @param {(!Array<*>|string|undefined)=} validRange
   *   An `array` of actual valid options or a `string` stating the valid
   *   range. If `undefined` this option is skipped.
   * @param {string=} methodName
   * @return {!RangeError} 
   */
  var $rangeErr = ERROR_MAKER.rangeError;
  /// }}}2

  // END OF PRIVATE SCOPE FOR VITALS.GET
  return get;
})();
/// }}}1

module.exports = get;

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
