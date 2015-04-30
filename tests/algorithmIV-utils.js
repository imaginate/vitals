/** @preserve blank line */

/**
 * -----------------------------------------------------------------------------
 * Algorithm IV JavaScript Shortcuts (v1.0.0)
 * -----------------------------------------------------------------------------
 * @file Algorithm IV's JavaScript shortcuts are a collection of methods that
 *   make programming in JavaScript easier. With an intuitive API and clear
 *   documentation we are sure you will appreciate the time you save using our
 *   shortcuts!
 * @module aIVUtils
 * @version 1.0.0
 * @author Adam Smith ({@link adamsmith@youlum.com})
 * @copyright 2015 Adam A Smith ([github.com/imaginate]{@link https://github.com/imaginate})
 * @license The MIT License ([algorithmiv.com/docs/license]{@link http://algorithmiv.com/docs/license})
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

/* -----------------------------------------------------------------------------
 * The checkType Method (methods/checkType.js)
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
    // The Public checkType Method
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

      /** @type {number} */
      var i;
      /** @type {!strings} */
      var types;
      /** @type {boolean} */
      var nullable;
      /** @type {string} */
      var errorMsg;
      /** @type {boolean} */
      var earlyPass;
      /** @type {boolean} */
      var nullableOverride;

      if ( !checkTypeOf(type, 'string') ) {
        errorMsg = 'An aIV.utils.checkType call received an invalid ';
        errorMsg += '(a non-string) type parameter.';
        throw new TypeError(errorMsg);
        return;
      }

      earlyPass = false;

      if (val === null) {
        nullable = false;
        nullableOverride = RegExps.exclamationPoint.test(type);
        if ( RegExps.questionMark.test(type) ) {
          nullable = !nullableOverride;
          nullableOverride = !nullableOverride;
        }
        if (nullable && nullableOverride) {
          earlyPass = true;
        }
      }
      else {
        nullableOverride = true;
        nullable = false;
      }

      if (val === undefined && RegExps.equalSign.test(type)) {
        earlyPass = true;
      }

      // Remove everything except lowercase letters and pipes
      type = type.toLowerCase();
      type = type.replace(RegExps.lowerAlphaAndPipe, '');

      types = ( RegExps.pipe.test(type) ) ? type.split('|') : [ type ];

      if (!noTypeValCheck && !isValidTypeStrings(types)) {
        errorMsg = 'An aIV.utils.checkType call received an invalid type ';
        errorMsg += 'string. Check aIV.utils.checkType\'s documentation ';
        errorMsg += 'for a list of acceptable type strings.';
        throw new RangeError(errorMsg);
        return;
      }

      if (earlyPass) {
        return true;
      }

      // Test the value against each type
      i = types.length;
      while (i--) {

        type = types[i];

        if (!nullableOverride) {
          nullable = !RegExps.nonNullableDataTypes.test(type);
        }

        if (nullable && val === null) {
          return true;
        }

        if ( RegExps.typeOfDataTypes.test(type) ) {
          if ( checkTypeOf(val, type) ) {
            return true;
          }
          continue;
        }

        if ( RegExps.instanceOfDataTypes.test(type) ) {
          if ( checkInstanceOf(val, type) ) {
            return true;
          }
          continue;
        }

        if ( RegExps.arrayDataTypes.test(type) ) {
          if ( checkArrayType(val, type) ) {
            return true;
          }
          continue;
        }

        if ( RegExps.mapDataTypes.test(type) ) {
          if ( checkHashMapType(val, type) ) {
            return true;
          }
          continue;
        }
      }

      return false;
    };

    ////////////////////////////////////////////////////////////////////////////
    // The Private checkType Methods
    ////////////////////////////////////////////////////////////////////////////

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

      pass = true;

      i = types.length;
      while (i--) {
        pass = RegExps.allDataTypes.test(types[i]);
        if (!pass) {
          break;
        }
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
        'elem'   : HTMLElement,
        'element': HTMLElement
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
        Array.isArray : ( RegExps.instanceOfDataTypes.test(type) ) ?
          checkInstanceOf : checkTypeOf
      );

      pass = true;

      i = vals.length;
      while (i--) {
        pass = testFunc(vals[i], type);
        if (!pass) {
          break;
        }
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
        Array.isArray : ( RegExps.instanceOfDataTypes.test(type) ) ?
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
 * The isValidTypeString Method (methods/isValidTypeString.js)
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
      return;
    }

    typeString = typeString.toLowerCase();
    typeString = typeString.replace(RegExps.lowerAlphaAndPipe, '');

    typeArr = ( (RegExps.pipe.test(typeString)) ?
      typeString.split('|') : [ typeString ]
    );

    pass = true;

    i = typeArr.length;
    while (i--) {
      pass = RegExps.allDataTypes.test(typeArr[i]);
      if (!pass) {
        break;
      }
    }

    return pass;
  };

