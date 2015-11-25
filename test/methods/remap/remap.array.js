/**
 * -----------------------------------------------------------------------------
 * TEST - VITALS - JS METHOD - REMAP.ARRAY
 * -----------------------------------------------------------------------------
 * @see [vitals.remap]{@link https://github.com/imaginate/vitals/blob/master/src/methods/remap.js}
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

describe('vitals.remap.array (section:base)', function() {
  var title;

  describe('array tests', function() {

    // newArr()= [ "a", "b", "c", 1, 2, 3, "a1", "b2", "c3" ]

    title = titleStr('should iterate over every index in order');
    describe(title, function() {

      title = callStr('<array>', '<iteratee>');
      it(title, function() {
        var arr = newArr();
        var ii = 0;
        vitals.remap.arr(newArr(), function(val, i) {
          assert( arr[i] === val );
          assert( ii++ === i );
        });
      });

    });

    title = titleStr('should iterate over every prop and return valid array');
    describe(title, function() {

      title = callStr('<array>', '<iteratee>');
      it(title, function() {
        var arr = vitals.remap.arr(newArr(), function(val, i) {
          return val;
        });
        each(newArr(), function(val, i) {
          assert( arr[i] === val );
        });
      });

      title = callStr('<array>', '<iteratee>');
      it(title, function() {
        var arr = vitals.remap.arr(newArr(), function(val, i) {
          return val + i;
        });
        each(newArr(), function(val, i) {
          val += i;
          assert( arr[i] === val );
        });
      });

    });

    title = titleStr('should correctly clone the source');
    describe(title, function() {

      title = callStr('<array>', '<iteratee>');
      it(title, function() {
        var arr1 = newArr();
        vitals.remap.arr(arr1, function(val, i, arr) {
          assert( arr !== arr1 );
        });
      });

    });

    title = titleStr('should correctly bind the iteratee');
    describe(title, function() {

      title = callStr('<array>', '<iteratee>', '<thisArg>');
      it(title, function() {
        var arr = newArr();
        var thisArg = new Array(9);
        vitals.remap.arr(arr, function(val, i) {
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
          vitals.remap.arr();
        });
      });

      title = callStr([]);
      it(title, function() {
        assert.throws(function() {
          vitals.remap.arr([]);
        });
      });

      title = callStr(null, function(){});
      it(title, function() {
        assert.throws(function() {
          vitals.remap.arr(null, function(){});
        });
      });

      title = callStr([], function(){}, 'fail');
      it(title, function() {
        assert.throws(function() {
          vitals.remap.arr([], function(){}, 'fail');
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
  return testCall('remap.arr', arguments, 5, true);
}

/**
 * @private
 * @return {!Array}
 */
function newArr() {
  return [ 'a', 'b', 'c', 1, 2, 3, 'a1', 'b2', 'c3' ];
}
