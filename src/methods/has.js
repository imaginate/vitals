/**
 * ---------------------------------------------------------------------------
 * VITALS.HAS
 * ---------------------------------------------------------------------------
 * @section base
 * @version 5.0.0
 * @see [vitals.has](https://github.com/imaginate/vitals/wiki/vitals.has)
 *
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life>
 */

/// #if{{{ @scope SOLO
/// #insert @wrapper OPEN ../macros/wrapper.js
/// #include @core constants ../core/constants.js
/// #include @core helpers ../core/helpers.js
/// #include @helper $match ../helpers/match.js
/// #include @helper $inArr ../helpers/in-arr.js
/// #include @helper $inObj ../helpers/in-obj.js
/// #include @helper $inStr ../helpers/in-str.js
/// #include @helper $ownEnum ../helpers/own-enum.js
/// #if}}} @scope SOLO

/// #{{{ @super has
/// #ifnot{{{ @scope DOCS_ONLY
/**
 * @public
 * @const {!Function}
 * @dict
 */
var has = (function hasPrivateScope() {
/// #ifnot}}} @scope DOCS_ONLY

  /// #if{{{ @docrefs has
  /// @docref [own]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty)
  /// @docref [enum]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/propertyIsEnumerable)
  /// @docref [test]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test)
  /// @docref [ecma3]:(http://www.ecma-international.org/publications/files/ECMA-ST-ARCH/ECMA-262,%203rd%20edition,%20December%201999.pdf)
  /// @docref [ecma5]:(http://www.ecma-international.org/ecma-262/5.1/index.html)
  /// @docref [equal]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness)
  /// @docref [error]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)
  /// @docref [string]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
  /// @docref [indexof]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/indexOf)
  /// @docref [includes]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes)
  /// #if}}} @docrefs has

  /// #{{{ @submethod main
  /// #{{{ @docs main
  /// @section base
  /// @method vitals.has
  /**
   * @description
   *   Checks if an `object` or `function` [owns][own] a property, if an
   *   `array` or `arguments` instance contains a value, or a `string` matches
   *   a pattern or contains a substring.
   * @public
   * @param {(?Object|?Function|?Array|?Arguments|?string)} source
   *   The following rules apply in order of priority (per #source type):
   *   - *`null`*!$
   *     This method automatically returns `false`.
   *   - *`!Object|!Function`*!$
   *     This method returns the result of a safe call to
   *     [Object.prototype.hasOwnProperty][own].
   *   - *`!Array|!Arguments`*!$
   *     This method checks each indexed property in the #source for one
   *     matching value (via a [strict equality][equal] test).
   *   - *`string`*!$
   *     If the #val is a `RegExp`, this method returns the result of a call
   *     to [RegExp.prototype.test][test] on the #source. Otherwise, it
   *     returns the result of a call to [String.prototype.includes][includes]
   *     or, in the case of an older platform that does not support
   *     [String.prototype.includes][includes], it returns a
   *     [strict equality][equal] test for a non-negative
   *     index result from [String.prototype.indexOf][indexof] (i.e.
   *     `return source.indexOf(val) !== -1;`).
   * @param {*} val
   *   The following rules apply in order of priority (per #source type):
   *   - *`null`*!$
   *     The value of #val does not matter and is not used.
   *   - *`!Object|!Function`*!$
   *     If the #val is a `RegExp`, each [owned][own] property is
   *     [tested][test] for a matching property key. If a match is found, this
   *     method immediately returns `true`. Otherwise, the #val is passed
   *     without any conversions to [Object.prototype.hasOwnProperty][own].
   *   - *`!Array|!Arguments`*!$
   *     The #val is **not** altered. A [strict equality][equal] test against
   *     the #val is used to evaluate each indexed property value.
   *   - *`string`*!$
   *     If the #val is **not** a `RegExp`, it is converted into a `string`
   *     before [String.prototype.includes][includes] or, in the case of an
   *     older platform, [String.prototype.indexOf][indexof] is called.
   * @return {boolean}
   *   The following rules apply in order of priority (per #source type):
   *   - *`null`*!$
   *     This method returns `false`.
   *   - *`!Object|!Function`*!$
   *     This method returns the result of a safe call to
   *     [Object.prototype.hasOwnProperty][own].
   *   - *`!Array|!Arguments`*!$
   *     This method checks each indexed property in the #source for one
   *     matching value.
   *   - *`string`*!$
   *     If the #val is a `RegExp`, this method returns the result of a call
   *     to [RegExp.prototype.test][test] on the #source. Otherwise, it
   *     returns the result of a call to [String.prototype.includes][includes]
   *     or, in the case of an older platform that does not support
   *     [String.prototype.includes][includes], it returns a
   *     [strict equality][equal] test for a non-negative
   *     index result from [String.prototype.indexOf][indexof] (i.e.
   *     `return source.indexOf(val) !== -1;`).
   */
  /// #}}} @docs main
  /// #if{{{ @code main
  function has(source, val) {

    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #source defined');
      case 1:
        throw _mkErr(new ERR, 'no #val defined');
    }

    if ( $is.nil(source) )
      return NO;

    if ( $is.str(source) )
      return $match(source, val);

    if ( !$is._obj(source) )
      throw _mkTypeErr(new TYPE_ERR, 'source', source,
        '?Object|?Function|?Array|?Arguments|?string');

    return $is._arr(source)
      ? $inArr(source, val)
      : $is.regx(val)
        ? _ownMatch(source, val)
        : $own(source, val);
  }
  /// #if}}} @code main
  /// #}}} @submethod main

  /// #{{{ @submethod key
  /// #{{{ @docs key
  /// @section base
  /// @method vitals.has.key
  /**
   * @description
   *   Checks if an `object` or `function` [owns][own] a property.
   * @public
   * @param {(?Object|?Function)} source
   *   The following rules apply in order of priority (per #source type):
   *   - *`null`*!$
   *     This method automatically returns `false`.
   *   - *`!Object|!Function`*!$
   *     This method returns the result of a safe call to
   *     [Object.prototype.hasOwnProperty][own].
   * @param {*} key
   *   The following rules apply in order of priority (per #source type):
   *   - *`null`*!$
   *     The value of #key does not matter and is not used.
   *   - *`!Object|!Function`*!$
   *     The #key is passed **without** any conversions to
   *     [Object.prototype.hasOwnProperty][own].
   * @return {boolean}
   *   The following rules apply in order of priority (per #source type):
   *   - *`null`*!$
   *     This method returns `false`.
   *   - *`!Object|!Function`*!$
   *     This method returns the result of a safe call to
   *     [Object.prototype.hasOwnProperty][own].
   */
  /// #}}} @docs key
  /// #if{{{ @code key
  function hasKey(source, key) {

    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #source defined', 'key');
      case 1:
        throw _mkErr(new ERR, 'no #key defined', 'key');
    }

    if ( $is.nil(source) )
      return NO;

    if ( !$is._obj(source) )
      throw _mkTypeErr(new TYPE_ERR, 'source', source, '?Object|?Function',
        'key');

    return $own(source, key);
  }
  has['key'] = hasKey;
  /// #if}}} @code key
  /// #}}} @submethod key

  /// #{{{ @submethod value
  /// #{{{ @docs value
  /// @section base
  /// @method vitals.has.value
  /// @alias vitals.has.val
  /**
   * @description
   *   Checks if an `object` or `function` [owned][own] property or an `array`
   *   or `arguments` indexed property has a value.
   * @public
   * @param {(?Object|?Function|?Array|?Arguments)} source
   *   The following rules apply in order of priority (per #source type):
   *   - *`null`*!$
   *     This method automatically returns `false`.
   *   - *`!Object|!Function`*!$
   *     This method checks each [owned][own] property in the #source for one
   *     matching value.
   *   - *`!Array|!Arguments`*!$
   *     This method checks each indexed property in the #source for one
   *     matching value.
   * @param {*} val
   *   The following rules apply in order of priority (per #source type):
   *   - *`null`*!$
   *     The value of #val does not matter and is not used.
   *   - *`!Object|!Function`*!$
   *     The #val is **not** altered. A [strict equality][equal] test against
   *     the #val is used to evaluate each [owned][own] property value.
   *   - *`!Array|!Arguments`*!$
   *     The #val is **not** altered. A [strict equality][equal] test against
   *     the #val is used to evaluate each indexed property value.
   * @return {boolean}
   *   The following rules apply in order of priority (per #source type):
   *   - *`null`*!$
   *     This method returns `false`.
   *   - *`!Object|!Function`*!$
   *     This method checks each [owned][own] property in the #source for one
   *     matching value.
   *   - *`!Array|!Arguments`*!$
   *     This method checks each indexed property in the #source for one
   *     matching value.
   */
  /// #}}} @docs value
  /// #if{{{ @code value
  function hasValue(source, val) {

    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #source defined', 'value');
      case 1:
        throw _mkErr(new ERR, 'no #val defined', 'value');
    }

    if ( $is.nil(source) )
      return NO;

    if ( !$is._obj(source) )
      throw _mkTypeErr(new TYPE_ERR, 'source', source,
        '?Object|?Function|?Array|?Arguments', 'value');

    return $is._arr(source)
      ? $inArr(source, val)
      : $inObj(source, val);
  }
  has['value'] = hasValue;
  has['val'] = hasValue;
  /// #if}}} @code value
  /// #}}} @submethod value

  /// #{{{ @submethod pattern
  /// #{{{ @docs pattern
  /// @section base
  /// @method vitals.has.pattern
  /**
   * @description
   *   Checks if a `string` matches a pattern or contains a substring.
   * @public
   * @param {string} source
   *   If the #val is a `RegExp`, this method returns the result of a call to
   *   [RegExp.prototype.test][test] on the #source. Otherwise, it returns the
   *   result of a call to [String.prototype.includes][includes] or, in the
   *   case of an older platform that does not support
   *   [String.prototype.includes][includes], it returns a
   *   [strict equality][equal] test for a non-negative index result from
   *   [String.prototype.indexOf][indexof] (i.e.
   *   `return source.indexOf(val) !== -1;`).
   * @param {*} pattern
   *   If the #pattern is **not** a `RegExp`, it is converted into a `string`
   *   before [String.prototype.includes][includes] or, in the case of an
   *   older platform, [String.prototype.indexOf][indexof] is called.
   * @return {boolean}
   *   If the #val is a `RegExp`, this method returns the result of a call to
   *   [RegExp.prototype.test][test] on the #source. Otherwise, it returns the
   *   result of a call to [String.prototype.includes][includes] or, in the
   *   case of an older platform that does not support
   *   [String.prototype.includes][includes], it returns a
   *   [strict equality][equal] test for a non-negative index result from
   *   [String.prototype.indexOf][indexof] (i.e.
   *   `return source.indexOf(val) !== -1;`).
   */
  /// #}}} @docs pattern
  /// #if{{{ @code pattern
  function hasPattern(source, pattern) {

    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #source defined', 'pattern');
      case 1:
        throw _mkErr(new ERR, 'no #pattern defined', 'pattern');
    }

    if ( !$is.str(source) )
      throw _mkTypeErr(new TYPE_ERR, 'source', source, 'string', 'pattern');

    return $match(source, pattern);
  }
  has['pattern'] = hasPattern;
  /// #if}}} @code pattern
  /// #}}} @submethod pattern

  /// #{{{ @submethod substring
  /// #{{{ @docs substring
  /// @section base
  /// @method vitals.has.substring
  /// @alias vitals.has.substr
  /**
   * @description
   *   Checks if a `string` contains a substring.
   * @public
   * @param {string} source
   *   This method returns the result of a call to
   *   [String.prototype.includes][includes] or, in the case of an older
   *   platform that does not support [String.prototype.includes][includes],
   *   it returns a [strict equality][equal] test for a non-negative index
   *   result from [String.prototype.indexOf][indexof] (i.e.
   *   `return source.indexOf(val) !== -1;`).
   * @param {*} val
   *   The #val is converted into a `string` before
   *   [String.prototype.includes][includes] or, in the case of an older
   *   platform, [String.prototype.indexOf][indexof] is called.
   * @return {boolean}
   *   This method returns the result of a call to
   *   [String.prototype.includes][includes] or, in the case of an older
   *   platform that does not support [String.prototype.includes][includes],
   *   it returns a [strict equality][equal] test for a non-negative index
   *   result from [String.prototype.indexOf][indexof] (i.e.
   *   `return source.indexOf(val) !== -1;`).
   */
  /// #}}} @docs substring
  /// #if{{{ @code substring
  function hasSubstring(source, val) {

    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #source defined', 'substring');
      case 1:
        throw _mkErr(new ERR, 'no #val defined', 'substring');
    }

    if ( !$is.str(source) )
      throw _mkTypeErr(new TYPE_ERR, 'source', source, 'string', 'substring');

    return $inStr(source, val);
  }
  has['substring'] = hasSubstring;
  has['substr'] = hasSubstring;
  /// #if}}} @code substring
  /// #}}} @submethod substring

  /// #{{{ @submethod enumerableKey
  /// #{{{ @docs enumerableKey
  /// @section base
  /// @method vitals.has.enumerableKey
  /// @alias vitals.has.enumerable
  /// @alias vitals.has.enumKey
  /// @alias vitals.has.enum
  ///   Note that `vitals.has.enum` will fail in some ES3 and ES5 browser and
  ///   other platform environments. Use `vitals.has.enumerable` for
  ///   compatibility with older environments.
  /**
   * @description
   *   Checks if an `object` or `function` [owns][own] an [enumerable][enum]
   *   property. Also note that `vitals.has.enum` is not valid in some
   *   [ES3][ecma3] and [ES5][ecma5] browser and other platform environments.
   *   Use `vitals.has.enumerable` for browser and platform safety.
   * @public
   * @param {(?Object|?Function)} source
   *   The following rules apply in order of priority (per #source type):
   *   - *`null`*!$
   *     This method automatically returns `false`.
   *   - *`!Object|!Function`*!$
   *     This method returns the result of a safe call to
   *     [Object.prototype.hasOwnProperty][own] and
   *     [Object.prototype.propertyIsEnumerable][enum].
   * @param {*} key
   *   The following rules apply in order of priority (per #source type):
   *   - *`null`*!$
   *     The value of #key does not matter and is not used.
   *   - *`!Object|!Function`*!$
   *     The #key is passed **without** any conversions to
   *     [Object.prototype.hasOwnProperty][own] and
   *     [Object.prototype.propertyIsEnumerable][enum].
   * @return {boolean}
   *   The following rules apply in order of priority (per #source type):
   *   - *`null`*!$
   *     This method returns `false`.
   *   - *`!Object|!Function`*!$
   *     This method returns the result of a safe call to
   *     [Object.prototype.hasOwnProperty][own] and
   *     [Object.prototype.propertyIsEnumerable][enum].
   */
  /// #}}} @docs enumerableKey
  /// #if{{{ @code enumerableKey
  function hasEnumerableKey(source, key) {

    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #source defined', 'enumerableKey');
      case 1:
        throw _mkErr(new ERR, 'no #key defined', 'enumerableKey');
    }

    if ( $is.nil(source) )
      return NO;

    if ( !$is._obj(source) )
      throw _mkTypeErr(new TYPE_ERR, 'source', source, '?Object|?Function',
        'enumerableKey');

    return $ownEnum(source, key);
  }
  has['enumerableKey'] = hasEnumerableKey;
  has['enumerable'] = hasEnumerableKey;
  has['enumKey'] = hasEnumerableKey;
  try {
    has['enum'] = hasEnumerableKey;
  }
  catch (e) {}
  /// #if}}} @code enumerableKey
  /// #}}} @submethod enumerableKey

  /// #if{{{ @helpers has

  /// #{{{ @group main

  /// #{{{ @func _ownMatch
  /**
   * @private
   * @param {(!Object|!Function)} src
   * @param {!RegExp} patt
   * @return {boolean}
   */
  function _ownMatch(src, patt) {

    /** @type {string} */
    var key;

    for (key in src) {
      if ( $own(src, key) && patt['test'](key) )
        return YES;
    }
    return NO;
  }
  /// #}}} @func _ownMatch

  /// #}}} @group main

  /// #{{{ @group errors

  /// #{{{ @const _MK_ERR
  /**
   * @private
   * @const {!Object<string, !function>}
   * @struct
   */
  var _MK_ERR = $mkErrs('has');
  /// #}}} @const _MK_ERR

  /// #insert @code MK_ERR ../macros/mk-err.js

  /// #insert @code MK_TYPE_ERR ../macros/mk-err.js

  /// #}}} @group errors

  /// #if}}} @helpers has

/// #ifnot{{{ @scope DOCS_ONLY
  return has;
})();
/// #ifnot{{{ @scope SOLO
vitals['has'] = has;
/// #ifnot}}} @scope SOLO
/// #ifnot}}} @scope DOCS_ONLY
/// #}}} @super has

/// #if{{{ @scope SOLO
var vitals = has;
vitals['has'] = has;
/// #insert @code EXPORT ../macros/export.js
/// #insert @wrapper CLOSE ../macros/wrapper.js
/// #if}}} @scope SOLO

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
