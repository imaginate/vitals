  /**
   * ---------------------------------------------------
   * Public Method (vitalsModuleAPI.getElemByTag)
   * ---------------------------------------------------
   * @desc A shortcut for the native DOM method -
   *   [DOM Node].getElementsByTagName[ [index] ].
   * @param {string} tag - The tag name of the element to select.
   * @param {number=} index - The index of the array of found elements to
   *   select. The default is 0.
   * @param {!(Document|Element)=} root - Limit the selections to this element's
   *   children. The default is document or the element set with
   *   aIV.utils.set({ getElemByTagRoot: [DOM Node] }).
   * @return {?Element} The selected DOM element.
   */
  vitalsModuleAPI.getElemByTag = (function setup_getElemByTag(checkType,
                                                              floor) {

    return function getElemByTag(tag, index, root) {

      // Public vitals module vars used in this method:
      // var defaults;

      /** @type {string} */
      var errorMsg;
      /** @type {!Array<!Element>} */
      var elems;

      if (!checkType(tag, 'string') || tag === '') {
        errorMsg = 'A Vitals.getElemByTag call received a non-string or ';
        errorMsg += 'empty string tag param.';
        throw new TypeError(errorMsg);
      }

      index = (!checkType(index, 'number') || index < -1) ? 0 : floor(index);

      if (!root || !checkType(root, '!element|document')) {
        root = defaults.getElemByTagRoot;
      }

      elems = root.getElementsByTagName(tag);

      if (index < 0 || (index && index >= elems.length)) {
        index = elems.length - 1;
      }

      return (elems.length) ? elems[ index ] : null;
    };
  })(vitalsModuleAPI.checkType, Math.floor);
