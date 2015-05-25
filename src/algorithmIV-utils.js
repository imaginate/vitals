/** @preserve blank line */

/**
 * -----------------------------------------------------------------------------
 * Algorithm IV JavaScript Shortcuts (v1.0.5)
 * -----------------------------------------------------------------------------
 * @file Algorithm IV's JavaScript shortcuts are a collection of methods that
 *   make programming in JavaScript easier. With an intuitive API and clear
 *   documentation we are sure you will appreciate the time you save using our
 *   shortcuts!
 * @module aIVUtils
 * @version 1.0.5
 * @author Adam Smith ({@link adamsmith@youlum.com})
 * @copyright 2015 Adam A Smith ([github.com/imaginate]{@link https://github.com/imaginate})
 * @license The Apache License ([algorithmiv.com/docs/license]{@link http://algorithmiv.com/docs/license})
 * @desc More details about the code base for aIV.utils:
 * <ol>
 *   <li>annotations: 
 *       [See Closure Compiler specific JSDoc]{@link https://developers.google.com/closure/compiler/docs/js-for-compiler}
 *       and [See JSDoc3]{@link http://usejsdoc.org/}
 *   </li>
 *   <li>contributing: 
 *       [See our guideline]{@link https://github.com/imaginate/algorithmIV-javascript-shortcuts/blob/master/CONTRIBUTING.md}
 *   </li>
 * </ol>
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
// The Dependencies
////////////////////////////////////////////////////////////////////////////////

/* -----------------------------------------------------------------------------
 * Algorithm IV JavaScript Polyfills (dependencies/algorithmIV-polyfills.min.js)
 * -------------------------------------------------------------------------- */

