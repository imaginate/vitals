  /**
   * ---------------------------------------------------
   * Public Method (vitalsModuleAPI.setElemText)
   * ---------------------------------------------------
   * @desc A shortcut that sets the native DOM property - Element.textContent
   *   or Element.innerText.
   * @param {!Element} elem - The DOM element.
   * @param {string} text - The text to set the DOM element's textContent or
   *   innerText to.
   * @return {!Element} The updated DOM element.
   */
  vitalsModuleAPI.setElemText = (function setup_setElemText(checkType,
                                 hasTextContent) {

    return function setElemText(elem, text) {

      /** @type {string} */
      var errorMsg;

      if ( !checkType(elem, '!element') ) {
        errorMsg = 'A Vitals.setElemText call received a non-element ';
        errorMsg += 'elem param.';
        throw new TypeError(errorMsg);
      }

      if ( !checkType(text, 'string') ) {
        errorMsg = 'A Vitals.setElemText call received a non-string ';
        errorMsg += 'text param.';
        throw new TypeError(errorMsg);
      }

      if (hasTextContent) {
        elem.textContent = text;
      }
      else {
        elem.innerText = text;
      }

      return elem;
    };
  })(vitalsModuleAPI.checkType, DomFeatures.textContent);
