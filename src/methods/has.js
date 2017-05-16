/**
 * ---------------------------------------------------------------------------
 * VITALS HAS
 * ---------------------------------------------------------------------------
 * @section base
 * @version 4.1.3
 * @see [vitals.has](https://github.com/imaginate/vitals/wiki/vitals.has)
 *
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2017 Adam A Smith <adam@imaginate.life> (https://imaginate.life)
 */

'use strict';

var $newErrorMaker = require('./helpers/new-error-maker.js');
var $ownEnum = require('./helpers/own-enum.js');
var $inArr = require('./helpers/in-arr.js');
var $inObj = require('./helpers/in-obj.js');
var $inStr = require('./helpers/in-str.js');
var $match = require('./helpers/match.js');
var $own = require('./helpers/own.js');
var $is = require('./helpers/is.js');

///////////////////////////////////////////////////////////////////////// {{{1
// VITALS HAS
//////////////////////////////////////////////////////////////////////////////

var has = (function hasPrivateScope() {

  //////////////////////////////////////////////////////////
  // PUBLIC METHODS
  // - has
  // - has.key
  // - has.value      (has.val)
  // - has.pattern
  // - has.substring  (has.substr)
  // - has.enumerable (has.enum)
  //
  // * Note that has.enum may fail in older browser
  //   environments.
  //////////////////////////////////////////////////////////

  /* {{{2 Has References
   * @ref [own]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty)
   * @ref [test]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test)
   * @ref [equal]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness)
   * @ref [error]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)
   * @ref [string]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
   * @ref [isEnum]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/propertyIsEnumerable)
   * @ref [indexOf]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/indexOf)
   * @ref [includes]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes)
   */

  /// {{{2
  /// @method has
  /**
   * Checks if an `object` or `function` [owns][own] a property, if an `array`
   * or `arguments` instance contains a value, or a `string` matches a pattern
   * or contains a substring.
   *
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
   *     matching value.
   *   - *`string`*!$
   *     If the #val is a `RegExp`, this method returns the result of a call
   *     to [RegExp.prototype.test][test] on the #source. Otherwise it returns
   *     the result of a call to [String.prototype.includes][includes] or for
   *     older platforms a [strict equality][equal] test for a non-negative
   *     index result from [String.prototype.indexOf][indexOf] (i.e.
   *     `return source.indexOf(alteredVal) !== -1;`).
   * @param {*} val
   *   The following rules apply in order of priority (per #source type):
   *   - *`null`*!$
   *     The value of #val does not matter and is not used.
   *   - *`!Object|!Function`*!$
   *     The #val is passed **without** any conversions to
   *     [Object.prototype.hasOwnProperty][own].
   *   - *`!Array|!Arguments`*!$
   *     The #val is **not** altered. A [strict equality][equal] test against
   *     the #val is used to evaluate each indexed property value.
   *   - *`string`*!$
   *     If the #val is **not** a `RegExp`, it is converted into a `string`
   *     via [String()][string] before [String.prototype.includes][includes]
   *     or [String.prototype.indexOf][indexOf] is called.
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
   *     to [RegExp.prototype.test][test] on the #source. Otherwise it returns
   *     the result of a call to [String.prototype.includes][includes] or for
   *     older platforms a [strict equality][equal] test for a non-negative
   *     index result from [String.prototype.indexOf][indexOf] (i.e.
   *     `return source.indexOf(alteredVal) !== -1;`).
   */
  function has(source, val) {

    if (arguments.length < 2)
      throw $err(new Error, 'no #val defined');

    if ( $is.nil(source) )
      return false;

    if ( $is.str(source) )
      return $match(source, val);

    if ( !$is._obj(source) )
      throw $typeErr(new TypeError, 'source', source,
        '?Object|?Function|?Array|?Arguments|?string');

    return $is._arr(source)
      ? $inArr(source, val)
      : $own(source, val);
  }

  /// {{{2
  /// @method has.key
  /**
   * Checks if an `object` or `function` [owns][own] a property.
   *
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
  has.key = function hasKey(source, key) {

    if (arguments.length < 2)
      throw $err(new Error, 'no #key defined', 'key');

    if ( $is.nil(source) )
      return false;

    if ( !$is._obj(source) )
      throw $typeErr(new TypeError, 'source', source, '?Object|?Function',
        'key');

    return $own(source, key);
  };

  /// {{{2
  /// @method has.value
  /// @alias has.val
  /**
   * Checks if an `object` or `function` [owned][own] property or an `array`
   * or `arguments` indexed property has a value.
   *
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
  has.value = function hasValue(source, val) {

    if (arguments.length < 2)
      throw $err(new Error, 'no #val defined', 'value');

    if ( $is.nil(source) )
      return false;

    if ( !$is._obj(source) )
      throw $typeErr(new TypeError, 'source', source,
        '?Object|?Function|?Array|?Arguments', 'value');

    return $is._arr(source)
      ? $inArr(source, val)
      : $inObj(source, val);
  };
  // define shorthand
  has.val = has.value;

  /// {{{2
  /// @method has.pattern
  /**
   * Checks if a `string` matches a pattern or contains a substring.
   *
   * @public
   * @param {string} source
   *   If the #val is a `RegExp`, this method returns the result of a call to
   *   [RegExp.prototype.test][test] on the #source. Otherwise it returns the
   *   result of a call to [String.prototype.includes][includes] or for older
   *   platforms a [strict equality][equal] test for a non-negative index
   *   result from [String.prototype.indexOf][indexOf] (i.e.
   *   `return source.indexOf(alteredPattern) !== -1;`).
   * @param {*} pattern
   *   If the #pattern is **not** a `RegExp`, it is converted into a `string`
   *   via [String()][string] before [String.prototype.includes][includes]
   *   or [String.prototype.indexOf][indexOf] is called.
   * @return {boolean}
   *   If the #val is a `RegExp`, this method returns the result of a call to
   *   [RegExp.prototype.test][test] on the #source. Otherwise it returns the
   *   result of a call to [String.prototype.includes][includes] or for older
   *   platforms a [strict equality][equal] test for a non-negative index
   *   result from [String.prototype.indexOf][indexOf] (i.e.
   *   `return source.indexOf(alteredPattern) !== -1;`).
   */
  has.pattern = function hasPattern(source, pattern) {

    if ( !$is.str(source) )
      throw $typeErr(new TypeError, 'source', source, 'string', 'pattern');
    if (arguments.length < 2)
      throw $err(new Error, 'no #pattern defined', 'pattern');

    return $match(source, pattern);
  };

  /// {{{2
  /// @method has.substring
  /// @alias has.substr
  /**
   * Checks if a `string` contains a substring.
   *
   * @public
   * @param {string} source
   *   This method returns the result of a call to
   *   [String.prototype.includes][includes] or for older platforms a
   *   [strict equality][equal] test for a non-negative index result from
   *   [String.prototype.indexOf][indexOf] (i.e.
   *   `return source.indexOf(alteredVal) !== -1;`).
   * @param {*} val
   *   The #val is converted into a `string` via [String()][string] before
   *   [String.prototype.includes][includes] or
   *   [String.prototype.indexOf][indexOf] is called.
   * @return {boolean}
   *   This method returns the result of a call to
   *   [String.prototype.includes][includes] or for older platforms a
   *   [strict equality][equal] test for a non-negative index result from
   *   [String.prototype.indexOf][indexOf] (i.e.
   *   `return source.indexOf(alteredVal) !== -1;`).
   */
  has.substring = function hasSubstring(source, val) {

    if ( !$is.str(source) )
      throw $typeErr(new TypeError, 'source', source, 'string', 'substring');
    if (arguments.length < 2)
      throw $err(new Error, 'no #val defined', 'substring');

    return $inStr(source, val);
  };
  // define shorthand
  has.substr = has.substring;

  /// {{{2
  /// @method has.enumerable
  /// @alias has.enum
  /**
   * Checks if an `object` or `function` [owns][own] an [enumerable][isEnum]
   * property.
   *
   * @public
   * @param {(?Object|?Function)} source
   *   The following rules apply in order of priority (per #source type):
   *   - *`null`*!$
   *     This method automatically returns `false`.
   *   - *`!Object|!Function`*!$
   *     This method returns the result of a safe call to
   *     [Object.prototype.hasOwnProperty][own] and
   *     [Object.prototype.propertyIsEnumerable][isEnum].
   * @param {*} key
   *   The following rules apply in order of priority (per #source type):
   *   - *`null`*!$
   *     The value of #key does not matter and is not used.
   *   - *`!Object|!Function`*!$
   *     The #key is passed **without** any conversions to
   *     [Object.prototype.hasOwnProperty][own] and
   *     [Object.prototype.propertyIsEnumerable][isEnum].
   * @return {boolean}
   *   The following rules apply in order of priority (per #source type):
   *   - *`null`*!$
   *     This method returns `false`.
   *   - *`!Object|!Function`*!$
   *     This method returns the result of a safe call to
   *     [Object.prototype.hasOwnProperty][own] and
   *     [Object.prototype.propertyIsEnumerable][isEnum].
   */
  has.enumerable = function hasEnumerable(source, key) {

    if (arguments.length < 2)
      throw $err(new Error, 'no #key defined', 'enumerable');

    if ( $is.nil(source) )
      return false;

    if ( !$is._obj(source) )
      throw $typeErr(new TypeError, 'source', source, '?Object|?Function',
        'enumerable');

    return $ownEnum(source, key);
  };
  // define shorthand
  try {
    has.enum = has.enumerable;
  }
  catch (e) {}

  ///////////////////////////////////////////////////// {{{2
  // HAS HELPERS - MISC
  //////////////////////////////////////////////////////////

  /// {{{3
  /// @const NONE
  /**
   * @private
   * @const {undefined}
   */
  var NONE = (function(){})();

  /// {{{3
  /// @func $err
  /**
   * @private
   * @param {!Error} err
   * @param {string} msg
   * @param {string=} method
   * @return {!Error} 
   */
  var $err = $newErrorMaker('has');

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
  var $typeErr = $err.type;

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
  var $rangeErr = $err.range;

  /// }}}2
  // END OF PRIVATE SCOPE FOR HAS
  return has;
})();
/// }}}1

module.exports = has;

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
