/**
 * ---------------------------------------------------------------------------
 * VITALS-FILE-CLASS
 * ---------------------------------------------------------------------------
 * @section fs
 * @version 5.0.0
 * @see [VitalsFileClass](https://github.com/imaginate/vitals/wiki/file-class)
 *
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life>
 */

/// #{{{ @class File
/// #ifnot{{{ @scope DOCS_ONLY
/**
 * @public
 * @const {!Function}
 * @dict
 */
$File = (function __vitalsFile__() {
/// #ifnot}}} @scope DOCS_ONLY

  /// #if{{{ @docrefs File
  /// @docref [own]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty)
  /// @docref [jsdoc]:(https://en.wikipedia.org/wiki/JSDoc)
  /// @docref [create]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create)
  /// @docref [closure-compiler]:(https://github.com/google/closure-compiler)
  /// #if}}} @docrefs File

  /// #{{{ @prototype File
  /// #{{{ @docs prototype
  /**
   * @description
   *   The @File#prototype object is the prototype for all new @File
   *   instances. Note that `vitals.File.prototype` should **never** be
   *   redefined to another object or value. The original object for
   *   @File#prototype is referenced internally via private variables instead
   *   of the `vitals.File.prototype` property. You can easily extend the
   *   @File class by using the @File#extend and @File#init methods, or you
   *   can update the original prototype's properties to your desired values
   *   (**warning:** read the appropriate documentation and code *before*
   *   altering the original prototype as many places internally expect some
   *   properties to be set with specific data types).
   * @public
   * @const {!Object}
   */
  /// #}}} @docs prototype
  /// #if{{{ @code prototype
  var VFC_PROTO = $mkObj($NIL);
  VitalsFileClass['prototype'] = VFC_PROTO;
  VFC_PROTO['super_'] = $NIL;
  VFC_PROTO['__VITALS_FILE_CLASS__'] = $YES;
  /// #if}}} @code prototype
  /// #}}} @prototype File

  /// #{{{ @constructor File
  /// #{{{ @docs main
  /// @section fs
  /// @method vitals.File
  /// @alias vitals.File.main
  /// @alias vitals.File.prototype.constructor
  /**
   * @description
   *   The @File class is a wrapper class for all generic files. It is used
   *   extensively throughout the code base. Instances of the @File class are
   *   accepted as values for many parameters by most methods within the @fs
   *   and are often returned by methods in the @fs. The official name for
   *   the @File class data type is `VitalsFileClass` which is used by all
   *   of the internal [JSDoc][jsdoc] and all of the public exports (e.g.
   *   [Google Closure Compiler][closure-compiler]). The abbreviation, `vfc`,
   *   and the shorthand, `File`, are used for many property references to
   *   @vitals methods that are relating to `VitalsFileClass` instances (e.g.
   *   @is#vfc and @mk#File), and only the shorthand, `File`, is used for the
   *   property reference to the class constructor (e.g. @File#main). The
   *   abbreviation reference, `vfc`, is used for methods due to the
   *   possibility for confusion between `file` and `File` references. All
   *   property references using `file` (e.g. @is#file and @mk#file) are
   *   relating to regular files and **not** `VitalsFileClass` instances. Note
   *   that the `new` keyword is not required when calling the @File#main
   *   constructor and will return a new `VitalsFileClass` instance.
   * @public
   * @param {string} path
   * @param {(?Object|?undefined)=} opts
   * @param {string=} opts.pwd
   * @param {string=} opts.format
   * @param {string=} opts.homedir
   * @param {string=} opts.basedir
   * @constructor
   */
  /// #}}} @docs main
  /// #if{{{ @code main
  function VitalsFileClass(path, opts) {

    if ( !$is.obj(this) || !(this instanceof VitalsFileClass) ) {
      return constructVitalsFileClass(path, opts);
    }

    initVitalsFileClass(this, path, opts);
  }
  VitalsFileClass['main'] = VitalsFileClass;
  VFC_PROTO['constructor'] = VitalsFileClass;
  /// #if}}} @code main
  /// #}}} @constructor File

  /// #{{{ @submethod construct
  /// #{{{ @docs construct
  /// @method vitals.File.construct
  /**
   * @description
   *   The @File#construct method creates a new @File instance without the
   *   `new` keyword. It is identical to calling `new vitals.File` (with the
   *   exception for the `new` keyword).
   *   ```
   *   vitals.File.construct = function construct(path, opts) {
   *     return new vitals.File(path, opts);
   *   };
   *   ```
   * @public
   * @param {string} path
   * @param {(?Object|?undefined)=} opts
   * @param {string=} opts.pwd
   * @param {string=} opts.format
   * @param {string=} opts.homedir
   * @param {string=} opts.basedir
   * @return {!VitalsFileClass}
   */
  /// #}}} @docs construct
  /// #if{{{ @code construct
  function constructVitalsFileClass(path, opts) {
    return new VitalsFileClass(path, opts);
  }
  VitalsFileClass['construct'] = constructVitalsFileClass;
  /// #if}}} @code construct
  /// #}}} @submethod construct

  /// #{{{ @submethod create
  /// #{{{ @docs create
  /// @method vitals.File.create
  /**
   * @description
   *   The @File#create method creates a new empty object that has its
   *   prototype set to @File#prototype. It is a polyfilled shortcut for
   *   calling [Object.create][create] with a *proto* of @File#prototype.
   *   ```
   *   vitals.File.create = function create() {
   *     return Object.create(vitals.File.prototype);
   *   };
   *   ```
   * @public
   * @return {!Object}
   */
  /// #}}} @docs create
  /// #if{{{ @code create
  function createVitalsFileClass() {
    return $mkObj(VFC_PROTO);
  }
  VitalsFileClass['create'] = createVitalsFileClass;
  /// #if}}} @code create
  /// #}}} @submethod create

  /// #{{{ @submethod extend
  /// #{{{ @docs extend
  /// @method vitals.File.extend
  /**
   * @description
   *   The @File#extend method sets the `"prototype"` property of the
   *   user-defined #constructor to a new object that has its prototype set to
   *   @File#prototype (see @File#create), its `"constructor"` property set to
   *   the #constructor, and its `"super_"` property set to @File#main.
   *   ```
   *   vitals.File.extend = function extend(constructor) {
   *     constructor.prototype = Object.create(vitals.File.prototype);
   *     constructor.prototype.constructor = constructor;
   *     constructor.prototype.super_ = vitals.File;
   *     return constructor;
   *   };
   *   ```
   * @public
   * @param {!Function} constructor
   * @return {!Function}
   */
  /// #}}} @docs extend
  /// #if{{{ @code extend
  function extendVitalsFileClass(constructor) {

    /** @type {!Object} */
    var proto;

    if (!arguments['length']) {
      throw _MKERR_EXTEND.noArg(new $ERR, 'constructor');
    }
    if ( !$is.fun(constructor) ) {
      throw _MKERR_EXTEND.type(new $TYPE_ERR, 'constructor', constructor,
        '!Function');
    }

    proto = $mkObj(VFC_PROTO);
    proto['constructor'] = constructor;
    proto['super_'] = VitalsFileClass;

    constructor['prototype'] = proto;

    return constructor;
  }
  VitalsFileClass['extend'] = extendVitalsFileClass;
  /// #if}}} @code extend
  /// #}}} @submethod extend

  /// #{{{ @submethod init
  /// #{{{ @docs init
  /// @method vitals.File.init
  /**
   * @description
   *   The @File#init method is the method used to setup all new
   *   `VitalsFileClass` instances. If you are extending the @File class,
   *   you should **use the @File#init method to setup your new class
   *   instance** instead of attempting any call to the @File#main
   *   constructor. Calling the @File#main constructor on your new class
   *   instance will either do nothing or overwrite your new class instance
   *   with a new `VitalsFileClass` instance which will cause all sorts of
   *   confusing bugs.
   *   ```
   *   // RUN THE VITALS FILE CLASS SETUP
   *   
   *   function YourExtendingClass() {
   *   
   *     // BAD - The Silent Nothing
   *     //   This call will NOT define any properties for `this` and will
   *     //   only throw `Error` instances for invalid parameter values.
   *     vitals.File.call(this, path, opts);
   *   
   *     // BAD - The Quiet Wipe
   *     //   This call will redefine the value of `this` from a new
   *     //   `YourExtendingClass` instance to a new `VitalsFileClass`
   *     //   instance (i.e. all prior setup for `this` is destroyed,
   *     //   `YourExtendingClass.prototype` is removed from `this`,
   *     //   and `this instanceof YourExtendingClass` will now fail).
   *     this = vitals.File.call(this, path, opts);
   *   
   *     // GOOD - The Right Way
   *     //   This call will run the `VitalsFileClass` setup on the new
   *     //   `YourExtendingClass` instance which will define all of
   *     //   the default `VitalsFileClass` properties on `this`.
   *     vitals.File.init(this, path, opts);
   *   
   *   }
   *   ```
   *   Remember to call @File#extend on your new class constructor before
   *   defining any prototype properties.
   *   ```
   *   // EXTEND YOUR NEW CLASS CONSTRUCTOR
   *   
   *   function YourExtendingClass() {
   *     vitals.File.init(this, path, opts);
   *   }
   *   
   *   // GOOD - The Proto Order
   *   //   This call will set `YourExtendingClass.prototype` to a new object
   *   //   with a `VitalsFileClass` prototype, a `"constructor"` property
   *   //   set to `YourExtendingClass`, and a `"super_"` property set to
   *   //   `VitalsFileClass` BEFORE defining any prototype methods.
   *   vitals.File.extend(YourExtendingClass);
   *   
   *   // OK - The Unpaid Overtime
   *   //   These calls will set `YourExtendingClass.prototype` to a new
   *   //   object with a `VitalsFileClass` prototype, a `"constructor"`
   *   //   property set to `YourExtendingClass`, and a `"super_"`
   *   //   property set to `VitalsFileClass` BEFORE defining
   *   //   any prototype methods.
   *   YourExtendingClass.prototype = vitals.File.create();
   *   YourExtendingClass.prototype.constructor = YourExtendingClass;
   *   YourExtendingClass.prototype.super_ = vitals.File;
   *   
   *   YourExtendingClass.prototype.method = function method(){};
   *   
   *   // BAD - The Late Omission
   *   //   This call will set `YourExtendingClass.prototype` to a new object
   *   //   with a `VitalsFileClass` prototype, a `"constructor"` property
   *   //   set to `YourExtendingClass`, and a `"super_"` property set to
   *   //   `VitalsFileClass` AFTER defining a prototype method.
   *   //   `YourExtendingClass.prototype.method` is deleted.
   *   vitals.File.extend(YourExtendingClass);
   *   
   *   ```
   *   Note that redefining `vitals.File.init` will **not** change any
   *   internal behavior and will only prevent you from using the @File#init
   *   method to easily setup your new class instance. To add custom logic to
   *   the setup of the original `VitalsFileClass` and/or an extending class,
   *   see the @File#prototype.init method. The @File#init method will call
   *   the first defined `"init"` property in the #inst prototype chain
   *   (unless an [owned][own] `"init"` property exists or the `"init"`
   *   property is not a function) after the default `VitalsFileClass` setup
   *   is completed.
   *   ```
   *   // CUSTOMIZE THE VITALS FILE CLASS SETUP
   *   
   *   function YourExtendingClass() {
   *     vitals.File.init(this, path, opts);
   *   }
   *   vitals.File.extend(YourExtendingClass);
   *   
   *   function customInit() { "custom constructor logic" }
   *   
   *   // BAD - The Custom Downgrade
   *   //   This assignment will NOT change the setup for `VitalsFileClass`
   *   //   or `YourExtendingClass` and will remove the `vitals.File.init`
   *   //   method from your reach.
   *   vitals.File.init = customInit;
   *   
   *   // GOOD - The Local Upgrade
   *   //   This assignment will add a call to `customInit` to the setup
   *   //   for `YourExtendingClass` after the default `VitalsFileClass`
   *   //   setup is complete.
   *   YourExtendingClass.prototype.init = customInit;
   *   
   *   // GOOD - The Global Bonus
   *   //   This assignment will add a call to `customInit` to the setup
   *   //   for `VitalsFileClass` and `YourExtendingClass` after the
   *   //   default `VitalsFileClass` setup is complete.
   *   vitals.File.prototype.init = customInit;
   *   
   *   ```
   * @public
   * @param {(!VitalsFileClass|!Object)} inst
   * @param {string} path
   * @param {(?Object|?undefined)=} opts
   * @param {string=} opts.pwd
   * @param {string=} opts.format
   * @param {string=} opts.homedir
   * @param {string=} opts.basedir
   * @return {(!VitalsFileClass|!Object)}
   */
  /// #}}} @docs init
  /// #ifnot{{{ @scope DOCS_ONLY
  function initVitalsFileClass(inst, path, opts) {
  /// #ifnot}}} @scope DOCS_ONLY

    /// #if{{{ @code verify-arguments

    switch (arguments['length']) {
      case 0:
        throw _MKERR_INIT.noArg(new $ERR, 'inst');
      case 1:
        throw _MKERR_INIT.noArg(new $ERR, 'path');
      case 2:
        opts = $NIL;
        break;
      default:
        if ( $is.void(opts) ) {
          opts = $NIL;
        }
        else if ( !$is.nil(opts) && !$is.obj(opts) ) {
          throw _MKERR_INIT.type(new $TYPE_ERR, 'opts', opts, '?Object=');
        }
    }

    if ( !$is.obj(inst) ) {
      throw _MKERR_INIT.type(new $TYPE_ERR, 'inst', inst, '!Object');
    }
    if ( !$is.str(path) ) {
      throw _MKERR_INIT.type(new $TYPE_ERR, 'path', path, 'string');
    }

    /// #if}}} @code verify-arguments

    /// #if{{{ @code set-private-constants

    /// #{{{ @const FORMAT
    /**
     * @private
     * @const {string}
     */
    var FORMAT = _hasStrOpt(opts, 'format')
      ? _cleanFormat(opts['format']) || _DFLT_MAIN['format']
      : _DFLT_MAIN['format'];
    /// #}}} @const FORMAT

    /// #{{{ @const PATH
    /**
     * @private
     * @const {string}
     */
    var PATH = _cleanPath(path);
    /// #}}} @const PATH

    /// #{{{ @const PWD
    /**
     * @private
     * @const {string}
     */
    var PWD = _hasStrOpt(opts, 'pwd')
      ? $absPath($VOID, _cleanPath(opts['pwd']), $NO)
      : $getCwd();
    /// #}}} @const PWD

    /// #{{{ @const HOME_DIR
    /**
     * @private
     * @const {string}
     */
    var HOME_DIR = _hasStrOpt(opts, 'homedir')
      ? _cleanPath(opts['homedir'])
      : $getHomeDir();
    /// #}}} @const HOME_DIR

    /// #{{{ @const BASE_DIR
    /**
     * @private
     * @const {string}
     */
    var BASE_DIR = _hasStrOpt(opts, 'basedir')
      ? _cleanPath(opts['basedir'])
      : '';
    /// #}}} @const BASE_DIR

    /// #{{{ @const REL_BASE_DIR
    /**
     * @private
     * @const {string}
     */
    var REL_BASE_DIR = !!BASE_DIR && $hasHomeDirMacro(BASE_DIR)
      ? $insHomeDir(BASE_DIR, HOME_DIR)
      : BASE_DIR;
    /// #}}} @const REL_BASE_DIR

    /// #{{{ @const ABS_BASE_DIR
    /**
     * @private
     * @const {string}
     */
    var ABS_BASE_DIR = !!REL_BASE_DIR
      ? $absPath(PWD, REL_BASE_DIR, $NO)
      : PWD;
    /// #}}} @const ABS_BASE_DIR

    /// #{{{ @const REL_PATH
    /**
     * @private
     * @const {string}
     */
    var REL_PATH = !!PATH && $hasHomeDirMacro(PATH)
      ? $insHomeDir(PATH, HOME_DIR)
      : PATH;
    /// #}}} @const REL_PATH

    /// #{{{ @const ABS_PATH
    /**
     * @private
     * @const {string}
     */
    var ABS_PATH = !!REL_PATH
      ? $absPath(ABS_BASE_DIR, REL_PATH, $NO)
      : ABS_BASE_DIR;
    /// #}}} @const ABS_PATH

    /// #if}}} @code set-private-constants

    /// #{{{ @member __ABS_BASE_DIR__
    /// #{{{ @docs __ABS_BASE_DIR__
    /// @member __ABS_BASE_DIR__
    /**
     * @const {string}
     */
    /// #}}} @docs __ABS_BASE_DIR__
    /// #if{{{ @code __ABS_BASE_DIR__
    inst['__ABS_BASE_DIR__'] = ABS_BASE_DIR;
    /// #if}}} @code __ABS_BASE_DIR__
    /// #}}} @member __ABS_BASE_DIR__

    /// #{{{ @member __ABS_PATH__
    /// #{{{ @docs __ABS_PATH__
    /// @member __ABS_PATH__
    /**
     * @const {string}
     */
    /// #}}} @docs __ABS_PATH__
    /// #if{{{ @code __ABS_PATH__
    inst['__ABS_PATH__'] = ABS_PATH;
    /// #if}}} @code __ABS_PATH__
    /// #}}} @member __ABS_PATH__

    /// #{{{ @member __BASE_DIR__
    /// #{{{ @docs __BASE_DIR__
    /// @member __BASE_DIR__
    /**
     * @const {string}
     */
    /// #}}} @docs __BASE_DIR__
    /// #if{{{ @code __BASE_DIR__
    inst['__BASE_DIR__'] = REL_BASE_DIR;
    /// #if}}} @code __BASE_DIR__
    /// #}}} @member __BASE_DIR__

    /// #{{{ @member __HOME_DIR__
    /// #{{{ @docs __HOME_DIR__
    /// @member __HOME_DIR__
    /**
     * @const {string}
     */
    /// #}}} @docs __HOME_DIR__
    /// #if{{{ @code __HOME_DIR__
    inst['__HOME_DIR__'] = HOME_DIR;
    /// #if}}} @code __HOME_DIR__
    /// #}}} @member __HOME_DIR__

    /// #{{{ @member __ORIG_BASE_DIR__
    /// #{{{ @docs __ORIG_BASE_DIR__
    /// @member __ORIG_BASE_DIR__
    /**
     * @const {string}
     */
    /// #}}} @docs __ORIG_BASE_DIR__
    /// #if{{{ @code __ORIG_BASE_DIR__
    inst['__ORIG_BASE_DIR__'] = BASE_DIR;
    /// #if}}} @code __ORIG_BASE_DIR__
    /// #}}} @member __ORIG_BASE_DIR__

    /// #{{{ @member __ORIG_PATH__
    /// #{{{ @docs __ORIG_PATH__
    /// @member __ORIG_PATH__
    /**
     * @const {string}
     */
    /// #}}} @docs __ORIG_PATH__
    /// #if{{{ @code __ORIG_PATH__
    inst['__ORIG_PATH__'] = PATH;
    /// #if}}} @code __ORIG_PATH__
    /// #}}} @member __ORIG_PATH__

    /// #{{{ @member __PATH__
    /// #{{{ @docs __PATH__
    /// @member __PATH__
    /**
     * @const {string}
     */
    /// #}}} @docs __PATH__
    /// #if{{{ @code __PATH__
    inst['__PATH__'] = REL_PATH;
    /// #if}}} @code __PATH__
    /// #}}} @member __PATH__

    /// #{{{ @member __PWD__
    /// #{{{ @docs __PWD__
    /// @member __PWD__
    /**
     * @const {string}
     */
    /// #}}} @docs __PWD__
    /// #if{{{ @code __PWD__
    inst['__PWD__'] = PWD;
    /// #if}}} @code __PWD__
    /// #}}} @member __PWD__

    /// #if{{{ @code run-init-member

    if ( 'init' in inst && !$own(inst, 'init') && $is.fun(inst['init']) ) {
      inst['init']();
    }

    /// #if}}} @code run-init-member

    /// #if{{{ @code return-instance

    return inst;

    /// #if}}} @code return-instance
  /// #ifnot{{{ @scope DOCS_ONLY
  }
  VitalsFileClass['init'] = initVitalsFileClass;
  /// #ifnot}}} @scope DOCS_ONLY
  /// #}}} @submethod init

  /// #{{{ @protomethod abspath
  /// #{{{ @docs abspath
  /// @method vitals.File.prototype.abspath
  /// @alias vitals.File.prototype.absolutePath
  /// @alias vitals.File.prototype.absolutepath
  /// @alias vitals.File.prototype.absPath
  /**
   * @description
   *   The @File#prototype.abspath method returns the absolute path
   *   of a `VitalsFileClass` instance.
   * @public
   * @this {!VitalsFileClass}
   * @return {string}
   */
  /// #}}} @docs abspath
  /// #if{{{ @code abspath
  function abspathVitalsFileClass() {
    return this['__ABS_PATH__'];
  }
  VFC_PROTO['absolutePath'] = abspathVitalsFileClass;
  VFC_PROTO['absolutepath'] = abspathVitalsFileClass;
  VFC_PROTO['absPath'] = abspathVitalsFileClass;
  VFC_PROTO['abspath'] = abspathVitalsFileClass;
  /// #if}}} @code abspath
  /// #}}} @protomethod abspath

  /// #{{{ @protomethod relpath
  /// #{{{ @docs relpath
  /// @method vitals.File.prototype.relpath
  /// @alias vitals.File.prototype.relativePath
  /// @alias vitals.File.prototype.relativepath
  /// @alias vitals.File.prototype.relPath
  /**
   * @description
   *   The @File#prototype.relpath method returns the relative path
   *   from the #frompath to the absolute path of a `VitalsFileClass`
   *   instance.
   * @public
   * @this {!VitalsFileClass}
   * @param {(!string|!VitalsFileClass|!undefined)=} frompath = `this.pwd()`
   *   If the #frompath is a `string`, it is resolved to an absolute path
   *   before the relative path is found. If the #frompath is a
   *   `VitalsFileClass` instance, the absolute path (e.g.
   *   `frompath.abspath()`) of the #frompath is used.
   * @return {string}
   */
  /// #}}} @docs relpath
  /// #if{{{ @code relpath
  function relpathVitalsFileClass(frompath) {

    if ( !arguments['length'] || $is.void(frompath) ) {
      frompath = this['__PWD__'];
    }
    else if ( $is.str(frompath) ) {
      frompath = _cleanPath(frompath);
      frompath = $absPath($VOID, frompath);
    }
    else if ( $is.vfc(frompath) ) {
      frompath = frompath['__ABS_PATH__'];
    }
    else {
      throw _MKERR_REL.type(new $TYPE_ERR, 'frompath', frompath,
        '(!string|!VitalsFileClass)=');
    }

    return $relPath(frompath, this['__ABS_PATH__']);
  }
  VFC_PROTO['relativePath'] = relpathVitalsFileClass;
  VFC_PROTO['relativepath'] = relpathVitalsFileClass;
  VFC_PROTO['relPath'] = relpathVitalsFileClass;
  VFC_PROTO['relpath'] = relpathVitalsFileClass;
  /// #if}}} @code relpath
  /// #}}} @protomethod relpath

  /// #if{{{ @helpers File

  /// #{{{ @group constants

  /// #{{{ @const _DIR_NAME
  /**
   * @private
   * @const {!RegExp}
   */
  var _DIR_NAME = /^[\s\S]*\//;
  /// #}}} @const _DIR_NAME

  /// #{{{ @const _END_SLASH
  /**
   * @private
   * @const {!RegExp}
   */
  var _END_SLASH = /\/$/;
  /// #}}} @const _END_SLASH

  /// #{{{ @const _PATH_NAME
  /**
   * @private
   * @const {!RegExp}
   */
  var _PATH_NAME = /\/[^\/]+$/;
  /// #}}} @const _PATH_NAME

  /// #{{{ @const _ROOT
  /**
   * @private
   * @const {!RegExp}
   */
  var _ROOT = /^\/$/;
  /// #}}} @const _ROOT

  /// #{{{ @const _SLASH
  /**
   * @private
   * @const {!RegExp}
   */
  var _SLASH = /\//;
  /// #}}} @const _SLASH

  /// #{{{ @const _SPECIAL_DIR
  /**
   * @private
   * @const {!RegExp}
   */
  var _SPECIAL_DIR = /^\.\.?$/;
  /// #}}} @const _SPECIAL_DIR

  /// #{{{ @const _START_DOT
  /**
   * @private
   * @const {!RegExp}
   */
  var _START_DOT = /^\./;
  /// #}}} @const _START_DOT

  /// #{{{ @const _START_DOTS
  /**
   * @private
   * @const {!RegExp}
   */
  var _START_DOTS = /^\.+/;
  /// #}}} @const _START_DOTS

  /// #}}} @group constants

  /// #{{{ @group paths

  /// #{{{ @func _cleanFormat
  /**
   * @private
   * @param {string} format
   * @return {string}
   */
  function _cleanFormat(format) {
    return $is.fmt(format)
      ? $cleanFormat(format)
      : '';
  }
  /// #}}} @func _cleanFormat

  /// #{{{ @func _cleanPath
  /**
   * @private
   * @param {string} path
   * @return {string}
   */
  function _cleanPath(path) {
    return path && $cleanPath(path);
  }
  /// #}}} @func _cleanPath

  /// #{{{ @func _trimDirName
  /**
   * @private
   * @param {string} path
   * @return {string}
   */
  function _trimDirName(path) {
    path = $trimDrive(path);
    path = _trimNonRootEndSlash(path);
    return _hasDirName(path)
      ? path['replace'](_DIR_NAME, '')
      : path;
  }
  /// #}}} @func _trimDirName

  /// #{{{ @func _trimEndSlash
  /**
   * @private
   * @param {string} path
   * @return {string}
   */
  function _trimEndSlash(path) {
    return _hasEndSlash(path)
      ? path['replace'](_END_SLASH, '')
      : path;
  }
  /// #}}} @func _trimEndSlash

  /// #{{{ @func _trimNonRootEndSlash
  /**
   * @private
   * @param {string} path
   * @return {string}
   */
  function _trimNonRootEndSlash(path) {
    return _hasEndSlash(path) && !_isRoot(path)
      ? path['replace'](_END_SLASH, '')
      : path;
  }
  /// #}}} @func _trimNonRootEndSlash

  /// #{{{ @func _trimPathName
  /**
   * @private
   * @param {string} path
   * @return {string}
   */
  function _trimPathName(path) {
    path = $trimDrive(path);
    path = _trimNonRootEndSlash(path);
    return _hasDirName(path)
      ? path['replace'](_PATH_NAME, '')
      : '';
  }
  /// #}}} @func _trimPathName

  /// #}}} @group paths

  /// #{{{ @group tests

  /// #{{{ @func _hasDirName
  /**
   * @private
   * @param {string} path
   * @return {boolean}
   */
  function _hasDirName(path) {
    return _hasSlash(path) && !_isRoot(path);
  }
  /// #}}} @func _hasDirName

  /// #{{{ @func _hasEndSlash
  /**
   * @private
   * @param {string} path
   * @return {boolean}
   */
  function _hasEndSlash(path) {
    return !!path && _END_SLASH['test'](path);
  }
  /// #}}} @func _hasEndSlash

  /// #{{{ @func _hasSlash
  /**
   * @private
   * @param {string} path
   * @return {boolean}
   */
  function _hasSlash(path) {
    return !!path && _SLASH['test'](path);
  }
  /// #}}} @func _hasSlash

  /// #{{{ @func _hasStrOpt
  /**
   * @private
   * @param {?Object} opts
   * @param {string} key
   * @return {boolean}
   */
  function _hasStrOpt(opts, key) {
    return !!opts && $own(opts, key) && $is.str(opts[key]);
  }
  /// #}}} @func _hasStrOpt

  /// #{{{ @func _isHidden
  /**
   * @private
   * @param {string} name
   * @return {boolean}
   */
  function _isHidden(name) {
    return !!name && _START_DOT['test'](name) && !_SPECIAL_DIR['test'](name);
  }
  /// #}}} @func _isHidden

  /// #{{{ @func _isRoot
  /**
   * @private
   * @param {string} path
   * @return {boolean}
   */
  function _isRoot(path) {
    return _ROOT['test'](path);
  }
  /// #}}} @func _isRoot

  /// #}}} @group tests

  /// #{{{ @group defaults

  /// #{{{ @const _DFLT_MAIN
  /**
   * @private
   * @const {!Object}
   */
  var _DFLT_MAIN = $DFLT['File']['main'];
  /// #}}} @const _DFLT_MAIN

  /// #}}} @group defaults

  /// #{{{ @group errors

  /// #{{{ @const _MKERR_EXTEND
  /**
   * @private
   * @const {!ErrorMaker}
   * @struct
   */
  var _MKERR_EXTEND = $mkErr('File', 'extend');
  /// #}}} @const _MKERR_EXTEND

  /// #{{{ @const _MKERR_INIT
  /**
   * @private
   * @const {!ErrorMaker}
   * @struct
   */
  var _MKERR_INIT = $mkErr('File', 'init');
  /// #}}} @const _MKERR_INIT

  /// #{{{ @const _MKERR_REL
  /**
   * @private
   * @const {!ErrorMaker}
   * @struct
   */
  var _MKERR_REL = $mkErr('File', 'prototype.relpath');
  /// #}}} @const _MKERR_REL

  /// #}}} @group errors

  /// #if}}} @helpers File

/// #ifnot{{{ @scope DOCS_ONLY
  return VitalsFileClass;
})();
$VITALS['File'] = $File;
/// #ifnot}}} @scope DOCS_ONLY
/// #}}} @class File

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
