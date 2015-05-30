  /**
   * -------------------------------------------------
   * Public Method (Tests.hasOwnProp)
   * -------------------------------------------------
   * @desc Tests the Vitals.hasOwnProp method.
   * @type {function}
   */
  Tests.hasOwnProp = (function setupTests_hasOwnProp() {

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Private hasOwnProp Variables
    ////////////////////////////////////////////////////////////////////////////

    /** @type {!TestResults} */
    var results = new TestResults('hasOwnProp', 2);

    /** @type {!Object} */
    var testObj = {
      testProp1: true
    };

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Public hasOwnProp Method
    ////////////////////////////////////////////////////////////////////////////

    /**
     * -------------------------------------------------
     * Public Method (hasOwnProp)
     * -------------------------------------------------
     * @desc Tests the Vitals.hasOwnProp method.
     * @type {function}
     */
    var hasOwnProp = function() {

      testCatchFalse();
      testPassTrue();

      // Save the results
      app.results.push(results);
    };

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Private hasOwnProp Methods
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ---------------------------------------------------
     * Private Method (testCatchFalse)
     * ---------------------------------------------------
     * @type {function}
     */
    var testCatchFalse = function() {

      /** @type {boolean} */
      var fail;
      /** @type {string} */
      var errorMsg;

      fail = Vitals.hasOwnProp(testObj, 'testProp2');
      fail = fail || Vitals.hasOwnProp(testObj, 'prototype');

      if (fail) {
        errorMsg = 'hasOwnProp failed to return false for invalid properties';
        results.addError(errorMsg);
      }
    };

    /**
     * ---------------------------------------------------
     * Private Method (testPassTrue)
     * ---------------------------------------------------
     * @type {function}
     */
    var testPassTrue = function() {

      /** @type {boolean} */
      var pass;
      /** @type {string} */
      var errorMsg;

      pass = Vitals.hasOwnProp(testObj, 'testProp1');

      if (!pass) {
        errorMsg = 'hasOwnProp failed to return true for valid properties';
        results.addError(errorMsg);
      }
    };

    ////////////////////////////////////////////////////////////////////////////
    // The End Of The hasOwnProp Module
    ////////////////////////////////////////////////////////////////////////////

    return hasOwnProp;

  })();
