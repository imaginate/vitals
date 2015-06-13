
  /**
   * ---------------------------------------------------
   * Public Method (Vitals.getElemById)
   * ---------------------------------------------------
   * @desc A shortcut for the native DOM method - document.getElementById.
   * @param {string} id - The id of the element to select.
   * @param {!Document=} root - Choose the document to find the element within.
   *   The default is the initial document instance or the document set with
   *   Vitals.set({ getElemByIdRoot: [document] }).
   * @return {?Element} The DOM element with the given id.
   */
  Vitals.getElemById = (function setup_getElemById(checkType) {

    return function getElemById(id, root) {

      /** @type {string} */
      var errorMsg;

      if (!id || !checkType(id, 'string')) {
        errorMsg = 'A Vitals.getElemById call received a non-string or ';
        errorMsg += 'empty string id param.';
        throw new TypeError(errorMsg);
      }

      if (!root || !checkType(root, '!element|document')) {
        root = defaults.getElemByIdRoot;
      }

      return root.getElementById(id);
    };

  })(Vitals.checkType);
