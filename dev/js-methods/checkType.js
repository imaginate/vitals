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
     * Private Property (objClassDataTypes)
     * -----------------------------------------------
     * @desc The object types that must have their constructors checked.
     * @type {!RegExp}
     */
    var objClassDataTypes = /^array$|^elem$|^element$|^document$|^regexp$/;

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

      types = '^strings$|^numbers$|^booleans$|^objects$|^arrays$|' +
              '^functions$|^elems$|^elements$|^regexps$';

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

      types = '^stringmap$|^numbermap$|^booleanmap$|^objectmap$|^arraymap$|' +
              '^functionmap$|^elemmap$|^elementmap$|^regexpmap$';

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
