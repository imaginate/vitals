/**
 * -----------------------------------------------------------------------------
 * Algorithm IV JavaScript Shortcuts Tests (v1.0.6)
 * -----------------------------------------------------------------------------
 * @file The module used to run all testing for aIV.utils.
 * @module aIVUtilsTests
 * @version 1.0.6
 * @author Adam Smith ({@link adamsmith@youlum.com})
 * @copyright 2015 Adam A Smith ([github.com/imaginate]{@link https://github.com/imaginate})
 * @license The Apache License ([algorithmiv.com/docs/license]{@link http://algorithmiv.com/docs/license})
 * @desc More details about the module for aIV.tests:
 * <ol>
 *   <li>annotations: 
 *       [See Closure Compiler specific JSDoc]{@link https://developers.google.com/closure/compiler/docs/js-for-compiler}
 *       and [See JSDoc3]{@link http://usejsdoc.org/}
 *   </li>
 *   <li>contributing: 
 *       [See the guideline]{@link https://github.com/imaginate/algorithmIV-javascript-shortcuts/blob/master/CONTRIBUTING.md}
 *   </li>
 * </ol>
 */

/**
 * -----------------------------------------------------------------------------
 * Pre-Defined JSDoc Types
 * -----------------------------------------------------------------------------
 * @typedef {*} val
 * @typedef {Array<*>} vals
 * @typedef {Array<string>} strings
 * @typedef {Array<number>} numbers
 * @typedef {Array<Object>} objects
 * @typedef {Array<boolean>} booleans
 */

////////////////////////////////////////////////////////////////////////////////
// The Public API
////////////////////////////////////////////////////////////////////////////////

