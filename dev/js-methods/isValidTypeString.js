
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
