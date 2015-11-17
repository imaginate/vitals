/**
 * -----------------------------------------------------------------------------
 * TEST - VITALS - JS METHOD - CUT
 * -----------------------------------------------------------------------------
 * @see [vitals.cut]{@link https://github.com/imaginate/vitals/blob/master/src/methods/cut.js}
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2015 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Supporting Libraries:
 * @see [are]{@link https://github.com/imaginate/are}
 *
 * Annotations:
 * @see [JSDoc3]{@link http://usejsdoc.org/}
 * @see [Closure Compiler specific JSDoc]{@link https://developers.google.com/closure/compiler/docs/js-for-compiler}
 */

describe('cut (sections:js,base)', function() {
  var title;

  //////////////////////////////////////////////
  // BASIC TESTS

  title = callStr();
  it(title, function() {
  });

  //////////////////////////////////////////////
  // ERROR TESTS

  title = callStr();
  it(title, function() {
    assert.throws(function() {
      vitals.cut();
    });
  });

});

////////////////////////////////////////////////////////////////////////////////
// PRIVATE HELPERS
////////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @param {...*} args
 * @return {string}
 */
function callStr() {
  return testCall('cut', arguments, 3, true);
}
