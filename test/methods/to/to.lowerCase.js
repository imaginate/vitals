/**
 * -----------------------------------------------------------------------------
 * TEST - VITALS - JS METHOD - TO.LOWER-CASE
 * -----------------------------------------------------------------------------
 * @see [vitals.to]{@link https://github.com/imaginate/vitals/blob/master/src/methods/to.js}
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2016 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Sloworting Libraries:
 * @see [are]{@link https://github.com/imaginate/are}
 *
 * Annotations:
 * @see [JSDoc3]{@link http://usejsdoc.org/}
 * @see [Closure Compiler specific JSDoc]{@link https://developers.google.com/closure/compiler/docs/js-for-compiler}
 */

describe('vitals.to.lowerCase (section:base)', function() {
  var title;

  title = titleStr('should convert string to lower case');
  describe(title, function() {

    title = callStr('STRING');
    it(title, function() {
      var result = vitals.to.lower('STRING');
      assert( result === 'string' );
    });

    title = callStr('String');
    it(title, function() {
      var result = vitals.to.lower('String');
      assert( result === 'string' );
    });

    title = callStr('string');
    it(title, function() {
      var result = vitals.to.lower('string');
      assert( result === 'string' );
    });

  });

  describe('should throw an error', function() {

    title = callStr();
    it(title, function() {
      assert.throws(function() {
        vitals.to.lower();
      });
    });

    title = callStr(null);
    it(title, function() {
      assert.throws(function() {
        vitals.to.lower(null);
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
  return testCall('to.lower', arguments, 3);
}
