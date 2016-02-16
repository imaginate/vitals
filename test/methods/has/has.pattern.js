/**
 * -----------------------------------------------------------------------------
 * TEST - VITALS - JS METHOD - HAS.PATTERN
 * -----------------------------------------------------------------------------
 * @see [vitals.has]{@link https://github.com/imaginate/vitals/blob/master/src/methods/has.js}
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

describe('vitals.has.pattern (section:base)', function() {
  var title;

  describe('basic tests', function() {

    title = titleStr('should return true');
    describe(title, function() {

      title = callStr('abc123a1b2c3', /[a-z]/);
      it(title, function() {
        assert( vitals.has.pattern('abc123a1b2c3', /[a-z]/) );
      });

      title = callStr('abc123a1b2c3', 1);
      it(title, function() {
        assert( vitals.has.pattern('abc123a1b2c3', 1) );
      });

      title = callStr('abc123a1b2c3', 'a');
      it(title, function() {
        assert( vitals.has.pattern('abc123a1b2c3', 'a') );
      });

    });

    title = titleStr('should return false');
    describe(title, function() {

      title = callStr('abc123a1b2c3', /^[a-z]$/);
      it(title, function() {
        assert( !vitals.has.pattern('abc123a1b2c3', /^[a-z]$/) );
      });

      title = callStr('abc123a1b2c3', 5);
      it(title, function() {
        assert( !vitals.has.pattern('abc123a1b2c3', 5) );
      });

      title = callStr('abc123a1b2c3', 'd');
      it(title, function() {
        assert( !vitals.has.pattern('abc123a1b2c3', 'd') );
      });

    });

  });

  describe('error tests', function() {
    describe('should throw an error', function() {

      title = callStr();
      it(title, function() {
        assert.throws(function() {
          vitals.has.pattern();
        });
      });

      title = callStr('str');
      it(title, function() {
        assert.throws(function() {
          vitals.has.pattern('str');
        });
      });

      title = callStr({}, 'val');
      it(title, function() {
        assert.throws(function() {
          vitals.has.pattern({}, 'val');
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
  return testCall('has.pattern', arguments, 4);
}
