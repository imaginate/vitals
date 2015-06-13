  /**
   * ---------------------------------------------------
   * Public Method (Vitals.getElemByTag)
   * ---------------------------------------------------
   * @desc A shortcut for the native DOM method -
   *   [DOM Node].getElementsByTagName[ [index] ].
   * @param {string} tag - The tag name of the element to select.
   * @param {number=} index - The index of the array of found elements to
   *   select. The default is 0.
   * @param {(!Element|!Document)=} root - Limit the selections to this element's
   *   children. The default is document or the element set with
   *   Vitals.set({ getElemByTagRoot: [DOM Node] }).
   * @return {?Element} The selected DOM element.
   */
  Vitals.getElemByTag = (function setup_getElemByTag(checkType,
                                                    getElemsByTag, floor) {

    /** @type {function(string, number=, (!Element|!Document)=): ?Element} */
    return function getElemByTag(tag, index, root) {

      // Public vitals module vars used in this method:
      // var defaults;

      /** @type {string} */
      var errorMsg;
      /** @type {?Array<!Element>} */
      var elems;

      if (!tag || !checkType(tag, 'string')) {
        errorMsg = 'A Vitals.getElemByTag call received a non-string or ';
        errorMsg += 'empty string tag param.';
        throw new TypeError(errorMsg);
      }

      if (!root || !checkType(root, '!element|document')) {
        root = ( (checkType(index, '!element|document')) ?
          index : defaults.getElemByTagRoot
        );
      }

      elems = getElemsByTag(tag, root);

      if (elems) {
        index = ( (!checkType(index, 'number') || index < -1) ?
          0 : (index < 0 || index >= elems.length) ?
            elems.length - 1 : floor(index)
        );
      }

      return elems && elems[ index ];
    };

  })(Vitals.checkType, Vitals.getElemsByTag, Math.floor);
