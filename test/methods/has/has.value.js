/**
 * -----------------------------------------------------------------------------
 * VITALS UNIT TESTS: vitals.has.value
 * -----------------------------------------------------------------------------
 * @section base
 * @see [vitals.has docs](https://github.com/imaginate/vitals/wiki/vitals.has)
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

method('has.value', 'has.val', function() {

  should('return true', function() {

    test('<object>', 'a', function() {
      var result = vitals.has.val({ '1': 'a' }, 'a');
      assert( result === true );
    });

    test('<object>', 1, function() {
      var result = vitals.has.val({ a: 1 }, 1);
      assert( result === true );
    });

    test('<array>', 'a', function() {
      var result = vitals.has.val([ 'a' ], 'a');
      assert( result === true );
    });

    test('<array>', 1, function() {
      var result = vitals.has.val([ 1 ], 1);
      assert( result === true );
    });
  });

  should('return false', function() {

    test(null, 1, function() {
      var result = vitals.has.val(null, 1);
      assert( result === false );
    });

    test('<object>', 5, function() {
      var result = vitals.has.val({ a: 1 }, 5);
      assert( result === false );
    });

    test('<array>', 'd', function() {
      var result = vitals.has.val([ 'a' ], 'd');
      assert( result === false );
    });

    test('<array>', 5, function() {
      var result = vitals.has.val([ 1 ], 5);
      assert( result === false );
    });
  });

  should('throw an error', function() {

    test(function() {
      assert.throws(function() {
        vitals.has.val();
      }, validErr);
    });

    test({}, function() {
      assert.throws(function() {
        vitals.has.val({});
      }, validErr);
    });

    test('str', 'val', function() {
      assert.throws(function() {
        vitals.has.val('str', 'val');
      }, validTypeErr);
    });
  });
});
