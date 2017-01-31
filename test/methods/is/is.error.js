/**
 * -----------------------------------------------------------------------------
 * VITALS UNIT TESTS: vitals.is.error
 * -----------------------------------------------------------------------------
 * @section base
 * @see [vitals.is docs](https://github.com/imaginate/vitals/wiki/vitals.is)
 * @see [test api](https://github.com/imaginate/vitals/blob/master/test/setup/interface.js)
 * @see [test helpers](https://github.com/imaginate/vitals/blob/master/test/setup/helpers.js)
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2017 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Annotations:
 * @see [JSDoc3](http://usejsdoc.org)
 * @see [Closure Compiler JSDoc Syntax](https://developers.google.com/closure/compiler/docs/js-for-compiler)
 */

method('is.error', 'is.err', function() {

  should('return true', function() {

    test('<Error>', function() {
      var err = new Error();
      var result = vitals.is.err(err);
      assert( result === true );
    });

    test('<RangeError>', '<TypeError>', '<Error>', function() {
      var err1 = new RangeError();
      var err2 = new TypeError();
      var err3 = new Error();
      var result = vitals.is.err(err1, err2, err3);
      assert( result === true );
    });
  });

  should('return false', function() {

    test(null, function() {
      var result = vitals.is.err(null);
      assert( result === false );
    });

    test('<TypeError>', '<Error>', {}, function() {
      var err1 = new TypeError();
      var err2 = new Error();
      var result = vitals.is.err(err1, err2, {});
      assert( result === false );
    });
  });

  should('throw an error', function() {

    test(function() {
      assert.throws(function() {
        vitals.is.err();
      }, validErr);
    });
  });
});
