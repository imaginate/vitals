/**
 * -----------------------------------------------------------------------------
 * VITALS UNIT TESTS: VITALS.IS.EVEN
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
 * @see [JSDoc3](http://usejsdoc.org)
 * @see [Closure Compiler JSDoc Syntax](https://developers.google.com/closure/compiler/docs/js-for-compiler)
 */

describe('vitals.is.even (section:base)', function() {
  var title;

  title = titleStr('should return true');
  describe(title, function() {

    title = callStr(4);
    it(title, function() {
      var result = vitals.is.even(4);
      assert( result === true );
    });

    title = callStr(-4, 0, 4);
    it(title, function() {
      var result = vitals.is.even(-4, 0, 4);
      assert( result === true );
    });

  });

  title = titleStr('should return false');
  describe(title, function() {

    title = callStr(1);
    it(title, function() {
      var result = vitals.is.even(1);
      assert( result === false );
    });

    title = callStr(-4, 1, 4);
    it(title, function() {
      var result = vitals.is.even(-4, 1, 4);
      assert( result === false );
    });

  });

  title = titleStr('should throw an error');
  describe(title, function() {

    title = callStr();
    it(title, function() {
      assert.throws(function() {
        vitals.is.even();
      });
    });

    title = callStr(NaN);
    it(title, function() {
      assert.throws(function() {
        vitals.is.even(NaN);
      });
    });

    title = callStr('fail');
    it(title, function() {
      assert.throws(function() {
        vitals.is.even('fail');
      });
    });

    title = callStr(1.5);
    it(title, function() {
      assert.throws(function() {
        vitals.is.even(1.5);
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
  return testCall('is.even', arguments, 3);
}
