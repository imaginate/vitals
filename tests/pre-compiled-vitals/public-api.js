  /**
   * ---------------------------------------------------
   * Global Object (Vitals)
   * ---------------------------------------------------
   * @desc Holds the public API for Vitals.js. For more details on each of the
   *   shortcuts see their complete definitions located in JSDoc before each
   *   method's declaration in the src folder.
   * @see [JavaScript Shortcuts]{@link https://github.com/imaginate/vitals/tree/master/src/pre-compiled-parts/js-methods}
   * @see [DOM Shortcuts]{@link https://github.com/imaginate/vitals/tree/master/src/pre-compiled-parts/dom-methods}
   * @see [Master Methods]{@link https://github.com/imaginate/vitals/tree/master/src/pre-compiled-parts/master-methods}
   * @type {!{
   *   checkType        : function(*, string, boolean=): boolean,
   *   isValidTypeString: function(string): boolean,
   *   checkArgs        : function(...*, ...string): boolean,
   *   getTypeOf        : function(*): string,
   *   freezeObj        : function((!Object|function), boolean=): (!Object|function),
   *   hasOwnProp       : function((!Object|function), string): boolean,
   *   getElemById      : function(string): ?Element,
   *   getElemByClass   : function(string): ?Element,
   *   getElemsByClass  : function(string): ?Array<!Element>,
   *   getElemByTag     : function(string): ?Element,
   *   getElemsByTag    : function(string): ?Array<!Element>,
   *   makeElem         : function((string|!Object<string, string>)=): !Element,
   *   setElemText      : function(!Element, string): !Element,
   *   addElemText      : function(!Element, string): !Element
   * }}
   * @struct
   * @global
   */
  window.Vitals = window.Vitals || vitalsModuleAPI;

  /**
   * ---------------------------------------------------
   * Global Object (Vx)
   * ---------------------------------------------------
   * @desc Also holds the public API for Vitals.js. This global object is the
   *   same as the Vitals object. It is simply a shorter reference name option
   *   for developers who like shorter names.
   * @struct
   * @global
   */
  window.Vx = Vitals;
