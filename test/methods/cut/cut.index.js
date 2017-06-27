/**
 * -----------------------------------------------------------------------------
 * VITALS UNIT TESTS: vitals.cut.index
 * -----------------------------------------------------------------------------
 * @section base
 * @see [vitals.cut docs](https://github.com/imaginate/vitals/wiki/vitals.cut)
 * @see [test api](https://github.com/imaginate/vitals/blob/master/test/setup/interface.js)
 * @see [test helpers](https://github.com/imaginate/vitals/blob/master/test/setup/helpers.js)
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Annotations:
 * @see [JSDoc3](http://usejsdoc.org)
 * @see [Closure Compiler JSDoc Syntax](https://developers.google.com/closure/compiler/docs/js-for-compiler)
 */

method('cut.index', 'cut.i', function() {

  should('splice array indexes from start to end', function() {

    test('<array>', 1, function() {
      var arr1 = [ 1, 2, 3 ];
      var arr2 = vitals.cut.i(arr1, 1);
      assert( is.arr(arr2) );
      assert( arr2 === arr1 );
      assert( arr2[0] === 1 );
      assert( arr2[1] === 3 );
      assert( arr2.length === 2 );
    });

    test('<array>', -1, function() {
      var arr1 = [ 1, 2, 3 ];
      var arr2 = vitals.cut.i(arr1, -1);
      assert( is.arr(arr2) );
      assert( arr2 === arr1 );
      assert( arr2[0] === 1 );
      assert( arr2[1] === 2 );
      assert( arr2.length === 2 );
    });

    test('<array>', 1, 3, function() {
      var arr1 = [ 1, 2, 3, 4, 5 ];
      var arr2 = vitals.cut.i(arr1, 1, 3);
      assert( is.arr(arr2) );
      assert( arr2 === arr1 );
      assert( arr2[0] === 1 );
      assert( arr2[1] === 4 );
      assert( arr2[2] === 5 );
      assert( arr2.length === 3 );
    });

    test('<array>', 1, -2, function() {
      var arr1 = [ 1, 2, 3, 4, 5 ];
      var arr2 = vitals.cut.i(arr1, 1, -2);
      assert( is.arr(arr2) );
      assert( arr2 === arr1 );
      assert( arr2[0] === 1 );
      assert( arr2[1] === 4 );
      assert( arr2[2] === 5 );
      assert( arr2.length === 3 );
    });

    test('<array>', -1, -3, function() {
      var arr1 = [ 1, 2, 3, 4, 5 ];
      var arr2 = vitals.cut.i(arr1, -1, -3);
      assert( is.arr(arr2) );
      assert( arr2 === arr1 );
      assert( arr2[0] === 1 );
      assert( arr2[1] === 2 );
      assert( arr2[2] === 3 );
      assert( arr2[3] === 4 );
      assert( arr2[4] === 5 );
      assert( arr2.length === 5 );
    });

    test('<array>', -3, -1, function() {
      var arr1 = [ 1, 2, 3, 4, 5 ];
      var arr2 = vitals.cut.i(arr1, -3, -1);
      assert( is.arr(arr2) );
      assert( arr2 === arr1 );
      assert( arr2[0] === 1 );
      assert( arr2[1] === 2 );
      assert( arr2[2] === 5 );
      assert( arr2.length === 3 );
    });
  });


  should('throw an error', function() {

    test(function() {
      assert.throws(function() {
        vitals.cut.i();
      }, validTypeErr);
    });

    test([], function() {
      assert.throws(function() {
        vitals.cut.i([]);
      }, validTypeErr);
    });

    test([], 'a', function() {
      assert.throws(function() {
        vitals.cut.i([], 'a');
      }, validTypeErr);
    });

    test({}, 1, function() {
      assert.throws(function() {
        vitals.cut.i({}, 1);
      }, validTypeErr);
    });

    test(null, 1, function() {
      assert.throws(function() {
        vitals.cut.i(null, 1);
      }, validTypeErr);
    });
  });
});
