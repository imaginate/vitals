  /**
   * -------------------------------------------------
   * Public Method (Tests.set)
   * -------------------------------------------------
   * @desc Tests the Vitals.set method.
   * @type {function}
   */
  Tests.set = (function setupTests_set() {

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Private set Variables
    ////////////////////////////////////////////////////////////////////////////

    /** @type {!TestResults} */
    var results = new TestResults('Vitals.set', 5);

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Public set Method
    ////////////////////////////////////////////////////////////////////////////

    /**
     * -------------------------------------------------
     * Public Method (set)
     * -------------------------------------------------
     * @desc Tests the Vitals.set method.
     * @type {function}
     */
    var set = function() {

      testCheckArgsErrorMsg();
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
     * Private Method (testCheckArgsErrorMsg)
     * ---------------------------------------------------
     * @type {function}
     */
    var testCheckArgsErrorMsg = function() {

      /** @type {string} */
      var errorMsg;

      try {
        Vitals.set({
          checkArgsErrorMsg: 'Errors oi'
        });
      }
      catch (error) {
        errorMsg = 'Vitals.set({ checkArgsErrorMsg: \'Errors oi\' }) ';
        errorMsg += 'failed. ' + error.toString();
        results.addError(errorMsg);
      }
    };

    /**
     * ---------------------------------------------------
     * Private Method (testGetElemByClassRoot)
     * ---------------------------------------------------
     * @type {function}
     */
    var testGetElemByClassRoot = function() {

      /** @type {string} */
      var errorMsg;

      try {
        Vitals.set({
          getElemByClassRoot: document
        });
      }
      catch (error) {
        errorMsg = 'Vitals.set({ getElemByClassRoot: document }) failed. ';
        errorMsg += error.toString();
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

      /** @type {string} */
      var errorMsg;

      try {
        Vitals.set({
          getElemsByClassRoot: document
        });
      }
      catch (error) {
        errorMsg = 'Vitals.set({ getElemsByClassRoot: document }) failed. ';
        errorMsg += error.toString();
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

      /** @type {string} */
      var errorMsg;

      try {
        Vitals.set({
          getElemByTagRoot: document
        });
      }
      catch (error) {
        errorMsg = 'Vitals.set({ getElemByTagRoot: document }) failed. ';
        errorMsg += error.toString();
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

      /** @type {string} */
      var errorMsg;

      try {
        Vitals.set({
          getElemsByTagRoot: document
        });
      }
      catch (error) {
        errorMsg = 'Vitals.set({ getElemsByTagRoot: document }) failed. ';
        errorMsg += error.toString();
        results.addError(errorMsg);
      }
    };

    ////////////////////////////////////////////////////////////////////////////
    // The End Of The set Module
    ////////////////////////////////////////////////////////////////////////////

    return set;

  })();
