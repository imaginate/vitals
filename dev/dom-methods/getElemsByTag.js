
  /**
   * ---------------------------------------------------
   * Public Method (Vitals.getElemsByTag)
   * ---------------------------------------------------
   * @desc A shortcut for the native DOM method -
   *   [DOM Node].getElementsByTagName.
   * @param {string} tag - The tag name of the elements to select.
   * @param {(!Document|!Element)=} root - Limit the selections to this element's
   *   children. The default is document or the element set with
   *   Vitals.set({ getElemsByTagRoot: [DOM Node] }).
   * @return {?Array<!Element>} The selected DOM elements.
   */
  Vitals.getElemsByTag = (function setup_getElemsByTag(checkType) {

    return function getElemsByTag(tag, root) {

      // Public vitals module vars used in this method:
      // var defaults;

      /** @type {string} */
      var errorMsg;
      /** @type {?Array<!Element>} */
      var elems;

      if (!checkType(tag, 'string') || tag === '') {
        errorMsg = 'A Vitals.getElemsByTag call received a non-string or ';
        errorMsg += 'empty string tag param.';
        throw new TypeError(errorMsg);
      }

      if (!root || !checkType(root, '!element|document')) {
        root = defaults.getElemsByTagRoot;
      }

      elems = root.getElementsByTagName(tag);

      return (elems && elems.length) ? elems : null;
    };

  })(Vitals.checkType);
