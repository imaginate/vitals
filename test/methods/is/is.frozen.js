/**
 * -----------------------------------------------------------------------------
 * VITALS UNIT TESTS: VITALS.IS.FROZEN
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

describe('vitals.is.frozen (section:base)', function() {
  var title;

  title = titleStr('should return true');
  describe(title, function() {

    title = callStr( freeze({}) );
    it(title, function() {
      var obj = freeze({});
      var result = vitals.is.frozen(obj);
      assert( result === true );
    });

    title = callStr(freeze({}), freeze({}), freeze({}));
    it(title, function() {
      var obj1 = freeze({});
      var obj2 = freeze({});
      var obj3 = freeze({});
      var result = vitals.is.frozen(obj1, obj2, obj3);
      assert( result === true );
    });

  });

  title = titleStr('should return false');
  describe(title, function() {

    title = callStr(null);
    it(title, function() {
      var result = vitals.is.frozen(null);
      assert( result === false );
    });

    title = callStr(freeze({}), freeze({}), {});
    it(title, function() {
      var obj1 = freeze({});
      var obj2 = freeze({});
      var result = vitals.is.frozen(obj1, obj2, {});
      assert( result === false );
    });

  });

  title = titleStr('should throw an error');
  describe(title, function() {

    title = callStr();
    it(title, function() {
      assert.throws(function() {
        vitals.is.frozen();
      });
    });

    title = callStr('fail');
    it(title, function() {
      assert.throws(function() {
        vitals.is.frozen('fail');
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
  return testCall('is.frozen', arguments, 3);
}
