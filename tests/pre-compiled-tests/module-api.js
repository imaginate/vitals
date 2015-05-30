  /**
   * -----------------------------------------------------
   * Public Variable (testsModuleAPI)
   * -----------------------------------------------------
   * @desc Holds the module's public properties and methods.
   * @type {!Object<string, function>}
   * @struct
   */
  var testsModuleAPI = {};

  /**
   * -----------------------------------------------------
   * Public Method (testsModuleAPI.runTests)
   * -----------------------------------------------------
   * @desc Initializes the unit tests for each Vitals method.
   * @type {function}
   */
  testsModuleAPI.runTests = function() {

    if (testsBeenInitialized) {
      return;
    }

    testsBeenInitialized = true;

    app = new App();
    app.runTests();
  };