/* JSON3 v3.3.2 | https://bestiejs.github.io/json3 | Copyright 2012-2015, Kit Cambridge, Benjamin Tan | http://kit.mit-license.org */
(function(){function M(r,q){function p(a,l){try{a()}catch(c){l&&l()}}function k(a){if(null!=k[a])return k[a];var l;if("bug-string-char-index"==a)l="a"!="a"[0];else if("json"==a)l=k("json-stringify")&&k("date-serialization")&&k("json-parse");else if("date-serialization"==a){if(l=k("json-stringify")&&v){var c=q.stringify;p(function(){l='"-271821-04-20T00:00:00.000Z"'==c(new z(-864E13))&&'"+275760-09-13T00:00:00.000Z"'==c(new z(864E13))&&'"-000001-01-01T00:00:00.000Z"'==c(new z(-621987552E5))&&'"1969-12-31T23:59:59.999Z"'==
c(new z(-1))})}}else{var b;if("json-stringify"==a){var c=q.stringify,e="function"==typeof c;e&&((b=function(){return 1}).toJSON=b,p(function(){e="0"===c(0)&&"0"===c(new B)&&'""'==c(new A)&&c(t)===u&&c(u)===u&&c()===u&&"1"===c(b)&&"[1]"==c([b])&&"[null]"==c([u])&&"null"==c(null)&&"[null,null,null]"==c([u,t,null])&&'{"a":[1,true,false,null,"\\u0000\\b\\n\\f\\r\\t"]}'==c({a:[b,!0,!1,null,"\x00\b\n\f\r\t"]})&&"1"===c(null,b)&&"[\n 1,\n 2\n]"==c([1,2],null,1)},function(){e=!1}));l=e}if("json-parse"==a){var n=
q.parse,d;"function"==typeof n&&p(function(){0===n("0")&&!n(!1)&&(b=n('{"a":[1,true,false,null,"\\u0000\\b\\n\\f\\r\\t"]}'),d=5==b.a.length&&1===b.a[0])&&(p(function(){d=!n('"\t"')}),d&&p(function(){d=1!==n("01")}),d&&p(function(){d=1!==n("1.")}))},function(){d=!1});l=d}}return k[a]=!!l}r||(r=f.Object());q||(q=f.Object());var B=r.Number||f.Number,A=r.String||f.String,E=r.Object||f.Object,z=r.Date||f.Date,I=r.SyntaxError||f.SyntaxError,J=r.TypeError||f.TypeError,K=r.Math||f.Math,F=r.JSON||f.JSON;"object"==
typeof F&&F&&(q.stringify=F.stringify,q.parse=F.parse);var E=E.prototype,t=E.toString,G=E.hasOwnProperty,u,v=new z(-0xc782b5b800cec);p(function(){v=-109252==v.getUTCFullYear()&&0===v.getUTCMonth()&&1===v.getUTCDate()&&10==v.getUTCHours()&&37==v.getUTCMinutes()&&6==v.getUTCSeconds()&&708==v.getUTCMilliseconds()});k["bug-string-char-index"]=k["date-serialization"]=k.json=k["json-stringify"]=k["json-parse"]=null;if(!k("json")){var N=k("bug-string-char-index"),C=function(a,b){var c=0,g,e,n;(g=function(){this.valueOf=
0}).prototype.valueOf=0;e=new g;for(n in e)G.call(e,n)&&c++;g=e=null;c?C=function(a,c){var b="[object Function]"==t.call(a),l,e;for(l in a)b&&"prototype"==l||!G.call(a,l)||(e="constructor"===l)||c(l);(e||G.call(a,l="constructor"))&&c(l)}:(e="valueOf toString toLocaleString propertyIsEnumerable isPrototypeOf hasOwnProperty constructor".split(" "),C=function(a,c){var b="[object Function]"==t.call(a),l,g=!b&&"function"!=typeof a.constructor&&D[typeof a.hasOwnProperty]&&a.hasOwnProperty||G;for(l in a)b&&
"prototype"==l||!g.call(a,l)||c(l);for(b=e.length;l=e[--b];g.call(a,l)&&c(l));});return C(a,b)};if(!k("json-stringify")||!k(" date-serialization")){var L={92:"\\\\",34:'\\"',8:"\\b",12:"\\f",10:"\\n",13:"\\r",9:"\\t"},x=function(a,b){return("000000"+(b||0)).slice(-a)},V=function(a){a=a.charCodeAt(0);var b=L[a];return b?b:"\\u00"+x(2,a.toString(16))},O=/[\x00-\x1f\x22\x5c]/g,S=function(a){O.lastIndex=0;return'"'+(O.test(a)?a.replace(O,V):a)+'"'},P=function(a){var b,c,g,e,n,d,h,f,m;if(v)b=function(a){c=
a.getUTCFullYear();g=a.getUTCMonth();e=a.getUTCDate();d=a.getUTCHours();h=a.getUTCMinutes();f=a.getUTCSeconds();m=a.getUTCMilliseconds()};else{var w=K.floor,k=[0,31,59,90,120,151,181,212,243,273,304,334],p=function(a,c){return k[c]+365*(a-1970)+w((a-1969+(c=+(1<c)))/4)-w((a-1901+c)/100)+w((a-1601+c)/400)};b=function(a){e=w(a/864E5);for(c=w(e/365.2425)+1970-1;p(c+1,0)<=e;c++);for(g=w((e-p(c,0))/30.42);p(c,g+1)<=e;g++);e=1+e-p(c,g);n=(a%864E5+864E5)%864E5;d=w(n/36E5)%24;h=w(n/6E4)%60;f=w(n/1E3)%60;
m=n%1E3}}P=function(a){a>-1/0&&a<1/0?(b(a),a=(0>=c||1E4<=c?(0>c?"-":"+")+x(6,0>c?-c:c):x(4,c))+"-"+x(2,g+1)+"-"+x(2,e)+"T"+x(2,d)+":"+x(2,h)+":"+x(2,f)+"."+x(3,m)+"Z",c=g=e=d=h=f=m=null):a=null;return a};return P(a)},Q=function(a,b,c,g,e,n,d){var h,f,m,k,q,r;p(function(){h=b[a]});"object"==typeof h&&h&&(h.getUTCFullYear&&"[object Date]"==t.call(h)&&h.toJSON===z.prototype.toJSON?h=P(h):"function"==typeof h.toJSON&&(h=h.toJSON(a)));c&&(h=c.call(b,a,h));if(h==u)return h===u?h:"null";f=typeof h;"object"==
f&&(m=t.call(h));switch(m||f){case "boolean":case "[object Boolean]":return""+h;case "number":case "[object Number]":return h>-1/0&&h<1/0?""+h:"null";case "string":case "[object String]":return S(""+h)}if("object"==typeof h){for(f=d.length;f--;)if(d[f]===h)throw J();d.push(h);k=[];r=n;n+=e;if("[object Array]"==m){q=0;for(f=h.length;q<f;q++)m=Q(q,h,c,g,e,n,d),k.push(m===u?"null":m);f=k.length?e?"[\n"+n+k.join(",\n"+n)+"\n"+r+"]":"["+k.join(",")+"]":"[]"}else C(g||h,function(a){var b=Q(a,h,c,g,e,n,
d);b!==u&&k.push(S(a)+":"+(e?" ":"")+b)}),f=k.length?e?"{\n"+n+k.join(",\n"+n)+"\n"+r+"}":"{"+k.join(",")+"}":"{}";d.pop();return f}};q.stringify=function(a,b,c){var g,e,f,d;if(D[typeof b]&&b)if(d=t.call(b),"[object Function]"==d)e=b;else if("[object Array]"==d){f={};for(var h=0,m=b.length,k;h<m;k=b[h++],(d=t.call(k),"[object String]"==d||"[object Number]"==d)&&(f[k]=1));}if(c)if(d=t.call(c),"[object Number]"==d){if(0<(c-=c%1))for(g="",10<c&&(c=10);g.length<c;g+=" ");}else"[object String]"==d&&(g=
10>=c.length?c:c.slice(0,10));return Q("",(k={},k[""]=a,k),e,f,g,"",[])}}if(!k("json-parse")){var W=A.fromCharCode,X={92:"\\",34:'"',47:"/",98:"\b",116:"\t",110:"\n",102:"\f",114:"\r"},b,H,m=function(){b=H=null;throw I();},y=function(){for(var a=H,l=a.length,c,g,e,f,d;b<l;)switch(d=a.charCodeAt(b),d){case 9:case 10:case 13:case 32:b++;break;case 123:case 125:case 91:case 93:case 58:case 44:return c=N?a.charAt(b):a[b],b++,c;case 34:c="@";for(b++;b<l;)if(d=a.charCodeAt(b),32>d)m();else if(92==d)switch(d=
a.charCodeAt(++b),d){case 92:case 34:case 47:case 98:case 116:case 110:case 102:case 114:c+=X[d];b++;break;case 117:g=++b;for(e=b+4;b<e;b++)d=a.charCodeAt(b),48<=d&&57>=d||97<=d&&102>=d||65<=d&&70>=d||m();c+=W("0x"+a.slice(g,b));break;default:m()}else{if(34==d)break;d=a.charCodeAt(b);for(g=b;32<=d&&92!=d&&34!=d;)d=a.charCodeAt(++b);c+=a.slice(g,b)}if(34==a.charCodeAt(b))return b++,c;m();default:g=b;45==d&&(f=!0,d=a.charCodeAt(++b));if(48<=d&&57>=d){for(48==d&&(d=a.charCodeAt(b+1),48<=d&&57>=d)&&m();b<
l&&(d=a.charCodeAt(b),48<=d&&57>=d);b++);if(46==a.charCodeAt(b)){for(e=++b;e<l&&(d=a.charCodeAt(e),48<=d&&57>=d);e++);e==b&&m();b=e}d=a.charCodeAt(b);if(101==d||69==d){d=a.charCodeAt(++b);43!=d&&45!=d||b++;for(e=b;e<l&&(d=a.charCodeAt(e),48<=d&&57>=d);e++);e==b&&m();b=e}return+a.slice(g,b)}f&&m();c=a.slice(b,b+4);if("true"==c)return b+=4,!0;if("fals"==c&&101==a.charCodeAt(b+4))return b+=5,!1;if("null"==c)return b+=4,null;m()}return"$"},R=function(a){var b,c;"$"==a&&m();if("string"==typeof a){if("@"==
(N?a.charAt(0):a[0]))return a.slice(1);if("["==a){for(b=[];;){a=y();if("]"==a)break;c?","==a?(a=y(),"]"==a&&m()):m():c=!0;","==a&&m();b.push(R(a))}return b}if("{"==a){for(b={};;){a=y();if("}"==a)break;c?","==a?(a=y(),"}"==a&&m()):m():c=!0;","!=a&&"string"==typeof a&&"@"==(N?a.charAt(0):a[0])&&":"==y()||m();b[a.slice(1)]=R(y())}return b}m()}return a},U=function(a,b,c){c=T(a,b,c);c===u?delete a[b]:a[b]=c},T=function(a,b,c){var g=a[b],e;if("object"==typeof g&&g)if("[object Array]"==t.call(g))for(e=g.length;e--;U(g,
e,c));else C(g,function(a){U(g,a,c)});return c.call(a,b,g)};q.parse=function(a,f){var c,g;b=0;H=""+a;c=R(y());"$"!=y()&&m();b=H=null;return f&&"[object Function]"==t.call(f)?T((g={},g[""]=c,g),"",f):c}}}q.runInContext=M;return q}var I=typeof define==="function"&&define.amd,D={"function":!0,object:!0},A=D[typeof exports]&&exports&&!exports.nodeType&&exports,f=D[typeof window]&&window||this,p=A&&D[typeof module]&&module&&!module.nodeType&&"object"==typeof global&&global;!p||p.global!==p&&p.window!==
p&&p.self!==p||(f=p);if(A&&!I)M(f,A);else{var J=f.JSON,K=f.JSON3,L=!1,B=M(f,f.JSON3={noConflict:function(){L||(L=!0,f.JSON=J,f.JSON3=K,J=K=null);return B}});f.JSON={parse:B.parse,stringify:B.stringify}}I&&define(function(){return B})}).call(this);

