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
   * @return {!HTMLElement} The DOM element with the given id.
   */
  utilsModuleAPI.makeElem = function(settings) {

    /** @type {HTMLElement} */
    var elem;
    /** @type {string} */
    var tag;

    if (settings && typeof settings === 'string') {
      tag = settings;
      settings = null;
    }
    else if (settings && typeof settings === 'object') {
      if (settings.hasOwnProperty('tag') && settings.tag &&
          typeof settings.tag === 'string') {
        tag = settings.tag;
      }
      else if (settings.hasOwnProperty('tagName') && settings.tagName &&
          typeof settings.tagName === 'string') {
        tag = settings.tagName;
      }
    }
    else {
      settings = null;
    }

    if (!tag) {
      tag = 'div';
    }

    elem = document.createElement(tag);

    if (settings) {

      if (settings.hasOwnProperty('text') && settings.text &&
          typeof settings.text === 'string') {
        if (!!elem.textContent) {
          elem.textContent = settings.text;
        }
        else {
          elem.innerText = settings.text;
        }
      }

      if (settings.hasOwnProperty('html') && settings.html &&
          typeof settings.html === 'string') {
        elem.innerHTML = settings.html;
      }

      if (settings.hasOwnProperty('id') && settings.id &&
          typeof settings.id === 'string') {
        elem.id = settings.id;
      }

      if (settings.hasOwnProperty('className') && settings.className &&
          typeof settings.className === 'string') {
        elem.className = settings.className;
      }
    }

    return elem;
  };
