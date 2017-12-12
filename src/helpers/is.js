/**
 * ---------------------------------------------------------------------------
 * $IS HELPER
 * ---------------------------------------------------------------------------
 * @version 5.0.0
 * @see [vitals](https://github.com/imaginate/vitals)
 *
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life>
 */

/// #{{{ @helper $is
/**
 * @private
 * @const {!Object<string, !function>}
 * @struct
 */
var $is = (function __vitals$is__() {

  /// #if{{{ @build NODE

  /// #{{{ @func isAuthorityError
  /**
   * @param {*} val
   * @return {boolean}
   */
  function isAuthorityError(val) {

    if ( !isCodedError(val) ) {
      return $NO;
    }

    switch (val['code']) {
      case 'EACCES':
      case 'EPERM':
        return $YES;
    }
    return $NO;
  }
  /// #}}} @func isAuthorityError

  /// #{{{ @func isBuffer
  /**
   * @param {*} val
   * @return {boolean}
   */
  var isBuffer = $BUFF['isBuffer'];
  /// #}}} @func isBuffer

  /// #{{{ @func isCodedError
  /**
   * @param {*} val
   * @return {boolean}
   */
  function isCodedError(val) {
    return $isErr(val) && $own(val, 'code') && $isStr(val['code']);
  }
  /// #}}} @func isCodedError

  /// #{{{ @func isExistError
  /**
   * @param {*} val
   * @return {boolean}
   */
  function isExistError(val) {
    return isCodedError(val) && val['code'] === 'EEXIST';
  }
  /// #}}} @func isExistError

  /// #if}}} @build NODE

  /// #{{{ @func isArrayLike
  /**
   * @param {(!Array|!Arguments|!Object|!Function)} val
   * @return {boolean}
   */
  function isArrayLike(val) {

    /** @type {number} */
    var len;

    if ( $isArr(val) ) {
      return $YES;
    }

    if ( !('length' in val) ) {
      return $NO;
    }

    len = val['length'];
    return $isNum(len) && isWholeNumber(len) && len >= 0;
  }
  /// #}}} @func isArrayLike

  /// #{{{ @func isEmpty
  /**
   * @description
   *   Checks if a value is considered empty. The definition of empty is
   *   defined as follows in order of priority (per the #val data type):
   *   - *`null`*!$
   *     `null` is considered empty.
   *   - *`undefined`*!$
   *     `undefined` is considered empty.
   *   - *`number`*!$
   *     Only `0` and `NaN` are considered empty.
   *   - *`string`*!$
   *     Only `""` is considered empty.
   *   - *`boolean`*!$
   *     Only `false` is considered empty.
   *   - *`function`*!$
   *     The [length property][func-length] must be `0` to be considered
   *     empty.
   *   - *`!Array`*!$
   *     The [length property][arr-length] must be `0` to be considered empty.
   *   - *`!Object`*!$
   *     The `object` must **not** [own][own] any properties to be considered
   *     empty.
   *   - *`*`*!$
   *     All other data types are **not** considered empty.
   * @param {*} val
   * @return {boolean}
   */
  function isEmpty(val) {

    /** @type {string} */
    var key;

    if (!!val) {
      switch ( $typeof(val) ) {
        case 'function':
          return val['length'] === 0;
        case 'object':
          if ($objStr(val) === '[object Array]') {
            return val['length'] === 0;
          }
          for (key in val) {
            if ( $own(val, key) ) {
              return $NO;
            }
          }
          break;
        default:
          return $NO;
      }
    }
    return $YES;
  }
  /// #}}} @func isEmpty

  /// #{{{ @const _EOL
  /**
   * @private
   * @const {!RegExp}
   */
  var _EOL = /^(?:cr|lf|crlf)$/i;
  /// #}}} @const _EOL

  /// #{{{ @func isEndOfLine
  /**
   * @param {string} val
   * @return {boolean}
   */
  function isEndOfLine(val) {
    return _EOL['test'](val);
  }
  /// #}}} @func isEndOfLine

  /// #{{{ @const _FLAGS
  /**
   * @private
   * @const {!RegExp}
   */
  var _FLAGS = (function __vitals$is_FLAGS__() {

    /** @type {!RegExp} */
    var pattern;
    /** @type {string} */
    var source;
    /** @type {string} */
    var flags;

    flags = 'img';

    if ('sticky' in $REGX_PROTO) {
      flags += 'y';
    }

    if ('unicode' in $REGX_PROTO) {
      flags += 'u';
    }

    source = '^(?:'
      + '[\\+\\-][' + flags + '\\+\\-]*'
      + '|'
      + '[' + flags + ']*'
      + ')$';

    pattern = new $REGX(source);
    pattern.FLAGS = flags;
    pattern.SRC = '/' + source + '/';

    return pattern;
  })();
  /// #}}} @const _FLAGS

  /// #{{{ @func isRegExpFlags
  /**
   * @param {string} val
   * @return {boolean}
   */
  function isRegExpFlags(val) {
    return _FLAGS['test'](val);
  }
  isRegExpFlags.FLAGS = _FLAGS.FLAGS;
  isRegExpFlags.SRC = _FLAGS.SRC;
  /// #}}} @func isRegExpFlags

  /// #{{{ @func isExtensible
  /**
   * @param {(!Object|!Function)} src
   * @return {boolean}
   */
  var isExtensible = $ENV.HAS.FUNCTION_IS_EXTENSIBLE
    ? $OBJ['isExtensible']
    : $ENV.HAS.OBJECT_IS_EXTENSIBLE
      ? (function __vitals$isObjectIsExtensiblePolyfill__() {

          /// #{{{ @func _isExtensible
          /**
           * @private
           * @param {!Object} src
           * @return {boolean}
           */
          var _isExtensible = $OBJ['isExtensible'];
          /// #}}} @func _isExtensible

          /// #{{{ @func isExtensible
          /**
           * @param {(!Object|!Function)} src
           * @return {boolean}
           */
          function isExtensible(src) {
            return $typeof(src) === 'object' && _isExtensible(src);
          }
          /// #}}} @func isExtensible

          return isExtensible;
        })()
      : function isExtensible(src) {
          return $NO;
        };
  /// #}}} @func isExtensible

  /// #{{{ @func isFrozen
  /**
   * @param {(!Object|!Function)} src
   * @return {boolean}
   */
  var isFrozen = $ENV.HAS.FUNCTION_IS_FROZEN
    ? $OBJ['isFrozen']
    : $ENV.HAS.OBJECT_IS_FROZEN
      ? (function __vitals$isObjectIsFrozenPolyfill__() {

          /// #{{{ @func _isFrozen
          /**
           * @private
           * @param {!Object} src
           * @return {boolean}
           */
          var _isFrozen = $OBJ['isFrozen'];
          /// #}}} @func _isFrozen

          /// #{{{ @func isFrozen
          /**
           * @param {(!Object|!Function)} src
           * @return {boolean}
           */
          function isFrozen(src) {
            return $typeof(src) === 'object' && _isFrozen(src);
          }
          /// #}}} @func isFrozen

          return isFrozen;
        })()
      : function isFrozen(src) {
          return $NO;
        };
  /// #}}} @func isFrozen

  /// #{{{ @func isSealed
  /**
   * @param {(!Object|!Function)} src
   * @return {boolean}
   */
  var isSealed = $ENV.HAS.FUNCTION_IS_SEALED
    ? $OBJ['isSealed']
    : $ENV.HAS.OBJECT_IS_SEALED
      ? (function __vitals$isObjectIsSealedPolyfill__() {

          /// #{{{ @func _isSealed
          /**
           * @private
           * @param {!Object} src
           * @return {boolean}
           */
          var _isSealed = $OBJ['isSealed'];
          /// #}}} @func _isSealed

          /// #{{{ @func isSealed
          /**
           * @param {(!Object|!Function)} src
           * @return {boolean}
           */
          function isSealed(src) {
            return $typeof(src) === 'object' && _isSealed(src);
          }
          /// #}}} @func isSealed

          return isSealed;
        })()
      : function isSealed(src) {
          return $NO;
        };
  /// #}}} @func isSealed

  /// #{{{ @func isWholeNumber
  /**
   * @param {number} val
   * @return {boolean}
   */
  function isWholeNumber(val) {
    return !(val % 1);
  }
  /// #}}} @func isWholeNumber

  /// #{{{ @func isOddNumber
  /**
   * @param {number} val
   * @return {boolean}
   */
  function isOddNumber(val) {
    return !!(val % 2);
  }
  /// #}}} @func isOddNumber

  /// #{{{ @func isEvenNumber
  /**
   * @param {number} val
   * @return {boolean}
   */
  function isEvenNumber(val) {
    return !(val % 2);
  }
  /// #}}} @func isEvenNumber

  /// #if{{{ @scope FS

  /// #{{{ @const _ABS_PATH
  /**
   * @private
   * @const {!RegExp}
   */
  var _ABS_PATH = /^(?:[a-zA-Z]:)?[\/\\]/;
  /// #}}} @const _ABS_PATH

  /// #{{{ @const _POSIX_PATH_FORMAT
  /**
   * @private
   * @const {!RegExp}
   */
  var _POSIX_PATH_FORMAT = /^(?:posi|linu|uni)?x$/i;
  /// #}}} @const _POSIX_PATH_FORMAT

  /// #{{{ @const _UNIVERSAL_PATH_FORMAT
  /**
   * @private
   * @const {!RegExp}
   */
  var _UNIVERSAL_PATH_FORMAT = /^u(?:ni(?:versal)?)?$/i;
  /// #}}} @const _UNIVERSAL_PATH_FORMAT

  /// #{{{ @const _WINDOWS_PATH_FORMAT
  /**
   * @private
   * @const {!RegExp}
   */
  var _WINDOWS_PATH_FORMAT = /^w(?:in(?:32|dows)?)?$/i;
  /// #}}} @const _WINDOWS_PATH_FORMAT

  /// #{{{ @func _isDirectory
  /**
   * @private
   * @param {string} path
   * @return {boolean}
   */
  var _isDirectory = (function __vitals_isDirectory__() {

    /// #{{{ @var _err
    /**
     * @private
     * @type {*}
     */
    var _err;
    /// #}}} @var _err

    /// #{{{ @func _mkStat
    /**
     * @private
     * @param {string} path
     * @return {*}
     */
    var _mkStat = $FS['statSync'];
    /// #}}} @func _mkStat

    /// #{{{ @func _isDirectory
    /**
     * @private
     * @param {string} path
     * @return {*}
     */
    function _isDirectory(path) {
      try {
        return _mkStat(path)['isDirectory']();
      }
      catch (_err) {}
    }
    /// #}}} @func _isDirectory

    /// #{{{ @func isDirectory
    /**
     * @param {string} path
     * @return {boolean}
     */
    function isDirectory(path) {
      return !!_isDirectory(path);
    }
    /// #}}} @func isDirectory

    return isDirectory;
  })();
  /// #}}} @func _isDirectory

  /// #{{{ @func _isGenericFile
  /**
   * @private
   * @param {string} path
   * @return {boolean}
   */
  var _isGenericFile = (function __vitals_isGenericFile__() {

    /// #{{{ @var _err
    /**
     * @private
     * @type {*}
     */
    var _err;
    /// #}}} @var _err

    /// #{{{ @func _exists
    /**
     * @private
     * @param {string} path
     * @return {*}
     */
    var _exists = $FS['existsSync'];
    /// #}}} @func _exists

    /// #{{{ @func _isGenericFile
    /**
     * @private
     * @param {string} path
     * @return {*}
     */
    function _isGenericFile(path) {
      try {
        return _exists(path);
      }
      catch (_err) {}
    }
    /// #}}} @func _isGenericFile

    /// #{{{ @func isGenericFile
    /**
     * @param {string} path
     * @return {boolean}
     */
    function isGenericFile(path) {
      return !!_isGenericFile(path);
    }
    /// #}}} @func isGenericFile

    return isGenericFile;
  })();
  /// #}}} @func _isGenericFile

  /// #{{{ @func _isRegularFile
  /**
   * @private
   * @param {string} path
   * @return {boolean}
   */
  var _isRegularFile = (function __vitals_isRegularFile__() {

    /// #{{{ @var _err
    /**
     * @private
     * @type {*}
     */
    var _err;
    /// #}}} @var _err

    /// #{{{ @func _mkStat
    /**
     * @private
     * @param {string} path
     * @return {*}
     */
    var _mkStat = $FS['statSync'];
    /// #}}} @func _mkStat

    /// #{{{ @func _isRegularFile
    /**
     * @private
     * @param {string} path
     * @return {*}
     */
    function _isRegularFile(path) {
      try {
        return _mkStat(path)['isFile']();
      }
      catch (_err) {}
    }
    /// #}}} @func _isRegularFile

    /// #{{{ @func isRegularFile
    /**
     * @param {string} path
     * @return {boolean}
     */
    function isRegularFile(path) {
      return !!_isRegularFile(path);
    }
    /// #}}} @func isRegularFile

    return isRegularFile;
  })();
  /// #}}} @func _isRegularFile

  /// #{{{ @func _isSymbolicLink
  /**
   * @private
   * @param {string} path
   * @return {boolean}
   */
  var _isSymbolicLink = (function __vitals_isSymbolicLink__() {

    /// #{{{ @var _err
    /**
     * @private
     * @type {*}
     */
    var _err;
    /// #}}} @var _err

    /// #{{{ @func _mkStat
    /**
     * @private
     * @param {string} path
     * @return {*}
     */
    var _mkStat = $FS['lstatSync'];
    /// #}}} @func _mkStat

    /// #{{{ @func _isSymbolicLink
    /**
     * @private
     * @param {string} path
     * @return {*}
     */
    function _isSymbolicLink(path) {
      try {
        return _mkStat(path)['isSymbolicLink']();
      }
      catch (_err) {}
    }
    /// #}}} @func _isSymbolicLink

    /// #{{{ @func isSymbolicLink
    /**
     * @param {string} path
     * @return {boolean}
     */
    function isSymbolicLink(path) {
      return !!_isSymbolicLink(path);
    }
    /// #}}} @func isSymbolicLink

    return isSymbolicLink;
  })();
  /// #}}} @func _isSymbolicLink

  /// #{{{ @func isAbsolutePath
  /**
   * @param {string} path
   * @return {boolean}
   */
  function isAbsolutePath(path) {
    return _ABS_PATH['test'](path);
  }
  /// #}}} @func isAbsolutePath

  /// #{{{ @func isDirectory
  /**
   * @param {*} path
   * @return {boolean}
   */
  function isDirectory(path) {
    return $isChar(path) && _isDirectory(path);
  }
  /// #}}} @func isDirectory

  /// #{{{ @func isFileClass
  /**
   * @param {*} val
   * @return {boolean}
   */
  function isFileClass(val) {
    return $isObj(val)
      && '__VITALS_FILE_CLASS__' in val
      && !$own(val, '__VITALS_FILE_CLASS__')
      && val['__VITALS_FILE_CLASS__'] === $YES;
  }
  /// #}}} @func isFileClass

  /// #{{{ @func isGenericFile
  /**
   * @param {*} path
   * @return {boolean}
   */
  function isGenericFile(path) {
    return $isChar(path) && _isGenericFile(path);
  }
  /// #}}} @func isGenericFile

  /// #{{{ @func isPathFormat
  /**
   * @param {string} format
   * @return {boolean}
   */
  function isPathFormat(format) {
    return isUniversalPathFormat(format)
      || isPosixPathFormat(format)
      || isWindowsPathFormat(format);
  }
  /// #}}} @func isPathFormat

  /// #{{{ @func isPosixPathFormat
  /**
   * @param {string} format
   * @return {boolean}
   */
  function isPosixPathFormat(format) {
    return _POSIX_PATH_FORMAT['test'](format);
  }
  /// #}}} @func isPosixPathFormat

  /// #{{{ @func isRegularFile
  /**
   * @param {*} path
   * @return {boolean}
   */
  function isRegularFile(path) {
    return $isChar(path) && _isRegularFile(path);
  }
  /// #}}} @func isRegularFile

  /// #{{{ @func isSymbolicLink
  /**
   * @param {*} path
   * @return {boolean}
   */
  function isSymbolicLink(path) {
    return $isChar(path) && _isSymbolicLink(path);
  }
  /// #}}} @func isSymbolicLink

  /// #{{{ @func isUniversalPathFormat
  /**
   * @param {string} format
   * @return {boolean}
   */
  function isUniversalPathFormat(format) {
    return _UNIVERSAL_PATH_FORMAT['test'](format);
  }
  /// #}}} @func isUniversalPathFormat

  /// #{{{ @func isWindowsPathFormat
  /**
   * @param {string} format
   * @return {boolean}
   */
  function isWindowsPathFormat(format) {
    return _WINDOWS_PATH_FORMAT['test'](format);
  }
  /// #}}} @func isWindowsPathFormat

  /// #if}}} @scope FS

  /// #{{{ @const $is
  /**
   * @const {!Object<string, !function>}
   * @struct
   */
  var $is = {

    /// #{{{ @group primitives
    nil:  $isNull,
    void: $isVoid,
    bool: $isBool,
    str:  $isStr,
    _str: $isChar,
    num:  $isNum,
    nan:  $isNan,
    /// #}}} @group primitives

    /// #{{{ @group js-objects
    obj:   $isObj,
    plain: $isObjInst,
    _obj:  $isFunObj,
    fun:   $isFun,
    arr:   $isArr,
    _arr:  $isArrgs,
    args:  $isArgs,
    regx:  $isRegx,
    date:  $isDate,
    err:   $isErr,
    /// #}}} @group js-objects

    /// #{{{ @group dom-objects
    doc:  $isDomDoc,
    elem: $isDomElem,
    /// #}}} @group dom-objects

    /// #if{{{ @build NODE
    /// #{{{ @group node-objects
    autherr:  isAuthorityError,
    buff:     isBuffer,
    codederr: isCodedError,
    existerr: isExistError,
    /// #}}} @group node-objects
    /// #if}}} @build NODE

    /// #{{{ @group special
    arrish: isArrayLike,
    empty:  isEmpty,
    eol:    isEndOfLine,
    flags:  isRegExpFlags,
    /// #}}} @group special

    /// #{{{ @group object-states
    extend: isExtensible,
    frozen: isFrozen,
    sealed: isSealed,
    /// #}}} @group object-states

    /// #{{{ @group number-states
    whole: isWholeNumber,
    odd:   isOddNumber,
    /// #ifnot{{{ @build NODE
    even:  isEvenNumber
    /// #ifnot}}} @build NODE
    /// #if{{{ @build NODE
    even:  isEvenNumber,
    /// #if}}} @build NODE
    /// #}}} @group number-states

    /// #if{{{ @scope FS
    /// #{{{ @group file-system
    abspath: isAbsolutePath,
    dir:     isDirectory,
    vfc:     isFileClass,
    genfile: isGenericFile,
    fmt:     isPathFormat,
    regfile: isRegularFile,
    symlink: isSymbolicLink,
    ufmt:    isUniversalPathFormat,
    wfmt:    isWindowsPathFormat,
    xfmt:    isPosixPathFormat
    /// #}}} @group file-system
    /// #if}}} @scope FS
  };
  /// #}}} @const $is

  return $is;
})();
/// #}}} @helper $is

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
