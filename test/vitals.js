/** @preserve blank-line */

/**
 * -----------------------------------------------------------------------------
 * Vitals.js (v2.0.0)
 * -----------------------------------------------------------------------------
 * @file Vitals.js is a collection of cross-browser compatible JavaScript & DOM
 *   shortcut methods that make programming in JavaScript simple! You will be
 *   able to accurately type check values, deep freeze objects, create elements,
 *   and so much more with ease. With an intuitive API and clear documentation
 *   you will rejoice from the time saved and the stress lost!
 * @module Vitals
 * @version 2.0.0
 * @author Adam Smith adamsmith@algorithmiv.com
 * @copyright 2015 Adam A Smith [github.com/imaginate]{@link https://github.com/imaginate}
 * @license The Apache License [algorithmiv.com/vitals/license]{@link http://algorithmiv.com/vitals/license}
 * @see [Contributing Guide]{@link https://github.com/imaginate/vitals/blob/master/CONTRIBUTING.md}
 * Annotations:
 * @see [JSDoc3]{@link http://usejsdoc.org/}
 * @see [Closure Compiler specific JSDoc]{@link https://developers.google.com/closure/compiler/docs/js-for-compiler}
 */

/**
 * -----------------------------------------------------------------------------
 * Pre-Defined JSDoc Types
 * -----------------------------------------------------------------------------
 * @typedef {*} val
 * @typedef {Array<*>} vals
 * @typedef {Array<string>} strings
 * @typedef {Array<number>} numbers
 * @typedef {Array<Object>} objects
 * @typedef {Array<boolean>} booleans
 */

////////////////////////////////////////////////////////////////////////////////
// JS & DOM Environment Stabilizers
////////////////////////////////////////////////////////////////////////////////

/* -----------------------------------------------------------------------------
 * Cure.js v0.0.5 (dev/stabilize-env.js) @see http://algorithmiv.com/cure
 * -----------------------------------------------------------------------------
 * JSON3 v3.3.2 (dev/stabilize-env.js) @see https://bestiejs.github.io/json3
 * -------------------------------------------------------------------------- */

/* Cure.js (v0.0.5) (learn@algorithmiv.com)
 * Author: Adam Smith (adamsmith@algorithmiv.com)
 * Copyright (c) 2015 Adam A Smith (github.com/imaginate)
 * The Apache License (algorithmiv.com/cure/license)
 *
 * 3RD PARTY SCRIPTS USED IN Cure.js:
 * JSON3 (v3.3.2) (bestiejs.github.io/json3)
 * Copyright (c) 2012-2015 Kit Cambridge, Benjamin Tan
 * MIT License (kit.mit-license.org) */
