/**
 * ---------------------------------------------------------------------------
 * VITALS.COPY
 * ---------------------------------------------------------------------------
 * @section base
 * @section fs
 * @version 4.1.3
 * @see [vitals.copy](https://github.com/imaginate/vitals/wiki/vitals.copy)
 *
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2017 Adam A Smith <adam@imaginate.life> (https://imaginate.life)
 */

/// #{{{ @on SOLO
/// #include @macro OPEN_WRAPPER ../macros/wrapper.js
/// #include @core constants ../core/constants.js
/// #include @core helpers ../core/helpers.js
/// #{{{ @off FS_ONLY
/// #include @helper $merge ../helpers/merge.js
/// #include @helper $inStr ../helpers/in-str.js
/// #}}} @off FS_ONLY
/// #{{{ @on FS
/// #include @helper $match ../helpers/match.js
/// #include @helper $mkdir ../helpers/mkdir.js
/// #include @helper $fixEol ../helpers/fix-eol.js
/// #include @helper $readDir ../helpers/read-dir.js
/// #include @helper $pathname ../helpers/pathname.js
/// #include @helper $addSlash ../helpers/add-slash.js
/// #include @helper $cloneObj ../helpers/clone-obj.js
/// #include @helper $readFile ../helpers/read-file.js
/// #include @helper $writeFile ../helpers/write-file.js
/// #}}} @on FS
/// #}}} @on SOLO

