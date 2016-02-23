/**
 * -----------------------------------------------------------------------------
 * VITALS UNIT TESTS: vitals.copy.regexp
 * -----------------------------------------------------------------------------
 * @see [vitals.copy docs](https://github.com/imaginate/vitals/wiki/vitals.copy)
 * @see [global test helpers](https://github.com/imaginate/vitals/blob/master/test/setup/helpers.js)
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2016 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Annotations:
 * @see [JSDoc3]{@link http://usejsdoc.org/}
 * @see [Closure Compiler specific JSDoc]{@link https://developers.google.com/closure/compiler/docs/js-for-compiler}
 */

describe('vitals.copy.regexp (section:base)', function() {
  var title;

  title = titleStr('should return a clone of the regex');
  describe(title, function() {

    title = callStr(/re/);
    it(title, function() {
      var re = freeze(/re/);
      var cp = vitals.copy.regex(re);
      assert( cp !== re );
      assert( cp.source === 're' );
      assert( cp.global === false );
      assert( cp.source === re.source );
      assert( cp.global === re.global );
      assert( cp.ignoreCase === re.ignoreCase );
    });

    title = callStr(/re/ig);
    it(title, function() {
      var re = freeze(/re/ig);
      var cp = vitals.copy.regex(re);
      assert( cp !== re );
      assert( cp.source === 're' );
      assert( cp.global === true );
      assert( cp.source === re.source );
      assert( cp.global === re.global );
      assert( cp.ignoreCase === re.ignoreCase );
    });
  });

  title = titleStr('should override the global regex flag');
  describe(title, function() {

    title = callStr(/re/, true);
    it(title, function() {
      var re = freeze(/re/);
      var cp = vitals.copy.regex(re, true);
      assert( cp !== re );
      assert( cp.source === 're' );
      assert( cp.global === true );
      assert( cp.source === re.source );
      assert( cp.global !== re.global );
      assert( cp.ignoreCase === re.ignoreCase );
    });

    title = callStr(/re/ig, false);
    it(title, function() {
      var re = freeze(/re/ig);
      var cp = vitals.copy.regex(re, false);
      assert( cp !== re );
      assert( cp.source === 're' );
      assert( cp.global === false );
      assert( cp.source === re.source );
      assert( cp.global !== re.global );
      assert( cp.ignoreCase === re.ignoreCase );
    });
  });

  title = titleStr('should throw an error');
  describe(title, function() {

    title = callStr();
    it(title, function() {
      assert.throws(function() {
        vitals.copy.regex();
      }, validTypeErr);
    });

    title = callStr(null);
    it(title, function() {
      assert.throws(function() {
        vitals.copy.regex(null);
      }, validTypeErr);
    });

    title = callStr({});
    it(title, function() {
      assert.throws(function() {
        vitals.copy.regex({});
      }, validTypeErr);
    });

    title = callStr(/re/, 'fail');
    it(title, function() {
      assert.throws(function() {
        vitals.copy.regex(/re/, 'fail');
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
  return testCall('copy.regex', arguments, 3);
}
