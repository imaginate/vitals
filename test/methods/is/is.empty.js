/**
 * -----------------------------------------------------------------------------
 * VITALS UNIT TESTS: VITALS.IS.EMPTY
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

describe('vitals.is.empty (section:base)', function() {
  var title;

  title = titleStr('should return true');
  describe(title, function() {

    title = callStr([]);
    it(title, function() {
      var result = vitals.is.empty([]);
      assert( result === true );
    });

    title = callStr(0, '', {}, null, undefined, false, NaN, function(){});
    it(title, function() {
      var func = function(){};
      var result = vitals.is.empty(0, '', {}, null, undefined, false, NaN, func);
      assert( result === true );
    });

  });

  title = titleStr('should return false');
  describe(title, function() {

    title = callStr([ 1 ]);
    it(title, function() {
      var result = vitals.is.empty([ 1 ]);
      assert( result === false );
    });

    title = callStr(1, null, undefined, false, NaN);
    it(title, function() {
      var result = vitals.is.empty(1, null, undefined, false, NaN);
      assert( result === false );
    });

  });

  title = titleStr('should throw an error');
  describe(title, function() {

    title = callStr();
    it(title, function() {
      assert.throws(function() {
        vitals.is.empty();
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
  return testCall('is.empty', arguments, 3);
}
