/**
 * -----------------------------------------------------------------------------
 * VITALS UNIT TESTS: vitals.get.keys.byKey
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

method('get.keys.byKey', function() {

  should('return array of keys where key matches pattern', function() {

    test('<object>', /^[0-9]$/, function() {
      var obj = {
        'a':  1,  'b':  2,
        '3': 'c', '4': 'd'
      };
      var keys = vitals.get.keys.byKey(obj, /^[0-9]$/);
      assert( is.arr(keys) );
      assert( hasVal(keys, '3') );
      assert( hasVal(keys, '4') );
      assert( keys.length === 2 );
    });

    test('<object>', 'a', function() {
      var obj = {
        'a':  1,  'b':  2,
        '3': 'c', '4': 'd',
        'a3': 5,  'b4': 6
      };
      var keys = vitals.get.keys.byKey(obj, 'a');
      assert( is.arr(keys) );
      assert( hasVal(keys, 'a') );
      assert( hasVal(keys, 'a3') );
      assert( keys.length === 2 );
    });

    test('<object>', 4, function() {
      var obj = {
        'a':  1,  'b':  2,
        '3': 'c', '4': 'd',
        'a3': 5,  'b4': 6
      };
      var keys = vitals.get.keys.byKey(obj, 4);
      assert( is.arr(keys) );
      assert( hasVal(keys, '4') );
      assert( hasVal(keys, 'b4') );
      assert( keys.length === 2 );
    });

    test('<object>', 'd', function() {
      var obj = {
        'a':  1,  'b':  2,
        '3': 'c', '4': 'd'
      };
      var keys = vitals.get.keys.byKey(obj, 'd');
      assert( is.arr(keys) );
      assert( keys.length === 0 );
    });
  });

  should('throw an error', function() {

    test(function() {
      assert.throws(function() {
        vitals.get.keys.byKey();
      }, validTypeErr);
    });

    test({}, function() {
      assert.throws(function() {
        vitals.get.keys.byKey({});
      }, validErr);
    });

    test(null, 'str', function() {
      assert.throws(function() {
        vitals.get.keys.byKey(null, 'str');
      }, validTypeErr);
    });

    test('str', 'str', function() {
      assert.throws(function() {
        vitals.get.keys.byKey('str', 'str');
      }, validTypeErr);
    });
  });
});
