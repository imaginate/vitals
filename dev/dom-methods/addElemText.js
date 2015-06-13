  /**
   * ---------------------------------------------------
   * Public Method (Vitals.addElemText)
   * ---------------------------------------------------
   * @desc A shortcut that adds to the native DOM property - Element.textContent
   *   or Element.innerText.
   * @param {!Element} elem - The DOM element.
   * @param {string} text - The text to add to the DOM element's textContent or
   *   innerText.
   * @return {!Element} The updated DOM element.
   */
  Vitals.addElemText = (function setup_addElemText(checkType,
                                 hasTextContent) {

    return function addElemText(elem, text) {

      /** @type {string} */
      var errorMsg;

      if ( !checkType(elem, '!element') ) {
        errorMsg = 'A Vitals.addElemText call received a non-element ';
        errorMsg += 'elem param.';
        throw new TypeError(errorMsg);
      }

      if ( !checkType(text, 'string') ) {
        errorMsg = 'A Vitals.addElemText call received a non-string ';
        errorMsg += 'text param.';
        throw new TypeError(errorMsg);
      }

      if (text) {
        if (hasTextContent) {
          elem.textContent += text;
        }
        else {
          elem.innerText += text;
        }
      }

      return elem;
    };
  })(Vitals.checkType, DomFeatures.textContent);
