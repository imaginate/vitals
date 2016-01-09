/**
 * -----------------------------------------------------------------------------
 * VITALS JS - NODE VERSION - STRICT METHODS
 * -----------------------------------------------------------------------------
 * @file A JavaScript library of utility methods designed for elegance,
 *   performance, and reliability.
 * @version 2.2.2
 * @see [vitals]{@link https://github.com/imaginate/vitals}
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

var is = require('node-are').is;


// *****************************************************************************
// PRIVATE HELPERS
// *****************************************************************************


////////////////////////////////////////////////////////////////////////////////
// PRIVATE HELPER - CLONE-OBJ
////////////////////////////////////////////////////////////////////////////////

/**
 * @param {!Object} obj
 * @return {!Object}
 */
function _cloneObj(obj) {
  return _merge({}, obj);
}

////////////////////////////////////////////////////////////////////////////////
// PRIVATE HELPER - ERROR-AID
////////////////////////////////////////////////////////////////////////////////

/**
 * @typedef {function(string, string=): !Error} ErrorAid
 */

/**
 * The ErrorAid constructor.
 * @param {string} vitalsMethod
 * @return {!ErrorAid}
 */
function newErrorAid(vitalsMethod) {

  /** @type {!ErrorAid} */
  var errorAid;

  vitalsMethod = 'vitals.' + vitalsMethod;

  /**
   * @param {string} msg
   * @param {string=} method
   * @return {!Error} 
   */
  errorAid = function error(msg, method) {
    method = method || '';
    method = vitalsMethod + ( method && '.' ) + method;
    return new Error(msg + ' for ' + method + ' call.');
  };

  /**
   * @param {string} param
   * @param {string=} method
   * @return {!TypeError} 
   */
  errorAid.type = function typeError(param, method) {
    param += ' param';
    method = method || '';
    method = vitalsMethod + ( method && '.' ) + method;
    return new TypeError('Invalid ' + param + ' in ' + method + ' call.');
  };

  /**
   * @param {string} param
   * @param {string=} valid
   * @param {string=} method
   * @return {!RangeError} 
   */
  errorAid.range = function rangeError(param, valid, method) {

    /** @type {string} */
    var msg;

    param += ' param';
    method = method || '';
    method = vitalsMethod + ( method && '.' ) + method;
    msg = 'The '+ param +' was out-of-range for a '+ method +' call.';
    msg += valid ? ' The valid options are: ' + valid : '';
    return new RangeError(msg);
  };

  return errorAid;
}

////////////////////////////////////////////////////////////////////////////////
// PRIVATE HELPER - IN-STR
////////////////////////////////////////////////////////////////////////////////

var _inStr = (function _inStrPrivateScope() {

  /**
   * A shortcut for String.prototype.includes.
   * @param {string} source
   * @param {*} str
   * @return {boolean}
   */
  function _inStr(source, str) {
    str = String(str);
    if (!source) return !str;
    if (!str) return true;
    return stringIncludes(source, str);
  }

  /**
   * @private
   * @param {string} source
   * @param {string} str
   * @return {boolean}
   */
  var stringIncludes = !!String.prototype.includes
    ? function stringIncludes(source, str) {
        return source.includes(str);
      }
    : function stringIncludes(source, str) {
        return source.indexOf(str) !== -1;
      };

  //////////////////////////////////////////////////////////
  // END OF PRIVATE SCOPE FOR IN-STR
  return _inStr;
})();


////////////////////////////////////////////////////////////////////////////////
// PRIVATE HELPER - MATCH
////////////////////////////////////////////////////////////////////////////////

/**
 * A shortcut for String.prototype.includes and RegExp.prototype.test.
 * @param {string} source
 * @param {*} pattern
 * @return {boolean}
 */
function _match(source, pattern) {
  return is.regex(pattern) ? pattern.test(source) : _inStr(source, pattern);
}

////////////////////////////////////////////////////////////////////////////////
// PRIVATE HELPER - MERGE
////////////////////////////////////////////////////////////////////////////////


