/**
 * ---------------------------------------------------------------------------
 * VITALS.CUT
 * ---------------------------------------------------------------------------
 * @section base
 * @version 4.1.3
 * @see [vitals.cut](https://github.com/imaginate/vitals/wiki/vitals.cut)
 *
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life> (https://imaginate.life)
 */

/// #if{{{ @scope SOLO
/// #insert @wrapper OPEN ../macros/wrapper.js
/// #include @core constants ../core/constants.js
/// #include @core helpers ../core/helpers.js
/// #include @helper $cloneArr ../helpers/clone-arr.js
/// #include @helper $cloneFun ../helpers/clone-fun.js
/// #include @helper $cloneObj ../helpers/clone-obj.js
/// #include @helper $escRegx ../helpers/esc-regx.js
/// #include @helper $match ../helpers/match.js
/// #include @helper $sliceArr ../helpers/slice-arr.js
/// #include @super is ./is.js
/// #if}}} @scope SOLO

/// #{{{ @super cut
/// #ifnot{{{ @scope DOCS_ONLY
/**
 * @public
 * @type {!Function<string, !Function>}
 * @dict
 */
var cut = (function cutPrivateScope() {
/// #ifnot}}} @scope DOCS_ONLY

  /// #if{{{ @docrefs cut
  /// @docref [own]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty)
  /// @docref [bind]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)
  /// @docref [call]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call)
  /// @docref [func]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)
  /// @docref [this]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this)
  /// @docref [type]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures)
  /// @docref [clone]:(https://en.wikipedia.org/wiki/Cloning_(programming))
  /// @docref [equal]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness)
  /// @docref [slice]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)
  /// @docref [delete]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/delete)
  /// @docref [minify]:(https://en.wikipedia.org/wiki/Minification_(programming))
  /// @docref [splice]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice)
  /// @docref [func-name]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/name)
  /// @docref [arr-length]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/length)
  /// @docref [func-length]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/length)
  /// #if}}} @docrefs cut

  /// #{{{ @submethod main
  /// #{{{ @docs main
  /// @section base
  /// @method vitals.cut
  /**
   * @description
   *   Removes properties from an `object`, `array`, or `function` or
   *   characters from a `string` and returns the amended #source.
   * @public
   * @param {(!Object|!Function|!Array|!Arguments|string)} source
   *   If the #source is an `arguments` instance, it is [sliced][slice] into
   *   an `array` before any values are removed.
   * @param {...*} val
   *   If only one `array` #val is provided, it is considered an `array` of
   *   values. All other details are as follows (per #source type):
   *   - *`!Object|!Function`*!$
   *     - **The leading #val is a `RegExp`**!$
   *       This method will [delete][delete] from the #source all [owned][own]
   *       properties with a key that matches (via a @has#pattern test) any
   *       #val.
   *     - **The leading #val is a `string`**!$
   *       This method will [delete][delete] all properties with a key that
   *       matches (via a [strict equality][equal] test) any #val.
   *     - **The leading #val is a `function`**!$
   *       The #val is considered a filter `function` (i.e. if it returns
   *       `false` the [owned][own] property is [deleted][delete]). It has the
   *       following optional parameters:
   *       - **value** *`*`*
   *       - **key** *`string`*
   *       - **source** *`!Object|!Function`*
   *       Note that this method lazily [clones][clone] the #source based on
   *       the filter's [length property][func-length] (i.e. if you alter the
   *       #source `object` within the filter make sure you define the
   *       filter's third parameter so you can safely assume all references to
   *       the #source are its original values).
   *     - **All other situations**!$
   *       This method will [delete][delete] from the #source all [owned][own]
   *       properties with a value that matches (via a
   *       [strict equality][equal] test) any #val.
   *   - *`!Array|!Arguments`*!$
   *     - **Every #val is a whole `number`**!$
   *       This method will [splice][splice] from the #source each property
   *       with an index that matches (via a [strict equality][equal] test)
   *       any #val. If a #val is a negative `number`, it is added to the
   *       #source [length][arr-length] before checking for a matching
   *       property.
   *     - **The leading #val is a `function`**!$
   *       The #val is considered a filter `function` (i.e. if it returns
   *       `false` the indexed property is [spliced][splice] from the
   *       #source). It has the following optional parameters:
   *       - **value** *`*`*
   *       - **index** *`number`*
   *       - **source** *`!Array`*
   *       Note that this method lazily [clones][clone] the #source based on
   *       the filter's [length property][func-length] (i.e. if you alter the
   *       #source `array` within the filter make sure you define the filter's
   *       third parameter so you can safely assume all references to the
   *       #source are its original values).
   *     - **All other situations**!$
   *       This method will [splice][splice] from the #source all indexed
   *       properties with a value that matches (via a
   *       [strict equality][equal] test) any #val.
   *   - *`string`*!$
   *     Each `substring` of characters that matches any #val is removed from
   *     the #source. Each #val that is not a `RegExp` or `string` is
   *     converted to a `string` before checking the #source for any matches.
   * @param {?Object=} thisArg
   *   Only applicable when a filter `function` is defined for #val (i.e. the
   *   #source must be an `object`, `function`, or `array`, and the leading
   *   #val must be a `function`). If #thisArg is defined, the filter
   *   `function` is bound to its value. Note that the native
   *   [Function.prototype.bind][bind] is not used to bind the filter
   *   `function`. Instead the filter `function` is wrapped with a regular new
   *   [Function][func] that uses [Function.prototype.call][call] to call the
   *   filter `function` with #thisArg. The new wrapper `function` has the
   *   same [length property][func-length] value as the filter `function`
   *   (unless more than three parameters were defined for the filter
   *   `function` as the wrapper has a max value of `3`) and the
   *   [name property][func-name] value of `"filter"` (unless you are using a
   *   [minified][minify] version of `vitals`).
   * @return {(!Object|!Function|!Array|string)}
   *   The amended #source.
   */
  /// #}}} @docs main
  /// #if{{{ @code main
  function cut(source, val, thisArg) {

    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #source defined');

      case 1:
        throw _mkErr(new ERR, 'no #val defined');

      case 2:
        if ( $is.str(source) )
          return $is.arr(val)
            ? _cutPatterns(source, val)
            : _cutPattern(source, val);

        if ( !$is._obj(source) )
          throw _mkTypeErr(new TYPE_ERR, 'source', source,
            '!Object|!Function|!Array|!Arguments|string');

        if ( $is.args(source) )
          source = $sliceArr(source);

        return $is.fun(val)
          ? $is.arr(source)
            ? _filterArr(source, val, VOID)
            : _filterObj(source, val, VOID)
          : $is.arr(val)
            ? _cutProps(source, val)
            : _cutProp(source, val);

      default:
        if ( $is.str(source) ) {
          val = $sliceArr(arguments, 1);
          return _cutPatterns(source, val);
        }

        if ( !$is._obj(source) )
          throw _mkTypeErr(new TYPE_ERR, 'source', source,
            '!Object|!Function|!Array|!Arguments|string');

        if ( $is.args(source) )
          source = $sliceArr(source);

        if ( $is.fun(val) ) {
          if ( !$is.nil(thisArg) && !$is.void(thisArg) && !$is.obj(thisArg) )
            throw _mkTypeErr(new TYPE_ERR, 'thisArg', thisArg, '?Object=');

          return $is.arr(source)
            ? _filterArr(source, val, thisArg)
            : _filterObj(source, val, thisArg);
        }

        val = $sliceArr(arguments, 1);
        return _cutProps(source, val);
    }
  }
  /// #if}}} @code main
  /// #}}} @submethod main

  /// #{{{ @submethod property
  /// #{{{ @docs property
  /// @section base
  /// @method vitals.cut.property
  /// @alias vitals.cut.prop
  /**
   * @description
   *   Removes a property from an `object`, `array`, or `function` and returns
   *   the amended #source.
   * @public
   * @param {(!Object|!Function|!Array|!Arguments)} source
   *   If the #source is an `arguments` instance, it is [sliced][slice] into
   *   an `array` before any values are removed.
   * @param {*} val
   *   All details are as follows (per #source type):
   *   - *`!Object|!Function`*!$
   *     - **#val is a `RegExp`**!$
   *       This method will [delete][delete] from the #source all [owned][own]
   *       properties with a key that matches (via a @has#pattern test) the
   *       #val.
   *     - **#val is a `string`**!$
   *       This method will [delete][delete] from the #source all [owned][own]
   *       properties with a key that matches (via a [strict equality][equal]
   *       test) the #val.
   *     - **#val is a `function`**!$
   *       The #val is considered a filter `function` (i.e. if it returns
   *       `false` the [owned][own] property is [deleted][delete]). It has the
   *       following optional parameters:
   *       - **value** *`*`*
   *       - **key** *`string`*
   *       - **source** *`!Object|!Function`*
   *       Note that this method lazily [clones][clone] the #source based on
   *       the filter's [length property][func-length] (i.e. if you alter the
   *       #source `object` within the filter make sure you define the
   *       filter's third parameter so you can safely assume all references to
   *       the #source are its original values).
   *     - **All other situations**!$
   *       This method will [delete][delete] from the #source all [owned][own]
   *       properties with a value that matches (via a
   *       [strict equality][equal] test) the #val.
   *   - *`!Array|!Arguments`*!$
   *     - **#val is a whole `number`**!$
   *       This method will [splice][splice] from the #source the property
   *       with an index that matches (via a [strict equality][equal] test)
   *       the #val. If the #val is a negative `number`, it is added to the
   *       #source [length][arr-length] before checking for a matching
   *       property.
   *     - **#val is a `function`**!$
   *       The #val is considered a filter `function` (i.e. if it returns
   *       `false` the property is [spliced][splice] from the #source). It has
   *       the following optional parameters:
   *       - **value** *`*`*
   *       - **index** *`number`*
   *       - **source** *`!Array`*
   *       Note that this method lazily [clones][clone] the #source based on
   *       the filter's [length property][func-length] (i.e. if you alter the
   *       #source `array` within the filter make sure you define the filter's
   *       third parameter so you can safely assume all references to the
   *       #source are its original values).
   *     - **All other situations**!$
   *       This method will [splice][splice] from the #source all properties
   *       with a value that matches (via a [strict equality][equal] test)
   *       the #val.
   * @param {?Object=} thisArg
   *   Only applicable when a filter `function` is defined for #val. If
   *   #thisArg is defined, the filter `function` is bound to its value. Note
   *   that the native [Function.prototype.bind][bind] is not used to bind the
   *   filter `function`. Instead the filter `function` is wrapped with a
   *   regular new [Function][func] that uses [Function.prototype.call][call]
   *   to call the filter `function` with #thisArg. The new wrapper `function`
   *   has the same [length property][func-length] value as the filter
   *   `function` (unless more than three parameters were defined for the
   *   filter `function` as the wrapper has a max value of `3`) and the
   *   [name property][func-name] value of `"filter"` (unless you are using a
   *   [minified][minify] version of `vitals`).
   * @return {(!Object|!Function|!Array)}
   *   The amended #source.
   */
  /// #}}} @docs property
  /// #if{{{ @code property
  function cutProperty(source, val, thisArg) {

    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #source defined', 'property');

      case 1:
        throw _mkErr(new ERR, 'no #val defined', 'property');

      case 2:
        if ( !$is._obj(source) )
          throw _mkTypeErr(new TYPE_ERR, 'source', source,
            '!Object|!Function|!Array|!Arguments', 'property');

        if ( $is.args(source) )
          source = $sliceArr(source);

        return $is.fun(val)
          ? $is.arr(source)
            ? _filterArr(source, val, VOID)
            : _filterObj(source, val, VOID)
          : _cutProp(source, val);

      default:
        if ( !$is._obj(source) )
          throw _mkTypeErr(new TYPE_ERR, 'source', source,
            '!Object|!Function|!Array|!Arguments', 'property');

        if ( $is.args(source) )
          source = $sliceArr(source);

        if ( $is.fun(val) ) {
          if ( !$is.nil(thisArg) && !$is.void(thisArg) && !$is.obj(thisArg) )
            throw _mkTypeErr(new TYPE_ERR, 'thisArg', thisArg, '?Object=',
              'property');

          return $is.arr(source)
            ? _filterArr(source, val, thisArg)
            : _filterObj(source, val, thisArg);
        }

        return _cutProp(source, val);
    }
  }
  cut['property'] = cutProperty;
  cut['prop'] = cutProperty;
  /// #if}}} @code property
  /// #}}} @submethod property

  /// #{{{ @submethod key
  /// #{{{ @docs key
  /// @section base
  /// @method vitals.cut.key
  /**
   * @description
   *   Removes a property by key name from an `object` or `function` and
   *   returns the amended #source.
   * @public
   * @param {(!Object|!Function)} source
   * @param {*} key
   *   If a property with the #key value for its key name is [owned][own] by
   *   the #source, it is [deleted][delete].
   * @return {(!Object|!Function)}
   *   The amended #source.
   */
  /// #}}} @docs key
  /// #if{{{ @code key
  function cutKey(source, key) {

    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #source defined', 'key');
      case 1:
        throw _mkErr(new ERR, 'no #key defined', 'key');
    }

    if ( !$is._obj(source) )
      throw _mkTypeErr(new TYPE_ERR, 'source', source, '!Object|!Function',
        'key');

    return _cutKey(source, key);
  }
  cut['key'] = cutKey;
  /// #if}}} @code key
  /// #}}} @submethod key

  /// #{{{ @submethod index
  /// #{{{ @docs index
  /// @section base
  /// @method vitals.cut.index
  /// @alias vitals.cut.i
  /**
   * @description
   *   Removes properties by index from an `array` or array-like `object` and
   *   returns the amended #source. If an array-like `object` is supplied, it
   *   is copied via [slice][slice] (i.e. converted to an `array`) before
   *   removing any properties.
   * @public
   * @param {(!Array|!Arguments|!Object|!Function)} source
   *   If the #source is **not** an `array`, it must be an array-like `object`
   *   or `function`. The #source is considered array-like when it [owns][own]
   *   a property with the `"length"` key name (e.g. `source.length` like the
   *   `array` [length property][arr-length]) whose value is a whole `number`
   *   that is greater than or equal to zero (e.g.
   *   `isWholeNumber(source.length) && source.length >= 0`). If an array-like
   *   #source is provided, it is [sliced][slice] into an `array` before any
   *   values are removed.
   * @param {number} index
   *   The #index must be a whole `number`. The following rules apply in order
   *   of priority (per #toIndex data type):
   *   - *`undefined`*!$
   *     The #index value sets the one matching property (if a property with
   *     an index value of the #index exists in the #source) to
   *     [splice][splice] from the #source. If the #index is negative, it is
   *     added to the #source [length][arr-length] before a matching property
   *     is searched for.
   *   - *`number`*!$
   *     The #index value sets the start of a range of indexes that are
   *     [spliced][splice] from the #source. If the #index is negative, it is
   *     added to the #source [length][arr-length]. The property with a
   *     matching index value of the #index is included (as well as starts the
   *     range of indexes) in the [spliced][splice] properties if it exists.
   * @param {(number|undefined)=} toIndex = `undefined`
   *   If the #toIndex is defined, it must be a whole `number`. The #toIndex
   *   `number` causes all property indexes from the #index to the #toIndex
   *   (not including the #toIndex) to be [spliced][splice] from #source. If
   *   the #toIndex is a negative `number`, it is added to the #source
   *   [length][arr-length] before being used.
   * @return {!Array}
   *   The amended #source or when an array-like `object` is defined for the
   *   #source, an amended copy (via [slice][slice]) of #source.
   */
  /// #}}} @docs index
  /// #if{{{ @code index
  function cutIndex(source, index, toIndex) {

    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #source defined', 'index');

      case 1:
        throw _mkErr(new ERR, 'no #index defined', 'index');

      case 2:
        if ( !$is._obj(source) )
          throw _mkTypeErr(new TYPE_ERR, 'source', source,
            '!Array|!Arguments|!Object|!Function', 'index');
        if ( !$is.arrish(source) )
          throw _mkErr(new ERR, '#source failed `array-like` test (#source.' +
            'length must be a whole `number` that is `0` or more)', 'index');
        if ( !$is.num(index) )
          throw _mkTypeErr(new TYPE_ERR, 'index', index, 'number', 'index');
        if ( !$is.whole(index) )
          throw _mkErr(new ERR, 'invalid #index `number` (' +
            'must be a whole `number`)', 'index');

        if ( !$is.arr(source) )
          source = $sliceArr(source);

        return _cutIndex(source, index, VOID);

      default:
        if ( !$is._obj(source) )
          throw _mkTypeErr(new TYPE_ERR, 'source', source,
            '!Array|!Arguments|!Object|!Function', 'index');
        if ( !$is.arrish(source) )
          throw _mkErr(new ERR, '#source failed `array-like` test (#source.' +
            'length must be a whole `number` that is `0` or more)', 'index');
        if ( !$is.num(index) )
          throw _mkTypeErr(new TYPE_ERR, 'index', index, 'number', 'index');
        if ( !$is.whole(index) )
          throw _mkErr(new ERR, 'invalid #index `number` (' +
            'must be a whole `number`)', 'index');

        if ( !$is.void(toIndex) ) {
          if ( !$is.num(toIndex) )
            throw _mkTypeErr(new TYPE_ERR, 'toIndex', toIndex, 'number',
              'index');
          if ( !$is.whole(index) )
            throw _mkErr(new ERR, 'invalid #toIndex `number` (' +
              'must be a whole `number`)', 'index');
        }

        if ( !$is.arr(source) )
          source = $sliceArr(source);

        return _cutIndex(source, index, toIndex);
    }
  }
  cut['index'] = cutIndex;
  cut['i'] = cutIndex;
  /// #if}}} @code index
  /// #}}} @submethod index

  /// #{{{ @submethod type
  /// #{{{ @docs type
  /// @section base
  /// @method vitals.cut.type
  /**
   * @description
   *   Removes properties by their value's [data type][type] from an `object`,
   *   `function`, or `array` and returns the amended #source. @is#main is
   *   used to complete the type checks. See @is-types for all available data
   *   type options.
   * @public
   * @param {(!Object|!Function|!Array|!Arguments)} source
   *   If the #source is an `arguments` instance, it is [sliced][slice] into
   *   an `array` before any values are removed.
   * @param {string} type
   *   See @is-types for all valid #type options. The remaining details are as
   *   follows (per #source type):
   *   - *`!Object|!Function`*!$
   *     This method will [delete][delete] from the #source all [owned][own]
   *     properties with a value that matches (via a @is#main test) the #type.
   *   - *`!Array|!Arguments`*!$
   *     This method will [splice][splice] from the #source all indexed
   *     properties with a value that matches (via a @is#main test) the #type.
   * @return {(!Object|!Function|!Array)}
   *   The amended #source.
   */
  /// #}}} @docs type
  /// #if{{{ @code type
  function cutType(source, type) {

    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #source defined', 'type');
      case 1:
        throw _mkErr(new ERR, 'no #type defined', 'type');
    }

    if ( !$is._obj(source) )
      throw _mkTypeErr(new TYPE_ERR, 'source', source,
        '!Object|!Function|!Array|!Arguments', 'type');
    if ( !$is.str(type) )
      throw _mkTypeErr(new TYPE_ERR, 'type', type, 'string', 'type');

    if ( $is.args(source) )
      source = $sliceArr(source);

    if ( $is.empty(source) ) {
      is(type, ''); // run once to catch any invalid types in #type
      return source;
    }

    return _cutType(source, type);
  }
  cut['type'] = cutType;
  /// #if}}} @code type
  /// #}}} @submethod type

  /// #{{{ @submethod value
  /// #{{{ @docs value
  /// @section base
  /// @method vitals.cut.value
  /// @alias vitals.cut.val
  /**
   * @description
   *   Removes properties by value from an `object`, `function`, or `array`
   *   and returns the amended #source.
   * @public
   * @param {(!Object|!Function|!Array|!Arguments)} source
   *   If the #source is an `arguments` instance, it is [sliced][slice] into
   *   an `array` before any values are removed.
   * @param {*} val
   *   All details are as follows (per #source type):
   *   - *`!Object|!Function`*!$
   *     This method will [delete][delete] from the #source all [owned][own]
   *     properties with a value that matches (via a [strict equality][equal]
   *     test) the #val.
   *   - *`!Array|!Arguments`*!$
   *     This method will [splice][splice] from the #source all indexed
   *     properties with a value that matches (via a [strict equality][equal]
   *     test) the #val.
   * @return {(!Object|!Function|!Array)}
   *   The amended #source.
   */
  /// #}}} @docs value
  /// #if{{{ @code value
  function cutValue(source, val) {

    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #source defined', 'value');
      case 1:
        throw _mkErr(new ERR, 'no #val defined', 'value');
    }

    if ( !$is._obj(source) )
      throw _mkTypeErr(new TYPE_ERR, 'source', source,
        '!Object|!Function|!Array|!Arguments', 'value');

    if ( $is.args(source) )
      source = $sliceArr(source);

    return _cutVal(source, val);
  }
  cut['value'] = cutValue;
  cut['val'] = cutValue;
  /// #if}}} @code value
  /// #}}} @submethod value

  /// #{{{ @submethod pattern
  /// #{{{ @docs pattern
  /// @section base
  /// @method vitals.cut.pattern
  /// @alias vitals.cut.patt
  /**
   * @description
   *   Removes a pattern from a `string` and returns the amended #source.
   * @public
   * @param {string} source
   * @param {*} pattern
   *   Each `substring` of characters that matches #pattern is removed from
   *   the #source. If the #pattern is not a `RegExp` or `string`, it is
   *   converted into a `string` before checking the #source for any matches.
   * @return {string}
   *   The amended #source.
   */
  /// #}}} @docs pattern
  /// #if{{{ @code pattern
  function cutPattern(source, pattern) {

    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #source defined', 'pattern');
      case 1:
        throw _mkErr(new ERR, 'no #pattern defined', 'pattern');
    }

    if ( !$is.str(source) )
      throw _mkTypeErr(new TYPE_ERR, 'source', source, 'string', 'pattern');

    return _cutPattern(source, pattern);
  }
  cut['pattern'] = cutPattern;
  cut['patt'] = cutPattern;
  /// #if}}} @code pattern
  /// #}}} @submethod pattern

  /// #{{{ @submethod properties
  /// #{{{ @docs properties
  /// @section base
  /// @method vitals.cut.properties
  /// @alias vitals.cut.props
  /**
   * @description
   *   Removes properties from an `object`, `array`, or `function` and returns
   *   the amended #source.
   * @public
   * @param {(!Object|!Function|!Array|!Arguments)} source
   *   If the #source is an `arguments` instance, it is [sliced][slice] into
   *   an `array` before any values are removed.
   * @param {...*} val
   *   If only one `array` #val is provided, it is considered an `array` of
   *   values. All other details are as follows (per #source type):
   *   - *`!Object|!Function`*!$
   *     - **The leading #val is a `RegExp`**!$
   *       This method will [delete][delete] from the #source all [owned][own]
   *       properties with a key that matches (via a @has#pattern test) any
   *       #val.
   *     - **The leading #val is a `string`**!$
   *       This method will [delete][delete] from the #source all [owned][own]
   *       properties with a key that matches (via a [strict equality][equal]
   *       test) any #val.
   *     - **All other situations**!$
   *       This method will [delete][delete] from the #source all [owned][own]
   *       properties with a value that matches (via a
   *       [strict equality][equal] test) any #val.
   *   - *`!Array|!Arguments`*!$
   *     - **Every #val is a whole `number`**!$
   *       This method will [splice][splice] from the #source each property
   *       with an index that matches (via a [strict equality][equal] test)
   *       any #val. If a #val is a negative `number`, it is added to the
   *       #source [length][arr-length] before checking for a matching
   *       property.
   *     - **All other situations**!$
   *       This method will [splice][splice] from the #source all indexed
   *       properties with a value that matches (via a
   *       [strict equality][equal] test) any #val.
   * @return {(!Object|!Function|!Array)}
   *   The amended #source.
   */
  /// #}}} @docs properties
  /// #if{{{ @code properties
  function cutProperties(source, val) {

    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #source defined', 'properties');
      case 1:
        throw _mkErr(new ERR, 'no #val defined', 'properties');
      case 2:
        break;
      default:
        val = $sliceArr(arguments, 1);
        break;
    }

    if ( !$is._obj(source) )
      throw _mkTypeErr(new TYPE_ERR, 'source', source,
        '!Object|!Function|!Array|!Arguments', 'properties');

    if ( $is.args(source) )
      source = $sliceArr(source);

    return $is.arr(val)
      ? _cutProps(source, val)
      : _cutProp(source, val);
  }
  cut['properties'] = cutProperties;
  cut['props'] = cutProperties;
  /// #if}}} @code properties
  /// #}}} @submethod properties

  /// #{{{ @submethod keys
  /// #{{{ @docs keys
  /// @section base
  /// @method vitals.cut.keys
  /**
   * @description
   *   Removes properties by key name from an `object` or `function` and
   *   returns the amended #source.
   * @public
   * @param {(!Object|!Function)} source
   * @param {...*} key
   *   If only one `array` #key is provided, it is considered an `array` of
   *   keys. For each #key value, if the #source [owns][own] a property with a
   *   matching key name, it is [deleted][delete].
   * @return {(!Object|!Function)}
   *   The amended #source.
   */
  /// #}}} @docs keys
  /// #if{{{ @code keys
  function cutKeys(source, key) {

    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #source defined', 'keys');
      case 1:
        throw _mkErr(new ERR, 'no #key defined', 'keys');
      case 2:
        break;
      default:
        key = $sliceArr(arguments, 1);
        break;
    }

    if ( !$is._obj(source) )
      throw _mkTypeErr(new TYPE_ERR, 'source', source, '!Object|!Function',
        'keys');

    return $is.arr(key)
      ? _cutKeys(source, key)
      : _cutKey(source, key);
  }
  cut['keys'] = cutKeys;
  /// #if}}} @code keys
  /// #}}} @submethod keys

  /// #{{{ @submethod indexes
  /// #{{{ @docs indexes
  /// @section base
  /// @method vitals.cut.indexes
  /// @alias vitals.cut.ii
  /**
   * @description
   *   Removes properties by index from an `array` or array-like `object` and
   *   returns the amended #source. If an array-like `object` is supplied, it
   *   is copied via [slice][slice] (i.e. converted to an `array`) before
   *   removing any properties.
   * @public
   * @param {(!Array|!Arguments|!Object|!Function)} source
   *   If the #source is **not** an `array`, it must be an array-like `object`
   *   or `function`. The #source is considered array-like when it [owns][own]
   *   a property with the `"length"` key name (e.g. `source.length` like the
   *   `array` [length property][arr-length]) whose value is a whole `number`
   *   that is greater than or equal to zero (e.g.
   *   `isWholeNumber(source.length) && source.length >= 0`). If an array-like
   *   #source is provided, it is [sliced][slice] into an `array` before any
   *   values are removed.
   * @param {(!Array<number>|...number)} index
   *   Each #index `number` must be a whole `number`. If only one `array`
   *   #index is provided, it is considered an `array` of indexes. If a
   *   property with any #index exists in #source, it is [spliced][splice]
   *   from the #source. If an #index is a negative `number`, it is added to
   *   the #source [length][arr-length] before checking for a matching
   *   property.
   * @return {!Array}
   *   The amended #source or when an array-like `object` is defined for the
   *   #source, an amended copy (via [slice][slice]) of #source.
   */
  /// #}}} @docs indexes
  /// #if{{{ @code indexes
  function cutIndexes(source, index) {

    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #source defined', 'indexes');
      case 1:
        throw _mkErr(new ERR, 'no #index defined', 'indexes');
      case 2:
        break;
      default:
        index = $sliceArr(arguments, 1);
        break;
    }

    if ( !$is._obj(source) )
      throw _mkTypeErr(new TYPE_ERR, 'source', source,
        '!Array|!Arguments|!Object|!Function', 'indexes');
    if ( !$is.arrish(source) )
      throw _mkErr(new ERR, '#source failed `array-like` test (#source.' +
        'length must be a whole `number` that is `0` or more)', 'indexes');

    if ( !$is.arr(source) )
      source = $sliceArr(source);

    if ( !$is.arr(index) ) {
      if ( !$is.num(index) )
        throw _mkTypeErr(new TYPE_ERR, 'index', index,
          '(!Array<number>|...number)', 'indexes');
      if ( !$is.whole(index) )
        throw _mkErr(new ERR, 'invalid #index `number` (' +
          'must be a whole `number`)', 'indexes');

      return _cutIndex(source, index);
    }

    if ( !_isNumArr(index) )
      throw _mkTypeErr(new TYPE_ERR, 'index', index,
        '(!Array<number>|...number)', 'indexes');
    if ( !_isWholeNumArr(index) )
      throw _mkErr(new ERR, 'an invalid #index `number` (' +
        'every #index must be a whole `number`)', 'indexes');

    return _cutIndexes(source, index);
  }
  cut['indexes'] = cutIndexes;
  cut['ii'] = cutIndexes;
  /// #if}}} @code indexes
  /// #}}} @submethod indexes

  /// #{{{ @submethod values
  /// #{{{ @docs values
  /// @section base
  /// @method vitals.cut.values
  /// @alias vitals.cut.vals
  /**
   * @description
   *   Removes properties by value from an `object`, `function`, or `array`
   *   and returns the amended #source.
   * @public
   * @param {(!Object|!Function|!Array|!Arguments)} source
   *   If the #source is an `arguments` instance, it is [sliced][slice] into
   *   an `array` before any values are removed.
   * @param {...*} val
   *   If only one `array` #val is provided, it is considered an `array` of
   *   values. All other details are as follows (per #source type):
   *   - *`!Object|!Function`*!$
   *     This method will [delete][delete] from the #source all of the
   *     [owned][own] properties with a value that matches (via a
   *     [strict equality][equal] test) any #val.
   *   - *`!Array|!Arguments`*!$
   *     This method will [splice][splice] from the #source all of the indexed
   *     properties with a value that matches (via a [strict equality][equal]
   *     test) any #val.
   * @return {(!Object|!Function|!Array)}
   *   The amended #source.
   */
  /// #}}} @docs values
  /// #if{{{ @code values
  function cutValues(source, val) {

    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #source defined', 'values');
      case 1:
        throw _mkErr(new ERR, 'no #val defined', 'values');
      case 2:
        break;
      default:
        val = $sliceArr(arguments, 1);
        break;
    }

    if ( !$is._obj(source) )
      throw _mkTypeErr(new TYPE_ERR, 'source', source,
        '!Object|!Function|!Array|!Arguments', 'values');

    if ( $is.args(source) )
      source = $sliceArr(source);

    return $is.arr(val)
      ? _cutVals(source, val)
      : _cutVal(source, val);
  }
  cut['values'] = cutValues;
  cut['vals'] = cutValues;
  /// #if}}} @code values
  /// #}}} @submethod values

  /// #{{{ @submethod patterns
  /// #{{{ @docs patterns
  /// @section base
  /// @method vitals.cut.patterns
  /// @alias vitals.cut.patts
  /**
   * @description
   *   Removes patterns from a `string` and returns the amended #source.
   * @public
   * @param {string} source
   * @param {...*} pattern
   *   If only one `array` #pattern is provided, it is considered an `array`
   *   of patterns. Each `substring` of characters that matches any #pattern
   *   is removed from the #source. If a #pattern is not a `RegExp` or
   *   `string`, it is converted into a `string` before checking the #source
   *   for any matches.
   * @return {string}
   *   The amended #source.
   */
  /// #}}} @docs patterns
  /// #if{{{ @code patterns
  function cutPatterns(source, pattern) {

    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #source defined', 'patterns');
      case 1:
        throw _mkErr(new ERR, 'no #pattern defined', 'patterns');
      case 2:
        break;
      default:
        pattern = $sliceArr(arguments, 1);
        break;
    }

    if ( !$is.str(source) )
      throw _mkTypeErr(new TYPE_ERR, 'source', source, 'string', 'patterns');

    return $is.arr(pattern)
      ? _cutPatterns(source, pattern)
      : _cutPattern(source, pattern);
  }
  cut['patterns'] = cutPatterns;
  cut['patts'] = cutPatterns;
  /// #if}}} @code patterns
  /// #}}} @submethod patterns

  /// #if{{{ @helpers cut

  /// #{{{ @group main

  /// #{{{ @func _cutProp
  /**
   * @private
   * @param {(!Object|!Function|!Array)} source
   * @param {*} val
   * @return {(!Object|!Function|!Array)}
   */
  function _cutProp(source, val) {
    return $is.arr(source)
      ? $is.num(val) && $is.whole(val)
        ? _spliceKey(source, val)
        : _spliceVal(source, val)
      : $is.str(val) || $is.regx(val)
        ? _deleteKey(source, val)
        : _deleteVal(source, val);
  }
  /// #}}} @func _cutProp

  /// #{{{ @func _cutProps
  /**
   * @private
   * @param {(!Object|!Function|!Array)} source
   * @param {!Array<*>} vals
   * @return {(!Object|!Function|!Array)}
   */
  function _cutProps(source, vals) {
    return $is.arr(source)
      ? _isIntArr(vals)
        ? _spliceKeys(source, vals)
        : _spliceVals(source, vals)
      : $is.str(vals[0]) || $is.regx(vals[0])
        ? _deleteKeys(source, vals)
        : _deleteVals(source, vals);
  }
  /// #}}} @func _cutProps

  /// #{{{ @func _cutKey
  /**
   * @private
   * @param {(!Object|!Function)} source
   * @param {*} key
   * @return {(!Object|!Function)}
   */
  function _cutKey(source, key) {

    if ( $own(source, key) )
      delete source[key];

    return source;
  }
  /// #}}} @func _cutKey

  /// #{{{ @func _cutKeys
  /**
   * @private
   * @param {(!Object|!Function)} source
   * @param {!Array} keys
   * @return {(!Object|!Function)}
   */
  function _cutKeys(source, keys) {

    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    len = keys['length'];
    i = -1;
    while (++i < len)
      source = _cutKey(source, keys[i]);
    return source;
  }
  /// #}}} @func _cutKeys

  /// #{{{ @func _cutIndex
  /**
   * @private
   * @param {!Array} source
   * @param {number} key
   * @param {number=} toKey
   * @return {!Array}
   */
  function _cutIndex(source, key, toKey) {

    /** @type {number} */
    var len;

    len = source['length'];

    if (key < 0)
      key += len;

    if (key >= len)
      return source;

    if ( $is.void(toKey) ) {
      if (key < 0)
        return source;
      source['splice'](key, 1);
      return source;
    }

    if (key < 0)
      key = 0;

    if (toKey > len)
      toKey = len;
    else if (toKey < 0)
      toKey += len;

    if (key >= toKey)
      return source;

    source['splice'](key, toKey - key);
    return source;
  }
  /// #}}} @func _cutIndex

  /// #{{{ @func _cutIndexes
  /**
   * @private
   * @param {!Array} source
   * @param {!Array<number>} keys
   * @return {!Array}
   */
  function _cutIndexes(source, keys) {
    return _spliceKeys(source, keys);
  }
  /// #}}} @func _cutIndexes

  /// #{{{ @func _cutType
  /**
   * @private
   * @param {(!Object|!Function|!Array)} source
   * @param {string} type
   * @return {(!Object|!Function|!Array)}
   */
  function _cutType(source, type) {
    return $is.arr(source)
      ? _spliceValByType(source, type)
      : _deleteValByType(source, type);
  }
  /// #}}} @func _cutType

  /// #{{{ @func _cutVal
  /**
   * @private
   * @param {(!Object|!Function|!Array)} source
   * @param {*} val
   * @return {(!Object|!Function|!Array)}
   */
  function _cutVal(source, val) {
    return $is.arr(source)
      ? _spliceVal(source, val)
      : _deleteVal(source, val);
  }
  /// #}}} @func _cutVal

  /// #{{{ @func _cutVals
  /**
   * @private
   * @param {(!Object|!Function|!Array)} source
   * @param {!Array<*>} vals
   * @return {(!Object|!Function|!Array)}
   */
  function _cutVals(source, vals) {
    return $is.arr(source)
      ? _spliceVals(source, vals)
      : _deleteVals(source, vals);
  }
  /// #}}} @func _cutVals

  /// #{{{ @func _cutPattern
  /**
   * @private
   * @param {string} source
   * @param {*} pattern
   * @return {string}
   */
  function _cutPattern(source, pattern) {
    if ( !$is.regx(pattern) ) {
      pattern = $mkStr(pattern);
      pattern = $escRegx(pattern);
      pattern = new REGX(pattern, 'g');
    }
    return source['replace'](pattern, '');
  }
  /// #}}} @func _cutPattern

  /// #{{{ @func _cutPatterns
  /**
   * @private
   * @param {string} source
   * @param {!Array} patterns
   * @return {string}
   */
  function _cutPatterns(source, patterns) {

    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    len = patterns['length'];
    i = -1;
    while (++i < len)
      source = _cutPattern(source, patterns[i]);
    return source;
  }
  /// #}}} @func _cutPatterns

  /// #}}} @group main

  /// #{{{ @group delete

  /// #{{{ @func _deleteKey
  /**
   * @private
   * @param {(!Object|!Function)} source
   * @param {*} key
   * @param {boolean=} useMatch
   * @return {(!Object|!Function)}
   */
  function _deleteKey(source, key, useMatch) {

    /** @type {!RegExp} */
    var pattern;

    if ( $is.void(useMatch) )
      useMatch = $is.regx(key);

    if (!useMatch) {
      if ( $own(source, key) )
        delete source[key];
      return source;
    }

    pattern = key;
    for (key in source) {
      if ( $own(source, key) && $match(key, pattern) )
        delete source[key];
    }
    return source;
  }
  /// #}}} @func _deleteKey

  /// #{{{ @func _deleteKeys
  /**
   * @private
   * @param {(!Object|!Function)} source
   * @param {!Array} keys
   * @return {(!Object|!Function)}
   */
  function _deleteKeys(source, keys) {

    /** @type {boolean} */
    var useMatch;
    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    useMatch = $is.regx(keys[0]);
    len = keys['length'];
    i = -1;
    while (++i < len)
      source = _deleteKey(source, keys[i], useMatch);
    return source;
  }
  /// #}}} @func _deleteKeys

  /// #{{{ @func _deleteVal
  /**
   * @private
   * @param {(!Object|!Function)} source
   * @param {*} val
   * @return {(!Object|!Function)}
   */
  function _deleteVal(source, val) {

    /** @type {string} */
    var key;

    for (key in source) {
      if ( $own(source, key) && source[key] === val )
        delete source[key];
    }
    return source;
  }
  /// #}}} @func _deleteVal

  /// #{{{ @func _deleteValByType
  /**
   * @private
   * @param {(!Object|!Function)} source
   * @param {string} type
   * @return {(!Object|!Function)}
   */
  function _deleteValByType(source, type) {

    /** @type {string} */
    var key;

    for (key in source) {
      if ( $own(source, key) && is(type, source[key]) )
        delete source[key];
    }
    return source;
  }
  /// #}}} @func _deleteValByType

  /// #{{{ @func _deleteVals
  /**
   * @private
   * @param {(!Object|!Function)} source
   * @param {!Array} vals
   * @return {(!Object|!Function)}
   */
  function _deleteVals(source, vals) {

    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    len = vals['length'];
    i = -1;
    while (++i < len)
      source = _deleteVal(source, vals[i]);
    return source;
  }
  /// #}}} @func _deleteVals

  /// #}}} @group delete

  /// #{{{ @group splice

  /// #{{{ @func _spliceKey
  /**
   * @private
   * @param {!Array} source
   * @param {number} key
   * @return {!Array}
   */
  function _spliceKey(source, key) {

    /** @type {number} */
    var len;

    len = source['length'];

    if (key < 0)
      key += len;

    if (key < 0 || key >= len)
      return source;

    source['splice'](key, 1);
    return source;
  }
  /// #}}} @func _spliceKey

  /// #{{{ @func _spliceKeys
  /**
   * @private
   * @param {!Array} source
   * @param {!Array<number>} keys
   * @return {!Array}
   */
  function _spliceKeys(source, keys) {

    /** @type {number} */
    var first;
    /** @type {number} */
    var count;
    /** @type {number} */
    var i;

    if (!source['length'] || !keys['length'])
      return source;

    if (keys['length'] === 1)
      return _spliceKey(source, keys[0]);

    /**
     * @const {!Object<string, !Array<number>>}
     * @struct
     */
    var sorted = _sortIndexes(keys, source['length']);

    i = sorted.first['length'];
    while (i--) {
      first = sorted.first[i];
      count = sorted.last[i] - first + 1;
      source['splice'](first, count);
    }
    return source;
  }
  /// #}}} @func _spliceKeys

  /// #{{{ @func _spliceVal
  /**
   * @private
   * @param {!Array} source
   * @param {*} val
   * @return {!Array}
   */
  function _spliceVal(source, val) {

    /** @type {number} */
    var i;

    i = source['length'];
    while (i--) {
      if (source[i] === val)
        source['splice'](i, 1);
    }
    return source;
  }
  /// #}}} @func _spliceVal

  /// #{{{ @func _spliceValByType
  /**
   * @private
   * @param {!Array} source
   * @param {string} type
   * @return {!Array}
   */
  function _spliceValByType(source, type) {

    /** @type {number} */
    var i;

    i = source['length'];
    while (i--) {
      if ( is(type, source[i]) )
        source['splice'](i, 1);
    }
    return source;
  }
  /// #}}} @func _spliceValByType

  /// #{{{ @func _spliceVals
  /**
   * @private
   * @param {!Array} source
   * @param {!Array} vals
   * @return {!Array}
   */
  function _spliceVals(source, vals) {

    /** @type {*} */
    var val;
    /** @type {number} */
    var len;
    /** @type {number} */
    var ii;
    /** @type {number} */
    var i;

    len = vals['length'];
    i = source['length'];
    while (i--) {
      val = source[i];
      ii = len;
      while (ii--) {
        if (vals[ii] === val) {
          source['splice'](i, 1);
          break;
        }
      }
    }
    return source;
  }
  /// #}}} @func _spliceVals

  /// #}}} @group splice

  /// #{{{ @group filter

  /// #{{{ @func _filterObj
  /**
   * @private
   * @param {(!Object|!Function)} source
   * @param {!function(*=, string=, (!Object|!Function)=): *} filter
   * @param {?Object=} thisArg
   * @return {(!Object|!Function)}
   */
  function _filterObj(source, filter, thisArg) {

    /** @type {(!Object|!Function)} */
    var src;
    /** @type {string} */
    var key;

    if ( !$is.void(thisArg) )
      filter = _bind(filter, thisArg);

    src = filter['length'] > 2
      ? $is.fun(source)
        ? $cloneFun(source)
        : $cloneObj(source)
      : source;

    switch (filter['length']) {
      case 0:
        for (key in src) {
          if ( $own(src, key) && !filter() )
            delete source[key];
        }
        break;
      case 1:
        for (key in src) {
          if ( $own(src, key) && !filter(src[key]) )
            delete source[key];
        }
        break;
      case 2:
        for (key in src) {
          if ( $own(src, key) && !filter(src[key], key) )
            delete source[key];
        }
        break;
      default:
        for (key in src) {
          if ( $own(src, key) && !filter(src[key], key, src) )
            delete source[key];
        }
        break;
    }
    return source;
  }
  /// #}}} @func _filterObj

  /// #{{{ @func _filterArr
  /**
   * @private
   * @param {!Array} source
   * @param {!function(*=, number=, !Array=): *} filter
   * @param {?Object=} thisArg
   * @return {!Array}
   */
  function _filterArr(source, filter, thisArg) {

    /** @type {!Array} */
    var src;
    /** @type {number} */
    var i;

    if ( !$is.void(thisArg) )
      filter = _bind(filter, thisArg);

    src = filter['length'] > 2
      ? $cloneArr(source)
      : source;
    i = src['length'];

    switch (filter['length']) {
      case 0:
        while (i--) {
          if ( !filter() )
            source['splice'](i, 1);
        }
        break;
      case 1:
        while (i--) {
          if ( !filter(src[i]) )
            source['splice'](i, 1);
        }
        break;
      case 2:
        while (i--) {
          if ( !filter(src[i], i) )
            source['splice'](i, 1);
        }
        break;
      default:
        while (i--) {
          if ( !filter(src[i], i, src) )
            source['splice'](i, 1);
        }
        break;
    }
    return source;
  }
  /// #}}} @func _filterArr

  /// #}}} @group filter

  /// #{{{ @group sort

  /// #{{{ @func _sortIndexes
  /**
   * @private
   * @param {!Array<number>} indexes
   * @param {number} sourceLen
   * @return {!Object<string, !Array<number>>}
   */
  var _sortIndexes = (function() {

    /// #{{{ @func sortIndexes
    /**
     * @param {!Array<number>} indexes
     * @param {number} sourceLen
     * @return {!Object<string, !Array<number>>}
     */
    function sortIndexes(indexes, sourceLen) {
      setup();
      run(indexes, sourceLen);
      return result();
    }
    /// #}}} @func sortIndexes

    /// #{{{ @group Sort-Members

    /// #{{{ @member $first
    /**
     * @type {!Array<number>}
     */
    var $first;
    /// #}}} @member $first

    /// #{{{ @member $last
    /**
     * @type {!Array<number>}
     */
    var $last;
    /// #}}} @member $last

    /// #}}} @group Sort-Members

    /// #{{{ @group Sort-Methods

    /// #{{{ @method setup
    /**
     * @private
     * @return {void}
     */
    function setup() {
      $first = [];
      $last = [];
    }
    /// #}}} @method setup

    /// #{{{ @method run
    /**
     * @private
     * @param {!Array<number>} indexes
     * @param {number} sourceLen
     * @return {void}
     */
    function run(indexes, sourceLen) {

      /** @type {number} */
      var index;
      /** @type {number} */
      var len;
      /** @type {number} */
      var i;

      len = indexes['length'];
      i = 0;

      // push 1st index
      index = parse(indexes[i], sourceLen);
      while (index === -1 && ++i < len)
        index = parse(indexes[i], sourceLen);
      push(index);

      // push remaining indexes
      while (++i < len) {
        index = parse(indexes[i], sourceLen);
        if (index !== -1)
          sort(index, 0, $last['length']);
      }
    }
    /// #}}} @method run

    /// #{{{ @method result
    /**
     * @private
     * @return {!Object<string, !Array<number>>}
     */
    function result() {

      /**
       * @const {!Object<string, !Array<number>>}
       * @struct
       */
      var SORTED_INDEXES = {
        first: $first,
        last: $last
      };

      return SORTED_INDEXES;
    }
    /// #}}} @method result

    /// #{{{ @method parse
    /**
     * @private
     * @param {number} index
     * @param {number} len
     * @return {number}
     *   If invalid #index is given `-1` is returned.
     */
    function parse(index, len) {

      if (index < 0)
        index += len;

      return index < 0 || index >= len
        ? -1
        : index;
    }
    /// #}}} @method parse

    /// #{{{ @method push
    /**
     * @private
     * @param {number} index
     * @return {void}
     */
    function push(index) {
      $first['push'](index);
      $last['push'](index);
    }
    /// #}}} @method push

    /// #{{{ @method unshift
    /**
     * @private
     * @param {number} index
     * @return {void}
     */
    function unshift(index) {
      $first['unshift'](index);
      $last['unshift'](index);
    }
    /// #}}} @method unshift

    /// #{{{ @method insert
    /**
     * @private
     * @param {number} index
     * @param {number} pos
     * @return {void}
     */
    function insert(index, pos) {
      $first['splice'](pos, 0, index);
      $last['splice'](pos, 0, index);
    }
    /// #}}} @method insert

    /// #{{{ @method remove
    /**
     * @private
     * @param {number} index
     * @param {number} pos
     * @return {void}
     */
    function remove(pos) {
      $first['splice'](pos, 1);
      $last['splice'](pos, 1);
    }
    /// #}}} @method remove

    /// #{{{ @method sort
    /**
     * @private
     * @param {number} index
     * @param {number} left
     * @param {number} right
     * @return {void}
     */
    function sort(index, left, right) {

      /** @type {number} */
      var mid;
      /** @type {number} */
      var min;

      mid = (left + right) >>> 1;
      min = $first[mid];
      if (index < min)
        comparePrev(index, left, mid);
      else if (index > $last[mid])
        compareNext(index, mid, right);
    }
    /// #}}} @method sort

    /// #{{{ @method comparePrev
    /**
     * @private
     * @param {number} index
     * @param {number} left
     * @param {number} mid
     * @return {void}
     */
    function comparePrev(index, left, mid) {

      /** @type {number} */
      var prev;
      /** @type {number} */
      var min;
      /** @type {number} */
      var max;

      min = $first[mid];
      if (!mid) {
        if (index === --min)
          $first[mid] = index;
        else
          unshift(index);
        return;
      }
      prev = mid - 1;
      max = $last[prev];
      if (index === --min) {
        if (index === ++max) {
          $last[prev] = $last[mid];
          remove(mid);
        }
        else
          $first[mid] = index;
      }
      else if (index > max) {
        if (index === ++max)
          $last[prev] = index;
        else
          insert(index, mid);
      }
      else
        sort(index, left, prev);
    }
    /// #}}} @method comparePrev

    /// #{{{ @method compareNext
    /**
     * @private
     * @param {number} index
     * @param {number} mid
     * @param {number} right
     * @return {void}
     */
    function compareNext(index, mid, right) {

      /** @type {number} */
      var next;
      /** @type {number} */
      var min;
      /** @type {number} */
      var max;

      next = mid + 1;
      max = $last[mid];
      if (next === $last['length']) {
        if (index === ++max)
          $last[mid] = index;
        else
          push(index);
        return;
      }
      min = $first[next];
      if (index === ++max) {
        if (index === --min) {
          $last[mid] = $last[next];
          remove(next);
        }
        else
          $last[mid] = index;
      }
      else if (index < min) {
        if (index === --min)
          $first[next] = index;
        else
          insert(index, next);
      }
      else
        sort(index, next, right);
    }
    /// #}}} @method compareNext

    /// #}}} @group Sort-Methods

    return sortIndexes;
  })();
  /// #}}} @func _sortIndexes

  /// #}}} @group sort

  /// #{{{ @group bind

  /// #{{{ @func _bind
  /**
   * @private
   * @param {!function} func
   * @param {?Object} thisArg
   * @return {!function} 
   */
  function _bind(func, thisArg) {
    switch (func['length']) {
      case 0:
        return function filter() {
          return func['call'](thisArg);
        };
      case 1:
        return function filter(val) {
          return func['call'](thisArg, val);
        };
      case 2:
        return function filter(val, key) {
          return func['call'](thisArg, val, key);
        };
    }
    return function filter(val, key, obj) {
      return func['call'](thisArg, val, key, obj);
    };
  }
  /// #}}} @func _bind

  /// #}}} @group bind

  /// #{{{ @group is

  /// #{{{ @func _isIntArr
  /**
   * @private
   * @param {!Array<*>} vals
   * @return {boolean} 
   */
  function _isIntArr(vals) {

    /** @type {*} */
    var propVal;
    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    len = vals['length'];
    i = -1;
    while (++i < len) {
      propVal = vals[i];
      if ( !$is.num(propVal) || !$is.whole(propVal) )
        return NO;
    }
    return YES;
  }
  /// #}}} @func _isIntArr

  /// #{{{ @func _isNumArr
  /**
   * @private
   * @param {*} val
   * @return {boolean} 
   */
  function _isNumArr(val) {

    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    if ( !$is.arr(val) )
      return NO;

    len = val['length'];
    i = -1;
    while (++i < len) {
      if ( !$is.num(val[i]) )
        return NO;
    }
    return YES;
  }
  /// #}}} @func _isNumArr

  /// #{{{ @func _isWholeNumArr
  /**
   * @private
   * @param {!Array<number>} nums
   * @return {boolean} 
   */
  function _isWholeNumArr(nums) {

    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    len = nums['length'];
    i = -1;
    while (++i < len) {
      if ( !$is.whole(nums[i]) )
        return NO;
    }
    return YES;
  }
  /// #}}} @func _isWholeNumArr

  /// #}}} @group is

  /// #{{{ @group errors

  /// #{{{ @const _MK_ERR
  /**
   * @private
   * @const {!Object<string, !function>}
   * @struct
   */
  var _MK_ERR = $mkErrs('cut');
  /// #}}} @const _MK_ERR
  /// #insert @code MK_ERR ../macros/mk-err.js

  /// #}}} @group errors

  /// #if}}} @helpers cut

/// #ifnot{{{ @scope DOCS_ONLY
  return cut;
})();
/// #ifnot{{{ @scope SOLO
vitals['cut'] = cut;
/// #ifnot}}} @scope SOLO
/// #ifnot}}} @scope DOCS_ONLY
/// #}}} @super cut

/// #if{{{ @scope SOLO
var vitals = cut;
vitals['cut'] = cut;
/// #insert @code EXPORT ../macros/export.js
/// #insert @wrapper CLOSE ../macros/wrapper.js
/// #if}}} @scope SOLO

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
