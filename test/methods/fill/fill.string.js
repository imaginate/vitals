/**
 * -----------------------------------------------------------------------------
 * TEST - VITALS - JS METHOD - FILL.STRING
 * -----------------------------------------------------------------------------
 * @see [vitals.fill]{@link https://github.com/imaginate/vitals/wiki/vitals.fill}
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

describe('vitals.fill.string (section:base)', function() {
  var title;

  describe('basic tests', function() {

    title = titleStr('should fill new string with val x times');
    describe(title, function() {

      title = callStr(5, 5);
      it(title, function() {
        var str = vitals.fill.str(5, 5);
        assert( str === '55555' );
      });

      title = callStr(0, 5);
      it(title, function() {
        var str = vitals.fill.str(0, 5);
        assert( str === '' );
      });

    });

  });

  describe('error tests', function() {
    describe('should throw an error', function() {

      title = callStr();
      it(title, function() {
        assert.throws(function() {
          vitals.fill.str();
        });
      });

      title = callStr(5);
      it(title, function() {
        assert.throws(function() {
          vitals.fill.str(5);
        });
      });

      title = callStr('fail', 'val');
      it(title, function() {
        assert.throws(function() {
          vitals.fill.str('fail', 'val');
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
  return breakStr(shouldMsg, 3);
}

/**
 * @private
 * @param {...*} args
 * @return {string}
 */
function callStr() {
  return testCall('fill.str', arguments, 4);
}
