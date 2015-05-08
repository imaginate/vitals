  /**
   * -----------------------------------------------------
   * Public Variable (utilsModuleAPI)
   * -----------------------------------------------------
   * @desc Holds the module's public properties and methods.
   * @type {!Object<string, function>}
   * @struct
   */
  var utilsModuleAPI = {};

  /**
   * -----------------------------------------------------
   * Public Variable (defaults)
   * -----------------------------------------------------
   * @desc Holds each method's defaults.
   * @type {!{
   *   checkArgsErrorMsg  : (string|function),
   *   getElemByClassRoot : !(Document|Element),
   *   getElemsByClassRoot: !(Document|Element),
   *   getElemByTagRoot   : !(Document|Element),
   *   getElemsByTagRoot  : !(Document|Element)
   * }}
   * @struct
   */
  var defaults = {
    checkArgsErrorMsg  : function() {

      /** @type {string} */
      var msg;

      msg = 'A ';
      msg += utilsModuleAPI.checkArgs.caller || 'function';
      msg +=' was called with an invalid parameter data type.';

      return msg;
    },
    getElemByClassRoot : document,
    getElemsByClassRoot: document,
    getElemByTagRoot   : document,
    getElemsByTagRoot  : document
  };
