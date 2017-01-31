/**
 * -----------------------------------------------------------------------------
 * VITALS UNIT TESTS: vitals.cut.patterns
 * -----------------------------------------------------------------------------
 * @section base
 * @see [vitals.cut docs](https://github.com/imaginate/vitals/wiki/vitals.cut)
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

method('cut.patterns', function() {

  should('remove all patterns from string', function() {

    test('abcABCabc', 'a', function() {
      var str = vitals.cut.patterns('abcABCabc', 'a');
      assert( str === 'bcABCbc' );
    });

    test('abc123abc123', 1, function() {
      var str = vitals.cut.patterns('abc123abc123', 1);
      assert( str === 'abc23abc23' );
    });

    test('abc123', /[a-z]/, function() {
      var str = vitals.cut.patterns('abc123', /[a-z]/);
      assert( str === 'bc123' );
    });

    test('abc123', /[a-z]/g, function() {
      var str = vitals.cut.patterns('abc123', /[a-z]/g);
      assert( str === '123' );
    });

    test('ABC.a*b*c.123', '*', function() {
      var str = vitals.cut.patterns('ABC.a*b*c.123', '*');
      assert( str === 'ABC.abc.123' );
    });

    test('ABC.a*b*c.123', '.*', function() {
      var str = vitals.cut.patterns('ABC.a*b*c.123', '.*');
      assert( str === 'ABC.a*b*c.123' );
    });

    test('abc123abc123', 1, /[a-z]/, function() {
      var str = vitals.cut.patterns('abc123abc123', 1, /[a-z]/);
      assert( str === 'bc23abc23' );
    });

    test('abc123abc123', [ 1, /[a-z]/g ], function() {
      var str = vitals.cut.patterns('abc123abc123', [ 1, /[a-z]/g ]);
      assert( str === '2323' );
    });
  });

  should('throw an error', function() {

    test(function() {
      assert.throws(function() {
        vitals.cut.patterns();
      }, validTypeErr);
    });

    test('str', function() {
      assert.throws(function() {
        vitals.cut.patterns('str');
      }, validErr);
    });

    test(1, 1, function() {
      assert.throws(function() {
        vitals.cut.patterns(1, 1);
      }, validTypeErr);
    });
  });
});
