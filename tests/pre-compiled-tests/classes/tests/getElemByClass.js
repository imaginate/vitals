  /**
   * -------------------------------------------------
   * Public Method (Tests.getElemByClass)
   * -------------------------------------------------
   * @desc Tests the Vitals.getElemByClass method.
   * @type {function}
   */
  Tests.getElemByClass = (function setupTests_getElemByClass() {

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Private getElemByClass Variables
    ////////////////////////////////////////////////////////////////////////////

    /** @type {!TestResults} */
    var results = new TestResults('getElemByClass', 3);

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Public getElemByClass Method
    ////////////////////////////////////////////////////////////////////////////

    /**
     * -------------------------------------------------
     * Public Method (getElemByClass)
     * -------------------------------------------------
     * @desc Tests the Vitals.getElemByClass method.
     * @type {function}
     */
    var getElemByClass = function() {

      setupDOMForTests();

      testOnlyClassParam();
      testLastIndexParam();
      testRootParam();

      tearDownDOMForTests();

      // Save the results
      app.results.push(results);
    };

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Private getElemByClass Methods
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
      div.id = 'getElemByClass';
      div.style.display = 'none';

      elem1 = document.createElement('test');
      elem1.className = 'getElemByClass';
      elem1.innerHTML = 'Elem1';

      elem2 = document.createElement('test');
      elem2.className = 'getElemByClass';
      elem2.innerHTML = 'Elem2';

      elem3 = document.createElement('test');
      elem3.className = 'getElemByClass';
      elem3.id = 'getElemByClassElem';
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

      div = document.getElementById('getElemByClass');
      elem = document.getElementById('getElemByClassElem');

      document.body.removeChild(div);
      document.body.removeChild(elem);
    };

    /**
     * ---------------------------------------------------
     * Private Method (testOnlyClassParam)
     * ---------------------------------------------------
     * @type {function}
     */
    var testOnlyClassParam = function() {

      /** @type {!HTMLElement} */
      var elem;
      /** @type {boolean} */
      var pass;
      /** @type {string} */
      var errorMsg;

      pass = true;

      try {
        elem = Vitals.getElemByClass('getElemByClass');
      }
      catch (e) {
        pass = false;
      }

      pass = pass && (elem.innerHTML === 'Elem1');

      if (!pass) {
        errorMsg = 'getElemByClass failed to get the correct element with ';
        errorMsg += 'only the class name parameter';
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
        elem = Vitals.getElemByClass('getElemByClass', -1);
      }
      catch (e) {
        pass = false;
      }

      pass = pass && (elem.innerHTML === 'Elem3');

      if (!pass) {
        errorMsg = 'getElemByClass failed to get the correct element with ';
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
        root = document.getElementById('getElemByClass');
        elem = Vitals.getElemByClass('getElemByClass', -1, root);
      }
      catch (e) {
        pass = false;
      }

      pass = pass && (elem.innerHTML === 'Elem2');

      if (!pass) {
        errorMsg = 'getElemByClass failed to get the correct element with ';
        errorMsg += 'the root parameter applied';
        results.addError(errorMsg);
      }
    };

    ////////////////////////////////////////////////////////////////////////////
    // The End Of The getElemByClass Module
    ////////////////////////////////////////////////////////////////////////////

    return getElemByClass;

  })();
