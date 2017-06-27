/**
 * -----------------------------------------------------------------------------
 * VITALS UNIT TESTS: vitals.same
 * -----------------------------------------------------------------------------
 * @section base
 * @see [vitals.same docs](https://github.com/imaginate/vitals/wiki/vitals.same)
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

method('same', function() {

  should('return true', function() {

    test(5, 5, function() {
      var result = vitals.same(5, 5);
      assert( result === true );
    });

    test('str', 'str', function() {
      var result = vitals.same('str', 'str');
      assert( result === true );
    });

    test(null, null, function() {
      var result = vitals.same(null, null);
      assert( result === true );
    });
  });

  should('return false', function() {

    test(5, '5', function() {
      var result = vitals.same(5, '5');
      assert( result === false );
    });

    test({}, {}, function() {
      var result = vitals.same({}, {});
      assert( result === false );
    });

    test(null, undefined, function() {
      var result = vitals.same(null, undefined);
      assert( result === false );
    });
  });

  should('throw an error', function() {

    test(function() {
      assert.throws(function() {
        vitals.same();
      }, validErr);
    });

    test(1, function() {
      assert.throws(function() {
        vitals.same(1);
      }, validErr);
    });
  });
});
