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
 * VITALS JS - BROWSER VERSION - ALL JS METHODS
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
// PRIVATE HELPER - IN-ARR
////////////////////////////////////////////////////////////////////////////////

/**
 * @param {!Object} source
 * @param {*} val
 * @return {boolean}
 */
function _inArr(source, val) {

  /** @type {number} */
  var len;
  /** @type {number} */
  var i;

  len = source.length;
  i = -1;
  while (++i < len) {
    if (source[i] === val) return true;
  }
  return false;
}

////////////////////////////////////////////////////////////////////////////////
// PRIVATE HELPER - IN-OBJ
////////////////////////////////////////////////////////////////////////////////

/**
 * @param {!(Object|function)} source
 * @param {*} val
 * @return {boolean}
 */
function _inObj(source, val) {

  /** @type {string} */
  var key;

  for (key in source) {
    if ( _own(source, key) && source[key] === val ) return true;
  }
  return false;
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
// PRIVATE HELPER - SLICE-STR
////////////////////////////////////////////////////////////////////////////////

/**
 * @param {string} str
 * @param {number=} start - [default= 0]
 * @param {number=} end - [default= str.length]
 * @return {string}
 */
function _sliceStr(str, start, end) {

  /** @type {number} */
  var len;

  len = str.length;
  start = start
    ? start < 0
      ? len + start : start
    : 0;
  start = start < 0 ? 0 : start;
  end = end
    ? end > len
      ? len : end < 0
        ? len + end : end
    : 0;

  return start >= end ? '' : str.substring(start, end);
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
// SECTION: BASE JS METHODS
// *****************************************************************************


////////////////////////////////////////////////////////////////////////////////
// CLONE
////////////////////////////////////////////////////////////////////////////////

var clone = (function clonePrivateScope() {

  //////////////////////////////////////////////////////////
  // PUBLIC METHODS
  // - clone
  // - clone.object (clone.obj)
  // - clone.array  (clone.arr|clone.args)
  // - clone.regexp (clone.re|clone.regex)
  // - clone.func   (clone.fn|clone.function*)
  //
  // * Note that clone.function will fail in all ES3 browser
  //   environments and even some ES5. Use clone.func for
  //   compatibility with older browser environments.
  //////////////////////////////////////////////////////////

  /**
   * Returns a clone of the given value.
   * @public
   * @param {*} val
   * @param {boolean=} deep
   * @return {*}
   */
  function clone(val, deep) {

    if ( !is('bool=', deep) ) throw _error.type('deep');

    return !is._obj(val)
      ? val
      : is.func(val)
        ? _cloneFunc(val, deep)
        : is._arr(val)
          ? _cloneArr(val, deep)
          : is.regex(val)
            ? _cloneRegex(val)
            : _cloneObj(val, deep);  
  }

  /**
   * Creates a new object with the properties of the given object.
   * @public
   * @param {!Object} obj
   * @param {boolean=} deep
   * @return {!Object}
   */
  clone.object = function cloneObject(obj, deep) {

    if ( !is.obj(obj)       ) throw _error.type('obj',  'object');
    if ( !is('bool=', deep) ) throw _error.type('deep', 'object');

    return _cloneObj(obj, deep);
  };
  // define shorthand
  clone.obj = clone.object;

  /**
   * Creates a new array with the properties of the given object.
   * @public
   * @param {!Object} obj
   * @param {boolean=} deep
   * @return {!Array}
   */
  clone.array = function cloneArray(obj, deep) {

    if ( !is.obj(obj)        ) throw _error.type('obj',        'array');
    if ( !is.num(obj.length) ) throw _error.type('obj.length', 'array');
    if ( !is('bool=', deep)  ) throw _error.type('deep',       'array');

    return _cloneArr(obj, deep);
  };
  // define shorthand
  clone.arr = clone.array;
  clone.args = clone.array;

  /**
   * Creates a new RegExp from a given RegExp.
   * @public
   * @param {!RegExp} regex
   * @param {boolean=} forceGlobal
   * @return {!RegExp}
   */
  clone.regexp = function cloneRegexp(regex, forceGlobal) {

    if ( !is.regex(regex)          ) throw _error.type('regex',       'regexp');
    if ( !is('bool=', forceGlobal) ) throw _error.type('forceGlobal', 'regexp');

    return _cloneRegex(regex, forceGlobal);
  };
  // define shorthand
  clone.re = clone.regexp;
  clone.regex = clone.regexp;

  /**
   * Creates a new function with the properties of the given function. Use
   *   clone.func instead of clone.function in browser environments for
   *   compatibility.
   * @public
   * @param {function} func
   * @param {boolean=} deep
   * @return {function}
   */
  clone.func = function cloneFunction(func, deep) {

    if ( !is.func(func)     ) throw _error.type('func', 'function');
    if ( !is('bool=', deep) ) throw _error.type('deep', 'function');

    return _cloneFunc(func, deep);
  };
  // define shorthand
  try {
    clone.fn = clone.func;
    clone.function = clone.func;
  }
  catch (e) {}

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - MAIN
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @param {!Object} obj
   * @param {boolean=} deep
   * @return {!Object}
   */
  function _cloneObj(obj, deep) {
    return deep ? _mergeDeep({}, obj) : _merge({}, obj);
  }

  /**
   * @private
   * @param {!Object} obj
   * @param {boolean=} deep
   * @return {!Array}
   */
  function _cloneArr(obj, deep) {

    /** @type {!Array} */
    var arr;

    arr = new Array(obj.length);
    return deep ? _mergeDeep(arr, obj) : _merge(arr, obj);
  }

  /**
   * @private
   * @param {!RegExp} regex
   * @param {boolean=} forceGlobal
   * @return {!RegExp}
   */
  function _cloneRegex(regex, forceGlobal) {

    /** @type {string} */
    var source;
    /** @type {string} */
    var flags;

    source = _escape(regex.source);
    flags = _setupFlags(regex, forceGlobal);

    return flags ? new RegExp(source, flags) : new RegExp(source);
  }

  /**
   * @private
   * @param {function} func
   * @param {boolean=} deep
   * @return {function}
   */
  function _cloneFunc(func, deep) {

    /** @type {function} */
    var clonedFunc;

    clonedFunc = function clonedFunc() {
      return func.apply(null, arguments);
    };
    return deep ? _mergeDeep(clonedFunc, func) : _merge(clonedFunc, func);
  }

  //////////////////////////////////////////////////////////
  // PRIVATE PROPERTIES - CLONE.REGEXP
  //////////////////////////////////////////////////////////

  /**
   * Returns a properly escaped RegExp.prototype.source.
   * @private
   * @param {string} source
   * @return {string}
   */
  var _escape = (function() {

    /** @type {?RegExp} */
    var pattern = /\n/.source !== '\\n' ? /\\/g : null;

    return pattern
      ? function _escape(source) { return source.replace(pattern, '\\\\'); }
      : function _escape(source) { return source; };
  })();

  /**
   * @private
   * @type {!Object}
   * @const
   */
  var FLAGS = _merge({
    ignoreCase: 'i',
    multiline:  'm',
    global:     'g'
  }, 'sticky' in RegExp.prototype ? { sticky: 'y' } : null);

  /**
   * @private
   * @param {!RegExp} regex
   * @param {boolean=} forceGlobal
   * @return {string}
   */
  function _setupFlags(regex, forceGlobal) {

    /** @type {string} */
    var flags;
    /** @type {string} */
    var key;

    flags = '';
    for (key in FLAGS) {
      if ( _own(FLAGS, key) && regex[key] ) {
        flags += FLAGS[key];
      }
    }

    if ( is.undefined(forceGlobal) ) return flags;

    return _inStr(flags, 'g')
      ? forceGlobal
        ? flags
        : flags.replace('g', '')
      : forceGlobal
        ? flags + 'g'
        : flags;
  }

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - GENERAL
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @param {!(Object|function)} dest
   * @param {!(Object|function)} source
   * @return {!(Object|function)}
   */
  function _mergeDeep(dest, source) {

    /** @type {string} */
    var key;

    for (key in source) {
      if ( _own(source, key) ) {
        dest[key] = clone(source[key], true);
      }
    }
    return dest;
  }

  /**
   * @private
   * @type {!ErrorAid}
   */
  var _error = newErrorAid('clone');

  //////////////////////////////////////////////////////////
  // END OF PRIVATE SCOPE FOR CLONE
  return clone;
})();


////////////////////////////////////////////////////////////////////////////////
// CUT
////////////////////////////////////////////////////////////////////////////////

var cut = (function cutPrivateScope() {

  //////////////////////////////////////////////////////////
  // PUBLIC METHODS
  // - cut
  // - cut.property   (cut.prop)
  // - cut.key
  // - cut.index      (cut.i)
  // - cut.type
  // - cut.value      (cut.val)
  // - cut.pattern
  // - cut.properties (cut.props)
  // - cut.keys
  // - cut.indexes    (cut.ii)
  // - cut.values     (cut.vals)
  // - cut.patterns
  //////////////////////////////////////////////////////////

  /**
   * Removes properties from an object/array or patterns from a string
   *   and returns the amended source.
   * @public
   * @param {!(Object|function|Array|string)} source
   * @param {...*} vals - If only one val is provided and it is an array it is
   *   considered an array of vals. Details are as follows (per source type):
   *     object source:
   *       - leading val is RegExp: This method will delete all properties with
   *       keys that match each val. If any following vals are not a RegExp they
   *       are converted to a string.
   *       - leading val is string: This method will delete all properties where
   *       key === val. All vals are converted to a string.
   *       - leading val is function: The val is considered a filter function
   *       (i.e. if it returns false the property is deleted). It has the
   *       optional params - value, key, source. Note this method lazily clones
   *       the source based on the filter's [length property]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/length}
   *       (i.e. if you alter the source object within the filter ensure to
   *       define the filter's third param so you can safely assume all
   *       references to the source are its original values).
   *       - all other cases: This method will delete all properties where
   *       value === val. 
   *     array source:
   *       - all vals are numbers: This method will splice from the source each
   *       corresponding index.
   *       - leading val is function: The val is considered a filter function
   *       (i.e. if it returns false the property is spliced from the source).
   *       It has the optional params - value, index, source. Note this method
   *       lazily clones the source based on the filter's [length property]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/length}
   *       (i.e. if you alter the source object within the filter ensure to
   *       define the filter's third param so you can safely assume all
   *       references to the source are its original values).
   *       - all other cases: This method will splice from the source all
   *       properties where value === val.
   *     string source: All vals that are not a RegExp or string are converted
   *       to a string. Each matching substring is removed from the source.
   * @param {Object=} thisArg - If source is an object/array, val is a filter
   *   function, and thisArg is defined the filter is bound to its value.
   * @return {!(Object|function|Array|string)} The amended source.
   */
  function cut(source, vals, thisArg) {

    if (arguments.length < 2) throw _error('No val defined');

    if ( is.str(source) ) {
      vals = arguments.length > 2 ? _sliceArr(arguments, 1) : vals;
      return is.arr(vals)
        ? _cutPatterns(source, vals)
        : _cutPattern(source, vals);
    }

    if ( !is._obj(source) ) throw _error.type('source');

    source = is.args(source) ? _sliceArr(source) : source;

    if ( is.func(vals) ) {
      if ( !is('obj=', thisArg) ) throw _error.type('thisArg');
      return is.arr(source)
        ? _filterArr(source, vals, thisArg)
        : _filterObj(source, vals, thisArg);
    }

    vals = arguments.length > 2 ? _sliceArr(arguments, 1) : vals;
    return is.arr(vals) ? _cutProps(source, vals) : _cutProp(source, vals);
  }

  /**
   * Removes a property from an object/array and returns the object.
   * @public
   * @param {!(Object|function|Array)} source
   * @param {*} val - The details are as follows (per source type):
   *   object source:
   *     - val is RegExp: This method will delete all properties with a key that
   *     matches the val.
   *     - val is string: This method will delete all properties where
   *     key === val.
   *     - val is function: The val is considered a filter function (i.e. if it
   *     returns false the property is deleted). It has the optional params -
   *     value, key, source. Note this method lazily clones the source based on
   *     the filter's [length property]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/length}
   *     (i.e. if you alter the source object within the filter ensure to define
   *     the filter's third param so you can safely assume all references to the
   *     source are its original values).
   *     - all other cases: This method will delete all properties where
   *     value === val.
   *   array source:
   *     - val is number: This method will splice the index from the source.
   *     - val is function: The val is considered a filter function (i.e. if it
   *     returns false the property is spliced from the source). It has the
   *     optional params - value, index, source. Note this method lazily clones
   *     the source based on the filter's [length property]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/length}
   *     (i.e. if you alter the source object within the filter ensure to define
   *     the filter's third param so you can safely assume all references to the
   *     source are its original values).
   *     - all other cases: This method will splice from the source all
   *     properties where value === val.
   * @param {Object=} thisArg - If val is a filter function and thisArg is
   *   defined the filter is bound to its value.
   * @return {!(Object|function|Array)}
   */
  cut.property = function cutProperty(source, val, thisArg) {

    if ( !is._obj(source) ) throw _error.type('source', 'property');
    if (arguments.length < 2) throw _error('No val defined', 'property');

    source = is.args(source) ? _sliceArr(source) : source;

    if ( is.func(val) ) {
      if ( !is('obj=', thisArg) ) throw _error.type('thisArg', 'property');
      return is.arr(source)
        ? _filterArr(source, val, thisArg)
        : _filterObj(source, val, thisArg);
    }

    return _cutProp(source, val);
  };

  /**
   * Removes a property by key from an object and returns the object.
   * @public
   * @param {!(Object|function)} source
   * @param {*} key - If the key is not a string it is converted to a string.
   *   If the key exists in the source object it is deleted.
   * @return {!(Object|function)}
   */
  cut.key = function cutKey(source, key) {

    if ( !is._obj(source) ) throw _error.type('source', 'key');
    if (arguments.length < 2) throw _error('No key defined', 'key');

    return _cutKey(source, key);
  };

  /**
   * Removes a property by index from an array and returns the array. If an
   *   array-like object is supplied it is sliced before removing the property.
   * @public
   * @param {!(Object|function|Array)} source
   * @param {number} key - The index to remove.
   * @param {number=} toKey - If defined all indexes from key to toKey (but not
   *   including toKey) are removed.
   * @return {!Array}
   */
  cut.index = function cutIndex(source, key, toKey) {

    if ( !is._obj(source)       ) throw _error.type('source',        'index');
    if ( !is.num(source.length) ) throw _error.type('source.length', 'index');
    if ( !is.num(key)           ) throw _error.type('key',           'index');
    if ( !is('num=', toKey)     ) throw _error.type('toKey',         'index');

    source = is.arr(source) ? source : _sliceArr(source);
    return _cutIndex(source, key, toKey);
  };
  // define shorthand
  cut.i = cut.index;

  /**
   * Removes all properties from an object/array with a value that matches a
   *   given type and returns the object. This method uses the
   *   [is main function]{@link https://github.com/imaginate/are/blob/master/docs/is-main-func.md}
   *   from [are]{@link https://github.com/imaginate/are} to complete type
   *   checks.
   * @public
   * @param {!(Object|function|Array)} source
   * @param {string} type - The type to check for. Refer to the
   *   [is main function docs]{@link https://github.com/imaginate/are/blob/master/docs/is-main-func.md}
   *   for acceptable options.
   * @return {!(Object|function|Array)}
   */
  cut.type = function cutType(source, type) {

    if ( !is._obj(source) ) throw _error.type('source', 'type');
    if ( !is.str(type)    ) throw _error.type('type',   'type');

    source = is.args(source) ? _sliceArr(source) : source;
    return _cutType(source, type);
  };

  /**
   * Removes all properties from an object/array with a value and returns the
   *   object.
   * @public
   * @param {!(Object|function|Array)} source
   * @param {*} val
   * @return {!(Object|function|Array)}
   */
  cut.value = function cutValue(source, val) {

    if ( !is._obj(source) ) throw _error.type('source', 'value');
    if (arguments.length < 2) throw _error('No val defined', 'value');

    source = is.args(source) ? _sliceArr(source) : source;
    return _cutVal(source, val);
  };
  // define shorthand
  cut.val = cut.value;

  /**
   * Removes a pattern from a string and returns the amended string.
   * @public
   * @param {string} source
   * @param {*} pattern - If pattern is not a string or RegExp it is converted
   *   to a string.
   * @return {string}
   */
  cut.pattern = function cutPattern(source, pattern) {

    if ( !is.str(source) ) throw _error.type('source', 'pattern');
    if (arguments.length < 2) throw _error('No pattern defined', 'pattern');

    return _cutPattern(source, pattern);
  };

  /**
   * Removes properties from an object/array and returns the object. Note that
   *   the use of the word, "match", within vitals.cut.properties refers to
   *   [vitals.has.pattern]{@link https://github.com/imaginate/vitals/blob/master/src/methods/has.js}.
   * @public
   * @param {!(Object|function|Array)} source
   * @param {...*} vals - If only one val is provided and it is an array it is
   *   considered an array of vals. Details are as follows (per source type):
   *     object source:
   *       - leading val is RegExp: This method will delete all properties with
   *       keys that match each val. If any following vals are not a RegExp they
   *       are converted to a string.
   *       - leading val is string: This method will delete all properties where
   *       key === val. All vals are converted to a string.
   *       - all other cases: This method will delete all properties where
   *       value === val. 
   *     array source:
   *       - all vals are numbers: This method will splice from the source each
   *       corresponding index.
   *       - all other cases: This method will splice from the source all
   *       properties where value === val.
   * @return {!(Object|function|Array)}
   */
  cut.properties = function cutProperties(source, vals) {

    if ( !is._obj(source) ) throw _error.type('source', 'properties');
    if (arguments.length < 2) throw _error('No val defined', 'properties');

    source = is.args(source) ? _sliceArr(source) : source;
    vals = arguments.length > 2 ? _sliceArr(arguments, 1) : vals;
    return is.arr(vals) ? _cutProps(source, vals) : _cutProp(source, vals);
  };
  // define shorthand
  cut.props = cut.properties;

  /**
   * Removes properties by key from an object and returns the object.
   * @public
   * @param {!(Object|function)} source
   * @param {...*} keys - If only one key is provided and it is an array it is
   *   considered an array of keys. If a key is not a string it is converted to
   *   a string. If the key exists in the source object it is deleted.
   * @return {!(Object|function)}
   */
  cut.keys = function cutKeys(source, keys) {

    if ( !is._obj(source) ) throw _error.type('source', 'keys');
    if (arguments.length < 2) throw _error('No key defined', 'keys');

    keys = arguments.length > 2 ? _sliceArr(arguments, 1) : keys;
    return is.arr(keys) ? _cutKeys(source, keys) : _cutKey(source, keys);
  };

  /**
   * Removes properties by index from an array and returns the array. If an
   *   array-like object is supplied it is sliced before completing the cut.
   * @public
   * @param {!(Object|function|Array)} source
   * @param {...number} indexes - If only one index is provided and it is an
   *   array it is considered an array of indexes. The indexes to remove.
   * @return {!Array}
   */
  cut.indexes = function cutIndexes(source, indexes) {

    if ( !is._obj(source)       ) throw _error.type('source',        'indexes');
    if ( !is.num(source.length) ) throw _error.type('source.length', 'indexes');
    if (arguments.length < 2) throw _error('No index defined', 'indexes');

    source = is.arr(source) ? source : _sliceArr(source);
    indexes = arguments.length > 2 ? _sliceArr(arguments, 1) : indexes;

    if ( !is.arr(indexes) ) {
      if ( !is.num(indexes) ) throw _error.type('index', 'indexes');
      return _cutIndex(source, indexes);
    }

    if ( !is('!nums', indexes) ) throw _error.type('index', 'indexes');

    return _cutIndexes(source, indexes);
  };
  // define shorthand
  cut.ii = cut.indexes;

  /**
   * Removes all properties from an object/array with a value and returns the
   *   object.
   * @public
   * @param {!(Object|function|Array)} source
   * @param {...*} vals - If only one val is provided and it is an array it is
   *   considered an array of vals.
   * @return {!(Object|function|Array)}
   */
  cut.values = function cutValues(source, vals) {

    if ( !is._obj(source) ) throw _error.type('source', 'value');
    if (arguments.length < 2) throw _error('No val defined', 'value');

    source = is.args(source) ? _sliceArr(source) : source;
    vals = arguments.length > 2 ? _sliceArr(arguments, 1) : vals;
    return is.arr(vals) ? _cutVals(source, vals) : _cutVal(source, vals);
  };
  // define shorthand
  cut.vals = cut.values;

  /**
   * Removes patterns from a string and returns the amended string.
   * @public
   * @param {string} source
   * @param {...*} patterns - If only one pattern is provided and it is an array
   *   it is considered an array of patterns. If a pattern is not a string or
   *   RegExp it is converted to a string.
   * @return {string}
   */
  cut.patterns = function cutPatterns(source, patterns) {

    if ( !is.str(source) ) throw _error.type('source', 'patterns');
    if (arguments.length < 2) throw _error('No pattern defined', 'patterns');

    patterns = arguments.length > 2 ? _sliceArr(arguments, 1) : patterns;
    return is.arr(patterns)
      ? _cutPatterns(source, patterns)
      : _cutPattern(source, patterns);
  };

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - MAIN
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @param {!(Object|function|Array)} source
   * @param {*} val
   * @return {!(Object|function|Array)}
   */
  function _cutProp(source, val) {
    return is.arr(source)
      ? is.num(val)
        ? _spliceKey(source, val)
        : _spliceVal(source, val)
      : is('!str|regex', val)
        ? _deleteKey(source, val)
        : _deleteVal(source, val);
  }

  /**
   * @private
   * @param {!(Object|function|Array)} source
   * @param {!Array<*>} vals
   * @return {!(Object|function|Array)}
   */
  function _cutProps(source, vals) {
    return is.arr(source)
      ? is('nums', vals)
        ? _spliceKeys(source, vals)
        : _spliceVals(source, vals)
      : is('!str|regex', vals[0])
        ? _deleteKeys(source, vals)
        : _deleteVals(source, vals);
  }

  /**
   * @private
   * @param {!(Object|function)} source
   * @param {*} key
   * @return {!(Object|function)}
   */
  function _cutKey(source, key) {
    delete source[key];
    return source;
  }

  /**
   * @private
   * @param {!(Object|function)} source
   * @param {!Array} keys
   * @return {!(Object|function)}
   */
  function _cutKeys(source, keys) {

    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    len = keys.length;
    i = -1;
    while (++i < len) delete source[ keys[i] ];
    return source;
  }

  /**
   * @private
   * @param {!Array} source
   * @param {number} key
   * @param {number=} toKey
   * @return {!Array}
   */
  function _cutIndex(source, key, toKey) {

    /** @type {number} */
    var len;

    len = source.length;
    key = key < 0 ? len + key : key;

    if (key >= len) return source;

    if ( is.undefined(toKey) ) {
      if (key < 0) return source;
      source.splice(key, 1);
      return source;
    }

    key = key < 0 ? 0 : key;
    toKey = toKey > len
      ? len
      : toKey < 0
        ? len + toKey
        : toKey;

    if (key >= toKey) return source;

    source.splice(key, toKey - key);
    return source;
  }

  /**
   * @private
   * @param {!Array} source
   * @param {!Array<number>} keys
   * @return {!Array}
   */
  function _cutIndexes(source, keys) {
    return _spliceKeys(source, keys);
  }

  /**
   * @private
   * @param {!(Object|function|Array)} source
   * @param {string} type
   * @return {!(Object|function|Array)}
   */
  function _cutType(source, type) {
    return is.arr(source)
      ? _spliceValByType(source, type)
      : _deleteValByType(source, type);
  }

  /**
   * @private
   * @param {!(Object|function|Array)} source
   * @param {*} val
   * @return {!(Object|function|Array)}
   */
  function _cutVal(source, val) {
    return is.arr(source) ? _spliceVal(source, val) : _deleteVal(source, val);
  }

  /**
   * @private
   * @param {!(Object|function|Array)} source
   * @param {!Array<*>} vals
   * @return {!(Object|function|Array)}
   */
  function _cutVals(source, vals) {
    return is.arr(source)
      ? _spliceVals(source, vals)
      : _deleteVals(source, vals);
  }

  /**
   * @private
   * @param {string} source
   * @param {*} pattern
   * @return {string}
   */
  function _cutPattern(source, pattern) {
    pattern = is.regex(pattern) ? pattern : String(pattern);
    return source.replace(pattern, '');
  }

  /**
   * @private
   * @param {string} source
   * @param {!Array} patterns
   * @return {string}
   */
  function _cutPatterns(source, patterns) {

    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    len = patterns.length;
    i = -1;
    while (++i < len) {
      source = _cutPattern(source, patterns[i]);
    }
    return source;
  }

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - DELETE
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @param {!(Object|function)} source
   * @param {*} key
   * @param {boolean=} match
   * @return {!(Object|function)}
   */
  function _deleteKey(source, key, match) {

    /** @type {!RegExp} */
    var pattern;

    match = is.undefined(match) ? is.regex(key) : match;

    if (!match) {
      if ( _own(source, key) ) delete source[key];
      return source;
    }

    pattern = key;
    for (key in source) {
      if ( _own(source, key) && _match(key, pattern) ) {
        delete source[key];
      }
    }
    return source;
  }

  /**
   * @private
   * @param {!(Object|function)} source
   * @param {!Array} keys
   * @return {!(Object|function)}
   */
  function _deleteKeys(source, keys) {

    /** @type {boolean} */
    var match;
    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    match = is.regex( keys[0] );
    len = keys.length;
    i = -1;
    while (++i < len) {
      source = _deleteKey(source, keys[i], match);
    }
    return source;
  }

  /**
   * @private
   * @param {!(Object|function)} source
   * @param {*} val
   * @return {!(Object|function)}
   */
  function _deleteVal(source, val) {

    /** @type {string} */
    var key;

    for (key in source) {
      if ( _own(source, key) && source[key] === val ) {
        delete source[key];
      }
    }
    return source;
  }

  /**
   * @private
   * @param {!(Object|function)} source
   * @param {string} type
   * @return {!(Object|function)}
   */
  function _deleteValByType(source, type) {

    /** @type {string} */
    var key;

    for (key in source) {
      if ( _own(source, key) && is(type, source[key]) ) {
        delete source[key];
      }
    }
    return source;
  }

  /**
   * @private
   * @param {!(Object|function)} source
   * @param {!Array} vals
   * @return {!(Object|function)}
   */
  function _deleteVals(source, vals) {

    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    len = vals.length;
    i = -1;
    while (++i < len) {
      source = _deleteVal(source, vals[i]);
    }
    return source;
  }

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - SPLICE
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @param {!Array} source
   * @param {number} key
   * @return {!Array}
   */
  function _spliceKey(source, key) {

    /** @type {number} */
    var len;

    len = source.length;
    key = key < 0 ? len + key : key;

    if (key < 0 || key >= len) return source;

    source.splice(key, 1);
    return source;
  }

  /**
   * @private
   * @param {!Array} source
   * @param {!Array<number>} keys
   * @return {!Array}
   */
  function _spliceKeys(source, keys) {

    /** @type {!Object} */
    var sorted;
    /** @type {number} */
    var first;
    /** @type {number} */
    var count;
    /** @type {number} */
    var i;

    if (!source.length || !keys.length) return source;

    if (keys.length < 2) return _spliceKey(source, keys);

    sorted = _sortIndexes(keys, source.length);
    i = sorted.first.length;
    while (i--) {
      first = sorted.first[i];
      count = sorted.last[i] - first + 1;
      source.splice(first, count);
    }
    return source;
  }

  /**
   * @private
   * @param {!Array} source
   * @param {*} val
   * @return {!Array}
   */
  function _spliceVal(source, val) {

    /** @type {number} */
    var i;

    i = source.length;
    while (i--) {
      if (source[i] === val) source.splice(i, 1);
    }
    return source;
  }

  /**
   * @private
   * @param {!Array} source
   * @param {string} type
   * @return {!Array}
   */
  function _spliceValByType(source, type) {

    /** @type {number} */
    var i;

    i = source.length;
    while (i--) {
      if ( is(type, source[i]) ) source.splice(i, 1);
    }
    return source;
  }

  /**
   * @private
   * @param {!Array} source
   * @param {!Array} vals
   * @return {!Array}
   */
  function _spliceVals(source, vals) {

    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    len = vals.length;
    i = -1;
    while (++i < len) {
      source = _spliceVals(source, vals[i]);
    }
    return source;
  }

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - FILTER
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @param {!(Object|function)} source
   * @param {function} filter
   * @param {Object=} thisArg
   * @return {!(Object|function)}
   */
  function _filterObj(source, filter, thisArg) {

    /** @type {string} */
    var key;

    source = filter.length > 2 ? clone(source) : source;
    filter = is.undefined(thisArg) ? filter : _bind(filter, thisArg);
    switch (filter.length) {
      case 0:
      for (key in source) {
        if ( _own(source, key) && !filter() ) {
          delete source[key];
        }
      }
      break;
      case 1:
      for (key in source) {
        if ( _own(source, key) && !filter(source[key]) ) {
          delete source[key];
        }
      }
      break;
      case 2:
      for (key in source) {
        if ( _own(source, key) && !filter(source[key], key) ) {
          delete source[key];
        }
      }
      break;
      default:
      for (key in source) {
        if ( _own(source, key) && !filter(source[key], key, source) ) {
          delete source[key];
        }
      }
    }
    return source;
  }

  /**
   * @private
   * @param {!Array} source
   * @param {function} filter
   * @param {Object=} thisArg
   * @return {!Array}
   */
  function _filterArr(source, filter, thisArg) {

    /** @type {number} */
    var i;

    source = filter.length > 2 ? clone.arr(source) : source;
    filter = is.undefined(thisArg) ? filter : _bind(filter, thisArg);
    i = source.length;
    switch (filter.length) {
      case 0:  while (i--) filter() || source.splice(i, 1);              break;
      case 1:  while (i--) filter(source[i]) || source.splice(i, 1);     break;
      case 2:  while (i--) filter(source[i], i) || source.splice(i, 1);  break;
      default: while (i--) filter(source[i], i, source) || source.splice(i, 1);
    }
    return source;
  }

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - SORT
  //////////////////////////////////////////////////////////

  /**
   * @typedef {!{
   *   first: !Array<number>,
   *   last:  !Array<number>
   * }} SortedIndexes
   */

  /**
   * @private
   * @param {!Array<number>} indexes
   * @param {number} sourceLen
   * @return {!SortedIndexes}
   */
  var _sortIndexes = (function() {

    /**
     * @private
     * @param {!Array<number>} indexes
     * @param {number} sourceLen
     * @return {!SortedIndexes}
     */
    function sortIndexes(indexes, sourceLen) {

      /** @type {number} */
      var index;
      /** @type {number} */
      var len;
      /** @type {number} */
      var i;

      setup();

      len = indexes.length;
      i = 0;

      // push 1st index
      index = parse(indexes[i], sourceLen);
      while (index === -1 && ++i < len) {
        index = parse(indexes[i], sourceLen);
      }
      push(index);

      // push remaining indexes
      while (++i < len) {
        index = parse(indexes[i], sourceLen);
        if (index !== -1) sort(index, 0, last.length);
      }

      return result();
    }

    //////////////////////////////
    // SORT MEMBERS
    // - FIRST
    // - LAST

    /** @type {!Array<number>} */
    var first;
    /** @type {!Array<number>} */
    var last;

    //////////////////////////////
    // SORT METHODS
    // - SETUP
    // - RESULT
    // - PARSE
    // - PUSH
    // - UNSHIFT
    // - INSERT
    // - REMOVE
    // - SORT
    // - COMPARE PREV
    // - COMPARE NEXT

    /**
     * @private
     * @type {function}
     */
    function setup() {
      first = [];
      last  = [];
    }

    /**
     * @private
     * @return {!SortedIndexes}
     */
    function result() {
      return {
        first: first,
        last:  last
      };
    }

    /**
     * @private
     * @param {number} index
     * @param {number} len
     * @return {number} If invalid index is given -1 is returned.
     */
    function parse(index, len) {
      index = index < 0 ? len + index : index;
      return index < 0 || index >= len ? -1 : index;
    }

    /**
     * @private
     * @param {number} index
     */
    function push(index) {
      first.push(index);
      last.push(index);
    }

    /**
     * @private
     * @param {number} index
     */
    function unshift(index) {
      first.unshift(index);
      last.unshift(index);
    }

    /**
     * @private
     * @param {number} index
     * @param {number} pos
     */
    function insert(index, pos) {
      first.splice(pos, 0, index);
      last.splice(pos, 0, index);
    }

    /**
     * @private
     * @param {number} index
     * @param {number} pos
     */
    function remove(pos) {
      first.splice(pos, 1);
      last.splice(pos, 1);
    }

    /**
     * @private
     * @param {number} index
     * @param {number} left
     * @param {number} right
     */
    function sort(index, left, right) {

      /** @type {number} */
      var mid;
      /** @type {number} */
      var min;

      mid = (left + right) >>> 1;
      min = first[mid];
      if (index < min) comparePrev(index, left, mid);
      else if (index > last[mid]) compareNext(index, mid, right);
    }

    /**
     * @private
     * @param {number} index
     * @param {number} left
     * @param {number} mid
     */
    function comparePrev(index, left, mid) {

      /** @type {number} */
      var prev;
      /** @type {number} */
      var min;
      /** @type {number} */
      var max;

      min = first[mid];
      if (!mid) {
        if (index === --min) first[mid] = index;
        else unshift(index);
        return;
      }
      prev = mid - 1;
      max = last[prev];
      if (index === --min) {
        if (index === ++max) {
          last[prev] = last[mid];
          remove(mid);
        }
        else first[mid] = index;
      }
      else if (index > max) {
        if (index === ++max) last[prev] = index;
        else insert(index, mid);
      }
      else sort(index, left, prev);
    }

    /**
     * @private
     * @param {number} index
     * @param {number} mid
     * @param {number} right
     */
    function compareNext(index, mid, right) {

      /** @type {number} */
      var next;
      /** @type {number} */
      var min;
      /** @type {number} */
      var max;

      next = mid + 1;
      max = last[mid];
      if (next === last.length) {
        if (index === ++max) last[mid] = index;
        else push(index);
        return;
      }
      min = first[next];
      if (index === ++max) {
        if (index === --min) {
          last[mid] = last[next];
          remove(next);
        }
        else last[mid] = index;
      }
      else if (index < min) {
        if (index === --min) first[next] = index;
        else insert(index, next);
      }
      else sort(index, next, right);
    }

    // END OF INDEX SORT PRIVATE SCOPE
    return sortIndexes;
  })();

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - GENERAL
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @param {function} func
   * @param {Object} thisArg
   * @return {function} 
   */
  function _bind(func, thisArg) {
    switch (func.length) {
      case 0:
      return function filter() { func.call(thisArg); };
      case 1:
      return function filter(val) { func.call(thisArg, val); };
      case 2:
      return function filter(val, key) { func.call(thisArg, val, key); };
    }
    return function filter(val, key, obj) {
      func.call(thisArg, val, key, obj);
    };
  }

  /**
   * @private
   * @type {!ErrorAid}
   */
  var _error = newErrorAid('cut');

  //////////////////////////////////////////////////////////
  // END OF PRIVATE SCOPE FOR CUT
  return cut;
})();


////////////////////////////////////////////////////////////////////////////////
// EACH
////////////////////////////////////////////////////////////////////////////////

var each = (function eachPrivateScope() {

  //////////////////////////////////////////////////////////
  // PUBLIC METHODS
  // - each
  // - each.object (each.obj)
  // - each.array  (each.arr)
  // - each.cycle  (each.time)
  //////////////////////////////////////////////////////////

  /**
   * A shortcut for iterating over object maps and arrays or for invoking an
   *   action a set number of times. If iterating over an object note that this
   *   method lazily clones the object based on the iteratee's
   *   [length property]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/length}
   *   (i.e. if you alter the source object within the iteratee ensure to define
   *   the iteratee's third param to avoid accidental results).
   * @public
   * @param {!(Object|function|Array|number)} val
   * @param {function(*=, (string|number)=, !(Object|function|Array)=)} iteratee
   * @param {Object=} thisArg
   * @return {(Object|function|Array|undefined)}
   */
  function each(val, iteratee, thisArg) {

    if ( !is.func(iteratee)   ) throw _error.type('iteratee');
    if ( !is('obj=', thisArg) ) throw _error.type('thisArg');

    if ( is.num(val) ) {
      _eachCycle(val, iteratee, thisArg);
      return;
    }

    if ( !is._obj(val) ) throw _error.type('val');

    return is._arr(val)
      ? _eachArr(val, iteratee, thisArg)
      : _eachObj(val, iteratee, thisArg);
  }

  /**
   * A shortcut for iterating over object maps.
   * @public
   * @param {!(Object|function)} obj
   * @param {function(*=, string=, !(Object|function)=)} iteratee - The iteratee
   *   must be a function with the optional params - value, key, source. Note
   *   this method lazily clones the source based on the iteratee's
   *   [length property]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/length}
   *   (i.e. if you alter the source object within the iteratee ensure to define
   *   the iteratee's third param so you can safely assume all references to the
   *   source are its original values).
   * @param {Object=} thisArg
   * @return {!(Object|function)}
   */
  each.object = function eachObject(obj, iteratee, thisArg) {

    if ( !is._obj(obj)        ) throw _error.type('obj',      'object');
    if ( !is.func(iteratee)   ) throw _error.type('iteratee', 'object');
    if ( !is('obj=', thisArg) ) throw _error.type('thisArg',  'object');

    return _eachObj(obj, iteratee, thisArg);
  };
  // define shorthand
  each.obj = each.object;

  /**
   * A shortcut for iterating over array-like objects.
   * @public
   * @param {!(Object|function)} obj
   * @param {function(*=, number=, !Array=)} iteratee - The iteratee must be a
   *   function with the optional params - value, index, source. Note this
   *   method lazily slices the source based on the iteratee's [length property]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/length}
   *   (i.e. if you alter the source object within the iteratee ensure to define
   *   the iteratee's third param so you can safely assume all references to the
   *   source are its original values).
   * @param {Object=} thisArg
   * @return {!(Object|function|Array)}
   */
  each.array = function eachArray(obj, iteratee, thisArg) {

    if ( !is._obj(obj)        ) throw _error.type('obj',        'array');
    if ( !is.num(obj.length)  ) throw _error.type('obj.length', 'array');
    if ( !is.func(iteratee)   ) throw _error.type('iteratee',   'array');
    if ( !is('obj=', thisArg) ) throw _error.type('thisArg',    'array');

    return _eachArr(obj, iteratee, thisArg);
  };
  // define shorthand
  each.arr = each.array;

  /**
   * A shortcut for invoking an action a set number of times.
   * @public
   * @param {number} count
   * @param {function} action
   * @param {Object=} thisArg
   */
  each.cycle = function eachCycle(count, action, thisArg) {

    if ( !is.num(count)       ) throw _error.type('count',   'cycle');
    if ( !is.func(action)     ) throw _error.type('action',  'cycle');
    if ( !is('obj=', thisArg) ) throw _error.type('thisArg', 'cycle');

    _eachCycle(count, action, thisArg);
  };
  // define shorthand
  each.time = each.cycle;

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - MAIN
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @param {!(Object|function)} obj
   * @param {function(*, string=, !(Object|function)=)} iteratee
   * @param {Object=} thisArg
   * @return {!(Object|function)}
   */
  function _eachObj(obj, iteratee, thisArg) {

    /** @type {string} */
    var key;

    obj = iteratee.length > 2 ? clone(obj) : obj;
    iteratee = is.undefined(thisArg) ? iteratee : _bind(iteratee, thisArg);
    switch (iteratee.length) {
      case 0: for (key in obj) _own(obj, key) && iteratee();              break;
      case 1: for (key in obj) _own(obj, key) && iteratee(obj[key]);      break;
      case 2: for (key in obj) _own(obj, key) && iteratee(obj[key], key); break;
     default: for (key in obj) _own(obj, key) && iteratee(obj[key], key, obj);
    }
    return obj;
  }

  /**
   * @private
   * @param {!(Object|function)} obj
   * @param {function(*, number=, !Array=)} iteratee
   * @param {Object=} thisArg
   * @return {!(Object|function)}
   */
  function _eachArr(obj, iteratee, thisArg) {

    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    obj = iteratee.length > 2 ? clone.arr(obj) : obj;
    iteratee = is.undefined(thisArg) ? iteratee : _bind(iteratee, thisArg);
    len = obj.length;
    i = -1;
    switch (iteratee.length) {
      case 0:  while (++i < len) iteratee();             break;
      case 1:  while (++i < len) iteratee(obj[i]);       break;
      case 2:  while (++i < len) iteratee(obj[i], i);    break;
      default: while (++i < len) iteratee(obj[i], i, obj);
    }
    return obj;
  }

  /**
   * @private
   * @param {number} count
   * @param {function} action
   * @param {Object=} thisArg
   */
  function _eachCycle(count, action, thisArg) {
    action = is.undefined(thisArg) ? action : _bind(action, thisArg);
    while(count--) action();
  }

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - GENERAL
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @param {function} func
   * @param {Object} thisArg
   * @return {function} 
   */
  function _bind(func, thisArg) {
    switch (func.length) {
      case 0:
      return function iteratee() { func.call(thisArg); };
      case 1:
      return function iteratee(val) { func.call(thisArg, val); };
      case 2:
      return function iteratee(val, key) { func.call(thisArg, val, key); };
    }
    return function iteratee(val, key, obj) {
      func.call(thisArg, val, key, obj);
    };
  }

  /**
   * @private
   * @type {!ErrorAid}
   */
  var _error = newErrorAid('each');

  //////////////////////////////////////////////////////////
  // END OF PRIVATE SCOPE FOR EACH
  return each;
})();


////////////////////////////////////////////////////////////////////////////////
// FILL
////////////////////////////////////////////////////////////////////////////////

var fill = (function fillPrivateScope() {

  //////////////////////////////////////////////////////////
  // PUBLIC METHODS
  // - fill
  // - fill.object (fill.obj)
  // - fill.array  (fill.arr)
  // - fill.string (fill.str)
  //////////////////////////////////////////////////////////

  /**
   * Fills an array, object, or string with specified values.
   * @public
   * @param {?(Array|Object|function|number)} source - If source is a number
   *   returns a new string filled with the value x times.
   * @param {string=} keys - Only use with an object/function source. If
   *   provided it is converted to an array of keys to limit the object fill to.
   *   The chars in the following list can be used as the separator for keys in
   *   the string (chars listed in order of rank):  ", "  ","  "|"  " "
   * @param {*} val - The value to fill the array, object, or string with.
   * @param {number=} start - [default= 0] Only for fill.array.
   * @param {number=} end - [default= arr.length] Only for fill.array.
   * @return {?(Array|Object|function|string)}
   */
  function fill(source, keys, val, start, end) {

    if (arguments.length < 2) throw _error('No val defined');

    if ( is.nil(source) ) return null;

    if ( is.num(source) ) {
      val = keys;
      return _fillStr(source, val);
    }

    if ( !is._obj(source) ) throw _error.type('source');

    if ( is.arr(source) ) {
      end = start;
      start = val;
      val = keys;
      if ( !is('num=', start) ) throw _error.type('start');
      if ( !is('num=', end)   ) throw _error.type('end');
      return _fillArr(source, val, start, end);
    }

    if (arguments.length > 2) {
      if ( !is.str(keys) ) throw _error.type('keys');
      return _fillKeys(source, keys, val);
    }

    val = keys;
    return _fillObj(source, val);
  }

  /**
   * Fills an existing object/function with specified keys and values.
   * @public
   * @param {!(Object|function)} obj
   * @param {string=} keys - If provided it is converted to an array of keys to
   *   limit the object fill to. The chars in the following list can be used as
   *   the separator for keys in the string (chars listed in order of rank):
   *   ", "  ","  "|"  " "
   * @param {*} val
   * @return {!(Object|function)}
   */
  fill.object = function fillObject(obj, keys, val) {

    if ( !is._obj(obj) ) throw _error.type('obj', 'object');
    if (arguments.length < 2) throw _error('No val defined', 'object');

    if (arguments.length > 2) {
      if ( !is.str(keys) ) throw _error.type('keys', 'object');
      return _fillKeys(obj, keys, val);
    }

    val = keys;
    return _fillObj(obj, val);
  };
  // define shorthand
  fill.obj = fill.object;

  /**
   * Fills an existing or new array with specified values.
   * @public
   * @param {!(Array|number)} arr - If number makes new array with arr length.
   * @param {*} val
   * @param {number=} start - [default= 0]
   * @param {number=} end - [default= arr.length]
   * @return {!Array}
   */
  fill.array = function fillArray(arr, val, start, end) {

    arr = is.num(arr) ? new Array(arr) : arr;

    if (arguments.length < 2) throw _error('No val defined', 'array');

    if ( !is.arr(arr)       ) throw _error.type('arr',   'array');
    if ( !is('num=', start) ) throw _error.type('start', 'array');
    if ( !is('num=', end)   ) throw _error.type('end',   'array');

    return _fillArr(arr, val, start, end);
  };
  // define shorthand
  fill.arr = fill.array;

  /**
   * Fills a new string with specified values.
   * @public
   * @param {number} count
   * @param {*} val - Value converted to string via String(val).
   * @return {string}
   */
  fill.string = function fillString(count, val) {

    if ( !is.num(count) ) throw _error.type('count', 'string');
    if (arguments.length < 2) throw _error('No val defined', 'string');

    return _fillStr(count, val);
  };
  // define shorthand
  fill.str = fill.string;

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - MAIN
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @param {!(Object|function)} obj
   * @param {*} val
   * @return {!(Object|function)}
   */
  function _fillObj(obj, val) {

    /** @type {string} */
    var key;

    for (key in obj) {
      if ( _own(obj, key) ) {
        obj[key] = val;
      }
    }
    return obj;
  }

  /**
   * @private
   * @param {!(Object|function)} obj
   * @param {string} keys
   * @param {*} val
   * @return {!(Object|function)}
   */
  function _fillKeys(obj, keys, val) {

    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    keys = _splitKeys(keys);
    len = keys.length;
    i = -1;
    while (++i < len) {
      obj[ keys[i] ] = val;
    }
    return obj;
  }

  /**
   * @private
   * @param {!Array} arr
   * @param {*} val
   * @param {number=} start - [default= 0]
   * @param {number=} end - [default= arr.length]
   * @return {!Array}
   */
  function _fillArr(arr, val, start, end) {

    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    len = arr.length;
    start = start || 0;
    start = start < 0 ? len + start : start;
    start = start < 0 ? 0 : start;
    end = end || len;
    end = end > len
      ? len : end < 0
        ? len + end : end;

    if (start >= end) return arr;

    i = start - 1;
    while (++i < end) {
      arr[i] = val;
    }
    return arr;
  }

  /**
   * @private
   * @param {number} count
   * @param {*} val
   * @return {string}
   */
  function _fillStr(count, val) {

    /** @type {string} */
    var str;

    count = count < 0 ? 0 : count;

    if (!count) return '';

    val = String(val);
    str = '';
    while (count--) {
      str += val;
    }
    return str;
  }

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - GENERAL
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @type {!ErrorAid}
   */
  var _error = newErrorAid('fill');

  //////////////////////////////////////////////////////////
  // END OF PRIVATE SCOPE FOR FILL
  return fill;
})();


////////////////////////////////////////////////////////////////////////////////
// FUSE
////////////////////////////////////////////////////////////////////////////////

var fuse = (function fusePrivateScope() {

  //////////////////////////////////////////////////////////
  // PUBLIC METHODS
  // - fuse
  // - fuse.object (fuse.obj)
  // - fuse.array  (fuse.arr)
  // - fuse.string (fuse.str)
  //////////////////////////////////////////////////////////

  /**
   * Merges objects, concatenates arrays, appends properties, and combines
   *   strings.
   * @public
   * @param {!(Object|function|Array|string)} dest
   * @param {...*} vals - All rules occur in order of appearance. For object and
   *   array dest types null does not throw an exception (it is simply skipped).
   *   Remaining details per dest type:
   *     object: If only one val is provided and it is an array it is considered
   *       an array of vals. Object vals are merged with the dest. All other
   *       values are converted to strings and appended as new keys (if key
   *       exists on the dest the property's value is replaced with undefined).
   *     array: Array vals are concatenated to the dest. All other values are
   *       pushed to the dest.
   *     string: If only one val is provided and it is an array it is considered
   *       an array of vals. All non-string vals are converted to strings and
   *       appended to the dest.
   * @return {!(Object|function|Array|string)}
   */
  function fuse(dest, vals) {

    if (arguments.length < 2) throw _error('No val defined');

    if ( is.str(dest) ) {
      vals = arguments.length > 2 ? _sliceArr(arguments, 1) : vals;
      return is.arr(vals) ? _fuseStrs(dest, vals) : _fuseStr(dest, vals);
    }

    if ( !is._obj(dest) ) throw _error.type('dest');

    dest = is.args(dest) ? _sliceArr(dest) : dest;

    if ( is.arr(dest) ) {
      if (arguments.length > 2) {
        vals = _sliceArr(arguments, 1);
        return _fuseArrs(dest, vals);
      }
      return _fuseArr(dest, vals);
    }

    vals = arguments.length > 2 ? _sliceArr(arguments, 1) : vals;
    return is.arr(vals) ? _fuseObjs(dest, vals) : _fuseObj(dest, vals);
  }

  /**
   * Appends properties/keys to an object.
   * @public
   * @param {!(Object|function)} dest
   * @param {...*} vals - Any vals that are null do not throw exceptions (they
   *   are simply skipped). All other vals that are not objects are converted to
   *   a string and appended as new keys (if key exists on the dest the key's
   *   value is replaced with undefined). If only one val is provided and it is
   *   an array then it is considered an array of vals. All object vals are
   *   merged with the dest (if the key exists on the dest the key's value is
   *   with replaced with the value from the vals object).
   * @return {!(Object|function)}
   */
  fuse.object = function fuseObject(dest, vals) {

    if ( !is._obj(dest) ) throw _error.type('dest', 'object');
    if (arguments.length < 2) throw _error('No val defined', 'object');

    vals = arguments.length > 2 ? _sliceArr(arguments, 1) : vals;
    return is.arr(vals) ? _fuseObjs(dest, vals) : _fuseObj(dest, vals);
  };
  // define shorthand
  fuse.obj = fuse.object;

  /**
   * Appends values to an array and concatenates arrays.
   * @public
   * @param {!Array} dest
   * @param {...*} vals - Any vals that are null do not throw exceptions (they
   *   are simply skipped). All other non-array vals are pushed to the dest
   *   array. All array vals are concatenated to the dest.
   * @return {!Array}
   */
  fuse.array = function fuseArray(dest, vals) {

    if ( !is._arr(dest) ) throw _error.type('dest', 'array');
    if (arguments.length < 2) throw _error('No val defined', 'array');

    dest = is.args(dest) ? _sliceArr(dest) : dest;

    if (arguments.length > 2) {
      vals = _sliceArr(arguments, 1);
      return _fuseArrs(dest, vals);
    }

    return _fuseArr(dest, vals);
  };
  // define shorthand
  fuse.arr = fuse.array;

  /**
   * Appends strings to a string.
   * @public
   * @param {string} dest
   * @param {...*} vals - All non-string vals are converted to strings.
   * @return {string}
   */
  fuse.string = function fuseString(dest, vals) {

    if ( !is.str(dest) ) throw _error.type('dest', 'string');
    if (arguments.length < 2) throw _error('No val defined', 'string');

    vals = arguments.length > 2 ? _sliceArr(arguments, 1) : vals;
    return is.arr(vals) ? _fuseStrs(dest, vals) : _fuseStr(dest, vals);
  };
  // define shorthand
  fuse.str = fuse.string;

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - MAIN
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @param {!(Object|function)} dest
   * @param {*} val
   * @return {!(Object|function)}
   */
  function _fuseObj(dest, val) {
    if ( is._obj(val) ) return _merge(dest, val);
    if ( !is.nil(val) ) dest[val] = undefined;
    return dest;
  }

  /**
   * @private
   * @param {!(Object|function)} dest
   * @param {!Array<*>} vals
   * @return {!(Object|function)}
   */
  function _fuseObjs(dest, vals) {

    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    len = vals.length;
    i = -1;
    while (++i < len) {
      dest = _fuseObj(dest, vals[i]);
    }
    return dest;
  }

  /**
   * @private
   * @param {!Array} dest
   * @param {*} val
   * @return {!Array}
   */
  function _fuseArr(dest, val) {
    if ( is.arr(val) ) return dest.concat(val);
    if ( !is.nil(val) ) dest.push(val);
    return dest;
  }

  /**
   * @private
   * @param {!Array} dest
   * @param {!Array<*>} vals
   * @return {!Array}
   */
  function _fuseArrs(dest, vals) {

    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    len = vals.length;
    i = -1;
    while (++i < len) {
      dest = _fuseArr(dest, vals[i]);
    }
    return dest;
  }

  /**
   * @private
   * @param {string} dest
   * @param {*} val
   * @return {string}
   */
  function _fuseStr(dest, val) {
    return dest + val;
  }

  /**
   * @private
   * @param {string} dest
   * @param {!Array<*>} vals
   * @return {string}
   */
  function _fuseStrs(dest, vals) {

    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    len = vals.length;
    i = -1;
    while (++i < len) {
      dest += vals[i];
    }
    return dest;
  }

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - GENERAL
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @type {!ErrorAid}
   */
  var _error = newErrorAid('fuse');

  //////////////////////////////////////////////////////////
  // END OF PRIVATE SCOPE FOR FUSE
  return fuse;
})();


////////////////////////////////////////////////////////////////////////////////
// GET
////////////////////////////////////////////////////////////////////////////////

var get = (function getPrivateScope() {

  //////////////////////////////////////////////////////////
  // PUBLIC METHODS
  // - get
  // - get.keys
  // - get.keys.byKey
  // - get.keys.byValue (get.keys.byVal)
  // - get.indexes      (get.ii)
  // - get.values
  //////////////////////////////////////////////////////////

  /**
   * Gets keys, indexes, values, or substrings from an object, array, or string.
   *   Note that the use of the word, "match", within vitals.get refers to
   *   [vitals.has.pattern]{@link https://github.com/imaginate/vitals/blob/master/src/methods/has.js}.
   * @public
   * @param {?(Object|function|Array|string)} source - If no val param is
   *   defined this method will return the following values (per source type):
   *     object source: array of own keys
   *     array source:  array of indexes
   *     string source: an error (i.e. a val is required for string sources)
   * @param {*=} val - For a RegExp val and object/string source this method
   *   will return the following values (per source type):
   *     object source: an array of source values where the key matches the val
   *     string source: an array of substrings that match the val
   *   Otherwise this method will return the following values (per source type):
   *     object source: an array of source keys where the value === val
   *     array source:  an array of source indexes where the value === val
   *     string source: an array of starting indexes where the substring == val
   * @return {Array}
   */
  function get(source, val) {

    if ( is.nil(source) ) return null;

    if ( is.str(source) ) {
      if (arguments.length < 2) throw _error('No val defined');
      return is.regex(val) ? _strVals(source, val) : _strIndexes(source, val);
    }

    if ( !is._obj(source) ) throw _error.type('source');

    return arguments.length < 2
      ? is._arr(source)
        ? _allIndexes(source)
        : _allKeys(source)
      : is._arr(source)
        ? _byValIndexes(source, val)
        : is.regex(val)
          ? _byKeyObjVals(source, val)
          : _byValKeys(source, val);
  }

  /**
   * Gets an array of keys from an object. Note that the use of the word,
   *   "match", within vitals.get.keys refers to [vitals.has.pattern]{@link https://github.com/imaginate/vitals/blob/master/src/methods/has.js}.
   * @public
   * @param {!(Object|function)} source - If no val param is defined this method
   *   will return an array of all an object's own keys.
   * @param {*=} val - This method will return an array of source keys where the
   *   key matches the val if the val is a RegExp. Otherwise this method will
   *   return an array of source keys where the value === val.
   * @return {!Array}
   */
  get.keys = function getKeys(source, val) {

    if ( !is._obj(source) ) throw _error.type('source', 'keys');

    return arguments.length < 2
      ? allKeys(source)
      : is.regex(val)
        ? _byKeyKeys(source, val)
        : _byValKeys(source, val);
  };

  /**
   * Gets an array of keys from an object that match a pattern.
   * @see [vitals.has.pattern]{@link https://github.com/imaginate/vitals/blob/master/src/methods/has.js}.
   * @public
   * @param {!(Object|function)} source
   * @param {*} pattern - If pattern is not a RegExp or string it is converted
   *   to a string.
   * @return {!Array<string>}
   */
  get.keys.byKey = function getKeysByKey(source, pattern) {

    if ( !is._obj(source) ) throw _error.type('source', 'keys.byKey');
    if (arguments.length < 2) throw _error('No pattern defined', 'keys.byKey');

    return _byKeyKeys(source, pattern);
  };

  /**
   * Gets an array of keys from an object where the value === val.
   * @public
   * @param {!(Object|function)} source
   * @param {*} val
   * @return {!Array}
   */
  get.keys.byValue = function getKeysByValue(source, val) {

    if ( !is._obj(source) ) throw _error.type('source', 'keys.byValue');
    if (arguments.length < 2) throw _error('No val defined', 'keys.byValue');

    return _byValKeys(source, val);
  };
  // define shorthand
  get.keys.byVal = get.keys.byValue;

  /**
   * Gets an array of indexes from an array or string by value/pattern. Note
   *   that the use of the word, "match", within vitals.get.indexes refers to
   *   [vitals.has.pattern]{@link https://github.com/imaginate/vitals/blob/master/src/methods/has.js}.
   * @public
   * @param {!(Object|string)} source - If no val param is defined this method
   *   will return an array of all an array's indexes or throw an error if the
   *   source is a string.
   * @param {*=} val - If source is an array this method will return an array of
   *   indexes where the value === val. Otherwise if the source is a string the
   *   val is converted to a string if it is not a RegExp or string and an array
   *   of starting indexes that match the val are returned.
   * @return {!Array}
   */
  get.indexes = function getIndexes(source, val) {

    if ( is.str(source) ) {
      if (arguments.length < 2) throw _error('No val defined', 'indexes');
      return _strIndexes(source, val);
    }

    if ( !is._obj(source)       ) throw _error.type('source',        'indexes');
    if ( !is.num(source.length) ) throw _error.type('source.length', 'indexes');

    return arguments.length < 2
      ? _allIndexes(source)
      : _byValIndexes(source, val);
  };
  // define shorthand
  get.ii = get.indexes;

  /**
   * Gets an array of values/substrings from an object or string. Note that the
   *   use of the word, "match", within vitals.get.values refers to
   *   [vitals.has.pattern]{@link https://github.com/imaginate/vitals/blob/master/src/methods/has.js}.
   * @public
   * @param {!(Object|function|string)} source - If no val param is defined this
   *   method will return an array of all the object's values or an error if the
   *   source is a string.
   * @param {*=} val - If the val is not a RegExp or string it is converted to a
   *   string. This method will return the following values (per source type):
   *     object source: an array of source values where the key matches the val
   *     string source: an array of substrings that match the val
   * @return {!Array}
   */
  get.values = function getValues(source, val) {

    if ( is.str(source) ) {
      if (arguments.length < 2) throw _error('No val defined', 'values');
      return _strVals(source, val);
    }

    if ( !is._obj(source) ) throw _error.type('source', 'values');

    return arguments.length < 2
      ? _allObjVals(source)
      : _byKeyObjVals(source, val);
  };
  // define shorthand
  get.vals = get.values;

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - GET OBJECT DETAILS
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @param {!(Object|function)} obj
   * @return {!Array<string>}
   */
  function _allKeys(obj) {

    /** @type {!Array<string>} */
    var arr;
    /** @type {string} */
    var key;

    arr = [];
    for (key in obj) _own(obj, key) && arr.push(key);
    return arr;
  }

  /**
   * @private
   * @param {!(Object|function)} obj
   * @param {*} pattern
   * @return {!Array<string>}
   */
  function _byKeyKeys(obj, pattern) {

    /** @type {!Array<string>} */
    var arr;
    /** @type {string} */
    var key;

    pattern = is.regex(pattern) ? pattern : String(pattern);
    arr = [];
    for (key in obj) _own(obj, key) && _match(key, pattern) && arr.push(key);
    return arr;
  }

  /**
   * @private
   * @param {!(Object|function)} obj
   * @param {*} val
   * @return {!Array<string>}
   */
  function _byValKeys(obj, val) {

    /** @type {!Array<string>} */
    var arr;
    /** @type {string} */
    var key;

    arr = [];
    for (key in obj) _own(obj, key) && obj[key] === val && arr.push(key);
    return arr;
  }

  /**
   * @private
   * @param {!(Object|function)} obj
   * @return {!Array<*>}
   */
  function _allObjVals(obj) {

    /** @type {!Array<*>} */
    var arr;
    /** @type {string} */
    var key;

    arr = [];
    for (key in obj) _own(obj, key) && arr.push( obj[key] );
    return arr;
  }

  /**
   * @private
   * @param {!(Object|function)} obj
   * @param {*} pattern
   * @return {!Array<*>}
   */
  function _byKeyObjVals(obj, pattern) {

    /** @type {!Array<*>} */
    var arr;
    /** @type {string} */
    var key;

    pattern = is.regex(pattern) ? pattern : String(pattern);
    arr = [];
    for (key in obj) {
      _own(obj, key) && _match(key, pattern) && arr.push( obj[key] );
    }
    return arr;
  }

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - GET ARRAY DETAILS
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @param {!Object} obj
   * @return {!Array<number>}
   */
  function _allIndexes(obj) {

    /** @type {!Array<number>} */
    var arr;
    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    len = obj.length;
    arr = new Array(len);
    i = -1;
    while (++i < len) arr[i] = i;
    return arr;
  }

  /**
   * @private
   * @param {!Object} obj
   * @param {*} val
   * @return {!Array<number>}
   */
  function _byValIndexes(obj, val) {

    /** @type {!Array<number>} */
    var arr;
    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    len = obj.length;
    arr = [];
    i = -1;
    while (++i < len) obj[i] === val && arr.push(i);
    return arr;
  }

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - GET STRING DETAILS
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @param {string} str
   * @param {*} pattern
   * @return {!Array<number>}
   */
  function _strIndexes(str, pattern) {
    return _match(str, pattern)
      ? is.regex(pattern)
        ? _byRegexStrKeys(str, pattern)
        : _byStrStrKeys(str, pattern)
      : [];
  }

  /**
   * @private
   * @param {string} str
   * @param {*} pattern
   * @return {!Array<string>}
   */
  function _strVals(str, pattern) {
    return _match(str, pattern)
      ? is.regex(pattern)
        ? _byRegexStrVals(str, pattern)
        : _byStrStrVals(str, pattern)
      : [];
  }

  /**
   * @private
   * @param {string} str
   * @param {!RegExp} pattern
   * @return {!Array<number>}
   */
  function _byRegexStrKeys(str, pattern) {

    /** @type {!Array<number>} */
    var arr;
    /** @type {Object} */
    var obj;

    pattern = clone.regex(pattern, true);
    arr = [];
    obj = pattern.exec(str);
    while (obj) {
      arr.push(obj.index);
      obj = pattern.exec(str);
    }
    return arr;
  }

  /**
   * @private
   * @param {string} str
   * @param {*} pattern
   * @return {!Array<number>}
   */
  function _byStrStrKeys(str, pattern) {

    /** @type {!Array<number>} */
    var arr;
    /** @type {number} */
    var i;

    pattern = String(pattern);
    arr = [];
    i = str.indexOf(pattern);
    while (i !== -1) {
      arr.push(i);
      i = str.indexOf(pattern, ++i);
    }
    return arr;
  }

  /**
   * @private
   * @param {string} str
   * @param {!RegExp} pattern
   * @return {!Array<string>}
   */
  function _byRegexStrVals(str, pattern) {

    /** @type {!Array<string>} */
    var arr;
    /** @type {Object} */
    var obj;

    pattern = clone.regex(pattern, true);
    arr = [];
    obj = pattern.exec(str);
    while (obj) {
      arr.push( obj[0] );
      obj = pattern.exec(str);
    }
    return arr;
  }

  /**
   * @private
   * @param {string} str
   * @param {*} pattern
   * @return {!Array<string>}
   */
  function _byStrStrVals(str, pattern) {

    /** @type {!Array<string>} */
    var arr;
    /** @type {number} */
    var i;

    pattern = String(pattern);
    arr = [];
    i = str.indexOf(pattern);
    while (i !== -1) {
      arr.push(pattern);
      i = str.indexOf(pattern, ++i);
    }
    return arr;
  }

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - GENERAL
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @type {!ErrorAid}
   */
  var _error = newErrorAid('get');

  //////////////////////////////////////////////////////////
  // END OF PRIVATE SCOPE FOR GET
  return get;
})();


////////////////////////////////////////////////////////////////////////////////
// HAS
////////////////////////////////////////////////////////////////////////////////

var has = (function hasPrivateScope() {

  //////////////////////////////////////////////////////////
  // PUBLIC METHODS
  // - has
  // - has.key
  // - has.value     (has.val)
  // - has.pattern
  // - has.substring (has.substr)
  //////////////////////////////////////////////////////////

  /**
   * A shortcut for Object.prototype.hasOwnProperty (that accepts null),
   *   String.prototype.includes, RegExp.prototype.test, and
   *   Array.prototype.includes.
   * @public
   * @param {?(Object|function|string|Array)} source
   * @param {*} key - If source is a string the following two statements apply:
   *   For a RegExp key the source is tested for the RegExp pattern. Otherwise
   *   the source is searched for a substring of the string-converted key.
   *   If source is an array or arguments object the key is searched for in the
   *   object's indexed values.
   * @return {boolean}
   */
  function has(source, key) {

    if (arguments.length < 2) throw _error('No key defined');
    
    if ( is.nil(source) ) return false;

    if ( is.str(source) ) return _match(source, key);

    if ( !is._obj(source) ) throw _error.type('source');

    return is._arr(source) ? _inArr(source, key) : _own(source, key);
  }

  /**
   * A shortcut for Object.prototype.hasOwnProperty that accepts null.
   * @public
   * @param {?(Object|function)} source
   * @param {*} key
   * @return {boolean}
   */
  has.key = function hasKey(source, key) {

    if (arguments.length < 2) throw _error('No key defined', 'key');

    if ( is.nil(source) ) return false;

    if ( !is._obj(source) ) throw _error.type('source', 'key');

    return _own(source, key);
  };

  /**
   * A shortcut that checks for a value in an object.
   * @public
   * @param {?(Object|function)} source
   * @param {*} val
   * @return {boolean}
   */
  has.value = function hasValue(source, val) {

    if (arguments.length < 2) throw _error('No val defined', 'value');

    if ( is.nil(source) ) return false;

    if ( !is._obj(source) ) throw _error.type('source', 'value');

    return is._arr(source) ? _inArr(source, val) : _inObj(source, val);
  };
  // define shorthand
  has.val = has.value;

  /**
   * A shortcut for String.prototype.includes and RegExp.prototype.test.
   * @public
   * @param {string} source
   * @param {*} pattern
   * @return {boolean}
   */
  has.pattern = function hasPattern(source, pattern) {

    if ( !is.str(source) ) throw _error.type('source', 'pattern');
    if (arguments.length < 2) throw _error('No pattern defined', 'pattern');

    return _match(source, pattern);
  };

  /**
   * A shortcut for String.prototype.includes.
   * @public
   * @param {string} source
   * @param {*} str
   * @return {boolean}
   */
  has.substring = function hasSubstring(source, str) {

    if ( !is.str(source) ) throw _error.type('source', 'substring');
    if (arguments.length < 2) throw _error('No str defined', 'substring');

    return _inStr(source, str);
  };
  // define shorthand
  has.substr = has.substring;

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - GENERAL
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @type {!ErrorAid}
   */
  var _error = newErrorAid('has');

  //////////////////////////////////////////////////////////
  // END OF PRIVATE SCOPE FOR HAS
  return has;
})();


////////////////////////////////////////////////////////////////////////////////
// REMAP
////////////////////////////////////////////////////////////////////////////////

var remap = (function remapPrivateScope() {

  //////////////////////////////////////////////////////////
  // PUBLIC METHODS
  // - remap
  // - remap.object (remap.obj)
  // - remap.array  (remap.arr)
  // - remap.string (remap.str)
  //////////////////////////////////////////////////////////

  /**
   * A shortcut for making a new object/array/string by invoking an action over
   *   the values of an existing object/array/string.
   * @public
   * @param {!(Object|function|Array|string)} source
   * @param {*} iteratee - Details per source type:
   *   object source: The iteratee must be a function with the optional params
   *     value, key, source. Note this method lazily clones the source based on
   *     the iteratee's [length property]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/length}
   *     (i.e. if you alter the source object within the iteratee ensure to
   *     define the iteratee's third param so you can safely assume all
   *     references to the source are its original values).
   *   array source: The iteratee must be a function with the optional params
   *     value, index, source. Note this method lazily slices the source based
   *     on the iteratee's [length property]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/length}
   *     (i.e. if you alter the source object within the iteratee ensure to
   *     define the iteratee's third param so you can safely assume all
   *     references to the source are its original values).
   *   string source: The iteratee must be a pattern to search for within the
   *     source. If the pattern is not a string or RegExp it will be converted
   *     to a string.
   * @param {*=} replacement - Only use (and required) with string sources. If
   *   not a string or function the replacement is converted to a string. For
   *   details about using replacement functions see the
   *   [String.prototype.replace function param]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace#Specifying_a_function_as_a_parameter}.
   * @param {Object=} thisArg - If thisArg is supplied the iteratee or
   *   replacement function is bound to its value.
   * @return {!(Object|function|Array|string)}
   */
  function remap(source, iteratee, replacement, thisArg) {

    if ( is.str(source) ) {
      if (arguments.length < 2) throw _error('No iteratee defined');
      if (arguments.length < 3) throw _error('No replacement defined');
      if ( !is('obj=', thisArg) ) throw _error.type('thisArg');
      return _remapStr(source, iteratee, replacement, thisArg);
    }

    thisArg = replacement;

    if ( !is._obj(source)     ) throw _error.type('source');
    if ( !is.func(iteratee)   ) throw _error.type('iteratee');
    if ( !is('obj=', thisArg) ) throw _error.type('thisArg');

    return is._arr(source)
      ? _remapArr(source, iteratee, thisArg)
      : _remapObj(source, iteratee, thisArg);
  }

  /**
   * A shortcut for making a new object with the same keys and new values by
   *   invoking an action over the values of an existing object.
   * @public
   * @param {!(Object|function)} source
   * @param {function(*=, string=, !(Object|function)=)} iteratee - The iteratee
   *   must be a function with the optional params - value, key, source. Note
   *   this method lazily clones the source based on the iteratee's
   *   [length property]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/length}
   *   (i.e. if you alter the source object within the iteratee ensure to define
   *   the iteratee's third param so you can safely assume all references to the
   *   source are its original values).
   * @param {Object=} thisArg - If thisArg is supplied the iteratee is bound to
   *   its value.
   * @return {!Object} 
   */
  remap.object = function remapObject(source, iteratee, thisArg) {

    if ( !is._obj(source)     ) throw _error.type('source',   'object');
    if ( !is.func(iteratee)   ) throw _error.type('iteratee', 'object');
    if ( !is('obj=', thisArg) ) throw _error.type('thisArg',  'object');

    return _remapObj(source, iteratee, thisArg);
  };
  // define shorthand
  remap.obj = remap.object;

  /**
   * A shortcut for making a new array by invoking an action over the values of
   *   an existing array-like object.
   * @public
   * @param {!(Object|function)} source
   * @param {function(*=, number=, !Array=)=} iteratee - The iteratee must be a
   *   function with the optional params - value, index, source. Note this
   *   method lazily slices the source based on the iteratee's [length property]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/length}
   *   (i.e. if you alter the source object within the iteratee ensure to define
   *   the iteratee's third param so you can safely assume all references to the
   *   source are its original values).
   * @param {Object=} thisArg - If thisArg is supplied the iteratee is bound to
   *   its value.
   * @return {!Array}
   */
  remap.array = function remapArray(source, iteratee, thisArg) {

    if ( !is._obj(source)       ) throw _error.type('source',        'array');
    if ( !is.num(source.length) ) throw _error.type('source.length', 'array');
    if ( !is.func(iteratee)     ) throw _error.type('iteratee',      'array');
    if ( !is('obj=', thisArg)   ) throw _error.type('thisArg',       'array');

    return _remapArr(source, iteratee, thisArg);
  };
  // define shorthand
  remap.arr = remap.array;

  /**
   * A shortcut for [String.prototype.replace]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace}.
   * @public
   * @param {string} source
   * @param {*} pattern - If not a RegExp the pattern is converted to a string.
   * @param {*} replacement - If not a string or function the replacement is
   *   converted to a string. For details about using replacement functions see
   *   [String.prototype.replace function param]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace#Specifying_a_function_as_a_parameter}.
   * @param {Object=} thisArg - If thisArg is supplied the replacement function
   *   is bound to its value.
   * @return {string}
   */
  remap.string = function remapString(source, pattern, replacement, thisArg) {

    if (arguments.length < 2) throw _error('No pattern defined',     'string');
    if (arguments.length < 3) throw _error('No replacement defined', 'string');
    if ( !is.str(source)      ) throw _error.type('source',  'string');
    if ( !is('obj=', thisArg) ) throw _error.type('thisArg', 'string');

    return _remapStr(source, pattern, replacement, thisArg);
  };
  // define shorthand
  remap.str = remap.string;

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - MAIN
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @param {!(Object|function)} source
   * @param {function(*, string=, !(Object|function)=)=} iteratee
   * @param {Object=} thisArg
   * @return {!Object}
   */
  function _remapObj(source, iteratee, thisArg) {

    /** @type {!Object} */
    var obj;
    /** @type {string} */
    var key;

    obj = {};
    source = iteratee.length > 2 ? clone(source) : source;
    iteratee = is.undefined(thisArg) ? iteratee : _bindI(iteratee, thisArg);
    switch (iteratee.length) {
      case 0:
      for (key in source) {
        if ( _own(source, key) ) obj[key] = iteratee();
      }
      break;
      case 1:
      for (key in source) {
        if ( _own(source, key) ) obj[key] = iteratee(source[key]);
      }
      break;
      case 2:
      for (key in source) {
        if ( _own(source, key) ) obj[key] = iteratee(source[key], key);
      }
      break;
      default:
      for (key in source) {
        if ( _own(source, key) ) obj[key] = iteratee(source[key], key, source);
      }
    }
    return obj;
  }

  /**
   * @private
   * @param {!(Object|function)} source
   * @param {function(*, number=, !Array=)=} iteratee
   * @param {Object=} thisArg
   * @return {!Array}
   */
  function _remapArr(source, iteratee, thisArg) {

    /** @type {!Array} */
    var arr;
    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    source = iteratee.length > 2 ? clone.arr(source) : source;
    iteratee = is.undefined(thisArg) ? iteratee : _bindI(iteratee, thisArg);
    len = source.length;
    arr = new Array(len);
    i = -1;
    switch (iteratee.length) {
      case 0:  while (++i < len) arr[i] = iteratee();              break;
      case 1:  while (++i < len) arr[i] = iteratee(source[i]);     break;
      case 2:  while (++i < len) arr[i] = iteratee(source[i], i);  break;
      default: while (++i < len) arr[i] = iteratee(source[i], i, source);
    }
    return arr;
  }

  /**
   * @private
   * @param {string} source
   * @param {*} pattern
   * @param {*} replacement
   * @param {Object=} thisArg
   * @return {string}
   */
  function _remapStr(source, pattern, replacement, thisArg) {

    if (!source) return source;

    pattern = is.regex(pattern) ? pattern : String(pattern);
    replacement = is.func(replacement)
      ? is.undefined(thisArg)
        ? replacement
        : _bindR(replacement, thisArg)
      : String(replacement);

    return source.replace(pattern, replacement);
  }

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - GENERAL
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @param {function} func
   * @param {Object} thisArg
   * @return {function} 
   */
  function _bindI(func, thisArg) {
    switch (func.length) {
      case 0:
      return function iteratee() { func.call(thisArg); };
      case 1:
      return function iteratee(val) { func.call(thisArg, val); };
      case 2:
      return function iteratee(val, key) { func.call(thisArg, val, key); };
    }
    return function iteratee(val, key, obj) {
      func.call(thisArg, val, key, obj);
    };
  }

  /**
   * @private
   * @param {function} func
   * @param {Object} thisArg
   * @return {function} 
   */
  function _bindR(func, thisArg) {
    switch (func.length) {
      case 0: return function replacement() {
        func.call(thisArg);
      };
      case 1: return function replacement(match) {
        func.call(thisArg, match);
      };
      case 2: return function replacement(match, p1) {
        func.call(thisArg, match, p1);
      };
      case 3: return function replacement(match, p1, p2) {
        func.call(thisArg, match, p1, p2);
      };
      case 4: return function replacement(match, p1, p2, p3) {
        func.call(thisArg, match, p1, p2, p3);
      };
      case 5: return function replacement(match, p1, p2, p3, p4) {
        func.call(thisArg, match, p1, p2, p3, p4);
      };
    }
    return function replacement() {
      func.apply(thisArg, arguments);
    };
  }

  /**
   * @private
   * @type {!ErrorAid}
   */
  var _error = newErrorAid('remap');

  //////////////////////////////////////////////////////////
  // END OF PRIVATE SCOPE FOR REMAP
  return remap;
})();


////////////////////////////////////////////////////////////////////////////////
// SLICE
////////////////////////////////////////////////////////////////////////////////

var slice = (function slicePrivateScope() {

  //////////////////////////////////////////////////////////
  // PUBLIC METHODS
  // - slice
  // - slice.array  (slice.arr)
  // - slice.string (slice.str)
  //////////////////////////////////////////////////////////

  /**
   * A shortcut for Array.prototype.slice.call(obj, start, end) and
   *   String.prototype.slice(start, end).
   * @public
   * @param {?(Object|Array|function|string)} source
   * @param {number=} start - [default= 0]
   * @param {number=} end - [default= source.length]
   * @return {?(Array|string)}
   */
  function slice(source, start, end) {

    if ( !is('num=', start) ) throw _error.type('start');
    if ( !is('num=', end)   ) throw _error.type('end');

    if ( is.nil(source) ) return null;

    if ( is.str(source) ) return _sliceStr(source, start, end);

    if ( !is._obj(source)       ) throw _error.type('source');
    if ( !is.num(source.length) ) throw _error.type('source.length');

    return _sliceArr(source, start, end);
  }

  /**
   * A shortcut for Array.prototype.slice.call(obj, start, end).
   * @public
   * @param {?(Object|Array|function)} source
   * @param {number=} start - [default= 0]
   * @param {number=} end - [default= source.length]
   * @return {!Array}
   */
  slice.array = function sliceArray(source, start, end) {

    if ( !is._obj(source)       ) throw _error.type('source',        'array');
    if ( !is.num(source.length) ) throw _error.type('source.length', 'array');
    if ( !is('num=', start)     ) throw _error.type('start',         'array');
    if ( !is('num=', end)       ) throw _error.type('end',           'array');

    return _sliceArr(source, start, end);
  };
  // define shorthand
  slice.arr = slice.array;

  /**
   * A shortcut for String.prototype.slice(start, end).
   * @public
   * @param {string} str
   * @param {number=} start - [default= 0]
   * @param {number=} end - [default= str.length]
   * @return {string}
   */
  slice.string = function sliceString(str, start, end) {

    if ( !is.str(str)       ) throw _error.type('str',   'string');
    if ( !is('num=', start) ) throw _error.type('start', 'string');
    if ( !is('num=', end)   ) throw _error.type('end',   'string');

    return _sliceStr(str, start, end);
  };
  // define shorthand
  slice.str = slice.string;

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - GENERAL
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @type {!ErrorAid}
   */
  var _error = newErrorAid('slice');

  //////////////////////////////////////////////////////////
  // END OF PRIVATE SCOPE FOR SLICE
  return slice;
})();


////////////////////////////////////////////////////////////////////////////////
// UNTIL
////////////////////////////////////////////////////////////////////////////////

var until = (function untilPrivateScope() {

  //////////////////////////////////////////////////////////
  // PUBLIC METHODS
  // - until
  // - until.object (until.obj)
  // - until.array  (until.arr)
  // - until.cycle  (until.time)
  //////////////////////////////////////////////////////////

  /**
   * A shortcut for iterating over object maps and arrays or for invoking an
   *   action until an end value is returned. If iterating over an object note
   *   that this method lazily clones the object based on the iteratee's
   *   [length property]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/length}
   *   (i.e. if you alter the source object within the iteratee ensure to define
   *   the iteratee's third param to avoid accidental results).
   * @public
   * @param {*} end - A value that ends the iteration/action if returned by the
   *   iteratee.
   * @param {!(Object|function|Array|number)=} source - If the source is defined
   *   the iteration will also stop as follows (per source type):
   *     object source: Ends after all properties are visited.
   *     array source:  Ends after all indexes are visited.
   *     number source: Ends after the count of cycles equals the source.
   * @param {function(*=, (string|number)=, !(Object|function|Array)=)} iteratee
   * @param {Object=} thisArg
   * @return {boolean} - If the end value is returned to terminate the iteration
   *   this method will return true. Otherwise (e.g. if all source properties
   *   are visited or the count of cycles is reached) this method will return
   *   false.
   */
  function until(end, source, iteratee, thisArg) {

    if (arguments.length < 2) throw _error('No end or iteratee defined');

    if (arguments.length === 2) {
      iteratee = source;
      if ( !is.func(iteratee) ) throw _error.type('iteratee');
      return _untilEnd(end, iteratee);
    }

    if ( arguments.length === 3 && is.func(source) && is('?obj', iteratee) ) {
      thisArg = iteratee;
      iteratee = source;
      return _untilEnd(end, iteratee, thisArg);
    }

    if ( !is.func(iteratee)   ) throw _error.type('iteratee');
    if ( !is('obj=', thisArg) ) throw _error.type('thisArg');

    if ( is.num(source) ) return _untilCycle(end, source, iteratee, thisArg);

    if ( !is._obj(source) ) throw _error.type('source');

    return is._arr(source)
      ? _untilArr(end, source, iteratee, thisArg)
      : _untilObj(end, source, iteratee, thisArg);
  }

  /**
   * A shortcut for iterating over object maps until an end value is returned or
   *   all properties are visited.
   * @public
   * @param {*} end - A value that ends the iteration if returned by the
   *   iteratee.
   * @param {!(Object|function)} obj
   * @param {function(*=, string=, !(Object|function)=)} iteratee - The iteratee
   *   must be a function with the optional params - value, key, source. Note
   *   this method lazily clones the source based on the iteratee's
   *   [length property]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/length}
   *   (i.e. if you alter the source object within the iteratee ensure to define
   *   the iteratee's third param so you can safely assume all references to the
   *   source are its original values).
   * @param {Object=} thisArg
   * @return {boolean} - If the iteration is terminated by the end value this
   *   method will return true. Otherwise if all the properties are visited this
   *   method will return false.
   */
  until.object = function untilObject(end, obj, iteratee, thisArg) {

    if ( !is._obj(obj)        ) throw _error.type('obj',      'object');
    if ( !is.func(iteratee)   ) throw _error.type('iteratee', 'object');
    if ( !is('obj=', thisArg) ) throw _error.type('thisArg',  'object');

    return _untilObj(end, obj, iteratee, thisArg);
  };
  // define shorthand
  until.obj = until.object;

  /**
   * A shortcut for iterating over array-like objects until an end value is
   *   returned or all indexed values are visited.
   * @public
   * @param {*} end - A value that ends the iteration if returned by the
   *   iteratee.
   * @param {!(Object|function)} obj
   * @param {function(*=, number=, !Array=)} iteratee - The iteratee must be a
   *   function with the optional params - value, index, source. Note this
   *   method lazily slices (see [vitals.clone.array]{@link https://github.com/imaginate/vitals/blob/master/src/methods/clone.js})
   *   the source based on the iteratee's [length property]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/length}
   *   (i.e. if you alter the source object within the iteratee ensure to define
   *   the iteratee's third param so you can safely assume all references to the
   *   source are its original values).
   * @param {Object=} thisArg
   * @return {boolean} - If the iteration is terminated by the end value this
   *   method will return true. Otherwise if all the indexed values are visited
   *   this method will return false.
   */
  until.array = function untilArray(end, obj, iteratee, thisArg) {

    if ( !is._obj(obj)        ) throw _error.type('obj',        'array');
    if ( !is.num(obj.length)  ) throw _error.type('obj.length', 'array');
    if ( !is.func(iteratee)   ) throw _error.type('iteratee',   'array');
    if ( !is('obj=', thisArg) ) throw _error.type('thisArg',    'array');

    return _untilArr(end, obj, iteratee, thisArg);
  };
  // define shorthand
  until.arr = until.array;

  /**
   * A shortcut for invoking an action until an end value is returned or the
   *   number of cycles is reached.
   * @public
   * @param {*} end - A value that ends the iteration if returned by the
   *   iteratee.
   * @param {number} count - The number of cycles.
   * @param {function} action
   * @param {Object=} thisArg
   * @return {boolean} - If the iteration is terminated by the end value this
   *   method will return true. Otherwise if the number of cycles is reached
   *   this method will return false.
   */
  until.cycle = function untilCycle(end, count, action, thisArg) {

    if ( !is.num(count)       ) throw _error.type('count',   'cycle');
    if ( !is.func(action)     ) throw _error.type('action',  'cycle');
    if ( !is('obj=', thisArg) ) throw _error.type('thisArg', 'cycle');

    return _untilCycle(end, count, action, thisArg);
  };
  // define shorthand
  until.time = until.cycle;

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - MAIN
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @param {*} end
   * @param {function} action
   * @param {Object=} thisArg
   * @return {boolean}
   */
  function _untilEnd(end, action, thisArg) {
    action = is.undefined(thisArg) ? action : _bind(action, thisArg);
    while (action() !== end) {}
    return true;
  }

  /**
   * @private
   * @param {*} end
   * @param {!(Object|function)} obj
   * @param {function(*, string=, !(Object|function)=)} iteratee
   * @param {Object=} thisArg
   * @return {boolean}
   */
  function _untilObj(end, obj, iteratee, thisArg) {

    /** @type {string} */
    var key;

    obj = iteratee.length > 2 ? clone(obj) : obj;
    iteratee = is.undefined(thisArg) ? iteratee : _bind(iteratee, thisArg);
    switch (iteratee.length) {
      case 0:
      for (key in obj) {
        if ( _own(obj, key) ) {
          if (iteratee() === end) return true;
        }
      }
      break;
      case 1:
      for (key in obj) {
        if ( _own(obj, key) ) {
          if (iteratee(obj[key]) === end) return true;
        }
      }
      break;
      case 2:
      for (key in obj) {
        if ( _own(obj, key) ) {
          if (iteratee(obj[key], key) === end) return true;
        }
      }
      break;
      default:
      for (key in obj) {
        if ( _own(obj, key) ) {
          if (iteratee(obj[key], key, obj) === end) return true;
        }
      }
    }
    return false;
  }

  /**
   * @private
   * @param {*} end
   * @param {!(Object|function)} obj
   * @param {function(*, number=, !Array=)} iteratee
   * @param {Object=} thisArg
   * @return {boolean}
   */
  function _untilArr(end, obj, iteratee, thisArg) {

    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    obj = iteratee.length > 2 ? clone.arr(obj) : obj;
    iteratee = is.undefined(thisArg) ? iteratee : _bind(iteratee, thisArg);
    len = obj.length;
    i = -1;
    switch (iteratee.length) {
      case 0:
      while (++i < len) {
        if (iteratee() === end) return true;
      }
      break;
      case 1:
      while (++i < len) {
        if (iteratee(obj[i]) === end) return true;
      }
      break;
      case 2:
      while (++i < len) {
        if (iteratee(obj[i], i) === end) return true;
      }
      break;
      default:
      while (++i < len) {
        if (iteratee(obj[i], i, obj) === end) return true;
      }
    }
    return false;
  }

  /**
   * @private
   * @param {*} end
   * @param {number} count
   * @param {function} action
   * @param {Object=} thisArg
   * @return {boolean}
   */
  function _untilCycle(end, count, action, thisArg) {
    action = is.undefined(thisArg) ? action : _bind(action, thisArg);
    while(count--) {
      if (action() === end) return true;
    }
    return false;
  }

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - GENERAL
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @param {function} func
   * @param {Object} thisArg
   * @return {function} 
   */
  function _bind(func, thisArg) {
    switch (func.length) {
      case 0:
      return function iteratee() { func.call(thisArg); };
      case 1:
      return function iteratee(val) { func.call(thisArg, val); };
      case 2:
      return function iteratee(val, key) { func.call(thisArg, val, key); };
    }
    return function iteratee(val, key, obj) {
      func.call(thisArg, val, key, obj);
    };
  }

  /**
   * @private
   * @type {!ErrorAid}
   */
  var _error = newErrorAid('until');

  //////////////////////////////////////////////////////////
  // END OF PRIVATE SCOPE FOR UNTIL
  return until;
})();



// *****************************************************************************
// SECTION: CONFIGURE JS METHODS
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
    clone:  clone,
    create: create,
    cut:    cut,
    each:   each,
    fill:   fill,
    freeze: freeze,
    fuse:   fuse,
    get:    get,
    has:    has,
    remap:  remap,
    seal:   seal,
    slice:  slice,
    until:  until
  };
})() // close methods iife (do not add semicolon)
);   // close export iife
