/**
 * -----------------------------------------------------------------------------
 * VITALS METHOD: amend
 * -----------------------------------------------------------------------------
 * @section strict
 * @version 4.0.1
 * @see [vitals.amend]{@link https://github.com/imaginate/vitals/wiki/vitals.amend}
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2016 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Annotations:
 * @see [JSDoc3]{@link http://usejsdoc.org/}
 * @see [Closure Compiler specific JSDoc]{@link https://developers.google.com/closure/compiler/docs/js-for-compiler}
 */

'use strict';

var newErrorMaker = require('./helpers/new-error-maker.js');
var splitKeys = require('./helpers/split-keys.js');
var cloneObj = require('./helpers/clone-obj.js');
var merge = require('./helpers/merge.js');
var own = require('./helpers/own.js');
var _is = require('./helpers/is.js');
var is = require('./is.js');


////////////////////////////////////////////////////////////////////////////////
// VITALS METHOD: amend
////////////////////////////////////////////////////////////////////////////////

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

  /**
   * A shortcut for [Object.defineProperties](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperties)
   *   that includes easier value assignment, strong type assignment, and more
   *   flexible default descriptor options.
   *
   * @public
   * @param {!Object} obj
   * @param {!(Object<string, *>|Array<string>|string)} props - The details for
   *   the props param are as follows (per props type):
   *   - object: Must be `propName => propVal` or `propName => propDescriptor`.
   *   - array:  An array of key names to define.
   *   - string: Converted to an array of key names using one of the following
   *     values as the separator (values listed in order of rank):
   *     -- `", "`
   *     -- `","`
   *     -- `"|"`
   *     -- `" "`
   * @param {*=} val - Only use (and required) if an array or string of keys is
   *   given for the props param. This param defines the value assigned for all
   *   keys regardless of descriptor type.
   * @param {!Object=} descriptor - [default= { writable: true, enumerable: true, configurable: true }]
   *   The default descriptor values for each prop.
   * @param {string=} strongType - If defined all new properties are assigned
   *   an accessor descriptor (unless assigned a data descriptor in the props
   *   param) that includes a setter (unless assigned a setter in the props
   *   param) that throws an error if the new property value fails a [vitals.is](https://github.com/imaginate/vitals/wiki/vitals.is)
   *   type test. The setter is as follows:
   *   ```
   *   prop.set = function set(newVal) {
   *     if ( !vitals.is(strongType, newVal) ) throw new TypeError("...");
   *     value = newVal;
   *   };
   *   ```
   * @param {function(*, *): *=} setter - If defined all new properties are
   *   assigned an accessor descriptor (unless assigned a data descriptor in the
   *   props param) that includes a setter (unless assigned a setter in the
   *   props param) that sets the property to the value returned by this setter.
   *   Note that this setter function will receive two params, the new value and
   *   the current value. Also note that if the strongType param is defined this
   *   setter will not get called until the new value passes the type test.
   *   ```
   *   prop.set = function set(newVal) {
   *     if ( !vitals.is(strongType, newVal) ) throw new TypeError("...");
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

    if ( !_is.obj(obj) ) throw _error.type('obj');

    if ( _is.str(props) ) props = splitKeys(props);

    if ( !_is.obj(props) ) throw _error.type('props');

    isArr = _is.arr(props);
    len = arguments.length;

    if (isArr && len < 3) throw _error('No val defined');

    if (!isArr && len > 2) {
      setter = strongType;
      strongType = descriptor;
      descriptor = val;
      val = undefined;
      ++len; // increase len for a valid _parseProps call
    }

    if (len === 4 || len === 5) {
      args = _parseProps(len, descriptor, strongType, setter);
      descriptor = args[0];
      strongType = args[1];
      setter = args[2];
    }

    if ( !is('!obj=', descriptor) ) throw _error.type('descriptor');
    if ( !is('str=',  strongType) ) throw _error.type('strongType');
    if ( !is('func=', setter)     ) throw _error.type('setter');

    if (strongType) {
      if ( isArr && !is(strongType + '=', val) ) {
        throw _error('The val param is not a valid strongType');
      }
      if ( !isArr && !_strongTypeCheckProps(strongType, props) ) {
        throw _error('A props value was not a valid strongType');
      }
    }

    return _amendProps(obj, props, val, descriptor, strongType, setter);
  }

  /**
   * A shortcut for [Object.defineProperties](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperties)
   *   that only updates the descriptors of existing properties.
   *
   * @public
   * @param {!Object} obj
   * @param {!(Object<string, !Object>|Array<string>|string)} props - Details
   *   for the props param are as follows (per props type):
   *   - object: Must be `propName => propDescriptor` pairs.
   *   - array:  An array of key names to update.
   *   - string: Converted to an array of key names using one of the following
   *     values as the separator (values listed in order of rank):
   *     -- `", "`
   *     -- `","`
   *     -- `"|"`
   *     -- `" "`
   * @param {!Object=} descriptor - Only use (and required) if an array or
   *   string of keys is given for the props param.
   * @return {!Object}
   */
  amend.config = function amendConfig(obj, props, descriptor) {

    if ( !_is.obj(obj) ) throw _error.type('obj', 'config');

    if ( _is.str(props) ) props = splitKeys(props);

    if ( !_is.obj(props) ) throw _error.type('props', 'config');

    if ( _is.arr(props) ) {
      if ( !_is.obj(descriptor) ) throw _error.type('descriptor', 'config');
      props = _setupConfigs(props, descriptor);
    }
    else if ( !is('objMap', props) ) throw _error.type('props', 'config');

    if ( !_hasKeys(obj, props) ) {
      throw _error('A given prop was not defined in the obj', 'config');
    }

    return _amendConfigs(obj, props);
  };

  /**
   * A shortcut for [Object.defineProperty](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty).
   *
   * @public
   * @param {!Object} obj
   * @param {string} key
   * @param {*=} val - A val is required if a descriptor is not supplied.
   * @param {!Object=} descriptor - [default= { writable: true, enumerable: true, configurable: true }]
   * @param {string=} strongType - If defined the new property is assigned
   *   an accessor descriptor that includes a setter that throws an error if the
   *   new property value fails a [vitals.is](https://github.com/imaginate/vitals/wiki/vitals.is)
   *   type test. The setter is as follows:
   *   ```
   *   prop.set = function set(newVal) {
   *     if ( !vitals.is(strongType, newVal) ) throw new TypeError("...");
   *     value = newVal;
   *   };
   *   ```
   * @param {function(*, *): *=} setter - If defined the new property is
   *   assigned an accessor descriptor that includes a setter that sets the
   *   property to the value returned by this setter method. The setter method
   *   will receive two params, the new value and the current value. If a
   *   strongType is defined this setter will not get called until the new value
   *   passes the type test.
   *   ```
   *   prop.set = function set(newVal) {
   *     if ( !vitals.is(strongType, newVal) ) throw new TypeError("...");
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

    if ( !_is.obj(obj) ) throw _error.type('obj', 'property');
    if ( !_is.str(key) ) throw _error.type('key', 'property');

    len = arguments.length;

    if (len < 3) throw _error('No val or descriptor defined', 'property');

    if (len > 2 && len < 6) {
      args = _parseProp(len, val, descriptor, strongType, setter);
      val = args[0];
      descriptor = args[1];
      strongType = args[2];
      setter = args[3];
    }

    if ( !is('!obj=', descriptor) ) throw _error.type('descriptor', 'property');
    if ( !is('str=',  strongType) ) throw _error.type('strongType', 'property');
    if ( !is('func=', setter)     ) throw _error.type('setter',     'property');

    if ( strongType && !is(strongType + '=', val) ) {
      throw _error('The val param is not a valid strongType', 'property');
    }
    if ( descriptor && (strongType || setter) && own(descriptor, 'writable') ){
      throw _error(
        'A data descriptor may not be used with a strongType/setter', 'property'
      );
    }

    return _amendProp(obj, key, val, descriptor, strongType, setter);
  };
  // define shorthand
  amend.prop = amend.property;

  /**
   * A shortcut for [Object.defineProperty](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)
   *   that only updates the descriptor of an existing property.
   *
   * @public
   * @param {!Object} obj
   * @param {string} key
   * @param {!Object} descriptor
   * @return {!Object}
   */
  amend.property.config = function amendPropertyConfig(obj, key, descriptor) {

    if ( !_is.obj(obj)       ) throw _error.type('obj',       'property.config');
    if ( !_is.str(key)       ) throw _error.type('key',       'property.config');
    if ( !_is.obj(descriptor)) throw _error.type('descriptor','property.config');

    if ( !own(obj, key) ) {
      throw _error('The key was not defined in the obj', 'property.config');
    }

    return _amendConfig(obj, key, descriptor);
  };
  // define shorthand
  amend.prop.config = amend.property.config;

  /**
   * A shortcut for [Object.defineProperties](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperties)
   *   that includes easier value assignment, strong type assignment, and more
   *   flexible default descriptor options.
   *
   * @public
   * @param {!Object} obj
   * @param {!(Object<string, *>|Array<string>|string)} props - The details for
   *   the props param are as follows (per props type):
   *   - object: Must be `propName => propVal` or `propName => propDescriptor`.
   *   - array:  An array of key names to define.
   *   - string: Converted to an array of key names using one of the following
   *     values as the separator (values listed in order of rank):
   *     -- `", "`
   *     -- `","`
   *     -- `"|"`
   *     -- `" "`
   * @param {*=} val - Only use (and required) if an array or string of keys is
   *   given for the props param. This param defines the value assigned for all
   *   keys regardless of descriptor type.
   * @param {!Object=} descriptor - [default= { writable: true, enumerable: true, configurable: true }]
   *   The default descriptor values for each prop.
   * @param {string=} strongType - If defined all new properties are assigned
   *   an accessor descriptor (unless assigned a data descriptor in the props
   *   param) that includes a setter (unless assigned a setter in the props
   *   param) that throws an error if the new property value fails a [vitals.is](https://github.com/imaginate/vitals/wiki/vitals.is)
   *   type test. The setter is as follows:
   *   ```
   *   prop.set = function set(newVal) {
   *     if ( !vitals.is(strongType, newVal) ) throw new TypeError("...");
   *     value = newVal;
   *   };
   *   ```
   * @param {function(*, *): *=} setter - If defined all new properties are
   *   assigned an accessor descriptor (unless assigned a data descriptor in the
   *   props param) that includes a setter (unless assigned a setter in the
   *   props param) that sets the property to the value returned by this setter.
   *   Note that this setter function will receive two params, the new value and
   *   the current value. Also note that if the strongType param is defined this
   *   setter will not get called until the new value passes the type test.
   *   ```
   *   prop.set = function set(newVal) {
   *     if ( !vitals.is(strongType, newVal) ) throw new TypeError("...");
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

    if ( !_is.obj(obj) ) throw _error.type('obj', 'properties');

    if ( _is.str(props) ) props = splitKeys(props);

    if ( !_is.obj(props) ) throw _error.type('props', 'properties');

    isArr = _is.arr(props);
    len = arguments.length;

    if (isArr && len < 3) throw _error('No val defined', 'properties');

    if (!isArr && len > 2) {
      setter = strongType;
      strongType = descriptor;
      descriptor = val;
      val = undefined;
      ++len; // increase len for a valid _parseProps call
    }

    if (len === 4 || len === 5) {
      args = _parseProps(len, descriptor, strongType, setter);
      descriptor = args[0];
      strongType = args[1];
      setter = args[2];
    }

    if ( !is('!obj=', descriptor)) throw _error.type('descriptor','properties');
    if ( !is('str=',  strongType)) throw _error.type('strongType','properties');
    if ( !is('func=', setter)    ) throw _error.type('setter',    'properties');

    if (strongType) {
      if ( isArr && !is(strongType + '=', val) ) {
        throw _error('The val param is not a valid strongType', 'properties');
      }
      if ( !isArr && !_strongTypeCheckProps(strongType, props) ) {
        throw _error('A props value was not a valid strongType', 'properties');
      }
    }

    return _amendProps(obj, props, val, descriptor, strongType, setter);
  };
  // define shorthand
  amend.props = amend.properties;

  /**
   * A shortcut for [Object.defineProperties](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperties)
   *   that only updates the descriptors of existing properties.
   *
   * @public
   * @param {!Object} obj
   * @param {!(Object<string, !Object>|Array<string>|string)} props - Details
   *   for the props param are as follows (per props type):
   *   - object: Must be `propName => propDescriptor` pairs.
   *   - array:  An array of key names to update.
   *   - string: Converted to an array of key names using one of the following
   *     values as the separator (values listed in order of rank):
   *     -- `", "`
   *     -- `","`
   *     -- `"|"`
   *     -- `" "`
   * @param {!Object=} descriptor - Only use (and required) if an array or
   *   string of keys is given for the props param.
   * @return {!Object}
   */
  amend.properties.config = function amendPropertiesConfig(obj, props, descriptor) {

    if ( !_is.obj(obj) ) throw _error.type('obj', 'properties.config');

    if ( _is.str(props) ) props = splitKeys(props);

    if ( !_is.obj(props) ) throw _error.type('props', 'properties.config');

    if ( _is.arr(props) ) {
      if ( !_is.obj(descriptor) ) throw _error.type('descriptor', 'properties.config');
      props = _setupConfigs(props, descriptor);
    }
    else if ( !is('objMap', props) ) throw _error.type('props', 'properties.config');

    if ( !_hasKeys(obj, props) ) {
      throw _error('A given prop was not defined in the obj', 'properties.config');
    }

    return _amendConfigs(obj, props);
  };
  // define shorthand
  amend.props.config = amend.properties.config;

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - MAIN ARG PARSING
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @param {number} len
   * @param {*=} val
   * @param {!Object=} descriptor
   * @param {string=} strongType
   * @param {function(*, *): *=} setter
   * @return {!Array}
   */
  function _parseProp(len, val, descriptor, strongType, setter) {

    switch (len) {
      case 4:
      if ( _is.str(descriptor) ) {
        strongType = descriptor;
        descriptor = undefined;
      }
      else if ( _is.func(descriptor) ) {
        setter = descriptor;
        descriptor = undefined;
      }
      break;
      case 5:
      if ( _is.func(strongType) ) {
        setter = strongType;
        strongType = undefined;
        if ( _is.str(descriptor) ) {
          strongType = descriptor;
          descriptor = undefined;
        }
      }
    }

    if ( _is.obj(val) && _isDescriptor(val) ) {
      descriptor = val;
      val = descriptor.value;
    }

    return [ val, descriptor, strongType, setter ];
  }

  /**
   * @private
   * @param {number} len
   * @param {!Object=} descriptor
   * @param {string=} strongType
   * @param {function(*, *): *=} setter
   * @return {!Array}
   */
  function _parseProps(len, descriptor, strongType, setter) {

    switch (len) {
      case 4:
      if ( _is.str(descriptor) ) {
        strongType = descriptor;
        descriptor = undefined;
      }
      else if ( _is.func(descriptor) ) {
        setter = descriptor;
        descriptor = undefined;
      }
      break;
      case 5:
      if ( _is.func(strongType) ) {
        setter = strongType;
        strongType = undefined;
        if ( _is.str(descriptor) ) {
          strongType = descriptor;
          descriptor = undefined;
        }
      }
    }

    return [ descriptor, strongType, setter ];
  }

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
      if ( own(props, key) ) {
        val = props[key];
        if ( _is.obj(val) && _isDescriptor(val) ) {
          if ( own(val, 'writable') ) continue;
          val = val.value;
        }
        if ( !is(strongType, val) ) return false;
      }
    }
    return true;
  }

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - MAIN
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @param {!Object} obj
   * @param {string} key
   * @param {*=} val
   * @param {!Object=} descriptor
   * @param {string=} strongType
   * @param {function=} setter
   * @return {!Object}
   */
  function _amendProp(obj, key, val, descriptor, strongType, setter) {

    descriptor = descriptor || null;
    descriptor = _getDescriptor(descriptor, !!strongType || !!setter);
    strongType = _getStrongType(strongType);

    descriptor = strongType || setter
      ? _setupDescriptorByKeyWithSetter(val, descriptor, strongType, setter)
      : _isAccessor(descriptor)
        ? cloneObj(descriptor)
        : _setupDescriptorByKey(val, descriptor);

    return _ObjectDefineProperty(obj, key, descriptor);
  }

  /**
   * @private
   * @param {!Object} obj
   * @param {!Object} props
   * @param {*} val
   * @param {!Object=} descriptor
   * @param {string=} strongType
   * @param {function=} setter
   * @return {!Object}
   */
  function _amendProps(obj, props, val, descriptor, strongType, setter) {

    descriptor = descriptor || null;
    descriptor = _getDescriptor(descriptor, !!strongType || !!setter);
    strongType = _getStrongType(strongType);
    props = _is.arr(props)
      ? strongType || setter
        ? _setupPropsByKeyWithSetter(props, val, descriptor, strongType, setter)
        : _setupPropsByKey(props, val, descriptor)
      : strongType || setter
        ? _setupPropsWithSetter(props, descriptor, strongType, setter)
        : _setupProps(props, descriptor);

    return _ObjectDefineProperties(obj, props);
  }

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

  /**
   * @private
   * @param {!Object} obj
   * @param {!Object} props
   * @return {!Object}
   */
  function _amendConfigs(obj, props) {
    return _ObjectDefineProperties(obj, props);
  }

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - PROPERTIES SETUP
  //////////////////////////////////////////////////////////

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
      if ( own(props, key) ) {
        newProps[key] = _setupDescriptor(props[key], descriptor);
      }
    }
    return newProps;
  }

  /**
   * @private
   * @param {!Object} props
   * @param {!Object} descriptor
   * @param {function} strongType
   * @param {function} setter
   * @return {!Object}
   */
  function _setupPropsWithSetter(props, descriptor, strongType, setter) {

    /** @type {!Object} */
    var newProps;
    /** @type {string} */
    var key;

    newProps = {};
    for (key in props) {
      if ( own(props, key) ) {
        newProps[key] = _setupDescriptorWithSetter(
          props[key], descriptor, strongType, setter
        );
      }
    }
    return newProps;
  }

  /**
   * @private
   * @param {!Array<string>} keys
   * @param {*} val
   * @param {!Object} descriptor
   * @return {!Object}
   */
  function _setupPropsByKey(keys, val, descriptor) {

    /** @type {function} */
    var setupDesc;
    /** @type {!Object} */
    var props;
    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    setupDesc = _isAccessor(descriptor)
      ? function setupDesc(val, desc) { return cloneObj(desc); }
      : _setupDescriptorByKey;
    props = {};
    len = keys.length;
    i = -1;
    while (++i < len) {
      props[ keys[i] ] = setupDesc(val, descriptor);
    }
    return props;
  }

  /**
   * @private
   * @param {!Array<string>} keys
   * @param {*} val
   * @param {!Object} descriptor
   * @param {function} strongType
   * @param {function} setter
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
    while (++i < len) {
      props[ keys[i] ] = _setupDescriptorByKeyWithSetter(
        val, descriptor, strongType, setter
      );
    }
    return props;
  }

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
    while (++i < len) {
      props[ keys[i] ] = desc;
    }
    return props;
  }

  //////////////////////////////////////////////////////////
  // PRIVATE PROPERTIES - DESCRIPTORS SETUP
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @type {string}
   * @const
   */
  var INVALID_STRONG_TYPE = 'Invalid type for object property value.';

  /**
   * @private
   * @param {*} val
   * @param {!Object} descriptor
   * @return {!Object}
   */
  function _setupDescriptor(val, descriptor) {

    /** @type {!Object} */
    var prop;

    prop = cloneObj(descriptor);
    val = _isDescriptor(val) ? val : { value: val };
    return merge(prop, val);
  }

  /**
   * @private
   * @param {*} val
   * @param {!Object} descriptor
   * @param {function=} strongType
   * @param {function=} setter
   * @return {!Object}
   */
  function _setupDescriptorWithSetter(val, descriptor, strongType, setter) {

    /** @type {!Object} */
    var prop;

    prop = cloneObj(descriptor);

    if ( _isDescriptor(val) ) {
      prop = merge(prop, val);
      if ( own(prop, 'writable') || _isAccessor(prop) ) return prop;
      val = prop.value;
      prop = _cloneAccessor(prop);
    }

    prop = _setupGetSet(val, prop, strongType, setter);
    return prop;
  }

  /**
   * @private
   * @param {*} val
   * @param {!Object} descriptor
   * @return {!Object}
   */
  function _setupDescriptorByKey(val, descriptor) {

    /** @type {!Object} */
    var prop;

    prop = cloneObj(descriptor);
    prop.value = val;
    return prop;
  }

  /**
   * @private
   * @param {*} val
   * @param {!Object} descriptor
   * @param {function=} strongType
   * @param {function=} setter
   * @return {!Object}
   */
  function _setupDescriptorByKeyWithSetter(val, descriptor, strongType, setter) {

    /** @type {!Object} */
    var prop;

    prop = cloneObj(descriptor);
    prop = _setupGetSet(val, prop, strongType, setter);
    return prop;
  }

  /**
   * @private
   * @param {*} val
   * @param {!Object} descriptor
   * @param {function=} strongType
   * @param {function=} setter
   * @return {!Object}
   */
  function _setupGetSet(val, descriptor, strongType, setter) {

    /** @type {!Error} */
    var error;

    descriptor.get = function() { return val; };
    descriptor.set = strongType && setter
      ? function(newVal) {
          if ( !strongType(newVal) ) {
            error = new TypeError(INVALID_STRONG_TYPE);
            error.__setter = true;
            error.__type = true;
            throw error;
          }
          val = setter(newVal, val);
        }
      : strongType
        ? function(newVal) {
            if ( !strongType(newVal) ) {
              error = new TypeError(INVALID_STRONG_TYPE);
              error.__setter = true;
              error.__type = true;
              throw error;
            }
            val = newVal;
          }
        : function(newVal) { val = setter(newVal, val); };
    return descriptor;
  }

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - DESCRIPTORS HELPERS
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @type {!Object}
   * @const
   */
  var DATA_DESCRIPTOR = {
    writable: true,
    enumerable: true,
    configurable: true
  };

  /**
   * @private
   * @type {!Object}
   * @const
   */
  var ACCESSOR_DESCRIPTOR = {
    enumerable: true,
    configurable: true
  };

  /**
   * @private
   * @type {!Object}
   * @const
   */
  var DESCRIPTOR_PROPS = {
    get: true,
    set: true,
    value: true,
    writable: true,
    enumerable: true,
    configurable: true
  };

  /**
   * @private
   * @param {!Object} obj
   * @return {boolean}
   */
  function _isDescriptor(obj) {

    /** @type {string} */
    var key;

    if ( !_is.obj(obj) ) return false;

    for (key in obj) {
      if ( own(obj, key) && !own(DESCRIPTOR_PROPS, key) ) return false;
    }
    return true;
  }

  /**
   * @private
   * @param {Object} obj
   * @return {boolean}
   */
  function _isData(obj) {
    return own(obj, 'value') || own(obj, 'writable');
  }

  /**
   * @private
   * @param {Object} obj
   * @return {boolean}
   */
  function _isAccessor(obj) {
    return own(obj, 'get') || own(obj, 'set');
  }

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
      if ( _is.bool( descriptor.enumerable ) ) {
        defaultDescriptor.enumerable = descriptor.enumerable;
      }
      if ( _is.bool( descriptor.configurable ) ) {
        defaultDescriptor.configurable = descriptor.configurable;
      }
      descriptor = defaultDescriptor;
    }

    defaultDescriptor = hasSetter || _isAccessor(descriptor)
      ? ACCESSOR_DESCRIPTOR
      : DATA_DESCRIPTOR;
    defaultDescriptor = cloneObj(defaultDescriptor);

    return merge(defaultDescriptor, descriptor);
  }

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
      if ( own(descriptor, key) && key !== 'value' ) {
        accessor[key] = descriptor[key];
      }
    }
    return accessor;
  }

  /**
   * @private
   * @param {string=} strongType
   * @return {(function|undefined)}
   */
  function _getStrongType(strongType) {
    return strongType && function strongTypeCheck(newVal) {
      return is(strongType, newVal);
    };
  }

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - OBJECT.DEFINE_PROPERTIES POLYFILLS
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @type {boolean}
   * @const
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
        if (key === 'prop') return false;
      }
    }
    catch (e) {
      return false;
    }

    return obj.prop === obj;
  })();

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
      obj[key] = own(descriptor, 'get') ? descriptor.get() : descriptor.value;
      return obj;
    };

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
        if ( own(props, key) ) {
          prop = props[key];
          obj[key] = own(prop, 'get') ? prop.get() : prop.value;
        }
      }
      return obj;
    };

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - GENERAL
  //////////////////////////////////////////////////////////

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
      if ( own(obj, key) && !own(source, key) ) return false;
    }
    return true;
  }

  /**
   * @private
   * @type {!ErrorAid}
   */
  var _error = newErrorMaker('amend');

  //////////////////////////////////////////////////////////
  // END OF PRIVATE SCOPE FOR AMEND
  return amend;
})();


module.exports = amend;
