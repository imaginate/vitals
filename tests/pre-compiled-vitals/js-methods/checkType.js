  /**
   * ---------------------------------------------------
   * Public Method (vitalsModuleAPI.checkType)
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
  vitalsModuleAPI.checkType = (function setup_checkType(allDataTypes,
                               exceptLowerAlphaAndPipe) {

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
        errorMsg = 'A Vitals.checkType call received a non-string type param.';
        throw new TypeError(errorMsg);
      }

      // Check for automatic pass (* = any value) & catch asterisk error
      if ( asterisk.test(type) ) {
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
        type = type.replace(exceptLowerAlphaAndPipe, '');
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
              '^arrays$|^elems$|^elements$|^functions$|^regexes$';

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

  })(JsHelpers.allDataTypes, JsHelpers.exceptLowerAlphaAndPipe);
