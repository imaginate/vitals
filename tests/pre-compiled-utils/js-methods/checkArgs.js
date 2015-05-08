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
        throw new Error(errorMsg);
      }
    };

    ////////////////////////////////////////////////////////////////////////////
    // The End Of The checkArgs Module
    ////////////////////////////////////////////////////////////////////////////

    return checkArgs;

  })();