/**
 * @param {!(Object|function)} dest
 * @param {!(Object|function)} source
 * @return {!(Object|function)}
 */
function _merge(dest, source, deep) {

  /** @type {string} */
  var key;

  for (key in source) {
    if ( _own(source, key) ) {
      dest[key] = source[key];
    }
  }
  return dest;
}

////////////////////////////////////////////////////////////////////////////////
// PRIVATE HELPER - OWN
////////////////////////////////////////////////////////////////////////////////

var _own = (function _ownPrivateScope() {

  /**
   * @param {?(Object|function)} source
   * @param {*} key
   * @return {boolean}
   */
  function _own(source, key) {
    return !!source && _hasOwnProperty.call(source, key);
  }

  /**
   * @private
   * @param {*} key
   * @return {boolean}
   */
  var _hasOwnProperty = Object.prototype.hasOwnProperty;

  //////////////////////////////////////////////////////////
  // END OF PRIVATE SCOPE FOR OWN
  return _own;
})();


////////////////////////////////////////////////////////////////////////////////
// PRIVATE HELPER - SLICE-ARR
////////////////////////////////////////////////////////////////////////////////

/**
 * @param {!(Object|function)} source
 * @param {number=} start - [default= 0]
 * @param {number=} end - [default= source.length]
 * @return {!Array}
 */
function _sliceArr(source, start, end) {

  /** @type {!Array} */
  var arr;
  /** @type {number} */
  var len;
  /** @type {number} */
  var ii;
  /** @type {number} */
  var i;

  len = source.length;
  start = start
    ? start < 0
      ? len + start
      : start
    : 0;
  start = start < 0 ? 0 : start;
  end = is.undefined(end) || end > len
    ? len
    : end < 0
      ? len + end
      : end;

  if (start >= end) return [];

  arr = new Array(end - start);
  ii = start - 1;
  i = 0;
  while (++ii < end) {
    arr[i++] = source[ii];
  }
  return arr;
}

////////////////////////////////////////////////////////////////////////////////
// PRIVATE HELPER - SPLIT-KEYS
////////////////////////////////////////////////////////////////////////////////

/**
 * @param {string} keys - One of the chars in the following list is used as
 *   the separator (chars listed in order of use):  ", "  ","  "|"  " "
 * @return {!Array<string>}
 */
function _splitKeys(keys) {

  /** @type {string} */
  var separator;

  separator = _inStr(keys, ', ')
    ? ', '  : _inStr(keys, ',')
      ? ',' : _inStr(keys, '|')
        ? '|' : ' ';
  return keys.split(separator);
}