/* Algorithm IV JavaScript Polyfills (v0.0.2) (learn@algorithmiv.com)
 * Author: Adam Smith (adamsmith@youlum.com)
 * Copyright (c) 2015 Adam A Smith (github.com/imaginate)
 * The Apache License (algorithmiv.com/docs/license) */
(function(h,m,n){h.console=h.console||{};(function(a,b){a.log||(a.log=b);a.error||(a.error=a.log);a.assert||(a.assert=function(b){var c;if(!b)return c=1<arguments.length?Array.prototype.slice.call(arguments,1):["A console.assert call failed."],a.error.apply(this,c)});a.clear||(a.clear=b);a.count||(a.count=b);a.debug||(a.debug=a.log);a.dir||(a.dir=a.log);a.dirxml||(a.dirxml=a.log);a.exception||(a.exception=a.error);a.group||(a.group=b);a.groupCollapsed||(a.groupCollapsed=a.group);a.groupEnd||(a.groupEnd=
b);a.info||(a.info=a.log);a.markTimeline||(a.markTimeline=a.timeStamp?a.timeStamp:b);a.profile||(a.profile=b);a.profileEnd||(a.profileEnd=b);a.table||(a.table=b);a.time||(a.time=b);a.timeEnd||(a.timeEnd=b);a.timeline||(a.timeline=b);a.timelineEnd||(a.timelineEnd=b);a.timeStamp||(a.timeStamp=a.markTimeline);a.trace||(a.trace=a.log);a.warn||(a.warn=a.error);(function(b,c,e,h){var f,k,l,g;if(b)if(l=["assert","error","info","log","warn"],g=["clear","dir","profile","profileEnd"],g=l.concat(g),c)for(f=
g.length;f--;)k=a[g[f]],a[g[f]]=c.call(k,a);else for(f=l.length;f--;)k=a[l[f]],e.call(k,a,h.call(arguments))})("object"===typeof a.log,Function.prototype.bind,Function.prototype.call,Array.prototype.slice)})(h.console,function(){});Object.keys||(Object.keys=function(){var a,b;a=!{toString:null}.propertyIsEnumerable("toString");b="toString toLocaleString valueOf hasOwnProperty isPrototypeOf propertyIsEnumerable constructor".split(" ");return function(d){var c,e;if(!d||"object"!==typeof d&&"function"!==
typeof d)throw new TypeError("An Object.keys call received an invalid object parameter. Note: It only accepts non-null objects and functions.");e=[];for(c in d)d.hasOwnProperty(c)&&e.push(c);if(a)for(c=b.length;c--;)d.hasOwnProperty(b[c])&&e.push(b[c]);return e}}());Object.freeze||(Object.freeze=function(a){if(!a||"object"!==typeof a&&"function"!==typeof a)throw new TypeError("An Object.freeze call received an invalid object parameter. Note: It only accepts non-null objects and functions.");return a});
try{Object.freeze(function(){})}catch(p){Object.freeze=function(a){return function(b){return"function"===typeof b?b:a(b)}}(Object.freeze)}Object.isFrozen||(Object.isFrozen=function(a){if(!a||"object"!==typeof a&&"function"!==typeof a)throw new TypeError("An Object.isFrozen call received an invalid object parameter. Note: It only accepts non-null objects and functions.");return!0});Array.isArray||(Array.isArray=function(a){return"[object Array]"===Object.prototype.toString.call(a)});(function(a){a&&
(a=[8,9],a=-1===a.indexOf(8,2)&&-1===a.indexOf(9,-1));return a})(!!Array.prototype.indexOf)||(Array.prototype.indexOf=function(a,b){var d,c,e;if(!Array.isArray(this))throw new TypeError("An Array.prototype.indexOf call was made on a non-array.");"number"!==typeof b&&(b=0);c=this.length;d=-1;if(0!==c&&Math.abs(b)<c)for(0>b&&(c-=b),e=0>b?-1:--b;++e<c;)if(this[e]===a){d=e;break}return d});XMLHttpRequest||(XMLHttpRequest=function(){var a;try{a=new ActiveXObject("Msxml2.XMLHTTP.6.0")}catch(b){try{a=new ActiveXObject("Msxml2.XMLHTTP.3.0")}catch(d){try{a=
new ActiveXObject("Microsoft.XMLHTTP")}catch(c){throw Error("Your browser does not support XMLHttpRequest.");}}}return a})})(window,document);

////////////////////////////////////////////////////////////////////////////////
// The Public API
////////////////////////////////////////////////////////////////////////////////

