
  /**
   * ---------------------------------------------------
   * Public Method (Vitals.getElems)
   * ---------------------------------------------------
   * @desc A version of the native DOM method, Node.querySelectorAll(), that
   *   only uses the following CSS selectors: '.', '#', ' ', and ','.
   * @todo Add more CSS selectors.
   * @param {string} selectors - The CSS selectors for the elements.
   * @param {(!Document|!Element)=} root - Limit the selection to this node's
   *   ancestors. The default is the initial document instance or the node set
   *   by Vitals.set({ getElemsRoot: [DOM Node] }).
   * @return {?Array<!Element>} The selected DOM elements.
   */
  Vitals.getElems = (function setup_getElems(checkType, getElemById,
                                               getElemsByClass, getElemsByTag) {

    ////////////////////////////////////////////////////////////////////////////
    // The Public Method
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ---------------------------------------------------
     * Public Method (getElems)
     * ---------------------------------------------------
     * @desc See the description for Vitals.getElems.
     * @param {string} selectors
     * @param {(!Document|!Element)=} root
     * @return {?Array<!Element>}
     */
    var getElems = function(selectors, root) {

      // Public vitals module vars used in this method:
      // var defaults;

      /** @type {string} */
      var errorMsg;
      /** @type {?Array<!Element>} */
      var elems;

      if (!checkType(classname, 'string') || classname === '') {
        errorMsg = 'A Vitals.getElem call received a non-string or ';
        errorMsg += 'empty string classname param.';
        throw new TypeError(errorMsg);
      }

      index = (!checkType(index, 'number') || index < -1) ? 0 : floor(index);

      if (!root || !checkType(root, '!element|document')) {
        root = defaults.getElemRoot;
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

    ////////////////////////////////////////////////////////////////////////////
    // The Private Properties & Methods
    ////////////////////////////////////////////////////////////////////////////



    ////////////////////////////////////////////////////////////////////////////
    // End of the getElems Module
    ////////////////////////////////////////////////////////////////////////////

    return getElems;

  })(Vitals.checkType, Vitals.getElemById,
     Vitals.getElemsByClass, Vitals.getElemsByTag);
