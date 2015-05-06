  /**
   * ---------------------------------------------------
   * Public Method (utilsModuleAPI.getElemById)
   * ---------------------------------------------------
   * @desc A shortcut for the native DOM method - document.getElementById.
   * @param {string} id - The id of the element to select.
   * @return {HTMLElement} The DOM element with the given id.
   */
  utilsModuleAPI.getElemById = function(id) {

    /** @type {string} */
    var errorMsg;

    if (!id || typeof id !== 'string') {
      errorMsg = 'An aIV.utils.getElemById call received an invalid id ';
      errorMsg += 'parameter.';
      throw new TypeError(errorMsg);
      return;
    }

    return document.getElementById(id);
  };
