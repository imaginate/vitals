/**
 * ---------------------------------------------------------------------------
 * VITALS-FILE-CLASS
 * ---------------------------------------------------------------------------
 * @section fs
 * @version 5.0.0
 * @see [VitalsFileClass](https://github.com/imaginate/vitals/wiki/vitals-file-class)
 *
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life>
 */

/// #{{{ @class VitalsFileClass
/// #ifnot{{{ @scope DOCS_ONLY
/**
 * @public
 * @const {!Function}
 * @dict
 */
$VITALS['VitalsFileClass'] = (function __vitalsVitalsFileClass__() {
/// #ifnot}}} @scope DOCS_ONLY

  /// #if{{{ @docrefs VitalsFileClass
  /// @docref [own]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty)
  /// @docref [create]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create)
  /// #if}}} @docrefs VitalsFileClass

  /// #ifnot{{{ @scope DOCS_ONLY
  /// #{{{ @const VFC_PROTO
  /**
   * @public
   * @const {!Object}
   */
  VFC_PROTO = $mkObj($NIL);
  /// #}}} @const VFC_PROTO
  /// #ifnot}}} @scope DOCS_ONLY

  /// #{{{ @constructor VitalsFileClass
  /// #{{{ @docs constructor
  /// @section fs
  /// @method vitals.VitalsFileClass
  /**
   * @public
   * @param {string} path
   * @param {(?Object|?undefined)=} opts
   * @param {string=} opts.pwd
   * @param {string=} opts.homedir
   * @param {string=} opts.basedir
   * @constructor
   */
  /// #}}} @docs constructor
  /// #if{{{ @code constructor
  function VitalsFileClass(path, opts) {

    if ( !$is.obj(this) || !(this instanceof VitalsFileClass) ) {
      return constructVitalsFileClass(path, opts);
    }

    initVitalsFileClass(this, path, opts);
  }
  VitalsFileClass['prototype'] = VFC_PROTO;
  VitalsFileClass['prototype']['constructor'] = VitalsFileClass;
  /// #if}}} @code constructor
  /// #}}} @constructor VitalsFileClass

  /// #{{{ @submethod construct
  /// #{{{ @docs construct
  /// @method vitals.VitalsFileClass.construct
  /**
   * @description
   *   The @VitalsFileClass#construct method creates a new `VitalsFileClass`
   *   instance. It is the same as `new VitalsFileClass`.
   *   ```
   *   VitalsFileClass.construct = function construct(path, opts) {
   *     return new VitalsFileClass(path, opts);
   *   };
   *   ```
   * @public
   * @param {string} path
   * @param {(?Object|?undefined)=} opts
   * @param {string=} opts.pwd
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
  /// @method vitals.VitalsFileClass.create
  /**
   * @description
   *   The @VitalsFileClass#create method creates a new `object` that has its
   *   `prototype` set to @VitalsFileClass#prototype. It is a polyfilled
   *   shortcut for calling [Object.create][create] with
   *   @VitalsFileClass#prototype.
   *   ```
   *   VitalsFileClass.create = function create() {
   *     return Object.create(VitalsFileClass.prototype);
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
  /// @method vitals.VitalsFileClass.extend
  /**
   * @description
   *   The @VitalsFileClass#extend method sets the `prototype` property of the
   *   #constructor `function` to a new `object` that has its `prototype` set
   *   to @VitalsFileClass#prototype (see @VitalsFileClass#create). It also
   *   sets `constructor.prototype.constructor` property to the #constructor
   *   and the `constructor.prototype.super_` property to `VitalsFileClass`.
   *   ```
   *   VitalsFileClass.extend = function extend(constructor) {
   *     constructor.prototype = Object.create(VitalsFileClass.prototype);
   *     constructor.prototype.constructor = constructor;
   *     constructor.prototype.super_ = VitalsFileClass;
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
  /// @method vitals.VitalsFileClass.init
  /**
   * @public
   * @param {(!VitalsFileClass|!Object)} inst
   * @param {string} path
   * @param {(?Object|?undefined)=} opts
   * @param {string=} opts.pwd
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

    /// #{{{ @const PATH
    /**
     * @private
     * @const {string}
     */
    var PATH = path && $cleanpath(path);
    /// #}}} @const PATH

    /// #{{{ @const PWD
    /**
     * @private
     * @const {string}
     */
    var PWD = _hasStrOpt(opts, 'pwd')
      ? $resolve(opts['pwd'])
      : $getCwd();
    /// #}}} @const PWD

    /// #{{{ @const HOME_DIR
    /**
     * @private
     * @const {string}
     */
    var HOME_DIR = _hasStrOpt(opts, 'homedir')
      ? opts['homedir'] && $cleanpath(opts['homedir'])
      : $getHome();
    /// #}}} @const HOME_DIR

    /// #{{{ @const BASE_DIR
    /**
     * @private
     * @const {string}
     */
    var BASE_DIR = _hasStrOpt(opts, 'basedir')
      ? opts['basedir'] && $cleanpath(opts['basedir'])
      : '';
    /// #}}} @const BASE_DIR

    /// #{{{ @const REL_BASE_DIR
    /**
     * @private
     * @const {string}
     */
    var REL_BASE_DIR = !!BASE_DIR && $hasHome(BASE_DIR)
      ? $insHome(BASE_DIR, HOME_DIR)
      : BASE_DIR;
    /// #}}} @const REL_BASE_DIR

    /// #{{{ @const ABS_BASE_DIR
    /**
     * @private
     * @const {string}
     */
    var ABS_BASE_DIR = !!REL_BASE_DIR
      ? $resolve(PWD, REL_BASE_DIR)
      : PWD;
    /// #}}} @const ABS_BASE_DIR

    /// #{{{ @const REL_PATH
    /**
     * @private
     * @const {string}
     */
    var REL_PATH = !!PATH && $hasHome(PATH)
      ? $insHome(PATH, HOME_DIR)
      : PATH;
    /// #}}} @const REL_PATH

    /// #{{{ @const ABS_PATH
    /**
     * @private
     * @const {string}
     */
    var ABS_PATH = !!REL_PATH
      ? $resolve(ABS_BASE_DIR, REL_PATH)
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

  /// #if{{{ @helpers VitalsFileClass

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

  /// #{{{ @group errors

  /// #{{{ @const _MKERR_EXTEND
  /**
   * @private
   * @const {!ErrorMaker}
   * @struct
   */
  var _MKERR_EXTEND = $mkErr('VitalsFileClass', 'extend');
  /// #}}} @const _MKERR_EXTEND

  /// #{{{ @const _MKERR_INIT
  /**
   * @private
   * @const {!ErrorMaker}
   * @struct
   */
  var _MKERR_INIT = $mkErr('VitalsFileClass', 'init');
  /// #}}} @const _MKERR_INIT

  /// #}}} @group errors

  /// #if}}} @helpers VitalsFileClass

/// #ifnot{{{ @scope DOCS_ONLY
  return VitalsFileClass;
})();
/// #ifnot}}} @scope DOCS_ONLY
/// #}}} @class VitalsFileClass

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
