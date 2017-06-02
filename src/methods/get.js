/**
 * ---------------------------------------------------------------------------
 * VITALS.GET
 * ---------------------------------------------------------------------------
 * @section base
 * @section fs
 * @version 4.1.3
 * @see [vitals.get](https://github.com/imaginate/vitals/wiki/vitals.get)
 *
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2017 Adam A Smith <adam@imaginate.life> (https://imaginate.life)
 */

/// #{{{ @on SOLO
/// #include @macro OPEN_WRAPPER ../macros/wrapper.js
/// #include @core constants ../core/constants.js
/// #include @core helpers ../core/helpers.js
/// #{{{ @off FS_ONLY
/// #include @helper $match ../helpers/match.js
/// #include @helper $merge ../helpers/merge.js
/// #include @helper $inStr ../helpers/in-str.js
/// #}}} @off FS_ONLY
/// #{{{ @on FS
/// #include @helper $fixEol ../helpers/fix-eol.js
/// #include @helper $readDir ../helpers/read-dir.js
/// #include @helper $pathname ../helpers/pathname.js
/// #include @helper $cloneObj ../helpers/clone-obj.js
/// #include @helper $readFile ../helpers/read-file.js
/// #}}} @on FS
/// #{{{ @off FS_ONLY
/// #include @super copy ./copy.js
/// #}}} @off FS_ONLY
/// #}}} @on SOLO

/// #{{{ @super get
/// #{{{ @off FS_ONLY
/**
 * @public
 * @const {!Function<string, !Function>}
 * @dict
 */
/// #}}} @off FS_ONLY
/// #{{{ @on FS_ONLY
/**
 * @public
 * @const {!Object<string, !Function>}
 * @dict
 */
