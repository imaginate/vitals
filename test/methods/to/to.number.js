/**
 * -----------------------------------------------------------------------------
 * VITALS UNIT TESTS: vitals.to.number
 * -----------------------------------------------------------------------------
 * @section base
 * @see [vitals.to docs](https://github.com/imaginate/vitals/wiki/vitals.to)
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

method('to.number', 'to.num', function() {

  should('convert value to number or NaN', function() {

    test(null, function() {
      var result = vitals.to.num(null);
      assert( result === 0 );
    });

    test(true, function() {
      var result = vitals.to.num(true);
      assert( result === 1 );
    });

    test(false, function() {
      var result = vitals.to.num(false);
      assert( result === 0 );
    });

    test('10', function() {
      var result = vitals.to.num('10');
      assert( result === 10 );
    });

    test(10, function() {
      var result = vitals.to.num(10);
      assert( result === 10 );
    });
  });

  should('throw an error', function() {

    test(function() {
      assert.throws(function() {
        vitals.to.num();
      }, validErr);
    });

    test(undefined, function() {
      assert.throws(function() {
        vitals.to.num(undefined);
      }, validTypeErr);
    });

    test('invalid', function() {
      assert.throws(function() {
        vitals.to.num('invalid');
      }, validRangeErr);
    });

    test([ 1, 2, 3 ], function() {
      assert.throws(function() {
        vitals.to.num([ 1, 2, 3 ]);
      }, validTypeErr);
    });
  });
});
