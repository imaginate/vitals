  /**
   * ---------------------------------------------------
   * Public Method (Vitals.getElemsByClass)
   * ---------------------------------------------------
   * @desc A shortcut for the native DOM method -
   *   [DOM Node].getElementsByClassName.
   * @param {string} classname - The class name of the elements to select.
   * @param {(!Document|!Element)=} root - Limit the selections to this element's
   *   children. The default is document or the element set with
   *   Vitals.set({ getElemsByClassRoot: [DOM Node] }).
   * @return {?Array<!Element>} The selected DOM elements.
   */
  Vitals.getElemsByClass = (function setup_getElemsByClass(checkType,
                                     getElementsByClassNameAlt) {

    return function getElemsByClass(classname, root) {

      // Public vitals module vars used in this method:
      // var defaults;

      /** @type {string} */
      var errorMsg;
      /** @type {?Array<!Element>} */
      var elems;

      if (!checkType(classname, 'string') || classname === '') {
        errorMsg = 'A Vitals.getElemsByClass call received a non-string or ';
        errorMsg += 'empty string classname param.';
        throw new TypeError(errorMsg);
      }

      if (!root || !checkType(root, '!element|document')) {
        root = defaults.getElemsByClassRoot;
      }

      elems = ( (!!root.getElementsByClassName) ?
        root.getElementsByClassName(classname)
        : getElementsByClassNameAlt(classname, root)
      );

      return (elems && elems.length) ? elems : null;
    };

  })(Vitals.checkType, DomHelpers.getElementsByClassNameAlt);
