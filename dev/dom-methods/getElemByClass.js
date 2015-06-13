  /**
   * ---------------------------------------------------
   * Public Method (Vitals.getElemByClass)
   * ---------------------------------------------------
   * @desc A shortcut for the native DOM method -
   *   [DOM Node].getElementsByClassName[ [index] ].
   * @param {string} classname - The class name of the element to select.
   * @param {number=} index - The index of the array of found elements to
   *   select. The default is 0.
   * @param {(!Element|!Document)=} root - Limit the selections to this element's
   *   children. The default is document or the element set with
   *   Vitals.set({ getElemByClassRoot: [DOM Node] }).
   * @return {?Element} The selected DOM element.
   */
  Vitals.getElemByClass = (function setup_getElemByClass(checkType,
                                                     getElemsByClass, floor) {

    /** @type {function(string, number=, (!Element|!Document)=): ?Element} */
    return function getElemByClass(classname, index, root) {

      // Public vitals module vars used in this method:
      // var defaults;

      /** @type {string} */
      var errorMsg;
      /** @type {?Array<!Element>} */
      var elems;

      if (!classname || !checkType(classname, 'string')) {
        errorMsg = 'A Vitals.getElemByClass call received a non-string or ';
        errorMsg += 'empty string classname param.';
        throw new TypeError(errorMsg);
      }

      if (!root || !checkType(root, '!element|document')) {
        root = ( (checkType(index, '!element|document')) ?
          index : defaults.getElemByClassRoot
        );
      }

      elems = getElemsByClass(classname, root);

      if (elems) {
        index = ( (!checkType(index, 'number') || index < -1) ?
          0 : (index < 0 || index >= elems.length) ?
            elems.length - 1 : floor(index)
        );
      }

      return elems && elems[ index ];
    };

  })(Vitals.checkType, Vitals.getElemsByClass, Math.floor);