(function(q,y){function r(a,g){return"object"===a||!g&&"function"===a||null}function a(a,g){a&&(g&&a.nodeType||!g&&!a.Object)&&(a=null);return a}var g=r(typeof g)&&a(g,!0),e=r(typeof e)&&a(e,!0),c=r(typeof c)&&a(c);q=function(a,g,e,c){return g||e||c||a}(q,g&&e&&r(typeof global,!0)&&a(global),c&&q&&c===q.window?null:c,r(typeof self)&&a(self));y.call(q,!!c)})(this,function(q,y){(function(){function a(c,
h){function n(a,w){try{a()}catch(d){w&&w()}}function k(a){if(null!=k[a])return k[a];var w;if("bug-string-char-index"==a)w="a"!="a"[0];else if("json"==a)w=k("json-stringify")&&k("date-serialization")&&k("json-parse");else if("date-serialization"==a){if(w=k("json-stringify")&&x){var d=h.stringify;n(function(){w='"-271821-04-20T00:00:00.000Z"'==d(new r(-864E13))&&'"+275760-09-13T00:00:00.000Z"'==d(new r(864E13))&&'"-000001-01-01T00:00:00.000Z"'==d(new r(-621987552E5))&&'"1969-12-31T23:59:59.999Z"'==
d(new r(-1))})}}else{var b;if("json-stringify"==a){var d=h.stringify,p="function"==typeof d;p&&((b=function(){return 1}).toJSON=b,n(function(){p="0"===d(0)&&"0"===d(new q)&&'""'==d(new t)&&d(u)===v&&d(v)===v&&d()===v&&"1"===d(b)&&"[1]"==d([b])&&"[null]"==d([v])&&"null"==d(null)&&"[null,null,null]"==d([v,u,null])&&'{"a":[1,true,false,null,"\\u0000\\b\\n\\f\\r\\t"]}'==d({a:[b,!0,!1,null,"\x00\b\n\f\r\t"]})&&"1"===d(null,b)&&"[\n 1,\n 2\n]"==d([1,2],null,1)},function(){p=!1}));w=p}if("json-parse"==a){var c=
h.parse,f;"function"==typeof c&&n(function(){0===c("0")&&!c(!1)&&(b=c('{"a":[1,true,false,null,"\\u0000\\b\\n\\f\\r\\t"]}'),f=5==b.a.length&&1===b.a[0])&&(n(function(){f=!c('"\t"')}),f&&n(function(){f=1!==c("01")}),f&&n(function(){f=1!==c("1.")}))},function(){f=!1});w=f}}return k[a]=!!w}c||(c=e.Object());h||(h=e.Object());var q=c.Number||e.Number,t=c.String||e.String,B=c.Object||e.Object,r=c.Date||e.Date,y=c.SyntaxError||e.SyntaxError,Q=c.TypeError||e.TypeError,R=c.Math||e.Math,F=c.JSON||e.JSON;"object"==
typeof F&&F&&(h.stringify=F.stringify,h.parse=F.parse);var B=B.prototype,u=B.toString,G=B.hasOwnProperty,v,x=new r(-0xc782b5b800cec);n(function(){x=-109252==x.getUTCFullYear()&&0===x.getUTCMonth()&&1===x.getUTCDate()&&10==x.getUTCHours()&&37==x.getUTCMinutes()&&6==x.getUTCSeconds()&&708==x.getUTCMilliseconds()});k["bug-string-char-index"]=k["date-serialization"]=k.json=k["json-stringify"]=k["json-parse"]=null;if(!k("json")){var I=k("bug-string-char-index"),E=function(a,b){var d=0,c,p,e;(c=function(){this.valueOf=
0}).prototype.valueOf=0;p=new c;for(e in p)G.call(p,e)&&d++;c=p=null;d?E=function(a,d){var D="[object Function]"==u.call(a),b,c;for(b in a)D&&"prototype"==b||!G.call(a,b)||(c="constructor"===b)||d(b);(c||G.call(a,b="constructor"))&&d(b)}:(p="valueOf toString toLocaleString propertyIsEnumerable isPrototypeOf hasOwnProperty constructor".split(" "),E=function(a,d){var D="[object Function]"==u.call(a),b,c=!D&&"function"!=typeof a.constructor&&g[typeof a.hasOwnProperty]&&a.hasOwnProperty||G;for(b in a)D&&
"prototype"==b||!c.call(a,b)||d(b);for(D=p.length;b=p[--D];c.call(a,b)&&d(b));});return E(a,b)};if(!k("json-stringify")||!k(" date-serialization")){var S={92:"\\\\",34:'\\"',8:"\\b",12:"\\f",10:"\\n",13:"\\r",9:"\\t"},A=function(a,b){return("000000"+(b||0)).slice(-a)},T=function(a){a=a.charCodeAt(0);var b=S[a];return b?b:"\\u00"+A(2,a.toString(16))},J=/[\x00-\x1f\x22\x5c]/g,N=function(a){J.lastIndex=0;return'"'+(J.test(a)?a.replace(J,T):a)+'"'},K=function(a){var b,d,c,p,g,f,e,n,h;if(x)b=function(a){d=
a.getUTCFullYear();c=a.getUTCMonth();p=a.getUTCDate();f=a.getUTCHours();e=a.getUTCMinutes();n=a.getUTCSeconds();h=a.getUTCMilliseconds()};else{var z=R.floor,m=[0,31,59,90,120,151,181,212,243,273,304,334],k=function(a,d){return m[d]+365*(a-1970)+z((a-1969+(d=+(1<d)))/4)-z((a-1901+d)/100)+z((a-1601+d)/400)};b=function(a){p=z(a/864E5);for(d=z(p/365.2425)+1970-1;k(d+1,0)<=p;d++);for(c=z((p-k(d,0))/30.42);k(d,c+1)<=p;c++);p=1+p-k(d,c);g=(a%864E5+864E5)%864E5;f=z(g/36E5)%24;e=z(g/6E4)%60;n=z(g/1E3)%60;
h=g%1E3}}K=function(a){a>-1/0&&a<1/0?(b(a),a=(0>=d||1E4<=d?(0>d?"-":"+")+A(6,0>d?-d:d):A(4,d))+"-"+A(2,c+1)+"-"+A(2,p)+"T"+A(2,f)+":"+A(2,e)+":"+A(2,n)+"."+A(3,h)+"Z",d=c=p=f=e=n=h=null):a=null;return a};return K(a)},L=function(a,b,d,c,g,e,f){var l,h,k,m,q,t;n(function(){l=b[a]});"object"==typeof l&&l&&(l.getUTCFullYear&&"[object Date]"==u.call(l)&&l.toJSON===r.prototype.toJSON?l=K(l):"function"==typeof l.toJSON&&(l=l.toJSON(a)));d&&(l=d.call(b,a,l));if(l==v)return l===v?l:"null";h=typeof l;"object"==
h&&(k=u.call(l));switch(k||h){case "boolean":case "[object Boolean]":return""+l;case "number":case "[object Number]":return l>-1/0&&l<1/0?""+l:"null";case "string":case "[object String]":return N(""+l)}if("object"==typeof l){for(h=f.length;h--;)if(f[h]===l)throw Q();f.push(l);m=[];t=e;e+=g;if("[object Array]"==k){q=0;for(h=l.length;q<h;q++)k=L(q,l,d,c,g,e,f),m.push(k===v?"null":k);h=m.length?g?"[\n"+e+m.join(",\n"+e)+"\n"+t+"]":"["+m.join(",")+"]":"[]"}else E(c||l,function(a){var b=L(a,l,d,c,g,e,
f);b!==v&&m.push(N(a)+":"+(g?" ":"")+b)}),h=m.length?g?"{\n"+e+m.join(",\n"+e)+"\n"+t+"}":"{"+m.join(",")+"}":"{}";f.pop();return h}};h.stringify=function(a,b,d){var c,e,h,f;if(g[typeof b]&&b)if(f=u.call(b),"[object Function]"==f)e=b;else if("[object Array]"==f){h={};for(var l=0,m=b.length,k;l<m;k=b[l++],(f=u.call(k),"[object String]"==f||"[object Number]"==f)&&(h[k]=1));}if(d)if(f=u.call(d),"[object Number]"==f){if(0<(d-=d%1))for(c="",10<d&&(d=10);c.length<d;c+=" ");}else"[object String]"==f&&(c=
10>=d.length?d:d.slice(0,10));return L("",(k={},k[""]=a,k),e,h,c,"",[])}}if(!k("json-parse")){var U=t.fromCharCode,V={92:"\\",34:'"',47:"/",98:"\b",116:"\t",110:"\n",102:"\f",114:"\r"},b,H,m=function(){b=H=null;throw y();},C=function(){for(var a=H,c=a.length,d,g,e,h,f;b<c;)switch(f=a.charCodeAt(b),f){case 9:case 10:case 13:case 32:b++;break;case 123:case 125:case 91:case 93:case 58:case 44:return d=I?a.charAt(b):a[b],b++,d;case 34:d="@";for(b++;b<c;)if(f=a.charCodeAt(b),32>f)m();else if(92==f)switch(f=
a.charCodeAt(++b),f){case 92:case 34:case 47:case 98:case 116:case 110:case 102:case 114:d+=V[f];b++;break;case 117:g=++b;for(e=b+4;b<e;b++)f=a.charCodeAt(b),48<=f&&57>=f||97<=f&&102>=f||65<=f&&70>=f||m();d+=U("0x"+a.slice(g,b));break;default:m()}else{if(34==f)break;f=a.charCodeAt(b);for(g=b;32<=f&&92!=f&&34!=f;)f=a.charCodeAt(++b);d+=a.slice(g,b)}if(34==a.charCodeAt(b))return b++,d;m();default:g=b;45==f&&(h=!0,f=a.charCodeAt(++b));if(48<=f&&57>=f){for(48==f&&(f=a.charCodeAt(b+1),48<=f&&57>=f)&&m();b<
c&&(f=a.charCodeAt(b),48<=f&&57>=f);b++);if(46==a.charCodeAt(b)){for(e=++b;e<c&&(f=a.charCodeAt(e),48<=f&&57>=f);e++);e==b&&m();b=e}f=a.charCodeAt(b);if(101==f||69==f){f=a.charCodeAt(++b);43!=f&&45!=f||b++;for(e=b;e<c&&(f=a.charCodeAt(e),48<=f&&57>=f);e++);e==b&&m();b=e}return+a.slice(g,b)}h&&m();d=a.slice(b,b+4);if("true"==d)return b+=4,!0;if("fals"==d&&101==a.charCodeAt(b+4))return b+=5,!1;if("null"==d)return b+=4,null;m()}return"$"},M=function(a){var b,d;"$"==a&&m();if("string"==typeof a){if("@"==
(I?a.charAt(0):a[0]))return a.slice(1);if("["==a){for(b=[];;){a=C();if("]"==a)break;d?","==a?(a=C(),"]"==a&&m()):m():d=!0;","==a&&m();b.push(M(a))}return b}if("{"==a){for(b={};;){a=C();if("}"==a)break;d?","==a?(a=C(),"}"==a&&m()):m():d=!0;","!=a&&"string"==typeof a&&"@"==(I?a.charAt(0):a[0])&&":"==C()||m();b[a.slice(1)]=M(C())}return b}m()}return a},P=function(a,b,d){d=O(a,b,d);d===v?delete a[b]:a[b]=d},O=function(a,b,d){var c=a[b],e;if("object"==typeof c&&c)if("[object Array]"==u.call(c))for(e=c.length;e--;P(c,
e,d));else E(c,function(a){P(c,a,d)});return d.call(a,b,c)};h.parse=function(a,c){var d,e;b=0;H=""+a;d=M(C());"$"!=C()&&m();b=H=null;return c&&"[object Function]"==u.call(c)?O((e={},e[""]=d,e),"",c):d}}}h.runInContext=a;return h}var g={"function":!0,object:!0},e=g[typeof window]&&window||this,c=g[typeof exports]&&exports&&!exports.nodeType&&exports&&g[typeof module]&&module&&!module.nodeType&&"object"==typeof global&&global;!c||c.global!==c&&c.window!==c&&c.self!==c||(e=c);var n=e.JSON,q=e.JSON3,
t=!1,B=a(e,e.JSON3={noConflict:function(){t||(t=!0,e.JSON=n,e.JSON3=q,n=q=null);return B}});e.JSON={parse:B.parse,stringify:B.stringify}}).call(this);q&&!window.XMLHttpRequest&&(window.XMLHttpRequest=function(){var a;try{a=new ActiveXObject("Msxml2.XMLHTTP.6.0")}catch(g){try{a=new ActiveXObject("Msxml2.XMLHTTP.3.0")}catch(e){try{a=new ActiveXObject("Microsoft.XMLHTTP")}catch(c){throw Error("Your browser does not support XMLHttpRequest.");}}}return a});Array.isArray||(Array.isArray=function(a){return"[object Array]"===
Object.prototype.toString.call(a)});Array.prototype.indexOf&&function(a){return-1===a.indexOf(8,2)&&-1===a.indexOf(9,-1)}([8,9])||(Array.prototype.indexOf=function(a,g){var e,c,n;if(!Array.isArray(this))throw new TypeError("An Array.prototype.indexOf call was made on a non-array.");"number"!==typeof g&&(g=0);c=this.length;e=-1;if(0!==c&&Math.abs(g)<c)for(0>g&&(c-=g),n=0>g?-1:--g;++n<c;)if(this[n]===a){e=n;break}return e});q?window.console=window.console||{}:this.console=this.console||{};(function(a,
g){a.log||(a.log=g);a.error||(a.error=a.log);a.assert||(a.assert=function(e){var c;if(!e)return c=1<arguments.length?Array.prototype.slice.call(arguments,1):["A console.assert call failed."],a.error.apply(this,c)});a.clear||(a.clear=g);a.count||(a.count=g);a.debug||(a.debug=a.log);a.dir||(a.dir=a.log);a.dirxml||(a.dirxml=a.log);a.exception||(a.exception=a.error);a.group||(a.group=g);a.groupCollapsed||(a.groupCollapsed=a.group);a.groupEnd||(a.groupEnd=g);a.info||(a.info=a.log);a.markTimeline||(a.markTimeline=
a.timeStamp?a.timeStamp:g);a.profile||(a.profile=g);a.profileEnd||(a.profileEnd=g);a.table||(a.table=g);a.time||(a.time=g);a.timeEnd||(a.timeEnd=g);a.timeline||(a.timeline=g);a.timelineEnd||(a.timelineEnd=g);a.timeStamp||(a.timeStamp=a.markTimeline);a.trace||(a.trace=a.log);a.warn||(a.warn=a.error);(function(e,c,g,q){var t,r,y,h;if(e)if(y=["assert","error","info","log","warn"],h=["clear","dir","profile","profileEnd"],h=y.concat(h),c)for(t=h.length;t--;)r=a[h[t]],a[h[t]]=c.call(r,a);else for(t=y.length;t--;)r=
a[y[t]],g.call(r,a,q.call(arguments))})("object"===typeof a.log,Function.prototype.bind,Function.prototype.call,Array.prototype.slice)})(q?window.console:this.console,function(){});Object.keys||(Object.keys=function(){var a,g;a=!{toString:null}.propertyIsEnumerable("toString");g="toString toLocaleString valueOf hasOwnProperty isPrototypeOf propertyIsEnumerable constructor".split(" ");return function(e){var c,n;if(!e||"object"!==typeof e&&"function"!==typeof e)throw new TypeError("An Object.keys call received an invalid object parameter. Note: It only accepts non-null objects and functions.");
n=[];for(c in e)e.hasOwnProperty(c)&&n.push(c);if(a)for(c=g.length;c--;)e.hasOwnProperty(g[c])&&n.push(g[c]);return n}}());Object.freeze||(Object.freeze=function(a){if(!a||"object"!==typeof a&&"function"!==typeof a)throw new TypeError("An Object.freeze call received an invalid object parameter. Note: It only accepts non-null objects and functions.");return a});try{Object.freeze(function(){})}catch(r){Object.freeze=function(a){return function(g){return"function"===typeof g?g:a(g)}}(Object.freeze)}Object.isFrozen||
(Object.isFrozen=function(a){if(!a||"object"!==typeof a&&"function"!==typeof a)throw new TypeError("An Object.isFrozen call received an invalid object parameter. Note: It only accepts non-null objects and functions.");return!0})});

////////////////////////////////////////////////////////////////////////////////
// Export Vitals
////////////////////////////////////////////////////////////////////////////////

