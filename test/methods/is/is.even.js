/**
 * -----------------------------------------------------------------------------
 * VITALS UNIT TESTS: vitals.is.even
 * -----------------------------------------------------------------------------
 * @section base
 * @see [vitals.is docs](https://github.com/imaginate/vitals/wiki/vitals.is)
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

method('is.even', function() {

  should('return true', function() {

    test(4, function() {
      var result = vitals.is.even(4);
      assert( result === true );
    });

    test(-4, 0, 4, function() {
      var result = vitals.is.even(-4, 0, 4);
      assert( result === true );
    });
  });

  should('return false', function() {

    test(1, function() {
      var result = vitals.is.even(1);
      assert( result === false );
    });

    test(-4, 1, 4, function() {
      var result = vitals.is.even(-4, 1, 4);
      assert( result === false );
    });
  });

  should('throw an error', function() {

    test(function() {
      assert.throws(function() {
        vitals.is.even();
      }, validErr);
    });

    test(NaN, function() {
      assert.throws(function() {
        vitals.is.even(NaN);
      }, validTypeErr);
    });

    test('fail', function() {
      assert.throws(function() {
        vitals.is.even('fail');
      }, validTypeErr);
    });

    test(1.5, function() {
      assert.throws(function() {
        vitals.is.even(1.5);
      }, validRangeErr);
    });
  });
});
