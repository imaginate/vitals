/**
 * ---------------------------------------------------------------------------
 * VITALS.CP
 * ---------------------------------------------------------------------------
 * @section fs
 * @version 5.0.0
 * @see [vitals.cp](https://github.com/imaginate/vitals/wiki/vitals.cp)
 *
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life>
 */

/// #if{{{ @scope SOLO
/// #insert @wrapper OPEN ../macros/wrapper.js
/// #include @core constants ../core/constants.js
/// #include @core helpers ../core/helpers.js
/// #include @helper $match ../helpers/match.js
/// #include @helper $mkdir ../helpers/mkdir.js
/// #include @helper $fixEol ../helpers/fix-eol.js
/// #include @helper $hasOpt ../helpers/has-opt.js
/// #include @helper $readDir ../helpers/read-dir.js
/// #include @helper $pathname ../helpers/pathname.js
/// #include @helper $addSlash ../helpers/add-slash.js
/// #include @helper $cloneObj ../helpers/clone-obj.js
/// #include @helper $readFile ../helpers/read-file.js
/// #include @helper $writeFile ../helpers/write-file.js
/// #if}}} @scope SOLO

/// #{{{ @super cp
/// #ifnot{{{ @scope DOCS_ONLY
/**
 * @public
 * @const {!Function}
 * @dict
 */
