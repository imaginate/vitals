/**
 * ---------------------------------------------------------------------------
 * CORE CONSTRUCTOR
 * ---------------------------------------------------------------------------
 * @file
 *   This file contains `makeNewVitals` which is the `newVitals` constructor.
 * @version 5.0.0
 * @see [vitals](https://github.com/imaginate/vitals)
 *
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life>
 */

/// #{{{ @core makeNewVitals
/**
 * @private
 * @return {!Function}
 */
function makeNewVitals() {

  /// #{{{ @core newVitals
  /**
   * @public
   * @param {?Object=} opts = `null`
   * @param {?Object=} opts.env = `null`
   * @param {?Function=} opts.env.define = `define || null`
   * @param {(?Object|?Function)=} opts.env.exports = `exports || null`
   * @param {(?Object|?Function)=} opts.env.global = `global || null`
   * @param {(?Object|?Function)=} opts.env.module = `module || null`
   * @param {(?Object|?Function)=} opts.env.root = `null`
   *   The #opts.env.root option allows you to define which root JavaScript
   *   instance (e.g. browser `window` or node.js `global`) to use when
   *   creating the new `Vitals` instance. If #opts.env.root is `null` or
   *   `undefined`, it is set to the first of the following values that is an
   *   `object` or `function` that contains an `"Object"` property that is
   *   strictly equal to `Object`:
   *   1) #opts.env.global
   *   2) #opts.env.window
   *   3) #opts.env.self
   *   4) base `this`
   *   5) `null`
   *   If #opts.env.root is `null` after the automatic assignment or an
   *   `object` or `function` passed as #opts.env.root does not contain an
   *   `"Object"` property that is strictly equal to `Object`, an `Error`
   *   instance is thrown.
   * @param {(?Object|?Function)=} opts.env.self = `self || null`
   * @param {(?Object|?Function)=} opts.env.window = `window || null`
   * @param {?Object=} opts.event = `null`
   * @param {?Object=} opts.event.attach = `null`
   *   The #opts.event.attach option allows you to specify functionality for
   *   the *attach* event that occurs before `newVitals` returns a new
   *   `Vitals` instance. The *attach* event sets properties within the
   *   environment `object` and `function` hash maps defined by #opts.env. If
   *   a new `Vitals` instance is set within an #opts.env map, the following
   *   key names are used:
   *   - `"vitals"`
   *   - `"Vitals"`
   *   - `"VITALS"`
   *   See all of the #opts.event.attach options to learn more.
   * @param {boolean=} opts.event.attach.exports = `true`
   *   The #opts.event.attach.exports option enables or disables the *attach*
   *   event for an #opts.env.exports hash map.
   * @param {boolean=} opts.event.attach.force = `false`
   *   For each #opts.env hash map with an enabled *attach* event, the
   *   #opts.event.attach.force option causes the following (per
   *   #opts.event.attach.force value):
   *   - `true`!$
   *     The new `Vitals` instance is attached to the #opts.env hash map. If
   *     a pre-existing @vitals attachment is defined, the pre-existing
   *     `Vitals` instance is replaced with the new `Vitals` instance.
   *   - `false`!$
   *     The new `Vitals` instance is attached to the #opts.env hash map
   *     **only** if a pre-existing @vitals attachment is **not** defined.
   * @param {boolean=} opts.event.attach.global = `false`
   *   The #opts.event.attach.global option enables or disables the *attach*
   *   event for an #opts.env.global hash map.
   * @param {boolean=} opts.event.attach.root = `false`
   *   The #opts.event.attach.root option enables or disables the *attach*
   *   event for an #opts.env.root hash map.
   * @param {boolean=} opts.event.attach.self = `false`
   *   The #opts.event.attach.self option enables or disables the *attach*
   *   event for an #opts.env.self hash map.
   * @param {boolean=} opts.event.attach.window = `true`
   *   The #opts.event.attach.window option enables or disables the *attach*
   *   event for an #opts.env.window hash map.
   * @param {boolean=} opts.event.attach.testVersion = `true`
   *   For each #opts.env hash map with an enabled *attach* event, the
   *   #opts.event.attach.testVersion option causes the following (per
   *   #opts.event.attach.testVersion value):
   *   - `true`!$
   *     If the #opts.env hash map has a pre-existing @vitals attachment with
   *     a different version, an `Error` instance is thrown.
   *   - `false`!$
   *     The #opts.env hash map is not checked for a pre-existing @vitals
   *     attachment with a different version.
   * @param {(?Object|?Function)=} opts.root = `null`
   *   The #opts.root option is an alias for #opts.env.root.
   * @return {!Function}
   */
  function newVitals(opts) {

    /// #{{{ @step set-helpers

    /// #{{{ @func _hasEnumProp
    /**
     * @private
     * @param {*} key
     * @return {boolean}
     */
    var _hasEnumProp = Object['prototype']['propertyIsEnumerable'];
    /// #}}} @func _hasEnumProp

    /// #{{{ @func _hasNodeType
    /**
     * @private
     * @param {(!Object|!Function)} val
     * @return {boolean}
     */
    function _hasNodeType(val) {
      return 'nodeType' in val && !_isVoid(val['nodeType']);
    }
    /// #}}} @func _hasNodeType

    /// #{{{ @func _hasObjFunOpt
    /**
     * @private
     * @param {(?Object|?Function)} opts
     * @param {string} key
     * @return {boolean}
     */
    function _hasObjFunOpt(opts, key) {
      return !!opts
        && _hasOwnProp.call(opts, key)
        && _hasEnumProp.call(opts, key)
        && _isObjFun(opts[key]);
    /// #}}} @func _hasObjFunOpt

    /// #{{{ @func _hasOpt
    /**
     * @private
     * @param {(?Object|?Function)} opts
     * @param {string} key
     * @return {boolean}
     */
    function _hasOpt(opts, key) {
      return !!opts
        && _hasOwnProp.call(opts, key)
        && _hasEnumProp.call(opts, key)
        && !_isVoid(opts[key]);
    /// #}}} @func _hasOpt

    /// #{{{ @func _hasOwnProp
    /**
     * @private
     * @param {*} key
     * @return {boolean}
     */
    var _hasOwnProp = Object['prototype']['hasOwnProperty'];
    /// #}}} @func _hasOwnProp

    /// #{{{ @func _hasRootObj
    /**
     * @private
     * @param {(?Object|?Function)} val
     * @return {boolean}
     */
    function _hasRootObj(val) {
      return !!val && 'Object' in val && val['Object'] === Object;
    }
    /// #}}} @func _hasRootObj

    /// #{{{ @func _isBadAlias
    /**
     * @private
     * @param {(?Object|?Function)} mainOpts
     * @param {string} mainKey
     * @param {(?Object|?Function)=} aliasOpts = `mainOpts`
     * @param {string=} aliasKey = `mainKey`
     * @return {boolean}
     */
    function _isBadAlias(mainOpts, mainKey, aliasOpts, aliasKey) {

      switch (arguments['length']) {
        case 2:
          aliasOpts = mainOpts;
          aliasKey = mainKey;
          break;
        case 3:
          if (typeof aliasOpts === 'string') {
            aliasKey = aliasOpts;
            aliasOpts = mainOpts;
          }
          else {
            aliasKey = mainKey;
          }
      }

      return _hasOpt(mainOpts, mainKey)
        && _hasOpt(aliasOpts, aliasKey)
        && mainOpts[mainKey] !== aliasOpts[aliasKey];
    }
    /// #}}} @func _isBadAlias

    /// #{{{ @func _isBadBoolOpt
    /**
     * @private
     * @param {(?Object|?Function)} opts
     * @param {string} key
     * @return {boolean}
     */
    function _isBadBoolOpt(opts, key) {
      return _hasOpt(opts, key) && !_isBool(opts[key]);
    }
    /// #}}} @func _isBadBoolOpt

    /// #{{{ @func _isBadFunOpt
    /**
     * @private
     * @param {(?Object|?Function)} opts
     * @param {string} key
     * @return {boolean}
     */
    function _isBadFunOpt(opts, key) {
      return _hasOpt(opts, key) && !_isNullFun(opts[key]);
    }
    /// #}}} @func _isBadFunOpt

    /// #{{{ @func _isBadObjOpt
    /**
     * @private
     * @param {(?Object|?Function)} opts
     * @param {string} key
     * @return {boolean}
     */
    function _isBadObjOpt(opts, key) {
      return _hasOpt(opts, key) && !_isNullObj(opts[key]);
    }
    /// #}}} @func _isBadObjOpt

    /// #{{{ @func _isBadObjFunOpt
    /**
     * @private
     * @param {(?Object|?Function)} opts
     * @param {string} key
     * @return {boolean}
     */
    function _isBadObjFunOpt(opts, key) {
      return _hasOpt(opts, key) && !_isNullObjFun(opts[key]);
    }
    /// #}}} @func _isBadObjFunOpt

    /// #{{{ @func _isBadRootOpt
    /**
     * @private
     * @param {(?Object|?Function)} opts
     * @param {string} key
     * @return {boolean}
     */
    function _isBadRootOpt(opts, key) {
      return _hasOpt(opts, key) && !!opts[key] && !_hasRootObj(opts[key]);
    }
    /// #}}} @func _isBadRootOpt

    /// #{{{ @func _isBool
    /**
     * @private
     * @param {*} val
     * @return {boolean}
     */
    function _isBool(val) {
      return typeof val === 'boolean';
    }
    /// #}}} @func _isBool

    /// #{{{ @func _isFun
    /**
     * @private
     * @param {*} val
     * @return {boolean}
     */
    function _isFun(val) {
      return !!val && typeof val === 'function';
    }
    /// #}}} @func _isFun

    /// #{{{ @func _isFunType
    /**
     * @private
     * @param {string} typeOf
     * @return {boolean}
     */
    function _isFunType(typeOf) {
      return typeOf === 'function';
    }
    /// #}}} @func _isFunType

    /// #{{{ @func _isNull
    /**
     * @private
     * @param {*} val
     * @return {boolean}
     */
    function _isNull(val) {
      return val === __NIL__;
    }
    /// #}}} @func _isNull

    /// #{{{ @func _isNullFun
    /**
     * @private
     * @param {*} val
     * @return {boolean}
     */
    function _isNullFun(val) {
      return _isNull(val) || _isFun(val);
    }
    /// #}}} @func _isNullFun

    /// #{{{ @func _isNullObj
    /**
     * @private
     * @param {*} val
     * @return {boolean}
     */
    function _isNullObj(val) {
      return _isNull(val) || _isObj(val);
    }
    /// #}}} @func _isNullObj

    /// #{{{ @func _isNullObjFun
    /**
     * @private
     * @param {*} val
     * @return {boolean}
     */
    function _isNullObjFun(val) {
      return _isNull(val) || _isObjFun(val);
    }
    /// #}}} @func _isNullObjFun

    /// #{{{ @func _isObj
    /**
     * @private
     * @param {*} val
     * @return {boolean}
     */
    function _isObj(val) {
      return !!val && typeof val === 'object';
    }
    /// #}}} @func _isObj

    /// #{{{ @func _isObjFun
    /**
     * @private
     * @param {*} val
     * @return {boolean}
     */
    function _isObjFun(val) {
      return !!val && _isObjFunType(typeof val);
    }
    /// #}}} @func _isObjFun

    /// #{{{ @func _isObjFunType
    /**
     * @private
     * @param {string} typeOf
     * @return {boolean}
     */
    function _isObjFunType(typeOf) {
      switch (typeOf) {
        case 'object':
        case 'function':
          return __YES__;
      }
      return __NO__;
    }
    /// #}}} @func _isObjFunType

    /// #{{{ @func _isObjType
    /**
     * @private
     * @param {string} typeOf
     * @return {boolean}
     */
    function _isObjType(typeOf) {
      return typeOf === 'object';
    }
    /// #}}} @func _isObjType

    /// #{{{ @func _isVoid
    /**
     * @private
     * @param {*} val
     * @return {boolean}
     */
    function _isVoid(val) {
      return val === __VOID__;
    }
    /// #}}} @func _isVoid

    /// #{{{ @func _setAttachTypeErr
    /**
     * @private
     * @param {!TypeError} err
     * @param {string} name
     * @param {*} val
     * @param {string=} type = `"boolean="`
     * @return {!TypeError}
     */
    function _setAttachTypeErr(err, name, val, type) {
      name = 'event.attach.' + name;
      type = type || 'boolean=';
      return _setTypeErr(err, name, val, type);
    }
    /// #}}} @func _setAttachTypeErr

    /// #{{{ @func _setEnvTypeErr
    /**
     * @private
     * @param {!TypeError} err
     * @param {string} name
     * @param {*} val
     * @param {string=} type = `"(?Object|?Function)="`
     * @return {!TypeError}
     */
    function _setEnvTypeErr(err, name, val, type) {
      name = 'env.' + name;
      type = type || '(?Object|?Function)=';
      return _setTypeErr(err, name, val, type);
    }
    /// #}}} @func _setEnvTypeErr

    /// #{{{ @func _setErr
    /**
     * @private
     * @param {!Error} err
     * @param {string} msg
     * @param {*=} val
     * @return {!Error}
     */
    function _setErr(err, msg, val) {
      msg += ' for `newVitals` call';
      return arguments['length'] > 2
        ? _setErrProps(err, 'Error', msg, val)
        : _setErrProps(err, 'Error', msg);
    }
    /// #}}} @func _setErr

    /// #{{{ @func _setErrProps
    /**
     * @private
     * @param {(!Error|!TypeError)} err
     * @param {string} name
     * @param {string} msg
     * @param {*=} val
     * @return {(!Error|!TypeError)}
     */
    function _setErrProps(err, name, msg, val) {
      err['__vitals'] = true;
      err['vitals'] = true;
      err['name'] = name;
      switch (name) {
        case 'TypeError':
          err['__type'] = true;
          err['type'] = true;
          break;
        case 'RangeError':
          err['__range'] = true;
          err['range'] = true;
          break;
      }
      err['message'] = msg;
      err['msg'] = msg;
      if (arguments['length'] > 3) {
        err['value'] = val;
        err['val'] = val;
      }
      return err;
    }
    /// #}}} @func _setErrProps

    /// #{{{ @func _setTypeErr
    /**
     * @private
     * @param {!TypeError} err
     * @param {string} param
     * @param {*} val
     * @param {string} type
     * @return {!TypeError}
     */
    function _setTypeErr(err, param, val, type) {

      /** @type {string} */
      var msg;

     if (param !== 'opts') {
       param = 'opts.' + param;
     }

      msg = 'invalid #' + param + ' data type for `newVitals` call\n'
        + '    valid-data-types: `' + type + '`\n'
        + '    typeof-invalid-value: `' + (typeof val) + '`';

      return _setErrProps(err, 'TypeError', msg, val);
    }
    /// #}}} @func _setTypeErr

    /// #}}} @step set-helpers

    /// #{{{ @step declare-variables

    /** @type {!Function} */
    var newVitalsInstance;
    /** @type {?Object} */
    var attach;
    /** @type {?Object} */
    var events;
    /** @type {boolean} */
    var force;
    /** @type {?Object} */
    var env;

    /// #}}} @step declare-variables

    /// #{{{ @step verify-parameters

    if ( arguments['length'] > 0 && !_isVoid(opts) && !_isNull(opts) ) {

      if ( !_isObj(opts) ) {
        throw _setTypeErr(new TypeError, 'opts', opts, '?Object=');
      }

      if ( _hasBadObjOpt(opts, 'env') ) {
        throw _setTypeErr(new TypeError, 'env', opts['env'], '?Object=');
      }
      if ( _hasBadObjOpt(opts, 'event') ) {
        throw _setTypeErr(new TypeError, 'event', opts['event'], '?Object=');
      }
      if ( _hasBadObjFunOpt(opts, 'root') ) {
        throw _setTypeErr(new TypeError, 'root', opts['root'],
          '(?Object|?Function)=');
      }

      env = _hasOpt(opts, 'env')
        ? opts['env']
        : __NIL__;
      events = _hasOpt(opts, 'event')
        ? opts['event']
        : __NIL__;
    }
    else {
      opts = __NIL__;
      env = __NIL__;
      events = __NIL__;
    }

    if (!!env) {
      if ( _hasBadFunOpt(env, 'define') ) {
        throw _setEnvTypeErr(new TypeError, 'define', env['define'],
          '?Function=');
      }
      if ( _hasBadObjFunOpt(env, 'exports') ) {
        throw _setEnvTypeErr(new TypeError, 'exports', env['exports']);
      }
      if ( _hasBadObjFunOpt(env, 'global') ) {
        throw _setEnvTypeErr(new TypeError, 'global', env['global']);
      }
      if ( _hasBadObjFunOpt(env, 'module') ) {
        throw _setEnvTypeErr(new TypeError, 'module', env['module']);
      }
      if ( _hasBadObjFunOpt(env, 'root') ) {
        throw _setEnvTypeErr(new TypeError, 'root', env['root']);
      }
      if ( _hasBadObjFunOpt(env, 'self') ) {
        throw _setEnvTypeErr(new TypeError, 'self', env['self']);
      }
      if ( _hasBadObjFunOpt(env, 'window') ) {
        throw _setEnvTypeErr(new TypeError, 'window', env['window']);
      }
    }

    if ( _isBadAlias(env, 'root', opts) ) {
      throw _setErr(new Error, 'conflicting values set for #opts.env.root'
        + ' and its #opts.root alias',
        {
          'root': opts['root'],
          'env': {
            'root': env['root']
          }
        });
    }

    if ( _isBadRootOpt(env, 'root') ) {
      throw _setErr(new Error, 'invalid #opts.env.root defined', env['root']);
    }
    if ( _isBadRootOpt(opts, 'root') ) {
      throw _setErr(new Error, 'invalid #opts.root defined', opts['root']);
    }

    if (!!events) {
      if ( _hasBadObjOpt(events, 'attach') ) {
        throw _setTypeErr(new TypeError, 'event.attach', events['attach'],
          '?Object=');
      }
    }

    attach = _hasOpt(events, 'attach')
      ? opts['attach']
      : __NIL__;

    if (!!attach) {
      if ( _hasBadBoolOpt(attach, 'exports') ) {
        throw _setAttachTypeErr(new TypeError, 'exports', attach['exports']);
      }
      if ( _hasBadBoolOpt(attach, 'force') ) {
        throw _setAttachTypeErr(new TypeError, 'force', attach['force']);
      }
      if ( _hasBadBoolOpt(attach, 'global') ) {
        throw _setAttachTypeErr(new TypeError, 'global', attach['global']);
      }
      if ( _hasBadBoolOpt(attach, 'root') ) {
        throw _setAttachTypeErr(new TypeError, 'root', attach['root']);
      }
      if ( _hasBadBoolOpt(attach, 'self') ) {
        throw _setAttachTypeErr(new TypeError, 'self', attach['self']);
      }
      if ( _hasBadBoolOpt(attach, 'window') ) {
        throw _setAttachTypeErr(new TypeError, 'window', attach['window']);
      }
      if ( _hasBadBoolOpt(attach, 'testVersion') ) {
        throw _setAttachTypeErr(new TypeError, 'testVersion',
          attach['testVersion']);
      }
    }

    /// #}}} @step verify-parameters

    /// #{{{ @step set-environment-constants

    /// #{{{ @const _HAS_EXPORTS
    /**
     * @private
     * @const {boolean}
     */
    var _HAS_EXPORTS = _isObjFunType(typeof exports)
      && !!exports
      && !_hasNodeType(exports);
    /// #}}} @const _HAS_EXPORTS

    /// #{{{ @const _HAS_MODULE
    /**
     * @private
     * @const {boolean}
     */
    var _HAS_MODULE = _isObjFunType(typeof module)
      && !!module
      && !_hasNodeType(module);
    /// #}}} @const _HAS_MODULE

    /// #{{{ @const _HAS_GLOBAL
    /**
     * @private
     * @const {boolean}
     */
    var _HAS_GLOBAL = _HAS_EXPORTS
      && _HAS_MODULE
      && _isObjType(typeof global)
      && _hasRootObj(global);
    /// #}}} @const _HAS_GLOBAL

    /// #{{{ @const _HAS_WINDOW
    /**
     * @private
     * @const {boolean}
     */
    var _HAS_WINDOW = _isObjFunType(typeof window) && _hasRootObj(window);
    /// #}}} @const _HAS_WINDOW

    /// #{{{ @const _HAS_DEFINE
    /**
     * @private
     * @const {boolean}
     */
    var _HAS_DEFINE = _isFunType(typeof define)
      && 'amd' in define
      && _isObj(define['amd']);
    /// #}}} @const _HAS_DEFINE

    /// #{{{ @const _HAS_SELF
    /**
     * @private
     * @const {boolean}
     */
    var _HAS_SELF = _isObjFunType(typeof self) && _hasRootObj(self);
    /// #}}} @const _HAS_SELF

    /// #{{{ @const _THIS
    /**
     * @const {(?Object|?Function)}
     */
    var _THIS = _isObjFun(__THIS__) && _hasRootObj(__THIS__)
      ? __THIS__
      : (function __vitalsGetBaseThis__(__this__) {
          return _isObjFun(__this__) && _hasRootObj(__this__)
            ? __this__
            : _isObjFun(__THIS__)
              ? __THIS__
              : _isObjFun(__this__)
                ? __this__
                : __NIL__;
        })( (new Function('return this;'))() );
    /// #}}} @const _THIS

    /// #{{{ @const _HAS_THIS
    /**
     * @private
     * @const {boolean}
     */
    var _HAS_THIS = _isObjFun(_THIS) && _hasRootObj(_THIS);
    /// #}}} @const _HAS_THIS

    /// #{{{ @const ENV_DFLT
    /**
     * @const {!Object}
     * @struct
     */
    var ENV_DFLT = {
      DEFINE: _HAS_DEFINE
        ? define
        : __NIL__,
      EXPORTS: _HAS_EXPORTS
        ? exports
        : __NIL__,
      GLOBAL: _HAS_GLOBAL
        ? global
        : __NIL__,
      MODULE: _HAS_MODULE
        ? module
        : __NIL__,
      SELF: _HAS_SELF
        ? self
        : __NIL__,
      ROOT: _HAS_GLOBAL
        ? global
        : ( _HAS_WINDOW
            && ( !_HAS_THIS
              || !('window' in _THIS)
              || window !== _THIS['window'] ))
          ? window
          : _HAS_SELF
            ? self
            : _HAS_THIS
              ? _THIS
              : __NIL__,
      THIS: _THIS,
      WINDOW: _HAS_WINDOW
        ? window
        : __NIL__
    };
    /// #}}} @const ENV_DFLT

    /// #{{{ @const ENV_IS_DFLT
    /**
     * @const {!Object}
     * @struct
     */
    var ENV_IS_DFLT = {
      DEFINE: !_hasOpt(env, 'define'),
      EXPORTS: !_hasOpt(env, 'exports'),
      GLOBAL: !_hasOpt(env, 'global'),
      MODULE: !_hasOpt(env, 'module'),
      ROOT: _hasOpt(env, 'root')
        ? !_hasObjFunOpt(env, 'root')
        : !_hasObjFunOpt(opts, 'root'),
      SELF: !_hasOpt(env, 'self'),
      WINDOW: !_hasOpt(env, 'window')
    };
    /// #}}} @const ENV_IS_DFLT

    /// #{{{ @const ENV_HAS
    /**
     * @const {!Object}
     * @struct
     */
    var ENV_HAS = {
      DEFINE: ENV_IS_DFLT.DEFINE
        ? _HAS_DEFINE
        : !!env['define'],
      EXPORTS: ENV_IS_DFLT.EXPORTS
        ? _HAS_EXPORTS
        : !!env['exports'] && !_hasNodeType(env['exports']),
      GLOBAL: ENV_IS_DFLT.GLOBAL
        ? _HAS_GLOBAL
        : !!env['global'] && _hasRootObj(env['global']),
      MODULE: ENV_IS_DFLT.MODULE
        ? _HAS_MODULE
        : !!env['module'] && !_hasNodeType(env['module']),
      SELF: ENV_IS_DFLT.SELF
        ? _HAS_SELF
        : !!env['self'] && _hasRootObj(env['self']),
      THIS: _HAS_THIS,
      WINDOW: ENV_IS_DFLT.WINDOW
        ? _HAS_WINDOW
        : !!env['window'] && _hasRootObj(env['window'])
    };
    /// #}}} @const ENV_HAS

    /// #{{{ @const ENV
    /**
     * @const {!Object}
     * @struct
     */
    var ENV = {
      HAS: ENV_HAS,
      DFLT: ENV_DFLT,
      IS_DFLT: ENV_IS_DFLT,
      DEFINE: ENV_IS_DFLT.DEFINE
        ? ENV_DFLT.DEFINE
        : env['define'],
      EXPORTS: ENV_IS_DFLT.EXPORTS
        ? ENV_DFLT.EXPORTS
        : env['exports'],
      GLOBAL: ENV_IS_DFLT.GLOBAL
        ? ENV_DFLT.GLOBAL
        : env['global'],
      MODULE: ENV_IS_DFLT.MODULE
        ? ENV_DFLT.MODULE
        : env['module'],
      ROOT: ENV_IS_DFLT.ROOT
        ? ENV_HAS.GLOBAL
          ? ENV_IS_DFLT.GLOBAL
            ? ENV_DFLT.GLOBAL
            : env['global']
          : ( ENV_HAS.WINDOW
              && ( !ENV_HAS.THIS
                || !('window' in _THIS)
                || ( ENV_IS_DFLT.WINDOW
                  ? ENV_DFLT.WINDOW !== _THIS['window']
                  : env['window'] !== _THIS['window'] )))
            ? ENV_IS_DFLT.WINDOW
              ? ENV_DFLT.WINDOW
              : env['window']
            : ENV_HAS.SELF
              ? ENV_IS_DFLT.SELF
                ? ENV_DFLT.SELF
                : env['self']
              : ENV_HAS.THIS
                ? _THIS
                : __NIL__
        : _hasObjFunOpt(env, 'root')
          ? env['root']
          : opts['root'],
      SELF: ENV_IS_DFLT.SELF
        ? ENV_DFLT.SELF
        : env['self'],
      THIS: _THIS,
      WINDOW: ENV_IS_DFLT.WINDOW
        ? ENV_DFLT.WINDOW
        : env['window']
    };
    /// #}}} @const ENV

    /// #}}} @step set-environment-constants

    /// #{{{ @step verify-environment-root

    if ( !_hasRootObj(ENV.ROOT) ) {
      throw _setErr(new Error, 'unable to find valid JS env root', ENV.ROOT);
    }

    /// #}}} @step verify-environment-root

    /// #{{{ @step create-polyfills

    /// #{{{ @const _OBJ
    /**
     * @const {!Object}
     */
    var _OBJ = ENV.ROOT['Object'];
    /// #}}} @const _OBJ

    /// #{{{ @const _HAS_DEFINE_PROP
    /**
     * @private
     * @const {boolean}
     */
    var _HAS_DEFINE_PROP = (function __vitalsVerifyDefineProperty__() {

      /** @type {!Object} */
      var desc;
      /** @type {string} */
      var name;
      /** @type {string} */
      var key;
      /** @type {(!Object|!Function)} */
      var src;

      name = 'defineProperty';

      if ( !(name in _OBJ) || !_isFun(_OBJ[name]) ) {
        return __NO__;
      }

      /** @dict */ 
      src = {};

      /** @dict */ 
      desc = {};
      desc['value'] = src;
      desc['writable'] = __YES__;
      desc['enumerable'] = __NO__;
      desc['configurable'] = __YES__;

      try {
        _OBJ[name](src, 'key', desc);
        for (key in src) {
          if (key === 'key') {
            return __NO__;
          }
        }
      }
      catch (e) {
        return __NO__;
      }

      if (src['key'] !== src) {
        return __NO__;
      }

      src = function __testFunction__(){};

      /** @dict */ 
      desc = {};
      desc['value'] = src;
      desc['writable'] = __YES__;
      desc['enumerable'] = __NO__;
      desc['configurable'] = __YES__;

      try {
        _OBJ[name](src, 'key', desc);
        for (key in src) {
          if (key === 'key') {
            return __NO__;
          }
        }
      }
      catch (e) {
        return __NO__;
      }

      return src['key'] === src;
    })();
    /// #}}} @const _HAS_DEFINE_PROP

    /// #{{{ @func _defProp
    /**
     * @private
     * @param {(!Object|!Function)} src
     * @param {string} key
     * @param {!Object} descriptor
     * @return {(!Object|!Function)}
     */
    var _defProp = _HAS_DEFINE_PROP
      ? _OBJ['defineProperty']
      : function _defProp(src, key, descriptor) {
          if ( _hasOwnProp.call(descriptor, 'value') ) {
            src[key] = descriptor['value'];
          }
          return src;
        };
    /// #}}} @func _defProp

    /// #}}} @step create-polyfills

    /// #{{{ @step create-config-constants

    /// #{{{ @const CONFIG
    /**
     * @const {!Object}
     */
    var CONFIG = {};
    /// #}}} @const CONFIG

    /// #}}} @step create-config-constants

    /// #{{{ @step create-new-vitals-instance

    newVitalsInstance = makeNewVitals();
    makeVitals(newVitalsInstance, ENV.ROOT, ENV, CONFIG);

    /// #}}} @step create-new-vitals-instance

    /// #{{{ @step check-global-vitals-version

    if ( _hasOpt(attach, 'testVersion') && attach['testVersion'] ) {
    }

    /// #}}} @step check-global-vitals-version

    /// #{{{ @step define-global-vitals-properties

    force = _hasOpt(attach, 'force') && attach['force'];

    /// #}}} @step define-global-vitals-properties

    /// #{{{ @step return-new-vitals-instance

    return newVitalsInstance;

    /// #}}} @step return-new-vitals-instance
  }
  /// #}}} @core newVitals

  /// #{{{ @step return-new-vitals

  return newVitals;

  /// #}}} @step return-new-vitals
}
/// #}}} @core makeNewVitals

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
