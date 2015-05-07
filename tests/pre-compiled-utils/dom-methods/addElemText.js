  /**
   * ---------------------------------------------------
   * Public Method (utilsModuleAPI.addElemText)
   * ---------------------------------------------------
   * @desc A shortcut for the native DOM methods - Element.textContent
   *   or Element.innerText.
   * @param {!Element} elem - The element.
   * @param {string} text - The element's textContent or innerText.
   * @return {!Element} The DOM element with the given text.
   */
  utilsModuleAPI.addElemText = function(elem, text) {

    /** @type {string} */
    var errorMsg;

    if (!elem || typeof elem !== 'object' || !(elem instanceof Element)) {
      errorMsg = 'An aIV.utils.addElemText call received an invalid elem ';
      errorMsg += 'parameter (should be a DOM Element).';
      throw new TypeError(errorMsg);
      return;
    }

    if (!text || typeof text !== 'string') {
      errorMsg = 'An aIV.utils.addElemText call received an invalid text ';
      errorMsg += 'parameter (should be a string).';
      throw new TypeError(errorMsg);
      return;
    }

    if (!!elem.textContent) {
      elem.textContent = text;
    }
    else {
      elem.innerText = text;
    }

    return elem;
  };