/* -----------------------------------------------------------------------------
 * The freezeObj Method (methods/freezeObj.js)
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
        return;
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
 * The hasOwnProp Method (methods/hasOwnProp.js)
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
      return;
    }

    if (!prop || typeof prop !== 'string') {
      errorMsg = 'An aIV.utils.hasOwnProp call received an invalid prop ';
      errorMsg += 'parameter.';
      throw new TypeError(errorMsg);
      return;
    }

    return obj.hasOwnProperty(prop);
  };

/* -----------------------------------------------------------------------------
 * The RegExps Class (reg-exps.js)
 * -------------------------------------------------------------------------- */

  /**
   * -----------------------------------------------
   * Public Class (RegExps)
   * -----------------------------------------------
   * @desc Regular expressions that are used throughout the module.
   * @type {!Object<string, RegExp>}
   * @struct
   */
  var RegExps = {};

  /**
   * -----------------------------------------------
   * Public Property (RegExps.allDataTypes)
   * -----------------------------------------------
   * @desc All of the data types available to this module.
   * @type {!RegExp}
   */
  RegExps.allDataTypes = (function setupRegExpsAllDataTypes() {

    /** @type {string} */
    var types;

    types = '' +
    '^string$|^number$|^boolean$|^object$|^array$|^function$|^elem$|'          +
    '^element$|^undefined$|^null$|^strings$|^numbers$|^booleans$|^objects$|'   +
    '^arrays$|^elems$|^elements$|^functions$|^stringmap$|^numbermap$|'         +
    '^booleanmap$|^objectmap$|^arraymap$|^functionmap$|^elemmap$|^elementmap$';

    return new RegExp(types);
  })();

  /**
   * -----------------------------------------------
   * Public Property (RegExps.nonNullableDataTypes)
   * -----------------------------------------------
   * @desc The non-nullable data types available to this module.
   * @type {!RegExp}
   */
  RegExps.nonNullableDataTypes = (function setupRegExpsNonNullableDataTypes() {

    /** @type {string} */
    var types;

    types = '^string$|^number$|^boolean$|^function$|^undefined$';

    return new RegExp(types);
  })();

  /**
   * -----------------------------------------------
   * Public Property (RegExps.typeOfDataTypes)
   * -----------------------------------------------
   * @desc The data types that can be accurately checked with the
   *   native JavaScript typeof operator.
   * @type {!RegExp}
   */
  RegExps.typeOfDataTypes = (function setupRegExpsTypeOfDataTypes() {

    /** @type {string} */
    var types;

    types = '^string$|^number$|^boolean$|^object$|^function$|^undefined$';

    return new RegExp(types);
  })();

  /**
   * -----------------------------------------------
   * Public Property (RegExps.instanceOfDataTypes)
   * -----------------------------------------------
   * @desc The data types that can be accurately checked with the
   *   native JavaScript instanceof operator.
   * @type {!RegExp}
   */
  RegExps.instanceOfDataTypes = /^elem$|^element$/;

  /**
   * -----------------------------------------------
   * Public Property (RegExps.arrayDataTypes)
   * -----------------------------------------------
   * @desc The array data types available to this module.
   * @type {!RegExp}
   */
  RegExps.arrayDataTypes = (function setupRegExpsArrayDataTypes() {

    /** @type {string} */
    var types;

    types = '^array$|^strings$|^numbers$|^booleans$|^objects$|' +
            '^arrays$|^elems$|^elements$|^functions$';

    return new RegExp(types);
  })();

  /**
   * -----------------------------------------------
   * Public Property (RegExps.mapDataTypes)
   * -----------------------------------------------
   * @desc The hash map types available to this module.
   * @type {!RegExp}
   */
  RegExps.mapDataTypes = (function setupRegExpsMapDataTypes() {

    /** @type {string} */
    var types;

    types = '^stringmap$|^numbermap$|^booleanmap$|^objectmap$|' +
            '^arraymap$|^functionmap$|^elemmap$|^elementmap$';

    return new RegExp(types);
  })();

  /**
   * -----------------------------------------------
   * Public Property (RegExps.dualDollarSigns)
   * -----------------------------------------------
   * @desc Two consecutive dollar signs.
   * @type {!RegExp}
   */
  RegExps.dualDollarSigns = /([^\\]*?)\$\$/;

  /**
   * -----------------------------------------------
   * Public Property (RegExps.space)
   * -----------------------------------------------
   * @desc A whitespace.
   * @type {!RegExp}
   */
  RegExps.space = /\s/;

  /**
   * -----------------------------------------------
   * Public Property (RegExps.exclamationPoint)
   * -----------------------------------------------
   * @desc An exclamation point.
   * @type {!RegExp}
   */
  RegExps.exclamationPoint = /\!/;

  /**
   * -----------------------------------------------
   * Public Property (RegExps.questionMark)
   * -----------------------------------------------
   * @desc A question mark.
   * @type {!RegExp}
   */
  RegExps.questionMark = /\?/;

  /**
   * -----------------------------------------------
   * Public Property (RegExps.equalSign)
   * -----------------------------------------------
   * @desc An equal sign.
   * @type {!RegExp}
   */
  RegExps.equalSign = /\=/;

  /**
   * -----------------------------------------------
   * Public Property (RegExps.pipe)
   * -----------------------------------------------
   * @desc A pipe.
   * @type {!RegExp}
   */
  RegExps.pipe = /\|/;

  /**
   * -----------------------------------------------
   * Public Property (RegExps.lowerAlphaAndPipe)
   * -----------------------------------------------
   * @desc All characters except lowercase letters and the pipe.
   * @type {!RegExp}
   */
  RegExps.lowerAlphaAndPipe = /[^a-z\|]/g;

  utilsModuleAPI.freezeObj(RegExps, true);

////////////////////////////////////////////////////////////////////////////////
// The Utils Module End
////////////////////////////////////////////////////////////////////////////////

  return utilsModuleAPI;

})(window, document));