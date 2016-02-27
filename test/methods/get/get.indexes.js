/**
 * -----------------------------------------------------------------------------
 * VITALS UNIT TESTS: vitals.get.indexes
 * -----------------------------------------------------------------------------
 * @section base
 * @see [vitals.get docs](https://github.com/imaginate/vitals/wiki/vitals.get)
 * @see [test api](https://github.com/imaginate/vitals/blob/master/test/setup/interface.js)
 * @see [test helpers](https://github.com/imaginate/vitals/blob/master/test/setup/helpers.js)
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2016 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Annotations:
 * @see [JSDoc3](http://usejsdoc.org)
 * @see [Closure Compiler JSDoc Syntax](https://developers.google.com/closure/compiler/docs/js-for-compiler)
 */

method('get.indexes', 'get.ii', function() {

  should('return array of all indexes', function() {

    test('<array>', function() {
      var arr = [ 'a', 'b', 'c' ];
      var keys = vitals.get.ii(arr);
      assert( is.arr(keys) );
      assert( keys[0] === 0 );
      assert( keys[1] === 1 );
      assert( keys[2] === 2 );
      assert( keys.length === 3 );
    });
  });

  should('return array of indexes where value === val', function() {

    test('<array>', 2, function() {
      var arr = [ 1, 2, 1, 2 ];
      var keys = vitals.get.ii(arr, 2);
      assert( is.arr(keys) );
      assert( keys[0] === 1 );
      assert( keys[1] === 3 );
      assert( keys.length === 2 );
    });

    test('<array>', '2', function() {
      var arr = [ 1, 2, 1, 2 ];
      var keys = vitals.get.ii(arr, '2');
      assert( is.arr(keys) );
      assert( keys.length === 0 );
    });
  });

  should('return array of indexes where substring matches val', function() {

    test('abc123', /[a-z]/, function() {
      var keys = vitals.get.ii('abc123', /[a-z]/);
      assert( is.arr(keys) );
      assert( keys[0] === 0 );
      assert( keys[1] === 1 );
      assert( keys[2] === 2 );
      assert( keys.length === 3 );
    });

    test('abc123', 5, function() {
      var keys = vitals.get.ii('abc123', 5);
      assert( is.arr(keys) );
      assert( keys.length === 0 );
    });

    test('abc123', 3, function() {
      var keys = vitals.get.ii('abc123', 3);
      assert( is.arr(keys) );
      assert( keys[0] === 5 );
      assert( keys.length === 1 );
    });

    test('abc123abc123', 'a', function() {
      var keys = vitals.get.ii('abc123abc123', 'a');
      assert( is.arr(keys) );
      assert( keys[0] === 0 );
      assert( keys[1] === 6 );
      assert( keys.length === 2 );
    });
  });

  should('throw an error', function() {

    test(function() {
      assert.throws(function() {
        vitals.get.indexes();
      }, validTypeErr);
    });

    test(null, function() {
      assert.throws(function() {
        vitals.get.indexes(null);
      }, validTypeErr);
    });

    test('str', function() {
      assert.throws(function() {
        vitals.get.indexes('str');
      }, validErr);
    });
  });
});
