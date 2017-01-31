/**
 * -----------------------------------------------------------------------------
 * VITALS UNIT TESTS: vitals.fuse.array
 * -----------------------------------------------------------------------------
 * @section base
 * @see [vitals.fuse docs](https://github.com/imaginate/vitals/wiki/vitals.fuse)
 * @see [test api](https://github.com/imaginate/vitals/blob/master/test/setup/interface.js)
 * @see [test helpers](https://github.com/imaginate/vitals/blob/master/test/setup/helpers.js)
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2017 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Annotations:
 * @see [JSDoc3](http://usejsdoc.org)
 * @see [Closure Compiler JSDoc Syntax](https://developers.google.com/closure/compiler/docs/js-for-compiler)
 */

method('fuse.array', 'fuse.arr', function() {

  should('push new properties to dest array', function() {

    test([], 5, function() {
      var dest = [];
      var arr = vitals.fuse.arr(dest, 5);
      assert( is.arr(arr) );
      assert( arr === dest );
      assert( arr[0] === 5 );
      assert( arr.length === 1 );
    });

    test([], 5, true, null, function() {
      var dest = [];
      var arr = vitals.fuse.arr(dest, 5, true, null); // `null` values are skipped
      assert( is.arr(arr) );
      assert( arr === dest );
      assert( arr[0] === 5 );
      assert( arr[1] === true );
      assert( arr.length === 2 );
    });
  });

  should('concatenate arrays to dest array', function() {

    test([], [ 5 ], function() {
      var dest = [];
      var arr = vitals.fuse.arr(dest, [ 5 ]);
      assert( is.arr(arr) );
      assert( arr !== dest );
      assert( arr[0] === 5 );
      assert( arr.length === 1 );
    });

    test([], [ 5, true, null ], function() {
      var dest = [];
      var arr = vitals.fuse.arr(dest, [ 5, true, null ]);
      assert( is.arr(arr) );
      assert( arr !== dest );
      assert( arr[0] === 5 );
      assert( arr[1] === true );
      assert( arr[2] === null );
      assert( arr.length === 3 );
    });

    test([], [ 5 ], [ 6 ], null, function() {
      var dest = [];
      var arr = vitals.fuse.arr(dest, [ 5 ], [ 6 ], null); // `null` values are skipped
      assert( is.arr(arr) );
      assert( arr !== dest );
      assert( arr[0] === 5 );
      assert( arr[1] === 6 );
      assert( arr.length === 2 );
    });
  });

  should('throw an error', function() {

    test(function() {
      assert.throws(function() {
        vitals.fuse.arr();
      }, validTypeErr);
    });

    test([], function() {
      assert.throws(function() {
        vitals.fuse.arr([]);
      }, validErr);
    });

    test({}, 5, function() {
      assert.throws(function() {
        vitals.fuse.arr({}, 5);
      }, validTypeErr);
    });

    test(null, 5, function() {
      assert.throws(function() {
        vitals.fuse.arr(null, 5);
      }, validTypeErr);
    });
  });
});