;(function(window, utilsModuleAPI) {
  "use strict";

/* -----------------------------------------------------------------------------
 * The Public API (public-api.js)
 * -------------------------------------------------------------------------- */

  /**
   * ---------------------------------------------------
   * Global Object (aIV)
   * ---------------------------------------------------
   * @desc Holds the public API for aIV's apps, tools, and libraries.
   * @struct
   * @global
   */
  window.aIV = window.aIV || {};

  /**
   * ---------------------------------------------------
   * Global Object (aIV.utils)
   * ---------------------------------------------------
   * @desc Holds the public API for aIV's JavaScript shortcuts. For more
   *   details on each of the methods see their complete [definitions in
   *   the src]{@link https://github.com/imaginate/algorithmIV-javascript-shortcuts/tree/master/src/pre-compiled-parts/methods}.
   * @type {!{
   *   checkType        : function(*, string, boolean=): boolean,
   *   isValidTypeString: function(string): boolean,
   *   freezeObj        : function((!Object|function), boolean=): (!Object|function),
   *   hasOwnProp       : function((!Object|function), string): boolean
   * }}
   * @struct
   * @global
   */
  aIV.utils = aIV.utils || utilsModuleAPI;

})(window,

////////////////////////////////////////////////////////////////////////////////
// The Utils Module
////////////////////////////////////////////////////////////////////////////////

(function(window, document, undefined) {
  "use strict";

/* -----------------------------------------------------------------------------
 * The Public Module Variables (module-vars.js)
 * -------------------------------------------------------------------------- */

  /**
   * -----------------------------------------------------
   * Public Variable (utilsModuleAPI)
   * -----------------------------------------------------
   * @desc Holds the module's public properties and methods.
   * @type {!Object<string, function>}
   * @struct
   */
  var utilsModuleAPI = {};

  /**
   * -----------------------------------------------------
   * Public Variable (DEFAULTS)
   * -----------------------------------------------------
   * @desc Holds each method's orginal defaults.
   * @type {!{
   *   checkArgsErrorMsg  : function,
   *   getElemByClassRoot : !Document,
   *   getElemsByClassRoot: !Document,
   *   getElemByTagRoot   : !Document,
   *   getElemsByTagRoot  : !Document
   * }}
   * @const
   */
  var DEFAULTS = {
    checkArgsErrorMsg  : 'A function call had an invalid parameter data type.',
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
    getElemByClassRoot : '!(Document|Element)',
    getElemsByClassRoot: '!(Document|Element)',
    getElemByTagRoot   : '!(Document|Element)',
    getElemsByTagRoot  : '!(Document|Element)'
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
   *   getElemByClassRoot : !(Document|Element),
   *   getElemsByClassRoot: !(Document|Element),
   *   getElemByTagRoot   : !(Document|Element),
   *   getElemsByTagRoot  : !(Document|Element)
   * }}
   */
  var defaults = {
    checkArgsErrorMsg  : DEFAULTS.checkArgsErrorMsg,
    getElemByClassRoot : DEFAULTS.getElemByClassRoot,
    getElemsByClassRoot: DEFAULTS.getElemsByClassRoot,
    getElemByTagRoot   : DEFAULTS.getElemByTagRoot,
    getElemsByTagRoot  : DEFAULTS.getElemsByTagRoot
  };

////////////////////////////////////////////////////////////////////////////////
// The JS Shortcuts
////////////////////////////////////////////////////////////////////////////////

/* -----------------------------------------------------------------------------
 * The checkType Method (js-methods/checkType.js)
 * -------------------------------------------------------------------------- */

  /**
   * ---------------------------------------------------
   * Public Method (utilsModuleAPI.checkType)
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
   *         <span>'function', 'elem', 'element', 'undefined', 'document'</span>
   *       </td>
   *       <td>
   *         <span>'strings', 'numbers', 'booleans', 'objects', </span>
   *         <span>'arrays', 'functions', 'elems', 'elements'</span>
   *       </td>
   *       <td>
   *         <span>'stringMap', 'numberMap', 'booleanMap', 'objectMap', </span>
   *         <span>'arrayMap', 'functionMap', 'elemMap', 'elementMap'</span>
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
  utilsModuleAPI.checkType = (function setup_checkType() {

    ////////////////////////////////////////////////////////////////////////////
    // The Public Method
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ---------------------------------------------------
     * Public Method (checkType)
     * ---------------------------------------------------
     * @desc Checks a value's data type against the given optional types.
     * @param {*} val - The value to be evaluated.
     * @param {string} type - A string of the data types to evaluate against.
     * @param {boolean=} noTypeValCheck - If true this method does not check
     *   the data type string for correctness. By default this is set to false.
     * @return {boolean} The evaluation result.
     */
    var checkType = function(val, type, noTypeValCheck) {

      /** @type {boolean} */
      var pass;
      /** @type {!strings} */
      var types;
      /** @type {boolean} */
      var nullable;
      /** @type {string} */
      var errorMsg;
      /** @type {boolean} */
      var nullableOverride;

      if ( !checkTypeOf(type, 'string') ) {
        errorMsg = 'An aIV.utils.checkType call received an invalid ';
        errorMsg += '(a non-string) type parameter.';
        throw new TypeError(errorMsg);
      }

      // Check for automatic pass (* = any value)
      pass = asterisk.test(type);

      // Catch and throw asterisk error
      if (pass) {
        (type.length > 1) && throwInvalidAsteriskUse();
        return true;
      }

      // Check for an optional undefined value
      pass = (val === undefined && equalSign.test(type));

      nullableOverride = (pass) ? true : checkForNullOverride(val, type);
      nullable = ( (pass || !nullableOverride || exclamationPoint.test(type)) ?
        false : questionMark.test(type)
      );

      // Check for null value with nullable true and override enabled
      pass = pass || (nullable && nullableOverride);

      if (!noTypeValCheck || !pass) {
        type = type.toLowerCase();
        type = type.replace(JsHelpers.exceptLowerAlphaAndPipe, '');
        types = type.split('|');

        noTypeValCheck || isValidTypeStrings(types);
      }

      if (!pass) {
        pass = ( (val === null) ?
          checkEachNullType(types, nullable, nullableOverride)
          : checkEachType(val, types)
        );
      }

      return pass;
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
    var nonNullableDataTypes = (function setup_nonNullableDataTypes() {

      /** @type {string} */
      var types;

      types = '^string$|^number$|^boolean$|^function$|^undefined$';

      return new RegExp(types);
    })();

    /**
     * -----------------------------------------------
     * Private Property (typeOfDataTypes)
     * -----------------------------------------------
     * @desc The data types that can be accurately checked with the
     *   native JavaScript typeof operator.
     * @type {!RegExp}
     */
    var typeOfDataTypes = (function setup_typeOfDataTypes() {

      /** @type {string} */
      var types;

      types = '^string$|^number$|^boolean$|^object$|^function$|^undefined$';

      return new RegExp(types);
    })();

    /**
     * -----------------------------------------------
     * Private Property (domNodeDataTypes)
     * -----------------------------------------------
     * @desc The data types that can be accurately checked with the
     *   DOM Node's interface.
     * @type {!RegExp}
     */
    var domNodeDataTypes = /^elem$|^element$|^document$/;

    /**
     * -----------------------------------------------
     * Private Property (arrayDataTypes)
     * -----------------------------------------------
     * @desc The array data types available to this module.
     * @type {!RegExp}
     */
    var arrayDataTypes = (function setup_arrayDataTypes() {

      /** @type {string} */
      var types;

      types = '^array$|^strings$|^numbers$|^booleans$|^objects$|' +
              '^arrays$|^elems$|^elements$|^functions$';

      return new RegExp(types);
    })();

    /**
     * -----------------------------------------------
     * Private Property (mapDataTypes)
     * -----------------------------------------------
     * @desc The hash map types available to this module.
     * @type {!RegExp}
     */
    var mapDataTypes = (function setup_mapDataTypes() {

      /** @type {string} */
      var types;

      types = '^stringmap$|^numbermap$|^booleanmap$|^objectmap$|' +
              '^arraymap$|^functionmap$|^elemmap$|^elementmap$';

      return new RegExp(types);
    })();

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

      errorMsg = 'An aIV.utils.checkType call received an invalid type ';
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
     * @param {*} val - The value to be evaluated.
     * @param {string} type - A string of the data types to evaluate against.
     * @return {boolean} The nullable override value.
     */
    var checkForNullOverride = function(val, type) {

      /** @type {boolean} */
      var nullCheck;
      /** @type {boolean} */
      var override;

      nullCheck = (val === null);

      override = (nullCheck) ? exclamationPoint.test(type) : true;

      if (nullCheck && questionMark.test(type)) {
        override = !override;
      }

      return override;
    };

    /**
     * ---------------------------------------------------
     * Private Method (isValidTypeStrings)
     * ---------------------------------------------------
     * @desc Evaluates whether each value is a valid data type string.
     * @param {!strings} types - The strings to evaluate.
     * @return {boolean} The evaluation result.
     */
    var isValidTypeStrings = function(types) {

      /** @type {number} */
      var i;
      /** @type {boolean} */
      var pass;
      /** @type {string} */
      var errorMsg;

      pass = true;

      i = types.length;
      while (pass && i--) {
        pass = JsHelpers.allDataTypes.test(types[i]);
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

      errorMsg = 'An aIV.utils.checkType call received an invalid type ';
      errorMsg += 'string. The value \'' + type + '\' was incorrect. ';
      errorMsg += 'Check aIV.utils.checkType\'s documentation for a ';
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

      // Test the value against each type
      i = types.length;
      while (!pass && i--) {

        type = types[i];

        if (type === 'any') {
          pass = true;
          break;
        }

        if ( typeOfDataTypes.test(type) ) {
          pass = checkTypeOf(val, type);
          continue;
        }

        if ( domNodeDataTypes.test(type) ) {
          pass = checkNodeType(val, type);
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
     * @param {boolean} nullable - The starting nullable value.
     * @param {boolean} override - Whether a nullable override exists.
     * @return {boolean} The evaluation result.
     */
    var checkEachNullType = function(types, nullable, override) {

      /** @type {number} */
      var i;
      /** @type {boolean} */
      var pass;

      pass = false;

      // Test the nullable value of each type
      i = types.length;
      while (!pass && i--) {

        if (!override) {
          nullable = !nonNullableDataTypes.test(types[i]);
        }

        pass = nullable;
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
      if (val === null) {
        return false;
      }
      return (typeof val === type);
    };

    /**
     * ---------------------------------------------------
     * Private Method (checkNodeType)
     * ---------------------------------------------------
     * @desc Checks a value's instanceof against the given type.
     * @param {*} val - The value to be evaluated.
     * @param {string} type - The data type.
     * @return {boolean} The evaluation result.
     */
    var checkNodeType = function(val, type) {

      /** @type {!Object<string, number>} */
      var types;

      if (!val || !checkTypeOf(val, 'object') || !val.nodeType) {
        return false;
      }

      types = {
        'elem'    : 1,
        'element' : 1,
        'document': 9
      };

      return (val.nodeType === types[ type ]);
    };

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

      if (type === 'array') {
        return true;
      }

      type = type.slice(0, -1);

      testFunc = ( (type === 'array') ?
        Array.isArray : ( domNodeDataTypes.test(type) ) ?
          checkNodeType : checkTypeOf
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

      testFunc = ( (type === 'array') ?
        Array.isArray : ( domNodeDataTypes.test(type) ) ?
          checkNodeType : checkTypeOf
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

  })();

/* -----------------------------------------------------------------------------
 * The isValidTypeString Method (js-methods/isValidTypeString.js)
 * -------------------------------------------------------------------------- */

  /**
   * ---------------------------------------------------
   * Public Method (utilsModuleAPI.isValidTypeString)
   * ---------------------------------------------------
   * @desc Evaluates whether a string is a valid data type string.
   * @param {string} typeString - The string to evaluate.
   * @return {boolean} The evaluation result.
   */
  utilsModuleAPI.isValidTypeString = function(typeString) {

    /** @type {number} */
    var i;
    /** @type {boolean} */
    var pass;
    /** @type {!strings} */
    var typeArr;
    /** @type {string} */
    var errorMsg;

    if (typeof typeString !== 'string') {
      errorMsg = 'An aIV.utils.isValidTypeString call received an invalid ';
      errorMsg += '(a non-string) typeString parameter.';
      throw new TypeError(errorMsg);
    }

    typeString = typeString.toLowerCase();
    typeString = typeString.replace(JsHelpers.exceptLowerAlphaAndPipe, '');
    typeArr = typeString.split('|');
    pass = true;

    i = typeArr.length;
    while (pass && i--) {
      pass = JsHelpers.allDataTypes.test(typeArr[i]);
    }

    return pass;
  };

/* -----------------------------------------------------------------------------
 * The checkArgs Method (js-methods/checkArgs.js)
 * -------------------------------------------------------------------------- */

  /**
   * ---------------------------------------------------
   * Public Method (utilsModuleAPI.checkArgs)
   * ---------------------------------------------------
   * @desc Catches invalid argument data types and throws an error.
   * @param {...*} val - Each argument passed to the method.
   * @param {...string} type -  Each argument's optional data types.
   *   [See aIV.utils.checkType]{@link https://github.com/imaginate/algorithmIV-javascript-shortcuts/blob/master/src/pre-compiled-parts/js-methods/checkType.js}
   *   for the available data type strings.
   * @return {boolean} The evaluation result.
   * @example
   *   exampleMethod = function(arg1, arg2) {
   *     checkArgs(arg1, '!object', arg2, 'number=');
   *   };
   */
  utilsModuleAPI.checkArgs = (function setup_checkArgs() {

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
        errorMsg = 'An aIV.utils.checkArgs call was missing parameters.';
        throw new Error(errorMsg);
      }

      args = Array.prototype.slice.call(arguments, 0);
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
     * Private Method (checkType)
     * ---------------------------------------------------
     * @desc Checks a value's data type against the given optional types.
     * @param {*} val - The value to be evaluated.
     * @param {string} type - A string of the data types to evaluate against.
     * @param {boolean=} noTypeValCheck - If true this method does not check
     *   the data type string for correctness. By default this is set to false.
     * @return {boolean} The evaluation result.
     */
    var checkType = utilsModuleAPI.checkType;

    /**
     * ---------------------------------------------------
     * Private Method (isValidTypeString)
     * ---------------------------------------------------
     * @desc Evaluates whether a string is a valid data type string.
     * @param {string} typeString - The string to evaluate.
     * @return {boolean} The evaluation result.
     */
    var isValidTypeString = utilsModuleAPI.isValidTypeString;

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

      errorMsg = 'An aIV.utils.checkArgs call received an invalid type ';
      errorMsg += 'string. The value \'' + type + '\' was incorrect. ';
      errorMsg += 'Check aIV.utils.checkType\'s documentation for a ';
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

  })();

/* -----------------------------------------------------------------------------
 * The getTypeOf Method (js-methods/getTypeOf.js)
 * -------------------------------------------------------------------------- */

  /**
   * ---------------------------------------------------
   * Public Method (utilsModuleAPI.getTypeOf)
   * ---------------------------------------------------
   * @desc A shortcut for the native typeof operator that additionally
   *   distinguishes null, array, document, and element types from an
   *   object type.
   * @param {*} val - The value to get the typeof.
   * @return {string} The value's type.
   */
  utilsModuleAPI.getTypeOf = (function setup_getTypeOf() {

    ////////////////////////////////////////////////////////////////////////////
    // The Public Method
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ---------------------------------------------------
     * Public Method (getTypeOf)
     * ---------------------------------------------------
     * @desc A shortcut for the native typeof operator that additionally
     *   distinguishes null, array, document, and element types from an
     *   object type.
     * @param {*} val - The value to get the typeof.
     * @return {string} The value's type.
     */
    var getTypeOf = function(val) {

      /** @type {string} */
      var type;

      type = typeof val;

      if (type === 'object' && checkType(val, 'document|element|array')) {
        type = ( (val === null) ?
          'null' : (Array.isArray(val)) ?
            'array' : (val.nodeType === 1) ?
              'element' : 'document'
        );
      }

      return type;
    };

    ////////////////////////////////////////////////////////////////////////////
    // The Private Methods
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ---------------------------------------------------
     * Private Method (checkType)
     * ---------------------------------------------------
     * @desc Checks a value's data type against the given optional types.
     * @param {*} val - The value to be evaluated.
     * @param {string} type - A string of the data types to evaluate against.
     * @param {boolean=} noTypeValCheck - If true this method does not check
     *   the data type string for correctness. By default this is set to false.
     * @return {boolean} The evaluation result.
     */
    var checkType = utilsModuleAPI.checkType;

    ////////////////////////////////////////////////////////////////////////////
    // The End Of The getTypeOf Module
    ////////////////////////////////////////////////////////////////////////////

    return getTypeOf;

  })();

/* -----------------------------------------------------------------------------
 * The freezeObj Method (js-methods/freezeObj.js)
 * -------------------------------------------------------------------------- */

  /**
   * ---------------------------------------------------
   * Public Method (utilsModuleAPI.freezeObj)
   * ---------------------------------------------------
   * @desc A shortcut for the Object.freeze method with an optional
   *   deep freeze (i.e. freezes all of an object's object properties).
   * @param {(!Object|function)} obj - The object to freeze.
   * @param {boolean=} deep - Deep freeze the object. The default is false.
   * @return {(!Object|function)} The frozen object.
   */
  utilsModuleAPI.freezeObj = (function setup_freezeObj() {

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

      if (!obj || (typeof obj !== 'object' && typeof obj !== 'function')) {
        errorMsg = 'An aIV.utils.freezeObj call received an invalid obj ';
        errorMsg += 'parameter.';
        throw new TypeError(errorMsg);
      }

      if (typeof deep !== 'boolean') {
        deep = false;
      }

      if (deep) {
        deepFreeze(obj);
      }
      else {
        Object.freeze(obj);
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

      Object.freeze(obj);

      for (prop in obj) {
        if (obj.hasOwnProperty(prop) && obj[ prop ] &&
            (typeof obj[ prop ] === 'object' ||
             typeof obj[ prop ] === 'function')) {
          deepFreeze(obj[ prop ]);
        }
      }
    };

    ////////////////////////////////////////////////////////////////////////////
    // The End Of The freezeObj Module
    ////////////////////////////////////////////////////////////////////////////

    return freezeObj;

  })();

/* -----------------------------------------------------------------------------
 * The hasOwnProp Method (js-methods/hasOwnProp.js)
 * -------------------------------------------------------------------------- */

  /**
   * ---------------------------------------------------
   * Public Method (utilsModuleAPI.hasOwnProp)
   * ---------------------------------------------------
   * @desc A shortcut for the Object.prototype.hasOwnProperty method.
   * @param {(!Object|function)} obj - The object to check.
   * @param {string} prop - The property to check.
   * @return {boolean} The result of the check.
   */
  utilsModuleAPI.hasOwnProp = function(obj, prop) {

    /** @type {string} */
    var errorMsg;

    if (!obj || (typeof obj !== 'object' && typeof obj !== 'function')) {
      errorMsg = 'An aIV.utils.hasOwnProp call received an invalid obj ';
      errorMsg += 'parameter.';
      throw new TypeError(errorMsg);
    }

    if (!prop || (typeof prop !== 'string' && typeof prop !== 'number')) {
      errorMsg = 'An aIV.utils.hasOwnProp call received an invalid prop ';
      errorMsg += 'parameter.';
      throw new TypeError(errorMsg);
    }

    return obj.hasOwnProperty(prop);
  };

/* -----------------------------------------------------------------------------
 * The JS Helper Methods (js-methods/helpers.js)
 * -------------------------------------------------------------------------- */

  /**
   * -----------------------------------------------------
   * Public Variable (JsHelpers)
   * -----------------------------------------------------
   * @desc Holds helpers for the DOM shortcut methods.
   * @type {!Object<string, RegExp>}
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
  JsHelpers.allDataTypes = (function setupJsHelpers_allDataTypes() {

    /** @type {string} */
    var types;

    types = '' +
    '^any$|^string$|^number$|^boolean$|^object$|^array$|^function$|^elem$|'    +
    '^element$|^undefined$|^null$|^document$|^strings$|^numbers$|^booleans$|'  +
    '^objects$|^arrays$|^elems$|^elements$|^functions$|^stringmap$|'           +
    '^numbermap$|^booleanmap$|^objectmap$|^arraymap$|^functionmap$|^elemmap$|' +
    '^elementmap$';

    return new RegExp(types);
  })();

  /**
   * -----------------------------------------------------
   * Public Property (JsHelpers.exceptLowerAlphaAndPipe)
   * -----------------------------------------------------
   * @desc A regex matching all characters except lowercase letters and the pipe.
   * @type {!RegExp}
   */
  JsHelpers.exceptLowerAlphaAndPipe = /[^a-z\|]/g;

////////////////////////////////////////////////////////////////////////////////
// The DOM Shortcuts
////////////////////////////////////////////////////////////////////////////////

/* -----------------------------------------------------------------------------
 * The getElemById Method (dom-methods/getElemById.js)
 * -------------------------------------------------------------------------- */

  /**
   * ---------------------------------------------------
   * Public Method (utilsModuleAPI.getElemById)
   * ---------------------------------------------------
   * @desc A shortcut for the native DOM method - document.getElementById.
   * @param {string} id - The id of the element to select.
   * @return {!HTMLElement} The DOM element with the given id.
   */
  utilsModuleAPI.getElemById = function(id) {

    /** @type {string} */
    var errorMsg;
    /** @type {HTMLElement} */
    var elem;

    if (!id || typeof id !== 'string') {
      errorMsg = 'An aIV.utils.getElemById call received an invalid id ';
      errorMsg += 'parameter (should be a string).';
      throw new TypeError(errorMsg);
      return;
    }

    elem = document.getElementById(id);

    if (!elem) {
      errorMsg = 'An aIV.utils.getElemById call received an invalid id ';
      errorMsg += 'parameter (i.e. no element with the id was found).';
      throw new RangeError(errorMsg);
      return;
    }

    return elem;
  };

/* -----------------------------------------------------------------------------
 * The getElemByClass Method (dom-methods/getElemByClass.js)
 * -------------------------------------------------------------------------- */

  /**
   * ---------------------------------------------------
   * Public Method (utilsModuleAPI.getElemByClass)
   * ---------------------------------------------------
   * @desc A shortcut for the native DOM method -
   *   [DOM Node].getElementsByClassName[ [index] ].
   * @param {string} classname - The class name of the element to select.
   * @param {number=} index - The index of the array of found elements to
   *   select. The default is 0.
   * @param {!(Document|Element)=} root - Limit the selections to this element's
   *   children. The default is document or the element set with
   *   aIV.utils.set({ getElemByClassRoot: [DOM Node] }).
   * @return {!HTMLElement} The selected DOM element.
   */
  utilsModuleAPI.getElemByClass = function(classname, index, root) {

    /** @type {string} */
    var errorMsg;
    /** @type {!Array<HTMLElement>} */
    var elems;
    /** @type {HTMLElement} */
    var elem;

    if (!classname || typeof classname !== 'string') {
      errorMsg = 'An aIV.utils.getElemByClass call received an invalid class ';
      errorMsg += 'name parameter.';
      throw new TypeError(errorMsg);
      return;
    }

    if (typeof index !== 'number' || index < -1) {
      index = 0;
    }
    else {
      index = Math.floor(index);
    }

    if (!root || typeof root !== 'object' ||
        (!(root instanceof Element) && !(root instanceof Document))) {
      root = defaults.getElemByClassRoot;
    }

    elems = ( (!!root.getElementsByClassName) ?
      root.getElementsByClassName(classname)
      : DomHelpers.getElementsByClassNameAlt(classname, root)
    );

    if (index < 0 || index >= elems.length) {
      index = elems.length - 1;
    }

    elem = elems[ index ];

    if (!elem) {
      errorMsg = 'An aIV.utils.getElemByClass call ';
      errorMsg += 'received an invalid class name parameter ';
      errorMsg += '(i.e. no element with the class name was found).';
      throw new RangeError(errorMsg);
      return;
    }

    return elem;
  };

/* -----------------------------------------------------------------------------
 * The getElemsByClass Method (dom-methods/getElemsByClass.js)
 * -------------------------------------------------------------------------- */

  /**
   * ---------------------------------------------------
   * Public Method (utilsModuleAPI.getElemsByClass)
   * ---------------------------------------------------
   * @desc A shortcut for the native DOM method -
   *   [DOM Node].getElementsByClassName.
   * @param {string} classname - The class name of the elements to select.
   * @param {!(Document|Element)=} root - Limit the selections to this element's
   *   children. The default is document or the element set with
   *   aIV.utils.set({ getElemsByClassRoot: [DOM Node] }).
   * @return {!Array<HTMLElement>} The selected DOM elements.
   */
  utilsModuleAPI.getElemsByClass = function(classname, root) {

    /** @type {string} */
    var errorMsg;
    /** @type {!Array<HTMLElement>} */
    var elems;

    if (!classname || typeof classname !== 'string') {
      errorMsg = 'An aIV.utils.getElemsByClass call received an invalid class ';
      errorMsg += 'name parameter.';
      throw new TypeError(errorMsg);
      return;
    }

    if (!root || typeof root !== 'object' ||
        (!(root instanceof Element) && !(root instanceof Document))) {
      root = defaults.getElemsByClassRoot;
    }

    elems = ( (!!root.getElementsByClassName) ?
      root.getElementsByClassName(classname)
      : DomHelpers.getElementsByClassNameAlt(classname, root)
    );

    return elems;
  };

/* -----------------------------------------------------------------------------
 * The getElemByTag Method (dom-methods/getElemByTag.js)
 * -------------------------------------------------------------------------- */

  /**
   * ---------------------------------------------------
   * Public Method (utilsModuleAPI.getElemByTag)
   * ---------------------------------------------------
   * @desc A shortcut for the native DOM method -
   *   [DOM Node].getElementsByTagName[ [index] ].
   * @param {string} tag - The tag name of the element to select.
   * @param {number=} index - The index of the array of found elements to
   *   select. The default is 0.
   * @param {!(Document|Element)=} root - Limit the selections to this element's
   *   children. The default is document or the element set with
   *   aIV.utils.set({ getElemByTagRoot: [DOM Node] }).
   * @return {!HTMLElement} The selected DOM element.
   */
  utilsModuleAPI.getElemByTag = function(tag, index, root) {

    /** @type {string} */
    var errorMsg;
    /** @type {!Array<HTMLElement>} */
    var elems;
    /** @type {HTMLElement} */
    var elem;

    if (!tag || typeof tag !== 'string') {
      errorMsg = 'An aIV.utils.getElemByTag call received an invalid tag name ';
      errorMsg += 'parameter.';
      throw new TypeError(errorMsg);
      return;
    }

    if (typeof index !== 'number' || index < -1) {
      index = 0;
    }
    else {
      index = Math.floor(index);
    }

    if (!root || typeof root !== 'object' ||
        (!(root instanceof Element) && !(root instanceof Document))) {
      root = defaults.getElemByTagRoot;
    }

    elems = root.getElementsByTagName(tag);

    if (index < 0 || index >= elems.length) {
      index = elems.length - 1;
    }

    elem = elems[ index ];

    if (!elem) {
      errorMsg = 'An aIV.utils.getElemByTag call ';
      errorMsg += 'received an invalid tag name parameter ';
      errorMsg += '(i.e. no element with the tag name was found).';
      throw new RangeError(errorMsg);
      return;
    }

    return elem;
  };

/* -----------------------------------------------------------------------------
 * The getElemsByTag Method (dom-methods/getElemsByTag.js)
 * -------------------------------------------------------------------------- */

  /**
   * ---------------------------------------------------
   * Public Method (utilsModuleAPI.getElemsByTag)
   * ---------------------------------------------------
   * @desc A shortcut for the native DOM method -
   *   [DOM Node].getElementsByTagName.
   * @param {string} tag - The tag name of the elements to select.
   * @param {!(Document|Element)=} root - Limit the selections to this element's
   *   children. The default is document or the element set with
   *   aIV.utils.set({ getElemsByTagRoot: [DOM Node] }).
   * @return {!Array<HTMLElement>} The selected DOM elements.
   */
  utilsModuleAPI.getElemsByTag = function(tag, root) {

    /** @type {string} */
    var errorMsg;

    if (!tag || typeof tag !== 'string') {
      errorMsg = 'An aIV.utils.getElemsByTag call received an invalid tag ';
      errorMsg += 'name parameter.';
      throw new TypeError(errorMsg);
      return;
    }

    if (!root || typeof root !== 'object' ||
        (!(root instanceof Element) && !(root instanceof Document))) {
      root = defaults.getElemsByTagRoot;
    }

    return root.getElementsByTagName(tag);
  };

/* -----------------------------------------------------------------------------
 * The makeElem Method (dom-methods/makeElem.js)
 * -------------------------------------------------------------------------- */

  /**
   * ---------------------------------------------------
   * Public Method (utilsModuleAPI.makeElem)
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
   * @return {!HTMLElement} The DOM element with the given id.
   */
  utilsModuleAPI.makeElem = function(settings) {

    /** @type {HTMLElement} */
    var elem;
    /** @type {string} */
    var tag;

    if (settings && typeof settings === 'string') {
      tag = settings;
      settings = null;
    }
    else if (settings && typeof settings === 'object') {
      if (settings.hasOwnProperty('tag') && settings.tag &&
          typeof settings.tag === 'string') {
        tag = settings.tag;
      }
      else if (settings.hasOwnProperty('tagName') && settings.tagName &&
          typeof settings.tagName === 'string') {
        tag = settings.tagName;
      }
    }
    else {
      settings = null;
    }

    if (!tag) {
      tag = 'div';
    }

    elem = document.createElement(tag);

    if (settings) {

      if (settings.hasOwnProperty('text') && settings.text &&
          typeof settings.text === 'string') {
        if (!!elem.textContent) {
          elem.textContent = settings.text;
        }
        else {
          elem.innerText = settings.text;
        }
      }

      if (settings.hasOwnProperty('html') && settings.html &&
          typeof settings.html === 'string') {
        elem.innerHTML = settings.html;
      }

      if (settings.hasOwnProperty('id') && settings.id &&
          typeof settings.id === 'string') {
        elem.id = settings.id;
      }

      if (settings.hasOwnProperty('className') && settings.className &&
          typeof settings.className === 'string') {
        elem.className = settings.className;
      }
    }

    return elem;
  };

/* -----------------------------------------------------------------------------
 * The setElemText Method (dom-methods/setElemText.js)
 * -------------------------------------------------------------------------- */

  /**
   * ---------------------------------------------------
   * Public Method (utilsModuleAPI.setElemText)
   * ---------------------------------------------------
   * @desc A shortcut that sets the native DOM property - Element.textContent
   *   or Element.innerText.
   * @param {!Element} elem - The DOM element.
   * @param {string} text - The text to set the DOM element's textContent or
   *   innerText to.
   * @return {!Element} The updated DOM element.
   */
  utilsModuleAPI.setElemText = function(elem, text) {

    /** @type {string} */
    var errorMsg;

    if (!elem || typeof elem !== 'object' || !(elem instanceof Element)) {
      errorMsg = 'An aIV.utils.setElemText call received an invalid elem ';
      errorMsg += 'parameter (should be a DOM Element).';
      throw new TypeError(errorMsg);
      return;
    }

    if (!text || typeof text !== 'string') {
      errorMsg = 'An aIV.utils.setElemText call received an invalid text ';
      errorMsg += 'parameter (should be a string).';
      throw new TypeError(errorMsg);
      return;
    }

    if (!!elem.textContent) {
      elem.textContent = text;
    }
    else {
      elem.innerText = text;
    }

    return elem;
  };

/* -----------------------------------------------------------------------------
 * The addElemText Method (dom-methods/addElemText.js)
 * -------------------------------------------------------------------------- */

  /**
   * ---------------------------------------------------
   * Public Method (utilsModuleAPI.addElemText)
   * ---------------------------------------------------
   * @desc A shortcut that adds to the native DOM property - Element.textContent
   *   or Element.innerText.
   * @param {!Element} elem - The DOM element.
   * @param {string} text - The text to add to the DOM element's textContent or
   *   innerText.
   * @return {!Element} The updated DOM element.
   */
  utilsModuleAPI.addElemText = function(elem, text) {

    /** @type {string} */
    var errorMsg;

    if (!elem || typeof elem !== 'object' || !(elem instanceof Element)) {
      errorMsg = 'An aIV.utils.addElemText call received an invalid elem ';
      errorMsg += 'parameter (should be a DOM Element).';
      throw new TypeError(errorMsg);
      return;
    }

    if (!text || typeof text !== 'string') {
      errorMsg = 'An aIV.utils.addElemText call received an invalid text ';
      errorMsg += 'parameter (should be a string).';
      throw new TypeError(errorMsg);
      return;
    }

    if (!!elem.textContent) {
      elem.textContent += text;
    }
    else {
      elem.innerText += text;
    }

    return elem;
  };

/* -----------------------------------------------------------------------------
 * The DOM Helper Methods (dom-methods/helpers.js)
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

  utilsModuleAPI.freezeObj(DomHelpers, true);

////////////////////////////////////////////////////////////////////////////////
// The Master Methods
////////////////////////////////////////////////////////////////////////////////

/* -----------------------------------------------------------------------------
 * The set Method (master-methods/set.js)
 * -------------------------------------------------------------------------- */

  /**
   * -----------------------------------------------------
   * Public Method (utilsModuleAPI.set)
   * -----------------------------------------------------
   * @desc Allows you to set the default settings for each aIV.utils method.
   * @param {!Object} settings - The default settings.
   * @param {(string|function)=} settings.checkArgsErrorMsg
   * @param {!(Document|Element)=} settings.getElemByClassRoot
   * @param {!(Document|Element)=} settings.getElemsByClassRoot
   * @param {!(Document|Element)=} settings.getElemByTagRoot
   * @param {!(Document|Element)=} settings.getElemsByTagRoot
   * @return {boolean} The success of the new settings update.
   */
  utilsModuleAPI.set = (function setup_set() {

    /** @type {function(*, string): boolean} */
    var checkType = utilsModuleAPI.checkType;
    /** @type {function(string)} */
    var throwPropError = function(prop) {

      /** @type {string} */
      var errorMsg;

      errorMsg = 'An aIV.utils.set call received an invalid ' + prop;
      errorMsg += ' settings parameter (should be a ' + DEFAULTS.types[ prop ];
      errorMsg += ').';
      throw new TypeError(errorMsg);
    };

    return function set(settings) {

      /** @type {string} */
      var errorMsg;
      /** @type {string} */
      var prop;

      if (!settings || typeof settings !== 'object') {
        errorMsg = 'An aIV.utils.set call received an invalid settings ';
        errorMsg += 'parameter (should be an object).';
        throw new TypeError(errorMsg);
      }

      for (prop in defaults) {
        if (defaults.hasOwnProperty(prop) && settings.hasOwnProperty(prop)) {
          if ( checkType(settings[ prop ], DEFAULTS.types[ prop ]) ) {
            defaults[ prop ] = settings[ prop ];
          }
          else {
            throwPropError(prop);
          }
        }
      }

      return true;
    };
  })();

/* -----------------------------------------------------------------------------
 * The reset Method (master-methods/reset.js)
 * -------------------------------------------------------------------------- */

  /**
   * -----------------------------------------------------
   * Public Method (utilsModuleAPI.reset)
   * -----------------------------------------------------
   * @desc Allows you to reset the default settings for each aIV.utils method.
   * @param {...(string|strings)=} setting - A setting to reset to the original default.
   * @return {boolean} The success of the new settings update.
   */
  utilsModuleAPI.reset = function() {

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

    len  = arguments.length;
    args = ( (!len) ?
      Object.keys(defaults) : (len > 1) ?
        Array.prototype.slice.call(arguments, 0) : (Array.isArray(arguments[0])) ?
          arguments[0] : [ arguments[0] ]
    );

    if ( !utilsModuleAPI.checkType(args, '!strings') ) {
      errorMsg = 'An aIV.utils.reset call received an invalid setting ';
      errorMsg += 'parameter (should be a string or an array of strings).';
      throw new TypeError(errorMsg);
    }

    i = args.length;
    while (i--) {
      prop = args[i];
      if ( defaults.hasOwnProperty(prop) ) {
        defaults[ prop ] = DEFAULTS[ prop ];
      }
    }

    return true;
  };

////////////////////////////////////////////////////////////////////////////////
// The Utils Module End
////////////////////////////////////////////////////////////////////////////////

/* -----------------------------------------------------------------------------
 * Deep Freeze The Utils Module API
 * -------------------------------------------------------------------------- */

  utilsModuleAPI.freezeObj(utilsModuleAPI, true);

  return utilsModuleAPI;

})(window, document));