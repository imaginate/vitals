/**
 * -----------------------------------------------------------------------------
 * TEST - VITALS - JS METHOD - SLICE.STRING
 * -----------------------------------------------------------------------------
 * @see [vitals.slice]{@link https://github.com/imaginate/vitals/blob/master/src/methods/slice.js}
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2015 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Supporting Libraries:
 * @see [are]{@link https://github.com/imaginate/are}
 *
 * Annotations:
 * @see [JSDoc3]{@link http://usejsdoc.org/}
 * @see [Closure Compiler specific JSDoc]{@link https://developers.google.com/closure/compiler/docs/js-for-compiler}
 */

describe('vitals.slice.string (section:base)', function() {
  var title;

  describe('string tests', function() {

    title = titleStr('should return a correctly copied string');
    describe(title, function() {

      title = callStr('abc123a1b2c3');
      it(title, function() {
        var str = vitals.slice.str('abc123a1b2c3');
        assert( str === 'abc123a1b2c3' );
      });

      title = callStr('abc123a1b2c3', 1);
      it(title, function() {
        var str = vitals.slice.str('abc123a1b2c3', 1);
        assert( str === 'bc123a1b2c3' );
      });

      title = callStr('abc123a1b2c3', -1);
      it(title, function() {
        var str = vitals.slice.str('abc123a1b2c3', -1);
        assert( str === '3' );
      });

      title = callStr('abc123a1b2c3', 1, 3);
      it(title, function() {
        var str = vitals.slice.str('abc123a1b2c3', 1, 3);
        assert( str === 'bc' );
      });

      title = callStr('abc123a1b2c3', 1, -3);
      it(title, function() {
        var str = vitals.slice.str('abc123a1b2c3', 1, -3);
        assert( str === 'bc123a1b' );
      });

      title = callStr('abc123a1b2c3', -3, -1);
      it(title, function() {
        var str = vitals.slice.str('abc123a1b2c3', -3, -1);
        assert( str === '2c' );
      });

    });

  });

  describe('error tests', function() {
    describe('should throw an error', function() {

      title = callStr();
      it(title, function() {
        assert.throws(function() {
          vitals.slice.str();
        });
      });

      title = callStr('str', 'fail');
      it(title, function() {
        assert.throws(function() {
          vitals.slice.str('str', 'fail');
        });
      });

      title = callStr('str', 1, 'fail');
      it(title, function() {
        assert.throws(function() {
          vitals.slice.str('str', 1, 'fail');
        });
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
  return breakStr(shouldMsg, 4, true);
}

/**
 * @private
 * @param {...*} args
 * @return {string}
 */
function callStr() {
  return testCall('slice.str', arguments, 5, true);
}
