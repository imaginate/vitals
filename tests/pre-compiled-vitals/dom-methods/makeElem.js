  /**
   * ---------------------------------------------------
   * Public Method (utilsModuleAPI.makeElem)
   * ---------------------------------------------------
   * @desc A shortcut for the native DOM method - document.createElement.
   * @param {(string|!Object<string, string>)=} settings - A string of the
   *   element's tag name or an object hash map of the element's details.
   *   The default tag name is 'div'.
   * @param {string=} settings.tag - The element's tag name.
   * @param {string=} settings.tagName - The element's tag name.
   * @param {string=} settings.text - The element's textContent or innerText.
   * @param {string=} settings.html - The element's innerHTML.
   * @param {string=} settings.id - The element's id.
   * @param {string=} settings.className - The element's class name.
   * @return {!Element} The DOM element with the given id.
   */
  utilsModuleAPI.makeElem = (function setup_makeElem(checkType, setElemText) {

    return function makeElem(settings) {

      /** @type {!Element} */
      var elem;
      /** @type {string} */
      var tag;

      if ( checkType(settings, 'string') ) {
        tag = settings;
      }
      else if ( checkType(settings, '!object') ) {
        tag = settings.tag || settings.tagName;
      }
      else {
        settings = null;
      }

      tag = tag || 'div';
      elem = document.createElement(tag);

      if (settings) {

        if (settings.text && checkType(settings.text, 'string')) {
          setElemText(elem, settings.text);
        }

        if (settings.html && checkType(settings.html, 'string')) {
          elem.innerHTML = settings.html;
        }

        if (settings.id && checkType(settings.id, 'string')) {
          elem.id = settings.id;
        }

        if (settings.className && checkType(settings.className, 'string')) {
          elem.className = settings.className;
        }
      }

      return elem;
    };
  })(utilsModuleAPI.checkType, utilsModuleAPI.setElemText);
