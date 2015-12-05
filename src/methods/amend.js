/**
 * -----------------------------------------------------------------------------
 * VITALS - JS METHOD - AMEND
 * -----------------------------------------------------------------------------
 * @version 2.1.1
 * @see [vitals.amend]{@link https://github.com/imaginate/vitals/blob/master/src/methods/amend.js}
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2015 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Supporting Libraries:
 * @see [are]{@link https://github.com/imaginate/are}
 *
 * Annotations:
 * @see [JSDoc3]{@link http://usejsdoc.org/}
 * @see [Closure Compiler specific JSDoc]{@link https://developers.google.com/closure/compiler/docs/js-for-compiler}
 */

'use strict';

var newErrorAid = require('./_helpers/errorAid.js');
var _splitKeys = require('./_helpers/splitKeys.js');
var _cloneObj = require('./_helpers/cloneObj.js');
var _match = require('./_helpers/match.js');
var _merge = require('./_helpers/merge.js');
var _own = require('./_helpers/own.js');


////////////////////////////////////////////////////////////////////////////////
// AMEND
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
   * A shortcut for Object.defineProperties that includes easier property
   *   assignment, static type assignment, and more flexible default descriptor
   *   options.
   * @public
   * @param {!Object} obj
   * @param {!(Object<string, *>|Array<string>|string)} props - The details for
   *   the props param are as follows (per props type):
   *   - object: Must be "propName => propVal" or "propName => propDescriptor".
   *   - array:  An array of key names to define.
   *   - string: Converted to an array of key names. Use this list of chars for
   *     the separator (chars listed in order of rank):  ", "  ","  "|"  " "
   * @param {*=} val - Only use (and required) if an array or string of keys is
   *   given for the props param. This param defines the value assigned for all
   *   keys regardless of descriptor type.
   * @param {!Object=} descriptor - The default descriptor values for each prop.
   *   [default= { writable: true, enumerable: true, configurable: true }]
   * @param {string=} staticType - If defined all new properties are assigned
   *   an accessor descriptor (unless assigned a data descriptor in the props
   *   param) that includes a setter (unless assigned a setter in the props
   *   param) that throws an error if the new property value fails an
   *   [is main function]{@link https://github.com/imaginate/are/blob/master/docs/is-main-func.md}
   *   type test. The setter is as follows:
   *     ```
   *     prop.set = function setter(newVal) {
   *       if ( !is(staticType, newVal) ) {
   *         throw new TypeError("Invalid type for object property value.");
   *       }
   *       value = newVal;
   *     };
   *     ```
   * @param {function(*, *): *=} setter - If defined all new properties are
   *   assigned an accessor descriptor (unless assigned a data descriptor in the
   *   props param) that includes a setter (unless assigned a setter in the
   *   props param) that sets the property to the value returned by this setter.
   *   Note that this setter function will receive two params, the new value and
   *   the current value. Also note that if the staticType param is defined this
   *   setter will not get called until the new value passes the type test.
   * @return {!Object}
   */
  function amend(obj, props, val, descriptor, staticType, setter) {

    /** @type {boolean} */
    var isArr;
    /** @type {!Array} */
    var args;
    /** @type {number} */
    var len;

    if ( !is.obj(obj) ) throw _error.type('obj');

    if ( is.str(props) ) props = _splitKeys(props);

    if ( !is.obj(props) ) throw _error.type('props');

    isArr = is.arr(props);
    len = arguments.length;

    if (isArr && len < 3) throw _error('No val defined');

    if (!isArr && len > 2) {
      setter = staticType;
      staticType = descriptor;
      descriptor = val;
      val = undefined;
      ++len; // increase len for a valid _parseProps call
    }

    if (len === 4 || len === 5) {
      args = _parseProps(len, descriptor, staticType, setter);
      descriptor = args[0];
      staticType = args[1];
      setter = args[2];
    }

    if ( !is('!obj=', descriptor) ) throw _error.type('descriptor');
    if ( !is('str=',  staticType) ) throw _error.type('staticType');
    if ( !is('func=', setter)     ) throw _error.type('setter');

    if (staticType) {
      if ( isArr && !is(staticType + '=', val) ) {
        throw _error('The val param is not a valid staticType');
      }
      if ( !isArr && !_staticTypeCheckProps(staticType, props) ) {
        throw _error('A props value was not a valid staticType');
      }
    }

    return _amendProps(obj, props, val, descriptor, staticType, setter);
  }

  /**
   * A shortcut for Object.defineProperties that only updates the descriptors of
   *   existing properties.
   * @public
   * @param {!Object} obj
   * @param {!(Object<string, !Object>|Array<string>|string)} props - Details
   *   for the props param are as follows (per props type):
   *   - object: Must be "propName => propDescriptor" pairs.
   *   - array:  An array of key names to update.
   *   - string: Converted to an array of key names. Use this list of chars for
   *     the separator (chars listed in order of rank):  ", "  ","  "|"  " "
   * @param {!Object=} descriptor - Only use (and required) if an array or
   *   string of keys is given for the props param.
   * @return {!Object}
   */
  amend.config = function amendConfig(obj, props, descriptor) {

    if ( !is.obj(obj) ) throw _error.type('obj', 'config');

    if ( is.str(props) ) props = _splitKeys(props);

    if ( !is.obj(props) ) throw _error.type('props', 'config');

    if ( is.arr(props) ) {
      if ( !is.obj(descriptor) ) throw _error.type('descriptor', 'config');
      props = _setupConfigs(props, descriptor);
    }

    if ( !_hasKeys(obj, props) ) {
      throw _error('A given prop was not defined in the obj', 'config');
    }

    return _amendConfigs(obj, props);
  };

  /**
   * A shortcut for Object.defineProperty.
   * @public
   * @param {!Object} obj
   * @param {string} key
   * @param {*=} val - A val is required if a descriptor is not supplied.
   * @param {!Object=} descriptor - [default= {
   *     writable: true,
   *     enumerable: true,
   *     configurable: true
   *   }]
   * @param {string=} staticType - If defined the new property is assigned
   *   an accessor descriptor that includes a setter that throws an error if the
   *   new property value fails an [is main function]{@link https://github.com/imaginate/are/blob/master/docs/is-main-func.md}
   *   type test. The setter is as follows:
   *     ```
   *     prop.set = function setter(newVal) {
   *       if ( !is(staticType, newVal) ) {
   *         throw new TypeError("Invalid type for object property value.");
   *       }
   *       value = newVal;
   *     };
   *     ```
   * @param {function(*, *): *=} setter - If defined the new property is
   *   assigned an accessor descriptor that includes a setter that sets the
   *   property to the value returned by this setter method. The setter method
   *   will receive two params, the new value and the current value. If a
   *   staticType is defined this setter will not get called until the new value
   *   passes the type test.
   * @return {!Object}
   */
  amend.property = function amendProperty(obj, key, val, descriptor, staticType, setter) {

    /** @type {!Array} */
    var args;
    /** @type {number} */
    var len;

    if ( !is.obj(obj) ) throw _error.type('obj', 'property');
    if ( !is.str(key) ) throw _error.type('key', 'property');

    len = arguments.length;

    if (len < 3) throw _error('No val or descriptor defined', 'property');

    if (len > 2 && len < 6) {
      args = _parseProp(len, val, descriptor, staticType, setter);
      val = args[0];
      descriptor = args[1];
      staticType = args[2];
      setter = args[3];
    }

    if ( !is('!obj=', descriptor) ) throw _error.type('descriptor', 'property');
    if ( !is('str=',  staticType) ) throw _error.type('staticType', 'property');
    if ( !is('func=', setter)     ) throw _error.type('setter',     'property');

    if ( staticType && !is(staticType + '=', val) ) {
      throw _error('The val param is not a valid staticType', 'property');
    }
    if ( descriptor && (staticType || setter) && _own(descriptor, 'writable') ){
      throw _error(
        'A data descriptor may not be used with a staticType/setter', 'property'
      );
    }

    return _amendProp(obj, key, val, descriptor, staticType, setter);
  };
  // define shorthand
  amend.prop = amend.property;

  /**
   * A shortcut for Object.defineProperty that only updates the descriptor of an
   *   existing property.
   * @public
   * @param {!Object} obj
   * @param {string} key
   * @param {!Object} descriptor
   * @return {!Object}
   */
  amend.property.config = function amendPropertyConfig(obj, key, descriptor) {

    if ( !is.obj(obj)       ) throw _error.type('obj',       'property.config');
    if ( !is.str(key)       ) throw _error.type('key',       'property.config');
    if ( !is.obj(descriptor)) throw _error.type('descriptor','property.config');

    if ( !_own(obj, key) ) {
      throw _error('The key was not defined in the obj', 'property.config');
    }

    return _amendConfig(obj, key, descriptor);
  };
  // define shorthand
  amend.prop.config = amend.property.config;

  /**
   * A shortcut for Object.defineProperties that includes easier property
   *   assignment, static type assignment, and more flexible default descriptor
   *   options.
   * @public
   * @param {!Object} obj
   * @param {!(Object<string, *>|Array<string>|string)} props - The details for
   *   the props param are as follows (per props type):
   *   object: Defined as "propName => propVal" or "propName => propDescriptor".
   *   array:  An array of key names to define.
   *   string: Converted to an array of key names to define. Use the following
   *     list of chars for the separator (chars listed in order of rank):
   *     ", "  ","  "|"  " "
   * @param {*=} val - Only use (and required) if an array or string of keys is
   *   given for the props param. This param defines the value assigned for all
   *   keys regardless of descriptor type.
   * @param {!Object=} descriptor - The default descriptor values for each prop.
   *   [default= { writable: true, enumerable: true, configurable: true }]
   * @param {string=} staticType - If defined all new properties are assigned
   *   an accessor descriptor (unless assigned a data descriptor in the props
   *   param) that includes a setter (unless assigned a setter in the props
   *   param) that throws an error if the new property value fails an
   *   [is main function]{@link https://github.com/imaginate/are/blob/master/docs/is-main-func.md}
   *   type test. The setter is as follows:
   *     ```
   *     prop.set = function setter(newVal) {
   *       if ( !is(staticType, newVal) ) {
   *         throw new TypeError("Invalid type for object property value.");
   *       }
   *       value = newVal;
   *     };
   *     ```
   * @param {function(*, *): *=} setter - If defined all new properties are
   *   assigned an accessor descriptor (unless assigned a data descriptor in the
   *   props param) that includes a setter (unless assigned a setter in the
   *   props param) that sets the property to the value returned by this setter.
   *   Note that this setter function will receive two params, the new value and
   *   the current value. Also note that if the staticType param is defined this
   *   setter will not get called until the new value passes the type test.
   * @return {!Object}
   */
  amend.properties = function amendProperties(obj, props, val, descriptor, staticType, setter) {

    /** @type {boolean} */
    var isArr;
    /** @type {!Array} */
    var args;
    /** @type {number} */
    var len;

    if ( !is.obj(obj) ) throw _error.type('obj', 'properties');

    if ( is.str(props) ) props = _splitKeys(props);

    if ( !is.obj(props) ) throw _error.type('props', 'properties');

    isArr = is.arr(props);
    len = arguments.length;

    if (isArr && len < 3) throw _error('No val defined', 'properties');

    if (!isArr && len > 2) {
      setter = staticType;
      staticType = descriptor;
      descriptor = val;
      val = undefined;
      ++len; // increase len for a valid _parseProps call
    }

    if (len === 4 || len === 5) {
      args = _parseProps(len, descriptor, staticType, setter);
      descriptor = args[0];
      staticType = args[1];
      setter = args[2];
    }

    if ( !is('!obj=', descriptor)) throw _error.type('descriptor','properties');
    if ( !is('str=',  staticType)) throw _error.type('staticType','properties');
    if ( !is('func=', setter)    ) throw _error.type('setter',    'properties');

    if (staticType) {
      if ( isArr && !is(staticType + '=', val) ) {
        throw _error('The val param is not a valid staticType', 'properties');
      }
      if ( !isArr && !_staticTypeCheckProps(staticType, props) ) {
        throw _error('A props value was not a valid staticType', 'properties');
      }
    }

    return _amendProps(obj, props, val, descriptor, staticType, setter);
  };
  // define shorthand
  amend.props = amend.properties;

  /**
   * A shortcut for Object.defineProperties that only updates the descriptors of
   *   existing properties.
   * @public
   * @param {!Object} obj
   * @param {!(Object<string, !Object>|Array<string>|string)} props - Details
   *   for the props param are as follows (per props type):
   *   - object: Must be "propName => propDescriptor" pairs.
   *   - array:  An array of key names to update.
   *   - string: Converted to an array of key names. Use this list of chars for
   *     the separator (chars listed in order of rank):  ", "  ","  "|"  " "
   * @param {!Object=} descriptor - Only use (and required) if an array or
   *   string of keys is given for the props param.
   * @return {!Object}
   */
  amend.properties.config = function amendPropertiesConfig(obj, props, descriptor) {

    if ( !is.obj(obj) ) throw _error.type('obj', 'properties.config');

    if ( is.str(props) ) props = _splitKeys(props);

    if ( !is.obj(props) ) throw _error.type('props', 'properties.config');

    if ( is.arr(props) ) {
      if ( !is.obj(descriptor) ) {
        throw _error.type('descriptor', 'properties.config');
      }
      props = _setupConfigs(props, descriptor);
    }

    if ( !_hasKeys(obj, props) ) {
      throw _error(
        'A given prop was not defined in the obj', 'properties.config'
      );
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
   * @param {string=} staticType
   * @param {function(*, *): *=} setter
   * @return {!Array}
   */
  function _parseProp(len, val, descriptor, staticType, setter) {

    switch (len) {
      case 4:
      if ( is.str(descriptor) ) {
        staticType = descriptor;
        descriptor = undefined;
      }
      else if ( is.func(descriptor) ) {
        setter = descriptor;
        descriptor = undefined;
      }
      break;
      case 5:
      if ( is.func(staticType) ) {
        setter = staticType;
        staticType = undefined;
        if ( is.str(descriptor) ) {
          staticType = descriptor;
          descriptor = undefined;
        }
      }
    }

    if ( is.obj(val) && _isDescriptor(val) ) {
      descriptor = val;
      val = descriptor.value;
    }

    return [ val, descriptor, staticType, setter ];
  }

  /**
   * @private
   * @param {number} len
   * @param {!Object=} descriptor
   * @param {string=} staticType
   * @param {function(*, *): *=} setter
   * @return {!Array}
   */
  function _parseProps(len, descriptor, staticType, setter) {

    switch (len) {
      case 4:
      if ( is.str(descriptor) ) {
        staticType = descriptor;
        descriptor = undefined;
      }
      else if ( is.func(descriptor) ) {
        setter = descriptor;
        descriptor = undefined;
      }
      break;
      case 5:
      if ( is.func(staticType) ) {
        setter = staticType;
        staticType = undefined;
        if ( is.str(descriptor) ) {
          staticType = descriptor;
          descriptor = undefined;
        }
      }
    }

    return [ descriptor, staticType, setter ];
  }

  /**
   * @private
   * @param {string} staticType
   * @param {!Object} props
   * @return {boolean}
   */
  function _staticTypeCheckProps(staticType, props) {

    /** @type {string} */
    var key;
    /** @type {*} */
    var val;

    staticType += '=';
    for (key in props) {
      if ( _own(props, key) ) {
        val = props[key];
        if ( is.obj(val) && _isDescriptor(val) ) {
          if ( _own(val, 'writable') ) continue;
          val = val.value;
        }
        if ( !is(staticType, val) ) return false;
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
   * @param {string=} staticType
   * @param {function=} setter
   * @return {!Object}
   */
  function _amendProp(obj, key, val, descriptor, staticType, setter) {

    descriptor = descriptor || null;
    descriptor = _getDescriptor(descriptor, !!staticType || !!setter);
    staticType = _getStaticType(staticType);

    descriptor = staticType || setter
      ? _setupDescriptorByKeyWithSetter(val, descriptor, staticType, setter)
      : _isAccessor(descriptor)
        ? _cloneObj(descriptor)
        : _setupDescriptorByKey(val, descriptor);

    return _ObjectDefineProperty(obj, key, descriptor);
  }

  /**
   * @private
   * @param {!Object} obj
   * @param {!Object} props
   * @param {*} val
   * @param {!Object=} descriptor
   * @param {string=} staticType
   * @param {function=} setter
   * @return {!Object}
   */
  function _amendProps(obj, props, val, descriptor, staticType, setter) {

    descriptor = descriptor || null;
    descriptor = _getDescriptor(descriptor, !!staticType || !!setter);
    staticType = _getStaticType(staticType);
    props = is.arr(props)
      ? staticType || setter
        ? _setupPropsByKeyWithSetter(props, val, descriptor, staticType, setter)
        : _setupPropsByKey(props, val, descriptor)
      : staticType || setter
        ? _setupPropsWithSetter(props, descriptor, staticType, setter)
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
      if ( _own(props, key) ) {
        newProps[key] = _setupDescriptor(props[key], descriptor);
      }
    }
    return newProps;
  }

  /**
   * @private
   * @param {!Object} props
   * @param {!Object} descriptor
   * @param {function} staticType
   * @param {function} setter
   * @return {!Object}
   */
  function _setupPropsWithSetter(props, descriptor, staticType, setter) {

    /** @type {!Object} */
    var newProps;
    /** @type {string} */
    var key;

    newProps = {};
    for (key in props) {
      if ( _own(props, key) ) {
        newProps[key] = _setupDescriptorWithSetter(
          props[key], descriptor, staticType, setter
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
      ? function setupDesc(val, desc) { return _cloneObj(desc); }
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
   * @param {function} staticType
   * @param {function} setter
   * @return {!Object}
   */
  function _setupPropsByKeyWithSetter(keys, val, descriptor, staticType, setter) {

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
        val, descriptor, staticType, setter
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
  var INVALID_STATIC_TYPE = 'Invalid type for object property value.';

  /**
   * @private
   * @param {*} val
   * @param {!Object} descriptor
   * @return {!Object}
   */
  function _setupDescriptor(val, descriptor) {

    /** @type {!Object} */
    var prop;

    prop = _cloneObj(descriptor);
    val = _isDescriptor(val) ? val : { value: val };
    return _merge(prop, val);
  }

  /**
   * @private
   * @param {*} val
   * @param {!Object} descriptor
   * @param {function} staticType
   * @param {function} setter
   * @return {!Object}
   */
  function _setupDescriptorWithSetter(val, descriptor, staticType, setter) {

    /** @type {!Object} */
    var prop;

    prop = _cloneObj(descriptor);

    if ( _isDescriptor(val) ) {
      prop = _merge(prop, val);
      if ( _own(prop, 'writable') || _isAccessor(prop) ) return prop;
      val = prop.value;
      prop = _cloneAccessor(prop);
    }

    prop.get = function() { return val; };
    prop.set = staticType && setter
      ? function(newVal) {
          if ( !staticType(newVal) ) throw new TypeError(INVALID_STATIC_TYPE);
          val = setter(newVal, val);
        }
      : staticType
        ? function(newVal) {
            if ( !staticType(newVal) ) throw new TypeError(INVALID_STATIC_TYPE);
            val = newVal;
          }
        : function(newVal) { val = setter(newVal, val); };
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

    prop = _cloneObj(descriptor);
    prop.value = val;
    return prop;
  }

  /**
   * @private
   * @param {*} val
   * @param {!Object} descriptor
   * @param {function} staticType
   * @param {function} setter
   * @return {!Object}
   */
  function _setupDescriptorByKeyWithSetter(val, descriptor, staticType, setter) {

    /** @type {!Object} */
    var prop;

    prop = _cloneObj(descriptor);
    prop.get = function() { return val; };
    prop.set = staticType && setter
      ? function(newVal) {
          if ( !staticType(newVal) ) throw new TypeError(INVALID_STATIC_TYPE);
          val = setter(newVal, val);
        }
      : staticType
        ? function(newVal) {
            if ( !staticType(newVal) ) throw new TypeError(INVALID_STATIC_TYPE);
            val = newVal;
          }
        : function(newVal) { val = setter(newVal, val); };
    return prop;
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

    if ( !is.obj(obj) ) return false;

    for (key in obj) {
      if ( _own(obj, key) && !_own(DESCRIPTOR_PROPS, key) ) return false;
    }
    return true;
  }

  /**
   * @private
   * @param {Object} obj
   * @return {boolean}
   */
  function _isData(obj) {
    return _own(obj, 'value') || _own(obj, 'writable');
  }

  /**
   * @private
   * @param {Object} obj
   * @return {boolean}
   */
  function _isAccessor(obj) {
    return _own(obj, 'get') || _own(obj, 'set');
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
      if ( is.bool( descriptor.enumerable ) ) {
        defaultDescriptor.enumerable = descriptor.enumerable;
      }
      if ( is.bool( descriptor.configurable ) ) {
        defaultDescriptor.configurable = descriptor.configurable;
      }
      descriptor = defaultDescriptor;
    }

    defaultDescriptor = hasSetter || _isAccessor(descriptor)
      ? ACCESSOR_DESCRIPTOR
      : DATA_DESCRIPTOR;
    defaultDescriptor = _cloneObj(defaultDescriptor);

    return _merge(defaultDescriptor, descriptor);
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
      if ( _own(descriptor, key) && key !== 'value' ) {
        accessor[key] = descriptor[key];
      }
    }
    return accessor;
  }

  /**
   * @private
   * @param {string=} staticType
   * @return {(function|undefined)}
   */
  function _getStaticType(staticType) {
    return staticType && function staticTypeCheck(newVal) {
      return is(staticType, newVal);
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
      obj[key] = _own(descriptor, 'get') ? descriptor.get() : descriptor.value;
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
        if ( _own(props, key) ) {
          prop = props[key];
          obj[key] = _own(prop, 'get') ? prop.get() : prop.value;
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
      if ( _own(obj, key) && !_own(source, key) ) return false;
    }
    return true;
  }

  /**
   * @private
   * @type {!ErrorAid}
   */
  var _error = newErrorAid('amend');

  //////////////////////////////////////////////////////////
  // END OF PRIVATE SCOPE FOR AMEND
  return amend;
})();


module.exports = amend;
