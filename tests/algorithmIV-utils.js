/** @preserve blank line */

/**
 * -----------------------------------------------------------------------------
 * Algorithm IV JavaScript Shortcuts (v1.0.2)
 * -----------------------------------------------------------------------------
 * @file Algorithm IV's JavaScript shortcuts are a collection of methods that
 *   make programming in JavaScript easier. With an intuitive API and clear
 *   documentation we are sure you will appreciate the time you save using our
 *   shortcuts!
 * @module aIVUtils
 * @version 1.0.2
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

/* Algorithm IV JavaScript Polyfills (v0.0.1) (learn@algorithmiv.com)
 * Author: Adam Smith (adamsmith@youlum.com)
 * Copyright (c) 2015 Adam A Smith (github.com/imaginate)
 * The Apache License (algorithmiv.com/docs/license) */
(function(h,m,n){h.console=h.console||{};(function(a,b){a.log||(a.log=b);a.error||(a.error=a.log);a.assert||(a.assert=function(b){var c;if(!b)return c=1<arguments.length?Array.prototype.slice.call(arguments,1):["A console.assert call failed."],a.error.apply(this,c)});a.clear||(a.clear=b);a.count||(a.count=b);a.debug||(a.debug=a.log);a.dir||(a.dir=a.log);a.dirxml||(a.dirxml=a.log);a.exception||(a.exception=a.error);a.group||(a.group=b);a.groupCollapsed||(a.groupCollapsed=a.group);a.groupEnd||(a.groupEnd=
b);a.info||(a.info=a.log);a.markTimeline||(a.markTimeline=a.timeStamp?a.timeStamp:b);a.profile||(a.profile=b);a.profileEnd||(a.profileEnd=b);a.table||(a.table=b);a.time||(a.time=b);a.timeEnd||(a.timeEnd=b);a.timeline||(a.timeline=b);a.timelineEnd||(a.timelineEnd=b);a.timeStamp||(a.timeStamp=a.markTimeline);a.trace||(a.trace=a.log);a.warn||(a.warn=a.error);(function(b,c,f,h){var d,k,l,g;if(b)if(l=["assert","error","info","log","warn"],g=["clear","dir","profile","profileEnd"],g=l.concat(g),c)for(d=
g.length;d--;)k=a[g[d]],a[g[d]]=c.call(k,a);else for(d=l.length;d--;)k=a[l[d]],f.call(k,a,h.call(arguments))})("object"===typeof a.log,Function.prototype.bind,Function.prototype.call,Array.prototype.slice)})(h.console,function(){});Object.keys||(Object.keys=function(){var a,b;a=!{toString:null}.propertyIsEnumerable("toString");b="toString toLocaleString valueOf hasOwnProperty isPrototypeOf propertyIsEnumerable constructor".split(" ");return function(e){var c,f;if(!e||"object"!==typeof e&&"function"!==
typeof e)throw new TypeError("An Object.keys call received an invalid object parameter. Note: It only accepts non-null objects and functions.");f=[];for(c in e)e.hasOwnProperty(c)&&f.push(c);if(a)for(c=b.length;c--;)e.hasOwnProperty(b[c])&&f.push(b[c]);return f}}());Object.freeze||(Object.freeze=function(a){if(!a||"object"!==typeof a&&"function"!==typeof a)throw new TypeError("An Object.freeze call received an invalid object parameter. Note: It only accepts non-null objects and functions.");return a});
try{Object.freeze(function(){})}catch(p){Object.freeze=function(a){return function(b){return"function"===typeof b?b:a(b)}}(Object.freeze)}Object.isFrozen||(Object.isFrozen=function(a){if(!a||"object"!==typeof a&&"function"!==typeof a)throw new TypeError("An Object.isFrozen call received an invalid object parameter. Note: It only accepts non-null objects and functions.");return!0});Array.isArray||(Array.isArray=function(a){return"[object Array]"===Object.prototype.toString.call(a)})})(window,document);

////////////////////////////////////////////////////////////////////////////////
// The Public API
////////////////////////////////////////////////////////////////////////////////

