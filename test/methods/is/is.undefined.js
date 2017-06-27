/**
 * -----------------------------------------------------------------------------
 * VITALS UNIT TESTS: vitals.is.undefined
 * -----------------------------------------------------------------------------
 * @section base
 * @see [vitals.is docs](https://github.com/imaginate/vitals/wiki/vitals.is)
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

method('is.undefined', function() {

  should('return true', function() {

    test(undefined, function() {
      var result = vitals.is.undefined(undefined);
      assert( result === true );
    });

    test(undefined, undefined, undefined, function() {
      var result = vitals.is.undefined(undefined, undefined, undefined);
      assert( result === true );
    });
  });

  should('return false', function() {

    test(null, function() {
      var result = vitals.is.undefined(null);
      assert( result === false );
    });

    test(undefined, undefined, false, function() {
      var result = vitals.is.undefined(undefined, undefined, false);
      assert( result === false );
    });
  });

  should('throw an error', function() {

    test(function() {
      assert.throws(function() {
        vitals.is.undefined();
      }, validErr);
    });
  });
});
