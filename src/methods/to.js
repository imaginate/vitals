/**
 * ---------------------------------------------------------------------------
 * VITALS.TO
 * ---------------------------------------------------------------------------
 * @section base
 * @section fs
 * @version 5.0.0
 * @see [vitals.to](https://github.com/imaginate/vitals/wiki/vitals.to)
 *
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life>
 */

/// #if{{{ @scope SOLO
/// #include @core OPEN ../core/open.js
/// #include @helper $splitKeys ../helpers/split-keys.js
/// #if{{{ @scope FS
/// #include @helper $fixEol ../helpers/fix-eol.js
/// #include @helper $hasOpt ../helpers/has-opt.js
/// #include @helper $cloneObj ../helpers/clone-obj.js
/// #include @helper $writeFile ../helpers/write-file.js
/// #if}}} @scope FS
/// #if}}} @scope SOLO

/// #{{{ @super to
/// #ifnot{{{ @scope DOCS_ONLY
/**
 * @public
 * @const {!Object}
 * @dict
 */
$VITALS['to'] = (function __vitalsTo__() {
/// #ifnot}}} @scope DOCS_ONLY

  /// #if{{{ @docrefs to
  /// @docref [join]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/join)
  /// @docref [prim]:(https://developer.mozilla.org/en-US/docs/Glossary/Primitive)
  /// @docref [error]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error#Error_types)
  /// @docref [split]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split)
  /// @docref [number]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
  /// @docref [regexp]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp)
  /// @docref [string]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
  /// @docref [str2num]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number#Convert_numeric_strings_to_numbers)
  /// @docref [arr-length]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/length)
  /// @docref [regx-src]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/source)
  /// #if}}} @docrefs to

  /// #ifnot{{{ @scope DOCS_ONLY
  /**
   * @public
   * @type {!Object}
   * @dict
   */
  var to = {};
  /// #ifnot}}} @scope DOCS_ONLY

  /// #{{{ @submethod string
  /// #{{{ @docs string
  /// @section base
  /// @method vitals.to.string
  /// @alias vitals.to.str
  /**
   * @description
   *   The @to#string method converts any value into a `string`.
   * @public
   * @param {*} val
   * @return {string}
   *   The returned `string` conversion of #val uses the following rules in
   *   listed order (per #val data type):
   *   - *`string`*!$
   *     This method returns unchanged #val.
   *   - *`!Object|!Function|!Array|!Arguments|!RegExp|!Date|!object`*!$
   *     If the #val contains a `function` property named `"toString"`, this
   *     method calls `val.toString`, converts its result to a `string` with
   *     the [String][string] constructor, and returns the final result.
   *     Otherwise, this method returns the result of [String][string] called
   *     on the #val.
   *     ```
   *     if ( !('toString' in val) || !isFunction(val.toString) ) {
   *       return String(val);
   *     }
   *     val = val.toString();
   *     return isString(val)
   *       ? val
   *       : String(val);
   *     ```
   *   - *`undefined`*!$
   *     This method returns `"undefined"`.
   *   - *`null`*!$
   *     This method returns `"null"`.
   *   - *`boolean`*!$
   *     This method returns `"true"` or `"false"`.
   *   - *`nan`*!$
   *     This method returns `"NaN"`.
   *   - *`*`*!$
   *     This method returns the result of [String][string] called on the
   *     #val.
   *     ```
   *     return String(val);
   *     ```
   */
  /// #}}} @docs string
  /// #if{{{ @code string
  function toString(val) {

    if (!arguments['length']) {
      throw _MKERR_STR.noArg(new $ERR, 'val');
    }

    return $mkStr(val);
  }
  to['string'] = toString;
  to['str'] = toString;
  /// #if}}} @code string
  /// #}}} @submethod string

  /// #{{{ @submethod number
  /// #{{{ @docs number
  /// @section base
  /// @method vitals.to.number
  /// @alias vitals.to.num
  /**
   * @description
   *   The @to#number method converts most [primitive][prim] values to a
   *   `number`.
   * @public
   * @param {(?string|?number|?boolean)} val
   *   If the #val is a `string`, the [Number][number] constructor is used to
   *   convert a [valid string][str2num] #val into a `number`.
   * @return {number}
   *   This method's return details are as follows (per #val data type):
   *   - *`number`*!$
   *     This method will return the unchanged #val.
   *   - *`null`*!$
   *     This method will return `0`.
   *   - *`boolean`*!$
   *     This method will return `1` for `true` or `0` for `false`.
   *   - *`string`*!$
   *     This method will return the result from a call of [Number][number] on
   *     the #val unless the result is `NaN`. If the result is `NaN`, a
   *     [RangeError][error] will be thrown.
   */
  /// #}}} @docs number
  /// #if{{{ @code number
  function toNumber(val) {

    if (!arguments['length']) {
      throw _MKERR_NUM.noArg(new $ERR, 'val');
    }

    if ( $is.num(val) ) {
      return val;
    }
    if ( $is.nil(val) ) {
      return 0;
    }
    if ( $is.bool(val) ) {
      return val
        ? 1
        : 0;
    }

    if ( !$is.str(val) ) {
      throw _MKERR_NUM.type(new $TYPE_ERR, 'val', val,
        '?string|?number|?boolean');
    }

    val = $NUM(val);

    if ( $is.nan(val) ) {
      throw _MKERR_NUM.range(new $RANGE_ERR, 'val', 'https://developer.'
        + 'mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/'
        + 'Number#Convert_numeric_strings_to_numbers');
    }

    return val;
  }
  to['number'] = toNumber;
  to['num'] = toNumber;
  /// #if}}} @code number
  /// #}}} @submethod number

  /// #{{{ @submethod boolean
  /// #{{{ @docs boolean
  /// @section base
  /// @method vitals.to.boolean
  /// @alias vitals.to.bool
  /**
   * @description
   *   The @to#boolean method converts any value into a `boolean`.
   * @public
   * @param {*} val
   * @return {boolean}
   */
  /// #}}} @docs boolean
  /// #if{{{ @code boolean
  function toBoolean(val) {

    if (!arguments['length']) {
      throw _MKERR_BOOL.noArg(new $ERR, 'val');
    }

    return !!val;
  }
  to['boolean'] = toBoolean;
  to['bool'] = toBoolean;
  /// #if}}} @code boolean
  /// #}}} @submethod boolean

  /// #{{{ @submethod array
  /// #{{{ @docs array
  /// @section base
  /// @method vitals.to.array
  /// @alias vitals.to.arr
  /**
   * @description
   *   The @to#array method converts a `string` or `number` into an `array`.
   * @public
   * @param {(string|number)} val
   *   The details are as follows (per #val data type):
   *   - *`string`*!$
   *     [String.prototype.split][split] is called on the #val.
   *   - *`number`*!$
   *     A new `array` with #val [length][arr-length] is created.
   * @param {*=} separator
   *   Only allowed for use if the #val is a `string`. The #separator is used
   *   to [split][split] the `string` into `array` properties. If the
   *   #separator is defined and is not a `RegExp`, it is converted into a
   *   `string`. If the #separator is **not** defined, one of the following
   *   values is used to [split][split] the `string` (values listed in order
   *   of rank):
   *   - `", "`
   *   - `","`
   *   - `"|"`
   *   - `" "`
   * @return {!Array}
   */
  /// #}}} @docs array
  /// #if{{{ @code array
  function toArray(val, separator) {

    /** @type {number} */
    var len;

    len = arguments['length'];

    if (!len) {
      throw _MKERR_ARR.noArg(new $ERR, 'val');
    }

    if ( $is.num(val) ) {
      if ( len > 1 && !$is.void(separator) ) {
        throw _MKERR_ARR.type(new $TYPE_ERR, 'separator', separator,
          'undefined');
      }
      return new $ARR(val);
    }

    if ( !$is.str(val) ) {
      throw _MKERR_ARR.type(new $TYPE_ERR, 'val', val, 'string|number');
    }

    if (len === 1) {
      return $splitKeys(val);
    }

    if ( !$is.regx(separator) ) {
      separator = $mkStr(separator);
    }

    return val['split'](separator);
  }
  to['array'] = toArray;
  to['arr'] = toArray;
  /// #if}}} @code array
  /// #}}} @submethod array

  /// #{{{ @submethod regexp
  /// #{{{ @docs regexp
  /// @section base
  /// @method vitals.to.regexp
  /// @alias vitals.to.regex
  /// @alias vitals.to.regx
  /// @alias vitals.to.re
  /**
   * @description
   *   The @to#regexp method converts a `string` into a `RegExp`.
   * @public
   * @param {string} source
   *   The [RegExp.prototype.source][regx-src] pattern for the new `RegExp`.
   * @param {(string|undefined)=} flags
   *   If the #flags is defined, it is the [RegExp flags][regexp] to assign to
   *   the new `RegExp`.
   * @return {!RegExp}
   */
  /// #}}} @docs regexp
  /// #if{{{ @code regexp
  function toRegExp(source, flags) {

    /** @type {number} */
    var len;

    len = arguments['length'];

    if (!len) {
      throw _MKERR_REGX.noArg(new $ERR, 'source');
    }

    if ( !$is.str(source) ) {
      throw _MKERR_REGX.type(new $TYPE_ERR, 'source', source, 'string');
    }

    if ( len === 1 || $is.void(flags) ) {
      return new REGX(source);
    }

    if ( !$is.str(flags) ) {
      throw _MKERR_REGX.type(new $TYPE_ERR, 'flags', flags, 'string=');
    }

    return new REGX(source, flags);
  }
  to['regexp'] = toRegExp;
  to['regex'] = toRegExp;
  to['regx'] = toRegExp;
  to['re'] = toRegExp;
  /// #if}}} @code regexp
  /// #}}} @submethod regexp

  /// #{{{ @submethod upper
  /// #{{{ @docs upper
  /// @section base
  /// @method vitals.to.upper
  /// @alias vitals.to.upperCase
  /// @alias vitals.to.uppercase
  /**
   * @description
   *   The @to#upper method converts all characters in a `string` to upper
   *   case.
   * @public
   * @param {string} source
   * @return {string}
   */
  /// #}}} @docs upper
  /// #if{{{ @code upper
  function toUpperCase(source) {

    if (!arguments['length']) {
      throw _MKERR_UPPER.noArg(new $ERR, 'source');
    }
    if ( !$is.str(source) ) {
      throw _MKERR_UPPER.type(new $TYPE_ERR, 'source', source, 'string');
    }

    return source['toUpperCase']();
  }
  to['upperCase'] = toUpperCase;
  to['uppercase'] = toUpperCase;
  to['upper'] = toUpperCase;
  /// #if}}} @code upper
  /// #}}} @submethod upper

  /// #{{{ @submethod lower
  /// #{{{ @docs lower
  /// @section base
  /// @method vitals.to.lower
  /// @alias vitals.to.lowerCase
  /// @alias vitals.to.lowercase
  /**
   * @description
   *   The @to#lower method converts all characters in a `string` to lower
   *   case.
   * @public
   * @param {string} source
   * @return {string}
   */
  /// #}}} @docs lower
  /// #if{{{ @code lower
  function toLowerCase(source) {

    if (!arguments['length']) {
      throw _MKERR_LOWER.noArg(new $ERR, 'source');
    }
    if ( !$is.str(source) ) {
      throw _MKERR_LOWER.type(new $TYPE_ERR, 'source', source, 'string');
    }

    return source['toLowerCase']();
  }
  to['lowerCase'] = toLowerCase;
  to['lowercase'] = toLowerCase;
  to['lower'] = toLowerCase;
  /// #if}}} @code lower
  /// #}}} @submethod lower

  /// #if{{{ @scope FS

  /// #{{{ @submethod file
  /// #{{{ @docs file
  /// @section fs
  /// @method vitals.to.file
  /**
   * @description
   *   The @to#file method writes user-defined #content to a new or existing
   *   file.
   * @public
   * @param {string} dest
   *   The #dest must be a valid absolute or relative path to a new or
   *   existing regular file.
   * @param {(!Buffer|string)} content
   * @param {(?Object|?string|undefined)=} opts
   *   If the #opts is `null` or a `string` value, it sets the #opts.encoding
   *   option to its value.
   * @param {?string=} opts.encoding = `"utf8"`
   *   The #opts.encoding option sets the character encoding for the
   *   #content. If it is `null`, no character encoding is set.
   * @param {?string=} opts.encode
   *   An alias for the #opts.encoding option.
   * @param {?string=} opts.eol = `null`
   *   The #opts.eol option sets the end of line character to use when
   *   normalizing the #content before they are saved to the #dest. If
   *   it is set to `null`, no end of line character normalization is
   *   completed. The optional `string` values are as follows (values are
   *   **not** case-sensitive):
   *   - `"LF"`
   *   - `"CR"`
   *   - `"CRLF"`
   * @return {(!Buffer|string)}
   *   The original #content without any normalization applied.
   */
  /// #}}} @docs file
  /// #if{{{ @code file
  function toFile(dest, content, opts) {

    /** @type {string} */
    var encoding;

    switch (arguments['length']) {
      case 0:
        throw _MKERR_FILE.noArg(new $ERR, 'dest');
      case 1:
        throw _MKERR_FILE.noArg(new $ERR, 'content');
      case 2:
        /** @dict */
        opts = $cloneObj(_DFLT_FILE_OPTS);
        break;
      default:
        if ( $is.void(opts) ) {
          /** @dict */
          opts = $cloneObj(_DFLT_FILE_OPTS);
          break;
        }

        if ( $is.nil(opts) ) {
          /** @dict */
          opts = $cloneObj(_DFLT_FILE_OPTS);
          opts['encoding'] = $NIL;
          break;
        }

        if ( $is.str(opts) ) {
          encoding = opts;
          if (!encoding) {
            throw _MKERR_FILE.misc(new $ERR, 'invalid empty #opts.encoding '
              + '`string`');
          }
          /** @dict */
          opts = $cloneObj(_DFLT_FILE_OPTS);
          opts['encoding'] = encoding;
          break;
        }

        if ( !$is.obj(opts) ) {
          throw _MKERR_FILE.type(new $TYPE_ERR, 'opts', opts,
            '(?Object|?string)=');
        }

        /** @dict */
        opts = $cloneObj(opts);

        if ( !$hasOpt(opts, 'encode') ) {
          opts['encode'] = $VOID;
        }
        else if ( $is.str(opts['encode']) ) {
          if (!opts['encode']) {
            throw _MKERR_FILE.misc(new $ERR, 'invalid empty #opts.encode '
              + '`string`');
          }
        }
        else if ( !$is.nil(opts['encode']) ) {
          throw _MKERR_FILE.type(new $TYPE_ERR, 'opts.encode', opts['encode'],
            '?string=');
        }

        if ( !$hasOpt(opts, 'encoding') ) {
          opts['encoding'] = _DFLT_FILE_OPTS['encoding'];
        }
        else if ( $is.str(opts['encoding']) ) {
          if (!opts['encoding']) {
            throw _MKERR_FILE.misc(new $ERR, 'invalid empty #opts.encoding '
              + '`string`');
          }
        }
        else if ( !$is.nil(opts['encoding']) ) {
          throw _MKERR_FILE.type(new $TYPE_ERR, 'opts.encoding',
            opts['encoding'], '?string=');
        }

        if ( !$hasOpt(opts, 'eol') ) {
          opts['eol'] = _DFLT_FILE_OPTS['eol'];
        }
        else if ( $is.str(opts['eol']) ) {
          if ( !$is.eol(opts['eol']) ) {
            throw _MKERR_FILE.range(new $RANGE_ERR, 'opts.eol', _EOL_OPTS);
          }
          opts['eol'] = opts['eol']['toUpperCase']();
        }
        else if ( !$is.nil(opts['eol']) ) {
          throw _MKERR_FILE.type(new $TYPE_ERR, 'opts.eol', opts['eol'],
            '?string=');
        }
    }

    if ( !$is.str(dest) ) {
      throw _MKERR_FILE.type(new $TYPE_ERR, 'dest', dest, 'string');
    }
    else if (!dest) {
      throw _MKERR_FILE.misc(new $ERR, 'invalid empty #dest `string`');
    }

    if ( $is.buff(content) ) {
      return _toFileByBuff(content, dest, opts);
    }

    if ( !$is.str(content) ) {
      throw _MKERR_FILE.type(new $TYPE_ERR, 'content', content,
        '!Buffer|string');
    }

    return _toFileByStr(content, dest, opts);
  }
  to['file'] = toFile;
  /// #if}}} @code file
  /// #}}} @submethod file

  /// #if}}} @scope FS

  /// #if{{{ @helpers to

  /// #if{{{ @scope FS

  /// #{{{ @group main

  /// #{{{ @const _EOL_OPTS
  /**
   * @private
   * @const {!Array<string>}
   */
  var _EOL_OPTS = [ 'LF', 'CR', 'CRLF' ];
  /// #}}} @const _EOL_OPTS

  /// #{{{ @func _toFileByBuff
  /**
   * @private
   * @param {!Buffer} contents
   * @param {string} dest
   * @param {!Object} opts
   * @return {!Buffer}
   */
  function _toFileByBuff(contents, dest, opts) {

    /** @type {(!Buffer|string)} */
    var _contents;

    _contents = contents;

    if (opts['eol']) {
      _contents = _contents['toString']();
      _contents = $fixEol(_contents, opts['eol']);
    }

    if (opts['encoding']) {
      $writeFile(dest, _contents, opts['encoding']);
    }
    else {
      $writeFile(dest, _contents);
    }

    return contents;
  }
  /// #}}} @func _toFileByBuff

  /// #{{{ @func _toFileByStr
  /**
   * @private
   * @param {string} contents
   * @param {string} dest
   * @param {!Object} opts
   * @return {string}
   */
  function _toFileByStr(contents, dest, opts) {

    /** @type {string} */
    var _contents;

    _contents = contents;

    if (opts['eol']) {
      _contents = $fixEol(_contents, opts['eol']);
    }

    if (opts['encoding']) {
      $writeFile(dest, _contents, opts['encoding']);
    }
    else {
      $writeFile(dest, _contents);
    }

    return contents;
  }
  /// #}}} @func _toFileByStr

  /// #}}} @group main

  /// #{{{ @group defaults

  /// #{{{ @const _DFLT_FILE_OPTS
  /**
   * @private
   * @const {!Object<string, *>}
   * @dict
   */
  var _DFLT_FILE_OPTS = {
    'eol': NIL,
    'encoding': 'utf8'
  };
  /// #}}} @const _DFLT_FILE_OPTS

  /// #}}} @group defaults

  /// #if}}} @scope FS

  /// #{{{ @group errors

  /// #{{{ @const _MKERR_STR
  /**
   * @private
   * @const {!ErrorMaker}
   * @struct
   */
  var _MKERR_STR = $mkErr('to', 'string');
  /// #}}} @const _MKERR_STR

  /// #{{{ @const _MKERR_NUM
  /**
   * @private
   * @const {!ErrorMaker}
   * @struct
   */
  var _MKERR_NUM = $mkErr('to', 'number');
  /// #}}} @const _MKERR_NUM

  /// #{{{ @const _MKERR_BOOL
  /**
   * @private
   * @const {!ErrorMaker}
   * @struct
   */
  var _MKERR_BOOL = $mkErr('to', 'boolean');
  /// #}}} @const _MKERR_BOOL

  /// #{{{ @const _MKERR_ARR
  /**
   * @private
   * @const {!ErrorMaker}
   * @struct
   */
  var _MKERR_ARR = $mkErr('to', 'array');
  /// #}}} @const _MKERR_ARR

  /// #{{{ @const _MKERR_REGX
  /**
   * @private
   * @const {!ErrorMaker}
   * @struct
   */
  var _MKERR_REGX = $mkErr('to', 'regexp');
  /// #}}} @const _MKERR_REGX

  /// #{{{ @const _MKERR_UPPER
  /**
   * @private
   * @const {!ErrorMaker}
   * @struct
   */
  var _MKERR_UPPER = $mkErr('to', 'upper');
  /// #}}} @const _MKERR_UPPER

  /// #{{{ @const _MKERR_LOWER
  /**
   * @private
   * @const {!ErrorMaker}
   * @struct
   */
  var _MKERR_LOWER = $mkErr('to', 'lower');
  /// #}}} @const _MKERR_LOWER

  /// #if{{{ @scope FS

  /// #{{{ @const _MKERR_FILE
  /**
   * @private
   * @const {!ErrorMaker}
   * @struct
   */
  var _MKERR_FILE = $mkErr('to', 'file');
  /// #}}} @const _MKERR_FILE

  /// #if}}} @scope FS

  /// #}}} @group errors

  /// #if}}} @helpers to

/// #ifnot{{{ @scope DOCS_ONLY
  return to;
})();
/// #ifnot}}} @scope DOCS_ONLY
/// #}}} @super to

/// #if{{{ @scope SOLO
/// #include @core CLOSE ../core/close.js
/// #if}}} @scope SOLO

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
