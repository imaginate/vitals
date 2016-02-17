/**
 * -----------------------------------------------------------------------------
 * VITALS UNIT TESTS: VITALS.IS.ERROR
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

describe('vitals.is.error (section:base)', function() {
  var title;

  title = titleStr('should return true');
  describe(title, function() {

    title = callStr( new Error() );
    it(title, function() {
      var err = new Error();
      var result = vitals.is.err(err);
      assert( result === true );
    });

    title = callStr(new RangeError(), new TypeError(), new Error());
    it(title, function() {
      var err1 = new RangeError();
      var err2 = new TypeError();
      var err3 = new Error();
      var result = vitals.is.err(err1, err2, err3);
      assert( result === true );
    });

  });

  title = titleStr('should return false');
  describe(title, function() {

    title = callStr(null);
    it(title, function() {
      var result = vitals.is.err(null);
      assert( result === false );
    });

    title = callStr(new TypeError(), new Error(), {});
    it(title, function() {
      var err1 = new TypeError();
      var err2 = new Error();
      var result = vitals.is.err(err1, err2, {});
      assert( result === false );
    });

  });

  title = titleStr('should throw an error');
  describe(title, function() {

    title = callStr();
    it(title, function() {
      assert.throws(function() {
        vitals.is.err();
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
  return testCall('is.err', arguments, 3);
}
