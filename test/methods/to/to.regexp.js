/**
 * -----------------------------------------------------------------------------
 * TEST - VITALS - JS METHOD - TO.REGEXP
 * -----------------------------------------------------------------------------
 * @see [vitals.to]{@link https://github.com/imaginate/vitals/wiki/vitals.to}
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

describe('vitals.to.regexp (section:base)', function() {
  var title;

  title = titleStr('should convert string to regex');
  describe(title, function() {

    title = callStr('src');
    it(title, function() {
      var result = vitals.to.regex('src');
      assert( is.regex(result) );
      assert( result.source === 'src' );
      assert( result.global === false );
    });

    title = callStr('src', 'g');
    it(title, function() {
      var result = vitals.to.regex('src', 'g');
      assert( is.regex(result) );
      assert( result.source === 'src' );
      assert( result.global === true  );
    });

  });

  describe('should throw an error', function() {

    title = callStr();
    it(title, function() {
      assert.throws(function() {
        vitals.to.regex();
      });
    });

    title = callStr(null);
    it(title, function() {
      assert.throws(function() {
        vitals.to.regex(null);
      });
    });

    title = callStr('src', null);
    it(title, function() {
      assert.throws(function() {
        vitals.to.regex('src', null);
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
  return testCall('to.regex', arguments, 3);
}
