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

      text = (!!elem.textContent) ? elem.textContent : elem.innerText;

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
