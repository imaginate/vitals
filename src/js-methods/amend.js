/**
 * -----------------------------------------------------------------------------
 * VITALS - JS METHOD - AMEND
 * -----------------------------------------------------------------------------
 * @version 2.0.0
 * @see [vitals.amend]{@link https://github.com/imaginate/vitals/blob/master/src/js-methods/amend.js}
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

var makeErrorAid = require('./_error.js');
var is = require('node-are').is;
var has = require('./has.js');
var clone = require('./clone.js');


////////////////////////////////////////////////////////////////////////////////
// AMEND
////////////////////////////////////////////////////////////////////////////////

var amend = (function amendPrivateScope() {

  //////////////////////////////////////////////////////////
  // PUBLIC METHODS
  // - amend
  // - amend.property   (amend.prop)
  // - amend.properties (amend.props)
  //////////////////////////////////////////////////////////

  /**
   * A shortcut for Object.defineProperty and Object.defineProperties that
   *   includes easier property assignment, static type assignment, and more
   *   flexible default descriptor options.
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
   *   param) that only sets the property if the new value passes an
   *   [is main function]{@link https://github.com/imaginate/are/blob/master/docs/is-main-func.md}
   *   type test. The setter is as follows:
   *     ```
   *     prop.set = function setter(newVal) {
   *       if ( is(staticType, newVal) ) {
   *         value = newVal;
   *       }
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

    /** @type {!Array} */
    var args;
    /** @type {number} */
    var len;

    if ( !is.obj(obj) ) throw _error.type('obj');

    if ( is.str(props) ) props = _splitProps(props);

    if ( !is.obj(props) ) throw _error.type('props');

    len = arguments.length;

    if ( is.arr(props) ) {
      if (len < 3) throw _error('No val defined');
      if (len === 4 || len === 5) {
        args = _parseArgs(len - 1, descriptor, staticType, setter);
        descriptor = args[0];
        staticType = args[1];
        setter = args[2];
      }
      if ( staticType && !is(staticType, val) ) {
        throw _error('The val and staticType do not match');
      }
    }
    else if (len > 2) {
      setter = staticType;
      staticType = descriptor;
      descriptor = val;
      val = undefined;
      if (len === 3 || len === 4) {
        args = _parseArgs(len, descriptor, staticType, setter);
        descriptor = args[0];
        staticType = args[1];
        setter = args[2];
      }
    }

    if ( !is('!obj=', descriptor) ) throw _error.type('descriptor');
    if ( !is('str=',  staticType) ) throw _error.type('staticType');
    if ( !is('func=', setter)     ) throw _error.type('setter');

    return _amendProps(obj, props, val, descriptor, staticType, setter);
  }

  /**
   * A shortcut for Object.defineProperty.
   * @public
   * @param {!Object} obj
   * @param {string} key
   * @param {*=} val
   * @param {!Object} descriptor
   * @return {!Object}
   */
  amend.property = function amendProperty(obj, key, val, descriptor) {

    if ( !is.obj(obj) ) throw _error.type('obj', 'property');
    if ( !is.str(key) ) throw _error.type('key', 'property');

    if (arguments.length < 4) descriptor = val;

    if ( !is.obj(descriptor) ) throw _error.type('descriptor', 'property');

    if ( arguments.length > 3 && !_isAccessor(descriptor) ) {
      descriptor.value = val;
    }

    return _amendProp(obj, key, descriptor);
  };
  // define shorthand
  amend.prop = amend.property;

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
   *   param) that only sets the property if the new value passes an
   *   [is main function]{@link https://github.com/imaginate/are/blob/master/docs/is-main-func.md}
   *   type test. The setter is as follows:
   *     ```
   *     prop.set = function setter(newVal) {
   *       if ( is(staticType, newVal) ) {
   *         value = newVal;
   *       }
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
  amend.properties = function amendProperties(obj, props, val, descriptor,
                                                       staticType, setter) {

    /** @type {!Array} */
    var args;
    /** @type {number} */
    var len;

    if ( !is.obj(obj) ) throw _error.type('obj', 'properties');

    if ( is.str(props) ) props = _splitProps(props);

    if ( !is.obj(props) ) throw _error.type('props', 'properties');

    len = arguments.length;

    if ( is.arr(props) ) {
      if (len < 3) throw _error('No val defined', 'properties');
      if (len === 4 || len === 5) {
        args = _parseArgs(len - 1, descriptor, staticType, setter);
        descriptor = args[0];
        staticType = args[1];
        setter = args[2];
      }
      if ( staticType && !is(staticType, val) ) {
        throw _error('The val and staticType do not match', 'properties');
      }
    }
    else if (len > 2) {
      setter = staticType;
      staticType = descriptor;
      descriptor = val;
      val = undefined;
      if (len === 3 || len === 4) {
        args = _parseArgs(len, descriptor, staticType, setter);
        descriptor = args[0];
        staticType = args[1];
        setter = args[2];
      }
    }

    if ( !is('!obj=', descriptor)) throw _error.type('descriptor','properties');
    if ( !is('str=',  staticType)) throw _error.type('staticType','properties');
    if ( !is('func=', setter)    ) throw _error.type('setter',    'properties');

    return _amendProps(obj, props, val, descriptor, staticType, setter);
  };
  // define shorthand
  amend.props = amend.properties;

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - ARG PARSING
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @param {string} props - One of the chars in the following list is used as
   *   the separator (chars listed in order of use):  ", "  ","  "|"  " "
   * @return {!Array<string>}
   */
  function _splitProps(props) {
    return props.split(
      has(props, ', ')
        ? ', ' : has(props, ',')
          ? ',' : has(props, '|')
            ? '|' : ' '
    );
  }

  /**
   * @private
   * @param {number} len
   * @param {!Object=} descriptor
   * @param {string=} staticType
   * @param {function(*, *): *=} setter
   * @return {!Array}
   */
  function _parseArgs(len, descriptor, staticType, setter) {

    if (len === 3) {
      if ( is.str(descriptor) ) {
        staticType = descriptor;
        descriptor = undefined;
      }
      else if ( is.func(descriptor) ) {
        setter = descriptor;
        descriptor = undefined;
      }
    }
    else if (len === 4) {
      if ( is.func(staticType) ) {
        setter = staticType;
        if ( is.str(descriptor) ) {
          staticType = descriptor;
          descriptor = undefined;
        }
        else {
          staticType = undefined;
        }
      }
    }

    return [ descriptor, staticType, setter ];
  }

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - MAIN
  //////////////////////////////////////////////////////////

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

    descriptor = _getDescriptor(descriptor || null, !!staticType || !!setter);
    staticType = staticType && function typeCheckNewValue(val) {
      return is(staticType, val);
    };
    props = is.arr(props)
      ? staticType || setter
        ? _setupKeysWithSetter(props, val, descriptor, staticType, setter)
        : _setupKeys(props, val, descriptor)
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
  function _amendProp(obj, key, descriptor) {
    descriptor = _getDescriptor(descriptor);
    return _ObjectDefineProperty(obj, key, descriptor);
  }

  /**
   * @private
   * @param {!Array<string>} keys
   * @param {*} val
   * @param {!Object} descriptor
   * @return {!Object}
   */
  function _setupKeys(keys, val, descriptor) {

    /** @type {!Object} */
    var props;
    /** @type {string} */
    var key;
    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    props = {};
    len = keys.length;
    i = -1;
    while (++i < len) {
      key = keys[i];
      props[key] = clone.obj(descriptor);
      props[key].value = val;
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
  function _setupKeysWithSetter(keys, val, descriptor, staticType, setter) {

    /** @type {!Object} */
    var props;
    /** @type {string} */
    var key;
    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    props = {};
    len = keys.length;
    i = -1;
    while (++i < len) {
      key = keys[i];
      props[key] = _keyWithSetter(val, descriptor, staticType, setter);
    }
    return props;
  }

  /**
   * @private
   * @param {*} val
   * @param {!Object} descriptor
   * @param {function} staticType
   * @param {function} setter
   * @return {!Object}
   */
  function _keyWithSetter(val, descriptor, staticType, setter) {

    /** @type {!Object} */
    var prop;

    prop = clone.obj(descriptor);
    prop.get = function() { return val; };
    prop.set = staticType && setter
      ? function(newVal) { if ( staticType(newVal) ) val = setter(newVal,val); }
      : staticType
        ? function(newVal) { if ( staticType(newVal) ) val = newVal; }
        : function(newVal) { val = setter(newVal, val); };
    return prop;
  }

  /**
   * @private
   * @param {!Object} props
   * @param {!Object} descriptor
   * @return {!Object}
   */
  function _setupProps(props, descriptor) {

    /** @type {string} */
    var key;

    for (key in props) {
      if ( _own(props, key) ) {
        props[key] = _prop(key, props[key], descriptor);
      }
    }
    return props;
  }

  /**
   * @private
   * @param {string} key
   * @param {*} val
   * @param {!Object} descriptor
   * @return {!Object}
   */
  function _prop(key, val, descriptor) {

    /** @type {!Object} */
    var prop;

    prop = clone.obj(descriptor);

    if ( _isDescriptor(val) ) {
      prop = _merge(prop, val);
    }
    else {
      prop.value = val;
    }

    return prop;
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

    /** @type {string} */
    var key;
    /** @type {*} */
    var val;

    for (key in props) {
      if ( _own(props, key) ) {
        val = props[key];
        props[key] = _propWithSetter(key, val, descriptor, staticType, setter);
      }
    }
    return props;
  }

  /**
   * @private
   * @param {string} key
   * @param {*} val
   * @param {!Object} descriptor
   * @param {function} staticType
   * @param {function} setter
   * @return {!Object}
   */
  function _propWithSetter(key, val, descriptor, staticType, setter) {

    /** @type {!Object} */
    var prop;

    prop = clone.obj(descriptor);

    if ( _isDescriptor(val) ) {
      prop = _merge(prop, val);
      if ( _own(prop, 'writable') ) return prop;
      if ( _own(prop, 'value') ) {
        val = prop.value;
        delete prop.value;
      }
      else {
        val = undefined;
      }
    }

    prop.get = function() { return val; };
    prop.set = staticType && setter
      ? function(newVal) { if ( staticType(newVal) ) val = setter(newVal,val); }
      : staticType
        ? function(newVal) { if ( staticType(newVal) ) val = newVal; }
        : function(newVal) { val = setter(newVal, val); };
    return prop;
  }

  //////////////////////////////////////////////////////////
  // PRIVATE PROPERTIES - DESCRIPTORS
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
   * @param {Object} descriptor
   * @param {boolean=} hasSetter
   * @return {!Object}
   */
  function _getDescriptor(descriptor, hasSetter) {

    /** @type {!Object} */
    var defaultDescriptor;

    if ( hasSetter && _isData(descriptor) ) {
      defaultDescriptor = {};
      if ( _own(descriptor, 'enumerable') ) {
        defaultDescriptor.enumerable = descriptor.enumerable;
      }
      if ( _own(descriptor, 'configurable') ) {
        defaultDescriptor.configurable = descriptor.configurable;
      }
      descriptor = defaultDescriptor;
    }

    defaultDescriptor = hasSetter || _isAccessor(descriptor)
      ? ACCESSOR_DESCRIPTOR
      : DATA_DESCRIPTOR;
    defaultDescriptor = clone.obj(defaultDescriptor);

    return _merge(defaultDescriptor, descriptor);
  }

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
      if ( _own(obj, key) && _own(DESCRIPTOR_PROPS, key) ) return true;
    }
    return false;
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
   * @param {!(Object|function)} dest
   * @param {!(Object|function)} obj
   * @return {!(Object|function)}
   */
  function _merge(dest, obj) {

    /** @type {string} */
    var key;

    for (key in obj) {
      if ( _own(obj, key) ) {
        dest[key] = obj[key];
      }
    }
    return dest;
  }

  /**
   * @private
   * @param {?(Object|function)} obj
   * @param {*} key
   * @return {boolean}
   */
  var _own = has.key;

  /**
   * @private
   * @type {!ErrorAid}
   */
  var _error = makeErrorAid('amend');

  //////////////////////////////////////////////////////////
  // END OF PRIVATE SCOPE FOR AMEND
  return amend;
})();


module.exports = amend;
