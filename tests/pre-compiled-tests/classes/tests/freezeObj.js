  /**
   * -------------------------------------------------
   * Public Method (Tests.freezeObj)
   * -------------------------------------------------
   * @desc Tests the Vitals.freezeObj method.
   * @type {function}
   */
  Tests.freezeObj = (function setupTests_freezeObj() {

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Private freezeObj Variables
    ////////////////////////////////////////////////////////////////////////////

    /** @type {!TestResults} */
    var results = new TestResults('freezeObj', 2);

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Public freezeObj Method
    ////////////////////////////////////////////////////////////////////////////

    /**
     * -------------------------------------------------
     * Public Method (freezeObj)
     * -------------------------------------------------
     * @desc Tests the Vitals.freezeObj method.
     * @type {function}
     */
    var freezeObj = function() {

      testBasicFreeze();
      testDeepFreeze();

      // Save the results
      app.results.push(results);
    };

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Private freezeObj Methods
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ---------------------------------------------------
     * Private Method (testBasicFreeze)
     * ---------------------------------------------------
     * @type {function}
     */
    var testBasicFreeze = function() {

      /** @type {!Object} */
      var testObj;
      /** @type {string} */
      var errorMsg;

      testObj = {};

      Vitals.freezeObj(testObj);

      if ( !Object.isFrozen(testObj) ) {
        errorMsg = 'freezeObj failed to complete a basic freeze';
        results.addError(errorMsg);
      }
    };

    /**
     * ---------------------------------------------------
     * Private Method (testDeepFreeze)
     * ---------------------------------------------------
     * @type {function}
     */
    var testDeepFreeze = function() {

      /** @type {!Object} */
      var testObj;
      /** @type {string} */
      var errorMsg;

      testObj = {
        testProp1: 'a random string',
        testProp2: {
          testProp3: {}
        }
      };

      Vitals.freezeObj(testObj, true);

      if (!Object.isFrozen(testObj) ||
          !Object.isFrozen(testObj.testProp2) ||
          !Object.isFrozen(testObj.testProp2.testProp3)) {
        errorMsg = 'freezeObj failed to complete a deep freeze';
        results.addError(errorMsg);
      }
    };

    ////////////////////////////////////////////////////////////////////////////
    // The End Of The freezeObj Module
    ////////////////////////////////////////////////////////////////////////////

    return freezeObj;

  })();
