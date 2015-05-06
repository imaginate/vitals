  /**
   * -------------------------------------------------
   * Public Method (Tests.getElemByTag)
   * -------------------------------------------------
   * @desc Tests the aIV.utils.getElemByTag method.
   * @type {function}
   */
  Tests.getElemByTag = (function setupTests_getElemByTag() {

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Private getElemByTag Variables
    ////////////////////////////////////////////////////////////////////////////

    /** @type {!TestResults} */
    var results = new TestResults('getElemByTag', 3);

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Public getElemByTag Method
    ////////////////////////////////////////////////////////////////////////////

    /**
     * -------------------------------------------------
     * Public Method (getElemByTag)
     * -------------------------------------------------
     * @desc Tests the aIV.utils.getElemByTag method.
     * @type {function}
     */
    var getElemByTag = function() {

      setupDOMForTests();

      testOnlyTagParam();
      testLastIndexParam();
      testRootParam();

      tearDownDOMForTests();

      // Save the results
      app.results.push(results);
    };

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Private getElemByTag Methods
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
      div.id = 'getElemByTag';
      div.style.display = 'none';

      elem1 = document.createElement('getElemByTag');
      elem1.innerHTML = 'Elem1';

      elem2 = document.createElement('getElemByTag');
      elem2.innerHTML = 'Elem2';

      elem3 = document.createElement('getElemByTag');
      elem3.id = 'getElemByTagElem';
      elem3.innerHTML = 'Elem3';
      elem3.style.display = 'none';

      div.appendChild(elem1);
      div.appendChild(elem2);
      document.body.appendChild(div);
      document.body.appendChild(elem3);
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

      div = document.getElementById('getElemByTag');
      elem = document.getElementById('getElemByTagElem');

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

      /** @type {!HTMLElement} */
      var elem;
      /** @type {boolean} */
      var pass;
      /** @type {string} */
      var errorMsg;

      pass = true;

      try {
        elem = aIV.utils.getElemByTag('getElemByTag');
      }
      catch (e) {
        pass = false;
      }

      pass = pass && (elem.innerHTML === 'Elem1');

      if (!pass) {
        errorMsg = 'getElemByTag failed to get the correct element with ';
        errorMsg += 'only the tag name parameter';
        results.addError(errorMsg);
      }
    };

    /**
     * ---------------------------------------------------
     * Private Method (testLastIndexParam)
     * ---------------------------------------------------
     * @type {function}
     */
    var testLastIndexParam = function() {

      /** @type {!HTMLElement} */
      var elem;
      /** @type {boolean} */
      var pass;
      /** @type {string} */
      var errorMsg;

      pass = true;

      try {
        elem = aIV.utils.getElemByTag('getElemByTag', -1);
      }
      catch (e) {
        pass = false;
      }

      pass = pass && (elem.innerHTML === 'Elem3');

      if (!pass) {
        errorMsg = 'getElemByTag failed to get the correct element with ';
        errorMsg += '-1 for the index parameter';
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
      /** @type {!HTMLElement} */
      var elem;
      /** @type {boolean} */
      var pass;
      /** @type {string} */
      var errorMsg;

      pass = true;

      try {
        root = document.getElementById('getElemByTag');
        elem = aIV.utils.getElemByTag('getElemByTag', -1, root);
      }
      catch (e) {
        pass = false;
      }

      pass = pass && (elem.innerHTML === 'Elem2');

      if (!pass) {
        errorMsg = 'getElemByTag failed to get the correct element with ';
        errorMsg += 'the root parameter applied';
        results.addError(errorMsg);
      }
    };

    ////////////////////////////////////////////////////////////////////////////
    // The End Of The getElemByTag Module
    ////////////////////////////////////////////////////////////////////////////

    return getElemByTag;

  })();
