  /**
   * ---------------------------------------------------
   * Public Method (utilsModuleAPI.getElemsByTag)
   * ---------------------------------------------------
   * @desc A shortcut for the native DOM method -
   *   [DOM Node].getElementsByTagName.
   * @param {string} tag - The tag name of the elements to select.
   * @param {(Document|Element)=} root - Limit the selections to this element's
   *   children. The default is document or the element set with
   *   aIV.utils.set({ getElemsByTagRoot: [DOM Node] }).
   * @return {Array<HTMLElement>} The selected DOM elements.
   */
  utilsModuleAPI.getElemsByTag = function(tag, root) {

    /** @type {string} */
    var errorMsg;

    if (!tag || typeof tag !== 'string') {
      errorMsg = 'An aIV.utils.getElemsByTag call received an invalid tag ';
      errorMsg += 'name parameter.';
      throw new TypeError(errorMsg);
      return;
    }

    if (!root || typeof root !== 'object' ||
        (!(root instanceof Element) && !(root instanceof Document))) {
      root = defaults.getElemsByTagRoot;
    }

    return root.getElementsByTagName(tag);
  };
