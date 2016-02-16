/**
 * -----------------------------------------------------------------------------
 * TEST - VITALS - JS METHOD - SAME
 * -----------------------------------------------------------------------------
 * @see [vitals.same]{@link https://github.com/imaginate/vitals/blob/master/src/methods/same.js}
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

describe('vitals.same (section:base)', function() {
  var title;

  title = titleStr('should return true');
  describe(title, function() {

    title = callStr(5, 5);
    it(title, function() {
      var result = vitals.same(5, 5);
      assert( result === true );
    });

    title = callStr('str', 'str');
    it(title, function() {
      var result = vitals.same('str', 'str');
      assert( result === true );
    });

    title = callStr(null, null);
    it(title, function() {
      var result = vitals.same(null, null);
      assert( result === true );
    });

  });

  title = titleStr('should return false');
  describe(title, function() {

    title = callStr(5, '5');
    it(title, function() {
      var result = vitals.same(5, '5');
      assert( result === false );
    });

    title = callStr({}, {});
    it(title, function() {
      var result = vitals.same({}, {});
      assert( result === false );
    });

    title = callStr(null, undefined);
    it(title, function() {
      var result = vitals.same(null, undefined);
      assert( result === false );
    });

  });

  describe('should throw an error', function() {

    title = callStr();
    it(title, function() {
      assert.throws(function() {
        vitals.same();
      });
    });

    title = callStr(1);
    it(title, function() {
      assert.throws(function() {
        vitals.same(1);
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
  return testCall('same', arguments, 3);
}
