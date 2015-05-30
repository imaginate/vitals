  /**
   * ---------------------------------------------------
   * Public Method (vitalsModuleAPI.getElemsByClass)
   * ---------------------------------------------------
   * @desc A shortcut for the native DOM method -
   *   [DOM Node].getElementsByClassName.
   * @param {string} classname - The class name of the elements to select.
   * @param {!(Document|Element)=} root - Limit the selections to this element's
   *   children. The default is document or the element set with
   *   aIV.utils.set({ getElemsByClassRoot: [DOM Node] }).
   * @return {!Array<HTMLElement>} The selected DOM elements.
   */
  vitalsModuleAPI.getElemsByClass = (function setup_getElemsByClass(checkType,
                                     getElementsByClassNameAlt) {

    return function getElemsByClass(classname, root) {

      // Public vitals module vars used in this method:
      // var defaults;

      /** @type {string} */
      var errorMsg;

      if (!checkType(classname, 'string') || classname === '') {
        errorMsg = 'A Vitals.getElemsByClass call received a non-string or ';
        errorMsg += 'empty string classname param.';
        throw new TypeError(errorMsg);
      }

      if (!root || !checkType(root, '!element|document')) {
        root = defaults.getElemsByClassRoot;
      }

      return ( (!!root.getElementsByClassName) ?
        root.getElementsByClassName(classname)
        : getElementsByClassNameAlt(classname, root)
      );
    };
  })(vitalsModuleAPI.checkType, DomHelpers.getElementsByClassNameAlt);
