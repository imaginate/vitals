/**
 * -----------------------------------------------------------------------------
 * TEST - VITALS - JS METHOD - TO.UPPER-CASE
 * -----------------------------------------------------------------------------
 * @see [vitals.to]{@link https://github.com/imaginate/vitals/blob/master/src/methods/to.js}
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2016 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Supporting Libraries:
 * @see [are]{@link https://github.com/imaginate/are}
 *
 * Annotations:
 * @see [JSDoc3]{@link http://usejsdoc.org/}
 * @see [Closure Compiler specific JSDoc]{@link https://developers.google.com/closure/compiler/docs/js-for-compiler}
 */

describe('vitals.to.upperCase (section:base)', function() {
  var title;

  title = titleStr('should convert string to upper case');
  describe(title, function() {

    title = callStr('string');
    it(title, function() {
      var result = vitals.to.upper('string');
      assert( result === 'STRING' );
    });

    title = callStr('String');
    it(title, function() {
      var result = vitals.to.upper('String');
      assert( result === 'STRING' );
    });

    title = callStr('STRING');
    it(title, function() {
      var result = vitals.to.upper('STRING');
      assert( result === 'STRING' );
    });

  });

  describe('should throw an error', function() {

    title = callStr();
    it(title, function() {
      assert.throws(function() {
        vitals.to.upper();
      });
    });

    title = callStr(null);
    it(title, function() {
      assert.throws(function() {
        vitals.to.upper(null);
      });
    });

  });

});

////////////////////////////////////////////////////////////////////////////////
// PRIVATE HELPERS
////////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @param {string} shouldMsg
 * @return {string}
 */
function titleStr(shouldMsg) {
  return breakStr(shouldMsg, 2);
}

/**
 * @private
 * @param {...*} args
 * @return {string}
 */
function callStr() {
  return testCall('to.upper', arguments, 3);
}
