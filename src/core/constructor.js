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
   * @param {boolean=} opts.event.attach.define = `false`
   *   The #opts.event.attach.define option enables or disables the *attach*
   *   event for an #opts.env.define hash map.
   * @param {boolean=} opts.event.attach.exports = `false`
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
   * @param {boolean=} opts.event.attach.module = `false`
   *   The #opts.event.attach.module option enables or disables the *attach*
   *   event for an #opts.env.module hash map.
   * @param {boolean=} opts.event.attach.root = `false`
   *   The #opts.event.attach.root option enables or disables the *attach*
   *   event for an #opts.env.root hash map.
   * @param {boolean=} opts.event.attach.self = `false`
   *   The #opts.event.attach.self option enables or disables the *attach*
   *   event for an #opts.env.self hash map.
   * @param {boolean=} opts.event.attach.window = `false`
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
   * @param {boolean=} opts.event.define = `false`
   *   The #opts.event.export option allows you to control whether the new
   *   `Vitals` instance is set as the value for the `"exports"` property of
   *   an existing #opts.env.module hash map.
   * @param {boolean=} opts.event.export = `false`
   *   The #opts.event.export option allows you to control whether the new
   *   `Vitals` instance is set as the value for the `"exports"` property of
   *   an existing #opts.env.module hash map.
   * @param {(?Object|?Function)=} opts.root = `null`
   *   The #opts.root option is an alias for #opts.env.root.
   * @return {!Function}
   */
  function newVitals(opts) {

    /// #{{{ @step set-helpers

    /// #{{{ @group constants

    /// #{{{ @const _ERR
    /**
     * @private
     * @const {!Function}
     * @constructor
     */
    var _ERR = Error;
    /// #}}} @const _ERR

    /// #{{{ @const _FUN
    /**
     * @private
     * @const {!Function}
     * @constructor
     */
    var _FUN = Function;
    /// #}}} @const _FUN

    /// #{{{ @const _OBJ
    /**
     * @private
     * @const {!Function}
     * @constructor
     */
    var _OBJ = Object;
    /// #}}} @const _OBJ

    /// #{{{ @const _OBJ_PROTO
    /**
     * @private
     * @const {!Object}
     * @dict
     */
    var _OBJ_PROTO = _OBJ['prototype'];
    /// #}}} @const _OBJ_PROTO

    /// #{{{ @const _TYPE_ERR
    /**
     * @private
     * @const {!Function}
     * @constructor
     */
    var _TYPE_ERR = TypeError;
    /// #}}} @const _TYPE_ERR

    /// #}}} @group constants

    /// #{{{ @group owns

    /// #{{{ @func _owns
    /**
     * @private
     * @param {(!Object|!Function)} src
     * @param {*} key
     * @return {boolean}
     */
    var _owns = (function __newVitalsHasOwnProp__() {

      /// #{{{ @func _hasOwnProp
      /**
       * @private
       * @param {*} key
       * @return {boolean}
       */
      var _hasOwnProp = _OBJ_PROTO['hasOwnProperty'];
      /// #}}} @func _hasOwnProp

      /// #{{{ @func owns
      /**
       * @param {(!Object|!Function)} src
       * @param {*} key
       * @return {boolean}
       */
      function owns(src, key) {
        return _hasOwnProp['call'](src, key);
      }
      /// #}}} @func owns

      return owns;
    })();
    /// #}}} @func _owns

    /// #{{{ @func _ownsEnum
    /**
     * @private
     * @param {(!Object|!Function)} src
     * @param {*} key
     * @return {boolean}
     */
    var _ownsEnum = (function __newVitalsHasOwnEnumProp__() {

      /// #{{{ @func _hasEnumProp
      /**
       * @private
       * @param {*} key
       * @return {boolean}
       */
      var _hasEnumProp = _OBJ_PROTO['propertyIsEnumerable'];
      /// #}}} @func _hasEnumProp

      /// #{{{ @func ownsEnum
      /**
       * @param {(!Object|!Function)} src
       * @param {*} key
       * @return {boolean}
       */
      function ownsEnum(src, key) {
        return _owns(src, key) && _hasEnumProp['call'](src, key);
      }
      /// #}}} @func ownsEnum

      return ownsEnum;
    })();
    /// #}}} @func _ownsEnum

    /// #}}} @group owns

    /// #{{{ @group has

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

    /// #{{{ @func _hasBoolOpt
    /**
     * @private
     * @param {(?Object|?Function)} opts
     * @param {string} key
     * @return {boolean}
     */
    function _hasBoolOpt(opts, key) {
      return !!opts && _ownsEnum(opts, key) && _isBool(opts[key]);
    }
    /// #}}} @func _hasBoolOpt

    /// #{{{ @func _hasFunOpt
    /**
     * @private
     * @param {(?Object|?Function)} opts
     * @param {string} key
     * @return {boolean}
     */
    function _hasFunOpt(opts, key) {
      return !!opts && _ownsEnum(opts, key) && _isFun(opts[key]);
    }
    /// #}}} @func _hasFunOpt

    /// #{{{ @func _hasObjFunOpt
    /**
     * @private
     * @param {(?Object|?Function)} opts
     * @param {string} key
     * @return {boolean}
     */
    function _hasObjFunOpt(opts, key) {
      return !!opts && _ownsEnum(opts, key) && _isObjFun(opts[key]);
    }
    /// #}}} @func _hasObjFunOpt

    /// #{{{ @func _hasOpt
    /**
     * @private
     * @param {(?Object|?Function)} opts
     * @param {string} key
     * @return {boolean}
     */
    function _hasOpt(opts, key) {
      return !!opts && _ownsEnum(opts, key) && !_isVoid(opts[key]);
    }
    /// #}}} @func _hasOpt

    /// #{{{ @func _hasRootObj
    /**
     * @private
     * @param {(?Object|?Function)} val
     * @return {boolean}
     */
    function _hasRootObj(val) {
      return !!val && 'Object' in val && val['Object'] === _OBJ;
    }
    /// #}}} @func _hasRootObj

    /// #{{{ @func _hasTrueOpt
    /**
     * @private
     * @param {(?Object|?Function)} opts
     * @param {string} key
     * @return {boolean}
     */
    function _hasTrueOpt(opts, key) {
      return _hasBoolOpt(opts, key) && opts[key];
    }
    /// #}}} @func _hasTrueOpt

    /// #}}} @group has

    /// #{{{ @group is

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
          if ( _isStr(aliasOpts) ) {
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

    /// #{{{ @func _isStr
    /**
     * @private
     * @param {*} val
     * @return {boolean}
     */
    function _isStr(val) {
      return typeof val === 'string';
    }
    /// #}}} @func _isStr

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

    /// #}}} @group is

    /// #{{{ @group error

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
      name = 'attach.' + name;
      type = type || 'boolean=';
      return _setEventTypeErr(err, name, val, type);
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

    /// #{{{ @func _setEventTypeErr
    /**
     * @private
     * @param {!TypeError} err
     * @param {string} name
     * @param {*} val
     * @param {string=} type = `"boolean="`
     * @return {!TypeError}
     */
    function _setEventTypeErr(err, name, val, type) {
      name = 'event.' + name;
      type = type || 'boolean=';
      return _setTypeErr(err, name, val, type);
    }
    /// #}}} @func _setEventTypeErr

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

    /// #}}} @group error

    /// #{{{ @group polyfills

    /// #{{{ @const _HAS_CREATE
    /**
     * @private
     * @const {boolean}
     */
    var _HAS_CREATE = 'create' in _OBJ && _isFun(_OBJ['create']);
    /// #}}} @const _HAS_CREATE

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
      /** @type {!Object} */
      var src;
      /** @type {*} */
      var err;

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
      catch (err) {
        return __NO__;
      }

      return src['key'] === src;
    })();
    /// #}}} @const _HAS_DEFINE_PROP

    /// #{{{ @const _HAS_DEFINE_PROPS
    /**
     * @private
     * @const {boolean}
     */
    var _HAS_DEFINE_PROPS = (function __vitalsVerifyDefineProperties__() {

      /** @type {!Object} */
      var props;
      /** @type {!Object} */
      var desc;
      /** @type {string} */
      var name;
      /** @type {string} */
      var key;
      /** @type {!Object} */
      var src;
      /** @type {*} */
      var err;

      name = 'defineProperties';

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

      /** @dict */ 
      props = {};
      props['key'] = desc;

      try {
        _OBJ[name](src, props);
        for (key in src) {
          if (key === 'key') {
            return __NO__;
          }
        }
      }
      catch (err) {
        return __NO__;
      }

      return src['key'] === src;
    })();
    /// #}}} @const _HAS_DEFINE_PROPS

    /// #{{{ @const _HAS_FUN_DEFINE_PROP
    /**
     * @private
     * @const {boolean}
     */
    var _HAS_FUN_DEFINE_PROP = (function __vitalsVerifyDefineFunProp__() {

      /** @type {!Object} */
      var desc;
      /** @type {string} */
      var key;
      /** @type {!Function} */
      var src;
      /** @type {*} */
      var err;

      if (!_HAS_DEFINE_PROP) {
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
        _OBJ['defineProperty'](src, 'key', desc);
        for (key in src) {
          if (key === 'key') {
            return __NO__;
          }
        }
      }
      catch (err) {
        return __NO__;
      }

      return src['key'] === src;
    })();
    /// #}}} @const _HAS_FUN_DEFINE_PROP

    /// #{{{ @const _HAS_FUN_DEFINE_PROPS
    /**
     * @private
     * @const {boolean}
     */
    var _HAS_FUN_DEFINE_PROPS = (function __vitalsVerifyDefineFunProps__() {

      /** @type {!Object} */
      var props;
      /** @type {!Object} */
      var desc;
      /** @type {string} */
      var key;
      /** @type {!Function} */
      var src;
      /** @type {*} */
      var err;

      if (!_HAS_DEFINE_PROPS) {
        return __NO__;
      }

      src = function __testFunction__(){};

      /** @dict */ 
      desc = {};
      desc['value'] = src;
      desc['writable'] = __YES__;
      desc['enumerable'] = __NO__;
      desc['configurable'] = __YES__;

      /** @dict */ 
      props = {};
      props['key'] = desc;

      try {
        _OBJ['defineProperties'](src, props);
        for (key in src) {
          if (key === 'key') {
            return __NO__;
          }
        }
      }
      catch (err) {
        return __NO__;
      }

      return src['key'] === src;
    })();
    /// #}}} @const _HAS_FUN_DEFINE_PROPS

  /// #{{{ @func _create
  /**
   * @private
   * @param {?Object} proto
   * @return {!Object}
   */
  var _create = _HAS_CREATE
    ? _OBJ['create']
    : (function __vitalsMakeObjectCreatePolyfill__() {

        /// #{{{ @func _Obj
        /**
         * @private
         * @constructor
         */
        function _Obj(){}
        /// #}}} @func _Obj

        /// #{{{ @func create
        /**
         * @param {?Object} proto
         * @return {!Object}
         */
        function create(proto) {

          /** @type {!Object} */
          var obj;

          _Obj['prototype'] = proto;
          obj = new _Obj();
          _Obj['prototype'] = __NIL__;
          return obj;
        }
        /// #}}} @func create

        return create;
      })();
  /// #}}} @func _create

    /// #{{{ @func _defProp
    /**
     * @private
     * @param {(!Object|!Function)} src
     * @param {string} key
     * @param {!Object} descriptor
     * @return {(!Object|!Function)}
     */
    var _defProp = _HAS_FUN_DEFINE_PROP
      ? _OBJ['defineProperty']
      : function defineProperty(src, key, descriptor) {
          if ( _owns(descriptor, 'value') ) {
            src[key] = descriptor['value'];
          }
          return src;
        };
    /// #}}} @func _defProp

    /// #}}} @group polyfills

    /// #{{{ @group events

    /// #{{{ @func _runAttachEvent
    /**
     * @private
     * @param {!Object<string, (?Object|?Function)>} env
     * @param {?Object<string, boolean>} attach
     * @param {!Function} newVitalsInst
     * @return {void}
     */
    var _runAttachEvent = (function __newVitalsAttachEvent__() {

      /// #{{{ @const _VITALS_KEYS
      /**
       * @private
       * @const {!Array<string>}
       */
      var _VITALS_KEYS = [
        'vitals',
        'Vitals',
        'VITALS'
      ];
      /// #}}} @const _VITALS_KEYS

      /// #{{{ @func _attachVitals
      /**
       * @private
       * @param {(?Object|?Function)} src
       * @param {string} envKey
       * @param {!Function} newVitalsInst
       * @param {boolean} force
       * @param {boolean} testVersion
       * @return {void}
       */
      function _attachVitals(src, envKey, newVitalsInst, force, testVersion) {

        /** @type {string} */
        var key;
        /** @type {number} */
        var len;
        /** @type {number} */
        var i;

        if (!src) {
          return;
        }

        len = _VITALS_KEYS['length'];
        i = -1;
        while (++i < len) {
          key = _VITALS_KEYS[i];
          if ( _hasFunOpt(src, key) ) {
            if ( testVersion && !_hasMatchingVersion(src[key]) ) {
              throw _setErr(new _ERR, envKey, key, src[key]);
            }
            if (force) {
              src[key] = newVitalsInst;
            }
            else {
              _attachVitalsSuper(src[key], newVitalsInst);
            }
          }
          else {
            src[key] = newVitalsInst;
          }
        }
      }
      /// #}}} @func _attachVitals

      /// #{{{ @func _attachVitalsSuper
      /**
       * @private
       * @param {!Function} oldVitalsInst
       * @param {!Function} newVitalsInst
       * @return {void}
       */
      function _attachVitalsSuper(oldVitalsInst, newVitalsInst) {

        /** @type {string} */
        var key;

        for (key in newVitalsInst) {
          if ( _owns(newVitalsInst, key)
                && _isFun(newVitalsInst[key])
                && !_hasFunOpt(oldVitalsInst, key) ) {
            oldVitalsInst[key] = newVitalsInst[key];
          }
        }
      }
      /// #}}} @func _attachVitalsSuper

      /// #{{{ @func _hasMatchingVersion
      /**
       * @private
       * @param {!Function} oldVitalsInst
       * @return {boolean}
       */
      function _hasMatchingVersion(oldVitalsInst) {
        return _hasFunOpt(oldVitalsInst, 'version')
          && oldVitalsInst['version']() === __VERSION__;
      }
      /// #}}} @func _hasMatchingVersion

      /// #{{{ @func _setVersionErr
      /**
       * @private
       * @param {!Error} err
       * @param {string} envKey
       * @param {string} vitalsKey
       * @param {!Function} oldVitalsInst
       * @return {!Error}
       */
      function _setVersionErr(err, envKey, vitalsKey, oldVitalsInst) {

        /** @type {string} */
        var version;
        /** @type {string} */
        var msg;
        /** @type {*} */
        var val;

        val = _hasFunOpt(oldVitalsInst, 'version')
          && oldVitalsInst['version']();

        if ( !_isStr(val) && _owns(oldVitalsInst, 'VERSION') ) {
          val = oldVitalsInst['VERSION'];
        }

        version = _isStr(val) && val !== __VERSION__
          ? val
          : '';

        msg = 'non-matching `vitals` version at #opts.env.' + envKey + '.'
          + vitalsKey + ' for `newVitals` call\n'
          + '    current-version: `"' + __VERSION__ + '"`\n'
          + '    invalid-version: `"' + version + '"`';

        return _setErrProps(err, 'Error', msg, oldVitalsInst);
      }
      /// #}}} @func _setVersionErr

      /// #{{{ @func runAttachEvent
      /**
       * @param {!Object<string, (?Object|?Function)>} env
       * @param {?Object<string, boolean>} attach
       * @param {!Function} newVitalsInst
       * @return {void}
       */
      function runAttachEvent(env, attach, newVitalsInst) {

        /** @type {boolean} */
        var testVersion;
        /** @type {boolean} */
        var force;
        /** @type {string} */
        var key;

        force = _hasTrueOpt(attach, 'force');

        key = 'testVersion';
        testVersion = _hasBoolOpt(attach, key)
          ? attach[key]
          : __YES__;

        for (key in env) {
          if ( _owns(env, key) && _hasTrueOpt(attach, key) ) {
            _attachVitals(env[key], key, newVitalsInst, force, testVersion);
          }
        }
      }
      /// #}}} @func runAttachEvent

      return runAttachEvent;
    })();
    /// #}}} @func _runAttachEvent

    /// #}}} @group events

    /// #}}} @step set-helpers

    /// #{{{ @step declare-variables

    /** @type {!Function} */
    var newVitalsInstance;
    /** @type {?Object} */
    var attach;
    /** @type {?Object} */
    var events;
    /** @type {?Object} */
    var env;

    /// #}}} @step declare-variables

    /// #{{{ @step verify-parameters

    if ( arguments['length'] > 0 && !_isVoid(opts) && !_isNull(opts) ) {

      if ( !_isObj(opts) ) {
        throw _setTypeErr(new _TYPE_ERR, 'opts', opts, '?Object=');
      }

      if ( _hasBadObjOpt(opts, 'env') ) {
        throw _setTypeErr(new _TYPE_ERR, 'env', opts['env'], '?Object=');
      }
      if ( _hasBadObjOpt(opts, 'event') ) {
        throw _setTypeErr(new _TYPE_ERR, 'event', opts['event'], '?Object=');
      }
      if ( _hasBadObjFunOpt(opts, 'root') ) {
        throw _setTypeErr(new _TYPE_ERR, 'root', opts['root'],
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
        throw _setEnvTypeErr(new _TYPE_ERR, 'define', env['define'],
          '?Function=');
      }
      if ( _hasBadObjFunOpt(env, 'exports') ) {
        throw _setEnvTypeErr(new _TYPE_ERR, 'exports', env['exports']);
      }
      if ( _hasBadObjFunOpt(env, 'global') ) {
        throw _setEnvTypeErr(new _TYPE_ERR, 'global', env['global']);
      }
      if ( _hasBadObjFunOpt(env, 'module') ) {
        throw _setEnvTypeErr(new _TYPE_ERR, 'module', env['module']);
      }
      if ( _hasBadObjFunOpt(env, 'root') ) {
        throw _setEnvTypeErr(new _TYPE_ERR, 'root', env['root']);
      }
      if ( _hasBadObjFunOpt(env, 'self') ) {
        throw _setEnvTypeErr(new _TYPE_ERR, 'self', env['self']);
      }
      if ( _hasBadObjFunOpt(env, 'window') ) {
        throw _setEnvTypeErr(new _TYPE_ERR, 'window', env['window']);
      }
    }

    if ( _isBadAlias(env, 'root', opts) ) {
      throw _setErr(new _ERR, 'conflicting values set for #opts.env.root'
        + ' and its #opts.root alias',
        {
          'root': opts['root'],
          'env': {
            'root': env['root']
          }
        });
    }

    if ( _isBadRootOpt(env, 'root') ) {
      throw _setErr(new _ERR, 'invalid #opts.env.root defined', env['root']);
    }
    if ( _isBadRootOpt(opts, 'root') ) {
      throw _setErr(new _ERR, 'invalid #opts.root defined', opts['root']);
    }

    if (!!events) {
      if ( _hasBadObjOpt(events, 'attach') ) {
        throw _setEventTypeErr(new _TYPE_ERR, 'attach', events['attach'],
          '?Object=');
      }
      if ( _hasBadBoolOpt(events, 'define') ) {
        throw _setEventTypeErr(new _TYPE_ERR, 'define', events['define']);
      }
      if ( _hasBadBoolOpt(events, 'export') ) {
        throw _setEventTypeErr(new _TYPE_ERR, 'export', events['export']);
      }
    }

    attach = _hasOpt(events, 'attach')
      ? events['attach']
      : __NIL__;

    if (!!attach) {
      if ( _hasBadBoolOpt(attach, 'define') ) {
        throw _setAttachTypeErr(new _TYPE_ERR, 'define', attach['define']);
      }
      if ( _hasBadBoolOpt(attach, 'exports') ) {
        throw _setAttachTypeErr(new _TYPE_ERR, 'exports', attach['exports']);
      }
      if ( _hasBadBoolOpt(attach, 'force') ) {
        throw _setAttachTypeErr(new _TYPE_ERR, 'force', attach['force']);
      }
      if ( _hasBadBoolOpt(attach, 'global') ) {
        throw _setAttachTypeErr(new _TYPE_ERR, 'global', attach['global']);
      }
      if ( _hasBadBoolOpt(attach, 'module') ) {
        throw _setAttachTypeErr(new _TYPE_ERR, 'module', attach['module']);
      }
      if ( _hasBadBoolOpt(attach, 'root') ) {
        throw _setAttachTypeErr(new _TYPE_ERR, 'root', attach['root']);
      }
      if ( _hasBadBoolOpt(attach, 'self') ) {
        throw _setAttachTypeErr(new _TYPE_ERR, 'self', attach['self']);
      }
      if ( _hasBadBoolOpt(attach, 'window') ) {
        throw _setAttachTypeErr(new _TYPE_ERR, 'window', attach['window']);
      }
      if ( _hasBadBoolOpt(attach, 'testVersion') ) {
        throw _setAttachTypeErr(new _TYPE_ERR, 'testVersion',
          attach['testVersion']);
      }
    }

    /// #}}} @step verify-parameters

    /// #{{{ @step set-environment-constants

    /// #{{{ @const ENV_HAS_DFLT
    /**
     * @const {!Object<string, boolean>}
     * @struct
     */
    var ENV_HAS_DFLT = _create(__NIL__);
    /// #}}} @const ENV_HAS_DFLT

    /// #{{{ @const ENV_HAS_DFLT.EXPORTS
    /**
     * @const {boolean}
     */
    var ENV_HAS_DFLT.EXPORTS = _isObjFunType(typeof exports)
      && !!exports
      && !_hasNodeType(exports);
    /// #}}} @const ENV_HAS_DFLT.EXPORTS

    /// #{{{ @const ENV_HAS_DFLT.MODULE
    /**
     * @const {boolean}
     */
    var ENV_HAS_DFLT.MODULE = _isObjFunType(typeof module)
      && !!module
      && !_hasNodeType(module);
    /// #}}} @const ENV_HAS_DFLT.MODULE

    /// #{{{ @const ENV_HAS_DFLT.GLOBAL
    /**
     * @const {boolean}
     */
    var ENV_HAS_DFLT.GLOBAL = ENV_HAS_DFLT.EXPORTS
      && ENV_HAS_DFLT.MODULE
      && _isObjType(typeof global)
      && _hasRootObj(global);
    /// #}}} @const ENV_HAS_DFLT.GLOBAL

    /// #{{{ @const ENV_HAS_DFLT.WINDOW
    /**
     * @const {boolean}
     */
    var ENV_HAS_DFLT.WINDOW = _isObjFunType(typeof window)
      && _hasRootObj(window);
    /// #}}} @const ENV_HAS_DFLT.WINDOW

    /// #{{{ @const ENV_HAS_DFLT.DEFINE
    /**
     * @const {boolean}
     */
    var ENV_HAS_DFLT.DEFINE = _isFunType(typeof define)
      && 'amd' in define
      && _isObj(define['amd']);
    /// #}}} @const ENV_HAS_DFLT.DEFINE

    /// #{{{ @const ENV_HAS_DFLT.SELF
    /**
     * @const {boolean}
     */
    var ENV_HAS_DFLT.SELF = _isObjFunType(typeof self) && _hasRootObj(self);
    /// #}}} @const ENV_HAS_DFLT.SELF

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
        })( (new _FUN('return this;'))() );
    /// #}}} @const _THIS

    /// #{{{ @const ENV_HAS_DFLT.THIS
    /**
     * @const {boolean}
     */
    var ENV_HAS_DFLT.THIS = _isObjFun(_THIS) && _hasRootObj(_THIS);
    /// #}}} @const ENV_HAS_DFLT.THIS

    /// #{{{ @const ENV_DFLT
    /**
     * @const {!Object<string, (?Object|?Function)>}
     * @struct
     */
    var ENV_DFLT = _create(__NIL__);
    /// #}}} @const ENV_DFLT

    /// #{{{ @const ENV_DFLT.DEFINE
    /**
     * @const {?Function}
     */
    ENV_DFLT.DEFINE = ENV_HAS_DFLT.DEFINE
      ? define
      : __NIL__;
    /// #}}} @const ENV_DFLT.DEFINE

    /// #{{{ @const ENV_DFLT.EXPORTS
    /**
     * @const {(?Object|?Function)}
     */
    ENV_DFLT.EXPORTS = ENV_HAS_DFLT.EXPORTS
      ? exports
      : __NIL__;
    /// #}}} @const ENV_DFLT.EXPORTS

    /// #{{{ @const ENV_DFLT.GLOBAL
    /**
     * @const {(?Object|?Function)}
     */
    ENV_DFLT.GLOBAL = ENV_HAS_DFLT.GLOBAL
      ? global
      : __NIL__;
    /// #}}} @const ENV_DFLT.GLOBAL

    /// #{{{ @const ENV_DFLT.MODULE
    /**
     * @const {(?Object|?Function)}
     */
    ENV_DFLT.MODULE = ENV_HAS_DFLT.MODULE
      ? module
      : __NIL__;
    /// #}}} @const ENV_DFLT.MODULE

    /// #{{{ @const ENV_DFLT.SELF
    /**
     * @const {(?Object|?Function)}
     */
    ENV_DFLT.SELF = ENV_HAS_DFLT.SELF
      ? self
      : __NIL__;
    /// #}}} @const ENV_DFLT.SELF

    /// #{{{ @const ENV_DFLT.THIS
    /**
     * @const {(?Object|?Function)}
     */
    ENV_DFLT.THIS = _THIS;
    /// #}}} @const ENV_DFLT.THIS

    /// #{{{ @const ENV_DFLT.WINDOW
    /**
     * @const {(?Object|?Function)}
     */
    ENV_DFLT.WINDOW = ENV_HAS_DFLT.WINDOW
      ? window
      : __NIL__;
    /// #}}} @const ENV_DFLT.WINDOW

    /// #{{{ @const ENV_DFLT.ROOT
    /**
     * @const {(?Object|?Function)}
     */
    ENV_DFLT.ROOT = ENV_HAS_DFLT.GLOBAL
      ? ENV_DFLT.GLOBAL
      : ( ENV_HAS_DFLT.WINDOW
          && ( !ENV_HAS_DFLT.THIS
            || !('window' in _THIS)
            || ENV_DFLT.WINDOW !== _THIS['window'] ))
        ? ENV_DFLT.WINDOW
        : ENV_HAS_DFLT.SELF
          ? ENV_DFLT.SELF
          : ENV_HAS_DFLT.THIS
            ? _THIS
            : __NIL__;
    /// #}}} @const ENV_DFLT.ROOT

    /// #{{{ @const ENV_IS_DFLT
    /**
     * @const {!Object<string, boolean>}
     * @struct
     */
    var ENV_IS_DFLT = _create(__NIL__);
    /// #}}} @const ENV_IS_DFLT

    /// #{{{ @const ENV_IS_DFLT.DEFINE
    /**
     * @const {boolean}
     */
    ENV_IS_DFLT.DEFINE = !_hasOpt(env, 'define');
    /// #}}} @const ENV_IS_DFLT.DEFINE

    /// #{{{ @const ENV_IS_DFLT.EXPORTS
    /**
     * @const {boolean}
     */
    ENV_IS_DFLT.EXPORTS = !_hasOpt(env, 'exports');
    /// #}}} @const ENV_IS_DFLT.EXPORTS

    /// #{{{ @const ENV_IS_DFLT.GLOBAL
    /**
     * @const {boolean}
     */
    ENV_IS_DFLT.GLOBAL = !_hasOpt(env, 'global');
    /// #}}} @const ENV_IS_DFLT.GLOBAL

    /// #{{{ @const ENV_IS_DFLT.MODULE
    /**
     * @const {boolean}
     */
    ENV_IS_DFLT.MODULE = !_hasOpt(env, 'module');
    /// #}}} @const ENV_IS_DFLT.MODULE

    /// #{{{ @const ENV_IS_DFLT.ROOT
    /**
     * @const {boolean}
     */
    ENV_IS_DFLT.ROOT = _hasOpt(env, 'root')
      ? !_hasObjFunOpt(env, 'root')
      : !_hasObjFunOpt(opts, 'root');
    /// #}}} @const ENV_IS_DFLT.ROOT

    /// #{{{ @const ENV_IS_DFLT.SELF
    /**
     * @const {boolean}
     */
    ENV_IS_DFLT.SELF = !_hasOpt(env, 'self');
    /// #}}} @const ENV_IS_DFLT.SELF

    /// #{{{ @const ENV_IS_DFLT.WINDOW
    /**
     * @const {boolean}
     */
    ENV_IS_DFLT.WINDOW = !_hasOpt(env, 'window');
    /// #}}} @const ENV_IS_DFLT.WINDOW

    /// #{{{ @const ENV_HAS
    /**
     * @const {!Object<string, boolean>}
     * @struct
     */
    var ENV_HAS = _create(__NIL__);
    /// #}}} @const ENV_HAS

    /// #{{{ @const ENV_HAS.DEFINE
    /**
     * @const {boolean}
     */
    ENV_HAS.DEFINE = ENV_IS_DFLT.DEFINE
      ? ENV_HAS_DFLT.DEFINE
      : !!env['define'];
    /// #}}} @const ENV_HAS.DEFINE

    /// #{{{ @const ENV_HAS.OBJECT_CREATE
    /**
     * @const {boolean}
     */
    ENV_HAS.OBJECT_CREATE = _HAS_CREATE;
    /// #}}} @const ENV_HAS.OBJECT_CREATE

    /// #{{{ @const ENV_HAS.OBJECT_DEFINE_PROPERTIES
    /**
     * @const {boolean}
     */
    ENV_HAS.OBJECT_DEFINE_PROPERTIES = _HAS_DEFINE_PROPS;
    /// #}}} @const ENV_HAS.OBJECT_DEFINE_PROPERTIES

    /// #{{{ @const ENV_HAS.OBJECT_DEFINE_PROPERTY
    /**
     * @const {boolean}
     */
    ENV_HAS.OBJECT_DEFINE_PROPERTY = _HAS_DEFINE_PROP;
    /// #}}} @const ENV_HAS.OBJECT_DEFINE_PROPERTY

    /// #{{{ @const ENV_HAS.EXPORTS
    /**
     * @const {boolean}
     */
    ENV_HAS.EXPORTS = ENV_IS_DFLT.EXPORTS
      ? ENV_HAS_DFLT.EXPORTS
      : !!env['exports'] && !_hasNodeType(env['exports']);
    /// #}}} @const ENV_HAS.EXPORTS

    /// #{{{ @const ENV_HAS.FUNCTION_DEFINE_PROPERTIES
    /**
     * @const {boolean}
     */
    ENV_HAS.FUNCTION_DEFINE_PROPERTIES = _HAS_FUN_DEFINE_PROPS;
    /// #}}} @const ENV_HAS.FUNCTION_DEFINE_PROPERTIES

    /// #{{{ @const ENV_HAS.FUNCTION_DEFINE_PROPERTY
    /**
     * @const {boolean}
     */
    ENV_HAS.FUNCTION_DEFINE_PROPERTY = _HAS_FUN_DEFINE_PROP;
    /// #}}} @const ENV_HAS.FUNCTION_DEFINE_PROPERTY

    /// #{{{ @const ENV_HAS.GLOBAL
    /**
     * @const {boolean}
     */
    ENV_HAS.GLOBAL = ENV_IS_DFLT.GLOBAL
      ? ENV_HAS_DFLT.GLOBAL
      : !!env['global'] && _hasRootObj(env['global']);
    /// #}}} @const ENV_HAS.GLOBAL

    /// #{{{ @const ENV_HAS.MODULE
    /**
     * @const {boolean}
     */
    ENV_HAS.MODULE = ENV_IS_DFLT.MODULE
      ? ENV_HAS_DFLT.MODULE
      : !!env['module'] && !_hasNodeType(env['module']);
    /// #}}} @const ENV_HAS.MODULE

    /// #{{{ @const ENV_HAS.SELF
    /**
     * @const {boolean}
     */
    ENV_HAS.SELF = ENV_IS_DFLT.SELF
      ? ENV_HAS_DFLT.SELF
      : !!env['self'] && _hasRootObj(env['self']);
    /// #}}} @const ENV_HAS.SELF

    /// #{{{ @const ENV_HAS.THIS
    /**
     * @const {boolean}
     */
    ENV_HAS.THIS = ENV_HAS_DFLT.THIS;
    /// #}}} @const ENV_HAS.THIS

    /// #{{{ @const ENV_HAS.WINDOW
    /**
     * @const {boolean}
     */
    ENV_HAS.WINDOW = ENV_IS_DFLT.WINDOW
      ? ENV_HAS_DFLT.WINDOW
      : !!env['window'] && _hasRootObj(env['window']);
    /// #}}} @const ENV_HAS.WINDOW

    /// #{{{ @const ENV
    /**
     * @const {!Object<string, (?Object|?Function)>}
     * @struct
     */
    var ENV = _create(__NIL__);
    /// #}}} @const ENV

    /// #{{{ @const ENV.HAS
    /**
     * @const {!Object<string, boolean>}
     */
    ENV.HAS = ENV_HAS;
    /// #}}} @const ENV.HAS

    /// #{{{ @const ENV.DFLT
    /**
     * @const {!Object<string, (?Object|?Function)>}
     */
    ENV.DFLT = ENV_DFLT;
    /// #}}} @const ENV.DFLT

    /// #{{{ @const ENV.IS_DFLT
    /**
     * @const {!Object<string, boolean>}
     */
    ENV.IS_DFLT = ENV_IS_DFLT;
    /// #}}} @const ENV.IS_DFLT

    /// #{{{ @const ENV.HAS_DFLT
    /**
     * @const {!Object<string, boolean>}
     */
    ENV.HAS_DFLT = ENV_HAS_DFLT;
    /// #}}} @const ENV.HAS_DFLT

    /// #{{{ @const ENV.DEFINE
    /**
     * @const {?Function}
     */
    ENV.DEFINE = ENV_IS_DFLT.DEFINE
      ? ENV_DFLT.DEFINE
      : env['define'];
    /// #}}} @const ENV.DEFINE

    /// #{{{ @const ENV.EXPORTS
    /**
     * @const {(?Object|?Function)}
     */
    ENV.EXPORTS = ENV_IS_DFLT.EXPORTS
      ? ENV_DFLT.EXPORTS
      : env['exports'];
    /// #}}} @const ENV.EXPORTS

    /// #{{{ @const ENV.GLOBAL
    /**
     * @const {(?Object|?Function)}
     */
    ENV.GLOBAL = ENV_IS_DFLT.GLOBAL
      ? ENV_DFLT.GLOBAL
      : env['global'];
    /// #}}} @const ENV.GLOBAL

    /// #{{{ @const ENV.MODULE
    /**
     * @const {(?Object|?Function)}
     */
    ENV.MODULE = ENV_IS_DFLT.MODULE
      ? ENV_DFLT.MODULE
      : env['module'];
    /// #}}} @const ENV.MODULE

    /// #{{{ @const ENV.SELF
    /**
     * @const {(?Object|?Function)}
     */
    ENV.SELF = ENV_IS_DFLT.SELF
      ? ENV_DFLT.SELF
      : env['self'];
    /// #}}} @const ENV.SELF

    /// #{{{ @const ENV.THIS
    /**
     * @const {(?Object|?Function)}
     */
    ENV.THIS = _THIS;
    /// #}}} @const ENV.THIS

    /// #{{{ @const ENV.WINDOW
    /**
     * @const {(?Object|?Function)}
     */
    ENV.WINDOW = ENV_IS_DFLT.WINDOW
      ? ENV_DFLT.WINDOW
      : env['window'];
    /// #}}} @const ENV.WINDOW

    /// #{{{ @const ENV.ROOT
    /**
     * @const {(?Object|?Function)}
     */
    ENV.ROOT = ENV_IS_DFLT.ROOT
      ? ENV_HAS.GLOBAL
        ? ENV.GLOBAL
        : ( ENV_HAS.WINDOW
            && ( !ENV_HAS.THIS
              || !('window' in _THIS)
              || ENV.WINDOW !== _THIS['window'] ))
          ? ENV.WINDOW
          : ENV_HAS.SELF
            ? ENV.SELF
            : ENV_HAS.THIS
              ? _THIS
              : __NIL__
      : _hasObjFunOpt(env, 'root')
        ? env['root']
        : opts['root'];
    /// #}}} @const ENV.ROOT

    /// #}}} @step set-environment-constants

    /// #{{{ @step verify-environment-root

    if ( !_hasRootObj(ENV.ROOT) ) {
      throw _setErr(new _ERR, 'unable to find valid JS env root', ENV.ROOT);
    }

    /// #}}} @step verify-environment-root

    /// #{{{ @step create-config-constants

    /// #{{{ @const CONFIG
    /**
     * @const {!Object}
     */
    var CONFIG = _create(__NIL__);
    /// #}}} @const CONFIG

    /// #}}} @step create-config-constants

    /// #{{{ @step create-new-vitals-instance

    newVitalsInstance = makeNewVitals();
    makeVitals(newVitalsInstance, ENV.ROOT, ENV, CONFIG);

    /// #}}} @step create-new-vitals-instance

    /// #{{{ @step run-new-vitals-events

    _runAttachEvent({
      'define': ENV.DEFINE,
      'exports': ENV.EXPORTS,
      'global': ENV.GLOBAL,
      'module': ENV.MODULE,
      'root': ENV.ROOT,
      'self': ENV.SELF,
      'window': ENV.WINDOW
    }, attach, newVitalsInstance);

    if ( _hasTrueOpt(events, 'define') && !!ENV.DEFINE ) {
      ENV.DEFINE(function() {
        return newVitalsInstance;
      });
    }

    if ( _hasTrueOpt(events, 'export') && !!ENV.MODULE ) {
      ENV.MODULE['exports'] = newVitalsInstance;
    }

    /// #}}} @step run-new-vitals-events

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
