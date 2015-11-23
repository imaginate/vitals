/**
 * -----------------------------------------------------------------------------
 * TEST - VITALS - JS METHOD - EACH.CYCLE
 * -----------------------------------------------------------------------------
 * @see [vitals.each]{@link https://github.com/imaginate/vitals/blob/master/src/methods/each.js}
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

describe('vitals.each.cycle (sections:js,base)', function() {
  var title;

  describe('basic tests', function() {

    title = titleStr('should call the iteratee x times');
    describe(title, function() {

      title = callStr(8, '<iteratee>');
      it(title, function() {
        var times = 0;
        vitals.each.time(8, function() {
          ++times;
        });
        assert( times === 8 );
      });

    });

    title = titleStr('should bind the iteratee correctly');
    describe(title, function() {

      title = callStr(5, '<iteratee>', '<thisArg>');
      it(title, function() {
        var times = 0;
        var thisArg = {};
        vitals.each.time(5, function() {
          this.times = ++times;
        }, thisArg);
        assert( times === 5 );
        assert( thisArg.times === 5 );
      });

    });

  });

  describe('error tests', function() {
    describe('should throw an error', function() {

      title = callStr();
      it(title, function() {
        assert.throws(function() {
          vitals.each.time();
        });
      });

      title = callStr(5);
      it(title, function() {
        assert.throws(function() {
          vitals.each.time(5);
        });
      });

      title = callStr({}, function(){});
      it(title, function() {
        assert.throws(function() {
          vitals.each.time({}, function(){});
        });
      });

      title = callStr(5, function(){}, 'fail');
      it(title, function() {
        assert.throws(function() {
          vitals.each.time(5, function(){}, 'fail');
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
  return testCall('each.time', arguments, 5, true);
}
