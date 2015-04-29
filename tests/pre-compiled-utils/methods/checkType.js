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
          nullableOverride = !nullableOverride;
          nullable = !nullableOverride;
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
