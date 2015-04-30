  /**
   * ---------------------------------------------------
   * Global Object (aIV)
   * ---------------------------------------------------
   * @desc Holds the public API for aIV's apps, tools, and libraries.
   * @struct
   * @global
   */
  window.aIV = window.aIV || {};

  /**
   * ---------------------------------------------------
   * Global Object (aIV.utils)
   * ---------------------------------------------------
   * @desc Holds the public API for aIV's JavaScript shortcuts. For more
   *   details on each of the methods see their complete [definitions in
   *   the src]{@link https://github.com/imaginate/algorithmIV-javascript-shortcuts/tree/master/src/pre-compiled-parts/methods}.
   * @type {!{
   *   checkType        : function(*, string, boolean=): boolean,
   *   isValidTypeString: function(string): boolean,
   *   freezeObj        : function((!Object|function), boolean=): (!Object|function),
   *   hasOwnProp       : function((!Object|function), string): boolean
   * }}
   * @struct
   * @global
   */
  aIV.utils = utilsModuleAPI;
