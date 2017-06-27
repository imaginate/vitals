/**
 * -----------------------------------------------------------------------------
 * VITALS UNIT TESTS: vitals.get.keys
 * -----------------------------------------------------------------------------
 * @section base
 * @see [vitals.get docs](https://github.com/imaginate/vitals/wiki/vitals.get)
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

method('get.keys', function() {

  should('return array of all keys', function() {

    test('<object>', function() {
      var obj = { a: 1, b: 2, c: 3 };
      var keys = vitals.get.keys(obj);
      assert( is.arr(keys) );
      assert( hasVal(keys, 'a') );
      assert( hasVal(keys, 'b') );
      assert( hasVal(keys, 'c') );
      assert( keys.length === 3 );
    });
  });

  should('return array of keys where key matches val', function() {

    test('<object>', /^[0-9]$/, function() {
      var obj = {
        'a':  1,  'b':  2,
        '3': 'c', '4': 'd'
      };
      var keys = vitals.get.keys(obj, /^[0-9]$/);
      assert( is.arr(keys) );
      assert( hasVal(keys, '3') );
      assert( hasVal(keys, '4') );
      assert( keys.length === 2 );
    });
  });

  should('return array of keys where value === val', function() {

    test('<object>', 2, function() {
      var obj = { a: 1, b: 2, c: 3 };
      var keys = vitals.get.keys(obj, 2);
      assert( is.arr(keys) );
      assert( keys[0] === 'b' );
      assert( keys.length === 1 );
    });

    test('<object>', 4, function() {
      var obj = { a: 1, b: 2, c: 3 };
      var keys = vitals.get.keys(obj, 4);
      assert( is.arr(keys) );
      assert( keys.length === 0 );
    });
  });

  should('throw an error', function() {

    test(function() {
      assert.throws(function() {
        vitals.get.keys();
      }, validTypeErr);
    });

    test(null, function() {
      assert.throws(function() {
        vitals.get.keys(null);
      }, validTypeErr);
    });

    test('str', function() {
      assert.throws(function() {
        vitals.get.keys('str');
      }, validTypeErr);
    });
  });
});
