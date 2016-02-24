/**
 * -----------------------------------------------------------------------------
 * VITALS UNIT TESTS: VITALS.IS.WHOLE
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

describe('vitals.is.whole (section:base)', function() {
  var title;

  title = titleStr('should return true');
  describe(title, function() {

    title = callStr(5);
    it(title, function() {
      var result = vitals.is.whole(5);
      assert( result === true );
    });

    title = callStr(-1, 0, 5);
    it(title, function() {
      var result = vitals.is.whole(-1, 0, 5);
      assert( result === true );
    });

  });

  title = titleStr('should return false');
  describe(title, function() {

    title = callStr(1.5);
    it(title, function() {
      var result = vitals.is.whole(1.5);
      assert( result === false );
    });

    title = callStr(1, 5, 5.05);
    it(title, function() {
      var result = vitals.is.whole(1, 5, 5.05);
      assert( result === false );
    });

  });

  title = titleStr('should throw an error');
  describe(title, function() {

    title = callStr();
    it(title, function() {
      assert.throws(function() {
        vitals.is.whole();
      });
    });

    title = callStr(NaN);
    it(title, function() {
      assert.throws(function() {
        vitals.is.whole(NaN);
      });
    });

    title = callStr('fail');
    it(title, function() {
      assert.throws(function() {
        vitals.is.whole('fail');
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
  return testCall('is.whole', arguments, 3);
}