;(function setupTheUtilsPublicAPI(window, utilsModuleAPI) {
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
  aIV.utils = utilsModuleAPI;

})(window,

////////////////////////////////////////////////////////////////////////////////
// The Utils Module
////////////////////////////////////////////////////////////////////////////////

(function setupTheUtilsModule(window, document, undefined) {
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
   * @struct
   */
  var defaults = {
    checkArgsErrorMsg  : function() {

      /** @type {string} */
      var msg;

      msg = 'A ';
      msg += utilsModuleAPI.checkArgs.caller || 'function';
      msg +=' was called with an invalid parameter data type.';

      return msg;
    },
    getElemByClassRoot : document,
    getElemsByClassRoot: document,
    getElemByTagRoot   : document,
    getElemsByTagRoot  : document
  };

/* -----------------------------------------------------------------------------
 * The Set Method Defaults Method (set-defaults.js)
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
  utilsModuleAPI.set = function(settings) {

    /** @type {string} */
    var errorMsg;
    /** @type {!(Document|Element)} */
    var elem;
    /** @type {(string|function)} */
    var msg;

    if (!settings || typeof settings !== 'object') {
      errorMsg = 'An aIV.utils.set call received an invalid settings ';
      errorMsg += 'parameter (should be an object).';
      throw new TypeError(errorMsg);
      return;
    }

    // Set checkArgsErrorMsg
    if ( settings.hasOwnProperty('checkArgsErrorMsg') ) {
      msg = settings.checkArgsErrorMsg;
      if (typeof msg === 'string' || typeof msg === 'function') {
        defaults.checkArgsErrorMsg = msg;
      }
      else {
        errorMsg = 'An aIV.utils.set call received an invalid ';
        errorMsg += 'checkArgsErrorMsg settings parameter ';
        errorMsg += '(should be a string).';
        throw new TypeError(errorMsg);
      }
    }

    // Set getElemByClassRoot
    if ( settings.hasOwnProperty('getElemByClassRoot') ) {
      elem = settings.getElemByClassRoot;
      if (elem instanceof Element || elem instanceof Document) {
        defaults.getElemByClassRoot = elem;
      }
      else {
        errorMsg = 'An aIV.utils.set call received an invalid ';
        errorMsg += 'getElemByClassRoot settings parameter ';
        errorMsg += '(should be a Document or Element DOM Node).';
        throw new TypeError(errorMsg);
      }
    }

    // Set getElemsByClassRoot
    if ( settings.hasOwnProperty('getElemsByClassRoot') ) {
      elem = settings.getElemsByClassRoot;
      if (elem instanceof Element || elem instanceof Document) {
        defaults.getElemsByClassRoot = elem;
      }
      else {
        errorMsg = 'An aIV.utils.set call received an invalid ';
        errorMsg += 'getElemsByClassRoot settings parameter ';
        errorMsg += '(should be a Document or Element DOM Node).';
        throw new TypeError(errorMsg);
      }
    }

    // Set getElemByTagRoot
    if ( settings.hasOwnProperty('getElemByTagRoot') ) {
      elem = settings.getElemByTagRoot;
      if (elem instanceof Element || elem instanceof Document) {
        defaults.getElemByTagRoot = elem;
      }
      else {
        errorMsg = 'An aIV.utils.set call received an invalid ';
        errorMsg += 'getElemByTagRoot settings parameter ';
        errorMsg += '(should be a Document or Element DOM Node).';
        throw new TypeError(errorMsg);
      }
    }

    // Set getElemsByTagRoot
    if ( settings.hasOwnProperty('getElemsByTagRoot') ) {
      elem = settings.getElemsByTagRoot;
      if (elem instanceof Element || elem instanceof Document) {
        defaults.getElemsByTagRoot = elem;
      }
      else {
        errorMsg = 'An aIV.utils.set call received an invalid ';
        errorMsg += 'getElemsByTagRoot settings parameter ';
        errorMsg += '(should be a Document or Element DOM Node).';
        throw new TypeError(errorMsg);
      }
    }

    return true;
  };

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
   *         <span>'function', 'elem', 'element', 'undefined'</span>
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
  utilsModuleAPI.checkType = (function setupCheckType() {

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
      pass && type.length > 1 && throwInvalidAsteriskUse();

      // Check for an optional undefined value
      pass = pass || (val === undefined && equalSign.test(type));

      nullableOverride = (pass) ? true : checkForNullOverride(val, type);
      nullable = ( (nullableOverride || exclamationPoint.test(type)) ?
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
    var nonNullableDataTypes = (function setupRegExpsNonNullableDataTypes() {

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
    var typeOfDataTypes = (function setupRegExpsTypeOfDataTypes() {

      /** @type {string} */
      var types;

      types = '^string$|^number$|^boolean$|^object$|^function$|^undefined$';

      return new RegExp(types);
    })();

    /**
     * -----------------------------------------------
     * Private Property (instanceOfDataTypes)
     * -----------------------------------------------
     * @desc The data types that can be accurately checked with the
     *   native JavaScript instanceof operator.
     * @type {!RegExp}
     */
    var instanceOfDataTypes = /^elem$|^element$/;

    /**
     * -----------------------------------------------
     * Private Property (arrayDataTypes)
     * -----------------------------------------------
     * @desc The array data types available to this module.
     * @type {!RegExp}
     */
    var arrayDataTypes = (function setupRegExpsArrayDataTypes() {

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
    var mapDataTypes = (function setupRegExpsMapDataTypes() {

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

        if ( instanceOfDataTypes.test(type) ) {
          pass = checkInstanceOf(val, type);
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
          nullable = !nonNullableDataTypes.test(type);
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
     * Private Method (checkInstanceOf)
     * ---------------------------------------------------
     * @desc Checks a value's instanceof against the given type.
     * @param {*} val - The value to be evaluated.
     * @param {string} type - The data type.
     * @return {boolean} The evaluation result.
     */
    var checkInstanceOf = function(val, type) {

      /** @type {!Object<string, function>} */
      var constructors;

      if ( !checkTypeOf(val, 'object') ) {
        return false;
      }

      constructors = {
        'elem'   : Element,
        'element': Element
      };

      return (val instanceof constructors[ type ]);
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
        Array.isArray : ( instanceOfDataTypes.test(type) ) ?
          checkInstanceOf : checkTypeOf
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
        Array.isArray : ( instanceOfDataTypes.test(type) ) ?
          checkInstanceOf : checkTypeOf
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
  utilsModuleAPI.checkArgs = (function() {

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
          arg = args[i];
        }

        else {
          type = args[i];

          clean = checkType(type, 'string', true);
          clean = clean && isValidTypeString(type);
          clean || throwInvalidTypeString(type);

          pass = pass && checkType(arg, type, true);
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

      errorMsg = 'An aIV.utils.checkType call received an invalid type ';
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
        throw new Error(errorMsg);
      }
    };

    ////////////////////////////////////////////////////////////////////////////
    // The End Of The checkArgs Module
    ////////////////////////////////////////////////////////////////////////////

    return checkArgs;

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
  utilsModuleAPI.freezeObj = (function setupFreezeObj() {

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

    if (!prop || typeof prop !== 'string') {
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
    '^element$|^undefined$|^null$|^strings$|^numbers$|^booleans$|^objects$|'   +
    '^arrays$|^elems$|^elements$|^functions$|^stringmap$|^numbermap$|'         +
    '^booleanmap$|^objectmap$|^arraymap$|^functionmap$|^elemmap$|^elementmap$';

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

  utilsModuleAPI.freezeObj(JsHelpers, true);

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
      Math.floor(index);
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
      Math.floor(index);
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
 * The addElemText Method (dom-methods/addElemText.js)
 * -------------------------------------------------------------------------- */

  /**
   * ---------------------------------------------------
   * Public Method (utilsModuleAPI.addElemText)
   * ---------------------------------------------------
   * @desc A shortcut for the native DOM methods - Element.textContent
   *   or Element.innerText.
   * @param {!Element} elem - The element.
   * @param {string} text - The element's textContent or innerText.
   * @return {!Element} The DOM element with the given text.
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
      elem.textContent = text;
    }
    else {
      elem.innerText = text;
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

/* -----------------------------------------------------------------------------
 * Deep Freeze The Utils Module API
 * -------------------------------------------------------------------------- */

  utilsModuleAPI.freezeObj(utilsModuleAPI, true);

////////////////////////////////////////////////////////////////////////////////
// The Utils Module End
////////////////////////////////////////////////////////////////////////////////

  return utilsModuleAPI;

})(window, document));