var cp = (function cpPrivateScope() {
/// #ifnot}}} @scope DOCS_ONLY

  /// #if{{{ @docrefs cp
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
  /// #if}}} @docrefs cp

  /// #{{{ @submethod main
  /// #{{{ @docs main
  /// @section fs
  /// @method vitals.cp
  /// @alias vitals.cp.main
  /**
   * @description
   * @public
   */
  /// #}}} @docs main
  /// #if{{{ @code main
  function cp() {

    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #val defined');
      case 1:
        if ( !$is.void(deep) && !$is.bool(deep) ) {
          throw _mkTypeErr(new TYPE_ERR, 'deep', deep, 'boolean=');
        }
    }

  }
  cp['main'] = cp;
  /// #if}}} @code main
  /// #}}} @submethod main

  /// #{{{ @submethod file
  /// #{{{ @docs file
  /// @section fs
  /// @method vitals.cp.file
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
   *   If set to `true`, the #opts.buffer option directs @cp#file to not
   *   convert the `buffer` of the #source file's contents into a `string`
   *   before saving it to the #dest file (i.e. do not apply any normalization
   *   to the #source contents while copying). This also determines whether a
   *   `buffer` or `string` of the #source contents is returned.
   * @param {?string=} opts.encoding = `null`
   *   The #opts.encoding option sets the character encoding for the #source
   *   contents saved to the #dest file. If it is `null`, no character
   *   encoding is applied.
   * @param {?string=} opts.encode
   *   An alias for the #opts.encoding option.
   * @param {?string=} opts.eol = `null`
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
  /// #}}} @docs file
  /// #if{{{ @code file
  function cpFile(source, dest, opts) {

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
          opts['encoding'] = $is.void(opts['encode'])
            ? _DFLT_FILE_OPTS['encoding']
            : opts['encode'];
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

    return _cpFile(source, dest, opts);
  }
  cp['file'] = cpFile;
  /// #if}}} @code file
  /// #}}} @submethod file

  /// #{{{ @submethod directory
  /// #{{{ @docs directory
  /// @section fs
  /// @method vitals.cp.directory
  /// @alias vitals.cp.dir
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
   *   The #opts.deep option tells @cp#directory whether it should
   *   recursively copy all of the sub-directory trees within the #source.
   * @param {boolean=} opts.recursive
   *   An alias for the #opts.deep option.
   * @param {boolean=} opts.buffer = `true`
   *   If set to `true`, the #opts.buffer option directs @cp#directory to
   *   not convert the `buffer` of each #source file's contents into a
   *   `string` before saving it into the #dest directory (i.e. do not apply
   *   any normalization to the #source contents while copying).
   * @param {?string=} opts.encoding = `null`
   *   The #opts.encoding option sets the character encoding for each #source
   *   contents saved to each #dest file. If it is `null`, no character
   *   encoding is applied.
   * @param {?string=} opts.encode
   *   An alias for the #opts.encoding option.
   * @param {?string=} opts.eol = `null`
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
  /// #}}} @docs directory
  /// #if{{{ @code directory
  function cpDirectory(source, dest, opts) {

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

        if ( !$hasOpt(opts, 'encode') )
          opts['encode'] = VOID;
        else if ( $is.str(opts['encode']) ) {
          if (!opts['encode'])
            throw _mkErr(new ERR, 'invalid empty #opts.encode `string`',
              'directory');
        }
        else if ( !$is.nil(opts['encode']) )
          throw _mkTypeErr(new TYPE_ERR, 'opts.encode', opts['encode'],
            '?string=', 'directory');

        if ( !$hasOpt(opts, 'encoding') )
          opts['encoding'] = $is.void(opts['encode'])
            ? _DFLT_DIR_OPTS['encoding']
            : opts['encode'];
        else if ( $is.str(opts['encoding']) ) {
          if (!opts['encoding'])
            throw _mkErr(new ERR, 'invalid empty #opts.encoding `string`',
              'directory');
        }
        else if ( !$is.nil(opts['encoding']) )
          throw _mkTypeErr(new TYPE_ERR, 'opts.encoding', opts['encoding'],
            '?string=', 'directory');

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

    return _cpDir(source, dest, opts);
  }
  cp['directory'] = cpDirectory;
  cp['dir'] = cpDirectory;
  /// #if}}} @code directory
  /// #}}} @submethod directory

  /// #if{{{ @helpers cp

  /// #{{{ @group main

  /// #{{{ @func _cpFile
  /**
   * @private
   * @param {string} source
   * @param {string} dest
   * @param {!Object} opts
   * @return {(!Buffer|string)}
   */
  function _cpFile(source, dest, opts) {

    /** @type {(!Buffer|string)} */
    var contents;
    /** @type {?string} */
    var encoding;
    /** @type {?string} */
    var eol;

    encoding = opts['encoding'];
    eol = opts['eol'];

    if (opts['buffer']) {
      contents = $readFile(source);
      if (encoding)
        $writeFile(dest, contents, encoding);
      else
        $writeFile(dest, contents);
    }
    else if (encoding) {
      contents = $readFile(source, encoding);
      if (eol)
        contents = $fixEol(contents, eol);
      $writeFile(dest, contents, encoding);
    }
    else if (eol) {
      contents = $readFile(source);
      contents = contents['toString']();
      contents = $fixEol(contents, eol);
      $writeFile(dest, contents);
    }
    else {
      contents = $readFile(source);
      $writeFile(dest, contents);
      contents = contents['toString']();
    }
    return contents;
  }
  /// #}}} @func _cpFile

  /// #{{{ @func _cpDir
  /**
   * @private
   * @param {string} src
   * @param {string} dest
   * @param {!Object} opts
   * @return {!Array<string>}
   */
  function _cpDir(src, dest, opts) {

    /** @type {?string} */
    var encoding;
    /** @type {boolean} */
    var deep;
    /** @type {?string} */
    var eol;

    src = $resolve(src);
    dest = $resolve(dest);

    if (opts['deep'])
      _mkSubDirs(src, dest);

    eol = opts['eol'];
    deep = opts['deep'];
    encoding = opts['encoding'];

    return opts['buffer']
      ? encoding
        ? _cpDirByBuffWithEncode(src, dest, deep, encoding)
        : _cpDirByBuff(src, dest, deep)
      : encoding
        ? eol
          ? _cpDirByStrWithEncodeEol(src, dest, deep, encoding, eol)
          : _cpDirByStrWithEncode(src, dest, deep, encoding)
        : eol
          ? _cpDirByStrWithEol(src, dest, deep, eol)
          : _cpDirByStr(src, dest, deep);
  }
  /// #}}} @func _cpDir

  /// #{{{ @func _cpDirByBuff
  /**
   * @private
   * @param {string} SRC
   * @param {string} DEST
   * @param {boolean} deep
   * @return {!Array<string>}
   */
  function _cpDirByBuff(SRC, DEST, deep) {

    /** @type {!Buffer} */
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
      contents = $readFile(src);
      $writeFile(dest, contents);
    }
    return paths;
  }
  /// #}}} @func _cpDirByBuff

  /// #{{{ @func _cpDirByBuffWithEncode
  /**
   * @private
   * @param {string} SRC
   * @param {string} DEST
   * @param {boolean} deep
   * @param {string} encoding
   * @return {!Array<string>}
   */
  function _cpDirByBuffWithEncode(SRC, DEST, deep, encoding) {

    /** @type {!Buffer} */
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
      contents = $readFile(src);
      $writeFile(dest, contents, encoding);
    }
    return paths;
  }
  /// #}}} @func _cpDirByBuffWithEncode

  /// #{{{ @func _cpDirByStr
  /**
   * @private
   * @param {string} SRC
   * @param {string} DEST
   * @param {boolean} deep
   * @return {!Array<string>}
   */
  function _cpDirByStr(SRC, DEST, deep) {

    /** @type {!Buffer} */
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
      contents = $readFile(src);
      $writeFile(dest, contents);
    }
    return paths;
  }
  /// #}}} @func _cpDirByStr

  /// #{{{ @func _cpDirByStrWithEol
  /**
   * @private
   * @param {string} SRC
   * @param {string} DEST
   * @param {boolean} deep
   * @param {string} eol
   * @return {!Array<string>}
   */
  function _cpDirByStrWithEol(SRC, DEST, deep, eol) {

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
      contents = $readFile(src)['toString']();
      contents = $fixEol(contents, eol);
      $writeFile(dest, contents);
    }
    return paths;
  }
  /// #}}} @func _cpDirByStrWithEol

  /// #{{{ @func _cpDirByStrWithEncode
  /**
   * @private
   * @param {string} SRC
   * @param {string} DEST
   * @param {boolean} deep
   * @param {string} encoding
   * @return {!Array<string>}
   */
  function _cpDirByStrWithEncode(SRC, DEST, deep, encoding) {

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
      $writeFile(dest, contents, encoding);
    }
    return paths;
  }
  /// #}}} @func _cpDirByStrWithEncode

  /// #{{{ @func _cpDirByStrWithEncodeEol
  /**
   * @private
   * @param {string} SRC
   * @param {string} DEST
   * @param {boolean} deep
   * @param {string} encoding
   * @param {string} eol
   * @return {!Array<string>}
   */
  function _cpDirByStrWithEncodeEol(SRC, DEST, deep, encoding, eol) {

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
      contents = $fixEol(contents, eol);
      $writeFile(dest, contents, encoding);
    }
    return paths;
  }
  /// #}}} @func _cpDirByStrWithEncodeEol

  /// #}}} @group main

  /// #{{{ @group default-options

  /// #{{{ @const _DFLT_FILE_OPTS
  /**
   * @private
   * @const {!Object<string, *>}
   * @dict
   */
  var _DFLT_FILE_OPTS = {
    'eol': NIL,
    'buffer': YES,
    'encoding': NIL
  };
  /// #}}} @const _DFLT_FILE_OPTS

  /// #{{{ @const _DFLT_DIR_OPTS
  /**
   * @private
   * @const {!Object<string, *>}
   * @dict
   */
  var _DFLT_DIR_OPTS = {
    'eol': NIL,
    'deep': NO,
    'buffer': YES,
    'encoding': NIL
  };
  /// #}}} @const _DFLT_DIR_OPTS

  /// #}}} @group default-options

  /// #{{{ @group append-paths

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

  /// #}}} @group append-paths

  /// #{{{ @group check-paths

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

  /// #}}} @group check-paths

  /// #{{{ @group get-shallow-paths

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

  /// #}}} @group get-shallow-paths

  /// #{{{ @group get-deep-paths

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

  /// #}}} @group get-deep-paths

  /// #{{{ @group make-paths

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

  /// #}}} @group make-paths

  /// #{{{ @group errors

  /// #{{{ @const _MK_ERR
  /**
   * @private
   * @const {!Object<string, !function>}
   * @struct
   */
  var _MK_ERR = $mkErrs('cp');
  /// #}}} @const _MK_ERR

  /// #insert @code MK_ERR ../macros/mk-err.js

  /// #insert @code MK_TYPE_ERR ../macros/mk-err.js

  /// #insert @code MK_RANGE_ERR ../macros/mk-err.js

  /// #}}} @group errors

  /// #if}}} @helpers cp

/// #ifnot{{{ @scope DOCS_ONLY
  return cp;
})();
/// #ifnot{{{ @scope SOLO
vitals['cp'] = cp;
/// #ifnot}}} @scope SOLO
/// #ifnot}}} @scope DOCS_ONLY
/// #}}} @super cp

/// #if{{{ @scope SOLO
var vitals = cp;
vitals['cp'] = cp;
/// #insert @code EXPORT ../macros/export.js
/// #insert @wrapper CLOSE ../macros/wrapper.js
/// #if}}} @scope SOLO

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
