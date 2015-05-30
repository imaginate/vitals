  /**
   * -------------------------------------------------
   * Public Method (Tests.reset)
   * -------------------------------------------------
   * @desc Tests the Vitals.reset method.
   * @type {function}
   */
  Tests.reset = (function setupTests_reset() {

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Private reset Variables
    ////////////////////////////////////////////////////////////////////////////

    /** @type {!TestResults} */
    var results = new TestResults('Vitals.reset', 4);

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Public reset Method
    ////////////////////////////////////////////////////////////////////////////

    /**
     * -------------------------------------------------
     * Public Method (reset)
     * -------------------------------------------------
     * @desc Tests the Vitals.reset method.
     * @type {function}
     */
    var reset = function() {

      testNoArgs();
      testStringArg();
      testArrArg();
      testStringArgs();

      // Save the results
      app.results.push(results);
    };

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Private reset Methods
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ---------------------------------------------------
     * Private Method (testNoArgs)
     * ---------------------------------------------------
     * @type {function}
     */
    var testNoArgs = function() {

      /** @type {string} */
      var errorMsg;

      try {
        Vitals.reset();
      }
      catch (error) {
        errorMsg = 'Vitals.reset() ';
        errorMsg += 'failed. ' + error.toString();
        results.addError(errorMsg);
      }
    };

    /**
     * ---------------------------------------------------
     * Private Method (testStringArg)
     * ---------------------------------------------------
     * @type {function}
     */
    var testStringArg = function() {

      /** @type {string} */
      var errorMsg;

      try {
        Vitals.reset('checkArgsErrorMsg');
      }
      catch (error) {
        errorMsg = 'Vitals.reset(\'checkArgsErrorMsg\') ';
        errorMsg += 'failed. ' + error.toString();
        results.addError(errorMsg);
      }
    };

    /**
     * ---------------------------------------------------
     * Private Method (testArrArg)
     * ---------------------------------------------------
     * @type {function}
     */
    var testArrArg = function() {

      /** @type {string} */
      var errorMsg;

      try {
        Vitals.reset([ 'checkArgsErrorMsg', 'getElemByTagRoot' ]);
      }
      catch (error) {
        errorMsg = 'Vitals.reset([ \'checkArgsErrorMsg\', ';
        errorMsg += '\'getElemByTagRoot\' ]) failed. ' + error.toString();
        results.addError(errorMsg);
      }
    };

    /**
     * ---------------------------------------------------
     * Private Method (testStringArgs)
     * ---------------------------------------------------
     * @type {function}
     */
    var testStringArgs = function() {

      /** @type {string} */
      var errorMsg;

      try {
        Vitals.reset('checkArgsErrorMsg', 'getElemByTagRoot');
      }
      catch (error) {
        errorMsg = 'Vitals.reset(\'checkArgsErrorMsg\', ';
        errorMsg += '\'getElemByTagRoot\') failed. ' + error.toString();
        results.addError(errorMsg);
      }
    };

    ////////////////////////////////////////////////////////////////////////////
    // The End Of The reset Module
    ////////////////////////////////////////////////////////////////////////////

    return reset;

  })();