/// #}}} @on FS_ONLY
var get = (function getPrivateScope() {

  /// #{{{ @docrefs get
  /// @docref [own]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty)
  /// @docref [equal]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness)
  /// @docref [error]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)
  /// @docref [string]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
  /// #}}} @docrefs get

  /// #{{{ @on FS_ONLY
  /**
   * @public
   * @type {!Object<string, !Function>}
   * @dict
   */
  var get = {};
  /// #}}} @on FS_ONLY

  /// #{{{ @off FS_ONLY
  /// #{{{ @submethod main
  /// @section base
  /// @method vitals.get
  /**
   * @description
   *   Retrieves keys and values from an `object` or `function`, indexes and
   *   values from an `array` or `arguments` instance, or indexes and
   *   substrings from a `string`.
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
        throw _mkErr(new ERR, 'no #source defined');

      case 1:
        if ( $is.str(source) )
          throw _mkErr(new ERR, 'no #val defined');

        if ( !$is._obj(source) )
          throw _mkTypeErr(new TYPE_ERR, 'source', source,
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
          throw _mkTypeErr(new TYPE_ERR, 'source', source,
            '!Object|!Function|!Array|!Arguments|string');

        return $is._arr(source)
          ? _byValIndexes(source, val)
          : $is.regx(val)
            ? _byKeyObjVals(source, val)
            : _byValKeys(source, val);
    }
  }
  /// #}}} @submethod main

  /// #{{{ @submethod keys
  /// @section base
  /// @method vitals.get.keys
  /**
   * @description
   *   Retrieves keys from an `object` or `function`.
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
        throw _mkErr(new ERR, 'no #source defined', 'keys');

      case 1:
        if ( !$is._obj(source) )
          throw _mkTypeErr(new TYPE_ERR, 'source', source,
            '!Object|!Function', 'keys');

        return _allKeys(source);

      default:
        if ( !$is._obj(source) )
          throw _mkTypeErr(new TYPE_ERR, 'source', source,
            '!Object|!Function', 'keys');

        return $is.regx(val)
          ? _byKeyKeys(source, val)
          : _byValKeys(source, val);
    }
  }
  get['keys'] = getKeys;
  /// #}}} @submethod keys

  /// #{{{ @submethod keys.byKey
  /// @section base
  /// @method vitals.get.keys.byKey
  /**
   * @description
   *   Retrieves [owned][own] property key names from an `object` or
   *   `function` that have a matching key name. Note that @has#pattern is
   *   used to find key name matches.
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
        throw _mkErr(new ERR, 'no #source defined', 'keys.byKey');

      case 1:
        throw _mkErr(new ERR, 'no #key defined', 'keys.byKey');

      default:
        if ( !$is._obj(source) )
          throw _mkTypeErr(new TYPE_ERR, 'source', source,
            '!Object|!Function', 'keys.byKey');

        return _byKeyKeys(source, key);
    }
  }
  get['keys']['byKey'] = getKeysByKey;
  /// #}}} @submethod keys.byKey

  /// #{{{ @submethod keys.byValue
  /// @section base
  /// @method vitals.get.keys.byValue
  /// @alias vitals.get.keys.byVal
  /**
   * @description
   *   Retrieves [owned][own] property key names from an `object` or
   *   `function` that have a matching property value. Note that a
   *   [strict equality][equal] test is used to find matches.
   * @public
   * @param {(!Object|!Function)} source
   * @param {*} val
   * @return {!Array}
   */
  function getKeysByValue(source, val) {

    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #source defined', 'keys.byValue');

      case 1:
        throw _mkErr(new ERR, 'no #val defined', 'keys.byValue');

      default:
        if ( !$is._obj(source) )
          throw _mkTypeErr(new TYPE_ERR, 'source', source,
            '!Object|!Function', 'keys.byValue');

        return _byValKeys(source, val);
    }
  }
  get['keys']['byValue'] = getKeysByValue;
  get['keys']['byVal'] = getKeysByValue;
  /// #}}} @submethod keys.byValue

  /// #{{{ @submethod indexes
  /// @section base
  /// @method vitals.get.indexes
  /// @alias vitals.get.ii
  /**
   * @description
   *   Retrieves property indexes from an `array`, array-like `object`, or
   *   `string`.
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
        throw _mkErr(new ERR, 'no #source defined', 'indexes');

      case 1:
        if ( $is.str(source) )
          throw _mkErr(new ERR, 'no #val defined', 'indexes');
        if ( !$is._obj(source) )
          throw _mkTypeErr(new TYPE_ERR, 'source', source,
            '!Array|!Arguments|!Object|!Function|string', 'indexes');
        if ( !$is.arrish(source) )
          throw _mkErr(new ERR, '#source failed `array-like` test (#source.' +
            'length must be a whole `number` that is `0` or more)',
            'indexes');

        return _allIndexes(source);

      default:
        if ( $is.str(source) )
          return _strIndexes(source, val);

        if ( !$is._obj(source) )
          throw _mkTypeErr(new TYPE_ERR, 'source', source,
            '!Array|!Arguments|!Object|!Function|string', 'indexes');
        if ( !$is.arrish(source) )
          throw _mkErr(new ERR, '#source failed `array-like` test (#source.' +
            'length must be a whole `number` that is `0` or more)',
            'indexes');

        return _byValIndexes(source, val);
    }
  }
  get['indexes'] = getIndexes;
  get['ii'] = getIndexes;
  /// #}}} @submethod indexes

  /// #{{{ @submethod values
  /// @section base
  /// @method vitals.get.values
  /// @alias vitals.get.vals
  /**
   * @description
   *   Retrieves property values from an `object` or `function` and substrings
   *   from a `string`.
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
        throw _mkErr(new ERR, 'no #source defined', 'values');

      case 1:
        if ( $is.str(source) )
          throw _mkErr(new ERR, 'no #val defined', 'values');
        if ( !$is._obj(source) )
          throw _mkTypeErr(new TYPE_ERR, 'source', source,
            '!Object|!Function|string', 'values');

        return _allObjVals(source);

      default:
        if ( $is.str(source) )
          return _strVals(source, val);

        if ( !$is._obj(source) )
          throw _mkTypeErr(new TYPE_ERR, 'source', source,
            '!Object|!Function|string', 'values');

        return _byKeyObjVals(source, val);
    }
  }
  get['values'] = getValues;
  get['vals'] = getValues;
  /// #}}} @submethod values
  /// #}}} @off FS_ONLY

  /// #{{{ @on FS
  /// #}}} @on FS

  /// #{{{ @group Get-Helpers

  /// #{{{ @off FS_ONLY
  /// #{{{ @group Object-Helpers

  /// #{{{ @func _allKeys
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
  /// #}}} @func _allKeys

  /// #{{{ @func _byKeyKeys
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

    if ( !$is.regx(pattern) )
      pattern = $mkStr(pattern);

    keys = [];
    for (key in src) {
      if ( $own(src, key) && $match(key, pattern) )
        keys['push'](key);
    }
    return keys;
  }
  /// #}}} @func _byKeyKeys

  /// #{{{ @func _byValKeys
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
  /// #}}} @func _byValKeys

  /// #{{{ @func _allObjVals
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
  /// #}}} @func _allObjVals

  /// #{{{ @func _byKeyObjVals
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

    if ( !$is.regx(pattern) )
      pattern = $mkStr(pattern);

    vals = [];
    for (key in src) {
      if ( $own(src, key) && $match(key, pattern) )
        vals['push'](src[key]);
    }
    return vals;
  }
  /// #}}} @func _byKeyObjVals

  /// #}}} @group Object-Helpers

  /// #{{{ @group Array-Helpers

  /// #{{{ @func _allIndexes
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
    indexes = new ARR(len);
    i = -1;
    while (++i < len)
      indexes[i] = i;
    return indexes;
  }
  /// #}}} @func _allIndexes

  /// #{{{ @func _byValIndexes
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
  /// #}}} @func _byValIndexes

  /// #}}} @group Array-Helpers

  /// #{{{ @group String-Helpers

  /// #{{{ @func _strIndexes
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
  /// #}}} @func _strIndexes

  /// #{{{ @func _strVals
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
  /// #}}} @func _strVals

  /// #{{{ @func _byRegexStrIndexes
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

    pattern = copy['regexp'](pattern, YES);
    indexes = [];
    result = pattern['exec'](src);
    while (result) {
      indexes['push'](result['index']);
      result = pattern['exec'](src);
    }
    return indexes;
  }
  /// #}}} @func _byRegexStrIndexes

  /// #{{{ @func _byStrStrIndexes
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

    pattern = $mkStr(pattern);
    indexes = [];
    i = src['indexOf'](pattern);
    while (i !== -1) {
      indexes['push'](i);
      i = src['indexOf'](pattern, ++i);
    }
    return indexes;
  }
  /// #}}} @func _byStrStrIndexes

  /// #{{{ @func _byRegexStrVals
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

    pattern = copy['regexp'](pattern, YES);
    vals = [];
    result = pattern['exec'](src);
    while (result) {
      vals['push'](result[0]);
      result = pattern['exec'](src);
    }
    return vals;
  }
  /// #}}} @func _byRegexStrVals

  /// #{{{ @func _byStrStrVals
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

    pattern = $mkStr(pattern);
    vals = [];
    i = src['indexOf'](pattern);
    while (i !== -1) {
      vals['push'](pattern);
      i = src['indexOf'](pattern, ++i);
    }
    return vals;
  }
  /// #}}} @func _byStrStrVals

  /// #}}} @group String-Helpers
  /// #}}} @off FS_ONLY

  /// #{{{ @group Error-Helpers

  /// #{{{ @const _MK_ERR
  /**
   * @private
   * @const {!Object<string, !function>}
   * @struct
   */
  var _MK_ERR = $mkErrs('get');
  /// #}}} @const _MK_ERR
  /// #include @macro MK_ERR ../macros/mk-err.js

  /// #}}} @group Error-Helpers

  /// #}}} @group Get-Helpers

  return get;
})();
/// #{{{ @off SOLO
vitals['get'] = get;
/// #}}} @off SOLO
/// #}}} @super get

/// #{{{ @on SOLO
var vitals = get;
vitals['get'] = get;
/// #include @macro EXPORT ../macros/export.js
/// #include @macro CLOSE_WRAPPER ../macros/wrapper.js
/// #}}} @on SOLO

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
