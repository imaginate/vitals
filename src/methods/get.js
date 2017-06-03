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
/// #include @helper $addSlash ../helpers/add-slash.js
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
  /// @docref [join]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/join)
  /// @docref [pipe]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp#alternation)
  /// @docref [test]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test)
  /// @docref [equal]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness)
  /// @docref [error]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)
  /// @docref [source]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/source)
  /// @docref [string]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
  /// @docref [special]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp#Special_characters_meaning_in_regular_expressions)
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
  /// #{{{ @submethod file
  /// @section fs
  /// @method vitals.get.file
  /**
   * @description
   *   Gets the contents of a file.
   * @public
   * @param {string} path
   * @param {(?Object|?boolean)=} opts
   *   If the #opts is a `boolean` value, it sets the #opts.buffer option to
   *   its value.
   * @param {boolean=} opts.buffer = `false`
   *   If set to `true`, the #opts.buffer option directs @get#file to not
   *   convert the `buffer` of the #path file's contents into a `string`
   *   before returning it (i.e. do not apply any normalization to the #path
   *   contents).
   * @param {string=} opts.encoding = `"utf8"`
   *   The #opts.encoding option only applies if #opts.buffer is `false`.
   * @param {?string=} opts.eol = `"LF"`
   *   The #opts.eol option only applies if #opts.buffer is `false`. It sets
   *   the end of line character to use when normalizing the #path contents
   *   before they are returned. If #opts.eol is set to `null`, no end of line
   *   character normalization is completed. The optional `string` values are
   *   as follows (values are **not** case-sensitive):
   *   - `"LF"`
   *   - `"CR"`
   *   - `"CRLF"`
   * @return {(!Buffer|string)}
   */
  function getFile(path, opts) {

    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #path defined', 'file');

      case 1:
        /** @dict */
        opts = $cloneObj(_DFLT_FILE_OPTS);
        break;

      default:
        if ( $is.void(opts) || $is.nil(opts) ) {
          /** @dict */
          opts = $cloneObj(_DFLT_FILE_OPTS);
          break;
        }

        if ( $is.bool(opts) ) {
          if (opts) {
            /** @dict */
            opts = $cloneObj(_DFLT_FILE_OPTS);
            opts['buffer'] = YES;
          }
          else {
            /** @dict */
            opts = $cloneObj(_DFLT_FILE_OPTS);
            opts['buffer'] = NO;
          }
          break;
        }

        if ( !$is.obj(opts) )
          throw _mkTypeErr(new TYPE_ERR, 'opts', opts, '(?Object|?boolean)=',
            'file');

        /** @dict */
        opts = $cloneObj(opts);

        if ( !$hasOpt(opts, 'buffer') )
          opts['buffer'] = _DFLT_FILE_OPTS['buffer'];
        else if ( !$is.bool(opts['buffer']) )
          throw _mkTypeErr(new TYPE_ERR, 'opts.buffer', opts['buffer'],
            'boolean=', 'file');

        if ( !$hasOpt(opts, 'encoding') )
          opts['encoding'] = _DFLT_FILE_OPTS['encoding'];
        else if ( !$is.str(opts['encoding']) )
          throw _mkTypeErr(new TYPE_ERR, 'opts.encoding', opts['encoding'],
            'string=', 'file');
        else if ( !opts['encoding'] )
          throw _mkErr(new ERR, 'invalid empty #opts.encoding `string`',
            'file');

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

    if ( !$is.str(path) )
      throw _mkTypeErr(new TYPE_ERR, 'path', path, 'string', 'file');
    else if (!path)
      throw _mkErr(new ERR, 'invalid empty #path `string`', 'file');
    else if ( !$is.file(path) )
      throw _mkErr(new ERR, 'invalid #path file path `' + path + '`',
        'file');

    return _getFile(path, opts);
  }
  get['file'] = getFile;
  /// #}}} @submethod file

  /// #{{{ @submethod dirpaths
  /// @section fs
  /// @method vitals.get.dirpaths
  /**
   * @description
   *   Gets all of the directory paths within a directory tree.
   * @public
   * @param {string} source
   *   Must be a valid directory path.
   * @param {(?Object|?boolean)=} opts
   *   If the #opts is a `boolean` value, it sets the #opts.deep option to its
   *   value.
   * @param {boolean=} opts.deep = `false`
   *   The #opts.deep option tells @get#dirpaths whether it should recursively
   *   retrieve all of the sub-directory paths within the #source.
   * @param {boolean=} opts.recursive
   *   An alias for the #opts.deep option.
   * @param {boolean=} opts.base = `false`
   *   The #opts.base option tells @get#dirpaths whether it should append the
   *   #source directory path to the base of each of the resulting directory
   *   paths found.
   * @param {boolean=} opts.basepath
   *   An alias for the #opts.base option.
   * @param {boolean=} opts.abs = `false`
   *   The #opts.abs option only applies if #opts.base is `true`. It appends
   *   the absolute path of the #source to each of the resulting directory
   *   paths found.
   * @param {boolean=} opts.absolute
   *   An alias for the #opts.abs option.
   * @param {boolean=} opts.glob = `true`
   *   The #opts.glob option defines whether a `string` value provided for
   *   #opts.validDirs or #opts.invalidDirs is allowed to contain the
   *   following wildcard values:
   *   - `"*"`!$
   *     This wildcard states that any `number` (`0` or more) of characters
   *     except for the directory separator, `"/"`, is allowed in its place.
   *     Use the backslash, `"\\"`, to escape a literal asterisk.
   * @param {boolean=} opts.wildcard
   *   An alias for the #opts.glob option.
   * @param {(?RegExp|?Array<string>|?string|?function(string=, string=, string=): *)=} opts.validDirs = `null`
   *   The #opts.validDirs option limits the returned directory paths. The
   *   remaining details are as follows (per #opts.validDirs data type):
   *   - *`null`*!$
   *     All directory names and paths are considered valid.
   *   - *`!RegExp`*!$
   *     If the [RegExp.prototype.source][source] of #opts.validDirs contains
   *     a directory separator, `"/"`, each directory **path** is
   *     [tested][test] against the `RegExp`. Otherwise, each directory
   *     **name** is [tested][test] against the `RegExp`. If a [test][test]
   *     returns `false`, the directory and its sub-directories (if #opts.deep
   *     is enabled) are **not** added to the results.
   *   - *`!Array<string>`*!$
   *     First, all of the [special characters][special] (unless #opts.glob is
   *     enabled then its wildcard rules apply) are escaped for each `string`
   *     within the #opts.validDirs `array`. Second, each `string` within the
   *     `array` is [joined][join] together with a [pipe character][pipe],
   *     `"|"`. Third, the [joined][join] `string` is converted into a
   *     `RegExp` using its new value for the [RegExp source][source].
   *     Finally, all the `RegExp` rules stated above apply.
   *   - *`string`*!$
   *     First, all of the [special characters][special] (unless #opts.glob is
   *     enabled then its wildcard rules apply) expect for the
   *     [pipe character][pipe], `"|"`, are escaped. Second, the escaped
   *     `string` is converted into a `RegExp` using its value for the
   *     [RegExp source][source]. Finally, all the `RegExp` rules stated above
   *     apply.
   *   - *`function(string=, string=, string=): *`*!$
   *       The #opts.validDirs is considered a filter `function` (i.e. if it
   *       returns `false`, the directory and its sub-directories are **not**
   *       added to the results). If the value returned by the filter is not a
   *       `boolean`, it is converted into a `boolean`. It has the following
   *       optional parameters:
   *       - **dirname** *`string`*
   *       - **dirpath** *`string`*
   *       - **source** *`string`*
   * @param {(?RegExp|?Array<string>|?string|?function(string=, string=, string=): *)=} opts.valid
   *   An alias for the #opts.validDirs option.
   * @param {boolean=} opts.extendValidDirs = `false`
   *   The #opts.extendValidDirs option only applies if the #opts.validDirs
   *   default value is not `null` and #opts.validDirs is defined. If the
   *   #opts.extendValidDirs option is set to `true`, any value supplied to
   *   #opts.validDirs supplements as opposed to overwrites its default value.
   * @param {boolean=} opts.extendValid
   *   An alias for the #opts.extendValidDirs option.
   * @param {(?RegExp|?Array<string>|?string|?function(string=, string=, string=): *)=} opts.invalidDirs = `/^(?:\.git|\.bak|\.backup|node_modules|vendor|\.?te?mp|\.?logs?|.*~)$/`
   *   The #opts.invalidDirs option limits the returned directory paths. The
   *   remaining details are as follows (per #opts.invalidDirs data type):
   *   - *`null`*!$
   *     All directory names and paths are **not** considered invalid.
   *   - *`!RegExp`*!$
   *     If the [RegExp.prototype.source][source] of #opts.invalidDirs
   *     contains a directory separator, `"/"`, each directory **path** is
   *     [tested][test] against the `RegExp`. Otherwise, each directory
   *     **name** is [tested][test] against the `RegExp`. If a [test][test]
   *     returns `true`, the directory and its sub-directories (if #opts.deep
   *     is enabled) are **not** added to the results.
   *   - *`!Array<string>`*!$
   *     First, all of the [special characters][special] (unless #opts.glob is
   *     enabled then its wildcard rules apply) are escaped for each `string`
   *     within the #opts.invalidDirs `array`. Second, each `string` within
   *     the `array` is [joined][join] together with a [pipe character][pipe],
   *     `"|"`. Third, the [joined][join] `string` is converted into a
   *     `RegExp` using its new value for the [RegExp source][source].
   *     Finally, all the `RegExp` rules stated above apply.
   *   - *`string`*!$
   *     First, all of the [special characters][special] (unless #opts.glob is
   *     enabled then its wildcard rules apply) expect for the
   *     [pipe character][pipe], `"|"`, are escaped. Second, the escaped
   *     `string` is converted into a `RegExp` using its value for the
   *     [RegExp source][source]. Finally, all the `RegExp` rules stated above
   *     apply.
   *   - *`function(string=, string=, string=): *`*!$
   *       The #opts.invalidDirs is considered a filter `function` (i.e. if it
   *       returns `true`, the directory and its sub-directories are **not**
   *       added to the results). If the value returned by the filter is not a
   *       `boolean`, it is converted into a `boolean`. It has the following
   *       optional parameters:
   *       - **dirname** *`string`*
   *       - **dirpath** *`string`*
   *       - **source** *`string`*
   * @param {(?RegExp|?Array<string>|?string|?function(string=, string=, string=): *)=} opts.invalid
   *   An alias for the #opts.invalidDirs option.
   * @param {boolean=} opts.extendInvalidDirs = `false`
   *   The #opts.extendInvalidDirs option only applies if the
   *   #opts.invalidDirs default value is not `null` and #opts.invalidDirs is
   *   defined. If the #opts.extendInvalidDirs option is set to `true`, any
   *   value supplied to #opts.invalidDirs supplements as opposed to
   *   overwrites its default value.
   * @param {boolean=} opts.extendInvalid
   *   An alias for the #opts.extendInvalidDirs option.
   * @return {!Array<string>}
   */
  function getDirpaths(source, opts) {

    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #source defined', 'dirpaths');

      case 1:
        /** @dict */
        opts = $cloneObj(_DFLT_DIRS_OPTS);
        break;

      default:
        if ( $is.void(opts) || $is.nil(opts) ) {
          /** @dict */
          opts = $cloneObj(_DFLT_DIRS_OPTS);
          break;
        }

        if ( $is.bool(opts) ) {
          if (opts) {
            /** @dict */
            opts = $cloneObj(_DFLT_DIRS_OPTS);
            opts['deep'] = YES;
          }
          else {
            /** @dict */
            opts = $cloneObj(_DFLT_DIRS_OPTS);
            opts['deep'] = NO;
          }
          break;
        }

        if ( !$is.obj(opts) )
          throw _mkTypeErr(new TYPE_ERR, 'opts', opts, '(?Object|?boolean)=',
            'dirpaths');

        /** @dict */
        opts = $cloneObj(opts);

        if ( !$hasOpt(opts, 'recursive') )
          opts['recursive'] = VOID;
        else if ( !$is.bool(opts['recursive']) )
          throw _mkTypeErr(new TYPE_ERR, 'opts.recursive', opts['recursive'],
            'boolean=', 'dirpaths');

        if ( !$hasOpt(opts, 'deep') )
          opts['deep'] = $is.bool(opts['recursive'])
            ? opts['recursive']
            : _DFLT_DIRS_OPTS['deep'];
        else if ( !$is.bool(opts['deep']) )
          throw _mkTypeErr(new TYPE_ERR, 'opts.deep', opts['deep'],
            'boolean=', 'dirpaths');

        if ( !$hasOpt(opts, 'basepath') )
          opts['basepath'] = VOID;
        else if ( !$is.bool(opts['basepath']) )
          throw _mkTypeErr(new TYPE_ERR, 'opts.basepath', opts['basepath'],
            'boolean=', 'dirpaths');

        if ( !$hasOpt(opts, 'base') )
          opts['base'] = $is.bool(opts['basepath'])
            ? opts['basepath']
            : _DFLT_DIRS_OPTS['base'];
        else if ( !$is.bool(opts['base']) )
          throw _mkTypeErr(new TYPE_ERR, 'opts.base', opts['base'],
            'boolean=', 'dirpaths');

        if ( !$hasOpt(opts, 'absolute') )
          opts['absolute'] = VOID;
        else if ( !$is.bool(opts['absolute']) )
          throw _mkTypeErr(new TYPE_ERR, 'opts.absolute', opts['absolute'],
            'boolean=', 'dirpaths');

        if ( !$hasOpt(opts, 'abs') )
          opts['abs'] = $is.bool(opts['absolute'])
            ? opts['absolute']
            : _DFLT_DIRS_OPTS['abs'];
        else if ( !$is.bool(opts['abs']) )
          throw _mkTypeErr(new TYPE_ERR, 'opts.abs', opts['abs'],
            'boolean=', 'dirpaths');

        if ( !$hasOpt(opts, 'wildcard') )
          opts['wildcard'] = VOID;
        else if ( !$is.bool(opts['wildcard']) )
          throw _mkTypeErr(new TYPE_ERR, 'opts.wildcard', opts['wildcard'],
            'boolean=', 'dirpaths');

        if ( !$hasOpt(opts, 'glob') )
          opts['glob'] = $is.bool(opts['wildcard'])
            ? opts['wildcard']
            : _DFLT_DIRS_OPTS['glob'];
        else if ( !$is.bool(opts['glob']) )
          throw _mkTypeErr(new TYPE_ERR, 'opts.glob', opts['glob'],
            'boolean=', 'dirpaths');

        if ( !$hasOpt(opts, 'extendValid') )
          opts['extendValid'] = VOID;
        else if ( !$is.bool(opts['extendValid']) )
          throw _mkTypeErr(new TYPE_ERR, 'opts.extendValid',
            opts['extendValid'], 'boolean=', 'dirpaths');

        if ( !$hasOpt(opts, 'extendValidDirs') )
          opts['extendValidDirs'] = $is.bool(opts['extendValid'])
            ? opts['extendValid']
            : _DFLT_DIRS_OPTS['extendValidDirs'];
        else if ( !$is.bool(opts['extendValidDirs']) )
          throw _mkTypeErr(new TYPE_ERR, 'opts.extendValidDirs',
            opts['extendValidDirs'], 'boolean=', 'dirpaths');

        if ( !$hasOpt(opts, 'extendInvalid') )
          opts['extendInvalid'] = VOID;
        else if ( !$is.bool(opts['extendInvalid']) )
          throw _mkTypeErr(new TYPE_ERR, 'opts.extendInvalid',
            opts['extendInvalid'], 'boolean=', 'dirpaths');

        if ( !$hasOpt(opts, 'extendInvalidDirs') )
          opts['extendInvalidDirs'] = $is.bool(opts['extendInvalid'])
            ? opts['extendInvalid']
            : _DFLT_DIRS_OPTS['extendInvalidDirs'];
        else if ( !$is.bool(opts['extendInvalidDirs']) )
          throw _mkTypeErr(new TYPE_ERR, 'opts.extendInvalidDirs',
            opts['extendInvalidDirs'], 'boolean=', 'dirpaths');

        if ( !$hasOpt(opts, 'valid') )
          opts['valid'] = VOID;
        else if ( !_isPattOpt(opts['valid']) )
          throw _mkTypeErr(new TYPE_ERR, 'opts.valid', opts['valid'],
            '(?RegExp|?Array<string>|?string|?function(' +
            'string=, string=, string=): *)=', 'dirpaths');

        if ( !$hasOpt(opts, 'validDirs') ) {
          if ( !$is.void(opts['valid']) )
            opts['validDirs'] = opts['valid'];
          else {
            opts['validDirs'] = _DFLT_DIRS_OPTS['validDirs'];
            opts['extendValidDirs'] = NO;
          }
        }
        else if ( !_isPattOpt(opts['validDirs']) )
          throw _mkTypeErr(new TYPE_ERR, 'opts.validDirs', opts['validDirs'],
            '(?RegExp|?Array<string>|?string|?function(' +
            'string=, string=, string=): *)=', 'dirpaths');

        if ( !$hasOpt(opts, 'invalid') )
          opts['invalid'] = VOID;
        else if ( !_isPattOpt(opts['invalid']) )
          throw _mkTypeErr(new TYPE_ERR, 'opts.invalid', opts['invalid'],
            '(?RegExp|?Array<string>|?string|?function(' +
            'string=, string=, string=): *)=', 'dirpaths');

        if ( !$hasOpt(opts, 'invalidDirs') ) {
          if ( !$is.void(opts['invalid']) )
            opts['invalidDirs'] = opts['invalid'];
          else {
            opts['invalidDirs'] = _DFLT_DIRS_OPTS['invalidDirs'];
            opts['extendInvalidDirs'] = NO;
          }
        }
        else if ( !_isPattOpt(opts['invalidDirs']) )
          throw _mkTypeErr(new TYPE_ERR, 'opts.invalidDirs',
            opts['invalidDirs'], '(?RegExp|?Array<string>|?string|?function' +
            '(string=, string=, string=): *)=', 'dirpaths');
    }

    if ( !$is.str(source) )
      throw _mkTypeErr(new TYPE_ERR, 'source', source, 'string', 'dirpaths');
    else if (!source)
      throw _mkErr(new ERR, 'invalid empty #source `string`', 'dirpaths');
    else if ( !$is.dir(source) )
      throw _mkErr(new ERR, 'invalid #source directory path `' + source + '`',
        'dirpaths');

    return _getDirs(source, opts);
  }
  get['dirpaths'] = getDirpaths;
  /// #}}} @submethod dirpaths

  /// #{{{ @submethod filepaths
  /// @section fs
  /// @method vitals.get.filepaths
  /**
   * @description
   *   Gets all of the file paths within a directory tree.
   * @public
   * @param {string} source
   *   Must be a valid directory path.
   * @param {(?Object|?boolean)=} opts
   *   If the #opts is a `boolean` value, it sets the #opts.deep option to its
   *   value.
   * @param {boolean=} opts.deep = `false`
   *   The #opts.deep option tells @get#filepaths whether it should
   *   recursively retrieve all of the sub-directory file paths within the
   *   #source.
   * @param {boolean=} opts.recursive
   *   An alias for the #opts.deep option.
   * @param {boolean=} opts.base = `false`
   *   The #opts.base option tells @get#filepaths whether it should append the
   *   #source directory path to the base of each of the resulting directory
   *   paths found.
   * @param {boolean=} opts.basepath
   *   An alias for the #opts.base option.
   * @param {boolean=} opts.abs = `false`
   *   The #opts.abs option only applies if #opts.base is `true`. It appends
   *   the absolute path of the #source to each of the resulting directory
   *   paths found.
   * @param {boolean=} opts.absolute
   *   An alias for the #opts.abs option.
   * @param {boolean=} opts.glob = `true`
   *   The #opts.glob option defines whether a `string` pattern provided for
   *   any valid or invalid #opts test option is allowed to contain the
   *   following wildcard values:
   *   - `"*"`!$
   *     This wildcard states that any `number` (`0` or more) of characters
   *     except for the directory separator, `"/"`, is allowed in its place.
   *     Use the backslash, `"\\"`, to escape a literal asterisk.
   * @param {boolean=} opts.wildcard
   *   An alias for the #opts.glob option.
   * @param {(?RegExp|?Array<string>|?string|?function(string=, string=, string=): *)=} opts.valid = `null`
   *   The #opts.valid option limits the returned file paths and the checked
   *   directory paths. The remaining details are as follows (per #opts.valid
   *   data type):
   *   - *`null`*!$
   *     All file and directory paths are considered valid.
   *   - *`!RegExp`*!$
   *     If the [RegExp.prototype.source][source] of #opts.valid contains a
   *     directory separator, `"/"`, each file and directory **path** is
   *     [tested][test] against the `RegExp`. Otherwise, each file and
   *     directory **name** is [tested][test] against the `RegExp`. If a
   *     [test][test] returns `false`, the file is **not** added to the
   *     results or the directory's children (if #opts.deep is enabled) are
   *     **not** checked.
   *   - *`!Array<string>`*!$
   *     First, all of the [special characters][special] (unless #opts.glob is
   *     enabled then its wildcard rules apply) are escaped for each `string`
   *     within the #opts.valid `array`. Second, each `string` within the
   *     `array` is [joined][join] together with a [pipe character][pipe],
   *     `"|"`. Third, the [joined][join] `string` is converted into a
   *     `RegExp` using its new value for the [RegExp source][source].
   *     Finally, all the `RegExp` rules stated above apply.
   *   - *`string`*!$
   *     First, all of the [special characters][special] (unless #opts.glob is
   *     enabled then its wildcard rules apply) expect for the
   *     [pipe character][pipe], `"|"`, are escaped. Second, the escaped
   *     `string` is converted into a `RegExp` using its value for the
   *     [RegExp source][source]. Finally, all the `RegExp` rules stated above
   *     apply.
   *   - *`function(string=, string=, string=): *`*!$
   *       The #opts.valid is considered a filter `function` (i.e. if it
   *       returns `false`, the file is **not** added to the results or the
   *       directory's children are **not** checked). If the value returned by
   *       the filter is not a `boolean`, it is converted into a `boolean`. It
   *       has the following optional parameters:
   *       - **filename** *`string`*
   *       - **filepath** *`string`*
   *       - **source** *`string`*
   * @param {boolean=} opts.extendValid = `false`
   *   The #opts.extendValid option only applies if the #opts.valid default
   *   value is not `null` and #opts.valid is defined. If the
   *   #opts.extendValid option is set to `true`, any value supplied to
   *   #opts.valid supplements as opposed to overwrites its default value.
   * @param {(?RegExp|?Array<string>|?string|?function(string=, string=, string=): *)=} opts.invalid = `null`
   *   The #opts.invalid option limits the returned file paths and the checked
   *   directory paths. The remaining details are as follows (per
   *   #opts.invalid data type):
   *   - *`null`*!$
   *     All file and directory paths are **not** considered invalid.
   *   - *`!RegExp`*!$
   *     If the [RegExp.prototype.source][source] of #opts.invalid contains a
   *     directory separator, `"/"`, each file and directory **path** is
   *     [tested][test] against the `RegExp`. Otherwise, each file and
   *     directory **name** is [tested][test] against the `RegExp`. If a
   *     [test][test] returns `true`, the file is **not** added to the results
   *     or the directory's children (if #opts.deep is enabled) are **not**
   *     checked.
   *   - *`!Array<string>`*!$
   *     First, all of the [special characters][special] (unless #opts.glob is
   *     enabled then its wildcard rules apply) are escaped for each `string`
   *     within the #opts.invalid `array`. Second, each `string` within the
   *     `array` is [joined][join] together with a [pipe character][pipe],
   *     `"|"`. Third, the [joined][join] `string` is converted into a
   *     `RegExp` using its new value for the [RegExp source][source].
   *     Finally, all the `RegExp` rules stated above apply.
   *   - *`string`*!$
   *     First, all of the [special characters][special] (unless #opts.glob is
   *     enabled then its wildcard rules apply) expect for the
   *     [pipe character][pipe], `"|"`, are escaped. Second, the escaped
   *     `string` is converted into a `RegExp` using its value for the
   *     [RegExp source][source]. Finally, all the `RegExp` rules stated above
   *     apply.
   *   - *`function(string=, string=, string=): *`*!$
   *       The #opts.invalid is considered a filter `function` (i.e. if it
   *       returns `true`, the file is **not** added to the results or the
   *       directory's children are **not** checked). If the value returned by
   *       the filter is not a `boolean`, it is converted into a `boolean`. It
   *       has the following optional parameters:
   *       - **filename** *`string`*
   *       - **filepath** *`string`*
   *       - **source** *`string`*
   * @param {boolean=} opts.extendInvalid = `false`
   *   The #opts.extendValid option only applies if the #opts.valid default
   *   value is not `null` and #opts.valid is defined. If the
   *   #opts.extendValid option is set to `true`, any value supplied to
   *   #opts.valid supplements as opposed to overwrites its default value.
   * @param {(?RegExp|?Array<string>|?string|?function(string=, string=, string=): *)=} opts.validDirs = `null`
   *   The #opts.validDirs option limits the checked directory paths. The
   *   remaining details are as follows (per #opts.validDirs data type):
   *   - *`null`*!$
   *     All directory names and paths are considered valid.
   *   - *`!RegExp`*!$
   *     If the [RegExp.prototype.source][source] of #opts.validDirs contains
   *     a directory separator, `"/"`, each directory **path** is
   *     [tested][test] against the `RegExp`. Otherwise, each directory
   *     **name** is [tested][test] against the `RegExp`. If a [test][test]
   *     returns `false`, the directory and its sub-directories (if #opts.deep
   *     is enabled) are **not** checked.
   *   - *`!Array<string>`*!$
   *     First, all of the [special characters][special] (unless #opts.glob is
   *     enabled then its wildcard rules apply) are escaped for each `string`
   *     within the #opts.validDirs `array`. Second, each `string` within the
   *     `array` is [joined][join] together with a [pipe character][pipe],
   *     `"|"`. Third, the [joined][join] `string` is converted into a
   *     `RegExp` using its new value for the [RegExp source][source].
   *     Finally, all the `RegExp` rules stated above apply.
   *   - *`string`*!$
   *     First, all of the [special characters][special] (unless #opts.glob is
   *     enabled then its wildcard rules apply) expect for the
   *     [pipe character][pipe], `"|"`, are escaped. Second, the escaped
   *     `string` is converted into a `RegExp` using its value for the
   *     [RegExp source][source]. Finally, all the `RegExp` rules stated above
   *     apply.
   *   - *`function(string=, string=, string=): *`*!$
   *       The #opts.validDirs is considered a filter `function` (i.e. if it
   *       returns `false`, the directory and its sub-directories are **not**
   *       checked). If the value returned by the filter is not a `boolean`,
   *       it is converted into a `boolean`. It has the following optional
   *       parameters:
   *       - **dirname** *`string`*
   *       - **dirpath** *`string`*
   *       - **source** *`string`*
   * @param {boolean=} opts.extendValidDirs = `false`
   *   The #opts.extendValidDirs option only applies if the #opts.validDirs
   *   default value is not `null` and #opts.validDirs is defined. If the
   *   #opts.extendValidDirs option is set to `true`, any value supplied to
   *   #opts.validDirs supplements as opposed to overwrites its default value.
   * @param {(?RegExp|?Array<string>|?string|?function(string=, string=, string=): *)=} opts.invalidDirs = `/^(?:\.git|\.bak|\.backup|node_modules|vendor|\.?te?mp|\.?logs?|.*~)$/`
   *   The #opts.invalidDirs option limits the checked directory paths. The
   *   remaining details are as follows (per #opts.invalidDirs data type):
   *   - *`null`*!$
   *     All directory names and paths are **not** considered invalid.
   *   - *`!RegExp`*!$
   *     If the [RegExp.prototype.source][source] of #opts.invalidDirs
   *     contains a directory separator, `"/"`, each directory **path** is
   *     [tested][test] against the `RegExp`. Otherwise, each directory
   *     **name** is [tested][test] against the `RegExp`. If a [test][test]
   *     returns `true`, the directory and its sub-directories (if #opts.deep
   *     is enabled) are **not** checked.
   *   - *`!Array<string>`*!$
   *     First, all of the [special characters][special] (unless #opts.glob is
   *     enabled then its wildcard rules apply) are escaped for each `string`
   *     within the #opts.invalidDirs `array`. Second, each `string` within
   *     the `array` is [joined][join] together with a [pipe character][pipe],
   *     `"|"`. Third, the [joined][join] `string` is converted into a
   *     `RegExp` using its new value for the [RegExp source][source].
   *     Finally, all the `RegExp` rules stated above apply.
   *   - *`string`*!$
   *     First, all of the [special characters][special] (unless #opts.glob is
   *     enabled then its wildcard rules apply) expect for the
   *     [pipe character][pipe], `"|"`, are escaped. Second, the escaped
   *     `string` is converted into a `RegExp` using its value for the
   *     [RegExp source][source]. Finally, all the `RegExp` rules stated above
   *     apply.
   *   - *`function(string=, string=, string=): *`*!$
   *       The #opts.invalidDirs is considered a filter `function` (i.e. if it
   *       returns `true`, the directory and its sub-directories are **not**
   *       checked). If the value returned by the filter is not a `boolean`,
   *       it is converted into a `boolean`. It has the following optional
   *       parameters:
   *       - **dirname** *`string`*
   *       - **dirpath** *`string`*
   *       - **source** *`string`*
   * @param {boolean=} opts.extendInvalidDirs = `false`
   *   The #opts.extendInvalidDirs option only applies if the
   *   #opts.invalidDirs default value is not `null` and #opts.invalidDirs is
   *   defined. If the #opts.extendInvalidDirs option is set to `true`, any
   *   value supplied to #opts.invalidDirs supplements as opposed to
   *   overwrites its default value.
   * @param {(?RegExp|?Array<string>|?string)=} opts.validExts = `null`
   *   The #opts.validExts option limits the returned file paths by checking
   *   their file extension. Note that a file extension is defined as the
   *   first period, `"."`, in a file name that is only followed by
   *   alpha-numerics (i.e. `/\.[a-zA-Z0-9]+(?:\.[a-zA-Z0-9)*$/`). The
   *   remaining details are as follows (per #opts.validExts data type):
   *   - *`null`*!$
   *     All file extensions are considered valid.
   *   - *`!RegExp`*!$
   *     Each file's extension is [tested][test] against #opts.validExts. If
   *     a [test][test] returns `false`, the file is **not** added to the
   *     results.
   *   - *`!Array<string>`*!$
   *     Each string must consist of only alpha-numerics, periods, and (if
   *     #opts.glob is enabled) any valid wildcard characters. All periods
   *     are escaped and a leading period is appended if it is missing for
   *     each `string`. After being cleaned each `string` is [joined][join]
   *     together with a [pipe character][pipe], `"|"`. Finally, the
   *     [joined][join] `string` is converted into a `RegExp` and all of the
   *     `RegExp` rules stated above apply.
   *   - *`string`*!$
   *     Each string must consist of only alpha-numerics, periods, pipes, and
   *     (if #opts.glob is enabled) any valid wildcard characters. All periods
   *     and pipes are escaped and a leading period is appended to each file
   *     extension if it is missing for the `string`. Finally, the cleaned
   *     `string` is converted into a `RegExp` and all of the `RegExp` rules
   *     stated above apply.
   * @param {boolean=} opts.extendValidExts = `false`
   *   The #opts.extendValidExts option only applies if the #opts.validExts
   *   default value is not `null` and #opts.validExts is defined. If the
   *   #opts.extendValidExts option is set to `true`, any value supplied to
   *   #opts.validExts supplements as opposed to overwrites its default value.
   * @param {(?RegExp|?Array<string>|?string)=} opts.invalidExts = `null`
   *   The #opts.invalidExts option limits the returned file paths by checking
   *   their file extension. Note that a file extension is defined as the
   *   first period, `"."`, in a file name that is only followed by
   *   alpha-numerics (i.e. `/\.[a-zA-Z0-9]+(?:\.[a-zA-Z0-9)*$/`). The
   *   remaining details are as follows (per #opts.invalidExts data type):
   *   - *`null`*!$
   *     All file extensions are **not** considered invalid.
   *   - *`!RegExp`*!$
   *     Each file's extension is [tested][test] against #opts.invalidExts. If
   *     a [test][test] returns `true`, the file is **not** added to the
   *     results.
   *   - *`!Array<string>`*!$
   *     Each string must consist of only alpha-numerics, periods, and (if
   *     #opts.glob is enabled) any valid wildcard characters. All periods
   *     are escaped and a leading period is appended if it is missing for
   *     each `string`. After being cleaned each `string` is [joined][join]
   *     together with a [pipe character][pipe], `"|"`. Finally, the
   *     [joined][join] `string` is converted into a `RegExp` and all of the
   *     `RegExp` rules stated above apply.
   *   - *`string`*!$
   *     Each string must consist of only alpha-numerics, periods, pipes, and
   *     (if #opts.glob is enabled) any valid wildcard characters. All periods
   *     and pipes are escaped and a leading period is appended to each file
   *     extension if it is missing for the `string`. Finally, the cleaned
   *     `string` is converted into a `RegExp` and all of the `RegExp` rules
   *     stated above apply.
   * @param {boolean=} opts.extendInvalidExts = `false`
   *   The #opts.extendInvalidExts option only applies if the
   *   #opts.invalidExts default value is not `null` and #opts.invalidExts is
   *   defined. If the #opts.extendInvalidExts option is set to `true`, any
   *   value supplied to #opts.invalidExts supplements as opposed to
   *   overwrites its default value.
   * @param {(?RegExp|?Array<string>|?string|?function(string=, string=, string=): *)=} opts.validFiles = `null`
   *   The #opts.validFiles option limits the returned file paths. The
   *   remaining details are as follows (per #opts.validFiles data type):
   *   - *`null`*!$
   *     All file paths are considered valid.
   *   - *`!RegExp`*!$
   *     If the [RegExp.prototype.source][source] of #opts.validFiles contains
   *     a directory separator, `"/"`, each file **path** is [tested][test]
   *     against the `RegExp`. Otherwise, each file **name** is [tested][test]
   *     against the `RegExp`. If a [test][test] returns `false`, the file is
   *     **not** added to the results.
   *   - *`!Array<string>`*!$
   *     First, all of the [special characters][special] (unless #opts.glob is
   *     enabled then its wildcard rules apply) are escaped for each `string`
   *     within the #opts.validFiles `array`. Second, each `string` within the
   *     `array` is [joined][join] together with a [pipe character][pipe],
   *     `"|"`. Third, the [joined][join] `string` is converted into a
   *     `RegExp` using its new value for the [RegExp source][source].
   *     Finally, all the `RegExp` rules stated above apply.
   *   - *`string`*!$
   *     First, all of the [special characters][special] (unless #opts.glob is
   *     enabled then its wildcard rules apply) expect for the
   *     [pipe character][pipe], `"|"`, are escaped. Second, the escaped
   *     `string` is converted into a `RegExp` using its value for the
   *     [RegExp source][source]. Finally, all the `RegExp` rules stated above
   *     apply.
   *   - *`function(string=, string=, string=): *`*!$
   *       The #opts.validFiles is considered a filter `function` (i.e. if it
   *       returns `false`, the file is **not** added to the results). If the
   *       value returned by the filter is not a `boolean`, it is converted
   *       into a `boolean`. It has the following optional parameters:
   *       - **filename** *`string`*
   *       - **filepath** *`string`*
   *       - **source** *`string`*
   * @param {boolean=} opts.extendValidFiles = `false`
   *   The #opts.extendValidFiles option only applies if the #opts.validFiles
   *   default value is not `null` and #opts.validFiles is defined. If the
   *   #opts.extendValidFiles option is set to `true`, any value supplied to
   *   #opts.validFiles supplements as opposed to overwrites its default
   *   value.
   * @param {(?RegExp|?Array<string>|?string|?function(string=, string=, string=): *)=} opts.invalidFiles = `null`
   *   The #opts.invalidFiles option limits the returned file paths. The
   *   remaining details are as follows (per #opts.invalidFiles data type):
   *   - *`null`*!$
   *     All file paths are **not** considered invalid.
   *   - *`!RegExp`*!$
   *     If the [RegExp.prototype.source][source] of #opts.invalidFiles
   *     contains a directory separator, `"/"`, each file **path** is
   *     [tested][test] against the `RegExp`. Otherwise, each file **name** is
   *     [tested][test] against the `RegExp`. If a [test][test] returns
   *     `true`, the file is **not** added to the results.
   *   - *`!Array<string>`*!$
   *     First, all of the [special characters][special] (unless #opts.glob is
   *     enabled then its wildcard rules apply) are escaped for each `string`
   *     within the #opts.invalidFiles `array`. Second, each `string` within
   *     the `array` is [joined][join] together with a [pipe character][pipe],
   *     `"|"`. Third, the [joined][join] `string` is converted into a
   *     `RegExp` using its new value for the [RegExp source][source].
   *     Finally, all the `RegExp` rules stated above apply.
   *   - *`string`*!$
   *     First, all of the [special characters][special] (unless #opts.glob is
   *     enabled then its wildcard rules apply) expect for the
   *     [pipe character][pipe], `"|"`, are escaped. Second, the escaped
   *     `string` is converted into a `RegExp` using its value for the
   *     [RegExp source][source]. Finally, all the `RegExp` rules stated above
   *     apply.
   *   - *`function(string=, string=, string=): *`*!$
   *       The #opts.invalidFiles is considered a filter `function` (i.e. if
   *       it returns `true`, the file is **not** added to the results). If
   *       the value returned by the filter is not a `boolean`, it is
   *       converted into a `boolean`. It has the following optional
   *       parameters:
   *       - **filename** *`string`*
   *       - **filepath** *`string`*
   *       - **source** *`string`*
   * @param {boolean=} opts.extendInvalidFiles = `false`
   *   The #opts.extendInvalidFiles option only applies if the
   *   #opts.invalidFiles default value is not `null` and #opts.invalidFiles
   *   is defined. If the #opts.extendInvalidFiles option is set to `true`,
   *   any value supplied to #opts.invalidFiles supplements as opposed to
   *   overwrites its default value.
   * @return {!Array<string>}
   */
  function getFilepaths(source, opts) {

    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #source defined', 'filepaths');

      case 1:
        /** @dict */
        opts = $cloneObj(_DFLT_FILES_OPTS);
        break;

      default:
        if ( $is.void(opts) || $is.nil(opts) ) {
          /** @dict */
          opts = $cloneObj(_DFLT_FILES_OPTS);
          break;
        }

        if ( $is.bool(opts) ) {
          if (opts) {
            /** @dict */
            opts = $cloneObj(_DFLT_FILES_OPTS);
            opts['deep'] = YES;
          }
          else {
            /** @dict */
            opts = $cloneObj(_DFLT_FILES_OPTS);
            opts['deep'] = NO;
          }
          break;
        }

        if ( !$is.obj(opts) )
          throw _mkTypeErr(new TYPE_ERR, 'opts', opts, '(?Object|?boolean)=',
            'filepaths');

        /** @dict */
        opts = $cloneObj(opts);

        if ( !$hasOpt(opts, 'recursive') )
          opts['recursive'] = VOID;
        else if ( !$is.bool(opts['recursive']) )
          throw _mkTypeErr(new TYPE_ERR, 'opts.recursive', opts['recursive'],
            'boolean=', 'filepaths');

        if ( !$hasOpt(opts, 'deep') )
          opts['deep'] = $is.bool(opts['recursive'])
            ? opts['recursive']
            : _DFLT_FILES_OPTS['deep'];
        else if ( !$is.bool(opts['deep']) )
          throw _mkTypeErr(new TYPE_ERR, 'opts.deep', opts['deep'],
            'boolean=', 'filepaths');

        if ( !$hasOpt(opts, 'basepath') )
          opts['basepath'] = VOID;
        else if ( !$is.bool(opts['basepath']) )
          throw _mkTypeErr(new TYPE_ERR, 'opts.basepath', opts['basepath'],
            'boolean=', 'filepaths');

        if ( !$hasOpt(opts, 'base') )
          opts['base'] = $is.bool(opts['basepath'])
            ? opts['basepath']
            : _DFLT_FILES_OPTS['base'];
        else if ( !$is.bool(opts['base']) )
          throw _mkTypeErr(new TYPE_ERR, 'opts.base', opts['base'],
            'boolean=', 'filepaths');

        if ( !$hasOpt(opts, 'absolute') )
          opts['absolute'] = VOID;
        else if ( !$is.bool(opts['absolute']) )
          throw _mkTypeErr(new TYPE_ERR, 'opts.absolute', opts['absolute'],
            'boolean=', 'filepaths');

        if ( !$hasOpt(opts, 'abs') )
          opts['abs'] = $is.bool(opts['absolute'])
            ? opts['absolute']
            : _DFLT_FILES_OPTS['abs'];
        else if ( !$is.bool(opts['abs']) )
          throw _mkTypeErr(new TYPE_ERR, 'opts.abs', opts['abs'],
            'boolean=', 'filepaths');

        if ( !$hasOpt(opts, 'wildcard') )
          opts['wildcard'] = VOID;
        else if ( !$is.bool(opts['wildcard']) )
          throw _mkTypeErr(new TYPE_ERR, 'opts.wildcard', opts['wildcard'],
            'boolean=', 'filepaths');

        if ( !$hasOpt(opts, 'glob') )
          opts['glob'] = $is.bool(opts['wildcard'])
            ? opts['wildcard']
            : _DFLT_FILES_OPTS['glob'];
        else if ( !$is.bool(opts['glob']) )
          throw _mkTypeErr(new TYPE_ERR, 'opts.glob', opts['glob'],
            'boolean=', 'filepaths');

        if ( !$hasOpt(opts, 'extendValid') )
          opts['extendValid'] = _DFLT_FILES_OPTS['extendValid'];
        else if ( !$is.bool(opts['extendValid']) )
          throw _mkTypeErr(new TYPE_ERR, 'opts.extendValid',
            opts['extendValid'], 'boolean=', 'filepaths');

        if ( !$hasOpt(opts, 'extendInvalid') )
          opts['extendInvalid'] = _DFLT_FILES_OPTS['extendInvalid'];
        else if ( !$is.bool(opts['extendInvalid']) )
          throw _mkTypeErr(new TYPE_ERR, 'opts.extendInvalid',
            opts['extendInvalid'], 'boolean=', 'filepaths');

        if ( !$hasOpt(opts, 'extendValidDirs') )
          opts['extendValidDirs'] = _DFLT_FILES_OPTS['extendValidDirs'];
        else if ( !$is.bool(opts['extendValidDirs']) )
          throw _mkTypeErr(new TYPE_ERR, 'opts.extendValidDirs',
            opts['extendValidDirs'], 'boolean=', 'filepaths');

        if ( !$hasOpt(opts, 'extendInvalidDirs') )
          opts['extendInvalidDirs'] = _DFLT_FILES_OPTS['extendInvalidDirs'];
        else if ( !$is.bool(opts['extendInvalidDirs']) )
          throw _mkTypeErr(new TYPE_ERR, 'opts.extendInvalidDirs',
            opts['extendInvalidDirs'], 'boolean=', 'filepaths');

        if ( !$hasOpt(opts, 'extendValidExts') )
          opts['extendValidExts'] = _DFLT_FILES_OPTS['extendValidExts'];
        else if ( !$is.bool(opts['extendValidExts']) )
          throw _mkTypeErr(new TYPE_ERR, 'opts.extendValidExts',
            opts['extendValidExts'], 'boolean=', 'filepaths');

        if ( !$hasOpt(opts, 'extendInvalidExts') )
          opts['extendInvalidExts'] = _DFLT_FILES_OPTS['extendInvalidExts'];
        else if ( !$is.bool(opts['extendInvalidExts']) )
          throw _mkTypeErr(new TYPE_ERR, 'opts.extendInvalidExts',
            opts['extendInvalidExts'], 'boolean=', 'filepaths');

        if ( !$hasOpt(opts, 'extendValidFiles') )
          opts['extendValidFiles'] = _DFLT_FILES_OPTS['extendValidFiles'];
        else if ( !$is.bool(opts['extendValidFiles']) )
          throw _mkTypeErr(new TYPE_ERR, 'opts.extendValidFiles',
            opts['extendValidFiles'], 'boolean=', 'filepaths');

        if ( !$hasOpt(opts, 'extendInvalidFiles') )
          opts['extendInvalidFiles'] = _DFLT_FILES_OPTS['extendInvalidFiles'];
        else if ( !$is.bool(opts['extendInvalidFiles']) )
          throw _mkTypeErr(new TYPE_ERR, 'opts.extendInvalidFiles',
            opts['extendInvalidFiles'], 'boolean=', 'filepaths');

        if ( !$hasOpt(opts, 'valid') ) {
          opts['valid'] = _DFLT_FILES_OPTS['valid'];
          opts['extendValid'] = NO;
        }
        else if ( !_isPattOpt(opts['valid']) )
          throw _mkTypeErr(new TYPE_ERR, 'opts.valid', opts['valid'],
            '(?RegExp|?Array<string>|?string|?function(' +
            'string=, string=, string=): *)=', 'filepaths');

        if ( !$hasOpt(opts, 'invalid') ) {
          opts['invalid'] = _DFLT_FILES_OPTS['invalid'];
          opts['extendInvalid'] = NO;
        }
        else if ( !_isPattOpt(opts['invalid']) )
          throw _mkTypeErr(new TYPE_ERR, 'opts.invalid', opts['invalid'],
            '(?RegExp|?Array<string>|?string|?function(' +
            'string=, string=, string=): *)=', 'filepaths');

        if ( !$hasOpt(opts, 'validDirs') ) {
          opts['validDirs'] = _DFLT_FILES_OPTS['validDirs'];
          opts['extendValidDirs'] = NO;
        }
        else if ( !_isPattOpt(opts['validDirs']) )
          throw _mkTypeErr(new TYPE_ERR, 'opts.validDirs', opts['validDirs'],
            '(?RegExp|?Array<string>|?string|?function(' +
            'string=, string=, string=): *)=', 'filepaths');

        if ( !$hasOpt(opts, 'invalidDirs') ) {
          opts['invalidDirs'] = _DFLT_FILES_OPTS['invalidDirs'];
          opts['extendInvalidDirs'] = NO;
        }
        else if ( !_isPattOpt(opts['invalidDirs']) )
          throw _mkTypeErr(new TYPE_ERR, 'opts.invalidDirs',
            opts['invalidDirs'], '(?RegExp|?Array<string>|?string|?function' +
            '(string=, string=, string=): *)=', 'filepaths');

        if ( !$hasOpt(opts, 'validExts') ) {
          opts['validExts'] = _DFLT_FILES_OPTS['validExts'];
          opts['extendValidExts'] = NO;
        }
        else if ( !_isExtOpt(opts['validExts']) )
          throw _mkTypeErr(new TYPE_ERR, 'opts.validExts', opts['validExts'],
            '(?RegExp|?Array<string>|?string)=', 'filepaths');

        if ( !$hasOpt(opts, 'invalidExts') ) {
          opts['invalidExts'] = _DFLT_FILES_OPTS['invalidExts'];
          opts['extendInvalidExts'] = NO;
        }
        else if ( !_isExtOpt(opts['invalidExts']) )
          throw _mkTypeErr(new TYPE_ERR, 'opts.invalidExts',
            opts['invalidExts'], '(?RegExp|?Array<string>|?string)=',
            'filepaths');

        if ( !$hasOpt(opts, 'validFiles') ) {
          opts['validFiles'] = _DFLT_FILES_OPTS['validFiles'];
          opts['extendValidFiles'] = NO;
        }
        else if ( !_isPattOpt(opts['validFiles']) )
          throw _mkTypeErr(new TYPE_ERR, 'opts.validFiles',
            opts['validFiles'], '(?RegExp|?Array<string>|?string|?function(' +
            'string=, string=, string=): *)=', 'filepaths');

        if ( !$hasOpt(opts, 'invalidFiles') ) {
          opts['invalidFiles'] = _DFLT_FILES_OPTS['invalidFiles'];
          opts['extendInvalidFiles'] = NO;
        }
        else if ( !_isPattOpt(opts['invalidFiles']) )
          throw _mkTypeErr(new TYPE_ERR, 'opts.invalidFiles',
            opts['invalidFiles'], '(?RegExp|?Array<string>|?string|' +
            '?function(string=, string=, string=): *)=', 'filepaths');
    }

    if ( !$is.str(source) )
      throw _mkTypeErr(new TYPE_ERR, 'source', source, 'string', 'filepaths');
    else if (!source)
      throw _mkErr(new ERR, 'invalid empty #source `string`', 'filepaths');
    else if ( !$is.dir(source) )
      throw _mkErr(new ERR, 'invalid #source directory path `' + source + '`',
        'filepaths');

    return _getFiles(source, opts);
  }
  get['filepaths'] = getFilepaths;
  /// #}}} @submethod filepaths
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

  /// #{{{ @on FS
  /// #{{{ @group File-System-Helpers

  /// #{{{ @group Main-Helpers

  /// #{{{ @func _getFile
  /**
   * @private
   * @param {string} src
   * @param {!Object<string, *>} opts
   * @return {(!Buffer|string)}
   */
  function _getFile(src, opts) {

    /** @type {string} */
    var contents;

    src = $resolve(src);

    if (opts['buffer'])
      return $readFile(src);

    contents = $readFile(src, opts['encoding']);

    if (opts['eol'])
      contents = $fixEol(contents, opts['eol']);

    return contents;
  }
  /// #}}} @func _getFile

  /// #{{{ @func _getDirs
  /**
   * @private
   * @param {string} src
   * @param {!Object<string, *>} opts
   * @return {!Array<string>}
   */
  function _getDirs(src, opts) {

    /** @type {!_Dirs} */
    var dirs;

    dirs = new _Dirs(src, opts);
    return dirs.main();
  }
  /// #}}} @func _getDirs

  /// #{{{ @func _getFiles
  /**
   * @private
   * @param {string} src
   * @param {!Object<string, *>} opts
   * @return {!Array<string>}
   */
  function _getFiles(src, opts) {

    /** @type {!_Files} */
    var files;

    files = new _Files(src, opts);
    return files.main();
  }
  /// #}}} @func _getFiles

  /// #}}} @group Main-Helpers

  /// #{{{ @group Default-Options

  /// #{{{ @const _DFLT_FILE_OPTS
  /**
   * @private
   * @const {!Object<string, *>}
   * @dict
   */
  var _DFLT_FILE_OPTS = {
    'eol': 'LF',
    'buffer': NO,
    'encoding': 'utf8'
  };
  /// #}}} @const _DFLT_FILE_OPTS

  /// #{{{ @const _DFLT_DIRS_OPTS
  /**
   * @private
   * @const {!Object<string, *>}
   * @dict
   */
  var _DFLT_DIRS_OPTS = {
    'abs': NO,
    'deep': NO,
    'base': NO,
    'glob': YES,
    'validDirs': NIL,
    'invalidDirs': /^(?:\.git|\.bak|\.backup|node_modules|vendor|\.?te?mp|\.?logs?|.*~)$/,
    'extendValidDirs': NO,
    'extendInvalidDirs': NO
  };
  /// #}}} @const _DFLT_DIRS_OPTS

  /// #{{{ @const _DFLT_FILES_OPTS
  /**
   * @private
   * @const {!Object<string, *>}
   * @dict
   */
  var _DFLT_FILES_OPTS = {
    'abs': NO,
    'deep': NO,
    'base': NO,
    'glob': YES,
    'valid': NIL,
    'invalid': NIL,
    'validDirs': NIL,
    'invalidDirs': /^(?:\.git|\.bak|\.backup|node_modules|vendor|\.?te?mp|\.?logs?|.*~)$/,
    'validExts': NIL,
    'invalidExts': NIL,
    'validFiles': NIL,
    'invalidFiles': NIL,
    'extendValid': NO,
    'extendInvalid': NO,
    'extendValidDirs': NO,
    'extendInvalidDirs': NO,
    'extendValidExts': NO,
    'extendInvalidExts': NO,
    'extendValidFiles': NO,
    'extendInvalidFiles': NO
  };
  /// #}}} @const _DFLT_FILES_OPTS

  /// #}}} @group Default-Options

  /// #{{{ @group Option-Helpers

  /// #{{{ @func _isExtOpt
  /**
   * @private
   * @param {*} val
   * @return {boolean}
   */
  var _isExtOpt = (function _isExtOptPrivateScope() {

    /// #{{{ @const _EXT_PATT
    /**
     * @private
     * @const {!RegExp}
     */
    var _EXT_PATT = /^\.?[a-zA-Z0-9\*]+(?:\.[a-zA-Z0-9\*]+)*$/;
    /// #}}} @const _EXT_PATT
 
    /// #{{{ @const _EXTS_PATT
    /**
     * @private
     * @const {!RegExp}
     */
    var _EXTS_PATT = /^\|?\.?[a-zA-Z0-9\*]+(?:\.[a-zA-Z0-9\*]+)*(?:\|\.?[a-zA-Z0-9\*]+(?:\.[a-zA-Z0-9\*]+)*)*\|?$/;
    /// #}}} @const _EXTS_PATT
 
    /// #{{{ @func _isExtArr
    /**
     * @private
     * @param {!Array} vals
     * @return {boolean}
     */
    function _isExtArr(vals) {

      /** @type {*} */
      var val;
      /** @type {number} */
      var len;
      /** @type {number} */
      var i;

      len = vals['length'];
      i = -1;
      while (++i < len) {
        val = vals[i];
        if ( !$is.str(val) || !_EXT_PATT['test'](val) )
          return NO;
      }
      return YES;
    }
    /// #}}} @func _isExtArr
 
    /// #{{{ @func isExtOpt
    /**
     * @param {*} val
     * @return {boolean}
     */
    function isExtOpt(val) {
      return $is.nil(val) || $is.regx(val)
        ? YES
        : $is.str(val)
          ? _EXTS_PATT['test'](val)
          : $is.arr(val)
            ? _isExtArr(val)
            : NO;
    }
    /// #}}} @func isExtOpt
 
    return isExtOpt;
  })();
  /// #}}} @func _isExtOpt

  /// #{{{ @func _isPattOpt
  /**
   * @private
   * @param {*} val
   * @return {boolean}
   */
  var _isPattOpt = (function _isPattOptPrivateScope() {

    /// #{{{ @func _isStrArr
    /**
     * @private
     * @param {!Array} vals
     * @return {boolean}
     */
    function _isStrArr(vals) {

      /** @type {*} */
      var val;
      /** @type {number} */
      var len;
      /** @type {number} */
      var i;

      len = vals['length'];
      i = -1;
      while (++i < len) {
        val = vals[i];
        if ( !$is.str(val) )
          return NO;
      }
      return YES;
    }
    /// #}}} @func _isStrArr
 
    /// #{{{ @func isPattOpt
    /**
     * @param {*} val
     * @return {boolean}
     */
    function isPattOpt(val) {
      return $is.nil(val) || $is.str(val) || $is.regx(val) || $is.fun(val)
        ? YES
        : $is.arr(val)
          ? _isStrArr(val)
          : NO;
    }
    /// #}}} @func isPattOpt
 
    return isPattOpt;
  })();
  /// #}}} @func _isPattOpt

  /// #}}} @group Option-Helpers

  /// #{{{ @group Dirs-Class

  /// #{{{ @constructor _Dirs
  /**
   * @private
   * @param {string} source
   * @param {!Object<string, *>} opts
   * @constructor
   * @struct
   */
  function _Dirs(source, opts) {

    /** @type {boolean} */
    var base;
    /** @type {string} */
    var path;
    /** @type {string} */
    var src;
    /** @type {boolean} */
    var abs;

    source = $cleanpath(source);
    src = $resolve(source);
    base = opts['base'];
    abs = opts['abs'];
    path = abs
      ? src
      : source;

    /// #{{{ @const SOURCE
    /**
     * @const {string}
     */
    this.SOURCE = source;
    /// #}}} @const SOURCE

    /// #{{{ @const SRC
    /**
     * @const {string}
     */
    this.SRC = src;
    /// #}}} @const SRC

    /// #{{{ @const BASE
    /**
     * @const {boolean}
     */
    this.BASE = base;
    /// #}}} @const BASE

    /// #{{{ @const ABS
    /**
     * @const {boolean}
     */
    this.ABS = abs;
    /// #}}} @const ABS

    /// #{{{ @const PATH
    /**
     * @const {string}
     */
    this.PATH = $addSlash(path);
    /// #}}} @const PATH

    /// #{{{ @func isValidDir
    /**
     * @param {string} name
     * @param {string} tree
     * @return {boolean}
     */
    this.isValidDir = _mkValidTests(source, _DFLT_DIRS_OPTS, opts, 'Dirs');
    /// #}}} @func isValidDir

    /// #{{{ @member trees
    /**
     * @type {!Array<string>}
     */
    this.trees = [];
    /// #}}} @member trees

    /// #{{{ @member paths
    /**
     * @type {!Array<string>}
     */
    this.paths = [];
    /// #}}} @member paths
  }
  _Dirs['prototype'] = $mkObj(NIL);
  _Dirs['prototype']['constructor'] = _Dirs;
  /// #}}} @constructor _Dirs

  /// #{{{ @func _Dirs.prototype.main
  /**
   * @private
   * @return {!Array<string>}
   */
  _Dirs['prototype'].main = function main() {

    this.getDirs(this.SRC, '');

    if (this.DEEP)
      this.getDirsDeep(this.SRC);

    return this.BASE
      ? this.paths
      : this.trees;
  }
  /// #}}} @func _Dirs.prototype.main

  /// #{{{ @func _Dirs.prototype.getDirs
  /**
   * @private
   * @param {string} src
   * @param {string} tree
   * @return {void}
   */
  _Dirs['prototype'].getDirs = function getDirs(src, tree) {

    /** @type {!Array<string>} */
    var trees;
    /** @type {!Array<string>} */
    var paths;
    /** @type {!Array<string>} */
    var names;
    /** @type {string} */
    var name;
    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    /**
     * @private
     * @const {string}
     */
    var SRC = $addSlash(src);

    /**
     * @private
     * @const {string}
     */
    var TREE = tree && $addSlash(tree);

    /**
     * @private
     * @const {string}
     */
    var PATH = this.PATH;

    /**
     * @private
     * @param {string} name
     * @param {string} tree
     * @return {boolean}
     */
    var isValidDir = this.isValidDir;

    trees = this.trees;
    paths = this.paths;

    names = $readDir(SRC);
    len = names['length'];
    i = -1;
    while (++i < len) {
      name = names[i];
      src = SRC + name;
      if ( $is.dir(src) ) {
        tree = TREE + name;
        if ( isValidDir(name, tree) ) {
          trees['push'](tree);
          paths['push'](PATH + name);
        }
      }
    }
  }
  /// #}}} @func _Dirs.prototype.getDirs

  /// #{{{ @func _Dirs.prototype.getDirsDeep
  /**
   * @private
   * @param {string} src
   * @return {void}
   */
  _Dirs['prototype'].getDirsDeep = function getDirsDeep(src) {

    /** @type {!Array<string>} */
    var trees;
    /** @type {string} */
    var tree;
    /** @type {number} */
    var i;

    /**
     * @private
     * @const {string}
     */
    var SRC = $addSlash(src);

    trees = this.trees;
    i = -1;
    while (++i < trees['length']) {
      tree = trees[i];
      src = SRC + tree;
      this.getDirs(src, tree);
    }
  }
  /// #}}} @func _Dirs.prototype.getDirsDeep

  /// #}}} @group Dirs-Class

  /// #{{{ @group Test-Factories

  /// #{{{ @func _mkValidTests
  /**
   * @private
   * @param {string} src
   * @param {!Object<string, *>} dfltOpts
   * @param {!Object<string, *>} usrOpts
   * @param {string=} type
   * @return {!function(string, string): boolean}
   */
  function _mkValidTests(src, dfltOpts, usrOpts, type) {

    /** @type {?function(string, string): boolean} */
    var isValidDflt;
    /** @type {?function(string, string): boolean} */
    var isValidUsr;
    /** @type {boolean} */
    var extinvalid;
    /** @type {boolean} */
    var extvalid;
    /** @type {string} */
    var invalid;
    /** @type {string} */
    var valid;
    /** @type {boolean} */
    var glob;

    type = type || '';
    glob = usrOpts['glob'];
    valid = 'valid' + type;
    invalid = 'invalid' + type;
    extvalid = usrOpts['extendValid' + type];
    extinvalid = usrOpts['extendInvalid' + type];

    isValidDflt = extvalid
      ? extinvalid
        ? _mkValidTest(src, glob, dfltOpts[valid], dfltOpts[invalid])
        : _mkValidTest(src, glob, dfltOpts[valid], NIL)
      : extinvalid
        ? _mkValidTest(src, glob, NIL, dfltOpts[invalid])
        : NIL;
    isValidUsr = _mkValidTest(src, glob, usrOpts[valid], usrOpts[invalid]);

    return isValidDflt
      ? isValidUsr
        ? function isValid(name, tree) {
            return isValidDflt(name, tree) && isValidUsr(name, tree);
          }
        : function isValid(name, tree) {
            return isValidDflt(name, tree);
          }
      : isValidUsr
        ? function isValid(name, tree) {
            return isValidUsr(name, tree);
          }
        : function isValid(name, tree) {
            return YES;
          };
  }
  /// #}}} @func _mkValidTests

  /// #}}} @group Test-Factories

  /// #}}} @group File-System-Helpers
  /// #}}} @on FS

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
