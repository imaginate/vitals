/**
 * -----------------------------------------------------------------------------
 * VITALS UNIT TESTS: vitals.cut.pattern
 * -----------------------------------------------------------------------------
 * @see [vitals.cut docs](https://github.com/imaginate/vitals/wiki/vitals.cut)
 * @see [global test helpers](https://github.com/imaginate/vitals/blob/master/test/setup/helpers.js)
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2016 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Annotations:
 * @see [JSDoc3](http://usejsdoc.org)
 * @see [Closure Compiler JSDoc Syntax](https://developers.google.com/closure/compiler/docs/js-for-compiler)
 */

describe('vitals.cut.pattern (section:base)', function() {
  var title;

  title = titleStr('should remove pattern from string');
  describe(title, function() {

    title = callStr('abcABCabc', 'a');
    it(title, function() {
      var str = vitals.cut.pattern('abcABCabc', 'a');
      assert( str === 'bcABCbc' );
    });

    title = callStr('abc123abc123', 1);
    it(title, function() {
      var str = vitals.cut.pattern('abc123abc123', 1);
      assert( str === 'abc23abc23' );
    });

    title = callStr('abc123', /[a-z]/);
    it(title, function() {
      var str = vitals.cut.pattern('abc123', /[a-z]/);
      assert( str === 'bc123' );
    });

    title = callStr('abc123', /[a-z]/g);
    it(title, function() {
      var str = vitals.cut.pattern('abc123', /[a-z]/g);
      assert( str === '123' );
    });

    title = callStr('ABC.a*b*c.123', '*');
    it(title, function() {
      var str = vitals.cut.pattern('ABC.a*b*c.123', '*');
      assert( str === 'ABC.abc.123' );
    });

    title = callStr('ABC.a*b*c.123', '.*');
    it(title, function() {
      var str = vitals.cut.pattern('ABC.a*b*c.123', '.*');
      assert( str === 'ABC.a*b*c.123' );
    });
  });

  title = titleStr('should throw an error');
  describe(title, function() {

    title = callStr();
    it(title, function() {
      assert.throws(function() {
        vitals.cut.pattern();
      }, validTypeErr);
    });

    title = callStr('str');
    it(title, function() {
      assert.throws(function() {
        vitals.cut.pattern('str');
      }, validErr);
    });

    title = callStr(1, 1);
    it(title, function() {
      assert.throws(function() {
        vitals.cut.pattern(1, 1);
      }, validTypeErr);
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
  return testCall('cut.pattern', arguments, 3);
}
