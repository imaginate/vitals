  /**
   * ---------------------------------------------------
   * Public Method (getElementsByClassNameAlt)
   * ---------------------------------------------------
   * @desc An alternative if [DOM Node].getElementsByClassName fails.
   * @param {string} classname - The class name of the element to select.
   * @param {!(Document|Element)} root - Limit the selections to this element's
   *   children.
   * @return {!Array<HTMLElement>} The selected DOM elements.
   */
  function getElementsByClassNameAlt(classname, root) {

    /** @type {number} */
    var i;
    /** @type {number} */
    var len;
    /** @type {!HTMLElement} */
    var elem;
    /** @type {!Array<HTMLElement>} */
    var elems;
    /** @type {!Array<HTMLElement>} */
    var allElems;
    /** @type {*} */
    var xpathResult;
    /** @type {string} */
    var xpathPattern;
    /** @type {!RegExp} */
    var classnameRegex;

    if (!!root.querySelectorAll) {
      elems = root.querySelectorAll('.' + classname);
    }
    else if (!!document.evaluate) {

      elems = [];
      classname = ' ' + classname + ' ';
      xpathPattern = './/*[contains(concat(" ", @class, " "), ';
      xpathPattern = '"' + classname + '")]';
      xpathResult = document.evaluate(xpathPattern, root, null, 0, null);

      elem = xpathResult.iterateNext();
      while (elem) {
        elems.push(elem);
        elem = xpathResult.iterateNext();
      }
    }
    else {

      classnameRegex = new RegExp('(^|\s)' + classname + '(\s|$)');
      allElems = root.getElementsByTagName('*');
      elems = [];

      len = allElems.length;
      i = -1;
      while (++i < len) {
        elem = allElems[i];
        if ( classnameRegex.test(elem.className) ) {
          elems.push(elem);
        }
      }
    }

    return elems;
  };
