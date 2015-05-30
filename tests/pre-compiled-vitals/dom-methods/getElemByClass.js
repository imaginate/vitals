  /**
   * ---------------------------------------------------
   * Public Method (vitalsModuleAPI.getElemByClass)
   * ---------------------------------------------------
   * @desc A shortcut for the native DOM method -
   *   [DOM Node].getElementsByClassName[ [index] ].
   * @param {string} classname - The class name of the element to select.
   * @param {number=} index - The index of the array of found elements to
   *   select. The default is 0.
   * @param {!(Document|Element)=} root - Limit the selections to this element's
   *   children. The default is document or the element set with
   *   aIV.utils.set({ getElemByClassRoot: [DOM Node] }).
   * @return {?Element} The selected DOM element.
   */
  vitalsModuleAPI.getElemByClass = (function setup_getElemByClass(checkType,
                                    getElementsByClassNameAlt, floor) {

    return function getElemByClass(classname, index, root) {

      // Public vitals module vars used in this method:
      // var defaults;

      /** @type {string} */
      var errorMsg;
      /** @type {!Array<!Element>} */
      var elems;

      if (!checkType(classname, 'string') || classname === '') {
        errorMsg = 'A Vitals.getElemByClass call received a non-string or ';
        errorMsg += 'empty string classname param.';
        throw new TypeError(errorMsg);
      }

      index = (!checkType(index, 'number') || index < -1) ? 0 : floor(index);

      if (!root || !checkType(root, '!element|document')) {
        root = defaults.getElemByClassRoot;
      }

      elems = ( (!!root.getElementsByClassName) ?
        root.getElementsByClassName(classname)
        : getElementsByClassNameAlt(classname, root)
      );

      if (index < 0 || (index && index >= elems.length)) {
        index = elems.length - 1;
      }

      return (elems.length) ? elems[ index ] : null;
    };
  })(vitalsModuleAPI.checkType, DomHelpers.getElementsByClassNameAlt,
     Math.floor);
