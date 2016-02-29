/**
 * -----------------------------------------------------------------------------
 * VITALS UNIT TESTS: vitals.same.loose
 * -----------------------------------------------------------------------------
 * @section base
 * @see [vitals.same docs](https://github.com/imaginate/vitals/wiki/vitals.same)
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

method('same.loose', 'same.ish', function() {

  should('return true', function() {

    test(5, 5, function() {
      var result = vitals.same.ish(5, 5);
      assert( result === true );
    });

    test('str', 'str', function() {
      var result = vitals.same.ish('str', 'str');
      assert( result === true );
    });

    test(null, null, function() {
      var result = vitals.same.ish(null, null);
      assert( result === true );
    });

    test(5, '5', function() {
      var result = vitals.same.ish(5, '5');
      assert( result === true );
    });

    test(null, undefined, function() {
      var result = vitals.same.ish(null, undefined);
      assert( result === true );
    });
  });

  should('return false', function() {

    test(5, 6, function() {
      var result = vitals.same.ish(5, 6);
      assert( result === false );
    });

    test({}, {}, function() {
      var result = vitals.same.ish({}, {});
      assert( result === false );
    });

    test(true, false, function() {
      var result = vitals.same.ish(true, false);
      assert( result === false );
    });
  });

  should('throw an error', function() {

    test(function() {
      assert.throws(function() {
        vitals.same.ish();
      }, validErr);
    });

    test(1, function() {
      assert.throws(function() {
        vitals.same.ish(1);
      }, validErr);
    });
  });
});
