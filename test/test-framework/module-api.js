  /**
   * -----------------------------------------------------
   * Public Variable (TestVitals)
   * -----------------------------------------------------
   * @desc Holds the module's public properties and methods.
   * @type {!Object<string, function>}
   * @struct
   */
  var TestVitals = {};

  /**
   * -----------------------------------------------------
   * Public Method (TestVitals.run)
   * -----------------------------------------------------
   * @desc Initializes the unit tests for each Vitals method.
   * @type {function}
   */
  TestVitals.run = function() {

    if (testsBeenInitialized) {
      return;
    }

    testsBeenInitialized = true;

    app = new App();
    app.runTests();
  };
