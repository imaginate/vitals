/**
 * -----------------------------------------------------------------------------
 * TEST - VITALS - JS METHOD - CLONE.ARRAY
 * -----------------------------------------------------------------------------
 * @see [vitals.clone]{@link https://github.com/imaginate/vitals/blob/master/src/js-methods/clone.js}
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

describe('clone.array', function() {
  var title;

  //////////////////////////////////////////////
  // BASIC TESTS

  title = callStr([ 1, { b: 2 }, 3 ]);
  it(title, function() {
    var arr = newArr();
    var copy = vitals.clone.arr(arr);
    assert(arr !== copy);
    each(arr, function(val, i) {
      assert( arr[i] === copy[i] );
    });
  });

  title = callStr([ 1, { b: 2 }, 3 ], true);
  it(title, function() {
    var arr = newArr();
    var copy = vitals.clone.arr(arr, true);
    assert(arr !== copy);
    assert(arr[0] === copy[0]);
    assert(arr[1] !== copy[1]);
    assert(arr[2] === copy[2]);
  });

  title = callStr([ 1, { b: 2 }, 3 ], false);
  it(title, function() {
    var arr = newArr();
    var copy = vitals.clone.arr(arr, false);
    assert(arr !== copy);
    each(arr, function(val, i) {
      assert( arr[i] === copy[i] );
    });
  });

  //////////////////////////////////////////////
  // ERROR TESTS

  title = callStr(null);
  it(title, function() {
    assert.throws(function() {
      vitals.clone.arr(null);
    });
  });

  title = callStr({});
  it(title, function() {
    assert.throws(function() {
      vitals.clone.arr({});
    });
  });

  title = callStr([], 'fail');
  it(title, function() {
    assert.throws(function() {
      vitals.clone.arr([], 'fail');
    });
  });

});

////////////////////////////////////////////////////////////////////////////////
// PRIVATE HELPERS
////////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @param {...*} args
 * @return {string}
 */
function callStr(args) {
  args = slice(arguments);
  return testCall('clone.arr', args, 3, true);
}

/**
 * @private
 * @return {!Array}
 */
function newArr() {
  return freeze([ 1, { b: 2 }, 3 ], true);
}
