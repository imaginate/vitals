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
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life> (https://imaginate.life)
 */

/// #if{{{ @scope SOLO
/// #insert @wrapper OPEN ../macros/wrapper.js
/// #include @core constants ../core/constants.js
/// #include @core helpers ../core/helpers.js
/// #ifnot{{{ @scope FS_ONLY
/// #include @helper $splitKeys ../helpers/split-keys.js
/// #ifnot}}} @scope FS_ONLY
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
 * @const {!Object<string, !Function>}
 * @dict
 */
var to = (function toPrivateScope() {
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
   * @type {!Object<string, !Function>}
   * @dict
   */
  var to = {};
  /// #ifnot}}} @scope DOCS_ONLY

  /// #ifnot{{{ @scope FS_ONLY
  /// #{{{ @submethod string
  /// #{{{ @docs string
  /// @section base
  /// @method vitals.to.string
  /// @alias vitals.to.str
  /**
   * @description
   *   Converts any value to a `string` with [String][string], the value's (if
   *   it is a `RegExp`) `toString` property, or optionally (if it is an
   *   `array`) [Array.prototype.join][join].
   * @public
   * @param {*} val
   * @param {(string|undefined)=} separator = `undefined`
   *   Only allowed for use if the #val is an `array`. If the #separator is
   *   defined, [Array.prototype.join][join] is called on the #val using the
   *   #separator value to join each indexed property.
   * @return {string}
   */
  /// #}}} @docs string
  /// #if{{{ @code string
  function toString(val, separator) {

    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #val defined', 'string');

      case 1:
        return $mkStr(val);

      default:
        if ( $is.void(separator) )
          return $mkStr(val);

        if ( !$is.arr(val) )
          throw _mkErr(new ERR, 'invalid #separator defined (' +
            'only allowed with an `array` #val)', 'string');
        if ( !$is.str(separator) )
          throw _mkTypeErr(new TYPE_ERR, 'separator', separator, 'string=',
            'string');

        return val['join'](separator);
    }
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
   *   Converts most [primitive][prim] values to a `number`.
   * @public
   * @param {(?string|?number|?boolean)} val
   *   If the #val is a `string`, [Number][number] is used to convert it to a
   *   `number`. Only [valid strings][str2num] are allowed.
   * @return {number}
   *   The return details are as follows (per #val data type):
   *   - *`boolean`*!$
   *     This method will return `1` for `true` or `0` for `false`.
   *   - *`number`*!$
   *     This method will return the value of #val.
   *   - *`string`*!$
   *     This method will return the result from [Number][number] unless it is
   *     `NaN`. If the result is `NaN`, an [Error][error] will be thrown.
   *   - *`null`*!$
   *     This method will return `0`.
   */
  /// #}}} @docs number
  /// #if{{{ @code number
  function toNumber(val) {

    if (arguments['length'] < 1)
      throw _mkErr(new ERR, 'no #val defined', 'number');

    if ( $is.num(val) )
      return val;
    if ( $is.nil(val) )
      return 0;
    if ( $is.bool(val) )
      return val
        ? 1
        : 0;

    if ( !$is.str(val) )
      throw _mkTypeErr(new TYPE_ERR, 'val', val, '?string|?number|?boolean',
        'number');

    val = NUM(val);

    if ( $is.nan(val) )
      throw _mkRangeErr(new RANGE_ERR, 'val', 'https://github.com/' +
        'imaginate/vitals/wiki/vitals.to#user-content-number', 'number');

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
   *   Converts any value into a `boolean`.
   * @public
   * @param {*} val
   * @return {boolean}
   */
  /// #}}} @docs boolean
  /// #if{{{ @code boolean
  function toBoolean(val) {

    if (arguments['length'] < 1)
      throw _mkErr(new ERR, 'no #val defined', 'boolean');

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
   *   Converts a `string` or `number` into an `array`.
   * @public
   * @param {(string|number)} val
   *   The #val details are as follows (per #val type):
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

    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #val defined', 'array');

      case 1:
        if ( $is.num(val) )
          return new ARR(val);

        if ( !$is.str(val) )
          throw _mkTypeErr(new TYPE_ERR, 'val', val, 'string|number',
            'array');

        return $splitKeys(val);

      default:
        if ( $is.num(val) ) {
          if ( !$is.void(separator) )
            throw _mkErr(new ERR, 'invalid #separator defined (' +
              'only allowed with a `string` #val)', 'array');

          return new ARR(val);
        }

        if ( !$is.str(val) )
          throw _mkTypeErr(new TYPE_ERR, 'val', val, 'string|number',
            'array');

        if ( !$is.regx(separator) )
          separator = $mkStr(separator);

        return val['split'](separator);
    }
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
  /// @alias vitals.to.re
  /**
   * @description
   *   Converts a `string` into a `RegExp`.
   * @public
   * @param {string} source
   *   The [RegExp.prototype.source][regx-src] pattern for the new `RegExp`.
   * @param {(string|undefined)=} flags
   *   If #flags is defined, it is the [RegExp flags][regexp] to assign to the
   *   new `RegExp`.
   * @return {!RegExp}
   */
  /// #}}} @docs regexp
  /// #if{{{ @code regexp
  function toRegExp(source, flags) {

    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #source defined', 'regexp');

      case 1:
        if ( !$is.str(source) )
          throw _mkTypeErr(new TYPE_ERR, 'source', source, 'string',
            'regexp');

        return new REGX(source);

      default:
        if ( !$is.str(source) )
          throw _mkTypeErr(new TYPE_ERR, 'source', source, 'string',
            'regexp');

        if ( $is.void(flags) )
          return new REGX(source);

        if ( !$is.str(flags) )
          throw _mkTypeErr(new TYPE_ERR, 'flags', flags, 'string=', 'regexp');

        return new REGX(source, flags);
    }
  }
  to['regexp'] = toRegExp;
  to['regex'] = toRegExp;
  to['re'] = toRegExp;
  /// #if}}} @code regexp
  /// #}}} @submethod regexp

  /// #{{{ @submethod upperCase
  /// #{{{ @docs upperCase
  /// @section base
  /// @method vitals.to.upperCase
  /// @alias vitals.to.upper
  /**
   * @description
   *   Converts all characters in a `string` to upper case.
   * @public
   * @param {string} source
   * @return {string}
   */
  /// #}}} @docs upperCase
  /// #if{{{ @code upperCase
  function toUpperCase(source) {

    if (arguments['length'] < 1)
      throw _mkErr(new ERR, 'no #source defined', 'upperCase');
    if ( !$is.str(source) )
      throw _mkTypeErr(new TYPE_ERR, 'source', source, 'string', 'upperCase');

    return source['toUpperCase']();
  }
  to['upperCase'] = toUpperCase;
  to['upper'] = toUpperCase;
  /// #if}}} @code upperCase
  /// #}}} @submethod upperCase

  /// #{{{ @submethod lowerCase
  /// #{{{ @docs lowerCase
  /// @section base
  /// @method vitals.to.lowerCase
  /// @alias vitals.to.lower
  /**
   * @description
   *   Converts all characters in a `string` to lower case.
   * @public
   * @param {string} source
   * @return {string}
   */
  /// #}}} @docs lowerCase
  /// #if{{{ @code lowerCase
  function toLowerCase(source) {

    if (arguments['length'] < 1)
      throw _mkErr(new ERR, 'no #source defined', 'lowerCase');
    if ( !$is.str(source) )
      throw _mkTypeErr(new TYPE_ERR, 'source', source, 'string', 'lowerCase');

    return source['toLowerCase']();
  }
  to['lowerCase'] = toLowerCase;
  to['lower'] = toLowerCase;
  /// #if}}} @code lowerCase
  /// #}}} @submethod lowerCase
  /// #ifnot}}} @scope FS_ONLY

  /// #if{{{ @scope FS
  /// #{{{ @submethod file
  /// #{{{ @docs file
  /// @section fs
  /// @method vitals.to.file
  /**
   * @description
   *   Write the contents of a file to a new or existing file.
   * @public
   * @param {(!Buffer|string)} contents
   * @param {string} dest
   *   Must be a valid filepath to a new or existing file.
   * @param {(?Object|?string|undefined)=} opts
   *   If the #opts is `null` or a `string` value, it sets the #opts.encoding
   *   option to its value.
   * @param {?string=} opts.encoding = `"utf8"`
   *   The #opts.encoding option sets the character encoding for the
   *   #contents. If it is `null`, no character encoding is set.
   * @param {?string=} opts.encode
   *   An alias for the #opts.encoding option.
   * @param {?string=} opts.eol = `null`
   *   The #opts.eol option sets the end of line character to use when
   *   normalizing the #contents before they are saved to the #dest. If
   *   it is set to `null`, no end of line character normalization is
   *   completed. The optional `string` values are as follows (values are
   *   **not** case-sensitive):
   *   - `"LF"`
   *   - `"CR"`
   *   - `"CRLF"`
   * @return {(!Buffer|string)}
   *   The original #contents (without any normalization applied).
   */
  /// #}}} @docs file
  /// #if{{{ @code file
  function toFile(contents, dest, opts) {

    /** @type {string} */
    var encoding;

    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #contents defined', 'file');

      case 1:
        throw _mkErr(new ERR, 'no #dest defined', 'file');

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
          opts['encoding'] = NIL;
          break;
        }

        if ( $is.str(opts) ) {
          encoding = opts;

          if (!encoding)
            throw _mkErr(new ERR, 'invalid empty #opts.encoding `string`',
              'file');

          /** @dict */
          opts = $cloneObj(_DFLT_FILE_OPTS);
          opts['encoding'] = encoding;
          break;
        }

        if ( !$is.obj(opts) )
          throw _mkTypeErr(new TYPE_ERR, 'opts', opts, '(?Object|?string)=',
            'file');

        /** @dict */
        opts = $cloneObj(opts);

        if ( !$hasOpt(opts, 'encode') )
          opts['encode'] = VOID;
        else if ( $is.str(opts['encode']) ) {
          if (!opts['encode'])
            throw _mkErr(new ERR, 'invalid empty #opts.encode `string`',
              'file');
        }
        else if ( !$is.nil(opts['encode']) )
          throw _mkTypeErr(new TYPE_ERR, 'opts.encode', opts['encode'],
            '?string=', 'file');

        if ( !$hasOpt(opts, 'encoding') )
          opts['encoding'] = _DFLT_FILE_OPTS['encoding'];
        else if ( $is.str(opts['encoding']) ) {
          if (!opts['encoding'])
            throw _mkErr(new ERR, 'invalid empty #opts.encoding `string`',
              'file');
        }
        else if ( !$is.nil(opts['encoding']) )
          throw _mkTypeErr(new TYPE_ERR, 'opts.encoding', opts['encoding'],
            '?string=', 'file');

        if ( !$hasOpt(opts, 'eol') )
          opts['eol'] = _DFLT_FILE_OPTS['eol'];
        else if ( $is.str(opts['eol']) ) {
          if ( !$is.eol(opts['eol']) )
            throw _mkRangeErr(new RANGE_ERR, 'opts.eol',
              [ 'LF', 'CR', 'CRLF' ], 'file');

          opts['eol'] = opts['eol']['toUpperCase']();
        }
        else if ( !$is.nil(opts['eol']) )
          throw _mkTypeErr(new TYPE_ERR, 'opts.eol', opts['eol'], '?string=',
            'file');
    }

    if ( !$is.str(dest) )
      throw _mkTypeErr(new TYPE_ERR, 'dest', dest, 'string', 'file');
    else if (!dest)
      throw _mkErr(new ERR, 'invalid empty #dest `string`', 'file');

    if ( $is.buff(contents) )
      return _toFileByBuff(contents, dest, opts);

    if ( !$is.str(contents) )
      throw _mkTypeErr(new TYPE_ERR, 'contents', contents, '!Buffer|string',
        'file');

    return _toFileByStr(contents, dest, opts);
  }
  to['file'] = toFile;
  /// #if}}} @code file
  /// #}}} @submethod file
  /// #if}}} @scope FS

  /// #if{{{ @helpers to

  /// #if{{{ @scope FS
  /// #{{{ @group main

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

    if (opts['encoding'])
      $writeFile(dest, _contents, opts['encoding']);
    else
      $writeFile(dest, _contents);

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

    if (opts['eol'])
      _contents = $fixEol(_contents, opts['eol']);

    if (opts['encoding'])
      $writeFile(dest, _contents, opts['encoding']);
    else
      $writeFile(dest, _contents);

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

  /// #{{{ @const _MK_ERR
  /**
   * @private
   * @const {!Object<string, !function>}
   * @struct
   */
  var _MK_ERR = $mkErrs('to');
  /// #}}} @const _MK_ERR
  /// #insert @code MK_ERR ../macros/mk-err.js

  /// #}}} @group errors

  /// #if}}} @helpers to

/// #ifnot{{{ @scope DOCS_ONLY
  return to;
})();
/// #ifnot{{{ @scope SOLO
vitals['to'] = to;
/// #ifnot}}} @scope SOLO
/// #ifnot}}} @scope DOCS_ONLY
/// #}}} @super to

/// #if{{{ @scope SOLO
var vitals = to;
vitals['to'] = to;
/// #insert @code EXPORT ../macros/export.js
/// #insert @wrapper CLOSE ../macros/wrapper.js
/// #if}}} @scope SOLO

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
