  /**
   * ---------------------------------------------------
   * Public Method (vitalsModuleAPI.getElemById)
   * ---------------------------------------------------
   * @desc A shortcut for the native DOM method - document.getElementById.
   * @param {string} id - The id of the element to select.
   * @return {!HTMLElement} The DOM element with the given id.
   */
  vitalsModuleAPI.getElemById = function(id) {

    /** @type {string} */
    var errorMsg;
    /** @type {HTMLElement} */
    var elem;

    if (!id || typeof id !== 'string') {
      errorMsg = 'An aIV.utils.getElemById call received an invalid id ';
      errorMsg += 'parameter (should be a string).';
      throw new TypeError(errorMsg);
    }

    elem = document.getElementById(id);

    if (!elem) {
      errorMsg = 'An aIV.utils.getElemById call received an invalid id ';
      errorMsg += 'parameter (i.e. no element with the id was found).';
      throw new RangeError(errorMsg);
    }

    return elem;
  };
