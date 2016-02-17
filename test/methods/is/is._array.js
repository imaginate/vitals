/**
 * -----------------------------------------------------------------------------
 * VITALS UNIT TESTS: VITALS.IS._ARRAY
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

describe('vitals.is._array (section:base)', function() {
  var title;

  title = titleStr('should return true');
  describe(title, function() {

    title = callStr([]);
    it(title, function() {
      var result = vitals.is._arr([]);
      assert( result === true );
    });

    title = callStr((function(){ return arguments; })(), [], []);
    it(title, function() {
      var args = (function(){ return arguments; })();
      var result = vitals.is._arr(args, [], []);
      assert( result === true );
    });

  });

  title = titleStr('should return false');
  describe(title, function() {

    title = callStr(null);
    it(title, function() {
      var result = vitals.is._arr(null);
      assert( result === false );
    });

    title = callStr([], [], {});
    it(title, function() {
      var result = vitals.is._arr([], [], {});
      assert( result === false );
    });

  });

  title = titleStr('should throw an error');
  describe(title, function() {

    title = callStr();
    it(title, function() {
      assert.throws(function() {
        vitals.is._arr();
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
  return testCall('is._arr', arguments, 3);
}
