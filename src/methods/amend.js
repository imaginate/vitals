/**
 * ---------------------------------------------------------------------------
 * VITALS AMEND
 * ---------------------------------------------------------------------------
 * @section strict
 * @version 4.1.3
 * @see [vitals.amend](https://github.com/imaginate/vitals/wiki/vitals.amend)
 *
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2017 Adam A Smith <adam@imaginate.life> (https://imaginate.life)
 */

'use strict';

var $newErrorMaker = require('./helpers/new-error-maker.js');
var $splitKeys = require('./helpers/split-keys.js');
var $cloneObj = require('./helpers/clone-obj.js');
var $merge = require('./helpers/merge.js');
var $own = require('./helpers/own.js');
var $is = require('./helpers/is.js');
var is = require('./is.js');

///////////////////////////////////////////////////////////////////////// {{{1
// VITALS AMEND
//////////////////////////////////////////////////////////////////////////////

var amend = (function amendPrivateScope() {

  //////////////////////////////////////////////////////////
  // PUBLIC METHODS
  // - amend
  // - amend.config
  // - amend.property          (amend.prop)
  // - amend.property.config   (amend.prop.config)
  // - amend.properties        (amend.props)
  // - amend.properties.config (amend.props.config)
  //////////////////////////////////////////////////////////

  /* {{{2 Amend References
   * @ref [descriptor]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty#Description)
   * @ref [define-prop]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)
   * @ref [define-props]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperties)
   */

  /// {{{2
  /// @method amend
  /**
   * A shortcut for [Object.defineProperties][define-props] that includes
   * easier property value assignment, strong type declarations, and flexible
   * default [descriptor][descriptor] options.
   *
   * @public
   * @param {!Object} obj
   * @param {(!Object<string, *>|!Array<string>|string)} props
   *   The details are as follows (per #props type):
   *   - *`!Object<string, *>`*!$
   *     For each `key => value` pair use the property's name for the `key`,
   *     and the property's [descriptor][descriptor] or new value for its
   *     `value`.
   *   - *`!Array<string>`*!$
   *     For each element of the `array` define a property name.
   *   - *`string`*!$
   *     Should be a list of property names. It gets converted to an `array`
   *     of property names using one of the following values as the separator
   *     (values listed in order of rank):
   *     - `", "`
   *     - `","`
   *     - `"|"`
   *     - `" "`
   * @param {*=} val
   *   Only define #val (and then required) if an `array` or `string` of
   *   property names is given for #props. #val sets the value of each
   *   property in #props regardless of #descriptor settings.
   * @param {!Object=} descriptor = `{ writable: true, enumerable: true, configurable: true }`
   *   The new [descriptor][descriptor] for each property in #props unless a
   *   [descriptor][descriptor] is used for a #props `value`.
   * @param {string=} strongType
   *   If defined all new properties are assigned an [accessor descriptor][descriptor]
   *   (unless overridden in a #props `value`) that includes a `set` function
   *   (unless overridden in a #props `value`) that throws an error if
   *   @is#main returns `false` for a new property `value`. See the below
   *   snippet for an example #strongType `set` function.
   *   ```
   *   descriptor.set = function set(newVal) {
   *     if ( !vitals.is(strongType, newVal) )
   *       throw new TypeError("...");
   *     value = newVal;
   *   };
   *   ```
   * @param {!function(*, *): *=} setter
   *   If defined all new properties are assigned an [accessor descriptor][descriptor]
   *   (unless overridden in a #props `value`) that includes a `set` function 
   *   (unless overridden in a #props `value`) that sets the property to the
   *   value returned by #setter. The #setter function will receive two
   *   params, the new value and the current value. If #strongType is defined
   *   #setter will not get called until the new value passes the @is#main
   *   test.
   *   ```
   *   descriptor.set = function set(newVal) {
   *     if ( !vitals.is(strongType, newVal) )
   *       throw new TypeError("...");
   *     value = setter(newVal, value);
   *   };
   *   ```
   * @return {!Object}
   */
  function amend(obj, props, val, descriptor, strongType, setter) {

    /** @type {boolean} */
    var isArr;
    /** @type {!Array} */
    var args;
    /** @type {number} */
    var len;

    if ( !$is.obj(obj) )
      throw $typeErr('obj');

    if ( $is.str(props) )
      props = $splitKeys(props);

    if ( !$is.obj(props) )
      throw $typeErr('props');

    isArr = $is.arr(props);
    len = arguments.length;

    if (isArr && len < 3)
      throw $err('No val defined');

    if (!isArr && len > 2) {
      setter = strongType;
      strongType = descriptor;
      descriptor = val;
      val = NONE;
      ++len; // increase len for a valid _parseProps call
    }

    if (len === 4 || len === 5) {
      args = _parseProps(len, descriptor, strongType, setter);
      descriptor = args[0];
      strongType = args[1];
      setter = args[2];
    }

    if ( !is('!obj=', descriptor) )
      throw $typeErr('descriptor');
    if ( !is('str=', strongType) )
      throw $typeErr('strongType');
    if ( !is('func=', setter) )
      throw $typeErr('setter');

    if (strongType) {
      if ( isArr && !is(strongType + '=', val) )
        throw $err('The val param is not a valid strongType');
      if ( !isArr && !_strongTypeCheckProps(strongType, props) )
        throw $err('A props value was not a valid strongType');
    }

    return _amendProps(obj, props, val, descriptor, strongType, setter);
  }

  /// {{{2
  /// @method amend.config
  /**
   * A shortcut for [Object.defineProperties][define-props] that only updates
   * the descriptors of existing properties.
   *
   * @public
   * @param {!Object} obj
   * @param {(!Object<string, !Object>|!Array<string>|string)} props
   *   The details are as follows (per #props type):
   *   - *`!Object<string, !Object>`*!$
   *     For each `key => value` pair use the property's name for the `key`,
   *     and the property's [descriptor][descriptor] for its `value`.
   *   - *`!Array<string>`*!$
   *     For each element of the `array` define a property name.
   *   - *`string`*!$
   *     Should be a list of property names. It gets converted to an `array`
   *     of property names using one of the following values as the separator
   *     (values listed in order of rank):
   *     - `", "`
   *     - `","`
   *     - `"|"`
   *     - `" "`
   * @param {!Object=} descriptor
   *   Only define #descriptor (and then required) if an `array` or `string`
   *   of property names is given for #props.
   * @return {!Object}
   */
  amend.config = function amendConfig(obj, props, descriptor) {

    if ( !$is.obj(obj) )
      throw $typeErr('obj', 'config');

    if ( $is.str(props) )
      props = $splitKeys(props);

    if ( !$is.obj(props) )
      throw $typeErr('props', 'config');

    if ( $is.arr(props) ) {
      if ( !$is.obj(descriptor) )
        throw $typeErr('descriptor', 'config');
      props = _setupConfigs(props, descriptor);
    }
    else if ( !is('objMap', props) )
      throw $typeErr('props', 'config');

    if ( !_hasKeys(obj, props) )
      throw $err('A given prop was not defined in the obj', 'config');

    return _amendConfigs(obj, props);
  };

  /// {{{2
  /// @method amend.property
  /// @alias amend.prop
  /**
   * A shortcut for [Object.defineProperty][define-prop].
   *
   * @public
   * @param {!Object} obj
   * @param {string} key
   * @param {*=} val
   *   #val is required if #descriptor is not defined.
   * @param {!Object=} descriptor = `{ writable: true, enumerable: true, configurable: true }`
   * @param {string=} strongType
   *   If defined the new property is assigned an [accessor descriptor][descriptor]
   *   that includes a `set` function that throws an error if @is#main returns
   *   `false` for a new property `value`. See the below snippet for an
   *   example #strongType `set` function.
   *   ```
   *   descriptor.set = function set(newVal) {
   *     if ( !vitals.is(strongType, newVal) )
   *       throw new TypeError("...");
   *     value = newVal;
   *   };
   *   ```
   * @param {!function(*, *): *=} setter
   *   If defined the new property is assigned an [accessor descriptor][descriptor]
   *   that includes a `set` function that sets the property to the value
   *   returned by #setter. The #setter function will receive two params, the
   *   new value and the current value. If #strongType is defined #setter will
   *   not get called until the new value passes the @is#main test.
   *   ```
   *   descriptor.set = function set(newVal) {
   *     if ( !vitals.is(strongType, newVal) )
   *       throw new TypeError("...");
   *     value = setter(newVal, value);
   *   };
   *   ```
   * @return {!Object}
   */
  amend.property = function amendProperty(obj, key, val, descriptor, strongType, setter) {

    /** @type {!Array} */
    var args;
    /** @type {number} */
    var len;

    if ( !$is.obj(obj) )
      throw $typeErr('obj', 'property');
    if ( !$is.str(key) )
      throw $typeErr('key', 'property');

    len = arguments.length;

    if (len < 3)
      throw $err('No val or descriptor defined', 'property');

    if (len > 2 && len < 6) {
      args = _parseProp(len, val, descriptor, strongType, setter);
      val = args[0];
      descriptor = args[1];
      strongType = args[2];
      setter = args[3];
    }

    if ( !is('!obj=', descriptor) )
      throw $typeErr('descriptor', 'property');
    if ( !is('str=', strongType) )
      throw $typeErr('strongType', 'property');
    if ( !is('func=', setter) )
      throw $typeErr('setter', 'property');

    if ( strongType && !is(strongType + '=', val) )
      throw $err('The val param is not a valid strongType', 'property');
    if ( descriptor && (strongType || setter) && $own(descriptor, 'writable') )
      throw $err('A data descriptor may not be used with a strongType/setter', 'property');

    return _amendProp(obj, key, val, descriptor, strongType, setter);
  };
  // define shorthand
  amend.prop = amend.property;

  /// {{{2
  /// @method amend.property.config
  /// @alias amend.prop.config
  /**
   * A shortcut for [Object.defineProperty][define-prop] that only updates the
   * [descriptor][descriptor] of an existing property.
   *
   * @public
   * @param {!Object} obj
   * @param {string} key
   * @param {!Object} descriptor
   * @return {!Object}
   */
  amend.property.config = function amendPropertyConfig(obj, key, descriptor) {

    if ( !$is.obj(obj) )
      throw $typeErr('obj', 'property.config');
    if ( !$is.str(key) )
      throw $typeErr('key', 'property.config');
    if ( !$is.obj(descriptor) )
      throw $typeErr('descriptor', 'property.config');

    if ( !$own(obj, key) )
      throw $err('The key was not defined in the obj', 'property.config');

    return _amendConfig(obj, key, descriptor);
  };
  // define shorthand
  amend.prop.config = amend.property.config;

  /// {{{2
  /// @method amend.properties
  /// @alias amend.props
  /**
   * A shortcut for [Object.defineProperties][define-props] that includes
   * easier property value assignment, strong type declarations, and flexible
   * default [descriptor][descriptor] options.
   *
   * @public
   * @param {!Object} obj
   * @param {(!Object<string, *>|!Array<string>|string)} props
   *   The details are as follows (per #props type):
   *   - *`!Object<string, *>`*!$
   *     For each `key => value` pair use the property's name for the `key`,
   *     and the property's [descriptor][descriptor] or new value for its
   *     `value`.
   *   - *`!Array<string>`*!$
   *     For each element of the `array` define a property name.
   *   - *`string`*!$
   *     Should be a list of property names. It gets converted to an `array`
   *     of property names using one of the following values as the separator
   *     (values listed in order of rank):
   *     - `", "`
   *     - `","`
   *     - `"|"`
   *     - `" "`
   * @param {*=} val
   *   Only define #val (and then required) if an `array` or `string` of
   *   property names is given for #props. #val sets the value of each
   *   property in #props regardless of #descriptor settings.
   * @param {!Object=} descriptor = `{ writable: true, enumerable: true, configurable: true }`
   *   The new [descriptor][descriptor] for each property in #props unless a
   *   [descriptor][descriptor] is used for a #props `value`.
   * @param {string=} strongType
   *   If defined all new properties are assigned an [accessor descriptor][descriptor]
   *   (unless overridden in a #props `value`) that includes a `set` function
   *   (unless overridden in a #props `value`) that throws an error if
   *   @is#main returns `false` for a new property `value`. See the below
   *   snippet for an example #strongType `set` function.
   *   ```
   *   descriptor.set = function set(newVal) {
   *     if ( !vitals.is(strongType, newVal) )
   *       throw new TypeError("...");
   *     value = newVal;
   *   };
   *   ```
   * @param {!function(*, *): *=} setter
   *   If defined all new properties are assigned an [accessor descriptor][descriptor]
   *   (unless overridden in a #props `value`) that includes a `set` function 
   *   (unless overridden in a #props `value`) that sets the property to the
   *   value returned by #setter. The #setter function will receive two
   *   params, the new value and the current value. If #strongType is defined
   *   #setter will not get called until the new value passes the @is#main
   *   test.
   *   ```
   *   descriptor.set = function set(newVal) {
   *     if ( !vitals.is(strongType, newVal) )
   *       throw new TypeError("...");
   *     value = setter(newVal, value);
   *   };
   *   ```
   * @return {!Object}
   */
  amend.properties = function amendProperties(obj, props, val, descriptor, strongType, setter) {

    /** @type {boolean} */
    var isArr;
    /** @type {!Array} */
    var args;
    /** @type {number} */
    var len;

    if ( !$is.obj(obj) )
      throw $typeErr('obj', 'properties');

    if ( $is.str(props) )
      props = $splitKeys(props);

    if ( !$is.obj(props) )
      throw $typeErr('props', 'properties');

    isArr = $is.arr(props);
    len = arguments.length;

    if (isArr && len < 3)
      throw $err('No val defined', 'properties');

    if (!isArr && len > 2) {
      setter = strongType;
      strongType = descriptor;
      descriptor = val;
      val = NONE;
      ++len; // increase len for a valid _parseProps call
    }

    if (len === 4 || len === 5) {
      args = _parseProps(len, descriptor, strongType, setter);
      descriptor = args[0];
      strongType = args[1];
      setter = args[2];
    }

    if ( !is('!obj=', descriptor) )
      throw $typeErr('descriptor', 'properties');
    if ( !is('str=', strongType) )
      throw $typeErr('strongType', 'properties');
    if ( !is('func=', setter) )
      throw $typeErr('setter', 'properties');

    if (strongType) {
      if ( isArr && !is(strongType + '=', val) )
        throw $err('The val param is not a valid strongType', 'properties');
      if ( !isArr && !_strongTypeCheckProps(strongType, props) )
        throw $err('A props value was not a valid strongType', 'properties');
    }

    return _amendProps(obj, props, val, descriptor, strongType, setter);
  };
  // define shorthand
  amend.props = amend.properties;

  /// {{{2
  /// @method amend.properties.config
  /// @alias amend.props.config
  /**
   * A shortcut for [Object.defineProperties][define-props] that only updates
   * the [descriptors][descriptor] of existing properties.
   *
   * @public
   * @param {!Object} obj
   * @param {(!Object<string, !Object>|!Array<string>|string)} props
   *   The details are as follows (per #props type):
   *   - *`!Object<string, !Object>`*!$
   *     For each `key => value` pair use the property's name for the `key`,
   *     and the property's [descriptor][descriptor] for its `value`.
   *   - *`!Array<string>`*!$
   *     For each element of the `array` define a property name.
   *   - *`string`*!$
   *     Should be a list of property names. It gets converted to an `array`
   *     of property names using one of the following values as the separator
   *     (values listed in order of rank):
   *     - `", "`
   *     - `","`
   *     - `"|"`
   *     - `" "`
   * @param {!Object=} descriptor
   *   Only define #descriptor (and then required) if an `array` or `string`
   *   of property names is given for #props.
   * @return {!Object}
   */
  amend.properties.config = function amendPropertiesConfig(obj, props, descriptor) {

    if ( !$is.obj(obj) )
      throw $typeErr('obj', 'properties.config');

    if ( $is.str(props) )
      props = $splitKeys(props);

    if ( !$is.obj(props) )
      throw $typeErr('props', 'properties.config');

    if ( $is.arr(props) ) {
      if ( !$is.obj(descriptor) )
        throw $typeErr('descriptor', 'properties.config');
      props = _setupConfigs(props, descriptor);
    }
    else if ( !is('objMap', props) )
      throw $typeErr('props', 'properties.config');

    if ( !_hasKeys(obj, props) )
      throw $err('A given prop was not defined in the obj', 'properties.config');

    return _amendConfigs(obj, props);
  };
  // define shorthand
  amend.props.config = amend.properties.config;

  ///////////////////////////////////////////////////// {{{2
  // AMEND HELPERS - PARAMETER PARSERS
  //////////////////////////////////////////////////////////

  /// {{{3
  /// @func _parseProp
  /**
   * @private
   * @param {number} len
   * @param {*=} val
   * @param {!Object=} descriptor
   * @param {string=} strongType
   * @param {!function(*, *): *=} setter
   * @return {!Array}
   */
  function _parseProp(len, val, descriptor, strongType, setter) {

    switch (len) {

      case 4:
        if ( $is.str(descriptor) ) {
          strongType = descriptor;
          descriptor = NONE;
        }
        else if ( $is.fun(descriptor) ) {
          setter = descriptor;
          descriptor = NONE;
        }
        break;

      case 5:
        if ( $is.fun(strongType) ) {
          setter = strongType;
          strongType = NONE;
          if ( $is.str(descriptor) ) {
            strongType = descriptor;
            descriptor = NONE;
          }
        }
        break;
    }

    if ( $is.obj(val) && _isDescriptor(val) ) {
      descriptor = val;
      val = descriptor.value;
    }

    return [ val, descriptor, strongType, setter ];
  }

  /// {{{3
  /// @func _parseProps
  /**
   * @private
   * @param {number} len
   * @param {!Object=} descriptor
   * @param {string=} strongType
   * @param {!function(*, *): *=} setter
   * @return {!Array}
   */
  function _parseProps(len, descriptor, strongType, setter) {

    switch (len) {

      case 4:
        if ( $is.str(descriptor) ) {
          strongType = descriptor;
          descriptor = NONE;
        }
        else if ( $is.fun(descriptor) ) {
          setter = descriptor;
          descriptor = NONE;
        }
        break;

      case 5:
        if ( $is.fun(strongType) ) {
          setter = strongType;
          strongType = NONE;
          if ( $is.str(descriptor) ) {
            strongType = descriptor;
            descriptor = NONE;
          }
        }
        break;
    }

    return [ descriptor, strongType, setter ];
  }

  /// {{{3
  /// @func _strongTypeCheckProps
  /**
   * @private
   * @param {string} strongType
   * @param {!Object} props
   * @return {boolean}
   */
  function _strongTypeCheckProps(strongType, props) {

    /** @type {string} */
    var key;
    /** @type {*} */
    var val;

    strongType += '=';
    for (key in props) {
      if ( $own(props, key) ) {
        val = props[key];
        if ( $is.obj(val) && _isDescriptor(val) ) {
          if ( $own(val, 'writable') )
            continue;
          val = val.value;
        }
        if ( !is(strongType, val) )
          return false;
      }
    }
    return true;
  }

  ///////////////////////////////////////////////////// {{{2
  // AMEND HELPERS - MAIN
  //////////////////////////////////////////////////////////

  /// {{{3
  /// @func _amendProp
  /**
   * @private
   * @param {!Object} obj
   * @param {string} key
   * @param {*=} val
   * @param {!Object=} descriptor
   * @param {string=} strongType
   * @param {!function=} setter
   * @return {!Object}
   */
  function _amendProp(obj, key, val, descriptor, strongType, setter) {

    descriptor = descriptor || null;
    descriptor = _getDescriptor(descriptor, !!strongType || !!setter);
    strongType = _getStrongType(strongType);

    descriptor = strongType || setter
      ? _setupDescriptorByKeyWithSetter(val, descriptor, strongType, setter)
      : _isAccessor(descriptor)
        ? $cloneObj(descriptor)
        : _setupDescriptorByKey(val, descriptor);

    return _ObjectDefineProperty(obj, key, descriptor);
  }

  /// {{{3
  /// @func _amendProps
  /**
   * @private
   * @param {!Object} obj
   * @param {!Object} props
   * @param {*} val
   * @param {!Object=} descriptor
   * @param {string=} strongType
   * @param {!function=} setter
   * @return {!Object}
   */
  function _amendProps(obj, props, val, descriptor, strongType, setter) {

    descriptor = descriptor || null;
    descriptor = _getDescriptor(descriptor, !!strongType || !!setter);
    strongType = _getStrongType(strongType);
    props = $is.arr(props)
      ? strongType || setter
        ? _setupPropsByKeyWithSetter(props, val, descriptor, strongType, setter)
        : _setupPropsByKey(props, val, descriptor)
      : strongType || setter
        ? _setupPropsWithSetter(props, descriptor, strongType, setter)
        : _setupProps(props, descriptor);

    return _ObjectDefineProperties(obj, props);
  }

  /// {{{3
  /// @func _amendConfig
  /**
   * @private
   * @param {!Object} obj
   * @param {string} key
   * @param {!Object} descriptor
   * @return {!Object}
   */
  function _amendConfig(obj, key, descriptor) {
    return _ObjectDefineProperty(obj, key, descriptor);
  }

  /// {{{3
  /// @func _amendConfigs
  /**
   * @private
   * @param {!Object} obj
   * @param {!Object} props
   * @return {!Object}
   */
  function _amendConfigs(obj, props) {
    return _ObjectDefineProperties(obj, props);
  }

  ///////////////////////////////////////////////////// {{{2
  // AMEND HELPERS - PROPERTY SETUP
  //////////////////////////////////////////////////////////

  /// {{{3
  /// @func _setupProps
  /**
   * @private
   * @param {!Object} props
   * @param {!Object} descriptor
   * @return {!Object}
   */
  function _setupProps(props, descriptor) {

    /** @type {!Object} */
    var newProps;
    /** @type {string} */
    var key;

    newProps = {};
    for (key in props) {
      if ( $own(props, key) )
        newProps[key] = _setupDescriptor(props[key], descriptor);
    }
    return newProps;
  }

  /// {{{3
  /// @func _setupPropsWithSetter
  /**
   * @private
   * @param {!Object} props
   * @param {!Object} descriptor
   * @param {!function} strongType
   * @param {!function} setter
   * @return {!Object}
   */
  function _setupPropsWithSetter(props, descriptor, strongType, setter) {

    /** @type {!Object} */
    var newProps;
    /** @type {string} */
    var key;

    newProps = {};
    for (key in props) {
      if ( $own(props, key) )
        newProps[key] = _setupDescriptorWithSetter(props[key], descriptor, strongType, setter);
    }
    return newProps;
  }

  /// {{{3
  /// @func _setupPropsByKey
  /**
   * @private
   * @param {!Array<string>} keys
   * @param {*} val
   * @param {!Object} descriptor
   * @return {!Object}
   */
  function _setupPropsByKey(keys, val, descriptor) {

    /** @type {!function} */
    var setupDesc;
    /** @type {!Object} */
    var props;
    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    setupDesc = _isAccessor(descriptor)
      ? function setupDesc(val, desc) {
          return $cloneObj(desc);
        }
      : _setupDescriptorByKey;
    props = {};

    len = keys.length;
    i = -1;
    while (++i < len)
      props[ keys[i] ] = setupDesc(val, descriptor);
    return props;
  }

  /// {{{3
  /// @func _setupPropsByKeyWithSetter
  /**
   * @private
   * @param {!Array<string>} keys
   * @param {*} val
   * @param {!Object} descriptor
   * @param {!function} strongType
   * @param {!function} setter
   * @return {!Object}
   */
  function _setupPropsByKeyWithSetter(keys, val, descriptor, strongType, setter) {

    /** @type {!Object} */
    var props;
    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    props = {};

    len = keys.length;
    i = -1;
    while (++i < len)
      props[ keys[i] ] = _setupDescriptorByKeyWithSetter(val, descriptor, strongType, setter);
    return props;
  }

  /// {{{3
  /// @func _setupConfigs
  /**
   * @private
   * @param {!Array} keys
   * @param {!Object} desc
   * @return {!Object}
   */
  function _setupConfigs(keys, desc) {

    /** @type {!Object} */
    var props;
    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    props = {};

    len = keys.length;
    i = -1;
    while (++i < len)
      props[ keys[i] ] = desc;
    return props;
  }

  ///////////////////////////////////////////////////// {{{2
  // AMEND HELPERS - DESCRIPTOR SETUP
  //////////////////////////////////////////////////////////

  /// {{{3
  /// @const INVALID_STRONG_TYPE
  /**
   * @private
   * @const {string}
   */
  var INVALID_STRONG_TYPE = 'Invalid type for object property value.';

  /// {{{3
  /// @func _setupDescriptor
  /**
   * @private
   * @param {*} val
   * @param {!Object} descriptor
   * @return {!Object}
   */
  function _setupDescriptor(val, descriptor) {

    /** @type {!Object} */
    var prop;

    prop = $cloneObj(descriptor);
    val = _isDescriptor(val)
      ? val
      : { value: val };
    return $merge(prop, val);
  }

  /// {{{3
  /// @func _setupDescriptorWithSetter
  /**
   * @private
   * @param {*} val
   * @param {!Object} descriptor
   * @param {!function=} strongType
   * @param {!function=} setter
   * @return {!Object}
   */
  function _setupDescriptorWithSetter(val, descriptor, strongType, setter) {

    /** @type {!Object} */
    var prop;

    prop = $cloneObj(descriptor);

    if ( _isDescriptor(val) ) {
      prop = $merge(prop, val);
      if ( $own(prop, 'writable') || _isAccessor(prop) )
        return prop;
      val = prop.value;
      prop = _cloneAccessor(prop);
    }

    prop = _setupGetSet(val, prop, strongType, setter);
    return prop;
  }

  /// {{{3
  /// @func _setupDescriptorByKey
  /**
   * @private
   * @param {*} val
   * @param {!Object} descriptor
   * @return {!Object}
   */
  function _setupDescriptorByKey(val, descriptor) {

    /** @type {!Object} */
    var prop;

    prop = $cloneObj(descriptor);
    prop.value = val;
    return prop;
  }

  /// {{{3
  /// @func _setupDescriptorByKeyWithSetter
  /**
   * @private
   * @param {*} val
   * @param {!Object} descriptor
   * @param {!function=} strongType
   * @param {!function=} setter
   * @return {!Object}
   */
  function _setupDescriptorByKeyWithSetter(val, descriptor, strongType, setter) {

    /** @type {!Object} */
    var prop;

    prop = $cloneObj(descriptor);
    prop = _setupGetSet(val, prop, strongType, setter);
    return prop;
  }

  /// {{{3
  /// @func _setupGetSet
  /**
   * @private
   * @param {*} val
   * @param {!Object} descriptor
   * @param {!function=} strongType
   * @param {!function=} setter
   * @return {!Object}
   */
  function _setupGetSet(val, descriptor, strongType, setter) {

    /** @type {!Error} */
    var error;

    descriptor.get = function get() {
      return val;
    };
    descriptor.set = strongType && setter
      ? function set(newVal) {
          if ( !strongType(newVal) ) {
            error = new TypeError(INVALID_STRONG_TYPE);
            error.__setter = true;
            error.__type = true;
            throw error;
          }
          val = setter(newVal, val);
        }
      : strongType
        ? function set(newVal) {
            if ( !strongType(newVal) ) {
              error = new TypeError(INVALID_STRONG_TYPE);
              error.__setter = true;
              error.__type = true;
              throw error;
            }
            val = newVal;
          }
        : function set(newVal) {
            val = setter(newVal, val);
          };
    return descriptor;
  }

  ///////////////////////////////////////////////////// {{{2
  // AMEND HELPERS - DESCRIPTOR HELPERS
  //////////////////////////////////////////////////////////

  /// {{{3
  /// @const DATA_DESCRIPTOR
  /**
   * @private
   * @const {!Object}
   */
  var DATA_DESCRIPTOR = {
    writable: true,
    enumerable: true,
    configurable: true
  };

  /// {{{3
  /// @const ACCESSOR_DESCRIPTOR
  /**
   * @private
   * @const {!Object}
   */
  var ACCESSOR_DESCRIPTOR = {
    enumerable: true,
    configurable: true
  };

  /// {{{3
  /// @const DESCRIPTOR_PROPS
  /**
   * @private
   * @const {!Object}
   */
  var DESCRIPTOR_PROPS = {
    get: true,
    set: true,
    value: true,
    writable: true,
    enumerable: true,
    configurable: true
  };

  /// {{{3
  /// @func _isDescriptor
  /**
   * @private
   * @param {!Object} obj
   * @return {boolean}
   */
  function _isDescriptor(obj) {

    /** @type {string} */
    var key;

    if ( !$is.obj(obj) )
      return false;

    for (key in obj) {
      if ( $own(obj, key) && !$own(DESCRIPTOR_PROPS, key) )
        return false;
    }
    return true;
  }

  /// {{{3
  /// @func _isData
  /**
   * @private
   * @param {Object} obj
   * @return {boolean}
   */
  function _isData(obj) {
    return $own(obj, 'value') || $own(obj, 'writable');
  }

  /// {{{3
  /// @func _isAccessor
  /**
   * @private
   * @param {Object} obj
   * @return {boolean}
   */
  function _isAccessor(obj) {
    return $own(obj, 'get') || $own(obj, 'set');
  }

  /// {{{3
  /// @func _getDescriptor
  /**
   * @private
   * @param {Object} descriptor
   * @param {boolean=} hasSetter
   * @return {!Object}
   */
  function _getDescriptor(descriptor, hasSetter) {

    /** @type {!Object} */
    var defaultDescriptor;

    if ( hasSetter && _isData(descriptor) ) {
      defaultDescriptor = {};
      if ( $is.bool( descriptor.enumerable ) )
        defaultDescriptor.enumerable = descriptor.enumerable;
      if ( $is.bool( descriptor.configurable ) )
        defaultDescriptor.configurable = descriptor.configurable;
      descriptor = defaultDescriptor;
    }

    defaultDescriptor = hasSetter || _isAccessor(descriptor)
      ? ACCESSOR_DESCRIPTOR
      : DATA_DESCRIPTOR;
    defaultDescriptor = $cloneObj(defaultDescriptor);

    return $merge(defaultDescriptor, descriptor);
  }

  /// {{{3
  /// @func _cloneAccessor
  /**
   * @private
   * @param {!Object} descriptor
   * @return {!Object}
   */
  function _cloneAccessor(descriptor) {

    /** @type {!Object} */
    var accessor;
    /** @type {string} */
    var key;

    accessor = {};
    for (key in descriptor) {
      if ( $own(descriptor, key) && key !== 'value' )
        accessor[key] = descriptor[key];
    }
    return accessor;
  }

  /// {{{3
  /// @func _getStrongType
  /**
   * @private
   * @param {string=} strongType
   * @return {(!function|undefined)}
   */
  function _getStrongType(strongType) {
    return strongType && function strongTypeCheck(newVal) {
      return is(strongType, newVal);
    };
  }

  ///////////////////////////////////////////////////// {{{2
  // AMEND HELPERS - OBJECT POLYFILLS
  //////////////////////////////////////////////////////////

  /// {{{3
  /// @const HAS_DEFINE_PROPS
  /**
   * @private
   * @const {boolean}
   */
  var HAS_DEFINE_PROPS = !!Object.defineProperties && (function () {

    /** @type {!Object} */
    var descriptor;
    /** @type {!Object} */
    var obj;
    /** @type {string} */
    var key;

    obj = {};
    descriptor = {
      enumerable: false,
      value: obj
    };

    try {
      Object.defineProperty(obj, 'prop', descriptor);
      for (key in obj) {
        if (key === 'prop')
          return false;
      }
    }
    catch (e) {
      return false;
    }

    return obj.prop === obj;
  })();

  /// {{{3
  /// @func _ObjectDefineProperty
  /**
   * @private
   * @param {!Object} obj
   * @param {string} key
   * @param {!Object} descriptor
   * @return {!Object}
   */
  var _ObjectDefineProperty = HAS_DEFINE_PROPS
    ? Object.defineProperty
    : function ObjectDefineProperty(obj, key, descriptor) {
        obj[key] = $own(descriptor, 'get')
          ? descriptor.get()
          : descriptor.value;
        return obj;
      };

  /// {{{3
  /// @func _ObjectDefineProperties
  /**
   * @private
   * @param {!Object} obj
   * @param {!Object} props
   * @return {!Object}
   */
  var _ObjectDefineProperties = HAS_DEFINE_PROPS
    ? Object.defineProperties
    : function ObjectDefineProperties(obj, props) {

        /** @type {!Object} */
        var prop;
        /** @type {string} */
        var key;

        for (key in props) {
          if ( $own(props, key) ) {
            prop = props[key];
            obj[key] = $own(prop, 'get')
              ? prop.get()
              : prop.value;
          }
        }
        return obj;
      };

  ///////////////////////////////////////////////////// {{{2
  // AMEND HELPERS - MISC
  //////////////////////////////////////////////////////////

  /// {{{3
  /// @func _hasKeys
  /**
   * @private
   * @param {!Object} source
   * @param {!Object} obj
   * @return {boolean}
   */
  function _hasKeys(source, obj) {

    /** @type {string} */
    var key;

    for (key in obj) {
      if ( $own(obj, key) && !$own(source, key) )
        return false;
    }
    return true;
  }

  /// {{{3
  /// @const NONE
  /**
   * @private
   * @const {undefined}
   */
  var NONE = (function(){})();

  /// {{{3
  /// @func $err
  /**
   * @private
   * @param {string} msg
   * @param {string=} method
   * @return {!Error} 
   */
  var $err = $newErrorMaker('amend');

  /// {{{3
  /// @func $typeErr
  /**
   * @private
   * @param {string} param
   * @param {string=} method
   * @return {!TypeError} 
   */
  var $typeErr = $err.type;

  /// {{{3
  /// @func $rangeErr
  /**
   * @private
   * @param {string} param
   * @param {string=} valid
   * @param {string=} method
   * @return {!RangeError} 
   */
  var $rangeErr = $err.range;

  /// }}}2
  // END OF PRIVATE SCOPE FOR AMEND
  return amend;
})();
/// }}}1

module.exports = amend;

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
