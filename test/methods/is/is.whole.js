/**
 * -----------------------------------------------------------------------------
 * VITALS UNIT TESTS: vitals.is.whole
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

method('is.whole', function() {

  should('return true', function() {

    test(5, function() {
      var result = vitals.is.whole(5);
      assert( result === true );
    });

    test(-1, 0, 5, function() {
      var result = vitals.is.whole(-1, 0, 5);
      assert( result === true );
    });
  });

  should('return false', function() {

    test(1.5, function() {
      var result = vitals.is.whole(1.5);
      assert( result === false );
    });

    test(1, 5, 5.05, function() {
      var result = vitals.is.whole(1, 5, 5.05);
      assert( result === false );
    });
  });

  should('throw an error', function() {

    test(function() {
      assert.throws(function() {
        vitals.is.whole();
      }, validErr);
    });

    test(NaN, function() {
      assert.throws(function() {
        vitals.is.whole(NaN);
      }, validTypeErr);
    });

    test('fail', function() {
      assert.throws(function() {
        vitals.is.whole('fail');
      }, validTypeErr);
    });
  });
});
