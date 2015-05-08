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
