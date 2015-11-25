/**
 * -----------------------------------------------------------------------------
 * TEST - VITALS - JS METHOD - UNTIL.ARRAY
 * -----------------------------------------------------------------------------
 * @see [vitals.until]{@link https://github.com/imaginate/vitals/blob/master/src/methods/until.js}
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

describe('vitals.until.array (section:base)', function() {
  var title;

  describe('basic tests', function() {

    // newArr()= [ "a", "b", "c", 1, 2, 3, "a1", "b2", "c3" ]

    title = titleStr('should iterate over every index in order');
    describe(title, function() {

      title = callStr(true, '<array>', '<iteratee>');
      it(title, function() {
        var arr = newArr();
        var ii = 0;
        vitals.until.arr(true, newArr(), function(val, i) {
          assert( arr[i] === val );
          assert( ii++ === i );
        });
      });

    });

    title = titleStr('should return valid boolean');
    describe(title, function() {

      title = callStr(true, '<array>', '<iteratee>');
      it(title, function() {
        var pass = vitals.until.arr(true, newArr(), function(val, i) {
          return val === 3;
        });
        assert( pass === true );
      });

      title = callStr(true, '<array>', '<iteratee>');
      it(title, function() {
        var fail = vitals.until.arr(true, newArr(), function(val, i) {
          return val === '3';
        });
        assert( fail === false );
      });

      title = callStr(3, '<array>', '<iteratee>');
      it(title, function() {
        var pass = vitals.until.arr(3, newArr(), function(val, i) {
          return val;
        });
        assert( pass === true );
      });

      title = callStr('3', '<array>', '<iteratee>');
      it(title, function() {
        var fail = vitals.until.arr('3', newArr(), function(val, i) {
          return val;
        });
        assert( fail === false );
      });

    });

    title = titleStr('should correctly clone the source');
    describe(title, function() {

      title = callStr(true, '<array>', '<iteratee>');
      it(title, function() {
        var arr1 = newArr();
        vitals.until.arr(true, arr1, function(val, i, arr) {
          assert( arr !== arr1 );
        });
      });

    });

    title = titleStr('should correctly bind the iteratee');
    describe(title, function() {

      title = callStr(true, '<array>', '<iteratee>', '<thisArg>');
      it(title, function() {
        var arr = newArr();
        var thisArg = new Array(9);
        var fail = vitals.until.arr(true, arr, function(val, i) {
          this[i] = val;
        }, thisArg);
        assert( arr.join() === thisArg.join() );
        assert( fail === false );
      });

    });

    describe('should throw an error', function() {

      title = callStr();
      it(title, function() {
        assert.throws(function() {
          vitals.until.arr();
        });
      });

      title = callStr(true);
      it(title, function() {
        assert.throws(function() {
          vitals.until.arr(true);
        });
      });

      title = callStr(true, []);
      it(title, function() {
        assert.throws(function() {
          vitals.until.arr(true, []);
        });
      });

      title = callStr(true, null, function(){});
      it(title, function() {
        assert.throws(function() {
          vitals.until.arr(true, null, function(){});
        });
      });

      title = callStr(true, [], function(){}, 'fail');
      it(title, function() {
        assert.throws(function() {
          vitals.until.arr(true, [], function(){}, 'fail');
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
  return testCall('until.arr', arguments, 5, true);
}

/**
 * @private
 * @return {!Array}
 */
function newArr() {
  return [ 'a', 'b', 'c', 1, 2, 3, 'a1', 'b2', 'c3' ];
}
