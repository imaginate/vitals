/**
 * -----------------------------------------------------------------------------
 * VITALS UNIT TESTS: vitals.cut.pattern
 * -----------------------------------------------------------------------------
 * @section base
 * @see [vitals.cut docs](https://github.com/imaginate/vitals/wiki/vitals.cut)
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

method('cut.pattern', function() {

  should('remove pattern from string', function() {

    test('abcABCabc', 'a', function() {
      var str = vitals.cut.pattern('abcABCabc', 'a');
      assert( str === 'bcABCbc' );
    });

    test('abc123abc123', 1, function() {
      var str = vitals.cut.pattern('abc123abc123', 1);
      assert( str === 'abc23abc23' );
    });

    test('abc123', /[a-z]/, function() {
      var str = vitals.cut.pattern('abc123', /[a-z]/);
      assert( str === 'bc123' );
    });

    test('abc123', /[a-z]/g, function() {
      var str = vitals.cut.pattern('abc123', /[a-z]/g);
      assert( str === '123' );
    });

    test('ABC.a*b*c.123', '*', function() {
      var str = vitals.cut.pattern('ABC.a*b*c.123', '*');
      assert( str === 'ABC.abc.123' );
    });

    test('ABC.a*b*c.123', '.*', function() {
      var str = vitals.cut.pattern('ABC.a*b*c.123', '.*');
      assert( str === 'ABC.a*b*c.123' );
    });
  });

  should('throw an error', function() {

    test(function() {
      assert.throws(function() {
        vitals.cut.pattern();
      }, validTypeErr);
    });

    test('str', function() {
      assert.throws(function() {
        vitals.cut.pattern('str');
      }, validErr);
    });

    test(1, 1, function() {
      assert.throws(function() {
        vitals.cut.pattern(1, 1);
      }, validTypeErr);
    });
  });
});
