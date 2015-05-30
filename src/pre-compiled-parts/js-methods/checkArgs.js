  /**
   * ---------------------------------------------------
   * Public Method (vitalsModuleAPI.checkArgs)
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
  vitalsModuleAPI.checkArgs = (function setup_checkArgs(checkType,
                                                        isValidTypeString,
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

  })(vitalsModuleAPI.checkType, vitalsModuleAPI.isValidTypeString,
     Array.prototype.slice);
