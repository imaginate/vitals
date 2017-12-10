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
  /// @docref [immutable]:(https://en.wikipedia.org/wiki/Immutable_object)
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
   * @param {string=} opts.pwd = `vitals.cwd()`
   *   The #opts.pwd option allows you to override the value of the present
   *   working directory for the new `VitalsFileClass` instance.
   * @param {string=} opts.basedir = `vitals.File.default("basedir")`
   *   The #opts.basedir option allows you to override the value of the base
   *   directory for the new `VitalsFileClass` instance.
   * @param {string=} opts.format = `vitals.File.default("format")`
   *   The #opts.format option allows you to configure how primitive string
   *   paths (e.g. paths returned by @File#prototype.abspath) are formatted
   *   for a specific `VitalsFileClass` instance. The #opts.format option is
   *   [immutable][immutable] (i.e. cannot be changed) after a
   *   `VitalsFileClass` instance is created. It overrides the vitals scoped
   *   default value and can only be overruled by format options passed to
   *   individual method calls (see below example).
   *   ```
   *   // FORMAT OPTION HIERARCHY
   *   //   1) GLOBAL: Per `Vitals` instance.
   *   //   2) CLASS:  Per `VitalsFileClass` instance.
   *   //   3) METHOD: Per function call.
   *   
   *   var xFMT = { format: "posix" };
   *   var wFMT = { format: "windows" };
   *   var uFMT = { format: "universal" };
   *   
   *   var vitals = require("@imaginate/vitals")({ File: xFMT });
   *   var xINST = vitals.File("C:path/to/sample.js");
   *   var uINST = vitals.File("C:path/to/sample.js", uFMT);
   *   
   *   xINST.path();     // returns `"path/to/sample.js"`
   *   uINST.path();     // returns `"C:path/to/sample.js"`
   *   xINST.path(wFMT); // returns `"C:path\\to\\sample.js"`
   *   uINST.path(wFMT); // returns `"C:path\\to\\sample.js"`
   *   xINST.path(uFMT); // returns `"C:path/to/sample.js"`
   *   uINST.path(xFMT); // returns `"path/to/sample.js"`
   *   ```
   *   The #opts.format option accepts the following case insensitive values:
   *   1) `u|uni|universal`!$
   *     The *universal* path format will always use a forward slash for path
   *     delimination, include defined Windows or UNC drives, and eliminate
   *     all duplicate delimiters.
   *   2) `x|posix|unix|linux`!$
   *     The *posix* path format will always use a forward slash for path
   *     delimination, hide defined Windows or UNC drives, and eliminate all
   *     duplicate delimiters.
   *   3) `w|win|win32|windows`!$
   *     The *windows* path format will always use a backslash for path
   *     delimination, include defined Windows or UNC drives, and eliminate
   *     all duplicate delimiters.
   * @param {string=} opts.homedir = `vitals.homedir()`
   *   The #opts.homedir option allows you to override the value of the home
   *   directory path for the new `VitalsFileClass` instance.
   * @param {boolean=} opts.inshomedir = `vitals.File.default("inshomedir")`
   *   The #opts.inshomedir option allows you to disable the automatic
   *   insertion of the home directory path for all paths returned by the new
   *   `VitalsFileClass` instance that contain the home directory macro and
   *   are **not** an absolute or resolved path (e.g. @File#prototype.path).
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
   * @param {string=} opts.pwd = `vitals.cwd()`
   *   See the main @File#main-params-opts.pwd option for details.
   * @param {string=} opts.basedir = `vitals.File.default("basedir")`
   *   See the main @File#main-params-opts.basedir option for details.
   * @param {string=} opts.format = `vitals.File.default("format")`
   *   See the main @File#main-params-opts.format option for details.
   * @param {string=} opts.homedir = `vitals.homedir()`
   *   See the main @File#main-params-opts.homedir option for details.
   * @param {boolean=} opts.inshomedir = `vitals.File.default("inshomedir")`
   *   See the main @File#main-params-opts.inshomedir option for details.
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
   * @param {string=} opts.pwd = `vitals.cwd()`
   *   See the main @File#main-params-opts.pwd option for details.
   * @param {string=} opts.basedir = `vitals.File.default("basedir")`
   *   See the main @File#main-params-opts.basedir option for details.
   * @param {string=} opts.format = `vitals.File.default("format")`
   *   See the main @File#main-params-opts.format option for details.
   * @param {string=} opts.homedir = `vitals.homedir()`
   *   See the main @File#main-params-opts.homedir option for details.
   * @param {boolean=} opts.inshomedir = `vitals.File.default("inshomedir")`
   *   See the main @File#main-params-opts.inshomedir option for details.
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
      ? _cleanPathFormat(opts['format']) || _DFLT_MAIN['format']
      : _DFLT_MAIN['format'];
    /// #}}} @const FORMAT

    /// #{{{ @const PWD
    /**
     * @private
     * @const {string}
     */
    var PWD = _hasStrOpt(opts, 'pwd')
      ? _absCleanPath($VOID, opts['pwd'], $NO)
      : $getCwd();
    /// #}}} @const PWD

    /// #{{{ @const ORIG_PATH
    /**
     * @private
     * @const {string}
     */
    var ORIG_PATH = _cleanPath(path);
    /// #}}} @const ORIG_PATH

    /// #{{{ @const ORIG_BASE_DIR
    /**
     * @private
     * @const {string}
     */
    var ORIG_BASE_DIR = _hasStrOpt(opts, 'basedir')
      ? _cleanPath(opts['basedir'])
      : _DFLT_MAIN['basedir'];
    /// #}}} @const ORIG_BASE_DIR

    /// #{{{ @const HOME_DIR
    /**
     * @private
     * @const {string}
     */
    var HOME_DIR = _hasStrOpt(opts, 'homedir')
      ? _cleanPath(opts['homedir'])
      : $getHomeDir();
    /// #}}} @const HOME_DIR

    /// #{{{ @const INS_HOME_DIR
    /**
     * @private
     * @const {boolean}
     */
    var INS_HOME_DIR = _hasBoolOpt(opts, 'inshomedir')
      ? opts['inshomedir']
      : _DFLT_MAIN['inshomedir'];
    /// #}}} @const INS_HOME_DIR

    /// #{{{ @const BASE_DIR
    /**
     * @private
     * @const {string}
     */
    var BASE_DIR = _hasHomeDirMacro(ORIG_BASE_DIR)
      ? $insHomeDir(ORIG_BASE_DIR, HOME_DIR)
      : ORIG_BASE_DIR;
    /// #}}} @const BASE_DIR

    /// #{{{ @const ABS_BASE_DIR
    /**
     * @private
     * @const {string}
     */
    var ABS_BASE_DIR = !!BASE_DIR
      ? $absPath(PWD, BASE_DIR, $NO)
      : PWD;
    /// #}}} @const ABS_BASE_DIR

    /// #{{{ @const PATH
    /**
     * @private
     * @const {string}
     */
    var PATH = _hasHomeDirMacro(ORIG_PATH)
      ? $insHomeDir(ORIG_PATH, HOME_DIR)
      : ORIG_PATH;
    /// #}}} @const PATH

    /// #{{{ @const ABS_PATH
    /**
     * @private
     * @const {string}
     */
    var ABS_PATH = !!PATH
      ? $absPath(ABS_BASE_DIR, PATH, $NO)
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
    inst['__BASE_DIR__'] = BASE_DIR;
    /// #if}}} @code __BASE_DIR__
    /// #}}} @member __BASE_DIR__

    /// #{{{ @member __FORMAT__
    /// #{{{ @docs __FORMAT__
    /// @member __FORMAT__
    /**
     * @const {string}
     */
    /// #}}} @docs __FORMAT__
    /// #if{{{ @code __FORMAT__
    inst['__FORMAT__'] = FORMAT;
    /// #if}}} @code __FORMAT__
    /// #}}} @member __FORMAT__

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

    /// #{{{ @member __INS_HOME_DIR__
    /// #{{{ @docs __INS_HOME_DIR__
    /// @member __INS_HOME_DIR__
    /**
     * @const {boolean}
     */
    /// #}}} @docs __INS_HOME_DIR__
    /// #if{{{ @code __INS_HOME_DIR__
    inst['__INS_HOME_DIR__'] = INS_HOME_DIR;
    /// #if}}} @code __INS_HOME_DIR__
    /// #}}} @member __INS_HOME_DIR__

    /// #{{{ @member __ORIG_BASE_DIR__
    /// #{{{ @docs __ORIG_BASE_DIR__
    /// @member __ORIG_BASE_DIR__
    /**
     * @const {string}
     */
    /// #}}} @docs __ORIG_BASE_DIR__
    /// #if{{{ @code __ORIG_BASE_DIR__
    inst['__ORIG_BASE_DIR__'] = ORIG_BASE_DIR;
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
    inst['__ORIG_PATH__'] = ORIG_PATH;
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
    inst['__PATH__'] = PATH;
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
   * @param {(?Object|?undefined)=} opts
   * @param {string=} opts.format = `this.format()`
   *   The #opts.format option allows you to override the default path format
   *   set for the `VitalsFileClass` instance. See the main
   *   @File#main-params-opts.format option for more details.
   * @param {string=} opts.fmt
   *   An alias for the #opts.format option.
   * @return {string}
   */
  /// #}}} @docs abspath
  /// #if{{{ @code abspath
  function abspathVitalsFileClass(opts) {

    /** @type {string} */
    var fmt;

    fmt = this['__FORMAT__'];

    if ( !!arguments['length'] && !$is.void(opts) && !$is.null(opts) ) {
      if ( !$is.obj(opts) ) {
        throw _MKERR_ABSPATH.type(new $TYPE_ERR, 'opts', opts, '?Object=');
      }
      fmt = _getFmt(_MKERR_ABSPATH, opts, fmt);
    }

    return $fmtPath(this['__ABS_PATH__'], fmt);
  }
  VFC_PROTO['absolutePath'] = abspathVitalsFileClass;
  VFC_PROTO['absolutepath'] = abspathVitalsFileClass;
  VFC_PROTO['absPath'] = abspathVitalsFileClass;
  VFC_PROTO['abspath'] = abspathVitalsFileClass;
  /// #if}}} @code abspath
  /// #}}} @protomethod abspath

  /// #{{{ @protomethod drive
  /// #{{{ @docs drive
  /// @method vitals.File.prototype.drive
  /**
   * @description
   *   The @File#prototype.drive method returns the value of the path's drive.
   *   It uses the absolute form of the path (see @File#prototype.abspath)
   *   when checking for a drive. If a drive is not found, an empty primitive
   *   string is returned. The windows single letter and UNC formats are the
   *   only accepted drive names. A UNC drive must include the *server* and
   *   *share* path names to be recognized and will return the *server* and
   *   *share* names if this method is invoked. If the #opts.format is set to
   *   `"posix"`, this method will always return an empty primitive string.
   * @public
   * @this {!VitalsFileClass}
   * @param {(?Object|?undefined)=} opts
   * @param {string=} opts.format = `this.format()`
   *   The #opts.format option allows you to override the default path format
   *   set for the `VitalsFileClass` instance. See the main
   *   @File#main-params-opts.format option for more details.
   * @param {string=} opts.fmt
   *   An alias for the #opts.format option.
   * @return {string}
   *   See the @File#prototype.drive method description for all details
   *   regarding the primitive string returned by this method.
   */
  /// #}}} @docs drive
  /// #if{{{ @code drive
  function driveVitalsFileClass(opts) {

    /** @type {string} */
    var fmt;

    fmt = this['__FORMAT__'];

    if ( !!arguments['length'] && !$is.void(opts) && !$is.null(opts) ) {
      if ( !$is.obj(opts) ) {
        throw _MKERR_DRIVE.type(new $TYPE_ERR, 'opts', opts, '?Object=');
      }
      fmt = _getFmt(_MKERR_DRIVE, opts, fmt);
    }

    if ( !_hasStrProp(this, '__DRIVE__') ) {
      this['__DRIVE__'] = $getDrive(this['__ABS_PATH__']);
    }

    return $fmtPath(this['__DRIVE__'], fmt);
  }
  VFC_PROTO['drive'] = driveVitalsFileClass;
  /// #if}}} @code drive
  /// #}}} @protomethod drive

  /// #{{{ @protomethod format
  /// #{{{ @docs format
  /// @method vitals.File.prototype.format
  /**
   * @description
   *   The @File#prototype.format method shares the default path format value
   *   set for the `VitalsFileClass` instance. See the main
   *   @File#main-params-opts.format option for more details about path
   *   formats.
   * @public
   * @this {!VitalsFileClass}
   * @return {string}
   *   The @File#prototype.format method returns the long-hand form of the
   *   available path format values (see main @File#main-params-opts.format).
   *   The three long-hand path format values are:
   *   - `"universal"`
   *   - `"posix"`
   *   - `"windows"`
   */
  /// #}}} @docs format
  /// #if{{{ @code format
  function formatVitalsFileClass() {
    return this['__FORMAT__'];
  }
  VFC_PROTO['format'] = formatVitalsFileClass;
  VFC_PROTO['fmt'] = formatVitalsFileClass;
  /// #if}}} @code format
  /// #}}} @protomethod format

  /// #{{{ @protomethod path
  /// #{{{ @docs path
  /// @method vitals.File.prototype.path
  /**
   * @description
   *   The @File#prototype.path method returns the original path set for a
   *   `VitalsFileClass` instance.
   * @public
   * @this {!VitalsFileClass}
   * @param {(?Object|?undefined)=} opts
   * @param {string=} opts.format = `this.format()`
   *   The #opts.format option allows you to override the default path format
   *   set for the `VitalsFileClass` instance. See the main
   *   @File#main-params-opts.format option for more details.
   * @param {string=} opts.fmt
   *   An alias for the #opts.format option.
   * @param {boolean=} opts.inshomedir = `this.inshomedir()`
   *   The #opts.inshomedir option allows you to override the state of the
   *   automatic home directory insertion set for the `VitalsFileClass`
   *   instance. See the main @File#main-params-opts.inshomedir option for
   *   more details.
   * @param {boolean=} opts.homedir
   *   An alias for the #opts.inshomedir option.
   * @param {boolean=} opts.insertHomeDirectory
   *   An alias for the #opts.inshomedir option.
   * @return {string}
   */
  /// #}}} @docs path
  /// #if{{{ @code path
  function pathVitalsFileClass(opts) {

    /** @type {string} */
    var fmt;
    /** @type {boolean} */
    var ins;

    fmt = this['__FORMAT__'];
    ins = this['__INS_HOME_DIR__'];

    if ( !!arguments['length'] && !$is.void(opts) && !$is.null(opts) ) {
      if ( !$is.obj(opts) ) {
        throw _MKERR_PATH.type(new $TYPE_ERR, 'opts', opts, '?Object=');
      }
      fmt = _getFmt(_MKERR_PATH, opts, fmt);
      ins = _getIns(_MKERR_PATH, opts, ins);
    }

    return $fmtPath(
      ins
        ? this['__PATH__']
        : this['__ORIG_PATH__'],
      fmt);
  }
  VFC_PROTO['path'] = pathVitalsFileClass;
  /// #if}}} @code path
  /// #}}} @protomethod path

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
   * @param {(?string|?VitalsFileClass|?undefined)=} frompath = `this.pwd()`
   *   If the #frompath is a `string`, it is resolved to an absolute path
   *   before the relative path is found. If the #frompath is a
   *   `VitalsFileClass` instance, the absolute path (e.g.
   *   `frompath.abspath()`) of the #frompath is used.
   * @param {(?Object|?undefined)=} opts
   * @param {string=} opts.format = `this.format()`
   *   The #opts.format option allows you to override the default path format
   *   set for the `VitalsFileClass` instance. See the main
   *   @File#main-params-opts.format option for more details.
   * @param {string=} opts.fmt
   *   An alias for the #opts.format option.
   * @return {string}
   */
  /// #}}} @docs relpath
  /// #if{{{ @code relpath
  function relpathVitalsFileClass(frompath, opts) {

    /** @type {string} */
    var path;
    /** @type {string} */
    var fmt;

    if (arguments['length'] === 1
        && $is.obj(frompath)
        && !$is.vfc(frompath) ) {
      opts = frompath;
      frompath = $NIL;
    }

    if ( $is.nil(frompath) || $is.void(frompath) ) {
      frompath = this['__PWD__'];
    }
    else if ( $is.str(frompath) ) {
      frompath = _absCleanPath($VOID, frompath);
    }
    else if ( $is.vfc(frompath) ) {
      frompath = frompath['__ABS_PATH__'];
    }
    else {
      throw _MKERR_RELPATH.type(new $TYPE_ERR, 'frompath', frompath,
        '(?string|?VitalsFileClass)=');
    }

    fmt = this['__FORMAT__'];

    if ( !$is.nil(opts) && !$is.void(opts) ) {
      if ( !$is.obj(opts) ) {
        throw _MKERR_RELPATH.type(new $TYPE_ERR, 'opts', opts, '?Object=');
      }
      fmt = _getFmt(_MKERR_RELPATH, opts, fmt);
    }

    path = this['__ABS_PATH__'];
    path = $relPath(frompath, path);
    return $fmtPath(path, fmt);
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

  /// #{{{ @func _absCleanPath
  /**
   * @private
   * @param {(string|undefined)} cwd
   * @param {string} path
   * @param {(string|undefined|boolean)=} homedir
   * @return {string}
   */
  function _absCleanPath(cwd, path, homedir) {
    path = _cleanPath(path);
    return $absPath(cwd, path, homedir);
  }
  /// #}}} @func _absCleanPath

  /// #{{{ @func _cleanPathFormat
  /**
   * @private
   * @param {string} format
   * @return {string}
   */
  function _cleanPathFormat(format) {
    return !!format && $is.fmt(format)
      ? $cleanPathFormat(format)
      : '';
  }
  /// #}}} @func _cleanPathFormat

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

  /// #{{{ @group options

  /// #{{{ @func _getFmt
  /**
   * @private
   * @param {!ErrorMaker} mkerr
   * @param {!Object} opts
   * @param {string} fmt
   * @return {string}
   */
  function _getFmt(mkerr, opts, fmt) {
    fmt = _getFmtOpt(mkerr, opts, 'fmt', fmt);
    return _getFmtOpt(mkerr, opts, 'format', fmt);
  }
  /// #}}} @func _getFmt

  /// #{{{ @func _getFmtOpt
  /**
   * @private
   * @param {!ErrorMaker} mkerr
   * @param {!Object} opts
   * @param {string} key
   * @param {string} fmt
   * @return {string}
   */
  function _getFmtOpt(mkerr, opts, key, fmt) {

    if ( !$hasOpt(opts, key) ) {
      return fmt;
    }

    fmt = opts[key];
    key = 'opts.' + key;

    if ( !$is.str(fmt) ) {
      throw mkerr.type(new $TYPE_ERR, key, fmt, 'string=');
    }
    if ( !$is.fmt(fmt) ) {
      throw mkerr.range(new $RANGE_ERR, key, $FMTS, fmt);
    }

    return $cleanPathFormat(fmt);
  }
  /// #}}} @func _getFmtOpt

  /// #{{{ @func _getIns
  /**
   * @private
   * @param {!ErrorMaker} mkerr
   * @param {!Object} opts
   * @param {boolean} ins
   * @return {boolean}
   */
  function _getIns(mkerr, opts, ins) {
    ins = _getInsOpt(mkerr, opts, 'homedir', ins);
    ins = _getInsOpt(mkerr, opts, 'inshomedir', ins);
    return _getInsOpt(mkerr, opts, 'insertHomeDirectory', ins);
  }
  /// #}}} @func _getIns

  /// #{{{ @func _getInsOpt
  /**
   * @private
   * @param {!ErrorMaker} mkerr
   * @param {!Object} opts
   * @param {string} key
   * @param {boolean} ins
   * @return {boolean}
   */
  function _getInsOpt(mkerr, opts, key, ins) {

    if ( $hasOpt(opts, key) ) {
      ins = opts[key];
      if ( !$is.bool(ins) ) {
        throw mkerr.type(new $TYPE_ERR, 'opts.' + key, ins, 'boolean=');
      }
    }

    return ins;
  }
  /// #}}} @func _getInsOpt

  /// #}}} @group options

  /// #{{{ @group tests

  /// #{{{ @func _hasBoolOpt
  /**
   * @private
   * @param {?Object} opts
   * @param {string} key
   * @return {boolean}
   */
  function _hasBoolOpt(opts, key) {
    return _hasOpt(opts, key) && $is.bool(opts[key]);
  }
  /// #}}} @func _hasBoolOpt

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

  /// #{{{ @func _hasHomeDirMacro
  /**
   * @private
   * @param {string} path
   * @return {boolean}
   */
  function _hasHomeDirMacro(path) {
    return !!path && $hasHomeDirMacro(path);
  }
  /// #}}} @func _hasHomeDirMacro

  /// #{{{ @func _hasOpt
  /**
   * @private
   * @param {?Object} opts
   * @param {string} key
   * @return {boolean}
   */
  function _hasOpt(opts, key) {
    return !!opts && $ownEnum(opts, key);
  }
  /// #}}} @func _hasOpt

  /// #{{{ @func _hasProp
  /**
   * @private
   * @param {(!VitalsFileClass|!Object)} inst
   * @param {string} key
   * @return {boolean}
   */
  function _hasProp(inst, key) {
    return key in inst;
  }
  /// #}}} @func _hasProp

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
    return _hasOpt(opts, key) && $is.str(opts[key]);
  }
  /// #}}} @func _hasStrOpt

  /// #{{{ @func _hasStrProp
  /**
   * @private
   * @param {(!VitalsFileClass|!Object)} inst
   * @param {string} key
   * @return {boolean}
   */
  function _hasStrProp(inst, key) {
    return _hasProp(inst, key) && $is.str(inst[key]);
  }
  /// #}}} @func _hasStrProp

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

  /// #{{{ @const _MKERR_ABSPATH
  /**
   * @private
   * @const {!ErrorMaker}
   * @struct
   */
  var _MKERR_ABSPATH = $mkErr('File', 'prototype.abspath');
  /// #}}} @const _MKERR_ABSPATH

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

  /// #{{{ @const _MKERR_PATH
  /**
   * @private
   * @const {!ErrorMaker}
   * @struct
   */
  var _MKERR_PATH = $mkErr('File', 'prototype.path');
  /// #}}} @const _MKERR_PATH

  /// #{{{ @const _MKERR_RELPATH
  /**
   * @private
   * @const {!ErrorMaker}
   * @struct
   */
  var _MKERR_RELPATH = $mkErr('File', 'prototype.relpath');
  /// #}}} @const _MKERR_RELPATH

  /// #}}} @group errors

  /// #if}}} @helpers File

/// #ifnot{{{ @scope DOCS_ONLY
  return VitalsFileClass;
})();
$VITALS['File'] = $File;
/// #ifnot}}} @scope DOCS_ONLY
/// #}}} @class File

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
