/**
 * -----------------------------------------------------------------------------
 * VITALS UNIT TESTS: vitals.is.boolean
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

method('is.boolean', 'is.bool', function() {

  should('return true', function() {

    test(false, function() {
      var result = vitals.is.bool(false);
      assert( result === true );
    });

    test(true, false, false, function() {
      var result = vitals.is.bool(true, false, false);
      assert( result === true );
    });
  });

  should('return false', function() {

    test(null, function() {
      var result = vitals.is.bool(null);
      assert( result === false );
    });

    test('<Boolean>', false, false, function() {
      var result = vitals.is.bool(new Boolean(true), false, false);
      assert( result === false );
    });
  });

  should('throw an error', function() {

    test(function() {
      assert.throws(function() {
        vitals.is.bool();
      }, validErr);
    });
  });
});
