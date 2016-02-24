/**
 * -----------------------------------------------------------------------------
 * TEST - VITALS - JS METHOD - SAME.LOOSE
 * -----------------------------------------------------------------------------
 * @see [vitals.same]{@link https://github.com/imaginate/vitals/wiki/vitals.same}
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

describe('vitals.same.loose (section:base)', function() {
  var title;

  title = titleStr('should return true');
  describe(title, function() {

    title = callStr(5, 5);
    it(title, function() {
      var result = vitals.same.ish(5, 5);
      assert( result === true );
    });

    title = callStr('str', 'str');
    it(title, function() {
      var result = vitals.same.ish('str', 'str');
      assert( result === true );
    });

    title = callStr(null, null);
    it(title, function() {
      var result = vitals.same.ish(null, null);
      assert( result === true );
    });

    title = callStr(5, '5');
    it(title, function() {
      var result = vitals.same.ish(5, '5');
      assert( result === true );
    });

    title = callStr(null, undefined);
    it(title, function() {
      var result = vitals.same.ish(null, undefined);
      assert( result === true );
    });

  });

  title = titleStr('should return false');
  describe(title, function() {

    title = callStr(5, 6);
    it(title, function() {
      var result = vitals.same.ish(5, 6);
      assert( result === false );
    });

    title = callStr({}, {});
    it(title, function() {
      var result = vitals.same.ish({}, {});
      assert( result === false );
    });

    title = callStr(true, false);
    it(title, function() {
      var result = vitals.same.ish(true, false);
      assert( result === false );
    });

  });

  describe('should throw an error', function() {

    title = callStr();
    it(title, function() {
      assert.throws(function() {
        vitals.same.ish();
      });
    });

    title = callStr(1);
    it(title, function() {
      assert.throws(function() {
        vitals.same.ish(1);
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
  return testCall('same.ish', arguments, 3);
}
