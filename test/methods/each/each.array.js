/**
 * -----------------------------------------------------------------------------
 * TEST - VITALS - JS METHOD - EACH.ARRAY
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

describe('vitals.each.array (section:base)', function() {
  var title;

  // newArr()= [ "a", "b", "c", 1, 2, 3, "a1", "b2", "c3" ]

  describe('basic tests', function() {

    title = titleStr('should iterate over every index in order');
    describe(title, function() {

      title = callStr('<array>', '<iteratee>');
      it(title, function() {
        var arr = newArr();
        var ii = 0;
        vitals.each.arr(newArr(), function(val, i) {
          assert( arr[i] === val );
          assert( ii++ === i );
        });
      });

    });

    title = titleStr('should return the valid array');
    describe(title, function() {

      title = callStr('<array>', '<iteratee>');
      it(title, function() {
        var arr1 = newArr();
        var arr2 = vitals.each.arr(arr1, function(val, i) {});
        assert( arr1 === arr2 );
      });

      title = callStr('<array>', '<iteratee>');
      it(title, function() {
        var arr1 = newArr();
        var arr2 = vitals.each.arr(arr1, function(val, i, arr) {});
        assert( arr1 !== arr2 );
        assert( arr1.join() === arr2.join() );
      });

    });

    title = titleStr('should bind the iteratee correctly');
    describe(title, function() {

      title = callStr('<array>', '<iteratee>', '<thisArg>');
      it(title, function() {
        var arr = newArr();
        var thisArg = new Array(8);
        vitals.each.arr(arr, function(val, i) {
          this[i] = val;
        }, thisArg);
        assert( arr.join() === thisArg.join() );
      });

    });

  });

  describe('error tests', function() {
    describe('should throw an error', function() {

      title = callStr();
      it(title, function() {
        assert.throws(function() {
          vitals.each.arr();
        });
      });

      title = callStr([]);
      it(title, function() {
        assert.throws(function() {
          vitals.each.arr([]);
        });
      });

      title = callStr(5, function(){});
      it(title, function() {
        assert.throws(function() {
          vitals.each.arr(5, function(){});
        });
      });

      title = callStr({}, function(){});
      it(title, function() {
        assert.throws(function() {
          vitals.each.arr({}, function(){});
        });
      });

      title = callStr(null, function(){});
      it(title, function() {
        assert.throws(function() {
          vitals.each.arr(null, function(){});
        });
      });

      title = callStr([], function(){}, 'fail');
      it(title, function() {
        assert.throws(function() {
          vitals.each.arr([], function(){}, 'fail');
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
  return testCall('each.arr', arguments, 5, true);
}

/**
 * @private
 * @return {!Array}
 */
function newArr() {
  return [ 'a', 'b', 'c', 1, 2, 3, 'a1', 'b2', 'c3' ];
}
