/**
 * -----------------------------------------------------------------------------
 * VITALS UNIT TESTS: vitals.to.array
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

method('to.array', 'to.arr', function() {

  should('make new array with set length', function() {

    test(10, function() {
      var result = vitals.to.arr(10);
      assert( is.arr(result) );
      assert( result.length === 10 );
    });
  });

  should('validly split the string', function() {

    test('123', function() {
      var result = vitals.to.arr('123');
      assert( is.arr(result) );
      assert( result[0] === '123' );
      assert( result.length === 1 );
    });

    test('1,2,3', function() {
      var result = vitals.to.arr('1,2,3');
      assert( is.arr(result) );
      assert( result[0] === '1' );
      assert( result[1] === '2' );
      assert( result[2] === '3' );
      assert( result.length === 3 );
    });

    test('1|2|3', function() {
      var result = vitals.to.arr('1|2|3');
      assert( is.arr(result) );
      assert( result[0] === '1' );
      assert( result[1] === '2' );
      assert( result[2] === '3' );
      assert( result.length === 3 );
    });

    test('1--2--3', '--', function() {
      var result = vitals.to.arr('1--2--3', '--');
      assert( is.arr(result) );
      assert( result[0] === '1' );
      assert( result[1] === '2' );
      assert( result[2] === '3' );
      assert( result.length === 3 );
    });

    test('1--2--3', /-+/, function() {
      var result = vitals.to.arr('1--2--3', /-+/);
      assert( is.arr(result) );
      assert( result[0] === '1' );
      assert( result[1] === '2' );
      assert( result[2] === '3' );
      assert( result.length === 3 );
    });

    test('10203', 0, function() {
      var result = vitals.to.arr('10203', 0);
      assert( is.arr(result) );
      assert( result[0] === '1' );
      assert( result[1] === '2' );
      assert( result[2] === '3' );
      assert( result.length === 3 );
    });
  });

  should('throw an error', function() {

    test(function() {
      assert.throws(function() {
        vitals.to.arr();
      }, validErr);
    });

    test(null, function() {
      assert.throws(function() {
        vitals.to.arr(null);
      }, validTypeErr);
    });
  });
});
