/**
 * -----------------------------------------------------------------------------
 * TEST - VITALS - JS METHOD - SLICE.ARRAY
 * -----------------------------------------------------------------------------
 * @see [vitals.slice]{@link https://github.com/imaginate/vitals/blob/master/src/methods/slice.js}
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

describe('vitals.slice.array (section:base)', function() {
  var title;

  describe('object tests', function() {

    // newObj()= { "a", "b", "c", 1, 2, 3, "a1", "b2", "c3" }

    title = titleStr('should return a correctly copied array');
    describe(title, function() {

      title = callStr('<object>');
      it(title, function() {
        var arr1 = newObj();
        var arr2 = vitals.slice.arr(arr1);
        assert( arr1 !== arr2 );
        assert( arr2.join() === 'a,b,c,1,2,3,a1,b2,c3' );
      });

      title = callStr('<object>', 1);
      it(title, function() {
        var arr = vitals.slice.arr(newObj(), 1);
        assert( arr.join() === 'b,c,1,2,3,a1,b2,c3' );
      });

      title = callStr('<object>', -1);
      it(title, function() {
        var arr = vitals.slice.arr(newObj(), -1);
        assert( arr.join() === 'c3' );
      });

      title = callStr('<object>', 1, 8);
      it(title, function() {
        var arr = vitals.slice.arr(newObj(), 1, 8);
        assert( arr.join() === 'b,c,1,2,3,a1,b2' );
      });

      title = callStr('<object>', 1, -1);
      it(title, function() {
        var arr = vitals.slice.arr(newObj(), 1, -1);
        assert( arr.join() === 'b,c,1,2,3,a1,b2' );
      });

      title = callStr('<object>', -3, -1);
      it(title, function() {
        var arr = vitals.slice.arr(newObj(), -3, -1);
        assert( arr.join() === 'a1,b2' );
      });

    });

  });

  describe('array tests', function() {

    // newArr()= [ "a", "b", "c", 1, 2, 3, "a1", "b2", "c3" ]

    title = titleStr('should return a correctly copied array');
    describe(title, function() {

      title = callStr('<array>');
      it(title, function() {
        var arr1 = newArr();
        var arr2 = vitals.slice.arr(arr1);
        assert( arr1 !== arr2 );
        assert( arr2.join() === 'a,b,c,1,2,3,a1,b2,c3' );
      });

      title = callStr('<array>', 1);
      it(title, function() {
        var arr = vitals.slice.arr(newArr(), 1);
        assert( arr.join() === 'b,c,1,2,3,a1,b2,c3' );
      });

      title = callStr('<array>', -1);
      it(title, function() {
        var arr = vitals.slice.arr(newArr(), -1);
        assert( arr.join() === 'c3' );
      });

      title = callStr('<array>', 1, 8);
      it(title, function() {
        var arr = vitals.slice.arr(newArr(), 1, 8);
        assert( arr.join() === 'b,c,1,2,3,a1,b2' );
      });

      title = callStr('<array>', 1, -1);
      it(title, function() {
        var arr = vitals.slice.arr(newArr(), 1, -1);
        assert( arr.join() === 'b,c,1,2,3,a1,b2' );
      });

      title = callStr('<array>', -3, -1);
      it(title, function() {
        var arr = vitals.slice.arr(newArr(), -3, -1);
        assert( arr.join() === 'a1,b2' );
      });

    });

  });

  describe('error tests', function() {
    describe('should throw an error', function() {

      title = callStr();
      it(title, function() {
        assert.throws(function() {
          vitals.slice.arr();
        });
      });

      title = callStr(null);
      it(title, function() {
        assert.throws(function() {
          vitals.slice.arr(null);
        });
      });

      title = callStr({}, 'fail');
      it(title, function() {
        assert.throws(function() {
          vitals.slice.arr({}, 'fail');
        });
      });

      title = callStr({}, 1, 'fail');
      it(title, function() {
        assert.throws(function() {
          vitals.slice.arr({}, 1, 'fail');
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
  return testCall('slice.arr', arguments, 5, true);
}

/**
 * @private
 * @return {!Object}
 */
function newObj() {
  return {
    'length': 9,
    '0': 'a',
    '1': 'b',
    '2': 'c',
    '3':  1,
    '4':  2,
    '5':  3,
    '6': 'a1',
    '7': 'b2',
    '8': 'c3'
  };
}

/**
 * @private
 * @return {!Array}
 */
function newArr() {
  return [ 'a', 'b', 'c', 1, 2, 3, 'a1', 'b2', 'c3' ];
}
