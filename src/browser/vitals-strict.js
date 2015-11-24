/* are.js v0.1.1 (https://github.com/imaginate/are)
 * Copyright (c) 2015 Adam A Smith <adam@imaginate.life>
 * The Apache License (github.com/imaginate/are/blob/master/LICENSE.md) */
(function(k,d){function h(a,b){return"object"===a||!b&&"function"===a}function f(a,b){return(a=a&&b&&a.nodeType?!1:a)&&!b&&a.Object!==Object?!1:!!a}function q(a){a.is=l.is;a.Is=l.Is;a.are=l.are;a.Are=l.Are;return!0}var l=d(),t=h(typeof exports)&&f(exports,!0),a=h(typeof module)&&f(module,!0),b=h(typeof global,!0)&&f(global),r=h(typeof window)&&f(window),p=h(typeof self)&&f(self),u=h(typeof k)&&f(k);k=t&&a&&b?global:r&&window!==(k&&k.window)?window:p?self:u?k:Function("return this")();r&&q(window);
p&&q(self);q(k);t&&a&&(module.exports===exports?module.exports=l:q(exports));"function"===typeof define&&define.amd&&"object"===typeof define.amd&&define(function(){return l})})(this,function(k){function d(g,b){var c,e;b=1<b.length?b:b[0];if(!a._arr(b))throw Error("An are."+g+"(vals) call did not receive multiple vals to evaluate");c=a[g];for(e=b.length;e--;)if(!c(b[e]))return!1;return!0}function h(a,b,c){for(var e in b)b.hasOwnProperty(e)&&f(a,e,b[e],c)}function f(g,b,c,e){c=f.hasOwnProperty(g)?
f[g](c):c;e=!1!==e;v["_"+b]=function(g,b){b=a.bool(b)?b:e;return a.nil(g)?b:c(g)}}function q(a,b,c){var e;for(e=a.length;e--;)if(v[a[e]](b,c))return!0;return!1}function l(a){var b,c,e;b=a.toLowerCase().replace(m.all,"").split("|");for(e=b.length;e--;){c="_"+b[e];c=w.hasOwnProperty(c)?"_"+w[c]:c;if(!v.hasOwnProperty(c))return c;b[e]=c}m["="](a)&&b.push("_undefined");return b}function t(a){return(m["?"](a)?m["!"](a):!m["!"](a))?k:!m["!"](a)&&m["?"](a)}function a(g,b){var c,e;if(!a._str(g))throw new TypeError("An is(typeStr, val) call received a non-string typeStr param");
if(m["*"](g))return"*"!==g&&"any"!==g&&r&&console.log("Confusing is() Syntax: an asterisk should not be used with other data types as the check will pass regardless of the value's type"),!0;c=l(g);if(a.str(c))throw Error("Invalid is(typeStr, val) Call: invalid type in the typeStr param; invalid type => "+c);e=t(g);return q(c,b,e)}function b(g,b){var c,e;if(!a._str(g))throw new TypeError("An are(typeStr, vals) call received a non-string typeStr param");b=2<arguments.length?u.call(arguments,1):b;if(!a.arr(b))throw new TypeError("An are(typeStr, vals) call did not receive multiple vals to evaluate");
if(m["*"](g))return"*"!==g&&"any"!==g&&r&&console.log("Confusing are() Syntax: an asterisk should not be used with other data types as the check will pass regardless of the value's type"),!0;c=l(g);if(a.str(c))throw Error("Invalid are(typeStr, val) Call: invalid type in the typeStr param; invalid type => "+c);e=t(g);a:{var d=b,f;for(f=d.length;f--;)if(!q(c,d[f],e)){c=!1;break a}c=!0}return c}var r="object"===typeof console&&"function"===typeof console.log,p=Object.prototype.toString,u=Array.prototype.slice,
n=function(a,b,c){r&&console.log("Your JS engine does not support "+a+"."+b+"(). Use "+a+"."+c+"() instead.")};a.nil=function(a){return null===a};try{a["null"]=a.nil}catch(x){n("is","null","nil")}a.undefined=function(a){return"undefined"===typeof a};a.bool=function(a){return"boolean"===typeof a};try{a["boolean"]=a.bool}catch(y){n("is","boolean","bool")}a.string=function(a,b){return(!1!==b||!!a)&&"string"===typeof a};a.str=a.string;a._string=function(b){return a.string(b,!1)};a._str=a._string;a.number=
function(a,b){return(!1!==b||!!a)&&"number"===typeof a};a.num=a.number;a._number=function(b){return a.number(b,!1)};a._num=a._number;a.nan=function(a){return a!==a};a.object=function(a,b){return(a=!!a&&typeof a)&&("object"===a||!0===b&&"function"===a)};a.obj=a.object;a._object=function(b){return a.obj(b,!0)};a._obj=a._object;a.func=function(a){return!!a&&"function"===typeof a};a.fn=a.func;try{a["function"]=a.func}catch(z){n("is","function","func")}a.array=function(b,d){return(b=a.obj(b)&&p.call(b))&&
("[object Array]"===b||!0===d&&("[object Arguments]"===b||"callee"in b))};a.arr=function(b,d){return(b=a.obj(b)&&p.call(b))&&("[object Array]"===b||!0===d&&"[object Arguments]"===b)};try{a.array({},!0),a.arr=a.array}catch(A){a.array=a.arr}a._array=function(b){return a.arr(b,!0)};a._arr=a._array;a.regexp=function(b){return a.obj(b)&&"[object RegExp]"===p.call(b)};a.regex=a.regexp;a.args=function(b){return a.obj(b)&&("[object Arguments]"===p.call(b)||"callee"in b)};a._args=function(b){return a.obj(b)&&
"[object Arguments]"===p.call(b)};try{a.args({})}catch(B){a.args=a._args}try{a.arguments=a.args}catch(C){n("is","arguments","args")}a.document=function(b){return a.obj(b)&&9===b.nodeType};a.doc=a.document;a.element=function(b){return a.obj(b)&&1===b.nodeType};a.elem=a.element;a.empty=function(b){var d;if(!a._obj(b))return!b;if(a.arr(b)||a.func(b))return!b.length;for(d in b)if(b.hasOwnProperty(d))return!1;return!0};b.nil=function(){return d("null",arguments)};try{b["null"]=b.nil}catch(D){n("are","null",
"nil")}b.undefined=function(){return d("undefined",arguments)};b.bool=function(){return d("bool",arguments)};try{b["boolean"]=b.bool}catch(E){n("are","boolean","bool")}b.string=function(){return d("string",arguments)};b.str=b.string;b._string=function(){return d("_string",arguments)};b._str=b._string;b.number=function(){return d("number",arguments)};b.num=b.number;b._number=function(){return d("_number",arguments)};b._num=b._number;b.nan=function(){return d("nan",arguments)};b.object=function(){return d("object",
arguments)};b.obj=b.object;b._object=function(){return d("_object",arguments)};b._obj=b._object;b.func=function(){return d("func",arguments)};b.fn=b.func;try{b["function"]=b.func}catch(F){n("are","function","func")}b.array=function(){return d("array",arguments)};b.arr=b.array;b._array=function(){return d("_array",arguments)};b._arr=b._array;b.regexp=function(){return d("regexp",arguments)};b.regex=b.regexp;b.args=function(){return d("args",arguments)};try{b.arguments=b.args}catch(G){n("are","arguments",
"args")}b.document=function(){return d("document",arguments)};b.doc=b.document;b.element=function(){return d("element",arguments)};b.elem=b.element;b.empty=function(){return d("empty",arguments)};f.arrays=function(b){return function(d){var c;if(!a.arr(d))return!1;for(c=d.length;c--;)if(!b(d[c]))return!1;return!0}};f.maps=function(b){return function(d){var c;if(!a.obj(d))return!1;for(c in d)if(d.hasOwnProperty(c)&&!b(d[c]))return!1;return!0}};var v={};h("primitives",{undefined:a.undefined,"boolean":a.bool,
string:a.str,number:a.num,nan:a.nan},!1);f("primitives","null",a.nil);h("js_objects",{object:a.obj,regexp:a.regex,array:a.arr});f("js_objects","arguments",a.args);f("js_objects","function",a.func,!1);h("dom_objects",{element:a.elem,document:a.doc});f("others","empty",a.empty);h("arrays",{nulls:a.nil,booleans:a.bool,strings:a.str,numbers:a.num,nans:a.nan,objects:a.obj,functions:a.func,regexps:a.regex,arrays:a.arr,elements:a.elem,documents:a.doc});h("maps",{nullmap:a.nil,booleanmap:a.bool,stringmap:a.str,
numbermap:a.num,nanmap:a.nan,objectmap:a.obj,functionmap:a.func,regexpmap:a.regex,arraymap:a.arr,elementmap:a.elem,documentmap:a.doc});var w={_nil:"null",_bool:"boolean",_str:"string",_num:"number",_obj:"object",_func:"function",_fn:"function",_regex:"regexp",_arr:"array",_args:"arguments",_elem:"element",_doc:"document",_nils:"nulls",_strs:"strings",_nums:"numbers",_bools:"booleans",_objs:"objects",_funcs:"functions",_fns:"functions",_regexs:"regexps",_arrs:"arrays",_elems:"elements",_docs:"documents",
_nilmap:"nullmap",_strmap:"stringmap",_nummap:"numbermap",_boolmap:"booleanmap",_objmap:"objectmap",_funcmap:"functionmap",_fnmap:"functionmap",_regexmap:"regexpmap",_arrmap:"arraymap",_elemmap:"elementmap",_docmap:"documentmap"},m=function(a,b,c,d,f){return{"|":function(b){return a.test(b)},"!":function(a){return b.test(a)},"?":function(a){return c.test(a)},"=":function(a){return d.test(a)},"*":function(a){return f.test(a)},all:/[^a-z\|]/g}}(/\|/,/\!/,/\?/,/\=/,/\*|any/);return{is:a,Is:a,are:b,Are:b}});

