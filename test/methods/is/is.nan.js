/**
 * -----------------------------------------------------------------------------
 * VITALS UNIT TESTS: VITALS.IS.NAN
 * -----------------------------------------------------------------------------
 * @see [vitals.is]{@link https://github.com/imaginate/vitals/wiki/vitals.is}
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

describe('vitals.is.nan (section:base)', function() {
  var title;

  title = titleStr('should return true');
  describe(title, function() {

    title = callStr(NaN);
    it(title, function() {
      var result = vitals.is.nan(NaN);
      assert( result === true );
    });

    title = callStr(NaN, NaN, NaN);
    it(title, function() {
      var result = vitals.is.nan(NaN, NaN, NaN);
      assert( result === true );
    });

  });

  title = titleStr('should return false');
  describe(title, function() {

    title = callStr(0);
    it(title, function() {
      var result = vitals.is.nan(0);
      assert( result === false );
    });

    title = callStr(NaN, NaN, null);
    it(title, function() {
      var result = vitals.is.nan(NaN, NaN, null);
      assert( result === false );
    });

  });

  title = titleStr('should throw an error');
  describe(title, function() {

    title = callStr();
    it(title, function() {
      assert.throws(function() {
        vitals.is.nan();
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
  return testCall('is.nan', arguments, 3);
}
