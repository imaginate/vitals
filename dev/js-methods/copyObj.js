  /**
   * ---------------------------------------------------
   * Public Method (vitalsModuleAPI.copyObj)
   * ---------------------------------------------------
   * @desc Creates a new Object, Function, Array, or RegExp with the same
   *   properties and values as the provided object. Includes an optional deep
   *   copy (i.e. every property's value that is an object is also copied).
   * @param {(!Object|function|!Array|!RegExp)} oldObj - The object to copy.
   * @param {boolean=} deep - Deep copy the object. The default is false.
   * @return {(!Object|function|!Array|!RegExp)} The new object copy.
   */
  vitalsModuleAPI.copyObj = (function setup_copyObj(checkType) {

    ////////////////////////////////////////////////////////////////////////////
    // The Public copyObj Method
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ---------------------------------------------------
     * Public Method (copyObj)
     * ---------------------------------------------------
     * @desc See the description for vitalsModuleAPI.copyObj.
     * @param {(!Object|function)} oldObj
     * @param {boolean=} deep
     * @return {(!Object|function)}
     */
    var copyObj = function(oldObj, deep) {

      /** @type {(!Object|function|!Array|!RegExp)} */
      var newObj;
      /** @type {string} */
      var errorMsg;

      if ( !checkType(oldObj, '!object|function') ) {
        errorMsg = 'A Vitals.copyObj call received an invalid obj param.';
        throw new TypeError(errorMsg);
      }

      newObj = ( (Array.isArray(oldObj)) ?
        copyArr(oldObj) : ( checkType(oldObj, 'function') ) ?
          copyFunc(oldObj) : ( checkType(oldObj, 'regexp') ) ?
            copyRegex(oldObj) : copyProps(oldObj, {})
      );

      if (deep === true) {
        deepCopy(newObj);
      }

      return newObj;
    };

    ////////////////////////////////////////////////////////////////////////////
    // The Private copyObj Methods
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ---------------------------------------------------
     * Public Method (copyProps)
     * ---------------------------------------------------
     * @desc Handles copying one object's properties to another object.
     * @param {(!Object|function)} oldObj
     * @param {(!Object|function)} newObj
     * @return {(!Object|function)}
     */
    var copyProps = function(oldObj, newObj) {

      /** @type {string} */
      var prop;

      for (prop in oldObj) {
        if ( oldObj.hasOwnProperty(prop) ) {
          newObj[ prop ] = oldObj[ prop ];
        }
      }

      return newObj;
    };

    /**
     * ---------------------------------------------------
     * Private Method (copyFunc)
     * ---------------------------------------------------
     * @desc A helper method that copies a function.
     * @param {function} oldFunc - The function to copy.
     * @return {function} The new copied function.
     */
    var copyFunc = (function setup_copyFunc() {

      /** @type{!Object<string, !RegExp>} */
      var patterns;

      patterns = {
        comments: /\/\/.*?(?:[\r\n\u2028\u2029]|$)+|\/\*[\s\S]*?\*\//g,
        params  : /^function[\s\S]*?\(([\s\S]*?)\)[\s\S]*?$/,
        space   : /\s/g,
        start   : /^function[\s\S]*?\([\s\S]*?\)[\s\S]*?\{/,
        end     : /\}\;?\s*?$/
      };

      return function copyFunc(oldFunc) {

        /** @type {string} */
        var funcString;
        /** @type {string} */
        var funcParams;
        /** @type {string} */
        var funcBody;
        /** @type {function} */
        var newFunc;

        funcString = oldFunc.toString();
        funcString = funcString.replace(patterns.comments, '');

        funcParams = funcString.replace(patterns.params, '$1');
        funcParams = funcParams.replace(patterns.space, '');

        funcBody = funcString.replace(patterns.start, '');
        funcBody = funcBody.replace(patterns.end, '');

        newFunc = ( (funcParams) ?
          new Function(funcParams, funcBody) : new Function(funcBody)
        );

        copyProps(oldFunc, newFunc);

        return newFunc;
      };
    })();

    /**
     * ---------------------------------------------------
     * Private Method (copyArr)
     * ---------------------------------------------------
     * @desc A helper method that copies an Array.
     * @param {!Array} oldArr - The aray to copy.
     * @return {!Array} The new copied array.
     */
    var copyArr = function(oldArr) {
      return oldArr.slice(0);
    };

    /**
     * ---------------------------------------------------
     * Private Method (copyRegex)
     * ---------------------------------------------------
     * @desc A helper method that copies a RegExp.
     * @param {!RegExp} oldRegex - The RegExp to copy.
     * @return {!RegExp} The new copied RegExp.
     */
    var copyRegex = (function setup_copyRegex() {

      /** @type{!Object<string, string>} */
      var flagVals;

      flagVals = {
        global    : 'g',
        ignoreCase: 'i',
        multiline : 'm',
        sticky    : 'y'
      };

      return function copyRegex(oldRegex) {

        /** @type {string} */
        var source;
        /** @type {string} */
        var flags;
        /** @type {string} */
        var prop;

        source = oldRegex.source;
        flags = '';

        for (prop in flagVals) {
          if (flagVals.hasOwnProperty(prop) && oldRegex[ prop ]) {
            flags += flagVals[ prop ];
          }
        }

        return (flags) ? new RegExp(source, flags) : new RegExp(source);
      };
    })();

    /**
     * -------------------------------------------------
     * Private Method (deepFreeze)
     * -------------------------------------------------
     * @desc A helper to copyObj that recursively makes copies of its
     *   properties that are objects.
     * @param {(!Object|function|!Array|!RegExp)} obj
     */
    var deepCopy = function(obj) {

      /** @type {(!Object|function|!Array|!RegExp)} */
      var oldObj;
      /** @type {string} */
      var prop;
      /** @type {number} */
      var i;

      if ( checkType(oldObj, 'regexp') ) {
        return;
      }

      if ( Array.isArray(obj) ) {
        i = obj.length;
        while (i--) {
          oldObj = obj[i];
          if ( checkType(oldObj, '!object|function') ) {
            obj[i] = ( (Array.isArray(oldObj)) ?
              copyArr(oldObj) : ( checkType(oldObj, 'function') ) ?
                copyFunc(oldObj) : ( checkType(oldObj, 'regexp') ) ?
                  copyRegex(oldObj) : copyProps(oldObj, {})
            );
            deepCopy(obj[i]);
          }
        }
      }
      else {
        for (prop in obj) {
          if ( obj.hasOwnProperty(prop) ) {
            oldObj = obj[ prop ];
            if ( checkType(oldObj, '!object|function') ) {
              obj[ prop ] = ( (Array.isArray(oldObj)) ?
                copyArr(oldObj) : ( checkType(oldObj, 'function') ) ?
                  copyFunc(oldObj) : ( checkType(oldObj, 'regexp') ) ?
                    copyRegex(oldObj) : copyProps(oldObj, {})
              );
              deepCopy(obj[ prop ]);
            }
          }
        }
      }
    };

    ////////////////////////////////////////////////////////////////////////////
    // The End Of The copyObj Module
    ////////////////////////////////////////////////////////////////////////////

    return copyObj;

  })(vitalsModuleAPI.checkType);
