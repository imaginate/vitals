  /**
   * -------------------------------------------------
   * Public Method (Tests.getElemsByTag)
   * -------------------------------------------------
   * @desc Tests the aIV.utils.getElemsByTag method.
   * @type {function}
   */
  Tests.getElemsByTag = (function setupTests_getElemsByTag() {

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Private getElemsByTag Variables
    ////////////////////////////////////////////////////////////////////////////

    /** @type {!TestResults} */
    var results = new TestResults('getElemsByTag', 2);

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Public getElemsByTag Method
    ////////////////////////////////////////////////////////////////////////////

    /**
     * -------------------------------------------------
     * Public Method (getElemsByTag)
     * -------------------------------------------------
     * @desc Tests the aIV.utils.getElemsByTag method.
     * @type {function}
     */
    var getElemsByTag = function() {

      setupDOMForTests();

      testOnlyTagParam();
      testRootParam();

      tearDownDOMForTests();

      // Save the results
      app.results.push(results);
    };

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Private getElemsByTag Methods
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ---------------------------------------------------
     * Private Method (setupDOMForTests)
     * ---------------------------------------------------
     * @type {function}
     */
    var setupDOMForTests = function() {

      /** @type {!HTMLElement} */
      var div;
      /** @type {!HTMLElement} */
      var elem1;
      /** @type {!HTMLElement} */
      var elem2;
      /** @type {!HTMLElement} */
      var elem3;

      div = document.createElement('div');
      div.id = 'getElemsByTag';
      div.style.display = 'none';

      elem1 = document.createElement('getElemsByTag');
      elem1.id = 'getElemsByTagElem';
      elem1.innerHTML = 'Elem1';
      elem1.style.display = 'none';

      elem2 = document.createElement('getElemsByTag');
      elem2.innerHTML = 'Elem2';

      elem3 = document.createElement('getElemsByTag');
      elem3.innerHTML = 'Elem3';

      document.body.appendChild(elem1);
      div.appendChild(elem2);
      div.appendChild(elem3);
      document.body.appendChild(div);
    };

    /**
     * ---------------------------------------------------
     * Private Method (tearDownDOMForTests)
     * ---------------------------------------------------
     * @type {function}
     */
    var tearDownDOMForTests = function() {

      /** @type {!HTMLElement} */
      var div;
      /** @type {!HTMLElement} */
      var elem;

      div = document.getElementById('getElemsByTag');
      elem = document.getElementById('getElemsByTagElem');

      document.body.removeChild(div);
      document.body.removeChild(elem);
    };

    /**
     * ---------------------------------------------------
     * Private Method (testOnlyTagParam)
     * ---------------------------------------------------
     * @type {function}
     */
    var testOnlyTagParam = function() {

      /** @type {boolean} */
      var pass;
      /** @type {!Array<HTMLElement>} */
      var elems;
      /** @type {string} */
      var errorMsg;

      pass = true;

      try {
        elems = aIV.utils.getElemsByTag('getElemsByTag');
      }
      catch (e) {
        pass = false;
      }

      pass = pass && (elems[0].innerHTML === 'Elem1');

      if (!pass) {
        errorMsg = 'getElemsByTag failed to get the correct element with ';
        errorMsg += 'only the tag name parameter';
        results.addError(errorMsg);
      }
    };

    /**
     * ---------------------------------------------------
     * Private Method (testRootParam)
     * ---------------------------------------------------
     * @type {function}
     */
    var testRootParam = function() {

      /** @type {!HTMLElement} */
      var root;
      /** @type {boolean} */
      var pass;
      /** @type {!Array<HTMLElement>} */
      var elems;
      /** @type {string} */
      var errorMsg;

      pass = true;

      try {
        root = document.getElementById('getElemsByTag');
        elems = aIV.utils.getElemsByTag('getElemsByTag', root);
      }
      catch (e) {
        pass = false;
      }

      pass = pass && (elems[0].innerHTML === 'Elem2');

      if (!pass) {
        errorMsg = 'getElemsByTag failed to get the correct element with ';
        errorMsg += 'the root parameter applied';
        results.addError(errorMsg);
      }
    };

    ////////////////////////////////////////////////////////////////////////////
    // The End Of The getElemsByTag Module
    ////////////////////////////////////////////////////////////////////////////

    return getElemsByTag;

  })();
