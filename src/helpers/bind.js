/**
 * ---------------------------------------------------------------------------
 * $BIND HELPER
 * ---------------------------------------------------------------------------
 * @version 5.0.0
 * @see [vitals](https://github.com/imaginate/vitals)
 *
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life>
 */

/// #{{{ @helper $bind
/**
 * @private
 * @param {!function} src
 * @param {?Object} thisArg
 * @return {!function}
 */
function $bind(src, thisArg) {

  /** @type {!function} */
  var binder;
  /** @type {number} */
  var len;

  len = src['length'];

  switch (len) {
    case 0:
      binder = function binder() {
        return src['call'](thisArg);
      };
      break;
    case 1:
      binder = function binder(arg1) {
        return src['call'](thisArg, arg1);
      };
      break;
    case 2:
      binder = function binder(arg1, arg2) {
        return src['call'](thisArg, arg1, arg2);
      };
      break;
    case 3:
      binder = function binder(arg1, arg2, arg3) {
        return src['call'](thisArg, arg1, arg2, arg3);
      };
      break;
    case 4:
      binder = function binder(arg1, arg2, arg3, arg4) {
        return src['call'](thisArg, arg1, arg2, arg3, arg4);
      };
      break;
    case 5:
      binder = function binder(arg1, arg2, arg3, arg4, arg5) {
        return src['call'](thisArg, arg1, arg2, arg3, arg4, arg5);
      };
      break;
    default:
      binder = function binder(arg1, arg2, arg3, arg4, arg5, arg6) {
        return src['apply'](thisArg, arguments);
      };
  }

  binder['__BOUND__'] = $YES;
  binder['BOUND'] = $YES;

  binder['__BOUND_TO__'] = thisArg;
  binder['BOUND_TO'] = thisArg;

  binder['__LENGTH__'] = len;
  binder['LENGTH'] = len;

  return binder;
}
/// #}}} @helper $bind

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
