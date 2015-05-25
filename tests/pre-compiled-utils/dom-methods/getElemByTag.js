  /**
   * ---------------------------------------------------
   * Public Method (utilsModuleAPI.getElemByTag)
   * ---------------------------------------------------
   * @desc A shortcut for the native DOM method -
   *   [DOM Node].getElementsByTagName[ [index] ].
   * @param {string} tag - The tag name of the element to select.
   * @param {number=} index - The index of the array of found elements to
   *   select. The default is 0.
   * @param {!(Document|Element)=} root - Limit the selections to this element's
   *   children. The default is document or the element set with
   *   aIV.utils.set({ getElemByTagRoot: [DOM Node] }).
   * @return {!HTMLElement} The selected DOM element.
   */
  utilsModuleAPI.getElemByTag = function(tag, index, root) {

    /** @type {string} */
    var errorMsg;
    /** @type {!Array<HTMLElement>} */
    var elems;
    /** @type {HTMLElement} */
    var elem;

    if (!tag || typeof tag !== 'string') {
      errorMsg = 'An aIV.utils.getElemByTag call received an invalid tag name ';
      errorMsg += 'parameter.';
      throw new TypeError(errorMsg);
    }

    if (typeof index !== 'number' || index < -1) {
      index = 0;
    }
    else {
      index = Math.floor(index);
    }

    if (!root || typeof root !== 'object' ||
        (!(root instanceof Element) && !(root instanceof Document))) {
      root = defaults.getElemByTagRoot;
    }

    elems = root.getElementsByTagName(tag);

    if (index < 0 || index >= elems.length) {
      index = elems.length - 1;
    }

    elem = elems[ index ];

    if (!elem) {
      errorMsg = 'An aIV.utils.getElemByTag call ';
      errorMsg += 'received an invalid tag name parameter ';
      errorMsg += '(i.e. no element with the tag name was found).';
      throw new RangeError(errorMsg);
    }

    return elem;
  };