;(function(/** Object */ root, /** function(Object): Object */ makeVitals) {

/* -----------------------------------------------------------------------------
 * Export Vitals (dev/export.js)
 * -------------------------------------------------------------------------- */

  /** @type {!Object} */
  var Vitals;
  /** @type {(Object|?function)} */
  var exports = isObj(typeof exports) && getObj(exports, true);
  /** @type {(Object|?function)} */
  var module = isObj(typeof module) && getObj(module, true);

  root = (function(root, global, window, self) {

    if ( window && root && (window === root.window) ) {
      window = null;
    }
    return global || window || self || root;

  })(
    root,
    exports && module && isObj(typeof global, true) && getObj(global),
    isObj(typeof window) && getObj(window),
    isObj(typeof self) && getObj(self)
  );

  Vitals = makeVitals(root);

  // AMD
  if (typeof define === 'function' &&
      typeof define.amd === 'object' && define.amd) {
    root.Vitals = Vitals;
    root.V = Vitals;
    define(function() {
      return Vitals;
    });
  }
  // Node.js or CommonJS
  else if (exports && module) {
    if (exports === module.exports) {
      module.exports = Vitals;
    }
    module.exports.Vitals = Vitals;
    module.exports.V = Vitals;
  }
  // Browser
  else {
    root.Vitals = Vitals;
    root.V = Vitals;
  }

  /**
   * ---------------------------------------------------
   * Private Function (isObj)
   * ---------------------------------------------------
   * @desc A helper method that checks if a value is an object.
   * @private
   * @param {string} typeOf
   * @param {boolean=} noFunc
   * @return {?boolean}
   */
  function isObj(typeOf, noFunc) {
    return (typeOf === 'object') || (!noFunc && typeOf === 'function') || null;
  }

  /**
   * ---------------------------------------------------
   * Private Function (getObj)
   * ---------------------------------------------------
   * @desc A helper method that checks if an object is a valid object and
   *   returns the object or null.
   * @private
   * @param {(Object|?function)} obj
   * @param {boolean=} checkNode
   * @return {boolean}
   */
  function getObj(obj, checkNode) {
    if (obj && ( (checkNode && obj.nodeType) ||
                 (!checkNode && !obj.Object) )) {
      obj = null;
    }
    return obj;
  }

})(this, function(/** Object */ root, undefined) {

  "use strict";

////////////////////////////////////////////////////////////////////////////////
// The Vitals Module
////////////////////////////////////////////////////////////////////////////////

/* -----------------------------------------------------------------------------
 * The Module's Public Variables (dev/module-vars.js)
 * -------------------------------------------------------------------------- */

  /**
   * -----------------------------------------------------
   * Public Variable (Vitals)
   * -----------------------------------------------------
   * @desc Holds the module's public properties and methods.
   * @type {!Object<string, function>}
   * @struct
   */
  var Vitals = {};

  /**
   * -----------------------------------------------------
   * Public Variable (DEFAULTS)
   * -----------------------------------------------------
   * @desc Holds each method's orginal defaults.
   * @type {!{
   *   checkArgsErrorMsg  : function,
   *   getElemByIdRoot    : !Document,
   *   getElemByClassRoot : !Document,
   *   getElemsByClassRoot: !Document,
   *   getElemByTagRoot   : !Document,
   *   getElemsByTagRoot  : !Document
   * }}
   * @const
   */
  var DEFAULTS = {
    checkArgsErrorMsg  : 'A method call received an invalid parameter type.',
    getElemByIdRoot    : document,
    getElemByClassRoot : document,
    getElemsByClassRoot: document,
    getElemByTagRoot   : document,
    getElemsByTagRoot  : document
  };

  /**
   * -----------------------------------------------------
   * Public Variable (DEFAULTS.types)
   * -----------------------------------------------------
   * @desc Holds the data type options for each default.
   * @type {!Object<string, string>}
   * @const
   */
  DEFAULTS.types = {
    checkArgsErrorMsg  : 'string|function',
    getElemByIdRoot    : '!Document',
    getElemByClassRoot : '!Document|Element',
    getElemsByClassRoot: '!Document|Element',
    getElemByTagRoot   : '!Document|Element',
    getElemsByTagRoot  : '!Document|Element'
  };

  Object.freeze(DEFAULTS);
  Object.freeze(DEFAULTS.types);

  /**
   * -----------------------------------------------------
   * Public Variable (defaults)
   * -----------------------------------------------------
   * @desc Holds each method's defaults.
   * @type {!{
   *   checkArgsErrorMsg  : (string|function),
   *   getElemByIdRoot    : !Document,
   *   getElemByClassRoot : (!Document|!Element),
   *   getElemsByClassRoot: (!Document|!Element),
   *   getElemByTagRoot   : (!Document|!Element),
   *   getElemsByTagRoot  : (!Document|!Element)
   * }}
   */
  var defaults = {
    checkArgsErrorMsg  : DEFAULTS.checkArgsErrorMsg,
    getElemByIdRoot    : DEFAULTS.getElemByIdRoot,
    getElemByClassRoot : DEFAULTS.getElemByClassRoot,
    getElemsByClassRoot: DEFAULTS.getElemsByClassRoot,
    getElemByTagRoot   : DEFAULTS.getElemByTagRoot,
    getElemsByTagRoot  : DEFAULTS.getElemsByTagRoot
  };

////////////////////////////////////////////////////////////////////////////////
// The JS Shortcuts
////////////////////////////////////////////////////////////////////////////////

/* -----------------------------------------------------------------------------
 * The JS Feature Detection (dev/js-methods/feature-detect.js)
 * -------------------------------------------------------------------------- */

  /**
   * -----------------------------------------------------
   * Public Variable (JsFeatures)
   * -----------------------------------------------------
   * @desc Holds the results for JS feature detection.
   * @type {!Object<string, boolean>}
   * @struct
   */
  var JsFeatures = {};

  /**
   * -----------------------------------------------------
   * Public Property (JsFeatures.freezeRegExpBug)
   * -----------------------------------------------------
   * @desc Indicates whether the browser has a bug when using frozen RegExp.
   * @type {boolean}
   */
  JsFeatures.freezeRegExpBug = (function testForFreezeRegExpBug() {

    /** @type {!RegExp} */
    var regex;
    /** @type {string} */
    var orgStr;
    /** @type {string} */
    var newStr;
    /** @type {boolean} */
    var pass;

    regex = /0/g;
    Object.freeze(regex);

    orgStr = 'T00 many zer0s... replace them.';
    pass = true;

    try {
      newStr = orgStr.replace(regex, 'o');
    }
    catch(e) {
      pass = false;
    }

    return !pass;
  })();

  Object.freeze(JsFeatures);

/* -----------------------------------------------------------------------------
 * The JS Helper Methods (dev/js-methods/helpers.js)
 * -------------------------------------------------------------------------- */

  /**
   * -----------------------------------------------------
   * Public Variable (JsHelpers)
   * -----------------------------------------------------
   * @desc Holds helpers for the JS shortcut methods.
   * @type {!Object<string, !RegExp>}
   * @struct
   */
  var JsHelpers = {};

  /**
   * -----------------------------------------------------
   * Public Property (JsHelpers.allDataTypes)
   * -----------------------------------------------------
   * @desc A regex of all of the data types available to checkType.
   * @type {!RegExp}
   */
  JsHelpers.allDataTypes = new RegExp('^(?:any|string|number|boolean|object|'  +
  'array|function|null|undefined|elem|element|document|regexp|strings|numbers|'+
  'booleans|objects|arrays|functions|elems|elements|regexps|stringmap|elemmap|'+
  "numbermap|booleanmap|objectmap|arraymap|functionmap|elementmap|regexpmap)$");

  /**
   * -----------------------------------------------------
   * Public Property (JsHelpers.exceptLowerAlphaAndPipe)
   * -----------------------------------------------------
   * @desc A regex matching all characters except lowercase letters and the pipe.
   * @type {!RegExp}
   */
  JsHelpers.exceptLowerAlphaAndPipe = /[^a-z\|]/g;

  Object.freeze(JsHelpers);

/* -----------------------------------------------------------------------------
 * The checkType Method (dev/js-methods/checkType.js)
 * -------------------------------------------------------------------------- */

  /**
   * ---------------------------------------------------
   * Public Method (Vitals.checkType)
   * ---------------------------------------------------
   * @desc Checks a value's data type against the given optional types.
   * @param {*} val - The value to be evaluated.
   * @param {string} type - A string of the data types to evaluate the value
   *   against. The optional data type strings are below:
   *   <table>
   *     <tr><th>Main Types</th><th>Array Types</th><th>Hash Map Types</th></tr>
   *     <tr>
   *       <td>
   *         <span>'string', 'number', 'boolean', 'object', 'array', </span>
   *         <span>'function', 'undefined', 'elem', 'element', </span>
   *         <span>'document', 'regexp'</span>
   *       </td>
   *       <td>
   *         <span>'strings', 'numbers', 'booleans', 'objects', </span>
   *         <span>'arrays', 'functions', 'elems', 'elements', </span>
   *         <span>'regexps'</span>
   *       </td>
   *       <td>
   *         <span>'stringMap', 'numberMap', 'booleanMap', 'objectMap', </span>
   *         <span>'arrayMap', 'functionMap', 'elemMap', 'elementMap'</span>
   *         <span>'regexpMap'</span>
   *       </td>
   *     </tr>
   *   </table>
   *   Other important characters are below:
   *   <table>
   *     <tr><th>Character</th><th>Details</th><th>Example</th></tr>
   *     <tr>
   *       <td>'*'</td>
   *       <td>Indicates that the value can be any type.</td>
   *       <td>'*'</td>
   *     </tr>
   *     <tr>
   *       <td>'|'</td>
   *       <td>Separates multiple type options.</td>
   *       <td>'strings|numbers'</td>
   *     </tr>
   *     <tr>
   *       <td>'!'</td>
   *       <td>
   *         <span>Indicates an object is not nullable. By default all </span>
   *         <span>functions, primitive data types (string, number, </span>
   *         <span>or boolean), and undefined are not nullable.</span>
   *       </td>
   *       <td>'!stringMap'</td>
   *     </tr>
   *     <tr>
   *       <td>'?'</td>
   *       <td>
   *         <span>Indicates a function or primitive data type is </span>
   *         <span>nullable. By default all objects except functions </span>
   *         <span>are nullable.</span>
   *       </td>
   *       <td>'?string'</td>
   *     </tr>
   *     <tr>
   *       <td>'='</td>
   *       <td>Indicates that the value can be undefined.</td>
   *       <td>'array=' or 'string|number='</td>
   *     </tr>
   *   </table>
   * @param {boolean=} noTypeValCheck - If true this method does not check
   *   the data type string for correctness. By default this is set to false.
   * @return {boolean} The evaluation result.
   */
  Vitals.checkType = (function setup_checkType(allDataTypes,
                               exceptLowerAlphaAndPipe) {

    ////////////////////////////////////////////////////////////////////////////
    // The Public Method
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ---------------------------------------------------
     * Public Method (checkType)
     * ---------------------------------------------------
     * @desc See the description for Vitals.checkType.
     * @param {*} val
     * @param {string} type
     * @param {boolean=} noTypeValCheck
     * @return {boolean}
     */
    var checkType = function(val, type, noTypeValCheck) {

      /** @type {!strings} */
      var types;
      /** @type {string} */
      var errorMsg;

      if ( !checkTypeOf(type, 'string') ) {
        errorMsg = 'A Vitals.checkType call received a non-string type param.';
        throw new TypeError(errorMsg);
      }

      // Check for automatic pass ('*' = any value)
      if ( asterisk.test(type) ) {
        (type.length > 1) && throwInvalidAsteriskUse();
        return true;
      }

      // Check for an optional value ('=' = undefined)
      if (val === undefined && equalSign.test(type)) {
        noTypeValCheck || isValidTypeStrings(type);
        return true;
      }

      // Check for a nullable override ('!' = non-nullable) ('?' = nullable)
      if (val === null && checkForNullOverride(type)) {
        noTypeValCheck || isValidTypeStrings(type);
        return checkIfNullable(type);
      }

      type = type.toLowerCase();
      type = type.replace(exceptLowerAlphaAndPipe, '');
      types = type.split('|');

      noTypeValCheck || isValidTypeStrings(types);

      return ( (val === null) ?
        checkEachNullType(types) : checkEachType(val, types)
      );
    };

    ////////////////////////////////////////////////////////////////////////////
    // The Private Properties
    ////////////////////////////////////////////////////////////////////////////

    /**
     * -----------------------------------------------
     * Private Property (nonNullableDataTypes)
     * -----------------------------------------------
     * @desc The non-nullable data types available to this module.
     * @type {!RegExp}
     */
    var nonNullableDataTypes = /^(?:string|number|boolean|function|undefined)$/;

    /**
     * -----------------------------------------------
     * Private Property (typeOfDataTypes)
     * -----------------------------------------------
     * @desc The data types that can be accurately checked with the
     *   native JavaScript typeof operator.
     * @type {!RegExp}
     */
    var typeOfDataTypes = new RegExp('^(?:string|number|boolean|object|' +
                                         "function|undefined)$");

    /**
     * -----------------------------------------------
     * Private Property (objClassDataTypes)
     * -----------------------------------------------
     * @desc The object types that must have their constructors checked.
     * @type {!RegExp}
     */
    var objClassDataTypes = /^(?:array|elem|element|document|regexp)$/;

    /**
     * -----------------------------------------------
     * Private Property (arrayDataTypes)
     * -----------------------------------------------
     * @desc The array data types available to this module.
     * @type {!RegExp}
     */
    var arrayDataTypes = new RegExp('^(?:strings|numbers|booleans|objects|' +
                                 "arrays|functions|elems|elements|regexps)$");

    /**
     * -----------------------------------------------
     * Private Property (mapDataTypes)
     * -----------------------------------------------
     * @desc The hash map types available to this module.
     * @type {!RegExp}
     */
    var mapDataTypes = new RegExp('^(?:stringmap|numbermap|booleanmap|' +
         "objectmap|arraymap|functionmap|elemmap|elementmap|regexpmap)$");

    /**
     * -----------------------------------------------
     * Private Property (exclamationPoint)
     * -----------------------------------------------
     * @desc An exclamation point.
     * @type {!RegExp}
     */
    var exclamationPoint = /\!/;

    /**
     * -----------------------------------------------
     * Private Property (questionMark)
     * -----------------------------------------------
     * @desc A question mark.
     * @type {!RegExp}
     */
    var questionMark = /\?/;

    /**
     * -----------------------------------------------
     * Private Property (equalSign)
     * -----------------------------------------------
     * @desc An equal sign.
     * @type {!RegExp}
     */
    var equalSign = /\=/;

    /**
     * -----------------------------------------------
     * Private Property (asterisk)
     * -----------------------------------------------
     * @desc An asterisk.
     * @type {!RegExp}
     */
    var asterisk = /\*/;

    ////////////////////////////////////////////////////////////////////////////
    // The Private Methods
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ---------------------------------------------------
     * Private Method (throwInvalidAsteriskUse)
     * ---------------------------------------------------
     * @desc Throws an error for improper use of the asterisk.
     * @type {function}
     */
    var throwInvalidAsteriskUse = function() {

      /** @type {string} */
      var errorMsg;

      errorMsg = 'A Vitals.checkType call received an invalid type ';
      errorMsg += 'string. When using an asterisk, \'*\', no other values ';
      errorMsg += 'should be given as the asterisk guarantees the check will ';
      errorMsg += 'pass.';
      throw new Error(errorMsg);
    };

    /**
     * ---------------------------------------------------
     * Private Method (checkForNullOverride)
     * ---------------------------------------------------
     * @desc Checks if a nullable override exists.
     * @param {string} type - A string of the data types to evaluate against.
     * @return {boolean} The nullable override value.
     */
    var checkForNullOverride = function(type) {
      return ( (questionMark.test(type)) ?
        !exclamationPoint.test(type) : exclamationPoint.test(type)
      );
    };

    /**
     * ---------------------------------------------------
     * Private Method (checkIfNullable)
     * ---------------------------------------------------
     * @desc Retrieves the starting nullable value.
     * @param {string} type - A string of the data types to evaluate against.
     * @return {boolean} The nullable start value.
     */
    var checkIfNullable = function(type) {
      return !exclamationPoint.test(type) && questionMark.test(type);
    };

    /**
     * ---------------------------------------------------
     * Private Method (isValidTypeStrings)
     * ---------------------------------------------------
     * @desc Evaluates whether each value is a valid data type string.
     * @param {(string|!strings)} types - The strings to evaluate.
     * @return {boolean} The evaluation result.
     */
    var isValidTypeStrings = function(types) {

      /** @type {number} */
      var i;
      /** @type {boolean} */
      var pass;
      /** @type {string} */
      var errorMsg;

      if ( checkTypeOf(types, 'string') ) {
        types = types.toLowerCase();
        types = types.replace(exceptLowerAlphaAndPipe, '');
        types = types.split('|');
      }

      pass = true;
      i = types.length;
      while (pass && i--) {
        pass = allDataTypes.test(types[i]);
        pass || throwInvalidTypeString(types[i]);
      }

      return pass;
    };

    /**
     * ---------------------------------------------------
     * Private Method (throwInvalidTypeString)
     * ---------------------------------------------------
     * @desc Throws an error for an invalid data type string value.
     * @param {string} type - A known incorrect type value.
     */
    var throwInvalidTypeString = function(type) {

      /** @type {string} */
      var errorMsg;

      errorMsg = 'A Vitals.checkType call received an invalid type ';
      errorMsg += 'string. The value \'' + type + '\' was incorrect. ';
      errorMsg += 'Check Vitals.checkType\'s documentation for a ';
      errorMsg += 'list of acceptable type strings.';
      throw new Error(errorMsg);
    };

    /**
     * ---------------------------------------------------
     * Private Method (checkEachType)
     * ---------------------------------------------------
     * @desc Checks a value's data type against the given types.
     * @param {*} val - The value to be evaluated.
     * @param {!Array<string>} types - The data types to evaluate against.
     * @return {boolean} The evaluation result.
     */
    var checkEachType = function(val, types) {

      /** @type {number} */
      var i;
      /** @type {string} */
      var type;
      /** @type {boolean} */
      var pass;

      pass = false;
      i = types.length;
      while (i-- && !pass) {

        type = types[i];

        if (type === 'any') {
          pass = true;
          break;
        }

        if ( typeOfDataTypes.test(type) ) {
          pass = checkTypeOf(val, type);
          continue;
        }

        if ( objClassDataTypes.test(type) ) {
          pass = checkObjType(val, type);
          continue;
        }

        if ( arrayDataTypes.test(type) ) {
          pass = checkArrayType(val, type);
          continue;
        }

        if ( mapDataTypes.test(type) ) {
          pass = checkHashMapType(val, type);
          continue;
        }
      }

      return pass;
    };

    /**
     * ---------------------------------------------------
     * Private Method (checkEachNullType)
     * ---------------------------------------------------
     * @desc Checks the nullable values of the given types.
     * @param {!Array<string>} types - The data types to evaluate against.
     * @return {boolean} The evaluation result.
     */
    var checkEachNullType = function(types) {

      /** @type {number} */
      var i;
      /** @type {boolean} */
      var pass;

      pass = false;
      i = types.length;
      while (i-- && !pass) {
        pass = !nonNullableDataTypes.test(types[i]);
      }

      return pass;
    };

    /**
     * ---------------------------------------------------
     * Private Method (checkTypeOf)
     * ---------------------------------------------------
     * @desc Checks a value's typeof against the given type.
     * @param {*} val - The value to be evaluated.
     * @param {string} type - The data type.
     * @return {boolean} The evaluation result.
     */
    var checkTypeOf = function(val, type) {
      return (val !== null) && (typeof val === type);
    };

    /**
     * ---------------------------------------------------
     * Private Method (checkObjType)
     * ---------------------------------------------------
     * @desc Checks if an object passes the given type's checks.
     * @param {*} val - The value to be evaluated.
     * @param {string} type - The data type.
     * @return {boolean} The evaluation result.
     */
    var checkObjType = (function setup_checkObjType(objToString) {

      /** @type {!Object<string, function(!Object): boolean>} */
      var objChecks;

      objChecks = {
        'array'   : function(obj) { return Array.isArray(obj);   },
        'elem'    : function(obj) { return (obj.nodeType === 1); },
        'element' : function(obj) { return (obj.nodeType === 1); },
        'document': function(obj) { return (obj.nodeType === 9); },
        'regexp'  : function(obj) {
          return (objToString.call(obj) === '[object RegExp]');
        }
      };

      return function checkObjType(val, type) {
        return !!val && checkTypeOf(val, 'object') && objChecks[ type ](val);
      };

    })(Object.prototype.toString);

    /**
     * ---------------------------------------------------
     * Private Method (checkArrayType)
     * ---------------------------------------------------
     * @desc Checks a value's data type against the given array type.
     * @param {*} vals - The value to be evaluated.
     * @param {string} type - The array data type.
     * @return {boolean} The evaluation result.
     */
    var checkArrayType = function(vals, type) {

      /** @type {number} */
      var i;
      /** @type {boolean} */
      var pass;
      /** @type {function} */
      var testFunc;

      if ( !Array.isArray(vals) ) {
        return false;
      }

      type = type.slice(0, -1);
      testFunc = ( (objClassDataTypes.test(type)) ?
        checkObjType : checkTypeOf
      );

      pass = true;
      i = vals.length;
      while (pass && i--) {
        pass = testFunc(vals[i], type);
      }

      return pass;
    };

    /**
     * ---------------------------------------------------
     * Private Method (checkHashMapType)
     * ---------------------------------------------------
     * @desc Checks a value's data type against the given object type.
     * @param {*} val - The value to be evaluated.
     * @param {string} type - The hash map's data type.
     * @return {boolean} The evaluation result.
     */
    var checkHashMapType = function(val, type) {

      /** @type {string} */
      var prop;
      /** @type {boolean} */
      var pass;
      /** @type {function} */
      var testFunc;

      if ( !checkTypeOf(val, 'object') ) {
        return false;
      }

      type = type.slice(0, -3);
      testFunc = ( (objClassDataTypes.test(type)) ?
        checkObjType : checkTypeOf
      );

      pass = true;
      for (prop in val) {
        if ( val.hasOwnProperty(prop) ) {
          pass = testFunc(val[ prop ], type);
          if (!pass) {
            break;
          }
        }
      }

      return pass;
    };

    ////////////////////////////////////////////////////////////////////////////
    // The End Of The checkType Module
    ////////////////////////////////////////////////////////////////////////////

    return checkType;

  })(JsHelpers.allDataTypes, JsHelpers.exceptLowerAlphaAndPipe);

/* -----------------------------------------------------------------------------
 * The isValidTypeString Method (dev/js-methods/isValidTypeString.js)
 * -------------------------------------------------------------------------- */

  /**
   * ---------------------------------------------------
   * Public Method (Vitals.isValidTypeString)
   * ---------------------------------------------------
   * @desc Evaluates whether a string is a valid data type string.
   * @param {string} typeString - The string to evaluate.
   * @return {boolean} The evaluation result.
   */
  Vitals.isValidTypeString = (function setup_isValidTypeString(
                                       allDataTypes, exceptLowerAlphaAndPipe) {

    return function isValidTypeString(typeString) {

      /** @type {number} */
      var i;
      /** @type {boolean} */
      var pass;
      /** @type {!strings} */
      var typeArr;
      /** @type {string} */
      var errorMsg;

      if (typeof typeString !== 'string') {
        errorMsg = 'A Vitals.isValidTypeString call received a non-string ';
        errorMsg += 'typeString param.';
        throw new TypeError(errorMsg);
      }

      typeString = typeString.toLowerCase();
      typeString = typeString.replace(exceptLowerAlphaAndPipe, '');
      typeArr = typeString.split('|');
      pass = true;

      i = typeArr.length;
      while (pass && i--) {
        pass = allDataTypes.test(typeArr[i]);
      }

      return pass;
    };
  })(JsHelpers.allDataTypes, JsHelpers.exceptLowerAlphaAndPipe);

/* -----------------------------------------------------------------------------
 * The checkArgs Method (dev/js-methods/checkArgs.js)
 * -------------------------------------------------------------------------- */

  /**
   * ---------------------------------------------------
   * Public Method (Vitals.checkArgs)
   * ---------------------------------------------------
   * @desc Catches invalid argument data types and throws an error.
   * @param {...*} val - Each argument passed to the method.
   * @param {...string} type -  Each argument's optional data types.
   * @see [Vitals.checkType]{@link https://github.com/imaginate/vitals/blob/master/src/pre-compiled-parts/js-methods/checkType.js}
   *   for the available data type strings.
   * @return {boolean} The evaluation result.
   * @example
   *   exampleMethod = function(arg1, arg2) {
   *     checkArgs(arg1, '!object', arg2, 'number=');
   *   };
   */
  Vitals.checkArgs = (function setup_checkArgs(checkType, isValidTypeString,
                                               sliceArr) {

    ////////////////////////////////////////////////////////////////////////////
    // The Public Method
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ---------------------------------------------------
     * Public Method (checkArgs)
     * ---------------------------------------------------
     * @desc Catches invalid argument data types and throws an error.
     * @param {...*} arg - Each argument passed to the method.
     * @param {...string} type -  Each argument's optional data types.
     * @return {boolean} The evaluation result.
     */
    var checkArgs = function() {

      /** @type {number} */
      var i;
      /** @type {number} */
      var len;
      /** @type {*} */
      var arg;
      /** @type {string} */
      var type;
      /** @type {!Array<*>} */
      var args;
      /** @type {boolean} */
      var pass;
      /** @type {boolean} */
      var clean;
      /** @type {string} */
      var errorMsg;

      len = arguments.length;

      if (len < 2 || len % 2) {
        throw new Error('A Vitals.checkArgs call was missing params.');
      }

      args = sliceArr.call(arguments, 0);
      pass = true;

      i = -1;
      while (++i < len) {

        if (i % 2) {
          type = args[i];

          clean = checkType(type, 'string', true);
          clean = clean && isValidTypeString(type);
          clean || throwInvalidTypeString(type);

          pass = pass && checkType(arg, type, true);
        }
        else {
          arg = args[i];
        }
      }

      pass || throwInvalidArgError();

      return pass;
    };

    ////////////////////////////////////////////////////////////////////////////
    // The Private Methods
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ---------------------------------------------------
     * Private Method (throwInvalidTypeString)
     * ---------------------------------------------------
     * @desc Throws an error for an invalid data type string value.
     * @param {*} type - A known incorrect type value.
     */
    var throwInvalidTypeString = function(type) {

      /** @type {string} */
      var errorMsg;

      errorMsg = 'A Vitals.checkArgs call received an invalid type ';
      errorMsg += 'string. The value \'' + type + '\' was incorrect. ';
      errorMsg += 'Check Vitals.checkType\'s documentation for a ';
      errorMsg += 'list of acceptable type strings.';
      throw new Error(errorMsg);
    };

    /**
     * ---------------------------------------------------
     * Private Method (throwInvalidArgError)
     * ---------------------------------------------------
     * @desc Throws an error for an invalid argument.
     * @type {function}
     */
    var throwInvalidArgError = function() {

      /** @type {string} */
      var errorMsg;
      /** @type {(string|function)} */
      var msg;

      msg = defaults.checkArgsErrorMsg;

      errorMsg = (checkType(msg, 'string')) ? msg : msg();

      if (errorMsg && checkType(errorMsg, 'string')) {
        throw new TypeError(errorMsg);
      }
    };

    ////////////////////////////////////////////////////////////////////////////
    // The End Of The checkArgs Module
    ////////////////////////////////////////////////////////////////////////////

    return checkArgs;

  })(Vitals.checkType, Vitals.isValidTypeString,
     Array.prototype.slice);

/* -----------------------------------------------------------------------------
 * The getTypeOf Method (dev/js-methods/getTypeOf.js)
 * -------------------------------------------------------------------------- */

  /**
   * ---------------------------------------------------
   * Public Method (Vitals.getTypeOf)
   * ---------------------------------------------------
   * @desc A shortcut for the native typeof operator that additionally
   *   distinguishes null, array, document, and element types from an
   *   object type.
   * @param {*} val - The value to get the typeof.
   * @return {string} The value's type.
   */
  Vitals.getTypeOf = (function setup_getTypeOf(checkType, isArray) {

    return function getTypeOf(val) {

      /** @type {string} */
      var type;

      type = typeof val;

      if (type === 'object' && checkType(val, 'document|element|array')) {
        type = ( (val === null) ?
          'null' : (isArray(val)) ?
            'array' : (val.nodeType === 1) ?
              'element' : 'document'
        );
      }

      return type;
    };
  })(Vitals.checkType, Array.isArray);

/* -----------------------------------------------------------------------------
 * The copyObj Method (dev/js-methods/copyObj.js)
 * -------------------------------------------------------------------------- */

  /**
   * ---------------------------------------------------
   * Public Method (Vitals.copyObj)
   * ---------------------------------------------------
   * @desc Creates a new Object, Function, Array, or RegExp with the same
   *   properties and values as the provided object. Includes an optional deep
   *   copy (i.e. every property's value that is an object is also copied).
   * @param {(!Object|function|!Array|!RegExp)} oldObj - The object to copy.
   * @param {boolean=} deep - Deep copy the object. The default is false.
   * @return {(!Object|function|!Array|!RegExp)} The new object copy.
   */
  Vitals.copyObj = (function setup_copyObj(checkType) {

    ////////////////////////////////////////////////////////////////////////////
    // The Public copyObj Method
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ---------------------------------------------------
     * Public Method (copyObj)
     * ---------------------------------------------------
     * @desc See the description for Vitals.copyObj.
     * @param {(!Object|function)} oldObj
     * @param {boolean=} deep
     * @return {(!Object|function)}
     */
    var copyObj = function(oldObj, deep) {

      /** @type {(!Object|function|!Array|!RegExp)} */
      var newObj;
      /** @type {string} */
      var errorMsg;

      if ( !checkType(oldObj, '!object|function') ) {
        errorMsg = 'A Vitals.copyObj call received an invalid obj param.';
        throw new TypeError(errorMsg);
      }

      newObj = ( (Array.isArray(oldObj)) ?
        copyArr(oldObj) : ( checkType(oldObj, 'function') ) ?
          copyFunc(oldObj) : ( checkType(oldObj, 'regexp') ) ?
            copyRegex(oldObj) : copyProps(oldObj, {})
      );

      if (deep === true) {
        deepCopy(newObj);
      }

      return newObj;
    };

    ////////////////////////////////////////////////////////////////////////////
    // The Private copyObj Methods
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ---------------------------------------------------
     * Public Method (copyProps)
     * ---------------------------------------------------
     * @desc Handles copying one object's properties to another object.
     * @param {(!Object|function)} oldObj
     * @param {(!Object|function)} newObj
     * @return {(!Object|function)}
     */
    var copyProps = function(oldObj, newObj) {

      /** @type {string} */
      var prop;

      for (prop in oldObj) {
        if ( oldObj.hasOwnProperty(prop) ) {
          newObj[ prop ] = oldObj[ prop ];
        }
      }

      return newObj;
    };

    /**
     * ---------------------------------------------------
     * Private Method (copyFunc)
     * ---------------------------------------------------
     * @desc A helper method that copies a function.
     * @param {function} oldFunc - The function to copy.
     * @return {function} The new copied function.
     */
    var copyFunc = (function setup_copyFunc() {

      /** @type{!Object<string, !RegExp>} */
      var patterns;

      patterns = {
        comments: /\/\/.*?(?:[\r\n\u2028\u2029]|$)+|\/\*[\s\S]*?\*\//g,
        params  : /^function[\s\S]*?\(([\s\S]*?)\)[\s\S]*?$/,
        space   : /\s/g,
        start   : /^function[\s\S]*?\([\s\S]*?\)[\s\S]*?\{/,
        end     : /\}\;?\s*?$/
      };

      return function copyFunc(oldFunc) {

        /** @type {string} */
        var funcString;
        /** @type {string} */
        var funcParams;
        /** @type {string} */
        var funcBody;
        /** @type {function} */
        var newFunc;

        funcString = oldFunc.toString();
        funcString = funcString.replace(patterns.comments, '');

        funcParams = funcString.replace(patterns.params, '$1');
        funcParams = funcParams.replace(patterns.space, '');

        funcBody = funcString.replace(patterns.start, '');
        funcBody = funcBody.replace(patterns.end, '');

        newFunc = ( (funcParams) ?
          new Function(funcParams, funcBody) : new Function(funcBody)
        );

        copyProps(oldFunc, newFunc);

        return newFunc;
      };
    })();

    /**
     * ---------------------------------------------------
     * Private Method (copyArr)
     * ---------------------------------------------------
     * @desc A helper method that copies an Array.
     * @param {!Array} oldArr - The aray to copy.
     * @return {!Array} The new copied array.
     */
    var copyArr = function(oldArr) {
      return oldArr.slice(0);
    };

    /**
     * ---------------------------------------------------
     * Private Method (copyRegex)
     * ---------------------------------------------------
     * @desc A helper method that copies a RegExp.
     * @param {!RegExp} oldRegex - The RegExp to copy.
     * @return {!RegExp} The new copied RegExp.
     */
    var copyRegex = (function setup_copyRegex() {

      /** @type{!Object<string, string>} */
      var flagVals;

      flagVals = {
        global    : 'g',
        ignoreCase: 'i',
        multiline : 'm',
        sticky    : 'y'
      };

      return function copyRegex(oldRegex) {

        /** @type {string} */
        var source;
        /** @type {string} */
        var flags;
        /** @type {string} */
        var prop;

        source = oldRegex.source;
        flags = '';

        for (prop in flagVals) {
          if (flagVals.hasOwnProperty(prop) && oldRegex[ prop ]) {
            flags += flagVals[ prop ];
          }
        }

        return (flags) ? new RegExp(source, flags) : new RegExp(source);
      };
    })();

    /**
     * -------------------------------------------------
     * Private Method (deepFreeze)
     * -------------------------------------------------
     * @desc A helper to copyObj that recursively makes copies of its
     *   properties that are objects.
     * @param {(!Object|function|!Array|!RegExp)} obj
     */
    var deepCopy = function(obj) {

      /** @type {(!Object|function|!Array|!RegExp)} */
      var oldObj;
      /** @type {string} */
      var prop;
      /** @type {number} */
      var i;

      if ( checkType(oldObj, 'regexp') ) {
        return;
      }

      if ( Array.isArray(obj) ) {
        i = obj.length;
        while (i--) {
          oldObj = obj[i];
          if ( checkType(oldObj, '!object|function') ) {
            obj[i] = ( (Array.isArray(oldObj)) ?
              copyArr(oldObj) : ( checkType(oldObj, 'function') ) ?
                copyFunc(oldObj) : ( checkType(oldObj, 'regexp') ) ?
                  copyRegex(oldObj) : copyProps(oldObj, {})
            );
            deepCopy(obj[i]);
          }
        }
      }
      else {
        for (prop in obj) {
          if ( obj.hasOwnProperty(prop) ) {
            oldObj = obj[ prop ];
            if ( checkType(oldObj, '!object|function') ) {
              obj[ prop ] = ( (Array.isArray(oldObj)) ?
                copyArr(oldObj) : ( checkType(oldObj, 'function') ) ?
                  copyFunc(oldObj) : ( checkType(oldObj, 'regexp') ) ?
                    copyRegex(oldObj) : copyProps(oldObj, {})
              );
              deepCopy(obj[ prop ]);
            }
          }
        }
      }
    };

    ////////////////////////////////////////////////////////////////////////////
    // The End Of The copyObj Module
    ////////////////////////////////////////////////////////////////////////////

    return copyObj;

  })(Vitals.checkType);

/* -----------------------------------------------------------------------------
 * The freezeObj Method (dev/js-methods/freezeObj.js)
 * -------------------------------------------------------------------------- */

  /**
   * ---------------------------------------------------
   * Public Method (Vitals.freezeObj)
   * ---------------------------------------------------
   * @desc A shortcut for the Object.freeze method with an optional
   *   deep freeze (i.e. freezes all of an object's object properties).
   * @param {(!Object|function)} obj - The object to freeze.
   * @param {boolean=} deep - Deep freeze the object. The default is false.
   * @return {(!Object|function)} The frozen object.
   */
  Vitals.freezeObj = (function setup_freezeObj(hasFreezeRegExpBug,
                               checkType, objFreeze) {

    ////////////////////////////////////////////////////////////////////////////
    // The Public freezeObj Method
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ---------------------------------------------------
     * Public Method (freezeObj)
     * ---------------------------------------------------
     * @desc A shortcut for the Object.freeze method with an optional
     *   deep freeze (i.e. freezes all of an object's object properties).
     * @param {(!Object|function)} obj - The object to freeze.
     * @param {boolean=} deep - Deep freeze the object. The default is false.
     * @return {(!Object|function)} The frozen object.
     */
    var freezeObj = function(obj, deep) {

      /** @type {string} */
      var errorMsg;

      if ( !checkType(obj, '!object|function') ) {
        errorMsg = 'A Vitals.freezeObj call received an invalid obj param.';
        throw new TypeError(errorMsg);
      }

      if (hasFreezeRegExpBug && checkType(obj, 'regexp')) {
        return obj;
      }

      if (deep === true) {
        deepFreeze(obj);
      }
      else {
        objFreeze(obj);
      }

      return obj;
    };

    ////////////////////////////////////////////////////////////////////////////
    // The Private freezeObj Methods
    ////////////////////////////////////////////////////////////////////////////

    /**
     * -------------------------------------------------
     * Private Method (deepFreeze)
     * -------------------------------------------------
     * @desc A helper to freezeObj that recursively freezes all of its
     *   properties.
     * @param {(!Object|function)} obj - The object to freeze.
     */
    var deepFreeze = function(obj) {

      /** @type {string} */
      var prop;

      objFreeze(obj);

      for (prop in obj) {
        if (obj.hasOwnProperty(prop) &&
            checkType(obj[ prop ], '!object|function') &&
            (!hasFreezeRegExpBug || !checkType(obj, 'regexp'))) {
          deepFreeze(obj[ prop ]);
        }
      }
    };

    ////////////////////////////////////////////////////////////////////////////
    // The End Of The freezeObj Module
    ////////////////////////////////////////////////////////////////////////////

    return freezeObj;

  })(JsFeatures.freezeRegExpBug, Vitals.checkType, Object.freeze);

/* -----------------------------------------------------------------------------
 * The hasOwnProp Method (dev/js-methods/hasOwnProp.js)
 * -------------------------------------------------------------------------- */

  /**
   * ---------------------------------------------------
   * Public Method (Vitals.hasOwnProp)
   * ---------------------------------------------------
   * @desc A shortcut for the Object.prototype.hasOwnProperty method that does
   *   not throw errors for null values.
   * @param {(Object|?function)} obj - The object to check.
   * @param {string} prop - The property to check.
   * @return {boolean} The result of the check.
   */
  Vitals.hasOwnProp = (function setup_hasOwnProp(checkType) {

    return function hasOwnProp(obj, prop) {

      /** @type {string} */
      var errorMsg;

      if ( !checkType(obj, 'object|function') ) {
        errorMsg = 'A Vitals.hasOwnProp call received an invalid obj param.';
        throw new TypeError(errorMsg);
      }

      if (!checkType(prop, 'string|number') || prop === '') {
        errorMsg = 'A Vitals.hasOwnProp call received an invalid prop param.';
        throw new TypeError(errorMsg);
      }

      return !!obj && obj.hasOwnProperty(prop);
    };
  })(Vitals.checkType);

////////////////////////////////////////////////////////////////////////////////
// The DOM Shortcuts
////////////////////////////////////////////////////////////////////////////////

/* -----------------------------------------------------------------------------
 * The DOM Feature Detection (dev/dom-methods/feature-detect.js)
 * -------------------------------------------------------------------------- */

  /**
   * -----------------------------------------------------
   * Public Variable (DomFeatures)
   * -----------------------------------------------------
   * @desc Holds the results for DOM feature detection.
   * @type {!Object<string, boolean>}
   * @struct
   */
  var DomFeatures = {};

  /**
   * -----------------------------------------------------
   * Public Property (DomFeatures.textContent)
   * -----------------------------------------------------
   * @desc Indicates whether the browser supports the DOM property,
   *   [Node.textContent]{@link https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent}.
   * @type {boolean}
   */
  DomFeatures.textContent = ('textContent' in document);

  Object.freeze(DomFeatures);

/* -----------------------------------------------------------------------------
 * The DOM Helper Methods (dev/dom-methods/helpers.js)
 * -------------------------------------------------------------------------- */

  /**
   * -----------------------------------------------------
   * Public Variable (DomHelpers)
   * -----------------------------------------------------
   * @desc Holds helpers for the DOM shortcut methods.
   * @type {!Object<string, function>}
   * @struct
   */
  var DomHelpers = {};

  /**
   * -----------------------------------------------------
   * Public Method (DomHelpers.getElementsByClassNameAlt)
   * -----------------------------------------------------
   * @desc An alternative if native [DOM Node].getElementsByClassName fails.
   * @param {string} classname - The class name of the element to select.
   * @param {!(Document|Element)} root - Limit the selections to this element's
   *   children.
   * @return {!Array<HTMLElement>} The selected DOM elements.
   */
  DomHelpers.getElementsByClassNameAlt = function(classname, root) {

    /** @type {number} */
    var i;
    /** @type {number} */
    var len;
    /** @type {!HTMLElement} */
    var elem;
    /** @type {!Array<HTMLElement>} */
    var elems;
    /** @type {!Array<HTMLElement>} */
    var allElems;
    /** @type {*} */
    var xpathResult;
    /** @type {string} */
    var xpathPattern;
    /** @type {!RegExp} */
    var classnameRegex;

    if (!!root.querySelectorAll) {
      elems = root.querySelectorAll('.' + classname);
    }
    else if (!!document.evaluate) {

      elems = [];
      classname = ' ' + classname + ' ';
      xpathPattern = './/*[contains(concat(" ", @class, " "), ';
      xpathPattern = '"' + classname + '")]';
      xpathResult = document.evaluate(xpathPattern, root, null, 0, null);

      elem = xpathResult.iterateNext();
      while (elem) {
        elems.push(elem);
        elem = xpathResult.iterateNext();
      }
    }
    else {

      classnameRegex = new RegExp('(^|\s)' + classname + '(\s|$)');
      allElems = root.getElementsByTagName('*');
      elems = [];

      len = allElems.length;
      i = -1;
      while (++i < len) {
        elem = allElems[i];
        if ( classnameRegex.test(elem.className) ) {
          elems.push(elem);
        }
      }
    }

    return elems;
  };

  Vitals.freezeObj(DomHelpers, true);

/* -----------------------------------------------------------------------------
 * The getElemById Method (dev/dom-methods/getElemById.js)
 * -------------------------------------------------------------------------- */

  /**
   * ---------------------------------------------------
   * Public Method (Vitals.getElemById)
   * ---------------------------------------------------
   * @desc A shortcut for the native DOM method - document.getElementById.
   * @param {string} id - The id of the element to select.
   * @param {!Document=} root - Choose the document to find the element within.
   *   The default is the initial document instance or the document set with
   *   Vitals.set({ getElemByIdRoot: [document] }).
   * @return {?Element} The DOM element with the given id.
   */
  Vitals.getElemById = (function setup_getElemById(checkType) {

    return function getElemById(id, root) {

      /** @type {string} */
      var errorMsg;

      if (!id || !checkType(id, 'string')) {
        errorMsg = 'A Vitals.getElemById call received a non-string or ';
        errorMsg += 'empty string id param.';
        throw new TypeError(errorMsg);
      }

      if (!root || !checkType(root, '!element|document')) {
        root = defaults.getElemByIdRoot;
      }

      return root.getElementById(id);
    };

  })(Vitals.checkType);

/* -----------------------------------------------------------------------------
 * The getElemsByClass Method (dev/dom-methods/getElemsByClass.js)
 * -------------------------------------------------------------------------- */

  /**
   * ---------------------------------------------------
   * Public Method (Vitals.getElemsByClass)
   * ---------------------------------------------------
   * @desc A shortcut for the native DOM method -
   *   [DOM Node].getElementsByClassName.
   * @param {string} classname - The class name of the elements to select.
   * @param {(!Document|!Element)=} root - Limit the selections to this element's
   *   children. The default is document or the element set with
   *   Vitals.set({ getElemsByClassRoot: [DOM Node] }).
   * @return {?Array<!Element>} The selected DOM elements.
   */
  Vitals.getElemsByClass = (function setup_getElemsByClass(checkType,
                                     getElementsByClassNameAlt) {

    return function getElemsByClass(classname, root) {

      // Public vitals module vars used in this method:
      // var defaults;

      /** @type {string} */
      var errorMsg;
      /** @type {?Array<!Element>} */
      var elems;

      if (!checkType(classname, 'string') || classname === '') {
        errorMsg = 'A Vitals.getElemsByClass call received a non-string or ';
        errorMsg += 'empty string classname param.';
        throw new TypeError(errorMsg);
      }

      if (!root || !checkType(root, '!element|document')) {
        root = defaults.getElemsByClassRoot;
      }

      elems = ( (!!root.getElementsByClassName) ?
        root.getElementsByClassName(classname)
        : getElementsByClassNameAlt(classname, root)
      );

      return (elems && elems.length) ? elems : null;
    };

  })(Vitals.checkType, DomHelpers.getElementsByClassNameAlt);

/* -----------------------------------------------------------------------------
 * The getElemByClass Method (dev/dom-methods/getElemByClass.js)
 * -------------------------------------------------------------------------- */

  /**
   * ---------------------------------------------------
   * Public Method (Vitals.getElemByClass)
   * ---------------------------------------------------
   * @desc A shortcut for the native DOM method -
   *   [DOM Node].getElementsByClassName[ [index] ].
   * @param {string} classname - The class name of the element to select.
   * @param {number=} index - The index of the array of found elements to
   *   select. The default is 0.
   * @param {(!Element|!Document)=} root - Limit the selections to this element's
   *   children. The default is document or the element set with
   *   Vitals.set({ getElemByClassRoot: [DOM Node] }).
   * @return {?Element} The selected DOM element.
   */
  Vitals.getElemByClass = (function setup_getElemByClass(checkType,
                                                     getElemsByClass, floor) {

    /** @type {function(string, number=, (!Element|!Document)=): ?Element} */
    return function getElemByClass(classname, index, root) {

      // Public vitals module vars used in this method:
      // var defaults;

      /** @type {string} */
      var errorMsg;
      /** @type {?Array<!Element>} */
      var elems;

      if (!classname || !checkType(classname, 'string')) {
        errorMsg = 'A Vitals.getElemByClass call received a non-string or ';
        errorMsg += 'empty string classname param.';
        throw new TypeError(errorMsg);
      }

      if (!root || !checkType(root, '!element|document')) {
        root = ( (checkType(index, '!element|document')) ?
          index : defaults.getElemByClassRoot
        );
      }

      elems = getElemsByClass(classname, root);

      if (elems) {
        index = ( (!checkType(index, 'number') || index < -1) ?
          0 : (index < 0 || index >= elems.length) ?
            elems.length - 1 : floor(index)
        );
      }

      return elems && elems[ index ];
    };

  })(Vitals.checkType, Vitals.getElemsByClass, Math.floor);

/* -----------------------------------------------------------------------------
 * The getElemsByTag Method (dev/dom-methods/getElemsByTag.js)
 * -------------------------------------------------------------------------- */

  /**
   * ---------------------------------------------------
   * Public Method (Vitals.getElemsByTag)
   * ---------------------------------------------------
   * @desc A shortcut for the native DOM method -
   *   [DOM Node].getElementsByTagName.
   * @param {string} tag - The tag name of the elements to select.
   * @param {(!Document|!Element)=} root - Limit the selections to this element's
   *   children. The default is document or the element set with
   *   Vitals.set({ getElemsByTagRoot: [DOM Node] }).
   * @return {?Array<!Element>} The selected DOM elements.
   */
  Vitals.getElemsByTag = (function setup_getElemsByTag(checkType) {

    return function getElemsByTag(tag, root) {

      // Public vitals module vars used in this method:
      // var defaults;

      /** @type {string} */
      var errorMsg;
      /** @type {?Array<!Element>} */
      var elems;

      if (!checkType(tag, 'string') || tag === '') {
        errorMsg = 'A Vitals.getElemsByTag call received a non-string or ';
        errorMsg += 'empty string tag param.';
        throw new TypeError(errorMsg);
      }

      if (!root || !checkType(root, '!element|document')) {
        root = defaults.getElemsByTagRoot;
      }

      elems = root.getElementsByTagName(tag);

      return (elems && elems.length) ? elems : null;
    };

  })(Vitals.checkType);

/* -----------------------------------------------------------------------------
 * The getElemByTag Method (dev/dom-methods/getElemByTag.js)
 * -------------------------------------------------------------------------- */

  /**
   * ---------------------------------------------------
   * Public Method (Vitals.getElemByTag)
   * ---------------------------------------------------
   * @desc A shortcut for the native DOM method -
   *   [DOM Node].getElementsByTagName[ [index] ].
   * @param {string} tag - The tag name of the element to select.
   * @param {number=} index - The index of the array of found elements to
   *   select. The default is 0.
   * @param {(!Element|!Document)=} root - Limit the selections to this element's
   *   children. The default is document or the element set with
   *   Vitals.set({ getElemByTagRoot: [DOM Node] }).
   * @return {?Element} The selected DOM element.
   */
  Vitals.getElemByTag = (function setup_getElemByTag(checkType,
                                                    getElemsByTag, floor) {

    /** @type {function(string, number=, (!Element|!Document)=): ?Element} */
    return function getElemByTag(tag, index, root) {

      // Public vitals module vars used in this method:
      // var defaults;

      /** @type {string} */
      var errorMsg;
      /** @type {?Array<!Element>} */
      var elems;

      if (!tag || !checkType(tag, 'string')) {
        errorMsg = 'A Vitals.getElemByTag call received a non-string or ';
        errorMsg += 'empty string tag param.';
        throw new TypeError(errorMsg);
      }

      if (!root || !checkType(root, '!element|document')) {
        root = ( (checkType(index, '!element|document')) ?
          index : defaults.getElemByTagRoot
        );
      }

      elems = getElemsByTag(tag, root);

      if (elems) {
        index = ( (!checkType(index, 'number') || index < -1) ?
          0 : (index < 0 || index >= elems.length) ?
            elems.length - 1 : floor(index)
        );
      }

      return elems && elems[ index ];
    };

  })(Vitals.checkType, Vitals.getElemsByTag, Math.floor);

/* -----------------------------------------------------------------------------
 * The setElemText Method (dev/dom-methods/setElemText.js)
 * -------------------------------------------------------------------------- */

  /**
   * ---------------------------------------------------
   * Public Method (Vitals.setElemText)
   * ---------------------------------------------------
   * @desc A shortcut that sets the native DOM property - Element.textContent
   *   or Element.innerText.
   * @param {!Element} elem - The DOM element.
   * @param {string} text - The text to set the DOM element's textContent or
   *   innerText to.
   * @return {!Element} The updated DOM element.
   */
  Vitals.setElemText = (function setup_setElemText(checkType,
                                 hasTextContent) {

    return function setElemText(elem, text) {

      /** @type {string} */
      var errorMsg;

      if ( !checkType(elem, '!element') ) {
        errorMsg = 'A Vitals.setElemText call received a non-element ';
        errorMsg += 'elem param.';
        throw new TypeError(errorMsg);
      }

      if ( !checkType(text, 'string') ) {
        errorMsg = 'A Vitals.setElemText call received a non-string ';
        errorMsg += 'text param.';
        throw new TypeError(errorMsg);
      }

      if (hasTextContent) {
        elem.textContent = text;
      }
      else {
        elem.innerText = text;
      }

      return elem;
    };
  })(Vitals.checkType, DomFeatures.textContent);

/* -----------------------------------------------------------------------------
 * The makeElem Method (dev/dom-methods/makeElem.js)
 * -------------------------------------------------------------------------- */

  /**
   * ---------------------------------------------------
   * Public Method (Vitals.makeElem)
   * ---------------------------------------------------
   * @desc A shortcut for the native DOM method - document.createElement.
   * @param {(string|!Object<string, string>)=} settings - A string of the
   *   element's tag name or an object hash map of the element's details.
   *   The default tag name is 'div'.
   * @param {string=} settings.tag - The element's tag name.
   * @param {string=} settings.tagName - The element's tag name.
   * @param {string=} settings.text - The element's textContent or innerText.
   * @param {string=} settings.html - The element's innerHTML.
   * @param {string=} settings.id - The element's id.
   * @param {string=} settings.className - The element's class name.
   * @return {!Element} The DOM element with the given id.
   */
  Vitals.makeElem = (function setup_makeElem(checkType, setElemText) {

    return function makeElem(settings) {

      /** @type {!Element} */
      var elem;
      /** @type {string} */
      var tag;

      if ( checkType(settings, 'string') ) {
        tag = settings;
      }
      else if ( checkType(settings, '!object') ) {
        tag = settings.tag || settings.tagName;
      }
      else {
        settings = null;
      }

      tag = tag || 'div';
      elem = document.createElement(tag);

      if (settings) {

        if (settings.text && checkType(settings.text, 'string')) {
          setElemText(elem, settings.text);
        }

        if (settings.html && checkType(settings.html, 'string')) {
          elem.innerHTML = settings.html;
        }

        if (settings.id && checkType(settings.id, 'string')) {
          elem.id = settings.id;
        }

        if (settings.className && checkType(settings.className, 'string')) {
          elem.className = settings.className;
        }
      }

      return elem;
    };
  })(Vitals.checkType, Vitals.setElemText);

/* -----------------------------------------------------------------------------
 * The addElemText Method (dev/dom-methods/addElemText.js)
 * -------------------------------------------------------------------------- */

  /**
   * ---------------------------------------------------
   * Public Method (Vitals.addElemText)
   * ---------------------------------------------------
   * @desc A shortcut that adds to the native DOM property - Element.textContent
   *   or Element.innerText.
   * @param {!Element} elem - The DOM element.
   * @param {string} text - The text to add to the DOM element's textContent or
   *   innerText.
   * @return {!Element} The updated DOM element.
   */
  Vitals.addElemText = (function setup_addElemText(checkType,
                                 hasTextContent) {

    return function addElemText(elem, text) {

      /** @type {string} */
      var errorMsg;

      if ( !checkType(elem, '!element') ) {
        errorMsg = 'A Vitals.addElemText call received a non-element ';
        errorMsg += 'elem param.';
        throw new TypeError(errorMsg);
      }

      if ( !checkType(text, 'string') ) {
        errorMsg = 'A Vitals.addElemText call received a non-string ';
        errorMsg += 'text param.';
        throw new TypeError(errorMsg);
      }

      if (text) {
        if (hasTextContent) {
          elem.textContent += text;
        }
        else {
          elem.innerText += text;
        }
      }

      return elem;
    };
  })(Vitals.checkType, DomFeatures.textContent);

////////////////////////////////////////////////////////////////////////////////
// The Master Methods
////////////////////////////////////////////////////////////////////////////////

/* -----------------------------------------------------------------------------
 * The set Method (dev/master-methods/set.js)
 * -------------------------------------------------------------------------- */

  /**
   * -----------------------------------------------------
   * Public Method (Vitals.set)
   * -----------------------------------------------------
   * @desc Allows you to set the default settings for each Vitals method.
   * @param {!Object} settings - The default settings.
   * @param {(string|function)=} settings.checkArgsErrorMsg
   * @param {(!Document|!Element)=} settings.getElemByIdRoot
   * @param {(!Document|!Element)=} settings.getElemByClassRoot
   * @param {(!Document|!Element)=} settings.getElemsByClassRoot
   * @param {(!Document|!Element)=} settings.getElemByTagRoot
   * @param {(!Document|!Element)=} settings.getElemsByTagRoot
   * @return {boolean} The success of the new settings update.
   */
  Vitals.set = (function setup_set(checkType, hasOwnProp, types) {

    /** @type {function(string)} */
    var throwPropError = function(propName) {

      /** @type {string} */
      var errorMsg;

      errorMsg = 'A Vitals.set call received an invalid ' + propName + ' ';
      errorMsg += 'property for the settings param (the prop should be \'';
      errorMsg += types[ propName ] + '\').';
      throw new TypeError(errorMsg);
    };

    /** @type {function(!Object): boolean} */
    return function set(settings) {

      // Public vitals module vars used in this method:
      // var defaults;

      /** @type {string} */
      var errorMsg;
      /** @type {string} */
      var propName;

      if ( !checkType(settings, '!object') ) {
        errorMsg = 'A Vitals.set call received an invalid settings ';
        errorMsg += 'param (should be an object).';
        throw new TypeError(errorMsg);
      }

      for (propName in defaults) {
        if (hasOwnProp(defaults, propName) && hasOwnProp(settings, propName)) {
          if ( checkType(settings[ propName ], types[ propName ]) ) {
            defaults[ propName ] = settings[ propName ];
          }
          else {
            throwPropError(propName);
          }
        }
      }

      return true;
    };

  })(Vitals.checkType, Vitals.hasOwnProp, DEFAULTS.types);

/* -----------------------------------------------------------------------------
 * The reset Method (dev/master-methods/reset.js)
 * -------------------------------------------------------------------------- */

  /**
   * -----------------------------------------------------
   * Public Method (Vitals.reset)
   * -----------------------------------------------------
   * @desc Allows you to reset the default settings for each Vitals method.
   * @param {...(string|!Array<string>)=} setting - The setting(s) to reset
   *   to the on-load default. If undefined then all settings are reset.
   * @return {boolean} The success of the new settings update.
   */
  Vitals.reset = (function setup_reset(checkType, hasOwnProp,
                                       getObjKeys, sliceArr) {

    /** @type {function(...(string|!Array<string>)=): boolean} */
    return function reset() {

      // Public vitals module vars used in this method:
      // var defaults;
      // var DEFAULTS;

      /** @type {string} */
      var errorMsg;
      /** @type {!Array<string>} */
      var args;
      /** @type {string} */
      var prop;
      /** @type {number} */
      var len;
      /** @type {number} */
      var i;

      len = arguments.length;
      args = ( (!len) ?
        getObjKeys(defaults) : (len > 1) ?
          sliceArr.call(arguments, 0) : ( checkType(arguments[0], '!array') ) ?
            arguments[0] : [ arguments[0] ]
      );

      if ( !checkType(args, '!strings') ) {
        errorMsg = 'A Vitals.reset call received an invalid setting param ';
        errorMsg += '(should be a string or array of strings).';
        throw new TypeError(errorMsg);
      }

      i = args.length;
      while (i--) {
        prop = args[i];
        if ( hasOwnProp(defaults, prop) ) {
          defaults[ prop ] = DEFAULTS[ prop ];
        }
      }

      return true;
    };

  })(Vitals.checkType, Vitals.hasOwnProp,
     Object.keys, Array.prototype.slice);

////////////////////////////////////////////////////////////////////////////////
// Vitals Module End
////////////////////////////////////////////////////////////////////////////////

  return Vitals;
});