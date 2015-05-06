  /**
   * -------------------------------------------------
   * Public Method (Tests.getElemById)
   * -------------------------------------------------
   * @desc Tests the aIV.utils.getElemById method.
   * @type {function}
   */
  Tests.getElemById = (function setupTests_getElemById() {

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Private getElemById Variables
    ////////////////////////////////////////////////////////////////////////////

    /** @type {!TestResults} */
    var results = new TestResults('getElemById', 1);

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Public getElemById Method
    ////////////////////////////////////////////////////////////////////////////

    /**
     * -------------------------------------------------
     * Public Method (getElemById)
     * -------------------------------------------------
     * @desc Tests the aIV.utils.getElemById method.
     * @type {function}
     */
    var getElemById = function() {

      setupDOMForTests();

      testGetElemSuccess();

      tearDownDOMForTests();

      // Save the results
      app.results.push(results);
    };

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Private getElemById Methods
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ---------------------------------------------------
     * Private Method (setupDOMForTests)
     * ---------------------------------------------------
     * @type {function}
     */
    var setupDOMForTests = function() {

      /** @type {!HTMLElement} */
      var elem;

      elem = document.createElement('test');
      elem.id = 'getElemById';
      elem.innerHTML = 'Pass';
      elem.style.display = 'none';

      document.body.appendChild(elem);
    };

    /**
     * ---------------------------------------------------
     * Private Method (tearDownDOMForTests)
     * ---------------------------------------------------
     * @type {function}
     */
    var tearDownDOMForTests = function() {

      /** @type {!HTMLElement} */
      var elem;

      elem = document.getElementById('getElemById');
      document.body.removeChild(elem);
    };

    /**
     * ---------------------------------------------------
     * Private Method (testGetElemSuccess)
     * ---------------------------------------------------
     * @type {function}
     */
    var testGetElemSuccess = function() {

      /** @type {!HTMLElement} */
      var elem;
      /** @type {boolean} */
      var pass;
      /** @type {string} */
      var errorMsg;

      pass = true;

      try {
        elem = aIV.utils.getElemById('getElemById');
      }
      catch (e) {
        pass = false;
      }

      if (!elem) {
        pass = false;
      }

      pass = pass && (elem.innerHTML === 'Pass');

      if (!pass) {
        errorMsg = 'getElemById failed to get the correct element';
        results.addError(errorMsg);
      }
    };

    ////////////////////////////////////////////////////////////////////////////
    // The End Of The getElemById Module
    ////////////////////////////////////////////////////////////////////////////

    return getElemById;

  })();