;(function setupTheTestsPublicAPI(testsModuleAPI, undefined) {
  "use strict";

/* -----------------------------------------------------------------------------
 * The Public API (public-api.js)
 * -------------------------------------------------------------------------- */

  /**
   * ---------------------------------------------------
   * Global Variable (aIV)
   * ---------------------------------------------------
   * @desc Holds the public API for aIV's apps, tools, and libraries.
   * @struct
   * @global
   */
  window.aIV = window.aIV || {};

  /**
   * ---------------------------------------------------
   * Global Method (aIV.runTests)
   * ---------------------------------------------------
   * @desc Runs the tests for aIV.console.
   * @type {function}
   * @global
   */
  aIV.runTests = testsModuleAPI.runTests;

})(

////////////////////////////////////////////////////////////////////////////////
// The Tests Module
////////////////////////////////////////////////////////////////////////////////

(function setupTheTestsModule(undefined) {
  "use strict"; 

/* -----------------------------------------------------------------------------
 * The Tests Module API (module-api.js)
 * -------------------------------------------------------------------------- */

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
   * @desc Initializes the aIV.utils tests.
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

/* -----------------------------------------------------------------------------
 * The Public Module Variables (module-vars.js)
 * -------------------------------------------------------------------------- */

  /**
   * -----------------------------------------------------
   * Public Variable (testsBeenInitialized)
   * -----------------------------------------------------
   * @desc Indicates whether the tests module has been initialized.
   * @type {boolean}
   */
  var testsBeenInitialized = false;

  /**
   * ----------------------------------------------- 
   * Public Variable (app)
   * -----------------------------------------------
   * @desc The instance of the tests App.
   * @type {!App}
   */
  var app;

/* -----------------------------------------------------------------------------
 * The Public Module Methods (module-methods.js)
 * -------------------------------------------------------------------------- */

  /**
   * ---------------------------------------------
   * Public Method (getID)
   * ---------------------------------------------
   * @desc A shortcut for getElementById.
   * @param {string} title - The name of the id of the element to select.
   * @return {HTMLElement} A reference to element with the given id.
   */
  function getID(title) {
    return document.getElementById(title);
  }

/* -----------------------------------------------------------------------------
 * The App Class (classes/app.js)
 * -------------------------------------------------------------------------- */

  /**
   * -----------------------------------------------------
   * Public Class (App)
   * -----------------------------------------------------
   * @desc The constructor for the App class.
   * @constructor
   */
  var App = function() {

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Public Properties
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ---------------------------------------------------
     * Public Property (App.elems)
     * ---------------------------------------------------
     * @desc The DOM elements for this app.
     * @type {!Object}
     */
    this.elems = new Elems();

    /**
     * ----------------------------------------------- 
     * Public Property (App.results)
     * -----------------------------------------------
     * @desc Saves the results of the tests.
     * @type {!Array<TestResults>}
     */
    this.results = [];

    ////////////////////////////////////////////////////////////////////////////
    // End Of The Class Setup
    ////////////////////////////////////////////////////////////////////////////

    Object.freeze(this);
  };

////////////////////////////////////////////////////////////////////////////////
// The Prototype Methods
////////////////////////////////////////////////////////////////////////////////

  App.prototype.constructor = App;

  /**
   * -----------------------------------------------
   * Public Method (App.prototype.runTests)
   * -----------------------------------------------
   * @desc Sets up the display for the app & runs the tests.
   * @type {function}
   */
  App.prototype.runTests = function() {

    /** @type {string} */
    var prop;

    // Clear the start message
    this.elems.clearUI();

    // Run all the tests
    for (prop in Tests) {
      if ( Tests.hasOwnProperty(prop) ) {
        Tests[ prop ]();
      }
    }

    // Show the results
    this.showResults();
  };

  /**
   * -----------------------------------------------
   * Public Method (App.prototype.showResults)
   * -----------------------------------------------
   * @desc Clears the UI and shows all of the results for the tests.
   * @type {function}
   */
  App.prototype.showResults = function() {

    /** @type {number} */
    var len;
    /** @type {number} */
    var i;
    /** @type {string} */
    var results;
    /** @type {?string} */
    var errors;
    /** @type {boolean} */
    var fail;

    len = this.results.length;
    fail = false;

    // Show the results
    results = '<h2>Results</h2>';
    results += '<ol id="results">';

    i = -1;
    while (++i < len) {
      results += this.results[i].reportResult();
      if ( !this.results[i].getResult() ) {
        fail = true;
      }
    }

    results += '</ol>';

    // Show the errors
    if (fail) {

      results += '<h2>Errors</h2>';
      results += '<ol id="errors">';

      i = -1;
      while (++i < len) {
        errors = this.results[i].reportErrors();
        if (errors) {
          results += errors;
        }
      }

      results += '</ol>';
    }

    // Hide the UI while setup is occurring
    this.elems.ui.style.opacity = '0';

    setTimeout(function() {
      app.elems.ui.innerHTML = results;
      app.elems.ui.style.opacity = '1';
    }, 500);
  };

/* -----------------------------------------------------------------------------
 * The Elems Class (classes/elems.js)
 * -------------------------------------------------------------------------- */

  /**
   * -----------------------------------------------------
   * Public Class (Elems)
   * -----------------------------------------------------
   * @desc Important app elements.
   * @constructor
   */
  var Elems = function() {

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Public Properties
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ---------------------------------------------------
     * Public Property (Elems.msg)
     * ---------------------------------------------------
     * @desc Element: #msg
     * @type {HTMLElement}
     */
    this.msg = getID('msg');

    /**
     * ---------------------------------------------------
     * Public Property (Elems.ui)
     * ---------------------------------------------------
     * @desc Element: #ui
     * @type {HTMLElement}
     */
    this.ui = getID('ui');

    /**
     * ---------------------------------------------------
     * Public Property (Elems.start)
     * ---------------------------------------------------
     * @desc Element: #start
     * @type {HTMLElement}
     */
    this.start = getID('start');

    ////////////////////////////////////////////////////////////////////////////
    // End Of The Class Setup
    ////////////////////////////////////////////////////////////////////////////

    Object.freeze(this);
  };

////////////////////////////////////////////////////////////////////////////////
// The Prototype Methods
////////////////////////////////////////////////////////////////////////////////

  Elems.prototype.constructor = Elems;

  /**
   * -----------------------------------------------
   * Public Method (Elems.prototype.clearUI)
   * -----------------------------------------------
   * @desc Clears the current interactions.
   * @type {function}
   */
  Elems.prototype.clearUI = function() {

    /** @type {!Elems} */
    var that;

    that = this;

    this.ui.style.opacity = '0';

    setTimeout(function() {
      that.msg.innerHTML = 'Tests are running.';
      that.start.style.display = 'none';
      that.ui.style.opacity = '1';
    }, 500);
  };

/* -----------------------------------------------------------------------------
 * The Test Results Class (classes/test-results.js)
 * -------------------------------------------------------------------------- */

  /**
   * -----------------------------------------------------
   * Public Class (TestResults)
   * -----------------------------------------------------
   * @desc Contains the results for a test.
   * @param {string} type - The type of tests that were ran.
   * @param {number=} amount - The number of tests that were ran.
   * @constructor
   */
  var TestResults = function(type, amount) {

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Protected Properties
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ----------------------------------------------- 
     * Protected Property (TestResults.result)
     * -----------------------------------------------
     * @desc The test results.
     * @type {boolean}
     */
    var result = true;

    /**
     * ----------------------------------------------- 
     * Protected Property (TestResults.errors)
     * -----------------------------------------------
     * @desc The test errors.
     * @type {!strings}
     */
    var errors = [];

    if (typeof amount !== 'number' || amount < 0) {
      amount = 0;
    }

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Public Methods
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ----------------------------------------------- 
     * Public Method (TestResults.reportResult)
     * -----------------------------------------------
     * @desc Reports the tests and their results.
     * @return {string} The test's type followed by its results.
     */
    this.reportResult = function() {

      /** @type {string} */
      var classname;
      /** @type {number} */
      var passed;
      /** @type {string} */
      var msg;
      /** @type {string} */
      var report;

      classname = (errors.length) ? 'red' : 'green';

      if (amount && amount > errors.length) {
        passed = amount - errors.length;
        report = '' +
          '<li class="' + classname + '">' +
            '<span class="title">' + type + '</span>' +
            ' =&gt; ' +
            '<span class="passed">' +
              'Passed ' + passed + ' of ' + amount + ' Tests' +
            '</span>' +
          '</li>';
      }
      else {
        msg = (result) ? 'Pass' : 'Fail';
        report = '' +
          '<li class="' + classname + '">' +
            '<span class="title">' + type + '</span>' +
            ' =&gt; ' + msg +
          '</li>';
      }

      return report;
    };

    /**
     * ----------------------------------------------- 
     * Public Method (TestResults.reportErrors)
     * -----------------------------------------------
     * @desc Reports the tests and their errors.
     * @return {?string} The test's type followed by its errors.
     */
    this.reportErrors = function() {

      /** @type {number} */
      var len;
      /** @type {number} */
      var i;
      /** @type {?string} */
      var report;

      len = errors.length;

      if (!len) {
        return null;
      }

      // The type of results name
      report = '<li>' + type;

      // The errors
      report += '<ol id="subErrors">';

      i = -1;
      while (++i < len) {
        report += '<li>' + errors[i] + '</li>';
      }

      report += '</ol></li>';

      return report;
    };

    /**
     * ----------------------------------------------- 
     * Public Method (TestResults.getResult)
     * -----------------------------------------------
     * @desc Gets the test results.
     * @return {boolean} The test's results.
     */
    this.getResult = function() {
      return result;
    };

    /**
     * ----------------------------------------------- 
     * Public Method (TestResults.setResult)
     * -----------------------------------------------
     * @desc Sets the test results.
     * @param {boolean} pass - The test results.
     */
    this.setResult = function(pass) {
      if (typeof pass === 'boolean') {
        result = pass;
      }
    };

    /**
     * ----------------------------------------------- 
     * Public Method (TestResults.addError)
     * -----------------------------------------------
     * @desc Adds an error to the test results.
     * @param {string} msg - The error message.
     */
    this.addError = function(msg) {

      result = false;

      if (typeof msg !== 'string') {
        msg = 'No error message was provided.';
      }

      errors.push(msg);
    };

    ////////////////////////////////////////////////////////////////////////////
    // End Of The Class Setup
    ////////////////////////////////////////////////////////////////////////////

    Object.freeze(this.reportResult);
    Object.freeze(this.reportErrors);
    Object.freeze(this.getResult);
    Object.freeze(this.setResult);
    Object.freeze(this.addError);
    Object.freeze(this);
  };

////////////////////////////////////////////////////////////////////////////////
// The Prototype Methods
////////////////////////////////////////////////////////////////////////////////

  TestResults.prototype.constructor = TestResults;

/* -----------------------------------------------------------------------------
 * Construct The Tests Class (classes/tests-construct.js)
 * -------------------------------------------------------------------------- */

  /**
   * -----------------------------------------------------
   * Public Class (Tests)
   * -----------------------------------------------------
   * @desc The tests to run.
   * @type {!Object<string, function>}
   */
  var Tests = {};

/* -----------------------------------------------------------------------------
 * The Unit Tests (classes/tests/*.js) (classes/tests-methods.js)
 * -------------------------------------------------------------------------- */

  /**
   * -------------------------------------------------
   * Public Method (Tests.addElemText)
   * -------------------------------------------------
   * @desc Tests the aIV.utils.addElemText method.
   * @type {function}
   */
  Tests.addElemText = (function setupTests_addElemText() {

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Private addElemText Variables
    ////////////////////////////////////////////////////////////////////////////

    /** @type {!TestResults} */
    var results = new TestResults('addElemText', 1);

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Public addElemText Method
    ////////////////////////////////////////////////////////////////////////////

    /**
     * -------------------------------------------------
     * Public Method (addElemText)
     * -------------------------------------------------
     * @desc Tests the aIV.utils.addElemText method.
     * @type {function}
     */
    var addElemText = function() {

      testBasicUse();

      // Save the results
      app.results.push(results);
    };

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Private addElemText Methods
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ---------------------------------------------------
     * Private Method (testBasicUse)
     * ---------------------------------------------------
     * @type {function}
     */
    var testBasicUse = function() {

      /** @type {!HTMLElement} */
      var elem;
      /** @type {boolean} */
      var pass;
      /** @type {string} */
      var text;
      /** @type {string} */
      var errorMsg;

      elem = document.createElement('test');
      if ('textContent' in elem) {
        elem.textContent = 'Start & ';
      }
      else {
        elem.innerText = 'Start & ';
      }

      aIV.utils.addElemText(elem, 'Pass');

      text = elem.textContent || elem.innerText;
      pass = (text === 'Start & Pass');

      if (!pass) {
        errorMsg = 'addElemText failed to update an element\'s innerText';
        results.addError(errorMsg);
      }
    };

    ////////////////////////////////////////////////////////////////////////////
    // The End Of The addElemText Module
    ////////////////////////////////////////////////////////////////////////////

    return addElemText;

  })();
  /**
   * -------------------------------------------------
   * Public Method (Tests.checkArgs)
   * -------------------------------------------------
   * @desc Tests the aIV.utils.checkArgs method.
   * @type {function}
   */
  Tests.checkArgs = (function setupTests_checkArgs() {

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Private checkArgs Variables
    ////////////////////////////////////////////////////////////////////////////

    /** @type {!TestResults} */
    var results = new TestResults('checkArgs', 3);

    /** @type {!RegExp} */
    var checkErrorMsg = /aIV\.utils\.checkArgs/;

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Public checkArgs Method
    ////////////////////////////////////////////////////////////////////////////

    /**
     * -------------------------------------------------
     * Public Method (checkArgs)
     * -------------------------------------------------
     * @desc Tests the aIV.utils.checkArgs method.
     * @type {function}
     */
    var checkArgs = function() {

      testOnePair();
      testTwoPair();
      testOneArg();

      // Save the results
      app.results.push(results);
    };

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Private checkArgs Methods
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ---------------------------------------------------
     * Private Method (testOnePair)
     * ---------------------------------------------------
     * @type {function}
     */
    var testOnePair = function() {

      /** @type {string} */
      var errorMsg;

      try {
        aIV.utils.checkArgs(3, 'number');
      }
      catch (error) {
        errorMsg = 'checkArgs(3, \'number\') failed. ';
        errorMsg += error.toString();
        results.addError(errorMsg);
      }

      try {
        aIV.utils.checkArgs(3, 'string');
      }
      catch (error) {
        if ( checkErrorMsg.test(error.message) ) {
          errorMsg = 'checkArgs(3, \'string\') failed. ';
          errorMsg += error.toString();
          results.addError(errorMsg);
        }
        else {
          errorMsg = 'The Default checkArgs Error Message: "';
          errorMsg += error.toString() + '"';
          console.log(errorMsg);
        }
      }
    };

    /**
     * ---------------------------------------------------
     * Private Method (testTwoPair)
     * ---------------------------------------------------
     * @type {function}
     */
    var testTwoPair = function() {

      /** @type {string} */
      var errorMsg;

      try {
        aIV.utils.checkArgs(3, 'number', true, 'boolean');
      }
      catch (error) {
        errorMsg = 'checkArgs(3, \'number\', true, \'boolean\') failed. ';
        errorMsg += error.toString();
        results.addError(errorMsg);
      }

      try {
        aIV.utils.checkArgs(3, 'number', true, 'string');
      }
      catch (error) {
        if ( checkErrorMsg.test(error.message) ) {
          errorMsg = 'checkArgs(3, \'number\', true, \'string\') failed. ';
          errorMsg += error.toString();
          results.addError(errorMsg);
        }
      }
    };

    /**
     * ---------------------------------------------------
     * Private Method (testOneArg)
     * ---------------------------------------------------
     * @type {function}
     */
    var testOneArg = function() {

      /** @type {boolean} */
      var pass;
      /** @type {string} */
      var errorMsg;

      errorMsg = 'An aIV.utils.checkArgs call was missing parameters.';

      try {
        aIV.utils.checkArgs(3);
      }
      catch (error) {
        if (error.message === errorMsg) {
          pass = true;
        }
      }

      if (!pass) {
        errorMsg = 'checkArgs(3) failed to throw a valid error.';
        results.addError(errorMsg);
      }
    };

    ////////////////////////////////////////////////////////////////////////////
    // The End Of The checkArgs Module
    ////////////////////////////////////////////////////////////////////////////

    return checkArgs;

  })();
  /**
   * -------------------------------------------------
   * Public Method (Tests.checkType)
   * -------------------------------------------------
   * @desc Tests the aIV.utils.checkType method.
   * @type {function}
   */
  Tests.checkType = (function setupTests_checkType() {

    ////////////////////////////////////////////////////////////////////////////
    // Define The Private checkType Variables
    ////////////////////////////////////////////////////////////////////////////

    /** @type {!TestResults} */
    var results;
    /** @type {HTMLElement} */
    var elem;
    /** @type {!Object} */
    var obj;
    /** @type {function} */
    var func;
    /** @type {!Array} */
    var arr;

    ////////////////////////////////////////////////////////////////////////////
    // Setup The Private checkType Variables
    ////////////////////////////////////////////////////////////////////////////

    results = new TestResults('checkType', 29);
    elem = document.createElement('div');
    obj  = {};
    func = function() {};
    arr  = [];

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Public checkType Method
    ////////////////////////////////////////////////////////////////////////////

    /**
     * -------------------------------------------------
     * Public Method (checkType)
     * -------------------------------------------------
     * @desc Tests the aIV.utils.checkType method.
     * @type {function}
     */
    var checkType = function() {

      // Test the special characters
      testAsterisk();
      testExclamationPoint();
      testQuestionMark();
      testPipe();
      testEqualSign();

      // Test for undefined and null
      testUndefined();
      testNull();

      // Test the primitive values
      testString();
      testNumber();
      testBoolean();

      // Test the basic objects
      testObject();
      testFunction();
      testElement();
      testDocument();

      // Test the arrays
      testArray();
      testStrings();
      testNumbers();
      testBooleans();
      testObjects();
      testFunctions();
      testElements();
      testArrays();

      // Test the hash maps
      testStringMap();
      testNumberMap();
      testBooleanMap();
      testObjectMap();
      testFunctionMap();
      testArrayMap();
      testElementMap();

      // Save the results
      app.results.push(results);
    };

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Private checkType Methods
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ---------------------------------------------------
     * Private Method (testAsterisk)
     * ---------------------------------------------------
     * @type {function}
     */
    var testAsterisk = function() {

      /** @type {boolean} */
      var pass;
      /** @type {string} */
      var errorMsg;

      try {
        pass = aIV.utils.checkType(null, '*');
        pass = pass && aIV.utils.checkType(0, '*');
      }
      catch (error) {
        pass = false;
      }

      if (!pass) {
        errorMsg = 'Tests.checkType failed: * check failed';
        results.addError(errorMsg);
      }
    };

    /**
     * ---------------------------------------------------
     * Private Method (testExclamationPoint)
     * ---------------------------------------------------
     * @type {function}
     */
    var testExclamationPoint = function() {

      /** @type {boolean} */
      var fail;
      /** @type {string} */
      var errorMsg;

      fail = aIV.utils.checkType(null, '!array');
      fail = fail || aIV.utils.checkType(null, '!object');

      if (fail) {
        errorMsg = 'Tests.checkType failed: ! check failed';
        results.addError(errorMsg);
      }
    };

    /**
     * ---------------------------------------------------
     * Private Method (testQuestionMark)
     * ---------------------------------------------------
     * @type {function}
     */
    var testQuestionMark = function() {

      /** @type {boolean} */
      var pass;
      /** @type {string} */
      var errorMsg;

      pass = aIV.utils.checkType(null, '?(string|number)');
      pass = pass && aIV.utils.checkType(null, '?string');

      if (!pass) {
        errorMsg = 'Tests.checkType failed: ? check failed';
        results.addError(errorMsg);
      }
    };

    /**
     * ---------------------------------------------------
     * Private Method (testPipe)
     * ---------------------------------------------------
     * @type {function}
     */
    var testPipe = function() {

      /** @type {boolean} */
      var pass;
      /** @type {boolean} */
      var fail;
      /** @type {string} */
      var errorMsg;

      pass = aIV.utils.checkType('s', 'string|number');
      pass = pass && aIV.utils.checkType(1, 'string|number');

      fail = aIV.utils.checkType(true, 'string|number');
      fail = fail || aIV.utils.checkType(obj, 'string|number');

      if (!pass || fail) {
        errorMsg = 'Tests.checkType failed: | check failed';
        results.addError(errorMsg);
      }
    };

    /**
     * ---------------------------------------------------
     * Private Method (testEqualSign)
     * ---------------------------------------------------
     * @type {function}
     */
    var testEqualSign = function() {

      /** @type {boolean} */
      var pass;
      /** @type {boolean} */
      var fail;
      /** @type {string} */
      var errorMsg;

      pass = aIV.utils.checkType(undefined, '(object|string)=');
      pass = pass && aIV.utils.checkType(undefined, 'number=');

      fail = aIV.utils.checkType(obj, 'number=');
      fail = fail || aIV.utils.checkType('s', 'boolean=');

      if (!pass || fail) {
        errorMsg = 'Tests.checkType failed: = check failed';
        results.addError(errorMsg);
      }
    };

    /**
     * ---------------------------------------------------
     * Private Method (testUndefined)
     * ---------------------------------------------------
     * @type {function}
     */
    var testUndefined = function() {

      /** @type {boolean} */
      var pass;
      /** @type {boolean} */
      var fail;
      /** @type {string} */
      var errorMsg;

      pass = aIV.utils.checkType(undefined, 'string|undefined');
      pass = pass && aIV.utils.checkType(undefined, 'undefined');

      fail = aIV.utils.checkType(obj, 'undefined');
      fail = fail || aIV.utils.checkType('s', 'undefined');

      if (!pass || fail) {
        errorMsg = 'Tests.checkType failed: undefined check failed';
        results.addError(errorMsg);
      }
    };

    /**
     * ---------------------------------------------------
     * Private Method (testNull)
     * ---------------------------------------------------
     * @type {function}
     */
    var testNull = function() {

      /** @type {boolean} */
      var pass;
      /** @type {boolean} */
      var fail;
      /** @type {string} */
      var errorMsg;

      pass = aIV.utils.checkType(null, 'string|object');
      pass = pass && aIV.utils.checkType(null, 'array');
      pass = pass && aIV.utils.checkType(null, 'elem');
      pass = pass && aIV.utils.checkType(null, 'strings');

      fail = aIV.utils.checkType(null, 'function');
      fail = fail || aIV.utils.checkType(null, 'string');

      if (!pass || fail) {
        errorMsg = 'Tests.checkType failed: null check failed';
        results.addError(errorMsg);
      }
    };

    /**
     * ---------------------------------------------------
     * Private Method (testString)
     * ---------------------------------------------------
     * @type {function}
     */
    var testString = function() {

      /** @type {boolean} */
      var pass;
      /** @type {boolean} */
      var fail;
      /** @type {string} */
      var errorMsg;

      pass = aIV.utils.checkType('s', 'string|object');
      pass = pass && aIV.utils.checkType('s', 'string');

      fail = aIV.utils.checkType(elem, 'string');
      fail = fail || aIV.utils.checkType(1, 'string');

      if (!pass || fail) {
        errorMsg = 'Tests.checkType failed: string check failed';
        results.addError(errorMsg);
      }
    };

    /**
     * ---------------------------------------------------
     * Private Method (testNumber)
     * ---------------------------------------------------
     * @type {function}
     */
    var testNumber = function() {

      /** @type {boolean} */
      var pass;
      /** @type {boolean} */
      var fail;
      /** @type {string} */
      var errorMsg;

      pass = aIV.utils.checkType(1, 'string|number');
      pass = pass && aIV.utils.checkType(20, 'number');

      fail = aIV.utils.checkType(obj, 'number');
      fail = fail || aIV.utils.checkType('1', 'number');

      if (!pass || fail) {
        errorMsg = 'Tests.checkType failed: number check failed';
        results.addError(errorMsg);
      }
    };

    /**
     * ---------------------------------------------------
     * Private Method (testBoolean)
     * ---------------------------------------------------
     * @type {function}
     */
    var testBoolean = function() {

      /** @type {boolean} */
      var pass;
      /** @type {boolean} */
      var fail;
      /** @type {string} */
      var errorMsg;

      pass = aIV.utils.checkType(true, 'object|boolean');
      pass = pass && aIV.utils.checkType(false, 'boolean');

      fail = aIV.utils.checkType('s', 'boolean');
      fail = fail || aIV.utils.checkType(5, 'boolean');

      if (!pass || fail) {
        errorMsg = 'Tests.checkType failed: boolean check failed';
        results.addError(errorMsg);
      }
    };

    /**
     * ---------------------------------------------------
     * Private Method (testObject)
     * ---------------------------------------------------
     * @type {function}
     */
    var testObject = function() {

      /** @type {boolean} */
      var pass;
      /** @type {boolean} */
      var fail;
      /** @type {string} */
      var errorMsg;

      pass = aIV.utils.checkType(obj, 'object');
      pass = pass && aIV.utils.checkType(arr, 'object');
      pass = pass && aIV.utils.checkType(elem, 'object');

      fail = aIV.utils.checkType('s', 'object');
      fail = fail || aIV.utils.checkType(func, 'object');

      if (!pass || fail) {
        errorMsg = 'Tests.checkType failed: object check failed';
        results.addError(errorMsg);
      }
    };

    /**
     * ---------------------------------------------------
     * Private Method (testFunction)
     * ---------------------------------------------------
     * @type {function}
     */
    var testFunction = function() {

      /** @type {boolean} */
      var pass;
      /** @type {boolean} */
      var fail;
      /** @type {string} */
      var errorMsg;

      pass = aIV.utils.checkType(func, 'string|function');
      pass = pass && aIV.utils.checkType(func, 'function');

      fail = aIV.utils.checkType('s', 'function');
      fail = fail || aIV.utils.checkType(obj, 'function');

      if (!pass || fail) {
        errorMsg = 'Tests.checkType failed: function check failed';
        results.addError(errorMsg);
      }
    };

    /**
     * ---------------------------------------------------
     * Private Method (testElement)
     * ---------------------------------------------------
     * @type {function}
     */
    var testElement = function() {

      /** @type {boolean} */
      var pass;
      /** @type {boolean} */
      var fail;
      /** @type {string} */
      var errorMsg;

      pass = aIV.utils.checkType(elem, 'element');
      pass = pass && aIV.utils.checkType(elem, 'elem');

      fail = aIV.utils.checkType(5, 'element');
      fail = fail || aIV.utils.checkType(obj, 'elem');

      if (!pass || fail) {
        errorMsg = 'Tests.checkType failed: element check failed';
        results.addError(errorMsg);
      }
    };

    /**
     * ---------------------------------------------------
     * Private Method (testDocument)
     * ---------------------------------------------------
     * @type {function}
     */
    var testDocument = function() {

      /** @type {boolean} */
      var pass;
      /** @type {boolean} */
      var fail;
      /** @type {string} */
      var errorMsg;
      /** @type {Window} */
      var tempWindow;

      tempWindow = window.open();

      pass = aIV.utils.checkType(tempWindow.document, 'document');
      pass = pass && aIV.utils.checkType(document, 'document');

      tempWindow.close();

      fail = aIV.utils.checkType(elem, 'document');

      if (!pass || fail) {
        errorMsg = 'Tests.checkType failed: document check failed';
        results.addError(errorMsg);
      }
    };

    /**
     * ---------------------------------------------------
     * Private Method (testArray)
     * ---------------------------------------------------
     * @type {function}
     */
    var testArray = function() {

      /** @type {boolean} */
      var pass;
      /** @type {boolean} */
      var fail;
      /** @type {string} */
      var errorMsg;

      pass = aIV.utils.checkType([ 3, 4 ], 'array');
      pass = pass && aIV.utils.checkType(arr, 'array');

      fail = aIV.utils.checkType(obj, 'array');
      fail = fail || aIV.utils.checkType(1, 'array');

      if (!pass || fail) {
        errorMsg = 'Tests.checkType failed: array check failed';
        results.addError(errorMsg);
      }
    };

    /**
     * ---------------------------------------------------
     * Private Method (testStrings)
     * ---------------------------------------------------
     * @type {function}
     */
    var testStrings = function() {

      /** @type {boolean} */
      var pass;
      /** @type {boolean} */
      var fail;
      /** @type {string} */
      var errorMsg;

      pass = aIV.utils.checkType([ 's' ], 'strings');
      pass = pass && aIV.utils.checkType(arr, 'strings');

      fail = aIV.utils.checkType([ 1 ], 'strings');
      fail = fail || aIV.utils.checkType(obj, 'strings');

      if (!pass || fail) {
        errorMsg = 'Tests.checkType failed: strings check failed';
        results.addError(errorMsg);
      }
    };

    /**
     * ---------------------------------------------------
     * Private Method (testNumbers)
     * ---------------------------------------------------
     * @type {function}
     */
    var testNumbers = function() {

      /** @type {boolean} */
      var pass;
      /** @type {boolean} */
      var fail;
      /** @type {string} */
      var errorMsg;

      pass = aIV.utils.checkType([ 1, 5 ], 'numbers');
      pass = pass && aIV.utils.checkType(arr, 'numbers');

      fail = aIV.utils.checkType([ 1, 's' ], 'numbers');
      fail = fail || aIV.utils.checkType(obj, 'numbers');

      if (!pass || fail) {
        errorMsg = 'Tests.checkType failed: numbers check failed';
        results.addError(errorMsg);
      }
    };

    /**
     * ---------------------------------------------------
     * Private Method (testBooleans)
     * ---------------------------------------------------
     * @type {function}
     */
    var testBooleans = function() {

      /** @type {boolean} */
      var pass;
      /** @type {boolean} */
      var fail;
      /** @type {string} */
      var errorMsg;

      pass = aIV.utils.checkType([ false ], 'booleans');
      pass = pass && aIV.utils.checkType(arr, 'booleans');

      fail = aIV.utils.checkType([ 's' ], 'booleans');
      fail = fail || aIV.utils.checkType(obj, 'booleans');

      if (!pass || fail) {
        errorMsg = 'Tests.checkType failed: booleans check failed';
        results.addError(errorMsg);
      }
    };

    /**
     * ---------------------------------------------------
     * Private Method (testObjects)
     * ---------------------------------------------------
     * @type {function}
     */
    var testObjects = function() {

      /** @type {boolean} */
      var pass;
      /** @type {boolean} */
      var fail;
      /** @type {string} */
      var errorMsg;

      pass = aIV.utils.checkType([ obj ], 'objects');
      pass = pass && aIV.utils.checkType(arr, 'objects');

      fail = aIV.utils.checkType([ obj, 1 ], 'objects');
      fail = fail || aIV.utils.checkType(obj, 'objects');

      if (!pass || fail) {
        errorMsg = 'Tests.checkType failed: objects check failed';
        results.addError(errorMsg);
      }
    };

    /**
     * ---------------------------------------------------
     * Private Method (testFunctions)
     * ---------------------------------------------------
     * @type {function}
     */
    var testFunctions = function() {

      /** @type {boolean} */
      var pass;
      /** @type {boolean} */
      var fail;
      /** @type {string} */
      var errorMsg;

      pass = aIV.utils.checkType([ func ], 'functions');
      pass = pass && aIV.utils.checkType(arr, 'functions');

      fail = aIV.utils.checkType([ func, 1 ], 'functions');
      fail = fail || aIV.utils.checkType([ obj ], 'functions');

      if (!pass || fail) {
        errorMsg = 'Tests.checkType failed: functions check failed';
        results.addError(errorMsg);
      }
    };

    /**
     * ---------------------------------------------------
     * Private Method (testElements)
     * ---------------------------------------------------
     * @type {function}
     */
    var testElements = function() {

      /** @type {boolean} */
      var pass;
      /** @type {boolean} */
      var fail;
      /** @type {string} */
      var errorMsg;

      pass = aIV.utils.checkType([ elem ], 'elems');
      pass = pass && aIV.utils.checkType(arr, 'elems');
      pass = pass && aIV.utils.checkType([ elem ], 'elements');
      pass = pass && aIV.utils.checkType(arr, 'elements');

      fail = aIV.utils.checkType([ obj ], 'elems');
      fail = fail || aIV.utils.checkType(5, 'elems');
      fail = fail || aIV.utils.checkType(true, 'elements');

      if (!pass || fail) {
        errorMsg = 'Tests.checkType failed: elements check failed';
        results.addError(errorMsg);
      }
    };

    /**
     * ---------------------------------------------------
     * Private Method (testArrays)
     * ---------------------------------------------------
     * @type {function}
     */
    var testArrays = function() {

      /** @type {boolean} */
      var pass;
      /** @type {boolean} */
      var fail;
      /** @type {string} */
      var errorMsg;

      pass = aIV.utils.checkType([ [ 1 ] ], 'arrays');
      pass = pass && aIV.utils.checkType([ arr ], 'arrays');
      pass = pass && aIV.utils.checkType(arr, 'arrays');

      fail = aIV.utils.checkType([ arr, 1 ], 'arrays');
      fail = fail || aIV.utils.checkType([ obj ], 'arrays');

      if (!pass || fail) {
        errorMsg = 'Tests.checkType failed: arrays check failed';
        results.addError(errorMsg);
      }
    };

    /**
     * ---------------------------------------------------
     * Private Method (testStringMap)
     * ---------------------------------------------------
     * @type {function}
     */
    var testStringMap = function() {

      /** @type {boolean} */
      var pass;
      /** @type {boolean} */
      var fail;
      /** @type {!Object} */
      var testMap;
      /** @type {string} */
      var errorMsg;

      testMap = { slot1: 'str', slot2: 'str' };

      pass = aIV.utils.checkType(testMap, 'stringMap');
      pass = pass && aIV.utils.checkType(obj, 'stringMap');

      testMap = { slot1: 'str', slot2: 1 };

      fail = aIV.utils.checkType(testMap, 'stringMap');
      fail = fail || aIV.utils.checkType(5, 'stringMap');

      if (!pass || fail) {
        errorMsg = 'Tests.checkType failed: stringMap check failed';
        results.addError(errorMsg);
      }
    };

    /**
     * ---------------------------------------------------
     * Private Method (testNumberMap)
     * ---------------------------------------------------
     * @type {function}
     */
    var testNumberMap = function() {

      /** @type {boolean} */
      var pass;
      /** @type {boolean} */
      var fail;
      /** @type {!Object} */
      var testMap;
      /** @type {string} */
      var errorMsg;

      testMap = { slot1: 1, slot2: 5 };

      pass = aIV.utils.checkType(testMap, 'numberMap');
      pass = pass && aIV.utils.checkType(obj, 'numberMap');

      testMap = { slot1: 5, slot2: 'str' };

      fail = aIV.utils.checkType(testMap, 'numberMap');
      fail = fail || aIV.utils.checkType(5, 'numberMap');

      if (!pass || fail) {
        errorMsg = 'Tests.checkType failed: numberMap check failed';
        results.addError(errorMsg);
      }
    };

    /**
     * ---------------------------------------------------
     * Private Method (testBooleanMap)
     * ---------------------------------------------------
     * @type {function}
     */
    var testBooleanMap = function() {

      /** @type {boolean} */
      var pass;
      /** @type {boolean} */
      var fail;
      /** @type {!Object} */
      var testMap;
      /** @type {string} */
      var errorMsg;

      testMap = { slot1: false, slot2: true };

      pass = aIV.utils.checkType(testMap, 'booleanMap');
      pass = pass && aIV.utils.checkType(obj, 'booleanMap');

      testMap = { slot1: true, slot2: 'str' };

      fail = aIV.utils.checkType(testMap, 'booleanMap');
      fail = fail || aIV.utils.checkType(5, 'booleanMap');

      if (!pass || fail) {
        errorMsg = 'Tests.checkType failed: booleanMap check failed';
        results.addError(errorMsg);
      }
    };

    /**
     * ---------------------------------------------------
     * Private Method (testObjectMap)
     * ---------------------------------------------------
     * @type {function}
     */
    var testObjectMap = function() {

      /** @type {boolean} */
      var pass;
      /** @type {boolean} */
      var fail;
      /** @type {!Object} */
      var testMap;
      /** @type {string} */
      var errorMsg;

      testMap = { slot1: obj, slot2: arr };

      pass = aIV.utils.checkType(testMap, 'objectMap');
      pass = pass && aIV.utils.checkType(obj, 'objectMap');

      testMap = { slot1: obj, slot2: 'str' };

      fail = aIV.utils.checkType(testMap, 'objectMap');
      fail = fail || aIV.utils.checkType(5, 'objectMap');

      if (!pass || fail) {
        errorMsg = 'Tests.checkType failed: objectMap check failed';
        results.addError(errorMsg);
      }
    };

    /**
     * ---------------------------------------------------
     * Private Method (testFunctionMap)
     * ---------------------------------------------------
     * @type {function}
     */
    var testFunctionMap = function() {

      /** @type {boolean} */
      var pass;
      /** @type {boolean} */
      var fail;
      /** @type {!Object} */
      var testMap;
      /** @type {string} */
      var errorMsg;

      testMap = { slot1: func, slot2: func };

      pass = aIV.utils.checkType(testMap, 'functionMap');
      pass = pass && aIV.utils.checkType(obj, 'functionMap');

      testMap = { slot1: obj, slot2: func };

      fail = aIV.utils.checkType(testMap, 'functionMap');
      fail = fail || aIV.utils.checkType(5, 'functionMap');

      if (!pass || fail) {
        errorMsg = 'Tests.checkType failed: functionMap check failed';
        results.addError(errorMsg);
      }
    };

    /**
     * ---------------------------------------------------
     * Private Method (testArrayMap)
     * ---------------------------------------------------
     * @type {function}
     */
    var testArrayMap = function() {

      /** @type {boolean} */
      var pass;
      /** @type {boolean} */
      var fail;
      /** @type {!Object} */
      var testMap;
      /** @type {string} */
      var errorMsg;

      testMap = { slot1: [ 1 ], slot2: arr };

      pass = aIV.utils.checkType(testMap, 'arrayMap');
      pass = pass && aIV.utils.checkType(obj, 'arrayMap');

      testMap = { slot1: obj, slot2: arr };

      fail = aIV.utils.checkType(testMap, 'arrayMap');
      fail = fail || aIV.utils.checkType(5, 'arrayMap');

      if (!pass || fail) {
        errorMsg = 'Tests.checkType failed: arrayMap check failed';
        results.addError(errorMsg);
      }
    };

    /**
     * ---------------------------------------------------
     * Private Method (testElementMap)
     * ---------------------------------------------------
     * @type {function}
     */
    var testElementMap = function() {

      /** @type {boolean} */
      var pass;
      /** @type {boolean} */
      var fail;
      /** @type {!Object} */
      var testMap;
      /** @type {string} */
      var errorMsg;

      testMap = { slot1: elem, slot2: elem };

      pass = aIV.utils.checkType(testMap, 'elemMap');
      pass = pass && aIV.utils.checkType(obj, 'elemMap');
      pass = pass && aIV.utils.checkType(testMap, 'elementMap');

      testMap = { slot1: obj, slot2: elem };

      fail = aIV.utils.checkType(testMap, 'elemMap');
      fail = fail || aIV.utils.checkType(5, 'elementMap');

      if (!pass || fail) {
        errorMsg = 'Tests.checkType failed: elementMap check failed';
        results.addError(errorMsg);
      }
    };

    ////////////////////////////////////////////////////////////////////////////
    // The End Of The checkType Module
    ////////////////////////////////////////////////////////////////////////////

    return checkType;

  })();
  /**
   * -------------------------------------------------
   * Public Method (Tests.freezeObj)
   * -------------------------------------------------
   * @desc Tests the aIV.utils.freezeObj method.
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
     * @desc Tests the aIV.utils.freezeObj method.
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

      aIV.utils.freezeObj(testObj);

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

      aIV.utils.freezeObj(testObj, true);

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
  /**
   * -------------------------------------------------
   * Public Method (Tests.getElemByClass)
   * -------------------------------------------------
   * @desc Tests the aIV.utils.getElemByClass method.
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
     * @desc Tests the aIV.utils.getElemByClass method.
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
        elem = aIV.utils.getElemByClass('getElemByClass');
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
        elem = aIV.utils.getElemByClass('getElemByClass', -1);
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
        elem = aIV.utils.getElemByClass('getElemByClass', -1, root);
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
  /**
   * -------------------------------------------------
   * Public Method (Tests.getElemsByClass)
   * -------------------------------------------------
   * @desc Tests the aIV.utils.getElemsByClass method.
   * @type {function}
   */
  Tests.getElemsByClass = (function setupTests_getElemsByClass() {

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Private getElemsByClass Variables
    ////////////////////////////////////////////////////////////////////////////

    /** @type {!TestResults} */
    var results = new TestResults('getElemsByClass', 2);

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Public getElemsByClass Method
    ////////////////////////////////////////////////////////////////////////////

    /**
     * -------------------------------------------------
     * Public Method (getElemsByClass)
     * -------------------------------------------------
     * @desc Tests the aIV.utils.getElemsByClass method.
     * @type {function}
     */
    var getElemsByClass = function() {

      setupDOMForTests();

      testOnlyClassParam();
      testRootParam();

      tearDownDOMForTests();

      // Save the results
      app.results.push(results);
    };

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Private getElemsByClass Methods
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
      div.id = 'getElemsByClass';
      div.style.display = 'none';

      elem1 = document.createElement('test');
      elem1.className = 'getElemsByClass';
      elem1.id = 'getElemsByClassElem';
      elem1.innerHTML = 'Elem1';
      elem1.style.display = 'none';

      elem2 = document.createElement('test');
      elem2.className = 'getElemsByClass';
      elem2.innerHTML = 'Elem2';

      elem3 = document.createElement('test');
      elem3.className = 'getElemsByClass';
      elem3.innerHTML = 'Elem3';

      document.body.appendChild(elem1);
      div.appendChild(elem2);
      div.appendChild(elem3);
      document.body.appendChild(div);
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

      div = document.getElementById('getElemsByClass');
      elem = document.getElementById('getElemsByClassElem');

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

      /** @type {boolean} */
      var pass;
      /** @type {!Array<HTMLElement>} */
      var elems;
      /** @type {string} */
      var errorMsg;

      pass = true;

      try {
        elems = aIV.utils.getElemsByClass('getElemsByClass');
      }
      catch (e) {
        pass = false;
      }

      pass = pass && (elems[0].innerHTML === 'Elem1');

      if (!pass) {
        errorMsg = 'getElemsByClass failed to get the correct element with ';
        errorMsg += 'only the class name parameter';
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
      /** @type {boolean} */
      var pass;
      /** @type {!Array<HTMLElement>} */
      var elems;
      /** @type {string} */
      var errorMsg;

      pass = true;

      try {
        root = document.getElementById('getElemsByClass');
        elems = aIV.utils.getElemsByClass('getElemsByClass', root);
      }
      catch (e) {
        pass = false;
      }

      pass = pass && (elems[0].innerHTML === 'Elem2');

      if (!pass) {
        errorMsg = 'getElemsByClass failed to get the correct element with ';
        errorMsg += 'the root parameter applied';
        results.addError(errorMsg);
      }
    };

    ////////////////////////////////////////////////////////////////////////////
    // The End Of The getElemsByClass Module
    ////////////////////////////////////////////////////////////////////////////

    return getElemsByClass;

  })();
  /**
   * -------------------------------------------------
   * Public Method (Tests.getElemsByTag)
   * -------------------------------------------------
   * @desc Tests the aIV.utils.getElemsByTag method.
   * @type {function}
   */
  Tests.getElemsByTag = (function setupTests_getElemsByTag() {

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Private getElemsByTag Variables
    ////////////////////////////////////////////////////////////////////////////

    /** @type {!TestResults} */
    var results = new TestResults('getElemsByTag', 2);

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Public getElemsByTag Method
    ////////////////////////////////////////////////////////////////////////////

    /**
     * -------------------------------------------------
     * Public Method (getElemsByTag)
     * -------------------------------------------------
     * @desc Tests the aIV.utils.getElemsByTag method.
     * @type {function}
     */
    var getElemsByTag = function() {

      setupDOMForTests();

      testOnlyTagParam();
      testRootParam();

      tearDownDOMForTests();

      // Save the results
      app.results.push(results);
    };

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Private getElemsByTag Methods
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
      div.id = 'getElemsByTag';
      div.style.display = 'none';

      elem1 = document.createElement('getElemsByTag');
      elem1.id = 'getElemsByTagElem';
      elem1.innerHTML = 'Elem1';
      elem1.style.display = 'none';

      elem2 = document.createElement('getElemsByTag');
      elem2.innerHTML = 'Elem2';

      elem3 = document.createElement('getElemsByTag');
      elem3.innerHTML = 'Elem3';

      document.body.appendChild(elem1);
      div.appendChild(elem2);
      div.appendChild(elem3);
      document.body.appendChild(div);
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

      div = document.getElementById('getElemsByTag');
      elem = document.getElementById('getElemsByTagElem');

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

      /** @type {boolean} */
      var pass;
      /** @type {!Array<HTMLElement>} */
      var elems;
      /** @type {string} */
      var errorMsg;

      pass = true;

      try {
        elems = aIV.utils.getElemsByTag('getElemsByTag');
      }
      catch (e) {
        pass = false;
      }

      pass = pass && (elems[0].innerHTML === 'Elem1');

      if (!pass) {
        errorMsg = 'getElemsByTag failed to get the correct element with ';
        errorMsg += 'only the tag name parameter';
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
      /** @type {boolean} */
      var pass;
      /** @type {!Array<HTMLElement>} */
      var elems;
      /** @type {string} */
      var errorMsg;

      pass = true;

      try {
        root = document.getElementById('getElemsByTag');
        elems = aIV.utils.getElemsByTag('getElemsByTag', root);
      }
      catch (e) {
        pass = false;
      }

      pass = pass && (elems[0].innerHTML === 'Elem2');

      if (!pass) {
        errorMsg = 'getElemsByTag failed to get the correct element with ';
        errorMsg += 'the root parameter applied';
        results.addError(errorMsg);
      }
    };

    ////////////////////////////////////////////////////////////////////////////
    // The End Of The getElemsByTag Module
    ////////////////////////////////////////////////////////////////////////////

    return getElemsByTag;

  })();
  /**
   * -------------------------------------------------
   * Public Method (Tests.getTypeOf)
   * -------------------------------------------------
   * @desc Tests the aIV.utils.getTypeOf method.
   * @type {function}
   */
  Tests.getTypeOf = (function setupTests_getTypeOf() {

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Private getTypeOf Variables
    ////////////////////////////////////////////////////////////////////////////

    /** @type {!TestResults} */
    var results = new TestResults('getTypeOf', 10);

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Public getTypeOf Method
    ////////////////////////////////////////////////////////////////////////////

    /**
     * -------------------------------------------------
     * Public Method (getTypeOf)
     * -------------------------------------------------
     * @desc Tests the aIV.utils.getTypeOf method.
     * @type {function}
     */
    var getTypeOf = function() {

      testUndefined();
      testNull();

      testBoolean();
      testNumber();
      testString();
      testFunction();

      testObject();
      testArray();
      testDocument();
      testElement();

      // Save the results
      app.results.push(results);
    };

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Private getTypeOf Methods
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ---------------------------------------------------
     * Private Method (testUndefined)
     * ---------------------------------------------------
     * @type {function}
     */
    var testUndefined = function() {

      /** @type {boolean} */
      var pass;
      /** @type {string} */
      var type;
      /** @type {string} */
      var errorMsg;

      type = aIV.utils.getTypeOf(undefined);
      pass = (type === 'undefined');

      if (!pass) {
        errorMsg = 'aIV.utils.getTypeOf failed: undefined check failed';
        results.addError(errorMsg);
      }
    };

    /**
     * ---------------------------------------------------
     * Private Method (testNull)
     * ---------------------------------------------------
     * @type {function}
     */
    var testNull = function() {

      /** @type {boolean} */
      var pass;
      /** @type {string} */
      var type;
      /** @type {string} */
      var errorMsg;

      type = aIV.utils.getTypeOf(null);
      pass = (type === 'null');

      if (!pass) {
        errorMsg = 'aIV.utils.getTypeOf failed: null check failed';
        results.addError(errorMsg);
      }
    };

    /**
     * ---------------------------------------------------
     * Private Method (testBoolean)
     * ---------------------------------------------------
     * @type {function}
     */
    var testBoolean = function() {

      /** @type {boolean} */
      var pass;
      /** @type {string} */
      var type;
      /** @type {string} */
      var errorMsg;

      type = aIV.utils.getTypeOf(true);
      pass = (type === 'boolean');

      if (!pass) {
        errorMsg = 'aIV.utils.getTypeOf failed: boolean check failed';
        results.addError(errorMsg);
      }
    };

    /**
     * ---------------------------------------------------
     * Private Method (testNumber)
     * ---------------------------------------------------
     * @type {function}
     */
    var testNumber = function() {

      /** @type {boolean} */
      var pass;
      /** @type {string} */
      var type;
      /** @type {string} */
      var errorMsg;

      type = aIV.utils.getTypeOf(5);
      pass = (type === 'number');

      if (!pass) {
        errorMsg = 'aIV.utils.getTypeOf failed: number check failed';
        results.addError(errorMsg);
      }
    };

    /**
     * ---------------------------------------------------
     * Private Method (testString)
     * ---------------------------------------------------
     * @type {function}
     */
    var testString = function() {

      /** @type {boolean} */
      var pass;
      /** @type {string} */
      var type;
      /** @type {string} */
      var errorMsg;

      type = aIV.utils.getTypeOf('str');
      pass = (type === 'string');

      if (!pass) {
        errorMsg = 'aIV.utils.getTypeOf failed: string check failed';
        results.addError(errorMsg);
      }
    };

    /**
     * ---------------------------------------------------
     * Private Method (testFunction)
     * ---------------------------------------------------
     * @type {function}
     */
    var testFunction = function() {

      /** @type {boolean} */
      var pass;
      /** @type {string} */
      var type;
      /** @type {string} */
      var errorMsg;

      type = aIV.utils.getTypeOf(function() {});
      pass = (type === 'function');

      if (!pass) {
        errorMsg = 'aIV.utils.getTypeOf failed: function check failed';
        results.addError(errorMsg);
      }
    };

    /**
     * ---------------------------------------------------
     * Private Method (testObject)
     * ---------------------------------------------------
     * @type {function}
     */
    var testObject = function() {

      /** @type {boolean} */
      var pass;
      /** @type {string} */
      var type;
      /** @type {string} */
      var errorMsg;

      type = aIV.utils.getTypeOf({});
      pass = (type === 'object');

      if (!pass) {
        errorMsg = 'aIV.utils.getTypeOf failed: object check failed';
        results.addError(errorMsg);
      }
    };

    /**
     * ---------------------------------------------------
     * Private Method (testArray)
     * ---------------------------------------------------
     * @type {function}
     */
    var testArray = function() {

      /** @type {boolean} */
      var pass;
      /** @type {string} */
      var type;
      /** @type {string} */
      var errorMsg;

      type = aIV.utils.getTypeOf([]);
      pass = (type === 'array');

      if (!pass) {
        errorMsg = 'aIV.utils.getTypeOf failed: array check failed';
        results.addError(errorMsg);
      }
    };

    /**
     * ---------------------------------------------------
     * Private Method (testDocument)
     * ---------------------------------------------------
     * @type {function}
     */
    var testDocument = function() {

      /** @type {boolean} */
      var pass;
      /** @type {string} */
      var type;
      /** @type {string} */
      var errorMsg;

      type = aIV.utils.getTypeOf(document);
      pass = (type === 'document');

      if (!pass) {
        errorMsg = 'aIV.utils.getTypeOf failed: document check failed';
        results.addError(errorMsg);
      }
    };

    /**
     * ---------------------------------------------------
     * Private Method (testElement)
     * ---------------------------------------------------
     * @type {function}
     */
    var testElement = function() {

      /** @type {boolean} */
      var pass;
      /** @type {string} */
      var type;
      /** @type {string} */
      var errorMsg;

      type = aIV.utils.getTypeOf( document.createElement('div') );
      pass = (type === 'element');

      if (!pass) {
        errorMsg = 'aIV.utils.getTypeOf failed: element check failed';
        results.addError(errorMsg);
      }
    };

    ////////////////////////////////////////////////////////////////////////////
    // The End Of The getTypeOf Module
    ////////////////////////////////////////////////////////////////////////////

    return getTypeOf;

  })();
  /**
   * -------------------------------------------------
   * Public Method (Tests.hasOwnProp)
   * -------------------------------------------------
   * @desc Tests the aIV.utils.hasOwnProp method.
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
     * @desc Tests the aIV.utils.hasOwnProp method.
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

      fail = aIV.utils.hasOwnProp(testObj, 'testProp2');
      fail = fail || aIV.utils.hasOwnProp(testObj, 'prototype');

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

      pass = aIV.utils.hasOwnProp(testObj, 'testProp1');

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
  /**
   * -------------------------------------------------
   * Public Method (Tests.isValidTypeString)
   * -------------------------------------------------
   * @desc Tests the aIV.utils.isValidTypeString method.
   * @type {function}
   */
  Tests.isValidTypeString = (function setupTests_isValidTypeString() {

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Private isValidTypeString Variables
    ////////////////////////////////////////////////////////////////////////////

    /** @type {!TestResults} */
    var results = new TestResults('isValidTypeString', 5);

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Public isValidTypeString Method
    ////////////////////////////////////////////////////////////////////////////

    /**
     * -------------------------------------------------
     * Public Method (isValidTypeString)
     * -------------------------------------------------
     * @desc Tests the aIV.utils.isValidTypeString method.
     * @type {function}
     */
    var isValidTypeString = function() {

      testPrimitives();
      testArrays();
      testHashMaps();
      testSpecialCharacters();
      testInvalids();

      // Save the results
      app.results.push(results);
    };

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Private isValidTypeString Methods
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ---------------------------------------------------
     * Private Method (testPrimitives)
     * ---------------------------------------------------
     * @type {function}
     */
    var testPrimitives = function() {

      /** @type {boolean} */
      var pass;
      /** @type {string} */
      var errorMsg;

      pass = aIV.utils.isValidTypeString('string');
      pass = pass && aIV.utils.isValidTypeString('number');

      if (!pass) {
        errorMsg = 'isValidTypeString failed to pass valid primitive strings';
        results.addError(errorMsg);
      }
    };

    /**
     * ---------------------------------------------------
     * Private Method (testArrays)
     * ---------------------------------------------------
     * @type {function}
     */
    var testArrays = function() {

      /** @type {boolean} */
      var pass;
      /** @type {string} */
      var errorMsg;

      pass = aIV.utils.isValidTypeString('array');
      pass = pass && aIV.utils.isValidTypeString('objects');
      pass = pass && aIV.utils.isValidTypeString('elements');

      if (!pass) {
        errorMsg = 'isValidTypeString failed to pass valid array strings';
        results.addError(errorMsg);
      }
    };

    /**
     * ---------------------------------------------------
     * Private Method (testHashMaps)
     * ---------------------------------------------------
     * @type {function}
     */
    var testHashMaps = function() {

      /** @type {boolean} */
      var pass;
      /** @type {string} */
      var errorMsg;

      pass = aIV.utils.isValidTypeString('stringMap');
      pass = pass && aIV.utils.isValidTypeString('objectMap');

      if (!pass) {
        errorMsg = 'isValidTypeString failed to pass valid hash map strings';
        results.addError(errorMsg);
      }
    };

    /**
     * ---------------------------------------------------
     * Private Method (testSpecialCharacters)
     * ---------------------------------------------------
     * @type {function}
     */
    var testSpecialCharacters = function() {

      /** @type {boolean} */
      var pass;
      /** @type {string} */
      var errorMsg;

      pass = aIV.utils.isValidTypeString('array|string');
      pass = pass && aIV.utils.isValidTypeString('!objectMap');
      pass = pass && aIV.utils.isValidTypeString('?objects');
      pass = pass && aIV.utils.isValidTypeString('string=');

      if (!pass) {
        errorMsg = 'isValidTypeString failed to pass valid strings with ';
        errorMsg += 'special characters';
        results.addError(errorMsg);
      }
    };

    /**
     * ---------------------------------------------------
     * Private Method (testInvalids)
     * ---------------------------------------------------
     * @type {function}
     */
    var testInvalids = function() {

      /** @type {boolean} */
      var fail;
      /** @type {string} */
      var errorMsg;

      fail = aIV.utils.isValidTypeString('string array');
      fail = fail || aIV.utils.isValidTypeString('num');
      fail = fail || aIV.utils.isValidTypeString('string|object|num');

      if (fail) {
        errorMsg = 'isValidTypeString failed to catch invalid strings';
        results.addError(errorMsg);
      }
    };

    ////////////////////////////////////////////////////////////////////////////
    // The End Of The isValidTypeString Module
    ////////////////////////////////////////////////////////////////////////////

    return isValidTypeString;

  })();
  /**
   * -------------------------------------------------
   * Public Method (Tests.makeElem)
   * -------------------------------------------------
   * @desc Tests the aIV.utils.makeElem method.
   * @type {function}
   */
  Tests.makeElem = (function setupTests_makeElem() {

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Private makeElem Variables
    ////////////////////////////////////////////////////////////////////////////

    /** @type {!TestResults} */
    var results = new TestResults('makeElem', 3);

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Public makeElem Method
    ////////////////////////////////////////////////////////////////////////////

    /**
     * -------------------------------------------------
     * Public Method (makeElem)
     * -------------------------------------------------
     * @desc Tests the aIV.utils.makeElem method.
     * @type {function}
     */
    var makeElem = function() {

      testNoTag();
      testOnlyTag();
      testSettings();

      // Save the results
      app.results.push(results);
    };

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Private makeElem Methods
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ---------------------------------------------------
     * Private Method (testNoTag)
     * ---------------------------------------------------
     * @type {function}
     */
    var testNoTag = function() {

      /** @type {!HTMLElement} */
      var elem;
      /** @type {boolean} */
      var pass;
      /** @type {string} */
      var errorMsg;

      elem = aIV.utils.makeElem();

      pass = (elem instanceof HTMLDivElement);

      if (!pass) {
        errorMsg = 'makeElem failed to create an element without a tag name';
        results.addError(errorMsg);
      }
    };

    /**
     * ---------------------------------------------------
     * Private Method (testOnlyTag)
     * ---------------------------------------------------
     * @type {function}
     */
    var testOnlyTag = function() {

      /** @type {!HTMLElement} */
      var elem;
      /** @type {boolean} */
      var pass;
      /** @type {string} */
      var errorMsg;

      elem = aIV.utils.makeElem('span');

      pass = (elem instanceof HTMLSpanElement);

      if (!pass) {
        errorMsg = 'makeElem failed to create an element with only a tag name';
        results.addError(errorMsg);
      }
    };

    /**
     * ---------------------------------------------------
     * Private Method (testSettings)
     * ---------------------------------------------------
     * @type {function}
     */
    var testSettings = function() {

      /** @type {!HTMLElement} */
      var elem;
      /** @type {boolean} */
      var pass;
      /** @type {string} */
      var text;
      /** @type {string} */
      var errorMsg;

      elem = aIV.utils.makeElem({
        tag : 'span',
        text: 'makeElemTests',
        id  : 'makeElemTests'
      });
      text = (!!elem.textContent) ? elem.textContent : elem.innerText;

      pass = (elem instanceof HTMLSpanElement);
      pass = pass && (text === 'makeElemTests');
      pass = pass && (elem.id === 'makeElemTests');

      elem = aIV.utils.makeElem({
        tagName: 'p',
        html   : 'makeElemTests'
      });

      pass = (elem instanceof HTMLParagraphElement);
      pass = pass && (elem.innerHTML === 'makeElemTests');

      elem = aIV.utils.makeElem({
        className: 'makeElemTests'
      });

      pass = (elem instanceof HTMLDivElement);
      pass = pass && (elem.className === 'makeElemTests');

      if (!pass) {
        errorMsg = 'makeElem failed to create an element with full settings';
        results.addError(errorMsg);
      }
    };

    ////////////////////////////////////////////////////////////////////////////
    // The End Of The makeElem Module
    ////////////////////////////////////////////////////////////////////////////

    return makeElem;

  })();
  /**
   * -------------------------------------------------
   * Public Method (Tests.reset)
   * -------------------------------------------------
   * @desc Tests the aIV.utils.reset method.
   * @type {function}
   */
  Tests.reset = (function setupTests_reset() {

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Private reset Variables
    ////////////////////////////////////////////////////////////////////////////

    /** @type {!TestResults} */
    var results = new TestResults('aIV.utils.reset', 4);

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Public reset Method
    ////////////////////////////////////////////////////////////////////////////

    /**
     * -------------------------------------------------
     * Public Method (reset)
     * -------------------------------------------------
     * @desc Tests the aIV.utils.reset method.
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
        aIV.utils.reset();
      }
      catch (error) {
        errorMsg = 'aIV.utils.reset() ';
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
        aIV.utils.reset('checkArgsErrorMsg');
      }
      catch (error) {
        errorMsg = 'aIV.utils.reset(\'checkArgsErrorMsg\') ';
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
        aIV.utils.reset([ 'checkArgsErrorMsg', 'getElemByTagRoot' ]);
      }
      catch (error) {
        errorMsg = 'aIV.utils.reset([ \'checkArgsErrorMsg\', ';
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
        aIV.utils.reset('checkArgsErrorMsg', 'getElemByTagRoot');
      }
      catch (error) {
        errorMsg = 'aIV.utils.reset(\'checkArgsErrorMsg\', ';
        errorMsg += '\'getElemByTagRoot\') failed. ' + error.toString();
        results.addError(errorMsg);
      }
    };

    ////////////////////////////////////////////////////////////////////////////
    // The End Of The reset Module
    ////////////////////////////////////////////////////////////////////////////

    return reset;

  })();
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
    var results = new TestResults('aIV.utils.set', 5);

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
        aIV.utils.set({
          checkArgsErrorMsg: 'Errors oi'
        });
      }
      catch (error) {
        errorMsg = 'aIV.utils.set({ checkArgsErrorMsg: \'Errors oi\' }) ';
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
        aIV.utils.set({
          getElemByClassRoot: document
        });
      }
      catch (error) {
        errorMsg = 'aIV.utils.set({ getElemByClassRoot: document }) failed. ';
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
        aIV.utils.set({
          getElemsByClassRoot: document
        });
      }
      catch (error) {
        errorMsg = 'aIV.utils.set({ getElemsByClassRoot: document }) failed. ';
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
        aIV.utils.set({
          getElemByTagRoot: document
        });
      }
      catch (error) {
        errorMsg = 'aIV.utils.set({ getElemByTagRoot: document }) failed. ';
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
        aIV.utils.set({
          getElemsByTagRoot: document
        });
      }
      catch (error) {
        errorMsg = 'aIV.utils.set({ getElemsByTagRoot: document }) failed. ';
        errorMsg += error.toString();
        results.addError(errorMsg);
      }
    };

    ////////////////////////////////////////////////////////////////////////////
    // The End Of The set Module
    ////////////////////////////////////////////////////////////////////////////

    return set;

  })();
  /**
   * -------------------------------------------------
   * Public Method (Tests.setElemText)
   * -------------------------------------------------
   * @desc Tests the aIV.utils.setElemText method.
   * @type {function}
   */
  Tests.setElemText = (function setupTests_setElemText() {

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Private setElemText Variables
    ////////////////////////////////////////////////////////////////////////////

    /** @type {!TestResults} */
    var results = new TestResults('setElemText', 1);

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Public setElemText Method
    ////////////////////////////////////////////////////////////////////////////

    /**
     * -------------------------------------------------
     * Public Method (setElemText)
     * -------------------------------------------------
     * @desc Tests the aIV.utils.setElemText method.
     * @type {function}
     */
    var setElemText = function() {

      testBasicUse();

      // Save the results
      app.results.push(results);
    };

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Private setElemText Methods
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ---------------------------------------------------
     * Private Method (testBasicUse)
     * ---------------------------------------------------
     * @type {function}
     */
    var testBasicUse = function() {

      /** @type {!HTMLElement} */
      var elem;
      /** @type {boolean} */
      var pass;
      /** @type {string} */
      var text;
      /** @type {string} */
      var errorMsg;

      elem = document.createElement('test');
      if (!!elem.textContent) {
        elem.textContent = 'Fail';
      }
      else {
        elem.innerText = 'Fail';
      }

      aIV.utils.setElemText(elem, 'Pass');

      text = elem.textContent || elem.innerText;

      pass = (text === 'Pass');

      if (!pass) {
        errorMsg = 'setElemText failed to update an element\'s innerText';
        results.addError(errorMsg);
      }
    };

    ////////////////////////////////////////////////////////////////////////////
    // The End Of The setElemText Module
    ////////////////////////////////////////////////////////////////////////////

    return setElemText;

  })();

/* -----------------------------------------------------------------------------
 * Deep Freeze The Tests Class
 * -------------------------------------------------------------------------- */

  (function(Tests) {

    /** @type {string} */
    var prop;

    Object.freeze(Tests);

    for (prop in Tests) {
      if (Tests.hasOwnProperty(prop) && Tests[ prop ] &&
          (typeof Tests[ prop ] === 'object' ||
           typeof Tests[ prop ] === 'function')) {
        Object.freeze(Tests[ prop ]);
      }
    }
  })(Tests);

////////////////////////////////////////////////////////////////////////////////
// The Tests Module End
////////////////////////////////////////////////////////////////////////////////

  return testsModuleAPI;

})());