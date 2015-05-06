  /**
   * ---------------------------------------------------
   * Public Method (utilsModuleAPI.getElemsByClass)
   * ---------------------------------------------------
   * @desc A shortcut for the native DOM method -
   *   [DOM Node].getElementsByClassName.
   * @param {string} classname - The class name of the elements to select.
   * @param {!(Document|Element)=} root - Limit the selections to this element's
   *   children. The default is document or the element set with
   *   aIV.utils.set({ getElemsByClassRoot: [DOM Node] }).
   * @return {!Array<HTMLElement>} The selected DOM elements.
   */
  utilsModuleAPI.getElemsByClass = function(classname, root) {

    /** @type {string} */
    var errorMsg;

    if (!classname || typeof classname !== 'string') {
      errorMsg = 'An aIV.utils.getElemsByClass call received an invalid class ';
      errorMsg += 'name parameter.';
      throw new TypeError(errorMsg);
      return;
    }

    if (!root || typeof root !== 'object' ||
        (!(root instanceof Element) && !(root instanceof Document))) {
      root = defaults.getElemsByClassRoot;
    }

    return root.getElementsByClassName(classname);
  };
