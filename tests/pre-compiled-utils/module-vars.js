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
   * Public Variable (DEFAULTS)
   * -----------------------------------------------------
   * @desc Holds each method's orginal defaults.
   * @type {!{
   *   checkArgsErrorMsg  : function,
   *   getElemByClassRoot : !Document,
   *   getElemsByClassRoot: !Document,
   *   getElemByTagRoot   : !Document,
   *   getElemsByTagRoot  : !Document
   * }}
   * @const
   */
  var DEFAULTS = {
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

  /**
   * -----------------------------------------------------
   * Public Variable (DEFAULTS.types)
   * -----------------------------------------------------
   * @desc Holds the data type options for each default.
   * @type {!Object<string, string>}
   * @const
   */
  DEFAULTS.types = {
    checkArgsErrorMsg  : 'string|function',
    getElemByClassRoot : '!(Document|Element)',
    getElemsByClassRoot: '!(Document|Element)',
    getElemByTagRoot   : '!(Document|Element)',
    getElemsByTagRoot  : '!(Document|Element)'
  };

  Object.freeze(DEFAULTS);
  Object.freeze(DEFAULTS.types);

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
   */
  var defaults = {
    checkArgsErrorMsg  : DEFAULTS.checkArgsErrorMsg,
    getElemByClassRoot : DEFAULTS.getElemByClassRoot,
    getElemsByClassRoot: DEFAULTS.getElemsByClassRoot,
    getElemByTagRoot   : DEFAULTS.getElemByTagRoot,
    getElemsByTagRoot  : DEFAULTS.getElemsByTagRoot
  };