/// #{{{ @super copy
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
var copy = (function copyPrivateScope() {

  /// #{{{ @docrefs copy
  /// @docref [own]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty)
  /// @docref [clone]:(https://en.wikipedia.org/wiki/Cloning_(programming))
  /// @docref [ecma3]:(http://www.ecma-international.org/publications/files/ECMA-ST-ARCH/ECMA-262,%203rd%20edition,%20December%201999.pdf)
  /// @docref [ecma5]:(http://www.ecma-international.org/ecma-262/5.1/index.html)
  /// @docref [minify]:(https://en.wikipedia.org/wiki/Minification_(programming))
  /// @docref [arr-slice]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)
  /// @docref [func-name]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/name)
  /// @docref [arr-length]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/length)
  /// @docref [func-length]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/length)
  /// @docref [regex-global]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/global)
  /// @docref [regex-source]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/source)
  /// #}}} @docrefs copy

  /// #{{{ @on FS_ONLY
  /**
   * @public
   * @type {!Object<string, !Function>}
   * @dict
   */
  var copy = {};
  /// #}}} @on FS_ONLY

  /// #{{{ @off FS_ONLY
  /// #{{{ @submethod main
  /// @section base
  /// @method vitals.copy
  /**
   * @description
   *   Makes a [copy][clone] of any value. Note that for `array` values @slice 
   *   only copies the indexed properties while @copy copies all of the
   *   properties.
   * @public
   * @param {*} val
   *   The value to copy.
   * @param {boolean=} deep = `false`
   *   Whether to recursively copy property values for an `object` or
   *   `function`.
   * @return {*}
   */
  function copy(val, deep) {

    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #val defined');
      case 1:
        break;
      default:
        if ( !$is.void(deep) && !$is.bool(deep) )
          throw _mkTypeErr(new TYPE_ERR, 'deep', deep, 'boolean=');
    }

    return !$is._obj(val)
      ? val
      : $is.fun(val)
        ? _copyFunc(val, deep)
        : $is._arr(val)
          ? _copyArr(val, deep)
          : $is.regx(val)
            ? _copyRegex(val)
            : _copyObj(val, deep);  
  }
  /// #}}} @submethod main

  /// #{{{ @submethod object
  /// @section base
  /// @method vitals.copy.object
  /// @alias vitals.copy.obj
  /**
   * @description
   *   Makes a [copy][clone] of an `object`. By default it shallowly copies
   *   all [owned][own] properties of the #source with the option to deeply
   *   [copy][clone] them as well.
   * @public
   * @param {!Object} source
   * @param {boolean=} deep = `false`
   *   Whether to recursively [copy][clone] the #source property values.
   * @return {!Object}
   *   A new `object` [copied][clone] from the #source.
   */
  function copyObject(source, deep) {

    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #source defined', 'object');
      case 1:
        break;
      default:
        if ( !$is.void(deep) && !$is.bool(deep) )
          throw _mkTypeErr(new TYPE_ERR, 'deep', deep, 'boolean=', 'object');
    }

    if ( !$is.obj(source) )
      throw _mkTypeErr(new TYPE_ERR, 'source', source, '!Object', 'object');

    return _copyObj(source, deep);
  }
  copy['object'] = copyObject;
  copy['obj'] = copyObject;
  /// #}}} @submethod object

  /// #{{{ @submethod array
  /// @section base
  /// @method vitals.copy.array
  /// @alias vitals.copy.arr
  /// @alias vitals.copy.args
  /**
   * @description
   *   Makes a [copy][clone] of an `array` or array-like `object`. Note that
   *   @slice#array only copies the indexed properties while @copy#array
   *   copies all of the indexed and [owned][own] properties. By default it
   *   shallowly copies all of the #source properties with the option to
   *   deeply [copy][clone] them as well.
   * @public
   * @param {(!Array|!Arguments|!Object)} source
   *   Must be an `array` or array-like `object`. The #source is considered
   *   array-like when it [owns][own] a property with the `"length"` key name
   *   (e.g. `source.length` like the `array` [length property][arr-length])
   *   whose value is a whole `number` that is greater than or equal to zero
   *   (e.g. `isWholeNumber(source.length) && source.length >= 0`).
   * @param {boolean=} deep = `false`
   *   Whether to recursively [copy][clone] the #source property values.
   * @return {!Array}
   *   A new `array` [copied][clone] from the #source.
   */
  function copyArray(source, deep) {

    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #source defined', 'array');
      case 1:
        break;
      default:
        if ( !$is.void(deep) && !$is.bool(deep) )
          throw _mkTypeErr(new TYPE_ERR, 'deep', deep, 'boolean=', 'array');
    }

    if ( !$is.obj(source) )
      throw _mkTypeErr(new TYPE_ERR, 'source', source,
        '(!Array|!Arguments|!Object)', 'array');
    if ( !$is.arrish(source) )
      throw _mkErr(new ERR, '#source failed `array-like` test (#source.' +
        'length must be a whole `number` that is `0` or more)', 'array');

    return _copyArr(source, deep);
  }
  copy['array'] = copyArray;
  copy['arr'] = copyArray;
  copy['args'] = copyArray;
  /// #}}} @submethod array

  /// #{{{ @submethod regexp
  /// @section base
  /// @method vitals.copy.regexp
  /// @alias vitals.copy.regex
  /// @alias vitals.copy.re
  /**
   * @description
   *   Makes a [copy][clone] of a `RegExp`.
   * @public
   * @param {!RegExp} source
   * @param {(boolean|undefined)=} forceGlobal = `undefined`
   *   Override the [global setting][regex-global] for the returned `RegExp`.
   *   If the #forceGlobal is `undefined`, the [global setting][regex-global]
   *   from the #source is used.
   * @return {!RegExp}
   *   A new `RegExp` with the [RegExp.prototype.source][regex-source] value
   *   and the `RegExp` flag settings of the provided #source `RegExp`.
   */
  function copyRegExp(source, forceGlobal) {

    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #source defined', 'regexp');
      case 1:
        break;
      default:
        if ( !$is.void(forceGlobal) && !$is.bool(forceGlobal) )
          throw _mkTypeErr(new TYPE_ERR, 'forceGlobal', forceGlobal,
            'boolean=', 'regexp');
    }

    if ( !$is.regx(source) )
      throw _mkTypeErr(new TYPE_ERR, 'source', source, '!RegExp', 'regexp');

    return _copyRegex(source, forceGlobal);
  }
  copy['regexp'] = copyRegExp;
  copy['regex'] = copyRegExp;
  copy['re'] = copyRegExp;
  /// #}}} @submethod regexp

  /// #{{{ @submethod func
  /// @section base
  /// @method vitals.copy.fn
  /// @alias vitals.copy.function
  ///   Note that `vitals.copy.function` will fail in all ES3 and some ES5
  ///   browser and other platform environments. Use `vitals.copy.func` for
  ///   compatibility with older environments.
  /**
   * @description
   *   Makes a [copy][clone] of a `function`. By default it shallowly copies
   *   all [owned][own] properties of the #source with the option to deeply
   *   [copy][clone] them as well. Note that the
   *   [length property][func-length] will be set to `0` and the
   *   [name property][func-name] will be set to `"funcCopy"` for
   *   [unminified][minify] `vitals` sources. Also note that
   *   `vitals.copy.function` is not valid in [ES3][ecma3] and some
   *   [ES5][ecma5] browser and other platform environments. Use
   *   `vitals.copy.func` for browser and platform safety.
   * @public
   * @param {!Function} source
   * @param {boolean=} deep = `false`
   *   Whether to recursively [copy][clone] the #source property values.
   * @return {!Function}
   *   A new `function` [copied][clone] from the #source.
   */
  function copyFunction(source, deep) {

    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #source defined', 'function');
      case 1:
        break;
      default:
        if ( !$is.void(deep) && !$is.bool(deep) )
          throw _mkTypeErr(new TYPE_ERR, 'deep', deep, 'boolean=',
            'function');
    }

    if ( !$is.fun(source) )
      throw _mkTypeErr(new TYPE_ERR, 'source', source, '!Function',
        'function');

    return _copyFunc(source, deep);
  }
  copy['func'] = copyFunction;
  try {
    copy['fn'] = copyFunction;
    copy['function'] = copyFunction;
  }
  catch (e) {}
  /// #}}} @submethod func
  /// #}}} @off FS_ONLY

  /// #{{{ @on FS
  /// #{{{ @submethod file
  /// @section fs
  /// @method vitals.copy.file
  /**
   * @description
   *   Copy the contents of a file to a new or existing file.
   * @public
   * @param {string} source
   *   Must be a valid filepath to an existing file.
   * @param {string} dest
   *   Must be a valid filepath to a new or existing file, a valid dirpath to
   *   an existing directory, or a valid dirpath to a new directory noted by
   *   ending the #dest `string` with `"/"`.
   * @param {(?Object|?boolean)=} opts
   *   If the #opts is a `boolean` value, it sets the #opts.buffer option to
   *   its value.
   * @param {boolean=} opts.buffer = `true`
   *   If set to `true`, the #opts.buffer option directs @copy#file to not
   *   convert the `buffer` of the #source file's contents into a `string`
   *   before saving it to the #dest file (i.e. do not apply any normalization
   *   to the #source contents while copying). This also determines whether a
   *   `buffer` or `string` of the #source contents is returned.
   * @param {string=} opts.encoding = `"utf8"`
   *   The #opts.encoding option only applies if #opts.buffer is `false`.
   * @param {?string=} opts.eol = `"LF"`
   *   The #opts.eol option only applies if #opts.buffer is `false`. It sets
   *   the end of line character to use when normalizing the #source contents
   *   before they are saved to the #dest. If #opts.eol is set to `null`, no
   *   end of line character normalization is completed. The optional `string`
   *   values are as follows (values are **not** case-sensitive):
   *   - `"LF"`
   *   - `"CR"`
   *   - `"CRLF"`
   * @return {(!Buffer|string)}
   *   The #source file's contents.
   */
  function copyFile(source, dest, opts) {

    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #source defined', 'file');

      case 1:
        throw _mkErr(new ERR, 'no #dest defined', 'file');

      case 2:
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

    if ( !$is.str(source) )
      throw _mkTypeErr(new TYPE_ERR, 'source', source, 'string', 'file');
    else if (!source)
      throw _mkErr(new ERR, 'invalid empty #source `string`', 'file');
    else if ( !$is.file(source) )
      throw _mkErr(new ERR, 'invalid #source file path `' + source + '`',
        'file');

    if ( !$is.str(dest) )
      throw _mkTypeErr(new TYPE_ERR, 'dest', dest, 'string', 'file');
    else if (!dest)
      throw _mkErr(new ERR, 'invalid empty #dest `string`', 'file');

    if ( _hasDirMark(dest) )
      $mkdir(dest);

    if ( $is.dir(dest) )
      dest = $resolve(dest, $pathname(source));

    return _copyFile(source, dest, opts);
  }
  copy['file'] = copyFile;
  /// #}}} @submethod file

  /// #{{{ @submethod directory
  /// @section fs
  /// @method vitals.copy.directory
  /// @alias vitals.copy.dir
  /**
   * @description
   *   Copy all of the files in a directory to another directory.
   * @public
   * @param {string} source
   *   Must be a valid directory path to an existing directory.
   * @param {string} dest
   *   Must be a valid directory path to an existing directory or a valid
   *   directory path to a new directory noted by ending the #dest `string`
   *   with `"/"`.
   * @param {(?Object|?boolean)=} opts
   *   If the #opts is a `boolean` value, it sets the #opts.deep option to its
   *   value.
   * @param {boolean=} opts.deep = `false`
   *   The #opts.deep option tells @copy#directory whether it should
   *   recursively copy all of the sub-directory trees within the #source.
   * @param {boolean=} opts.recursive
   *   An alias for the #opts.deep option.
   * @param {boolean=} opts.buffer = `true`
   *   If set to `true`, the #opts.buffer option directs @copy#directory to
   *   not convert the `buffer` of each #source file's contents into a
   *   `string` before saving it into the #dest directory (i.e. do not apply
   *   any normalization to the #source contents while copying).
   * @param {string=} opts.encoding = `"utf8"`
   *   The #opts.encoding option only applies if #opts.buffer is `false`.
   * @param {?string=} opts.eol = `"LF"`
   *   The #opts.eol option only applies if #opts.buffer is `false`. It sets
   *   the end of line character to use when normalizing the #source contents
   *   before they are saved to the #dest. If #opts.eol is set to `null`, no
   *   end of line character normalization is completed. The optional `string`
   *   values are as follows (values are **not** case-sensitive):
   *   - `"LF"`
   *   - `"CR"`
   *   - `"CRLF"`
   * @return {!Array<string>}
   *   An `array` of each file name copied from the #source to the #dest.
   */
  function copyDirectory(source, dest, opts) {

    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #source defined', 'directory');

      case 1:
        throw _mkErr(new ERR, 'no #dest defined', 'directory');

      case 2:
        /** @dict */
        opts = $cloneObj(_DFLT_DIR_OPTS);
        break;

      default:
        if ( $is.void(opts) || $is.nil(opts) ) {
          /** @dict */
          opts = $cloneObj(_DFLT_DIR_OPTS);
          break;
        }

        if ( $is.bool(opts) ) {
          if (opts) {
            /** @dict */
            opts = $cloneObj(_DFLT_DIR_OPTS);
            opts['deep'] = YES;
          }
          else {
            /** @dict */
            opts = $cloneObj(_DFLT_DIR_OPTS);
            opts['deep'] = NO;
          }
          break;
        }

        if ( !$is.obj(opts) )
          throw _mkTypeErr(new TYPE_ERR, 'opts', opts, '(?Object|?boolean)=',
            'directory');

        /** @dict */
        opts = $cloneObj(opts);

        if ( !$hasOpt(opts, 'recursive') )
          opts['recursive'] = VOID;
        else if ( !$is.bool(opts['recursive']) )
          throw _mkTypeErr(new TYPE_ERR, 'opts.recursive', opts['recursive'],
            'boolean=', 'directory');

        if ( !$hasOpt(opts, 'deep') )
          opts['deep'] = $is.bool(opts['recursive'])
            ? opts['recursive']
            : _DFLT_DIR_OPTS['deep'];
        else if ( !$is.bool(opts['deep']) )
          throw _mkTypeErr(new TYPE_ERR, 'opts.deep', opts['deep'],
            'boolean=', 'directory');

        if ( !$hasOpt(opts, 'buffer') )
          opts['buffer'] = _DFLT_DIR_OPTS['buffer'];
        else if ( !$is.bool(opts['buffer']) )
          throw _mkTypeErr(new TYPE_ERR, 'opts.buffer', opts['buffer'],
            'boolean=', 'directory');

        if ( !$hasOpt(opts, 'encoding') )
          opts['encoding'] = _DFLT_DIR_OPTS['encoding'];
        else if ( !$is.str(opts['encoding']) )
          throw _mkTypeErr(new TYPE_ERR, 'opts.encoding', opts['encoding'],
            'string=', 'directory');
        else if ( !opts['encoding'] )
          throw _mkErr(new ERR, 'invalid empty #opts.encoding `string`',
            'directory');

        if ( !$hasOpt(opts, 'eol') )
          opts['eol'] = _DFLT_DIR_OPTS['eol'];
        else if ( $is.str(opts['eol']) ) {
          if ( !$is.eol(opts['eol']) )
            throw _mkRangeErr(new RANGE_ERR, 'opts.eol',
              [ 'LF', 'CR', 'CRLF' ], 'directory');

          opts['eol'] = opts['eol']['toUpperCase']();
        }
        else if ( !$is.nil(opts['eol']) )
          throw _mkTypeErr(new TYPE_ERR, 'opts.eol', opts['eol'], '?string=',
            'directory');
    }

    if ( !$is.str(source) )
      throw _mkTypeErr(new TYPE_ERR, 'source', source, 'string', 'directory');
    else if (!source)
      throw _mkErr(new ERR, 'invalid empty #source `string`', 'directory');
    else if ( !$is.dir(source) )
      throw _mkErr(new ERR, 'invalid #source directory path `' + source + '`',
        'directory');

    if ( !$is.str(dest) )
      throw _mkTypeErr(new TYPE_ERR, 'dest', dest, 'string', 'directory');
    else if (!dest)
      throw _mkErr(new ERR, 'invalid empty #dest `string`', 'directory');

    if ( _hasDirMark(dest) )
      $mkdir(dest);

    if ( !$is.dir(dest) )
      throw _mkErr(new ERR, 'invalid #dest directory path `' + source + '`',
        'directory');

    return _copyDir(source, dest, opts);
  }
  copy['directory'] = copyDirectory;
  copy['dir'] = copyDirectory;
  /// #}}} @submethod directory
  /// #}}} @on FS

  /// #{{{ @group Copy-Helpers

  /// #{{{ @group Main-Helpers

  /// #{{{ @off FS_ONLY
  /// #{{{ @func _copyObj
  /**
   * @private
   * @param {!Object} obj
   * @param {(boolean|undefined)=} deep
   * @return {!Object}
   */
  function _copyObj(obj, deep) {
    return deep
      ? _mergeDeep({}, obj)
      : $merge({}, obj);
  }
  /// #}}} @func _copyObj

  /// #{{{ @func _copyArr
  /**
   * @private
   * @param {!Object} obj
   * @param {(boolean|undefined)=} deep
   * @return {!Array}
   */
  function _copyArr(obj, deep) {

    /** @type {!Array} */
    var arr;

    arr = new ARR(obj['length']);
    return deep
      ? _mergeDeep(arr, obj)
      : $merge(arr, obj);
  }
  /// #}}} @func _copyArr

  /// #{{{ @func _copyRegex
  /**
   * @private
   * @param {!RegExp} regex
   * @param {(boolean|undefined)=} forceGlobal
   * @return {!RegExp}
   */
  function _copyRegex(regex, forceGlobal) {

    /** @type {string} */
    var source;
    /** @type {string} */
    var flags;

    source = _escape(regex['source']);
    flags = _setupFlags(regex, forceGlobal);

    return flags
      ? new REGX(source, flags)
      : new REGX(source);
  }
  /// #}}} @func _copyRegex

  /// #{{{ @func _copyFunc
  /**
   * @private
   * @param {!Function} func
   * @param {(boolean|undefined)=} deep
   * @return {!Function}
   */
  function _copyFunc(func, deep) {

    /** @type {!Function} */
    function funcCopy() {
      return func['apply'](NIL, arguments);
    }

    return deep
      ? _mergeDeep(funcCopy, func)
      : $merge(funcCopy, func);
  }
  /// #}}} @func _copyFunc
  /// #}}} @off FS_ONLY

  /// #{{{ @on FS
  /// #{{{ @func _copyFile
  /**
   * @private
   * @param {string} source
   * @param {string} dest
   * @param {!Object} opts
   * @return {(!Buffer|string)}
   */
  function _copyFile(source, dest, opts) {

    /** @type {(!Buffer|string)} */
    var contents;

    if (opts['buffer']) {
      contents = $readFile(source);
      $writeFile(dest, contents);
    }
    else {
      contents = $readFile(source, opts['encoding']);

      if (opts['eol'])
        contents = $fixEol(contents, opts['eol']);

      $writeFile(dest, contents, opts['encoding']);
    }
    return contents;
  }
  /// #}}} @func _copyFile

  /// #{{{ @func _copyDir
  /**
   * @private
   * @param {string} src
   * @param {string} dest
   * @param {!Object} opts
   * @return {!Array<string>}
   */
  function _copyDir(src, dest, opts) {

    src = $resolve(src);
    dest = $resolve(dest);

    if (opts['deep'])
      _mkSubDirs(src, dest);

    return opts['buffer']
      ? _copyDirByBuffer(src, dest, opts['deep'])
      : _copyDirByString(src, dest, opts['deep'],
          opts['encoding'], opts['eol']);
  }
  /// #}}} @func _copyDir

  /// #{{{ @func _copyDirByBuffer
  /**
   * @private
   * @param {string} SRC
   * @param {string} DEST
   * @param {boolean} deep
   * @return {!Array<string>}
   */
  function _copyDirByBuffer(SRC, DEST, deep) {

    /** @type {!Array<string>} */
    var paths;
    /** @type {string} */
    var path;
    /** @type {string} */
    var dest;
    /** @type {string} */
    var src;
    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    paths = _getFilepaths(SRC, deep);
    len = paths['length'];
    i = -1;
    while (++i < len) {
      path = paths[i];
      src = $resolve(SRC, path);
      dest = $resolve(DEST, path);
      $writeFile(dest, $readFile(src));
    }
    return paths;
  }
  /// #}}} @func _copyDirByBuffer

  /// #{{{ @func _copyDirByString
  /**
   * @private
   * @param {string} SRC
   * @param {string} DEST
   * @param {boolean} deep
   * @param {string} encoding
   * @param {?string} eol
   * @return {!Array<string>}
   */
  function _copyDirByString(SRC, DEST, deep, encoding, eol) {

    /** @type {string} */
    var contents;
    /** @type {!Array<string>} */
    var paths;
    /** @type {string} */
    var path;
    /** @type {string} */
    var dest;
    /** @type {string} */
    var src;
    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    paths = _getFilepaths(SRC, deep);
    len = paths['length'];
    i = -1;
    while (++i < len) {
      path = paths[i];
      src = $resolve(SRC, path);
      dest = $resolve(DEST, path);
      contents = $readFile(src, encoding);
      if (eol)
        contents = $fixEol(contents, eol);
      $writeFile(dest, contents, encoding);
    }
    return paths;
  }
  /// #}}} @func _copyDirByString
  /// #}}} @on FS

  /// #}}} @group Main-Helpers

  /// #{{{ @off FS_ONLY
  /// #{{{ @group RegExp-Helpers

  /// #{{{ @const _FLAGS
  /**
   * @private
   * @const {!Object<string, string>}
   * @dict
   */
  var _FLAGS = (function _FLAGS_PrivateScope() {

    /**
     * @type {!Object<string, string>}
     * @dict
     */
    var flags;

    flags = {};
    flags['ignoreCase'] = 'i';
    flags['multiline'] = 'm';
    flags['global'] = 'g';

    if ('sticky' in REGX_PROTO)
      flags['sticky'] = 'y';
    if ('unicode' in REGX_PROTO)
      flags['unicode'] = 'u';

    return flags;
  })();
  /// #}}} @const _FLAGS

  /// #{{{ @func _escape
  /**
   * @description
   *   Returns a properly escaped [RegExp.prototype.source][regex-source].
   * @private
   * @param {string} source
   * @return {string}
   */
  var _escape = (function() {

    /** @type {?RegExp} */
    var pattern;

    pattern = /\n/['source'] !== '\\n'
      ? /\\/g
      : NIL;
    return pattern
      ? function _escape(source) {
          return source['replace'](pattern, '\\\\');
        }
      : function _escape(source) {
          return source;
        };
  })();
  /// #}}} @func _escape

  /// #{{{ @func _setupFlags
  /**
   * @private
   * @param {!RegExp} regex
   * @param {boolean=} forceGlobal
   * @return {string}
   */
  function _setupFlags(regex, forceGlobal) {

    /** @type {string} */
    var flags;
    /** @type {string} */
    var key;

    flags = '';
    for (key in _FLAGS) {
      if ( $own(_FLAGS, key) && regex[key] )
        flags += _FLAGS[key];
    }

    if ( $is.void(forceGlobal) )
      return flags;

    return $inStr(flags, 'g')
      ? forceGlobal
        ? flags
        : flags['replace']('g', '')
      : forceGlobal
        ? flags + 'g'
        : flags;
  }
  /// #}}} @func _setupFlags

  /// #}}} @group RegExp-Helpers

  /// #{{{ @group Merge-Helpers

  /// #{{{ @func _mergeDeep
  /**
   * @private
   * @param {(!Object|!Function)} dest
   * @param {(!Object|!Function)} source
   * @return {(!Object|!Function)}
   */
  function _mergeDeep(dest, source) {

    /** @type {string} */
    var key;

    for (key in source) {
      if ( $own(source, key) )
        dest[key] = copy(source[key], YES);
    }
    return dest;
  }
  /// #}}} @func _mergeDeep

  /// #}}} @group Merge-Helpers
  /// #}}} @off FS_ONLY

  /// #{{{ @on FS
  /// #{{{ @group Default-Options

  /// #{{{ @const _DFLT_FILE_OPTS
  /**
   * @private
   * @const {!Object<string, *>}
   * @dict
   */
  var _DFLT_FILE_OPTS = {
    'eol': 'LF',
    'buffer': YES,
    'encoding': 'utf8'
  };
  /// #}}} @const _DFLT_FILE_OPTS

  /// #{{{ @const _DFLT_DIR_OPTS
  /**
   * @private
   * @const {!Object<string, *>}
   * @dict
   */
  var _DFLT_DIR_OPTS = {
    'eol': 'LF',
    'deep': NO,
    'buffer': YES,
    'encoding': 'utf8'
  };
  /// #}}} @const _DFLT_DIR_OPTS

  /// #}}} @group Default-Options

  /// #{{{ @group File-System-Helpers

  /// #{{{ @func _appendDirpaths
  /**
   * @private
   * @param {string} SRC
   * @param {string} dirpath
   * @param {!Array<string>} dirpaths
   * @return {void}
   */
  function _appendDirpaths(SRC, dirpath, dirpaths) {

    /** @type {!Array<string>} */
    var paths;
    /** @type {string} */
    var src;
    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    dirpath = $addSlash(dirpath);
    src = $resolve(SRC, dirpath);
    paths = _getDirpaths(src);
    len = paths['length'];
    i = -1;
    while (++i < len)
      dirpaths['push'](dirpath + paths[i]);
  }
  /// #}}} @func _appendDirpaths

  /// #{{{ @func _appendFilepaths
  /**
   * @private
   * @param {string} SRC
   * @param {string} dirpath
   * @param {!Array<string>} filepaths
   * @return {void}
   */
  function _appendFilepaths(SRC, dirpath, filepaths) {

    /** @type {!Array<string>} */
    var paths;
    /** @type {string} */
    var src;
    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    dirpath = $addSlash(dirpath);
    src = $resolve(SRC, dirpath);
    paths = _getFilepaths(src);
    len = paths['length'];
    i = -1;
    while (++i < len)
      filepaths['push'](dirpath + paths[i]);
  }
  /// #}}} @func _appendFilepaths

  /// #{{{ @func _getDirpaths
  /**
   * @private
   * @param {string} SRC
   * @return {!Array<string>}
   */
  function _getDirpaths(SRC) {

    /** @type {!Array<string>} */
    var dirpaths;
    /** @type {string} */
    var dirpath;
    /** @type {!Array<string>} */
    var paths;
    /** @type {string} */
    var path;
    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    dirpaths = [];
    paths = $readDir(SRC);
    len = paths['length'];
    i = -1;
    while (++i < len) {
      dirpath = $cleanpath(paths[i]);
      path = $resolve(SRC, dirpath);
      if ( $is.dir(path) )
        dirpaths['push'](dirpath);
    }
    return dirpaths;
  }
  /// #}}} @func _getDirpaths

  /// #{{{ @func _getDirpathsDeep
  /**
   * @private
   * @param {string} SRC
   * @return {!Array<string>}
   */
  function _getDirpathsDeep(SRC) {

    /** @type {!Array<string>} */
    var dirpaths;
    /** @type {number} */
    var i;

    dirpaths = _getDirpaths(SRC);
    i = -1;
    while (++i < dirpaths['length'])
      _appendDirpaths(SRC, dirpaths[i], dirpaths);
    return dirpaths;
  }
  /// #}}} @func _getDirpathsDeep

  /// #{{{ @func _getFilepaths
  /**
   * @private
   * @param {string} SRC
   * @param {boolean=} deep
   * @return {!Array<string>}
   */
  function _getFilepaths(SRC, deep) {

    /** @type {!Array<string>} */
    var filepaths;
    /** @type {string} */
    var filepath;
    /** @type {!Array<string>} */
    var paths;
    /** @type {string} */
    var path;
    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    if (deep)
      return _getFilepathsDeep(SRC);

    filepaths = [];
    paths = $readDir(SRC);
    len = paths['length'];
    i = -1;
    while (++i < len) {
      filepath = $cleanpath(paths[i]);
      path = $resolve(SRC, filepath);
      if ( $is.file(path) )
        filepaths['push'](filepath);
    }
    return filepaths;
  }
  /// #}}} @func _getFilepaths

  /// #{{{ @func _getFilepathsDeep
  /**
   * @private
   * @param {string} SRC
   * @return {!Array<string>}
   */
  function _getFilepathsDeep(SRC) {

    /** @type {!Array<string>} */
    var filepaths;
    /** @type {!Array<string>} */
    var dirpaths;
    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    filepaths = _getFilepaths(SRC);
    dirpaths = _getDirpathsDeep(SRC);
    len = dirpaths['length'];
    i = -1;
    while (++i < len)
      _appendFilepaths(SRC, dirpaths[i], filepaths);
    return filepaths;
  }
  /// #}}} @func _getFilepathsDeep

  /// #{{{ @func _hasDirMark
  /**
   * @private
   * @param {string} path
   * @return {string}
   */
  var _hasDirMark = (function _hasDirMarkPrivateScope() {

    /// #{{{ @const _DIR_MARK
    /**
     * @private
     * @const {!RegExp}
     */
    var _DIR_MARK = /\/$/;
    /// #}}} @const _DIR_MARK

    /// #{{{ @func hasDirMark
    /**
     * @param {string} path
     * @return {string}
     */
    function hasDirMark(path) {
      return $match(path, _DIR_MARK);
    }
    /// #}}} @func hasDirMark

    return hasDirMark;
  })();
  /// #}}} @func _hasDirMark

  /// #{{{ @func _mkSubDirs
  /**
   * @private
   * @param {string} SRC
   * @param {string} DEST
   * @return {void}
   */
  function _mkSubDirs(SRC, DEST) {

    /** @type {!Array<string>} */
    var paths;
    /** @type {string} */
    var path;
    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    paths = _getDirpathsDeep(SRC);
    len = paths['length'];
    i = -1;
    while (++i < len) {
      path = $resolve(DEST, paths[i]);
      $mkdir(path);
    }
  }
  /// #}}} @func _mkSubDirs

  /// #}}} @group File-System-Helpers
  /// #}}} @on FS

  /// #{{{ @group Error-Helpers

  /// #{{{ @const _MK_ERR
  /**
   * @private
   * @const {!Object<string, !function>}
   * @struct
   */
  var _MK_ERR = $mkErrs('copy');
  /// #}}} @const _MK_ERR
  /// #include @macro MK_ERR ../macros/mk-err.js

  /// #}}} @group Error-Helpers

  /// #}}} @group Copy-Helpers

  return copy;
})();
/// #{{{ @off SOLO
vitals['copy'] = copy;
/// #}}} @off SOLO
/// #}}} @super copy

/// #{{{ @on SOLO
var vitals = copy;
vitals['copy'] = copy;
/// #include @macro EXPORT ../macros/export.js
/// #include @macro CLOSE_WRAPPER ../macros/wrapper.js
/// #}}} @on SOLO

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
