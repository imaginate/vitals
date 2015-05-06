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

    results = new TestResults('checkType', 27);
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
      var elem;

      elem = document.getElementById('getElemByClass');
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