// *****************************************************************************
// SECTION: STRICT METHODS
// *****************************************************************************


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
   *   assignment, strong type assignment, and more flexible default descriptor
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
   * @param {string=} strongType - If defined all new properties are assigned
   *   an accessor descriptor (unless assigned a data descriptor in the props
   *   param) that includes a setter (unless assigned a setter in the props
   *   param) that throws an error if the new property value fails an
   *   [is main function]{@link https://github.com/imaginate/are/blob/master/docs/is-main-func.md}
   *   type test. The setter is as follows:
   *     ```
   *     prop.set = function setter(newVal) {
   *       if ( !is(strongType, newVal) ) {
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
   *   the current value. Also note that if the strongType param is defined this
   *   setter will not get called until the new value passes the type test.
   * @return {!Object}
   */
  function amend(obj, props, val, descriptor, strongType, setter) {

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
   * @param {string=} strongType - If defined the new property is assigned
   *   an accessor descriptor that includes a setter that throws an error if the
   *   new property value fails an [is main function]{@link https://github.com/imaginate/are/blob/master/docs/is-main-func.md}
   *   type test. The setter is as follows:
   *     ```
   *     prop.set = function setter(newVal) {
   *       if ( !is(strongType, newVal) ) {
   *         throw new TypeError("Invalid type for object property value.");
   *       }
   *       value = newVal;
   *     };
   *     ```
   * @param {function(*, *): *=} setter - If defined the new property is
   *   assigned an accessor descriptor that includes a setter that sets the
   *   property to the value returned by this setter method. The setter method
   *   will receive two params, the new value and the current value. If a
   *   strongType is defined this setter will not get called until the new value
   *   passes the type test.
   * @return {!Object}
   */
  amend.property = function amendProperty(obj, key, val, descriptor, strongType, setter) {

    /** @type {!Array} */
    var args;
    /** @type {number} */
    var len;

    if ( !is.obj(obj) ) throw _error.type('obj', 'property');
    if ( !is.str(key) ) throw _error.type('key', 'property');

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
    if ( descriptor && (strongType || setter) && _own(descriptor, 'writable') ){
      throw _error(
        'A data descriptor may not be used with a strongType/setter', 'property'
      );
    }

    return _amendProp(obj, key, val, descriptor, strongType, setter);
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
   *   assignment, strong type assignment, and more flexible default descriptor
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
   * @param {string=} strongType - If defined all new properties are assigned
   *   an accessor descriptor (unless assigned a data descriptor in the props
   *   param) that includes a setter (unless assigned a setter in the props
   *   param) that throws an error if the new property value fails an
   *   [is main function]{@link https://github.com/imaginate/are/blob/master/docs/is-main-func.md}
   *   type test. The setter is as follows:
   *     ```
   *     prop.set = function setter(newVal) {
   *       if ( !is(strongType, newVal) ) {
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
   *   the current value. Also note that if the strongType param is defined this
   *   setter will not get called until the new value passes the type test.
   * @return {!Object}
   */
  amend.properties = function amendProperties(obj, props, val, descriptor, strongType, setter) {

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
   * @param {string=} strongType
   * @param {function(*, *): *=} setter
   * @return {!Array}
   */
  function _parseProp(len, val, descriptor, strongType, setter) {

    switch (len) {
      case 4:
      if ( is.str(descriptor) ) {
        strongType = descriptor;
        descriptor = undefined;
      }
      else if ( is.func(descriptor) ) {
        setter = descriptor;
        descriptor = undefined;
      }
      break;
      case 5:
      if ( is.func(strongType) ) {
        setter = strongType;
        strongType = undefined;
        if ( is.str(descriptor) ) {
          strongType = descriptor;
          descriptor = undefined;
        }
      }
    }

    if ( is.obj(val) && _isDescriptor(val) ) {
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
      if ( is.str(descriptor) ) {
        strongType = descriptor;
        descriptor = undefined;
      }
      else if ( is.func(descriptor) ) {
        setter = descriptor;
        descriptor = undefined;
      }
      break;
      case 5:
      if ( is.func(strongType) ) {
        setter = strongType;
        strongType = undefined;
        if ( is.str(descriptor) ) {
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
      if ( _own(props, key) ) {
        val = props[key];
        if ( is.obj(val) && _isDescriptor(val) ) {
          if ( _own(val, 'writable') ) continue;
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
   * @param {string=} strongType
   * @param {function=} setter
   * @return {!Object}
   */
  function _amendProps(obj, props, val, descriptor, strongType, setter) {

    descriptor = descriptor || null;
    descriptor = _getDescriptor(descriptor, !!strongType || !!setter);
    strongType = _getStrongType(strongType);
    props = is.arr(props)
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
      if ( _own(props, key) ) {
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

    prop = _cloneObj(descriptor);
    val = _isDescriptor(val) ? val : { value: val };
    return _merge(prop, val);
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

    prop = _cloneObj(descriptor);

    if ( _isDescriptor(val) ) {
      prop = _merge(prop, val);
      if ( _own(prop, 'writable') || _isAccessor(prop) ) return prop;
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

    prop = _cloneObj(descriptor);
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

    prop = _cloneObj(descriptor);
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


////////////////////////////////////////////////////////////////////////////////
// CREATE
////////////////////////////////////////////////////////////////////////////////

var create = (function createPrivateScope() {

  //////////////////////////////////////////////////////////
  // PUBLIC METHODS
  // - create
  // - create.object (create.obj)
  //////////////////////////////////////////////////////////

  /**
   * A shortcut for Object.create that includes easier property assignment,
   *   strong type assignment, and more flexible default descriptor options.
   *   Note that this method uses [vitals.amend]{@link https://github.com/imaginate/vitals/blob/master/src/methods/amend.js}
   *   for assigning properties to the new object. See [vitals.amend]{@link https://github.com/imaginate/vitals/blob/master/src/methods/amend.js}
   *   for documentation about the property params.
   * @public
   * @param {Object} proto
   * @param {!(Object<string, *>|Array<string>|string)} props
   * @param {*=} val
   * @param {!Object=} descriptor
   * @param {string=} strongType
   * @param {function(*, *): *=} setter
   * @return {!Object}
   */
  function create(proto, props, val, descriptor, strongType, setter) {

    /** @type {!Array} */
    var args;

    if ( !is('?obj', proto) ) throw _error.type('proto');

    if (arguments.length > 1) {
      args = _sliceArr(arguments);
      args[0] = _ObjectCreate(proto);
      return amend.apply(null, args);
    }

    return _ObjectCreate(proto);
  }

  /**
   * A shortcut for Object.create that includes easier property assignment,
   *   strong type assignment, and more flexible default descriptor options.
   *   Note that this method uses [vitals.amend]{@link https://github.com/imaginate/vitals/blob/master/src/methods/amend.js}
   *   for assigning properties to the new object. See [vitals.amend]{@link https://github.com/imaginate/vitals/blob/master/src/methods/amend.js}
   *   for documentation about the property params.
   * @public
   * @param {Object} proto
   * @param {!(Object<string, *>|Array<string>|string)} props
   * @param {*=} val
   * @param {!Object=} descriptor
   * @param {string=} strongType
   * @param {function(*, *): *=} setter
   * @return {!Object}
   */
  create.object = function createObject(proto, props, val, descriptor, strongType, setter) {

    /** @type {!Array} */
    var args;

    if ( !is('?obj', proto) ) throw _error.type('proto', 'object');

    if (arguments.length > 1) {
      args = _sliceArr(arguments);
      args[0] = _ObjectCreate(proto);
      return amend.apply(null, args);
    } 

    return _ObjectCreate(proto);
  }
  // define shorthand
  create.obj = create.object;

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - OBJECT.CREATE POLYFILL
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @param {Object} proto
   * @return {!Object}
   */
  var _ObjectCreate = Object.create || function ObjectCreate(proto) {

    /** @type {!Object} */
    var obj;

    _Object.prototype = proto;
    obj = new _Object();
    _Object.prototype = null;
    return obj;
  };

  /**
   * @private
   * @constructor
   */
  function _Object(){}

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - GENERAL
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @type {!ErrorAid}
   */
  var _error = newErrorAid('create');

  //////////////////////////////////////////////////////////
  // END OF PRIVATE SCOPE FOR CREATE
  return create;
})();


////////////////////////////////////////////////////////////////////////////////
// FREEZE
////////////////////////////////////////////////////////////////////////////////

var freeze = (function freezePrivateScope() {

  //////////////////////////////////////////////////////////
  // PUBLIC METHODS
  // - freeze
  // - freeze.object (freeze.obj)
  //////////////////////////////////////////////////////////

  /**
   * Freezes an object with optional deep freeze.
   * @public
   * @param {?(Object|function)} obj
   * @param {boolean=} deep
   * @return {?(Object|function)}
   */
  function freeze(obj, deep) {

    if ( is.null(obj) ) return null;

    if ( !is._obj(obj)      ) throw _error.type('obj');
    if ( !is('bool=', deep) ) throw _error.type('deep');

    return deep ? _deepFreeze(obj) : _ObjectFreeze(obj);
  }

  /**
   * Freezes an object with optional deep freeze.
   * @public
   * @param {?(Object|function)} obj
   * @param {boolean=} deep
   * @return {?(Object|function)}
   */
  freeze.object = function freezeObject(obj, deep) {

    if ( is.null(obj) ) return null;

    if ( !is._obj(obj)      ) throw _error.type('obj',  'object');
    if ( !is('bool=', deep) ) throw _error.type('deep', 'object');

    return deep ? _deepFreeze(obj) : _ObjectFreeze(obj);
  };
  // define shorthand
  freeze.obj = freeze.object;

  //////////////////////////////////////////////////////////
  // PRIVATE PROPERTIES - MAIN
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @param {!(Object|function)} obj
   * @return {!(Object|function)}
   */
  function _deepFreeze(obj) {

    /** @type {string} */
    var key;

    for (key in obj) {
      if ( _own(obj, key) && is._obj( obj[key] ) ) {
        obj[key] = _deepFreeze( obj[key] );
      }
    }
    return _ObjectFreeze(obj);
  }

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - OBJECT.FREEZE POLYFILL
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @param {!(Object|function)} obj
   * @return {!(Object|function)}
   */
  var _ObjectFreeze = (function() {

    if (!Object.freeze) return function ObjectFreeze(obj) { return obj; };

    try {
      Object.freeze( function testObjectFreeze(){} );
    }
    catch (e) {
      return function ObjectFreeze(obj) {
        return is.func(obj) ? obj : Object.freeze(obj);
      };
    }

    return Object.freeze;
  })();

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - GENERAL
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @type {!ErrorAid}
   */
  var _error = newErrorAid('freeze');

  //////////////////////////////////////////////////////////
  // END OF PRIVATE SCOPE FOR FREEZE
  return freeze;
})();


////////////////////////////////////////////////////////////////////////////////
// SEAL
////////////////////////////////////////////////////////////////////////////////

var seal = (function sealPrivateScope() {

  //////////////////////////////////////////////////////////
  // PUBLIC METHODS
  // - seal
  // - seal.object (seal.obj)
  //////////////////////////////////////////////////////////

  /**
   * Seals an object with optional deep seal.
   * @public
   * @param {?(Object|function)} obj
   * @param {boolean=} deep
   * @return {?(Object|function)}
   */
  function seal(obj, deep) {

    if ( is.null(obj) ) return null;

    if ( !is._obj(obj)      ) throw _error.type('obj');
    if ( !is('bool=', deep) ) throw _error.type('deep');

    return deep ? _deepSeal(obj) : _seal(obj);
  }

  /**
   * Seals an object with optional deep seal.
   * @public
   * @param {?(Object|function)} obj
   * @param {boolean=} deep
   * @return {?(Object|function)}
   */
  seal.object = function sealObject(obj, deep) {

    if ( is.null(obj) ) return null;

    if ( !is._obj(obj)      ) throw _error.type('obj',  'seal');
    if ( !is('bool=', deep) ) throw _error.type('deep', 'seal');

    return deep ? _deepSeal(obj) : _seal(obj);
  };
  // define shorthand
  seal.obj = seal.object;

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - MAIN
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @param {!(Object|function)} obj
   * @return {!(Object|function)}
   */
  var _seal = !Object.seal
    ? function ObjectSeal(obj) { return obj; }
    : Object.seal;

  /**
   * @private
   * @param {?(Object|function)} obj
   * @return {?(Object|function)}
   */
  var _deepSeal = !Object.seal
    ? function _deepSeal(obj) { return obj; }
    : function _deepSeal(obj) {

      /** @type {string} */
      var key;
      /** @type {*} */
      var val;

      for (key in obj) {
        if ( _own(obj, key) ) {
          val = obj[key];
          if ( is._obj(val) ) {
            obj[key] = _deepSeal(val);
          }
        }
      }
      return _seal(obj);
    };

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - GENERAL
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @type {!ErrorAid}
   */
  var _error = newErrorAid('seal');

  //////////////////////////////////////////////////////////
  // END OF PRIVATE SCOPE FOR SEAL
  return seal;
})();



// *****************************************************************************
// SECTION: END
// *****************************************************************************

module.exports = {
  amend:  amend,
  create: create,
  freeze: freeze,
  seal:   seal
};
