/**
 * ---------------------------------------------------------------------------
 * VITALS.AMEND
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
// VITALS.AMEND
//////////////////////////////////////////////////////////////////////////////

/**
 * @public
 * @const {!Function<string, !Function>}
 * @dict
 */
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
   * @param {!Object} source
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
   *   If defined all new properties are assigned an
   *   [accessor descriptor][descriptor] (unless overridden in a #props
   *   `value`) that includes a `set` function (unless overridden in a #props
   *   `value`) that throws an error if @is#main returns `false` for a new
   *   property `value`. See the below snippet for an example #strongType
   *   `set` function.
   *   ```
   *   descriptor.set = function set(newVal) {
   *     if ( !vitals.is(strongType, newVal) )
   *       throw new TypeError("...");
   *     value = newVal;
   *   };
   *   ```
   * @param {(!function(*, *): *)=} setter
   *   If defined all new properties are assigned an
   *   [accessor descriptor][descriptor] (unless overridden in a #props
   *   `value`) that includes a `set` function (unless overridden in a #props
   *   `value`) that sets the property to the value returned by #setter. The
   *   #setter function will receive two params, the new value and the current
   *   value. If #strongType is defined #setter will not get called until the
   *   new value passes the @is#main test.
   *   ```
   *   descriptor.set = function set(newVal) {
   *     if ( !vitals.is(strongType, newVal) )
   *       throw new TypeError("...");
   *     value = setter(newVal, value);
   *   };
   *   ```
   * @return {!Object}
   *   The amended #source.
   */
  function amend(source, props, val, descriptor, strongType, setter) {

    /** @type {boolean} */
    var isArr;
    /** @type {!Array} */
    var args;
    /** @type {number} */
    var len;

    if ( !$is.obj(source) )
      throw $typeErr(new TypeError, 'source', source, '!Object');

    if ( $is.str(props) )
      props = $splitKeys(props);

    if ( !$is.obj(props) )
      throw $typeErr(new TypeError, 'props', props,
        '!Object<string, *>|!Array<string>|string');

    isArr = $is.arr(props);
    len = arguments['length'];

    if (isArr && len < 3)
      throw $err(new Error, 'no #val defined');

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
      throw $typeErr(new TypeError, 'descriptor', descriptor, '!Object=');
    if ( !is('str=', strongType) )
      throw $typeErr(new TypeError, 'strongType', strongType, 'string=');
    if ( !is('func=', setter) )
      throw $typeErr(new TypeError, 'setter', setter,
        '(!function(*, *): *)=');

    if (strongType) {
      if ( isArr && !is(strongType + '=', val) )
        throw $typeErr(new TypeError, 'val', val, strongType + '=');
      if ( !isArr && !_strongTypeCheckProps(strongType, props) )
        throw $typeErr(new TypeError, 'props property value', props,
          strongType);
    }

    return _amendProps(source, props, val, descriptor, strongType, setter);
  }

  /// {{{2
  /// @method amend.config
  /**
   * A shortcut for [Object.defineProperties][define-props] that only updates
   * the descriptors of existing properties.
   *
   * @public
   * @param {!Object} source
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
   *   The amended #source.
   */
  function amendConfig(source, props, descriptor) {

    if ( !$is.obj(source) )
      throw $typeErr(new TypeError, 'source', source, '!Object', 'config');

    if ( $is.str(props) )
      props = $splitKeys(props);

    if ( !$is.obj(props) )
      throw $typeErr(new TypeError, 'props', props,
        '!Object<string, !Object>|!Array<string>|string', 'config');

    if ( $is.arr(props) ) {

      if ( !$is.obj(descriptor) )
        throw $typeErr(new TypeError, 'descriptor', descriptor, '!Object=',
          'config');

      props = _setupConfigs(props, descriptor);
    }
    else if ( !is('objMap', props) )
      throw $typeErr(new TypeError, 'props', props,
        '!Object<string, !Object>|!Array<string>|string', 'config');

    if ( !_hasKeys(source, props) )
      throw $err(new Error, 'at least one property key name in the #props ' +
        'did not exist in the #source', 'config');

    return _amendConfigs(source, props);
  }
  amend['config'] = amendConfig;

  /// {{{2
  /// @method amend.property
  /// @alias amend.prop
  /**
   * A shortcut for [Object.defineProperty][define-prop].
   *
   * @public
   * @param {!Object} source
   * @param {string} key
   * @param {*=} val
   *   #val is required if #descriptor is not defined.
   * @param {!Object=} descriptor = `{ writable: true, enumerable: true, configurable: true }`
   * @param {string=} strongType
   *   If defined the new property is assigned an
   *   [accessor descriptor][descriptor] that includes a `set` function that
   *   throws an error if @is#main returns `false` for a new property `value`.
   *   See the below snippet for an example #strongType `set` function.
   *   ```
   *   descriptor.set = function set(newVal) {
   *     if ( !vitals.is(strongType, newVal) )
   *       throw new TypeError("...");
   *     value = newVal;
   *   };
   *   ```
   * @param {(!function(*, *): *)=} setter
   *   If defined the new property is assigned an
   *   [accessor descriptor][descriptor] that includes a `set` function that
   *   sets the property to the value returned by #setter. The #setter
   *   function will receive two params, the new value and the current value.
   *   If #strongType is defined #setter will not get called until the new
   *   value passes the @is#main test.
   *   ```
   *   descriptor.set = function set(newVal) {
   *     if ( !vitals.is(strongType, newVal) )
   *       throw new TypeError("...");
   *     value = setter(newVal, value);
   *   };
   *   ```
   * @return {!Object}
   *   The amended #source.
   */
  function amendProperty(source, key, val, descriptor, strongType, setter) {

    /** @type {!Array} */
    var args;
    /** @type {number} */
    var len;

    if ( !$is.obj(source) )
      throw $typeErr(new TypeError, 'source', source, '!Object', 'property');
    if ( !$is.str(key) )
      throw $typeErr(new TypeError, 'key', key, 'string', 'property');

    len = arguments['length'];

    if (len < 3)
      throw $err(new Error, 'no #val or #descriptor defined', 'property');

    if (len > 2 && len < 6) {
      args = _parseProp(len, val, descriptor, strongType, setter);
      val = args[0];
      descriptor = args[1];
      strongType = args[2];
      setter = args[3];
    }

    if ( !is('!obj=', descriptor) )
      throw $typeErr(new TypeError, 'descriptor', descriptor, '!Object=',
        'property');
    if ( !is('str=', strongType) )
      throw $typeErr(new TypeError, 'strongType', strongType, 'string=',
        'property');
    if ( !is('func=', setter) )
      throw $typeErr(new TypeError, 'setter', setter, '(!function(*, *): *)=',
        'property');

    if ( strongType && !is(strongType + '=', val) )
      throw $typeErr(new TypeError, 'val', val, strongType + '=', 'property');
    if (descriptor
        && (strongType || setter)
        && $own(descriptor, 'writable') )
      throw $err(new Error, 'invalid data #descriptor used with defined ' +
        '#strongType or #setter', 'property');

    return _amendProp(source, key, val, descriptor, strongType, setter);
  }
  amend['property'] = amendProperty;
  amend['prop'] = amendProperty;

  /// {{{2
  /// @method amend.property.config
  /// @alias amend.prop.config
  /**
   * A shortcut for [Object.defineProperty][define-prop] that only updates the
   * [descriptor][descriptor] of an existing property.
   *
   * @public
   * @param {!Object} source
   * @param {string} key
   * @param {!Object} descriptor
   * @return {!Object}
   *   The amended #source.
   */
  function amendPropertyConfig(source, key, descriptor) {

    if ( !$is.obj(source) )
      throw $typeErr(new TypeError, 'source', source, '!Object',
        'property.config');
    if ( !$is.str(key) )
      throw $typeErr(new TypeError, 'key', key, 'string', 'property.config');
    if ( !$is.obj(descriptor) )
      throw $typeErr(new TypeError, 'descriptor', descriptor, '!Object',
        'property.config');
    if ( !$own(source, key) )
      throw $err(new Error, 'undefined #key name in #source',
        'property.config');

    return _amendConfig(source, key, descriptor);
  }
  amend['property']['config'] = amendPropertyConfig;
  amend['prop']['config'] = amendPropertyConfig;

  /// {{{2
  /// @method amend.properties
  /// @alias amend.props
  /**
   * A shortcut for [Object.defineProperties][define-props] that includes
   * easier property value assignment, strong type declarations, and flexible
   * default [descriptor][descriptor] options.
   *
   * @public
   * @param {!Object} source
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
   *   If defined all new properties are assigned an
   *   [accessor descriptor][descriptor] (unless overridden in a #props
   *   `value`) that includes a `set` function (unless overridden in a #props
   *   `value`) that throws an error if @is#main returns `false` for a new
   *   property `value`. See the below snippet for an example #strongType
   *   `set` function.
   *   ```
   *   descriptor.set = function set(newVal) {
   *     if ( !vitals.is(strongType, newVal) )
   *       throw new TypeError("...");
   *     value = newVal;
   *   };
   *   ```
   * @param {(!function(*, *): *)=} setter
   *   If defined all new properties are assigned an
   *   [accessor descriptor][descriptor] (unless overridden in a #props
   *   `value`) that includes a `set` function (unless overridden in a #props
   *   `value`) that sets the property to the value returned by #setter. The
   *   #setter function will receive two params, the new value and the current
   *   value. If #strongType is defined #setter will not get called until the
   *   new value passes the @is#main test.
   *   ```
   *   descriptor.set = function set(newVal) {
   *     if ( !vitals.is(strongType, newVal) )
   *       throw new TypeError("...");
   *     value = setter(newVal, value);
   *   };
   *   ```
   * @return {!Object}
   *   The amended #source.
   */
  function amendProperties(
    source, props, val, descriptor, strongType, setter) {

    /** @type {boolean} */
    var isArr;
    /** @type {!Array} */
    var args;
    /** @type {number} */
    var len;

    if ( !$is.obj(source) )
      throw $typeErr(new TypeError, 'source', source, '!Object',
        'properties');

    if ( $is.str(props) )
      props = $splitKeys(props);

    if ( !$is.obj(props) )
      throw $typeErr(new TypeError, 'props', props,
        '!Object<string, *>|!Array<string>|string', 'properties');

    isArr = $is.arr(props);
    len = arguments['length'];

    if (isArr && len < 3)
      throw $err(new Error, 'no #val defined', 'properties');

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
      throw $typeErr(new TypeError, 'descriptor', descriptor, '!Object=',
        'properties');
    if ( !is('str=', strongType) )
      throw $typeErr(new TypeError, 'strongType', strongType, 'string=',
        'properties');
    if ( !is('func=', setter) )
      throw $typeErr(new TypeError, 'setter', setter, '(!function(*, *): *)=',
        'properties');

    if (strongType) {
      if ( isArr && !is(strongType + '=', val) )
        throw $typeErr(new TypeError, 'val', val, strongType + '=',
          'properties');
      if ( !isArr && !_strongTypeCheckProps(strongType, props) )
        throw $typeErr(new TypeError, 'props property value', props,
          strongType, 'properties');
    }

    return _amendProps(source, props, val, descriptor, strongType, setter);
  }
  amend['properties'] = amendProperties;
  amend['props'] = amendProperties;

  /// {{{2
  /// @method amend.properties.config
  /// @alias amend.props.config
  /**
   * A shortcut for [Object.defineProperties][define-props] that only updates
   * the [descriptors][descriptor] of existing properties.
   *
   * @public
   * @param {!Object} source
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
   *   The amended #source.
   */
  function amendPropertiesConfig(source, props, descriptor) {

    if ( !$is.obj(source) )
      throw $typeErr(new TypeError, 'source', source, '!Object',
        'properties.config');

    if ( $is.str(props) )
      props = $splitKeys(props);

    if ( !$is.obj(props) )
      throw $typeErr(new TypeError, 'props', props,
        '!Object<string, !Object>|!Array<string>|string',
        'properties.config');

    if ( $is.arr(props) ) {

      if ( !$is.obj(descriptor) )
        throw $typeErr(new TypeError, 'descriptor', descriptor, '!Object=',
          'properties.config');

      props = _setupConfigs(props, descriptor);
    }
    else if ( !is('objMap', props) )
      throw $typeErr(new TypeError, 'props', props,
        '!Object<string, !Object>|!Array<string>|string',
        'properties.config');

    if ( !_hasKeys(source, props) )
      throw $err(new Error, 'at least one property key name in the #props ' +
        'did not exist in the #source', 'properties.config');

    return _amendConfigs(source, props);
  }
  amend['properties']['config'] = amendPropertiesConfig;
  amend['props']['config'] = amendPropertiesConfig;

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
      val = descriptor['value'];
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
          val = val['value'];
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
        ? _setupPropsByKeyWithSetter(
            props, val, descriptor, strongType, setter)
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
        newProps[key] = _setupDescriptorWithSetter(
          props[key], descriptor, strongType, setter);
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

    len = keys['length'];
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
  function _setupPropsByKeyWithSetter(
    keys, val, descriptor, strongType, setter) {

    /** @type {!Object} */
    var props;
    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    props = {};

    len = keys['length'];
    i = -1;
    while (++i < len)
      props[ keys[i] ] = _setupDescriptorByKeyWithSetter(
        val, descriptor, strongType, setter);
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

    len = keys['length'];
    i = -1;
    while (++i < len)
      props[ keys[i] ] = desc;
    return props;
  }

  ///////////////////////////////////////////////////// {{{2
  // AMEND HELPERS - DESCRIPTOR SETUP
  //////////////////////////////////////////////////////////

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
      : { 'value': val };
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
      val = prop['value'];
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
    prop['value'] = val;
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
  function _setupDescriptorByKeyWithSetter(
    val, descriptor, strongType, setter) {

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
    descriptor['get'] = function get() {
      return val;
    };
    descriptor['set'] = strongType && setter
      ? function set(newVal) {
          if ( !strongType(newVal) )
            throw _mkStrongError(new TypeError,
              'invalid data type for property value: `' + newVal + '`');
          val = setter(newVal, val);
        }
      : strongType
        ? function set(newVal) {
            if ( !strongType(newVal) )
              throw _mkStrongError(new TypeError,
                'invalid data type for property value: `' + newVal + '`');
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
   * @const {!Object<string, boolean>}
   * @dict
   */
  var DATA_DESCRIPTOR = {
    'writable': true,
    'enumerable': true,
    'configurable': true
  };

  /// {{{3
  /// @const ACCESSOR_DESCRIPTOR
  /**
   * @private
   * @const {!Object<string, boolean>}
   * @dict
   */
  var ACCESSOR_DESCRIPTOR = {
    'enumerable': true,
    'configurable': true
  };

  /// {{{3
  /// @const DESCRIPTOR_PROPS
  /**
   * @private
   * @const {!Object<string, boolean>}
   * @dict
   */
  var DESCRIPTOR_PROPS = {
    'get': true,
    'set': true,
    'value': true,
    'writable': true,
    'enumerable': true,
    'configurable': true
  };

  /// {{{3
  /// @func _isDescriptor
  /**
   * @private
   * @param {?Object} obj
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
   * @param {?Object} obj
   * @return {boolean}
   */
  function _isData(obj) {
    return $own(obj, 'value') || $own(obj, 'writable');
  }

  /// {{{3
  /// @func _isAccessor
  /**
   * @private
   * @param {?Object} obj
   * @return {boolean}
   */
  function _isAccessor(obj) {
    return $own(obj, 'get') || $own(obj, 'set');
  }

  /// {{{3
  /// @func _getDescriptor
  /**
   * @private
   * @param {?Object} descriptor
   * @param {boolean=} hasSetter
   * @return {!Object}
   */
  function _getDescriptor(descriptor, hasSetter) {

    /** @type {!Object} */
    var defaultDescriptor;

    if ( hasSetter && _isData(descriptor) ) {
      defaultDescriptor = {};
      if ( $is.bool(descriptor['enumerable']) )
        defaultDescriptor['enumerable'] = descriptor['enumerable'];
      if ( $is.bool(descriptor['configurable']) )
        defaultDescriptor['configurable'] = descriptor['configurable'];
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
  var HAS_DEFINE_PROPS = (function _hasDefinePropsPrivateScope() {

    /** @type {!Object} */
    var descriptor;
    /** @type {!Object} */
    var obj;
    /** @type {string} */
    var key;

    if (!('defineProperties' in Object)
        || !$is.fun(Object['defineProperties']) )
      return false;

    if (!('defineProperty' in Object)
        || !$is.fun(Object['defineProperty']) )
      return false;

    /** @dict */ 
    obj = {};
    /** @dict */ 
    descriptor = {};

    descriptor['value'] = obj;
    descriptor['enumerable'] = false;

    try {
      Object['defineProperty'](obj, 'key', descriptor);
      for (key in obj) {
        if (key === 'key')
          return false;
      }
    }
    catch (e) {
      return false;
    }

    return obj['key'] === obj;
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
    ? Object['defineProperty']
    : function ObjectDefineProperty(obj, key, descriptor) {
        obj[key] = $own(descriptor, 'get')
          ? descriptor['get']()
          : descriptor['value'];
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
    ? Object['defineProperties']
    : function ObjectDefineProperties(obj, props) {

        /** @type {!Object} */
        var prop;
        /** @type {string} */
        var key;

        for (key in props) {
          if ( $own(props, key) ) {
            prop = props[key];
            obj[key] = $own(prop, 'get')
              ? prop['get']()
              : prop['value'];
          }
        }
        return obj;
      };

  ///////////////////////////////////////////////////// {{{2
  // AMEND HELPERS - GENERAL
  //////////////////////////////////////////////////////////

  /// {{{3
  /// @const NONE
  /**
   * @private
   * @const {undefined}
   */
  var NONE = (function(){})();

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

  ///////////////////////////////////////////////////// {{{2
  // AMEND HELPERS - ERROR MAKERS
  //////////////////////////////////////////////////////////

  /// {{{3
  /// @func _mkStrongError
  /**
   * @private
   * @param {!TypeError} err
   * @param {string} msg
   * @return {!TypeError}
   */
  function _mkStrongError(err, msg) {
    err['__setter'] = true;
    err['setter'] = true;
    err['__type'] = true;
    err['type'] = true;
    err['name'] = 'TypeError';
    err['message'] = msg;
    err['msg'] = msg;
    return err;
  }

  /// {{{3
  /// @const ERROR_MAKER
  /**
   * @private
   * @const {!Object<string, !function>}
   * @struct
   */
  var ERROR_MAKER = $newErrorMaker('amend');

  /// {{{3
  /// @func $err
  /**
   * @private
   * @param {!Error} err
   * @param {string} msg
   * @param {string=} method
   * @return {!Error} 
   */
  var $err = ERROR_MAKER.error;

  /// {{{3
  /// @func $typeErr
  /**
   * @private
   * @param {!TypeError} err
   * @param {string} paramName
   * @param {*} paramVal
   * @param {string} validTypes
   * @param {string=} methodName
   * @return {!TypeError} 
   */
  var $typeErr = ERROR_MAKER.typeError;

  /// {{{3
  /// @func $rangeErr
  /**
   * @private
   * @param {!RangeError} err
   * @param {string} paramName
   * @param {(!Array<*>|string|undefined)=} validRange
   *   An `array` of actual valid options or a `string` stating the valid
   *   range. If `undefined` this option is skipped.
   * @param {string=} methodName
   * @return {!RangeError} 
   */
  var $rangeErr = ERROR_MAKER.rangeError;
  /// }}}2

  // END OF PRIVATE SCOPE FOR VITALS.AMEND
  return amend;
})();
/// }}}1

module.exports = amend;

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
