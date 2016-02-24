/**
 * -----------------------------------------------------------------------------
 * TEST - VITALS - JS METHOD - UNTIL.CYCLE
 * -----------------------------------------------------------------------------
 * @see [vitals.until]{@link https://github.com/imaginate/vitals/wiki/vitals.until}
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

describe('vitals.until.cycle (section:base)', function() {
  var title;

  describe('basic tests', function() {

    title = titleStr('should call the iteratee x times');
    describe(title, function() {

      title = callStr(true, 8, '<iteratee>');
      it(title, function() {
        var times = 0;
        vitals.until.time(true, 8, function() {
          ++times;
        });
        assert( times === 8 );
      });

      title = callStr(true, 15, '<iteratee>');
      it(title, function() {
        var times = 0;
        vitals.until.time(true, 15, function(time) {
          assert( times++ === time );
        });
        assert( times === 15 );
      });

    });

    title = titleStr('should return valid boolean');
    describe(title, function() {

      title = callStr(true, 5, '<iteratee>');
      it(title, function() {
        var pass = vitals.until.time(true, 5, function(time) {
          return time === 3;
        });
        assert( pass === true );
      });

      title = callStr(true, 3, '<iteratee>');
      it(title, function() {
        var fail = vitals.until.time(true, 3, function(time) {
          return time === 3;
        });
        assert( fail === false );
      });

    });

    title = titleStr('should correctly bind the iteratee');
    describe(title, function() {

      title = callStr(true, 5, '<iteratee>', '<thisArg>');
      it(title, function() {
        var times = 0;
        var thisArg = {};
        var fail = vitals.until.time(true, 5, function() {
          this.times = ++times;
        }, thisArg);
        assert( times === 5 );
        assert( thisArg.times === 5 );
        assert( fail === false );
      });

    });

    describe('should throw an error', function() {

      title = callStr();
      it(title, function() {
        assert.throws(function() {
          vitals.until.time();
        });
      });

      title = callStr(true);
      it(title, function() {
        assert.throws(function() {
          vitals.until.time(true);
        });
      });

      title = callStr(true, 5);
      it(title, function() {
        assert.throws(function() {
          vitals.until.time(true, 5);
        });
      });

      title = callStr(true, {}, function(){});
      it(title, function() {
        assert.throws(function() {
          vitals.until.time(true, {}, function(){});
        });
      });

      title = callStr(true, 5, function(){}, 'fail');
      it(title, function() {
        assert.throws(function() {
          vitals.until.time(true, 5, function(){}, 'fail');
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
  return testCall('until.time', arguments, 4);
}
