/**
 * -----------------------------------------------------------------------------
 * VITALS UNIT TESTS: VITALS.IS._STRING
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

describe('vitals.is._string (section:base)', function() {
  var title;

  title = titleStr('should return true');
  describe(title, function() {

    title = callStr('str');
    it(title, function() {
      var result = vitals.is._str('str');
      assert( result === true );
    });

    title = callStr('str', 'str', 'str');
    it(title, function() {
      var result = vitals.is._str('str', 'str', 'str');
      assert( result === true );
    });

  });

  title = titleStr('should return false');
  describe(title, function() {

    title = callStr('');
    it(title, function() {
      var result = vitals.is._str('');
      assert( result === false );
    });

    title = callStr(new String('str'), 'str', 'str');
    it(title, function() {
      var result = vitals.is._str(new String('str'), 'str', 'str');
      assert( result === false );
    });

  });

  title = titleStr('should throw an error');
  describe(title, function() {

    title = callStr();
    it(title, function() {
      assert.throws(function() {
        vitals.is._str();
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
  return testCall('is._str', arguments, 3);
}
