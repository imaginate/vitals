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