/**
 * -----------------------------------------------------------------------------
 * VITALS JS - BROWSER VERSION - STRICT METHODS
 * -----------------------------------------------------------------------------
 * @file A JavaScript library of utility methods designed for elegance,
 *   performance, and reliability.
 * @version 2.0.0
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


////////////////////////////////////////////////////////////////////////////////
// EXPORT VITALS
////////////////////////////////////////////////////////////////////////////////

;(function(/** Object= */ root, /** !Object */ vitals) {

  /** @type {!Object} */
  var checks = {
    exp: isObj(typeof exports) && getObj(exports, true),
    mod: isObj(typeof module) && getObj(module, true),
    glo: isObj(typeof global, true) && getObj(global),
    win: isObj(typeof window) && getObj(window),
    sel: isObj(typeof self) && getObj(self),
    roo: isObj(typeof root) && getObj(root)
  };
  checks.glo = checks.exp && checks.mod && checks.glo;

  root = ( checks.glo ?
    global : checks.win && window !== (root && root.window) ?
      window : checks.sel ?
        self : checks.roo ?
          root : Function('return this')()
  );

  // window | self | global | this
  checks.win && setVitals(window);
  checks.sel && setVitals(self);
  setVitals(root);

  // exports
  if (checks.exp && checks.mod) {
    if (module.exports === exports) {
      module.exports = vitals;
    }
    else {
      setVitals(exports);
    }
  }

  // AMD
  if (typeof define === 'function' && define.amd &&
      typeof define.amd === 'object') {
    define(function() {
      return vitals;
    });
  }

  /**
   * @private
   * @param {string} typeOf
   * @param {boolean=} noFunc
   * @return {boolean}
   */
  function isObj(typeOf, noFunc) {
    return typeOf === 'object' || (!noFunc && typeOf === 'function');
  }

  /**
   * @private
   * @param {(Object|?function)} obj
   * @param {boolean=} testNodeType
   * @return {boolean}
   */
  function getObj(obj, testNodeType) {
    obj = obj && testNodeType && obj.nodeType ? false : obj;
    return obj && !testNodeType && obj.Object !== Object ? false : !!obj;
  }

  /**
   * @private
   * @param {!Object} obj
   */
  function setVitals(obj) {
    obj.vitals = vitals;
    obj.Vitals = vitals;
  }

})(this,

(function(undefined) {

  'use strict';


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
   *   an accessor descriptor that includes a setter that only sets the property
   *   if the new value passes an [is main function]{@link https://github.com/imaginate/are/blob/master/docs/is-main-func.md}
   *   type test. The setter is as follows:
   *     ```
   *     prop.set = function setter(newVal) {
   *       if ( is(staticType, newVal) ) {
   *         value = newVal;
   *       }
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

  //////////////////////////////////////////////////////////
  // PRIVATE PROPERTIES - DESCRIPTORS SETUP
  //////////////////////////////////////////////////////////

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
      ? function(newVal) { if ( staticType(newVal) ) val = setter(newVal,val); }
      : staticType
        ? function(newVal) { if ( staticType(newVal) ) val = newVal; }
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
      ? function(newVal) { if ( staticType(newVal) ) val = setter(newVal,val); }
      : staticType
        ? function(newVal) { if ( staticType(newVal) ) val = newVal; }
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
   *   static type assignment, and more flexible default descriptor options.
   *   Note that this method uses [vitals.amend]{@link https://github.com/imaginate/vitals/blob/master/src/methods/amend.js}
   *   for assigning properties to the new object. See [vitals.amend]{@link https://github.com/imaginate/vitals/blob/master/src/methods/amend.js}
   *   for documentation about the property params.
   * @public
   * @param {Object} proto
   * @param {!(Object<string, *>|Array<string>|string)} props
   * @param {*=} val
   * @param {!Object=} descriptor
   * @param {string=} staticType
   * @param {function(*, *): *=} setter
   * @return {!Object}
   */
  function create(proto, props, val, descriptor, staticType, setter) {

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
   *   static type assignment, and more flexible default descriptor options.
   *   Note that this method uses [vitals.amend]{@link https://github.com/imaginate/vitals/blob/master/src/methods/amend.js}
   *   for assigning properties to the new object. See [vitals.amend]{@link https://github.com/imaginate/vitals/blob/master/src/methods/amend.js}
   *   for documentation about the property params.
   * @public
   * @param {Object} proto
   * @param {!(Object<string, *>|Array<string>|string)} props
   * @param {*=} val
   * @param {!Object=} descriptor
   * @param {string=} staticType
   * @param {function(*, *): *=} setter
   * @return {!Object}
   */
  create.object = function createObject(proto, props, val, descriptor, staticType, setter) {

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

    if ( is.nil(obj) ) return null;

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

    if ( is.nil(obj) ) return null;

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

    if ( is.nil(obj) ) return null;

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

    if ( is.nil(obj) ) return null;

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

  return {
    amend:  amend,
    create: create,
    freeze: freeze,
    seal:   seal
  };
})() // close methods iife (do not add semicolon)
);   // close export iife
