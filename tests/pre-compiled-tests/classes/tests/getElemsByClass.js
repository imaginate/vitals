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
