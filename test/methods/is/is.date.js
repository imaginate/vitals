/**
 * -----------------------------------------------------------------------------
 * VITALS UNIT TESTS: vitals.is.date
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

method('is.date', function() {

  should('return true', function() {

    test(new Date(), function() {
      var date = new Date();
      var result = vitals.is.date(date);
      assert( result === true );
    });

    test(new Date(), new Date(), new Date(), function() {
      var date1 = new Date();
      var date2 = new Date();
      var date3 = new Date();
      var result = vitals.is.date(date1, date2, date3);
      assert( result === true );
    });
  });

  should('return false', function() {

    test(null, function() {
      var result = vitals.is.date(null);
      assert( result === false );
    });

    test(new Date(), new Date(), {}, function() {
      var date1 = new Date();
      var date2 = new Date();
      var result = vitals.is.date(date1, date2, {});
      assert( result === false );
    });
  });

  should('throw an error', function() {

    test(function() {
      assert.throws(function() {
        vitals.is.date();
      }, validErr);
    });
  });
});
