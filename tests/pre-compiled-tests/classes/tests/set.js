  /**
   * -------------------------------------------------
   * Public Method (Tests.set)
   * -------------------------------------------------
   * @desc Tests the aIV.utils.set method.
   * @type {function}
   */
  Tests.set = (function setupTests_set() {

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Private set Variables
    ////////////////////////////////////////////////////////////////////////////

    /** @type {!TestResults} */
    var results = new TestResults('aIV.utils.set', 4);

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Public set Method
    ////////////////////////////////////////////////////////////////////////////

    /**
     * -------------------------------------------------
     * Public Method (set)
     * -------------------------------------------------
     * @desc Tests the aIV.utils.set method.
     * @type {function}
     */
    var set = function() {

      testGetElemByClassRoot();
      testGetElemsByClassRoot();
      testGetElemByTagRoot();
      testGetElemsByTagRoot();

      // Save the results
      app.results.push(results);
    };

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Private set Methods
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ---------------------------------------------------
     * Private Method (testGetElemByClassRoot)
     * ---------------------------------------------------
     * @type {function}
     */
    var testGetElemByClassRoot = function() {

      /** @type {boolean} */
      var pass;
      /** @type {string} */
      var errorMsg;

      pass = aIV.utils.set({
        getElemByClassRoot: document
      });

      if (!pass) {
        errorMsg = 'aIV.utils.set({ getElemByClassRoot: document }) failed';
        results.addError(errorMsg);
      }
    };

    /**
     * ---------------------------------------------------
     * Private Method (testGetElemsByClassRoot)
     * ---------------------------------------------------
     * @type {function}
     */
    var testGetElemsByClassRoot = function() {

      /** @type {boolean} */
      var pass;
      /** @type {string} */
      var errorMsg;

      pass = aIV.utils.set({
        getElemsByClassRoot: document
      });

      if (!pass) {
        errorMsg = 'aIV.utils.set({ getElemsByClassRoot: document }) failed';
        results.addError(errorMsg);
      }
    };

    /**
     * ---------------------------------------------------
     * Private Method (testGetElemByTagRoot)
     * ---------------------------------------------------
     * @type {function}
     */
    var testGetElemByTagRoot = function() {

      /** @type {boolean} */
      var pass;
      /** @type {string} */
      var errorMsg;

      pass = aIV.utils.set({
        getElemByTagRoot: document
      });

      if (!pass) {
        errorMsg = 'aIV.utils.set({ getElemByTagRoot: document }) failed';
        results.addError(errorMsg);
      }
    };

    /**
     * ---------------------------------------------------
     * Private Method (testGetElemsByTagRoot)
     * ---------------------------------------------------
     * @type {function}
     */
    var testGetElemsByTagRoot = function() {

      /** @type {boolean} */
      var pass;
      /** @type {string} */
      var errorMsg;

      pass = aIV.utils.set({
        getElemsByTagRoot: document
      });

      if (!pass) {
        errorMsg = 'aIV.utils.set({ getElemsByTagRoot: document }) failed';
        results.addError(errorMsg);
      }
    };

    ////////////////////////////////////////////////////////////////////////////
    // The End Of The set Module
    ////////////////////////////////////////////////////////////////////////////

    return set;

  })();
