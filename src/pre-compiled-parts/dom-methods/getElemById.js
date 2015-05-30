  /**
   * ---------------------------------------------------
   * Public Method (vitalsModuleAPI.getElemById)
   * ---------------------------------------------------
   * @desc A shortcut for the native DOM method - document.getElementById.
   * @param {string} id - The id of the element to select.
   * @return {?Element} The DOM element with the given id.
   */
  vitalsModuleAPI.getElemById = function(id) {

    /** @type {string} */
    var errorMsg;

    if (!id || typeof id !== 'string') {
      errorMsg = 'A Vitals.getElemById call received a non-string or ';
      errorMsg += 'empty string id param.';
      throw new TypeError(errorMsg);
    }

    return document.getElementById(id);
  };
